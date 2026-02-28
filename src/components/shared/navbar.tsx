"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Cursussen" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="hidden md:flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="font-bold text-xl flex items-center gap-2">
          <span>🏛️</span>
          <span>Duo Latingo</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-50 text-[#58CC02]"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <Button variant="ghost" onClick={handleSignOut} className="text-sm">
        Uitloggen
      </Button>
    </header>
  );
}
