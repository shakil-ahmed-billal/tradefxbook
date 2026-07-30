'import React';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isAnalysisActive = pathname?.startsWith('/analysis');

  return (
    <aside className="sidebar border-r border-[#232a3a] bg-gradient-to-b from-[#10141d] to-[#0a0d14] flex flex-col p-6 sticky top-0 h-screen overflow-y-auto z-20">
      <div className="flex items-center gap-[10px] pb-6 px-[10px]">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-[#4c7dff] to-[#2a52d6] flex items-center justify-center font-[family-name:var(--font-sora)] font-extrabold text-[15px] text-white shadow-[0_6px_18px_-6px_rgba(76,125,255,.55)] shrink-0">
          FX
        </div>
        <div>
          <div className="font-[family-name:var(--font-sora)] font-bold text-[16.5px] tracking-[-0.01em]">
            Trade<span className="text-[#7aa0ff]">FX</span>Book
          </div>
          <div className="text-[9.5px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.12em] text-[#565e73] uppercase">
            Beta
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[10px] p-[10px] border border-[#232a3a] rounded-[10px] bg-[#161b27] mb-[22px] cursor-pointer hover:border-[#2c3448] hover:bg-[#1c2230] transition-all">
        <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#3a4356] to-[#242a38] flex items-center justify-center font-[family-name:var(--font-sora)] font-bold text-[13px] text-[#eef1f8] relative shrink-0">
          SH
          <div className="absolute -bottom-[1px] -right-[1px] w-[9px] h-[9px] rounded-full bg-[#00d9a3] border-2 border-[#161b27]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[6px]">
            <span className="text-[13.5px] font-semibold text-[#eef1f8]">Shakil</span>
            <span className="text-[9px] font-bold px-[6px] py-[2px] rounded-[5px] bg-[#1c2230] text-[#8d94a8] tracking-[0.04em]">Free</span>
          </div>
          <span className="text-[11px] text-[#565e73] truncate block">xhakil2023@gmail.com</span>
        </div>
      </div>

      <div className="text-[10.5px] tracking-[0.12em] text-[#565e73] font-semibold px-[10px] mb-2 uppercase">
        Menu
      </div>
      <nav className="flex flex-col gap-[2px]">
        <Link
          href="/dashboard"
          className={`flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium transition-colors relative ${
            isActive('/dashboard') ? 'bg-[rgba(76,125,255,0.12)] text-[#eef1f8]' : 'text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8]'
          }`}
        >
          {isActive('/dashboard') && (
            <div className="absolute -left-[16px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-[2px] bg-[#4c7dff]" />
          )}
          <svg className={`w-[18px] h-[18px] shrink-0 ${isActive('/dashboard') ? 'text-[#7aa0ff]' : 'opacity-85'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
          Dashboard
        </Link>

        <Link
          href="/trades"
          className={`flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium transition-colors relative ${
            isActive('/trades') ? 'bg-[rgba(76,125,255,0.12)] text-[#eef1f8]' : 'text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8]'
          }`}
        >
          {isActive('/trades') && (
            <div className="absolute -left-[16px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-[2px] bg-[#4c7dff]" />
          )}
          <svg className={`w-[18px] h-[18px] shrink-0 ${isActive('/trades') ? 'text-[#7aa0ff]' : 'opacity-85'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            <rect width="20" height="14" x="2" y="6" rx="2"></rect>
          </svg>
          Trades
        </Link>

        <Link
          href="/journal"
          className={`flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium transition-colors relative ${
            isActive('/journal') ? 'bg-[rgba(76,125,255,0.12)] text-[#eef1f8]' : 'text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8]'
          }`}
        >
          {isActive('/journal') && (
            <div className="absolute -left-[16px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-[2px] bg-[#4c7dff]" />
          )}
          <svg className={`w-[18px] h-[18px] shrink-0 ${isActive('/journal') ? 'text-[#7aa0ff]' : 'opacity-85'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 7v14"></path>
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
          </svg>
          Journal
        </Link>

        {/* Analysis with submenu */}
        <div className="flex flex-col">
          <Link
            href="/analysis/performance"
            className={`flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium transition-colors relative ${
              isAnalysisActive ? 'bg-[rgba(76,125,255,0.12)] text-[#eef1f8]' : 'text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8]'
            }`}
          >
            {isAnalysisActive && (
              <div className="absolute -left-[16px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-[2px] bg-[#4c7dff]" />
            )}
            <svg className={`w-[18px] h-[18px] shrink-0 ${isAnalysisActive ? 'text-[#7aa0ff]' : 'opacity-85'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
              <path d="M18 17V9"></path>
              <path d="M13 17V5"></path>
              <path d="M8 17v-3"></path>
            </svg>
            Analysis
            <svg className="ml-auto w-[14px] h-[14px] rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </Link>
          <div className="flex flex-col gap-[1px] my-[2px] ml-[30px] border-l border-[#232a3a] pl-[10px]">
            <Link
              href="/analysis/performance"
              className={`flex items-center gap-[9px] px-[9px] py-[7px] rounded-[7px] text-[12.5px] font-medium transition-colors ${
                isActive('/analysis/performance') ? 'text-[#7aa0ff] bg-[rgba(76,125,255,0.12)]' : 'text-[#565e73] hover:bg-[#161b27] hover:text-[#eef1f8]'
              }`}
            >
              <svg className="w-[15px] h-[15px] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 16v5"></path>
                <path d="M16 14v7"></path>
                <path d="M20 10v11"></path>
                <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path>
                <path d="M4 18v3"></path>
                <path d="M8 14v7"></path>
              </svg>
              Performance
            </Link>
            <Link
              href="/analysis/trade-analysis"
              className={`flex items-center gap-[9px] px-[9px] py-[7px] rounded-[7px] text-[12.5px] font-medium transition-colors ${
                isActive('/analysis/trade-analysis') ? 'text-[#7aa0ff] bg-[rgba(76,125,255,0.12)]' : 'text-[#565e73] hover:bg-[#161b27] hover:text-[#eef1f8]'
              }`}
            >
              <svg className="w-[15px] h-[15px] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.7.7l3.6 3.6a2.4 2.4 0 0 1 .7 1.7v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Trade Analysis
            </Link>
          </div>
        </div>

        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
          Market
        </Link>
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M9 13a4.5 4.5 0 0 0 3-4"></path>
          </svg>
          AI Report
          <span className="ml-auto text-[9px] font-bold px-[6px] py-[2px] rounded-[5px] bg-gradient-to-br from-[#3a2f0e] to-[#2a2410] text-[#f2b84b] border border-[rgba(242,184,75,.25)] tracking-[0.04em]">PRO</span>
        </Link>
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          Backtesting
          <span className="ml-auto text-[9px] font-bold px-[6px] py-[2px] rounded-[5px] bg-gradient-to-br from-[#3a2f0e] to-[#2a2410] text-[#f2b84b] border border-[rgba(242,184,75,.25)] tracking-[0.04em]">ELITE</span>
        </Link>
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
          </svg>
          Traders Lounge
        </Link>
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1c.32-.32.86-.22.98.22a6 6 0 0 1-8.26 7.06l-7.9 7.9a1 1 0 0 1-3-3l7.9-7.9a6 6 0 0 1 7.06-8.26c.44.12.54.66.22.98z"></path>
          </svg>
          Tools
        </Link>
      </nav>

      <div className="mt-auto pt-[18px] border-t border-[#232a3a] flex flex-col gap-[2px]">
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M9.67 4.14a2.34 2.34 0 0 1 4.66 0 2.34 2.34 0 0 0 3.32 1.9 2.34 2.34 0 0 1 2.33 4.04 2.34 2.34 0 0 0 0 3.83 2.34 2.34 0 0 1-2.33 4.03 2.34 2.34 0 0 0-3.32 1.92 2.34 2.34 0 0 1-4.66 0 2.34 2.34 0 0 0-3.32-1.92 2.34 2.34 0 0 1-2.33-4.03 2.34 2.34 0 0 0 0-3.83A2.34 2.34 0 0 1 6.35 6.05a2.34 2.34 0 0 0 3.32-1.9"></path><circle cx="12" cy="12" r="3"></circle>
          </svg>
          Settings
        </Link>
        <Link href="#" className="flex items-center gap-[11px] px-[10px] py-[9px] rounded-[9px] text-[13.5px] font-medium text-[#8d94a8] hover:bg-[#161b27] hover:text-[#eef1f8] transition-colors">
          <svg className="w-[18px] h-[18px] shrink-0 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>
          </svg>
          Help &amp; Support
        </Link>
      </div>
    </aside>
  );
}
