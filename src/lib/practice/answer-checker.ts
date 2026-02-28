/**
 * Check a user's answer against the correct answer.
 * Returns SM-2 quality score:
 * - 5: perfect (exact match)
 * - 4: correct with minor typo (Levenshtein ≤ 2)
 * - 1: incorrect
 */
export function checkAnswer(
  givenAnswer: string,
  correctAnswer: string
): { isCorrect: boolean; quality: number } {
  const given = normalize(givenAnswer);
  const correct = normalize(correctAnswer);

  if (given === correct) {
    return { isCorrect: true, quality: 5 };
  }

  // Allow minor typos
  const distance = levenshtein(given, correct);
  const maxTypoDistance = correct.length <= 4 ? 1 : 2;

  if (distance <= maxTypoDistance) {
    return { isCorrect: true, quality: 4 };
  }

  return { isCorrect: false, quality: 1 };
}

function normalize(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?'"()]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
