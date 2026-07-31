import React, { useState, useEffect } from 'react';
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
  Edit3 
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

  if (!activeTrade) {
    return (
      <div className="p-8 text-center text-[#5c6478]">
        No trades available to journal. Add a trade first.
      </div>
    );
  }

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

  const checkedCount = checklist.filter(c => c.checked).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200 items-start">
      
      {/* LEFT TRADE LIST SIDEBAR */}
      <div className="lg:col-span-4 bg-[#0e1017] border border-[#212636] rounded-2xl overflow-hidden shadow-lg">
        <div className="flex items-center justify-between p-4 pb-3">
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
        <div className="flex items-center gap-1 px-3 pb-3 overflow-x-auto no-scrollbar">
          {(['All', 'Journaled', 'Pending', 'Legacy'] as const).map(tab => {
            const count = trades.filter(t => tab === 'All' ? true : t.journalStatus === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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

        {/* Trade List */}
        <div className="flex flex-col p-2.5 gap-1.5 max-h-[640px] overflow-y-auto">
          {filteredTrades.map(trade => (
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
                <span className="font-mono text-[#9aa2b3]">{trade.entryPrice}</span>
                <span className={`ml-auto font-mono font-semibold ${trade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                </span>
              </div>

              <div className="text-[11px] text-[#5c6478] font-mono">
                {trade.openTime.slice(0, 16).replace('T', ', ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT MAIN JOURNAL PANEL */}
      <div className="lg:col-span-8 bg-[#0e1017] border border-[#212636] rounded-2xl overflow-hidden shadow-lg">
        
        {/* Detail Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between p-5 border-b border-[#1a1e2b] gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-7 h-7 rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-mono text-[10px] font-bold text-[#9aa2b3]">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit font-semibold text-lg text-[#f4f6fa]">{activeTrade.symbol}</span>
              <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
                activeTrade.outcome === 'Winner'
                  ? 'text-[#22c58b] bg-[#22c58b]/15 border-[#22c58b]/30'
                  : 'text-[#ef4b5c] bg-[#ef4b5c]/15 border-[#ef4b5c]/30'
              }`}>
                {activeTrade.outcome}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#9aa2b3] flex-wrap">
              <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'
              }`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
              <span className="text-[#5c6478]">•</span>
              <span>Entry {activeTrade.entryPrice}</span>
              <span className="text-[#5c6478]">•</span>
              <span>Size {activeTrade.size}</span>
              <span className="text-[#5c6478]">•</span>
              <span>{activeTrade.openTime.slice(0, 16).replace('T', ', ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => {
                if (activeTrade.journal) {
                  setPreAnalysis(activeTrade.journal.preTradeAnalysis || '');
                  setPostReview(activeTrade.journal.postTradeReview || '');
                }
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa]"
              title="Reset to saved"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={onNavigateToPerformance}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa]"
            >
              <FileText className="w-3.5 h-3.5" />
              Report
            </button>

            <button 
              onClick={onNavigateToPerformance}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa]"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Analytics
            </button>

            <button 
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
                isSaved ? 'bg-[#22c58b]' : 'bg-[#2981eb] hover:bg-[#5aa2f2]'
              }`}
            >
              {isSaved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-6 flex flex-col gap-5">
          {/* Pre-trade Analysis */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
              <ClipboardList className="w-4 h-4 text-[#5aa2f2]" />
              Pre-trade Analysis
            </label>
            <textarea
              value={preAnalysis}
              onChange={(e) => setPreAnalysis(e.target.value)}
              placeholder="What did you see? Plan, thesis, key levels, risk..."
              className="w-full min-h-[88px] bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] placeholder-[#5c6478] resize-y"
            />
          </div>

          {/* Post-trade Review */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#5aa2f2]" />
              Post-trade Review
            </label>
            <textarea
              value={postReview}
              onChange={(e) => setPostReview(e.target.value)}
              placeholder="What happened? Execution, slippage, improvements..."
              className="w-full min-h-[88px] bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] placeholder-[#5c6478] resize-y"
            />
          </div>

          {/* Risk : Reward */}
          <div className="max-w-[240px]">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
              <Target className="w-4 h-4 text-[#5aa2f2]" />
              Risk : Reward
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="w-full text-center bg-[#141824] border border-[#212636] rounded-xl p-2.5 font-mono text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              />
              <span className="text-[#5c6478] font-bold">:</span>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full text-center bg-[#141824] border border-[#212636] rounded-xl p-2.5 font-mono text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              />
            </div>
          </div>

          {/* Emotions & Lessons Learned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
                <Smile className="w-4 h-4 text-[#5aa2f2]" />
                Emotions
              </label>
              <textarea
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
                placeholder="Calm, anxious, FOMO, confident..."
                className="w-full min-h-[70px] bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] placeholder-[#5c6478] resize-y"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
                <BookOpen className="w-4 h-4 text-[#5aa2f2]" />
                Lessons Learned
              </label>
              <textarea
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                placeholder="Key takeaways to repeat or avoid..."
                className="w-full min-h-[70px] bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] placeholder-[#5c6478] resize-y"
              />
            </div>
          </div>

          {/* Tags & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
                <Tag className="w-4 h-4 text-[#5aa2f2]" />
                Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="breakout, trend, news (comma separated)"
                className="w-full bg-[#141824] border border-[#212636] rounded-xl p-3 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb] placeholder-[#5c6478]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3]">
                  <Star className="w-4 h-4 text-[#5aa2f2]" />
                  Self Rating
                </label>
                <span className="font-mono text-xs text-[#5aa2f2] font-semibold">{rating}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full accent-[#2981eb] cursor-pointer"
              />
              <div className="flex justify-between text-[10.5px] text-[#5c6478] font-mono mt-1">
                <span>1</span><span>5</span><span>10</span>
              </div>
            </div>
          </div>

          {/* Execution Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3]">
                <CheckCircle2 className="w-4 h-4 text-[#5aa2f2]" />
                Execution Checklist
              </label>
              <span className="font-mono text-xs text-[#5c6478]">{checkedCount}/{checklist.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {checklist.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleChecklist(item.id)}
                  className="flex items-center gap-2.5 p-2 text-left group cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    item.checked ? 'bg-[#2981eb] border-[#2981eb] text-white' : 'bg-[#141824] border-[#212636]'
                  }`}>
                    {item.checked && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span className={`text-xs transition-colors ${item.checked ? 'text-[#f4f6fa]' : 'text-[#9aa2b3]'}`}>
                    {item.label}
                  </span>
                </button>
              ))}

              <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                <input
                  type="text"
                  value={newChecklistLabel}
                  onChange={(e) => setNewChecklistLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                  placeholder="Add custom checklist item..."
                  className="flex-1 bg-[#141824] border border-dashed border-[#212636] rounded-lg p-2 text-xs text-[#f4f6fa] outline-none placeholder-[#5c6478]"
                />
                <button
                  onClick={handleAddChecklistItem}
                  className="w-8 h-8 rounded-lg bg-[#141824] border border-[#212636] text-[#5c6478] hover:text-[#f4f6fa] flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Screenshots Upload */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#9aa2b3] mb-2">
              <ImageIcon className="w-4 h-4 text-[#5aa2f2]" />
              Screenshots
            </label>
            <div className="flex gap-2 flex-wrap">
              <label className="w-24 h-24 rounded-xl border border-dashed border-[#212636] bg-[#141824] flex flex-col items-center justify-center gap-1.5 text-[#5c6478] hover:border-[#5aa2f2] hover:text-[#5aa2f2] cursor-pointer transition-colors text-[11px]">
                <Plus className="w-4 h-4" />
                <span>Add Image</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Signature Chart Section */}
        <div className="m-6 border border-[#212636] rounded-2xl overflow-hidden bg-gradient-to-b from-[#2981eb]/5 to-transparent bg-[#141824]">
          <div className="flex items-center justify-between p-4 border-b border-[#1a1e2b] flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#161b27] border border-[#212636] flex items-center justify-center font-mono text-[9px] font-bold text-[#9aa2b3]">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit font-semibold text-sm text-[#f4f6fa]">{activeTrade.symbol}</span>
              <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded ${
                activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'
              }`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#5c6478] uppercase block">Entry</span>
                <span className="font-semibold text-[#f4f6fa]">{activeTrade.entryPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#5c6478] uppercase block">Exit</span>
                <span className="font-semibold text-[#f4f6fa]">{activeTrade.exitPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#5c6478] uppercase block">P&L</span>
                <span className={`font-semibold ${activeTrade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  {activeTrade.pnl < 0 ? '-' : '+'}${Math.abs(activeTrade.pnl).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1017] border border-[#212636] text-xs font-medium text-[#9aa2b3] hover:text-[#f4f6fa]">
                <BarChart className="w-3.5 h-3.5" />
                Analyze
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1017] border border-[#212636] text-xs font-medium text-[#9aa2b3] hover:text-[#f4f6fa]">
                <Play className="w-3.5 h-3.5" />
                Replay
              </button>
            </div>
          </div>

          <div className="relative min-h-[200px] flex items-center justify-center p-6">
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 600 220" preserveAspectRatio="none">
              <g stroke="#22c58b" strokeWidth="3">
                <line x1="40" y1="90" x2="40" y2="140"/>
                <line x1="80" y1="70" x2="80" y2="110"/>
                <line x1="120" y1="100" x2="120" y2="150" stroke="#ef4b5c"/>
                <line x1="160" y1="60" x2="160" y2="95"/>
                <line x1="200" y1="85" x2="200" y2="130" stroke="#ef4b5c"/>
                <line x1="240" y1="50" x2="240" y2="80"/>
                <line x1="280" y1="95" x2="280" y2="135" stroke="#ef4b5c"/>
                <line x1="320" y1="65" x2="320" y2="100"/>
              </g>
            </svg>

            <div className="relative z-10 text-center max-w-xs">
              <BarChart2 className="w-8 h-8 text-[#5aa2f2] mx-auto mb-2" />
              <h4 className="font-outfit text-sm font-semibold text-[#f4f6fa] mb-1">Chart Not Available</h4>
              <p className="text-xs text-[#9aa2b3] leading-relaxed">
                This trade was added manually. Connect a trading account to view real-time charts for your trades.
              </p>
            </div>
          </div>

          <div className="p-3 px-4 border-t border-[#1a1e2b]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#5c6478] bg-[#0e1017] border border-[#212636] px-2.5 py-1 rounded-full">
              <Edit3 className="w-3 h-3" />
              Manual Entry
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
