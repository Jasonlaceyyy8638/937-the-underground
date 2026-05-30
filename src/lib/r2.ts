import { S3Client } from "@aws-sdk/client-s3";
import {
  ALLOWED_FORMATS_LABEL,
  extensionFromFileName,
} from "@/lib/allowed-upload-types";

export type R2Config = {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
};

let cachedClient: S3Client | null = null;
let cachedConfigKey: string | null = null;

/** Validates and normalizes R2 env vars — throws with explicit missing keys. */
export function getR2Config(): R2Config {
  const missing: string[] = [];

  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim() ?? "";
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim() ?? "";
  let endpoint = process.env.R2_ENDPOINT?.trim() ?? "";
  const bucket =
    process.env.R2_BUCKET_NAME?.trim() || "937-the-underground";

  if (!accessKeyId) missing.push("R2_ACCESS_KEY_ID");
  if (!secretAccessKey) missing.push("R2_SECRET_ACCESS_KEY");
  if (!endpoint) missing.push("R2_ENDPOINT");

  if (missing.length > 0) {
    throw new Error(
      `Missing R2 environment variable(s): ${missing.join(", ")}. Add them in .env.local (dev) or your Netlify site settings (production).`,
    );
  }

  if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
    endpoint = `https://${endpoint}`;
  }
  endpoint = endpoint.replace(/\/$/, "");

  return {
    accessKeyId,
    secretAccessKey,
    endpoint,
    bucket,
  };
}

export function createR2Client(config: R2Config): S3Client {
  const configKey = `${config.endpoint}:${config.accessKeyId.slice(0, 4)}`;

  if (cachedClient && cachedConfigKey === configKey) {
    return cachedClient;
  }

  cachedClient = new S3Client({
    region: "auto",
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    /** Recommended for Cloudflare R2 S3-compatible API */
    forcePathStyle: true,
  });
  cachedConfigKey = configKey;

  return cachedClient;
}

export function getR2Client(): S3Client {
  return createR2Client(getR2Config());
}

export function slugifyArtistName(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "artist";
}

/**
 * R2 object key: `{artist-slug}/{artist-slug}_{timestamp}{ext}`
 * The artist slug comes from the "Artist / band name" form field.
 * With "View prefixes as folders" enabled, each artist appears as its own folder.
 */
export function buildStorageKey(artistName: string, clientFilename: string): string {
  const ext = extensionFromFileName(clientFilename);
  if (!ext) {
    throw new Error(`Only ${ALLOWED_FORMATS_LABEL} files are allowed.`);
  }

  const slug = slugifyArtistName(artistName);
  return `${slug}/${slug}_${Date.now()}${ext}`;
}

export function artistFolderFromKey(key: string): string {
  return key.split("/")[0] ?? "artist";
}

export const R2_PUBLIC_BASE =
  process.env.R2_PUBLIC_BASE_URL?.trim() ||
  "https://pub-28f5fc81680246f78ddf847ba4484170.r2.dev";

export function buildR2PublicUrl(key: string): string {
  const encodedKey = key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${R2_PUBLIC_BASE.replace(/\/$/, "")}/${encodedKey}`;
}
