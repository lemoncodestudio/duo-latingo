import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateSM2 } from "@/lib/practice/sm2";
import { calculateStreak } from "@/lib/streak";
import { calculateXP } from "@/lib/xp";

interface AnswerPayload {
  sessionId: string;
  answers: {
    vocabularyId: string;
    questionType: string;
    direction: string;
    givenAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    quality: number;
  }[];
  localDate: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { sessionId, answers, localDate }: AnswerPayload =
    await request.json();

  if (!sessionId || !answers || !localDate) {
    return NextResponse.json({ error: "Data ontbreekt" }, { status: 400 });
  }

  // Save practice answers
  const answerInserts = answers.map((a) => ({
    session_id: sessionId,
    vocabulary_id: a.vocabularyId,
    question_type: a.questionType,
    direction: a.direction,
    given_answer: a.givenAnswer,
    correct_answer: a.correctAnswer,
    is_correct: a.isCorrect,
    quality: a.quality,
  }));

  await supabase.from("practice_answers").insert(answerInserts);

  // Update SM-2 progress for each word
  const vocabIds = [...new Set(answers.map((a) => a.vocabularyId))];
  const { data: existingProgress } = await supabase
    .from("user_word_progress")
    .select("*")
    .eq("user_id", user.id)
    .in("vocabulary_id", vocabIds);

  const progressMap = new Map(
    (existingProgress || []).map((p) => [p.vocabulary_id, p])
  );

  for (const answer of answers) {
    const existing = progressMap.get(answer.vocabularyId);
    const updated = updateSM2(existing || null, answer.quality);

    if (existing) {
      await supabase
        .from("user_word_progress")
        .update({
          ...updated,
          last_quality: answer.quality,
          times_correct: existing.times_correct + (answer.isCorrect ? 1 : 0),
          times_incorrect:
            existing.times_incorrect + (answer.isCorrect ? 0 : 1),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("user_word_progress").insert({
        user_id: user.id,
        vocabulary_id: answer.vocabularyId,
        ...updated,
        last_quality: answer.quality,
        times_correct: answer.isCorrect ? 1 : 0,
        times_incorrect: answer.isCorrect ? 0 : 1,
      });
    }
  }

  // Calculate score
  const correctCount = answers.filter((a) => a.isCorrect).length;

  // Update streak
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  let streakData = { streak: 1, longest_streak: 1 };
  if (profile) {
    streakData = calculateStreak(profile, localDate);
  }

  // Calculate XP
  const xpEarned = calculateXP(
    correctCount,
    answers.length,
    streakData.streak
  );

  // Update profile
  await supabase
    .from("profiles")
    .update({
      streak: streakData.streak,
      longest_streak: streakData.longest_streak,
      xp: (profile?.xp || 0) + xpEarned,
      last_practice_date: localDate,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  // Complete session
  await supabase
    .from("practice_sessions")
    .update({
      correct_answers: correctCount,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  return NextResponse.json({
    correctCount,
    totalQuestions: answers.length,
    xpEarned,
    streak: streakData.streak,
    isPerfect: correctCount === answers.length,
  });
}
