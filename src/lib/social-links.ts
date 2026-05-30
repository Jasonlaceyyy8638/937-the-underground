/** Update href values when official profiles go live. */
export const SOCIAL_LINKS = [
  { id: "tiktok", label: "TikTok", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "x", label: "X (formerly Twitter)", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
] as const;

export type SocialLinkId = (typeof SOCIAL_LINKS)[number]["id"];

export const APP_STORE_LINKS = [
  { id: "apple", label: "Apple App Store", status: "coming-soon" as const },
  { id: "google", label: "Google Play", status: "coming-soon" as const },
] as const;
