"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface StartPracticeButtonProps {
  courseId: string;
}

export function StartPracticeButton({ courseId }: StartPracticeButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/practice/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Kon sessie niet starten");
        return;
      }

      const { sessionId, questions } = await res.json();
      sessionStorage.setItem(`practice-${sessionId}`, JSON.stringify(questions));
      router.push(`/practice/${sessionId}`);
    } catch {
      alert("Er ging iets mis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="duo"
      size="duo"
      onClick={handleStart}
      disabled={loading}
      className="w-full relative overflow-hidden"
    >
      {loading ? (
        "Sessie laden..."
      ) : (
        <span className="flex items-center justify-center gap-2.5">
          <span>▶</span>
          <span>Start oefensessie</span>
        </span>
      )}
      <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-cta-shine pointer-events-none" />
    </Button>
  );
}
