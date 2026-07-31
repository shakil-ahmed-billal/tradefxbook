import React, { useState } from 'react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { Trade } from '../../types';

interface ShareTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade: Trade | null;
}

export const ShareTradeModal: React.FC<ShareTradeModalProps> = ({
  isOpen,
  onClose,
  trade,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !trade) return null;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/trade/${trade.id}` : '';

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1017] border border-[#212636] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1e2b]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#5aa2f2]" />
            <h3 className="font-outfit text-base font-semibold text-[#f4f6fa]">Share Trade Performance</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#5c6478] hover:text-[#f4f6fa] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Card Preview */}
          <div className="bg-[#141824] border border-[#212636] rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#1a1f2c] border border-[#212636] flex items-center justify-center font-mono text-xs font-bold text-[#5aa2f2]">
                  {trade.pairCode}
                </span>
                <div>
                  <div className="font-outfit font-bold text-sm text-[#f4f6fa]">{trade.symbol}</div>
                  <div className="font-mono text-[10px] text-[#5c6478]">{trade.openTime.slice(0, 10)}</div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold uppercase ${
                trade.type === 'long' ? 'text-[#22c58b] bg-[#22c58b]/10' : 'text-[#ef4b5c] bg-[#ef4b5c]/10'
              }`}>
                {trade.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1a1e2b]">
              <div>
                <div className="text-[10px] text-[#5c6478] uppercase font-semibold">Entry / Exit</div>
                <div className="font-mono text-xs font-medium text-[#f4f6fa]">
                  {trade.entryPrice} → {trade.exitPrice}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#5c6478] uppercase font-semibold">Net P&L</div>
                <div className={`font-mono text-base font-bold ${trade.pnl < 0 ? 'text-[#ef4b5c]' : 'text-[#22c58b]'}`}>
                  {trade.pnl < 0 ? '-' : '+'}${Math.abs(trade.pnl).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1a1e2b] flex items-center justify-between text-[10px] text-[#5c6478]">
              <span className="font-outfit font-bold text-[#5aa2f2]">TradeFXBook Journal</span>
              <span className="font-mono">Verified Trade</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Share Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-[#141824] border border-[#212636] rounded-xl px-3 py-2 text-xs font-mono text-[#9aa2b3] outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#2981eb] text-white rounded-xl text-xs font-semibold hover:bg-[#5aa2f2] flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
