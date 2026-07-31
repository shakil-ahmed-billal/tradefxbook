import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useDashboard } from '../../app/(dashboard)/(userDashboard)/dashboard/DashboardContext';

const PROD_API = 'https://tradefxbook-eta.vercel.app';
const DEV_API = 'http://localhost:4000';
const IS_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const API_URL = process.env.NEXT_PUBLIC_API_URL || (IS_DEV ? DEV_API : PROD_API);

function normalizeSymbol(rawSymbol: string): string {
  if (!rawSymbol) return 'UNKNOWN';
  let s = rawSymbol.trim();
  if (s.endsWith('m') && s.length > 3) {
    s = s.slice(0, -1);
  }
  if (s.length === 6 && !s.includes('/')) {
    s = `${s.slice(0, 3)}/${s.slice(3)}`;
  }
  return s;
}

function parseCsvClientSide(csvText: string) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const getVal = (row: string[], fieldName: string) => {
    const idx = headers.indexOf(fieldName);
    return idx !== -1 && row[idx] !== undefined ? row[idx].trim() : '';
  };

  const parsedTrades: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(cell => cell.trim());
    if (row.length < 5) continue;

    const ticket = getVal(row, 'ticket');
    const openTime = getVal(row, 'opening_time_utc') || getVal(row, 'opentime') || new Date().toISOString();
    const closeTime = getVal(row, 'closing_time_utc') || getVal(row, 'closetime') || new Date().toISOString();
    const rawType = getVal(row, 'type');
    const lots = getVal(row, 'lots') || getVal(row, 'size');
    const rawSymbol = getVal(row, 'symbol');
    const openPrice = getVal(row, 'opening_price') || getVal(row, 'entryprice');
    const closePrice = getVal(row, 'closing_price') || getVal(row, 'exitprice');
    const profit = getVal(row, 'profit') || getVal(row, 'pnl');

    const symbol = normalizeSymbol(rawSymbol);
    const parts = symbol.split('/');
    const pairCode = parts.length >= 2
      ? (parts[0].length > 3 ? parts[0] : parts[0] + (parts[1]?.[0] ?? ''))
      : symbol.slice(0, 3);

    const type: 'long' | 'short' = rawType.toLowerCase() === 'buy' || rawType.toLowerCase() === 'long' ? 'long' : 'short';
    const pnl = profit !== '' ? Number(profit) : 0;
    const outcome = pnl > 0 ? 'Winner' : pnl < 0 ? 'Loser' : 'Breakeven';

    parsedTrades.push({
      id: ticket ? `exness-${ticket}` : `trade-${Date.now()}-${i}`,
      symbol,
      pairCode,
      type,
      entryPrice: Number(openPrice || 0),
      exitPrice: Number(closePrice || 0),
      size: Number(lots || 0.01),
      pnl,
      openTime,
      closeTime,
      source: 'MT4/MT5',
      status: 'closed',
      outcome,
      journalStatus: 'Pending',
      score: 0,
    });
  }

  return parsedTrades;
}

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
      const clientParsed = parseCsvClientSide(csvText);

      try {
        const res = await fetch(`${API_URL}/api/trades/import-csv`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ csvText }),
        });

        if (res.ok) {
          const data = await res.json();
          // Fetch updated trades list with limit=1000
          const fetchRes = await fetch(`${API_URL}/api/trades?limit=1000`, { credentials: 'include' });
          if (fetchRes.ok) {
            const fetchResult = await fetchRes.json();
            if (Array.isArray(fetchResult.data)) {
              setTrades(fetchResult.data.map(mapRaw));
              setMessage({ type: 'success', text: `Successfully imported ${fetchResult.data.length} trades!` });
            }
          }
        } else {
          // Backend returned non-200, use client side parsed trades
          setTrades(prev => [...clientParsed, ...prev]);
          setMessage({ type: 'success', text: `Successfully imported ${clientParsed.length} trades!` });
        }
      } catch (backendError) {
        // Backend offline, fallback to client side parsed trades
        setTrades(prev => [...clientParsed, ...prev]);
        setMessage({ type: 'success', text: `Imported ${clientParsed.length} trades locally!` });
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
