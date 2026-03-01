export function DailyTipCard() {
  return (
    <div className="relative p-5 rounded-xl overflow-hidden bg-[linear-gradient(135deg,rgba(147,112,219,0.1)_0%,rgba(64,224,208,0.06)_100%)] border border-purple/12">
      <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-[radial-gradient(circle,rgba(147,112,219,0.15),transparent_70%)]" />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">💡</span>
        <span className="text-[0.68rem] font-extrabold uppercase tracking-widest text-purple-light bg-purple/15 px-2.5 py-0.5 rounded-full">
          Tip van de dag
        </span>
      </div>
      <p className="text-sm text-soft leading-relaxed font-semibold relative z-10">
        Probeer elke dag <strong className="text-teal-light font-extrabold">minstens 5 minuten</strong> te oefenen.
        Korte, regelmatige sessies werken beter dan lange marathons!
      </p>
    </div>
  );
}
