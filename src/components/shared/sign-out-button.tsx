"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="w-full text-rose border-rose/20 hover:bg-rose/8"
    >
      Uitloggen
    </Button>
  );
}
