import { Request, Response } from 'express';
import * as tradesService from './trades.service';
import { PlanTier } from '@prisma/client';

export async function listTradesHandler(req: Request, res: Response) {
  try {
    const { page, limit, symbol, type, source } = req.query;
    const result = await tradesService.listTrades(req.userId!, req.userPlan as PlanTier, {
      page: Number(page) || 1,
      limit: Number(limit) || 15,
      symbol: symbol as string,
      type: type as any,
      source: source as any,
    });
    res.json(result);
  } catch (err: any) {
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
    const trade = await tradesService.getTrade(req.userId!, req.params.id);
    if (!trade) return res.status(404).json({ error: 'Not found' });
    res.json(trade);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateTradeHandler(req: Request, res: Response) {
  try {
    const trade = await tradesService.updateTrade(req.userId!, req.params.id, req.body);
    res.json(trade);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteTradeHandler(req: Request, res: Response) {
  try {
    await tradesService.deleteTrade(req.userId!, req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
