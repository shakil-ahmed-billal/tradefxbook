import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma'; // Using existing prisma instance
import { PlanTier } from '@prisma/client';

// Extend express Request to include userId and userPlan
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userPlan?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return res.status(401).json({ error: 'User not found in DB.' });

    req.userId = user.id;
    req.userPlan = user.plan;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
}
