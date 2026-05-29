"use client";

import { useEffect, useMemo, useState } from "react";

const BARS = 48;

function buildBarData() {
  return Array.from({ length: BARS }, (_, i) => {
    const x = 20 + (i / BARS) * 1160;
    const h = Math.round(40 + (Math.sin(i * 0.8) * 0.5 + 0.5) * 120);
    return {
      x,
      h,
      y: 400 - h,
      delay: (i * 0.07) % 2.5,
      duration: 0.4 + (i % 5) * 0.12,
    };
  });
}

function WaveformSvg({ bars }: { bars: ReturnType<typeof buildBarData> | null }) {
  return (
    <svg
      className="h-full w-full max-w-6xl translate-y-8"
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff2d95" stopOpacity="0.6" />
          <stop offset="35%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="wave-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M0,220 Q150,180 300,200 T600,190 T900,210 T1200,185 L1200,400 L0,400 Z"
        fill="url(#wave-grad)"
        opacity="0.15"
        className="animate-wave"
      />
      <path
        d="M0,250 Q200,200 400,230 T800,215 T1200,240"
        fill="none"
        stroke="url(#wave-grad)"
        strokeWidth="2"
        filter="url(#wave-glow)"
        opacity="0.5"
      />

      {bars?.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width={8}
          height={bar.h}
          rx={2}
          fill="url(#wave-grad)"
          className="eq-bar"
          style={{
            animation: `eq-bounce ${bar.duration}s ease-in-out infinite`,
            animationDelay: `${bar.delay}s`,
            transformOrigin: `${bar.x + 4}px 400px`,
          }}
        />
      ))}
    </svg>
  );
}

export default function HeroWaveform() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bars = useMemo(() => (mounted ? buildBarData() : null), [mounted]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden opacity-40"
      aria-hidden="true"
    >
      <WaveformSvg bars={bars} />
    </div>
  );
}
