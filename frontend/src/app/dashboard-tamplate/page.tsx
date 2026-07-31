"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Bell, Search, Clock, Plus, PanelLeft,
  BarChart2, Briefcase, TrendingUp, DollarSign,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

// ─── Page labels ──────────────────────────────────────────────────────────────
type NavKey =
  | "home" | "dashboard" | "trades" | "journal"
  | "performance" | "trade-analysis" | "market"
  | "ai-report" | "backtesting" | "traders-lounge"
  | "tools" | "settings" | "help"

const PAGE_LABELS: Record<NavKey, string> = {
  home:              "Home",
  dashboard:         "Dashboard",
  trades:            "Trades",
  journal:           "Journal",
  performance:       "Performance Analytics",
  "trade-analysis":  "Trade Analysis",
  market:            "Market Overview",
  "ai-report":       "AI Report",
  backtesting:       "Strategy Backtesting",
  "traders-lounge":  "Traders' Lounge",
  tools:             "Tools & Calculator",
  settings:          "Settings",
  help:              "Help & Support",
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, valueColor = "#eef1f8", gradient = false,
}: {
  label: string; value: string; sub: string
  valueColor?: string; gradient?: boolean
}) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-1 border`}
      style={{
        background: gradient
          ? "linear-gradient(160deg,#121a2c 0%,#10141d 55%)"
          : "#10141d",
        borderColor: gradient ? "#253156" : "#232a3a",
      }}
    >
      <span className="text-[12.5px] font-medium" style={{ color: "#8d94a8" }}>{label}</span>
      <span className="font-mono text-[27px] font-semibold tracking-tight leading-none" style={{ color: valueColor }}>{value}</span>
      <span className="text-[12px] mt-1" style={{ color: "#565e73" }}>{sub}</span>
    </div>
  )
}

// ─── Demo dashboard content ───────────────────────────────────────────────────
function DashboardContent({ active }: { active: NavKey }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total P&L"  value="-$692.00" sub="2 trades this month"  valueColor="#ff5c7a" gradient />
        <StatCard label="Unrealized" value="$0.00"    sub="0 open positions" />
        <StatCard label="Realized"   value="-$692.00" sub="2 closed trades"      valueColor="#ff5c7a" />
        <StatCard label="Win Rate"   value="0%"       sub="0 wins · 2 losses" />
      </div>

      {/* Chart + Trades */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        {/* Equity chart */}
        <div className="rounded-2xl border p-6" style={{ background: "#10141d", borderColor: "#232a3a" }}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest mb-1" style={{ color: "#565e73" }}>Performance</p>
              <span className="font-mono text-[26px] font-semibold" style={{ color: "#ff5c7a" }}>-$692.00</span>
              <span className="ml-2 text-[11.5px]" style={{ color: "#565e73" }}>last 30 days</span>
            </div>
            <div className="flex gap-1 rounded-[9px] border p-1" style={{ background: "#161b27", borderColor: "#232a3a" }}>
              {["1D","1W","1M"].map((t, i) => (
                <button key={t} className="rounded-[6px] px-3 py-1 text-[11.5px] font-semibold transition-colors"
                  style={{ background: i===2?"#1c2230":"transparent", color: i===2?"#f4f6fa":"#565e73" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 760 200" className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5c7a" stopOpacity="0.28"/>
                <stop offset="100%" stopColor="#ff5c7a" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[30,80,130,180].map(y => (
              <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="#1a2029" strokeWidth="1"/>
            ))}
            <path d="M0,40 L580,40 L650,115 L760,185 L760,200 L0,200 Z" fill="url(#chartGrad)"/>
            <path d="M0,40 L580,40 L650,115 L760,185" fill="none" stroke="#ff5c7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="760" cy="185" r="5" fill="#0a0d14" stroke="#ff5c7a" strokeWidth="2.5"/>
            <text x="4" y="14" fill="#565e73" fontSize="10" fontFamily="monospace">$0</text>
            <text x="4" y="196" fill="#565e73" fontSize="10" fontFamily="monospace">-$700</text>
          </svg>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border p-5 flex flex-col gap-1" style={{ background: "#10141d", borderColor: "#232a3a" }}>
          <h3 className="font-bold text-[15px] mb-3" style={{ color: "#eef1f8", fontFamily:"'Sora',sans-serif" }}>Recent Activity</h3>
          {[
            { pair:"EUR", sym:"EUR/USD", dir:"Long",  lots:"40", pnl:"-$440.00", date:"Jul 31", loss:true },
            { pair:"GBP", sym:"GBP/JPY", dir:"Short", lots:"36", pnl:"-$252.00", date:"Jul 31", loss:true },
            { pair:"XAU", sym:"XAU/USD", dir:"Long",  lots:"15", pnl:"+$264.00", date:"Jul 28", loss:false },
          ].map(t => (
            <div key={t.sym} className="flex items-center gap-3 border-b py-3 last:border-0 last:pb-0"
              style={{ borderColor:"#1a2029" }}>
              <div className="size-9 shrink-0 rounded-[10px] flex items-center justify-center font-mono text-[10px] font-bold"
                style={{ background:"#161b27", border:"1px solid #232a3a", color:"#8d94a8" }}>
                {t.pair}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold" style={{ color:"#eef1f8" }}>{t.sym}</span>
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ background: t.dir==="Long"?"rgba(0,217,163,0.12)":"rgba(255,92,122,0.12)", color: t.dir==="Long"?"#00d9a3":"#ff5c7a" }}>
                    {t.dir}
                  </span>
                </div>
                <span className="text-[11.5px]" style={{ color:"#565e73" }}>{t.lots} lots</span>
              </div>
              <div className="text-right">
                <div className="font-mono text-[14px] font-semibold" style={{ color: t.loss?"#ff5c7a":"#00d9a3" }}>{t.pnl}</div>
                <div className="text-[11px]" style={{ color:"#565e73" }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active page hint */}
      <div className="rounded-2xl border px-5 py-4"
        style={{ borderColor:"rgba(41,129,235,0.3)", background:"rgba(41,129,235,0.06)" }}>
        <span className="text-sm" style={{ color:"#8d94a8" }}>
          Active: <strong style={{ color:"#5aa2f2" }}>{PAGE_LABELS[active]}</strong>
          {" "}— Use the <strong style={{ color:"#f4f6fa" }}>sidebar toggle</strong> (top-left icon) to collapse and see icon-only mode.
        </span>
      </div>
    </div>
  )
}

// ─── Root page ────────────────────────────────────────────────────────────────
export default function DashboardTemplatePage() {
  const [active, setActive] = useState<NavKey>("home")

  return (
    /*
     * SidebarProvider injects CSS vars:
     *   --sidebar-background, --sidebar-foreground, --sidebar-primary,
     *   --sidebar-accent, --sidebar-accent-foreground, --sidebar-border, --sidebar-ring
     * We override them here to match TradeFXBook brand.
     */
    <SidebarProvider
      style={{
        // ── Sidebar shell ──────────────────────────────────
        "--sidebar-background":         "#0e1017",
        "--sidebar-foreground":         "#8d94a8",
        "--sidebar-border":             "#232a3a",
        "--sidebar-ring":               "#4c7dff",

        // ── Active / hover ──────────────────────────────────
        "--sidebar-primary":            "#4c7dff",
        "--sidebar-primary-foreground": "#ffffff",
        "--sidebar-accent":             "rgba(76,125,255,0.12)",
        "--sidebar-accent-foreground":  "#f4f6fa",

        // ── Sidebar width ───────────────────────────────────
        "--sidebar-width":              "264px",
        "--sidebar-width-icon":         "68px",

        // ── Page background ─────────────────────────────────
        "--background":                 "#0a0d14",
        "--foreground":                 "#f4f6fa",
      } as React.CSSProperties}
    >
      {/* ── Sidebar ─────────────────────────────────── */}
      <AppSidebar
        activeKey={active}
        onSelectKey={setActive}
      />

      {/* ── Main content ────────────────────────────── */}
      <SidebarInset
        style={{ background: "#0a0d14", color: "#f4f6fa" }}
        className="flex flex-col min-h-screen"
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[64px] shrink-0 items-center gap-3 border-b px-5 lg:px-8"
          style={{ background:"rgba(10,13,20,0.85)", borderColor:"#232a3a", backdropFilter:"blur(12px)" }}>

          {/* Sidebar toggle + separator */}
          <SidebarTrigger className="-ml-1 text-[#8d94a8] hover:text-[#f4f6fa]" />
          <Separator orientation="vertical" className="h-5 opacity-30" />

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-[18px] tracking-tight leading-tight truncate"
              style={{ color:"#eef1f8", fontFamily:"'Sora',sans-serif" }}>
              {PAGE_LABELS[active]}
            </h1>
            <span className="font-mono text-[11px]" style={{ color:"#565e73" }}>
              {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 rounded-[9px] border px-3 py-[7px] text-[13px] w-[240px] cursor-pointer"
              style={{ background:"#161b27", borderColor:"#232a3a", color:"#565e73" }}>
              <Search className="size-[14px] shrink-0" />
              <span className="flex-1">Search…</span>
              <span className="font-mono text-[10px] rounded px-1.5 py-0.5" style={{ background:"#1c2230", color:"#565e73" }}>⌘K</span>
            </div>

            {/* Clock */}
            <div className="hidden md:flex items-center gap-1.5 rounded-[9px] border px-3 py-[7px] font-mono text-[12px]"
              style={{ background:"#161b27", borderColor:"#232a3a", color:"#8d94a8" }}>
              <Clock className="size-3.5" />
              {new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}
            </div>

            {/* Add Trade */}
            <button className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
              style={{ background:"linear-gradient(135deg,#2981eb,#3a63d9)", boxShadow:"0 4px 16px rgba(41,129,235,0.3)" }}>
              <Plus className="size-4" />
              Add Trade
            </button>

            {/* Notification bell */}
            <button className="relative flex size-9 items-center justify-center rounded-[10px] border transition-colors"
              style={{ background:"#161b27", borderColor:"#232a3a", color:"#8d94a8" }}>
              <Bell className="size-[17px]" />
              <span className="absolute right-[9px] top-[8px] size-1.5 rounded-full" style={{ background:"#ff5c7a" }} />
            </button>

            {/* Avatar */}
            <div className="size-9 rounded-full flex items-center justify-center font-bold text-[13px] text-white cursor-pointer"
              style={{ background:"linear-gradient(135deg,#3a4356,#242a38)", border:"1px solid #2a3244" }}>
              SH
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          <DashboardContent active={active} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
