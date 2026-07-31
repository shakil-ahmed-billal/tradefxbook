'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TradesView } from '@/components/views/TradesView';
import { useDashboard } from '../DashboardContext';

export default function TradesPage() {
  const router = useRouter();
  const {
    trades,
    setIsAddTradeOpen,
    setIsConnectBrokerOpen,
    handleClearAll,
    handleDeleteTrade,
    setShareTrade,
    setSelectedTradeId,
  } = useDashboard();

  return (
    <TradesView
      trades={trades}
      onOpenAddTrade={() => setIsAddTradeOpen(true)}
      onOpenConnectBroker={() => setIsConnectBrokerOpen(true)}
      onClearAll={handleClearAll}
      onDeleteTrade={handleDeleteTrade}
      onShareTrade={(trade) => setShareTrade(trade)}
      onSelectTradeForJournal={(trade) => {
        setSelectedTradeId(trade.id);
        router.push('/dashboard/journal');
      }}
    />
  );
}
