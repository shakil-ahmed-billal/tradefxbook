import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, BookOpen, LineChart, TrendingUp, Sparkles, LayoutDashboard } from 'lucide-react';
import { NavTab, Trade } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  trades: Trade[];
  onSelectTab: (tab: NavTab) => void;
  onSelectTrade: (trade: Trade) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  trades,
  onSelectTab,
  onSelectTrade,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTrades = trades.filter(
    t => t.symbol.toLowerCase().includes(query.toLowerCase()) ||
         t.outcome.toLowerCase().includes(query.toLowerCase()) ||
         t.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-soft)]">
          <Search className="w-5 h-5 text-[#5aa2f2] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, symbols (EUR/USD, XAU...), trades..."
            className="flex-1 bg-transparent text-sm text-[var(--text-hi)] outline-none placeholder:text-[var(--text-low)]"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-[var(--text-low)] hover:text-[var(--text-hi)] cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 max-h-[360px] overflow-y-auto flex flex-col gap-2">
          {/* Quick Pages */}
          <div>
            <span className="font-mono text-[10px] text-[var(--text-low)] tracking-widest px-2 font-semibold">
              NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                onClick={() => { onSelectTab('dashboard'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[#5aa2f2]" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => { onSelectTab('trades'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <Briefcase className="w-4 h-4 text-[#5aa2f2]" />
                <span>Trades</span>
              </button>
              <button
                onClick={() => { onSelectTab('journal'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#5aa2f2]" />
                <span>Journal</span>
              </button>
              <button
                onClick={() => { onSelectTab('performance'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <LineChart className="w-4 h-4 text-[#5aa2f2]" />
                <span>Performance</span>
              </button>
              <button
                onClick={() => { onSelectTab('market'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-[#5aa2f2]" />
                <span>Market</span>
              </button>
              <button
                onClick={() => { onSelectTab('ai-report'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] text-left cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#5aa2f2]" />
                <span>AI Trade Report</span>
              </button>
            </div>
          </div>

          {/* Trade History Search Results */}
          <div className="pt-2 border-t border-[var(--border-soft)]">
            <span className="font-mono text-[10px] text-[var(--text-low)] tracking-widest px-2 font-semibold">
              TRADES MATCHING ({filteredTrades.length})
            </span>
            <div className="flex flex-col gap-1 mt-1">
              {filteredTrades.map(trade => (
                <button
                  key={trade.id}
                  onClick={() => {
                    onSelectTrade(trade);
                    onSelectTab('journal');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl text-xs hover:bg-[var(--bg-hover)] text-left transition-colors cursor-pointer border border-transparent hover:border-[var(--border-soft)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-[9.5px] font-bold text-[var(--text-hi)] shrink-0">
                      {trade.pairCode}
                    </span>
                    <span className="font-semibold text-[var(--text-hi)]">{trade.symbol}</span>
                    <span className={`px-1.5 py-0.5 rounded font-mono text-[9px] uppercase font-bold ${
                      trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                  <span className={`font-mono font-bold ${trade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                    {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
