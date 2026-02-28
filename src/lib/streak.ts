import type { Profile } from "@/lib/supabase/types";

/**
 * Calculate updated streak based on last practice date and current date.
 * Client sends local date for timezone correctness.
 */
export function calculateStreak(
  profile: Profile,
  localDateStr: string
): { streak: number; longest_streak: number } {
  const today = new Date(localDateStr);
  today.setHours(0, 0, 0, 0);

  const lastPractice = profile.last_practice_date
    ? new Date(profile.last_practice_date)
    : null;

  if (lastPractice) {
    lastPractice.setHours(0, 0, 0, 0);
  }

  let newStreak = profile.streak;

  if (!lastPractice) {
    // First ever session
    newStreak = 1;
  } else {
    const diffDays = Math.floor(
      (today.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Already practiced today, no change
      return { streak: profile.streak, longest_streak: profile.longest_streak };
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak = profile.streak + 1;
    } else {
      // Missed days, reset streak
      newStreak = 1;
    }
  }

  const longestStreak = Math.max(newStreak, profile.longest_streak);

  return { streak: newStreak, longest_streak: longestStreak };
}
