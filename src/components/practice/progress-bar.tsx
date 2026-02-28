"use client";

import { Progress } from "@/components/ui/progress";

interface PracticeProgressBarProps {
  current: number;
  total: number;
  results: (boolean | null)[];
}

export function PracticeProgressBar({
  current,
  total,
  results,
}: PracticeProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <button className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        <div className="flex-1 mx-4">
          <Progress value={percentage} className="h-3 bg-gray-200 [&>div]:bg-[#58CC02]" />
        </div>
        <span className="text-muted-foreground font-medium">
          {current}/{total}
        </span>
      </div>
      <div className="flex gap-1">
        {results.map((result, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              result === null
                ? "bg-gray-200"
                : result
                ? "bg-[#58CC02]"
                : "bg-[#FF4B4B]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
