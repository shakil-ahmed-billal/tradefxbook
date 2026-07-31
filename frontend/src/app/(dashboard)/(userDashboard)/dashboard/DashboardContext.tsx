'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trade, UserProfile } from '@/types';
import { INITIAL_USER } from '@/data/initialData';
import { authClient } from '@/lib/auth-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const LS_USER_KEY = 'tradefxbook_user';
const LS_AUTH_KEY = 'tradefxbook_authenticated';
const LS_TRADES_KEY = 'tradefxbook_trades';

/** Convert a raw backend/Prisma trade record to the frontend Trade shape */
function mapApiTrade(raw: any): Trade {
  const pnl = Number(raw.pnl ?? 0);
  const entryPrice = Number(raw.entryPrice ?? raw.opening_price ?? 0);
  const exitPrice = Number(raw.exitPrice ?? raw.closing_price ?? 0);
  const size = Number(raw.quantity ?? raw.lots ?? raw.size ?? 0);

  // Derive pairCode from symbol (e.g. XAU/USD → XAU, EUR/USD → EU)
  const symbol: string = raw.symbol ?? 'UNKNOWN';
  const parts = symbol.split('/');
  const pairCode = parts.length >= 2
    ? parts[0].length > 3 ? parts[0] : parts[0] + (parts[1]?.[0] ?? '')
    : symbol.slice(0, 3);

  // Normalize type: backend uses LONG/SHORT, frontend uses long/short
  const rawType = (raw.type ?? '').toString().toUpperCase();
  const type: 'long' | 'short' = rawType === 'LONG' || rawType === 'BUY' ? 'long' : 'short';

  // Normalize status: backend uses CLOSED/OPEN, frontend uses closed/open
  const rawStatus = (raw.status ?? '').toString().toUpperCase();
  const status: 'closed' | 'open' = rawStatus === 'CLOSED' ? 'closed' : 'open';

  // Derive outcome from pnl
  const outcome: 'Winner' | 'Loser' | 'Breakeven' =
    pnl > 0 ? 'Winner' : pnl < 0 ? 'Loser' : 'Breakeven';

  // Normalize source
  const rawSource = (raw.source ?? 'MANUAL').toString().toUpperCase();
  const source: 'Manual' | 'MT4/MT5' = rawSource === 'MT4' || rawSource === 'MT5' ? 'MT4/MT5' : 'Manual';

  // Timestamps: backend uses openedAt/closedAt (ISO strings or Date)
  const openTime = raw.openTime ?? raw.openedAt ?? raw.opening_time_utc ?? new Date().toISOString();
  const closeTime = raw.closeTime ?? raw.closedAt ?? raw.closing_time_utc ?? new Date().toISOString();

  return {
    id: String(raw.id ?? raw.ticket ?? Math.random()),
    symbol,
    pairCode,
    type,
    entryPrice,
    exitPrice,
    size,
    pnl,
    openTime: typeof openTime === 'string' ? openTime : new Date(openTime).toISOString(),
    closeTime: typeof closeTime === 'string' ? closeTime : new Date(closeTime).toISOString(),
    source,
    status,
    outcome,
    journalStatus: raw.journalStatus ?? 'Pending',
    score: Number(raw.score ?? 0),
    duration: raw.duration,
    priceMovePercent: raw.priceMovePercent,
    journal: raw.journalEntry ?? raw.journal,
  };
}

interface DashboardContextType {
  trades: Trade[];
  user: UserProfile;
  selectedTradeId: string;
  setSelectedTradeId: (id: string) => void;
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  handleAddTrade: (trade: Trade) => void;
  handleDeleteTrade: (id: string) => void;
  handleClearAll: () => void;
  handleUpdateTradeJournal: (tradeId: string, updatedJournal: any) => void;
  handleLogout: () => void;
  isAddTradeOpen: boolean;
  setIsAddTradeOpen: (open: boolean) => void;
  isConnectBrokerOpen: boolean;
  setIsConnectBrokerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  shareTrade: Trade | null;
  setShareTrade: (trade: Trade | null) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isImportCSVOpen: boolean;
  setIsImportCSVOpen: (open: boolean) => void;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

function getLocalUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(LS_USER_KEY);
    if (saved) {
      const u = JSON.parse(saved) as UserProfile;
      if (u.isAuthenticated) return u;
    }
  } catch {}
  return null;
}

function getLocalTrades(): Trade[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(LS_TRADES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.map(mapApiTrade);
    }
  } catch {}
  return [];
}

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [trades, setTrades] = useState<Trade[]>(getLocalTrades);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [selectedTradeId, setSelectedTradeId] = useState<string>('');
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [isConnectBrokerOpen, setIsConnectBrokerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
  const [shareTrade, setShareTrade] = useState<Trade | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Sync trades to localStorage whenever trades change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_TRADES_KEY, JSON.stringify(trades));
    }
  }, [trades]);

  useEffect(() => {
    if (isPending) return; // Still resolving session, wait

    const localUser = getLocalUser();

    if (session) {
      // ✅ Better-Auth session active
      const resolvedUser: UserProfile = {
        name: session.user.name || session.user.email.split('@')[0],
        email: session.user.email,
        plan: 'FREE',
        avatarInitials: (session.user.name || session.user.email).charAt(0).toUpperCase(),
        isAuthenticated: true,
      };
      setUser(resolvedUser);
      localStorage.setItem(LS_USER_KEY, JSON.stringify(resolvedUser));
      localStorage.setItem(LS_AUTH_KEY, '1');

      // Fetch ALL trades from backend without 15 limitation
      fetch(`${API_URL}/api/trades?limit=1000`, { credentials: 'include' })
        .then(res => res.ok ? res.json() : null)
        .then(result => {
          if (result?.data && Array.isArray(result.data)) {
            const mapped = result.data.map(mapApiTrade);
            setTrades(mapped);
            if (mapped.length > 0) setSelectedTradeId(String(mapped[0].id));
          }
        })
        .catch(() => console.warn('Backend offline — using local trades.'))
        .finally(() => { setIsLoading(false); setAuthChecked(true); });

    } else if (localUser) {
      // ✅ Offline mode with local trades
      setUser(localUser);
      setTrades(getLocalTrades());
      setIsLoading(false);
      setAuthChecked(true);
    } else {
      // ❌ No session anywhere — redirect to login
      setIsLoading(false);
      setAuthChecked(true);
      router.replace('/login');
    }
  }, [session, isPending]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    localStorage.removeItem(LS_USER_KEY);
    localStorage.removeItem(LS_AUTH_KEY);
    localStorage.removeItem(LS_TRADES_KEY);
    router.replace('/login');
  };

  const handleAddTrade = async (newTrade: Trade) => {
    setTrades(prev => [newTrade, ...prev]);
    setSelectedTradeId(newTrade.id);
    try {
      await fetch(`${API_URL}/api/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newTrade),
      });
    } catch {}
  };

  const handleDeleteTrade = async (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
    try {
      await fetch(`${API_URL}/api/trades/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch {}
  };

  const handleClearAll = async () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear all logged trades?')) {
      setTrades([]);
      localStorage.removeItem(LS_TRADES_KEY);
    }
  };

  const handleUpdateTradeJournal = async (tradeId: string, updatedJournal: any) => {
    setTrades(prev => prev.map(t =>
      t.id === tradeId ? { ...t, journalStatus: 'Journaled', journal: updatedJournal } : t
    ));
    try {
      await fetch(`${API_URL}/api/trades/${tradeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ journalStatus: 'Journaled', journal: updatedJournal }),
      });
    } catch {}
  };

  if (isPending || !authChecked) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#2981eb] border-t-transparent animate-spin" />
          <p className="text-xs text-[#5c6478] font-mono tracking-widest uppercase">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!session && !getLocalUser()) return null;

  return (
    <DashboardContext.Provider value={{
      trades,
      user,
      selectedTradeId,
      setSelectedTradeId,
      setTrades,
      setUser,
      handleAddTrade,
      handleDeleteTrade,
      handleClearAll,
      handleUpdateTradeJournal,
      handleLogout,
      isAddTradeOpen,
      setIsAddTradeOpen,
      isConnectBrokerOpen,
      setIsConnectBrokerOpen,
      isSearchOpen,
      setIsSearchOpen,
      shareTrade,
      setShareTrade,
      isMobileSidebarOpen,
      setIsMobileSidebarOpen,
      isImportCSVOpen,
      setIsImportCSVOpen,
      isLoading,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
