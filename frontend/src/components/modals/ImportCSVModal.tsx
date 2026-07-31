import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useDashboard } from '../../app/(dashboard)/(userDashboard)/dashboard/DashboardContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function mapRaw(raw: any) {
  const pnl = Number(raw.pnl ?? 0);
  const symbol: string = raw.symbol ?? 'UNKNOWN';
  const parts = symbol.split('/');
  const pairCode = parts.length >= 2
    ? (parts[0].length > 3 ? parts[0] : parts[0] + (parts[1]?.[0] ?? ''))
    : symbol.slice(0, 3);
  const rawType = (raw.type ?? '').toString().toUpperCase();
  const type: 'long' | 'short' = rawType === 'LONG' || rawType === 'BUY' ? 'long' : 'short';
  const rawStatus = (raw.status ?? '').toString().toUpperCase();
  const status: 'closed' | 'open' = rawStatus === 'CLOSED' ? 'closed' : 'open';
  const outcome = pnl > 0 ? 'Winner' : pnl < 0 ? 'Loser' : 'Breakeven';
  const rawSource = (raw.source ?? 'MANUAL').toString().toUpperCase();
  const source: 'Manual' | 'MT4/MT5' = rawSource === 'MT4' || rawSource === 'MT5' ? 'MT4/MT5' : 'Manual';
  const openTime = raw.openTime ?? raw.openedAt ?? raw.opening_time_utc ?? new Date().toISOString();
  const closeTime = raw.closeTime ?? raw.closedAt ?? raw.closing_time_utc ?? new Date().toISOString();
  return {
    id: String(raw.id ?? raw.ticket ?? Math.random()),
    symbol, pairCode, type,
    entryPrice: Number(raw.entryPrice ?? 0),
    exitPrice: Number(raw.exitPrice ?? 0),
    size: Number(raw.quantity ?? raw.lots ?? raw.size ?? 0),
    pnl,
    openTime: typeof openTime === 'string' ? openTime : new Date(openTime).toISOString(),
    closeTime: typeof closeTime === 'string' ? closeTime : new Date(closeTime).toISOString(),
    source, status, outcome,
    journalStatus: raw.journalStatus ?? 'Pending',
    score: Number(raw.score ?? 0),
    duration: raw.duration,
    priceMovePercent: raw.priceMovePercent,
    journal: raw.journalEntry ?? raw.journal,
  };
}

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ isOpen, onClose }) => {
  const { setTrades } = useDashboard();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a CSV file first.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const csvText = await file.text();

      const res = await fetch('http://localhost:8000/api/trades/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ csvText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to import CSV.');
      }

      setMessage({ type: 'success', text: data.message || 'Trades imported successfully!' });

      // Refresh trades list
      const fetchRes = await fetch(`${API_URL}/api/trades`, { credentials: 'include' });
      if (fetchRes.ok) {
        const fetchResult = await fetchRes.json();
        if (Array.isArray(fetchResult.data)) {
          setTrades(fetchResult.data.map(mapRaw));
        }
      }

      setTimeout(() => {
        onClose();
        setFile(null);
        setMessage(null);
      }, 1500);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to parse and import CSV file.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5c6478] hover:text-[#f4f6fa] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#2981eb]/10 border border-[#2981eb]/20 flex items-center justify-center text-[#2981eb]">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-outfit text-lg font-bold text-[#f4f6fa]">Import Exness CSV Trades</h2>
            <p className="text-xs text-[#9aa2b3]">Upload your Exness / MT4 / MT5 trade report CSV file</p>
          </div>
        </div>

        {message && (
          <div className={`p-3.5 mb-4 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="border-2 border-dashed border-[#212636] hover:border-[#2981eb] rounded-2xl p-8 text-center transition-all bg-[#141824]/40 relative group mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <FileText className="w-10 h-10 text-[#5c6478] group-hover:text-[#2981eb] mx-auto mb-3 transition-colors" />
          {file ? (
            <div>
              <p className="text-sm font-semibold text-[#f4f6fa]">{file.name}</p>
              <p className="text-xs text-[#5c6478] mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-[#f4f6fa]">Click or drag & drop Exness CSV here</p>
              <p className="text-xs text-[#5c6478] mt-1">Supports Exness ticket exports, MT4 & MT5 reports</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-[#141824] hover:bg-[#1a1e2b] border border-[#212636] text-[#f4f6fa] font-semibold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={loading || !file}
            className="flex-1 py-2.5 px-4 bg-[#2981eb] hover:bg-[#5aa2f2] disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2981eb]/25"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Import Trades'}
          </button>
        </div>
      </div>
    </div>
  );
};
