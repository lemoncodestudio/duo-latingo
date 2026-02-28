"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/lib/practice/question-generator";
import { checkAnswer } from "@/lib/practice/answer-checker";
import { PracticeProgressBar } from "@/components/practice/progress-bar";
import { MultipleChoice } from "@/components/practice/multiple-choice";
import { TypeAnswer } from "@/components/practice/type-answer";
import { FeedbackBanner } from "@/components/practice/feedback-banner";

interface AnswerRecord {
  vocabularyId: string;
  questionType: string;
  direction: string;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  quality: number;
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function PracticePage({ params }: Props) {
  const { sessionId } = use(params);
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Load questions from sessionStorage (set by start API)
    const stored = sessionStorage.getItem(`practice-${sessionId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuestions(parsed);
      setResults(new Array(parsed.length).fill(null));
    } else {
      // If no stored questions, go back
      router.push("/dashboard");
    }
    setLoading(false);
  }, [sessionId, router]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (givenAnswer: string) => {
    if (!currentQuestion) return;

    const result = checkAnswer(givenAnswer, currentQuestion.correctAnswer);

    const record: AnswerRecord = {
      vocabularyId: currentQuestion.vocabularyId,
      questionType: currentQuestion.type,
      direction: currentQuestion.direction,
      givenAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: result.isCorrect,
      quality: result.quality,
    };

    setAnswers((prev) => [...prev, record]);
    setResults((prev) => {
      const updated = [...prev];
      updated[currentIndex] = result.isCorrect;
      return updated;
    });
    setFeedback({
      isCorrect: result.isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
    });
  };

  const handleContinue = async () => {
    setFeedback(null);

    if (currentIndex + 1 >= questions.length) {
      // Session complete - submit all answers
      setSubmitting(true);
      try {
        const allAnswers = [
          ...answers,
        ];

        const res = await fetch("/api/practice/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: allAnswers,
            localDate: new Date().toISOString().split("T")[0],
          }),
        });

        const data = await res.json();

        // Store results for results page
        sessionStorage.setItem(
          `results-${sessionId}`,
          JSON.stringify(data)
        );

        router.push(`/practice/${sessionId}/results`);
      } catch {
        alert("Kon resultaten niet opslaan");
        router.push("/dashboard");
      }
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-bounce">🧠</div>
          <p className="text-muted-foreground">Sessie laden...</p>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-spin">⏳</div>
          <p className="text-muted-foreground">Resultaten verwerken...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 max-w-lg mx-auto w-full">
        <PracticeProgressBar
          current={currentIndex + 1}
          total={questions.length}
          results={results}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {currentQuestion.type === "multiple_choice" ? (
            <MultipleChoice
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={!!feedback}
              feedback={feedback}
            />
          ) : (
            <TypeAnswer
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={!!feedback}
              feedback={feedback}
            />
          )}
        </div>
      </div>

      {feedback && (
        <FeedbackBanner
          isCorrect={feedback.isCorrect}
          correctAnswer={feedback.correctAnswer}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
