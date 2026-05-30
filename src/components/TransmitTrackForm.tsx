"use client";

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Check, Loader2, Music, Send, Upload } from "lucide-react";
import UploadEqualizer from "@/components/visuals/UploadEqualizer";
import {
  ACCEPT_FILE_INPUT,
  ALLOWED_FORMATS_LABEL,
  isAllowedUploadFile,
  MAX_UPLOAD_LABEL,
  MAX_UPLOAD_WARNING,
} from "@/lib/allowed-upload-types";
import { parseJsonResponse } from "@/lib/api-json";
import { uploadPartsConcurrently } from "@/lib/multipart-upload";
import {
  MAX_UPLOAD_BYTES,
  MULTIPART_CHUNK_BYTES,
  MULTIPART_CONCURRENCY,
} from "@/lib/upload-limits";
import { CATCHPHRASE_SECONDARY } from "@/lib/brand";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjrrzrk";
const SUPPORT_EMAIL = "host@937theunderground.com";

const GENRES = [
  "Americana / Country / Roots",
  "Alt-Rock / Metal / Punk",
  "Hip-Hop / Rap / R&B",
  "Other / Multi-Genre",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONSOLE_WRAPPER = "relative";

const CONSOLE_GLOW =
  "pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]";

const CONSOLE_GLOW_ALT =
  "pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-[100px]";

const CONSOLE_CARD =
  "relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-4 shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-8";

const CONSOLE_LABEL =
  "mb-2 block font-sans text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400 sm:text-xs sm:tracking-[0.2em]";

const LABEL_GLOW =
  "music-glow text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]";

const CONSOLE_FIELD =
  "touch-target w-full rounded-xl border border-zinc-800/80 bg-black/60 px-4 py-3.5 font-[family-name:var(--font-body)] text-base text-white placeholder:text-zinc-500 transition-all duration-300 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-sm";

const TRANSMIT_BTN =
  "touch-target group relative flex min-h-[3rem] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-all duration-300 active:scale-[0.98] sm:gap-3 sm:px-8 sm:py-5 sm:text-sm sm:hover:scale-[1.02] sm:hover:shadow-[0_0_50px_rgba(236,72,153,0.55)] disabled:cursor-not-allowed disabled:opacity-60";

function FieldLabel({
  htmlFor,
  icon,
  children,
}: {
  htmlFor?: string;
  icon: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={CONSOLE_LABEL}>
      <span className={LABEL_GLOW}>{icon}</span> {children}
    </label>
  );
}

/** Plain-text URL — no HTML tags (Formspree blocks tagged payloads). */
function cleanTrackUrl(raw: string): string {
  return raw.trim().replace(/\s+/g, "");
}

/** Outlook-friendly angle-bracket URL for auto-linking in desktop clients. */
function outlookBracketUrl(raw: string): string {
  return `<${cleanTrackUrl(raw)}>`;
}

function validateForm(values: {
  artistName: string;
  email: string;
  audioFile: File | null;
  genre: string;
  legalChecked: boolean;
}): string | null {
  if (!values.artistName.trim()) {
    return "Artist / band name is required.";
  }
  if (!values.email.trim() || !EMAIL_REGEX.test(values.email.trim())) {
    return "Enter a valid contact email address.";
  }
  if (!values.audioFile) {
    return `Drop or select a ${ALLOWED_FORMATS_LABEL} file before transmitting.`;
  }
  if (!isAllowedUploadFile(values.audioFile)) {
    return `Only ${ALLOWED_FORMATS_LABEL} files are accepted.`;
  }
  if (values.audioFile.size > MAX_UPLOAD_BYTES) {
    return `File exceeds the ${MAX_UPLOAD_LABEL} limit. Export a smaller bounce and try again.`;
  }
  if (!values.genre) {
    return "Select a primary genre before transmitting.";
  }
  if (!values.legalChecked) {
    return "You must accept the broadcast rights waiver to submit.";
  }
  return null;
}

export default function TransmitTrackForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [legalChecked, setLegalChecked] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<
    "presign" | "r2" | "formspree" | null
  >(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const assignFile = useCallback((file: File | null) => {
    setErrorMessage(null);
    if (!file) {
      setAudioFile(null);
      return;
    }
    if (!isAllowedUploadFile(file)) {
      setErrorMessage(`Only ${ALLOWED_FORMATS_LABEL} files are allowed.`);
      setAudioFile(null);
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setErrorMessage(`File exceeds the ${MAX_UPLOAD_LABEL} limit.`);
      setAudioFile(null);
      return;
    }
    setAudioFile(file);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    assignFile(file);
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSubmitting) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isSubmitting) return;
    const file = e.dataTransfer.files?.[0] ?? null;
    assignFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitted(false);

    const validationError = validateForm({
      artistName,
      email,
      audioFile,
      genre,
      legalChecked,
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const selectedFile = audioFile!;
    const cleanArtistName = artistName.trim();
    const cleanEmail = email.trim();

    setIsSubmitting(true);
    setSubmitPhase("presign");
    setUploadProgress(0);

    try {
      console.log("[937] Step A: Requesting presigned URL from /api/upload…");

      const presignResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: selectedFile.name,
          fileType: selectedFile.type || "application/octet-stream",
          artistName: cleanArtistName,
          fileSize: selectedFile.size,
        }),
      });

      const presignData = await parseJsonResponse<{
        mode?: "single" | "multipart";
        uploadUrl?: string;
        publicUrl?: string;
        uploadId?: string;
        key?: string;
        artistFolder?: string;
        partUrls?: { partNumber: number; url: string }[];
        chunkSize?: number;
        error?: string;
      }>(presignResponse);

      if (!presignResponse.ok || !presignData.publicUrl) {
        throw new Error(
          presignData.error ?? "Could not prepare upload. Please try again.",
        );
      }

      let publicUrl = cleanTrackUrl(presignData.publicUrl);
      const storageKey = presignData.key ?? "";
      const artistFolder = presignData.artistFolder ?? cleanArtistName;

      console.log("[937] Step A complete. mode:", presignData.mode, publicUrl);

      setSubmitPhase("r2");

      if (presignData.mode === "multipart") {
        if (
          !presignData.uploadId ||
          !presignData.key ||
          !presignData.partUrls?.length
        ) {
          throw new Error("Multipart upload was not configured correctly.");
        }

        const chunkSize = presignData.chunkSize ?? MULTIPART_CHUNK_BYTES;

        console.log(
          `[937] Step B: Multipart upload — ${presignData.partUrls.length} parts, ${MULTIPART_CONCURRENCY} concurrent…`,
        );

        const completedParts = await uploadPartsConcurrently(
          selectedFile,
          presignData.partUrls,
          chunkSize,
          MULTIPART_CONCURRENCY,
          setUploadProgress,
        );

        console.log("[937] Step B: All parts uploaded. Completing multipart…");

        const completeResponse = await fetch("/api/upload/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploadId: presignData.uploadId,
            key: presignData.key,
            parts: completedParts,
          }),
        });

        const completeData = await parseJsonResponse<{
          ok?: boolean;
          publicUrl?: string;
          error?: string;
        }>(completeResponse);

        if (!completeResponse.ok || !completeData.ok) {
          throw new Error(
            completeData.error ?? "Failed to finalize multipart upload on R2.",
          );
        }

        if (completeData.publicUrl) {
          publicUrl = cleanTrackUrl(completeData.publicUrl);
        }

        console.log("[937] Step B complete. Multipart assembled:", publicUrl);
      } else {
        if (!presignData.uploadUrl) {
          throw new Error("Single-upload URL was not returned.");
        }

        console.log("[937] Step B: Single PUT to Cloudflare R2…");

        const uploadContentType =
          selectedFile.type || "application/octet-stream";

        const uploadResponse = await fetch(presignData.uploadUrl, {
          method: "PUT",
          body: selectedFile,
          headers: {
            "Content-Type": uploadContentType,
            "Content-Length": selectedFile.size.toString(),
          },
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(
            `Cloudflare R2 upload failed with status ${uploadResponse.status}: ${errorText}`,
          );
        }

        setUploadProgress(100);
        console.log(
          "[937] Step B complete. R2 upload status:",
          uploadResponse.status,
        );
      }

      setSubmitPhase("formspree");

      const bracketUrl = outlookBracketUrl(publicUrl);

      const formspreePayload = {
        artistName: cleanArtistName,
        email: cleanEmail,
        genre,
        "Artist Folder": artistFolder,
        "Storage Path": storageKey,
        "Listen Link": bracketUrl,
        "Track URL": bracketUrl,
        _replyto: cleanEmail,
      };

      console.log("[937] Step C: Sending payload to Formspree…", formspreePayload);

      const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formspreePayload),
      });

      console.log(
        "[937] Step C: Formspree response received.",
        "status:",
        formspreeResponse.status,
        "ok:",
        formspreeResponse.ok,
      );

      if (formspreeResponse.ok) {
        const formspreeBody = await parseJsonResponse<{ ok?: boolean }>(
          formspreeResponse,
        );
        console.log("[937] Step D: Formspree body:", formspreeBody);
        setIsSubmitted(true);
        console.log("[937] Transmission complete — success UI unlocked.");
      } else {
        const rejectText = await formspreeResponse.text();
        console.error("[937] Formspree rejected payload:", rejectText);
        throw new Error("Formspree rejected payload");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown transmission error.";
      console.error("[937] Upload pipeline failed:", err);
      alert(`Transmission Interrupted: ${message}`);
      setErrorMessage(message);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
      setSubmitPhase(null);
      setUploadProgress(0);
    }
  };

  const submitButtonLabel = (() => {
    if (!isSubmitting) return "Transmit Track";
    if (submitPhase === "presign") return "Preparing Upload Slot...";
    if (submitPhase === "r2") {
      return uploadProgress > 0
        ? `Uploading to Cloudflare... ${uploadProgress}%`
        : "Uploading to Cloudflare...";
    }
    if (submitPhase === "formspree") return "Sending to Console...";
    return "Uploading Audio and Frequencies...";
  })();

  if (isSubmitted) {
    return (
      <div className={CONSOLE_WRAPPER}>
        <div className={CONSOLE_GLOW} aria-hidden="true" />
        <div className={CONSOLE_GLOW_ALT} aria-hidden="true" />
        <div
          className={`${CONSOLE_CARD} transmission-success py-14 text-center`}
          role="status"
          aria-live="polite"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"
            aria-hidden="true"
          />
          <div className="transmission-success-check mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-lime-400/50 bg-lime-500/20 text-lime-400 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
            <Check className="h-12 w-12" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase leading-tight tracking-[0.06em] text-white sm:text-4xl">
            <span className="music-glow">🎉</span> Transmission Successful.
          </h3>
          <p className="mx-auto mt-5 max-w-md font-[family-name:var(--font-body)] text-base leading-relaxed text-zinc-300 sm:text-lg">
            Your frequencies have hit the network. Get ready for the console
            rotation.
          </p>
          <div className="mx-auto mt-8 flex items-end justify-center gap-1">
            {[0.35, 0.75, 1, 0.55, 0.9, 0.45, 0.8].map((h, i) => (
              <span
                key={i}
                className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-lime-500 to-emerald-300"
                style={{
                  height: `${h * 32}px`,
                  animation: `eq-bounce ${0.35 + i * 0.07}s ease-in-out infinite`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={CONSOLE_WRAPPER}>
      <div className={CONSOLE_GLOW} aria-hidden="true" />
      <div className={CONSOLE_GLOW_ALT} aria-hidden="true" />

      <form
        onSubmit={handleSubmit}
        className={`${CONSOLE_CARD} space-y-6`}
        noValidate
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"
          aria-hidden="true"
        />

        <div className="mb-2 border-b border-zinc-800/50 pb-4 sm:pb-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="section-kicker !mb-0">
              <span className={LABEL_GLOW}>🎚️</span> Studio Upload Console
            </p>
            <p className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              On Air
            </p>
          </div>
          <p className="catchphrase-secondary mt-2 hidden text-[9px] sm:block sm:text-[10px]">
            {CATCHPHRASE_SECONDARY}
          </p>
        </div>

        <div>
          <FieldLabel htmlFor="artistName" icon="🎵">
            ARTIST / BAND NAME
          </FieldLabel>
          <input
            id="artistName"
            name="artistName"
            type="text"
            value={artistName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setArtistName(e.target.value)
            }
            placeholder="Your stage name"
            disabled={isSubmitting}
            className={CONSOLE_FIELD}
          />
        </div>

        <div>
          <FieldLabel htmlFor="genre" icon="🎧">
            PRIMARY GENRE
          </FieldLabel>
          <select
            id="genre"
            name="genre"
            value={genre}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setGenre(e.target.value)
            }
            disabled={isSubmitting}
            className={`${CONSOLE_FIELD} cursor-pointer appearance-none`}
          >
            <option value="" disabled className="bg-zinc-950 text-zinc-400">
              Select your lane
            </option>
            {GENRES.map((g) => (
              <option key={g} value={g} className="bg-zinc-950 text-white">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="email" icon="✉️">
            CONTACT EMAIL
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="you@yourband.com"
            disabled={isSubmitting}
            className={CONSOLE_FIELD}
          />
        </div>

        <div>
          <span className={CONSOLE_LABEL}>
            <span className={LABEL_GLOW}>💿</span> TRACK / PROJECT UPLOAD
          </span>
          <label
            htmlFor="audioFile"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group/drop relative mt-2 flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all duration-300 sm:min-h-[176px] sm:px-6 sm:py-8 ${
              isDragging
                ? "dropzone-pulse border-pink-500 bg-fuchsia-500/10 shadow-[0_0_40px_rgba(236,72,153,0.35)]"
                : audioFile
                  ? "border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_24px_rgba(16,185,129,0.12)]"
                  : "border-fuchsia-500/40 bg-black/40 shadow-[0_0_28px_rgba(168,85,247,0.18)] hover:dropzone-pulse hover:border-pink-500/70 hover:bg-fuchsia-950/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.28)]"
            } ${isSubmitting ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              ref={fileInputRef}
              id="audioFile"
              name="audioFile"
              type="file"
              accept={ACCEPT_FILE_INPUT}
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="sr-only"
            />

            {audioFile ? (
              <>
                <Upload className="mb-4 h-10 w-10 text-emerald-400" />
                <span className="inline-flex animate-pulse items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 font-mono text-xs tracking-wider text-emerald-400">
                  <span className="text-emerald-300">▮▮▮</span>
                  LOADED: {audioFile.name.toUpperCase()}
                </span>
                <p className="mt-3 font-[family-name:var(--font-body)] text-xs text-zinc-400">
                  {(audioFile.size / (1024 * 1024)).toFixed(2)} MB — click or drop
                  to replace
                </p>
              </>
            ) : (
              <>
                <Music
                  className={`mb-3 h-12 w-12 text-fuchsia-400/90 ${
                    isDragging ? "" : "animate-pulse"
                  }`}
                />
                <p className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-zinc-100 sm:text-base">
                  Ready for Transmission
                </p>
                <p className="mt-2 max-w-sm font-[family-name:var(--font-body)] text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Drag &amp; drop or click to select a raw .mp3, .wav, or a .zip /
                  .rar multi-track project.
                </p>
                <p className="mt-2 font-sans text-xs font-black uppercase tracking-[0.15em] text-zinc-500">
                  Max file size: {MAX_UPLOAD_LABEL}
                </p>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-amber-400/90">
                  {MAX_UPLOAD_WARNING}
                </p>
              </>
            )}
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800/80 bg-black/40 p-3.5 transition-colors duration-300 sm:p-4 sm:hover:border-zinc-700/80">
          <input
            type="checkbox"
            name="legalChecked"
            checked={legalChecked}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLegalChecked(e.target.checked)
            }
            disabled={isSubmitting}
            className="custom-checkbox sr-only"
          />
          <span className="checkbox-box mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-black/60 transition-all duration-300">
            <Check className="h-3.5 w-3.5 text-white opacity-0 transition-all duration-200" />
          </span>
          <span className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-zinc-300">
            I certify that I own 100% of the rights to this music and grant{" "}
            <strong className="text-fuchsia-300">937 The Underground</strong>{" "}
            royalty-free permission to broadcast it.
          </span>
        </label>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-center font-[family-name:var(--font-body)] text-sm font-medium text-red-300"
          >
            {errorMessage}
          </p>
        )}

        {isSubmitting && submitPhase === "r2" && uploadProgress > 0 && (
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
              role="progressbar"
              aria-valuenow={uploadProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Upload progress"
            />
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className={TRANSMIT_BTN}>
          {isSubmitting ? (
            <>
              {submitPhase === "r2" ? (
                <UploadEqualizer className="relative shrink-0" />
              ) : (
                <Loader2 className="relative h-5 w-5 shrink-0 animate-spin" />
              )}
              <span className="relative">{submitButtonLabel}</span>
            </>
          ) : (
            <>
              <Send className="relative h-5 w-5 transition-all duration-300 group-enabled:group-hover:rotate-45 group-enabled:group-hover:scale-125" />
              <span className="relative">Transmit Track</span>
              <Music className="relative h-5 w-5 opacity-0 transition-all duration-300 group-enabled:group-hover:opacity-100 group-enabled:group-hover:-rotate-12 group-enabled:group-hover:scale-110" />
            </>
          )}
        </button>

        <p className="border-t border-zinc-800/60 pt-4 text-center font-[family-name:var(--font-body)] text-[11px] tracking-wide text-zinc-500">
          System support channels routed to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-purple-400/90 transition-colors hover:text-pink-400"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </form>
    </div>
  );
}
