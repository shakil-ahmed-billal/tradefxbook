'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home,
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  LineChart, 
  TrendingUp, 
  Sparkles, 
  History, 
  Users, 
  Wrench, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  FileText,
  BarChart2,
  LogIn,
  LogOut,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive, isCollapsed, badge, onClick }) => (
  <div className="relative group">
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 relative w-full
        ${isCollapsed ? 'px-0 py-2.5 justify-center' : 'px-2.5 py-2'}
        ${isActive 
          ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
          : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
        }`}
    >
      {isActive && (
        <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#2981eb] rounded-r" />
      )}
      <span className={`shrink-0 ${isActive ? 'text-[#5aa2f2]' : ''}`}>{icon}</span>
      {!isCollapsed && <span className="truncate">{label}</span>}
      {!isCollapsed && badge}
    </Link>
    {/* Tooltip when collapsed */}
    {isCollapsed && (
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[100] pointer-events-none">
        <div className="bg-[#1c2230] border border-[#2a3244] text-[#f4f6fa] text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {label}
        </div>
      </div>
    )}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  isOpenMobile = false,
  onCloseMobile,
  onLogout,
  onCollapsedChange,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    }
    return false;
  });

  const getCurrentTab = (): NavTab => {
    if (pathname === '/auth') return 'auth';
    if (pathname === '/dashboard/trades') return 'trades';
    if (pathname === '/dashboard/journal') return 'journal';
    if (pathname === '/dashboard/performance') return 'performance';
    if (pathname === '/dashboard/trade-analysis') return 'trade-analysis';
    if (pathname === '/dashboard/market') return 'market';
    if (pathname === '/dashboard/ai-report') return 'ai-report';
    if (pathname === '/dashboard/backtesting') return 'backtesting';
    if (pathname === '/dashboard/traders-lounge') return 'traders-lounge';
    if (pathname === '/dashboard/tools') return 'tools';
    if (pathname === '/dashboard/settings') return 'settings';
    if (pathname === '/dashboard/view') return 'dashboard';
    return 'home';
  };

  const currentTab = getCurrentTab();

  const [analysisExpanded, setAnalysisExpanded] = useState(
    currentTab === 'performance' || currentTab === 'trade-analysis'
  );

  useEffect(() => {
    if (currentTab === 'performance' || currentTab === 'trade-analysis') {
      setAnalysisExpanded(true);
    }
  }, [currentTab]);

  const handleToggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar_collapsed', String(next));
    }
    onCollapsedChange?.(next);
  };

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  const proBadge = (
    <span className="ml-auto font-mono text-[9px] font-semibold text-[#5aa2f2] bg-[rgba(41,129,235,0.14)] border border-[rgba(41,129,235,0.3)] px-1.5 py-0.5 rounded">
      PRO
    </span>
  );

  const eliteBadge = (
    <span className="ml-auto font-mono text-[9px] font-semibold text-[#f5c451] bg-[rgba(245,196,81,0.1)] border border-[rgba(245,196,81,0.3)] px-1.5 py-0.5 rounded">
      ELITE
    </span>
  );

  const sidebarWidth = isCollapsed ? 'w-[68px]' : 'w-[264px]';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-[#0e1017] border-r border-[#1a1e2b]
        flex flex-col z-50 transition-all duration-200 ease-in-out overflow-hidden shrink-0
        ${sidebarWidth}
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo Row */}
        <div className={`flex items-center border-b border-[#1a1e2b] ${isCollapsed ? 'justify-center px-2 py-4' : 'px-4 py-4'}`}>
          {isCollapsed ? (
            <Link href="/dashboard" onClick={handleNavClick} className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] shadow-lg shadow-[#2981eb]/25">
              <span className="font-outfit font-black text-white text-xs">FX</span>
            </Link>
          ) : (
            <Link href="/dashboard" onClick={handleNavClick} className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] shadow-md shadow-[#2981eb]/25 shrink-0">
                <span className="font-outfit font-black text-white text-[11px]">FX</span>
              </div>
              <div className="min-w-0">
                <div className="font-outfit font-bold text-[14.5px] tracking-tight leading-tight">
                  TradeFX<span className="text-[#5aa2f2]">Book</span>
                </div>
                <div className="font-mono text-[9px] tracking-widest text-[#5c6478] uppercase">Beta</div>
              </div>
            </Link>
          )}

          {/* Collapse toggle — only on desktop */}
          {!isCollapsed && (
            <button
              onClick={handleToggleCollapse}
              className="ml-auto shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#5c6478] hover:text-[#f4f6fa] hover:bg-[#1a1f2c] transition-colors lg:flex hidden"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={handleToggleCollapse}
              className="absolute -right-3.5 top-[52px] w-7 h-7 rounded-full bg-[#1c2230] border border-[#2a3244] flex items-center justify-center text-[#8d94a8] hover:text-[#f4f6fa] shadow-lg z-50 transition-colors lg:flex hidden"
              title="Expand sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1">

          {/* User Card */}
          {!isCollapsed ? (
            <Link 
              href="/dashboard/settings"
              onClick={handleNavClick}
              className="flex items-center gap-2.5 bg-[#141824] border border-[#212636] rounded-xl p-2.5 mb-3 cursor-pointer hover:border-[#2a2f42] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] flex items-center justify-center font-outfit font-bold text-xs text-white shrink-0 relative">
                {user.avatarInitials}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c58b] border-2 border-[#141824]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#f4f6fa] truncate">{user.name}</span>
                  <span className="font-mono text-[9px] tracking-wider text-[#9aa2b3] bg-[#1a1f2c] px-1.5 py-0.5 rounded">
                    {user.plan}
                  </span>
                </div>
                <span className="text-[11px] text-[#5c6478] block truncate">{user.email}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#5c6478] shrink-0" />
            </Link>
          ) : (
            <div className="relative group mb-3 flex justify-center">
              <Link href="/dashboard/settings" onClick={handleNavClick} className="block">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] flex items-center justify-center font-outfit font-bold text-xs text-white relative">
                  {user.avatarInitials}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c58b] border-2 border-[#141824]" />
                </div>
              </Link>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[100] pointer-events-none">
                <div className="bg-[#1c2230] border border-[#2a3244] text-[#f4f6fa] text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.name} · {user.plan}
                </div>
              </div>
            </div>
          )}

          {/* Menu Label */}
          {!isCollapsed && (
            <span className="font-mono text-[10px] tracking-widest text-[#5c6478] px-1 mb-1 block font-semibold uppercase">
              Menu
            </span>
          )}
          {isCollapsed && <div className="w-full border-t border-[#1a1e2b] mb-2" />}

          {/* Main Nav */}
          <NavItem href="/dashboard" icon={<Home className="w-4 h-4" />} label="Home" isActive={currentTab === 'home'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/view" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" isActive={currentTab === 'dashboard'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/trades" icon={<Briefcase className="w-4 h-4" />} label="Trades" isActive={currentTab === 'trades'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/journal" icon={<BookOpen className="w-4 h-4" />} label="Journal" isActive={currentTab === 'journal'} isCollapsed={isCollapsed} onClick={handleNavClick} />

          {/* Analysis Submenu */}
          {!isCollapsed ? (
            <div>
              <button
                onClick={() => {
                  setAnalysisExpanded(!analysisExpanded);
                  if (!analysisExpanded) router.push('/dashboard/performance');
                }}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
                  (currentTab === 'performance' || currentTab === 'trade-analysis')
                    ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                    : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
                }`}
              >
                {(currentTab === 'performance' || currentTab === 'trade-analysis') && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#2981eb] rounded-r" />
                )}
                <LineChart className="w-4 h-4 shrink-0" />
                <span>Analysis</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${analysisExpanded ? 'rotate-180' : ''}`} />
              </button>

              {analysisExpanded && (
                <div className="flex flex-col gap-0.5 my-1 ml-7 pl-2.5 border-l border-[#212636]">
                  <Link
                    href="/dashboard/performance"
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full text-left ${
                      currentTab === 'performance'
                        ? 'text-[#5aa2f2] bg-[rgba(41,129,235,0.12)]'
                        : 'text-[#5c6478] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Performance</span>
                  </Link>

                  <Link
                    href="/dashboard/trade-analysis"
                    onClick={handleNavClick}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full text-left ${
                      currentTab === 'trade-analysis'
                        ? 'text-[#5aa2f2] bg-[rgba(41,129,235,0.12)]'
                        : 'text-[#5c6478] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Trade Analysis</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <NavItem href="/dashboard/performance" icon={<LineChart className="w-4 h-4" />} label="Analysis" isActive={currentTab === 'performance' || currentTab === 'trade-analysis'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          )}

          <NavItem href="/dashboard/market" icon={<TrendingUp className="w-4 h-4" />} label="Market" isActive={currentTab === 'market'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/ai-report" icon={<Sparkles className="w-4 h-4 text-[#5aa2f2]" />} label="AI Report" isActive={currentTab === 'ai-report'} isCollapsed={isCollapsed} badge={proBadge} onClick={handleNavClick} />
          <NavItem href="/dashboard/backtesting" icon={<History className="w-4 h-4" />} label="Backtesting" isActive={currentTab === 'backtesting'} isCollapsed={isCollapsed} badge={eliteBadge} onClick={handleNavClick} />
          <NavItem href="/dashboard/traders-lounge" icon={<Users className="w-4 h-4" />} label="Traders Lounge" isActive={currentTab === 'traders-lounge'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/tools" icon={<Wrench className="w-4 h-4" />} label="Tools" isActive={currentTab === 'tools'} isCollapsed={isCollapsed} onClick={handleNavClick} />
        </div>

        {/* Bottom Support Section */}
        <div className={`border-t border-[#1a1e2b] py-3 px-3 flex flex-col gap-0.5`}>
          {!isCollapsed && (
            <span className="font-mono text-[10px] tracking-widest text-[#5c6478] px-1 mb-1 block font-semibold uppercase">
              Support
            </span>
          )}
          {isCollapsed && <div className="mb-1" />}

          <NavItem href="/dashboard/settings" icon={<Settings className="w-4 h-4" />} label="Settings" isActive={currentTab === 'settings'} isCollapsed={isCollapsed} onClick={handleNavClick} />
          <NavItem href="/dashboard/settings" icon={<HelpCircle className="w-4 h-4" />} label="Help & Support" isActive={currentTab === 'help'} isCollapsed={isCollapsed} onClick={handleNavClick} />

          {/* Sign Out */}
          <div className="relative group">
            <button
              onClick={() => {
                if (user.isAuthenticated && onLogout) {
                  onLogout();
                } else {
                  router.push('/auth');
                }
              }}
              className={`flex items-center rounded-lg text-[13.5px] font-medium text-[#ef4b5c]/80 hover:text-[#ef4b5c] hover:bg-[#ef4b5c]/10 transition-colors w-full text-left
                ${isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-2.5 px-2.5 py-2'}
              `}
            >
              {user.isAuthenticated ? (
                <>
                  <LogOut className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Sign Out</span>}
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 shrink-0 text-[#5aa2f2]" />
                  {!isCollapsed && <span className="text-[#5aa2f2]">Sign In</span>}
                </>
              )}
            </button>
            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[100] pointer-events-none">
                <div className="bg-[#1c2230] border border-[#2a3244] text-[#f4f6fa] text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.isAuthenticated ? 'Sign Out' : 'Sign In'}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
