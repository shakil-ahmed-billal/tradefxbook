import { Prisma } from '@prisma/client';

export interface TradeLike {
  pnl: Prisma.Decimal | null;
  entryPrice: Prisma.Decimal;
  exitPrice: Prisma.Decimal | null;
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
  return t.closedAt.getTime() - t.openedAt.getTime(); 
}

export function priceMovePct(t: TradeLike) {
  if (!t.exitPrice) return null;
  const entry = Number(t.entryPrice);
  const exit = Number(t.exitPrice);
  return ((exit - entry) / entry) * 100;
}
