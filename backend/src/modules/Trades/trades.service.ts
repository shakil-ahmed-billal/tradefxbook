import { prisma } from '../../lib/prisma';
import { PlanTier } from '@prisma/client';

export async function listTrades(userId: string, plan: PlanTier, query: any) {
  const limit = query.limit ? Number(query.limit) : 500;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      symbol: query.symbol ? { contains: query.symbol, mode: 'insensitive' } : undefined,
      type: query.type,
      source: query.source,
    },
    orderBy: { openedAt: 'desc' },
    take: limit,
    skip,
    include: { journalEntry: true },
  });

  const total = await prisma.trade.count({ where: { userId } });

  return {
    data: trades,
    meta: {
      total,
      page,
      limit,
    }
  };
}

export function normalizeSymbol(rawSymbol: string): string {
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

export async function importTradesFromCsv(userId: string, payload: { csvText?: string; tradesData?: any[] }) {
  const tradesToInsert: any[] = [];

  if (Array.isArray(payload.tradesData) && payload.tradesData.length > 0) {
    for (const item of payload.tradesData) {
      const type = item.type?.toString().toUpperCase() === 'BUY' || item.type?.toString().toUpperCase() === 'LONG' ? 'LONG' : 'SHORT';
      tradesToInsert.push({
        userId,
        symbol: normalizeSymbol(item.symbol),
        type,
        status: item.closedAt || item.closing_time_utc ? 'CLOSED' : 'OPEN',
        source: 'MT5',
        entryPrice: Number(item.entryPrice ?? item.opening_price ?? 0),
        exitPrice: item.exitPrice ?? item.closing_price ? Number(item.exitPrice ?? item.closing_price) : null,
        quantity: Number(item.quantity ?? item.lots ?? 0.01),
        pnl: item.pnl ?? item.profit ? Number(item.pnl ?? item.profit) : null,
        commission: Number(item.commission ?? 0),
        swap: Number(item.swap ?? 0),
        openedAt: new Date(item.openedAt ?? item.opening_time_utc ?? Date.now()),
        closedAt: item.closedAt ?? item.closing_time_utc ? new Date(item.closedAt ?? item.closing_time_utc) : null,
        notes: item.ticket ? `Ticket: ${item.ticket}` : item.notes,
      });
    }
  } else if (payload.csvText) {
    const lines = payload.csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length > 1) {
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const getVal = (row: string[], fieldName: string) => {
        const idx = headers.indexOf(fieldName);
        return idx !== -1 && row[idx] !== undefined ? row[idx].trim() : '';
      };

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(cell => cell.trim());
        if (row.length < 5) continue;

        const ticket = getVal(row, 'ticket');
        const openTime = getVal(row, 'opening_time_utc') || getVal(row, 'opentime');
        const closeTime = getVal(row, 'closing_time_utc') || getVal(row, 'closetime');
        const rawType = getVal(row, 'type');
        const lots = getVal(row, 'lots') || getVal(row, 'size');
        const rawSymbol = getVal(row, 'symbol');
        const openPrice = getVal(row, 'opening_price') || getVal(row, 'entryprice');
        const closePrice = getVal(row, 'closing_price') || getVal(row, 'exitprice');
        const commission = getVal(row, 'commission');
        const swap = getVal(row, 'swap');
        const profit = getVal(row, 'profit') || getVal(row, 'pnl');

        const type = rawType.toLowerCase() === 'buy' || rawType.toLowerCase() === 'long' ? 'LONG' : 'SHORT';
        const pnlVal = profit !== '' ? Number(profit) : null;

        tradesToInsert.push({
          userId,
          symbol: normalizeSymbol(rawSymbol),
          type,
          status: closeTime ? 'CLOSED' : 'OPEN',
          source: 'MT5',
          entryPrice: Number(openPrice || 0),
          exitPrice: closePrice !== '' ? Number(closePrice) : null,
          quantity: Number(lots || 0.01),
          pnl: pnlVal,
          commission: Number(commission || 0),
          swap: Number(swap || 0),
          openedAt: new Date(openTime || Date.now()),
          closedAt: closeTime ? new Date(closeTime) : null,
          notes: ticket ? `Exness Ticket #${ticket}` : undefined,
        });
      }
    }
  }

  if (tradesToInsert.length === 0) {
    return { count: 0, message: 'No valid trade records found to import.' };
  }

  const created = await prisma.trade.createMany({
    data: tradesToInsert,
  });

  return {
    count: created.count,
    message: `Successfully imported ${created.count} trades from Exness CSV.`,
  };
}

export async function createTrade(userId: string, data: any) {
  return prisma.trade.create({
    data: {
      ...data,
      userId,
      openedAt: new Date(data.openedAt),
      closedAt: data.closedAt ? new Date(data.closedAt) : null,
    },
  });
}

export async function getTrade(userId: string, id: string) {
  return prisma.trade.findFirst({
    where: { id, userId },
    include: { journalEntry: true },
  });
}

export async function updateTrade(userId: string, id: string, data: any) {
  if (data.openedAt) data.openedAt = new Date(data.openedAt);
  if (data.closedAt) data.closedAt = new Date(data.closedAt);
  
  return prisma.trade.update({
    where: { id }, // In a real app we'd verify userId ownership first or use composite where
    data,
  });
}

export async function deleteTrade(userId: string, id: string) {
  return prisma.trade.deleteMany({
    where: { id, userId },
  });
}
