import React from 'react';

export const AuthShowcase: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:col-span-6 relative bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-panel)] to-[var(--bg-elevated)] p-8 lg:p-10 flex-col justify-between overflow-hidden border-l border-[var(--border-soft)] transition-colors duration-200 font-sans">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 mask-radial pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/25 px-3 py-1 rounded-full mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Live journal · Exness & MT4/MT5 support
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-hi)] leading-snug mb-3 font-sans">
          Every trade,{' '}
          <span className="bg-gradient-to-r from-[#5aa2f2] to-[#2981eb] bg-clip-text text-transparent">
            logged and understood.
          </span>
        </h2>

        <p className="text-xs lg:text-sm text-[var(--text-mid)] leading-relaxed font-sans">
          Import your Exness CSV trade logs in one click, track your Win Rate, Max Drawdown, and performance analytics seamlessly.
        </p>
      </div>

      <div className="relative z-10 bg-[var(--bg-panel)]/90 border border-[var(--border-soft)] rounded-2xl p-5 backdrop-blur-md my-6 shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-xs font-medium text-[var(--text-low)]">
              Equity curve
            </div>
            <div className="font-mono text-lg font-bold text-[var(--text-hi)] mt-0.5">$48,206.40</div>
          </div>
          <div className="font-mono text-xs font-bold text-[#10b981] text-right">
            ▲ +12.7%
            <span className="block font-sans text-[10px] font-normal text-[var(--text-low)] mt-0.5">
              realtime metrics
            </span>
          </div>
        </div>

        <svg className="w-full h-[110px]" viewBox="0 0 480 130" preserveAspectRatio="none">
          <defs>
            <linearGradient id="authGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2981EB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2981EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5 L480,130 L0,130 Z"
            fill="url(#authGradient)"
          />
          <path
            fill="none"
            stroke="#2981eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            d="M0,110 C40,105 60,90 90,85 C130,78 150,60 190,55 C230,50 250,40 290,32 C330,25 350,20 400,14 C430,10 460,8 480,5"
          />
        </svg>
      </div>

      <div className="relative z-10 flex gap-6 border-t border-[var(--border-soft)] pt-4">
        <div>
          <span className="font-mono text-lg font-bold text-[var(--text-hi)] block">12,847</span>
          <span className="text-xs text-[var(--text-low)] font-sans">
            Active traders
          </span>
        </div>
        <div>
          <span className="font-mono text-lg font-bold text-[var(--text-hi)] block">8.2M</span>
          <span className="text-xs text-[var(--text-low)] font-sans">
            Trades logged
          </span>
        </div>
        <div>
          <span className="font-mono text-lg font-bold text-[var(--text-hi)] block">99.99%</span>
          <span className="text-xs text-[var(--text-low)] font-sans">
            System uptime
          </span>
        </div>
      </div>
    </div>
  );
};
