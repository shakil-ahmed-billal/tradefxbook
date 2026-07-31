import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart2, 
  Check, 
  X, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Trade } from '../../types';

interface PerformanceViewProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  trades,
  onSelectTrade,
}) => {
  const [timePeriod, setTimePeriod] = useState<'30 Days' | 'Today' | '7 Days' | '3 Months' | '1 Year' | 'All Time'>('30 Days');
  const [filterType, setFilterType] = useState<'All Trades' | 'Winners' | 'Losers'>('All Trades');
  const [selectedDay, setSelectedDay] = useState<number | null>(31);

  const filteredTrades = trades.filter(t => {
    if (filterType === 'Winners') return t.pnl > 0;
    if (filterType === 'Losers') return t.pnl < 0;
    return true;
  });

  const totalPnL = filteredTrades.reduce((acc, t) => acc + t.pnl, 0);
  const winners = filteredTrades.filter(t => t.pnl > 0);
  const losers = filteredTrades.filter(t => t.pnl < 0);
  const winRate = filteredTrades.length > 0 ? (winners.length / filteredTrades.length) * 100 : 0;

  const grossProfit = winners.reduce((acc, t) => acc + t.pnl, 0);
  const grossLoss = Math.abs(losers.reduce((acc, t) => acc + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;
  const expectancy = filteredTrades.length > 0 ? totalPnL / filteredTrades.length : 0;

  const longs = filteredTrades.filter(t => t.type === 'long');
  const shorts = filteredTrades.filter(t => t.type === 'short');
  const longPnL = longs.reduce((acc, t) => acc + t.pnl, 0);
  const shortPnL = shorts.reduce((acc, t) => acc + t.pnl, 0);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      
      {/* HEADER + FILTERS */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold tracking-tight text-[#eef1f8] flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#7aa0ff]" />
            Performance Analytics
          </h1>
          <p className="text-xs text-[#565e73] mt-1">Analyze your trading patterns and improve your strategy</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-[10.5px] font-semibold text-[#565e73] tracking-wider uppercase block mb-1">Time Period</label>
            <div className="flex items-center gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl">
              {(['Today', '7 Days', '30 Days', '3 Months', '1 Year', 'All Time'] as const).map(period => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    timePeriod === period ? 'bg-[#1c2230] text-[#eef1f8]' : 'text-[#565e73] hover:text-[#8d94a8]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-[#565e73] tracking-wider uppercase block mb-1">Filter By</label>
            <div className="flex items-center gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl">
              <button
                onClick={() => setFilterType('All Trades')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === 'All Trades' ? 'bg-[#1c2230] text-[#eef1f8]' : 'text-[#565e73]'
                }`}
              >
                All Trades
              </button>
              <button
                onClick={() => setFilterType('Winners')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  filterType === 'Winners' ? 'bg-[#00d9a3]/15 text-[#00d9a3]' : 'text-[#565e73]'
                }`}
              >
                <Check className="w-3.5 h-3.5" /> Winners
              </button>
              <button
                onClick={() => setFilterType('Losers')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  filterType === 'Losers' ? 'bg-[#ff5c7a]/15 text-[#ff5c7a]' : 'text-[#565e73]'
                }`}
              >
                <X className="w-3.5 h-3.5" /> Losers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total PnL */}
        <div className="bg-gradient-to-br from-[#121a2c] via-[#10141d] to-[#10141d] border border-[#253156] rounded-2xl p-5 relative overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#4c7dff]/15 text-[#7aa0ff] flex items-center justify-center mb-3">
            <DollarSign className="w-4.5 h-4.5" />
          </div>
          <span className="text-xs text-[#8d94a8] font-medium block mb-1">Total P&L</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block ${totalPnL < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
            {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
          </span>
          <div className="text-xs text-[#565e73] mt-2">From {filteredTrades.length} closed trades</div>
        </div>

        {/* Win Rate */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center mb-3">
            <Target className="w-4.5 h-4.5" />
          </div>
          <span className="text-xs text-[#8d94a8] font-medium block mb-1">Win Rate</span>
          <span className="font-mono text-2xl font-semibold text-[#eef1f8] tracking-tight block">
            {winRate.toFixed(1)}%
          </span>
          <div className="text-xs text-[#565e73] mt-1">{winners.length} wins • {losers.length} losses</div>
          <div className="w-full h-1.5 rounded-full bg-[#1c2230] mt-3 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]" style={{ width: `${winRate}%` }} />
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#f2b84b]/15 text-[#f2b84b] flex items-center justify-center mb-3">
            <BarChart2 className="w-4.5 h-4.5" />
          </div>
          <span className="text-xs text-[#8d94a8] font-medium block mb-1">Profit Factor</span>
          <span className="font-mono text-2xl font-semibold text-[#ff5c7a] tracking-tight block">
            {profitFactor.toFixed(2)}
          </span>
          <div className="text-xs text-[#565e73] mt-2 flex items-center gap-1 text-[#f2b84b]">
            <AlertTriangle className="w-3.5 h-3.5" />
            Needs work
          </div>
        </div>

        {/* Expectancy */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#00d9a3]/15 text-[#00d9a3] flex items-center justify-center mb-3">
            <DollarSign className="w-4.5 h-4.5" />
          </div>
          <span className="text-xs text-[#8d94a8] font-medium block mb-1">Expectancy</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block ${expectancy < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
            {expectancy < 0 ? '-' : '+'}${Math.abs(expectancy).toFixed(2)}
          </span>
          <div className="text-xs text-[#565e73] mt-2">Average per trade</div>
        </div>
      </section>

      {/* QUICK STATS + EQUITY CURVE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Quick Stats */}
        <div className="lg:col-span-5 bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#7aa0ff]" />
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Avg Winner</span>
              <span className="font-mono text-sm font-semibold text-[#00d9a3]">$0.00</span>
            </div>
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Avg Loser</span>
              <span className="font-mono text-sm font-semibold text-[#ff5c7a]">-$346.00</span>
            </div>
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Best Trade</span>
              <span className="font-mono text-sm font-semibold text-[#00d9a3]">$0.00</span>
            </div>
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Worst Trade</span>
              <span className="font-mono text-sm font-semibold text-[#ff5c7a]">-$440.00</span>
            </div>
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Win Streak</span>
              <span className="font-mono text-sm font-semibold text-[#eef1f8]">0 trades</span>
            </div>
            <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Loss Streak</span>
              <span className="font-mono text-sm font-semibold text-[#ff5c7a]">2 trades</span>
            </div>
          </div>
        </div>

        {/* Equity Curve */}
        <div className="lg:col-span-7 bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-sora text-sm font-semibold text-[#eef1f8]">Equity Curve</h3>
              <p className="text-xs text-[#565e73]">Cumulative P&L progression</p>
            </div>
            <div className="flex items-center gap-1 bg-[#161b27] p-1 rounded-xl border border-[#232a3a]">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#1c2230] text-[#eef1f8]">Equity</span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold text-[#565e73]">Drawdown</span>
            </div>
          </div>

          <div className="w-full h-[230px]">
            <svg className="w-full h-full" viewBox="0 0 700 230" preserveAspectRatio="none">
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5c7a" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#ff5c7a" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="30" x2="700" y2="30" stroke="#1a2029" strokeWidth="1"/>
              <line x1="0" y1="85" x2="700" y2="85" stroke="#1a2029" strokeWidth="1"/>
              <line x1="0" y1="140" x2="700" y2="140" stroke="#1a2029" strokeWidth="1"/>
              <line x1="0" y1="195" x2="700" y2="195" stroke="#1a2029" strokeWidth="1"/>
              <path d="M0,40 L560,40 L630,120 L700,200 L700,225 L0,225 Z" fill="url(#perfGrad)"/>
              <path d="M0,40 L560,40 L630,120 L700,200" fill="none" stroke="#ff5c7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="700" cy="200" r="5" fill="#10141d" stroke="#ff5c7a" strokeWidth="2.5"/>
              <text x="4" y="16" fill="#565e73" fontSize="10" className="font-mono">$0</text>
              <text x="4" y="221" fill="#565e73" fontSize="10" className="font-mono">-$700</text>
            </svg>
          </div>
        </div>
      </section>

      {/* THREE COL SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Long vs Short */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-1">Long vs Short</h3>
          <p className="text-xs text-[#565e73] mb-4">Performance by trade direction</p>

          <div className="flex flex-col gap-3">
            <div className="p-3.5 rounded-xl border border-[#00d9a3]/20 bg-[#161b27]">
              <div className="flex items-center gap-2 mb-2 text-[#00d9a3] font-semibold text-xs">
                <ArrowUpRight className="w-4 h-4" /> Long
              </div>
              <div className="flex justify-between text-xs">
                <div><span className="text-[#565e73] block text-[10.5px]">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">{longs.length}</span></div>
                <div><span className="text-[#565e73] block text-[10.5px]">P&L</span><span className="font-mono font-semibold text-[#ff5c7a]">${longPnL.toFixed(2)}</span></div>
                <div><span className="text-[#565e73] block text-[10.5px]">Win %</span><span className="font-mono font-semibold text-[#eef1f8]">0.0%</span></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#ff5c7a]/20 bg-[#161b27]">
              <div className="flex items-center gap-2 mb-2 text-[#ff5c7a] font-semibold text-xs">
                <ArrowDownRight className="w-4 h-4" /> Short
              </div>
              <div className="flex justify-between text-xs">
                <div><span className="text-[#565e73] block text-[10.5px]">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">{shorts.length}</span></div>
                <div><span className="text-[#565e73] block text-[10.5px]">P&L</span><span className="font-mono font-semibold text-[#00d9a3]">${shortPnL.toFixed(2)}</span></div>
                <div><span className="text-[#565e73] block text-[10.5px]">Win %</span><span className="font-mono font-semibold text-[#eef1f8]">0.0%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Performance */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-1">Day Performance</h3>
          <p className="text-xs text-[#565e73] mb-4">Find your best trading days</p>

          <div className="flex flex-col gap-2.5">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="flex items-center gap-2.5 text-xs">
                <span className="text-[#565e73] w-8 font-medium">{day}</span>
                <div className="flex-1 h-2 rounded-full bg-[#161b27] overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${day === 'Fri' ? 'bg-gradient-to-r from-[#b8324a] to-[#ff5c7a] w-full' : 'w-0'}`} 
                  />
                </div>
                <span className={`font-mono text-xs font-semibold w-16 text-right ${day === 'Fri' ? 'text-[#ff5c7a]' : 'text-[#565e73]'}`}>
                  {day === 'Fri' ? `-$${Math.abs(totalPnL)}` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Symbols */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-1">Top Symbols</h3>
          <p className="text-xs text-[#565e73] mb-4">Best performing assets</p>

          <div className="flex flex-col divide-y divide-[#1a2029]">
            {trades.slice(0, 3).map((t, idx) => (
              <div key={t.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#565e73]">#{idx + 1}</span>
                  <div>
                    <span className="font-semibold text-xs text-[#eef1f8] block">{t.symbol}</span>
                    <span className="text-[10.5px] text-[#565e73]">1 trade • 0% win</span>
                  </div>
                </div>
                <span className={`font-mono text-xs font-bold ${t.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                  {t.pnl < 0 ? '-' : '+'}${Math.abs(t.pnl).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SESSION PERFORMANCE */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-1">Session Performance</h3>
        <p className="text-xs text-[#565e73] mb-4">Breakdown by trading session — Asian, London & New York</p>

        <div className="relative h-8 rounded-xl bg-[#161b27] overflow-hidden mb-2 border border-[#1a2029]">
          <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-[#f2b84b] to-[#f5c96e] text-[#0a0d14] text-[10.5px] font-bold flex items-center justify-center">Asian</div>
          <div className="absolute left-[33.3%] w-[21%] h-full bg-gradient-to-r from-[#7aa0ff] to-[#4c7dff] text-white text-[10.5px] font-bold flex items-center justify-center">London</div>
          <div className="absolute left-[54.3%] w-[37.5%] h-full bg-gradient-to-r from-[#00d9a3] to-[#00b98c] text-[#0a0d14] text-[10.5px] font-bold flex items-center justify-center">New York</div>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-[#565e73] mb-5">
          <span>00:00</span><span>08:00</span><span>13:00</span><span>22:00</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2b84b]/15 text-[#f2b84b] flex items-center justify-center font-bold text-xs">AS</div>
              <div>
                <span className="font-semibold text-xs text-[#eef1f8] block">Asian Session</span>
                <span className="font-mono text-[10.5px] text-[#565e73]">22:00 – 08:00 UTC</span>
              </div>
            </div>
            <span className="font-mono text-lg font-bold text-[#ff5c7a] block mb-2">-$692.00</span>
            <div className="w-full h-1.5 rounded-full bg-[#1c2230] mb-3 overflow-hidden">
              <div className="h-full bg-[#ff5c7a] w-full rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div><span className="text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">2</span></div>
              <div><span className="text-[#565e73] block">Win Rate</span><span className="font-mono font-semibold text-[#eef1f8]">0.0%</span></div>
            </div>
          </div>

          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#7aa0ff]/15 text-[#7aa0ff] flex items-center justify-center font-bold text-xs">LD</div>
              <div>
                <span className="font-semibold text-xs text-[#eef1f8] block">London Session</span>
                <span className="font-mono text-[10.5px] text-[#565e73]">08:00 – 13:00 UTC</span>
              </div>
            </div>
            <span className="font-mono text-lg font-bold text-[#565e73] block mb-2">—</span>
            <div className="w-full h-1.5 rounded-full bg-[#1c2230] mb-3" />
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div><span className="text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">0</span></div>
              <div><span className="text-[#565e73] block">Win Rate</span><span className="font-mono font-semibold text-[#eef1f8]">—</span></div>
            </div>
          </div>

          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#00d9a3]/15 text-[#00d9a3] flex items-center justify-center font-bold text-xs">NY</div>
              <div>
                <span className="font-semibold text-xs text-[#eef1f8] block">New York Session</span>
                <span className="font-mono text-[10.5px] text-[#565e73]">13:00 – 22:00 UTC</span>
              </div>
            </div>
            <span className="font-mono text-lg font-bold text-[#565e73] block mb-2">—</span>
            <div className="w-full h-1.5 rounded-full bg-[#1c2230] mb-3" />
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div><span className="text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">0</span></div>
              <div><span className="text-[#565e73] block">Win Rate</span><span className="font-mono font-semibold text-[#eef1f8]">—</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRADING CALENDAR */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#7aa0ff]" />
              Trading Calendar Heatmap
            </h3>
            <p className="text-xs text-[#565e73]">Click on days to view trade details</p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#565e73] hover:text-[#eef1f8]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-[#eef1f8]">July 2026</span>
            <button className="p-1 rounded bg-[#161b27] border border-[#232a3a] text-[#565e73] hover:text-[#eef1f8]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10.5px] text-[#565e73] font-semibold mb-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              <div className="aspect-[1/0.8] rounded bg-transparent" />
              <div className="aspect-[1/0.8] rounded bg-transparent" />
              {Array.from({ length: 29 }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedDay(i + 1)}
                  className={`aspect-[1/0.8] rounded-xl border p-1 text-xs cursor-pointer transition-colors ${
                    selectedDay === i + 1 
                      ? 'border-[#7aa0ff] bg-[#161b27] text-[#eef1f8]' 
                      : 'border-[#1a2029] bg-[#161b27] text-[#565e73] hover:border-[#2a2f42]'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
              <div
                onClick={() => setSelectedDay(30)}
                className={`aspect-[1/0.8] rounded-xl border p-1 text-xs cursor-pointer transition-colors ${
                  selectedDay === 30 ? 'border-[#7aa0ff] bg-[#161b27]' : 'border-[#2981eb] bg-[#161b27] text-[#eef1f8]'
                }`}
              >
                30
              </div>
              <div
                onClick={() => setSelectedDay(31)}
                className={`aspect-[1/0.8] rounded-xl border p-1 text-xs cursor-pointer transition-colors bg-[#ff5c7a]/15 border-[#ff5c7a]/40 text-[#eef1f8] ${
                  selectedDay === 31 ? 'ring-2 ring-[#ff5c7a]' : ''
                }`}
              >
                31
                <span className="block font-mono text-[10px] font-bold text-[#ff5c7a]">-$692.00</span>
                <span className="block text-[8.5px] text-[#565e73]">{trades.length} trades</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-xs text-[#eef1f8] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7aa0ff]" />
                Day Trades (Jul {selectedDay || 31})
              </h4>

              {selectedDay === 31 ? (
                <div className="flex flex-col gap-2">
                  {trades.map(t => (
                    <div 
                      key={t.id} 
                      onClick={() => onSelectTrade(t)}
                      className="p-2.5 rounded-lg bg-[#10141d] border border-[#232a3a] flex items-center justify-between text-xs cursor-pointer hover:border-[#7aa0ff]"
                    >
                      <div>
                        <span className="font-semibold text-[#eef1f8] block">{t.symbol}</span>
                        <span className="text-[10px] text-[#565e73] uppercase font-mono">{t.type}</span>
                      </div>
                      <span className={`font-mono font-bold ${t.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                        {t.pnl < 0 ? '-' : '+'}${Math.abs(t.pnl).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#565e73] text-xs py-8">
                  No trades recorded on Jul {selectedDay}.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DISTRIBUTION + RECENT TRADES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Win/Loss Distribution */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#7aa0ff]" />
            Win/Loss Distribution
          </h3>
          
          <div className="flex h-3 rounded-full overflow-hidden bg-[#161b27] mb-6 border border-[#1a2029]">
            <div className="bg-[#00d9a3]" style={{ width: `${winRate || 5}%` }} />
            <div className="bg-[#ff5c7a]" style={{ width: `${100 - (winRate || 5)}%` }} />
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00d9a3]" />
                <span className="text-[#565e73]">Gross Profit</span>
              </div>
              <span className="font-mono font-semibold text-[#00d9a3]">${grossProfit.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#ff5c7a]" />
                <span className="text-[#565e73]">Gross Loss</span>
              </div>
              <span className="font-mono font-semibold text-[#ff5c7a]">-${grossLoss.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#1a2029]">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#7aa0ff]" />
                <span className="text-[#565e73]">Net Result</span>
              </div>
              <span className={`font-mono font-bold ${totalPnL < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                {totalPnL < 0 ? '-' : '+'}${Math.abs(totalPnL).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7aa0ff]" />
            Recent Trades
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Your last trades</p>

          <div className="flex flex-col gap-3">
            {trades.slice(0, 3).map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-[#161b27] border border-[#1a2029]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    t.type === 'long' ? 'bg-[#00d9a3]/15 text-[#00d9a3]' : 'bg-[#ff5c7a]/15 text-[#ff5c7a]'
                  }`}>
                    {t.type === 'long' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-[#eef1f8] block">{t.symbol}</span>
                    <span className="text-[10px] text-[#565e73]">Jul 30</span>
                  </div>
                </div>
                <span className={`font-mono font-bold text-xs ${t.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                  {t.pnl < 0 ? '-' : '+'}${Math.abs(t.pnl).toFixed(2)}
                </span>
              </div>
            ))}
            {trades.length === 0 && (
              <div className="text-center text-xs text-[#565e73] py-4">No recent trades</div>
            )}
          </div>
        </div>
      </section>

      {/* YOUR STATS */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8]">Your Stats</h3>
          <span className="px-2.5 py-1 bg-[#161b27] border border-[#232a3a] rounded text-[10.5px] font-mono font-semibold text-[#8d94a8]">30 Days</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <span className="text-[11px] text-[#565e73] block mb-1">Best Month</span>
            <span className="font-mono text-lg font-bold text-[#ff5c7a] block leading-tight">-$692.00</span>
            <span className="text-[10px] text-[#565e73]">Jul 2026</span>
          </div>
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <span className="text-[11px] text-[#565e73] block mb-1">Worst Month</span>
            <span className="font-mono text-lg font-bold text-[#ff5c7a] block leading-tight">-$692.00</span>
            <span className="text-[10px] text-[#565e73]">Jul 2026</span>
          </div>
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
            <span className="text-[11px] text-[#565e73] block mb-1">Average</span>
            <span className="font-mono text-lg font-bold text-[#ff5c7a] block leading-tight">-$692.00</span>
            <span className="text-[10px] text-[#565e73]">per Month</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
          <div className="flex flex-col">
            {[
              { label: 'Total P&L', value: `-$692.00`, isNeg: true },
              { label: 'Average daily volume', value: '2.00' },
              { label: 'Average winning trade', value: '$0.00', isPos: true },
              { label: 'Average losing trade', value: '-$346.00', isNeg: true },
              { label: 'Total number of trades', value: '2' },
              { label: 'Number of winning trades', value: '0', isPos: true },
              { label: 'Number of losing trades', value: '2', isNeg: true },
              { label: 'Number of break-even trades', value: '0' },
              { label: 'Max consecutive wins', value: '0', isPos: true },
              { label: 'Max consecutive losses', value: '2', isNeg: true },
              { label: 'Total commissions', value: '$0.00' },
              { label: 'Total swap', value: '$0.00' },
              { label: 'Largest profit', value: '$0.00', isPos: true },
              { label: 'Largest loss', value: '-$440.00', isNeg: true },
              { label: 'Avg hold time (All)', value: '1d 6h' },
              { label: 'Avg hold time (Winners)', value: '—' },
              { label: 'Avg hold time (Losers)', value: '1d 6h' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#1a2029] last:border-0 text-xs">
                <span className="text-[#565e73]">{stat.label}</span>
                <span className={`font-mono font-semibold ${stat.isPos ? 'text-[#00d9a3]' : stat.isNeg ? 'text-[#ff5c7a]' : 'text-[#eef1f8]'}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col">
            {[
              { label: 'Open trades', value: '0' },
              { label: 'Total trading days', value: '1' },
              { label: 'Winning days', value: '0', isPos: true },
              { label: 'Losing days', value: '1', isNeg: true },
              { label: 'Breakeven days', value: '0' },
              { label: 'Max consecutive winning days', value: '0', isPos: true },
              { label: 'Max consecutive losing days', value: '1', isNeg: true },
              { label: 'Average daily P&L', value: '-$692.00', isNeg: true },
              { label: 'Average winning day P&L', value: '$0.00', isPos: true },
              { label: 'Average losing day P&L', value: '-$692.00', isNeg: true },
              { label: 'Largest profitable day', value: '$0.00', isPos: true },
              { label: 'Largest losing day', value: '-$692.00', isNeg: true },
              { label: 'Trade expectancy', value: '-$346.00', isNeg: true },
              { label: 'Max drawdown', value: '-$692.00', isNeg: true },
              { label: 'Max drawdown %', value: '0%', isNeg: true },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#1a2029] last:border-0 text-xs">
                <span className="text-[#565e73]">{stat.label}</span>
                <span className={`font-mono font-semibold ${stat.isPos ? 'text-[#00d9a3]' : stat.isNeg ? 'text-[#ff5c7a]' : 'text-[#eef1f8]'}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
