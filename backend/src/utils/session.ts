export type Session = 'ASIAN' | 'LONDON' | 'NEW_YORK';

export function classifySession(openedAt: Date): Session {
  const hour = openedAt.getUTCHours();
  if (hour >= 22 || hour < 8) return 'ASIAN';
  if (hour >= 8 && hour < 13) return 'LONDON';
  return 'NEW_YORK';
}
