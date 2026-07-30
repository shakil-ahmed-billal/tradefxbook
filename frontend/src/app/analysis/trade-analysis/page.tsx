'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function TradeAnalysisPage() {
  const [selectedTrade, setSelectedTrade] = useState('XAU');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[264px_1fr] min-h-screen bg-[#0a0d14] text-[#eef1f8]">
      <Sidebar />
      <div className="flex flex-col min-w-0">
        <Topbar title="Trade Analysis" />

        <div className="content p-[26px_32px_60px]">
          <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-5 items-start">

            {/* Trade list sidebar */}
            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-[18px] sticky top-[98px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="font-[family-name:var(--font-sora)] text-[15px] font-semibold">Trade Analysis</span>
                <span className="text-[11px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">2 trades</span>
              </div>

              <div className="flex gap-1 bg-[#161b27] p-1 rounded-[9px] border border-[#232a3a] mb-[14px]">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold py-1.5 px-2 rounded-[6px] bg-[#1c2230] text-[#eef1f8]">
                  All <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[rgba(76,125,255,0.12)] px-1.5 rounded-full text-[#7aa0ff]">2</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold py-1.5 px-2 rounded-[6px] text-[#565e73]">
                  Winners <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[#1c2230] px-1.5 rounded-full text-[#8d94a8]">0</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold py-1.5 px-2 rounded-[6px] text-[#565e73]">
                  Losers <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[#1c2230] px-1.5 rounded-full text-[#8d94a8]">2</span>
                </button>
              </div>

              <div className="flex gap-2 mb-[14px]">
                <select className="flex-1 bg-[#161b27] border border-[#232a3a] text-[#8d94a8] text-[11.5px] p-2 rounded-[8px] font-sans outline-none">
                  <option>All Time</option><option>Today</option><option>This Week</option><option>This Month</option>
                </select>
                <select className="flex-1 bg-[#161b27] border border-[#232a3a] text-[#8d94a8] text-[11.5px] p-2 rounded-[8px] font-sans outline-none">
                  <option>By Date</option><option>By P&amp;L</option><option>By Symbol</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 max-h-[560px] overflow-y-auto">
                <button
                  onClick={() => setSelectedTrade('XAU')}
                  className={`block w-full text-left bg-[#161b27] border rounded-[11px] p-[12px_13px] transition-all cursor-pointer ${
                    selectedTrade === 'XAU' ? 'border-[#4c7dff] bg-[rgba(76,125,255,0.12)]' : 'border-[#1a2029] hover:border-[#2c3448]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-[9px]">
                    <span className="w-[24px] h-[24px] rounded-full bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#8d94a8] shrink-0">XAU</span>
                    <span className="text-[13px] font-semibold flex-1">XAU/USD</span>
                  </div>
                  <div className="flex items-center gap-2 mb-[6px]">
                    <span className="text-[10px] font-bold py-[2px] px-[7px] rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] text-[#565e73]">63.0000</span>
                    <span className="ml-auto font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13px] text-[#ff5c7a]">-$440.00</span>
                  </div>
                  <div className="text-[10.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">30 Jul, 07:38</div>
                </button>

                <button
                  onClick={() => setSelectedTrade('EUR')}
                  className={`block w-full text-left bg-[#161b27] border rounded-[11px] p-[12px_13px] transition-all cursor-pointer ${
                    selectedTrade === 'EUR' ? 'border-[#4c7dff] bg-[rgba(76,125,255,0.12)]' : 'border-[#1a2029] hover:border-[#2c3448]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-[9px]">
                    <span className="w-[24px] h-[24px] rounded-full bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#8d94a8] shrink-0">EUR</span>
                    <span className="text-[13px] font-semibold flex-1">EUR/USD</span>
                    <span className="text-[9px] font-bold py-[2px] px-[7px] rounded-full bg-[rgba(76,125,255,0.12)] text-[#7aa0ff]">New</span>
                  </div>
                  <div className="flex items-center gap-2 mb-[6px]">
                    <span className="text-[10px] font-bold py-[2px] px-[7px] rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] text-[#565e73]">21.0000</span>
                    <span className="ml-auto font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[13px] text-[#ff5c7a]">-$252.00</span>
                  </div>
                  <div className="text-[10.5px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">30 Jul, 06:01</div>
                </button>
              </div>
            </div>

            {/* Main detail panel */}
            <div className="bg-[#10141d] border border-[#232a3a] rounded-[14px] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap pb-[22px] mb-[22px] border-b border-[#1a2029]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-2">
                    <span className="w-[32px] h-[32px] rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold text-[#8d94a8]">{selectedTrade}</span>
                    <span className="font-[family-name:var(--font-sora)] text-[19px] font-bold">{selectedTrade === 'XAU' ? 'XAU/USD' : 'EUR/USD'}</span>
                    <span className="text-[10.5px] font-bold py-[3px] px-[10px] rounded-full bg-[rgba(255,92,122,0.12)] text-[#ff5c7a]">Loser</span>
                    <span className="text-[10.5px] font-bold py-[3px] px-[10px] rounded-full bg-[rgba(242,184,75,.14)] text-[#f2b84b]">Score: 0</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] text-[#565e73] flex-wrap">
                    <span className="text-[10px] font-bold py-[2px] px-2 rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    <span>•</span><span>30 Jul, 07:38</span>
                    <span>•</span><span>Duration: 1d 6h</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-[#565e73] mb-1">P&amp;L</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[26px] font-bold text-[#ff5c7a]">
                    {selectedTrade === 'XAU' ? '-$440.00' : '-$252.00'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[11px] p-[14px_16px]">
                  <span className="text-[11px] text-[#565e73] block mb-1.5">Entry Price</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold">{selectedTrade === 'XAU' ? '63.0000' : '21.0000'}</span>
                </div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[11px] p-[14px_16px]">
                  <span className="text-[11px] text-[#565e73] block mb-1.5">Exit Price</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold">{selectedTrade === 'XAU' ? '52.0000' : '14.0000'}</span>
                </div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[11px] p-[14px_16px]">
                  <span className="text-[11px] text-[#565e73] block mb-1.5">Quantity</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold">{selectedTrade === 'XAU' ? '40' : '36'}</span>
                </div>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[11px] p-[14px_16px]">
                  <span className="text-[11px] text-[#565e73] block mb-1.5">Price Move</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold text-[#ff5c7a]">-17.46%</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[14.5px] font-semibold mb-[14px]">
                  <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 9l-5 5-4-4-3 3"></path></svg>Trade Simulation
                </h3>
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] overflow-hidden">
                  <div className="flex items-center justify-between p-[16px_18px] border-b border-[#1a2029] flex-wrap gap-3">
                    <div className="flex items-center gap-[10px]">
                      <span className="w-[28px] h-[28px] rounded-full bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8.5px] font-bold text-[#8d94a8]">{selectedTrade}</span>
                      <span className="text-[14px] font-semibold">{selectedTrade === 'XAU' ? 'XAU/USD' : 'EUR/USD'}</span>
                      <span className="text-[10px] font-bold py-[2px] px-[7px] rounded-[5px] bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">Long</span>
                    </div>
                    <div className="flex gap-5">
                      <div><span className="text-[10px] text-[#565e73] block mb-0.5">Entry</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold">{selectedTrade === 'XAU' ? '$63.00' : '$21.00'}</span></div>
                      <div><span className="text-[10px] text-[#565e73] block mb-0.5">Exit</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold">{selectedTrade === 'XAU' ? '$52.00' : '$14.00'}</span></div>
                      <div><span className="text-[10px] text-[#565e73] block mb-0.5">P&amp;L</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold text-[#ff5c7a]">{selectedTrade === 'XAU' ? '-$440.00' : '-$252.00'}</span></div>
                    </div>
                  </div>
                  <div className="h-[320px] flex items-center justify-center p-5">
                    <div className="flex flex-col items-center gap-3 text-center max-w-[320px]">
                      <svg className="w-9 h-9 text-[#565e73] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
                      <span className="text-[14px] font-semibold">Trade Replay Not Available</span>
                      <p className="text-[12px] text-[#565e73] leading-[1.5]">This trade was added manually. Connect a trading account to view trade replay and simulation features.</p>
                    </div>
                  </div>
                  <div className="p-[12px_18px] border-t border-[#1a2029]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#565e73]">
                      <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>Manual Entry
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-5">
                  <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[14.5px] font-semibold mb-[14px]">
                    <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5c1.75 0 3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18c-1.75 0-3.33.48-4.5 1.25"></path></svg>
                    Journal Entry
                    <span className="ml-auto text-[10.5px] font-bold py-[3px] px-[10px] rounded-full bg-[rgba(242,184,75,.14)] text-[#f2b84b]">Not Journaled</span>
                  </h3>
                  <div className="flex flex-col items-center justify-center gap-3.5 py-6 text-center">
                    <p className="text-[13px] text-[#565e73]">No journal entry for this trade</p>
                    <button className="text-[12.5px] font-semibold py-2.5 px-[18px] rounded-[9px] border-none bg-gradient-to-br from-[#4c7dff] to-[#3a63d9] text-white cursor-pointer">Add Journal Entry</button>
                  </div>
                </div>

                <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-5">
                  <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[14.5px] font-semibold mb-[14px]">
                    <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Trade Quality
                  </h3>
                  <div className="flex items-center gap-6 mb-[18px] flex-wrap">
                    <div className="w-[76px] h-[76px] rounded-full border-[5px] border-[#1c2230] flex items-center justify-center shrink-0">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[22px] font-bold text-[#f2b84b]">0</span>
                    </div>
                    <div className="flex-1 min-w-[180px] flex flex-col gap-2">
                      <div className="flex items-center gap-[10px] text-[11.5px] text-[#8d94a8]"><span>Profitability</span><div className="flex-1 h-[6px] rounded-[4px] bg-[#1c2230] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#4c7dff] to-[#7aa0ff] w-0" /></div><span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-[38px] text-right">0/30</span></div>
                      <div className="flex items-center gap-[10px] text-[11.5px] text-[#8d94a8]"><span>Execution</span><div className="flex-1 h-[6px] rounded-[4px] bg-[#1c2230] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#4c7dff] to-[#7aa0ff] w-0" /></div><span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-[38px] text-right">0/40</span></div>
                      <div className="flex items-center gap-[10px] text-[11.5px] text-[#8d94a8]"><span>Journal</span><div className="flex-1 h-[6px] rounded-[4px] bg-[#1c2230] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#4c7dff] to-[#7aa0ff] w-0" /></div><span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-[38px] text-right">0/20</span></div>
                      <div className="flex items-center gap-[10px] text-[11.5px] text-[#8d94a8]"><span>Rating</span><div className="flex-1 h-[6px] rounded-[4px] bg-[#1c2230] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#4c7dff] to-[#7aa0ff] w-0" /></div><span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#565e73] w-[38px] text-right">0/10</span></div>
                    </div>
                  </div>
                  <div className="border-t border-[#232a3a] pt-4">
                    <div className="text-[11.5px] font-semibold text-[#8d94a8] mb-2.5">How is this calculated?</div>
                    <div className="flex justify-between gap-2 text-[11.5px] py-1 border-b border-[#1a2029]"><span className="text-[#eef1f8] font-semibold">Profitability (30 pts)</span><span className="text-[#565e73] text-right">Win: 30 | Break-even: 15 | Loss: 0</span></div>
                    <div className="flex justify-between gap-2 text-[11.5px] py-1 border-b border-[#1a2029]"><span className="text-[#eef1f8] font-semibold">Execution (40 pts)</span><span className="text-[#565e73] text-right">10 pts each: Plan, Risk, Entry, Exit</span></div>
                    <div className="flex justify-between gap-2 text-[11.5px] py-1 border-b border-[#1a2029]"><span className="text-[#eef1f8] font-semibold">Journal (20 pts)</span><span className="text-[#565e73] text-right">5 pts each: Pre-analysis, Review, Emotions, Lessons</span></div>
                    <div className="flex justify-between gap-2 text-[11.5px] py-1"><span className="text-[#eef1f8] font-semibold">Rating (10 pts)</span><span className="text-[#565e73] text-right">Your self-rating (1–10)</span></div>
                    <div className="flex gap-2 mt-3.5 flex-wrap">
                      <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">80+ Excellent</span>
                      <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-[rgba(76,125,255,0.12)] text-[#7aa0ff]">60+ Good</span>
                      <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-[rgba(242,184,75,.14)] text-[#f2b84b]">40+ Average</span>
                      <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-[rgba(255,92,122,0.12)] text-[#ff5c7a]">&lt;40 Needs Work</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-5 mb-4 opacity-75">
                <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[14.5px] font-semibold mb-[14px]">
                  <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  Insights
                  <span className="ml-auto text-[10px] font-bold py-[3px] px-[10px] rounded-full bg-[rgba(167,139,250,0.14)] text-[#a78bfa]">Coming Soon</span>
                </h3>
                <div className="flex gap-3.5 items-start p-3.5 rounded-[10px] bg-[#1c2230] border border-dashed border-[#232a3a]">
                  <div className="text-[20px]">💡</div>
                  <div>
                    <span className="text-[13px] font-semibold block mb-1">AI-Powered Insights</span>
                    <span className="text-[12px] text-[#565e73]">Get personalized trading insights and pattern analysis.</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b27] border border-[#1a2029] rounded-[10px] p-5">
                <h3 className="flex items-center gap-[9px] font-[family-name:var(--font-sora)] text-[14.5px] font-semibold mb-[14px]">
                  <svg className="w-[16px] h-[16px] text-[#7aa0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  vs Your Average
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-[#1c2230] border border-[#232a3a] rounded-[11px] p-[14px_16px] flex flex-col gap-1.5">
                    <span className="text-[11px] text-[#565e73]">vs Avg Loser</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold">{selectedTrade === 'XAU' ? '-$440.00' : '-$252.00'}</span>
                    <span className="text-[11px] font-semibold text-[#ff5c7a]">-27%</span>
                  </div>
                  <div className="bg-[#1c2230] border border-[#232a3a] rounded-[11px] p-[14px_16px] flex flex-col gap-1.5">
                    <span className="text-[11px] text-[#565e73]">Hold Duration</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-semibold">1d 6h</span>
                    <span className="text-[11px] font-semibold text-[#ff5c7a]">+0%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
