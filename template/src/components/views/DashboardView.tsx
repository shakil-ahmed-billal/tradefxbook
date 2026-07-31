import React from 'react';
import { 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Target, 
  Lock, 
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

export const DashboardView: React.FC<DashboardViewProps> = ({
  trades,
  onSelectTrade,
  onNavigateToJournal,
}) => {
  const [activeRange, setActiveRange] = React.useState<'1D' | '1W' | '1M'>('1M');

  // Calculate totals from trades
  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);
  const winningTrades = closedTrades.filter(t => t.pnl > 0);
  const losingTrades = closedTrades.filter(t => t.pnl < 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;

  const avgWin = winningTrades.length > 0 ? winningTrades.reduce((acc, t) => acc + t.pnl, 0) / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? losingTrades.reduce((acc, t) => acc + t.pnl, 0) / losingTrades.length : 0;
  
  const bestTrade = trades.length > 0 ? Math.max(...trades.map(t => t.pnl)) : 0;
  const worstTrade = trades.length > 0 ? Math.min(...trades.map(t => t.pnl)) : 0;

  const grossProfit = winningTrades.reduce((acc, t) => acc + t.pnl, 0);
  const grossLoss = Math.abs(losingTrades.reduce((acc, t) => acc + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#121a2c] via-[#10141d] to-[#10141d] border border-[#253156] rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(76,125,255,0.18),transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-[#9aa2b3] bg-[#1c2230] px-2 py-0.5 rounded-full">
              Total
            </span>
          </div>
          <span className="text-xs font-medium text-[#9aa2b3] block mb-1">Total P&L</span>
          <span className={`font-mono text-2.5xl font-bold tracking-tight block ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
            {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
          </span>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#5c6478]">
            <span className="text-[#22c58b]">●</span>
            <span>{trades.length} trades this month</span>
          </div>
        </div>

        {/* Unrealized */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-lg bg-[rgba(242,184,75,0.14)] text-[#f2b84b] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span class="text-xs font-medium text-[#9aa2b3] block mb-1">Unrealized</span>
          <span className="font-mono text-2.5xl font-bold text-[#f4f6fa] tracking-tight block">$0.00</span>
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
          <span className={`font-mono text-2.5xl font-bold tracking-tight block ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
            {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
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
          <span className="font-mono text-2.5xl font-bold text-[#f4f6fa] tracking-tight block">
            {winRate.toFixed(1)}%
          </span>
          <div className="w-full h-1.5 rounded-full bg-[#1c2230] mt-3 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#2981eb] to-[#5aa2f2] transition-all duration-500" 
              style={{ width: `${Math.max(winRate, 2)}%` }}
            />
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Performance chart */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="font-mono text-[11px] text-[#5c6478] uppercase tracking-wider mb-1">PERFORMANCE</div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-2xl font-bold ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                    {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
                  </span>
                  <span className="text-xs text-[#5c6478]">last 30 days</span>
                </div>
              </div>

              {/* Range tabs */}
              <div className="flex items-center gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl self-start sm:self-auto">
                {(['1D', '1W', '1M'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveRange(tab)}
                    className={`px-3 py-1 rounded-lg font-sans text-xs font-semibold transition-colors ${
                      activeRange === tab ? 'bg-[#1c2230] text-[#f4f6fa]' : 'text-[#5c6478] hover:text-[#9aa2b3]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#5c6478] opacity-50 cursor-not-allowed flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> 3M
                </button>
                <button className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#5c6478] opacity-50 cursor-not-allowed flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> ALL
                </button>
              </div>
            </div>

            {/* SVG Equity Curve Chart */}
            <div className="w-full h-[220px] mt-3">
              <svg className="w-full h-full" viewBox="0 0 760 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dashboardAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} stopOpacity="0.28"/>
                    <stop offset="100%" stopColor={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="760" y2="30" stroke="#1a2029" strokeWidth="1" />
                <line x1="0" y1="80" x2="760" y2="80" stroke="#1a2029" strokeWidth="1" />
                <line x1="0" y1="130" x2="760" y2="130" stroke="#1a2029" strokeWidth="1" />
                <line x1="0" y1="180" x2="760" y2="180" stroke="#1a2029" strokeWidth="1" />
                
                <path 
                  d="M0,40 L620,40 L680,120 L760,190 L760,220 L0,220 Z" 
                  fill="url(#dashboardAreaGrad)" 
                />
                <path 
                  d="M0,40 L620,40 L680,120 L760,190" 
                  fill="none" 
                  stroke={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx="760" cy="190" r="5" fill="#0a0d14" stroke={totalPnL < 0 ? '#ef4b5c' : '#22c58b'} strokeWidth="2.5" />
                <text x="4" y="16" fill="#565e73" fontSize="10" className="font-mono">$0</text>
                <text x="4" y="215" fill="#565e73" fontSize="10" className="font-mono">-$700</text>
              </svg>
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
              <span className="font-mono text-xs text-[#5c6478]">{trades.length} trades</span>
            </div>

            <div className="flex flex-col gap-3">
              {trades.slice(0, 5).map(trade => (
                <div
                  key={trade.id}
                  onClick={() => {
                    onSelectTrade(trade);
                    onNavigateToJournal();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#161b27] border border-[#1a2029] hover:border-[#2a2f42] cursor-pointer transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-mono text-xs font-bold text-[#9aa2b3] shrink-0">
                    {trade.pairCode}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#f4f6fa]">{trade.symbol}</span>
                      <span className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/10' : 'text-[#ef4b5c] bg-[#ef4b5c]/10'
                      }`}>
                        {trade.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5c6478] mt-0.5">{trade.size} lots</div>
                  </div>

                  <div className="text-right">
                    <div className={`font-mono text-xs font-bold ${trade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                      {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                    </div>
                    <div className="font-mono text-[10px] text-[#5c6478] mt-0.5">Jul 31</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          {/* Calendar Heatmap */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa]">Monthly P&L</h3>
              <span className={`font-mono text-xs font-bold ${totalPnL < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between my-2 font-mono text-xs text-[#9aa2b3]">
              <button className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#5c6478] hover:text-[#f4f6fa]">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-semibold">July 2026</span>
              <button className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#5c6478] hover:text-[#f4f6fa]">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-[#5c6478] mb-1 font-semibold">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>

            <div className="grid grid-cols-7 gap-1">
              <div className="aspect-[1/0.85] rounded bg-transparent" />
              <div className="aspect-[1/0.85] rounded bg-transparent" />
              {Array.from({ length: 29 }).map((_, i) => (
                <div key={i} className="aspect-[1/0.85] rounded bg-[#161b27] border border-[#1a2029] p-1 text-[10px] font-mono text-[#5c6478]">
                  {i + 1}
                </div>
              ))}
              <div className="aspect-[1/0.85] rounded bg-[#161b27] border border-[#2981eb] p-1 text-[10px] font-mono text-[#f4f6fa] font-bold shadow-sm shadow-[#2981eb]/30">
                30
              </div>
              <div className="aspect-[1/0.85] rounded bg-[#ef4b5c]/15 border border-[#ef4b5c]/40 p-1 text-[10px] font-mono text-[#f4f6fa]">
                31
                <span className="block text-[8.5px] font-bold text-[#ef4b5c]">-${Math.abs(totalPnL)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1a2029] text-[11px] text-[#5c6478]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c58b]" /> Profit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4b5c]" /> Loss
              </span>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa] mb-3">Top Performers</h3>
            
            <div className="flex flex-col divide-y divide-[#1a2029]">
              {trades.slice(0, 3).map((trade, idx) => (
                <div key={trade.id} className="py-2.5 flex items-center gap-3">
                  <span className="font-mono text-xs text-[#5c6478]">#{idx + 1}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-mono text-[9px] font-bold text-[#9aa2b3]">
                    {trade.pairCode}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-[#f4f6fa]">{trade.symbol}</div>
                    <div className="text-[10px] text-[#5c6478]">1 trade</div>
                  </div>
                  <span className={`font-mono text-xs font-bold ${trade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                    {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <h3 className="font-outfit font-semibold text-sm text-[#f4f6fa] mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Avg Win</span>
                <span className="font-mono text-xs font-bold text-[#22c58b]">${avgWin.toFixed(2)}</span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Avg Loss</span>
                <span className="font-mono text-xs font-bold text-[#ef4b5c]">${avgLoss.toFixed(2)}</span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Best Trade</span>
                <span className={`font-mono text-xs font-bold ${bestTrade < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  ${bestTrade.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5">
                <span className="text-[10.5px] text-[#5c6478] block mb-1">Worst Trade</span>
                <span className="font-mono text-xs font-bold text-[#ef4b5c]">${worstTrade.toFixed(2)}</span>
              </div>
              <div className="col-span-2 bg-[#161b27] border border-[#1a2029] rounded-xl p-2.5 flex items-center justify-between">
                <span className="text-[10.5px] text-[#5c6478]">Profit Factor</span>
                <span className="font-mono text-xs font-bold text-[#ef4b5c]">{profitFactor.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
