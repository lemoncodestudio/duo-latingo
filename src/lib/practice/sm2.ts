import type { UserWordProgress } from "@/lib/supabase/types";

/**
 * SM-2 spaced repetition algorithm.
 * Updates progress based on quality of response (0-5).
 */
export function updateSM2(
  progress: UserWordProgress | null,
  quality: number
): {
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review: string;
} {
  const ef = progress?.ease_factor ?? 2.5;
  const interval = progress?.interval ?? 0;
  const repetitions = progress?.repetitions ?? 0;

  let newEF = ef;
  let newInterval: number;
  let newReps: number;

  if (quality >= 3) {
    // Correct answer
    if (repetitions === 0) {
      newInterval = 1; // 1 day
    } else if (repetitions === 1) {
      newInterval = 6; // 6 days
    } else {
      newInterval = Math.round(interval * ef);
    }
    newReps = repetitions + 1;
  } else {
    // Incorrect - reset
    newInterval = 0; // Review again soon
    newReps = 0;
  }

  // Update ease factor
  newEF = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEF = Math.max(1.3, newEF); // Minimum ease factor

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    ease_factor: newEF,
    interval: newInterval,
    repetitions: newReps,
    next_review: nextReview.toISOString(),
  };
}
