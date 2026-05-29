/** Max submission size for /api/upload and the dropzone (single file per transmit). */
export const MAX_UPLOAD_BYTES = 500 * 1024 * 1024;

export const MAX_UPLOAD_LABEL = "500MB";

/** Files larger than this use S3 multipart + concurrent chunk uploads. */
export const MULTIPART_THRESHOLD_BYTES = 20 * 1024 * 1024;

export const MULTIPART_CHUNK_BYTES = 20 * 1024 * 1024;

export const MULTIPART_CONCURRENCY = 4;

/** Shown in UI and API docs — one archive/bounce per request. */
export const MAX_UPLOAD_WARNING =
  "Only one file per submission — max 500MB at a time. Compress multi-track masters into .zip or .rar when needed.";
