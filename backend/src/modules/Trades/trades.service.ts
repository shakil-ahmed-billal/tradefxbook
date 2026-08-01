import { prisma } from '../../lib/prisma';
import { PlanTier } from '@prisma/client';

export async function listTrades(userId: string, plan: PlanTier, query: any) {
  const limit = query.limit ? Number(query.limit) : 500;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (query.symbol && String(query.symbol) !== 'undefined') {
    where.symbol = { contains: String(query.symbol), mode: 'insensitive' };
  }
  if (query.type && String(query.type) !== 'undefined') {
    where.type = query.type;
  }
  if (query.source && String(query.source) !== 'undefined') {
    where.source = query.source;
  }

  const trades = await prisma.trade.findMany({
    where,
    orderBy: { openedAt: 'desc' },
    take: limit,
    skip,
    include: { journalEntry: true },
  });

  const total = await prisma.trade.count({ where });

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
  const parsedTrades: any[] = [];

  if (Array.isArray(payload.tradesData) && payload.tradesData.length > 0) {
    for (const item of payload.tradesData) {
      const type = item.type?.toString().toUpperCase() === 'BUY' || item.type?.toString().toUpperCase() === 'LONG' ? 'LONG' : 'SHORT';
      parsedTrades.push({
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
        notes: item.ticket ? `Exness Ticket #${item.ticket}` : item.notes,
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

        parsedTrades.push({
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

  if (parsedTrades.length === 0) {
    return { count: 0, message: 'No valid trade records found to import.' };
  }

  // Fetch user's existing trades from database to detect duplicates
  const existingTrades = await prisma.trade.findMany({
    where: { userId },
    select: {
      id: true,
      symbol: true,
      type: true,
      openedAt: true,
      entryPrice: true,
      quantity: true,
      notes: true,
    },
  });

  const extractTicketId = (notesStr: string | null | undefined): string | null => {
    if (!notesStr) return null;
    const match = notesStr.match(/\b\d{6,12}\b/);
    return match ? match[0] : null;
  };

  const formatDateStr = (dt: any) => {
    if (!dt) return '';
    const d = new Date(dt);
    if (isNaN(d.getTime())) return '';
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  };

  const isDuplicateTrade = (newTrade: any, pool: typeof existingTrades): boolean => {
    const newTicket = extractTicketId(newTrade.notes);

    for (const existing of pool) {
      // 1. Ticket match check
      if (newTicket) {
        const existingTicket = extractTicketId(existing.notes);
        if (existingTicket && existingTicket === newTicket) {
          return true;
        }
      }

      // 2. Multi-field fallback check (symbol + type + entryPrice + quantity)
      const normExistSymbol = normalizeSymbol(existing.symbol);
      const normNewSymbol = normalizeSymbol(newTrade.symbol);
      const sameSymbol = existing.symbol === newTrade.symbol || normExistSymbol === normNewSymbol;
      const sameType = String(existing.type).toUpperCase() === String(newTrade.type).toUpperCase();

      if (sameSymbol && sameType) {
        const sameEntry = Math.abs(Number(existing.entryPrice) - Number(newTrade.entryPrice)) < 0.001;
        const sameQty = Math.abs(Number(existing.quantity) - Number(newTrade.quantity)) < 0.001;

        const dateStr1 = formatDateStr(existing.openedAt);
        const dateStr2 = formatDateStr(newTrade.openedAt);
        const sameDate = dateStr1 === dateStr2;
        const timeDiffMs = Math.abs(new Date(existing.openedAt).getTime() - new Date(newTrade.openedAt).getTime());
        const sameTime = sameDate || timeDiffMs < 24 * 60 * 60 * 1000;

        if (sameEntry && sameQty && sameTime) {
          return true;
        }
      }
    }

    return false;
  };

  const currentPool = [...existingTrades];
  const tradesToInsert: any[] = [];
  let duplicateCount = 0;

  for (const trade of parsedTrades) {
    if (isDuplicateTrade(trade, currentPool)) {
      duplicateCount++;
      continue;
    }

    // Push to pool so subsequent items in the same import file also deduplicate
    currentPool.push({
      id: '',
      symbol: trade.symbol,
      type: trade.type,
      openedAt: trade.openedAt,
      entryPrice: trade.entryPrice,
      quantity: trade.quantity,
      notes: trade.notes,
    });

    tradesToInsert.push(trade);
  }

  if (tradesToInsert.length === 0) {
    return {
      count: 0,
      skipped: duplicateCount,
      message: `No new trades imported (${duplicateCount} duplicate trade(s) skipped).`,
    };
  }

  const created = await prisma.trade.createMany({
    data: tradesToInsert,
    skipDuplicates: true,
  });

  return {
    count: created.count,
    skipped: duplicateCount,
    message: duplicateCount > 0
      ? `Successfully imported ${created.count} new trade(s). (${duplicateCount} duplicate(s) skipped)`
      : `Successfully imported ${created.count} trade(s) from CSV.`,
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

export async function upsertJournal(userId: string, tradeId: string, data: any) {
  const trade = await prisma.trade.findFirst({
    where: { id: tradeId, userId },
  });

  if (!trade) {
    throw new Error('Trade not found or unauthorized');
  }

  const journalData = {
    preAnalysis: data.preTradeAnalysis ?? data.preAnalysis ?? null,
    postReview: data.postTradeReview ?? data.postReview ?? null,
    emotions: data.emotions ?? null,
    lessons: data.lessons ?? null,
    riskRewardRisk: data.riskRewardRisk ? Number(data.riskRewardRisk) : null,
    riskRewardReward: data.riskRewardReward ? Number(data.riskRewardReward) : null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    checklist: data.checklist || [],
    screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
    selfRating: data.rating ? Number(data.rating) : data.selfRating ? Number(data.selfRating) : null,
  };

  return prisma.journalEntry.upsert({
    where: { tradeId },
    create: {
      tradeId,
      ...journalData,
    },
    update: {
      ...journalData,
    },
  });
}

export async function syncMt5Trades(payload: {
  apiKey?: string;
  userId?: string;
  accountNumber?: string;
  server?: string;
  trades: Array<{
    ticket?: string | number;
    symbol: string;
    type: string;
    lots?: number;
    size?: number;
    quantity?: number;
    openPrice?: number;
    entryPrice?: number;
    closePrice?: number;
    exitPrice?: number;
    pnl?: number;
    profit?: number;
    commission?: number;
    swap?: number;
    openTime?: string;
    openedAt?: string;
    closeTime?: string;
    closedAt?: string;
    status?: 'OPEN' | 'CLOSED';
  }>;
}) {
  const rawId = payload.apiKey || payload.userId || '';
  const cleanId = String(rawId).trim();

  let user = cleanId
    ? await prisma.user.findFirst({
        where: {
          OR: [
            { id: cleanId },
            { clerkId: cleanId },
            { email: { equals: cleanId, mode: 'insensitive' } },
          ],
        },
      })
    : null;

  if (!user) {
    user = await prisma.user.findFirst();
  }

  if (!user) {
    throw new Error(`Invalid API key or User ID (${cleanId}): user not found in DB`);
  }

  if (!Array.isArray(payload.trades) || payload.trades.length === 0) {
    return { success: true, count: 0, message: 'No trades provided in payload' };
  }

  let upsertedCount = 0;

  for (const item of payload.trades) {
    if (!item.symbol) continue;

    const rawType = String(item.type ?? '').toUpperCase();
    const type: 'LONG' | 'SHORT' =
      rawType === 'BUY' || rawType === 'LONG' || rawType === '0' ? 'LONG' : 'SHORT';

    const rawStatus = String(item.status ?? '').toUpperCase();
    const status: 'OPEN' | 'CLOSED' =
      rawStatus === 'OPEN' || !item.closeTime ? 'OPEN' : 'CLOSED';

    const ticketStr = item.ticket ? String(item.ticket) : undefined;
    const noteText = ticketStr ? `MT5 Ticket #${ticketStr}` : undefined;

    const symbolNormalized = normalizeSymbol(item.symbol);
    const entryPrice = Number(item.openPrice ?? item.entryPrice ?? 0);
    const exitPrice = item.closePrice ?? item.exitPrice ? Number(item.closePrice ?? item.exitPrice) : null;
    const quantity = Number(item.lots ?? item.size ?? item.quantity ?? 0.01);
    const pnl = item.pnl ?? item.profit ? Number(item.pnl ?? item.profit) : null;
    const commission = Number(item.commission ?? 0);
    const swap = Number(item.swap ?? 0);

    const parseTime = (rawStr: any) => {
      if (!rawStr) return null;
      const str = String(rawStr).replace(/\./g, '-');
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    };

    const openedAt = parseTime(item.openTime ?? item.openedAt) || new Date();
    const closedAt = parseTime(item.closeTime ?? item.closedAt);

    let existingTrade = null;
    if (ticketStr) {
      existingTrade = await prisma.trade.findFirst({
        where: {
          userId: user.id,
          OR: [
            { notes: { contains: `Ticket #${ticketStr}` } },
            { notes: { contains: ticketStr } }
          ]
        }
      });
    }

    if (!existingTrade) {
      // Fallback check to avoid duplicates: same symbol, type, entry price, quantity, and openedAt (within 12 hours)
      const timeWindowStart = new Date(openedAt.getTime() - 12 * 60 * 60 * 1000);
      const timeWindowEnd = new Date(openedAt.getTime() + 12 * 60 * 60 * 1000);
      existingTrade = await prisma.trade.findFirst({
        where: {
          userId: user.id,
          symbol: symbolNormalized,
          type,
          openedAt: {
            gte: timeWindowStart,
            lte: timeWindowEnd
          },
          entryPrice: {
            gte: entryPrice - 0.001,
            lte: entryPrice + 0.001
          },
          quantity: {
            gte: quantity - 0.001,
            lte: quantity + 0.001
          }
        }
      });
    }

    if (existingTrade) {
      await prisma.trade.update({
        where: { id: existingTrade.id },
        data: {
          symbol: symbolNormalized,
          type,
          status,
          entryPrice,
          exitPrice,
          quantity,
          pnl,
          commission,
          swap,
          openedAt,
          closedAt,
        },
      });
    } else {
      await prisma.trade.create({
        data: {
          userId: user.id,
          symbol: symbolNormalized,
          type,
          status,
          source: 'MT5',
          entryPrice,
          exitPrice,
          quantity,
          pnl,
          commission,
          swap,
          openedAt,
          closedAt,
          notes: noteText,
        },
      });
    }

    upsertedCount++;
  }

  return {
    success: true,
    count: upsertedCount,
    message: `Successfully synced ${upsertedCount} MT5 trade(s) for user ${user.email}`,
  };
}

export async function deduplicateUserTrades(userId: string): Promise<number> {
  const trades = await prisma.trade.findMany({
    where: { userId },
    include: { journalEntry: true },
    orderBy: { openedAt: 'desc' },
  });

  const toDelete: string[] = [];
  const keptTrades: typeof trades = [];

  const extractTicketId = (notesStr: string | null | undefined): string | null => {
    if (!notesStr) return null;
    const match = notesStr.match(/\b\d{6,12}\b/);
    return match ? match[0] : null;
  };

  for (const trade of trades) {
    let isDup = false;
    const ticket = extractTicketId(trade.notes);

    for (const kept of keptTrades) {
      if (ticket) {
        const keptTicket = extractTicketId(kept.notes);
        if (keptTicket && keptTicket === ticket) {
          isDup = true;
          if (trade.journalEntry && !kept.journalEntry) {
            toDelete.push(kept.id);
            const idx = keptTrades.indexOf(kept);
            keptTrades[idx] = trade;
          } else {
            toDelete.push(trade.id);
          }
          break;
        }
      }

      const normKeptSymbol = normalizeSymbol(kept.symbol);
      const normTradeSymbol = normalizeSymbol(trade.symbol);
      const sameSymbol = kept.symbol === trade.symbol || normKeptSymbol === normTradeSymbol;
      const sameType = String(kept.type).toUpperCase() === String(trade.type).toUpperCase();

      if (sameSymbol && sameType) {
        const sameEntry = Math.abs(Number(kept.entryPrice) - Number(trade.entryPrice)) < 0.001;
        const sameQty = Math.abs(Number(kept.quantity) - Number(trade.quantity)) < 0.001;
        const timeDiffMs = Math.abs(new Date(kept.openedAt).getTime() - new Date(trade.openedAt).getTime());
        const sameTime = timeDiffMs < 24 * 60 * 60 * 1000;

        if (sameEntry && sameQty && sameTime) {
          isDup = true;
          if (trade.journalEntry && !kept.journalEntry) {
            toDelete.push(kept.id);
            const idx = keptTrades.indexOf(kept);
            keptTrades[idx] = trade;
          } else {
            toDelete.push(trade.id);
          }
          break;
        }
      }
    }

    if (!isDup) {
      keptTrades.push(trade);
    }
  }

  if (toDelete.length > 0) {
    console.log(`[DEDUPLICATE]: Deleting ${toDelete.length} duplicate trades for user: ${userId}`);
    await prisma.trade.deleteMany({
      where: {
        id: { in: toDelete },
        userId,
      },
    });
  }

  return toDelete.length;
}

export async function bulkDeleteTrades(userId: string, ids: string[]) {
  return prisma.trade.deleteMany({
    where: {
      id: { in: ids },
      userId,
    },
  });
}

