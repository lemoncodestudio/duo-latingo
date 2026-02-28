"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoUploadZone } from "@/components/upload/photo-upload-zone";
import { ExtractedWordsReview } from "@/components/upload/extracted-words-review";

interface ExtractedWord {
  latin: string;
  dutch: string;
  part_of_speech: string | null;
  gender: string | null;
  extra_forms: string | null;
  difficulty: number;
}

interface Props {
  params: Promise<{ courseId: string }>;
}

export default function UploadPage({ params }: Props) {
  const { courseId } = use(params);
  const [chapterName, setChapterName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [words, setWords] = useState<ExtractedWord[] | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setWords(null);
  };

  const handleExtract = async () => {
    if (!file) return;
    setExtracting(true);

    try {
      const base64 = await fileToBase64(file);

      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType: file.type }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "OCR mislukt");
        return;
      }

      const data = await res.json();
      setWords(data.words);
    } catch {
      alert("Er ging iets mis bij het extraheren");
    } finally {
      setExtracting(false);
    }
  };

  const handleSave = async () => {
    if (!words || words.length === 0 || !chapterName.trim()) return;
    setSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Upload image to storage
      let storagePath = "";
      if (file) {
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(fileName, file);
        if (!uploadError) storagePath = fileName;
      }

      // Create chapter
      const { data: chapter, error: chapterError } = await supabase
        .from("chapters")
        .insert({
          course_id: courseId,
          name: chapterName,
        })
        .select()
        .single();

      if (chapterError || !chapter) {
        alert("Kon hoofdstuk niet aanmaken: " + chapterError?.message);
        return;
      }

      // Save upload record
      if (storagePath) {
        await supabase.from("uploads").insert({
          user_id: user.id,
          chapter_id: chapter.id,
          storage_path: storagePath,
          status: "completed",
          extracted_data: JSON.parse(JSON.stringify(words)),
        });
      }

      // Save vocabulary
      const vocabInsert = words.map((w) => ({
        chapter_id: chapter.id,
        latin: w.latin,
        dutch: w.dutch,
        part_of_speech: w.part_of_speech,
        gender: w.gender,
        extra_forms: w.extra_forms,
        difficulty: w.difficulty,
      }));

      const { error: vocabError } = await supabase
        .from("vocabulary")
        .insert(vocabInsert);

      if (vocabError) {
        alert("Kon woorden niet opslaan: " + vocabError.message);
        return;
      }

      router.push(`/courses/${courseId}`);
      router.refresh();
    } catch {
      alert("Er ging iets mis bij het opslaan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Woorden toevoegen</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stap 1: Hoofdstuk naam</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="chapter">Naam</Label>
            <Input
              id="chapter"
              placeholder="bv. Hoofdstuk 3 - De Romeinse familie"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Stap 2: Upload een foto of voer handmatig in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PhotoUploadZone
            onFileSelect={handleFileSelect}
            preview={preview}
          />
          {file && !words && (
            <Button
              onClick={handleExtract}
              disabled={extracting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {extracting
                ? "Woorden extraheren..."
                : "🤖 Woorden extraheren met AI"}
            </Button>
          )}
          {!file && !words && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setWords([])}
            >
              Of voer handmatig woorden in
            </Button>
          )}
        </CardContent>
      </Card>

      {words !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Stap 3: Controleer en bewerk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExtractedWordsReview
              words={words}
              onChange={setWords}
            />
          </CardContent>
        </Card>
      )}

      {words !== null && (
        <Button
          onClick={handleSave}
          disabled={saving || words.length === 0 || !chapterName.trim()}
          size="lg"
          className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold h-14 rounded-xl"
        >
          {saving
            ? "Opslaan..."
            : `${words.length} woorden opslaan`}
        </Button>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
