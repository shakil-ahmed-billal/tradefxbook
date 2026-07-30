'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function JournalPage() {
  const [selectedTrade, setSelectedTrade] = useState('EUR');
  const [rating, setRating] = useState('5');
  const [checklist, setChecklist] = useState([false, false, false, false, false]);

  const toggleCheck = (idx: number) => {
    const next = [...checklist];
    next[idx] = !next[idx];
    setChecklist(next);
  };

  const checkedCount = checklist.filter(Boolean).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[264px_1fr] min-h-screen bg-[#0a0d14] text-[#eef1f8]">
      <Sidebar />
      <div className="flex flex-col min-w-0">
        <Topbar title="Journal" />

        <div className="content p-[22px_28px_28px] bg-[radial-gradient(700px_380px_at_100%_-10%,rgba(41,129,235,.07),transparent_55%),#090b10]">
          <div className="grid grid-cols-1 xl:grid-cols-[328px_1fr] gap-5 items-start">

            {/* Trade list sidebar */}
            <div className="bg-[#0e1017] border border-[#212636] rounded-[16px] overflow-hidden">
              <div className="flex items-center justify-between p-[16px_16px_12px]">
                <span className="font-[family-name:var(--font-outfit)] font-semibold text-[14.5px]">Trade Journal</span>
                <div className="flex items-center gap-[10px]">
                  <label className="flex items-center gap-[6px] text-[11.5px] text-[#9aa2b3] cursor-pointer">
                    <input type="checkbox" className="accent-[#2981eb] w-[13px] h-[13px]" /> Live
                  </label>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10.5px] text-[#5c6478] bg-[#141824] px-2 py-[3px] rounded-full border border-[#212636]">0 entries</span>
                </div>
              </div>
              <div className="flex gap-1 px-3 pb-[14px] overflow-x-auto">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium bg-[rgba(41,129,235,.14)] text-[#5aa2f2] border border-[rgba(41,129,235,.3)]">
                  All<span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[rgba(41,129,235,.25)] px-1.5 py-0.5 rounded-full">2</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium text-[#9aa2b3] hover:bg-[#141824]">
                  Journaled<span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[rgba(255,255,255,.08)] px-1.5 py-0.5 rounded-full">0</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium text-[#9aa2b3] hover:bg-[#141824]">
                  Pending<span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[rgba(255,255,255,.08)] px-1.5 py-0.5 rounded-full">2</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium text-[#9aa2b3] hover:bg-[#141824]">
                  Legacy<span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-[rgba(255,255,255,.08)] px-1.5 py-0.5 rounded-full">0</span>
                </button>
              </div>

              <div className="flex flex-col px-[10px] pb-[10px] gap-1.5 max-h-[640px] overflow-y-auto">
                <button
                  onClick={() => setSelectedTrade('EUR')}
                  className={`flex flex-col gap-2 p-3 rounded-[12px] border text-left w-full transition-all cursor-pointer ${
                    selectedTrade === 'EUR' ? 'bg-[#141824] border-[#2981eb] shadow-[inset_0_0_0_1px_rgba(41,129,235,.25)]' : 'bg-transparent border-transparent hover:bg-[#141824]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-[24px] h-[24px] rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#9aa2b3] shrink-0">EU</span>
                    <span className="text-[13px] font-semibold flex-1">EUR/USD</span>
                    <span className="ml-auto font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] font-semibold text-[#ef4b5c]">-$252.00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold py-[2px] px-[7px] rounded-[5px] bg-[rgba(34,197,139,.12)] text-[#22c58b]">Long</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#5c6478]">1.0863 → 1.0821</span>
                  </div>
                  <div className="text-[11px] text-[#5c6478] font-[family-name:var(--font-jetbrains-mono)]">Jul 30, 2026, 06:01</div>
                </button>
              </div>
            </div>

            {/* Main journal panel */}
            <div className="bg-[#0e1017] border border-[#212636] rounded-[16px] overflow-hidden">
              <div className="flex items-start justify-between p-[18px_22px] border-b border-[#1a1e2b] gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold bg-[#1a1f2c] text-[#9aa2b3] border border-[#212636]">{selectedTrade === 'EUR' ? 'EU' : 'GJ'}</span>
                    <span className="font-[family-name:var(--font-outfit)] text-[17px] font-semibold">{selectedTrade === 'EUR' ? 'EUR/USD' : 'GBP/JPY'}</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10.5px] font-semibold px-[9px] py-[3px] rounded-[6px] text-[#ef4b5c] bg-[rgba(239,75,92,.12)] border border-[rgba(239,75,92,.3)]">Loser</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] text-[#9aa2b3] flex-wrap">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[11px] px-1.5 py-0.5 rounded text-[#22c58b] bg-[rgba(34,197,139,.12)]">{selectedTrade === 'EUR' ? 'Long' : 'Short'}</span>
                    <span className="text-[#5c6478]">•</span><span>Entry {selectedTrade === 'EUR' ? '1.0863' : '198.21'}</span>
                    <span className="text-[#5c6478]">•</span><span>Size 40</span>
                    <span className="text-[#5c6478]">•</span><span>Jul 30, 2026, 07:38</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-[8px] bg-[#141824] border border-[#212636] text-[#9aa2b3] flex items-center justify-center cursor-pointer hover:text-[#f4f6fa]"><svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></button>
                  <button className="flex items-center gap-1.5 py-2 px-3.5 rounded-[9px] text-[12.5px] font-semibold bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa] cursor-pointer">Report</button>
                  <button className="flex items-center gap-1.5 py-2 px-3.5 rounded-[9px] text-[12.5px] font-semibold bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa] cursor-pointer">Analytics</button>
                  <button className="flex items-center gap-1.5 py-2 px-3.5 rounded-[9px] text-[12.5px] font-semibold bg-[#2981eb] text-white border border-[#2981eb] hover:bg-[#5aa2f2] cursor-pointer">Save</button>
                </div>
              </div>

              <div className="p-[22px] flex flex-col gap-[18px]">
                <div>
                  <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                    <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                    Pre-trade Analysis
                  </label>
                  <textarea className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,.14)] min-h-[88px] resize-y" placeholder="What did you see? Plan, thesis, levels, risk..."></textarea>
                </div>

                <div>
                  <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                    <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    Post-trade Review
                  </label>
                  <textarea className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,.14)] min-h-[88px] resize-y" placeholder="What happened? Execution, slippage, improvements..."></textarea>
                </div>

                <div className="max-w-[260px]">
                  <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                    <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M8 3H3v5M21 3l-8.5 8.5M3 3l8.5 8.5M3 21l8.5-8.5M21 21l-8.5-8.5"/></svg>
                    Risk : Reward
                  </label>
                  <div className="flex items-center gap-[10px]">
                    <input defaultValue="1" className="w-full text-center bg-[#141824] border border-[#212636] rounded-[10px] p-[10px] font-[family-name:var(--font-jetbrains-mono)] text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb]" />
                    <span className="text-[#5c6478] font-bold">:</span>
                    <input defaultValue="2.5" className="w-full text-center bg-[#141824] border border-[#212636] rounded-[10px] p-[10px] font-[family-name:var(--font-jetbrains-mono)] text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                      <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                      Emotions
                    </label>
                    <textarea className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none focus:border-[#2981eb] min-h-[70px] resize-y" placeholder="Calm, anxious, FOMO, confident..."></textarea>
                  </div>
                  <div>
                    <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                      <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
                      Lessons Learned
                    </label>
                    <textarea className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none focus:border-[#2981eb] min-h-[70px] resize-y" placeholder="Key takeaways to repeat or avoid..."></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                      <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                      Tags
                    </label>
                    <input className="w-full bg-[#141824] border border-[#212636] rounded-[10px] py-[11px] px-[13px] text-[13.5px] text-[#f4f6fa] outline-none focus:border-[#2981eb]" placeholder="breakout, trend, news (comma separated)" />
                  </div>
                  <div>
                    <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                      <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11.5 2.3a.5.5 0 0 1 .9 0l2.3 4.7a2.1 2.1 0 0 0 1.6 1.2l5.2.7a.5.5 0 0 1 .3.9l-3.7 3.6a2.1 2.1 0 0 0-.6 1.9l.9 5.1a.5.5 0 0 1-.8.6l-4.6-2.4a2.1 2.1 0 0 0-2 0l-4.6 2.4a.5.5 0 0 1-.8-.6l.9-5.1a2.1 2.1 0 0 0-.6-1.9L2.2 9.8a.5.5 0 0 1 .3-.9l5.2-.7a2.1 2.1 0 0 0 1.6-1.2z"/></svg>
                      Rating<span className="ml-auto font-[family-name:var(--font-jetbrains-mono)] text-[#5aa2f2] text-[12px]">{rating}/10</span>
                    </label>
                    <div className="px-0.5">
                      <input type="range" min="1" max="10" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full accent-[#2981eb] h-[5px] cursor-pointer" />
                      <div className="flex justify-between text-[10.5px] text-[#5c6478] mt-1 font-[family-name:var(--font-jetbrains-mono)]"><span>1</span><span>5</span><span>10</span></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                    <svg className="w-[15px] h-[15px] text-[#5aa2f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    Execution Checklist<span className="ml-auto font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#5c6478]">{checkedCount}/5</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {['Checked higher timeframe', 'Risk within limits', 'Fits my trading plan', 'Key levels identified', 'Economic calendar checked'].map((item, idx) => (
                      <div key={idx} onClick={() => toggleCheck(idx)} className={`flex items-center gap-[10px] cursor-pointer p-1 rounded transition-colors ${checklist[idx] ? 'text-[#f4f6fa]' : 'text-[#9aa2b3]'}`}>
                        <div className={`w-[18px] h-[18px] rounded-[6px] border-[1.5px] flex items-center justify-center relative transition-all ${checklist[idx] ? 'bg-[#2981eb] border-[#2981eb]' : 'bg-[#141824] border-[#212636]'}`}>
                          {checklist[idx] && <div className="w-[4px] h-[9px] border-r-2 border-b-2 border-white rotate-45 absolute -top-[1px]" />}
                        </div>
                        <span className="text-[13px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart section */}
              <div className="m-[0_22px_22px] border border-[#212636] rounded-[14px] overflow-hidden bg-[linear-gradient(180deg,rgba(41,129,235,.05),transparent_40%),#141824]">
                <div className="flex items-center justify-between flex-wrap gap-3 p-[16px_18px] border-b border-[#1a1e2b]">
                  <div className="flex items-center gap-[10px]">
                    <span className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold bg-[#1a1f2c] text-[#9aa2b3] border border-[#212636]">EU</span>
                    <span className="font-[family-name:var(--font-outfit)] font-semibold text-[15px]">EUR/USD</span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold text-[11px] py-[2px] px-[7px] rounded text-[#22c58b] bg-[rgba(34,197,139,.12)]">Long</span>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-[2px]"><span className="text-[10.5px] text-[#5c6478] uppercase tracking-[.05em]">Entry</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">1.0863</span></div>
                    <div className="flex flex-col gap-[2px]"><span className="text-[10.5px] text-[#5c6478] uppercase tracking-[.05em]">Exit</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold">1.0821</span></div>
                    <div className="flex flex-col gap-[2px]"><span className="text-[10.5px] text-[#5c6478] uppercase tracking-[.05em]">P&amp;L</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-semibold text-[#ef4b5c]">-$440.00</span></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 py-[7px] px-3 rounded-[8px] bg-[#0e1017] border border-[#212636] text-[#9aa2b3] text-[12px] font-medium hover:text-[#f4f6fa]">Analyze</button>
                    <button className="flex items-center gap-1.5 py-[7px] px-3 rounded-[8px] bg-[#0e1017] border border-[#212636] text-[#9aa2b3] text-[12px] font-medium hover:text-[#f4f6fa]">Replay</button>
                  </div>
                </div>

                <div className="relative min-h-[220px] flex items-center justify-center p-[30px_20px]">
                  <div className="relative z-20 text-center max-w-[320px]">
                    <svg className="w-[30px] h-[30px] text-[#5aa2f2] mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                    <h4 className="font-[family-name:var(--font-outfit)] text-[14.5px] font-semibold mb-1.5">Chart Not Available</h4>
                    <p className="text-[12.5px] text-[#9aa2b3] leading-[1.55]">This trade was added manually. Connect a trading account to view real-time charts for your trades.</p>
                  </div>
                </div>

                <div className="p-[12px_18px] border-t border-[#1a1e2b]">
                  <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#5c6478] bg-[#0e1017] border border-[#212636] py-1 px-2.5 rounded-full">
                    Manual Entry
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
