import { motion } from "framer-motion";
import { SlideIn } from "./SlideSections";

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * A large cinematic photo that slides in horizontally with a slow Ken-Burns
 * zoom. Pair it with a short eyebrow + caption for an editorial feel.
 */
export function SlidingPhoto({
  src,
  alt,
  eyebrow,
  caption,
  from = "right",
  height = "h-[60vh] md:h-[78vh]",
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
  from?: "left" | "right";
  height?: string;
}) {
  const dir = from === "right" ? 120 : -120;
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      {(eyebrow || caption) && (
        <SlideIn from={from === "right" ? "left" : "right"} className="mb-10 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-gold">
              {eyebrow}
            </p>
          )}
          {caption && (
            <h2 className="font-display text-3xl md:text-5xl gold-text">{caption}</h2>
          )}
        </SlideIn>
      )}

      <motion.div
        initial={{ x: dir, opacity: 0, scale: 1.05 }}
        whileInView={{ x: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: EASE }}
        className={`relative overflow-hidden rounded-3xl ${height} glass`}
      >
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>
    </section>
  );
}
