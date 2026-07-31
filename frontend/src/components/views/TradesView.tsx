import React, { useState } from 'react';
import { 
  Trash2, 
  Share2, 
  PenTool,
  ArrowUpRight, 
  ArrowDownRight
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
  onShareTrade,
  onSelectTradeForJournal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(trades.length / itemsPerPage) || 1;

  const paginatedTrades = trades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem = trades.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, trades.length);

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

      {/* TRADES TABLE */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-low)] font-mono text-[11px] uppercase tracking-wider">
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
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[var(--text-low)]">
                    No trades logged yet. Click <strong className="text-[var(--text-mid)]">Add Trade</strong> or <strong className="text-[var(--text-mid)]">Import CSV</strong> to start.
                  </td>
                </tr>
              ) : (
                paginatedTrades.map((trade) => {
                  const pnlNum = Number(trade.pnl || 0);
                  const isProfit = pnlNum >= 0;

                  return (
                    <tr key={trade.id} className="hover:bg-[var(--bg-hover)] transition-colors group">
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
                          isProfit ? 'text-[#22c58b]' : 'text-red-400'
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
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onSelectTradeForJournal(trade)}
                            title="Journal Trade"
                            className="p-1.5 rounded-lg hover:bg-[#1f2638] text-[#9aa2b3] hover:text-[#2981eb] transition-colors"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onShareTrade(trade)}
                            title="Share Trade"
                            className="p-1.5 rounded-lg hover:bg-[#1f2638] text-[#9aa2b3] hover:text-[#22c58b] transition-colors"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTrade(trade.id)}
                            title="Delete Trade"
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#9aa2b3] hover:text-red-400 transition-colors"
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
          totalItems={trades.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
