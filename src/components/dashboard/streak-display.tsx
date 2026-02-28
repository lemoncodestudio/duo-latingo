"use client";

interface StreakDisplayProps {
  streak: number;
  longestStreak: number;
}

export function StreakDisplay({ streak, longestStreak }: StreakDisplayProps) {
  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
      <div className="text-4xl">🔥</div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[#FF9600]">
            {streak}
          </span>
          <span className="text-sm font-medium text-orange-600">
            {streak === 1 ? "dag" : "dagen"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Langste streak: {longestStreak} dagen
        </p>
      </div>
    </div>
  );
}
