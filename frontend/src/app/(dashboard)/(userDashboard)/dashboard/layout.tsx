'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { AddTradeModal } from '@/components/modals/AddTradeModal';
import { ConnectBrokerModal } from '@/components/modals/ConnectBrokerModal';
import { ShareTradeModal } from '@/components/modals/ShareTradeModal';
import { SearchModal } from '@/components/modals/SearchModal';
import { ImportCSVModal } from '@/components/modals/ImportCSVModal';
import { DashboardProvider, useDashboard } from './DashboardContext';
import { NavTab } from '@/types';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    trades,
    user,
    setUser,
    handleAddTrade,
    handleLogout,
    isAddTradeOpen,
    setIsAddTradeOpen,
    isConnectBrokerOpen,
    setIsConnectBrokerOpen,
    isSearchOpen,
    setIsSearchOpen,
    isImportCSVOpen,
    setIsImportCSVOpen,
    shareTrade,
    setShareTrade,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setSelectedTradeId,
  } = useDashboard();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSelectTab = (tab: NavTab) => {
    switch (tab) {
      case 'home': router.push('/dashboard'); break;
      case 'dashboard': router.push('/dashboard/view'); break;
      case 'trades': router.push('/dashboard/trades'); break;
      case 'journal': router.push('/dashboard/journal'); break;
      case 'performance': router.push('/dashboard/performance'); break;
      case 'trade-analysis': router.push('/dashboard/trade-analysis'); break;
      case 'market': router.push('/dashboard/market'); break;
      case 'ai-report': router.push('/dashboard/ai-report'); break;
      case 'backtesting': router.push('/dashboard/backtesting'); break;
      case 'traders-lounge': router.push('/dashboard/traders-lounge'); break;
      case 'tools': router.push('/dashboard/tools'); break;
      case 'settings': router.push('/dashboard/settings'); break;
      case 'auth': router.push('/login'); break;
      default: router.push('/dashboard'); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f4f6fa] font-inter antialiased flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onLogout={handleLogout}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      {/* Main Content — flex-1 fills remaining width */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          user={user}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAddTrade={() => setIsAddTradeOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Full-width content — no max-w constraint */}
        <main className="flex-1 p-5 lg:p-7 w-full">
          {children}
        </main>
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

      <ImportCSVModal
        isOpen={isImportCSVOpen}
        onClose={() => setIsImportCSVOpen(false)}
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
        onSelectTab={handleSelectTab}
        onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
      />
    </div>
  );
}

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
