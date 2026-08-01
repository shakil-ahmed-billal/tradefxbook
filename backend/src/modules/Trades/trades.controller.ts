import { Request, Response } from 'express';
import * as tradesService from './trades.service';
import { PlanTier } from '@prisma/client';

export async function listTradesHandler(req: Request, res: Response) {
  try {
    const { page, limit, symbol, type, source, dedupe } = req.query;
    
    if (dedupe === 'true') {
      try {
        await tradesService.deduplicateUserTrades(req.userId!);
      } catch (err) {
        console.error('Deduplication Error:', err);
      }
    }

    const result = await tradesService.listTrades(req.userId!, req.userPlan as PlanTier, {
      page: Number(page) || 1,
      limit: limit ? Number(limit) : 1000,
      symbol: symbol as string,
      type: type as any,
      source: source as any,
    });
    res.json(result);
  } catch (err: any) {
    console.error('listTradesHandler Error:', err);
    res.status(500).json({ error: err.message });
  }
}


export async function createTradeHandler(req: Request, res: Response) {
  try {
    const trade = await tradesService.createTrade(req.userId!, req.body);
    res.status(201).json(trade);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function importCsvHandler(req: Request, res: Response) {
  try {
    const { csvText, tradesData } = req.body;
    const result = await tradesService.importTradesFromCsv(req.userId!, { csvText, tradesData });
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTradeHandler(req: Request, res: Response) {
  try {
    const trade = await tradesService.getTrade(req.userId!, req.params.id as string);
    if (!trade) return res.status(404).json({ error: 'Not found' });
    res.json(trade);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateTradeHandler(req: Request, res: Response) {
  try {
    const trade = await tradesService.updateTrade(req.userId!, req.params.id as string, req.body);
    res.json(trade);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteTradeHandler(req: Request, res: Response) {
  try {
    await tradesService.deleteTrade(req.userId!, req.params.id as string);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function upsertJournalHandler(req: Request, res: Response) {
  try {
    const journal = await tradesService.upsertJournal(req.userId!, req.params.id as string, req.body);
    res.json(journal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function syncMt5TradesHandler(req: Request, res: Response) {
  try {
    const apiKey = (req.headers['x-api-key'] as string) || req.body?.apiKey;
    const userId = req.userId || req.body?.userId;
    const payload = {
      ...req.body,
      apiKey: apiKey || req.body?.apiKey,
      userId: userId || req.body?.userId,
    };
    console.log(`[MT5 WEBHOOK INCOMING]: ${payload.trades?.length || 0} trades for key: ${payload.apiKey || payload.userId}`);
    const result = await tradesService.syncMt5Trades(payload);
    res.json(result);
  } catch (err: any) {
    console.error('[MT5 WEBHOOK ERROR]:', err);
    res.status(400).json({ error: err.message });
  }
}

export async function bulkDeleteTradesHandler(req: Request, res: Response) {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty ids array' });
    }
    await tradesService.bulkDeleteTrades(req.userId!, ids);
    res.status(204).send();
  } catch (err: any) {
    console.error('bulkDeleteTradesHandler Error:', err);
    res.status(500).json({ error: err.message });
  }
}

export async function clearAllTradesHandler(req: Request, res: Response) {
  try {
    await tradesService.clearAllTrades(req.userId!);
    res.status(204).send();
  } catch (err: any) {
    console.error('clearAllTradesHandler Error:', err);
    res.status(500).json({ error: err.message });
  }
}

