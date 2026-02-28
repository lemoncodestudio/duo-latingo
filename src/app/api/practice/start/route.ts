import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { selectWords } from "@/lib/practice/word-selector";
import { generateQuestions } from "@/lib/practice/question-generator";
import type { UserWordProgress } from "@/lib/supabase/types";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { courseId } = await request.json();

  if (!courseId) {
    return NextResponse.json(
      { error: "Cursus ID ontbreekt" },
      { status: 400 }
    );
  }

  // Get all chapters for this course
  const { data: chapters } = await supabase
    .from("chapters")
    .select("id")
    .eq("course_id", courseId);

  if (!chapters || chapters.length === 0) {
    return NextResponse.json(
      { error: "Geen hoofdstukken gevonden" },
      { status: 400 }
    );
  }

  const chapterIds = chapters.map((c) => c.id);

  // Get all vocabulary for these chapters
  const { data: vocabulary } = await supabase
    .from("vocabulary")
    .select("*")
    .in("chapter_id", chapterIds);

  if (!vocabulary || vocabulary.length < 4) {
    return NextResponse.json(
      { error: "Te weinig woorden (minimaal 4 nodig)" },
      { status: 400 }
    );
  }

  // Get user's progress for these words
  const vocabIds = vocabulary.map((v) => v.id);
  const { data: progress } = await supabase
    .from("user_word_progress")
    .select("*")
    .eq("user_id", user.id)
    .in("vocabulary_id", vocabIds);

  // Build progress map
  const progressMap = new Map<string, UserWordProgress>();
  (progress || []).forEach((p) => progressMap.set(p.vocabulary_id, p));

  // Select words and generate questions
  const selectedWords = selectWords(vocabulary, progressMap, 15);
  const questions = generateQuestions(selectedWords, vocabulary);

  // Create practice session
  const { data: session, error } = await supabase
    .from("practice_sessions")
    .insert({
      user_id: user.id,
      course_id: courseId,
      total_questions: questions.length,
    })
    .select()
    .single();

  if (error || !session) {
    return NextResponse.json(
      { error: "Kon sessie niet aanmaken" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    sessionId: session.id,
    questions,
  });
}
