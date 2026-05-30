import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import type { CompletedPart } from "@/lib/multipart-upload";
import { buildR2PublicUrl, createR2Client, getR2Config } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

type CompleteBody = {
  uploadId?: string;
  key?: string;
  parts?: CompletedPart[];
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: JSON_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    let body: CompleteBody;

    try {
      body = (await request.json()) as CompleteBody;
    } catch {
      return jsonError("Request body must be valid JSON.", 400);
    }

    const uploadId = String(body.uploadId ?? "").trim();
    const key = String(body.key ?? "").trim();
    const parts = body.parts;

    if (!uploadId) {
      return jsonError("uploadId is required.", 400);
    }

    if (!key) {
      return jsonError("key is required.", 400);
    }

    if (!Array.isArray(parts) || parts.length === 0) {
      return jsonError("parts array is required.", 400);
    }

    const normalizedParts = parts
      .map((part) => ({
        PartNumber: Number(part.PartNumber),
        ETag: String(part.ETag ?? "").trim(),
      }))
      .filter((part) => part.PartNumber > 0 && part.ETag.length > 0)
      .sort((a, b) => a.PartNumber - b.PartNumber);

    if (normalizedParts.length !== parts.length) {
      return jsonError("Each part must include a valid PartNumber and ETag.", 400);
    }

    let r2Config;
    try {
      r2Config = getR2Config();
    } catch (configError) {
      const message =
        configError instanceof Error
          ? configError.message
          : "R2 environment variables are not configured.";
      return jsonError(message, 500);
    }

    const s3 = createR2Client(r2Config);

    try {
      await s3.send(
        new CompleteMultipartUploadCommand({
          Bucket: r2Config.bucket,
          Key: key,
          UploadId: uploadId,
          MultipartUpload: { Parts: normalizedParts },
        }),
      );
    } catch (completeError) {
      const message =
        completeError instanceof Error
          ? completeError.message
          : "Failed to complete multipart upload.";
      console.error("[upload/complete]", completeError);
      return jsonError(message, 500);
    }

    const publicUrl = buildR2PublicUrl(key);

    return NextResponse.json(
      { ok: true, publicUrl },
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error completing upload.";
    console.error("[upload/complete] unhandled:", error);
    return jsonError(message, 500);
  }
}
