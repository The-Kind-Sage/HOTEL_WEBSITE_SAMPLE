import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmokeFogCrossfade } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { MagneticButton } from "@/components/ui-fx/MagneticButton";
import { GlassCard } from "@/components/ui-fx/GlassCard";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";

import heroAbout from "@/assets/hero-about.jpg";
import heroPalace from "@/assets/hero-palace.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Royal Mandala" },
      { name: "description", content: "Speak with our concierge. We answer every inquiry by hand within twelve hours." },
      { property: "og:title", content: "Contact — Royal Mandala" },
      { property: "og:image", content: heroAbout },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErr("Please complete every field, with grace.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr("That email does not look quite right.");
      return;
    }
    setErr("");
    setSent(true);
  };

  return (
    <>
      <section className="relative h-[60vh] overflow-hidden">
        <SmokeFogCrossfade pair={{ from: heroAbout, to: heroPalace, alt: "Palace exterior" }} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-16 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Contact</p>
          <TextReveal text="Speak With the Palace." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <GlassCard className="!p-10">
            <h3 className="font-display text-2xl gold-text">Find Us</h3>
            <ul className="mt-6 space-y-4 text-ivory/80">
              <li><span className="block text-[10px] uppercase tracking-[0.3em] text-gold">Address</span>Royal Mandala Palace, Kathmandu Valley, Nepal</li>
              <li><span className="block text-[10px] uppercase tracking-[0.3em] text-gold">Concierge</span>concierge@royalmandala.com</li>
              <li><span className="block text-[10px] uppercase tracking-[0.3em] text-gold">By Telephone</span>+977 1 555 0188</li>
              <li><span className="block text-[10px] uppercase tracking-[0.3em] text-gold">Hours</span>Always. The palace never sleeps.</li>
            </ul>

            {/* Stylised map with pulsing marker */}
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20"
                 style={{
                   background:
                     "radial-gradient(circle at 40% 60%, oklch(0.18 0.06 280), oklch(0.10 0.04 280) 70%)",
                 }}>
              <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-gold/40">
                <path d="M0 200 Q100 100 200 180 T 400 150" stroke="currentColor" fill="none" strokeDasharray="3 6" />
                <path d="M0 250 Q150 220 250 240 T 400 220" stroke="currentColor" fill="none" strokeDasharray="2 4" />
                <path d="M50 80 Q200 50 350 90" stroke="currentColor" fill="none" strokeDasharray="2 4" />
              </svg>
              <div className="absolute" style={{ left: "52%", top: "55%" }}>
                <span className="anim-pulse-glow absolute -inset-6 rounded-full bg-gold/30 blur-md" />
                <span className="relative block h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_var(--gold)]" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="!p-10">
            <h3 className="font-display text-2xl gold-text">Send a Letter</h3>
            {sent ? (
              <div className="mt-10 text-center">
                <div className="mx-auto h-16 w-16 rounded-full gold-gradient" />
                <h4 className="mt-6 font-display text-2xl text-ivory">Your message has arrived.</h4>
                <p className="mt-2 text-ivory/70">We will write back by hand, within twelve hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-6">
                <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                {err && <p className="text-xs uppercase tracking-[0.3em] text-saffron">{err}</p>}
                <div className="pt-2">
                  <MagneticButton type="submit">Send Letter</MagneticButton>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      <SlidingPhoto
        src={heroPalace}
        alt="Palace at twilight"
        eyebrow="Where to find us"
        caption="A palace at the edge of the cloud line."
        from="left"
      />
    </>
  );
}

function Field({
  label, value, onChange, type = "text", textarea = false,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean;
}) {
  const cls =
    "peer w-full border-b border-gold/30 bg-transparent py-3 text-ivory placeholder-transparent outline-none focus:border-gold transition-colors";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea rows={5} className={cls} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} className={cls} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <span className="pointer-events-none absolute left-0 top-3 text-xs uppercase tracking-[0.3em] text-ivory/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-gold">
        {label}
      </span>
    </label>
  );
}
