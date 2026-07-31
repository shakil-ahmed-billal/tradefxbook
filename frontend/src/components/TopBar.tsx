'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  Clock, 
  Bell, 
  ChevronDown, 
  Plus, 
  Menu,
  Sun,
  Moon,
  LogOut,
  User
} from 'lucide-react';
import { UserProfile } from '../types';

interface TopBarProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenAddTrade: () => void;
  onToggleMobileSidebar: () => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  user,
  onOpenSearch,
  onOpenAddTrade,
  onToggleMobileSidebar,
  onLogout,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      const dateOpts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
      setDateString(now.toLocaleDateString('en-US', dateOpts).toUpperCase().replace(',', ' ·'));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = (path: string) => {
    if (path === '/auth') return 'Sign In';
    if (path.includes('/trades')) return 'Trades';
    if (path.includes('/journal')) return 'Journal';
    if (path.includes('/performance')) return 'Performance Analytics';
    if (path.includes('/trade-analysis')) return 'Trade Analysis';
    if (path.includes('/market')) return 'Market Overview';
    if (path.includes('/ai-report')) return 'AI Trade Report';
    if (path.includes('/backtesting')) return 'Strategy Backtesting';
    if (path.includes('/traders-lounge')) return 'Traders Lounge';
    if (path.includes('/tools')) return 'Trader Tools';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/view')) return 'Dashboard';
    if (path.includes('/dashboard')) return 'Home';
    return 'TradeFXBook';
  };

  return (
    <header className="h-[64px] shrink-0 flex items-center justify-between px-4 lg:px-7 border-b border-[#1a1e2b] bg-[#0e1017] sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 text-[#9aa2b3] hover:text-[#f4f6fa] bg-[#141824] rounded-lg border border-[#212636]"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="font-outfit text-base lg:text-[18px] font-semibold text-[#f4f6fa] leading-tight">
            {getPageTitle(pathname)}
          </h1>
          <span className="text-[11px] text-[#5c6478] font-mono tracking-tight hidden sm:inline-block">
            {dateString || 'FRI, JUL 31 · 2026'}
          </span>
        </div>
      </div>

      {/* Center Search Trigger */}
      <button
        onClick={onOpenSearch}
        className="hidden md:flex items-center gap-2.5 bg-[#141824] border border-[#212636] rounded-xl px-3 py-1.5 text-[#5c6478] text-13px w-64 lg:w-72 hover:border-[#2a2f42] transition-colors cursor-pointer"
      >
        <Search className="w-4 h-4 text-[#5c6478] shrink-0" />
        <span className="flex-1 text-left text-xs lg:text-sm text-[#5c6478] truncate">
          Search trades, symbols...
        </span>
        <kbd className="font-mono text-[10px] bg-[#1a1f2c] px-1.5 py-0.5 rounded text-[#9aa2b3]">
          ⌘K
        </kbd>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2 lg:gap-2.5">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-transparent hover:bg-[#141824] border border-transparent hover:border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa] transition-colors"
          title="Toggle theme"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenAddTrade}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors"
          title="Add New Trade"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[#9aa2b3] px-2 py-1 bg-[#141824] border border-[#212636] rounded-lg">
          <Clock className="w-3.5 h-3.5 text-[#5aa2f2]" />
          <span>{timeString || '12:02:49 AM'}</span>
        </div>

        <button 
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-transparent hover:bg-[#141824] border border-transparent hover:border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa] transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4b5c] ring-2 ring-[#0e1017]" />
        </button>

        {/* User Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-1.5 p-0.5 cursor-pointer rounded-full"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] flex items-center justify-center font-outfit font-bold text-xs text-white">
              {user.avatarInitials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#5c6478]" />
          </button>

          {userMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-[#141824] border border-[#212636] rounded-xl shadow-xl py-1.5 z-50 text-xs text-[#9aa2b3]"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <div className="px-3 py-2 border-b border-[#212636] mb-1">
                <div className="font-semibold text-[#f4f6fa]">{user.name}</div>
                <div className="text-[10px] text-[#5c6478] truncate">{user.email}</div>
              </div>

              <button
                onClick={() => { setUserMenuOpen(false); router.push('/auth'); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#1a1f2c] hover:text-[#f4f6fa] transition-colors text-left"
              >
                <User className="w-3.5 h-3.5" />
                <span>Account Profile</span>
              </button>

              <button
                onClick={() => { setUserMenuOpen(false); onLogout(); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#ef4b5c]/10 text-[#ef4b5c] transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
