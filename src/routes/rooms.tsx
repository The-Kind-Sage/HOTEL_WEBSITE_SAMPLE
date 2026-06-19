import { createFileRoute, Link } from "@tanstack/react-router";
import { ParallaxLayerDissolve, MandalaIrisWipe } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { PalaceWhisper, WhisperQuote } from "@/components/ui-fx/SlideSections";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { TiltCard } from "@/components/ui-fx/TiltCard";

import royal from "@/assets/room-royal.jpg";
import penthouse from "@/assets/room-penthouse.jpg";
import villa from "@/assets/room-villa.jpg";
import heroSuite from "@/assets/hero-suite.jpg";
import heroPalace from "@/assets/hero-palace.jpg";

const ROOMS = [
  { slug: "royal", name: "Royal Deluxe Suite", price: "from $980 / night", img: royal,
    desc: "A canopied king bed beneath silk and a mountain view that breathes with the dawn." },
  { slug: "penthouse", name: "Himalayan Penthouse", price: "from $1,840 / night", img: penthouse,
    desc: "A private floor of marble, brass, and an infinity bath suspended above the clouds." },
  { slug: "villa", name: "Garden Mandala Villa", price: "from $1,420 / night", img: villa,
    desc: "Your own courtyard, lotus pond, and candle-lit corridor — a palace within the palace." },
  { slug: "lotus", name: "Lotus Heritage Room", price: "from $720 / night", img: heroSuite,
    desc: "Hand-painted ceilings, antique wood, and the scent of tuberose at dusk." },
  { slug: "stupa", name: "Stupa View Chamber", price: "from $640 / night", img: heroPalace,
    desc: "A serene chamber overlooking the temple courtyard, perfect for solitude and study." },
  { slug: "moonlight", name: "Moonlight Pavilion", price: "from $1,180 / night", img: royal,
    desc: "Floor-to-ceiling silk drapes and a private terrace beneath a thousand stars." },
];

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Royal Mandala" },
      { name: "description", content: "Twelve hand-carved chambers — sacred geometry, silk canopies, mountain views. Choose your sanctuary." },
      { property: "og:title", content: "Rooms & Suites — Royal Mandala" },
      { property: "og:image", content: heroSuite },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      <section className="relative h-[70vh] overflow-hidden">
        <ParallaxLayerDissolve
          images={[heroSuite, royal, penthouse, villa]}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/40 to-indigo-night/60" />
        <div className="absolute inset-x-0 bottom-20 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Rooms & Suites</p>
          <TextReveal
            text="Chambers of Serenity."
            className="font-display text-5xl md:text-7xl gold-text"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => (
            <TiltCard key={r.slug} className="anim-levitate" style={{ animationDelay: `${Math.random()}s` }}>
              <GlassCard className="h-[520px] p-0">
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <MandalaIrisWipe
                    pair={{ from: r.img, to: heroPalace, alt: r.name }}
                    trigger="hover"
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/30 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{r.price}</p>
                    <h3 className="mt-1 font-display text-2xl text-ivory">{r.name}</h3>
                    <p className="mt-2 text-sm text-ivory/70">{r.desc}</p>
                    <div className="pointer-events-auto mt-5">
                      <Link to="/contact">
                        <MagneticButton className="!px-6 !py-2.5 !text-[10px]">Reserve</MagneticButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </section>
      <PalaceWhisper />
      <WhisperQuote />

    </>
  );
}
