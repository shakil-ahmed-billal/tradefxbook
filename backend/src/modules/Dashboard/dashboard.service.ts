import { prisma } from '../../lib/prisma';
import { totalPnl, winRate, equityCurve } from '../../utils/metrics';

export async function getDashboardStats(userId: string) {
  const trades = await prisma.trade.findMany({ where: { userId } });
  const closed = trades.filter(t => t.status === 'CLOSED');
  const open = trades.filter(t => t.status === 'OPEN');

  return {
    totalPnl: totalPnl(closed),
    unrealizedPnl: totalPnl(open), 
    realizedPnl: totalPnl(closed),
    winRate: winRate(closed),
    totalTradesCount: trades.length,
    openPositionsCount: open.length,
    closedTradesCount: closed.length,
  };
}

export async function getDashboardPerformance(userId: string, range: string) {
  // Simplistic filtering for the demo. In a real app, parse 'range' (1D, 1W, 1M, etc.) and add where clause.
  const trades = await prisma.trade.findMany({
    where: { userId, status: 'CLOSED' },
    orderBy: { closedAt: 'asc' }
  });
  
  const curve = equityCurve(trades);
  return {
    value: totalPnl(trades),
    points: curve
  };
}

export async function getOpenPositions(userId: string) {
  return prisma.trade.findMany({
    where: { userId, status: 'OPEN' },
    orderBy: { openedAt: 'desc' }
  });
}

export async function getRecentActivity(userId: string, limit: number) {
  return prisma.trade.findMany({
    where: { userId, status: 'CLOSED' },
    orderBy: { closedAt: 'desc' },
    take: limit
  });
}
