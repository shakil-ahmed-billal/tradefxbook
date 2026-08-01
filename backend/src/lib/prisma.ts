import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import config from "../config";

const rawConnectionString = config.database_url || process.env.DATABASE_URL || "";

/**
 * Remove sslmode/ssl parameters from connection string so `pg` does not
 * attempt strict certificate validation (verify-full) or throw SECURITY WARNINGs.
 */
function getCleanConnectionString(rawUrl: string): string {
  if (!rawUrl) return "";
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.delete("sslmode");
    parsed.searchParams.delete("ssl");
    parsed.searchParams.delete("uselibpqcompat");
    return parsed.toString();
  } catch {
    return rawUrl.replace(/([?&])(sslmode|ssl|uselibpqcompat)=[^&]*&?/g, "$1").replace(/[?&]$/, "");
  }
}

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
const connectionString = getCleanConnectionString(rawConnectionString);

const pool = new Pool({
  connectionString,
  ssl: isProduction || rawConnectionString.includes("sslmode=")
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


