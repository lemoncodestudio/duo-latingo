"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ExtractedWord {
  latin: string;
  dutch: string;
  part_of_speech: string | null;
  gender: string | null;
  extra_forms: string | null;
  difficulty: number;
}

interface ExtractedWordsReviewProps {
  words: ExtractedWord[];
  onChange: (words: ExtractedWord[]) => void;
}

export function ExtractedWordsReview({
  words,
  onChange,
}: ExtractedWordsReviewProps) {
  const updateWord = (index: number, field: keyof ExtractedWord, value: string | number) => {
    const updated = [...words];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeWord = (index: number) => {
    onChange(words.filter((_, i) => i !== index));
  };

  const addWord = () => {
    onChange([
      ...words,
      {
        latin: "",
        dutch: "",
        part_of_speech: null,
        gender: null,
        extra_forms: null,
        difficulty: 1,
      },
    ]);
  };

  return (
    <div className="space-y-3">
      {words.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nog geen woorden. Voeg ze handmatig toe.
        </p>
      )}

      {words.map((word, index) => (
        <div
          key={index}
          className="flex items-start gap-2 p-3 bg-secondary rounded-xl border border-white/[0.08] transition-transform hover:-translate-y-0.5"
        >
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              placeholder="Latijn"
              value={word.latin}
              onChange={(e) => updateWord(index, "latin", e.target.value)}
              className="bg-card border-white/[0.08] text-sm"
            />
            <Input
              placeholder="Nederlands"
              value={word.dutch}
              onChange={(e) => updateWord(index, "dutch", e.target.value)}
              className="bg-card border-white/[0.08] text-sm"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeWord(index)}
            className="text-rose hover:text-rose-dark hover:bg-rose/12 px-2"
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}

      <Button
        variant="duo-outline"
        size="sm"
        onClick={addWord}
        className="w-full"
      >
        + Woord toevoegen
      </Button>

      {words.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {words.length} {words.length === 1 ? "woord" : "woorden"}
        </p>
      )}
    </div>
  );
}
