import { createClient } from "@/lib/supabase/server";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { SignOutButton } from "@/components/shared/sign-out-button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { count: totalSessions } = await supabase
    .from("practice_sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .not("completed_at", "is", null);

  const { count: totalWords } = await supabase
    .from("user_word_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  const displayName = profile?.display_name || "Gebruiker";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-extrabold">Profiel</h1>

      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold text-white border-2 border-teal/20"
          style={{ background: "var(--gradient-hero)" }}
        >
          {initial}
        </div>
        <div>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <StreakDisplay
        streak={profile?.streak || 0}
        longestStreak={profile?.longest_streak || 0}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4 border border-teal/12 bg-[linear-gradient(160deg,rgba(64,224,208,0.15)_0%,rgba(64,224,208,0.04)_100%)]">
          <p className="text-sm text-muted-foreground font-medium">Totaal XP</p>
          <p className="text-3xl font-extrabold text-teal mt-1">
            {profile?.xp || 0}
          </p>
        </div>
        <div className="rounded-2xl p-4 border border-purple/12 bg-[linear-gradient(160deg,rgba(147,112,219,0.15)_0%,rgba(147,112,219,0.04)_100%)]">
          <p className="text-sm text-muted-foreground font-medium">Sessies</p>
          <p className="text-3xl font-extrabold text-purple-light mt-1">
            {totalSessions || 0}
          </p>
        </div>
        <div className="rounded-2xl p-4 border border-ocean/12 bg-[linear-gradient(160deg,rgba(56,189,248,0.15)_0%,rgba(56,189,248,0.04)_100%)]">
          <p className="text-sm text-muted-foreground font-medium">Woorden geleerd</p>
          <p className="text-3xl font-extrabold text-ocean mt-1">
            {totalWords || 0}
          </p>
        </div>
        <div className="rounded-2xl p-4 border border-amber/12 bg-[linear-gradient(160deg,rgba(251,191,36,0.15)_0%,rgba(251,191,36,0.04)_100%)]">
          <p className="text-sm text-muted-foreground font-medium">Langste streak</p>
          <p className="text-3xl font-extrabold text-amber mt-1">
            {profile?.longest_streak || 0}
          </p>
        </div>
      </div>

      <SignOutButton />
    </div>
  );
}
