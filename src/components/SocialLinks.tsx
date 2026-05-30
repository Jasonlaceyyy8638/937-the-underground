import type { ComponentType } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { SOCIAL_LINKS, type SocialLinkId } from "@/lib/social-links";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const ICONS: Record<
  SocialLinkId,
  ComponentType<{ className?: string }>
> = {
  tiktok: TikTokIcon,
  instagram: Instagram,
  youtube: Youtube,
  x: XIcon,
  facebook: Facebook,
};

const SIZE_CLASSES = {
  nav: {
    list: "flex items-center gap-0.5 sm:gap-2",
    link: "touch-target flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-300 active:scale-95 sm:h-10 sm:w-10 sm:hover:scale-110 sm:hover:border-fuchsia-500/60 sm:hover:text-fuchsia-300 sm:hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
    icon: "h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]",
  },
  footer: {
    list: "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
    link: "touch-target flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/50 text-zinc-400 transition-all duration-300 active:scale-95 sm:h-12 sm:w-12 sm:hover:scale-110 sm:hover:border-fuchsia-500/60 sm:hover:text-fuchsia-300 sm:hover:shadow-[0_0_24px_rgba(236,72,153,0.45)]",
    icon: "h-[18px] w-[18px] sm:h-5 sm:w-5",
  },
} as const;

export default function SocialLinks({
  variant = "footer",
}: {
  variant?: keyof typeof SIZE_CLASSES;
}) {
  const styles = SIZE_CLASSES[variant];

  return (
    <ul className={styles.list}>
      {SOCIAL_LINKS.map(({ id, label, href }) => {
        const Icon = ICONS[id];
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              className={styles.link}
              {...(href === "#"
                ? { "aria-disabled": true, onClick: (e) => e.preventDefault() }
                : {})}
            >
              <Icon className={styles.icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
