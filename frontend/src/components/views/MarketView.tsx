import React, { useState } from 'react';
import { 
  Search, Clock, Bell, Globe, ChevronDown, ChevronUp, RefreshCw,
  Zap, Calendar, LockOpen, ArrowUpRight
} from 'lucide-react';

interface MarketEvent {
  id: string;
  time: string;
  flag: string;
  currency: string;
  impact: 'High' | 'Medium' | 'Low';
  title: string;
  actual: string;
  forecast: string;
  previous: string;
  status: string;
  category: string;
  unit: string;
  summary: string;
}

const mockEvents: MarketEvent[] = [
  {
    id: '1',
    time: '18:30',
    flag: '🇺🇸',
    currency: 'USD',
    impact: 'Medium',
    title: 'Employment Cost Index q/q',
    actual: '4h left',
    forecast: '0.80',
    previous: '0.90',
    status: 'Next up',
    category: 'Employment',
    unit: '%',
    summary: 'Economic indicator for USD. A higher than expected reading is generally considered positive for the currency.'
  },
  {
    id: '2',
    time: '20:00',
    flag: '🇺🇸',
    currency: 'USD',
    impact: 'Medium',
    title: 'Revised UoM Consumer Sentiment',
    actual: '6h left',
    forecast: '53.90',
    previous: '54.40',
    status: 'Upcoming',
    category: 'Sentiment',
    unit: 'Index',
    summary: 'Measures the level of consumer confidence in economic activity.'
  },
  {
    id: '3',
    time: '20:00',
    flag: '🇺🇸',
    currency: 'USD',
    impact: 'Medium',
    title: 'Revised UoM Inflation Expectations',
    actual: '6h left',
    forecast: '—',
    previous: '4.20',
    status: 'Upcoming',
    category: 'Inflation',
    unit: '%',
    summary: 'Consumer expectations for inflation over the next 12 months.'
  }
];

export const MarketView: React.FC = () => {
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({'1': true});
  const [activeTab, setActiveTab] = useState('Today');

  const toggleEvent = (id: string) => {
    setExpandedEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-200">
      
      {/* PAGE HEADER */}
      <section className="flex items-start justify-between gap-5 flex-wrap mb-6">
        <div>
          <h1 className="font-sora text-[22px] font-bold tracking-tight text-[var(--text-hi)]">Economic Calendar</h1>
          <p className="text-[13px] text-[var(--text-mid)] mt-1.5">Track high-impact economic events and news that move the markets</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-[var(--text-mid)] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-3 py-1.5 rounded-full" title="Timezone: Dhaka (BST) • Asia/Dhaka • GMT+6:00">
            <Globe className="w-3.5 h-3.5 text-[#5aa2f2]" />
            Dhaka <span className="font-mono text-[var(--text-low)]">GMT+6:00</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            LIVE
          </div>
          <span className="text-[11.5px] text-[var(--text-low)] font-mono">Updated 14:46:48</span>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-[14px] p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          
          <div className="flex gap-1 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-soft)]">
            {['Upcoming', 'Today', 'Tomorrow', 'This Week', 'All'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab ? 'bg-[#2981eb] text-white' : 'text-[var(--text-mid)] hover:text-[var(--text-hi)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-soft)]">
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-[var(--text-mid)] hover:text-[var(--text-hi)] cursor-pointer">All</button>
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/15 text-red-500 border border-red-500/30 cursor-pointer">🔴 High</button>
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30 cursor-pointer">🟡 Med</button>
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-[#10b981] hover:bg-[#10b981]/15 cursor-pointer">🟢 Low</button>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-hi)] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-3 py-2 rounded-xl min-w-[130px] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors">
            <span className="flex items-center gap-1.5">🇺🇸 US Only</span>
            <ChevronDown className="w-3 h-3 text-[var(--text-low)]" />
          </div>

          <div className="relative flex-1 min-w-[180px] max-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-low)]" />
            <input 
              className="w-full py-2 pl-8 pr-3 bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl text-[var(--text-hi)] text-[12.5px] placeholder:text-[var(--text-low)] focus:outline-none focus:border-[#2981eb] transition-colors" 
              type="text" 
              placeholder="Search events…" 
            />
          </div>

          <button className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-[var(--text-mid)] flex items-center justify-center hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)] transition-colors shrink-0 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

        </div>

        <div className="mt-3.5 pt-3.5 border-t border-[var(--border-soft)] text-xs text-[var(--text-low)]">
          <b className="text-[var(--text-hi)]">{mockEvents.length}</b> events found
        </div>
      </section>

      {/* EVENTS */}
      <section className="mb-4">
        <div className="flex items-center justify-between px-1 pb-2.5">
          <span className="font-sora text-[13.5px] font-semibold text-[var(--text-hi)]">{activeTab}</span>
          <span className="text-[11.5px] text-[var(--text-low)]">{mockEvents.length} events</span>
        </div>

        {mockEvents.map((ev) => {
          const isNext = ev.status === 'Next up';
          const isExpanded = expandedEvents[ev.id];
          return (
            <div key={ev.id} className={`bg-[var(--bg-panel)] border rounded-[10px] mb-2 overflow-hidden transition-colors ${isNext ? 'border-[#2981eb] shadow-[0_0_0_1px_rgba(41,129,235,0.2)]' : 'border-[var(--border-soft)] hover:border-[#2981eb]'}`}>
              
              <div 
                className="flex items-center gap-4 p-3.5 cursor-pointer"
                onClick={() => toggleEvent(ev.id)}
              >
                <span className="font-mono text-sm font-semibold text-[var(--text-hi)] min-w-[52px] shrink-0">{ev.time}</span>
                
                <div className="flex items-center gap-2 min-w-[88px] shrink-0">
                  <span>{ev.flag}</span>
                  <span className="text-[11px] font-bold text-[var(--text-hi)] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-2 py-1 rounded-md tracking-wide">{ev.currency}</span>
                </div>
                
                <span className={`flex items-center gap-1.5 text-[9.5px] font-bold tracking-wider px-2 py-1 rounded-md shrink-0 ${
                  ev.impact === 'High' ? 'bg-red-500/15 text-red-500 border border-red-500/25' : 
                  ev.impact === 'Medium' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/25' : 
                  'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25'
                }`}>
                  {ev.impact === 'High' ? '🔴 HIGH' : ev.impact === 'Medium' ? '🟡 MED' : '🟢 LOW'}
                </span>
                
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-[13.5px] font-medium text-[var(--text-hi)] truncate">{ev.title}</span>
                  <span className="flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#a78bfa]/15 text-[#a78bfa] shrink-0">
                    <Zap className="w-2.5 h-2.5 fill-[#a78bfa]" /> AI
                  </span>
                </div>
                
                <div className="hidden md:flex gap-5 shrink-0 pr-2">
                  <div className="flex flex-col items-center gap-0.5 min-w-[52px]">
                    <span className="text-[9.5px] font-semibold text-[var(--text-low)] uppercase tracking-wider">Actual</span>
                    <span className="font-mono text-[12.5px] font-semibold text-[var(--text-hi)]">{ev.actual}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 min-w-[52px]">
                    <span className="text-[9.5px] font-semibold text-[var(--text-low)] uppercase tracking-wider">Forecast</span>
                    <span className="font-mono text-[12.5px] text-[var(--text-mid)]">{ev.forecast}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 min-w-[52px]">
                    <span className="text-[9.5px] font-semibold text-[var(--text-low)] uppercase tracking-wider">Previous</span>
                    <span className="font-mono text-[12.5px] text-[var(--text-mid)]">{ev.previous}</span>
                  </div>
                </div>

                {isNext && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2981eb]/15 text-[#5aa2f2] whitespace-nowrap shrink-0">
                    Next up
                  </span>
                )}
                
                <div className="w-5 h-5 flex items-center justify-center text-[var(--text-low)] shrink-0 transition-transform duration-200">
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[var(--border-soft)]">
                  <div className="flex gap-2 flex-wrap mt-3.5">
                    <span className="flex items-center gap-1.5 text-[11px] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-2.5 py-1 rounded-md">
                      <span className="text-[var(--text-low)]">Category:</span> <span className="font-semibold text-[var(--text-hi)]">{ev.category}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] bg-[var(--bg-elevated)] border border-[var(--border-soft)] px-2.5 py-1 rounded-md">
                      <span className="text-[var(--text-low)]">Unit:</span> <span className="font-semibold text-[var(--text-hi)]">{ev.unit}</span>
                    </span>
                  </div>
                  
                  <div className="mt-3 p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)]">
                    <div className="text-[10px] font-bold text-[var(--text-low)] uppercase tracking-wider mb-1.5">Event Summary</div>
                    <p className="text-[12.5px] leading-relaxed text-[var(--text-mid)]">
                      {ev.summary}
                    </p>
                  </div>

                  <div className="mt-3.5 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                      <span className="text-[13.5px] font-semibold text-[var(--text-hi)]">AI Market Analysis Fully Unlocked</span>
                    </div>
                    <p className="text-xs text-[var(--text-mid)] mb-4 max-w-md mx-auto">
                      AI analysis has been generated based on current market conditions and historical correlation data for this pair.
                    </p>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2981eb] text-white text-xs font-bold hover:bg-[#5aa2f2] transition-all shadow-md cursor-pointer">
                      <ArrowUpRight className="w-3.5 h-3.5" /> View Detailed Insights
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      <div className="text-center py-4 text-[var(--text-low)] text-xs font-medium">
        All events loaded
      </div>
      
    </div>
  );
};
