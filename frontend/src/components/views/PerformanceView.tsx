import React, { useState, useMemo } from 'react';
import {
  TrendingUp, DollarSign, Target, BarChart2, Check, X, Clock,
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  ArrowUpRight, ArrowDownRight, Activity, List, Globe
} from 'lucide-react';
import { Trade } from '../../types';

interface PerformanceViewProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
}

function fmt(num: number): string {
  if (isNaN(num)) return '$0.00';
  const abs = Math.abs(num);
  const sign = num < 0 ? '-' : '+';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 100_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

function fmtDuration(ms: number): string {
  if (!ms || ms <= 0) return '—';
  const h = Math.floor(ms / 3600000);
  const d = Math.floor(h / 24);
  const rem = h % 24;
  if (d > 0) return `${d}d ${rem}h`;
  return `${h}h`;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const PerformanceView: React.FC<PerformanceViewProps> = ({ trades, onSelectTrade }) => {
  const [timePeriod, setTimePeriod] = useState<'Today'|'7 Days'|'30 Days'|'3 Months'|'1 Year'|'All Time'>('All Time');
  const [filterType, setFilterType] = useState<'All Trades'|'Winners'|'Losers'>('All Trades');
  const [ecTab, setEcTab] = useState<'Equity'|'Drawdown'>('Equity');

  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());

  // ── Period filter ──────────────────────────────────────────────────────────
  const periodFilteredTrades = useMemo(() => trades.filter(t => {
    if (!t.openTime) return false;
    const d = new Date(t.openTime);
    if (isNaN(d.getTime())) return false;
    const diffDays = (now.getTime() - d.getTime()) / 86400000;
    if (timePeriod === 'Today') return d.toDateString() === now.toDateString();
    if (timePeriod === '7 Days') return diffDays <= 7;
    if (timePeriod === '30 Days') return diffDays <= 30;
    if (timePeriod === '3 Months') return diffDays <= 90;
    if (timePeriod === '1 Year') return diffDays <= 365;
    return true;
  }), [trades, timePeriod]);

  // ── Winner/loser filter ────────────────────────────────────────────────────
  const filteredTrades = useMemo(() => periodFilteredTrades.filter(t => {
    const pnl = Number(t.pnl || 0);
    if (filterType === 'Winners') return pnl > 0;
    if (filterType === 'Losers') return pnl < 0;
    return true;
  }), [periodFilteredTrades, filterType]);

  // ── Core metrics ───────────────────────────────────────────────────────────
  const totalPnL    = filteredTrades.reduce((a, t) => a + Number(t.pnl || 0), 0);
  const winners     = filteredTrades.filter(t => Number(t.pnl || 0) > 0);
  const losers      = filteredTrades.filter(t => Number(t.pnl || 0) < 0);
  const breakevenT  = filteredTrades.filter(t => Number(t.pnl || 0) === 0);
  const winRate     = filteredTrades.length > 0 ? (winners.length / filteredTrades.length) * 100 : 0;
  const grossProfit = winners.reduce((a, t) => a + Number(t.pnl || 0), 0);
  const grossLoss   = Math.abs(losers.reduce((a, t) => a + Number(t.pnl || 0), 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
  const expectancy  = filteredTrades.length > 0 ? totalPnL / filteredTrades.length : 0;
  const avgWin      = winners.length > 0 ? grossProfit / winners.length : 0;
  const avgLoss     = losers.length > 0 ? grossLoss / losers.length : 0;
  const bestTrade   = filteredTrades.length > 0 ? Math.max(...filteredTrades.map(t => Number(t.pnl || 0))) : 0;
  const worstTrade  = filteredTrades.length > 0 ? Math.min(...filteredTrades.map(t => Number(t.pnl || 0))) : 0;
  const rr          = avgWin > 0 && avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : '—';

  // ── Streaks ────────────────────────────────────────────────────────────────
  const sortedTrades = useMemo(() => [...filteredTrades].sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime()), [filteredTrades]);
  let curWin = 0, maxWin = 0, curLoss = 0, maxLoss = 0;
  sortedTrades.forEach(t => {
    const p = Number(t.pnl || 0);
    if (p > 0) { curWin++; maxWin = Math.max(maxWin, curWin); curLoss = 0; }
    else if (p < 0) { curLoss++; maxLoss = Math.max(maxLoss, curLoss); curWin = 0; }
  });

  // ── Direction stats ────────────────────────────────────────────────────────
  const longs  = filteredTrades.filter(t => t.type === 'long');
  const shorts = filteredTrades.filter(t => t.type === 'short');
  const longPnL  = longs.reduce((a, t) => a + Number(t.pnl || 0), 0);
  const shortPnL = shorts.reduce((a, t) => a + Number(t.pnl || 0), 0);
  const longWR  = longs.length > 0 ? (longs.filter(t => Number(t.pnl) > 0).length / longs.length) * 100 : 0;
  const shortWR = shorts.length > 0 ? (shorts.filter(t => Number(t.pnl) > 0).length / shorts.length) * 100 : 0;

  // ── Day of week ────────────────────────────────────────────────────────────
  const dayStats: Record<string, { pnl: number; count: number }> = {
    Mon:{pnl:0,count:0}, Tue:{pnl:0,count:0}, Wed:{pnl:0,count:0},
    Thu:{pnl:0,count:0}, Fri:{pnl:0,count:0}, Sat:{pnl:0,count:0}, Sun:{pnl:0,count:0}
  };
  const dayKeys = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  filteredTrades.forEach(t => {
    if (!t.openTime) return;
    const d = new Date(t.openTime);
    if (isNaN(d.getTime())) return;
    const name = dayKeys[d.getDay()];
    if (dayStats[name]) { dayStats[name].pnl += Number(t.pnl||0); dayStats[name].count += 1; }
  });
  const maxDayAbs = Math.max(1, ...Object.values(dayStats).map(d => Math.abs(d.pnl)));

  // ── Top Symbols ────────────────────────────────────────────────────────────
  const symMap: Record<string,{pnl:number;count:number;wins:number}> = {};
  filteredTrades.forEach(t => {
    const s = t.symbol || 'UNKNOWN';
    if (!symMap[s]) symMap[s] = {pnl:0,count:0,wins:0};
    const p = Number(t.pnl||0);
    symMap[s].pnl += p; symMap[s].count += 1;
    if (p > 0) symMap[s].wins += 1;
  });
  const topSymbols = Object.entries(symMap).map(([symbol,d]) => ({symbol,...d})).sort((a,b) => b.pnl - a.pnl);

  // ── Sessions ───────────────────────────────────────────────────────────────
  const sessions = { ASIAN:{pnl:0,count:0,wins:0}, LONDON:{pnl:0,count:0,wins:0}, NY:{pnl:0,count:0,wins:0} };
  filteredTrades.forEach(t => {
    if (!t.openTime) return;
    const h = new Date(t.openTime).getUTCHours();
    const p = Number(t.pnl||0);
    const s: 'ASIAN'|'LONDON'|'NY' = h >= 8 && h < 13 ? 'LONDON' : h >= 13 && h < 22 ? 'NY' : 'ASIAN';
    sessions[s].pnl += p; sessions[s].count += 1;
    if (p > 0) sessions[s].wins += 1;
  });
  const totalSessionTrades = sessions.ASIAN.count + sessions.LONDON.count + sessions.NY.count || 1;

  // ── Calendar ───────────────────────────────────────────────────────────────
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayJS  = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
  const calOffset   = firstDayJS; // Sun-first (matching template)

  const calDayMap: Record<number,{pnl:number;count:number;trades:Trade[]}> = {};
  filteredTrades.forEach(t => {
    if (!t.openTime) return;
    const d = new Date(t.openTime);
    if (isNaN(d.getTime())) return;
    if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
      const day = d.getDate();
      if (!calDayMap[day]) calDayMap[day] = {pnl:0,count:0,trades:[]};
      calDayMap[day].pnl += Number(t.pnl||0);
      calDayMap[day].count += 1;
      calDayMap[day].trades.push(t);
    }
  });
  const selDayData = selectedDay ? calDayMap[selectedDay] : null;

  const handlePrevMonth = () => { if (currentMonth===0){setCurrentMonth(11);setCurrentYear(y=>y-1);}else setCurrentMonth(m=>m-1); };
  const handleNextMonth = () => { if (currentMonth===11){setCurrentMonth(0);setCurrentYear(y=>y+1);}else setCurrentMonth(m=>m+1); };

  // ── Equity Curve SVG points ────────────────────────────────────────────────
  const equityCurvePoints = useMemo(() => {
    if (sortedTrades.length < 2) return null;
    const pts: number[] = [];
    let cum = 0;
    for (const t of sortedTrades) {
      cum += Number(t.pnl || 0);
      pts.push(cum);
    }
    const min = Math.min(0,...pts), max = Math.max(0,...pts);
    const range = max - min || 1;
    const toY = (v: number) => 210 - ((v-min)/range)*180;
    const toX = (i: number) => (i/(pts.length-1))*700;
    return { pts, min, max, toX, toY };
  }, [sortedTrades]);

  // ── Drawdown Curve ─────────────────────────────────────────────────────────
  const drawdownPoints = useMemo(() => {
    if (sortedTrades.length < 2) return null;
    const dds: number[] = [];
    let cum = 0, peak = 0;
    for (const t of sortedTrades) {
      cum += Number(t.pnl || 0);
      peak = Math.max(peak, cum);
      dds.push(peak > 0 ? ((cum - peak) / peak) * 100 : 0);
    }
    const min = Math.min(...dds), max = 0;
    const range = max - min || 1;
    const toY = (v: number) => 30 + ((max-v)/range)*180;
    const toX = (i: number) => (i/(dds.length-1))*700;
    return { pts: dds, toX, toY };
  }, [sortedTrades]);

  // ── Monthly stats for "Your Stats" ─────────────────────────────────────────
  const monthlyPnLMap: Record<string, number> = {};
  filteredTrades.forEach(t => {
    if (!t.openTime) return;
    const d = new Date(t.openTime);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    monthlyPnLMap[key] = (monthlyPnLMap[key] || 0) + Number(t.pnl||0);
  });
  const monthlyEntries = Object.entries(monthlyPnLMap);
  const bestMonthEntry  = monthlyEntries.reduce<[string,number]|null>((best,e) => !best||e[1]>best[1]?e:best, null);
  const worstMonthEntry = monthlyEntries.reduce<[string,number]|null>((worst,e) => !worst||e[1]<worst[1]?e:worst, null);
  const avgMonthPnL = monthlyEntries.length > 0 ? monthlyEntries.reduce((a,e)=>a+e[1],0)/monthlyEntries.length : 0;

  const fmtMonthKey = (key: string|null) => {
    if (!key) return '—';
    const [y,m] = key.split('-');
    return `${MONTH_NAMES[parseInt(m)-1].slice(0,3)} ${y}`;
  };

  // ── Hold time stats ────────────────────────────────────────────────────────
  const holdTimes = filteredTrades
    .filter(t => t.openTime && t.closeTime)
    .map(t => new Date(t.closeTime).getTime() - new Date(t.openTime).getTime())
    .filter(ms => ms > 0);
  const avgHoldAll     = holdTimes.length > 0 ? holdTimes.reduce((a,b)=>a+b,0)/holdTimes.length : 0;
  const winHoldTimes   = winners.filter(t=>t.openTime&&t.closeTime).map(t=>new Date(t.closeTime).getTime()-new Date(t.openTime).getTime()).filter(ms=>ms>0);
  const lossHoldTimes  = losers.filter(t=>t.openTime&&t.closeTime).map(t=>new Date(t.closeTime).getTime()-new Date(t.openTime).getTime()).filter(ms=>ms>0);
  const avgHoldWin     = winHoldTimes.length > 0 ? winHoldTimes.reduce((a,b)=>a+b,0)/winHoldTimes.length : 0;
  const avgHoldLoss    = lossHoldTimes.length > 0 ? lossHoldTimes.reduce((a,b)=>a+b,0)/lossHoldTimes.length : 0;

  // Trading days
  const tradingDays = new Set(filteredTrades.map(t => t.openTime ? new Date(t.openTime).toDateString() : null).filter(Boolean)).size;
  const winDays     = new Set(winners.map(t => t.openTime ? new Date(t.openTime).toDateString() : null).filter(Boolean)).size;
  const lossDays    = new Set(losers.map(t => t.openTime ? new Date(t.openTime).toDateString() : null).filter(Boolean)).size;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">

      {/* ── HEADER + FILTERS ─────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold tracking-tight text-[#eef1f8] flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#7aa0ff]" />
            Performance Analytics
          </h1>
          <p className="text-xs text-[#565e73] mt-1">Realtime analytics calculated from {filteredTrades.length} trades</p>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div>
            <label className="text-[10.5px] font-semibold text-[#565e73] tracking-wider uppercase block mb-1">Time Period</label>
            <div className="flex items-center gap-0.5 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl flex-wrap">
              {(['Today','7 Days','30 Days','3 Months','1 Year','All Time'] as const).map(p => (
                <button key={p} onClick={() => setTimePeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${timePeriod===p?'bg-[#2981eb] text-white shadow-md':'text-[#565e73] hover:text-[#8d94a8]'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10.5px] font-semibold text-[#565e73] tracking-wider uppercase block mb-1">Filter By</label>
            <div className="flex items-center gap-0.5 bg-[#161b27] border border-[#232a3a] p-1 rounded-xl">
              <button onClick={() => setFilterType('All Trades')} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${filterType==='All Trades'?'bg-[#2981eb] text-white':'text-[#565e73]'}`}>All Trades</button>
              <button onClick={() => setFilterType('Winners')} className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${filterType==='Winners'?'bg-[#00d9a3]/20 text-[#00d9a3] border border-[#00d9a3]/30':'text-[#565e73]'}`}><Check className="w-3.5 h-3.5"/>Winners</button>
              <button onClick={() => setFilterType('Losers')} className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${filterType==='Losers'?'bg-[#ff5c7a]/20 text-[#ff5c7a] border border-[#ff5c7a]/30':'text-[#565e73]'}`}><X className="w-3.5 h-3.5"/>Losers</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS GRID ─────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(76,125,255,.18),transparent_70%)] pointer-events-none"/>
          <div className="w-9 h-9 rounded-xl bg-[#4c7dff]/15 text-[#7aa0ff] flex items-center justify-center mb-3"><DollarSign className="w-4.5 h-4.5"/></div>
          <span className="text-xs text-[var(--text-mid)] font-medium block mb-1">Total P&L</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block truncate ${totalPnL<0?'text-[#ef4b5c]':'text-[#22c58b]'}`}>{fmt(totalPnL)}</span>
          <div className="text-xs text-[var(--text-low)] mt-2">From {filteredTrades.length} closed trades</div>
          <div className="text-[11px] text-[var(--text-low)] mt-2 pt-2 border-t border-[var(--border-soft)]">Your net profit/loss for the selected period</div>
        </div>

        <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center mb-3"><Target className="w-4.5 h-4.5"/></div>
          <span className="text-xs text-[var(--text-mid)] font-medium block mb-1">Win Rate</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block ${winRate>=50?'text-[#22c58b]':'text-[#ef4b5c]'}`}>{winRate.toFixed(1)}%</span>
          <div className="text-xs text-[var(--text-low)] mt-1">{winners.length} wins • {losers.length} losses</div>
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-elevated)] mt-3 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]" style={{width:`${winRate}%`}}/>
          </div>
          <div className="text-[11px] text-[var(--text-low)] mt-2 pt-2 border-t border-[var(--border-soft)]">Percentage of profitable trades</div>
        </div>

        <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#f2b84b]/15 text-[#f2b84b] flex items-center justify-center mb-3"><BarChart2 className="w-4.5 h-4.5"/></div>
          <span className="text-xs text-[var(--text-mid)] font-medium block mb-1">Profit Factor</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block ${profitFactor>=1?'text-[#22c58b]':'text-[#ef4b5c]'}`}>{profitFactor===Infinity?'∞':profitFactor.toFixed(2)}</span>
          <div className="text-xs text-[var(--text-low)] mt-1">{profitFactor<1?'⚠ Needs work':'✓ Good ratio'}</div>
          <div className="text-[11px] text-[var(--text-low)] mt-2 pt-2 border-t border-[var(--border-soft)]">Gross profit ÷ gross loss (above 1.5 is good)</div>
        </div>

        <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-[#22c58b]/15 text-[#22c58b] flex items-center justify-center mb-3"><Activity className="w-4.5 h-4.5"/></div>
          <span className="text-xs text-[var(--text-mid)] font-medium block mb-1">Expectancy</span>
          <span className={`font-mono text-2xl font-semibold tracking-tight block truncate ${expectancy<0?'text-[#ef4b5c]':'text-[#22c58b]'}`}>{fmt(expectancy)}</span>
          <div className="text-xs text-[var(--text-low)] mt-1">Average per trade</div>
          <div className="text-[11px] text-[var(--text-low)] mt-2 pt-2 border-t border-[var(--border-soft)]">Expected profit per trade based on your stats</div>
        </div>
      </section>

      {/* ── QUICK STATS + EQUITY CURVE ───────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)] flex items-center gap-2 mb-1">
            <List className="w-4 h-4 text-[#7aa0ff]"/> Quick Stats
          </h3>
          <p className="text-xs text-[var(--text-low)] mb-4">Key trading metrics at a glance</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {label:'Avg Winner',   val: avgWin > 0   ? `+$${avgWin.toFixed(2)}`  : '$0.00',   pos: true},
              {label:'Avg Loser',    val: avgLoss > 0  ? `-$${avgLoss.toFixed(2)}` : '$0.00',   pos: false},
              {label:'Best Trade',   val: bestTrade >= 0 ? `+$${bestTrade.toFixed(2)}` : `-$${Math.abs(bestTrade).toFixed(2)}`, pos: bestTrade >= 0},
              {label:'Worst Trade',  val: `-$${Math.abs(worstTrade).toFixed(2)}`,   pos: false},
              {label:'Win Streak',   val: `${maxWin} trades`,  pos: maxWin > 0},
              {label:'Loss Streak',  val: `${maxLoss} trades`, pos: false},
              {label:'Risk:Reward',  val: rr !== '—' ? `1:${rr}` : '—',             pos: false},
              {label:'Open Trades',  val: `0`,                                       pos: null},
            ].map(({label,val,pos}) => (
              <div key={label} className="bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl p-3">
                <span className="text-[10.5px] text-[var(--text-low)] block mb-1">{label}</span>
                <span className={`font-mono text-sm font-semibold truncate block ${pos===true?'text-[#22c58b]':pos===false?'text-[#ef4b5c]':'text-[var(--text-hi)]'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equity Curve */}
        <div className="lg:col-span-3 bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)] flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#7aa0ff]"/> Equity Curve
              </h3>
              <p className="text-xs text-[var(--text-low)]">Cumulative P&L progression</p>
            </div>
            <div className="flex items-center gap-1 bg-[var(--bg-elevated)] border border-[var(--border-soft)] p-1 rounded-lg">
              {(['Equity','Drawdown'] as const).map(tab => (
                <button key={tab} onClick={() => setEcTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${ecTab===tab?'bg-[#2981eb] text-white':'text-[var(--text-mid)] hover:text-[var(--text-hi)]'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[230px]">
            {filteredTrades.length < 2 ? (
              <div className="h-full flex items-center justify-center text-xs text-[#565e73]">Import trades to see equity curve</div>
            ) : ecTab === 'Equity' && equityCurvePoints ? (
              <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ecGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={totalPnL<0?'#ff5c7a':'#00d9a3'} stopOpacity="0.25"/>
                    <stop offset="100%" stopColor={totalPnL<0?'#ff5c7a':'#00d9a3'} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {[40,80,130,180].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#1a2029" strokeWidth="1"/>)}
                {(() => {
                  const {pts,toX,toY} = equityCurvePoints;
                  const d = pts.map((p,i) => `${i===0?'M':'L'}${toX(i).toFixed(1)},${toY(p).toFixed(1)}`).join(' ');
                  const lx = toX(pts.length-1), ly = toY(pts[pts.length-1]);
                  const color = totalPnL < 0 ? '#ff5c7a' : '#00d9a3';
                  return (<>
                    <path d={`${d} L${lx},215 L0,215 Z`} fill="url(#ecGrad)"/>
                    <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx={lx} cy={ly} r="5" fill="#10141d" stroke={color} strokeWidth="2.5"/>
                    <text x="4" y="14" fill="#565e73" fontSize="10" fontFamily="monospace">
                      {fmt(equityCurvePoints.max)}
                    </text>
                    <text x="4" y="226" fill="#565e73" fontSize="10" fontFamily="monospace">
                      {fmt(equityCurvePoints.min)}
                    </text>
                  </>);
                })()}
              </svg>
            ) : drawdownPoints ? (
              <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff5c7a" stopOpacity="0.22"/>
                    <stop offset="100%" stopColor="#ff5c7a" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {[50,100,150,200].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#1a2029" strokeWidth="1"/>)}
                {(() => {
                  const {pts,toX,toY} = drawdownPoints;
                  if (pts.length < 2) return null;
                  const d = pts.map((p,i) => `${i===0?'M':'L'}${toX(i).toFixed(1)},${toY(p).toFixed(1)}`).join(' ');
                  const lx = toX(pts.length-1), ly = toY(pts[pts.length-1]);
                  return (<>
                    <path d={`${d} L${lx},215 L0,${toY(pts[0])} Z`} fill="url(#ddGrad)"/>
                    <path d={d} fill="none" stroke="#ff5c7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx={lx} cy={ly} r="5" fill="#10141d" stroke="#ff5c7a" strokeWidth="2.5"/>
                    <text x="4" y="14" fill="#565e73" fontSize="10" fontFamily="monospace">0%</text>
                    <text x="4" y="226" fill="#565e73" fontSize="10" fontFamily="monospace">{Math.min(...pts).toFixed(1)}%</text>
                  </>);
                })()}
              </svg>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#565e73]">No drawdown data</div>
            )}
          </div>
        </div>
      </section>

      {/* ── THREE-COL: Long/Short · Day Performance · Top Symbols ─────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Long vs Short */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#7aa0ff]"/> Long vs Short
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Performance by trade direction</p>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-3.5 border border-[#00d9a3]/22 bg-[#161b27]">
              <div className="flex items-center gap-2 mb-3 text-[#00d9a3]">
                <ArrowUpRight className="w-4 h-4"/><span className="font-semibold text-xs">Long ({longs.length})</span>
              </div>
              <div className="flex justify-between gap-2 text-xs">
                <div><span className="text-[10.5px] text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">{longs.length}</span></div>
                <div><span className="text-[10.5px] text-[#565e73] block">P&L</span><span className={`font-mono font-semibold truncate block ${longPnL<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(longPnL)}</span></div>
                <div><span className="text-[10.5px] text-[#565e73] block">Win%</span><span className="font-mono font-semibold text-[#eef1f8]">{longWR.toFixed(1)}%</span></div>
              </div>
            </div>
            <div className="rounded-xl p-3.5 border border-[#ff5c7a]/22 bg-[#161b27]">
              <div className="flex items-center gap-2 mb-3 text-[#ff5c7a]">
                <ArrowDownRight className="w-4 h-4"/><span className="font-semibold text-xs">Short ({shorts.length})</span>
              </div>
              <div className="flex justify-between gap-2 text-xs">
                <div><span className="text-[10.5px] text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">{shorts.length}</span></div>
                <div><span className="text-[10.5px] text-[#565e73] block">P&L</span><span className={`font-mono font-semibold truncate block ${shortPnL<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(shortPnL)}</span></div>
                <div><span className="text-[10.5px] text-[#565e73] block">Win%</span><span className="font-mono font-semibold text-[#eef1f8]">{shortWR.toFixed(1)}%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Performance Bars */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
            <CalendarIcon className="w-4 h-4 text-[#7aa0ff]"/> Day Performance
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Find your best trading days</p>
          <div className="flex flex-col gap-2.5">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => {
              const d = dayStats[day] || {pnl:0,count:0};
              const barPct = d.count > 0 ? Math.round((Math.abs(d.pnl)/maxDayAbs)*100) : 0;
              return (
                <div key={day} className="flex items-center gap-2.5 text-xs">
                  <span className="text-[#565e73] w-8 font-medium">{day}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#161b27] overflow-hidden">
                    <div className={`h-full rounded-full ${d.pnl<0?'bg-gradient-to-r from-[#b8324a] to-[#ff5c7a]':'bg-gradient-to-r from-[#0a8f6c] to-[#00d9a3]'}`} style={{width:`${barPct}%`}}/>
                  </div>
                  <span className={`font-mono text-xs font-semibold w-24 text-right truncate ${d.pnl<0?'text-[#ff5c7a]':d.pnl>0?'text-[#00d9a3]':'text-[#565e73]'}`}>
                    {d.count>0?fmt(d.pnl):'—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Symbols */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-[#7aa0ff]"/> Top Symbols
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Best performing assets</p>
          <div className="flex flex-col divide-y divide-[#1a2029]">
            {topSymbols.length === 0 ? (
              <div className="text-center text-[#565e73] text-xs py-8">No asset data yet.</div>
            ) : topSymbols.slice(0,7).map((item, idx) => (
              <div key={item.symbol} className="py-2.5 flex items-center gap-2.5">
                <span className="font-mono text-xs text-[#565e73] w-4">#{idx+1}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-xs text-[#eef1f8] block truncate">{item.symbol}</span>
                  <span className="text-[10.5px] text-[#565e73]">{item.count} trade{item.count!==1?'s':''} • {item.count>0?((item.wins/item.count)*100).toFixed(0):0}% win</span>
                </div>
                <span className={`font-mono text-xs font-bold ${item.pnl<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(item.pnl)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SESSION PERFORMANCE ──────────────────────────────────────────── */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-[#7aa0ff]"/> Session Performance
        </h3>
        <p className="text-xs text-[#565e73] mb-4">Breakdown by trading session — Asian, London & New York</p>

        {/* Timeline Bar */}
        <div className="relative h-9 rounded-xl overflow-hidden mb-1 border border-[#1a2029]">
          <div className="absolute inset-0 flex">
            <div className="flex items-center justify-center font-mono text-[10px] font-bold text-[#0a0d14]" style={{width:'33.33%',background:'linear-gradient(90deg,#f2b84b,#f5c96e)'}}>Asian</div>
            <div className="flex items-center justify-center font-mono text-[10px] font-bold text-white" style={{width:'20.83%',background:'linear-gradient(90deg,#7aa0ff,#4c7dff)'}}>London</div>
            <div className="flex items-center justify-center font-mono text-[10px] font-bold text-[#0a0d14]" style={{width:'37.5%',background:'linear-gradient(90deg,#00d9a3,#00b98c)'}}>New York</div>
            <div style={{width:'8.33%',background:'linear-gradient(90deg,#f2b84b,#f5c96e)'}}/>
          </div>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-[#565e73] mb-5">
          <span>00:00</span><span>08:00</span><span>13:00</span><span>22:00</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key:'ASIAN',  label:'Asian',    time:'22:00 – 08:00 UTC', abbr:'AS', color:'#f2b84b', bg:'rgba(242,184,75,.15)' },
            { key:'LONDON', label:'London',   time:'08:00 – 13:00 UTC', abbr:'LD', color:'#7aa0ff', bg:'rgba(122,160,255,.15)' },
            { key:'NY',     label:'New York', time:'13:00 – 22:00 UTC', abbr:'NY', color:'#00d9a3', bg:'rgba(0,217,163,.15)' },
          ].map(({key,label,time,abbr,color,bg}) => {
            const s = sessions[key as keyof typeof sessions];
            const vol = s.count > 0 ? Math.round((s.count/totalSessionTrades)*100) : 0;
            const pnlBarPct = (() => {
              const maxPnl = Math.max(1,...Object.values(sessions).map(ss=>Math.abs(ss.pnl)));
              return Math.round((Math.abs(s.pnl)/maxPnl)*100);
            })();
            return (
              <div key={key} className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{background:bg,color}}>{abbr}</div>
                  <div>
                    <span className="font-semibold text-xs text-[#eef1f8] block">{label} Session</span>
                    <span className="font-mono text-[10.5px] text-[#565e73]">{time}</span>
                  </div>
                </div>
                <span className={`font-mono text-xl font-bold block mb-1 truncate ${s.pnl<0?'text-[#ff5c7a]':s.pnl>0?'text-[#00d9a3]':'text-[#565e73]'}`}>{s.count>0?fmt(s.pnl):'—'}</span>
                <div className="w-full h-1.5 rounded-full bg-[#1c2230] overflow-hidden mb-3">
                  <div className={`h-full rounded-full ${s.pnl<0?'bg-[#ff5c7a]':'bg-[#00d9a3]'}`} style={{width:`${pnlBarPct}%`}}/>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div><span className="text-[#565e73] block">Trades</span><span className="font-mono font-semibold text-[#eef1f8]">{s.count}</span></div>
                  <div><span className="text-[#565e73] block">Win Rate</span><span className="font-mono font-semibold text-[#eef1f8]">{s.count>0?((s.wins/s.count)*100).toFixed(1):0}%</span></div>
                  <div><span className="text-[#565e73] block">Avg Trade</span><span className={`font-mono font-semibold ${s.count>0&&s.pnl<0?'text-[#ff5c7a]':'text-[#eef1f8]'}`}>{s.count>0?fmt(s.pnl/s.count):'—'}</span></div>
                  <div><span className="text-[#565e73] block">Volume</span><span className="font-mono font-semibold text-[#eef1f8]">{vol}%</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MONTHLY CALENDAR ────────────────────────────────────────────── */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#7aa0ff]"/> Monthly P&L Trading Calendar
            </h3>
            <p className="text-xs text-[#565e73]">Browse month/year to view logged trade performance per day</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button onClick={handlePrevMonth} className="p-1.5 rounded-lg bg-[#161b27] border border-[#232a3a] text-[#8d94a8] hover:text-[#eef1f8] transition-colors"><ChevronLeft className="w-4 h-4"/></button>
            <span className="font-semibold text-[#eef1f8] px-3 py-1 bg-[#161b27] rounded-lg border border-[#232a3a]">{MONTH_NAMES[currentMonth]} {currentYear}</span>
            <button onClick={handleNextMonth} className="p-1.5 rounded-lg bg-[#161b27] border border-[#232a3a] text-[#8d94a8] hover:text-[#eef1f8] transition-colors"><ChevronRight className="w-4 h-4"/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10.5px] text-[#565e73] font-semibold mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({length:calOffset}).map((_,i) => <div key={`off-${i}`} className="aspect-[1/0.85]"/>)}
              {Array.from({length:daysInMonth}).map((_,i) => {
                const dayNum = i+1;
                const dd = calDayMap[dayNum];
                const hasTrades = dd && dd.count > 0;
                const isToday = currentYear===now.getFullYear()&&currentMonth===now.getMonth()&&dayNum===now.getDate();
                return (
                  <div key={dayNum} onClick={() => setSelectedDay(dayNum)} className={`aspect-[1/0.85] rounded-xl border p-1.5 text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    selectedDay===dayNum ? 'ring-2 ring-[#7aa0ff] bg-[#161b27] border-[#7aa0ff]/50'
                    : hasTrades
                      ? dd.pnl<0 ? 'bg-[#ff5c7a]/15 border-[#ff5c7a]/40 text-[#eef1f8] hover:bg-[#ff5c7a]/20'
                                 : 'bg-[#00d9a3]/15 border-[#00d9a3]/40 text-[#eef1f8] hover:bg-[#00d9a3]/20'
                      : isToday ? 'border-[#2981eb] bg-[#1c2230] text-[#eef1f8] font-bold'
                                : 'border-[#1a2029] bg-[#161b27] text-[#565e73] hover:border-[#2a2f42]'
                  }`}>
                    <span className="font-mono text-[11px] font-semibold">{dayNum}</span>
                    {hasTrades && (
                      <div className="overflow-hidden">
                        <span className={`block font-mono text-[9px] font-bold truncate ${dd.pnl<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(dd.pnl)}</span>
                        <span className="block text-[8px] text-[#565e73] truncate">{dd.count}t</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1a2029] text-[11px] text-[#565e73]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00d9a3]"/>Profitable Day</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ff5c7a]"/>Losing Day</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#232a3a] border border-[#565e73]"/>No Trades</span>
            </div>
          </div>

          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4 flex flex-col h-full">
            <h4 className="font-semibold text-xs text-[#eef1f8] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7aa0ff]"/>
              Day Trades — {MONTH_NAMES[currentMonth].slice(0,3)} {selectedDay}, {currentYear}
            </h4>
            {selDayData && selDayData.trades.length > 0 ? (
              <div className="flex flex-col gap-2 overflow-y-auto h-[400px] pr-1">
                {selDayData.trades.map(t => (
                  <div key={t.id} onClick={() => onSelectTrade(t)}
                    className="p-2.5 rounded-lg bg-[#10141d] border border-[#232a3a] flex items-center justify-between text-xs cursor-pointer hover:border-[#7aa0ff] transition-colors">
                    <div>
                      <span className="font-semibold text-[#eef1f8] block">{t.symbol}</span>
                      <span className="text-[10px] text-[#565e73] uppercase font-mono">{t.type}</span>
                    </div>
                    <span className={`font-mono font-bold ${Number(t.pnl)<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(Number(t.pnl))}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-[#565e73]">
                <CalendarIcon className="w-8 h-8 opacity-40"/>
                <p className="text-xs">Click on a day with trades to view details</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── WIN/LOSS DISTRIBUTION + RECENT TRADES ────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Win/Loss Distribution */}
        <div className="lg:col-span-2 bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 text-[#7aa0ff]"/> Win/Loss Distribution
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Trade outcome breakdown</p>

          {/* Distribution bar */}
          <div className="flex h-9 rounded-xl overflow-hidden mb-4 border border-[#1a2029]">
            {filteredTrades.length > 0 ? (
              <>
                <div className="flex items-center justify-center font-mono text-[11px] font-bold text-[#0a0d14]"
                  style={{width:`${(winners.length/filteredTrades.length)*100}%`,background:'linear-gradient(90deg,#00d9a3,#00b98c)',minWidth:winners.length>0?'24px':'0'}}>
                  {winners.length > 0 ? `${winners.length}W` : ''}
                </div>
                <div className="flex items-center justify-center font-mono text-[11px] font-bold text-white"
                  style={{width:`${(losers.length/filteredTrades.length)*100}%`,background:'linear-gradient(90deg,#ff5c7a,#e34865)',minWidth:losers.length>0?'24px':'0'}}>
                  {losers.length > 0 ? `${losers.length}L` : ''}
                </div>
                {breakevenT.length > 0 && (
                  <div className="flex items-center justify-center font-mono text-[11px] font-bold text-[#eef1f8]"
                    style={{width:`${(breakevenT.length/filteredTrades.length)*100}%`,background:'#232a3a',minWidth:'24px'}}>
                    {breakevenT.length}B
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 bg-[#161b27] flex items-center justify-center text-xs text-[#565e73]">No data</div>
            )}
          </div>

          <div className="flex flex-col divide-y divide-[#1a2029]">
            {[
              { dot:'bg-[#00d9a3]', label:'Gross Profit',  val: fmt(grossProfit), cls:'text-[#00d9a3]' },
              { dot:'bg-[#ff5c7a]', label:'Gross Loss',    val: `-$${grossLoss.toFixed(2)}`, cls:'text-[#ff5c7a]' },
              { dot:'bg-[#565e73]', label:'Net Result',    val: fmt(totalPnL), cls: totalPnL<0?'text-[#ff5c7a]':'text-[#00d9a3]' },
              { dot:'bg-[#a78bfa]', label:'Winners',       val: `${winners.length}`, cls:'text-[#a78bfa]' },
              { dot:'bg-[#ff5c7a]', label:'Losers',        val: `${losers.length}`, cls:'text-[#ff5c7a]' },
              { dot:'bg-[#565e73]', label:'Breakeven',     val: `${breakevenT.length}`, cls:'text-[#eef1f8]' },
            ].map(({dot,label,val,cls}) => (
              <div key={label} className="flex items-center gap-2.5 py-2.5">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`}/>
                <span className="flex-1 text-xs text-[#8d94a8]">{label}</span>
                <span className={`font-mono text-xs font-semibold ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trades */}
        <div className="lg:col-span-3 bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
          <h3 className="font-sora text-sm font-semibold text-[#eef1f8] flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#7aa0ff]"/> Recent Trades
          </h3>
          <p className="text-xs text-[#565e73] mb-4">Your last 4 trades</p>
          {filteredTrades.length === 0 ? (
            <div className="text-center text-[#565e73] text-xs py-12">No trades in this period.</div>
          ) : (
            <div className="flex flex-col divide-y divide-[#1a2029]">
              {[...filteredTrades]
                .sort((a,b) => new Date(b.openTime).getTime() - new Date(a.openTime).getTime())
                .slice(0,4)
                .map(t => (
                  <div key={t.id} onClick={() => onSelectTrade(t)}
                    className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#161b27]/60 rounded transition-colors px-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type==='long'?'bg-[#00d9a3]/15 text-[#00d9a3]':'bg-[#ff5c7a]/15 text-[#ff5c7a]'}`}>
                      {t.type==='long'?<ArrowUpRight className="w-4 h-4"/>:<ArrowDownRight className="w-4 h-4"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-xs text-[#eef1f8] block truncate">{t.symbol}</span>
                      <span className="text-[11px] text-[#565e73] font-mono">{t.openTime ? t.openTime.slice(0,10) : 'N/A'}</span>
                    </div>
                    <span className={`font-mono text-xs font-bold ${Number(t.pnl)<0?'text-[#ff5c7a]':'text-[#00d9a3]'}`}>{fmt(Number(t.pnl))}</span>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </section>

      {/* ── YOUR STATS ──────────────────────────────────────────────────── */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-sora text-lg font-bold text-[#eef1f8]">Your Stats</h3>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#161b27] border border-[#232a3a] text-[#8d94a8]">{timePeriod}</span>
        </div>

        {/* Monthly summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label:'Best Month',   val: bestMonthEntry  ? fmt(bestMonthEntry[1])  : '—', sub: fmtMonthKey(bestMonthEntry?.[0]??null),  pos: true  },
            { label:'Worst Month',  val: worstMonthEntry ? fmt(worstMonthEntry[1]) : '—', sub: fmtMonthKey(worstMonthEntry?.[0]??null), pos: false },
            { label:'Monthly Avg',  val: monthlyEntries.length > 0 ? fmt(avgMonthPnL) : '—', sub: 'per Month',                         pos: avgMonthPnL >= 0 },
          ].map(({label,val,sub,pos}) => (
            <div key={label} className="bg-[#161b27] border border-[#1a2029] rounded-xl p-4 flex flex-col gap-1.5">
              <span className="text-xs text-[#565e73]">{label}</span>
              <span className={`font-mono text-xl font-semibold truncate ${pos?'text-[#00d9a3]':'text-[#ff5c7a]'}`}>{val}</span>
              <span className="text-xs text-[#565e73]">{sub}</span>
            </div>
          ))}
        </div>

        {/* Detailed stats tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#0e1017] border border-[#1a2029] rounded-xl py-1 px-5">
            {[
              ['Total P&L',                fmt(totalPnL),                     totalPnL>=0],
              ['Avg daily volume',          (filteredTrades.length/(tradingDays||1)).toFixed(2), null],
              ['Average winning trade',     avgWin>0?`+$${avgWin.toFixed(2)}`:'$0.00',           true],
              ['Average losing trade',      avgLoss>0?`-$${avgLoss.toFixed(2)}`:'$0.00',         false],
              ['Total number of trades',    `${filteredTrades.length}`,         null],
              ['Number of winning trades',  `${winners.length}`,                true],
              ['Number of losing trades',   `${losers.length}`,                 false],
              ['Number of break-even',      `${breakevenT.length}`,             null],
              ['Max consecutive wins',      `${maxWin}`,                        true],
              ['Max consecutive losses',    `${maxLoss}`,                       false],
              ['Largest profit',            bestTrade>0?`+$${bestTrade.toFixed(2)}`:'$0.00',     true],
              ['Largest loss',              worstTrade<0?`-$${Math.abs(worstTrade).toFixed(2)}`:'$0.00', false],
              ['Avg hold time (All)',        fmtDuration(avgHoldAll),            null],
              ['Avg hold time (Winners)',    fmtDuration(avgHoldWin),            null],
              ['Avg hold time (Losers)',     fmtDuration(avgHoldLoss),           null],
            ].map(([label,val,pos]) => (
              <div key={label as string} className="flex items-center justify-between py-2.5 border-b border-[#1a2029] last:border-0">
                <span className="text-xs text-[#8d94a8]">{label as string}</span>
                <span className={`font-mono text-xs font-semibold ${pos===true?'text-[#00d9a3]':pos===false?'text-[#ff5c7a]':'text-[#eef1f8]'}`}>{val as string}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0e1017] border border-[#1a2029] rounded-xl py-1 px-5">
            {[
              ['Open trades',               '0',                               null],
              ['Total trading days',        `${tradingDays}`,                  null],
              ['Winning days',              `${winDays}`,                      true],
              ['Losing days',               `${lossDays}`,                     false],
              ['Breakeven days',            `${tradingDays-winDays-lossDays}`, null],
              ['Profit factor',             profitFactor===Infinity?'∞':profitFactor.toFixed(2), profitFactor>=1],
              ['Expectancy per trade',      fmt(expectancy),                   expectancy>=0],
              ['Gross profit',              `+$${grossProfit.toFixed(2)}`,     true],
              ['Gross loss',                `-$${grossLoss.toFixed(2)}`,       false],
              ['Win rate',                  `${winRate.toFixed(1)}%`,          winRate>=50],
              ['Long positions',            `${longs.length}`,                 null],
              ['Short positions',           `${shorts.length}`,                null],
              ['Long P&L',                  fmt(longPnL),                      longPnL>=0],
              ['Short P&L',                 fmt(shortPnL),                     shortPnL>=0],
              ['Risk:Reward',               rr!=='—'?`1:${rr}`:'—',           null],
            ].map(([label,val,pos]) => (
              <div key={label as string} className="flex items-center justify-between py-2.5 border-b border-[#1a2029] last:border-0">
                <span className="text-xs text-[#8d94a8]">{label as string}</span>
                <span className={`font-mono text-xs font-semibold ${pos===true?'text-[#00d9a3]':pos===false?'text-[#ff5c7a]':'text-[#eef1f8]'}`}>{val as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
