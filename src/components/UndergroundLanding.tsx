"use client";

import {
  ChevronRight,
  Guitar,
  Headphones,
  Instagram,
  Mic2,
  Music,
  Radio,
  Waves,
  Youtube,
} from "lucide-react";
import TransmitTrackForm from "@/components/TransmitTrackForm";
import {
  CATCHPHRASE_PRIMARY,
  CATCHPHRASE_SECONDARY,
} from "@/lib/brand";
import EqualizerBadge from "@/components/visuals/EqualizerBadge";
import FloatingElements from "@/components/visuals/FloatingElements";
import HeroWaveform from "@/components/visuals/HeroWaveform";
import MarqueeStrip from "@/components/visuals/MarqueeStrip";
import VinylWatermark from "@/components/visuals/VinylWatermark";

const BODY_COPY =
  "font-[family-name:var(--font-body)] font-medium leading-relaxed text-zinc-300";

const SECTION_SUBHEAD =
  "font-sans text-xs font-black uppercase tracking-[0.25em] text-zinc-300 sm:text-sm";

const STATION_BLOCKS = [
  {
    title: "The Underground Americana",
    emoji: "🤠",
    tag: "Roots & Outlaw",
    description: "Gritty local Country, Roots, Outlaw.",
    watermark: "COUNTRY",
    icon: Guitar,
    glowColor: "rgba(249,115,22,0.55)",
    borderHover:
      "group-hover/card:border-orange-500/80 group-hover/card:shadow-[0_0_50px_rgba(249,115,22,0.55),0_12px_40px_rgba(249,115,22,0.25),inset_0_0_60px_rgba(249,115,22,0.08)]",
    ringHover:
      "group-hover/card:ring-2 group-hover/card:ring-orange-500/60 group-hover/card:ring-offset-2 group-hover/card:ring-offset-zinc-950",
    accent: "from-orange-600/30 via-amber-500/10 to-transparent",
    iconColor: "text-orange-400",
    vinylColor: "text-orange-500",
    watermarkColor: "text-orange-500",
  },
  {
    title: "The Sonic Forge",
    emoji: "⚡",
    tag: "Heavy & Loud",
    description: "Heavy Alt-Rock, Metal, Punk.",
    watermark: "METAL",
    icon: Waves,
    glowColor: "rgba(34,197,94,0.55)",
    borderHover:
      "group-hover/card:border-emerald-400/90 group-hover/card:shadow-[0_0_60px_rgba(34,197,94,0.65),0_12px_44px_rgba(34,197,94,0.35),inset_0_0_70px_rgba(34,197,94,0.14)]",
    ringHover:
      "group-hover/card:ring-2 group-hover/card:ring-emerald-400/80 group-hover/card:shadow-[0_0_50px_rgba(34,197,94,0.55)] group-hover/card:ring-offset-2 group-hover/card:ring-offset-zinc-950",
    accent: "from-lime-500/25 via-green-600/10 to-transparent",
    iconColor: "text-lime-400",
    vinylColor: "text-lime-400",
    watermarkColor: "text-lime-400",
  },
  {
    title: "Urban Pulse",
    emoji: "🎤",
    tag: "Beats & Bars",
    description: "Local Hip-Hop, Rap, R&B.",
    watermark: "HIP-HOP",
    icon: Mic2,
    glowColor: "rgba(168,85,247,0.6)",
    borderHover:
      "group-hover/card:border-purple-500/90 group-hover/card:shadow-[0_0_65px_rgba(168,85,247,0.7),0_12px_44px_rgba(236,72,153,0.35),inset_0_0_70px_rgba(168,85,247,0.14)]",
    ringHover:
      "group-hover/card:ring-2 group-hover/card:ring-purple-500/80 group-hover/card:shadow-[0_0_55px_rgba(168,85,247,0.55)] group-hover/card:ring-offset-2 group-hover/card:ring-offset-zinc-950",
    accent: "from-fuchsia-600/30 via-violet-600/10 to-transparent",
    iconColor: "text-fuchsia-400",
    vinylColor: "text-fuchsia-500",
    watermarkColor: "text-fuchsia-500",
  },
  {
    title: "Live Studio Broadcasts",
    emoji: "📡",
    tag: "On The Air",
    description: "Visual streaming & call-ins directly from the console desk.",
    watermark: "LIVE",
    icon: Radio,
    glowColor: "rgba(34,211,238,0.5)",
    borderHover:
      "group-hover/card:border-cyan-400/80 group-hover/card:shadow-[0_0_50px_rgba(34,211,238,0.55),0_12px_40px_rgba(34,211,238,0.25),inset_0_0_60px_rgba(34,211,238,0.1)]",
    ringHover:
      "group-hover/card:ring-2 group-hover/card:ring-cyan-400/70 group-hover/card:ring-offset-2 group-hover/card:ring-offset-zinc-950",
    accent: "from-cyan-500/25 via-blue-600/10 to-transparent",
    iconColor: "text-cyan-400",
    vinylColor: "text-cyan-400",
    watermarkColor: "text-cyan-400",
    wide: true,
  },
] as const;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function SectionHeading({
  kicker,
  icon,
  title,
  sub,
}: {
  kicker: string;
  icon: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="relative mb-16 text-center">
      <p className="section-kicker mb-3">
        <span className="music-glow">{icon}</span> {kicker}
      </p>
      <h2 className="neon-heading font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-[0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="hero-gradient-text">{title}</span>
      </h2>
      <p className="music-divider mt-5" aria-hidden="true">
        ♪ ♫ ♪
      </p>
      <p className={`mt-4 ${SECTION_SUBHEAD}`}>{sub}</p>
    </div>
  );
}

export default function UndergroundLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-zinc-100">
      {/* Ambient layers */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_85%)]" />
      </div>

      <header className="fixed top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-fuchsia-500/20 bg-black/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <a
            href="#"
            className="neon-logo group font-[family-name:var(--font-display)] text-xs font-black tracking-[0.28em] transition-all sm:text-sm"
          >
            <span className="music-glow note-bob mr-1.5 inline-block text-base">♪</span>
            <span className="text-white">937 </span>
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent group-hover:animate-glitch">
              THE UNDERGROUND
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { href: "#", label: "TikTok", Icon: TikTokIcon },
                { href: "#", label: "Instagram", Icon: Instagram },
                { href: "#", label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-300 hover:scale-110 hover:border-fuchsia-500/60 hover:text-fuchsia-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] sm:h-10 sm:w-10"
                >
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </a>
              ))}
            </div>

            <a
              href="#submit"
              className="hidden rounded-lg border border-fuchsia-500/50 bg-fuchsia-600/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-fuchsia-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-all duration-300 hover:scale-105 hover:bg-fuchsia-600/40 hover:shadow-[0_0_35px_rgba(236,72,153,0.55)] sm:inline-flex sm:items-center sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span className="music-glow">🎵</span> Submit Music
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <HeroWaveform />
          <FloatingElements />

          <div className="relative z-10 mx-auto max-w-6xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-fuchsia-500/40 bg-fuchsia-950/40 px-5 py-2 shadow-[0_0_30px_rgba(236,72,153,0.25)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
              </span>
              <span className="music-glow text-sm">📻</span>
              <EqualizerBadge />
              <span className="font-[family-name:var(--font-display)] text-xs font-black uppercase tracking-[0.22em] text-fuchsia-200 sm:text-sm">
                Now Broadcasting from the 937
              </span>
              <EqualizerBadge />
              <span className="music-glow note-bob-delayed text-sm">🎧</span>
            </div>

            <p className="catchphrase-secondary mb-5 text-[10px] sm:text-xs">
              <span className="music-glow">♫</span> {CATCHPHRASE_SECONDARY}{" "}
              <span className="music-glow">♫</span>
            </p>

            <div className="relative mb-6">
              <div
                className="pointer-events-none absolute inset-0 -z-10 scale-[2] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.35)_0%,rgba(168,85,247,0.15)_40%,transparent_65%)]"
                aria-hidden="true"
              />
              <h1 className="neon-heading font-[family-name:var(--font-display)] text-[2.75rem] font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]">
                <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Dayton&apos;s New Home
                </span>
                <span className="hero-gradient-text mt-1 block">
                  For Independent Music.
                </span>
              </h1>
              <p className="catchphrase-primary mx-auto mt-5 max-w-2xl">
                {CATCHPHRASE_PRIMARY}
              </p>
            </div>

            <p className={`mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl ${BODY_COPY}`}>
              <span className="music-glow">🎚️</span>{" "}
              <span className="font-semibold text-zinc-100">No corporate play blocks.</span> 100%
              raw, unsigned, local Rock, Country, and Hip-Hop. Streamed straight from the
              underground to your dashboard. <span className="music-glow">🔊</span>
            </p>

            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <a
                href="#submit"
                className="btn-voltage group relative flex w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-sm font-extrabold uppercase tracking-widest text-white sm:w-auto sm:text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shimmer" />
                <Music className="relative h-5 w-5 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-125 group-hover:text-pink-200" />
                <span className="relative">Artists: Drop Your Tracks</span>
                <ChevronRight className="relative h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </a>

              <a
                href="#vibe"
                className="group relative flex w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-zinc-700/80 bg-zinc-950/60 px-10 py-5 text-sm font-extrabold uppercase tracking-widest text-zinc-100 backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] sm:w-auto sm:text-base"
              >
                <Headphones className="h-5 w-5 text-fuchsia-400 transition-all duration-300 group-hover:rotate-[360deg] group-hover:scale-125 group-hover:text-pink-400" />
                Listeners: Join the Hype
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <div className="flex items-end gap-1">
              {[0.3, 0.7, 1, 0.5, 0.85, 0.4].map((h, i) => (
                <span
                  key={i}
                  className="eq-bar w-1 rounded-full bg-gradient-to-t from-fuchsia-600 to-orange-400"
                  style={{
                    height: `${h * 24}px`,
                    animation: `eq-bounce ${0.4 + i * 0.08}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-fuchsia-500 to-transparent" />
          </div>
        </section>

        <MarqueeStrip />

        <section id="vibe" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-[8%] top-[18%] h-96 w-96 animate-pulse rounded-full bg-purple-600/10 blur-[120px]" />
            <div
              className="absolute right-[10%] top-[42%] h-[22rem] w-[22rem] animate-pulse rounded-full bg-fuchsia-600/10 blur-[120px]"
              style={{ animationDelay: "0.8s" }}
            />
            <div
              className="absolute bottom-[12%] left-1/2 h-80 w-80 -translate-x-1/2 animate-pulse rounded-full bg-violet-600/10 blur-[120px]"
              style={{ animationDelay: "1.4s" }}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.06)_0%,transparent_50%)]"
            aria-hidden="true"
          />

          <SectionHeading
            kicker="Tune In"
            icon="🎵"
            title="Station Blocks"
            sub={`${CATCHPHRASE_SECONDARY} — four lanes, one underground frequency.`}
          />

          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-transparent blur-[140px]"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STATION_BLOCKS.map((block) => {
                const Icon = block.icon;
                return (
                  <article
                    key={block.title}
                    className={`group/card relative min-h-[220px] overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] ${block.borderHover} ${block.ringHover} ${
                      "wide" in block && block.wide
                        ? "sm:col-span-2 lg:col-span-3 lg:min-h-[200px]"
                        : ""
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover/card:opacity-100"
                      style={{ backgroundColor: block.glowColor }}
                      aria-hidden="true"
                    />

                    <span
                      className={`watermark-reveal pointer-events-none absolute -bottom-4 -left-2 font-[family-name:var(--font-display)] text-[5rem] font-black uppercase leading-none opacity-0 transition-all duration-500 sm:text-[6rem] ${block.watermarkColor}`}
                      style={{ transform: "translateX(-20%)" }}
                    >
                      {block.watermark}
                    </span>

                    <VinylWatermark color={block.vinylColor} />

                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover/card:opacity-100 ${block.accent}`}
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                      style={{ boxShadow: `inset 0 0 80px ${block.glowColor}` }}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div
                          className={`relative inline-flex rounded-xl border border-zinc-700/80 bg-black/60 p-3.5 shadow-lg ${block.iconColor} transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-[0_0_25px_currentColor]`}
                        >
                          <Icon className="h-7 w-7" strokeWidth={2} />
                          <span className="music-glow absolute -right-2 -top-2 text-base">
                            {block.emoji}
                          </span>
                        </div>
                        <span className="radio-tag shrink-0">{block.tag}</span>
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-[0.06em] text-white sm:text-3xl">
                        {block.title}
                      </h3>
                      <p className={`mt-3 max-w-md text-sm sm:text-base ${BODY_COPY}`}>
                        {block.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <MarqueeStrip reverse />

        <section id="submit" className="relative mx-auto max-w-2xl px-4 py-28 sm:px-6 lg:px-8">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <SectionHeading
            kicker="Go Live"
            icon="💿"
            title="Transmit Your Track"
            sub={`${CATCHPHRASE_PRIMARY} Drop your track — we'll spin it from the console.`}
          />

          <TransmitTrackForm />
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-800/80 bg-zinc-950/60 px-4 py-14 text-center backdrop-blur-sm sm:px-6">
        <p className="catchphrase-primary mx-auto mb-2 max-w-lg text-lg sm:text-xl">
          {CATCHPHRASE_PRIMARY}
        </p>
        <p className="catchphrase-secondary mb-4 text-[10px] sm:text-xs">
          {CATCHPHRASE_SECONDARY}
        </p>
        <p className="music-divider mb-4" aria-hidden="true">
          ♪ 937 THE UNDERGROUND ♫
        </p>
        <p className="font-[family-name:var(--font-display)] text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
          &copy; 2026 937 THE UNDERGROUND LLC &mdash; HANDCRAFTED IN DAYTON, OHIO. ALL
          RIGHTS RESERVED.
        </p>
        <p className="mt-3 font-sans text-[10px] tracking-wide text-zinc-600">
          <span className="music-glow">🎧</span> Built in Dayton. Broadcast everywhere.{" "}
          <span className="music-glow">🎸</span>
        </p>
      </footer>
    </div>
  );
}
