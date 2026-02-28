"use client";

import { useCallback, useRef } from "react";

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
        <div className="relative rounded-lg overflow-hidden border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Geüploade foto"
            className="w-full max-h-64 object-contain bg-gray-50"
          />
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-sm text-blue-500 hover:underline"
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
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#58CC02] hover:bg-green-50/50 transition-colors"
    >
      <div className="text-4xl mb-2">📷</div>
      <p className="font-medium">Sleep een foto hierheen</p>
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
