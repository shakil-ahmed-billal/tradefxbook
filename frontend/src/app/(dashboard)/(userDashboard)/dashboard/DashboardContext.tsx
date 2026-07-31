'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trade, UserProfile } from '@/types';
import { INITIAL_TRADES, INITIAL_USER } from '@/data/initialData';

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
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tradefxbook_trades');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_TRADES;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tradefxbook_user');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_USER;
  });

  const [selectedTradeId, setSelectedTradeId] = useState<string>(trades[0]?.id || '');
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [isConnectBrokerOpen, setIsConnectBrokerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shareTrade, setShareTrade] = useState<Trade | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tradefxbook_trades', JSON.stringify(trades));
    }
  }, [trades]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tradefxbook_user', JSON.stringify(user));
    }
  }, [user]);

  const handleAddTrade = (newTrade: Trade) => {
    setTrades(prev => [newTrade, ...prev]);
    setSelectedTradeId(newTrade.id);
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const handleClearAll = () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear all logged trades?')) {
      setTrades([]);
    }
  };

  const handleUpdateTradeJournal = (tradeId: string, updatedJournal: any) => {
    setTrades(prev => prev.map(t => {
      if (t.id === tradeId) {
        return {
          ...t,
          journalStatus: 'Journaled',
          journal: updatedJournal,
        };
      }
      return t;
    }));
  };

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
