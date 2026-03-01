import Link from "next/link";
import type { Course } from "@/lib/supabase/types";
import { CourseProgressBar } from "@/components/dashboard/course-progress-bar";
import { cn } from "@/lib/utils";

type ColorVariant = "teal" | "purple" | "green" | "coral";

interface CourseCardProps {
  course: Course;
  wordCount: number;
  chapterCount: number;
  wordsLearned?: number;
}

const variantStyles: Record<ColorVariant, string> = {
  teal: "bg-[linear-gradient(135deg,#40E0D0,#2BC4B4)] shadow-[0_4px_12px_rgba(64,224,208,0.3)]",
  purple: "bg-[linear-gradient(135deg,#9370DB,#7C5BBF)] shadow-[0_4px_12px_rgba(147,112,219,0.3)]",
  green: "bg-[linear-gradient(135deg,#4ADE80,#22C55E)] shadow-[0_4px_12px_rgba(74,222,128,0.3)]",
  coral: "bg-[linear-gradient(135deg,#FB7185,#F43F5E)] shadow-[0_4px_12px_rgba(251,113,133,0.3)]",
};

const variants: ColorVariant[] = ["teal", "purple", "green", "coral"];

function getVariantForCourse(name: string): ColorVariant {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return variants[Math.abs(hash) % variants.length];
}

function getEmojiForCourse(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("spaans") || lower.includes("spanish")) return "🇪🇸";
  if (lower.includes("frans") || lower.includes("french")) return "🇫🇷";
  if (lower.includes("duits") || lower.includes("german")) return "🇩🇪";
  if (lower.includes("italiaans") || lower.includes("italian")) return "🇮🇹";
  if (lower.includes("engels") || lower.includes("english")) return "🇬🇧";
  if (lower.includes("latijn") || lower.includes("latin")) return "🏛️";
  return "📚";
}

export function CourseCard({
  course,
  wordCount,
  chapterCount,
  wordsLearned = 0,
}: CourseCardProps) {
  const variant = getVariantForCourse(course.name);
  const emoji = getEmojiForCourse(course.name);

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="relative flex items-start gap-3.5 p-[18px] bg-[linear-gradient(180deg,#152548_0%,#0f1f3a_100%)] border border-teal/12 rounded-xl cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)] hover:border-teal/25 overflow-hidden group">
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(64,224,208,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Course icon */}
        <div
          className={cn(
            "shrink-0 w-[50px] h-[50px] rounded-2xl flex items-center justify-center text-xl font-extrabold text-white relative z-10",
            variantStyles[variant]
          )}
        >
          {emoji}
        </div>

        {/* Course body */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="font-extrabold text-base text-foreground mb-0.5">
            {course.name}
          </div>
          <div className="flex items-center gap-2.5 text-[0.78rem] text-dim font-semibold mb-2.5">
            <span>
              {chapterCount} {chapterCount === 1 ? "hoofdstuk" : "hoofdstukken"}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-dim" />
            <span>{wordCount} woorden</span>
          </div>
          <CourseProgressBar
            current={wordsLearned}
            total={wordCount}
            variant={variant}
          />
        </div>

        {/* Arrow */}
        <span className="absolute right-[18px] top-1/2 -translate-y-1/2 text-dim text-lg transition-all group-hover:text-teal group-hover:translate-x-[3px]">
          ›
        </span>
      </div>
    </Link>
  );
}
