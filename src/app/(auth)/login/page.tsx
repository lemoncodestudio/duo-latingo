"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mascot } from "@/components/shared/mascot";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(170deg, var(--color-surface) 0%, var(--background) 40%, color-mix(in srgb, var(--color-teal) 5%, transparent) 100%)" }}
    >
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_theme(colors.teal/0.06)_0%,transparent_70%)]" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,_theme(colors.purple/0.05)_0%,transparent_70%)]" />

      <div className="mb-6 relative z-10">
        <Mascot
          expression={sent ? "celebrating" : "happy"}
          size={120}
          className={sent ? "animate-scale-pop" : ""}
        />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-card/80 backdrop-blur-xl border border-white/[0.08] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative z-10">
        <div className="text-center mb-6">
          <h1
            className="text-2xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            Duo Latingo
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Leer Latijn op een leuke manier
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <p className="text-lg font-medium text-foreground">Check je email!</p>
            <p className="text-muted-foreground text-sm">
              We hebben een inloglink gestuurd naar <strong className="text-teal">{email}</strong>.
              Klik op de link om in te loggen.
            </p>
            <Button
              variant="ghost"
              onClick={() => setSent(false)}
              className="mt-4"
            >
              Ander emailadres gebruiken
            </Button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jouw@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-sm text-rose">{error}</p>
            )}
            <Button
              type="submit"
              variant="duo"
              size="duo"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Even geduld..." : "Inloggen met magic link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
