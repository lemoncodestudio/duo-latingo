"use client";

import { useState } from "react";
import type { Question } from "@/lib/practice/question-generator";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  feedback: { isCorrect: boolean; correctAnswer: string } | null;
}

export function MultipleChoice({
  question,
  onAnswer,
  disabled,
  feedback,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          {question.direction === "latin_to_dutch"
            ? "Vertaal naar Nederlands"
            : "Vertaal naar Latijn"}
        </p>
        <p className="text-3xl font-bold">{question.prompt}</p>
      </div>

      <div className="grid gap-3">
        {question.options?.map((option, index) => {
          const isSelected = selected === option;
          const isCorrectOption = feedback && option === feedback.correctAnswer;
          const isWrongSelection =
            feedback && isSelected && !feedback.isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={disabled}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left font-medium transition-all",
                "hover:border-gray-300 active:scale-[0.98]",
                !feedback && !isSelected && "border-gray-200 bg-white",
                !feedback && isSelected && "border-blue-400 bg-blue-50",
                isCorrectOption &&
                  "border-[#58CC02] bg-green-50 text-[#58CC02]",
                isWrongSelection &&
                  "border-[#FF4B4B] bg-red-50 text-[#FF4B4B]",
                disabled && !isCorrectOption && !isWrongSelection && "opacity-50"
              )}
            >
              <span className="text-sm text-muted-foreground mr-2">
                {index + 1}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
