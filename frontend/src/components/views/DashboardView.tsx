import React, { useState } from 'react';
import { 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Target, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Trade } from '../../types';

interface DashboardViewProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
  onNavigateToJournal: () => void;
}

function fmt(num: number): string {
  const abs = Math.abs(num);
  const sign = num < 0 ? '-' : '+';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 100_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  trades,
  onSelectTrade,
  onNavigateToJournal,
}) => {
  const now = new Date();
  const [activeRange, setActiveRange] = useState<'1D' | '1W' | '1M'>('1M');
  const [calYear, setCalYear] = useState<number>(now.getFullYear());
  const [calMonth, setCalMonth] = useState<number>(now.getMonth()); // 0-indexed

  // --- Stats from all trades ---
  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalPnL = closedTrades.reduce((acc, t) => acc + Number(t.pnl || 0), 0);
  const winningTrades = closedTrades.filter(t => Number(t.pnl) > 0);
  const losingTrades = closedTrades.filter(t => Number(t.pnl) < 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;

  const avgWin = winningTrades.length > 0 ? winningTrades.reduce((acc, t) => acc + Number(t.pnl), 0) / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? losingTrades.reduce((acc, t) => acc + Number(t.pnl), 0) / losingTrades.length : 0;

  const bestTrade = trades.length > 0 ? Math.max(...trades.map(t => Number(t.pnl))) : 0;
  const worstTrade = trades.length > 0 ? Math.min(...trades.map(t => Number(t.pnl))) : 0;

  const grossProfit = winningTrades.reduce((acc, t) => acc + Number(t.pnl), 0);
  const grossLoss = Math.abs(losingTrades.reduce((acc, t) => acc + Number(t.pnl), 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;

  // --- Calendar logic ---
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  // JS getDay(): 0=Sun,1=Mon,...,6=Sat. We want Mon-first display.
  const firstDayOfWeekJS = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
  // Convert Sun=0 to Mon-first offset: Sun=6, Mon=0, Tue=1, ...
  const offset = (firstDayOfWeekJS + 6) % 7;

  // Build day → stats map for the displayed month
  const calDayStats: { [day: number]: { pnl: number; count: number } } = {};
  trades.forEach(t => {
    if (!t.openTime) return;
    const d = new Date(t.openTime);
    if (isNaN(d.getTime())) return;
    if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
      const day = d.getDate();
      if (!calDayStats[day]) calDayStats[day] = { pnl: 0, count: 0 };
      calDayStats[day].pnl += Number(t.pnl || 0);
      calDayStats[day].count += 1;
    }
  });

  // Monthly P&L for currently displayed month
  const monthlyPnL = Object.values(calDayStats).reduce((acc, d) => acc + d.pnl, 0);

  // Top performers: group by symbol, sort by pnl desc
  const symbolMap: { [s: string]: { pnl: number; count: number } } = {};
  trades.forEach(t => {
    const s = t.symbol || 'UNKNOWN';
    if (!symbolMap[s]) symbolMap[s] = { pnl: 0, count: 0 };
    symbolMap[s].pnl += Number(t.pnl || 0);
    symbolMap[s].count += 1;
  });
  const topPerformers = Object.entries(symbolMap)
    .map(([symbol, data]) => ({ symbol, ...data }))
    .sort((a, b) => b.pnl - a.pnl)
    .slice(0, 5);

  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total PnL */}
        <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(76,125,255,0.18),transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--text-mid)] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-2 py-0.5 rounded-full">
              All Time
            </span>
          </div>
          <span className="text-xs font-medium text-[#9aa2b3] block mb-1">Total P&L</span>
          <span className={`font-mono text-2xl font-bold tracking-tight block truncate ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
            {fmt(totalPnL)}
          </span>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#5c6478]">
            <span className={totalPnL >= 0 ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}>●</span>
            <span>{trades.length} total trades</span>
          </div>
        </div>

        {/* Unrealized */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[rgba(242,184,75,0.14)] text-[#f2b84b] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-medium text-[#9aa2b3] block mb-1">Unrealized</span>
          <span className="font-mono text-2xl font-bold text-[#f4f6fa] tracking-tight block">$0.00</span>
          <div className="mt-3 text-xs text-[#5c6478]">0 open positions</div>
        </div>

        {/* Realized */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#22c58b]/15 text-[#22c58b] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-medium text-[#9aa2b3] block mb-1">Realized</span>
          <span className={`font-mono text-2xl font-bold tracking-tight block truncate ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
            {fmt(totalPnL)}
          </span>
          <div className="mt-3 text-xs text-[#5c6478]">{closedTrades.length} closed trades</div>
        </div>

        {/* Win Rate */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-medium text-[#9aa2b3] block mb-1">Win Rate</span>
          <span className="font-mono text-2xl font-bold text-[#f4f6fa] tracking-tight block">
            {winRate.toFixed(1)}%
          </span>
          <div className="w-full h-1.5 rounded-full bg-[#1c2230] mt-3 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#2981eb] to-[#5aa2f2] transition-all duration-500" style={{ width: `${Math.max(winRate, 2)}%` }} />
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Equity SVG Chart */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="font-mono text-[11px] text-[#5c6478] uppercase tracking-wider mb-1">PERFORMANCE</div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-2xl font-bold truncate ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                    {fmt(totalPnL)}
                  </span>
                  <span className="text-xs text-[#5c6478]">all time</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl self-start sm:self-auto">
                {(['1D', '1W', '1M'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveRange(tab)}
                    className={`px-3 py-1 rounded-lg font-sans text-xs font-semibold transition-colors ${
                      activeRange === tab ? 'bg-[#2981eb] text-white' : 'text-[#5c6478] hover:text-[#9aa2b3]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic SVG equity curve */}
            <div className="w-full h-[200px] mt-3">
              {trades.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-[#565e73]">No data yet — import trades to see equity curve</div>
              ) : (
                <svg className="w-full h-full" viewBox="0 0 760 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} stopOpacity="0.22"/>
                      <stop offset="100%" stopColor={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {[30, 80, 130, 175].map(y => (
                    <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="#1a2029" strokeWidth="1" />
                  ))}
                  {(() => {
                    // Build cumulative equity curve from sorted closed trades
                    const sorted = [...closedTrades]
                      .sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime());
                    if (sorted.length < 2) return null;
                    let cum = 0;
                    const points = sorted.map(t => { cum += Number(t.pnl || 0); return cum; });
                    const min = Math.min(0, ...points);
                    const max = Math.max(0, ...points);
                    const range = max - min || 1;
                    const toY = (v: number) => 185 - ((v - min) / range) * 170;
                    const toX = (i: number) => (i / (points.length - 1)) * 760;
                    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(p).toFixed(1)}`).join(' ');
                    const lastX = toX(points.length - 1);
                    const lastY = toY(points[points.length - 1]);
                    const color = totalPnL < 0 ? '#ef4b5c' : '#22c58b';
                    return (
                      <>
                        <path d={`${d} L${lastX},195 L0,195 Z`} fill="url(#dashAreaGrad)" />
                        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx={lastX} cy={lastY} r="4" fill="#0a0d14" stroke={color} strokeWidth="2.5" />
                      </>
                    );
                  })()}
                </svg>
              )}
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa]">Open Positions</h3>
              <span className="font-mono text-xs text-[#5c6478]">0 active</span>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center gap-2 text-[#5c6478]">
              <FileText className="w-8 h-8 opacity-40" />
              <span className="text-xs">No open positions right now</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa]">Recent Activity</h3>
              <span className="font-mono text-xs text-[#5c6478]">{trades.length} trades total</span>
            </div>

            {trades.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#565e73]">No trades yet — import your Exness CSV to see activity here.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {trades.slice(0, 5).map(trade => (
                  <div
                    key={trade.id}
                    onClick={() => { onSelectTrade(trade); onNavigateToJournal(); }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] hover:bg-[var(--bg-hover)] hover:border-[#2981eb] cursor-pointer transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-xs font-bold text-[var(--text-mid)] shrink-0">
                      {trade.pairCode}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[var(--text-hi)]">{trade.symbol}</span>
                        <span className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/10' : 'text-[#ef4b5c] bg-[#ef4b5c]/10'
                        }`}>
                          {trade.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-[var(--text-low)] mt-0.5">
                        {trade.openTime ? trade.openTime.slice(0, 10) : 'N/A'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-mono text-xs font-bold ${Number(trade.pnl) < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                        {fmt(Number(trade.pnl))}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-low)] mt-0.5">{trade.size} lots</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          {/* DYNAMIC Monthly P&L Calendar */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa]">Monthly P&L</h3>
              <span className={`font-mono text-xs font-bold truncate max-w-[90px] ${monthlyPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                {fmt(monthlyPnL)}
              </span>
            </div>

            <div className="flex items-center justify-between my-2 font-mono text-xs text-[#9aa2b3]">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#5c6478] hover:text-[#f4f6fa] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-semibold text-[#eef1f8]">{MONTH_NAMES[calMonth]} {calYear}</span>
              <button
                onClick={handleNextMonth}
                className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#5c6478] hover:text-[#f4f6fa] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Day-of-week headers (Mon first) */}
            <div className="grid grid-cols-7 gap-0.5 text-center font-mono text-[9.5px] text-[#5c6478] mb-1 font-semibold">
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {/* Offset empty cells */}
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`off-${i}`} className="aspect-[1/0.85]" />
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const s = calDayStats[dayNum];
                const hasTrades = s && s.count > 0;
                const dayPnl = s?.pnl || 0;
                const isToday = calYear === now.getFullYear() && calMonth === now.getMonth() && dayNum === now.getDate();

                return (
                  <div
                    key={dayNum}
                    className={`aspect-[1/0.85] rounded border p-0.5 text-[9px] font-mono flex flex-col justify-between transition-colors ${
                      hasTrades
                        ? dayPnl < 0
                          ? 'bg-[#ef4b5c]/15 border-[#ef4b5c]/40 text-[#eef1f8]'
                          : 'bg-[#22c58b]/15 border-[#22c58b]/40 text-[#eef1f8]'
                        : isToday
                          ? 'bg-[#1c2230] border-[#2981eb] text-[#f4f6fa]'
                          : 'bg-[#161b27] border-[#1a2029] text-[#565e73]'
                    }`}
                  >
                    <span className="font-semibold">{dayNum}</span>
                    {hasTrades && (
                      <span className={`text-[8px] font-bold truncate leading-tight ${dayPnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                        {dayPnl < 0 ? '-' : '+'}${Math.abs(dayPnl).toFixed(0)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1a2029] text-[11px] text-[#5c6478]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22c58b]" /> Profit</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ef4b5c]" /> Loss</span>
            </div>
          </div>

          {/* Top Performers — dynamic */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa] mb-3">Top Performers</h3>
            {topPerformers.length === 0 ? (
              <div className="text-center text-xs text-[#565e73] py-6">Import trades to see top instruments.</div>
            ) : (
              <div className="flex flex-col divide-y divide-[#1a2029]">
                {topPerformers.map((item, idx) => (
                  <div key={item.symbol} className="py-2.5 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#5c6478]">#{idx + 1}</span>
                    <div className="w-7 h-7 rounded-lg bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-mono text-[9px] font-bold text-[#9aa2b3]">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-[#f4f6fa] truncate">{item.symbol}</div>
                      <div className="text-[10px] text-[#5c6478]">{item.count} trade{item.count !== 1 ? 's' : ''}</div>
                    </div>
                    <span className={`font-mono text-xs font-bold truncate max-w-[70px] ${item.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                      {fmt(item.pnl)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa] mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Avg Win</span>
                <span className="font-mono text-xs font-bold text-[#22c58b] truncate block">{avgWin >= 0 ? '+' : ''}${avgWin.toFixed(2)}</span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Avg Loss</span>
                <span className="font-mono text-xs font-bold text-[#ef4b5c] truncate block">${avgLoss.toFixed(2)}</span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Best Trade</span>
                <span className={`font-mono text-xs font-bold truncate block ${bestTrade < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  {bestTrade >= 0 ? '+' : ''}${bestTrade.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Worst Trade</span>
                <span className="font-mono text-xs font-bold text-[#ef4b5c] truncate block">${worstTrade.toFixed(2)}</span>
              </div>
              <div className="col-span-2 bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5 flex items-center justify-between">
                <span className="text-[10.5px] text-[#5c6478]">Profit Factor</span>
                <span className={`font-mono text-xs font-bold ${profitFactor >= 1 ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}`}>
                  {profitFactor > 0 ? profitFactor.toFixed(2) : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
