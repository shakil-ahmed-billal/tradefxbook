import { Trade, UserProfile, MarketRate } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Shakil',
  email: 'xhakil2023@gmail.com',
  plan: 'FREE',
  avatarInitials: 'S',
  isAuthenticated: true,
};

export const DEFAULT_CHECKLIST = [
  { id: '1', label: 'Checked higher timeframe', checked: false },
  { id: '2', label: 'Risk within limits', checked: false },
  { id: '3', label: 'Fits my trading plan', checked: false },
  { id: '4', label: 'Key levels identified', checked: false },
  { id: '5', label: 'Economic calendar checked', checked: false },
];

export const INITIAL_TRADES: Trade[] = [];

export const INITIAL_MARKET_RATES: MarketRate[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0863, change24h: -0.24, high24h: 1.0895, low24h: 1.0840, category: 'Forex' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2845, change24h: 0.15, high24h: 1.2880, low24h: 1.2810, category: 'Forex' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 153.80, change24h: 0.42, high24h: 154.20, low24h: 153.10, category: 'Forex' },
  { symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', price: 198.21, change24h: -0.18, high24h: 199.10, low24h: 197.80, category: 'Forex' },
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', price: 2385.40, change24h: 0.88, high24h: 2392.00, low24h: 2370.10, category: 'Metals' },
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', price: 65420.00, change24h: 2.35, high24h: 66200.00, low24h: 63800.00, category: 'Crypto' },
  { symbol: 'US30', name: 'Dow Jones Industrial', price: 40580.00, change24h: 0.31, high24h: 40700.00, low24h: 40400.00, category: 'Indices' },
];
