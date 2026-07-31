import React from 'react';

interface MetricsProps {
  totalPnL: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winningTradesCount: number;
  losingTradesCount: number;
  fmt: (val: number) => string;
}

export const PerformanceMetricsCards: React.FC<MetricsProps> = ({
  totalPnL,
  winRate,
  profitFactor,
  totalTrades,
  winningTradesCount,
  losingTradesCount,
  fmt,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-4">
        <span className="text-xs font-semibold text-[#9aa2b3] block mb-1">Net P&L</span>
        <div
          className={`font-mono text-2xl font-bold ${
            totalPnL >= 0 ? 'text-[#22c58b]' : 'text-red-400'
          }`}
        >
          {fmt(totalPnL)}
        </div>
        <span className="text-[11px] text-[#5c6478] mt-1 block">
          {totalTrades} closed trades
        </span>
      </div>

      <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-4">
        <span className="text-xs font-semibold text-[#9aa2b3] block mb-1">Win Rate</span>
        <div className="font-mono text-2xl font-bold text-[#f4f6fa]">
          {winRate.toFixed(1)}%
        </div>
        <span className="text-[11px] text-[#5c6478] mt-1 block">
          {winningTradesCount} W / {losingTradesCount} L
        </span>
      </div>

      <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-4">
        <span className="text-xs font-semibold text-[#9aa2b3] block mb-1">Profit Factor</span>
        <div className="font-mono text-2xl font-bold text-[#2981eb]">
          {profitFactor > 0 ? profitFactor.toFixed(2) : '0.00'}
        </div>
        <span className="text-[11px] text-[#5c6478] mt-1 block">
          Gross Win / Gross Loss
        </span>
      </div>

      <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-4">
        <span className="text-xs font-semibold text-[#9aa2b3] block mb-1">Total Trades</span>
        <div className="font-mono text-2xl font-bold text-[#f4f6fa]">{totalTrades}</div>
        <span className="text-[11px] text-[#5c6478] mt-1 block">Filtered by period</span>
      </div>
    </div>
  );
};
