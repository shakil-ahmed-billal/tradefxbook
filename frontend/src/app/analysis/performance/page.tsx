'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function PerformanceAnalyticsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[264px_1fr] min-h-screen bg-[#0a0d14] text-[#eef1f8]">
      <Sidebar />
      <div className="flex flex-col min-w-0">
        <Topbar title="Performance Analytics" />

        <div className="content p-[26px_32px_60px]">
          {/* HEADER + FILTERS */}
          <section className="flex items-start justify-between gap-6 mb-[22px] flex-wrap">
            <div>
              <h1 className="flex items-center gap-[10px] font-[family-name:var(--font-sora)] text-[22px] font-bold tracking-[-0.01em]">
                <svg className="w-[22px] h-[22px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
                Performance Analytics
              </h1>
              <p className="text-[13px] text-[#565e73] mt-[5px]">Analyze your trading patterns and improve your strategy</p>
            </div>
            <div className="flex gap-5 flex-wrap">
              <div>
                <label className="text-[10.5px] text-[#565e73] tracking-[.08em] uppercase font-semibold block mb-2">Time Period</label>
                <div className="flex gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-[9px]">
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#565e73] cursor-pointer">Today</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#565e73] cursor-pointer">7 Days</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] bg-[#1c2230] text-[#eef1f8] cursor-pointer">30 Days</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#565e73] cursor-pointer">3 Months</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#565e73] cursor-pointer">1 Year</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#565e73] cursor-pointer">All Time</div>
                </div>
              </div>
              <div>
                <label className="text-[10.5px] text-[#565e73] tracking-[.08em] uppercase font-semibold block mb-2">Filter By</label>
                <div className="flex gap-1 bg-[#161b27] border border-[#232a3a] p-1 rounded-[9px]">
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] bg-[#1c2230] text-[#eef1f8] cursor-pointer">All Trades</div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#00d9a3] hover:bg-[rgba(0,217,163,0.12)] cursor-pointer flex items-center gap-1.5">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.8 10A10 10 0 1 1 17 3.34"></path><path d="m9 11 3 3L22 4"></path></svg>Winners
                  </div>
                  <div className="text-[12px] font-semibold py-[6px] px-3 rounded-[6px] text-[#ff5c7a] hover:bg-[rgba(255,92,122,0.12)] cursor-pointer flex items-center gap-1.5">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>Losers
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(76,125,255,.14)] text-[#7aa0ff] flex items-center justify-center mb-[14px]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Total P&amp;L</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-semibold tracking-[-0.01em] text-[#ff5c7a] block">-$692.00</span>
              <div className="text-[12px] text-[#565e73] mt-[6px]">From 2 closed trades</div>
              <div className="text-[11px] text-[#565e73] mt-3 pt-3 border-t border-[#1a2029]">Your net profit/loss for the selected period</div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(167,139,250,0.14)] text-[#a78bfa] flex items-center justify-center mb-[14px]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 12l2 2 4-4"></path></svg>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Win Rate</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-semibold tracking-[-0.01em] text-[#ff5c7a] block">0.0%</span>
              <div className="text-[12px] text-[#565e73] mt-[6px]">0 wins • 2 losses</div>
              <div className="h-[5px] rounded-[3px] bg-[#1c2230] mt-3 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd]" style={{ width: '0%' }} /></div>
              <div className="text-[11px] text-[#565e73] mt-3 pt-3 border-t border-[#1a2029]">Percentage of profitable trades</div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(242,184,75,.14)] text-[#f2b84b] flex items-center justify-center mb-[14px]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Profit Factor</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-semibold tracking-[-0.01em] text-[#ff5c7a] block">0.00</span>
              <div className="text-[12px] text-[#565e73] mt-[6px] flex items-center gap-1.5"><svg className="w-[13px] h-[13px] text-[#f2b84b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg> Needs work</div>
              <div className="text-[11px] text-[#565e73] mt-3 pt-3 border-t border-[#1a2029]">Gross profit ÷ gross loss (above 1.5 is good)</div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3] flex items-center justify-center mb-[14px]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path d="M9 12l2 2 4-4"></path></svg>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Expectancy</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-semibold tracking-[-0.01em] text-[#ff5c7a] block">-$346.00</span>
              <div className="text-[12px] text-[#565e73] mt-[6px]">Average per trade</div>
              <div className="text-[11px] text-[#565e73] mt-3 pt-3 border-t border-[#1a2029]">Expected profit per trade based on your stats</div>
            </div>
          </section>

          {/* QUICK STATS + EQUITY CURVE */}
          <section className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-4 mb-4 items-start">
            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
              <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-4">
                <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Avg Winner</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#00d9a3]">$0.00</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Avg Loser</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">-$346.00</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Best Trade</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#00d9a3]">$0.00</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Worst Trade</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">-$440.00</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Win Streak</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold">0 trades</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Loss Streak</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold">2 trades</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Risk:Reward</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">1:0.00</span></div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3"><span className="text-[11px] text-[#565e73] block mb-1">Open Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold">0</span></div>
              </div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
              <div className="flex items-start justify-between mb-3.5">
                <div>
                  <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-0.5">
                    <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>Equity Curve
                  </h3>
                  <p className="text-[12px] text-[#565e73]">Cumulative P&amp;L progression</p>
                </div>
                <div className="flex gap-1 bg-[#161b27] p-1 rounded-[9px] border border-[#232a3a]">
                  <div className="text-[11.5px] font-semibold px-3 py-1 rounded-[6px] bg-[#1c2230] text-[#eef1f8] cursor-pointer">Equity</div>
                  <div className="text-[11.5px] font-semibold px-3 py-1 rounded-[6px] text-[#565e73] cursor-pointer">Drawdown</div>
                </div>
              </div>
              <div>
                <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="w-full h-[230px] block">
                  <defs>
                    <linearGradient id="ecGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff5c7a" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#ff5c7a" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line stroke="#1a2029" strokeWidth="1" x1="0" y1="30" x2="700" y2="30"/>
                  <line stroke="#1a2029" strokeWidth="1" x1="0" y1="85" x2="700" y2="85"/>
                  <line stroke="#1a2029" strokeWidth="1" x1="0" y1="140" x2="700" y2="140"/>
                  <line stroke="#1a2029" strokeWidth="1" x1="0" y1="195" x2="700" y2="195"/>
                  <path d="M0,40 L560,40 L630,120 L700,200 L700,225 L0,225 Z" fill="url(#ecGrad)"/>
                  <path d="M0,40 L560,40 L630,120 L700,200" fill="none" stroke="#ff5c7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="700" cy="200" r="5" fill="#10141d" stroke="#ff5c7a" strokeWidth="2.5"/>
                  <text x="4" y="16" className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] fill-[#565e73]">$0</text>
                  <text x="4" y="221" className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] fill-[#565e73]">-$700</text>
                </svg>
              </div>
            </div>
          </section>

          {/* THREE COL */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
              <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-1">
                <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V4M5 12l7-8 7 8"></path></svg>Long vs Short
              </h3>
              <p className="text-[12px] text-[#565e73] mb-4">Performance by trade direction</p>
              <div className="flex flex-col gap-3">
                <div className="rounded-[12px] p-[14px_16px] border border-[rgba(0,217,163,.22)] bg-[#161b27]">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#00d9a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                    <span className="text-[13.5px] font-semibold">Long</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">2</span></div>
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">P&amp;L</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold text-[#ff5c7a]">-$692.00</span></div>
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">Win %</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">0.0%</span></div>
                  </div>
                </div>

                <div className="rounded-[12px] p-[14px_16px] border border-[rgba(255,92,122,.22)] bg-[#161b27]">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#ff5c7a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 17h6v-6"></path><path d="m22 17-8.5-8.5-5 5L2 7"></path></svg>
                    <span className="text-[13.5px] font-semibold">Short</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">0</span></div>
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">P&amp;L</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold text-[#00d9a3]">$0.00</span></div>
                    <div><span className="text-[10.5px] text-[#565e73] block mb-1">Win %</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">0.0%</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
              <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-1">
                <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>Day Performance
              </h3>
              <p className="text-[12px] text-[#565e73] mb-4">Find your best trading days</p>
              <div className="flex flex-col gap-[11px]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={i} className="flex items-center gap-[10px]">
                    <span className="text-[11.5px] text-[#565e73] w-8 shrink-0">{day}</span>
                    <div className="flex-1 h-2 rounded-[5px] bg-[#161b27] overflow-hidden">
                      <div className={`h-full rounded-[5px] ${day === 'Fri' ? 'bg-gradient-to-r from-[#b8324a] to-[#ff5c7a] w-full' : 'w-0'}`} />
                    </div>
                    <span className={`font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] font-semibold w-[74px] text-right shrink-0 ${day === 'Fri' ? 'text-[#ff5c7a]' : 'text-[#565e73]'}`}>
                      {day === 'Fri' ? '-$692.00' : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
              <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-1">
                <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>Top Symbols
              </h3>
              <p className="text-[12px] text-[#565e73] mb-4">Best performing assets</p>
              <div className="flex items-center gap-3 py-[10px] border-b border-[#1a2029]">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-4">1</span>
                <div className="flex-1 min-w-0"><span className="text-[13px] font-semibold block">EUR/USD</span><span className="text-[11px] text-[#565e73]">1 trade • 0% win</span></div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13.5px] text-[#ff5c7a]">-$252.00</span>
              </div>
              <div className="flex items-center gap-3 pt-[10px]">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-4">2</span>
                <div className="flex-1 min-w-0"><span className="text-[13px] font-semibold block">XAU/USD</span><span className="text-[11px] text-[#565e73]">1 trade • 0% win</span></div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13.5px] text-[#ff5c7a]">-$440.00</span>
              </div>
            </div>
          </section>

          {/* SESSION PERFORMANCE */}
          <section className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px] mb-4">
            <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-1">
              <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>Session Performance
            </h3>
            <p className="text-[12px] text-[#565e73] mb-4">Breakdown by trading session — Asian, London &amp; New York</p>

            <div className="relative h-[34px] rounded-[9px] bg-[#161b27] overflow-hidden mb-2 border border-[#1a2029]">
              <div className="absolute top-0 bottom-0 flex items-center justify-center text-[10.5px] font-semibold text-[#0a0d14] bg-gradient-to-r from-[#f2b84b] to-[#f5c96e]" style={{ left: '0%', width: '33.33%' }}>Asian</div>
              <div className="absolute top-0 bottom-0 flex items-center justify-center text-[10.5px] font-semibold text-white bg-gradient-to-r from-[#7aa0ff] to-[#4c7dff]" style={{ left: '33.33%', width: '20.83%' }}>London</div>
              <div className="absolute top-0 bottom-0 flex items-center justify-center text-[10.5px] font-semibold text-[#0a0d14] bg-gradient-to-r from-[#00d9a3] to-[#00b98c]" style={{ left: '54.17%', width: '37.5%' }}>New York</div>
            </div>
            <div className="flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#565e73] mb-5"><span>00:00</span><span>08:00</span><span>13:00</span><span>22:00</span></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
              <div className="rounded-[12px] p-4 bg-[#161b27] border border-[#1a2029]">
                <div className="flex items-center gap-[10px] mb-[14px]">
                  <div className="w-8 h-8 rounded-[9px] bg-[rgba(242,184,75,.16)] text-[#f2b84b] flex items-center justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 6 4-4 4 4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg></div>
                  <div><span className="text-[13.5px] font-semibold block">Asian</span><span className="text-[10.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">22:00 – 08:00 UTC</span></div>
                </div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[19px] font-semibold text-[#ff5c7a] block mb-2">-$692.00</span>
                <div className="h-[5px] rounded-[3px] bg-[#1c2230] overflow-hidden mb-[14px]"><div className="h-full bg-[#ff5c7a]" style={{ width: '100%' }} /></div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">2</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Win Rate</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">0.0%</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Avg Trade</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold text-[#ff5c7a]">-$346.00</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Volume</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">100%</span></div>
                </div>
              </div>

              <div className="rounded-[12px] p-4 bg-[#161b27] border border-[#1a2029]">
                <div className="flex items-center gap-[10px] mb-[14px]">
                  <div className="w-8 h-8 rounded-[9px] bg-[rgba(76,125,255,0.12)] text-[#7aa0ff] flex items-center justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 18v-7"></path><path d="M11.12 2.2a2 2 0 0 1 1.76 0l7.87 3.85c.47.23.31.95-.22.95H3.47c-.53 0-.7-.72-.22-.95z"></path></svg></div>
                  <div><span className="text-[13.5px] font-semibold block">London</span><span className="text-[10.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">08:00 – 13:00 UTC</span></div>
                </div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[19px] font-semibold text-[#565e73] block mb-2">—</span>
                <div className="h-[5px] rounded-[3px] bg-[#1c2230] overflow-hidden mb-[14px]"><div className="h-full bg-[#00d9a3]" style={{ width: '0%' }} /></div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">0</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Win Rate</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">—</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Avg Trade</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">—</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Volume</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">0%</span></div>
                </div>
              </div>

              <div className="rounded-[12px] p-4 bg-[#161b27] border border-[#1a2029]">
                <div className="flex items-center gap-[10px] mb-[14px]">
                  <div className="w-8 h-8 rounded-[9px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3] flex items-center justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 12h4"></path><path d="M10 8h4"></path><path d="M14 21v-3a2 2 0 0 0-4 0v3"></path></svg></div>
                  <div><span className="text-[13.5px] font-semibold block">New York</span><span className="text-[10.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">13:00 – 22:00 UTC</span></div>
                </div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[19px] font-semibold text-[#565e73] block mb-2">—</span>
                <div className="h-[5px] rounded-[3px] bg-[#1c2230] overflow-hidden mb-[14px]"><div className="h-full bg-[#00d9a3]" style={{ width: '0%' }} /></div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Trades</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">0</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Win Rate</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">—</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Avg Trade</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">—</span></div>
                  <div><span className="text-[10px] text-[#565e73] block mb-0.5">Volume</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold">0%</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* CALENDAR */}
          <section className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px] mb-4">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[15px] font-semibold mb-1">
                  <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>Trading Calendar
                </h3>
                <p className="text-[12px] text-[#565e73]">Daily P&amp;L heatmap — click on days to see trades</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-[26px] h-[26px] rounded-[7px] bg-[#161b27] border border-[#232a3a] text-[#8d94a8] flex items-center justify-center cursor-pointer"><svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"></path></svg></button>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold min-w-[96px] text-center">July 2026</span>
                <button className="w-[26px] h-[26px] rounded-[7px] bg-[#161b27] border border-[#232a3a] text-[#8d94a8] flex items-center justify-center cursor-pointer"><svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg></button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-4 items-start">
              <div>
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => (
                    <span key={i} className="text-[10.5px] text-[#565e73] text-center font-semibold">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  <div className="aspect-[1/0.8] rounded-[9px] bg-transparent"></div>
                  <div className="aspect-[1/0.8] rounded-[9px] bg-transparent"></div>
                  {Array.from({ length: 29 }, (_, i) => i + 1).map((day) => (
                    <div key={day} className={`aspect-[1/0.8] rounded-[9px] bg-[#161b27] border text-[11px] p-[6px_7px] flex flex-col justify-between ${
                      day === 30 ? 'border-[#4c7dff] shadow-[inset_0_0_0_1px_#4c7dff] text-[#eef1f8] font-bold' :
                      day === 31 ? 'bg-[rgba(255,92,122,0.12)] border-[rgba(255,92,122,.28)] text-[#eef1f8] cursor-pointer' :
                      'border-[#1a2029] text-[#565e73]'
                    }`}>
                      <span>{day}</span>
                      {day === 31 && (
                        <>
                          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10.5px] font-bold text-[#ff5c7a]">-$692.00</span>
                          <span className="text-[9px] text-[#565e73]">2 trades</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 flex-wrap">
                  <span className="flex items-center gap-[6px] text-[11px] text-[#565e73]"><span className="w-2 h-2 rounded-full bg-[#00d9a3]" />Profitable Day</span>
                  <span className="flex items-center gap-[6px] text-[11px] text-[#565e73]"><span className="w-2 h-2 rounded-full bg-[#ff5c7a]" />Losing Day</span>
                  <span className="flex items-center gap-[6px] text-[11px] text-[#565e73]"><span className="w-2 h-2 rounded-full bg-[#1c2230] border border-[#232a3a]" />No Trades</span>
                </div>
              </div>

              <div className="bg-[#161b27] border border-[#1a2029] rounded-[12px] p-[18px] h-full min-h-[260px]">
                <h4 className="flex items-center gap-2 text-[13px] font-semibold mb-4">
                  <svg className="w-[15px] h-[15px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>Day Trades
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-2 bg-[#10141d] rounded-[9px] border border-[#232a3a]">
                    <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,92,122,0.12)] text-[#ff5c7a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold">XAU</div>
                    <div className="flex-1 min-w-0"><span className="text-[12.5px] font-semibold block">XAU/USD</span><span className="text-[10.5px] text-[#565e73]">Jul 31</span></div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold text-[#ff5c7a]">-$440.00</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-[#10141d] rounded-[9px] border border-[#232a3a]">
                    <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,92,122,0.12)] text-[#ff5c7a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold">EUR</div>
                    <div className="flex-1 min-w-0"><span className="text-[12.5px] font-semibold block">EUR/USD</span><span className="text-[10.5px] text-[#565e73]">Jul 31</span></div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold text-[#ff5c7a]">-$252.00</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
