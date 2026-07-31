import { JournalEntry, Trade } from '@prisma/client';

export function tradeQualityScore(trade: Trade, journal: JournalEntry | null) {
  let profitability = 0;
  if (trade.pnl !== null) {
    const pnl = Number(trade.pnl);
    profitability = pnl > 0 ? 30 : pnl === 0 ? 15 : 0;
  }

  const execFlags = journal
    ? [journal.followedPlan, journal.properRisk, journal.goodEntry, journal.patientExit]
    : [false, false, false, false];
  const execution = execFlags.filter(Boolean).length * 10;

  const journalFields = journal
    ? [journal.preAnalysis, journal.postReview, journal.emotions, journal.lessons]
    : [null, null, null, null];
  const journalScore = journalFields.filter(f => !!f && f.trim().length > 0).length * 5;

  const rating = journal?.selfRating ?? 0;

  const total = profitability + execution + journalScore + rating;

  const grade =
    total >= 80 ? 'excellent' :
    total >= 60 ? 'good' :
    total >= 40 ? 'average' : 'needs-work';

  return {
    total,
    breakdown: { profitability, execution, journal: journalScore, rating },
    grade,
  };
}
