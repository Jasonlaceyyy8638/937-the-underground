/** Update href values when official profiles go live. Use "#" until a profile is ready. */
export type SocialLinkId =
  | "tiktok"
  | "instagram"
  | "youtube"
  | "x"
  | "facebook";

export type SocialLink = {
  id: SocialLinkId;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@937theunderground" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/937theunderground" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@937TheUnderground" },
  { id: "x", label: "X (formerly Twitter)", href: "https://x.com/937underground" },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590754640453",
  },
];

export const APP_STORE_LINKS = [
  { id: "apple", label: "Apple App Store", status: "coming-soon" as const },
  { id: "google", label: "Google Play", status: "coming-soon" as const },
] as const;
