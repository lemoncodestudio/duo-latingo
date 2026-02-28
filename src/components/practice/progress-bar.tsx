"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const router = useRouter();
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-dim hover:text-soft"
        >
          <X className="size-6" />
        </button>
        <div className="flex-1 mx-4">
          <div className="relative h-4 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                background: "var(--gradient-hero)",
              }}
            />
            {/* Shine gradient overlay */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
              }}
            />
          </div>
        </div>
        <span className="text-muted-foreground font-bold">
          {current}/{total}
        </span>
      </div>
      <div className="flex gap-1">
        {results.map((result, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              result === null
                ? "bg-white/[0.06]"
                : result
                ? "bg-teal animate-scale-pop"
                : "bg-rose"
            )}
          />
        ))}
      </div>
    </div>
  );
}
