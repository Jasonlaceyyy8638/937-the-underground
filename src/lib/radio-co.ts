/** Radio.co station config — matches embed player bf30ab0 */
export const RADIO_CO_PLAYER_ID = "bf30ab0";
export const RADIO_CO_STATION_ID = "s80a395dbb";
export const RADIO_CO_STREAM_SRC = "https://stream.radio.co/s80a395dbb";
/** Direct MP3 endpoint used by HTML5 audio fallback */
export const RADIO_CO_STREAM_URL = `${RADIO_CO_STREAM_SRC}/listen`;
export const RADIO_CO_EMBED_SCRIPT =
  "https://embed.radio.co/player/bf30ab0.js";
export const RADIO_CO_REQUEST_WIDGET_ID = "w03a08b6";
export const RADIO_CO_REQUEST_EMBED_URL =
  "https://embed.radio.co/request/w03a08b6.html";
export const RADIO_CO_REQUEST_SCRIPT =
  "https://embed.radio.co/request/w03a08b6.js";
export const RADIO_CO_REQUEST_WIDTH = 650;
export const RADIO_CO_REQUEST_HEIGHT = 350;
export const RADIO_CO_STATUS_URL = `https://public.radio.co/stations/${RADIO_CO_STATION_ID}/status`;

export type RadioCoStatus = {
  status?: string;
  current_track?: {
    title?: string;
    artwork_url_large?: string;
  };
};

function slugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Radio.co often reports uploaded file names (e.g. king-jb_1780116681178.mp3)
 * instead of a polished song title. Convert those to a readable label, or hide them.
 */
export function formatNowPlayingTitle(
  raw: string | null | undefined,
): string | null {
  if (!raw?.trim()) return null;

  let title = raw.trim().replace(/\s*\(\d+\)\s*$/, "");

  if (/^https?:\/\//i.test(title) || title.includes("radio.co")) {
    return null;
  }

  const slugTimestamp = title.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)_\d+/i);
  if (slugTimestamp) {
    return slugToDisplayName(slugTimestamp[1]);
  }

  if (/\.(mp3|wav|flac|zip|rar)$/i.test(title)) {
    const base = title.replace(/\.[^.]+$/, "");
    const fromFile = base.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)_\d+/i);
    if (fromFile) return slugToDisplayName(fromFile[1]);
    return null;
  }

  if (/^[\d_\-().\s]+$/.test(title) || title.length > 80) {
    return null;
  }

  return title;
}
