'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function TradesPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '264px 1fr', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title="Trades" />

        <div style={{ padding: '26px 32px 60px' }}>
          {/* PAGE HEADER */}
          <section className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div className="flex items-center gap-[14px]">
              <h1 className="font-[family-name:var(--font-sora)] text-[22px] font-bold tracking-[-0.01em]">Trades</h1>
              <div className="flex items-center gap-[7px] text-[12px] font-semibold text-[#565e73] bg-[#161b27] border border-[#232a3a] py-[6px] px-3 rounded-full">
                <span className="w-[7px] h-[7px] rounded-full bg-[#ff5c7a] shadow-[0_0_0_3px_rgba(255,92,122,0.12)]" />
                Not connected
              </div>
            </div>
            <div className="flex items-center gap-[10px] flex-wrap">
              <button className="inline-flex items-center gap-[7px] text-[13px] font-semibold py-[10px] px-4 rounded-[10px] bg-gradient-to-br from-[#4c7dff] to-[#3a63d9] text-white shadow-[0_6px_18px_-8px_rgba(76,125,255,.6)] cursor-pointer">
                Connect MT4/MT5
              </button>
              <button className="inline-flex items-center gap-[7px] text-[13px] font-semibold py-[10px] px-4 rounded-[10px] bg-[#161b27] border border-[#232a3a] text-[#ff5c7a] cursor-pointer">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"></path></svg>
                Clear All
              </button>
              <button className="inline-flex items-center gap-[7px] text-[13px] font-semibold py-[10px] px-4 rounded-[10px] bg-gradient-to-br from-[#4c7dff] to-[#3a63d9] text-white shadow-[0_6px_18px_-8px_rgba(76,125,255,.6)] cursor-pointer">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"></path></svg>
                Add Trade
              </button>
            </div>
          </section>

          {/* TABLE CARD */}
          <section className="bg-[#10141d] border border-[#232a3a] rounded-[14px] overflow-hidden mb-5">
            <div className="flex items-center justify-between p-[20px_22px] border-b border-[#1a2029] flex-wrap gap-3">
              <div className="flex items-baseline gap-[10px]">
                <span className="font-[family-name:var(--font-sora)] text-[16px] font-semibold">Trade History</span>
                <span className="text-[12px] text-[#565e73] font-[family-name:var(--font-jetbrains-mono)]">2 of 2 trades</span>
              </div>
              <button className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#8d94a8] bg-[#161b27] border border-[#232a3a] py-2 px-[14px] rounded-[9px] cursor-pointer">
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>
                Filters
                <span className="w-[6px] h-[6px] rounded-full bg-[#7aa0ff]" />
              </button>
            </div>

            <div className="m-[16px_22px_0] bg-[rgba(76,125,255,0.12)] border border-[rgba(76,125,255,.25)] text-[#8d94a8] text-[12.5px] p-[11px_16px] rounded-[10px]">
              Free plan loads <b className="text-[#7aa0ff] font-bold">your last 15 trades</b>. Upgrade to Pro to unlock full history and longer timeframes.
            </div>

            <div className="overflow-x-auto p-[18px_22px_22px]">
              <table className="w-full border-collapse min-w-[880px]">
                <thead>
                  <tr>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Open / Close</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Symbol</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Type</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Entry</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Exit</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Size</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">P&amp;L</th>
                    <th className="text-left text-[10.5px] font-semibold tracking-[.06em] uppercase text-[#565e73] pb-3 px-[14px] border-b border-[#232a3a]">Source</th>
                    <th className="border-b border-[#232a3a]"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[#161b27] transition-colors">
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <div className="flex flex-col gap-[3px]">
                        <div className="flex gap-[6px] text-[11.5px]"><span className="text-[#565e73] w-[36px]">Open:</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[#8d94a8]">Jul 30 07:38 AM</span></div>
                        <div className="flex gap-[6px] text-[11.5px]"><span className="text-[#565e73] w-[36px]">Close:</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[#8d94a8]">Jul 31 01:38 PM</span></div>
                      </div>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <div className="flex items-center gap-[10px]">
                        <span className="w-[26px] h-[26px] rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#8d94a8] shrink-0">XAU</span>
                        <span className="text-[13px] font-semibold">XAU/USD</span>
                      </div>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <span className="inline-flex items-center gap-[6px] text-[11px] font-bold py-1 px-[10px] rounded-full bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">
                        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>Long
                      </span>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">$63.00</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">$52.00</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">40</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] font-bold text-[13.5px] text-[#ff5c7a]">-$440.00</td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <span className="inline-flex items-center gap-[6px] text-[11px] font-semibold py-1 px-[10px] rounded-full bg-[#161b27] border border-[#232a3a] text-[#8d94a8]">
                        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>Manual
                      </span>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029] text-right">
                      <button className="w-7 h-7 rounded-[6px] bg-transparent hover:bg-[#161b27] text-[#565e73] hover:text-[#eef1f8] flex items-center justify-center cursor-pointer ml-auto">
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#161b27] transition-colors">
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <div className="flex flex-col gap-[3px]">
                        <div className="flex gap-[6px] text-[11.5px]"><span className="text-[#565e73] w-[36px]">Open:</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[#8d94a8]">Jul 30 06:12 AM</span></div>
                        <div className="flex gap-[6px] text-[11.5px]"><span className="text-[#565e73] w-[36px]">Close:</span><span className="font-[family-name:var(--font-jetbrains-mono)] text-[#8d94a8]">Jul 31 01:38 PM</span></div>
                      </div>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <div className="flex items-center gap-[10px]">
                        <span className="w-[26px] h-[26px] rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#8d94a8] shrink-0">EUR</span>
                        <span className="text-[13px] font-semibold">EUR/USD</span>
                      </div>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <span className="inline-flex items-center gap-[6px] text-[11px] font-bold py-1 px-[10px] rounded-full bg-[rgba(0,217,163,0.12)] text-[#00d9a3]">
                        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>Long
                      </span>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">$52.00</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">$45.00</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#8d94a8]">36</td>
                    <td className="p-[14px] border-b border-[#1a2029] font-[family-name:var(--font-jetbrains-mono)] font-bold text-[13.5px] text-[#ff5c7a]">-$252.00</td>
                    <td className="p-[14px] border-b border-[#1a2029]">
                      <span className="inline-flex items-center gap-[6px] text-[11px] font-semibold py-1 px-[10px] rounded-full bg-[#161b27] border border-[#232a3a] text-[#8d94a8]">
                        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>Manual
                      </span>
                    </td>
                    <td className="p-[14px] border-b border-[#1a2029] text-right">
                      <button className="w-7 h-7 rounded-[6px] bg-transparent hover:bg-[#161b27] text-[#565e73] hover:text-[#eef1f8] flex items-center justify-center cursor-pointer ml-auto">
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-[14px_22px] border-t border-[#1a2029] text-[12.5px] text-[#8d94a8] flex-wrap gap-3">
              <span>Showing <b>1 - 2</b> of 2 trades</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-[7px] bg-[#161b27] border border-[#232a3a] text-[#565e73] opacity-50 cursor-not-allowed font-medium">Prev</button>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] px-2">Page 1 of 1</span>
                <button className="px-3 py-1.5 rounded-[7px] bg-[#161b27] border border-[#232a3a] text-[#565e73] opacity-50 cursor-not-allowed font-medium">Next</button>
              </div>
            </div>
          </section>

          {/* MT4/MT5 CONNECT HERO CTA CARD */}
          <section className="bg-[linear-gradient(135deg,#10141d_0%,#161b27_100%)] border border-[#253156] rounded-[16px] p-6 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold text-[#7aa0ff] tracking-[.1em] uppercase block mb-1">AUTOMATIC SYNC</span>
                <h3 className="font-[family-name:var(--font-sora)] text-[20px] font-bold">Connect your MetaTrader 4 / 5 Account</h3>
                <p className="text-[#8d94a8] text-[13.5px] max-w-[560px] mt-1 leading-relaxed">
                  Stop manually logging tickets. TradeFXBook connects directly to your broker to auto-import tickets, execution speeds, slippage, and floating drawdown in real-time.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] py-1 px-3 rounded-full bg-[#1c2230] text-[#00d9a3] border border-[rgba(0,217,163,0.2)]">● Auto-sync ready</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 pt-4 border-t border-[#1a2029]">
              <div className="flex items-center gap-[10px] text-[13px] text-[#8d94a8]">
                <svg className="w-[15px] h-[15px] text-[#00d9a3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"></path></svg>Zero manual data entry
              </div>
              <div className="flex items-center gap-[10px] text-[13px] text-[#8d94a8]">
                <svg className="w-[15px] h-[15px] text-[#00d9a3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"></path></svg>Institutional grade metrics
              </div>
              <div className="flex items-center gap-[10px] text-[13px] text-[#8d94a8]">
                <svg className="w-[15px] h-[15px] text-[#00d9a3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"></path></svg>Journal trades with context
              </div>
            </div>
            <button className="py-[13px] px-6 rounded-[11px] border-none bg-gradient-to-br from-[#4c7dff] to-[#3a63d9] text-white text-[14px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_18px_-8px_rgba(76,125,255,.6)]">
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
              Connect Trading Account
            </button>
            <div className="text-left text-[11.5px] text-[#565e73] mt-3">Free plan supports manual trade entry only</div>
          </section>

        </div>
      </div>
    </div>
  );
}
