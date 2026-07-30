'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#0a0d14] font-[family-name:var(--font-inter)] text-[#eef1f8] p-6">
      <main className="flex flex-col max-w-2xl w-full items-center text-center gap-8 py-16 px-8 bg-[#10141d] border border-[#232a3a] rounded-[20px] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#4c7dff] to-[#2a52d6] flex items-center justify-center font-[family-name:var(--font-sora)] font-extrabold text-xl text-white shadow-lg">
            FX
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            Trade<span className="text-[#7aa0ff]">FX</span>Book
          </h1>
        </div>
        
        <p className="text-[#8d94a8] text-base leading-relaxed max-w-lg">
          Welcome to your Next.js Trading Dashboard & Journal. All templates from tradefxbook design template have been successfully cloned with exact styling, fonts, and color themes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-gradient-to-br from-[#4c7dff] to-[#3a63d9] text-white font-semibold shadow-md hover:opacity-95 transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/trades"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-[#161b27] border border-[#232a3a] text-[#eef1f8] font-semibold hover:bg-[#1c2230] transition-all"
          >
            Trades
          </Link>
          <Link
            href="/journal"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-[#161b27] border border-[#232a3a] text-[#eef1f8] font-semibold hover:bg-[#1c2230] transition-all"
          >
            Journal
          </Link>
          <Link
            href="/analysis/performance"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-[#161b27] border border-[#232a3a] text-[#eef1f8] font-semibold hover:bg-[#1c2230] transition-all"
          >
            Performance Analytics
          </Link>
          <Link
            href="/analysis/trade-analysis"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-[#161b27] border border-[#232a3a] text-[#eef1f8] font-semibold hover:bg-[#1c2230] transition-all"
          >
            Trade Analysis
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 h-12 rounded-[12px] bg-[#161b27] border border-[#232a3a] text-[#7aa0ff] font-semibold hover:bg-[#1c2230] transition-all"
          >
            Sign In (Login)
          </Link>
        </div>
      </main>
    </div>
  );
}
