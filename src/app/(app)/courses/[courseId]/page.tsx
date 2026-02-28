import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{course.name}</h1>
        {course.description && (
          <p className="text-muted-foreground mt-1">{course.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">
            {chaptersWithCounts.length} hoofdstukken
          </Badge>
          <Badge variant="secondary">{totalWords} woorden</Badge>
        </div>
      </div>

      {totalWords >= 4 && (
        <StartPracticeButton courseId={courseId} />
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Hoofdstukken</h2>
          <Link href={`/courses/${courseId}/upload`}>
            <Button
              size="sm"
              className="bg-[#58CC02] hover:bg-[#4CAF00] text-white"
            >
              + Woorden toevoegen
            </Button>
          </Link>
        </div>

        {chaptersWithCounts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-3">📷</div>
              <p className="font-medium">Nog geen hoofdstukken</p>
              <p className="text-sm text-muted-foreground mt-1">
                Upload een foto van je werkboek om te beginnen
              </p>
              <Link href={`/courses/${courseId}/upload`}>
                <Button className="mt-4 bg-[#58CC02] hover:bg-[#4CAF00] text-white">
                  Woorden toevoegen
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          chaptersWithCounts.map((chapter) => (
            <Card key={chapter.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{chapter.name}</span>
                  <Badge variant="outline">{chapter.wordCount} woorden</Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
