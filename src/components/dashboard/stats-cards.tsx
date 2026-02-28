interface StatsCardsProps {
  xp: number;
  wordsLearned: number;
  sessionsCompleted: number;
}

export function StatsCards({ xp, wordsLearned, sessionsCompleted }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-xl p-4 border text-center">
        <div className="text-2xl font-bold text-[#58CC02]">{xp}</div>
        <div className="text-xs text-muted-foreground mt-1">XP</div>
      </div>
      <div className="bg-white rounded-xl p-4 border text-center">
        <div className="text-2xl font-bold text-blue-500">{wordsLearned}</div>
        <div className="text-xs text-muted-foreground mt-1">Woorden</div>
      </div>
      <div className="bg-white rounded-xl p-4 border text-center">
        <div className="text-2xl font-bold text-purple-500">{sessionsCompleted}</div>
        <div className="text-xs text-muted-foreground mt-1">Sessies</div>
      </div>
    </div>
  );
}
