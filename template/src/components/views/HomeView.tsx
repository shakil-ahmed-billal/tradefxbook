import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Sparkles, 
  History, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Zap, 
  Users, 
  Wrench,
  BarChart2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { NavTab, Trade, UserProfile } from '../../types';

interface HomeViewProps {
  trades: Trade[];
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onOpenAddTrade: () => void;
  onOpenConnectBroker: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  trades,
  user,
  onNavigate,
  onOpenAddTrade,
  onOpenConnectBroker,
}) => {
  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);
  const winCount = closedTrades.filter(t => t.pnl > 0).length;
  const winRate = closedTrades.length > 0 ? (winCount / closedTrades.length) * 100 : 0;
  const journaledCount = trades.filter(t => t.journalStatus === 'Journaled').length;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#101524] via-[#141a2e] to-[#0e121e] border border-[#232a3a] rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-[#2981eb]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-[#00d9a3]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#5aa2f2] bg-[#2981eb]/15 border border-[#2981eb]/30 px-3 py-1 rounded-full mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#00d9a3] animate-pulse" />
              TradeFXBook Desktop Suite
            </div>
            
            <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#eef1f8] tracking-tight leading-tight mb-2.5">
              Welcome back, <span className="bg-gradient-to-r from-[#5aa2f2] to-[#2981eb] bg-clip-text text-transparent">{user.name}</span> 👋
            </h1>

            <p className="text-xs sm:text-sm text-[#8d94a8] leading-relaxed max-w-xl mb-5">
              Your personal quantitative trading hub. Track execution quality, analyze risk metrics, backtest strategies, and leverage AI diagnostic models.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAddTrade}
                className="px-4 py-2.5 bg-gradient-to-r from-[#2981eb] to-[#3a63d9] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#2981eb]/25 hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                Log New Trade
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2.5 bg-[#161b27] border border-[#232a3a] text-[#eef1f8] hover:border-[#39415a] rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-[#5aa2f2]" />
                Go to Dashboard
              </button>

              <button
                onClick={onOpenConnectBroker}
                className="px-4 py-2.5 bg-[#161b27]/80 border border-[#232a3a] text-[#8d94a8] hover:text-[#eef1f8] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#f2b84b]" />
                Sync Broker (MT4/MT5)
              </button>
            </div>
          </div>

          {/* Quick Stats Pill Panel */}
          <div className="bg-[#090c12]/70 border border-[#1f2636] rounded-2xl p-4 sm:p-5 backdrop-blur-md min-w-[260px] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a2029]">
              <span className="text-[#8d94a8]">Net Profit / Loss</span>
              <span className={`font-mono font-bold ${totalPnL >= 0 ? 'text-[#00d9a3]' : 'text-[#ff5c7a]'}`}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a2029]">
              <span className="text-[#8d94a8]">Win Rate</span>
              <span className="font-mono font-bold text-[#eef1f8]">{winRate.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a2029]">
              <span className="text-[#8d94a8]">Total Logged Trades</span>
              <span className="font-mono font-bold text-[#eef1f8]">{trades.length}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8d94a8]">Journaled Trades</span>
              <span className="font-mono font-bold text-[#00d9a3]">{journaledCount} / {trades.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK FEATURE NAV GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sora text-base font-bold text-[#eef1f8] flex items-center gap-2">
            <Home className="w-4 h-4 text-[#5aa2f2]" />
            Workspace Modules
          </h2>
          <span className="text-xs text-[#565e73]">Select a tool to start analyzing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Dashboard */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="group bg-[#10141d] border border-[#232a3a] hover:border-[#2981eb]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2981eb]/15 border border-[#2981eb]/30 flex items-center justify-center text-[#5aa2f2] mb-3 group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="font-sora font-semibold text-sm text-[#eef1f8] mb-1 group-hover:text-[#5aa2f2] transition-colors">
                Performance Dashboard
              </h3>
              <p className="text-xs text-[#565e73] leading-relaxed">
                Equity growth curve, win rate stats, trade distribution, and day-by-day P&L heatmap.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1a2029] flex items-center justify-between text-xs font-semibold text-[#5aa2f2]">
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Journal */}
          <div 
            onClick={() => onNavigate('journal')}
            className="group bg-[#10141d] border border-[#232a3a] hover:border-[#2981eb]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#00d9a3]/15 border border-[#00d9a3]/30 flex items-center justify-center text-[#00d9a3] mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-sora font-semibold text-sm text-[#eef1f8] mb-1 group-hover:text-[#00d9a3] transition-colors">
                Trade Journal
              </h3>
              <p className="text-xs text-[#565e73] leading-relaxed">
                Log pre-trade plans, post-trade reviews, tags, emotions, screenshot attachments, and checklists.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1a2029] flex items-center justify-between text-xs font-semibold text-[#00d9a3]">
              <span>View Journal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: AI Report */}
          <div 
            onClick={() => onNavigate('ai-report')}
            className="group bg-[#10141d] border border-[#232a3a] hover:border-[#a78bfa]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/15 border border-[#a78bfa]/30 flex items-center justify-center text-[#a78bfa] mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-sora font-semibold text-sm text-[#eef1f8] group-hover:text-[#a78bfa] transition-colors">
                  AI Trade Assistant
                </h3>
                <span className="font-mono text-[9px] font-bold text-[#a78bfa] bg-[#a78bfa]/15 px-1.5 py-0.2 rounded">
                  PRO
                </span>
              </div>
              <p className="text-xs text-[#565e73] leading-relaxed">
                AI diagnostic reports powered by Gemini to spot execution leaks and psychological biases.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1a2029] flex items-center justify-between text-xs font-semibold text-[#a78bfa]">
              <span>Run AI Diagnosis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Strategy Backtesting */}
          <div 
            onClick={() => onNavigate('backtesting')}
            className="group bg-[#10141d] border border-[#232a3a] hover:border-[#f2b84b]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#f2b84b]/15 border border-[#f2b84b]/30 flex items-center justify-center text-[#f2b84b] mb-3 group-hover:scale-105 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-sora font-semibold text-sm text-[#eef1f8] group-hover:text-[#f2b84b] transition-colors">
                  Strategy Backtesting
                </h3>
                <span className="font-mono text-[9px] font-bold text-[#f2b84b] bg-[#f2b84b]/15 px-1.5 py-0.2 rounded">
                  ELITE
                </span>
              </div>
              <p className="text-xs text-[#565e73] leading-relaxed">
                Replay historical price candles to validate rules and strategy win rates prior to live execution.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1a2029] flex items-center justify-between text-xs font-semibold text-[#f2b84b]">
              <span>Launch Backtester</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* SECONDARY ROW: RECENT TRADES SUMMARY & RISK TOOLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Trades Table Preview */}
        <div className="lg:col-span-8 bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sora font-bold text-base text-[#eef1f8] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#5aa2f2]" />
                Recent Executed Trades
              </h3>
              <p className="text-xs text-[#565e73]">Latest positions recorded in your desk log</p>
            </div>

            <button
              onClick={() => onNavigate('trades')}
              className="text-xs font-semibold text-[#5aa2f2] hover:text-[#7aa0ff] flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {trades.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#565e73]">
              No trades logged yet. Click "Log New Trade" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1a2029] text-[11px] font-mono text-[#565e73] uppercase">
                    <th className="py-2.5 px-3">Symbol</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Entry</th>
                    <th className="py-2.5 px-3">Exit</th>
                    <th className="py-2.5 px-3">P&L</th>
                    <th className="py-2.5 px-3 text-right">Journal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2029]">
                  {trades.slice(0, 4).map(trade => (
                    <tr key={trade.id} className="hover:bg-[#161b27]/60 text-xs transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#161b27] border border-[#232a3a] flex items-center justify-center font-mono text-[9px] font-bold text-[#8d94a8]">
                            {trade.pairCode}
                          </span>
                          <span className="font-semibold text-[#eef1f8]">{trade.symbol}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trade.type === 'long' ? 'text-[#00d9a3] bg-[#00d9a3]/15' : 'text-[#ff5c7a] bg-[#ff5c7a]/15'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[#8d94a8]">${trade.entryPrice}</td>
                      <td className="py-3 px-3 font-mono text-[#8d94a8]">${trade.exitPrice}</td>
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={trade.pnl >= 0 ? 'text-[#00d9a3]' : 'text-[#ff5c7a]'}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          trade.journalStatus === 'Journaled' 
                            ? 'text-[#00d9a3] bg-[#00d9a3]/15' 
                            : 'text-[#f2b84b] bg-[#f2b84b]/15'
                        }`}>
                          {trade.journalStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Tools & Risk Safeguard Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-[#5aa2f2]" />
              <h3 className="font-sora font-bold text-sm text-[#eef1f8]">Position Risk Tools</h3>
            </div>
            <p className="text-xs text-[#565e73] leading-relaxed mb-4">
              Calculate exact lot sizes and dollar risk before placing trades to protect account equity.
            </p>

            <button
              onClick={() => onNavigate('tools')}
              className="w-full py-2.5 bg-[#161b27] border border-[#232a3a] hover:border-[#39415a] rounded-xl text-xs font-semibold text-[#eef1f8] flex items-center justify-center gap-2 transition-all"
            >
              Open Position Calculator <ArrowRight className="w-3.5 h-3.5 text-[#5aa2f2]" />
            </button>
          </div>

          <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#00d9a3]" />
              <h3 className="font-sora font-bold text-sm text-[#eef1f8]">Traders Lounge</h3>
            </div>
            <p className="text-xs text-[#565e73] leading-relaxed mb-4">
              Share setups, trade ideas, and collaborate with live verified traders worldwide.
            </p>

            <button
              onClick={() => onNavigate('traders-lounge')}
              className="w-full py-2.5 bg-[#161b27] border border-[#232a3a] hover:border-[#39415a] rounded-xl text-xs font-semibold text-[#eef1f8] flex items-center justify-center gap-2 transition-all"
            >
              Join Community Discussion <ArrowRight className="w-3.5 h-3.5 text-[#00d9a3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
