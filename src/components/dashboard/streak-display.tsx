"use client";

import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  streak: number;
  longestStreak: number;
}

const weekDays = ["M", "D", "W", "D", "V", "Z", "Z"];

export function StreakDisplay({ streak, longestStreak }: StreakDisplayProps) {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="relative flex items-center gap-4 p-5 rounded-xl overflow-hidden border border-amber/15 bg-[linear-gradient(135deg,_theme(colors.amber/0.12)_0%,_theme(colors.amber-dark/0.06)_100%)]">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[120px] h-full bg-[radial-gradient(circle_at_100%_50%,_theme(colors.amber/0.1),transparent_70%)]" />

      {/* Flame icon with glow */}
      <div className="relative w-[52px] h-[52px] flex items-center justify-center text-3xl shrink-0 animate-flame">
        <div className="absolute inset-[-8px] rounded-full bg-[radial-gradient(circle,_theme(colors.amber/0.3),transparent_70%)] animate-glow-pulse" />
        <span className="relative">🔥</span>
      </div>

      {/* Streak info */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[2rem] font-extrabold text-amber leading-none">
            {streak}
          </span>
          <span className="text-sm font-bold text-amber/70">
            {streak === 1 ? "dag" : "dagen"}
          </span>
        </div>
        <p className="text-xs text-dim font-semibold mt-0.5">
          Langste streak: {longestStreak} dagen
        </p>
      </div>

      {/* Week day indicators */}
      <div className="flex gap-1.5 ml-auto relative z-10">
        {weekDays.map((day, i) => {
          const isActive = i < todayIndex;
          const isToday = i === todayIndex;
          return (
            <div
              key={i}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-extrabold border-2",
                isActive &&
                  "bg-[linear-gradient(135deg,_theme(colors.amber),_theme(colors.amber-dark))] border-transparent text-amber-fg shadow-[0_0_8px_theme(colors.amber/0.3)]",
                isToday &&
                  "border-amber text-amber animate-today-pulse",
                !isActive &&
                  !isToday &&
                  "border-amber/15 text-dim"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
