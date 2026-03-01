import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/shared/mascot";
import { EnrollButton } from "@/components/browse/enroll-button";

export default async function CoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all courses
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch user's enrollments
  const { data: enrollments } = await supabase
    .from("user_courses")
    .select("course_id")
    .eq("user_id", user!.id);

  const enrolledIds = new Set((enrollments || []).map((e) => e.course_id));

  // Fetch creator profiles
  const creatorIds = [...new Set((courses || []).map((c) => c.user_id))];
  const { data: profiles } = creatorIds.length > 0
    ? await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", creatorIds)
    : { data: [] };

  const profileMap = new Map(
    (profiles || []).map((p) => [p.id, p.display_name])
  );

  // Get chapter and word counts per course
  const coursesWithStats = await Promise.all(
    (courses || []).map(async (course) => {
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id")
        .eq("course_id", course.id);

      const chapterIds = (chapters || []).map((c) => c.id);
      let wordCount = 0;

      if (chapterIds.length > 0) {
        const { count } = await supabase
          .from("vocabulary")
          .select("*", { count: "exact", head: true })
          .in("chapter_id", chapterIds);
        wordCount = count || 0;
      }

      return {
        ...course,
        creatorName: profileMap.get(course.user_id) || "Onbekend",
        chapterCount: chapterIds.length,
        wordCount,
        isEnrolled: enrolledIds.has(course.id),
        isOwner: course.user_id === user!.id,
      };
    })
  );

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div
        className="relative p-7 pb-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(170deg, color-mix(in srgb, var(--color-purple) 12%, transparent) 0%, color-mix(in srgb, var(--color-teal) 8%, transparent) 50%, transparent 100%)",
        }}
      >
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-[1.75rem] font-extrabold leading-tight text-foreground">
              Alle cursussen
            </h1>
            <p className="text-soft text-[0.95rem] font-semibold mt-1.5">
              Ontdek en schrijf je in
            </p>
          </div>
          <Mascot
            expression="happy"
            size={80}
            className="relative z-10 drop-shadow-[0_0_20px_rgba(147,112,219,0.25)]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-5 space-y-3">
        {coursesWithStats.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-white/[0.08]">
            <Mascot expression="thinking" size={64} className="mx-auto" />
            <p className="font-medium mt-3">Nog geen cursussen</p>
            <p className="text-sm text-muted-foreground mt-1">
              Maak de eerste cursus aan!
            </p>
            <Link href="/courses/new">
              <Button variant="duo" className="mt-4">
                Cursus aanmaken
              </Button>
            </Link>
          </div>
        ) : (
          coursesWithStats.map((course) => (
            <div
              key={course.id}
              className="relative p-[18px] bg-[linear-gradient(180deg,#152548_0%,#0f1f3a_100%)] border border-teal/12 rounded-xl overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-3">
                <Link href={`/courses/${course.id}`} className="flex-1 min-w-0">
                  <div className="font-extrabold text-base text-foreground mb-0.5">
                    {course.name}
                  </div>
                  {course.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {course.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2.5 text-[0.78rem] text-dim font-semibold mb-2">
                    <span>door {course.creatorName}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-dim" />
                    <span>
                      {course.chapterCount}{" "}
                      {course.chapterCount === 1 ? "hoofdstuk" : "hoofdstukken"}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-dim" />
                    <span>{course.wordCount} woorden</span>
                  </div>
                </Link>

                <div className="shrink-0 mt-1">
                  {course.isOwner ? (
                    <Badge className="bg-purple/15 text-purple-light border-purple/20">
                      Mijn cursus
                    </Badge>
                  ) : (
                    <EnrollButton
                      courseId={course.id}
                      isEnrolled={course.isEnrolled}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Add course button */}
        <Link href="/courses/new" className="block mt-3">
          <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-transparent border-2 border-dashed border-teal/15 rounded-xl text-teal font-extrabold text-sm cursor-pointer transition-all hover:bg-teal/8 hover:border-teal/30">
            <span>+</span>
            <span>Nieuwe cursus</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
