import Link from "next/link";
import type { Course } from "@/lib/supabase/types";

interface CourseCardProps {
  course: Course;
  wordCount: number;
  chapterCount: number;
}

export function CourseCard({ course, wordCount, chapterCount }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-xl p-4 border hover:border-[#58CC02] hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{course.name}</h3>
            {course.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {course.description}
              </p>
            )}
          </div>
          <div className="text-3xl">📚</div>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span>{chapterCount} {chapterCount === 1 ? "hoofdstuk" : "hoofdstukken"}</span>
          <span>{wordCount} woorden</span>
        </div>
      </div>
    </Link>
  );
}
