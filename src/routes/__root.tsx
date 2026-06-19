import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingNav } from "../components/shell/FloatingNav";
import { MusicPlayer } from "../components/shell/MusicPlayer";
import { CursorAura } from "../components/shell/CursorAura";
import { MandalaBackdrop } from "../components/shell/MandalaBackdrop";
import { ParticleField } from "../components/shell/ParticleField";
import { Preloader } from "../components/shell/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl gold-text">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase tracking-[0.3em] text-ivory">
          Path not found
        </h2>
        <p className="mt-2 text-sm text-ivory/60">
          This corridor of the palace does not exist. Return to the entrance.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full gold-gradient px-6 py-3 text-xs uppercase tracking-[0.3em] text-indigo-night"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl uppercase tracking-[0.3em] gold-text">
          The ritual was interrupted
        </h1>
        <p className="mt-2 text-sm text-ivory/60">
          Something went awry. You may try again or return to the entrance.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full gold-gradient px-6 py-3 text-xs uppercase tracking-[0.3em] text-indigo-night"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-gold/60 px-6 py-3 text-xs uppercase tracking-[0.3em] text-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Royal Mandala — Sacred Luxury in the Himalayas" },
      {
        name: "description",
        content:
          "Royal Mandala is a sanctuary suspended between Himalayan mountains and a dream — sacred geometry, royal cuisine, and timeless serenity.",
      },
      { name: "author", content: "Royal Mandala Hotel" },
      { name: "theme-color", content: "#0B0E1E" },
      { property: "og:title", content: "Royal Mandala — Sacred Luxury in the Himalayas" },
      {
        property: "og:description",
        content:
          "Step through a gilded portal into a living palace of mandala light, royal cuisine, and Himalayan stillness.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: "Royal Mandala",
          description:
            "A boutique Himalayan palace blending ancient mandala geometry with cinematic modern luxury.",
          starRating: { "@type": "Rating", ratingValue: "5" },
          priceRange: "$$$$",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NP",
            addressLocality: "Kathmandu Valley",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <MandalaBackdrop />
      <ParticleField />
      <CursorAura />
      <FloatingNav />
      <main className="relative z-10">
        <Outlet />
      </main>
      <MusicPlayer />
      <SiteFooter />
    </QueryClientProvider>
  );
}

function SiteFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-gold/15 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-lg gold-text">ROYAL MANDALA</div>
          <p className="mt-3 max-w-xs text-sm text-ivory/60">
            A digital sanctuary suspended between the Himalayas and a dream.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">Visit</div>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link to="/rooms" className="hover:text-gold">Rooms & Suites</Link></li>
            <li><Link to="/dining" className="hover:text-gold">Dining</Link></li>
            <li><Link to="/spa" className="hover:text-gold">Spa</Link></li>
            <li><Link to="/experiences" className="hover:text-gold">Experiences</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">Discover</div>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/events" className="hover:text-gold">Events & Weddings</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Heritage</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">Sanctuary</div>
          <p className="text-sm text-ivory/70">Kathmandu Valley · Nepal</p>
          <p className="mt-1 text-sm text-ivory/70">concierge@royalmandala.com</p>
          <p className="mt-1 text-sm text-ivory/70">+977 1 555 0188</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-gold/10 pt-6 text-center text-[10px] uppercase tracking-[0.4em] text-ivory/40">
        © {new Date().getFullYear()} Royal Mandala · All rites reserved
      </div>
    </footer>
  );
}
