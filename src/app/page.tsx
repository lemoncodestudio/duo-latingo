import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/shared/mascot";
import { Camera, Brain, Flame } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero section - ocean gradient */}
      <section
        className="w-full py-16 px-4 text-center text-white relative overflow-hidden"
        style={{ background: "linear-gradient(170deg, color-mix(in srgb, var(--color-teal) 15%, transparent) 0%, color-mix(in srgb, var(--color-purple) 10%, transparent) 50%, var(--background) 100%)" }}
      >
        <div className="absolute top-[-30%] right-[-20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(64,224,208,0.08)_0%,transparent_70%)]" />
        <div className="max-w-lg mx-auto space-y-6 relative z-10">
          <Mascot expression="excited" size={150} className="mx-auto animate-bounce-in" />
          <h1
            className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            Duo Latingo
          </h1>
          <p className="text-lg text-soft">
            Leer Latijn op een leuke manier. Upload je werkboek, oefen dagelijks
            en houd je streak bij!
          </p>
          <Link href="/login">
            <Button variant="duo" size="duo" className="w-full mt-4">
              Begin nu — Gratis!
            </Button>
          </Link>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full py-12 px-4 bg-surface">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ocean/12 border border-ocean/15">
              <Camera className="h-6 w-6 text-ocean" />
            </div>
            <p className="text-sm font-medium text-foreground">Upload foto&apos;s</p>
            <p className="text-xs text-muted-foreground">Van je werkboek</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple/12 border border-purple/15">
              <Brain className="h-6 w-6 text-purple-light" />
            </div>
            <p className="text-sm font-medium text-foreground">Slim oefenen</p>
            <p className="text-xs text-muted-foreground">Spaced repetition</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/12 border border-amber/15">
              <Flame className="h-6 w-6 text-amber" />
            </div>
            <p className="text-sm font-medium text-foreground">Streaks</p>
            <p className="text-xs text-muted-foreground">Dagelijks leren</p>
          </div>
        </div>
      </section>
    </div>
  );
}
