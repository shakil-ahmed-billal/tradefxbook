import React, { useState, useEffect } from 'react';
import { Trade, ChecklistItem } from '../../types';

interface JournalViewProps {
  trades: Trade[];
  selectedTradeId?: string;
  onUpdateTradeJournal: (tradeId: string, updatedJournal: any) => void;
  onNavigateToPerformance: () => void;
}

const SvgReset = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const SvgReport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg>;
const SvgAnalytics = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const SvgPreTrade = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
const SvgPostTrade = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const SvgRR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M8 3H3v5M21 3l-8.5 8.5M3 3l8.5 8.5M3 21l8.5-8.5M21 21l-8.5-8.5"/></svg>;
const SvgEmotions = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>;
const SvgLessons = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>;
const SvgTags = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>;
const SvgRating = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11.5 2.3a.5.5 0 0 1 .9 0l2.3 4.7a2.1 2.1 0 0 0 1.6 1.2l5.2.7a.5.5 0 0 1 .3.9l-3.7 3.6a2.1 2.1 0 0 0-.6 1.9l.9 5.1a.5.5 0 0 1-.8.6l-4.6-2.4a2.1 2.1 0 0 0-2 0l-4.6 2.4a.5.5 0 0 1-.8-.6l.9-5.1a2.1 2.1 0 0 0-.6-1.9L2.2 9.8a.5.5 0 0 1 .3-.9l5.2-.7a2.1 2.1 0 0 0 1.6-1.2z"/></svg>;
const SvgChecklist = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const SvgPlus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>;
const SvgScreenshots = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>;
const SvgAnalyze = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/></svg>;
const SvgReplay = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const SvgChartEmpty = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const SvgManual = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;

const DEFAULT_CHECKLIST = [
  'Checked higher timeframe',
  'Risk within limits',
  'Fits my trading plan',
  'Key levels identified',
  'Economic calendar checked'
];

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
    if (selectedTradeId) setActiveTradeId(selectedTradeId);
    else if (trades.length > 0 && !activeTradeId) setActiveTradeId(trades[0].id);
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
      
      if (j.checklist && j.checklist.length > 0) {
        setChecklist(j.checklist);
      } else {
        setChecklist(DEFAULT_CHECKLIST.map((label, i) => ({ id: `default-${i}`, label, checked: false })));
      }
    } else {
      setPreAnalysis('');
      setPostReview('');
      setRisk('1');
      setReward('2.5');
      setEmotions('');
      setLessons('');
      setTagsInput('');
      setRating(5);
      setChecklist(DEFAULT_CHECKLIST.map((label, i) => ({ id: `default-${i}`, label, checked: false })));
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
      ...(activeTrade.journal || {}),
      preTradeAnalysis: preAnalysis,
      postTradeReview: postReview,
      riskRewardRisk: parseFloat(risk) || 1,
      riskRewardReward: parseFloat(reward) || 2.5,
      emotions,
      lessons,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      rating,
      checklist,
    };
    onUpdateTradeJournal(activeTrade.id, updatedJournal);
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
      }, 300);
    }
  };

  if (!activeTrade) return null;
  const checkedCount = checklist.filter(c => c.checked).length;
  const isWinner = Number(activeTrade.pnl) >= 0;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[328px_1fr] gap-[20px] items-start animate-in fade-in duration-200">
      
      {/* TRADE LIST SIDEBAR */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden w-full flex flex-col lg:sticky lg:top-4 h-[calc(100vh-100px)] shadow-lg">
        <div className="flex items-center justify-between p-4 pb-3">
          <span className="font-outfit font-semibold text-[14.5px] text-[var(--text-hi)]">Trade Journal</span>
          <div className="flex items-center gap-[10px]">
            <label className="flex items-center gap-1.5 text-[11.5px] text-[var(--text-mid)] cursor-pointer">
              <input type="checkbox" checked={isLive} onChange={e => setIsLive(e.target.checked)} className="rounded" />
              Live Sync
            </label>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c58b]" />
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 mx-4 mb-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-soft)]">
          {(['All', 'Journaled', 'Pending', 'Legacy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-[#2981eb] text-white' : 'text-[var(--text-mid)] hover:text-[var(--text-hi)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trade list */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 flex flex-col gap-1.5" onScroll={handleScroll}>
          {filteredTrades.length === 0 ? (
            <div className="text-center py-10 text-xs text-[var(--text-low)]">
              No {activeTab.toLowerCase()} trades found
            </div>
          ) : visibleTrades.map(trade => {
            const isSel = trade.id === activeTradeId;
            const isWin = Number(trade.pnl) >= 0;
            return (
              <button
                key={trade.id}
                onClick={() => setActiveTradeId(trade.id)}
                className={`flex flex-col gap-2 p-3 rounded-xl text-left w-full transition-all border cursor-pointer ${
                  isSel
                    ? 'bg-[var(--bg-elevated)] border-[#2981eb] shadow-[inset_0_0_0_1px_rgba(41,129,235,0.25)]'
                    : 'bg-transparent border-transparent hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-[26px] h-[26px] rounded-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-[9px] font-bold text-[var(--text-mid)] shrink-0">
                    {trade.pairCode}
                  </span>
                  <span className="text-[13px] font-semibold flex-1 tracking-[0.01em] text-[var(--text-hi)]">{trade.symbol}</span>
                  <span className="font-mono text-[9px] font-semibold text-[#5aa2f2] bg-[#2981eb]/15 px-1.5 py-0.5 rounded-[5px]">
                    {trade.journalStatus === 'Journaled' ? 'Done' : 'New'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px]">
                  <span className={`font-mono text-[10.5px] font-semibold px-[7px] py-[2px] rounded-[5px] ${trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                    {trade.type === 'long' ? 'Long' : 'Short'}
                  </span>
                  <span className="font-mono text-[var(--text-mid)]">{trade.entryPrice}</span>
                  <span className={`ml-auto font-mono text-[12.5px] font-semibold ${isWin ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}`}>
                    {isWin ? '+' : '-'}${Math.abs(Number(trade.pnl)).toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-low)] font-mono">
                  {trade.openTime ? trade.openTime.slice(0, 16).replace('T', ', ') : 'N/A'}
                </div>
              </button>
            )
          })}
          {loadingMore && (
            <div className="p-3 text-center flex items-center justify-center gap-2 text-xs text-[#5aa2f2]">
              <div className="w-4 h-4 animate-spin border-2 border-[#5aa2f2] border-t-transparent rounded-full" />
              <span>Loading more trades...</span>
            </div>
          )}
        </div>
      </div>

      {/* MAIN JOURNAL PANEL */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden w-full">
        
        {/* Detail Header */}
        <div className="flex items-start justify-between p-[18px_22px] border-b border-[#1a1e2b] gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-[10px] mb-1.5">
              <span className="w-[30px] h-[30px] rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-mono text-[10px] font-bold text-[#9aa2b3] shrink-0">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit text-[17px] font-semibold text-[#f4f6fa]">{activeTrade.symbol}</span>
              <span className={`font-mono text-[10.5px] font-semibold px-[9px] py-[3px] rounded-[6px] border ${isWinner ? 'text-[#22c58b] bg-[#22c58b]/15 border-[#22c58b]/30' : 'text-[#ef4b5c] bg-[#ef4b5c]/15 border-[#ef4b5c]/30'}`}>
                {isWinner ? 'Winner' : 'Loser'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-[#9aa2b3] flex-wrap">
              <span className={`font-mono font-semibold text-[11px] px-[7px] py-[2px] rounded-[5px] ${activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
              <span className="text-[#5c6478]">•</span>
              <span>Entry {activeTrade.entryPrice}</span>
              <span className="text-[#5c6478]">•</span>
              <span>Size {activeTrade.size}</span>
              <span className="text-[#5c6478]">•</span>
              <span>{activeTrade.openTime ? activeTrade.openTime.slice(0, 16).replace('T', ', ') : 'N/A'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#141824] border border-[#212636] text-[#9aa2b3] hover:text-[#f4f6fa] hover:border-[#2a2f42] transition-colors" title="Reset to saved">
              <SvgReset />
            </button>
            <button className="flex items-center gap-1.5 px-[14px] py-[8px] rounded-[9px] text-[12.5px] font-semibold cursor-pointer border border-[#212636] bg-[#141824] text-[#9aa2b3] hover:text-[#f4f6fa] hover:border-[#2a2f42] transition-colors">
              <div className="w-3.5 h-3.5"><SvgReport /></div> Report
            </button>
            <button className="flex items-center gap-1.5 px-[14px] py-[8px] rounded-[9px] text-[12.5px] font-semibold cursor-pointer border border-[#212636] bg-[#141824] text-[#9aa2b3] hover:text-[#f4f6fa] hover:border-[#2a2f42] transition-colors">
              <div className="w-3.5 h-3.5"><SvgAnalytics /></div> Analytics
            </button>
            <button onClick={handleSave} className="flex items-center gap-1.5 px-[14px] py-[8px] rounded-[9px] text-[12.5px] font-semibold cursor-pointer border border-[#2981eb] bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors">
              Save
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-[22px] flex flex-col gap-[18px]">
          
          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgPreTrade /></div> Pre-trade Analysis
            </label>
            <textarea 
              className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none min-h-[88px] resize-y placeholder:text-[#5c6478] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
              placeholder="What did you see? Plan, thesis, levels, risk..."
              value={preAnalysis} onChange={e => setPreAnalysis(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgPostTrade /></div> Post-trade Review
            </label>
            <textarea 
              className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none min-h-[88px] resize-y placeholder:text-[#5c6478] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
              placeholder="What happened? Execution, slippage, improvements..."
              value={postReview} onChange={e => setPostReview(e.target.value)}
            />
          </div>

          <div className="max-w-[260px]">
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgRR /></div> Risk : Reward
            </label>
            <div className="flex items-center gap-[10px]">
              <input 
                className="w-full text-center bg-[#141824] border border-[#212636] rounded-[10px] p-[10px] font-mono text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                placeholder="1" value={risk} onChange={e => setRisk(e.target.value)}
              />
              <span className="text-[#5c6478] font-semibold">:</span>
              <input 
                className="w-full text-center bg-[#141824] border border-[#212636] rounded-[10px] p-[10px] font-mono text-[14px] text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                placeholder="2" value={reward} onChange={e => setReward(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px]">
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgEmotions /></div> Emotions
              </label>
              <textarea 
                className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none min-h-[70px] resize-y placeholder:text-[#5c6478] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="Calm, anxious, FOMO, confident..."
                value={emotions} onChange={e => setEmotions(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgLessons /></div> Lessons Learned
              </label>
              <textarea 
                className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none min-h-[70px] resize-y placeholder:text-[#5c6478] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="Key takeaways to repeat or avoid..."
                value={lessons} onChange={e => setLessons(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px]">
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgTags /></div> Tags
              </label>
              <input 
                className="w-full bg-[#141824] border border-[#212636] rounded-[10px] p-[11px_13px] text-[13.5px] text-[#f4f6fa] outline-none placeholder:text-[#5c6478] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="breakout, trend, news (comma separated)"
                value={tagsInput} onChange={e => setTagsInput(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgRating /></div> Rating 
                <span className="ml-auto font-mono text-[#5aa2f2] text-[12px]">{rating}/10</span>
              </label>
              <div className="px-[2px]">
                <input 
                  type="range" min="1" max="10" value={rating} onChange={e => setRating(parseInt(e.target.value))}
                  className="w-full h-[5px] accent-[#2981eb] cursor-pointer"
                />
                <div className="flex justify-between text-[10.5px] text-[#5c6478] mt-[4px] font-mono">
                  <span>1</span><span>5</span><span>10</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgChecklist /></div> Execution Checklist
              <span className="ml-auto font-mono text-[11px] text-[#5c6478]">{checkedCount}/{checklist.length}</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px]">
              {checklist.map(item => (
                <div key={item.id} className="flex items-center gap-[10px] cursor-pointer py-[4px]" onClick={() => handleToggleChecklist(item.id)}>
                  <div className={`w-[18px] h-[18px] rounded-[6px] border-[1.5px] flex-shrink-0 relative transition-all ${
                    item.checked ? 'bg-[#2981eb] border-[#2981eb]' : 'bg-[#141824] border-[#212636]'
                  }`}>
                    {item.checked && (
                      <div className="absolute left-[5px] top-[1px] w-[4px] h-[9px] border-r-[2px] border-b-[2px] border-white rotate-45" />
                    )}
                  </div>
                  <span className={`text-[13px] ${item.checked ? 'text-[#f4f6fa]' : 'text-[#9aa2b3]'}`}>{item.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-[8px]">
                <input 
                  placeholder="Add custom item..."
                  value={newChecklistLabel} onChange={e => setNewChecklistLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddChecklistItem()}
                  className="flex-1 bg-[#141824] border border-dashed border-[#212636] rounded-[8px] p-[8px_10px] text-[12.5px] text-[#f4f6fa] outline-none"
                />
                <button onClick={handleAddChecklistItem} className="w-[30px] h-[30px] rounded-[8px] bg-[#141824] border border-[#212636] text-[#5c6478] flex items-center justify-center cursor-pointer">
                  <div className="w-[14px] h-[14px]"><SvgPlus /></div>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#9aa2b3] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgScreenshots /></div> Screenshots
            </label>
            <div className="flex gap-[10px] flex-wrap">
              <label className="w-[96px] h-[96px] rounded-[12px] border-[1.5px] border-dashed border-[#212636] bg-[#141824] flex flex-col items-center justify-center gap-[6px] text-[#5c6478] cursor-pointer text-[11px] hover:border-[#5aa2f2] hover:text-[#5aa2f2] transition-colors">
                <div className="w-[18px] h-[18px]"><SvgPlus /></div>
                Add Image
              </label>
            </div>
          </div>
        </div>

        {/* Chart Section (Signature) */}
        <div className="m-[0_22px_22px] border border-[#212636] rounded-[14px] overflow-hidden bg-gradient-to-b from-[#2981eb0d] to-transparent to-[40%] bg-[#141824]">
          <div className="flex items-center justify-between flex-wrap gap-[12px] p-[16px_18px] border-b border-[#1a1e2b]">
            <div className="flex items-center gap-[10px]">
              <span className="w-[32px] h-[32px] rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-mono text-[11px] font-bold text-[#9aa2b3] shrink-0">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit font-semibold text-[15px]">{activeTrade.symbol}</span>
              <span className={`font-mono font-semibold text-[11px] px-[7px] py-[2px] rounded-[5px] ${activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
            </div>
            <div className="flex gap-[20px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[#5c6478] uppercase tracking-[0.05em]">Entry</span>
                <span className="font-mono text-[14px] font-semibold">{activeTrade.entryPrice}</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[#5c6478] uppercase tracking-[0.05em]">Exit</span>
                <span className="font-mono text-[14px] font-semibold">{activeTrade.exitPrice}</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[#5c6478] uppercase tracking-[0.05em]">P&L</span>
                <span className={`font-mono text-[14px] font-semibold ${isWinner ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}`}>
                  {isWinner ? '+' : '-'}${Math.abs(Number(activeTrade.pnl)).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button className="flex items-center gap-[6px] p-[7px_12px] rounded-[8px] bg-[#0e1017] border border-[#212636] text-[#9aa2b3] text-[12px] font-medium hover:text-[#f4f6fa] hover:border-[#2a2f42]">
                <div className="w-[13px] h-[13px]"><SvgAnalyze /></div> Analyze
              </button>
              <button className="flex items-center gap-[6px] p-[7px_12px] rounded-[8px] bg-[#0e1017] border border-[#212636] text-[#9aa2b3] text-[12px] font-medium hover:text-[#f4f6fa] hover:border-[#2a2f42]">
                <div className="w-[13px] h-[13px]"><SvgReplay /></div> Replay
              </button>
            </div>
          </div>
          
          <div className="relative min-h-[220px] flex items-center justify-center p-[30px_20px]">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 600 220" preserveAspectRatio="none">
              <g stroke="#22c58b" strokeWidth="3">
                <line x1="40" y1="90" x2="40" y2="140"/>
                <line x1="80" y1="70" x2="80" y2="110"/>
                <line x1="120" y1="100" x2="120" y2="150" stroke="#ef4b5c"/>
                <line x1="160" y1="60" x2="160" y2="95"/>
                <line x1="200" y1="85" x2="200" y2="130" stroke="#ef4b5c"/>
                <line x1="240" y1="50" x2="240" y2="80"/>
                <line x1="280" y1="95" x2="280" y2="135" stroke="#ef4b5c"/>
                <line x1="320" y1="65" x2="320" y2="100"/>
                <line x1="360" y1="105" x2="360" y2="145" stroke="#ef4b5c"/>
                <line x1="400" y1="70" x2="400" y2="110"/>
                <line x1="440" y1="55" x2="440" y2="90"/>
                <line x1="480" y1="90" x2="480" y2="130" stroke="#ef4b5c"/>
                <line x1="520" y1="60" x2="520" y2="100"/>
                <line x1="560" y1="75" x2="560" y2="115"/>
              </g>
            </svg>
            <div className="relative z-10 text-center max-w-[320px]">
              <div className="w-[30px] h-[30px] text-[#5aa2f2] mx-auto mb-[12px]"><SvgChartEmpty /></div>
              <h4 className="font-outfit font-semibold text-[14.5px] mb-[6px]">Chart Not Available</h4>
              <p className="text-[12.5px] text-[#9aa2b3] leading-[1.55]">This trade was added manually. Connect a trading account to view real-time charts for your trades.</p>
            </div>
          </div>

          <div className="p-[12px_18px] border-t border-[#1a1e2b]">
            <span className="inline-flex items-center gap-[6px] font-mono text-[11px] text-[#5c6478] bg-[#0e1017] border border-[#212636] p-[4px_10px] rounded-[20px]">
              <div className="w-[12px] h-[12px]"><SvgManual /></div>
              Manual Entry
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
