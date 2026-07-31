"use client"

import * as React from "react"
import Link from "next/link"
import {
  Home, LayoutDashboard, Briefcase, BookOpen, LineChart,
  TrendingUp, Sparkles, History, Users, Wrench,
  Settings, HelpCircle, ChevronRight, BarChart2,
  FileText, LogOut, ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"

// ─── Nav data ─────────────────────────────────────────────────────────────────
type NavKey =
  | "home" | "dashboard" | "trades" | "journal"
  | "performance" | "trade-analysis" | "market"
  | "ai-report" | "backtesting" | "traders-lounge"
  | "tools" | "settings" | "help"

interface NavItem {
  key: NavKey
  label: string
  href: string
  icon: React.ReactNode
  badge?: React.ReactNode
  children?: { key: NavKey; label: string; href: string; icon: React.ReactNode }[]
}

const PRO_BADGE = (
  <span className="ml-auto rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide"
    style={{ color: "#7aa0ff", background: "rgba(41,129,235,0.15)", border: "1px solid rgba(41,129,235,0.3)" }}>
    PRO
  </span>
)

const ELITE_BADGE = (
  <span className="ml-auto rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide"
    style={{ color: "#f5c451", background: "rgba(245,196,81,0.10)", border: "1px solid rgba(245,196,81,0.3)" }}>
    ELITE
  </span>
)

const MAIN_NAV: NavItem[] = [
  { key: "home",      label: "Home",      href: "/dashboard",       icon: <Home       className="size-[18px]" /> },
  { key: "dashboard", label: "Dashboard", href: "/dashboard/view",  icon: <LayoutDashboard className="size-[18px]" /> },
  { key: "trades",    label: "Trades",    href: "/dashboard/trades", icon: <Briefcase  className="size-[18px]" /> },
  { key: "journal",   label: "Journal",   href: "/dashboard/journal",icon: <BookOpen   className="size-[18px]" /> },
  {
    key: "performance", label: "Analysis", href: "/dashboard/performance",
    icon: <LineChart className="size-[18px]" />,
    children: [
      { key: "performance",    label: "Performance",   href: "/dashboard/performance",    icon: <BarChart2 className="size-[15px]" /> },
      { key: "trade-analysis", label: "Trade Analysis",href: "/dashboard/trade-analysis", icon: <FileText  className="size-[15px]" /> },
    ],
  },
  { key: "market",         label: "Market",         href: "/dashboard/market",         icon: <TrendingUp className="size-[18px]" /> },
  { key: "ai-report",      label: "AI Report",      href: "/dashboard/ai-report",      icon: <Sparkles  className="size-[18px]" />, badge: PRO_BADGE },
  { key: "backtesting",    label: "Backtesting",    href: "/dashboard/backtesting",    icon: <History   className="size-[18px]" />, badge: ELITE_BADGE },
  { key: "traders-lounge", label: "Traders Lounge", href: "/dashboard/traders-lounge", icon: <Users     className="size-[18px]" /> },
  { key: "tools",          label: "Tools",          href: "/dashboard/tools",          icon: <Wrench    className="size-[18px]" /> },
]

const BOTTOM_NAV: NavItem[] = [
  { key: "settings", label: "Settings",     href: "/dashboard/settings", icon: <Settings   className="size-[18px]" /> },
  { key: "help",     label: "Help & Support",href: "/dashboard/settings", icon: <HelpCircle className="size-[18px]" /> },
]

// ─── Active key prop ──────────────────────────────────────────────────────────
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeKey?: NavKey
  onSelectKey?: (key: NavKey) => void
}

// ─── User card shown in header ────────────────────────────────────────────────
function UserCard() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  if (collapsed) {
    return (
      <div className="flex justify-center py-1">
        <div className="relative size-9 rounded-full flex items-center justify-center font-bold text-[13px] text-white"
          style={{ background: "linear-gradient(135deg,#3a4356,#242a38)", border: "1px solid #2a3244" }}>
          SH
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2"
            style={{ background: "#00d9a3", borderColor: "#10141d" }} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex cursor-pointer items-center gap-2.5 rounded-[10px] p-2.5 transition-colors"
      style={{ background: "#161b27", border: "1px solid #232a3a" }}>
      <div className="relative size-9 shrink-0 rounded-full flex items-center justify-center font-bold text-[13px] text-white"
        style={{ background: "linear-gradient(135deg,#3a4356,#242a38)" }}>
        SH
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2"
          style={{ background: "#00d9a3", borderColor: "#161b27" }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[13.5px] font-semibold" style={{ color: "#f4f6fa" }}>Shakil</span>
          <span className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold" style={{ background: "#1c2230", color: "#8d94a8" }}>FREE</span>
        </div>
        <span className="block truncate text-[11px]" style={{ color: "#565e73" }}>xhakil2023@gmail.com</span>
      </div>
      <ChevronRight className="size-3.5 shrink-0" style={{ color: "#565e73" }} />
    </div>
  )
}

// ─── Single collapsible nav item ──────────────────────────────────────────────
function NavGroupItem({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem
  isActive: boolean
  onSelect: (key: NavKey) => void
}) {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const hasChildren = !!item.children?.length
  const [open, setOpen] = React.useState(isActive)

  if (hasChildren && !collapsed) {
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.label}
              isActive={isActive}
              className="w-full"
            >
              <span style={{ color: isActive ? "#7aa0ff" : undefined }}>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown className="ml-auto size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180"
                style={{ color: "#565e73" }} />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children!.map(child => (
                <SidebarMenuSubItem key={child.key}>
                  <SidebarMenuSubButton
                    isActive={isActive && child.key === item.key}
                    render={<Link href={child.href} onClick={() => onSelect(child.key)} />}
                  >
                    {child.icon}
                    <span>{child.label}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={isActive}
        render={<Link href={item.href} onClick={() => onSelect(item.key)} />}
      >
        <span style={{ color: isActive ? "#7aa0ff" : undefined }}>{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.badge && !collapsed && item.badge}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// ─── Main exported component ──────────────────────────────────────────────────
export function AppSidebar({ activeKey = "home", onSelectKey, ...props }: AppSidebarProps) {
  const handleSelect = (key: NavKey) => {
    onSelectKey?.(key)
  }

  return (
    <Sidebar collapsible="icon" {...props}>

      {/* ── Header: Brand + User ─── */}
      <SidebarHeader className="gap-3 pb-3" style={{ borderBottom: "1px solid #232a3a" }}>
        {/* Brand */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="TradeFXBook"
              render={<Link href="/dashboard" />}
            >
              {/* Logo mark */}
              <div className="flex aspect-square size-9 items-center justify-center rounded-xl font-black text-white text-[13px]"
                style={{ background: "linear-gradient(135deg,#4c7dff,#2255d6)", boxShadow: "0 6px 18px -6px rgba(76,125,255,.5)" }}>
                FX
              </div>
              {/* Brand text */}
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[15px] tracking-tight" style={{ color: "#f4f6fa" }}>
                  TradeFX<span style={{ color: "#7aa0ff" }}>Book</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: "#565e73" }}>
                  Beta
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User card */}
        <UserCard />
      </SidebarHeader>

      {/* ── Content: Main nav ─── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: "#565e73" }}>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {MAIN_NAV.map(item => (
              <NavGroupItem
                key={item.key}
                item={item}
                isActive={activeKey === item.key || item.children?.some(c => c.key === activeKey) === true}
                onSelect={handleSelect}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: Support + logout ─── */}
      <SidebarFooter style={{ borderTop: "1px solid #232a3a" }}>
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: "#565e73" }}>Support</SidebarGroupLabel>
          <SidebarMenu>
            {BOTTOM_NAV.map(item => (
              <NavGroupItem
                key={item.key}
                item={item}
                isActive={activeKey === item.key}
                onSelect={handleSelect}
              />
            ))}

            {/* Logout */}
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign Out"
                className="text-[#ef4b5c]/80 hover:text-[#ef4b5c] hover:bg-[rgba(239,75,92,0.1)]"
              >
                <LogOut className="size-[18px]" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
