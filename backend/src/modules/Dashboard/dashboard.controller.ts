import { Request, Response } from 'express';
import * as dashboardService from './dashboard.service';

export async function getStatsHandler(req: Request, res: Response) {
  try {
    const stats = await dashboardService.getDashboardStats(req.userId!);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPerformanceHandler(req: Request, res: Response) {
  try {
    const data = await dashboardService.getDashboardPerformance(req.userId!, req.query.range as string);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOpenPositionsHandler(req: Request, res: Response) {
  try {
    const positions = await dashboardService.getOpenPositions(req.userId!);
    res.json({ data: positions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getRecentActivityHandler(req: Request, res: Response) {
  try {
    const limit = Number(req.query.limit) || 10;
    const activity = await dashboardService.getRecentActivity(req.userId!, limit);
    res.json({ data: activity });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
