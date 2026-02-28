"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        // Dynamic import for confetti
        import("canvas-confetti").then((confetti) => {
          confetti.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#58CC02", "#FF9600", "#1CB0F6", "#FF4B4B"],
          });
        });
      }

      // Cleanup session storage
      sessionStorage.removeItem(`practice-${sessionId}`);
      sessionStorage.removeItem(`results-${sessionId}`);
    } else {
      router.push("/dashboard");
    }
  }, [sessionId, router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎯</div>
      </div>
    );
  }

  const percentage = Math.round(
    (results.correctCount / results.totalQuestions) * 100
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="text-6xl">
            {results.isPerfect
              ? "🏆"
              : percentage >= 80
              ? "🌟"
              : percentage >= 50
              ? "💪"
              : "📚"}
          </div>
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

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-2xl font-bold text-[#58CC02]">
              {results.correctCount}/{results.totalQuestions}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Correct</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-500">
              +{results.xpEarned}
            </div>
            <div className="text-xs text-muted-foreground mt-1">XP</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <div className="text-2xl font-bold text-[#FF9600]">
              {results.streak}🔥
            </div>
            <div className="text-xs text-muted-foreground mt-1">Streak</div>
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
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={percentage >= 80 ? "#58CC02" : percentage >= 50 ? "#FF9600" : "#FF4B4B"}
                strokeWidth="12"
                strokeDasharray={`${(percentage / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold h-14 rounded-xl"
            >
              Terug naar dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
