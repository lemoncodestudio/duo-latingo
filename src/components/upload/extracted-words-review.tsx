"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
          className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              placeholder="Latijn"
              value={word.latin}
              onChange={(e) => updateWord(index, "latin", e.target.value)}
              className="bg-white text-sm"
            />
            <Input
              placeholder="Nederlands"
              value={word.dutch}
              onChange={(e) => updateWord(index, "dutch", e.target.value)}
              className="bg-white text-sm"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeWord(index)}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 px-2"
          >
            ✕
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
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
