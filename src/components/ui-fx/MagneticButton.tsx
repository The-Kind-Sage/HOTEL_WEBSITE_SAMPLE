import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  strength = 0.35,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 will-change-transform";
  const styles =
    variant === "primary"
      ? "gold-gradient text-indigo-night font-semibold shadow-[0_20px_60px_-15px_rgba(201,162,39,0.55)] hover:shadow-[0_25px_80px_-15px_rgba(201,162,39,0.8)]"
      : "border border-gold/60 text-gold hover:bg-gold/10";

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(base, styles, className)}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
    </button>
  );
}
