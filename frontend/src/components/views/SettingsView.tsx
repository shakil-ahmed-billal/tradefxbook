import React, { useState } from 'react';
import { 
  User, Link, Settings as SettingsIcon, CreditCard, Shield, Edit2, Zap, 
  Target, Sliders, Monitor, CheckCircle, Eye, Bell, Globe, AlertTriangle
} from 'lucide-react';

const gauges = [
  {label:'Max Risk / Trade', value:2, max:5, unit:'%'},
  {label:'Max Trades / Day', value:5, max:10, unit:''},
  {label:'Max Daily Loss', value:5, max:10, unit:'%'},
  {label:'Losing Streak', value:3, max:6, unit:'x'},
  {label:'Risk / Reward', value:4, max:6, unit:':1'},
];

const checklistItems = [
  'Checked higher timeframe',
  'Fits my trading plan',
  'Key levels identified',
  'Risk within limits',
  'Economic calendar checked'
];

const privacyItems = [
  {label:'Profile Visibility', desc:'Your profile is public.', on:true},
  {label:'Show on Leaderboard', desc:'Appear in the public trading leaderboard.', on:true},
  {label:'Show Trades', desc:'Let others see your individual trades.', on:true},
  {label:'Show P&L Per Trade', desc:'Display profit / loss on each trade.', on:true},
  {label:'Show Total P&L', desc:'Display your cumulative profit / loss.', on:true},
  {label:'Show Win Rate', desc:'Display your winning percentage.', on:true},
  {label:'Show Trade Count', desc:'Display total number of trades.', on:true},
];

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Settings');
  const [privacyState, setPrivacyState] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true
  });
  const [appState, setAppState] = useState({
    darkMode: true,
    streamerMode: false,
    pushNotifs: true,
    tradeAlerts: true,
    weeklyReport: false,
  });

  const togglePrivacy = (idx: number) => {
    setPrivacyState(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleApp = (key: keyof typeof appState) => {
    setAppState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col max-w-5xl mx-auto pb-24 animate-in fade-in duration-200">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066ff] to-[#3d8bff] flex items-center justify-center font-sora font-extrabold text-white text-[15px] shadow-[0_4px_18px_rgba(0,102,255,0.35)]">
            FX
          </div>
          <div className="font-sora font-bold text-[17px] tracking-wide text-[#eef1f8]">
            Trade<span className="text-[#3d8bff]">FX</span>Book
          </div>
        </div>
        <div className="text-[12.5px] text-[#61636e]">Settings</div>
      </div>

      {/* HERO */}
      <div className="relative flex items-center gap-5 p-7 rounded-[18px] bg-gradient-to-br from-[#0066ff]/10 to-[#0066ff]/[0.02] border border-white/5 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_90%_-20%,rgba(0,102,255,0.14),transparent_70%)] pointer-events-none"></div>
        <div className="relative shrink-0">
          <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#0066ff] to-[#0044b3] flex items-center justify-center font-sora font-bold text-[26px] text-white border-[3px] border-white/10">
            S
          </div>
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 rounded-full bg-[#0066ff] border-2 border-[#0a0a0e] flex items-center justify-center cursor-pointer">
            <Edit2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-[21px] font-bold text-[#eef1f8] m-0">Shakil</h2>
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full text-[#9497a3] bg-[#121218] border border-white/10">Pro Unlocked</span>
          </div>
          <div className="text-[13px] text-[#61636e] mt-1">@xhakil · Joined 2026</div>
        </div>
        <button className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121218] border border-white/10 text-[#eef1f8] text-[13px] font-semibold hover:bg-[#191922] hover:border-[#0066ff] transition-all">
          <Edit2 className="w-3.5 h-3.5" /> Edit Profile
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-1 p-1 bg-[#121218] border border-white/5 rounded-xl mb-7 overflow-x-auto">
        {[
          {id: 'Profile', icon: User},
          {id: 'MT5/MT4', icon: Link},
          {id: 'Settings', icon: SettingsIcon},
          {id: 'Billing', icon: CreditCard},
          {id: 'Security', icon: Shield},
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-[13.5px] font-semibold whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-[#0066ff] text-white shadow-[0_3px_14px_rgba(0,102,255,0.35)]' : 'text-[#9497a3] hover:bg-[#191922] hover:text-[#eef1f8]'}`}
          >
            <t.icon className="w-4 h-4" /> {t.id}
          </button>
        ))}
      </div>

      {activeTab === 'Settings' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* AI CALLOUT */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-[18px] bg-gradient-to-br from-[#0066ff]/10 to-[#0066ff]/[0.02] border border-[#0066ff]/25">
            <div className="w-11 h-11 rounded-xl bg-[#0066ff] shrink-0 flex items-center justify-center shadow-[0_4px_16px_rgba(0,102,255,0.35)]">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[14.5px] font-bold text-[#eef1f8] mb-0.5">AI-Powered Trading Reports Enabled</h3>
              <p className="text-[12.5px] text-[#9497a3] m-0">Personalised insights and analysis drawn from your trading patterns are fully unlocked.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0066ff] text-white text-[13px] font-bold whitespace-nowrap shadow-[0_4px_14px_rgba(0,102,255,0.35)]">
              <Zap className="w-3.5 h-3.5 fill-white" /> View Insights
            </button>
          </div>

          <div className="text-[11.5px] font-bold tracking-[1.4px] uppercase text-[#61636e] mt-2 mb-3">Trading</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* TRADING RULES */}
            <div className="col-span-1 md:col-span-2 bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Trading Rules</h3>
                    <p className="text-[12.5px] text-[#61636e] mt-0.5">Your personal risk ceiling</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121218] border border-white/10 text-[#eef1f8] text-[13px] font-semibold hover:border-[#0066ff] hover:text-[#3d8bff] transition-all">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
                  {gauges.map((g, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#121218] border border-white/5">
                      <svg width="72" height="72" viewBox="0 0 72 72" className="overflow-visible">
                        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6"/>
                        <circle cx="36" cy="36" r={r} fill="none" stroke="#0066ff" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${c * Math.min(g.value/g.max, 1)} ${c}`} transform="rotate(-90 36 36)"/>
                        <text x="36" y="34" textAnchor="middle" className="font-sora text-[18px] font-bold fill-[#eef1f8]">{g.value}</text>
                        <text x="36" y="46" textAnchor="middle" className="text-[9.5px] fill-[#61636e]">{g.unit}</text>
                      </svg>
                      <div className="text-[11px] text-[#9497a3] text-center leading-snug">{g.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Trading Preferences</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Sessions and pairs you focus on</p>
                </div>
              </div>
              <div className="px-5 pb-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#9497a3] mb-2.5">
                    <Globe className="w-3.5 h-3.5" /> Sessions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold bg-[#121218] border border-white/10 text-[#eef1f8]">🇬🇧 London</span>
                    <span className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold bg-[#121218] border border-white/10 text-[#eef1f8]">🇺🇸 New York</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#9497a3] mb-2.5">
                    <Zap className="w-3.5 h-3.5" /> Favorite Pairs
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['EUR/USD', 'XAU/USD', 'XAG/USD', 'US30', 'NAS100'].map(pair => (
                      <span key={pair} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold bg-[#0066ff]/15 text-[#3d8bff]">{pair}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DISPLAY */}
            <div className="bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Display</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">How values render across the app</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                    <div className="text-[13.5px] font-semibold">Currency</div>
                    <span className="px-3 py-1.5 rounded-full text-[12.5px] font-semibold bg-[#121218] border border-white/10 text-[#eef1f8]">USD</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5">
                    <div className="text-[13.5px] font-semibold">Timezone</div>
                    <span className="px-3 py-1.5 rounded-full text-[12.5px] font-semibold bg-[#121218] border border-white/10 text-[#eef1f8]">Dhaka (BST)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PRE-TRADE CHECKLIST */}
            <div className="col-span-1 md:col-span-2 bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Pre-Trade Checklist</h3>
                    <p className="text-[12.5px] text-[#61636e] mt-0.5">Applied to every new trade and daily session check-in</p>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  {checklistItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#17c974]" />
                        <span className="text-[13.5px] font-semibold text-[#eef1f8]">{item}</span>
                      </div>
                      <span className="text-[12px] text-[#61636e]">#{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="text-[11.5px] font-bold tracking-[1.4px] uppercase text-[#61636e] mt-6 mb-3">Privacy & Account</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* PRIVACY */}
            <div className="col-span-1 md:col-span-2 bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Privacy</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Control what other traders can see on your public profile</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  {privacyItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                      <div>
                        <div className="text-[13.5px] font-semibold text-[#eef1f8]">{item.label}</div>
                        <div className="text-[12px] text-[#61636e] mt-0.5">{item.desc}</div>
                      </div>
                      <button 
                        onClick={() => togglePrivacy(i)}
                        className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${privacyState[i] ? 'bg-[#0066ff]' : 'bg-[#787880]/30'}`}
                      >
                        <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${privacyState[i] ? 'left-[23px]' : 'left-[3px]'}`}></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* APPEARANCE */}
            <div className="bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Appearance</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Theme and sensitive-info visibility</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Dark Mode</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Use the dark theme (default).</div>
                    </div>
                    <button onClick={() => toggleApp('darkMode')} className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${appState.darkMode ? 'bg-[#0066ff]' : 'bg-[#787880]/30'}`}>
                      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${appState.darkMode ? 'left-[23px]' : 'left-[3px]'}`}></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Streamer Mode</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Hides sensitive numbers. (Unlocked)</div>
                    </div>
                    <button onClick={() => toggleApp('streamerMode')} className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${appState.streamerMode ? 'bg-[#0066ff]' : 'bg-[#787880]/30'}`}>
                      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${appState.streamerMode ? 'left-[23px]' : 'left-[3px]'}`}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Notifications</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Decide which alerts reach your device</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Push Notifications</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Receive browser notifications.</div>
                    </div>
                    <button onClick={() => toggleApp('pushNotifs')} className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${appState.pushNotifs ? 'bg-[#0066ff]' : 'bg-[#787880]/30'}`}>
                      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${appState.pushNotifs ? 'left-[23px]' : 'left-[3px]'}`}></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Trade Alerts</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Get notified when trades close.</div>
                    </div>
                    <button onClick={() => toggleApp('tradeAlerts')} className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${appState.tradeAlerts ? 'bg-[#0066ff]' : 'bg-[#787880]/30'}`}>
                      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${appState.tradeAlerts ? 'left-[23px]' : 'left-[3px]'}`}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CURRENCY & TIMEZONE */}
            <div className="col-span-1 md:col-span-2 bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/15 text-[#3d8bff] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Currency & Timezone</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Values render using your account currency</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Currency</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Display symbol only — P&L values remain in your account currency.</div>
                    </div>
                    <select className="px-3.5 py-2.5 rounded-lg bg-[#121218] border border-white/10 text-[#eef1f8] text-[13px] font-semibold cursor-pointer outline-none">
                      <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Timezone</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Used to display trade timestamps across the app.</div>
                    </div>
                    <select className="px-3.5 py-2.5 rounded-lg bg-[#121218] border border-white/10 text-[#eef1f8] text-[13px] font-semibold cursor-pointer outline-none">
                      <option>Dhaka (BST)</option><option>London (GMT/BST)</option><option>New York (EST/EDT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div className="col-span-1 md:col-span-2 bg-[#15151d] border border-white/5 rounded-[18px] overflow-hidden">
              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#ff4d5e]/15 text-[#ff4d5e] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#eef1f8] m-0">Danger Zone</h3>
                  <p className="text-[12.5px] text-[#61636e] mt-0.5">Permanent actions. These cannot be undone.</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 py-3.5 border-t border-white/5 first:border-0">
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#eef1f8]">Clear All Trading Data</div>
                      <div className="text-[12px] text-[#61636e] mt-0.5">Permanently delete all trades, journal entries, and performance snapshots.</div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent border border-[#ff4d5e]/35 text-[#ff4d5e] text-[13px] font-semibold hover:bg-[#ff4d5e]/10 hover:border-[#ff4d5e] transition-all">
                      <AlertTriangle className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab !== 'Settings' && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
          <SettingsIcon className="w-12 h-12 text-[#61636e] mb-4 opacity-30" />
          <h3 className="text-[18px] font-bold text-[#eef1f8] mb-1">Coming Soon</h3>
          <p className="text-[13px] text-[#9497a3] max-w-sm">The {activeTab} section is currently under development and will be available in a future update.</p>
        </div>
      )}

    </div>
  );
};
