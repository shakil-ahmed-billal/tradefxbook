import React, { useState } from 'react';
import { History, Play, Plus } from 'lucide-react';

export const BacktestingView: React.FC = () => {
  const [sessions] = useState([
    { id: '1', name: 'EUR/USD H1 Trend Continuation', trades: 24, winRate: 62.5, pnl: 1450.00, status: 'Completed' },
    { id: '2', name: 'Gold London Breakout Strategy', trades: 18, winRate: 55.5, pnl: 890.00, status: 'In Progress' },
  ]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
              <History className="w-6 h-6 text-[#f2b84b]" />
              Strategy Backtesting Studio
            </h1>
            <span className="font-mono text-xs font-bold text-[#f2b84b] bg-[#f2b84b]/15 px-2.5 py-0.5 rounded-full border border-[#f2b84b]/30">
              ELITE
            </span>
          </div>
          <p className="text-xs text-[#565e73]">Replay historical price candles and test trading rule setups.</p>
        </div>

        <button className="px-5 py-2.5 bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#2981eb]/25 hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" />
          New Backtest Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map(s => (
          <div key={s.id} className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5 hover:border-[#2a2f42] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sora font-bold text-sm text-[#eef1f8]">{s.name}</h3>
              <span className="text-[10px] font-mono font-bold text-[#7aa0ff] bg-[#4c7dff]/15 px-2 py-0.5 rounded-full">
                {s.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-[#161b27] border border-[#1a2029] rounded-xl text-xs">
              <div><span className="text-[#565e73] block text-[10px]">Trades</span><span className="font-mono font-bold text-[#eef1f8]">{s.trades}</span></div>
              <div><span className="text-[#565e73] block text-[10px]">Win Rate</span><span className="font-mono font-bold text-[#00d9a3]">{s.winRate}%</span></div>
              <div><span className="text-[#565e73] block text-[10px]">Net P&L</span><span className="font-mono font-bold text-[#00d9a3]">+${s.pnl}</span></div>
            </div>

            <button className="w-full py-2 bg-[#161b27] border border-[#232a3a] rounded-xl text-xs font-semibold text-[#8d94a8] hover:text-[#eef1f8] flex items-center justify-center gap-2">
              <Play className="w-3.5 h-3.5 text-[#00d9a3]" /> Resume Replay Simulator
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
