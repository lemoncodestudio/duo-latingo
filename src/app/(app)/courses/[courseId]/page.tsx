import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StartPracticeButton } from "@/components/practice/start-practice-button";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (!course) notFound();

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", courseId)
    .order("order_index");

  // Get word counts per chapter
  const chaptersWithCounts = await Promise.all(
    (chapters || []).map(async (chapter) => {
      const { count } = await supabase
        .from("vocabulary")
        .select("*", { count: "exact", head: true })
        .eq("chapter_id", chapter.id);
      return { ...chapter, wordCount: count || 0 };
    })
  );

  const totalWords = chaptersWithCounts.reduce((sum, c) => sum + c.wordCount, 0);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div
        className="rounded-b-3xl p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(170deg, color-mix(in srgb, var(--color-teal) 15%, transparent) 0%, color-mix(in srgb, var(--color-purple) 8%, transparent) 50%, transparent 100%)" }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold text-foreground">{course.name}</h1>
          {course.description && (
            <p className="text-white/60 mt-1">{course.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Badge className="bg-white/10 text-white/80 border-white/[0.08] hover:bg-white/15">
              {chaptersWithCounts.length} hoofdstukken
            </Badge>
            <Badge className="bg-white/10 text-white/80 border-white/[0.08] hover:bg-white/15">
              {totalWords} woorden
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {totalWords >= 4 && (
          <StartPracticeButton courseId={courseId} />
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Hoofdstukken</h2>
            <Link href={`/courses/${courseId}/upload`}>
              <Button variant="duo" size="sm">
                + Woorden toevoegen
              </Button>
            </Link>
          </div>

          {chaptersWithCounts.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-2xl border border-white/[0.08]">
              <p className="font-bold text-lg">Nog geen hoofdstukken</p>
              <p className="text-sm text-muted-foreground mt-1">
                Upload een foto van je werkboek om te beginnen
              </p>
              <Link href={`/courses/${courseId}/upload`}>
                <Button variant="duo" className="mt-4">
                  Woorden toevoegen
                </Button>
              </Link>
            </div>
          ) : (
            chaptersWithCounts.map((chapter) => (
              <div
                key={chapter.id}
                className="p-4 bg-[linear-gradient(180deg,_theme(colors.card)_0%,_theme(colors.secondary)_100%)] rounded-2xl border border-white/[0.08] flex items-center justify-between"
              >
                <span className="font-bold">{chapter.name}</span>
                <Badge variant="outline" className="border-white/[0.12] text-muted-foreground">{chapter.wordCount} woorden</Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
