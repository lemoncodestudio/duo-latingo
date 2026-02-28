"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mascot } from "@/components/shared/mascot";

export default function NewCoursePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("courses")
      .insert({ user_id: user.id, name, description: description || null })
      .select()
      .single();

    if (error) {
      alert("Er ging iets mis: " + error.message);
      setLoading(false);
      return;
    }

    router.push(`/courses/${data.id}`);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="flex flex-col items-center gap-2">
        <Mascot expression="happy" size={80} />
        <h1 className="text-2xl font-extrabold text-foreground">Nieuwe cursus</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Naam</Label>
          <Input
            id="name"
            placeholder="bv. Latijn Jaar 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Beschrijving (optioneel)</Label>
          <Input
            id="description"
            placeholder="bv. Hoofdstukken 1-10 uit Lingua Latina"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="h-12"
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="duo-outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            variant="duo"
            size="duo"
            className="flex-1"
            disabled={loading || !name.trim()}
          >
            {loading ? "Aanmaken..." : "Cursus aanmaken"}
          </Button>
        </div>
      </form>
    </div>
  );
}
