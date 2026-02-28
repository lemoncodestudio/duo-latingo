import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-lg text-center space-y-8">
        <div className="space-y-4">
          <div className="text-7xl">🏛️</div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Duo Latingo
          </h1>
          <p className="text-lg text-muted-foreground">
            Leer Latijn op een leuke manier. Upload je werkboek, oefen dagelijks
            en houd je streak bij!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-3xl">📸</div>
            <p className="text-sm font-medium">Upload foto&apos;s</p>
            <p className="text-xs text-muted-foreground">
              Van je werkboek
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl">🧠</div>
            <p className="text-sm font-medium">Slim oefenen</p>
            <p className="text-xs text-muted-foreground">
              Spaced repetition
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl">🔥</div>
            <p className="text-sm font-medium">Streaks</p>
            <p className="text-xs text-muted-foreground">
              Dagelijks leren
            </p>
          </div>
        </div>

        <Link href="/login">
          <Button
            size="lg"
            className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold text-lg h-14 rounded-xl mt-4"
          >
            Begin nu — Gratis!
          </Button>
        </Link>
      </div>
    </div>
  );
}
