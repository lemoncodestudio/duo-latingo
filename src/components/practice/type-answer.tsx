"use client";

import { useState } from "react";
import type { Question } from "@/lib/practice/question-generator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TypeAnswerProps {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  feedback: { isCorrect: boolean; correctAnswer: string } | null;
}

export function TypeAnswer({
  question,
  onAnswer,
  disabled,
  feedback,
}: TypeAnswerProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onAnswer(input.trim());
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          {question.direction === "latin_to_dutch"
            ? "Typ de Nederlandse vertaling"
            : "Typ de Latijnse vertaling"}
        </p>
        <p className="text-3xl font-bold">{question.prompt}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            question.direction === "latin_to_dutch"
              ? "Nederlands..."
              : "Latijn..."
          }
          disabled={disabled}
          autoFocus
          className={cn(
            "w-full text-center text-xl font-semibold h-16 rounded-2xl border-2 border-b-4 bg-card px-4 outline-none transition-all text-foreground placeholder:text-white/25",
            "focus:border-ocean-dark focus:ring-2 focus:ring-ocean/25",
            !feedback && "border-white/[0.08]",
            feedback &&
              feedback.isCorrect &&
              "border-teal-dark bg-teal/12 animate-scale-pop",
            feedback &&
              !feedback.isCorrect &&
              "border-rose-dark bg-rose/12 animate-shake-wrong"
          )}
        />
        {!feedback && (
          <Button
            type="submit"
            variant="duo"
            size="duo"
            disabled={!input.trim() || disabled}
            className="w-full"
          >
            Controleer
          </Button>
        )}
      </form>

      {feedback && !feedback.isCorrect && (
        <div className="text-center p-3 bg-rose/12 rounded-2xl border border-rose/20">
          <p className="text-sm text-muted-foreground">Correcte antwoord:</p>
          <p className="font-bold text-lg text-rose">
            {feedback.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
