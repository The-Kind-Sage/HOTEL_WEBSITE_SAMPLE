import { createFileRoute, Link } from "@tanstack/react-router";
import { ParallaxLayerDissolve, LensFlareBurst } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { TiltCard } from "@/components/ui-fx/TiltCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroExp from "@/assets/hero-experiences.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import heroPalace from "@/assets/hero-palace.jpg";

const EXPERIENCES = [
  { title: "Sunrise at the Stupa",      tag: "At Dawn",   desc: "Walk barefoot to a thousand-year-old monastery as gold light strikes the peaks." },
  { title: "Private Helicopter Soar",   tag: "Above",     desc: "Lift over Annapurna with a private guide and silver thermos of butter tea." },
  { title: "Mandala Painting Class",    tag: "By Hand",   desc: "A master monk teaches you to draw your own mandala on rice paper, in gold ink." },
  { title: "River Lantern Ceremony",    tag: "By Night",  desc: "Release a hand-folded lantern into the river while bells ring across the valley." },
  { title: "Tea Garden Picnic",         tag: "Among",     desc: "A linen-laid picnic among singing tea bushes on terraces older than memory." },
  { title: "Tiger Trail Trek",          tag: "Beyond",    desc: "A two-day guided trek through cloud forests with overnight palace tents." },
];

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — Royal Mandala" },
      { name: "description", content: "Curated journeys: sunrise stupas, helicopter soars, mandala lessons. Slip beyond the palace walls." },
      { property: "og:title", content: "Experiences — Royal Mandala" },
      { property: "og:image", content: heroExp },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <>
      <section className="relative h-[80vh] overflow-hidden">
        <ParallaxLayerDissolve images={[heroExp, heroTemple, heroPalace]} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/30 to-indigo-night/50" />
        <div className="absolute inset-x-0 bottom-20 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Experiences</p>
          <TextReveal text="The Palace Is Only the Beginning." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <TiltCard key={e.title} className="anim-levitate" style={{ animationDelay: `${i * 0.3}s` }}>
              <GlassCard className="h-[420px] p-0">
                <LensFlareBurst
                  pair={{ from: i % 2 ? heroExp : heroTemple, to: heroPalace, alt: e.title }}
                  className="h-2/3 rounded-t-2xl"
                />
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{e.tag}</p>
                  <h3 className="mt-1 font-display text-xl text-ivory">{e.title}</h3>
                  <p className="mt-2 text-sm text-ivory/65">{e.desc}</p>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact"><MagneticButton>Curate My Journey</MagneticButton></Link>
        </div>
      </section>

      <SlidingPhoto
        src={heroTemple}
        alt="A path beyond the palace gates"
        eyebrow="Cross the Threshold"
        caption="The valley is your private theatre."
        from="right"
      />
    </>
  );
}
