'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HomeView } from '@/components/views/HomeView';
import { useDashboard } from './DashboardContext';
import { NavTab } from '@/types';

export default function UserHomePage() {
  const router = useRouter();
  const { trades, user, setIsAddTradeOpen, setIsConnectBrokerOpen } = useDashboard();

  const handleNavigate = (tab: NavTab) => {
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
      case 'auth': router.push('/auth'); break;
      default: router.push('/dashboard'); break;
    }
  };

  return (
    <HomeView
      trades={trades}
      user={user}
      onNavigate={handleNavigate}
      onOpenAddTrade={() => setIsAddTradeOpen(true)}
      onOpenConnectBroker={() => setIsConnectBrokerOpen(true)}
    />
  );
}
