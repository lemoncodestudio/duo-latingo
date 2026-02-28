import type { Vocabulary, UserWordProgress } from "@/lib/supabase/types";

interface WordWithProgress {
  vocabulary: Vocabulary;
  progress: UserWordProgress | null;
}

/**
 * SM-2 based word selector. Prioritizes:
 * 1. New words (no progress yet)
 * 2. Words due for review (next_review <= now)
 * 3. Words with low ease factor (struggling)
 * 4. Random known words for reinforcement
 */
export function selectWords(
  allWords: Vocabulary[],
  progressMap: Map<string, UserWordProgress>,
  count: number = 15
): WordWithProgress[] {
  const now = new Date();
  const selected: WordWithProgress[] = [];

  // Categorize words
  const newWords: WordWithProgress[] = [];
  const dueWords: WordWithProgress[] = [];
  const otherWords: WordWithProgress[] = [];

  for (const word of allWords) {
    const progress = progressMap.get(word.id) || null;

    if (!progress) {
      newWords.push({ vocabulary: word, progress: null });
    } else if (new Date(progress.next_review) <= now) {
      dueWords.push({ vocabulary: word, progress });
    } else {
      otherWords.push({ vocabulary: word, progress });
    }
  }

  // Sort due words by urgency (lowest ease factor first)
  dueWords.sort((a, b) => {
    const easeA = a.progress?.ease_factor ?? 2.5;
    const easeB = b.progress?.ease_factor ?? 2.5;
    return easeA - easeB;
  });

  // Shuffle new words and other words
  shuffle(newWords);
  shuffle(otherWords);

  // Mix: ~40% new, ~40% due, ~20% reinforcement
  const maxNew = Math.min(Math.ceil(count * 0.4), newWords.length);
  const maxDue = Math.min(Math.ceil(count * 0.4), dueWords.length);

  selected.push(...newWords.slice(0, maxNew));
  selected.push(...dueWords.slice(0, maxDue));

  // Fill remaining with other words
  const remaining = count - selected.length;
  if (remaining > 0) {
    // First try to add more due/new words
    const extraNew = newWords.slice(maxNew);
    const extraDue = dueWords.slice(maxDue);
    const extras = [...extraDue, ...extraNew, ...otherWords];
    selected.push(...extras.slice(0, remaining));
  }

  // If we still don't have enough (small vocabulary), allow duplicates
  if (selected.length < count && allWords.length > 0) {
    while (selected.length < count) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
      selected.push({
        vocabulary: randomWord,
        progress: progressMap.get(randomWord.id) || null,
      });
    }
  }

  shuffle(selected);
  return selected.slice(0, count);
}

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
