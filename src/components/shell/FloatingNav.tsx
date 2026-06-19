import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { MandalaSVG } from "./MandalaSVG";

const links = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/dining", label: "Dining" },
  { to: "/spa", label: "Spa" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function FloatingNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop / tablet: top capsule */}
      <nav className="pointer-events-none fixed inset-x-0 top-5 z-50 hidden justify-center px-4 md:flex">
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full px-3 py-2">
          <Link
            to="/"
            className="mr-2 flex items-center gap-2 rounded-full px-3 py-1.5 text-gold"
            aria-label="Royal Mandala — Home"
          >
            <MandalaSVG className="h-5 w-5 anim-mandala-slow" />
            <span className="font-display text-sm tracking-[0.25em]">ROYAL MANDALA</span>
          </Link>
          <div className="mx-1 h-5 w-px bg-gold/30" />
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ivory/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile: floating mandala button + full-screen menu */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass fixed right-4 top-4 z-[55] flex h-12 w-12 items-center justify-center rounded-full text-gold md:hidden"
        aria-label="Open menu"
      >
        <MandalaSVG className={`h-7 w-7 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[54] flex items-center justify-center md:hidden"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.10 0.05 280 / 0.95), oklch(0.06 0.03 280 / 0.98))",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setOpen(false)}
        >
          <MandalaSVG className="anim-mandala-slow absolute inset-0 m-auto h-[120vw] w-[120vw] text-gold/20" />
          <ul className="relative z-10 space-y-4 text-center">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl uppercase tracking-[0.3em] text-ivory transition-colors hover:text-gold"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
