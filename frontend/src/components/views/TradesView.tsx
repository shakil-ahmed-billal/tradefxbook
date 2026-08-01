import React, { useState, useMemo } from 'react';
import { 
  Trash2, 
  Share2, 
  PenTool,
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Filter,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';
import { Trade } from '../../types';
import { TradesHeader } from '../trades/TradesHeader';
import { TradesPagination } from '../trades/TradesPagination';

interface TradesViewProps {
  trades: Trade[];
  onOpenAddTrade: () => void;
  onOpenConnectBroker: () => void;
  onOpenImportCSV?: () => void;
  onClearAll: () => void;
  onDeleteTrade: (id: string) => void;
  onBulkDeleteTrades?: (ids: string[]) => Promise<void>;
  onShareTrade: (trade: Trade) => void;
  onSelectTradeForJournal: (trade: Trade) => void;
}

export const TradesView: React.FC<TradesViewProps> = ({
  trades,
  onOpenAddTrade,
  onOpenConnectBroker,
  onOpenImportCSV,
  onClearAll,
  onDeleteTrade,
  onBulkDeleteTrades,
  onShareTrade,
  onSelectTradeForJournal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter States
  const [searchSymbol, setSearchSymbol] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'long' | 'short'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all');
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'Winner' | 'Loser' | 'Breakeven'>('all');

  // Selected Trades for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Apply filters
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const matchSymbol = trade.symbol.toLowerCase().includes(searchSymbol.toLowerCase().trim());
      const matchType = filterType === 'all' || trade.type === filterType;
      const matchStatus = filterStatus === 'all' || trade.status === filterStatus;
      const matchOutcome = filterOutcome === 'all' || trade.outcome === filterOutcome;
      return matchSymbol && matchType && matchStatus && matchOutcome;
    });
  }, [trades, searchSymbol, filterType, filterStatus, filterOutcome]);

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage) || 1;

  const paginatedTrades = useMemo(() => {
    return filteredTrades.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredTrades, currentPage]);

  const startItem = filteredTrades.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredTrades.length);

  // Selection handlers
  const handleSelectAll = () => {
    const pageIds = paginatedTrades.map(t => t.id);
    const allSelected = pageIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      // Unselect all on this page
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      // Select all on this page
      setSelectedIds(prev => {
        const union = new Set([...prev, ...pageIds]);
        return Array.from(union);
      });
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected trade(s)?`)) {
      if (onBulkDeleteTrades) {
        await onBulkDeleteTrades(selectedIds);
      } else {
        // Fallback to loop delete
        await Promise.all(selectedIds.map(id => onDeleteTrade(id)));
      }
      setSelectedIds([]);
    }
  };

  const isAllPageSelected = paginatedTrades.length > 0 && paginatedTrades.every(t => selectedIds.includes(t.id));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* PAGE HEADER */}
      <TradesHeader
        tradeCount={trades.length}
        onOpenAddTrade={onOpenAddTrade}
        onOpenConnectBroker={onOpenConnectBroker}
        onOpenImportCSV={onOpenImportCSV}
        onClearAll={onClearAll}
      />

      {/* ADVANCED FILTERING PANEL */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold font-outfit text-[var(--text-hi)]">
          <Filter className="w-4 h-4 text-[#5aa2f2]" />
          <span>ADVANCED FILTERS & SEARCH</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Symbol Search */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[var(--text-low)] absolute left-3 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search symbol (e.g. EUR/USD)..."
              value={searchSymbol}
              onChange={(e) => { setSearchSymbol(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-[#2981eb] transition-colors"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value as any); setCurrentPage(1); }}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors cursor-pointer"
          >
            <option value="all">Direction: All</option>
            <option value="long">Long (Buy)</option>
            <option value="short">Short (Sell)</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value as any); setCurrentPage(1); }}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="open">Open Position</option>
            <option value="closed">Closed Position</option>
          </select>

          {/* Outcome Filter */}
          <select
            value={filterOutcome}
            onChange={(e) => { setFilterOutcome(e.target.value as any); setCurrentPage(1); }}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors cursor-pointer"
          >
            <option value="all">Outcome: All</option>
            <option value="Winner">Winner</option>
            <option value="Loser">Loser</option>
            <option value="Breakeven">Breakeven</option>
          </select>
        </div>
      </div>

      {/* BULK ACTIONS FLOATING/TOP BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-[#ef4b5c]/10 border border-[#ef4b5c]/30 rounded-2xl p-4 flex items-center justify-between animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2.5 text-xs text-[#ef4b5c] font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Selected {selectedIds.length} trade(s) for bulk action</span>
          </div>
          <button 
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* TRADES TABLE */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-low)] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10 text-center">
                  <button 
                    onClick={handleSelectAll}
                    className="p-1 text-[var(--text-mid)] hover:text-[#2981eb] transition-colors cursor-pointer"
                    title={isAllPageSelected ? "Deselect page" : "Select page"}
                  >
                    {isAllPageSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#2981eb]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4 font-medium">Symbol</th>
                <th className="py-3.5 px-4 font-medium">Type</th>
                <th className="py-3.5 px-4 font-medium">Lots</th>
                <th className="py-3.5 px-4 font-medium">Open Price</th>
                <th className="py-3.5 px-4 font-medium">Close Price</th>
                <th className="py-3.5 px-4 font-medium">P&L</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-soft)]">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[var(--text-low)]">
                    No trades match the current filters. Clear filters or add more trades to begin.
                  </td>
                </tr>
              ) : (
                paginatedTrades.map((trade) => {
                  const pnlNum = Number(trade.pnl || 0);
                  const isProfit = pnlNum >= 0;
                  const isSelected = selectedIds.includes(trade.id);

                  return (
                    <tr 
                      key={trade.id} 
                      className={`hover:bg-[var(--bg-hover)] transition-colors group cursor-pointer ${
                        isSelected ? 'bg-[var(--bg-elevated)]' : ''
                      }`}
                      onClick={() => handleSelectRow(trade.id)}
                    >
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleSelectRow(trade.id)}
                          className="p-1 text-[var(--text-mid)] hover:text-[#2981eb] transition-colors cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#2981eb]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[var(--text-hi)]">
                        {trade.symbol}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                            trade.type === 'long'
                              ? 'bg-[#22c58b]/10 text-[#22c58b] border border-[#22c58b]/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {trade.type === 'long' ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[var(--text-mid)]">{trade.size}</td>
                      <td className="py-3.5 px-4 font-mono text-[var(--text-mid)]">{trade.entryPrice}</td>
                      <td className="py-3.5 px-4 font-mono text-[var(--text-mid)]">
                        {trade.exitPrice || '—'}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono font-bold ${
                          isProfit ? 'text-[#22c58b]' : 'text-[#ef4b5c]'
                        }`}
                      >
                        {isProfit ? '+' : ''}${Math.abs(pnlNum).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            trade.status === 'open'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                          }`}
                        >
                          {trade.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onSelectTradeForJournal(trade)}
                            title="Journal Trade"
                            className="p-1.5 rounded-lg hover:bg-[#1f2638] text-[#9aa2b3] hover:text-[#2981eb] transition-colors cursor-pointer"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onShareTrade(trade)}
                            title="Share Trade"
                            className="p-1.5 rounded-lg hover:bg-[#1f2638] text-[#9aa2b3] hover:text-[#22c58b] transition-colors cursor-pointer"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this trade?')) {
                                onDeleteTrade(trade.id);
                              }
                            }}
                            title="Delete Trade"
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#9aa2b3] hover:text-[#ef4b5c] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <TradesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalItems={filteredTrades.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
