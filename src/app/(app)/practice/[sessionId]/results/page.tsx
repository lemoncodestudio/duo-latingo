"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/shared/mascot";
import { CheckCircle, Zap, Flame } from "lucide-react";

interface Results {
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  streak: number;
  isPerfect: boolean;
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function ResultsPage({ params }: Props) {
  const { sessionId } = use(params);
  const router = useRouter();
  const [results, setResults] = useState<Results | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`results-${sessionId}`);
    if (stored) {
      const parsed = JSON.parse(stored) as Results;
      setResults(parsed);

      if (parsed.isPerfect) {
        setShowConfetti(true);
        // Read CSS variable values for confetti colors
        const root = getComputedStyle(document.documentElement);
        const colors = [
          root.getPropertyValue("--color-teal").trim(),
          root.getPropertyValue("--color-amber").trim(),
          root.getPropertyValue("--color-ocean").trim(),
          root.getPropertyValue("--color-rose").trim(),
          root.getPropertyValue("--color-purple-light").trim(),
        ];

        import("canvas-confetti").then((confetti) => {
          const fire = () =>
            confetti.default({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors,
            });

          fire();
          setTimeout(fire, 300);
          setTimeout(fire, 700);
        });
      }

      sessionStorage.removeItem(`practice-${sessionId}`);
      sessionStorage.removeItem(`results-${sessionId}`);
    } else {
      router.push("/dashboard");
    }
  }, [sessionId, router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-4xl animate-bounce">
          <Zap className="w-10 h-10 text-teal" />
        </div>
      </div>
    );
  }

  const percentage = Math.round(
    (results.correctCount / results.totalQuestions) * 100
  );

  const bgClass =
    percentage >= 80
      ? "bg-teal/8"
      : percentage >= 50
      ? "bg-amber/8"
      : "bg-rose/8";

  const mascotExpression =
    percentage >= 80 ? "celebrating" : percentage >= 50 ? "happy" : "sad";

  const ringColor =
    percentage >= 80
      ? "var(--color-teal)"
      : percentage >= 50
      ? "var(--color-amber)"
      : "var(--color-rose)";

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-background ${bgClass}`}>
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4 animate-bounce-in">
          <Mascot expression={mascotExpression} size={120} />
          <h1 className="text-3xl font-extrabold">
            {results.isPerfect
              ? "Perfect!"
              : percentage >= 80
              ? "Goed gedaan!"
              : percentage >= 50
              ? "Gaat goed!"
              : "Blijf oefenen!"}
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 animate-scale-pop">
          <div className="rounded-2xl p-4 border border-teal/12 bg-[linear-gradient(160deg,_theme(colors.teal/0.15)_0%,_theme(colors.teal/0.04)_100%)]">
            <CheckCircle className="w-5 h-5 text-teal mx-auto mb-1" />
            <div className="text-2xl font-bold text-teal">
              {results.correctCount}/{results.totalQuestions}
            </div>
            <div className="text-xs text-dim mt-1 font-bold uppercase">Correct</div>
          </div>
          <div className="rounded-2xl p-4 border border-ocean/12 bg-[linear-gradient(160deg,_theme(colors.ocean/0.15)_0%,_theme(colors.ocean/0.04)_100%)]">
            <Zap className="w-5 h-5 text-ocean mx-auto mb-1" />
            <div className="text-2xl font-bold text-ocean">
              +{results.xpEarned}
            </div>
            <div className="text-xs text-dim mt-1 font-bold uppercase">XP</div>
          </div>
          <div className="rounded-2xl p-4 border border-amber/12 bg-[linear-gradient(160deg,_theme(colors.amber/0.15)_0%,_theme(colors.amber/0.04)_100%)]">
            <Flame className="w-5 h-5 text-amber mx-auto mb-1" />
            <div className="text-2xl font-bold text-amber">
              {results.streak}
            </div>
            <div className="text-xs text-dim mt-1 font-bold uppercase">Streak</div>
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="12"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={ringColor}
                strokeWidth="12"
                strokeDasharray={`${(percentage / 100) * 352} 352`}
                strokeLinecap="round"
                className="animate-ring-fill"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <Button variant="duo" size="duo" className="w-full">
              Terug naar dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
