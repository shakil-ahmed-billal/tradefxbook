import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Trash2, 
  Edit3, 
  Share2, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  ArrowDownRight,
  PenTool,
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Trade } from '../../types';

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
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <h1 className="font-sora text-2xl font-bold tracking-tight text-[#f4f6fa]">Trades</h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5c6478] bg-[#161b27] border border-[#232a3a] px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4b5c] ring-2 ring-[#ef4b5c]/20" />
            Not connected
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onOpenImportCSV && (
            <button
              onClick={onOpenImportCSV}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161b27] border border-[#232a3a] text-[#5aa2f2] hover:border-[#2981eb] transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Import Exness CSV
            </button>
          )}

          <button
            onClick={onOpenConnectBroker}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161b27] border border-[#232a3a] text-[#f4f6fa] hover:border-[#2a2f42] transition-colors"
          >
            Connect MT4/MT5
          </button>

          {trades.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161b27] border border-[#232a3a] text-[#ef4b5c] hover:bg-[#ef4b5c]/10 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}

          <button
            onClick={onOpenAddTrade}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white hover:brightness-110 transition-all flex items-center gap-1.5 shadow-lg shadow-[#2981eb]/25"
          >
            <Plus className="w-4 h-4" />
            Add Trade
          </button>
        </div>
      </section>

      {/* TABLE CARD */}
      <section className="bg-[#10141d] border border-[#232a3a] rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-[#1a2029]">
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-sora font-semibold text-base text-[#f4f6fa]">Trade History</h3>
            <span className="font-mono text-xs text-[#5c6478]">
              {startItem}-{endItem} of {trades.length} trades
            </span>
          </div>

          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#8d94a8] bg-[#161b27] border border-[#232a3a] px-3.5 py-2 rounded-xl hover:border-[#2a2f42] transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filters
            <span className="w-1.5 h-1.5 rounded-full bg-[#7aa0ff]" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-5">
          {trades.length === 0 ? (
            <div className="py-12 text-center text-[#5c6478]">
              <p className="text-sm font-medium">No trades recorded yet.</p>
              <p className="text-xs mt-1">Import your Exness CSV or click "Add Trade" to log your first trade.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#232a3a]">
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Open / Close</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Symbol</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Type</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Entry</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Exit</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Size</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">P&L</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3">Source</th>
                  <th className="font-mono text-[10.5px] font-semibold tracking-wider text-[#565e73] uppercase pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2029]">
                {paginatedTrades.map(trade => (
                  <tr key={trade.id} className="hover:bg-[#161b27] transition-colors group">
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col gap-1 text-[11.5px]">
                        <div className="flex gap-1.5">
                          <span className="text-[#565e73] w-9">Open:</span>
                          <span className="font-mono text-[#8d94a8]">
                            {trade.openTime ? trade.openTime.slice(5, 16).replace('T', ' ') : 'N/A'}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-[#565e73] w-9">Close:</span>
                          <span className="font-mono text-[#8d94a8]">
                            {trade.closeTime ? trade.closeTime.slice(5, 16).replace('T', ' ') : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-mono text-[8px] font-bold text-[#8d94a8]">
                          {trade.pairCode}
                        </span>
                        <span className="font-semibold text-xs text-[#eef1f8]">{trade.symbol}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        trade.type === 'long' ? 'text-[#00d9a3] bg-[#00d9a3]/10' : 'text-[#ff5c7a] bg-[#ff5c7a]/10'
                      }`}>
                        {trade.type === 'long' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trade.type === 'long' ? 'Long' : 'Short'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-xs text-[#8d94a8]">${Number(trade.entryPrice).toFixed(2)}</td>
                    <td className="py-3.5 px-3 font-mono text-xs text-[#8d94a8]">${Number(trade.exitPrice).toFixed(2)}</td>
                    <td className="py-3.5 px-3 font-mono text-xs text-[#8d94a8]">{trade.size}</td>

                    <td className="py-3.5 px-3">
                      <span className={`font-mono text-xs font-bold ${Number(trade.pnl) < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                        {Number(trade.pnl) < 0 ? '-' : '+'}${Math.abs(Number(trade.pnl)).toFixed(2)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#161b27] border border-[#232a3a] text-[#8d94a8]">
                        <PenTool className="w-3 h-3" />
                        {trade.source}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectTradeForJournal(trade)}
                          className="p-1.5 rounded-lg text-[#565e73] hover:text-[#7aa0ff] hover:bg-[#1c2230] transition-colors"
                          title="Open in Journal"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onShareTrade(trade)}
                          className="p-1.5 rounded-lg text-[#565e73] hover:text-[#7aa0ff] hover:bg-[#1c2230] transition-colors"
                          title="Share Trade"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteTrade(trade.id)}
                          className="p-1.5 rounded-lg text-[#565e73] hover:text-[#ff5c7a] hover:bg-[#ff5c7a]/10 transition-colors"
                          title="Delete Trade"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {trades.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#1a2029] bg-[#0e1017]">
            <div className="text-xs text-[#5c6478] font-mono">
              Showing <span className="text-[#f4f6fa] font-semibold">{startItem}</span> to{' '}
              <span className="text-[#f4f6fa] font-semibold">{endItem}</span> of{' '}
              <span className="text-[#f4f6fa] font-semibold">{trades.length}</span> trades
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#161b27] border border-[#232a3a] text-[#8d94a8] hover:text-[#f4f6fa] hover:border-[#2a2f42] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <span className="text-xs font-mono text-[#8d94a8] px-2">
                Page <strong className="text-[#f4f6fa]">{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#161b27] border border-[#232a3a] text-[#8d94a8] hover:text-[#f4f6fa] hover:border-[#2a2f42] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* MT4/MT5 UPSELL CARD */}
      <section className="bg-gradient-to-br from-[#171b2c] via-[#10141d] to-[#10141d] border border-[#2a3156] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4c7dff]/20 to-[#a78bfa]/20 flex items-center justify-center text-[#7aa0ff] shrink-0">
            <Sparkles className="w-5.5 h-5.5" />
          </div>
          <div>
            <h3 className="font-sora text-base font-bold text-[#eef1f8]">MT4/MT5 Auto-Sync</h3>
            <p className="text-xs text-[#565e73] mt-0.5">Connect your broker account to auto-sync trades</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          {[
            'Automatically sync all your trades in real-time',
            'Track real-time P&L and equity curves',
            'View deep performance analytics & session breakdowns',
            'Journal trades with full chart context'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-[#8d94a8]">
              <Check className="w-4 h-4 text-[#00d9a3] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onOpenConnectBroker}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2981eb]/25 hover:brightness-110 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Connect MT4/MT5 Account
        </button>
      </section>
    </div>
  );
};
