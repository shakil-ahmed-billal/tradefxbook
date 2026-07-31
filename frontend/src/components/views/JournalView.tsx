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
const SvgTrash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;

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
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
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
      setScreenshots(j.screenshots || []);
      
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
      setScreenshots([]);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setScreenshots(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
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
      screenshots,
    };
    onUpdateTradeJournal(activeTrade.id, updatedJournal);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
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
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden w-full flex flex-col lg:sticky lg:top-0 self-start h-[calc(100vh-104px)] max-h-[calc(100vh-104px)] shadow-lg">
        <div className="flex items-center justify-between p-4 pb-3">
          <span className="font-outfit font-semibold text-[14.5px] text-[var(--text-hi)]">Trade Journal</span>
          <div className="flex items-center gap-[10px]">
            <label className="flex items-center gap-1.5 text-[11.5px] text-[var(--text-mid)] cursor-pointer">
              <input 
                type="checkbox" 
                checked={isLive} 
                onChange={(e) => setIsLive(e.target.checked)} 
                className="w-3.5 h-3.5 accent-[#2981eb] rounded cursor-pointer"
              />
              <span>Live Sync</span>
            </label>
            <span className="font-mono text-[11px] text-[var(--text-low)] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-[8px] py-[2px] rounded-[6px]">
              {filteredTrades.length}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[var(--bg-elevated)] p-1 mx-4 mb-3 rounded-xl border border-[var(--border-soft)] shrink-0">
          {(['All', 'Journaled', 'Pending', 'Legacy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-[#2981eb] text-white shadow-sm' : 'text-[var(--text-mid)] hover:text-[var(--text-hi)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trade Items List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-[8px] p-4 pt-0" onScroll={handleScroll}>
          {visibleTrades.map(trade => {
            const isSelected = trade.id === activeTrade.id;
            const isTradeWin = Number(trade.pnl) >= 0;
            return (
              <button
                key={trade.id}
                onClick={() => setActiveTradeId(trade.id)}
                className={`w-full p-[12px] rounded-[12px] text-left transition-all border cursor-pointer ${
                  isSelected 
                    ? 'bg-[var(--bg-elevated)] border-[#2981eb] shadow-[inset_0_0_0_1px_rgba(41,129,235,0.25)]' 
                    : 'bg-transparent border-transparent hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-[8px] mb-[6px]">
                  <span className="w-[22px] h-[22px] rounded-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-[9px] font-bold text-[var(--text-mid)] shrink-0">
                    {trade.pairCode}
                  </span>
                  <span className="font-outfit font-semibold text-[13.5px] text-[var(--text-hi)] flex-1">{trade.symbol}</span>
                  <span className={`font-mono text-[10px] font-bold px-[6px] py-[1.5px] rounded-[4px] ${
                    trade.journalStatus === 'Journaled' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-amber-500 bg-amber-500/15'
                  }`}>
                    {trade.journalStatus}
                  </span>
                </div>
                <div className="flex items-center gap-[8px] text-[11.5px] text-[var(--text-low)]">
                  <span className={`font-mono font-semibold text-[10px] px-[5px] py-[1px] rounded ${trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                    {trade.type === 'long' ? 'Long' : 'Short'}
                  </span>
                  <span className="font-mono">{trade.entryPrice}</span>
                  <span className={`ml-auto font-mono font-semibold ${isTradeWin ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}`}>
                    {isTradeWin ? '+' : '-'}${Math.abs(Number(trade.pnl)).toFixed(2)}
                  </span>
                </div>
              </button>
            );
          })}

          {loadingMore && (
            <div className="p-2 text-center text-xs text-[var(--text-low)] font-mono">
              Loading more trades...
            </div>
          )}
        </div>
      </div>

      {/* MAIN DETAIL PANEL */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl overflow-hidden flex-1 w-full shadow-lg">
        
        {/* Toast Save Notification */}
        {saveSuccess && (
          <div className="p-3 bg-[#22c58b]/15 border-b border-[#22c58b]/30 text-[#22c58b] text-xs font-semibold flex items-center justify-between px-6 animate-in slide-in-from-top duration-200">
            <span>✓ Journal entry saved successfully!</span>
            <button onClick={() => setSaveSuccess(false)} className="hover:opacity-75">✕</button>
          </div>
        )}

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-[18px_22px] border-b border-[var(--border-soft)] gap-4">
          <div>
            <div className="flex items-center gap-[10px] mb-1.5 flex-wrap">
              <span className="w-[30px] h-[30px] rounded-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-[10px] font-bold text-[var(--text-mid)] shrink-0">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit text-[17px] font-semibold text-[var(--text-hi)]">{activeTrade.symbol}</span>
              <span className={`font-mono text-[10.5px] font-semibold px-[9px] py-[3px] rounded-[6px] border ${isWinner ? 'text-[#22c58b] bg-[#22c58b]/15 border-[#22c58b]/30' : 'text-[#ef4b5c] bg-[#ef4b5c]/15 border-[#ef4b5c]/30'}`}>
                {isWinner ? 'Winner' : 'Loser'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-[var(--text-low)] flex-wrap">
              <span className={`font-mono font-semibold text-[11px] px-[7px] py-[2px] rounded-[5px] ${activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
              <span>•</span>
              <span>Entry ${activeTrade.entryPrice}</span>
              <span>•</span>
              <span>Size {activeTrade.size}</span>
              <span>•</span>
              <span>{activeTrade.openTime ? activeTrade.openTime.slice(0, 16).replace('T', ', ') : 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-[var(--text-mid)] hover:text-[var(--text-hi)] hover:border-[#2981eb] transition-colors cursor-pointer" title="Reset">
              <SvgReset />
            </button>
            <button 
              onClick={onNavigateToPerformance} 
              className="flex items-center gap-1.5 px-[14px] py-[8px] rounded-[9px] text-[12.5px] font-semibold cursor-pointer border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-mid)] hover:text-[var(--text-hi)] hover:border-[#2981eb] transition-colors"
            >
              <div className="w-3.5 h-3.5"><SvgAnalytics /></div> Analytics
            </button>
            <button 
              onClick={handleSave} 
              className="flex items-center gap-1.5 px-[16px] py-[8px] rounded-[9px] text-[12.5px] font-bold cursor-pointer border border-[#2981eb] bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors shadow-md shadow-[#2981eb]/20"
            >
              Save Journal
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-[22px] flex flex-col gap-[18px]">
          
          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgPreTrade /></div> Pre-trade Analysis
            </label>
            <textarea 
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[11px_13px] text-[13.5px] text-[var(--text-hi)] outline-none min-h-[88px] resize-y placeholder:text-[var(--text-low)] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
              placeholder="What did you see? Plan, thesis, key levels, market structure, news window..."
              value={preAnalysis} onChange={e => setPreAnalysis(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgPostTrade /></div> Post-trade Review
            </label>
            <textarea 
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[11px_13px] text-[13.5px] text-[var(--text-hi)] outline-none min-h-[88px] resize-y placeholder:text-[var(--text-low)] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
              placeholder="What happened? Execution accuracy, slippage, management, improvements for next time..."
              value={postReview} onChange={e => setPostReview(e.target.value)}
            />
          </div>

          <div className="max-w-[260px]">
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgRR /></div> Risk : Reward Ratio
            </label>
            <div className="flex items-center gap-[10px]">
              <input 
                className="w-full text-center bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[10px] font-mono text-[14px] text-[var(--text-hi)] outline-none focus:border-[#2981eb]"
                placeholder="1" value={risk} onChange={e => setRisk(e.target.value)}
              />
              <span className="text-[var(--text-low)] font-semibold">:</span>
              <input 
                className="w-full text-center bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[10px] font-mono text-[14px] text-[var(--text-hi)] outline-none focus:border-[#2981eb]"
                placeholder="2.5" value={reward} onChange={e => setReward(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px]">
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgEmotions /></div> Emotional State
              </label>
              <textarea 
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[11px_13px] text-[13.5px] text-[var(--text-hi)] outline-none min-h-[70px] resize-y placeholder:text-[var(--text-low)] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="Calm, disciplined, anxious, FOMO, confident, hesitant..."
                value={emotions} onChange={e => setEmotions(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgLessons /></div> Lessons Learned
              </label>
              <textarea 
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[11px_13px] text-[13.5px] text-[var(--text-hi)] outline-none min-h-[70px] resize-y placeholder:text-[var(--text-low)] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="Key takeaways to repeat or rule violations to avoid..."
                value={lessons} onChange={e => setLessons(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px]">
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgTags /></div> Tags
              </label>
              <input 
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-[10px] p-[11px_13px] text-[13.5px] text-[var(--text-hi)] outline-none placeholder:text-[var(--text-low)] focus:border-[#2981eb] focus:shadow-[0_0_0_3px_rgba(41,129,235,0.14)] transition-all"
                placeholder="breakout, trend, news, smc (comma separated)"
                value={tagsInput} onChange={e => setTagsInput(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgRating /></div> Trade Execution Score 
                <span className="ml-auto font-mono text-[#5aa2f2] text-[12px] font-bold">{rating}/10</span>
              </label>
              <div className="px-[2px]">
                <input 
                  type="range" min="1" max="10" value={rating} onChange={e => setRating(parseInt(e.target.value))}
                  className="w-full h-[5px] accent-[#2981eb] cursor-pointer"
                />
                <div className="flex justify-between text-[10.5px] text-[var(--text-low)] mt-[4px] font-mono font-semibold">
                  <span>1 (Poor)</span><span>5 (Average)</span><span>10 (Flawless)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Checklist */}
          <div>
            <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)] mb-[9px]">
              <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgChecklist /></div> Execution Checklist
              <span className="ml-auto font-mono text-[11px] text-[var(--text-low)] font-bold">{checkedCount}/{checklist.length}</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px]">
              {checklist.map(item => (
                <div key={item.id} className="flex items-center gap-[10px] cursor-pointer py-[4px]" onClick={() => handleToggleChecklist(item.id)}>
                  <div className={`w-[18px] h-[18px] rounded-[6px] border-[1.5px] flex-shrink-0 relative transition-all ${
                    item.checked ? 'bg-[#2981eb] border-[#2981eb]' : 'bg-[var(--bg-elevated)] border-[var(--border-soft)]'
                  }`}>
                    {item.checked && (
                      <div className="absolute left-[5px] top-[1px] w-[4px] h-[9px] border-r-[2px] border-b-[2px] border-white rotate-45" />
                    )}
                  </div>
                  <span className={`text-[13px] ${item.checked ? 'text-[var(--text-hi)] font-medium' : 'text-[var(--text-mid)]'}`}>{item.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-[8px]">
                <input 
                  placeholder="Add custom item..."
                  value={newChecklistLabel} onChange={e => setNewChecklistLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddChecklistItem()}
                  className="flex-1 bg-[var(--bg-elevated)] border border-dashed border-[var(--border-soft)] rounded-[8px] p-[8px_10px] text-[12.5px] text-[var(--text-hi)] outline-none placeholder:text-[var(--text-low)]"
                />
                <button onClick={handleAddChecklistItem} className="w-[30px] h-[30px] rounded-[8px] bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-[var(--text-mid)] hover:text-[var(--text-hi)] hover:border-[#2981eb] flex items-center justify-center cursor-pointer">
                  <div className="w-[14px] h-[14px]"><SvgPlus /></div>
                </button>
              </div>
            </div>
          </div>

          {/* SCREENSHOTS / CHART IMAGES UPLOADER */}
          <div>
            <div className="flex items-center justify-between mb-[9px]">
              <label className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--text-mid)]">
                <div className="w-[15px] h-[15px] text-[#5aa2f2]"><SvgScreenshots /></div> Chart Screenshots & Setup Attachments
              </label>
              <span className="text-[11px] font-mono text-[var(--text-low)]">{screenshots.length} attachments</span>
            </div>

            <div className="flex gap-[12px] flex-wrap items-center">
              {/* Upload Button */}
              <label className="w-[100px] h-[100px] rounded-[14px] border-2 border-dashed border-[var(--border-soft)] bg-[var(--bg-elevated)] flex flex-col items-center justify-center gap-[6px] text-[var(--text-low)] cursor-pointer text-[11px] font-semibold hover:border-[#2981eb] hover:text-[#5aa2f2] transition-all shrink-0">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
                <div className="w-[20px] h-[20px]"><SvgPlus /></div>
                Upload Image
              </label>

              {/* Uploaded Thumbnail Gallery */}
              {screenshots.map((imgSrc, idx) => (
                <div 
                  key={idx} 
                  className="relative group w-[100px] h-[100px] rounded-[14px] border border-[var(--border-soft)] overflow-hidden bg-black/40 shadow-sm shrink-0"
                >
                  <img 
                    src={imgSrc} 
                    alt={`Trade Screenshot ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    onClick={() => setModalImage(imgSrc)}
                  />

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setModalImage(imgSrc)} 
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white cursor-pointer"
                      title="View Fullscreen"
                    >
                      <SvgScreenshots />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleRemoveImage(idx)} 
                      className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white cursor-pointer"
                      title="Delete Image"
                    >
                      <SvgTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Chart Section (Signature) */}
        <div className="m-[0_22px_22px] border border-[var(--border-soft)] rounded-[14px] overflow-hidden bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between flex-wrap gap-[12px] p-[16px_18px] border-b border-[var(--border-soft)]">
            <div className="flex items-center gap-[10px]">
              <span className="w-[32px] h-[32px] rounded-full bg-[var(--bg-panel)] border border-[var(--border-soft)] flex items-center justify-center font-mono text-[11px] font-bold text-[var(--text-mid)] shrink-0">
                {activeTrade.pairCode}
              </span>
              <span className="font-outfit font-semibold text-[15px] text-[var(--text-hi)]">{activeTrade.symbol}</span>
              <span className={`font-mono font-semibold text-[11px] px-[7px] py-[2px] rounded-[5px] ${activeTrade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/15' : 'text-[#ef4b5c] bg-[#ef4b5c]/15'}`}>
                {activeTrade.type === 'long' ? 'Long' : 'Short'}
              </span>
            </div>
            <div className="flex gap-[20px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[var(--text-low)] uppercase tracking-[0.05em]">Entry</span>
                <span className="font-mono text-[14px] font-semibold text-[var(--text-hi)]">${activeTrade.entryPrice}</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[var(--text-low)] uppercase tracking-[0.05em]">Exit</span>
                <span className="font-mono text-[14px] font-semibold text-[var(--text-hi)]">${activeTrade.exitPrice}</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10.5px] text-[var(--text-low)] uppercase tracking-[0.05em]">P&L</span>
                <span className={`font-mono text-[14px] font-semibold ${isWinner ? 'text-[#22c58b]' : 'text-[#ef4b5c]'}`}>
                  {isWinner ? '+' : '-'}${Math.abs(Number(activeTrade.pnl)).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button className="flex items-center gap-[6px] p-[7px_12px] rounded-[8px] bg-[var(--bg-panel)] border border-[var(--border-soft)] text-[var(--text-mid)] text-[12px] font-medium hover:text-[var(--text-hi)] hover:border-[#2981eb] cursor-pointer transition-colors">
                <div className="w-[13px] h-[13px]"><SvgAnalyze /></div> Analyze
              </button>
            </div>
          </div>
          
          <div className="relative min-h-[200px] flex items-center justify-center p-[30px_20px]">
            {screenshots.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((src, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-[var(--border-soft)] group cursor-pointer" onClick={() => setModalImage(src)}>
                    <img src={src} alt="Chart preview" className="w-full h-48 object-cover group-hover:scale-102 transition-transform" />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] rounded">
                      Chart #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative z-10 text-center max-w-[320px]">
                <div className="w-[30px] h-[30px] text-[#5aa2f2] mx-auto mb-[12px]"><SvgChartEmpty /></div>
                <h4 className="font-outfit font-semibold text-[14.5px] text-[var(--text-hi)] mb-[6px]">No Chart Attachments</h4>
                <p className="text-[12.5px] text-[var(--text-low)] leading-[1.55]">Upload your TradingView or MetaTrader chart screenshots above to attach them to this trade journal.</p>
              </div>
            )}
          </div>

          <div className="p-[12px_18px] border-t border-[var(--border-soft)]">
            <span className="inline-flex items-center gap-[6px] font-mono text-[11px] text-[var(--text-low)] bg-[var(--bg-panel)] border border-[var(--border-soft)] p-[4px_10px] rounded-[20px]">
              <div className="w-[12px] h-[12px]"><SvgManual /></div>
              {activeTrade.source || 'Manual Entry'}
            </span>
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModalImage(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold bg-white/20 hover:bg-white/40 px-3 py-1 rounded-lg cursor-pointer transition-colors"
            >
              ✕ Close
            </button>
            <img 
              src={modalImage} 
              alt="Full resolution chart screenshot" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
