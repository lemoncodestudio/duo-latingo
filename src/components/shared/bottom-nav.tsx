"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BookOpen, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/courses", label: "Cursussen", icon: BookOpen },
  { href: "/profile", label: "Profiel", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/92 backdrop-blur-2xl saturate-150 border-t border-teal/8 z-50 md:hidden">
      <div className="flex items-center justify-around h-[56px] px-4 pb-[env(safe-area-inset-bottom,0px)]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-1 relative transition-colors",
                isActive
                  ? "text-teal"
                  : "text-dim hover:text-soft"
              )}
            >
              {isActive && (
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-12 h-8 bg-teal/25 rounded-xl -z-10" />
              )}
              <Icon className="size-[22px]" strokeWidth={2.5} />
              <span className="text-[0.65rem] font-extrabold uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
