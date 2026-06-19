import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.25, 1, 0.5, 1] as const;

/** Slide-in wrapper — content rises and fades when it enters the viewport. */
export function SlideIn({
  children,
  from = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const offset = 60;
  const initial =
    from === "up"
      ? { y: offset, opacity: 0 }
      : from === "down"
        ? { y: -offset, opacity: 0 }
        : from === "left"
          ? { x: -offset, opacity: 0 }
          : { x: offset, opacity: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { n: "12", l: "Sacred Chambers" },
  { n: "7", l: "Ritual Courses" },
  { n: "108", l: "Hand-Carved Mandalas" },
  { n: "∞", l: "Mountain Silence" },
];

const VOWS = [
  { t: "Sourced from the Valley", d: "Every grain, every petal, every thread is gathered within a fifty-kilometer arc of the palace." },
  { t: "Carved by Hand", d: "Each door, each lattice, each mandala was shaped by Newari artisans across seven seasons." },
  { t: "Tended in Silence", d: "Our staff move as monks do — softly, reverently, leaving only warmth in their wake." },
];

/**
 * A long, animated mid-page section to give each route real vertical real estate
 * between the header and footer. Slide-in stats + vows + a closing whisper.
 */
export function PalaceWhisper({
  eyebrow = "The Palace Promise",
  title = "Every gesture, a quiet ceremony.",
  body = "Royal Mandala is not a hotel. It is a slow ritual carried out by a hundred unseen hands — a promise that for the length of your stay, the world will not be permitted to find you.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <SlideIn from="up" className="mb-20 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">{eyebrow}</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl md:text-5xl gold-text">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-ivory/65">{body}</p>
      </SlideIn>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <SlideIn
            key={s.l}
            from={i % 2 === 0 ? "left" : "right"}
            delay={i * 0.08}
            className="glass rounded-2xl p-8 text-center"
          >
            <div className="font-display text-5xl gold-text">{s.n}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-ivory/60">{s.l}</div>
          </SlideIn>
        ))}
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {VOWS.map((v, i) => (
          <SlideIn
            key={v.t}
            from="up"
            delay={i * 0.12}
            className="glass rounded-2xl p-8"
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold">Vow {i + 1}</div>
            <h3 className="font-display text-2xl text-ivory">{v.t}</h3>
            <p className="mt-3 text-sm text-ivory/65">{v.d}</p>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}

/** A simple long quote strip with a slide-in from the side. */
export function WhisperQuote({
  quote = "The mountains spoke. The mandalas listened. Time forgot us for a week.",
  author = "A guest, in the visitor's book",
}: { quote?: string; author?: string }) {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-32">
      <SlideIn from="left">
        <div className={cn("glass rounded-3xl p-10 md:p-16 text-center")}>
          <div className="font-display text-4xl gold-text md:text-5xl">“</div>
          <blockquote className="mt-2 font-serif text-2xl italic leading-snug text-ivory md:text-3xl">
            {quote}
          </blockquote>
          <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold">— {author}</div>
        </div>
      </SlideIn>
    </section>
  );
}
