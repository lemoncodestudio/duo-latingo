"use client";

import { useState } from "react";
import type { Question } from "@/lib/practice/question-generator";
import { Input } from "@/components/ui/input";
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
        <Input
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
            "text-center text-lg h-14 rounded-xl border-2",
            feedback &&
              feedback.isCorrect &&
              "border-[#58CC02] bg-green-50",
            feedback &&
              !feedback.isCorrect &&
              "border-[#FF4B4B] bg-red-50"
          )}
        />
        {!feedback && (
          <Button
            type="submit"
            disabled={!input.trim() || disabled}
            className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold h-12 rounded-xl"
          >
            Controleer
          </Button>
        )}
      </form>

      {feedback && !feedback.isCorrect && (
        <div className="text-center p-3 bg-red-50 rounded-xl border border-red-200">
          <p className="text-sm text-muted-foreground">Correcte antwoord:</p>
          <p className="font-bold text-lg text-[#FF4B4B]">
            {feedback.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
