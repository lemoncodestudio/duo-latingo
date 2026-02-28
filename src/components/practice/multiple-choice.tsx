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

const badgeColors = [
  "bg-ocean text-white",
  "bg-teal text-teal-fg",
  "bg-amber text-amber-fg",
  "bg-purple text-white",
];

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
                "w-full p-4 rounded-2xl border-2 border-b-4 text-left font-medium transition-all flex items-center gap-3",
                "active:border-b-2 active:translate-y-[2px]",
                !feedback && !isSelected && "border-white/[0.08] bg-card hover:border-white/[0.15]",
                !feedback && isSelected && "border-ocean-dark bg-ocean/12 border-b-4",
                isCorrectOption &&
                  "border-teal-dark bg-teal/12 text-teal border-b-4 animate-scale-pop",
                isWrongSelection &&
                  "border-rose-dark bg-rose/12 text-rose border-b-4 animate-shake-wrong",
                disabled && !isCorrectOption && !isWrongSelection && "opacity-50"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0",
                  isCorrectOption
                    ? "bg-teal text-teal-fg"
                    : isWrongSelection
                    ? "bg-rose text-white"
                    : badgeColors[index % badgeColors.length]
                )}
              >
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
