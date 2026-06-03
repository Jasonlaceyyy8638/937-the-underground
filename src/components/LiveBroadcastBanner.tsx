"use client";

import { Pause, Play } from "lucide-react";
import { useRadioPlayer } from "@/components/RadioPlayerProvider";
import EqualizerBadge from "@/components/visuals/EqualizerBadge";

type LiveBroadcastBannerProps = {
  /** Sticky top stack variant — compact spacing, reserved height for now playing */
  variant?: "hero" | "sticky";
};

export default function LiveBroadcastBanner({
  variant = "hero",
}: LiveBroadcastBannerProps) {
  const { isPlaying, isLoading, isReady, error, nowPlaying, togglePlay } =
    useRadioPlayer();

  const isSticky = variant === "sticky";
  const showNowPlaying = isPlaying && nowPlaying;

  return (
    <div
      className={
        isSticky
          ? `broadcast-strip mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-1.5 px-1 sm:gap-2 ${
              showNowPlaying ? "broadcast-strip--with-now-playing" : ""
            }`
          : "mb-6 flex flex-col items-center gap-2 sm:mb-8"
      }
    >
      <button
        type="button"
        onClick={togglePlay}
        disabled={!isReady}
        aria-pressed={isPlaying}
        aria-label={
          isPlaying
            ? "Pause 937 The Underground live stream"
            : "Play 937 The Underground live stream"
        }
        className={`group inline-flex max-w-full cursor-pointer flex-wrap items-center justify-center gap-2 rounded-full border px-3 py-2 shadow-[0_0_30px_rgba(236,72,153,0.25)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:gap-3 sm:px-5 ${
          isPlaying
            ? "border-pink-400/70 bg-pink-950/50 shadow-[0_0_40px_rgba(236,72,153,0.45)] ring-2 ring-pink-500/40"
            : "border-fuchsia-500/40 bg-fuchsia-950/40 hover:border-fuchsia-400/60 hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span
            className={`absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75 ${
              isPlaying ? "animate-ping" : "animate-pulse"
            }`}
          />
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              isPlaying ? "bg-emerald-400" : "bg-pink-500"
            }`}
          />
        </span>

        <span className="music-glow shrink-0 text-sm">📻</span>

        <span className="hidden sm:contents">
          <EqualizerBadge />
        </span>

        <span className="font-[family-name:var(--font-display)] text-[10px] font-black uppercase leading-snug tracking-[0.14em] text-fuchsia-200 sm:text-sm sm:tracking-[0.22em]">
          <span className="sm:hidden">
            {isLoading
              ? "Connecting…"
              : isPlaying
                ? "Live · On Air"
                : "Live · Tap to Listen"}
          </span>
          <span className="hidden sm:inline">
            {isLoading
              ? "Connecting to the 937…"
              : isPlaying
                ? "Now Broadcasting from the 937"
                : "Now Broadcasting from the 937 — Tap to Listen"}
          </span>
        </span>

        <span className="hidden sm:contents">
          <EqualizerBadge />
        </span>

        <span className="music-glow note-bob-delayed hidden shrink-0 text-sm sm:inline">
          🎧
        </span>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isPlaying
              ? "border-pink-400/50 bg-pink-500/20 text-pink-200"
              : "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 group-hover:bg-fuchsia-500/20"
          }`}
          aria-hidden="true"
        >
          {isLoading ? (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-fuchsia-300 border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-3 w-3 fill-current" />
          ) : (
            <Play className="h-3 w-3 fill-current pl-0.5" />
          )}
        </span>
      </button>

      {showNowPlaying ? (
        <p className="max-w-md truncate text-center text-[10px] font-medium text-zinc-400 sm:text-xs">
          ♫ Now Playing: <span className="text-fuchsia-200">{nowPlaying}</span>
        </p>
      ) : null}

      {error ? (
        <p className="max-w-md text-center text-[10px] font-medium text-pink-300 sm:text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
