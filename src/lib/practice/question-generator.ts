import type { Vocabulary, UserWordProgress } from "@/lib/supabase/types";

export type QuestionType = "multiple_choice" | "type_answer";
export type Direction = "latin_to_dutch" | "dutch_to_latin";

export interface Question {
  id: string;
  vocabularyId: string;
  type: QuestionType;
  direction: Direction;
  prompt: string;
  correctAnswer: string;
  options?: string[]; // For multiple choice
}

interface WordWithProgress {
  vocabulary: Vocabulary;
  progress: UserWordProgress | null;
}

/**
 * Generate questions for a practice session.
 * - New/weak words → multiple choice
 * - Known words → type answer
 * - Mix of latin→dutch and dutch→latin directions
 */
export function generateQuestions(
  words: WordWithProgress[],
  allVocabulary: Vocabulary[]
): Question[] {
  return words.map((word, index) => {
    const isNew = !word.progress || word.progress.repetitions < 2;
    const isWeak = word.progress && word.progress.ease_factor < 2.0;

    const type: QuestionType =
      isNew || isWeak ? "multiple_choice" : pickQuestionType(word.progress!);

    // Alternate directions, with slight bias toward dutch→latin (harder)
    const direction: Direction =
      Math.random() < 0.55 ? "dutch_to_latin" : "latin_to_dutch";

    const question: Question = {
      id: `q-${index}`,
      vocabularyId: word.vocabulary.id,
      type,
      direction,
      prompt:
        direction === "latin_to_dutch"
          ? word.vocabulary.latin
          : word.vocabulary.dutch,
      correctAnswer:
        direction === "latin_to_dutch"
          ? word.vocabulary.dutch
          : word.vocabulary.latin,
    };

    if (type === "multiple_choice") {
      question.options = generateOptions(
        word.vocabulary,
        allVocabulary,
        direction
      );
    }

    return question;
  });
}

function pickQuestionType(progress: UserWordProgress): QuestionType {
  // More repetitions → higher chance of type_answer
  const typeAnswerChance = Math.min(0.8, 0.3 + progress.repetitions * 0.1);
  return Math.random() < typeAnswerChance ? "type_answer" : "multiple_choice";
}

function generateOptions(
  correctWord: Vocabulary,
  allVocabulary: Vocabulary[],
  direction: Direction
): string[] {
  const correctAnswer =
    direction === "latin_to_dutch" ? correctWord.dutch : correctWord.latin;

  // Get distractors from other vocabulary
  const distractors = allVocabulary
    .filter((v) => v.id !== correctWord.id)
    .map((v) => (direction === "latin_to_dutch" ? v.dutch : v.latin));

  // Shuffle and take 3 distractors
  const shuffled = distractors.sort(() => Math.random() - 0.5);
  const options = [correctAnswer, ...shuffled.slice(0, 3)];

  // If we don't have enough distractors, pad with placeholder
  while (options.length < 4) {
    options.push(direction === "latin_to_dutch" ? "???" : "???");
  }

  // Shuffle options so correct answer isn't always first
  return options.sort(() => Math.random() - 0.5);
}
