'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { JournalView } from '@/components/views/JournalView';
import { useDashboard } from '../DashboardContext';

export default function JournalPage() {
  const router = useRouter();
  const { trades, selectedTradeId, handleUpdateTradeJournal } = useDashboard();

  return (
    <JournalView
      trades={trades}
      selectedTradeId={selectedTradeId}
      onUpdateTradeJournal={handleUpdateTradeJournal}
      onNavigateToPerformance={() => router.push('/dashboard/performance')}
    />
  );
}
