'use client';

import React from 'react';
import { AiReportView } from '@/components/views/AiReportView';
import { useDashboard } from '../DashboardContext';

export default function AiReportPage() {
  const { trades } = useDashboard();
  return <AiReportView trades={trades} />;
}
