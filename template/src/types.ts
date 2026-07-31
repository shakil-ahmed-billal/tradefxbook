export type TradeType = 'long' | 'short';
export type TradeOutcome = 'Winner' | 'Loser' | 'Breakeven';
export type JournalStatus = 'Journaled' | 'Pending' | 'Legacy';
export type TradeSource = 'Manual' | 'MT4/MT5';

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface JournalData {
  tradeId: string;
  preTradeAnalysis: string;
  postTradeReview: string;
  riskRewardRisk: number;
  riskRewardReward: number;
  emotions: string;
  lessons: string;
  tags: string[];
  rating: number; // 1 - 10
  checklist: ChecklistItem[];
  screenshots: string[]; // Base64 or Object URLs
}

export interface Trade {
  id: string;
  symbol: string;
  pairCode: string;
  type: TradeType;
  entryPrice: number;
  exitPrice: number;
  size: number;
  pnl: number;
  openTime: string;
  closeTime: string;
  source: TradeSource;
  status: 'closed' | 'open';
  outcome: TradeOutcome;
  journalStatus: JournalStatus;
  score: number;
  duration?: string;
  priceMovePercent?: number;
  journal?: JournalData;
}

export interface UserProfile {
  name: string;
  email: string;
  plan: 'FREE' | 'PRO' | 'ELITE';
  avatarInitials: string;
  isAuthenticated: boolean;
}

export type NavTab = 
  | 'home'
  | 'dashboard'
  | 'trades'
  | 'journal'
  | 'performance'
  | 'trade-analysis'
  | 'market'
  | 'ai-report'
  | 'backtesting'
  | 'traders-lounge'
  | 'tools'
  | 'settings'
  | 'help'
  | 'auth';

export interface MarketRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  category: 'Forex' | 'Metals' | 'Crypto' | 'Indices';
}
