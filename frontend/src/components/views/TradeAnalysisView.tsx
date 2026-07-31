import React, { useState } from 'react';
import { 
  Play, 
  BarChart, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Edit3,
  BarChart2
} from 'lucide-react';
import { Trade } from '../../types';

interface TradeAnalysisViewProps {
  trades: Trade[];
  selectedTradeId?: string;
  onNavigateToJournal: (tradeId: string) => void;
}

export const TradeAnalysisView: React.FC<TradeAnalysisViewProps> = ({
  trades,
  selectedTradeId,
  onNavigateToJournal,
}) => {
  const [activeTradeId, setActiveTradeId] = useState<string>(selectedTradeId || trades[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'All' | 'Winners' | 'Losers'>('All');
  const [visibleCount, setVisibleCount] = useState<number>(15);

  const activeTrade = trades.find(t => t.id === activeTradeId) || trades[0];

  const filteredTrades = trades.filter(t => {
    if (activeTab === 'Winners') return t.pnl > 0;
    if (activeTab === 'Losers') return t.pnl < 0;
    return true;
  });

  if (!activeTrade) {
    return (
      <div className="p-8 text-center text-[#5c6478]">
        No trade data available for analysis. Log a trade first.
      </div>
    );
  }

  const isWinner = activeTrade.pnl > 0;
  const isBreakeven = activeTrade.pnl === 0;
  const profitabilityPts = isWinner ? 30 : isBreakeven ? 15 : 0;
  
  const j = activeTrade.journal;
  const hasJournal = j && (j.preTradeAnalysis || j.postTradeReview);
  const journalPts = hasJournal ? 20 : 0;
  
  const checkedCount = j?.checklist ? j.checklist.filter(c => c.checked).length : 0;
  const executionPts = j?.checklist ? Math.min(40, checkedCount * 8) : 0;
  const ratingPts = j?.rating || 0;

  const totalQualityScore = profitabilityPts + journalPts + executionPts + ratingPts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200 items-start">
      
      {/* TRADE LIST SIDEBAR */}
      <div className="lg:col-span-4 bg-[#10141d] border border-[#232a3a] rounded-2xl p-4 sticky top-[98px]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-sora font-semibold text-sm text-[#eef1f8]">Trade Analysis</span>
          <span className="font-mono text-xs text-[#565e73]">{trades.length} trades</span>
        </div>

        <div className="flex items-center gap-1 bg-[#161b27] p-1 rounded-xl border border-[#232a3a] mb-3">
          {(['All', 'Winners', 'Losers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab ? 'bg-[#1c2230] text-[#eef1f8]' : 'text-[#565e73]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div 
          className="flex flex-col gap-2 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 220px)' }}
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
              setVisibleCount(prev => Math.min(prev + 15, filteredTrades.length));
            }
          }}
        >
          {filteredTrades.slice(0, visibleCount).map(trade => (
            <button
              key={trade.id}
              onClick={() => setActiveTradeId(trade.id)}
              className={`flex flex-col gap-2 p-3 rounded-xl text-left transition-colors border ${
                activeTradeId === trade.id
                  ? 'bg-[#4c7dff]/15 border-[#4c7dff]'
                  : 'bg-[#161b27] border-[#1a2029] hover:border-[#232a3a]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-mono text-[9px] font-bold text-[#8d94a8]">
                  {trade.pairCode}
                </span>
                <span className="font-semibold text-xs text-[#eef1f8] flex-1">{trade.symbol}</span>
                <span className="text-[10px] font-semibold text-[#7aa0ff] bg-[#4c7dff]/15 px-2 py-0.5 rounded-full">
                  New
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  trade.type === 'long' ? 'text-[#00d9a3] bg-[#00d9a3]/15' : 'text-[#ff5c7a] bg-[#ff5c7a]/15'
                }`}>
                  {trade.type === 'long' ? 'Long' : 'Short'}
                </span>
                <span className="font-mono text-[#565e73]">{trade.entryPrice}</span>
                <span className={`ml-auto font-mono font-bold ${trade.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
                  {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN DETAIL PANEL */}
      <div className="lg:col-span-8 bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-[#1a2029] gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className="w-8 h-8 rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-mono text-xs font-bold text-[#8d94a8]">
                {activeTrade.pairCode}
              </span>
              <span className="font-sora font-bold text-xl text-[#eef1f8]">{activeTrade.symbol}</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTrade.pnl < 0 ? 'text-[#ff5c7a] bg-[#ff5c7a]/15' : 'text-[#00d9a3] bg-[#00d9a3]/15'
              }`}>
                {activeTrade.outcome}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f2b84b]/15 text-[#f2b84b]">
                Score: {totalQualityScore}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#565e73] flex-wrap font-mono">
              <span className={`font-bold px-2 py-0.5 rounded ${
                activeTrade.type === 'long' ? 'text-[#00d9a3] bg-[#00d9a3]/15' : 'text-[#ff5c7a] bg-[#ff5c7a]/15'
              }`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
              <span>•</span>
              <span>{activeTrade.openTime.slice(0, 16).replace('T', ', ')}</span>
              <span>•</span>
              <span>Duration: {activeTrade.duration || '1d 6h'}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#565e73] block mb-1">P&L</span>
            <span className={`font-mono text-2xl font-bold ${activeTrade.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
              {activeTrade.pnl < 0 ? '-' : '+'}${Math.abs(activeTrade.pnl).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3.5">
            <span className="text-xs text-[#565e73] block mb-1">Entry Price</span>
            <span className="font-mono text-base font-semibold text-[#eef1f8]">${activeTrade.entryPrice}</span>
          </div>
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3.5">
            <span className="text-xs text-[#565e73] block mb-1">Exit Price</span>
            <span className="font-mono text-base font-semibold text-[#eef1f8]">${activeTrade.exitPrice}</span>
          </div>
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3.5">
            <span className="text-xs text-[#565e73] block mb-1">Quantity</span>
            <span className="font-mono text-base font-semibold text-[#eef1f8]">{activeTrade.size}</span>
          </div>
          <div className="bg-[#161b27] border border-[#1a2029] rounded-xl p-3.5">
            <span className="text-xs text-[#565e73] block mb-1">Price Move</span>
            <span className={`font-mono text-base font-semibold ${activeTrade.pnl < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}`}>
              {activeTrade.priceMovePercent || -17.46}%
            </span>
          </div>
        </div>

        {/* Trade Simulation */}
        <div className="bg-[#161b27] border border-[#1a2029] rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center justify-between p-4 border-b border-[#1a2029]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1c2230] border border-[#232a3a] flex items-center justify-center font-mono text-[9px] font-bold text-[#8d94a8]">
                {activeTrade.pairCode}
              </span>
              <span className="font-semibold text-xs text-[#eef1f8]">{activeTrade.symbol}</span>
              <span className="font-mono text-[10px] font-bold uppercase text-[#00d9a3] bg-[#00d9a3]/10 px-2 py-0.5 rounded">
                {activeTrade.type}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div><span className="text-[10px] text-[#565e73] block">Entry</span><span className="text-[#eef1f8]">${activeTrade.entryPrice}</span></div>
              <div><span className="text-[10px] text-[#565e73] block">Exit</span><span className="text-[#eef1f8]">${activeTrade.exitPrice}</span></div>
              <div><span className="text-[10px] text-[#565e73] block">P&L</span><span className={Number(activeTrade.pnl) < 0 ? 'text-[#ff5c7a]' : 'text-[#00d9a3]'}>{Number(activeTrade.pnl) < 0 ? '-' : '+'}${Math.abs(Number(activeTrade.pnl)).toFixed(2)}</span></div>
            </div>
          </div>

          <div className="h-64 flex flex-col items-center justify-center p-6 text-center gap-2">
            <BarChart2 className="w-8 h-8 text-[#565e73] opacity-60" />
            <h4 className="font-sora text-sm font-semibold text-[#eef1f8]">Trade Replay Not Available</h4>
            <p className="text-xs text-[#565e73] max-w-xs leading-relaxed">
              This trade was added manually. Connect a trading account to view trade replay and simulation features.
            </p>
          </div>

          <div className="p-3 px-4 border-t border-[#1a2029]">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#565e73] font-semibold">
              <Edit3 className="w-3.5 h-3.5" /> Manual Entry
            </span>
          </div>
        </div>

        {/* Content Row: Journal Status & Trade Quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Journal Status */}
          <div className="bg-[#161b27] border border-[#1a2029] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sora text-xs font-semibold text-[#eef1f8] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7aa0ff]" />
                Journal Entry
              </h3>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                hasJournal ? 'text-[#00d9a3] bg-[#00d9a3]/15' : 'text-[#f2b84b] bg-[#f2b84b]/15'
              }`}>
                {hasJournal ? 'Journaled' : 'Not Journaled'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
              <p className="text-xs text-[#565e73]">
                {hasJournal ? 'Journal notes attached for this trade.' : 'No journal entry for this trade'}
              </p>
              <button
                onClick={() => onNavigateToJournal(activeTrade.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white hover:brightness-110 shadow-md shadow-[#2981eb]/20"
              >
                {hasJournal ? 'Edit Journal Entry' : 'Add Journal Entry'}
              </button>
            </div>
          </div>

          {/* Trade Quality Score */}
          <div className="bg-[#161b27] border border-[#1a2029] rounded-2xl p-5">
            <h3 className="font-sora text-xs font-semibold text-[#eef1f8] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7aa0ff]" />
              Trade Quality Score
            </h3>

            <div className="flex items-center gap-5">
              <div className="w-18 h-18 rounded-full border-4 border-[#232a3a] flex items-center justify-center shrink-0 bg-[#1c2230]">
                <span className="font-mono text-xl font-bold text-[#f2b84b]">{totalQualityScore}</span>
              </div>

              <div className="flex-1 flex flex-col gap-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#8d94a8]">Profitability</span>
                  <span className="font-mono text-[#565e73]">{profitabilityPts}/30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8d94a8]">Execution</span>
                  <span className="font-mono text-[#565e73]">{executionPts}/40</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8d94a8]">Journal</span>
                  <span className="font-mono text-[#565e73]">{journalPts}/20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8d94a8]">Rating</span>
                  <span className="font-mono text-[#565e73]">{ratingPts}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="bg-[#161b27] border border-[#1a2029] rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-sora text-xs font-semibold text-[#eef1f8] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7aa0ff]" />
              AI Pattern Analysis
            </h3>
            <span className="text-[10px] font-semibold text-[#a78bfa] bg-[#a78bfa]/15 px-2.5 py-0.5 rounded-full">
              PRO Feature
            </span>
          </div>

          <div className="bg-[#1c2230] border border-dashed border-[#232a3a] rounded-xl p-3.5 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <span className="font-semibold text-xs text-[#eef1f8] block mb-1">AI Setup Diagnostic</span>
              <p className="text-xs text-[#565e73] leading-relaxed">
                {activeTrade.pnl < 0
                  ? 'Analysis indicates trade was taken near resistance during high-volatility news window. Consider waiting for H4 candle confirmation.'
                  : 'Trade followed clean trendline retest with 1:3 Risk to Reward ratio. Great discipline on execution!'}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-[#161b27] border border-[#1a2029] rounded-2xl p-5">
          <h3 className="font-sora text-xs font-semibold text-[#eef1f8] mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#7aa0ff]" />
            vs Your Average
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1c2230] border border-[#232a3a] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">vs Avg Loser</span>
              <span className="font-mono text-sm font-semibold text-[#eef1f8]">-${Math.abs(activeTrade.pnl).toFixed(2)}</span>
              <span className="text-[10px] text-[#ff5c7a] font-bold block mt-1">-27%</span>
            </div>
            <div className="bg-[#1c2230] border border-[#232a3a] rounded-xl p-3">
              <span className="text-[11px] text-[#565e73] block mb-1">Hold Duration</span>
              <span className="font-mono text-sm font-[#eef1f8]">{activeTrade.duration || '1d 6h'}</span>
              <span className="text-[10px] text-[#ff5c7a] font-bold block mt-1">+0%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
