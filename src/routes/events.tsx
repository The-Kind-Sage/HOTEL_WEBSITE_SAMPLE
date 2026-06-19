import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InkWashReveal, GoldenDustFade } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroEvents from "@/assets/hero-events.jpg";
import heroPalace from "@/assets/hero-palace.jpg";
import texture from "@/assets/texture-mandala-door.jpg";

const TYPES = [
  { name: "Sacred Weddings",    desc: "Hand-crafted ceremonies under thousand-light canopies." },
  { name: "Royal Celebrations", desc: "Birthdays, anniversaries — palace halls become your own." },
  { name: "Private Retreats",   desc: "Corporate gatherings of fewer than thirty, infused with ritual." },
];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Weddings — Royal Mandala" },
      { name: "description", content: "Sacred weddings and royal celebrations beneath thousand-light canopies in the Himalayas." },
      { property: "og:title", content: "Events & Weddings — Royal Mandala" },
      { property: "og:image", content: heroEvents },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", guests: "", date: "", notes: "" });
  const [done, setDone] = useState(false);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <InkWashReveal pair={{ from: texture, to: heroEvents, alt: "Sacred wedding canopy" }} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-transparent to-indigo-night/40" />
        <div className="absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Events & Weddings</p>
          <TextReveal text="Where Forever Begins." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {TYPES.map((t, i) => (
            <GlassCard key={t.name} className="anim-levitate" style={{ animationDelay: `${i * 0.4}s` }}>
              <h3 className="font-display text-2xl text-ivory">{t.name}</h3>
              <p className="mt-2 text-sm text-ivory/70">{t.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">Begin the Ritual</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl gold-text">An invitation to inquire</h2>
        </div>

        <GlassCard className="!p-10">
          {done ? (
            <div className="py-12 text-center">
              <GoldenDustFade pair={{ from: heroEvents, to: heroPalace }} className="mx-auto mb-8 aspect-[16/9] w-full max-w-xl rounded-2xl" />
              <h3 className="font-display text-3xl gold-text">Your inquiry has reached us.</h3>
              <p className="mt-3 text-ivory/70">A concierge will write to you within twelve hours, by hand.</p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="mb-8 flex items-center justify-center gap-3">
                {[0, 1, 2].map((s) => (
                  <span
                    key={s}
                    className={`h-px transition-all duration-500 ${
                      s === step ? "w-16 bg-gold" : s < step ? "w-8 bg-gold/60" : "w-8 bg-ivory/15"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {step === 0 && (
                    <div className="space-y-5">
                      <Field label="Your Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
                      <Field label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-5">
                      <Field label="Approximate Guests" value={data.guests} onChange={(v) => setData({ ...data, guests: v })} />
                      <Field label="Preferred Dates" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-5">
                      <Field label="A few words about your vision" textarea value={data.notes} onChange={(v) => setData({ ...data, notes: v })} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex justify-between gap-3">
                <button
                  disabled={step === 0}
                  onClick={() => setStep((s) => s - 1)}
                  className="text-xs uppercase tracking-[0.3em] text-ivory/60 hover:text-gold disabled:opacity-30"
                >
                  ‹ Back
                </button>
                {step < 2 ? (
                  <MagneticButton onClick={() => setStep((s) => s + 1)}>Continue</MagneticButton>
                ) : (
                  <MagneticButton onClick={() => setDone(true)}>Send Inquiry</MagneticButton>
                )}
              </div>
            </>
          )}
        </GlassCard>
      </section>

      <SlidingPhoto
        src={heroPalace}
        alt="Palace halls dressed for celebration"
        eyebrow="In Celebration"
        caption="Halls become yours alone."
        from="left"
      />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full border-b border-gold/30 bg-transparent py-3 text-ivory placeholder-transparent outline-none focus:border-gold transition-colors";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea rows={4} className={cls} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} className={cls} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <span className="pointer-events-none absolute left-0 top-3 text-xs uppercase tracking-[0.3em] text-ivory/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-gold">
        {label}
      </span>
    </label>
  );
}
