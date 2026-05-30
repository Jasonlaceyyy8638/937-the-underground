"use client";

export default function VinylWatermark({ color }: { color: string }) {
  return (
    <div
      className={`vinyl-reveal pointer-events-none absolute -right-4 top-1/2 h-28 w-28 -translate-y-1/2 opacity-0 sm:-right-8 sm:h-36 sm:w-36 md:h-44 md:w-44 ${color}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_30px_currentColor]">
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
        {[0, 45, 90, 135].map((rot) => (
          <line
            key={rot}
            x1="50"
            y1="50"
            x2="50"
            y2="8"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
            transform={`rotate(${rot} 50 50)`}
          />
        ))}
      </svg>
    </div>
  );
}
