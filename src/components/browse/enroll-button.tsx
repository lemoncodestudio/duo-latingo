"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
}

export function EnrollButton({ courseId, isEnrolled }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isEnrolled) {
    return (
      <Badge className="bg-teal/15 text-teal border-teal/20">
        Ingeschreven
      </Badge>
    );
  }

  const handleEnroll = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("user_courses")
      .insert({ user_id: user.id, course_id: courseId });

    router.refresh();
  };

  return (
    <Button
      variant="duo"
      size="sm"
      onClick={handleEnroll}
      disabled={loading}
    >
      {loading ? "Bezig..." : "Inschrijven"}
    </Button>
  );
}
