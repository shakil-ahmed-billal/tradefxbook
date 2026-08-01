import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function cleanupDuplicates() {
  console.log("Starting duplicate cleanup on database...");

  const countBefore = await prisma.trade.count();
  console.log(`Total trades in DB before cleanup: ${countBefore}`);

  const result = await prisma.$executeRawUnsafe(`
    DELETE FROM trades
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM trades
      GROUP BY "userId", symbol, type, "openedAt", "entryPrice", quantity
    );
  `);

  console.log(`Deleted duplicate rows count: ${result}`);

  const countAfter = await prisma.trade.count();
  console.log(`Total trades in DB after cleanup: ${countAfter}`);
}

cleanupDuplicates()
  .then(() => {
    console.log("Cleanup complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Cleanup error:", err);
    process.exit(1);
  });
