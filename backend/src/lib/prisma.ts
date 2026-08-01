import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import config from "../config";

const connectionString = config.database_url || process.env.DATABASE_URL || "";

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

const pool = new Pool({
  connectionString,
  ssl: isProduction || connectionString.includes("sslmode=")
    ? { rejectUnauthorized: false }
    : undefined,
});

const adapter = new PrismaPg(pool);

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

