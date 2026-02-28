"use client";

import { useCallback, useRef } from "react";
import { Camera } from "lucide-react";

interface PhotoUploadZoneProps {
  onFileSelect: (file: File) => void;
  preview: string | null;
}

export function PhotoUploadZone({ onFileSelect, preview }: PhotoUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  if (preview) {
    return (
      <div className="space-y-2">
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Geüploade foto"
            className="w-full max-h-64 object-contain bg-secondary"
          />
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-sm text-ocean font-bold hover:underline"
        >
          Andere foto kiezen
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-teal/15 rounded-2xl p-8 text-center cursor-pointer hover:border-teal/30 hover:bg-teal/4 transition-colors bg-secondary"
    >
      <div className="w-14 h-14 rounded-full bg-ocean/12 border border-ocean/15 flex items-center justify-center mx-auto mb-3">
        <Camera className="size-7 text-ocean" />
      </div>
      <p className="font-bold text-lg text-foreground">Sleep een foto hierheen</p>
      <p className="text-sm text-muted-foreground mt-1">
        of klik om een foto te selecteren
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
