import { APP_STORE_LINKS } from "@/lib/social-links";

function AppleStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
      />
      <path
        fill="#FBBC04"
        d="M47 59.4v392.6c0 23.7 25.7 38.5 46.1 27.2l243.7-139.7-243.7-280z"
      />
      <path
        fill="#4285F4"
        d="M385.4 295.4L325.3 235.5 104.6 504.9c19.2 11.1 42.9 1.2 53.5-16.5l227.3-193z"
      />
      <path
        fill="#34A853"
        d="M104.6 13l220.7 221.3 60.1-60.1L158.1 13C137.7 1.8 114 16.5 104.6 13z"
      />
    </svg>
  );
}

const STORE_COPY = {
  apple: { kicker: "Download on the", name: "App Store" },
  google: { kicker: "Get it on", name: "Google Play" },
} as const;

export default function AppStoreBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {APP_STORE_LINKS.map(({ id, label }) => {
        const copy = STORE_COPY[id];

        return (
          <div
            key={id}
            aria-label={`${label} — coming soon`}
            className="group relative flex min-w-[9.5rem] cursor-not-allowed items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-3.5 py-2.5 opacity-75 sm:min-w-[10.5rem] sm:px-4 sm:py-3"
          >
            {id === "apple" ? (
              <AppleStoreIcon className="h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8" />
            ) : (
              <GooglePlayIcon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
            )}
            <div className="min-w-0 text-left leading-tight">
              <p className="font-sans text-[9px] font-medium uppercase tracking-wide text-zinc-400 sm:text-[10px]">
                {copy.kicker}
              </p>
              <p className="font-[family-name:var(--font-display)] text-sm font-black text-white sm:text-base">
                {copy.name}
              </p>
            </div>
            <span className="absolute -right-1.5 -top-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-950/90 px-2 py-0.5 font-sans text-[8px] font-black uppercase tracking-wider text-fuchsia-200 shadow-[0_0_16px_rgba(236,72,153,0.35)] sm:text-[9px]">
              Coming Soon
            </span>
          </div>
        );
      })}
    </div>
  );
}
