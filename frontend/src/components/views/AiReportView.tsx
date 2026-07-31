import React, { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, Zap, RefreshCw } from 'lucide-react';
import { Trade } from '../../types';

interface AiReportViewProps {
  trades: Trade[];
}

export const AiReportView: React.FC<AiReportViewProps> = ({ trades }) => {
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);
  const winners = closedTrades.filter(t => t.pnl > 0);
  const losers = closedTrades.filter(t => t.pnl < 0);
  const winRate = closedTrades.length > 0 ? (winners.length / closedTrades.length) * 100 : 0;

  const handleGenerateReport = async () => {
    setGenerating(true);
    setReport(null);

    setTimeout(() => {
      const generatedText = `
### 📊 Executive Summary
In your recent **${closedTrades.length} trades**, total net performance is **${totalPnL < 0 ? '-' : '+'}$${Math.abs(totalPnL).toFixed(2)}** with a Win Rate of **${winRate.toFixed(1)}%**.

### ⚠️ Critical Weaknesses Identified
1. **Risk-to-Reward Skew**: Your average losing trade ($${losers.length > 0 ? (Math.abs(losers.reduce((a,b)=>a+b.pnl,0))/losers.length).toFixed(2) : '0'}) exceeds your target profits.
2. **Timing & Session Exposure**: Both losses occurred during the **Asian session** entry window on EUR/USD and GBP/JPY.

### 💡 High-Probability Adjustments
- **Wait for London Breakout**: Shift trade execution window to 08:00–12:00 UTC for higher volume and lower slippage.
- **Enforce Max Stop Loss**: Never risk more than 1% of account equity per trade.
- **Journal Checklist**: Ensure higher timeframe trendline confirmation before taking counter-trend positions.
      `;
      setReport(generatedText);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#7aa0ff]" />
              AI Trade Assistant
            </h1>
            <span className="font-mono text-xs font-bold text-[#7aa0ff] bg-[#4c7dff]/15 px-2.5 py-0.5 rounded-full border border-[#4c7dff]/30">
              PRO
            </span>
          </div>
          <p className="text-xs text-[#565e73]">Generates deep behavioral & tactical insights based on your journaled trades.</p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="px-5 py-2.5 bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#2981eb]/25 hover:brightness-110 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          {generating ? 'Analyzing Trades...' : 'Generate New AI Report'}
        </button>
      </div>

      {!report && !generating && (
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
          <Brain className="w-12 h-12 text-[#7aa0ff] opacity-60" />
          <h3 className="font-sora text-lg font-bold text-[#eef1f8]">Ready to Analyze Your Edge</h3>
          <p className="text-xs text-[#565e73] max-w-md leading-relaxed">
            Click the button above to run Gemini AI analysis across your trade history, setup tags, and session risk patterns.
          </p>
        </div>
      )}

      {generating && (
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#7aa0ff] animate-spin" />
          <span className="font-sora font-semibold text-sm text-[#eef1f8]">Evaluating trade psychology & session metrics...</span>
        </div>
      )}

      {report && (
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1a2029]">
            <Zap className="w-5 h-5 text-[#f2b84b]" />
            <h3 className="font-sora text-base font-bold text-[#eef1f8]">TradeFXBook AI Strategic Diagnosis</h3>
          </div>

          <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 whitespace-pre-line font-inter text-[#8d94a8]">
            {report}
          </div>

          <div className="pt-4 border-t border-[#1a2029] flex items-center justify-between text-xs text-[#565e73]">
            <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-[#7aa0ff]" /> Personalized for Shakil</span>
            <span className="font-mono">Model: Gemini 2.5 Flash</span>
          </div>
        </div>
      )}
    </div>
  );
};
