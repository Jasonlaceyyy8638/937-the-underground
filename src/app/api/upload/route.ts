import {
  CreateMultipartUploadCommand,
  PutObjectCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_FORMATS_LABEL,
  extensionFromFileName,
} from "@/lib/allowed-upload-types";
import { getPartCount } from "@/lib/multipart-upload";
import { createR2Client, getR2Config, slugifyArtistName } from "@/lib/r2";
import {
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_LABEL,
  MAX_UPLOAD_WARNING,
  MULTIPART_CHUNK_BYTES,
  MULTIPART_THRESHOLD_BYTES,
} from "@/lib/upload-limits";

const R2_PUBLIC_ORIGIN =
  "https://pub-28f5fc81680246f78ddf847ba4484170.r2.dev";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRESIGN_EXPIRES_SECONDS = 3600;
const JSON_HEADERS = { "Content-Type": "application/json" } as const;

type PresignBody = {
  filename?: string;
  fileType?: string;
  artistName?: string;
  fileSize?: number;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: JSON_HEADERS });
}

function sanitizeClientFilename(filename: string): string {
  const base = filename.split(/[/\\]/).pop() ?? filename;
  return base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

function buildStorageKey(artistName: string, clientFilename: string): string {
  const ext = extensionFromFileName(clientFilename);
  if (!ext) {
    throw new Error(`Only ${ALLOWED_FORMATS_LABEL} files are allowed.`);
  }
  const slug = slugifyArtistName(artistName);
  return `${slug}_${Date.now()}${ext}`;
}

function buildPublicUrl(key: string): string {
  return `${R2_PUBLIC_ORIGIN}/${key}`;
}

type PresignValidationError = { error: string; status: number };
type PresignValidationOk = {
  artistName: string;
  clientFilename: string;
  fileType: string;
  fileSize: number;
  key: string;
};

function validatePresignBody(
  body: PresignBody,
): PresignValidationError | PresignValidationOk {
  const artistName = String(body.artistName ?? "").trim();
  const clientFilename = sanitizeClientFilename(String(body.filename ?? ""));
  const fileType = String(body.fileType ?? "").trim();
  const fileSize = Number(body.fileSize);

  if (!artistName) {
    return { error: "artistName is required for file naming.", status: 400 };
  }
  if (!clientFilename) {
    return { error: "filename is required.", status: 400 };
  }
  if (!fileType) {
    return { error: "fileType is required.", status: 400 };
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0) {
    return { error: "fileSize must be a positive number.", status: 400 };
  }
  if (fileSize > MAX_UPLOAD_BYTES) {
    return {
      error: `File exceeds the ${MAX_UPLOAD_LABEL} limit. ${MAX_UPLOAD_WARNING}`,
      status: 413,
    };
  }
  if (!extensionFromFileName(clientFilename)) {
    return {
      error: `Only ${ALLOWED_FORMATS_LABEL} files are allowed.`,
      status: 400,
    };
  }

  return {
    artistName,
    clientFilename,
    fileType,
    fileSize,
    key: buildStorageKey(artistName, clientFilename),
  };
}

function isPresignError(
  result: PresignValidationError | PresignValidationOk,
): result is PresignValidationError {
  return "error" in result;
}

export async function GET() {
  try {
    const config = getR2Config();
    createR2Client(config);
    return NextResponse.json(
      {
        ok: true,
        bucket: config.bucket,
        endpoint: config.endpoint,
        multipartThresholdBytes: MULTIPART_THRESHOLD_BYTES,
        chunkBytes: MULTIPART_CHUNK_BYTES,
        message: "R2 client initialized successfully.",
      },
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "R2 configuration error.";
    return jsonError(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: PresignBody;

    try {
      body = (await request.json()) as PresignBody;
    } catch {
      return jsonError("Request body must be valid JSON.", 400);
    }

    const validated = validatePresignBody(body);
    if (isPresignError(validated)) {
      return jsonError(validated.error, validated.status);
    }

    const { fileType, fileSize, key } = validated;

    let r2Config;
    try {
      r2Config = getR2Config();
    } catch (configError) {
      const message =
        configError instanceof Error
          ? configError.message
          : "R2 environment variables are not configured.";
      console.error("[upload/presign] R2 config:", message);
      return jsonError(message, 500);
    }

    const s3 = createR2Client(r2Config);
    const publicUrl = buildPublicUrl(key);

    if (fileSize <= MULTIPART_THRESHOLD_BYTES) {
      try {
        const uploadUrl = await getSignedUrl(
          s3,
          new PutObjectCommand({
            Bucket: r2Config.bucket,
            Key: key,
            ContentType: fileType,
          }),
          { expiresIn: PRESIGN_EXPIRES_SECONDS },
        );

        return NextResponse.json(
          {
            mode: "single",
            uploadUrl,
            publicUrl,
          },
          { headers: JSON_HEADERS },
        );
      } catch (signError) {
        const message =
          signError instanceof Error
            ? signError.message
            : "Failed to generate presigned upload URL.";
        console.error("[upload/presign] single getSignedUrl:", signError);
        return jsonError(message, 500);
      }
    }

    const partCount = getPartCount(fileSize, MULTIPART_CHUNK_BYTES);

    try {
      const createResult = await s3.send(
        new CreateMultipartUploadCommand({
          Bucket: r2Config.bucket,
          Key: key,
          ContentType: fileType,
        }),
      );

      const uploadId = createResult.UploadId;
      if (!uploadId) {
        return jsonError("Failed to start multipart upload.", 500);
      }

      const partUrls = await Promise.all(
        Array.from({ length: partCount }, async (_, index) => {
          const partNumber = index + 1;
          const url = await getSignedUrl(
            s3,
            new UploadPartCommand({
              Bucket: r2Config.bucket,
              Key: key,
              UploadId: uploadId,
              PartNumber: partNumber,
            }),
            { expiresIn: PRESIGN_EXPIRES_SECONDS },
          );
          return { partNumber, url };
        }),
      );

      return NextResponse.json(
        {
          mode: "multipart",
          uploadId,
          key,
          partUrls,
          publicUrl,
          partCount,
          chunkSize: MULTIPART_CHUNK_BYTES,
        },
        { headers: JSON_HEADERS },
      );
    } catch (multipartError) {
      const message =
        multipartError instanceof Error
          ? multipartError.message
          : "Failed to prepare multipart upload.";
      console.error("[upload/presign] multipart:", multipartError);
      return jsonError(message, 500);
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error preparing upload.";
    console.error("[upload/presign] unhandled:", error);
    return jsonError(message, 500);
  }
}
