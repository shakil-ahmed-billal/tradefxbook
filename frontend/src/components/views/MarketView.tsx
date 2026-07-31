import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { MarketRate } from '../../types';

interface MarketViewProps {
  rates: MarketRate[];
}

export const MarketView: React.FC<MarketViewProps> = ({ rates }) => {
  const [filter, setFilter] = useState<'All' | 'Forex' | 'Metals' | 'Crypto' | 'Indices'>('All');
  const [search, setSearch] = useState('');

  const filteredRates = rates.filter(r => {
    const matchesFilter = filter === 'All' || r.category === filter;
    const matchesSearch = r.symbol.toLowerCase().includes(search.toLowerCase()) || r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#7aa0ff]" />
            Market Overview
          </h1>
          <p className="text-xs text-[#565e73] mt-1">Real-time market tickers, daily high/low, and price moves</p>
        </div>

        <div className="flex items-center gap-2 bg-[#161b27] border border-[#232a3a] px-3 py-1.5 rounded-xl text-xs text-[#565e73] max-w-xs">
          <Search className="w-4 h-4 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol..."
            className="bg-transparent text-[#eef1f8] outline-none w-full"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 bg-[#161b27] p-1 rounded-xl border border-[#232a3a] w-fit">
        {(['All', 'Forex', 'Metals', 'Crypto', 'Indices'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === cat ? 'bg-[#1c2230] text-[#eef1f8]' : 'text-[#565e73] hover:text-[#8d94a8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRates.map(rate => (
          <div key={rate.symbol} className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5 hover:border-[#2a2f42] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-sora font-bold text-base text-[#eef1f8] block">{rate.symbol}</span>
                <span className="text-xs text-[#565e73]">{rate.name}</span>
              </div>
              <span className={`flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                rate.change24h >= 0 ? 'text-[#00d9a3] bg-[#00d9a3]/10' : 'text-[#ff5c7a] bg-[#ff5c7a]/10'
              }`}>
                {rate.change24h >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
              </span>
            </div>

            <div className="font-mono text-2xl font-bold text-[#eef1f8] mb-4">
              ${rate.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1a2029] font-mono text-[11px] text-[#565e73]">
              <span>24h Low: ${rate.low24h}</span>
              <span>24h High: ${rate.high24h}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
