"use client";

const HEIGHTS = [0.4, 0.85, 0.55, 1, 0.7, 0.95, 0.5, 0.8, 0.6, 0.9];
const DELAYS = [0, 0.1, 0.05, 0.15, 0.08, 0.12, 0.02, 0.18, 0.06, 0.14];

export default function EqualizerBadge() {
  return (
    <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] rounded-full bg-gradient-to-t from-fuchsia-500 via-violet-400 to-orange-400"
          style={{
            height: `${h * 100}%`,
            animation: `eq-bounce ${0.35 + (i % 4) * 0.1}s ease-in-out infinite`,
            animationDelay: `${DELAYS[i]}s`,
          }}
        />
      ))}
    </div>
  );
}
