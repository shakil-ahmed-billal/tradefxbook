import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';

interface TradesHeaderProps {
  tradeCount: number;
  onOpenAddTrade: () => void;
  onOpenConnectBroker: () => void;
  onOpenImportCSV?: () => void;
  onClearAll: () => void;
}

export const TradesHeader: React.FC<TradesHeaderProps> = ({
  tradeCount,
  onOpenAddTrade,
  onOpenConnectBroker,
  onOpenImportCSV,
  onClearAll,
}) => {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <h1 className="font-outfit text-2xl font-bold tracking-tight text-[#f4f6fa]">Trades</h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5c6478] bg-[#161b27] border border-[#232a3a] px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4b5c] ring-2 ring-[#ef4b5c]/20" />
          Not connected
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {onOpenImportCSV && (
          <button
            onClick={onOpenImportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161b27] hover:bg-[#1f2638] text-[#f4f6fa] border border-[#232a3a] transition-all"
          >
            <Upload className="w-4 h-4 text-[#2981eb]" />
            Import CSV
          </button>
        )}

        <button
          onClick={onOpenConnectBroker}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161b27] hover:bg-[#1f2638] text-[#f4f6fa] border border-[#232a3a] transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#2981eb]" />
          Connect Exness
        </button>

        <button
          onClick={onOpenAddTrade}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#2981eb] hover:bg-[#5aa2f2] text-white transition-all shadow-lg shadow-[#2981eb]/20"
        >
          <Plus className="w-4 h-4" />
          Add Trade
        </button>

        <button
          onClick={onClearAll}
          disabled={tradeCount === 0}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>
    </section>
  );
};
