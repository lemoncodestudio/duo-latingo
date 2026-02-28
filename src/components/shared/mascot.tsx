interface MascotProps {
  expression?: "happy" | "excited" | "sad" | "thinking" | "celebrating";
  size?: number;
  className?: string;
}

export function Mascot({ expression = "happy", size = 120, className = "" }: MascotProps) {
  const eyes = {
    happy: { left: "●", right: "●", brow: "" },
    excited: { left: "★", right: "★", brow: "" },
    sad: { left: "●", right: "●", brow: "sad" },
    thinking: { left: "●", right: "◐", brow: "think" },
    celebrating: { left: "★", right: "★", brow: "" },
  };

  const mouths = {
    happy: "M 38 68 Q 50 78 62 68",
    excited: "M 36 65 Q 50 82 64 65",
    sad: "M 38 72 Q 50 64 62 72",
    thinking: "M 42 70 Q 50 70 54 68",
    celebrating: "M 34 64 Q 50 84 66 64",
  };

  const e = eyes[expression];
  const mouth = mouths[expression];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body - teal gradient */}
      <defs>
        <linearGradient id="mascotBodyGrad" x1="20" y1="23" x2="80" y2="87" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#40E0D0" />
          <stop offset="100%" stopColor="#2BC4B4" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="55" rx="30" ry="32" fill="url(#mascotBodyGrad)" />

      {/* Belly */}
      <ellipse cx="50" cy="60" rx="20" ry="22" fill="rgba(255,255,255,0.88)" />

      {/* Laurel wreath - left */}
      <path d="M 22 30 Q 18 22 25 18 Q 30 22 28 28" fill="#FBBF24" />
      <path d="M 25 24 Q 20 16 28 14 Q 32 18 29 23" fill="#FBBF24" />
      <path d="M 30 20 Q 26 12 34 10 Q 37 14 33 19" fill="#FBBF24" />

      {/* Laurel wreath - right */}
      <path d="M 78 30 Q 82 22 75 18 Q 70 22 72 28" fill="#FBBF24" />
      <path d="M 75 24 Q 80 16 72 14 Q 68 18 71 23" fill="#FBBF24" />
      <path d="M 70 20 Q 74 12 66 10 Q 63 14 67 19" fill="#FBBF24" />

      {/* Ears / Tufts - teal-dark */}
      <ellipse cx="25" cy="38" rx="6" ry="10" fill="#2BC4B4" transform="rotate(-15 25 38)" />
      <ellipse cx="75" cy="38" rx="6" ry="10" fill="#2BC4B4" transform="rotate(15 75 38)" />

      {/* Eye whites */}
      <circle cx="40" cy="48" r="9" fill="white" />
      <circle cx="60" cy="48" r="9" fill="white" />

      {/* Pupils */}
      {expression === "excited" || expression === "celebrating" ? (
        <>
          <text x="40" y="52" textAnchor="middle" fontSize="12" fill="#FBBF24">{e.left}</text>
          <text x="60" y="52" textAnchor="middle" fontSize="12" fill="#FBBF24">{e.right}</text>
        </>
      ) : expression === "thinking" ? (
        <>
          <circle cx="40" cy="48" r="4" fill="#1a2d55" />
          <circle cx="62" cy="48" r="4" fill="#1a2d55" />
          <circle cx="63" cy="47" r="2" fill="white" />
        </>
      ) : (
        <>
          <circle cx="40" cy="48" r="4" fill="#1a2d55" />
          <circle cx="60" cy="48" r="4" fill="#1a2d55" />
          {/* Happy sparkle */}
          <circle cx="43" cy="46" r="1.5" fill="white" />
          <circle cx="63" cy="46" r="1.5" fill="white" />
        </>
      )}

      {/* Sad eyebrows */}
      {e.brow === "sad" && (
        <>
          <line x1="34" y1="38" x2="44" y2="40" stroke="#1a2d55" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="38" x2="56" y2="40" stroke="#1a2d55" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Thinking eyebrow */}
      {e.brow === "think" && (
        <line x1="55" y1="37" x2="65" y2="39" stroke="#1a2d55" strokeWidth="2" strokeLinecap="round" />
      )}

      {/* Beak - amber */}
      <path d="M 45 56 L 50 62 L 55 56" fill="#FBBF24" strokeLinejoin="round" />

      {/* Mouth */}
      <path d={mouth} stroke="#1a2d55" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Blush - teal/purple split */}
      {(expression === "happy" || expression === "celebrating" || expression === "excited") && (
        <>
          <circle cx="30" cy="58" r="4" fill="#40E0D0" opacity="0.2" />
          <circle cx="70" cy="58" r="4" fill="#9370DB" opacity="0.2" />
        </>
      )}

      {/* Celebrating - party lines (ocean palette) */}
      {expression === "celebrating" && (
        <>
          <line x1="15" y1="20" x2="10" y2="12" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="20" x2="90" y2="12" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="8" x2="50" y2="2" stroke="#40E0D0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2" fill="#FB7185" />
          <circle cx="88" cy="10" r="2" fill="#B08AEF" />
          <circle cx="50" cy="0" r="2" fill="#FBBF24" />
        </>
      )}

      {/* Feet - amber */}
      <ellipse cx="40" cy="86" rx="8" ry="4" fill="#FBBF24" />
      <ellipse cx="60" cy="86" rx="8" ry="4" fill="#FBBF24" />
    </svg>
  );
}
