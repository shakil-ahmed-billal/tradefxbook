'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TradeAnalysisView } from '@/components/views/TradeAnalysisView';
import { useDashboard } from '../DashboardContext';

export default function TradeAnalysisPage() {
  const router = useRouter();
  const { trades, selectedTradeId, setSelectedTradeId } = useDashboard();

  return (
    <TradeAnalysisView
      trades={trades}
      selectedTradeId={selectedTradeId}
      onNavigateToJournal={(tradeId) => {
        setSelectedTradeId(tradeId);
        router.push('/dashboard/journal');
      }}
    />
  );
}
