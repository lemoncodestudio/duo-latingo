import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CourseCard } from "@/components/dashboard/course-card";

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

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  // Get word counts per course
  const courseStats = await Promise.all(
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
        course,
        chapterCount: chapterIds.length,
        wordCount,
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
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Hoi{profile?.display_name ? `, ${profile.display_name}` : ""}! 👋
        </h1>
      </div>

      <StreakDisplay
        streak={profile?.streak || 0}
        longestStreak={profile?.longest_streak || 0}
      />

      <StatsCards
        xp={profile?.xp || 0}
        wordsLearned={wordsLearned || 0}
        sessionsCompleted={sessionCount || 0}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Mijn cursussen</h2>
          <Link href="/courses/new">
            <Button
              size="sm"
              className="bg-[#58CC02] hover:bg-[#4CAF00] text-white"
            >
              + Nieuwe cursus
            </Button>
          </Link>
        </div>

        {courseStats.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <div className="text-4xl mb-3">📚</div>
            <p className="font-medium">Nog geen cursussen</p>
            <p className="text-sm text-muted-foreground mt-1">
              Maak je eerste cursus aan om te beginnen!
            </p>
            <Link href="/courses/new">
              <Button className="mt-4 bg-[#58CC02] hover:bg-[#4CAF00] text-white">
                Cursus aanmaken
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {courseStats.map(({ course, chapterCount, wordCount }) => (
              <CourseCard
                key={course.id}
                course={course}
                wordCount={wordCount}
                chapterCount={chapterCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
