import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 will-change-transform hover:-translate-y-1",
        className,
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
