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
#property version   "1.00"
#property description "Auto Sync trades from Exness MT5 to TradeFXBook Dashboard"

//--- Inputs
input string   InpApiKey       = "YOUR_API_KEY_HERE";                     // TradeFXBook API Key / User ID
input string   InpApiUrl       = "http://localhost:4000/api/trades/mt5-sync"; // Backend Sync Webhook URL
input int      InpSyncInterval = 10;                                      // Sync Frequency (Seconds)

int OnInit()
  {
   Print("TradeFXBook EA initialized. Syncing to: ", InpApiUrl);
   EventSetTimer(InpSyncInterval);
   SyncTrades();
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   EventKillTimer();
  }

void OnTimer()
  {
   SyncTrades();
  }

void OnTradeTransaction(const MqlTradeTransaction& trans, const MqlTradeRequest& request, const MqlTradeResult& result)
  {
   SyncTrades();
  }

void SyncTrades()
  {
   if(StringLen(InpApiKey) == 0 || InpApiKey == "YOUR_API_KEY_HERE")
     {
      Print("TradeFXBook EA Warning: Please enter your valid API Key in EA settings.");
      return;
     }

   string json = "{\\"apiKey\\":\\"" + InpApiKey + "\\",\\"trades\\":[";
   int count = 0;

   // 1. Scan Open Positions
   int totalPositions = PositionsTotal();
   for(int i = 0; i < totalPositions; i++)
     {
      ulong ticket = PositionGetTicket(i);
      if(ticket > 0)
        {
         string symbol = PositionGetString(POSITION_SYMBOL);
         long type = PositionGetInteger(POSITION_TYPE); // 0=BUY, 1=SELL
         double volume = PositionGetDouble(POSITION_VOLUME);
         double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
         double profit = PositionGetDouble(POSITION_PROFIT);
         double swap = PositionGetDouble(POSITION_SWAP);
         datetime openTime = (datetime)PositionGetInteger(POSITION_TIME);

         if(count > 0) json += ",";
         json += "{";
         json += "\\"ticket\\":" + IntegerToString(ticket) + ",";
         json += "\\"symbol\\":\\"" + symbol + "\\",";
         json += "\\"type\\":\\"" + (type == 0 ? "BUY" : "SELL") + "\\",";
         json += "\\"lots\\":" + DoubleToString(volume, 2) + ",";
         json += "\\"openPrice\\":" + DoubleToString(openPrice, 5) + ",";
         json += "\\"pnl\\":" + DoubleToString(profit, 2) + ",";
         json += "\\"swap\\":" + DoubleToString(swap, 2) + ",";
         json += "\\"openTime\\":\\"" + TimeToString(openTime, TIME_DATE|TIME_SECONDS) + "\\",";
         json += "\\"status\\":\\"OPEN\\"";
         json += "}";
         count++;
        }
     }

   // 2. Scan Closed History Deals
   if(HistorySelect(0, TimeCurrent()))
     {
      int totalDeals = HistoryDealsTotal();
      for(int i = MathMax(0, totalDeals - 50); i < totalDeals; i++)
        {
         ulong dealTicket = HistoryDealGetTicket(i);
         long entryType = HistoryDealGetInteger(dealTicket, DEAL_ENTRY);
         if(entryType == DEAL_ENTRY_OUT)
           {
            ulong orderTicket = HistoryDealGetInteger(dealTicket, DEAL_ORDER);
            string symbol = HistoryDealGetString(dealTicket, DEAL_SYMBOL);
            long type = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
            double volume = HistoryDealGetDouble(dealTicket, DEAL_VOLUME);
            double price = HistoryDealGetDouble(dealTicket, DEAL_PRICE);
            double profit = HistoryDealGetDouble(dealTicket, DEAL_PROFIT);
            double commission = HistoryDealGetDouble(dealTicket, DEAL_COMMISSION);
            double swap = HistoryDealGetDouble(dealTicket, DEAL_SWAP);
            datetime dealTime = (datetime)HistoryDealGetInteger(dealTicket, DEAL_TIME);

            if(count > 0) json += ",";
            json += "{";
            json += "\\"ticket\\":" + IntegerToString(orderTicket > 0 ? orderTicket : dealTicket) + ",";
            json += "\\"symbol\\":\\"" + symbol + "\\",";
            json += "\\"type\\":\\"" + (type == 0 ? "BUY" : "SELL") + "\\",";
            json += "\\"lots\\":" + DoubleToString(volume, 2) + ",";
            json += "\\"closePrice\\":" + DoubleToString(price, 5) + ",";
            json += "\\"pnl\\":" + DoubleToString(profit, 2) + ",";
            json += "\\"commission\\":" + DoubleToString(commission, 2) + ",";
            json += "\\"swap\\":" + DoubleToString(swap, 2) + ",";
            json += "\\"closeTime\\":\\"" + TimeToString(dealTime, TIME_DATE|TIME_SECONDS) + "\\",";
            json += "\\"status\\":\\"CLOSED\\"";
            json += "}";
            count++;
           }
        }
     }

   json += "]}";
   if(count == 0) return;

   char postData[];
   char result[];
   string resultHeaders;
   StringToCharArray(json, postData, 0, WHOLE_ARRAY, CP_UTF8);
   ArrayResize(postData, ArraySize(postData) - 1);

   string headers = "Content-Type: application/json\\r\\n";
   int res = WebRequest("POST", InpApiUrl, headers, 10000, postData, result, resultHeaders);
   if(res == 200)
     {
      Print("TradeFXBook Sync Success: ", CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8));
     }
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
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/api/trades/mt5-sync';

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
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
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

