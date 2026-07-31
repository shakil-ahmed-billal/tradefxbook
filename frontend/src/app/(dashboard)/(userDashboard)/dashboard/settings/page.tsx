'use client';

import React from 'react';
import { SettingsView } from '@/components/views/SettingsView';
import { useDashboard } from '../DashboardContext';

export default function SettingsPage() {
  const { user, setUser } = useDashboard();
  return <SettingsView user={user} onUpdateUser={setUser} />;
}
