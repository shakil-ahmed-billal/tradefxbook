import React, { useState, useEffect } from 'react';
import { NavTab, Trade, UserProfile } from './types';
import { INITIAL_TRADES, INITIAL_USER, INITIAL_MARKET_RATES } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { AddTradeModal } from './components/modals/AddTradeModal';
import { ConnectBrokerModal } from './components/modals/ConnectBrokerModal';
import { ShareTradeModal } from './components/modals/ShareTradeModal';
import { SearchModal } from './components/modals/SearchModal';

import { DashboardView } from './components/views/DashboardView';
import { HomeView } from './components/views/HomeView';
import { TradesView } from './components/views/TradesView';
import { JournalView } from './components/views/JournalView';
import { PerformanceView } from './components/views/PerformanceView';
import { TradeAnalysisView } from './components/views/TradeAnalysisView';
import { AuthView } from './components/views/AuthView';
import { MarketView } from './components/views/MarketView';
import { AiReportView } from './components/views/AiReportView';
import { BacktestingView } from './components/views/BacktestingView';
import { TradersLoungeView } from './components/views/TradersLoungeView';
import { ToolsView } from './components/views/ToolsView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  
  // Persistent Trades State
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('tradefxbook_trades');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TRADES;
  });

  // Persistent User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tradefxbook_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USER;
  });

  // Modals state
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [isConnectBrokerOpen, setIsConnectBrokerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shareTrade, setShareTrade] = useState<Trade | null>(null);
  const [selectedTradeId, setSelectedTradeId] = useState<string>(trades[0]?.id || '');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tradefxbook_trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem('tradefxbook_user', JSON.stringify(user));
  }, [user]);

  const handleAddTrade = (newTrade: Trade) => {
    setTrades(prev => [newTrade, ...prev]);
    setSelectedTradeId(newTrade.id);
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all logged trades?')) {
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

  const selectedTrade = trades.find(t => t.id === selectedTradeId) || trades[0];

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f4f6fa] font-inter flex flex-col antialiased">
      <div className="flex flex-1 min-h-screen">
        
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'auth') {
              setCurrentTab('auth');
            } else {
              setCurrentTab(tab);
            }
          }}
          user={user}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenAuth={() => setCurrentTab('auth')}
          onLogout={() => setUser({ ...user, isAuthenticated: false })}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            currentTab={currentTab}
            user={user}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAddTrade={() => setIsAddTradeOpen(true)}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onOpenAuth={() => setCurrentTab('auth')}
            onLogout={() => setUser({ ...user, isAuthenticated: false })}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentTab === 'home' && (
              <HomeView
                trades={trades}
                user={user}
                onNavigate={(tab) => setCurrentTab(tab)}
                onOpenAddTrade={() => setIsAddTradeOpen(true)}
                onOpenConnectBroker={() => setIsConnectBrokerOpen(true)}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardView
                trades={trades}
                onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
                onNavigateToJournal={() => setCurrentTab('journal')}
              />
            )}

            {currentTab === 'trades' && (
              <TradesView
                trades={trades}
                onOpenAddTrade={() => setIsAddTradeOpen(true)}
                onOpenConnectBroker={() => setIsConnectBrokerOpen(true)}
                onClearAll={handleClearAll}
                onDeleteTrade={handleDeleteTrade}
                onShareTrade={(trade) => setShareTrade(trade)}
                onSelectTradeForJournal={(trade) => {
                  setSelectedTradeId(trade.id);
                  setCurrentTab('journal');
                }}
              />
            )}

            {currentTab === 'journal' && (
              <JournalView
                trades={trades}
                selectedTradeId={selectedTradeId}
                onUpdateTradeJournal={handleUpdateTradeJournal}
                onNavigateToPerformance={() => setCurrentTab('performance')}
              />
            )}

            {currentTab === 'performance' && (
              <PerformanceView
                trades={trades}
                onSelectTrade={(trade) => {
                  setSelectedTradeId(trade.id);
                  setCurrentTab('journal');
                }}
              />
            )}

            {currentTab === 'trade-analysis' && (
              <TradeAnalysisView
                trades={trades}
                selectedTradeId={selectedTradeId}
                onNavigateToJournal={(tradeId) => {
                  setSelectedTradeId(tradeId);
                  setCurrentTab('journal');
                }}
              />
            )}

            {currentTab === 'market' && (
              <MarketView rates={INITIAL_MARKET_RATES} />
            )}

            {currentTab === 'ai-report' && (
              <AiReportView trades={trades} />
            )}

            {currentTab === 'backtesting' && (
              <BacktestingView />
            )}

            {currentTab === 'traders-lounge' && (
              <TradersLoungeView />
            )}

            {currentTab === 'tools' && (
              <ToolsView />
            )}

            {currentTab === 'settings' && (
              <SettingsView
                user={user}
                onUpdateUser={(updated) => setUser(updated)}
              />
            )}

            {currentTab === 'auth' && (
              <AuthView
                onSuccessAuth={(authUser) => {
                  setUser(authUser);
                  setCurrentTab('dashboard');
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <AddTradeModal
        isOpen={isAddTradeOpen}
        onClose={() => setIsAddTradeOpen(false)}
        onAddTrade={handleAddTrade}
      />

      <ConnectBrokerModal
        isOpen={isConnectBrokerOpen}
        onClose={() => setIsConnectBrokerOpen(false)}
        onConnected={() => {
          setUser(prev => ({ ...prev, plan: 'PRO' }));
        }}
      />

      <ShareTradeModal
        isOpen={!!shareTrade}
        onClose={() => setShareTrade(null)}
        trade={shareTrade}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        trades={trades}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
      />
    </div>
  );
}
