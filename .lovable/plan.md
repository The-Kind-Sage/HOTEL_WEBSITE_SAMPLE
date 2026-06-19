
# Royal Mandala — Build Plan

A premium, cinematic, multi-page hotel frontend. Built in phases so each milestone is reviewable in the preview.

## Tech & Setup

- React + TanStack Start (existing template)
- Tailwind v4 tokens in `src/styles.css` (deep indigo, imperial gold, saffron, lotus, ivory, copper)
- Fonts via `<link>` in `__root.tsx`: Cinzel + Cormorant Garamond (display), Inter (body)
- Animation: `framer-motion` + `gsap` (with ScrollTrigger)
- Particles: `tsparticles` (gold dust, petals)
- Audio: `howler` for the persistent music player
- Images: generated via `imagegen` (premium tier for hero/key shots, fast for fills), stored in `src/assets/`
- Audio tracks: ambient Himalayan tracks via ElevenLabs Music API (requires linking the ElevenLabs connector)

## Phase 1 — Foundation & Global Shell

1. Design tokens in `src/styles.css` (color palette, fonts, radii, shadows, gold gradients, glass mixins)
2. `__root.tsx`: font links, SEO meta, JSON-LD Hotel schema, cursor aura, ambient particles layer, background mandala SVGs
3. Global components in `src/components/`:
   - `Preloader` — SVG mandala self-drawing in gold + chime
   - `CursorAura` — golden orb following pointer
   - `FloatingNav` — glass capsule dock (desktop) + circular mandala menu (mobile)
   - `MusicPlayer` — bottom-right glass pill: play/pause, volume, mute, track name, reactive visualizer
   - `ParticleField` — drifting gold dust + lotus petals
   - `MandalaBackdrop` — slow counter-rotating SVG mandalas
   - `GlassCard`, `MagneticButton`, `TiltCard`, `TextReveal`, `LiquidGoldButton`
4. `TransitionProvider` — wraps `<Outlet />` with a route-change mandala iris/fade
5. Respect `prefers-reduced-motion` throughout

## Phase 2 — Cinematic Transition Library

A single `src/lib/transitions/` module exporting 11 reusable transition components, each driven by Framer Motion or GSAP + ScrollTrigger:

| # | Name | Used on |
|---|------|---------|
| T1 | ScrollZoomSwitch | Home hero, Gallery hero |
| T2 | MandalaIrisWipe | Room detail open/close, route changes |
| T3 | ParallaxLayerDissolve | Rooms hero, Experiences carousel |
| T4 | KineticSplitReveal | Dining hero |
| T5 | SmokeFogCrossfade | Spa hero, Contact hero |
| T6 | CubeRotation3D | Gallery lightbox nav, room switcher |
| T7 | GoldenDustFade | Home hero exit, Events form steps |
| T8 | LensFlareBurst | Experiences "Explore" CTA |
| T9 | InkWashReveal | About timeline, testimonial |
| T10 | DepthMapZoom | Dining dish carousel, room previews |
| T11 | LetterboxSlide | Gallery fullscreen mode |

Each accepts `from`/`to` image props (or children) and a `trigger` (scroll, hover, click, mount).

## Phase 3 — Pages

File-based routes under `src/routes/`:

- `index.tsx` — Home (T1 hero, highlights, testimonial T5, T7 exit)
- `rooms.tsx` — Rooms list (T3 hero, tilt cards)
- `rooms.$slug.tsx` — Room detail (T2 open, T6 gallery)
- `dining.tsx` — Dining (T4 hero, T10 dish carousel)
- `spa.tsx` — Spa & Wellness (T5 hero, T9 journey)
- `experiences.tsx` — Experiences (T3 carousel, T8 CTA)
- `gallery.tsx` — Masonry + lightbox (T6, T7, T10, T11)
- `events.tsx` — Events & Weddings (T9 hero, 3D book-fold, T7 form steps)
- `about.tsx` — Heritage timeline (T9, parallax)
- `contact.tsx` — Contact (T5 hero, map with pulsing marker, liquid gold submit)

Each route gets unique `head()` with title, description, OG tags.

## Phase 4 — Audio System

- `MusicPlayer` always mounted in `__root.tsx`
- 3 looping tracks generated via ElevenLabs Music ("Himalayan Dawn", "Palace Gardens", "Evening Ritual")
- First user click → fade in
- Auto-duck volume 20% during major transitions (event-bus pattern)
- Hover/submit chimes via short SFX clips
- Persistent mute toggle, respects autoplay policy

## Phase 5 — Polish & QA

- Responsive sweeps: 4K → 320px
- Reduced-motion fallbacks (swap transitions for fades)
- Lazy-load images, blur-up placeholders, WebP
- Lighthouse pass, JSON-LD validation
- Final preview screenshots per route

## Technical Details

```text
src/
├─ assets/                  generated images, mandala SVGs, audio files
├─ components/
│  ├─ shell/               Preloader, FloatingNav, MusicPlayer, CursorAura, ParticleField
│  ├─ ui-fx/               GlassCard, MagneticButton, TiltCard, TextReveal, LiquidGoldButton
│  └─ sections/            page-specific composed sections
├─ lib/
│  ├─ transitions/         T1–T11 components + shared easing/curves
│  ├─ audio/               music bus, ducking, chimes
│  └─ motion/              reduced-motion helpers, scroll utilities
├─ routes/                 9 pages + __root
└─ styles.css              tokens, glass mixins, mandala keyframes
```

## Dependencies to Install

`framer-motion gsap @gsap/react tsparticles @tsparticles/react @tsparticles/slim howler @types/howler`

## Prerequisites I Need From You

1. **ElevenLabs connector** for generating ambient music tracks. I'll prompt you to link it when we hit Phase 4 — or you can skip music generation and I'll wire the player to silent placeholders you can swap later.
2. **Booking flow**: contact + inquiry forms only (no real booking engine / payment), correct? Submissions will validate client-side and show a success state — no backend persistence unless you want Lovable Cloud enabled.

## Scope Notes

- Frontend-only. No database, no auth, no real booking — pure cinematic marketing site.
- All imagery AI-generated to match the palette/mood.
- I'll build Phase 1 first and pause for review before continuing — each phase is a natural checkpoint.
