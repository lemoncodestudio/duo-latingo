/**
 * Calculate XP earned for a practice session.
 * Base: 10 XP per correct answer
 * Bonus: +5 XP for streak of 5+
 * Perfect bonus: +20 XP for all correct
 */
export function calculateXP(
  correctAnswers: number,
  totalQuestions: number,
  currentStreak: number
): number {
  let xp = correctAnswers * 10;

  // Streak bonus
  if (currentStreak >= 5) {
    xp += 5;
  }

  // Perfect session bonus
  if (correctAnswers === totalQuestions && totalQuestions > 0) {
    xp += 20;
  }

  return xp;
}
