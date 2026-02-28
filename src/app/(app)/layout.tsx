import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { AmbientParticles } from "@/components/shared/ambient-particles";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, streak")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-background relative">
      <AmbientParticles />
      <div className="relative z-10">
        <Navbar
          streak={profile?.streak || 0}
          displayName={profile?.display_name}
        />
        <main className="pb-24 md:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
