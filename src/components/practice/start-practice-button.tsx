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
      // Store questions in sessionStorage for the practice page
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
      onClick={handleStart}
      disabled={loading}
      size="lg"
      className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold text-lg h-14 rounded-xl"
    >
      {loading ? "Sessie laden..." : "🧠 Oefenen"}
    </Button>
  );
}
