import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ScrollZoomSwitch, InkWashReveal, GoldenDustFade } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { TiltCard } from "@/components/ui-fx/TiltCard";
import { MandalaSVG } from "@/components/shell/MandalaSVG";
import { PalaceWhisper, WhisperQuote } from "@/components/ui-fx/SlideSections";

import heroPalace from "@/assets/hero-palace.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import heroSuite from "@/assets/hero-suite.jpg";
import heroSpa from "@/assets/hero-spa.jpg";
import heroDining from "@/assets/hero-dining.jpg";
import textureMandala from "@/assets/texture-mandala-door.jpg";
import heroAbout from "@/assets/hero-about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royal Mandala — Enter the Sacred Palace" },
      {
        name: "description",
        content:
          "A Himalayan palace of mandala light, royal cuisine, and timeless serenity. Begin your journey into Royal Mandala.",
      },
      { property: "og:title", content: "Royal Mandala — Enter the Sacred Palace" },
      { property: "og:image", content: heroPalace },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Cinematic hero — T1 scroll-zoom switch through 4 scenes */}
      <ScrollZoomSwitch
        slides={[
          { src: heroPalace, sub: "Royal Mandala", title: "Enter the Sacred Palace" },
          { src: heroTemple, sub: "Awaken", title: "Where Mountains Meet Devotion" },
          { src: heroSuite, sub: "Rest", title: "Chambers Carved in Silk & Gold" },
          { src: heroSpa, sub: "Restore", title: "A Sanctuary of Lotus & Flame" },
        ]}
      />

      {/* Sticky CTA after hero scroll */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-32">
        <div className="relative text-center">
          <MandalaSVG className="anim-mandala-slow absolute -inset-32 -z-10 m-auto h-[60vh] w-[60vh] text-gold/15" />
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">A Cinematic Stay</p>
          <h1 className="font-display text-5xl leading-tight md:text-7xl gold-text">
            Where ancient grace
            <br />
            meets timeless luxury.
          </h1>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/rooms">
              <MagneticButton>Begin Your Journey</MagneticButton>
            </Link>
            <Link to="/about">
              <MagneticButton variant="ghost">Our Heritage</MagneticButton>
            </Link>
          </div>
          <div className="mt-12 inline-flex flex-col items-center text-ivory/50">
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll to Enter</span>
            <motion.svg
              viewBox="0 0 24 24"
              className="mt-2 h-6 w-6 text-gold"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path
                d="M12 2 C 16 6 16 12 12 16 C 8 12 8 6 12 2 Z M 12 16 v 6 M 9 19 l 3 3 3 -3"
                stroke="currentColor"
                fill="none"
              />
            </motion.svg>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-gold">Three Sanctuaries</p>
          <TextReveal
            text="Every corner of the palace is a ritual."
            className="font-display text-4xl md:text-5xl gold-text"
          />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { src: heroSuite, label: "Sacred Rooms", to: "/rooms", desc: "Twelve chambers, each a hand-carved meditation on light." },
            { src: heroDining, label: "Royal Dining", to: "/dining", desc: "Spiced cuisine served on brass, beneath candlelight." },
            { src: heroSpa,    label: "Holistic Spa", to: "/spa",   desc: "Tibetan bowls, lotus pools, ancient hands." },
          ].map((p) => (
            <TiltCard key={p.label} className="anim-levitate" style={{ animationDelay: `${Math.random()}s` }}>
              <Link to={p.to}>
                <GlassCard className="h-[420px] p-0">
                  <div className="relative h-full overflow-hidden rounded-2xl">
                    <img src={p.src} alt={p.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Explore</p>
                      <h3 className="mt-1 font-display text-2xl text-ivory">{p.label}</h3>
                      <p className="mt-2 text-sm text-ivory/70">{p.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Testimonial — Ink Wash Reveal (T9) frame */}
      <section className="relative mx-auto max-w-6xl px-6 py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <InkWashReveal
            pair={{ from: textureMandala, to: heroPalace, alt: "Palace at dusk" }}
            className="aspect-[4/5] rounded-3xl"
          />
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">A Whisper From a Guest</p>
            <blockquote className="font-serif text-3xl italic leading-snug text-ivory md:text-4xl">
              “We did not check in. We crossed a threshold.
              The mountains spoke, the mandalas listened, and time forgot us for a week.”
            </blockquote>
            <div className="mt-6 text-sm uppercase tracking-[0.3em] text-gold">— Amara Vance, Kyoto</div>
          </div>
        </div>
      </section>

      {/* Reveal: Golden Dust Fade (T7) */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-gold">A Glimpse Within</p>
          <h2 className="font-display text-4xl md:text-5xl gold-text">Tap to reveal the palace</h2>
        </div>
        <GoldenDustFade
          pair={{ from: heroSuite, to: heroSuite, alt: "Palace exterior to interior" }}
          className="aspect-[16/9] rounded-3xl"
        />
      </section>

      <PalaceWhisper />
      <WhisperQuote />



      {/* CTA strip */}
      <section className="relative px-6 py-24 text-center">
        <MandalaSVG className="anim-mandala-reverse pointer-events-none absolute inset-0 m-auto h-[80vh] w-[80vh] text-gold/10" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Your Sanctuary Awaits</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl md:text-6xl gold-text">
          Cross the threshold.
        </h2>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/rooms"><MagneticButton>Reserve a Chamber</MagneticButton></Link>
          <Link to="/contact"><MagneticButton variant="ghost">Speak With Us</MagneticButton></Link>
        </div>
      </section>
    </>
  );
}
