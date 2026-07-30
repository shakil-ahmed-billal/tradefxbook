'use client';

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-[#f4f6fa] font-[family-name:var(--font-inter)] antialiased overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] min-h-screen">
        
        {/* LEFT: AUTH */}
        <section className="bg-[#0e1017] flex flex-col justify-between p-10 lg:px-12 lg:py-10 border-r border-[#1a1e2b] relative z-20">
          <div className="flex items-center gap-[10px]">
            <svg className="h-[22px] w-auto text-[#f4f6fa]" viewBox="0 0 443 209" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M154.851 31.749C156.716 31.749 158.129 33.4327 157.806 35.2694L151.113 73.2694C150.86 74.7034 149.614 75.749 148.158 75.749H103.942C102.487 75.749 101.241 76.7938 100.988 78.227L78.3641 206.271C78.1109 207.704 76.8654 208.749 75.4099 208.749H26.0027C24.1371 208.749 22.7239 207.064 23.0485 205.227L45.3039 79.271C45.6285 77.4338 44.2153 75.749 42.3496 75.749H3.00082C1.13582 75.749 -0.277217 74.0654 0.0462986 72.2286L6.73948 34.2286C6.99207 32.7946 8.23791 31.749 9.694 31.749H154.851Z" fill="currentColor"></path>
              <path d="M391.523 31.749C407.523 31.749 419.939 34.9158 428.773 41.249C437.773 47.4157 442.273 56.499 442.273 68.499C442.273 71.3324 442.023 74.4157 441.523 77.749C439.689 88.0823 435.439 96.8324 428.773 103.999C423.987 109.024 418.513 112.847 412.353 115.467C410.437 116.282 410.428 119.751 412.315 120.629C417.366 122.977 421.435 126.267 424.523 130.499C429.189 136.499 431.523 143.582 431.523 151.749C431.523 154.416 431.273 157.249 430.773 160.249C428.106 175.749 420.856 187.749 409.023 196.249C397.356 204.582 381.939 208.749 362.773 208.749H272.407C271.163 208.749 270.221 207.626 270.437 206.401L281.183 145.535C281.464 143.942 283.423 143.325 284.567 144.469L313.037 172.939C316.187 176.089 321.572 173.859 321.573 169.404V33.749C321.573 32.6445 322.468 31.749 323.573 31.749H391.523Z" fill="currentColor"></path>
            </svg>
            <span className="font-[family-name:var(--font-outfit)] font-bold text-[17px] tracking-[-0.01em]">TradeFXBook</span>
          </div>

          <div className="w-full max-w-[340px] mx-auto my-auto">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[.14em] uppercase text-[#5aa2f2] flex items-center gap-[8px] mb-[18px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#22c58b] shadow-[0_0_0_3px_rgba(34,197,139,.18)]" />
              Journal online
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-[28px] font-bold tracking-[-0.02em] leading-[1.15] mb-[8px]">
              Welcome back, trader
            </h1>
            <p className="text-[#9aa2b3] text-[14.5px] leading-[1.5] mb-[30px]">
              Sign in to review your open positions and today&apos;s journal entries.
            </p>

            <button type="button" className="w-full flex items-center justify-center gap-[10px] py-[12px] px-[16px] bg-[#141824] border border-[#212636] rounded-[10px] text-[#f4f6fa] text-[14px] font-medium hover:border-[#39415a] hover:-translate-y-[1px] transition-all cursor-pointer">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-[12px] my-[22px] text-[#5c6478] text-[12px] before:content-[''] before:flex-1 before:h-[1px] before:bg-[#212636] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#212636]">
              OR CONTINUE WITH EMAIL
            </div>

            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
              <div className="mb-[16px]">
                <label className="block text-[12.5px] font-medium text-[#9aa2b3] mb-[7px]">Email address</label>
                <div className="relative flex items-center">
                  <svg className="absolute left-[14px] w-[16px] h-[16px] text-[#5c6478] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M22 7l-10 6L2 7"></path></svg>
                  <input type="email" placeholder="you@tradingdesk.com" defaultValue="xhakil2023@gmail.com" required className="w-full bg-[#141824] border border-[#212636] rounded-[10px] py-[12px] px-[14px] pl-[40px] text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,.14)] transition-all" />
                </div>
              </div>

              <div className="mb-[16px]">
                <label className="block text-[12.5px] font-medium text-[#9aa2b3] mb-[7px]">Password</label>
                <div className="relative flex items-center">
                  <svg className="absolute left-[14px] w-[16px] h-[16px] text-[#5c6478] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input type="password" placeholder="••••••••" defaultValue="password" required className="w-full bg-[#141824] border border-[#212636] rounded-[10px] py-[12px] px-[14px] pl-[40px] text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,.14)] transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full py-[12.5px] px-[16px] mt-[6px] border-none rounded-[10px] bg-[#2981eb] text-white text-[14.5px] font-semibold hover:bg-[#5aa2f2] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-[8px] cursor-pointer">
                Sign in
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
              </button>
            </form>

            <p className="mt-[22px] text-[12px] text-[#5c6478] leading-[1.6] text-center">
              By continuing, you agree to our <Link href="/terms" className="text-[#9aa2b3] border-b border-[#212636] hover:text-[#5aa2f2]">Terms</Link> and <Link href="/privacy" className="text-[#9aa2b3] border-b border-[#212636] hover:text-[#5aa2f2]">Privacy Policy</Link>
            </p>
          </div>

          <div className="text-[12px] text-[#5c6478] flex justify-between">
            <span>© 2026 TradeFXBook</span>
            <Link href="/support" className="hover:text-[#9aa2b3]">Need help?</Link>
          </div>
        </section>

        {/* RIGHT: SHOWCASE */}
        <section className="relative bg-[#090b10] flex flex-col justify-between p-14 lg:p-16 overflow-hidden hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_15%_-10%,rgba(41,129,235,.18),transparent_55%),radial-gradient(900px_600px_at_100%_100%,rgba(34,197,139,.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(#1a1e2b_1px,transparent_1px),linear-gradient(90deg,#1a1e2b_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_60%_40%,black_0%,transparent_75%)] opacity-50 pointer-events-none" />

          <div className="relative z-10 max-w-[480px]">
            <div className="inline-flex items-center gap-[7px] font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] tracking-[.06em] text-[#22c58b] bg-[rgba(34,197,139,.08)] border border-[rgba(34,197,139,.25)] py-[6px] px-[12px] rounded-full mb-[22px]">
              ▲ Live journal · +18.4% this month
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-[38px] font-bold leading-[1.12] tracking-[-0.02em] mb-[16px]">
              Every trade, <em className="not-italic bg-[linear-gradient(90deg,#5aa2f2,#2981eb)] bg-clip-text text-transparent">logged and understood.</em>
            </h2>
            <p className="text-[#9aa2b3] text-[15px] leading-[1.6] max-w-[400px]">
              MT4/MT5 auto-sync, real analytics, and a global desk of traders — TradeFXBook turns your history into your edge.
            </p>
          </div>

          <div className="relative z-20 bg-[rgba(20,24,36,.55)] border border-[#212636] rounded-[16px] p-6 backdrop-blur-[6px] my-7">
            <div className="flex justify-between items-start mb-[14px]">
              <div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#9aa2b3] tracking-[.03em]">EQUITY CURVE — 30D</div>
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-[20px] font-semibold text-[#f4f6fa]">$48,206.40</div>
              </div>
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] text-[#22c58b] text-right">
                ▲ +12.7%<br /><span className="text-[#5c6478]">since last sync</span>
              </div>
            </div>
            <svg className="block w-full h-[130px]" viewBox="0 0 480 130" preserveAspectRatio="none">
              <g stroke="#22c58b" strokeWidth="2">
                <line x1="20" y1="60" x2="20" y2="95" />
                <line x1="45" y1="50" x2="45" y2="80" />
                <line x1="70" y1="70" x2="70" y2="100" stroke="#ef4b5c" />
                <line x1="95" y1="40" x2="95" y2="75" />
                <line x1="120" y1="55" x2="120" y2="90" stroke="#ef4b5c" />
                <line x1="145" y1="30" x2="145" y2="65" />
              </g>
              <path d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5 L480,130 L0,130 Z" fill="url(#loginG)" opacity="0.8" />
              <path d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5" fill="none" stroke="#2981eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="loginG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2981EB" stopOpacity="0.35"></stop>
                  <stop offset="100%" stopColor="#2981EB" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 flex gap-9">
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[20px] font-semibold text-[#f4f6fa] block">12,847</span>
              <span className="text-[12px] text-[#5c6478] mt-[3px] block">Active traders</span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[20px] font-semibold text-[#f4f6fa] block">8.2M</span>
              <span className="text-[12px] text-[#5c6478] mt-[3px] block">Trades synced</span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[20px] font-semibold text-[#f4f6fa] block">99.99%</span>
              <span className="text-[12px] text-[#5c6478] mt-[3px] block">Uptime</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
