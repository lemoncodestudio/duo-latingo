"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Nieuwe cursus</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                placeholder="bv. Latijn Jaar 1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
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
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                className="bg-[#58CC02] hover:bg-[#4CAF00] text-white flex-1"
                disabled={loading || !name.trim()}
              >
                {loading ? "Aanmaken..." : "Cursus aanmaken"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
