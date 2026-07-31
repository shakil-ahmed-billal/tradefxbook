'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardView } from '@/components/views/DashboardView';
import { useDashboard } from '../DashboardContext';

export default function UserDashboardViewPage() {
  const router = useRouter();
  const { trades, setSelectedTradeId } = useDashboard();

  return (
    <DashboardView
      trades={trades}
      onSelectTrade={(trade) => setSelectedTradeId(trade.id)}
      onNavigateToJournal={() => router.push('/dashboard/journal')}
    />
  );
}
