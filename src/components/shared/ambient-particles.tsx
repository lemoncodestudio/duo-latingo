"use client";

const particles = [
  { left: "8%", size: 3, color: "var(--color-teal)", opacity: 0.3, duration: 18, delay: 0 },
  { left: "22%", size: 2, color: "var(--color-purple)", opacity: 0.25, duration: 22, delay: 3 },
  { left: "45%", size: 4, color: "var(--color-teal)", opacity: 0.2, duration: 16, delay: 6 },
  { left: "68%", size: 2, color: "var(--color-green)", opacity: 0.2, duration: 20, delay: 2 },
  { left: "85%", size: 3, color: "var(--color-purple)", opacity: 0.2, duration: 24, delay: 8 },
  { left: "35%", size: 2, color: "var(--color-teal)", opacity: 0.15, duration: 26, delay: 12 },
  { left: "55%", size: 3, color: "var(--color-amber)", opacity: 0.15, duration: 19, delay: 5 },
  { left: "92%", size: 2, color: "var(--color-teal)", opacity: 0.2, duration: 21, delay: 9 },
];

export function AmbientParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-0 animate-float-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
