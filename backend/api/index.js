// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import morgan from "morgan";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT || 8e3,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.CLIENT_URL,
  backend_url: process.env.BETTER_AUTH_URL,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
};

// src/lib/prisma.ts
var connectionString = `${config_default.database_url}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  //...other options
  emailAndPassword: {
    enabled: true
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  trustedOrigins: [
    process.env.CLIENT_URL || "http://localhost:3000",
    "https://job-mailer-ai.vercel.app",
    "https://api-job-mailer-ai.vercel.app"
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    trustHost: true,
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/middlewares/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err.code === "P2002") {
    statusCode = 400;
    message = "Duplicate entry. This record already exists.";
  }
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found.";
  }
  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation error";
    return res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors
    });
  }
  res.status(statusCode).json({
    success: false,
    message,
    ...process.env.NODE_ENV === "development" && { stack: err.stack }
  });
};

// src/routes/index.ts
import { Router as Router5 } from "express";

// src/modules/Users/users.routes.ts
import { Router } from "express";

// src/errors/AppError.ts
var AppError = class extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/middlewares/auth.middleware.ts
var authenticate = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers)
    });
    if (!session) {
      throw new AppError(401, "Unauthorized. Please login to continue.");
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    next(error);
  }
};

// src/middlewares/validateRequest.ts
import { ZodError } from "zod";
var validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues
        });
      }
      next(error);
    }
  };
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error
  });
};

// src/modules/Users/users.service.ts
var updateProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      profileBio: true,
      resumeLink: true,
      linkedinLink: true,
      portfolioLink: true,
      resumeContent: true,
      skills: true,
      experience: true,
      education: true,
      certifications: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
var getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      profileBio: true,
      resumeLink: true,
      linkedinLink: true,
      portfolioLink: true,
      resumeContent: true,
      skills: true,
      experience: true,
      education: true,
      certifications: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
var getRecentActivity = async (userId, limit = 5) => {
  return [];
};
var UsersService = {
  updateProfile,
  getProfile,
  getRecentActivity
};

// src/modules/Users/users.controller.ts
var updateProfile2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await UsersService.updateProfile(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result
  });
});
var getProfile2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await UsersService.getProfile(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result
  });
});
var getRecentActivity2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await UsersService.getRecentActivity(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Recent activity retrieved successfully",
    data: result
  });
});
var UsersController = {
  updateProfile: updateProfile2,
  getProfile: getProfile2,
  getRecentActivity: getRecentActivity2
};

// src/modules/Users/users.validation.ts
import { z as z2 } from "zod";
var updateProfileSchema = z2.object({
  body: z2.object({
    name: z2.string().min(1).optional(),
    profileBio: z2.string().optional(),
    resumeLink: z2.string().url().optional().or(z2.literal("")),
    linkedinLink: z2.string().url().optional().or(z2.literal("")),
    portfolioLink: z2.string().url().optional().or(z2.literal("")),
    resumeContent: z2.string().optional(),
    skills: z2.string().optional(),
    experience: z2.string().optional(),
    education: z2.string().optional(),
    certifications: z2.string().optional()
  })
});

// src/modules/Users/users.routes.ts
var router = Router();
router.use(authenticate);
router.get("/profile", UsersController.getProfile);
router.get("/activity", UsersController.getRecentActivity);
router.put(
  "/profile",
  validateRequest(updateProfileSchema),
  UsersController.updateProfile
);
var users_routes_default = router;

// src/modules/Trades/trades.routes.ts
import { Router as Router2 } from "express";

// src/modules/Trades/trades.service.ts
async function listTrades(userId, plan, query) {
  const limit = query.limit ? Number(query.limit) : 500;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const trades = await prisma.trade.findMany({
    where: {
      userId,
      symbol: query.symbol ? { contains: query.symbol, mode: "insensitive" } : void 0,
      type: query.type,
      source: query.source
    },
    orderBy: { openedAt: "desc" },
    take: limit,
    skip,
    include: { journalEntry: true }
  });
  const total = await prisma.trade.count({ where: { userId } });
  return {
    data: trades,
    meta: {
      total,
      page,
      limit
    }
  };
}
function normalizeSymbol(rawSymbol) {
  if (!rawSymbol) return "UNKNOWN";
  let s = rawSymbol.trim();
  if (s.endsWith("m") && s.length > 3) {
    s = s.slice(0, -1);
  }
  if (s.length === 6 && !s.includes("/")) {
    s = `${s.slice(0, 3)}/${s.slice(3)}`;
  }
  return s;
}
async function importTradesFromCsv(userId, payload) {
  const tradesToInsert = [];
  if (Array.isArray(payload.tradesData) && payload.tradesData.length > 0) {
    for (const item of payload.tradesData) {
      const type = item.type?.toString().toUpperCase() === "BUY" || item.type?.toString().toUpperCase() === "LONG" ? "LONG" : "SHORT";
      tradesToInsert.push({
        userId,
        symbol: normalizeSymbol(item.symbol),
        type,
        status: item.closedAt || item.closing_time_utc ? "CLOSED" : "OPEN",
        source: "MT5",
        entryPrice: Number(item.entryPrice ?? item.opening_price ?? 0),
        exitPrice: item.exitPrice ?? item.closing_price ? Number(item.exitPrice ?? item.closing_price) : null,
        quantity: Number(item.quantity ?? item.lots ?? 0.01),
        pnl: item.pnl ?? item.profit ? Number(item.pnl ?? item.profit) : null,
        commission: Number(item.commission ?? 0),
        swap: Number(item.swap ?? 0),
        openedAt: new Date(item.openedAt ?? item.opening_time_utc ?? Date.now()),
        closedAt: item.closedAt ?? item.closing_time_utc ? new Date(item.closedAt ?? item.closing_time_utc) : null,
        notes: item.ticket ? `Ticket: ${item.ticket}` : item.notes
      });
    }
  } else if (payload.csvText) {
    const lines = payload.csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length > 1) {
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const getVal = (row, fieldName) => {
        const idx = headers.indexOf(fieldName);
        return idx !== -1 && row[idx] !== void 0 ? row[idx].trim() : "";
      };
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map((cell) => cell.trim());
        if (row.length < 5) continue;
        const ticket = getVal(row, "ticket");
        const openTime = getVal(row, "opening_time_utc") || getVal(row, "opentime");
        const closeTime = getVal(row, "closing_time_utc") || getVal(row, "closetime");
        const rawType = getVal(row, "type");
        const lots = getVal(row, "lots") || getVal(row, "size");
        const rawSymbol = getVal(row, "symbol");
        const openPrice = getVal(row, "opening_price") || getVal(row, "entryprice");
        const closePrice = getVal(row, "closing_price") || getVal(row, "exitprice");
        const commission = getVal(row, "commission");
        const swap = getVal(row, "swap");
        const profit = getVal(row, "profit") || getVal(row, "pnl");
        const type = rawType.toLowerCase() === "buy" || rawType.toLowerCase() === "long" ? "LONG" : "SHORT";
        const pnlVal = profit !== "" ? Number(profit) : null;
        tradesToInsert.push({
          userId,
          symbol: normalizeSymbol(rawSymbol),
          type,
          status: closeTime ? "CLOSED" : "OPEN",
          source: "MT5",
          entryPrice: Number(openPrice || 0),
          exitPrice: closePrice !== "" ? Number(closePrice) : null,
          quantity: Number(lots || 0.01),
          pnl: pnlVal,
          commission: Number(commission || 0),
          swap: Number(swap || 0),
          openedAt: new Date(openTime || Date.now()),
          closedAt: closeTime ? new Date(closeTime) : null,
          notes: ticket ? `Exness Ticket #${ticket}` : void 0
        });
      }
    }
  }
  if (tradesToInsert.length === 0) {
    return { count: 0, message: "No valid trade records found to import." };
  }
  const created = await prisma.trade.createMany({
    data: tradesToInsert
  });
  return {
    count: created.count,
    message: `Successfully imported ${created.count} trades from Exness CSV.`
  };
}
async function createTrade(userId, data) {
  return prisma.trade.create({
    data: {
      ...data,
      userId,
      openedAt: new Date(data.openedAt),
      closedAt: data.closedAt ? new Date(data.closedAt) : null
    }
  });
}
async function getTrade(userId, id) {
  return prisma.trade.findFirst({
    where: { id, userId },
    include: { journalEntry: true }
  });
}
async function updateTrade(userId, id, data) {
  if (data.openedAt) data.openedAt = new Date(data.openedAt);
  if (data.closedAt) data.closedAt = new Date(data.closedAt);
  return prisma.trade.update({
    where: { id },
    // In a real app we'd verify userId ownership first or use composite where
    data
  });
}
async function deleteTrade(userId, id) {
  return prisma.trade.deleteMany({
    where: { id, userId }
  });
}
async function upsertJournal(userId, tradeId, data) {
  const trade = await prisma.trade.findFirst({
    where: { id: tradeId, userId }
  });
  if (!trade) {
    throw new Error("Trade not found or unauthorized");
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
    selfRating: data.rating ? Number(data.rating) : data.selfRating ? Number(data.selfRating) : null
  };
  return prisma.journalEntry.upsert({
    where: { tradeId },
    create: {
      tradeId,
      ...journalData
    },
    update: {
      ...journalData
    }
  });
}

// src/modules/Trades/trades.controller.ts
async function listTradesHandler(req, res) {
  try {
    const { page, limit, symbol, type, source } = req.query;
    const result = await listTrades(req.userId, req.userPlan, {
      page: Number(page) || 1,
      limit: limit ? Number(limit) : 1e3,
      symbol,
      type,
      source
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function createTradeHandler(req, res) {
  try {
    const trade = await createTrade(req.userId, req.body);
    res.status(201).json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function importCsvHandler(req, res) {
  try {
    const { csvText, tradesData } = req.body;
    const result = await importTradesFromCsv(req.userId, { csvText, tradesData });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getTradeHandler(req, res) {
  try {
    const trade = await getTrade(req.userId, req.params.id);
    if (!trade) return res.status(404).json({ error: "Not found" });
    res.json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function updateTradeHandler(req, res) {
  try {
    const trade = await updateTrade(req.userId, req.params.id, req.body);
    res.json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function deleteTradeHandler(req, res) {
  try {
    await deleteTrade(req.userId, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function upsertJournalHandler(req, res) {
  try {
    const journal = await upsertJournal(req.userId, req.params.id, req.body);
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// src/middlewares/requireAuth.ts
async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers)
    });
    if (!session || !session.user) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return res.status(401).json({ error: "User not found in DB." });
    req.userId = user.id;
    req.userPlan = user.plan;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}

// src/modules/Trades/trades.routes.ts
var router2 = Router2();
router2.use(requireAuth);
router2.get("/", listTradesHandler);
router2.post("/", createTradeHandler);
router2.post("/import-csv", importCsvHandler);
router2.get("/:id", getTradeHandler);
router2.put("/:id", updateTradeHandler);
router2.put("/:id/journal", upsertJournalHandler);
router2.delete("/:id", deleteTradeHandler);
var trades_routes_default = router2;

// src/modules/Dashboard/dashboard.routes.ts
import { Router as Router3 } from "express";

// src/utils/metrics.ts
function totalPnl(trades) {
  return trades.reduce((sum, t) => sum + Number(t.pnl ?? 0), 0);
}
function winRate(trades) {
  const closed = trades.filter((t) => t.pnl !== null);
  if (closed.length === 0) return 0;
  const wins = closed.filter((t) => Number(t.pnl) > 0).length;
  return wins / closed.length * 100;
}
function equityCurve(trades) {
  const sorted = [...trades].filter((t) => t.closedAt).sort((a, b) => a.closedAt.getTime() - b.closedAt.getTime());
  let running = 0;
  return sorted.map((t) => {
    running += Number(t.pnl ?? 0);
    return { date: t.closedAt, cumulativePnl: running };
  });
}

// src/modules/Dashboard/dashboard.service.ts
async function getDashboardStats(userId) {
  const trades = await prisma.trade.findMany({ where: { userId } });
  const closed = trades.filter((t) => t.status === "CLOSED");
  const open = trades.filter((t) => t.status === "OPEN");
  return {
    totalPnl: totalPnl(closed),
    unrealizedPnl: totalPnl(open),
    realizedPnl: totalPnl(closed),
    winRate: winRate(closed),
    totalTradesCount: trades.length,
    openPositionsCount: open.length,
    closedTradesCount: closed.length
  };
}
async function getDashboardPerformance(userId, range) {
  const trades = await prisma.trade.findMany({
    where: { userId, status: "CLOSED" },
    orderBy: { closedAt: "asc" }
  });
  const curve = equityCurve(trades);
  return {
    value: totalPnl(trades),
    points: curve
  };
}
async function getOpenPositions(userId) {
  return prisma.trade.findMany({
    where: { userId, status: "OPEN" },
    orderBy: { openedAt: "desc" }
  });
}
async function getRecentActivity3(userId, limit) {
  return prisma.trade.findMany({
    where: { userId, status: "CLOSED" },
    orderBy: { closedAt: "desc" },
    take: limit
  });
}

// src/modules/Dashboard/dashboard.controller.ts
async function getStatsHandler(req, res) {
  try {
    const stats = await getDashboardStats(req.userId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getPerformanceHandler(req, res) {
  try {
    const data = await getDashboardPerformance(req.userId, req.query.range);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getOpenPositionsHandler(req, res) {
  try {
    const positions = await getOpenPositions(req.userId);
    res.json({ data: positions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getRecentActivityHandler(req, res) {
  try {
    const limit = Number(req.query.limit) || 10;
    const activity = await getRecentActivity3(req.userId, limit);
    res.json({ data: activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// src/modules/Dashboard/dashboard.routes.ts
var router3 = Router3();
router3.use(requireAuth);
router3.get("/stats", getStatsHandler);
router3.get("/performance", getPerformanceHandler);
router3.get("/open-positions", getOpenPositionsHandler);
router3.get("/recent-activity", getRecentActivityHandler);
var dashboard_routes_default = router3;

// src/modules/Upload/upload.routes.ts
import { Router as Router4 } from "express";
import multer from "multer";

// src/utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dl6twwnqv",
  api_key: process.env.CLOUDINARY_API_KEY || "582918856444237",
  api_secret: process.env.CLOUDINARY_API_SECRET || "6bKTUfGDWLDoYmR-rxSSmSnunEo",
  secure: true
});
async function uploadImageToCloudinary(fileBuffer, folder = "tradefxbook/journals") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto"
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
}
async function uploadBase64ToCloudinary(base64Data, folder = "tradefxbook/journals") {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: "auto"
  });
  return result.secure_url;
}

// src/modules/Upload/upload.controller.ts
async function uploadSingleImageHandler(req, res) {
  try {
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file.buffer, "tradefxbook/journals");
      return res.json({ url: imageUrl, success: true });
    }
    if (req.body.image) {
      const imageUrl = await uploadBase64ToCloudinary(req.body.image, "tradefxbook/journals");
      return res.json({ url: imageUrl, success: true });
    }
    return res.status(400).json({ error: "No image file or base64 data provided" });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({ error: err.message || "Image upload failed" });
  }
}
async function uploadMultipleImagesHandler(req, res) {
  try {
    const urls = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const url = await uploadImageToCloudinary(file.buffer, "tradefxbook/journals");
        urls.push(url);
      }
      return res.json({ urls, success: true });
    }
    if (req.body.images && Array.isArray(req.body.images)) {
      for (const img of req.body.images) {
        const url = await uploadBase64ToCloudinary(img, "tradefxbook/journals");
        urls.push(url);
      }
      return res.json({ urls, success: true });
    }
    return res.status(400).json({ error: "No image files provided" });
  } catch (err) {
    console.error("Cloudinary multiple upload error:", err);
    return res.status(500).json({ error: err.message || "Multiple image upload failed" });
  }
}

// src/modules/Upload/upload.routes.ts
var upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  },
  storage: multer.memoryStorage()
});
var router4 = Router4();
router4.post("/image", upload.single("image"), uploadSingleImageHandler);
router4.post("/images", upload.array("images", 10), uploadMultipleImagesHandler);
var upload_routes_default = router4;

// src/routes/index.ts
var router5 = Router5();
router5.use("/users", users_routes_default);
router5.use("/trades", trades_routes_default);
router5.use("/dashboard", dashboard_routes_default);
router5.use("/upload", upload_routes_default);
var routes_default = router5;

// src/app.ts
var app = express();
app.use(morgan("dev"));
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", routes_default);
app.get("/", (req, res) => {
  res.send("TradeFXBook Server is running \u{1F680}");
});
app.use(globalErrorHandler);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
