import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CubeRotation3D, LetterboxSlide } from "@/lib/transitions";
import { TextReveal } from "@/components/ui-fx/TextReveal";
import { SlidingPhoto } from "@/components/ui-fx/SlidingPhoto";
import heroPalace from "@/assets/hero-palace.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import heroSuite from "@/assets/hero-suite.jpg";
import heroSpa from "@/assets/hero-spa.jpg";
import heroDining from "@/assets/hero-dining.jpg";
import heroExp from "@/assets/hero-experiences.jpg";
import heroEvents from "@/assets/hero-events.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import royal from "@/assets/room-royal.jpg";
import penthouse from "@/assets/room-penthouse.jpg";
import villa from "@/assets/room-villa.jpg";
import texture from "@/assets/texture-mandala-door.jpg";

const IMAGES = [
  heroPalace, heroTemple, heroSuite, heroSpa, heroDining,
  heroExp, heroEvents, heroAbout, royal, penthouse, villa, texture,
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Royal Mandala" },
      { name: "description", content: "A visual pilgrimage through every chamber, ritual, and view of the Royal Mandala." },
      { property: "og:title", content: "Gallery — Royal Mandala" },
      { property: "og:image", content: heroPalace },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="relative h-[60vh] overflow-hidden">
        <CubeRotation3D images={[heroPalace, heroTemple, heroSpa]} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night via-indigo-night/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-16 px-6 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold">Gallery</p>
          <TextReveal text="A Visual Pilgrimage." className="font-display text-5xl md:text-7xl gold-text" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </section>

      <SlidingPhoto
        src={texture}
        alt="Hand-carved mandala door, in detail"
        eyebrow="In Closer Detail"
        caption="A single door took seven seasons."
        from="left"
      />

      {/* Fullscreen lightbox with T11 letterbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-indigo-night/95 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <button
            className="glass absolute right-6 top-6 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold"
            onClick={() => setOpen(null)}
          >
            Close ✕
          </button>
          <div className="relative h-[80vh] w-[90vw] max-w-6xl">
            <LetterboxSlide active>
              <img src={IMAGES[open]} alt="" className="h-full w-full object-contain" />
            </LetterboxSlide>
          </div>
          <div className="absolute bottom-8 flex gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((o) => (o === null ? 0 : (o - 1 + IMAGES.length) % IMAGES.length)); }}
              className="glass rounded-full px-4 py-2 text-gold"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((o) => (o === null ? 0 : (o + 1) % IMAGES.length)); }}
              className="glass rounded-full px-4 py-2 text-gold"
            >›</button>
          </div>
        </div>
      )}
    </>
  );
}
