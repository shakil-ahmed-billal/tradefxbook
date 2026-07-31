import React from 'react';

export const AuthShowcase: React.FC = () => {
  return (
    <section className="hidden lg:flex lg:col-span-7 relative bg-gradient-to-br from-[#090b10] via-[#0e1017] to-[#141824] p-12 lg:p-16 flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 mask-radial" />

      <div className="relative z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#22c58b] bg-[#22c58b]/10 border border-[#22c58b]/25 px-3 py-1.5 rounded-full mb-6">
          <span>▲</span> Live journal · Exness & MT4/MT5 support
        </div>

        <h2 className="font-outfit text-4xl font-bold text-[#f4f6fa] tracking-tight leading-tight mb-4">
          Every trade,{' '}
          <em className="not-italic bg-gradient-to-r from-[#5aa2f2] to-[#2981eb] bg-clip-text text-transparent">
            logged and understood.
          </em>
        </h2>

        <p className="text-sm text-[#9aa2b3] leading-relaxed">
          Import your Exness CSV trade logs in one click, track your Win Rate, Max Drawdown, and performance analytics seamlessly.
        </p>
      </div>

      <div className="relative z-10 bg-[#141824]/60 border border-[#212636] rounded-2xl p-6 backdrop-blur-md my-8 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-mono text-xs text-[#9aa2b3]">EQUITY CURVE</div>
            <div className="font-mono text-xl font-bold text-[#f4f6fa]">$48,206.40</div>
          </div>
          <div className="font-mono text-xs text-[#22c58b] text-right">
            ▲ +12.7%
            <span className="block text-[10px] text-[#5c6478]">realtime metrics</span>
          </div>
        </div>

        <svg className="w-full h-[130px]" viewBox="0 0 480 130" preserveAspectRatio="none">
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

      <div className="relative z-10 flex gap-8">
        <div>
          <span className="font-mono text-xl font-bold text-[#f4f6fa] block">12,847</span>
          <span className="text-xs text-[#5c6478]">Active traders</span>
        </div>
        <div>
          <span className="font-mono text-xl font-bold text-[#f4f6fa] block">8.2M</span>
          <span className="text-xs text-[#5c6478]">Trades logged</span>
        </div>
        <div>
          <span className="font-mono text-xl font-bold text-[#f4f6fa] block">99.99%</span>
          <span className="text-xs text-[#5c6478]">Uptime</span>
        </div>
      </div>
    </section>
  );
};
