import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

interface ConnectBrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: () => void;
}

export const ConnectBrokerModal: React.FC<ConnectBrokerModalProps> = ({
  isOpen,
  onClose,
  onConnected,
}) => {
  const [platform, setPlatform] = useState<'MT4' | 'MT5'>('MT5');
  const [server, setServer] = useState('FTMO-Demo');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setSuccess(true);
      setTimeout(() => {
        onConnected();
        onClose();
        setSuccess(false);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1017] border border-[#212636] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1e2b]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5aa2f2]" />
            <h3 className="font-outfit text-base font-semibold text-[#f4f6fa]">Connect MT4 / MT5 Broker</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#5c6478] hover:text-[#f4f6fa] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-[#22c58b] animate-bounce" />
            <h4 className="font-outfit text-lg font-bold text-[#f4f6fa]">Account Connected Successfully!</h4>
            <p className="text-xs text-[#9aa2b3]">Trade history and live positions synced automatically.</p>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="p-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Platform</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('MT4')}
                  className={`py-2 rounded-xl font-mono text-xs font-bold border transition-colors ${
                    platform === 'MT4'
                      ? 'bg-[#2981eb]/20 text-[#5aa2f2] border-[#2981eb]/50'
                      : 'bg-[#141824] text-[#5c6478] border-[#212636]'
                  }`}
                >
                  MetaTrader 4 (MT4)
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('MT5')}
                  className={`py-2 rounded-xl font-mono text-xs font-bold border transition-colors ${
                    platform === 'MT5'
                      ? 'bg-[#2981eb]/20 text-[#5aa2f2] border-[#2981eb]/50'
                      : 'bg-[#141824] text-[#5c6478] border-[#212636]'
                  }`}
                >
                  MetaTrader 5 (MT5)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Broker Server</label>
              <input
                type="text"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                placeholder="e.g. IC markets-Live, FTMO-Demo..."
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Account Login ID</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="10094821"
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] font-mono outline-none focus:border-[#2981eb]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Read-Only / Investor Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#141824] border border-[#212636] rounded-xl px-3.5 py-2.5 text-sm text-[#f4f6fa] font-mono outline-none focus:border-[#2981eb]"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#1a1e2b] mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#9aa2b3] hover:text-[#f4f6fa]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={connecting}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors flex items-center gap-2 shadow-lg shadow-[#2981eb]/20"
              >
                {connecting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {connecting ? 'Connecting...' : 'Connect Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
