# TradeFXBook — Backend Documentation
### Node.js + Express + PostgreSQL + Prisma

This document is a complete backend build guide for the TradeFXBook trading journal — covering every page redesigned so far (**Dashboard**, **Analysis → Performance**, **Analysis → Trade Analysis**, **Trades**). It includes the full database schema, API contract, business-logic formulas, folder structure, and setup steps needed to build the backend from scratch with **Node.js, PostgreSQL, and Prisma**.

> Note: your GitHub repo (`shakil-ahmed-billal/tradefxbook`) already has `backend/` and `frontend/` folders, but the file tree couldn't be crawled from here (GitHub blocks automated folder browsing). This doc is built directly from the frontend pages you shared, so it may not match 1:1 with whatever scaffolding already exists in `backend/` — treat it as the target spec to reconcile against your existing code, not a guaranteed continuation of it.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20+ |
| Web framework | Express 4 |
| ORM | Prisma 5 |
| Database | PostgreSQL 15+ |
| Auth | Clerk (matches the `pk_live_...` key already in your frontend) — verified server-side with `@clerk/backend` |
| Validation | Zod |
| Scheduler (MT4/MT5 sync, Pro/Elite only) | BullMQ + Redis (optional, stub it for now) |
| Language | TypeScript |

---

## 2. Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── index.ts                  # app entrypoint
│   ├── config/
│   │   └── env.ts
│   ├── lib/
│   │   ├── prisma.ts             # Prisma client singleton
│   │   └── clerk.ts              # Clerk SDK setup
│   ├── middleware/
│   │   ├── requireAuth.ts        # verifies Clerk session → attaches req.userId
│   │   ├── requirePlan.ts        # gate PRO/ELITE features
│   │   └── errorHandler.ts
│   ├── modules/
│   │   ├── trades/
│   │   │   ├── trades.routes.ts
│   │   │   ├── trades.controller.ts
│   │   │   ├── trades.service.ts
│   │   │   └── trades.schema.ts  # zod validators
│   │   ├── dashboard/
│   │   │   ├── dashboard.routes.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   └── dashboard.service.ts
│   │   ├── analysis/
│   │   │   ├── analysis.routes.ts
│   │   │   ├── analysis.controller.ts
│   │   │   └── analysis.service.ts
│   │   ├── journal/
│   │   │   ├── journal.routes.ts
│   │   │   ├── journal.controller.ts
│   │   │   └── journal.service.ts
│   │   ├── brokerAccounts/
│   │   │   └── ... (MT4/MT5 connect, Pro/Elite)
│   │   └── users/
│   │       ├── users.routes.ts
│   │       └── users.webhook.ts  # Clerk webhook → upsert User row
│   └── utils/
│       ├── metrics.ts            # win rate, profit factor, expectancy, drawdown
│       ├── session.ts            # Asian/London/NY session classification
│       └── quality.ts            # Trade Quality Score (0–100)
├── .env
├── package.json
└── tsconfig.json
```

---

## 3. Environment Variables (`.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tradefxbook?schema=public"
PORT=4000
NODE_ENV=development

CLERK_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxx"
CLERK_PUBLISHABLE_KEY="pk_live_Y2xlcmsudHJhZGVmeGJvb2suY29tJA"
CLERK_WEBHOOK_SECRET="whsec_xxxxxxxxxxxx"

REDIS_URL="redis://localhost:6379"   # optional, only for MT4/MT5 sync jobs
```

---

## 4. Database Schema (`prisma/schema.prisma`)

This schema covers every field visible across the Dashboard, Analysis, Trade Analysis, and Trades pages: entry/exit price, lots, P&L, source (manual vs MT4/MT5), journal entries with the 4-part execution checklist, self-rating, and broker account connections for the Pro/Elite upsell.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PlanTier {
  FREE
  PRO
  ELITE
}

enum TradeType {
  LONG
  SHORT
}

enum TradeSource {
  MANUAL
  MT4
  MT5
}

enum TradeStatus {
  OPEN
  CLOSED
}

enum BrokerPlatform {
  MT4
  MT5
}

enum SyncStatus {
  CONNECTED
  DISCONNECTED
  SYNCING
  ERROR
}

model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  name          String?
  avatarUrl     String?
  plan          PlanTier  @default(FREE)
  timezone      String    @default("UTC")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  trades          Trade[]
  brokerAccounts  BrokerAccount[]

  @@map("users")
}

model BrokerAccount {
  id            String          @id @default(cuid())
  userId        String
  user          User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  platform      BrokerPlatform
  accountNumber String
  server        String
  syncStatus    SyncStatus      @default(DISCONNECTED)
  lastSyncedAt  DateTime?
  createdAt     DateTime        @default(now())

  trades        Trade[]

  @@map("broker_accounts")
}

model Trade {
  id              String        @id @default(cuid())
  userId          String
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  brokerAccountId String?
  brokerAccount   BrokerAccount? @relation(fields: [brokerAccountId], references: [id])

  symbol          String        // e.g. "EUR/USD", "XAU/USD"
  type            TradeType
  status          TradeStatus   @default(CLOSED)
  source          TradeSource   @default(MANUAL)

  entryPrice      Decimal       @db.Decimal(18, 5)
  exitPrice       Decimal?      @db.Decimal(18, 5)
  quantity        Decimal       @db.Decimal(18, 2)   // lots / units

  pnl             Decimal?      @db.Decimal(18, 2)
  commission      Decimal       @default(0) @db.Decimal(18, 2)
  swap            Decimal       @default(0) @db.Decimal(18, 2)

  openedAt        DateTime
  closedAt        DateTime?

  notes           String?

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  journalEntry    JournalEntry?

  @@index([userId, openedAt])
  @@index([userId, symbol])
  @@map("trades")
}

model JournalEntry {
  id              String   @id @default(cuid())
  tradeId         String   @unique
  trade           Trade    @relation(fields: [tradeId], references: [id], onDelete: Cascade)

  preAnalysis     String?
  postReview      String?
  emotions        String?
  lessons         String?

  // Execution checklist — 10 pts each, feeds Trade Quality Score
  followedPlan    Boolean  @default(false)
  properRisk      Boolean  @default(false)
  goodEntry       Boolean  @default(false)
  patientExit     Boolean  @default(false)

  selfRating      Int?     // 1–10, feeds Trade Quality Score

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("journal_entries")
}
```

Run:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 5. Auth: Clerk → Postgres

The frontend already uses Clerk (`ClientClerkProvider`, `pk_live_...`). The backend never re-implements login — it just verifies the Clerk session token on every request and keeps a mirrored `User` row for relational joins (trades, journal, etc.).

**`src/lib/clerk.ts`**
```ts
import { createClerkClient } from '@clerk/backend';

export const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});
```

**`src/middleware/requireAuth.ts`**
```ts
import { Request, Response, NextFunction } from 'express';
import { clerk } from '../lib/clerk';
import { prisma } from '../lib/prisma';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization; // "Bearer <session_token>"
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.replace('Bearer ', '');
    const claims = await clerk.verifyToken(token);

    const user = await prisma.user.findUnique({ where: { clerkId: claims.sub } });
    if (!user) return res.status(401).json({ error: 'User not found. Sync pending.' });

    req.userId = user.id;
    req.userPlan = user.plan;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
}
```

**Clerk webhook — keeps `users` table in sync** (`src/modules/users/users.webhook.ts`):
```ts
import { Router } from 'express';
import { Webhook } from 'svix';
import { prisma } from '../../lib/prisma';

const router = Router();

router.post('/webhooks/clerk', async (req, res) => {
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(JSON.stringify(req.body), req.headers as any) as any;

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses[0]?.email_address,
        name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
        avatarUrl: image_url,
      },
      create: {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
        avatarUrl: image_url,
      },
    });
  }

  res.status(200).send('ok');
});

export default router;
```

Register this route **before** `express.json()` body parsing for the raw-body signature check, per Svix's requirements.

---

## 6. Plan Gating (Free / Pro / Elite)

Matches what the UI already shows: Free = 15-trade history cap + manual entry only; Pro = MT4/MT5 auto-sync (3 accounts) + AI Report; Elite = unlimited accounts + Backtesting.

**`src/middleware/requirePlan.ts`**
```ts
import { Request, Response, NextFunction } from 'express';
import { PlanTier } from '@prisma/client';

const rank: Record<PlanTier, number> = { FREE: 0, PRO: 1, ELITE: 2 };

export function requirePlan(min: PlanTier) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (rank[req.userPlan as PlanTier] < rank[min]) {
      return res.status(403).json({ error: `Requires ${min} plan or higher` });
    }
    next();
  };
}
```

Free-plan trade history cap is applied inside the trades service (see §8) — `take: 15` when `user.plan === 'FREE'`, exactly matching the banner text: *"Free plan loads your last 15 trades."*

---

## 7. Business Logic (`src/utils/metrics.ts`)

All the numbers shown across Dashboard/Analysis are derived, not stored — compute them on read from the `trades` table.

```ts
import { Decimal } from '@prisma/client/runtime/library';

export interface TradeLike {
  pnl: Decimal | null;
  entryPrice: Decimal;
  exitPrice: Decimal | null;
  openedAt: Date;
  closedAt: Date | null;
}

export function totalPnl(trades: TradeLike[]) {
  return trades.reduce((sum, t) => sum + Number(t.pnl ?? 0), 0);
}

export function winRate(trades: TradeLike[]) {
  const closed = trades.filter(t => t.pnl !== null);
  if (closed.length === 0) return 0;
  const wins = closed.filter(t => Number(t.pnl) > 0).length;
  return (wins / closed.length) * 100;
}

export function profitFactor(trades: TradeLike[]) {
  const grossProfit = trades.filter(t => Number(t.pnl) > 0)
    .reduce((s, t) => s + Number(t.pnl), 0);
  const grossLoss = Math.abs(trades.filter(t => Number(t.pnl) < 0)
    .reduce((s, t) => s + Number(t.pnl), 0));
  if (grossLoss === 0) return grossProfit > 0 ? Infinity : 0;
  return grossProfit / grossLoss;
}

export function expectancy(trades: TradeLike[]) {
  const closed = trades.filter(t => t.pnl !== null);
  if (closed.length === 0) return 0;
  return totalPnl(closed) / closed.length;
}

export function avgWinner(trades: TradeLike[]) {
  const wins = trades.filter(t => Number(t.pnl) > 0);
  if (!wins.length) return 0;
  return wins.reduce((s, t) => s + Number(t.pnl), 0) / wins.length;
}

export function avgLoser(trades: TradeLike[]) {
  const losses = trades.filter(t => Number(t.pnl) < 0);
  if (!losses.length) return 0;
  return losses.reduce((s, t) => s + Number(t.pnl), 0) / losses.length;
}

// Longest streak of consecutive winning / losing trades, in chronological order
export function maxStreak(trades: TradeLike[], kind: 'win' | 'loss') {
  const sorted = [...trades].sort((a, b) => a.openedAt.getTime() - b.openedAt.getTime());
  let max = 0, current = 0;
  for (const t of sorted) {
    const isMatch = kind === 'win' ? Number(t.pnl) > 0 : Number(t.pnl) < 0;
    current = isMatch ? current + 1 : 0;
    max = Math.max(max, current);
  }
  return max;
}

// Cumulative equity curve — [{ date, cumulativePnl }]
export function equityCurve(trades: TradeLike[]) {
  const sorted = [...trades]
    .filter(t => t.closedAt)
    .sort((a, b) => a.closedAt!.getTime() - b.closedAt!.getTime());

  let running = 0;
  return sorted.map(t => {
    running += Number(t.pnl ?? 0);
    return { date: t.closedAt, cumulativePnl: running };
  });
}

// Max drawdown from the equity curve (peak-to-trough, in currency and %)
export function maxDrawdown(curve: { cumulativePnl: number }[]) {
  let peak = 0, maxDD = 0;
  for (const point of curve) {
    peak = Math.max(peak, point.cumulativePnl);
    maxDD = Math.min(maxDD, point.cumulativePnl - peak);
  }
  const maxDDPct = peak !== 0 ? (maxDD / peak) * 100 : 0;
  return { amount: maxDD, percent: maxDDPct };
}

export function holdDuration(t: TradeLike) {
  if (!t.closedAt) return null;
  return t.closedAt.getTime() - t.openedAt.getTime(); // ms — format as "1d 6h" in the controller
}

export function priceMovePct(t: TradeLike) {
  if (!t.exitPrice) return null;
  const entry = Number(t.entryPrice);
  const exit = Number(t.exitPrice);
  return ((exit - entry) / entry) * 100;
}
```

### Trading-session classification (`src/utils/session.ts`)

Matches the Session Performance card exactly: Asian 22:00–08:00 UTC, London 08:00–13:00 UTC, New York 13:00–22:00 UTC.

```ts
export type Session = 'ASIAN' | 'LONDON' | 'NEW_YORK';

export function classifySession(openedAt: Date): Session {
  const hour = openedAt.getUTCHours();
  if (hour >= 22 || hour < 8) return 'ASIAN';
  if (hour >= 8 && hour < 13) return 'LONDON';
  return 'NEW_YORK';
}
```

### Trade Quality Score (`src/utils/quality.ts`)

Matches the breakdown shown in the Trade Analysis "How is this calculated?" panel: Profitability 30 pts, Execution 40 pts (10 pts × 4 checklist items), Journal 20 pts (5 pts × 4 fields present), Rating 10 pts (self-rating 1–10).

```ts
import { JournalEntry, Trade } from '@prisma/client';

export function tradeQualityScore(trade: Trade, journal: JournalEntry | null) {
  // Profitability — 30 pts
  let profitability = 0;
  if (trade.pnl !== null) {
    const pnl = Number(trade.pnl);
    profitability = pnl > 0 ? 30 : pnl === 0 ? 15 : 0;
  }

  // Execution — 40 pts (10 pts each)
  const execFlags = journal
    ? [journal.followedPlan, journal.properRisk, journal.goodEntry, journal.patientExit]
    : [false, false, false, false];
  const execution = execFlags.filter(Boolean).length * 10;

  // Journal — 20 pts (5 pts each field with content)
  const journalFields = journal
    ? [journal.preAnalysis, journal.postReview, journal.emotions, journal.lessons]
    : [null, null, null, null];
  const journalScore = journalFields.filter(f => !!f && f.trim().length > 0).length * 5;

  // Rating — 10 pts (selfRating is already 1–10)
  const rating = journal?.selfRating ?? 0;

  const total = profitability + execution + journalScore + rating;

  const grade =
    total >= 80 ? 'excellent' :
    total >= 60 ? 'good' :
    total >= 40 ? 'average' : 'needs-work';

  return {
    total,
    breakdown: { profitability, execution, journal: journalScore, rating },
    grade,
  };
}
```

---

## 8. API Endpoints

Base URL: `/api`. Every route below requires `Authorization: Bearer <clerk_session_token>` and runs through `requireAuth`.

### 8.1 Dashboard page

| Method | Route | Returns |
|---|---|---|
| GET | `/dashboard/stats` | Total P&L, Unrealized, Realized, Win Rate, trade counts — the 4 stat cards |
| GET | `/dashboard/performance?range=1D\|1W\|1M\|3M\|ALL` | `{ value, points: [{date, cumulativePnl}] }` for the Performance chart |
| GET | `/dashboard/open-positions` | Currently open trades (`status = OPEN`) |
| GET | `/dashboard/recent-activity?limit=10` | Latest closed trades for the Recent Activity list |
| GET | `/dashboard/calendar?month=2026-07` | Daily P&L map + weekly rollups for the Monthly P&L calendar |
| GET | `/dashboard/top-performers?limit=5` | Symbols ranked by P&L |
| GET | `/dashboard/quick-stats` | Avg Win, Avg Loss, Best Trade, Worst Trade, Profit Factor |

**Example — `GET /dashboard/stats` service**
```ts
export async function getDashboardStats(userId: string) {
  const trades = await prisma.trade.findMany({ where: { userId } });
  const closed = trades.filter(t => t.status === 'CLOSED');
  const open = trades.filter(t => t.status === 'OPEN');

  return {
    totalPnl: totalPnl(closed),
    unrealizedPnl: totalPnl(open),        // requires live price feed for true mark-to-market; 0 until MT4/MT5 sync exists
    realizedPnl: totalPnl(closed),
    winRate: winRate(closed),
    totalTradesCount: trades.length,
    openPositionsCount: open.length,
    closedTradesCount: closed.length,
  };
}
```

### 8.2 Trades page

| Method | Route | Notes |
|---|---|---|
| GET | `/trades?page=1&limit=15&symbol=&type=&source=&from=&to=` | Free plan hard-caps `limit` at 15 and ignores `from`/`to` beyond the most recent 15 rows |
| POST | `/trades` | Create a manual trade (`source: MANUAL` only on Free plan) |
| GET | `/trades/:id` | Full trade detail — powers Trade Analysis page |
| PUT | `/trades/:id` | Edit trade (one-time edit, per the UI tooltip) |
| DELETE | `/trades/:id` | Delete one trade |
| DELETE | `/trades` | "Clear All" button |
| POST | `/trades/:id/share` | Generates a shareable read-only link/token |

**Free-plan cap, applied in the service layer:**
```ts
export async function listTrades(userId: string, plan: PlanTier, query: TradesQuery) {
  const take = plan === 'FREE' ? 15 : (query.limit ?? 50);
  return prisma.trade.findMany({
    where: {
      userId,
      symbol: query.symbol ? { contains: query.symbol, mode: 'insensitive' } : undefined,
      type: query.type,
      source: query.source,
    },
    orderBy: { openedAt: 'desc' },
    take,
    skip: plan === 'FREE' ? 0 : ((query.page ?? 1) - 1) * take,
  });
}
```

**Broker connect (Pro/Elite upsell → real feature once built):**

| Method | Route | Plan |
|---|---|---|
| POST | `/broker-accounts` | PRO+ (`{ platform, accountNumber, server, password }`) |
| GET | `/broker-accounts` | PRO+ |
| DELETE | `/broker-accounts/:id` | PRO+ |
| POST | `/broker-accounts/:id/sync` | PRO+ — enqueues a BullMQ job that pulls trade history from the broker bridge and upserts `Trade` rows with `source: MT4` or `MT5` |

### 8.3 Analysis → Performance page

| Method | Route | Powers |
|---|---|---|
| GET | `/analysis/metrics?range=` | Total P&L, Win Rate, Profit Factor, Expectancy cards |
| GET | `/analysis/quick-stats?range=` | Avg Winner/Loser, Best/Worst Trade, Win/Loss Streak, Risk:Reward, Open Trades |
| GET | `/analysis/equity-curve?range=&mode=equity\|drawdown` | Equity Curve chart (or drawdown view) |
| GET | `/analysis/direction?range=` | Long vs Short P&L + win % |
| GET | `/analysis/day-performance?range=` | P&L bars per weekday (Mon–Sun) |
| GET | `/analysis/top-symbols?range=&limit=` | Top Symbols card |
| GET | `/analysis/sessions?range=` | Asian/London/New York breakdown |
| GET | `/analysis/calendar?month=` | Trading Calendar heatmap (shared logic with dashboard calendar, but scoped to filters) |
| GET | `/analysis/calendar/:date/trades` | Trades for the clicked calendar day (Day Trades panel) |
| GET | `/analysis/distribution?range=` | Win/Loss Distribution bar + gross profit/loss/net |
| GET | `/analysis/recent-trades?limit=10` | Recent Trades card |
| GET | `/analysis/stats-summary?range=` | The full "Your Stats" two-table breakdown (best/worst/avg month, all 30-ish rows) |

**Example — sessions endpoint:**
```ts
export async function getSessionPerformance(userId: string, range: DateRange) {
  const trades = await prisma.trade.findMany({
    where: { userId, status: 'CLOSED', openedAt: { gte: range.from, lte: range.to } },
  });

  const bySession = { ASIAN: [], LONDON: [], NEW_YORK: [] } as Record<Session, typeof trades>;
  for (const t of trades) bySession[classifySession(t.openedAt)].push(t);

  return Object.fromEntries(
    Object.entries(bySession).map(([session, list]) => [
      session,
      {
        trades: list.length,
        pnl: totalPnl(list),
        winRate: winRate(list),
        avgTrade: expectancy(list),
        volumePct: trades.length ? (list.length / trades.length) * 100 : 0,
      },
    ])
  );
}
```

### 8.4 Analysis → Trade Analysis page

| Method | Route | Powers |
|---|---|---|
| GET | `/trades/:id/full` | Header (symbol, outcome, score), stat grid (entry/exit/qty/price move), duration |
| GET | `/trades/:id/journal` | Journal Entry panel |
| PUT | `/trades/:id/journal` | Create/update journal (preAnalysis, postReview, emotions, lessons, checklist, selfRating) |
| GET | `/trades/:id/quality` | Trade Quality Score + breakdown (`tradeQualityScore`) |
| GET | `/trades/:id/comparison` | "vs Your Average" — vs avg winner/loser %, hold-duration delta |
| GET | `/trades?filter=all\|winners\|losers&limit=` | Sidebar trade list + tab counts |

**Example controller — full trade detail:**
```ts
export async function getTradeFull(req: Request, res: Response) {
  const trade = await prisma.trade.findFirst({
    where: { id: req.params.id, userId: req.userId },
    include: { journalEntry: true },
  });
  if (!trade) return res.status(404).json({ error: 'Trade not found' });

  const allClosed = await prisma.trade.findMany({
    where: { userId: req.userId, status: 'CLOSED' },
  });

  const quality = tradeQualityScore(trade, trade.journalEntry);
  const durationMs = holdDuration(trade);
  const comparableSet = Number(trade.pnl) < 0
    ? allClosed.filter(t => Number(t.pnl) < 0)
    : allClosed.filter(t => Number(t.pnl) > 0);
  const avgComparable = Number(trade.pnl) < 0 ? avgLoser(allClosed) : avgWinner(allClosed);

  res.json({
    trade,
    quality,
    priceMovePct: priceMovePct(trade),
    durationMs,
    comparison: {
      vsAverage: avgComparable,
      diffPct: avgComparable !== 0
        ? ((Number(trade.pnl) - avgComparable) / Math.abs(avgComparable)) * 100
        : 0,
    },
  });
}
```

---

## 9. Sample Express Wiring (`src/index.ts`)

```ts
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import usersWebhook from './modules/users/users.webhook';
import tradesRoutes from './modules/trades/trades.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import analysisRoutes from './modules/analysis/analysis.routes';
import journalRoutes from './modules/journal/journal.routes';

const app = express();

app.use(cors());
app.use('/api', usersWebhook);          // raw body route registered first
app.use(express.json());

app.use('/api/trades', tradesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/journal', journalRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));
```

---

## 10. Response Shape Conventions

Keep every list endpoint consistent so the frontend can reuse one fetch hook:

```json
{
  "data": [ /* rows */ ],
  "meta": {
    "total": 2,
    "page": 1,
    "limit": 15,
    "planCap": true
  }
}
```

Money fields are always returned as **numbers rounded to 2 decimals** (not strings) so the frontend's `JetBrains Mono` odometer components can format them directly:
```json
{ "pnl": -440.00, "entryPrice": 63.0000, "exitPrice": 52.0000 }
```

---

## 11. package.json (backend)

```json
{
  "name": "tradefxbook-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:migrate": "prisma migrate dev",
    "prisma:generate": "prisma generate",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@clerk/backend": "^1.0.0",
    "@prisma/client": "^5.20.0",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "svix": "^1.24.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.0",
    "prisma": "^5.20.0",
    "tsx": "^4.16.0",
    "typescript": "^5.5.0"
  }
}
```

---

## 12. Setup Steps (from zero)

```bash
mkdir backend && cd backend
npm init -y
npm install express cors @prisma/client @clerk/backend svix zod
npm install -D typescript tsx prisma @types/express @types/node

npx tsc --init
npx prisma init          # creates prisma/schema.prisma + .env

# paste the schema from §4, then:
npx prisma migrate dev --name init
npx prisma generate

# create the folder structure from §2, paste code from §5–9
npm run dev
```

Set up the Clerk webhook in the Clerk Dashboard → Webhooks, pointing to `https://your-api.com/api/webhooks/clerk`, subscribed to `user.created` and `user.updated`.

---

## 13. What's Still a Stub vs. Fully Real

Being upfront about what this doc gives you working logic for vs. what still needs external integration:

- **Fully computable from Postgres today:** all Dashboard stats, all Analysis metrics/charts/calendar, Trade Analysis quality score, journal CRUD, manual trade CRUD.
- **Needs an external piece before it's real:** MT4/MT5 auto-sync (needs a broker bridge — e.g., a small MetaTrader Expert Advisor or a service like MetaApi/FXBlue that exposes trade history over an API you poll from the BullMQ worker), and true "Unrealized P&L" for open positions (needs a live price feed, e.g., a forex rates websocket, to mark open trades to market).

Everything else in this document — schema, endpoints, and formulas — is buildable and testable end-to-end right now with just Node, Prisma, and Postgres.
