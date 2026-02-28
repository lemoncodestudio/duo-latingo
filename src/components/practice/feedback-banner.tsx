"use client";

import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/shared/mascot";
import { cn } from "@/lib/utils";

interface FeedbackBannerProps {
  isCorrect: boolean;
  correctAnswer: string;
  onContinue: () => void;
}

export function FeedbackBanner({
  isCorrect,
  correctAnswer,
  onContinue,
}: FeedbackBannerProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 p-4 border-t animate-in slide-in-from-bottom duration-200 backdrop-blur-xl",
        isCorrect
          ? "bg-teal/10 border-teal/20"
          : "bg-rose/10 border-rose/20"
      )}
    >
      <div className="max-w-lg mx-auto space-y-3">
        <div className="flex items-center gap-3">
          <Mascot
            expression={isCorrect ? "celebrating" : "sad"}
            size={56}
            className="shrink-0"
          />
          <div className="flex-1">
            <p
              className={cn(
                "font-extrabold text-lg",
                isCorrect ? "text-teal" : "text-rose"
              )}
            >
              {isCorrect ? "Goed zo!" : "Helaas, fout"}
            </p>
            {!isCorrect && (
              <p className="text-sm text-muted-foreground">
                Correct antwoord: <strong className="text-foreground">{correctAnswer}</strong>
              </p>
            )}
          </div>
          {isCorrect && (
            <span className="text-teal font-extrabold text-sm animate-float-up">
              +10 XP
            </span>
          )}
        </div>
        <Button
          onClick={onContinue}
          variant={isCorrect ? "duo" : "duo-red"}
          size="duo"
          className="w-full"
        >
          Doorgaan
        </Button>
      </div>
    </div>
  );
}
