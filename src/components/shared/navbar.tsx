"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/shared/mascot";

interface NavbarProps {
  streak?: number;
  displayName?: string | null;
}

const desktopNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Cursussen" },
];

export function Navbar({ streak = 0, displayName }: NavbarProps) {
  const pathname = usePathname();
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-background/85 backdrop-blur-xl saturate-[1.4] border-b border-teal/8">
      {/* Left: Brand */}
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <Mascot expression="happy" size={36} className="drop-shadow-[0_0_8px_rgba(64,224,208,0.3)]" />
        <span
          className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          Duo Latingo
        </span>
      </Link>

      {/* Center: Desktop nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {desktopNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-colors",
                isActive
                  ? "bg-teal/15 text-teal"
                  : "text-white/40 hover:text-soft hover:bg-white/[0.05]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Streak + Avatar */}
      <div className="flex items-center gap-3">
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-amber/20 border border-amber/20 px-3 py-1.5 rounded-full font-extrabold text-sm text-amber">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        )}
        <Link href="/profile">
          <div className="w-9 h-9 rounded-full border-2 border-teal bg-card flex items-center justify-center font-extrabold text-sm text-teal shadow-[0_0_12px_rgba(64,224,208,0.2)]">
            {initial}
          </div>
        </Link>
      </div>
    </header>
  );
}
