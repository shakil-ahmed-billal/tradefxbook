"use client";

import React from 'react';
import { SettingsView } from '@/components/views/SettingsView';
import { useDashboard } from '../DashboardContext';

export default function SettingsPage() {
  const { user, setUser } = useDashboard();
  return (
    <div className="w-full h-full">
      <SettingsView user={user} onUpdateUser={setUser} />
    </div>
  );
}
