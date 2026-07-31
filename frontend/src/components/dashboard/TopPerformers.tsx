import React from 'react';

interface SymbolPerformer {
  symbol: string;
  pnl: number;
  count: number;
}

interface TopPerformersProps {
  performers: SymbolPerformer[];
  fmt: (val: number) => string;
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ performers, fmt }) => {
  return (
    <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#f4f6fa] mb-4">Top Symbols by P&L</h3>
      {performers.length === 0 ? (
        <div className="text-xs text-[#5c6478] py-4 text-center">No closed trades yet</div>
      ) : (
        <div className="space-y-3">
          {performers.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#141824] border border-[#212636]"
            >
              <div>
                <div className="font-mono text-xs font-bold text-[#f4f6fa]">{item.symbol}</div>
                <div className="text-[10px] text-[#5c6478]">{item.count} trade(s)</div>
              </div>
              <div
                className={`font-mono text-xs font-semibold ${
                  item.pnl >= 0 ? 'text-[#22c58b]' : 'text-red-400'
                }`}
              >
                {fmt(item.pnl)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
