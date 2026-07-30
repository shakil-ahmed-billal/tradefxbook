'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function DashboardPage() {
  return (
    <div className="app grid grid-cols-[264px_1fr] min-h-screen relative z-[1]">
      <Sidebar />
      <div className="main flex flex-col min-w-0">
        <Topbar title="Dashboard" />

        <div className="content p-[28px_32px_60px]">
          {/* STAT CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            <div className="stat-card hero bg-[linear-gradient(160deg,#121a2c_0%,#10141d_55%)] border border-[#253156] rounded-[14px] p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-[34px] h-[34px] rounded-[9px] bg-[rgba(76,125,255,.14)] text-[#7aa0ff] flex items-center justify-center">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <span className="text-[10px] font-semibold tracking-[.03em] px-2 py-[3px] rounded-full bg-[#1c2230] text-[#8d94a8]">Total</span>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Total P&amp;L</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[27px] font-semibold tracking-[-0.01em] text-[#ff5c7a] tabular-nums block">-$692.00</span>
              <div className="mt-3 flex items-center gap-[6px] text-[12px] text-[#565e73]">
                <svg className="w-[13px] h-[13px] text-[#00d9a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                2 trades this month
              </div>
            </div>

            <div className="stat-card bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-[34px] h-[34px] rounded-[9px] bg-[rgba(242,184,75,.14)] text-[#f2b84b] flex items-center justify-center">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Unrealized</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[27px] font-semibold tracking-[-0.01em] text-[#eef1f8] tabular-nums block">$0.00</span>
              <div className="mt-3 text-[12px] text-[#565e73]">0 open positions</div>
            </div>

            <div className="stat-card bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-[34px] h-[34px] rounded-[9px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3] flex items-center justify-center">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.8 10A10 10 0 1 1 17 3.34"></path><path d="m9 11 3 3L22 4"></path></svg>
                </div>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Realized</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[27px] font-semibold tracking-[-0.01em] text-[#ff5c7a] tabular-nums block">-$692.00</span>
              <div className="mt-3 text-[12px] text-[#565e73]">2 closed trades</div>
            </div>

            <div className="stat-card bg-[#10141d] border border-[#232a3a] rounded-[14px] p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-[34px] h-[34px] rounded-[9px] bg-[rgba(167,139,250,.14)] text-[#a78bfa] flex items-center justify-center">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
              </div>
              <span className="text-[12.5px] text-[#8d94a8] font-medium block mb-[6px]">Win Rate</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[27px] font-semibold tracking-[-0.01em] text-[#eef1f8] tabular-nums block">0%</span>
              <div className="h-[5px] rounded-[3px] bg-[#1c2230] mt-3 overflow-hidden">
                <div className="h-full rounded-[3px] bg-gradient-to-r from-[#4c7dff] to-[#7aa0ff]" style={{ width: '0%' }} />
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-4 items-start">
            <div className="flex flex-col gap-4 min-w-0">
              
              {/* Performance chart */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div>
                    <div className="text-[11.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)] mb-[6px]">PERFORMANCE</div>
                    <div className="flex items-baseline gap-[10px]">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-semibold text-[#ff5c7a]">-$692.00</span>
                      <span className="text-[11px] text-[#565e73]">last 30 days</span>
                    </div>
                  </div>
                  <div className="flex gap-[4px] bg-[#161b27] p-1 rounded-[9px] border border-[#232a3a]">
                    <div className="text-[11.5px] font-semibold px-[11px] py-[5px] rounded-[6px] text-[#565e73] cursor-pointer">1D</div>
                    <div className="text-[11.5px] font-semibold px-[11px] py-[5px] rounded-[6px] text-[#565e73] cursor-pointer">1W</div>
                    <div className="text-[11.5px] font-semibold px-[11px] py-[5px] rounded-[6px] bg-[#1c2230] text-[#eef1f8] cursor-pointer">1M</div>
                    <div className="text-[11.5px] font-semibold px-[11px] py-[5px] rounded-[6px] text-[#565e73] opacity-40 cursor-not-allowed flex items-center gap-1">
                      <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z"/><path d="M17 9V7a5 5 0 00-10 0v2a3 3 0 00-2 2.8v6.2A2 2 0 007 22h10a2 2 0 002-2v-6.2A3 3 0 0017 9zM9 7a3 3 0 016 0v2H9V7z"/></svg>
                      3M
                    </div>
                    <div className="text-[11.5px] font-semibold px-[11px] py-[5px] rounded-[6px] text-[#565e73] opacity-40 cursor-not-allowed flex items-center gap-1">
                      <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z"/><path d="M17 9V7a5 5 0 00-10 0v2a3 3 0 00-2 2.8v6.2A2 2 0 007 22h10a2 2 0 002-2v-6.2A3 3 0 0017 9zM9 7a3 3 0 016 0v2H9V7z"/></svg>
                      ALL
                    </div>
                  </div>
                </div>

                <div className="mt-[14px]">
                  <svg viewBox="0 0 760 220" preserveAspectRatio="none" className="w-full h-[220px] block">
                    <defs>
                      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff5c7a" stopOpacity="0.28"/>
                        <stop offset="100%" stopColor="#ff5c7a" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <line stroke="#1a2029" strokeWidth="1" x1="0" y1="30" x2="760" y2="30"/>
                    <line stroke="#1a2029" strokeWidth="1" x1="0" y1="80" x2="760" y2="80"/>
                    <line stroke="#1a2029" strokeWidth="1" x1="0" y1="130" x2="760" y2="130"/>
                    <line stroke="#1a2029" strokeWidth="1" x1="0" y1="180" x2="760" y2="180"/>
                    <path d="M0,40 L620,40 L680,120 L760,190 L760,220 L0,220 Z" fill="url(#areaFill)"/>
                    <path d="M0,40 L620,40 L680,120 L760,190" fill="none" stroke="#ff5c7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="760" cy="190" r="5" fill="#0a0d14" stroke="#ff5c7a" strokeWidth="2.5"/>
                    <text x="4" y="16" className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] fill-[#565e73]">$0</text>
                    <text x="4" y="215" className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] fill-[#565e73]">-$700</text>
                  </svg>
                </div>
              </div>

              {/* Open Positions */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Open Positions</div>
                  <span className="text-[11.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">0 active</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px] py-[34px] px-[10px] text-[#565e73]">
                  <svg className="w-[34px] h-[34px] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 9h6M9 12h6M9 15h4"></path></svg>
                  <span className="text-[12.5px]">No open positions right now</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Recent Activity</div>
                  <span className="text-[11.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">2 trades</span>
                </div>

                <div className="flex items-center gap-3 py-3 border-b border-[#1a2029]">
                  <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-[#161b27] font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#8d94a8] border border-[#232a3a] shrink-0">XAU</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold">XAU/USD</span>
                      <span className="text-[10px] font-bold px-[7px] py-[2px] rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    </div>
                    <div className="text-[11.5px] text-[#565e73] mt-[2px]">40 lots</div>
                  </div>
                  <div className="text-right">
                    <div className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[14px] text-[#ff5c7a]">-$440.00</div>
                    <div className="text-[11px] text-[#565e73] mt-[2px]">Jul 31</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-[#161b27] font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#8d94a8] border border-[#232a3a] shrink-0">EUR</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold">EUR/USD</span>
                      <span className="text-[10px] font-bold px-[7px] py-[2px] rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    </div>
                    <div className="text-[11.5px] text-[#565e73] mt-[2px]">36 lots</div>
                  </div>
                  <div className="text-right">
                    <div className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[14px] text-[#ff5c7a]">-$252.00</div>
                    <div className="text-[11px] text-[#565e73] mt-[2px]">Jul 31</div>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex flex-col gap-4 min-w-0">
              
              {/* Calendar */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[14px]">
                  <div className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Monthly P&amp;L</div>
                  <span className="text-[11.5px] text-[#ff5c7a]">-$692.00</span>
                </div>
                <div className="flex items-center gap-2 mb-[14px]">
                  <button className="w-6 h-6 rounded-[6px] bg-[#161b27] border border-[#232a3a] text-[#8d94a8] flex items-center justify-center cursor-pointer"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"></path></svg></button>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-semibold min-w-[88px] text-center">July 2026</span>
                  <button className="w-6 h-6 rounded-[6px] bg-[#161b27] border border-[#232a3a] text-[#8d94a8] flex items-center justify-center cursor-pointer"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"></path></svg></button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-[6px]">
                  {['M','T','W','T','F','S','S'].map((d, i) => (
                    <span key={i} className="text-[10px] text-[#565e73] text-center font-semibold">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  <div className="aspect-[1/0.85] rounded-[8px] bg-transparent"></div>
                  <div className="aspect-[1/0.85] rounded-[8px] bg-transparent"></div>
                  {Array.from({ length: 29 }, (_, i) => i + 1).map((day) => (
                    <div key={day} className={`aspect-[1/0.85] rounded-[8px] bg-[#161b27] border text-[10.5px] p-[5px] flex flex-col justify-between ${
                      day === 30 ? 'border-[#4c7dff] shadow-[inset_0_0_0_1px_#4c7dff] text-[#eef1f8] font-bold' :
                      day === 31 ? 'bg-[rgba(255,92,122,0.12)] border-[rgba(255,92,122,.28)] text-[#eef1f8]' :
                      'border-[#1a2029] text-[#565e73]'
                    }`}>
                      <span>{day}</span>
                      {day === 31 && <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-[#ff5c7a]">-$692</span>}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-[14px]">
                  <span className="flex items-center gap-[6px] text-[11px] text-[#565e73]"><span className="w-2 h-2 rounded-full bg-[#00d9a3]" />Profit</span>
                  <span className="flex items-center gap-[6px] text-[11px] text-[#565e73]"><span className="w-2 h-2 rounded-full bg-[#ff5c7a]" />Loss</span>
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Top Performers</div>
                </div>
                <div className="flex items-center gap-3 py-[10px] border-b border-[#1a2029]">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-5">#1</span>
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8.5px] font-bold text-[#8d94a8]">EUR</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold">EUR/USD</div>
                    <div className="text-[11px] text-[#565e73]">1 trade</div>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13.5px] text-[#ff5c7a]">-$252.00</span>
                </div>
                <div className="flex items-center gap-3 pt-[10px]">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-5">#2</span>
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8.5px] font-bold text-[#8d94a8]">XAU</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold">XAU/USD</div>
                    <div className="text-[11px] text-[#565e73]">1 trade</div>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13.5px] text-[#ff5c7a]">-$440.00</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[22px]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Quick Stats</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3">
                    <span className="text-[11px] text-[#565e73] block mb-1">Avg Win</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold">$0.00</span>
                  </div>
                  <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3">
                    <span className="text-[11px] text-[#565e73] block mb-1">Avg Loss</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">-$346.00</span>
                  </div>
                  <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3">
                    <span className="text-[11px] text-[#565e73] block mb-1">Best Trade</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">-$252.00</span>
                  </div>
                  <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3">
                    <span className="text-[11px] text-[#565e73] block mb-1">Worst Trade</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">-$440.00</span>
                  </div>
                  <div className="col-span-2 bg-[#161b27] border border-[#1a2029] rounded-[10px] p-3 flex items-center justify-between">
                    <span className="text-[11px] text-[#565e73]">Profit Factor</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-semibold text-[#ff5c7a]">0.00</span>
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
