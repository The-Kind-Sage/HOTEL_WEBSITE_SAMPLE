import { createFileRoute, Link } from "@tanstack/react-router";
import { SmokeFogCrossfade, InkWashReveal } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroSpa from "@/assets/hero-spa.jpg";
import heroPalace from "@/assets/hero-palace.jpg";
import textureMandala from "@/assets/texture-mandala-door.jpg";

const TREATMENTS = [
  { name: "Singing Bowl Bath",       minutes: 90,  desc: "Submerged in warm copper, surrounded by seven resonant bowls." },
  { name: "Himalayan Salt Stone",    minutes: 75,  desc: "Hand-warmed pink salt traces ancient meridians of stillness." },
  { name: "Lotus Oil Ritual",        minutes: 120, desc: "Four hands. Twelve oils. One slow, ceremonial unraveling." },
  { name: "Tibetan Sound Meditation", minutes: 60, desc: "Lay beneath bronze bells; dissolve into vibration." },
];

const CHAPTERS = [
  { title: "Threshold", body: "You arrive. Slippers wait. The world is gently lifted from your shoulders." },
  { title: "Cleansing", body: "Warm milk, rose, copper basin. The first letting go." },
  { title: "Resonance", body: "Bowls speak in tones older than language. Your breath finds them." },
  { title: "Stillness", body: "A long pause. Petals on water. Nothing is asked of you." },
];

export const Route = createFileRoute("/spa")({
  head: () => ({
    meta: [
      { title: "Spa & Wellness — Royal Mandala" },
      { name: "description", content: "A sanctuary of lotus pools, singing bowls and ancient hands. Restore the body. Quiet the mind." },
      { property: "og:title", content: "Spa & Wellness — Royal Mandala" },
      { property: "og:image", content: heroSpa },
    ],
  }),
  component: SpaPage,
});

function SpaPage() {
  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <SmokeFogCrossfade
          pair={{ from: heroSpa, to: heroPalace, alt: "Spa sanctuary" }}
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-night via-transparent to-indigo-night/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Spa & Wellness</p>
          <TextReveal text="Restore the Body. Quiet the Mind." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Rituals</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">Four ways to dissolve</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TREATMENTS.map((t) => (
            <GlassCard key={t.name} className="anim-levitate" style={{ animationDelay: `${Math.random()}s` }}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl text-ivory">{t.name}</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-gold">{t.minutes} min</span>
              </div>
              <p className="mt-2 text-sm text-ivory/70">{t.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">The Journey</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">A slow unfolding, in four chapters</h2>
        </div>
        <div className="space-y-12">
          {CHAPTERS.map((c, i) => (
            <div key={c.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <InkWashReveal
                pair={{ from: textureMandala, to: heroSpa, alt: c.title }}
                className="aspect-[4/3] rounded-3xl [direction:ltr]"
              />
              <div className="[direction:ltr]">
                <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Chapter {i + 1}</p>
                <h3 className="mt-3 font-display text-3xl text-ivory">{c.title}</h3>
                <p className="mt-3 text-ivory/70">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact"><MagneticButton>Book a Ritual</MagneticButton></Link>
        </div>
      </section>

      <SlidingPhoto
        src={textureMandala}
        alt="Mandala detail beside the spa"
        eyebrow="After the Ritual"
        caption="Stillness, embodied."
        from="right"
      />
    </>
  );
}
