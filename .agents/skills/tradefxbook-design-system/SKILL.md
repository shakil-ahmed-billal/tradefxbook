---
name: tradefxbook-design-system
description: Design system guidelines, UI tokens, color palette, layout rules, and component styling standards for TradeFXBook web application.
---

# TradeFXBook UI Design System & Component Guidelines

This document outlines the official design system, theme tokens, typography, and component architecture for the TradeFXBook trading suite. All future AI coding agents working on this workspace MUST strictly follow these rules to maintain design consistency across all pages.

---

## 🎨 1. Theme Color System (CSS Variables)

TradeFXBook uses a dynamic **CSS Variable Theme System** with complete Light and Dark Mode support. **NEVER hardcode static dark colors (e.g. `bg-[#10141d]`, `bg-[#0e1017]`) or hardcode white text (`text-[#eef1f8]`, `text-[#f4f6fa]`) in JSX without using theme variables.**

### CSS Variables Reference (`globals.css`)

| CSS Variable | Light Theme Value | Dark Theme Value | Recommended Usage |
| :--- | :--- | :--- | :--- |
| `var(--bg-deep)` | `#f8fafc` | `#090b10` | Overall app background |
| `var(--bg-panel)` | `#ffffff` | `#0e1017` | Cards, modals, main containers |
| `var(--bg-elevated)`| `#f1f5f9` | `#141824` | Inner boxes, stat items, search inputs |
| `var(--bg-hover)` | `#e2e8f0` | `#1a1f2c` | Button & list item hover state |
| `var(--border)` | `#e2e8f0` | `#212636` | Primary structural borders |
| `var(--border-soft)`| `#cbd5e1` | `#1a1e2b` | Card borders, dividers, subtle outlines |
| `var(--text-hi)` | `#0f172a` | `#f4f6fa` | Main headings, primary values, active text |
| `var(--text-mid)` | `#475569` | `#9aa2b3` | Labels, secondary titles, icons |
| `var(--text-low)` | `#64748b` | `#5c6478` | Subtitles, timestamps, footers |
| `var(--accent)` | `#2981eb` | `#2981eb` | Primary brand blue (#2981eb) |
| `var(--accent-soft)`| `#5aa2f2` | `#5aa2f2` | Soft blue highlights |

### Financial Outcome Colors
- **Profit / Winning Trades**: `#22c58b` / `#10b981` (Green) | Dim bg: `rgba(34, 197, 139, 0.12)`
- **Loss / Losing Trades**: `#ef4b5c` / `#ef4444` (Red) | Dim bg: `rgba(239, 75, 92, 0.12)`
- **Gold / Accent Badges**: `#f2b84b` / `#f59e0b` (Amber Gold)
- **Purple / AI Indicators**: `#a78bfa` / `#8b5cf6` (Gemini Purple)

---

## 🔤 2. Typography Standards

TradeFXBook uses 4 Google Fonts configured in Next.js:
- **`font-sora`**: Page titles, hero banners, section headers.
- **`font-outfit`**: Brand logos, metric titles, card titles.
- **`font-inter`**: Body copy, descriptions, form inputs, button labels.
- **`font-mono`** (`JetBrains Mono`): Prices, P&L numbers, timestamps, lot sizes, percentages.

---

## 📐 3. Desktop App Layout Architecture

TradeFXBook uses a **Strict Desktop Application Shell** (similar to Figma, VS Code, Notion):

```tsx
<div className="h-screen w-screen overflow-hidden bg-[var(--bg-deep)] text-[var(--text-hi)] font-inter flex">
  {/* 1. Left Fixed Sidebar */}
  <Sidebar />

  {/* 2. Right Main Column */}
  <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
    {/* Fixed TopBar Header */}
    <TopBar />

    {/* Scrollable View Area — All pages render inside <main> */}
    <main className="flex-1 overflow-y-auto p-4 lg:p-5 w-full">
      {children}
    </main>
  </div>
</div>
```

### Layout Rules:
1. **Zero Outer Window Scroll**: The main browser viewport NEVER scrolls (`h-screen overflow-hidden`).
2. **Scroll Container**: `<main>` handles internal scrolling (`overflow-y-auto`).
3. **Inner Sticky Sidebars** (e.g. Journal & Trade Analysis):
   ```tsx
   <div className="lg:sticky lg:top-0 self-start h-[calc(100vh-104px)] max-h-[calc(100vh-104px)] flex flex-col">
   ```
   Setting `self-start` prevents flexbox stretching, ensuring sidebars remain locked in place when scrolling.

---

## 🧩 4. Component Patterns

### Cards & Panels
```tsx
<div className="bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-2xl p-5 shadow-lg">
  {/* Content */}
</div>
```

### Sub-Boxes & Stat Items
```tsx
<div className="bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl p-3.5">
  <span className="text-xs text-[var(--text-low)] block mb-1">Label</span>
  <span className="font-mono text-base font-semibold text-[var(--text-hi)]">$1,250.00</span>
</div>
```

### Primary Buttons
```tsx
<button className="px-4 py-2.5 rounded-xl bg-[#2981eb] text-white text-xs font-bold hover:bg-[#5aa2f2] transition-all shadow-md shadow-[#2981eb]/20 cursor-pointer">
  Action Label
</button>
```

### Secondary / Ghost Buttons
```tsx
<button className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs font-semibold text-[var(--text-hi)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer">
  Cancel
</button>
```

### Form Inputs & Selects
```tsx
<input 
  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-soft)] text-xs text-[var(--text-hi)] placeholder:text-[var(--text-low)] focus:outline-none focus:border-[#2981eb] transition-colors"
/>
```

---

## ⚠️ 5. Critical Guidelines for AI Assistants

1. **Obey Theme Toggles**: Test all UI changes in both Light Mode (`:root`) and Dark Mode (`.dark`).
2. **Never Use Unescaped Wildcard Selectors**: Avoid `[class*="bg-[#..."]` in CSS because it breaks Tailwind hover classes.
3. **Cursor Pointer**: Always add `cursor-pointer` to interactive buttons, chips, and clickable table rows.
4. **Clean Builds**: Always verify code correctness with `pnpm run build` after completing edits.
