import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CourseCard } from "@/components/dashboard/course-card";
import { DailyTipCard } from "@/components/dashboard/daily-tip-card";
import { Mascot } from "@/components/shared/mascot";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  // Get enrolled course IDs
  const { data: enrollments } = await supabase
    .from("user_courses")
    .select("course_id")
    .eq("user_id", user!.id);

  const enrolledIds = (enrollments || []).map((e) => e.course_id);

  // Fetch enrolled courses
  const { data: courses } = enrolledIds.length > 0
    ? await supabase
        .from("courses")
        .select("*")
        .in("id", enrolledIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  // Fetch creator profiles for non-owned courses
  const otherCreatorIds = [...new Set(
    (courses || []).filter((c) => c.user_id !== user!.id).map((c) => c.user_id)
  )];
  const { data: creatorProfiles } = otherCreatorIds.length > 0
    ? await supabase.from("profiles").select("id, display_name").in("id", otherCreatorIds)
    : { data: [] };
  const creatorMap = new Map(
    (creatorProfiles || []).map((p) => [p.id, p.display_name])
  );

  // Get word counts & learned counts per course
  const courseStats = await Promise.all(
    (courses || []).map(async (course) => {
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id")
        .eq("course_id", course.id);

      const chapterIds = (chapters || []).map((c) => c.id);
      let wordCount = 0;
      let wordsLearned = 0;

      if (chapterIds.length > 0) {
        const { count } = await supabase
          .from("vocabulary")
          .select("*", { count: "exact", head: true })
          .in("chapter_id", chapterIds);
        wordCount = count || 0;

        // Count words with progress entries for this course
        const { data: vocabIds } = await supabase
          .from("vocabulary")
          .select("id")
          .in("chapter_id", chapterIds);

        if (vocabIds && vocabIds.length > 0) {
          const { count: learnedCount } = await supabase
            .from("user_word_progress")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user!.id)
            .in(
              "vocabulary_id",
              vocabIds.map((v) => v.id)
            );
          wordsLearned = learnedCount || 0;
        }
      }

      const creatorName = course.user_id !== user!.id
        ? (creatorMap.get(course.user_id) || undefined)
        : undefined;

      return {
        course,
        chapterCount: chapterIds.length,
        wordCount,
        wordsLearned,
        creatorName,
      };
    })
  );

  // Count total sessions
  const { count: sessionCount } = await supabase
    .from("practice_sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .not("completed_at", "is", null);

  // Count unique words practiced
  const { count: wordsLearned } = await supabase
    .from("user_word_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  return (
    <div className="max-w-lg mx-auto">
      {/* Hero Header */}
      <div
        className="relative p-7 pb-8 overflow-hidden animate-in delay-1"
        style={{
          background:
            "linear-gradient(170deg, color-mix(in srgb, var(--color-teal) 12%, transparent) 0%, color-mix(in srgb, var(--color-purple) 8%, transparent) 50%, transparent 100%)",
        }}
      >
        <div className="absolute top-[-50%] right-[-30%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(64,224,208,0.1)_0%,transparent_70%)] animate-hero-pulse" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-[1.75rem] font-extrabold leading-tight text-foreground">
              Hoi,{" "}
              {profile?.display_name && (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                >
                  {profile.display_name}
                </span>
              )}
              !
            </h1>
            <p className="text-soft text-[0.95rem] font-semibold mt-1.5">
              Klaar om te leren? 🌊
            </p>
          </div>
          <Mascot
            expression="excited"
            size={90}
            className="relative z-10 drop-shadow-[0_0_20px_rgba(64,224,208,0.25)] animate-mascot-bob"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Streak */}
        <div className="mt-5 animate-in delay-2">
          <StreakDisplay
            streak={profile?.streak || 0}
            longestStreak={profile?.longest_streak || 0}
          />
        </div>

        {/* Stats */}
        <div className="mt-5 animate-in delay-3">
          <StatsCards
            xp={profile?.xp || 0}
            wordsLearned={wordsLearned || 0}
            sessionsCompleted={sessionCount || 0}
          />
        </div>

        {/* Practice CTA */}
        {courseStats.length > 0 && (
          <Link
            href={`/courses/${courseStats[0].course.id}`}
            className="block mt-5 animate-in delay-4"
          >
            <button className="relative w-full py-[18px] px-6 bg-[image:var(--gradient-hero)] border-none rounded-xl text-teal-fg font-extrabold text-lg tracking-tight cursor-pointer overflow-hidden shadow-[0_4px_0_#1a6b63,0_6px_20px_rgba(0,0,0,0.3)] transition-all hover:translate-y-[-1px] hover:shadow-[0_5px_0_#1a6b63,0_8px_25px_rgba(0,0,0,0.35)] active:translate-y-[3px] active:shadow-[0_1px_0_#1a6b63,0_2px_8px_rgba(0,0,0,0.2)]">
              <span className="flex items-center justify-center gap-2.5">
                <span>▶</span>
                <span>Start oefensessie</span>
              </span>
              <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-cta-shine pointer-events-none" />
            </button>
          </Link>
        )}

        {/* Courses */}
        <div className="mt-5 animate-in delay-5">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-lg font-extrabold">Mijn cursussen</h2>
            <Link
              href="/courses"
              className="text-sm font-bold text-teal hover:text-teal/80 transition-colors"
            >
              Alle cursussen
            </Link>
          </div>

          {courseStats.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-white/[0.08]">
              <Mascot expression="thinking" size={64} className="mx-auto" />
              <p className="font-medium mt-3">Nog geen cursussen</p>
              <p className="text-sm text-muted-foreground mt-1">
                Maak je eerste cursus aan om te beginnen!
              </p>
              <Link href="/courses/new">
                <button className="mt-4 px-6 py-3 bg-[linear-gradient(135deg,#40E0D0,#2BC4B4)] rounded-xl text-teal-fg font-extrabold shadow-[0_4px_0_#1a6b63] active:translate-y-[2px] active:shadow-[0_1px_0_#1a6b63]">
                  Cursus aanmaken
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {courseStats.map(({ course, chapterCount, wordCount, wordsLearned: wl, creatorName }) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  wordCount={wordCount}
                  chapterCount={chapterCount}
                  wordsLearned={wl}
                  creatorName={creatorName}
                />
              ))}
            </div>
          )}

          {/* Add course button */}
          <Link href="/courses/new" className="block mt-3">
            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-transparent border-2 border-dashed border-teal/15 rounded-xl text-teal font-extrabold text-sm cursor-pointer transition-all hover:bg-teal/8 hover:border-teal/30">
              <span>+</span>
              <span>Nieuwe cursus</span>
            </button>
          </Link>
        </div>

        {/* Daily tip */}
        <div className="mt-5 mb-6 animate-in delay-7">
          <DailyTipCard />
        </div>
      </div>
    </div>
  );
}
