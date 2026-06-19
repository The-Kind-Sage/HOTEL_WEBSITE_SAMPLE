import { useEffect, useState } from "react";

type Particle = { id: number; left: number; size: number; delay: number; dur: number; hue: number };

/** Lightweight gold-dust drift. CSS-only, no canvas, very cheap. */
export function ParticleField({ count = 28 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const arr = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * -30,
      dur: 18 + Math.random() * 22,
      hue: 70 + Math.random() * 30,
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10vh",
            width: p.size,
            height: p.size,
            background: `oklch(0.88 0.12 ${p.hue})`,
            boxShadow: `0 0 ${p.size * 4}px oklch(0.85 0.14 ${p.hue})`,
            animation: `drift-up ${p.dur}s linear ${p.delay}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
