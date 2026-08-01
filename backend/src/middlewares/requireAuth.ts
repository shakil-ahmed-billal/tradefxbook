import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

// Extend express Request to include userId and userPlan
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userPlan?: string;
    }
  }
}

/**
 * Extract the session token from Cookie header or Authorization/x-session-token headers.
 */
function extractSessionToken(req: Request): string | null {
  // 1. Try Cookie header
  const cookieHeader = req.headers['cookie'] as string | undefined;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    for (const cookie of cookies) {
      const prefixes = [
        'better-auth.session_token=',
        '__Secure-better-auth.session_token=',
        '__Host-better-auth.session_token=',
        'session_token=',
      ];
      for (const prefix of prefixes) {
        if (cookie.startsWith(prefix)) {
          return decodeURIComponent(cookie.slice(prefix.length));
        }
      }
    }
  }

  // 2. Try Authorization header (Bearer <token>)
  const authHeader = req.headers['authorization'] as string | undefined;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  // 3. Try x-session-token custom header
  const customHeader = req.headers['x-session-token'] as string | undefined;
  if (customHeader) {
    return customHeader.trim();
  }

  return null;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = extractSessionToken(req);

    if (!token) {
      return res.status(401).json({ error: 'No session token found in cookies or request headers' });
    }

    // Look up the session directly in Prisma — bypasses Better-Auth CSRF/origin checks
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    // Check expiry
    if (session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Session has expired. Please log in again.' });
    }

    req.userId = session.user.id;
    req.userPlan = session.user.plan;
    next();
  } catch (err) {
    console.error('[requireAuth Error]:', err);
    res.status(401).json({ error: 'Authentication failed' });
  }
}
