import React, { useState } from 'react';
import { Wrench, Calculator, ShieldCheck } from 'lucide-react';

export const ToolsView: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [stopLossPips, setStopLossPips] = useState('20');

  const balance = parseFloat(accountBalance) || 0;
  const riskPct = parseFloat(riskPercent) || 0;
  const slPips = parseFloat(stopLossPips) || 1;

  const riskAmount = (balance * riskPct) / 100;
  const lotSize = slPips > 0 ? (riskAmount / (slPips * 10)).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
          <Wrench className="w-6 h-6 text-[#7aa0ff]" />
          Trader Position & Risk Calculator
        </h1>
        <p className="text-xs text-[#565e73] mt-1">Calculate exact lot size and dollar risk before executing trades.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Position Size Calculator Card */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a2029]">
            <Calculator className="w-5 h-5 text-[#7aa0ff]" />
            <h3 className="font-sora font-bold text-sm text-[#eef1f8]">Position Size Calculator</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Account Balance ($)</label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Risk Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Stop Loss (Pips)</label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
                />
              </div>
            </div>

            <div className="p-4 bg-[#161b27] border border-[#1a2029] rounded-xl mt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10.5px] text-[#565e73] block mb-1 uppercase font-semibold">Total Risk Amount</span>
                <span className="font-mono text-xl font-bold text-[#ff5c7a]">${riskAmount.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10.5px] text-[#565e73] block mb-1 uppercase font-semibold">Recommended Lots</span>
                <span className="font-mono text-xl font-bold text-[#00d9a3]">{lotSize} Lots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Management Guardrails Card */}
        <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a2029]">
            <ShieldCheck className="w-5 h-5 text-[#00d9a3]" />
            <h3 className="font-sora font-bold text-sm text-[#eef1f8]">Risk Rules & Safeguards</h3>
          </div>

          <div className="flex flex-col gap-3 text-xs text-[#8d94a8]">
            <div className="p-3 bg-[#161b27] border border-[#1a2029] rounded-xl">
              <span className="font-semibold text-[#eef1f8] block mb-0.5">1% Max Account Risk Rule</span>
              Never risk more than 1% of equity on a single position to prevent drawdown compounding.
            </div>
            <div className="p-3 bg-[#161b27] border border-[#1a2029] rounded-xl">
              <span className="font-semibold text-[#eef1f8] block mb-0.5">1:2 Minimum Risk to Reward</span>
              Maintain target profit at least double your stop loss distance to stay long-term profitable.
            </div>
            <div className="p-3 bg-[#161b27] border border-[#1a2029] rounded-xl">
              <span className="font-semibold text-[#eef1f8] block mb-0.5">3 Consecutive Loss Pause</span>
              Stop trading for the day after 3 consecutive losses to avoid tilt and revenge trading.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
