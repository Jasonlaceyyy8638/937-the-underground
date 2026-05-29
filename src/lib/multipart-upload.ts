import { MULTIPART_CHUNK_BYTES } from "@/lib/upload-limits";

export type PartPresign = {
  partNumber: number;
  url: string;
};

export type CompletedPart = {
  PartNumber: number;
  ETag: string;
};

export function getPartCount(fileSize: number, chunkSize = MULTIPART_CHUNK_BYTES): number {
  return Math.ceil(fileSize / chunkSize);
}

/** Upload file slices to presigned part URLs with a fixed concurrency pool. */
export async function uploadPartsConcurrently(
  file: File,
  partUrls: PartPresign[],
  chunkSize: number,
  concurrency: number,
  onProgress?: (percent: number) => void,
): Promise<CompletedPart[]> {
  const completed: CompletedPart[] = [];
  const totalParts = partUrls.length;
  let finished = 0;
  let nextIndex = 0;

  async function uploadOne(part: PartPresign): Promise<void> {
    const start = (part.partNumber - 1) * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const blob = file.slice(start, end);

    const response = await fetch(part.url, {
      method: "PUT",
      body: blob,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Part ${part.partNumber} failed (${response.status}): ${errorText}`,
      );
    }

    const etag = response.headers.get("ETag");
    if (!etag) {
      throw new Error(`Part ${part.partNumber} did not return an ETag header.`);
    }

    completed.push({ PartNumber: part.partNumber, ETag: etag });
    finished += 1;
    onProgress?.(Math.round((finished / totalParts) * 100));
  }

  async function worker(): Promise<void> {
    while (nextIndex < partUrls.length) {
      const current = partUrls[nextIndex];
      nextIndex += 1;
      await uploadOne(current);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, partUrls.length) },
    () => worker(),
  );
  await Promise.all(workers);

  return completed.sort((a, b) => a.PartNumber - b.PartNumber);
}
