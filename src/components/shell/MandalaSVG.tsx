import type { SVGProps } from "react";

/** Sacred mandala line-art used as backdrop and preloader */
export function MandalaSVG({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <g transform="translate(200 200)">
        {/* concentric rings */}
        {[180, 160, 140, 120, 100, 80, 60, 40, 20].map((r) => (
          <circle key={r} r={r} />
        ))}
        {/* radial petals */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          return (
            <g key={i} transform={`rotate(${a})`}>
              <path d="M0 -180 Q 14 -150 0 -120 Q -14 -150 0 -180 Z" />
              <line x1="0" y1="-180" x2="0" y2="-20" />
              <path d="M0 -140 Q 22 -110 0 -80 Q -22 -110 0 -140 Z" />
            </g>
          );
        })}
        {/* inner lotus */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          return (
            <g key={`p${i}`} transform={`rotate(${a})`}>
              <path d="M0 -60 Q 10 -45 0 -25 Q -10 -45 0 -60 Z" />
            </g>
          );
        })}
        <circle r="6" fill="currentColor" />
      </g>
    </svg>
  );
}
