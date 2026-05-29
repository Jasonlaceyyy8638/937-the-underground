import { MAX_UPLOAD_LABEL, MAX_UPLOAD_WARNING } from "@/lib/upload-limits";

/** Re-export for form copy tied to allowed formats. */
export { MAX_UPLOAD_LABEL, MAX_UPLOAD_WARNING };

/** Accepted submission formats: singles + multi-track archives. */
export const ALLOWED_EXTENSIONS = [".mp3", ".wav", ".zip", ".rar"] as const;

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];

export const ACCEPT_FILE_INPUT =
  "audio/mpeg,audio/wav,audio/x-wav,.mp3,.wav,.zip,application/zip,application/x-zip-compressed,application/vnd.rar,application/x-rar-compressed,.rar";

const EXTENSION_REGEX = /\.(mp3|wav|zip|rar)$/i;

export function isAllowedUploadFile(file: File): boolean {
  if (EXTENSION_REGEX.test(file.name)) return true;

  const { type } = file;
  if (!type) return false;

  if (type === "audio/mpeg" || type === "audio/mp3") return true;
  if (type.includes("wav")) return true;
  if (type.includes("zip")) return true;
  if (type.includes("rar")) return true;

  return false;
}

export function extensionForUpload(file: File): AllowedExtension {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".wav")) return ".wav";
  if (lower.endsWith(".zip")) return ".zip";
  if (lower.endsWith(".rar")) return ".rar";
  if (lower.endsWith(".mp3")) return ".mp3";
  if (file.type.includes("zip")) return ".zip";
  if (file.type.includes("rar")) return ".rar";
  if (file.type.includes("wav")) return ".wav";
  return ".mp3";
}

export function contentTypeForExtension(ext: AllowedExtension): string {
  switch (ext) {
    case ".wav":
      return "audio/wav";
    case ".mp3":
      return "audio/mpeg";
    case ".zip":
      return "application/zip";
    case ".rar":
      return "application/vnd.rar";
    default:
      return "application/octet-stream";
  }
}

export const ALLOWED_FORMATS_LABEL = ".mp3, .wav, .zip, or .rar";

export function extensionFromFileName(fileName: string): AllowedExtension | null {
  const lower = fileName.toLowerCase().trim();
  for (const ext of ALLOWED_EXTENSIONS) {
    if (lower.endsWith(ext)) return ext;
  }
  return null;
}

/** Resolve Content-Type for presigned PUT (must match client header exactly). */
export function resolveContentType(
  fileType: string,
  fileName: string,
): string {
  const ext = extensionFromFileName(fileName);
  if (!ext) return "application/octet-stream";

  const normalized = fileType.trim().toLowerCase();
  if (normalized && normalized !== "application/octet-stream") {
    return fileType.trim();
  }

  return contentTypeForExtension(ext);
}
