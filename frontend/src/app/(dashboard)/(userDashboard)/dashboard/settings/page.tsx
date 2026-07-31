"use client";

import React from 'react';
import { SettingsView } from '@/components/views/SettingsView';

export default function SettingsPage() {
  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8">
      <SettingsView />
    </div>
  );
}
