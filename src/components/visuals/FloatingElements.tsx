"use client";

import { Disc3, Guitar, Headphones, Music2, Radio, Zap } from "lucide-react";

const FLOATERS = [
  { Icon: Disc3, className: "top-[12%] left-[4%] h-28 w-28 text-fuchsia-500/20 blur-[1px] animate-float", size: 112 },
  { Icon: Guitar, className: "top-[22%] right-[6%] h-24 w-24 text-orange-500/15 blur-sm animate-float-delayed", size: 96 },
  { Icon: Music2, className: "top-[45%] left-[8%] h-16 w-16 text-violet-400/25 animate-float-slow", size: 64 },
  { Icon: Headphones, className: "top-[55%] right-[10%] h-20 w-20 text-pink-500/20 blur-[2px] animate-float", size: 80 },
  { Icon: Radio, className: "bottom-[30%] left-[12%] h-14 w-14 text-emerald-400/15 animate-float-delayed", size: 56 },
  { Icon: Zap, className: "bottom-[25%] right-[5%] h-32 w-32 text-violet-500/10 blur-md animate-float-slow", size: 128 },
  { Icon: Disc3, className: "top-[68%] left-[45%] h-40 w-40 text-orange-400/8 blur-xl animate-spin-slow", size: 160 },
] as const;

function VinylSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" opacity="0.3" />
    </svg>
  );
}

export default function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLOATERS.map(({ Icon, className }, i) => (
        <div key={i} className={`absolute ${className}`}>
          <Icon className="h-full w-full" strokeWidth={1} />
        </div>
      ))}

      {/* Giant background vinyl */}
      <div className="absolute -right-20 top-1/4 h-72 w-72 text-white/[0.03] animate-spin-slow sm:h-96 sm:w-96">
        <VinylSvg className="h-full w-full" />
      </div>
      <div className="absolute -left-16 bottom-1/3 h-56 w-56 text-fuchsia-500/[0.04] animate-float-slow">
        <VinylSvg className="h-full w-full" />
      </div>

      {/* Audio jack silhouette */}
      <svg
        className="absolute bottom-[40%] right-[18%] h-24 w-24 text-violet-500/10 blur-sm animate-float-delayed"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <rect x="28" y="8" width="8" height="20" rx="2" />
        <circle cx="32" cy="36" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 52 L32 44 L44 52" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
