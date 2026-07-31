'use client';

import React from 'react';
import { MarketView } from '@/components/views/MarketView';
import { INITIAL_MARKET_RATES } from '@/data/initialData';

export default function MarketPage() {
  return <MarketView rates={INITIAL_MARKET_RATES} />;
}
