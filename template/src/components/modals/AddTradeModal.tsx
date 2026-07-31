import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { Trade, TradeType, TradeSource, TradeOutcome } from '../../types';

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrade: (trade: Trade) => void;
}

export const AddTradeModal: React.FC<AddTradeModalProps> = ({
  isOpen,
  onClose,
  onAddTrade,
}) => {
  const [symbol, setSymbol] = useState('EUR/USD');
  const [type, setType] = useState<TradeType>('long');
  const [entryPrice, setEntryPrice] = useState<string>('1.0863');
  const [exitPrice, setExitPrice] = useState<string>('1.0821');
  const [size, setSize] = useState<string>('10');
  const [source, setSource] = useState<TradeSource>('Manual');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const qty = parseFloat(size) || 1;

    // Estimate PnL
    let pnl = 0;
    if (type === 'long') {
      pnl = (exit - entry) * qty * 1000;
    } else {
      pnl = (entry - exit) * qty * 1000;
    }
    // Round to 2 decimals
    pnl = Math.round(pnl * 100) / 100;

    let outcome: TradeOutcome = 'Breakeven';
    if (pnl > 0) outcome = 'Winner';
    if (pnl < 0) outcome = 'Loser';

    const getPairCode = (sym: string) => {
      if (sym.includes('EUR')) return 'EU';
      if (sym.includes('GBP') && sym.includes('JPY')) return 'GJ';
      if (sym.includes('XAU') || sym.includes('Gold')) return 'XAU';
      if (sym.includes('BTC')) return 'BTC';
      if (sym.includes('JPY')) return 'UJ';
      return sym.slice(0, 3).toUpperCase();
    };

    const newTrade: Trade = {
      id: 'trade-' + Date.now(),
      symbol: symbol.toUpperCase(),
      pairCode: getPairCode(symbol),
      type,
      entryPrice: entry,
      exitPrice: exit,
      size: qty,
      pnl,
      openTime: new Date().toISOString(),
      closeTime: new Date(Date.now() + 3600000 * 2).toISOString(),
      source,
      status: 'closed',
      outcome,
      journalStatus: 'Pending',
      score: outcome === 'Winner' ? 80 : 0,
      duration: '2h 00m',
      journal: {
        tradeId: 'trade-' + Date.now(),
        preTradeAnalysis: '',
        postTradeReview: '',
        riskRewardRisk: 1,
        riskRewardReward: 2,
        emotions: '',
        lessons: '',
        tags: [],
        rating: 5,
        checklist: [
          { id: '1', label: 'Checked higher timeframe', checked: false },
          { id: '2', label: 'Risk within limits', checked: false },
          { id: '3', label: 'Fits my trading plan', checked: false },
          { id: '4', label: 'Key levels identified', checked: false },
          { id: '5', label: 'Economic calendar checked', checked: false },
        ],
        screenshots: [],
      }
    };

    onAddTrade(newTrade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1017] border border-[#212636] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1e2b]">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#5aa2f2]" />
            <h3 className="font-outfit text-base font-semibold text-[#f4f6fa]">Log New Trade</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#5c6478] hover:text-[#f4f6fa] hover:bg-[#141824]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Symbol / Pair</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="EUR/USD, XAU/USD, GBP/JPY..."
              className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Direction</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('long')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold transition-colors border ${
                  type === 'long' 
                    ? 'bg-[#22c58b]/20 text-[#22c58b] border-[#22c58b]/40' 
                    : 'bg-[#141824] text-[#5c6478] border-[#212636] hover:text-[#f4f6fa]'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                LONG
              </button>
              <button
                type="button"
                onClick={() => setType('short')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold transition-colors border ${
                  type === 'short' 
                    ? 'bg-[#ef4b5c]/20 text-[#ef4b5c] border-[#ef4b5c]/40' 
                    : 'bg-[#141824] text-[#5c6478] border-[#212636] hover:text-[#f4f6fa]'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                SHORT
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Entry Price</label>
              <input
                type="number"
                step="any"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] font-mono outline-none focus:border-[#2981eb]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Exit Price</label>
              <input
                type="number"
                step="any"
                value={exitPrice}
                onChange={(e) => setExitPrice(e.target.value)}
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] font-mono outline-none focus:border-[#2981eb]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Position Size (Lots/Units)</label>
              <input
                type="number"
                step="any"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] font-mono outline-none focus:border-[#2981eb]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Entry Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as TradeSource)}
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              >
                <option value="Manual">Manual Entry</option>
                <option value="MT4/MT5">MT4 / MT5 Auto-Sync</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#1a1e2b] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#9aa2b3] hover:text-[#f4f6fa] hover:bg-[#141824] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors shadow-lg shadow-[#2981eb]/20"
            >
              Save Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
