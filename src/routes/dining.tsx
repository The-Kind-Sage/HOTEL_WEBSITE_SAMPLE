import { createFileRoute, Link } from "@tanstack/react-router";
import { KineticSplitReveal, DepthMapZoom } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroDining from "@/assets/hero-dining.jpg";
import heroPalace from "@/assets/hero-palace.jpg";
import textureMandala from "@/assets/texture-mandala-door.jpg";

const DISHES = [
  { name: "Saffron Lamb Kothey", course: "Signature", desc: "Hand-pressed momos, slow-braised lamb, saffron broth." },
  { name: "Mandala of Spice",     course: "Tasting",   desc: "Seven curries arranged as a living mandala on hammered brass." },
  { name: "Himalayan Trout",      course: "Mountain",  desc: "Wild river trout, juniper smoke, fermented butter." },
  { name: "Lotus Petal Kheer",    course: "Sweet",     desc: "Cardamom rice cream finished with edible 24-karat leaf." },
];

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Dining — Royal Mandala" },
      { name: "description", content: "Spiced cuisine served on brass and bone china, beneath candlelight and hand-carved mandalas." },
      { property: "og:title", content: "Dining — Royal Mandala" },
      { property: "og:image", content: heroDining },
    ],
  }),
  component: DiningPage,
});

function DiningPage() {
  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <KineticSplitReveal
          pair={{ from: textureMandala, to: heroDining, alt: "Palace doors opening to dining hall" }}
          panels={8}
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-night via-transparent to-indigo-night/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Dining</p>
          <TextReveal text="A Feast for the Senses." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <DepthMapZoom
            images={[heroDining, heroPalace, textureMandala]}
            className="aspect-[4/5] rounded-3xl"
          />
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">The Tasting Menu</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">A seven-course pilgrimage of flavor</h2>
            <p className="mt-5 text-ivory/70">
              Chef Ananya Rai composes each tasting as a moving mandala — every plate a meditation, every spice a prayer.
              Sourced from Himalayan farms within fifty kilometers of the palace.
            </p>
            <div className="mt-8 space-y-4">
              {DISHES.map((d) => (
                <GlassCard key={d.name} className="!p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{d.course}</p>
                      <h3 className="font-display text-xl text-ivory">{d.name}</h3>
                      <p className="mt-1 text-sm text-ivory/60">{d.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/contact"><MagneticButton>Reserve a Table</MagneticButton></Link>
            </div>
          </div>
        </div>
      </section>

      <SlidingPhoto
        src={textureMandala}
        alt="Hand-carved mandala door"
        eyebrow="At the Table"
        caption="Brass plates, candlelight, silence."
        from="right"
      />
    </>
  );
}
