"use client";

import Image from "next/image";
import {
  ChevronRight,
  Guitar,
  Headphones,
  Mic2,
  Music,
  Radio,
  Waves,
} from "lucide-react";
import AppStoreBadges from "@/components/AppStoreBadges";
import LiveBroadcastBanner from "@/components/LiveBroadcastBanner";
import RadioCoRequestFab from "@/components/RadioCoRequestFab";
import SocialLinks from "@/components/SocialLinks";
import TransmitTrackForm from "@/components/TransmitTrackForm";
import {
  CATCHPHRASE_PRIMARY,
  CATCHPHRASE_SECONDARY,
} from "@/lib/brand";
import FloatingElements from "@/components/visuals/FloatingElements";
import HeroWaveform from "@/components/visuals/HeroWaveform";
import MarqueeStrip from "@/components/visuals/MarqueeStrip";
import VinylWatermark from "@/components/visuals/VinylWatermark";

const BODY_COPY =
  "font-[family-name:var(--font-body)] font-medium leading-relaxed text-zinc-300";

const SECTION_SUBHEAD =
  "section-subhead font-sans text-xs font-black uppercase tracking-[0.25em] text-zinc-300 sm:text-sm";

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
    <div className="relative mb-10 text-center sm:mb-16">
      <p className="section-kicker mb-3">
        <span className="music-glow">{icon}</span> {kicker}
      </p>
      <h2 className="neon-heading font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-[0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="hero-gradient-text">{title}</span>
      </h2>
      <p className="music-divider mt-4 sm:mt-5" aria-hidden="true">
        ♪ ♫ ♪
      </p>
      <p className={`mt-3 px-1 sm:mt-4 sm:px-0 ${SECTION_SUBHEAD}`}>{sub}</p>
    </div>
  );
}

export default function UndergroundLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black pb-20 text-zinc-100 sm:pb-0">
      {/* Ambient layers */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_85%)]" />
      </div>

      <header className="fixed top-0 z-50 w-full safe-x">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 border-b border-fuchsia-500/20 bg-black/85 px-3 py-2.5 backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
          <a href="#" className="group flex min-w-0 shrink items-center">
            <Image
              src="/logo.svg"
              alt="937 The Underground"
              width={360}
              height={72}
              priority
              className="hidden h-8 w-auto sm:block sm:h-9"
            />
            <Image
              src="/logo-icon.svg"
              alt="937 The Underground"
              width={512}
              height={512}
              priority
              className="h-9 w-9 rounded-lg sm:hidden"
            />
          </a>

          <div className="flex shrink-0 items-center gap-1 sm:gap-4">
            <SocialLinks variant="nav" />

            <a
              href="#submit"
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-fuchsia-500/50 bg-fuchsia-600/20 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-fuchsia-200 shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-all duration-300 active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm sm:hover:scale-105 sm:hover:bg-fuchsia-600/40"
            >
              <span className="music-glow">🎵</span> Submit
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <HeroWaveform />
          <div className="hidden sm:block">
            <FloatingElements />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
            <LiveBroadcastBanner />

            <p className="catchphrase-secondary mb-4 px-1 text-[9px] sm:mb-5 sm:px-0 sm:text-xs">
              <span className="music-glow">♫</span> {CATCHPHRASE_SECONDARY}{" "}
              <span className="music-glow">♫</span>
            </p>

            <div className="relative mb-5 sm:mb-6">
              <div
                className="pointer-events-none absolute inset-0 -z-10 scale-[1.4] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.35)_0%,rgba(168,85,247,0.15)_40%,transparent_65%)] sm:scale-[2]"
                aria-hidden="true"
              />
              <h1 className="neon-heading font-[family-name:var(--font-display)] text-[2.1rem] font-black leading-[0.98] tracking-tight min-[380px]:text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]">
                <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Dayton&apos;s New Home
                </span>
                <span className="hero-gradient-text mt-1 block">
                  For Independent Music.
                </span>
              </h1>
              <p className="catchphrase-primary mx-auto mt-4 max-w-2xl px-2 sm:mt-5 sm:px-0">
                {CATCHPHRASE_PRIMARY}
              </p>
            </div>

            <p className={`mx-auto mb-10 max-w-2xl px-1 text-sm leading-relaxed sm:mb-12 sm:px-0 sm:text-lg md:text-xl ${BODY_COPY}`}>
              <span className="music-glow">🎚️</span>{" "}
              <span className="font-semibold text-zinc-100">No corporate play blocks.</span> 100%
              raw, unsigned, local Rock, Country, and Hip-Hop — streamed from the underground.{" "}
              <span className="music-glow">🔊</span>
            </p>

            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href="#submit"
                className="btn-voltage touch-target group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-white sm:max-w-sm sm:gap-3 sm:px-10 sm:py-5 sm:text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shimmer" />
                <Music className="relative h-5 w-5 shrink-0" />
                <span className="relative">Artists: Drop Your Tracks</span>
                <ChevronRight className="relative hidden h-5 w-5 sm:block" />
              </a>

              <a
                href="#vibe"
                className="touch-target group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-zinc-700/80 bg-zinc-950/60 px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-zinc-100 backdrop-blur-md transition-all duration-300 active:scale-[0.98] sm:max-w-sm sm:gap-3 sm:px-10 sm:py-5 sm:text-base sm:hover:scale-[1.04] sm:hover:border-fuchsia-500/50"
              >
                <Headphones className="h-5 w-5 shrink-0 text-fuchsia-400" />
                Listeners: Join the Hype
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10 sm:flex">
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

        <section id="vibe" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-28 lg:px-8">
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
            sub={`${CATCHPHRASE_SECONDARY} — four lanes, one frequency.`}
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
                    className={`group/card relative min-h-[200px] overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-4 backdrop-blur-xl transition-all duration-500 ease-out sm:min-h-[220px] sm:p-6 sm:hover:-translate-y-1 sm:hover:scale-[1.03] ${block.borderHover} ${block.ringHover} ${
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
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl md:text-3xl">
                        {block.title}
                      </h3>
                      <p className={`mt-2 max-w-md text-sm sm:mt-3 sm:text-base ${BODY_COPY}`}>
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

        <section id="submit" className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-28 lg:px-8">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <SectionHeading
            kicker="Go Live"
            icon="💿"
            title="Transmit Your Track"
            sub="Drop your track — we'll spin it from the console."
          />

          <TransmitTrackForm />
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-800/80 bg-zinc-950/60 px-4 py-10 text-center backdrop-blur-sm safe-bottom sm:px-6 sm:py-14">
        <p className="catchphrase-primary mx-auto mb-2 max-w-lg text-base sm:text-lg md:text-xl">
          {CATCHPHRASE_PRIMARY}
        </p>
        <p className="catchphrase-secondary mb-3 text-[9px] sm:mb-4 sm:text-xs">
          {CATCHPHRASE_SECONDARY}
        </p>

        <div className="mb-6 space-y-5">
          <div>
            <p className="section-kicker mb-3">Follow the Signal</p>
            <SocialLinks variant="footer" />
          </div>
          <div>
            <p className="section-kicker mb-3">Mobile Apps</p>
            <AppStoreBadges />
          </div>
        </div>

        <p className="music-divider mb-4" aria-hidden="true">
          ♪ 937 THE UNDERGROUND ♫
        </p>
        <p className="font-[family-name:var(--font-display)] text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
          &copy; 2026 937 THE UNDERGROUND &mdash; HANDCRAFTED IN DAYTON, OHIO. ALL
          RIGHTS RESERVED.
        </p>
        <nav
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500"
          aria-label="Legal"
        >
          <a href="/terms" className="transition-colors hover:text-fuchsia-300">
            Terms of Service
          </a>
          <span aria-hidden="true">·</span>
          <a href="/privacy" className="transition-colors hover:text-fuchsia-300">
            Privacy Policy
          </a>
        </nav>
        <p className="mt-3 font-sans text-[10px] tracking-wide text-zinc-600">
          <span className="music-glow">🎧</span> Built in Dayton. Broadcast everywhere.{" "}
          <span className="music-glow">🎸</span>
        </p>
      </footer>

      <RadioCoRequestFab />

      {/* Mobile sticky submit bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-fuchsia-500/20 bg-black/90 px-4 py-3 backdrop-blur-xl safe-bottom safe-x sm:hidden">
        <a
          href="#submit"
          className="btn-voltage touch-target flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black uppercase tracking-widest text-white"
        >
          <Music className="h-4 w-4" />
          Drop Your Tracks
        </a>
      </div>
    </div>
  );
}
