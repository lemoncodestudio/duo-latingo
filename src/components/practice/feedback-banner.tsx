"use client";

import { Button } from "@/components/ui/button";
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
        "fixed bottom-0 left-0 right-0 p-4 border-t-2 animate-in slide-in-from-bottom duration-200",
        isCorrect
          ? "bg-green-50 border-[#58CC02]"
          : "bg-red-50 border-[#FF4B4B]"
      )}
    >
      <div className="max-w-lg mx-auto space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
          <div>
            <p
              className={cn(
                "font-bold",
                isCorrect ? "text-[#58CC02]" : "text-[#FF4B4B]"
              )}
            >
              {isCorrect ? "Goed zo!" : "Helaas, fout"}
            </p>
            {!isCorrect && (
              <p className="text-sm text-muted-foreground">
                Correct antwoord: <strong>{correctAnswer}</strong>
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={onContinue}
          className={cn(
            "w-full font-bold h-12 rounded-xl text-white",
            isCorrect
              ? "bg-[#58CC02] hover:bg-[#4CAF00]"
              : "bg-[#FF4B4B] hover:bg-[#E04343]"
          )}
        >
          Doorgaan
        </Button>
      </div>
    </div>
  );
}
