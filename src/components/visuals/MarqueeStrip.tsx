"use client";

import {
  CATCHPHRASE_PRIMARY,
  CATCHPHRASE_SECONDARY,
} from "@/lib/brand";

const TEXT = `🎸 ROCK • 🤠 COUNTRY • 🎤 HIP-HOP • 📻 ${CATCHPHRASE_PRIMARY.toUpperCase()} • ⚡ ${CATCHPHRASE_SECONDARY.toUpperCase()} • 📍 LOCAL • ♫ ON THE AIR • `;

export default function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden border-y border-fuchsia-500/15 bg-zinc-950/90 py-3.5 shadow-[inset_0_0_30px_rgba(168,85,247,0.06)]">
      <div
        className={`flex w-max whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {[0, 1].map((dup) => (
          <span
            key={dup}
            className="marquee-outline font-[family-name:var(--font-display)] px-4 text-2xl font-black uppercase tracking-[0.12em] sm:text-3xl md:text-4xl"
          >
            {TEXT.repeat(2)}
          </span>
        ))}
      </div>
    </div>
  );
}
