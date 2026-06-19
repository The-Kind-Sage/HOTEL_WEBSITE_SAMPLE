import { createFileRoute } from "@tanstack/react-router";
import { InkWashReveal } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroAbout from "@/assets/hero-about.jpg";
import heroPalace from "@/assets/hero-palace.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import texture from "@/assets/texture-mandala-door.jpg";

const TIMELINE = [
  { year: "1742", title: "A Mountain Throne",     body: "The palace is raised by King Bhairava on a ridge said to be drawn by a hawk." },
  { year: "1889", title: "The Mandala Hall",      body: "A master gilder spends seven years carving the central mandala that gives the palace its name." },
  { year: "1957", title: "Doors Opened",          body: "The descendants of the king welcome travellers for the first time, as honoured guests." },
  { year: "2014", title: "Restoration",           body: "Every beam, fresco and silk thread is restored by local artisans, true to the original craft." },
  { year: "Today", title: "A Living Sanctuary",   body: "Twelve chambers, four rituals, one quiet promise: leave lighter than you arrived." },
];

const HOSTS = [
  { name: "Anaya Shrestha", role: "Royal Hostess", quote: "Every guest is met as if they were a returning friend." },
  { name: "Tenzin Norbu",   role: "Master of Ritual", quote: "Stillness is the most expensive luxury we offer." },
  { name: "Chef Ananya Rai", role: "Executive Chef", quote: "Spice is the original storyteller." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Heritage — Royal Mandala" },
      { name: "description", content: "Three centuries of mountain royalty, sacred craft, and quiet hospitality. The story of Royal Mandala." },
      { property: "og:title", content: "Our Heritage — Royal Mandala" },
      { property: "og:image", content: heroAbout },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[80vh] overflow-hidden">
        <img src={heroAbout} alt="Royal Mandala exterior at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/40 to-indigo-night/30" />
        <div className="absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Our Heritage</p>
          <TextReveal text="Three Centuries of Stillness." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Origin</p>
            <h2 className="mt-3 font-display text-4xl gold-text">A palace dreamed by a hawk</h2>
            <p className="mt-5 text-ivory/70">
              In 1742, a hawk circled seven times over a quiet ridge in the Kathmandu Valley. King Bhairava
              took the sign and built upon that earth a palace of carved cedar, hammered brass, and gold leaf —
              every chamber laid out as a living mandala, every doorway a meditation.
            </p>
            <p className="mt-4 text-ivory/70">
              Today the palace remains. Its rituals, its silence, its silks — all are kept by the descendants
              of the artisans who first imagined it. To stay here is to be loaned, for a few nights, the keys
              to that quiet inheritance.
            </p>
          </div>
          <InkWashReveal pair={{ from: texture, to: heroPalace, alt: "Palace interior" }} className="aspect-[4/5] rounded-3xl" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Timeline</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">A line of light through time</h2>
        </div>
        <ol className="relative space-y-12 border-l border-gold/30 pl-10">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[46px] top-1.5 h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_var(--gold)]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{t.year}</p>
              <h3 className="mt-1 font-display text-2xl text-ivory">{t.title}</h3>
              <p className="mt-2 max-w-xl text-ivory/70">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Royal Hosts</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">The keepers of the palace</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {HOSTS.map((h, i) => (
            <GlassCard key={h.name} className="anim-levitate" style={{ animationDelay: `${i * 0.4}s` }}>
              <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl">
                <img src={[heroAbout, heroTemple, heroPalace][i]} alt={h.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-display text-xl text-ivory">{h.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{h.role}</p>
              <p className="mt-3 font-serif italic text-ivory/75">“{h.quote}”</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <SlidingPhoto
        src={heroTemple}
        alt="The temple ridge at dawn"
        eyebrow="A ridge drawn by hawks"
        caption="Three centuries, one mountain."
        from="right"
      />
    </>
  );
}
