"use client";

/** Five-bar upload visualizer — varied timing simulates live transfer. */
const BARS = [
  { delay: 0, duration: 0.42, peak: 1 },
  { delay: 0.11, duration: 0.58, peak: 0.72 },
  { delay: 0.05, duration: 0.48, peak: 0.95 },
  { delay: 0.18, duration: 0.65, peak: 0.55 },
  { delay: 0.08, duration: 0.52, peak: 0.88 },
] as const;

export default function UploadEqualizer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-5 w-7 items-end justify-center gap-[3px] ${className}`}
      aria-hidden="true"
    >
      {BARS.map((bar, i) => (
        <span
          key={i}
          className="upload-eq-bar w-1 rounded-full bg-gradient-to-t from-fuchsia-500 via-pink-500 to-cyan-400"
          style={{
            ["--eq-peak" as string]: String(bar.peak),
            animation: `upload-eq-bounce ${bar.duration}s ease-in-out infinite`,
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
