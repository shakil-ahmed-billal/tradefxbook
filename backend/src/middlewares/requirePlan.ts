import { Request, Response, NextFunction } from 'express';
import { PlanTier } from '@prisma/client';

const rank: Record<PlanTier, number> = { FREE: 0, PRO: 1, ELITE: 2 };

export function requirePlan(min: PlanTier) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userPlan) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (rank[req.userPlan as PlanTier] < rank[min]) {
      return res.status(403).json({ error: `Requires ${min} plan or higher` });
    }
    next();
  };
}
