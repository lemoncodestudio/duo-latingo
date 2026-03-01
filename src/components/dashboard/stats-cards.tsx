interface StatsCardsProps {
  xp: number;
  wordsLearned: number;
  sessionsCompleted: number;
}

export function StatsCards({ xp, wordsLearned, sessionsCompleted }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {/* XP */}
      <div className="rounded-xl p-4 text-center border border-teal/12 bg-[linear-gradient(160deg,rgba(64,224,208,0.15)_0%,rgba(64,224,208,0.04)_100%)] transition-all hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(64,224,208,0.15),0_0_60px_rgba(64,224,208,0.05)]">
        <div className="text-xl mb-1.5">⚡</div>
        <div className="text-2xl font-extrabold text-teal leading-none">
          {xp.toLocaleString()}
        </div>
        <div className="text-[0.72rem] text-dim mt-1 font-bold uppercase tracking-wide">
          XP
        </div>
      </div>

      {/* Woorden */}
      <div className="rounded-xl p-4 text-center border border-purple/12 bg-[linear-gradient(160deg,rgba(147,112,219,0.15)_0%,rgba(147,112,219,0.04)_100%)] transition-all hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(147,112,219,0.15)]">
        <div className="text-xl mb-1.5">📚</div>
        <div className="text-2xl font-extrabold text-purple-light leading-none">
          {wordsLearned}
        </div>
        <div className="text-[0.72rem] text-dim mt-1 font-bold uppercase tracking-wide">
          Woorden
        </div>
      </div>

      {/* Sessies */}
      <div className="rounded-xl p-4 text-center border border-green/12 bg-[linear-gradient(160deg,rgba(74,222,128,0.15)_0%,rgba(74,222,128,0.04)_100%)] transition-all hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]">
        <div className="text-xl mb-1.5">✅</div>
        <div className="text-2xl font-extrabold text-green leading-none">
          {sessionsCompleted}
        </div>
        <div className="text-[0.72rem] text-dim mt-1 font-bold uppercase tracking-wide">
          Sessies
        </div>
      </div>
    </div>
  );
}
