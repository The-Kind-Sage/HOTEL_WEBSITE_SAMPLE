import { MandalaSVG } from "./MandalaSVG";

export function MandalaBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* large faint mandala top-right */}
      <MandalaSVG className="anim-mandala-slow absolute -top-[20vw] -right-[20vw] h-[90vw] w-[90vw] text-gold/[0.07]" />
      {/* smaller counter-rotating bottom-left */}
      <MandalaSVG className="anim-mandala-reverse absolute -bottom-[30vw] -left-[25vw] h-[80vw] w-[80vw] text-saffron/[0.06]" />
      {/* center subtle */}
      <MandalaSVG className="anim-mandala-slow absolute left-1/2 top-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2 text-gold/[0.03]" />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
}
