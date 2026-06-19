/**
 * Royal Mandala — 11 cinematic transition components.
 * Each is a "swap two images" component driven by scroll, hover, click or mount.
 * Built on Framer Motion. Reduced-motion users get clean crossfades.
 */
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ImgPair = { from: string; to: string; alt?: string };

const EASE = [0.25, 1, 0.5, 1] as const;

/* ---------- T1: Scroll-Zoom Photo Switch ---------- */
export function ScrollZoomSwitch({
  slides,
  className,
}: {
  slides: { src: string; title?: string; sub?: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={cn("relative", className)} style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {slides.map((s, i) => (
          <ScrollZoomSlide
            key={i}
            slide={s}
            index={i}
            total={slides.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollZoomSlide({
  slide,
  index,
  total,
  progress,
}: {
  slide: { src: string; title?: string; sub?: string };
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 1.18]);
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.02), start, end - 0.02, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const y = useTransform(progress, [start, end], ["0%", "-6%"]);
  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale, y }}>
      <img src={slide.src} alt={slide.title ?? ""} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/40 to-transparent" />
      {(slide.title || slide.sub) && (
        <div className="absolute inset-x-0 bottom-[18vh] flex flex-col items-center text-center px-6">
          {slide.sub && (
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">{slide.sub}</p>
          )}
          {slide.title && (
            <h2 className="font-display text-4xl md:text-6xl gold-text">{slide.title}</h2>
          )}
        </div>
      )}
    </motion.div>
  );
}


/* ---------- T2: Mandala Iris Wipe ---------- */
export function MandalaIrisWipe({ pair, trigger = "hover", className }: { pair: ImgPair; trigger?: "hover" | "click"; className?: string }) {
  const [active, setActive] = useState(false);
  const handlers =
    trigger === "hover"
      ? { onPointerEnter: () => setActive(true), onPointerLeave: () => setActive(false) }
      : { onClick: () => setActive((v) => !v) };

  return (
    <div className={cn("relative overflow-hidden", className)} {...handlers}>
      <img src={pair.from} alt={pair.alt ?? ""} className="h-full w-full object-cover" />
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: "circle(0% at 50% 50%)",
        }}
        animate={{ clipPath: active ? "circle(140% at 50% 50%)" : "circle(0% at 50% 50%)" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <img src={pair.to} alt="" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

/* ---------- T3: Parallax Layer Dissolve ---------- */
export function ParallaxLayerDissolve({ images, className }: { images: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % images.length);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[i]}
          src={images[i]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: EASE }}
        />
      </AnimatePresence>
      <button
        onClick={next}
        className="glass absolute bottom-4 right-4 z-10 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold"
      >
        Next ›
      </button>
    </div>
  );
}

/* ---------- T4: Kinetic Split-Screen Reveal ---------- */
export function KineticSplitReveal({ pair, panels = 6, className }: { pair: ImgPair; panels?: number; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn("relative overflow-hidden cursor-pointer", className)}
      onClick={() => setOpen((v) => !v)}
    >
      <img src={pair.to} alt={pair.alt ?? ""} className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex">
        {Array.from({ length: panels }).map((_, i) => (
          <motion.div
            key={i}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / panels}%` }}
            animate={{ y: open ? (i % 2 === 0 ? "-100%" : "100%") : "0%" }}
            transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
          >
            <img
              src={pair.from}
              alt=""
              className="absolute h-full object-cover"
              style={{ width: `${panels * 100}%`, left: `-${i * 100}%` }}
            />
          </motion.div>
        ))}
      </div>
      <div className="glass absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
        {open ? "Close" : "Open Palace Door"}
      </div>
    </div>
  );
}

/* ---------- T5: Smoke / Fog Crossfade ---------- */
export function SmokeFogCrossfade({ pair, className }: { pair: ImgPair; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={cn("relative overflow-hidden cursor-pointer", className)}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
    >
      <img src={on ? pair.to : pair.from} alt={pair.alt ?? ""} className="h-full w-full object-cover transition-all duration-700" style={{ filter: on ? "blur(0)" : "blur(0)" }} />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.9 }}
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, oklch(0.85 0.04 80 / 0.5), transparent 60%), radial-gradient(ellipse at 70% 40%, oklch(0.85 0.10 30 / 0.4), transparent 60%)",
          mixBlendMode: "screen",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

/* ---------- T6: 3D Cube Rotation ---------- */
export function CubeRotation3D({ images, className }: { images: string[]; className?: string }) {
  const [i, setI] = useState(0);
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ perspective: 2000 }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={i}
          src={images[i]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => setI((v) => (v - 1 + images.length) % images.length)}
          className="glass rounded-full px-3 py-1.5 text-xs text-gold"
        >
          ‹
        </button>
        <button
          onClick={() => setI((v) => (v + 1) % images.length)}
          className="glass rounded-full px-3 py-1.5 text-xs text-gold"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ---------- T7: Golden Dust Particle Fade ---------- */
export function GoldenDustFade({ pair, className }: { pair: ImgPair; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", className)} onClick={() => setOn((v) => !v)}>
      <motion.img
        src={on ? pair.to : pair.from}
        alt={pair.alt ?? ""}
        className="h-full w-full object-cover"
        initial={false}
        animate={{ filter: on ? "blur(0px) brightness(1)" : "blur(0px) brightness(1)" }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        key={String(on)}
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.6 }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 8px var(--gold)",
              animation: `drift-up ${1 + Math.random()}s ease-out`,
            }}
          />
        ))}
      </motion.div>
      <div className="glass absolute bottom-4 right-4 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
        Reveal
      </div>
    </div>
  );
}

/* ---------- T8: Lens Flare Burst ---------- */
export function LensFlareBurst({ pair, className }: { pair: ImgPair; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={cn("relative overflow-hidden cursor-pointer", className)} onClick={() => setOn((v) => !v)}>
      <img src={on ? pair.to : pair.from} alt={pair.alt ?? ""} className="h-full w-full object-cover" />
      <motion.div
        key={String(on)}
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0.2, 3, 5] }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.95 0.14 88 / 0.95), oklch(0.85 0.16 50 / 0.5) 30%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <div className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
        Explore
      </div>
    </div>
  );
}

/* ---------- T9: Ink Wash Reveal ---------- */
export function InkWashReveal({ pair, className }: { pair: ImgPair; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <img src={pair.from} alt="" className="h-full w-full object-cover" />
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)" }}
        whileInView={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img src={pair.to} alt={pair.alt ?? ""} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gold/30 via-transparent to-saffron/20 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}

/* ---------- T10: Depth Map Zoom ---------- */
export function DepthMapZoom({ images, className }: { images: string[]; className?: string }) {
  const [i, setI] = useState(0);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div key={i} className="absolute inset-0">
          <motion.img
            src={images[i]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.4, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, opacity: 0, filter: "blur(30px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-4">
        <button
          onClick={() => setI((v) => (v + 1) % images.length)}
          className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold"
        >
          Next Dish ›
        </button>
      </div>
    </div>
  );
}

/* ---------- T11: Letterbox Slide ---------- */
export function LetterboxSlide({ children, active }: { children: ReactNode; active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0 bg-indigo-night"
        animate={{ height: active ? "12%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0 bg-indigo-night"
        animate={{ height: active ? "12%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.div
        className="h-full w-full"
        animate={{ filter: active ? "blur(0px)" : "blur(0px)", scale: active ? 1 : 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
