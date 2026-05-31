/** Update href values when official profiles go live. */
export const SOCIAL_LINKS = [
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@937theunderground" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/937theunderground" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@937TheUnderground" },
  { id: "x", label: "X (formerly Twitter)", href: "https://x.com/937underground" },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590754640453",
  },
] as const;

export type SocialLinkId = (typeof SOCIAL_LINKS)[number]["id"];

export const APP_STORE_LINKS = [
  { id: "apple", label: "Apple App Store", status: "coming-soon" as const },
  { id: "google", label: "Google Play", status: "coming-soon" as const },
] as const;
