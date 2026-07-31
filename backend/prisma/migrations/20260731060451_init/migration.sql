-- CreateEnum
CREATE TYPE "PlanTier" AS ENUM ('FREE', 'PRO', 'ELITE');

-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('LONG', 'SHORT');

-- CreateEnum
CREATE TYPE "TradeSource" AS ENUM ('MANUAL', 'MT4', 'MT5');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "BrokerPlatform" AS ENUM ('MT4', 'MT5');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('CONNECTED', 'DISCONNECTED', 'SYNCING', 'ERROR');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "profileBio" TEXT,
    "resumeLink" TEXT,
    "linkedinLink" TEXT,
    "portfolioLink" TEXT,
    "resumeContent" TEXT,
    "skills" TEXT,
    "experience" TEXT,
    "education" TEXT,
    "certifications" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkId" TEXT,
    "plan" "PlanTier" NOT NULL DEFAULT 'FREE',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "broker_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "BrokerPlatform" NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "broker_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brokerAccountId" TEXT,
    "symbol" TEXT NOT NULL,
    "type" "TradeType" NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'CLOSED',
    "source" "TradeSource" NOT NULL DEFAULT 'MANUAL',
    "entryPrice" DECIMAL(18,5) NOT NULL,
    "exitPrice" DECIMAL(18,5),
    "quantity" DECIMAL(18,2) NOT NULL,
    "pnl" DECIMAL(18,2),
    "commission" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "swap" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_entries" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "preAnalysis" TEXT,
    "postReview" TEXT,
    "emotions" TEXT,
    "lessons" TEXT,
    "followedPlan" BOOLEAN NOT NULL DEFAULT false,
    "properRisk" BOOLEAN NOT NULL DEFAULT false,
    "goodEntry" BOOLEAN NOT NULL DEFAULT false,
    "patientExit" BOOLEAN NOT NULL DEFAULT false,
    "selfRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_clerkId_key" ON "user"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "trades_userId_openedAt_idx" ON "trades"("userId", "openedAt");

-- CreateIndex
CREATE INDEX "trades_userId_symbol_idx" ON "trades"("userId", "symbol");

-- CreateIndex
CREATE UNIQUE INDEX "journal_entries_tradeId_key" ON "journal_entries"("tradeId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broker_accounts" ADD CONSTRAINT "broker_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_brokerAccountId_fkey" FOREIGN KEY ("brokerAccountId") REFERENCES "broker_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
