import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-indigo-night transition-opacity duration-500"
      style={{ animation: "fadeOut 0.5s ease 1.3s forwards" }}
    >
      <style>{`@keyframes fadeOut { to { opacity: 0; pointer-events: none; } }`}</style>
      <svg viewBox="0 0 200 200" className="h-48 w-48 text-gold">
        <g transform="translate(100 100)" fill="none" stroke="currentColor" strokeWidth="0.8">
          {[90, 70, 50, 30, 12].map((r, i) => (
            <circle
              key={r}
              r={r}
              strokeDasharray={2 * Math.PI * r}
              strokeDashoffset={2 * Math.PI * r}
              style={{ animation: `draw-mandala 1.1s ease-out ${i * 0.08}s forwards` }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M0 -90 Q 8 -60 0 -30 Q -8 -60 0 -90 Z"
              transform={`rotate(${i * 30})`}
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{ animation: `draw-mandala 0.9s ease-out ${0.25 + i * 0.03}s forwards` }}
            />
          ))}
        </g>
      </svg>
      <div className="mt-6 font-display text-xs uppercase tracking-[0.5em] gold-text">
        Royal Mandala
      </div>
    </div>
  );
}
