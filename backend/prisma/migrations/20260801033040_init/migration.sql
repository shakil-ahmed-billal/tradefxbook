-- AlterTable
ALTER TABLE "journal_entries" ADD COLUMN     "checklist" JSONB,
ADD COLUMN     "riskRewardReward" DOUBLE PRECISION,
ADD COLUMN     "riskRewardRisk" DOUBLE PRECISION,
ADD COLUMN     "screenshots" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
