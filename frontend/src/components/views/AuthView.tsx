import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { UserProfile } from '../../types';

interface AuthViewProps {
  onSuccessAuth: (user: UserProfile) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccessAuth }) => {
  const [email, setEmail] = useState('xhakil2023@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameFromEmail = email.split('@')[0];
    const user: UserProfile = {
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email,
      plan: 'FREE',
      avatarInitials: nameFromEmail.charAt(0).toUpperCase(),
      isAuthenticated: true,
    };
    onSuccessAuth(user);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)] animate-in fade-in duration-200 bg-[#090b10]">
      
      {/* LEFT AUTH PANEL */}
      <section className="lg:col-span-5 bg-[#0e1017] border-r border-[#1a1e2b] p-8 lg:p-12 flex flex-col justify-between relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <svg className="h-5 w-auto text-[#f4f6fa]" viewBox="0 0 443 209" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M154.851 31.749C156.716 31.749 158.129 33.4327 157.806 35.2694L151.113 73.2694C150.86 74.7034 149.614 75.749 148.158 75.749H103.942C102.487 75.749 101.241 76.7938 100.988 78.227L78.3641 206.271C78.1109 207.704 76.8654 208.749 75.4099 208.749H26.0027C24.1371 208.749 22.7239 207.064 23.0485 205.227L45.3039 79.271C45.6285 77.4338 44.2153 75.749 42.3496 75.749H3.00082C1.13582 75.749 -0.277217 74.0654 0.0462986 72.2286L6.73948 34.2286C6.99207 32.7946 8.23791 31.749 9.694 31.749H154.851Z" fill="currentColor"></path>
            <path d="M391.523 31.749C407.523 31.749 419.939 34.9158 428.773 41.249C437.773 47.4157 442.273 56.499 442.273 68.499C442.273 71.3324 442.023 74.4157 441.523 77.749C439.689 88.0823 435.439 96.8324 428.773 103.999C423.987 109.024 418.513 112.847 412.353 115.467C410.437 116.282 410.428 119.751 412.315 120.629C417.366 122.977 421.435 126.267 424.523 130.499C429.189 136.499 431.523 143.582 431.523 151.749C431.523 154.416 431.273 157.249 430.773 160.249C428.106 175.749 420.856 187.749 409.023 196.249C397.356 204.582 381.939 208.749 362.773 208.749H272.407C271.163 208.749 270.221 207.626 270.437 206.401L281.183 145.535C281.464 143.942 283.423 143.325 284.567 144.469L313.037 172.939C316.187 176.089 321.572 173.859 321.573 169.404V33.749C321.573 32.6445 322.468 31.749 323.573 31.749H391.523ZM333.92 161.914C333.712 163.135 334.653 164.249 335.891 164.249H358.773C363.773 164.249 367.606 163.332 370.273 161.499C373.106 159.499 374.856 156.332 375.523 151.999C375.689 151.166 375.773 150.082 375.773 148.749C375.773 142.416 371.523 139.249 363.023 139.249H339.461C338.486 139.249 337.653 139.952 337.49 140.914L333.92 161.914ZM344.947 98.3947C344.726 99.6214 345.669 100.749 346.915 100.749H366.023C371.023 100.749 374.939 99.7489 377.773 97.749C380.606 95.749 382.356 92.6656 383.023 88.499C383.189 87.6657 383.273 86.5824 383.273 85.249C383.273 81.9157 382.189 79.499 380.023 77.999C380.023 76.4992 374.856 75.749 370.523 75.749H350.695C349.727 75.749 348.898 76.4421 348.727 77.3947L344.947 98.3947Z" fill="currentColor"></path>
            <path d="M125.644 207.097C125.475 208.052 124.645 208.749 123.674 208.749H89.3091C88.0653 208.749 87.1231 207.626 87.3397 206.401L101.309 127.405C101.384 126.979 101.595 126.589 101.91 126.294L143.063 87.7252C144.466 86.4105 146.734 87.639 146.4 89.5322L125.644 207.097ZM314.511 159.674C314.511 161.456 312.357 162.349 311.097 161.089L274.985 124.976C274.227 124.219 273.007 124.193 272.218 124.917L180.925 208.749H180.924L180.923 208.748L192.313 143.654C192.48 142.697 193.311 141.999 194.283 141.999H240.929C241.898 141.999 242.727 141.306 242.898 140.353L249.679 102.603C249.9 101.376 248.957 100.249 247.711 100.249H202.479C201.238 100.249 200.296 99.1302 200.508 97.9072L204.065 77.4072C204.231 76.4488 205.062 75.749 206.035 75.749H272.174C273.144 75.749 273.975 75.052 274.143 74.096L281.189 34.096C281.404 32.8715 280.462 31.749 279.219 31.749H182.586C182.055 31.749 181.547 31.5383 181.172 31.1632L153.423 3.41421C152.163 2.15428 153.055 0 154.837 0H312.511C313.616 0 314.511 0.89543 314.511 2V159.674Z" fill="#2981EB"></path>
          </svg>
          <span className="font-outfit font-bold text-base text-[#f4f6fa]">TradeFXBook</span>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-[#5aa2f2] flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c58b] shadow-[0_0_0_3px_rgba(34,197,139,0.18)]" />
            Journal online
          </div>

          <h1 className="font-outfit text-2xl lg:text-3xl font-bold text-[#f4f6fa] tracking-tight mb-2">
            Welcome back, trader
          </h1>
          <p className="text-sm text-[#9aa2b3] leading-relaxed mb-6">
            Sign in to review your open positions and today's journal entries.
          </p>

          <button 
            type="button"
            onClick={() => onSuccessAuth({ name: 'Shakil', email, plan: 'FREE', avatarInitials: 'S', isAuthenticated: true })}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-[#141824] border border-[#212636] rounded-xl text-sm font-medium text-[#f4f6fa] hover:border-[#39415a] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5 text-xs text-[#5c6478]">
            <span className="flex-1 h-px bg-[#212636]" />
            OR CONTINUE WITH EMAIL
            <span className="flex-1 h-px bg-[#212636]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Email address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-[#5c6478] absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@tradingdesk.com"
                  className="w-full bg-[#141824] border border-[#212636] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#5c6478] absolute left-3.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141824] border border-[#212636] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-2 bg-[#2981eb] hover:bg-[#5aa2f2] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2981eb]/25"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-[#5c6478] text-center mt-5 leading-relaxed">
            By continuing, you agree to our <a href="#" className="underline text-[#9aa2b3]">Terms</a> and <a href="#" className="underline text-[#9aa2b3]">Privacy Policy</a>
          </p>
        </div>

        <div className="flex justify-between text-xs text-[#5c6478] mt-8 pt-4 border-t border-[#1a1e2b]">
          <span>© 2026 TradeFXBook</span>
          <a href="#" className="hover:text-[#9aa2b3]">Need help?</a>
        </div>
      </section>

      {/* RIGHT SHOWCASE SECTION */}
      <section className="hidden lg:flex lg:col-span-7 relative bg-gradient-to-br from-[#090b10] via-[#0e1017] to-[#141824] p-12 lg:p-16 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mask-radial" />

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#22c58b] bg-[#22c58b]/10 border border-[#22c58b]/25 px-3 py-1.5 rounded-full mb-6">
            <span>▲</span> Live journal · +18.4% this month
          </div>

          <h2 className="font-outfit text-4xl font-bold text-[#f4f6fa] tracking-tight leading-tight mb-4">
            Every trade, <em className="not-italic bg-gradient-to-r from-[#5aa2f2] to-[#2981eb] bg-clip-text text-transparent">logged and understood.</em>
          </h2>

          <p className="text-sm text-[#9aa2b3] leading-relaxed">
            MT4/MT5 auto-sync, real analytics, and a global desk of traders — TradeFXBook turns your history into your edge.
          </p>
        </div>

        {/* Animated Signature Equity Card */}
        <div className="relative z-10 bg-[#141824]/60 border border-[#212636] rounded-2xl p-6 backdrop-blur-md my-8 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-mono text-xs text-[#9aa2b3]">EQUITY CURVE — 30D</div>
              <div className="font-mono text-xl font-bold text-[#f4f6fa]">$48,206.40</div>
            </div>
            <div className="font-mono text-xs text-[#22c58b] text-right">
              ▲ +12.7%
              <span className="block text-[10px] text-[#5c6478]">since last sync</span>
            </div>
          </div>

          <svg className="w-full h-[130px]" viewBox="0 0 480 130" preserveAspectRatio="none">
            <g stroke="#22c58b" strokeWidth="2">
              <line className="animate-candle" x1="20" y1="60" x2="20" y2="95" style={{ animationDelay: '0.1s' }} />
              <line className="animate-candle" x1="45" y1="50" x2="45" y2="80" style={{ animationDelay: '0.2s' }} />
              <line className="animate-candle" x1="70" y1="70" x2="70" y2="100" stroke="#ef4b5c" style={{ animationDelay: '0.3s' }} />
              <line className="animate-candle" x1="95" y1="40" x2="95" y2="75" style={{ animationDelay: '0.4s' }} />
              <line className="animate-candle" x1="120" y1="55" x2="120" y2="90" stroke="#ef4b5c" style={{ animationDelay: '0.5s' }} />
              <line className="animate-candle" x1="145" y1="30" x2="145" y2="65" style={{ animationDelay: '0.6s' }} />
            </g>

            <defs>
              <linearGradient id="authGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2981EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2981EB" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path 
              className="animate-equity-fill"
              d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5 L480,130 L0,130 Z" 
              fill="url(#authGradient)" 
            />
            <path 
              className="animate-equity-line"
              fill="none" 
              stroke="#2981eb" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5" 
            />
          </svg>
        </div>

        <div className="relative z-10 flex gap-8">
          <div>
            <span className="font-mono text-xl font-bold text-[#f4f6fa] block">12,847</span>
            <span className="text-xs text-[#5c6478]">Active traders</span>
          </div>
          <div>
            <span className="font-mono text-xl font-bold text-[#f4f6fa] block">8.2M</span>
            <span className="text-xs text-[#5c6478]">Trades synced</span>
          </div>
          <div>
            <span className="font-mono text-xl font-bold text-[#f4f6fa] block">99.99%</span>
            <span className="text-xs text-[#5c6478]">Uptime</span>
          </div>
        </div>
      </section>

    </div>
  );
};
