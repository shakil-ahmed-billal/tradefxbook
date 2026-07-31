import React, { useState } from 'react';
import { 
  User, Link, Settings as SettingsIcon, CreditCard, Shield, Edit2, Zap, 
  Target, Sliders, Monitor, CheckCircle, Eye, Bell, Globe, AlertTriangle,
  Check, Save, Lock, ArrowUpRight, Smartphone, Key, Trash2, RefreshCw,
  Sparkles, Layers
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SettingsViewProps {
  user?: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user = {
    name: 'Shakil Ahmed',
    email: 'shakil.dev999@gmail.com',
    plan: 'PRO',
    avatarInitials: 'SA',
    isAuthenticated: true,
  },
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'Profile' | 'Rules' | 'Broker' | 'App' | 'Security'>('Profile');

  // Form State
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: 'shakil_trader',
    bio: 'Price action & SMC trader focusing on XAUUSD & EURUSD intraday momentum.',
    experience: '3-5 Years',
    style: 'Smart Money Concepts (SMC)',
  });

  // Risk Gauges State
  const [riskRules, setRiskRules] = useState({
    maxRiskPerTrade: 2,
    maxTradesPerDay: 5,
    maxDailyLossPercent: 5,
    maxLossStreak: 3,
    targetRiskReward: 3,
  });

  // Favorite Pairs State
  const [favoritePairs, setFavoritePairs] = useState<string[]>([
    'EUR/USD', 'XAU/USD', 'US30', 'NAS100', 'GBP/USD'
  ]);

  // Preferred Sessions State
  const [sessions, setSessions] = useState<string[]>(['London 🇬🇧', 'New York 🇺🇸']);

  // App Settings State
  const [appState, setAppState] = useState({
    streamerMode: false,
    soundEffects: true,
    pushNotifs: true,
    tradeAlerts: true,
    weeklyReport: true,
    currency: 'USD ($)',
    timezone: 'Dhaka (BST) GMT+6:00',
  });

  // Privacy Settings State
  const [privacyState, setPrivacyState] = useState({
    publicProfile: true,
    showLeaderboard: true,
    showIndividualTrades: true,
    showPnL: true,
    showWinRate: true,
  });

  // UI Toast State
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [brokerConnected, setBrokerConnected] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: formData.name,
        email: formData.email,
        avatarInitials: formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const togglePair = (pair: string) => {
    setFavoritePairs(prev => 
      prev.includes(pair) ? prev.filter(p => p !== pair) : [...prev, pair]
    );
  };

  const toggleSession = (sess: string) => {
    setSessions(prev => 
      prev.includes(sess) ? prev.filter(s => s !== sess) : [...prev, sess]
    );
  };

  // SVG Gauge helper calculation
  const gaugeRadius = 24;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;

  return (
    <div className="flex flex-col max-w-5xl mx-auto pb-16 animate-in fade-in duration-200">
      
      {/* SUCCESS TOAST BAR */}
      {savedSuccess && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully! Your trading profile has been updated.</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="hover:opacity-75">✕</button>
        </div>
      )}

      {/* HERO USER BANNER */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-soft)] shadow-lg overflow-hidden mb-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#2981eb]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] flex items-center justify-center font-outfit font-extrabold text-xl text-white shadow-md border-2 border-white/20">
              {user.avatarInitials || 'SA'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#22c58b] border-2 border-[var(--bg-panel)] flex items-center justify-center" title="Active Account">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-sora text-xl font-bold text-[var(--text-hi)]">{user.name}</h2>
              <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                user.plan === 'PRO' || user.plan === 'ELITE'
                  ? 'bg-[#2981eb]/15 text-[#5aa2f2] border-[#2981eb]/30'
                  : 'bg-[var(--bg-hover)] text-[var(--text-mid)] border-[var(--border-soft)]'
              }`}>
                {user.plan} Account
              </span>
            </div>
            <div className="text-xs text-[var(--text-mid)] mt-1 font-mono">{user.email} · @{formData.username}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab('Profile')}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-[var(--text-hi)] hover:border-[#2981eb] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#5aa2f2]" /> Edit Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('Broker')}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#2981eb] text-white text-xs font-bold hover:bg-[#5aa2f2] transition-all shadow-md shadow-[#2981eb]/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" /> MT4/MT5 Sync
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex gap-1.5 p-1.5 bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl mb-6 overflow-x-auto no-scrollbar shadow-sm">
        {[
          { id: 'Profile', label: 'Profile & Bio', icon: User },
          { id: 'Rules', label: 'Rules & Risk', icon: Target },
          { id: 'Broker', label: 'Broker & Sync', icon: Zap },
          { id: 'App', label: 'App & Appearance', icon: Sliders },
          { id: 'Security', label: 'Security & Privacy', icon: Shield },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#2981eb] text-white shadow-md' 
                  : 'text-[var(--text-mid)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-hi)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: PROFILE & BIO ──────────────────────────────────────────────── */}
      {activeTab === 'Profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
                <User className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Personal Information</h3>
                <p className="text-xs text-[var(--text-low)]">Manage your trading avatar, display name, and public handle</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Username Handle</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-low)] font-mono">@</span>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors font-mono"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Trading Bio & Philosophy</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] transition-colors leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="w-9 h-9 rounded-xl bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Trading Background</h3>
                <p className="text-xs text-[var(--text-low)]">Help AI diagnostics tailor risk reports to your experience level</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] cursor-pointer"
                >
                  <option>Beginner (&lt; 1 Year)</option>
                  <option>1-2 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years Professional</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Primary Trading Style</label>
                <select
                  value={formData.style}
                  onChange={e => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] cursor-pointer"
                >
                  <option>Smart Money Concepts (SMC)</option>
                  <option>Pure Price Action</option>
                  <option>Indicator Based (EMA/RSI)</option>
                  <option>Quantitative / Algorithmic</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#2981eb] text-white text-xs font-bold hover:bg-[#5aa2f2] transition-all shadow-md shadow-[#2981eb]/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 2: TRADING RULES & RISK ───────────────────────────────────────── */}
      {activeTab === 'Rules' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Risk Ceiling Gauges Card */}
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Trading Risk Ceilings</h3>
                  <p className="text-xs text-[var(--text-low)]">Define your maximum loss limits to prevent tilt & overtrading</p>
                </div>
              </div>
              <span className="font-mono text-xs text-[#22c58b] bg-[#22c58b]/15 px-2.5 py-1 rounded-full border border-[#22c58b]/20 font-bold">
                ✓ Risk Guard Active
              </span>
            </div>

            {/* Circular SVG Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: 'Max Risk / Trade', val: riskRules.maxRiskPerTrade, max: 5, unit: '%' },
                { label: 'Max Trades / Day', val: riskRules.maxTradesPerDay, max: 10, unit: '' },
                { label: 'Max Daily Loss', val: riskRules.maxDailyLossPercent, max: 10, unit: '%' },
                { label: 'Max Loss Streak', val: riskRules.maxLossStreak, max: 5, unit: 'x' },
                { label: 'Target Risk/Reward', val: riskRules.targetRiskReward, max: 5, unit: ':1' },
              ].map((g, i) => {
                const dashOffset = gaugeCircumference * (1 - Math.min(g.val / g.max, 1));
                return (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)]">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="overflow-visible">
                      <circle cx="32" cy="32" r={gaugeRadius} fill="none" stroke="var(--border-soft)" strokeWidth="5"/>
                      <circle 
                        cx="32" cy="32" r={gaugeRadius} 
                        fill="none" stroke="#2981eb" strokeWidth="5" strokeLinecap="round" 
                        strokeDasharray={`${gaugeCircumference}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 32 32)"
                      />
                      <text x="32" y="30" textAnchor="middle" className="font-sora text-sm font-bold fill-[var(--text-hi)]">{g.val}</text>
                      <text x="32" y="42" textAnchor="middle" className="text-[9px] font-mono fill-[var(--text-low)]">{g.unit}</text>
                    </svg>
                    <span className="text-[11px] font-semibold text-[var(--text-mid)] text-center leading-snug">{g.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-soft)]">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[var(--text-mid)] mb-1">
                  <span>Max Risk Per Trade</span>
                  <span className="font-mono text-[#2981eb]">{riskRules.maxRiskPerTrade}%</span>
                </div>
                <input
                  type="range" min="0.5" max="5" step="0.5"
                  value={riskRules.maxRiskPerTrade}
                  onChange={e => setRiskRules({ ...riskRules, maxRiskPerTrade: parseFloat(e.target.value) })}
                  className="w-full accent-[#2981eb] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[var(--text-mid)] mb-1">
                  <span>Max Daily Loss Limit</span>
                  <span className="font-mono text-[#ef4b5c]">{riskRules.maxDailyLossPercent}%</span>
                </div>
                <input
                  type="range" min="1" max="10" step="1"
                  value={riskRules.maxDailyLossPercent}
                  onChange={e => setRiskRules({ ...riskRules, maxDailyLossPercent: parseInt(e.target.value) })}
                  className="w-full accent-[#ef4b5c] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Favorite Pairs & Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#22c58b]/15 text-[#22c58b] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Favorite Instruments</h3>
              </div>
              <p className="text-xs text-[var(--text-low)] mb-4">Select pairs you actively analyze for quick filtering</p>
              <div className="flex flex-wrap gap-2">
                {['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD', 'XAG/USD', 'US30', 'NAS100', 'BTC/USD'].map(pair => {
                  const isFav = favoritePairs.includes(pair);
                  return (
                    <button
                      key={pair}
                      type="button"
                      onClick={() => togglePair(pair)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isFav 
                          ? 'bg-[#2981eb]/15 text-[#5aa2f2] border-[#2981eb]/30 shadow-sm' 
                          : 'bg-[var(--bg-elevated)] text-[var(--text-mid)] border-[var(--border-soft)] hover:border-[#2981eb]'
                      }`}
                    >
                      {isFav ? '✓ ' : '+ '}{pair}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#f2b84b]/15 text-[#f2b84b] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Focus Trading Sessions</h3>
              </div>
              <p className="text-xs text-[var(--text-low)] mb-4">Highlight execution metrics during active windows</p>
              <div className="flex flex-wrap gap-2">
                {['London 🇬🇧', 'New York 🇺🇸', 'Tokyo 🇯🇵', 'Sydney 🇦🇺'].map(sess => {
                  const isSel = sessions.includes(sess);
                  return (
                    <button
                      key={sess}
                      type="button"
                      onClick={() => toggleSession(sess)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isSel 
                          ? 'bg-[#f2b84b]/15 text-[#f2b84b] border-[#f2b84b]/30' 
                          : 'bg-[var(--bg-elevated)] text-[var(--text-mid)] border-[var(--border-soft)] hover:border-[#f2b84b]'
                      }`}
                    >
                      {isSel ? '✓ ' : ''}{sess}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 3: BROKER INTEGRATION (MT4/MT5) ─────────────────────────────── */}
      {activeTab === 'Broker' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Exness & MetaTrader Sync</h3>
                  <p className="text-xs text-[var(--text-low)]">Automate trade importing from your MT4 / MT5 trading account</p>
                </div>
              </div>
              <button 
                onClick={() => setBrokerConnected(!brokerConnected)}
                className={`font-mono text-xs px-3 py-1 rounded-full border font-bold cursor-pointer transition-colors ${
                  brokerConnected 
                    ? 'bg-[#22c58b]/15 text-[#22c58b] border-[#22c58b]/30' 
                    : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                }`}
              >
                {brokerConnected ? '● MT5 Connected' : '○ Standalone Mode'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Broker Server</label>
                <input
                  type="text"
                  defaultValue="Exness-Real14"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">MetaTrader Login ID</label>
                <input
                  type="text"
                  defaultValue="83920194"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Investor Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)]">
              <div>
                <div className="text-xs font-semibold text-[var(--text-hi)]">Auto-Sync Executed Trades</div>
                <div className="text-[11px] text-[var(--text-low)]">Fetch new closed positions every 5 minutes in background</div>
              </div>
              <button
                onClick={() => setBrokerConnected(!brokerConnected)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  brokerConnected ? 'bg-[#2981eb] text-white' : 'bg-[var(--bg-hover)] text-[var(--text-hi)]'
                }`}
              >
                {brokerConnected ? 'Auto-Sync Enabled' : 'Enable Auto-Sync'}
              </button>
            </div>
          </div>

          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">CSV File Importer</h3>
                <p className="text-xs text-[var(--text-low)]">Bulk import historical Exness / MT4 / MT5 trade logs</p>
              </div>
            </div>

            <div className="p-8 border-2 border-dashed border-[var(--border-soft)] rounded-2xl text-center flex flex-col items-center justify-center bg-[var(--bg-elevated)]">
              <RefreshCw className="w-8 h-8 text-[var(--text-low)] mb-2" />
              <div className="text-xs font-semibold text-[var(--text-hi)] mb-1">Drag and drop your Exness CSV report here</div>
              <p className="text-[11px] text-[var(--text-low)] mb-4">Supports .csv files exported directly from MetaTrader or Exness Personal Area</p>
              <button className="px-4 py-2 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-soft)] text-xs font-semibold text-[var(--text-hi)] hover:border-[#2981eb] transition-all cursor-pointer">
                Select CSV File
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 4: APP & APPEARANCE ─────────────────────────────────────────── */}
      {activeTab === 'App' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
                <Sliders className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">App Preferences & Display</h3>
                <p className="text-xs text-[var(--text-low)]">Tailor interface parameters, privacy masking, and alert notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border-soft)]">
                <div>
                  <div className="text-xs font-semibold text-[var(--text-hi)]">Streamer Mode (Privacy Masking)</div>
                  <div className="text-[11px] text-[var(--text-low)]">Mask dollar P&L values with percentages for screen sharing & live streams</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAppState({ ...appState, streamerMode: !appState.streamerMode })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    appState.streamerMode ? 'bg-[#2981eb]' : 'bg-[var(--border-soft)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    appState.streamerMode ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border-soft)]">
                <div>
                  <div className="text-xs font-semibold text-[var(--text-hi)]">Sound Effects & Cues</div>
                  <div className="text-[11px] text-[var(--text-low)]">Play subtle audio cues when logging trades or hitting daily profit target</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAppState({ ...appState, soundEffects: !appState.soundEffects })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    appState.soundEffects ? 'bg-[#2981eb]' : 'bg-[var(--border-soft)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    appState.soundEffects ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--border-soft)]">
                <div>
                  <div className="text-xs font-semibold text-[var(--text-hi)]">Desktop Push Notifications</div>
                  <div className="text-[11px] text-[var(--text-low)]">Receive alerts when high-impact economic news events trigger</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAppState({ ...appState, pushNotifs: !appState.pushNotifs })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    appState.pushNotifs ? 'bg-[#2981eb]' : 'bg-[var(--border-soft)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    appState.pushNotifs ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <div className="text-xs font-semibold text-[var(--text-hi)]">Weekly Performance Email Digest</div>
                  <div className="text-[11px] text-[var(--text-low)]">Receive an automated Gemini AI weekly trading diagnostic summary</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAppState({ ...appState, weeklyReport: !appState.weeklyReport })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    appState.weeklyReport ? 'bg-[#2981eb]' : 'bg-[var(--border-soft)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    appState.weeklyReport ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="w-9 h-9 rounded-xl bg-[#f2b84b]/15 text-[#f2b84b] flex items-center justify-center">
                <Globe className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Regional Formatting</h3>
                <p className="text-xs text-[var(--text-low)]">Set your account currency & local timezone for accurate candle timestamps</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Account Currency</label>
                <select
                  value={appState.currency}
                  onChange={e => setAppState({ ...appState, currency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] cursor-pointer"
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Display Timezone</label>
                <select
                  value={appState.timezone}
                  onChange={e => setAppState({ ...appState, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] focus:outline-none focus:border-[#2981eb] cursor-pointer"
                >
                  <option>Dhaka (BST) GMT+6:00</option>
                  <option>London (GMT/BST) GMT+0:00</option>
                  <option>New York (EST/EDT) GMT-5:00</option>
                  <option>Tokyo (JST) GMT+9:00</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 5: SECURITY & DANGER ZONE ──────────────────────────────────── */}
      {activeTab === 'Security' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-soft)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 text-[#5aa2f2] flex items-center justify-center">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-sora text-sm font-semibold text-[var(--text-hi)]">Security & Authentication</h3>
                  <p className="text-xs text-[var(--text-low)]">Protect your trading journal with 2FA & encrypted credentials</p>
                </div>
              </div>
              <span className="font-mono text-xs text-[#22c58b] bg-[#22c58b]/15 px-2.5 py-1 rounded-full border border-[#22c58b]/20 font-bold">
                ✓ 2FA Enabled
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-mid)] block mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setSavedSuccess(true); setTimeout(() => setSavedSuccess(false), 3000); }}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs font-semibold text-[var(--text-hi)] hover:border-[#2981eb] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5 text-[#5aa2f2]" /> Update Password
                </button>
              </div>
            </div>
          </div>

          {/* DANGER ZONE CARD */}
          <div className="bg-[var(--bg-panel)] border border-red-500/30 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-500/20">
              <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-bold text-red-500">Danger Zone</h3>
                <p className="text-xs text-[var(--text-low)]">Irreversible actions regarding your stored trading data</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <div>
                <div className="text-xs font-bold text-[var(--text-hi)]">Clear All Stored Trading Logs</div>
                <div className="text-[11px] text-[var(--text-low)]">Permanently reset trade history, journal attachments, and analytics metrics</div>
              </div>
              <button
                type="button"
                onClick={() => setIsClearModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-500/15 text-red-500 border border-red-500/30 text-xs font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Data
              </button>
            </div>
          </div>

        </div>
      )}

      {/* CONFIRM CLEAR DATA MODAL */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-500 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-sora text-base font-bold text-[var(--text-hi)]">Are you sure?</h3>
            </div>
            <p className="text-xs text-[var(--text-mid)] leading-relaxed mb-6">
              This action will permanently delete all trades, equity curves, and journal notes. This operation cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-hi)] hover:bg-[var(--bg-hover)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsClearModalOpen(false);
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 3000);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 cursor-pointer shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
