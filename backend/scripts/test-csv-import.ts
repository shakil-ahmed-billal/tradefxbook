import "dotenv/config";
import fs from "fs";
import path from "path";
import { prisma } from "../src/lib/prisma";
import { importTradesFromCsv } from "../src/modules/Trades/trades.service";

async function testImport() {
  console.log("=== STARTING CSV IMPORT DEDUPLICATION TEST ===");

  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found in DB!");
    process.exit(1);
  }
  console.log(`Using test user: ${user.id} (${user.email})`);

  // Clear existing trades for clean test
  await prisma.trade.deleteMany({ where: { userId: user.id } });
  console.log("Cleared existing trades for user.");

  const file1Path = "c:/Users/shaki/Desktop/Shakil Dev/tradefxbook/broker-data/exness/01_01_2007-31_07_2026.csv";
  const file2Path = "c:/Users/shaki/Desktop/Shakil Dev/tradefxbook/broker-data/exness/01_01_2007-01_08_2026.csv";

  const csvText1 = fs.readFileSync(file1Path, "utf-8");
  const csvText2 = fs.readFileSync(file2Path, "utf-8");

  console.log("\n--- STEP 1: Importing File 1 (31_07_2026.csv) ---");
  const res1 = await importTradesFromCsv(user.id, { csvText: csvText1 });
  console.log("Result 1:", res1);
  const count1 = await prisma.trade.count({ where: { userId: user.id } });
  console.log(`Total trades in DB after File 1: ${count1}`);

  console.log("\n--- STEP 2: Importing File 2 (01_08_2026.csv) ---");
  const res2 = await importTradesFromCsv(user.id, { csvText: csvText2 });
  console.log("Result 2:", res2);
  const count2 = await prisma.trade.count({ where: { userId: user.id } });
  console.log(`Total trades in DB after File 2: ${count2}`);

  console.log("\n--- STEP 3: Re-importing File 2 (01_08_2026.csv) AGAIN ---");
  const res3 = await importTradesFromCsv(user.id, { csvText: csvText2 });
  console.log("Result 3:", res3);
  const count3 = await prisma.trade.count({ where: { userId: user.id } });
  console.log(`Total trades in DB after Re-importing File 2: ${count3}`);

  console.log("\n=== TEST COMPLETE ===");
}

testImport()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test Error:", err);
    process.exit(1);
  });
