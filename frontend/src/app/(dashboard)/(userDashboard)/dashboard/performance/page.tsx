'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PerformanceView } from '@/components/views/PerformanceView';
import { useDashboard } from '../DashboardContext';

export default function PerformancePage() {
  const router = useRouter();
  const { trades, setSelectedTradeId } = useDashboard();

  return (
    <PerformanceView
      trades={trades}
      onSelectTrade={(trade) => {
        setSelectedTradeId(trade.id);
        router.push('/dashboard/journal');
      }}
    />
  );
}
