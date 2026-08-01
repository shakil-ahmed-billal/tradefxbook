import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Copy, Download, Code, Cpu, Terminal, Check, RotateCw } from 'lucide-react';
import { useDashboard } from '@/app/(dashboard)/(userDashboard)/dashboard/DashboardContext';

interface ConnectBrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: () => void;
}

const MQL5_EA_CODE = `//+------------------------------------------------------------------+
//|                                           TradeFXBook_EA.mq5     |
//|                        Copyright 2026, TradeFXBook Trading Suite |
//|                                       https://tradefxbook.com    |
//+------------------------------------------------------------------+
#property copyright "TradeFXBook"
#property link      "https://tradefxbook.com"
#property version   "2.00"
#property description "Auto Sync ALL trades from Exness MT5 to TradeFXBook Dashboard"

//--- Inputs
input string   InpApiKey       = "YOUR_API_KEY_HERE";                          // TradeFXBook API Key (your email)
input string   InpApiUrl       = "https://tradefxbook-eta.vercel.app/api/trades/mt5-sync"; // Backend Webhook URL
input int      InpSyncInterval = 600;                                          // Sync Frequency (Seconds)
input int      InpBatchSize    = 1000;                                         // Trades per batch (max 2000)

int OnInit()
  {
   Print("TradeFXBook EA v2 initialized. Syncing ALL trades to: ", InpApiUrl);
   EventSetTimer(InpSyncInterval);
   SyncAllTrades();
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   EventKillTimer();
  }

void OnTimer()
  {
   SyncAllTrades();
  }

void OnTradeTransaction(const MqlTradeTransaction& trans, const MqlTradeRequest& request, const MqlTradeResult& result)
  {
   // Synchronize only on Timer intervals (e.g. 10 minutes) to avoid request overload.
  }

void SyncAllTrades()
  {
   if(StringLen(InpApiKey) == 0 || InpApiKey == "YOUR_API_KEY_HERE")
     {
      Print("TradeFXBook Warning: Please set your API Key (email) in EA settings.");
      return;
     }

   // --- Step 1: Load ALL history from the beginning of time
   if(!HistorySelect(0, TimeCurrent()))
     {
      Print("TradeFXBook: HistorySelect failed");
      return;
     }

   int totalDeals = HistoryDealsTotal();
   Print("TradeFXBook: Total deals found in history: ", totalDeals);

   // --- Step 2: Build a map of order ticket -> open price and open time
   // We need DEAL_ENTRY_IN deals to get the open price for each order
   // Store: ticket -> {openPrice, openTime, type, symbol, lots}

   // We'll match IN and OUT deals by their order ticket
   // Arrays to store ENTRY_IN data
   ulong  inTickets[];
   double inPrices[];
   datetime inTimes[];
   string inSymbols[];
   long   inTypes[];
   double inVolumes[];
   int inCount = 0;

   ArrayResize(inTickets, totalDeals);
   ArrayResize(inPrices, totalDeals);
   ArrayResize(inTimes, totalDeals);
   ArrayResize(inSymbols, totalDeals);
   ArrayResize(inTypes, totalDeals);
   ArrayResize(inVolumes, totalDeals);

   for(int i = 0; i < totalDeals; i++)
     {
      ulong dealTicket = HistoryDealGetTicket(i);
      long entryType = HistoryDealGetInteger(dealTicket, DEAL_ENTRY);
      long dealType = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
      if(dealType != DEAL_TYPE_BUY && dealType != DEAL_TYPE_SELL) continue;

      if(entryType == DEAL_ENTRY_IN)
        {
         ulong orderTkt = HistoryDealGetInteger(dealTicket, DEAL_ORDER);
         inTickets[inCount]  = (orderTkt > 0 ? orderTkt : dealTicket);
         inPrices[inCount]   = HistoryDealGetDouble(dealTicket, DEAL_PRICE);
         inTimes[inCount]    = (datetime)HistoryDealGetInteger(dealTicket, DEAL_TIME);
         inSymbols[inCount]  = HistoryDealGetString(dealTicket, DEAL_SYMBOL);
         inTypes[inCount]    = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
         inVolumes[inCount]  = HistoryDealGetDouble(dealTicket, DEAL_VOLUME);
         inCount++;
        }
     }

   // --- Step 3: Collect all CLOSED deals (DEAL_ENTRY_OUT) with batching
   int batchSize = MathMax(1, MathMin(InpBatchSize, 2000));
   int batchStart = 0;
   int totalSynced = 0;

   while(batchStart < totalDeals)
     {
      string json = "{\\"apiKey\\":\\"" + InpApiKey + "\\",\\"trades\\":[";
      int count = 0;
      int batchEnd = MathMin(batchStart + batchSize, totalDeals);

      for(int i = batchStart; i < batchEnd; i++)
        {
         ulong dealTicket = HistoryDealGetTicket(i);
         long entryType = HistoryDealGetInteger(dealTicket, DEAL_ENTRY);
         long actualDealType = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
         if(actualDealType != DEAL_TYPE_BUY && actualDealType != DEAL_TYPE_SELL) continue;

         // Only process closing deals
         if(entryType != DEAL_ENTRY_OUT) continue;

         ulong orderTicket = HistoryDealGetInteger(dealTicket, DEAL_ORDER);
         ulong useTicket   = (orderTicket > 0 ? orderTicket : dealTicket);
         string symbol     = HistoryDealGetString(dealTicket, DEAL_SYMBOL);
         double volume     = HistoryDealGetDouble(dealTicket, DEAL_VOLUME);
         double closePrice = HistoryDealGetDouble(dealTicket, DEAL_PRICE);
         double profit     = HistoryDealGetDouble(dealTicket, DEAL_PROFIT);
         double commission = HistoryDealGetDouble(dealTicket, DEAL_COMMISSION);
         double swap       = HistoryDealGetDouble(dealTicket, DEAL_SWAP);
         datetime closeTime = (datetime)HistoryDealGetInteger(dealTicket, DEAL_TIME);

         // Find matching open price from ENTRY_IN deals
         double openPrice = 0.0;
         datetime openTime = closeTime;
         for(int j = 0; j < inCount; j++)
           {
            if(inTickets[j] == useTicket)
              {
               openPrice = inPrices[j];
               openTime  = inTimes[j];
               break;
              }
           }

         if(count > 0) json += ",";
         json += "{";
         json += "\\"ticket\\":" + IntegerToString(useTicket) + ",";
         json += "\\"symbol\\":\\"" + symbol + "\\",";
         string typeStr = (actualDealType == DEAL_TYPE_BUY) ? "BUY" : "SELL";
         json += "\\"type\\":\\"" + typeStr + "\\",";
         json += "\\"lots\\":" + DoubleToString(volume, 2) + ",";
         json += "\\"openPrice\\":" + DoubleToString(openPrice, 5) + ",";
         json += "\\"closePrice\\":" + DoubleToString(closePrice, 5) + ",";
         json += "\\"pnl\\":" + DoubleToString(profit, 2) + ",";
         json += "\\"commission\\":" + DoubleToString(commission, 2) + ",";
         json += "\\"swap\\":" + DoubleToString(swap, 2) + ",";
         json += "\\"openTime\\":\\"" + TimeToString(openTime, TIME_DATE|TIME_SECONDS) + "\\",";
         json += "\\"closeTime\\":\\"" + TimeToString(closeTime, TIME_DATE|TIME_SECONDS) + "\\",";
         json += "\\"status\\":\\"CLOSED\\"";
         json += "}";
         count++;
        }

      // Also include open positions in first batch
      if(batchStart == 0)
        {
         int totalPos = PositionsTotal();
         for(int i = 0; i < totalPos; i++)
           {
            ulong ticket = PositionGetTicket(i);
            if(ticket > 0)
              {
               string symbol  = PositionGetString(POSITION_SYMBOL);
               long posType   = PositionGetInteger(POSITION_TYPE);
               double volume  = PositionGetDouble(POSITION_VOLUME);
               double opPrice = PositionGetDouble(POSITION_PRICE_OPEN);
               double profit  = PositionGetDouble(POSITION_PROFIT);
               double swap    = PositionGetDouble(POSITION_SWAP);
               datetime opTime = (datetime)PositionGetInteger(POSITION_TIME);

               if(count > 0) json += ",";
               json += "{";
               json += "\\"ticket\\":" + IntegerToString(ticket) + ",";
               json += "\\"symbol\\":\\"" + symbol + "\\",";
               json += "\\"type\\":\\"" + (posType == 0 ? "BUY" : "SELL") + "\\",";
               json += "\\"lots\\":" + DoubleToString(volume, 2) + ",";
               json += "\\"openPrice\\":" + DoubleToString(opPrice, 5) + ",";
               json += "\\"pnl\\":" + DoubleToString(profit, 2) + ",";
               json += "\\"swap\\":" + DoubleToString(swap, 2) + ",";
               json += "\\"openTime\\":\\"" + TimeToString(opTime, TIME_DATE|TIME_SECONDS) + "\\",";
               json += "\\"status\\":\\"OPEN\\"";
               json += "}";
               count++;
              }
           }
        }

      json += "]}";

      if(count == 0)
        {
         batchStart += batchSize;
         continue;
        }

      // Send HTTP POST
      char postData[];
      char result[];
      string resultHeaders;
      StringToCharArray(json, postData, 0, WHOLE_ARRAY, CP_UTF8);
      ArrayResize(postData, ArraySize(postData) - 1);

      string headers = "Content-Type: application/json\\r\\n";
      headers += "x-api-key: " + InpApiKey + "\\r\\n";

      int res = WebRequest("POST", InpApiUrl, headers, 15000, postData, result, resultHeaders);
      if(res == 200)
        {
         totalSynced += count;
         Print("TradeFXBook Batch [", batchStart, "-", batchEnd, "] synced ", count, " trades. Response: ", CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8));
        }
      else
        {
         Print("TradeFXBook Batch [", batchStart, "-", batchEnd, "] FAILED. HTTP: ", res, " Response: ", CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8));
        }

      batchStart += batchSize;
     }

   Print("TradeFXBook: Total synced this run: ", totalSynced, " trades");
  }
`;

export const ConnectBrokerModal: React.FC<ConnectBrokerModalProps> = ({
  isOpen,
  onClose,
  onConnected,
}) => {
  const { user, handleSyncTrades, isSyncingTrades } = useDashboard();
  const [activeTab, setActiveTab] = useState<'EA' | 'API'>('EA');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  if (!isOpen) return null;

  const apiKey = user?.email || 'tfb_live_user_key';
  const PROD_API = 'https://tradefxbook-eta.vercel.app';
  const DEV_API = 'http://localhost:4000';
  const IS_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || (IS_DEV ? DEV_API : PROD_API)) + '/api/trades/mt5-sync';

  const copyToClipboard = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const downloadEaFile = () => {
    const element = document.createElement('a');
    const file = new Blob([MQL5_EA_CODE], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'TradeFXBook_EA.mq5';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-soft)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2981eb]/15 border border-[#2981eb]/30 text-[#5aa2f2] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[var(--text-hi)]">Exness MT5 Auto Sync (MQL5 EA)</h3>
              <p className="text-xs text-[var(--text-low)]">Sync open and closed trades from Exness MT5 automatically</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[var(--text-low)] hover:text-[var(--text-hi)] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] p-1.5 px-6 gap-2">
          <button
            onClick={() => setActiveTab('EA')}
            className={`flex-1 py-2 rounded-xl font-outfit text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'EA'
                ? 'bg-[#2981eb] text-white shadow-md'
                : 'text-[var(--text-mid)] hover:text-[var(--text-hi)]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            1. TradeFXBook EA (Automated Sync)
          </button>
          <button
            onClick={() => setActiveTab('API')}
            className={`flex-1 py-2 rounded-xl font-outfit text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'API'
                ? 'bg-[#2981eb] text-white shadow-md'
                : 'text-[var(--text-mid)] hover:text-[var(--text-hi)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            2. Sync Keys & Endpoints
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {activeTab === 'EA' && (
            <div className="space-y-4">
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-hi)] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2981eb] text-white flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                    Your Personal API Sync Key
                  </span>
                  <button
                    onClick={() => copyToClipboard(apiKey, setCopiedKey)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-soft)] text-xs font-mono font-semibold text-[#5aa2f2] hover:border-[#2981eb] cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-[#22c58b]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-[var(--text-hi)] bg-[var(--bg-panel)] border border-[var(--border-soft)] p-2.5 rounded-lg select-all truncate">
                  {apiKey}
                </div>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-hi)] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2981eb] text-white flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                    MT5 Webhook Sync Endpoint
                  </span>
                  <button
                    onClick={() => copyToClipboard(apiUrl, setCopiedUrl)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-soft)] text-xs font-mono font-semibold text-[#5aa2f2] hover:border-[#2981eb] cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#22c58b]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-[var(--text-hi)] bg-[var(--bg-panel)] border border-[var(--border-soft)] p-2.5 rounded-lg select-all truncate">
                  {apiUrl}
                </div>
              </div>

              {/* Steps Guide */}
              <div className="border border-[var(--border-soft)] rounded-xl p-4 bg-[var(--bg-panel)] space-y-2.5 text-xs text-[var(--text-mid)]">
                <h4 className="font-outfit font-bold text-sm text-[var(--text-hi)] mb-1">
                  How to setup TradeFXBook EA in Exness MT5:
                </h4>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#5aa2f2]">Step 1:</span>
                  <span>Open MT5 Terminal → Click <b>Tools</b> → <b>Options</b> → <b>Expert Advisors</b> tab → Check <b>"Allow WebRequest for listed URL"</b> and add: <code className="font-mono bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[var(--text-hi)]">{apiUrl}</code></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#5aa2f2]">Step 2:</span>
                  <span>Download the EA file below or open MetaEditor (F4) in MT5 and create a new EA script with the code below.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#5aa2f2]">Step 3:</span>
                  <span>Attach <b>TradeFXBook_EA</b> to any Exness MT5 chart, paste your <b>API Sync Key</b> in the EA settings input, and click OK!</span>
                </div>
                <div className="flex items-start gap-2 bg-[#f2b84b]/10 border border-[#f2b84b]/20 p-2 rounded-lg text-[var(--text-hi)]">
                  <span className="font-mono font-bold text-[#f2b84b]">Step 4:</span>
                  <span><b>CRITICAL:</b> Right-click inside your MT5 Terminal <b>History</b> tab at the bottom, select <b>"All History"</b> so the terminal caches all your trades (e.g. 200+). Otherwise MT5 will only sync a few trades!</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="text-[10px] text-[var(--text-low)] text-right">
                  * Note: To sync new trades instantly, reload the EA or wait for the next 10-minute sync.
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs font-semibold text-[var(--text-hi)] hover:bg-[var(--bg-hover)] cursor-pointer"
                  >
                    <Code className="w-4 h-4 text-[#5aa2f2]" />
                    <span>{showCode ? 'Hide MQL5 Code' : 'View Source Code'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const count = await handleSyncTrades();
                        alert(`Successfully synced ${count} trades!`);
                      }}
                      disabled={isSyncingTrades}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#22c58b]/20 text-[#22c58b] border border-[#22c58b]/40 hover:bg-[#22c58b]/30 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <RotateCw className={`w-4 h-4 ${isSyncingTrades ? 'animate-spin' : ''}`} />
                      <span>{isSyncingTrades ? 'Syncing...' : 'Sync Trades Now'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={downloadEaFile}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#2981eb] text-white hover:bg-[#5aa2f2] transition-colors shadow-lg shadow-[#2981eb]/20 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download EA</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Viewer Expandable */}
              {showCode && (
                <div className="relative rounded-xl border border-[var(--border-soft)] bg-black/80 p-4 font-mono text-[11px] text-[#22c58b] max-h-64 overflow-y-auto">
                  <button
                    onClick={() => copyToClipboard(MQL5_EA_CODE, setCopiedCode)}
                    className="absolute top-3 right-3 px-2 py-1 rounded bg-white/20 text-white text-[10px] hover:bg-white/30 cursor-pointer flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-[#22c58b]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                  <pre className="whitespace-pre-wrap">{MQL5_EA_CODE}</pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'API' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-xl p-4 space-y-3">
                <h4 className="font-outfit font-bold text-sm text-[var(--text-hi)]">HTTPS POST Payload Format for Custom Bots:</h4>
                <p className="text-[var(--text-low)]">If you are using Python, cTrader, or custom Webhook bots, send JSON POST requests to:</p>
                <div className="font-mono text-xs bg-[var(--bg-elevated)] border border-[var(--border-soft)] p-2.5 rounded-lg text-[#5aa2f2]">
                  POST {apiUrl}
                </div>
                <div className="font-mono text-[11px] bg-black/60 border border-[var(--border-soft)] p-3 rounded-xl text-[#22c58b]">
                  {`{
  "apiKey": "${apiKey}",
  "trades": [
    {
      "ticket": 98765432,
      "symbol": "EURUSD",
      "type": "BUY",
      "lots": 0.10,
      "openPrice": 1.08500,
      "closePrice": 1.08900,
      "pnl": 40.00,
      "commission": -0.50,
      "swap": -0.10,
      "openTime": "2026.07.31 10:00:00",
      "closeTime": "2026.07.31 14:30:00",
      "status": "CLOSED"
    }
  ]
}`}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

