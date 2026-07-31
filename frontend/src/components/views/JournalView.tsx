import React, { useState, useEffect, useRef } from 'react';
import { 
  ClipboardList, 
  CheckCircle2, 
  Target, 
  Smile, 
  BookOpen, 
  Tag, 
  Star, 
  Image as ImageIcon, 
  RotateCcw, 
  FileText, 
  BarChart2, 
  Plus, 
  BarChart, 
  Play, 
  Edit3,
  Loader2
} from 'lucide-react';
import { Trade, ChecklistItem } from '../../types';

interface JournalViewProps {
  trades: Trade[];
  selectedTradeId?: string;
  onUpdateTradeJournal: (tradeId: string, updatedJournal: any) => void;
  onNavigateToPerformance: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  trades,
  selectedTradeId,
  onUpdateTradeJournal,
  onNavigateToPerformance,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Journaled' | 'Pending' | 'Legacy'>('All');
  const [activeTradeId, setActiveTradeId] = useState<string>(selectedTradeId || trades[0]?.id || '');
  const [isLive, setIsLive] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(15);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (selectedTradeId) {
      setActiveTradeId(selectedTradeId);
    } else if (trades.length > 0 && !activeTradeId) {
      setActiveTradeId(trades[0].id);
    }
  }, [selectedTradeId, trades]);

  const activeTrade = trades.find(t => t.id === activeTradeId) || trades[0];

  const [preAnalysis, setPreAnalysis] = useState('');
  const [postReview, setPostReview] = useState('');
  const [risk, setRisk] = useState('1');
  const [reward, setReward] = useState('2.5');
  const [emotions, setEmotions] = useState('');
  const [lessons, setLessons] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [rating, setRating] = useState(5);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistLabel, setNewChecklistLabel] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (activeTrade && activeTrade.journal) {
      const j = activeTrade.journal;
      setPreAnalysis(j.preTradeAnalysis || '');
      setPostReview(j.postTradeReview || '');
      setRisk(String(j.riskRewardRisk || 1));
      setReward(String(j.riskRewardReward || 2.5));
      setEmotions(j.emotions || '');
      setLessons(j.lessons || '');
      setTagsInput((j.tags || []).join(', '));
      setRating(j.rating || 5);
      setChecklist(j.checklist || []);
      setIsSaved(false);
    }
  }, [activeTradeId, activeTrade]);

  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistLabel.trim()) return;
    setChecklist(prev => [
      ...prev,
      { id: 'item-' + Date.now(), label: newChecklistLabel.trim(), checked: true }
    ]);
    setNewChecklistLabel('');
  };

  const handleSave = () => {
    if (!activeTrade) return;
    const updatedJournal = {
      ...activeTrade.journal,
      preTradeAnalysis: preAnalysis,
      postTradeReview: postReview,
      riskRewardRisk: parseFloat(risk) || 1,
      riskRewardReward: parseFloat(reward) || 2,
      emotions,
      lessons,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      rating,
      checklist,
    };

    onUpdateTradeJournal(activeTrade.id, updatedJournal);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const filteredTrades = trades.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Journaled') return t.journalStatus === 'Journaled';
    if (activeTab === 'Pending') return t.journalStatus === 'Pending';
    if (activeTab === 'Legacy') return t.journalStatus === 'Legacy';
    return true;
  });

  const visibleTrades = filteredTrades.slice(0, displayLimit);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 40 && !loadingMore && displayLimit < filteredTrades.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setDisplayLimit(prev => Math.min(prev + 15, filteredTrades.length));
        setLoadingMore(false);
      }, 400);
    }
  };

  if (!activeTrade) {
    return (
      <div className="p-12 text-center text-[#5c6478]">
        <p className="text-base font-semibold text-[#f4f6fa] mb-1">No trades available to journal.</p>
        <p className="text-xs">Import your Exness CSV or add a trade to start journaling setups and reflections.</p>
      </div>
    );
  }

  const checkedCount = checklist.filter(c => c.checked).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200 items-stretch min-h-[calc(100vh-100px)]">
      
      {/* LEFT TRADE LIST SIDEBAR - FULL HEIGHT */}
      <div className="lg:col-span-4 bg-[#0e1017] border border-[#212636] rounded-2xl overflow-hidden shadow-lg flex flex-col h-full min-h-[calc(100vh-100px)]">
        <div className="flex items-center justify-between p-4 pb-3 border-b border-[#1a1e2b]">
          <span className="font-outfit font-semibold text-sm text-[#f4f6fa]">Trade Journal</span>
          <div className="flex items-center gap-2.5">
            <label className="flex items-center gap-1.5 text-xs text-[#9aa2b3] cursor-pointer">
              <input 
                type="checkbox" 
                checked={isLive} 
                onChange={(e) => setIsLive(e.target.checked)}
                className="accent-[#2981eb] rounded" 
              />
              Live
            </label>
            <span className="font-mono text-[10.5px] text-[#5c6478] bg-[#141824] px-2 py-0.5 rounded-full border border-[#212636]">
              {trades.filter(t => t.journalStatus === 'Journaled').length} entries
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-3 border-b border-[#1a1e2b] overflow-x-auto no-scrollbar">
          {(['All', 'Journaled', 'Pending', 'Legacy'] as const).map(tab => {
            const count = trades.filter(t => tab === 'All' ? true : t.journalStatus === tab).length;
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setDisplayLimit(15); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  activeTab === tab 
                    ? 'bg-[#2981eb]/15 text-[#5aa2f2] border-[#2981eb]/30' 
                    : 'text-[#9aa2b3] border-transparent hover:bg-[#141824]'
                }`}
              >
                <span>{tab}</span>
                <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab ? 'bg-[#2981eb]/25' : 'bg-white/5'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trade List with Infinite Scroll */}
        <div 
          onScroll={handleScroll}
          className="flex-1 flex flex-col p-2.5 gap-1.5 overflow-y-auto max-h-[calc(100vh-220px)]"
        >
          {visibleTrades.map(trade => (
            <button
              key={trade.id}
              onClick={() => setActiveTradeId(trade.id)}
              className={`flex flex-col gap-2 p-3 rounded-xl text-left transition-colors border ${
                activeTradeId === trade.id
                  ? 'bg-[#141824] border-[#2981eb] shadow-[inset_0_0_0_1px_rgba(41,129,235,0.25)]'
                  : 'bg-transparent border-transparent hover:bg-[#141824]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-mono text-[9px] font-bold text-[#9aa2b3]">
                  {trade.pairCode}
                </span>
                <span className="font-semibold text-xs text-[#f4f6fa] flex-1">{trade.symbol}</span>
                <span className="font-mono text-[9px] font-semibold text-[#5aa2f2] bg-[#2981eb]/15 px-1.5 py-0.5 rounded">
                  {trade.journalStatus}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <span className={`font-mono text-[10.5px] font-semibold px-2 py-0.5 rounded ${
                  trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'
                }`}>
                  {trade.type === 'long' ? 'Long' : 'Short'}
                </span>
                <span className="font-mono text-[#9aa2b3]">${Number(trade.entryPrice).toFixed(2)}</span>
                <span className={`ml-auto font-mono font-semibold ${Number(trade.pnl) < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  {Number(trade.pnl) < 0 ? '-' : '+'}${Math.abs(Number(trade.pnl)).toFixed(2)}
                </span>
              </div>

              <div className="text-[11px] text-[#5c6478] font-mono">
                {trade.openTime ? trade.openTime.slice(0, 16).replace('T', ', ') : 'N/A'}
              </div>
            </button>
          ))}

          {loadingMore && (
            <div className="p-3 text-center flex items-center justify-center gap-2 text-xs text-[#5aa2f2]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading more trades...</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT MAIN JOURNAL PANEL */}
      <div className="lg:col-span-8 bg-[#0e1017] border border-[#212636] rounded-2xl overflow-hidden shadow-lg flex flex-col">
        
        {/* Detail Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between p-5 border-b border-[#1a1e2b] gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#141824] border border-[#212636] flex items-center justify-center font-mono text-sm font-bold text-[#f4f6fa]">
              {activeTrade.pairCode}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-outfit text-lg font-bold text-[#f4f6fa]">{activeTrade.symbol}</h2>
                <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded ${
                  activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'
                }`}>
                  {activeTrade.type === 'long' ? 'Long' : 'Short'}
                </span>
              </div>
              <p className="text-xs text-[#5c6478] font-mono mt-0.5">
                Opened {activeTrade.openTime ? activeTrade.openTime.slice(0, 16).replace('T', ' ') : 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[#5c6478] block text-[10px]">ENTRY PRICE</span>
              <span className="font-bold text-[#f4f6fa]">${Number(activeTrade.entryPrice).toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-[#5c6478] block text-[10px]">EXIT PRICE</span>
              <span className="font-bold text-[#f4f6fa]">${Number(activeTrade.exitPrice).toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-[#5c6478] block text-[10px]">REALIZED P&L</span>
              <span className={`font-bold ${Number(activeTrade.pnl) < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                {Number(activeTrade.pnl) < 0 ? '-' : '+'}${Math.abs(Number(activeTrade.pnl)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* 4-PART JOURNAL FORM */}
        <div className="p-5 flex flex-col gap-6 flex-1">
          {/* Part 1: Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#5aa2f2]" />
                Pre-Trade Analysis
              </label>
              <textarea
                value={preAnalysis}
                onChange={(e) => setPreAnalysis(e.target.value)}
                placeholder="What was your setup reason, key support/resistance levels, timeframe context..."
                className="w-full bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] min-h-[90px] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#22c58b]" />
                Post-Trade Review
              </label>
              <textarea
                value={postReview}
                onChange={(e) => setPostReview(e.target.value)}
                placeholder="What happened during execution, did price hit TP/SL, management adjustments..."
                className="w-full bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] min-h-[90px] resize-none"
              />
            </div>
          </div>

          {/* Part 2: Execution Checklist & Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#1a1e2b]">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-[#9aa2b3] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c58b]" />
                  Execution Checklist ({checkedCount}/{checklist.length})
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mb-3">
                {checklist.map(item => (
                  <label key={item.id} className="flex items-center gap-2 text-xs text-[#f4f6fa] cursor-pointer bg-[#141824] p-2 rounded-lg border border-[#212636]">
                    <input 
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleChecklist(item.id)}
                      className="accent-[#22c58b] rounded"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChecklistLabel}
                  onChange={(e) => setNewChecklistLabel(e.target.value)}
                  placeholder="Add custom rule..."
                  className="flex-1 bg-[#141824] border border-[#212636] rounded-lg px-2.5 py-1.5 text-xs text-[#f4f6fa] outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistItem}
                  className="px-3 py-1.5 bg-[#1a1f2c] border border-[#212636] text-[#f4f6fa] text-xs rounded-lg font-semibold hover:border-[#2981eb]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#f2b84b]" />
                Self-Rating (1 to 10)
              </label>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 10 }).map((_, i) => {
                  const starVal = i + 1;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        starVal <= rating 
                          ? 'bg-[#f2b84b] text-[#0e1017] shadow-md shadow-[#f2b84b]/20' 
                          : 'bg-[#141824] text-[#5c6478] hover:text-[#f4f6fa]'
                      }`}
                    >
                      {starVal}
                    </button>
                  );
                })}
              </div>

              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-[#a78bfa]" />
                Emotions & Mindset
              </label>
              <input
                type="text"
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
                placeholder="e.g. Calm, anxious, FOMO, patient..."
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3 py-2 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              />
            </div>
          </div>

          {/* Part 3: Lessons & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#1a1e2b]">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#ef4b5c]" />
                Key Lessons Learned
              </label>
              <input
                type="text"
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                placeholder="e.g. Always wait for candle close before entering..."
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3 py-2 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#5aa2f2]" />
                Setup Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="breakout, news, trendline, retest"
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3 py-2 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              />
            </div>
          </div>

          {/* Save Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1a1e2b] mt-auto">
            <button
              type="button"
              onClick={onNavigateToPerformance}
              className="text-xs font-semibold text-[#5aa2f2] hover:underline flex items-center gap-1"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              View Performance Analytics
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#2981eb] hover:bg-[#5aa2f2] text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#2981eb]/25"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Journal Saved!
                </>
              ) : (
                'Save Journal Entry'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
