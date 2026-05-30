"use client";

import { Music2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  RADIO_CO_REQUEST_EMBED_URL,
  RADIO_CO_REQUEST_HEIGHT,
  RADIO_CO_REQUEST_WIDTH,
} from "@/lib/radio-co";

/** Floating request button — opens Radio.co Music Request widget in a modal */
export default function RadioCoRequestFab() {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-50 flex h-[60px] max-w-[calc(100vw-2.5rem)] items-center gap-2.5 rounded-full bg-[#A855F7] pl-4 pr-5 text-white shadow-[0_4px_24px_rgba(168,85,247,0.55),0_0_48px_rgba(168,85,247,0.35)] transition-transform duration-200 active:scale-95 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-[max(20px,env(safe-area-inset-right,0px))] sm:bottom-24 sm:right-5 sm:gap-3 sm:pl-5 sm:pr-6 sm:hover:scale-105 sm:hover:shadow-[0_6px_32px_rgba(168,85,247,0.65),0_0_64px_rgba(236,72,153,0.3)]"
        aria-label="Request a song"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Music2 className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" strokeWidth={2.25} aria-hidden />
        <span className="font-[family-name:var(--font-display)] text-[11px] font-black uppercase leading-none tracking-wider sm:text-xs sm:tracking-widest">
          Request a Song
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 safe-x sm:items-center"
          role="presentation"
          onClick={close}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Music Request"
            className="relative z-10 w-full max-w-[650px] overflow-hidden rounded-2xl border border-fuchsia-500/25 bg-[#09090B] shadow-[0_0_40px_rgba(168,85,247,0.35),0_24px_48px_rgba(0,0,0,0.6)]"
            style={{ marginBottom: "max(0px, env(safe-area-inset-bottom, 0px))" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3">
              <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-zinc-100">
                Request a Song
              </p>
              <button
                type="button"
                onClick={close}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-white"
                aria-label="Close request form"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div
              className="relative w-full"
              style={{ height: RADIO_CO_REQUEST_HEIGHT }}
            >
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#A855F7] border-t-transparent" />
                </div>
              )}
              <iframe
                src={RADIO_CO_REQUEST_EMBED_URL}
                title="937 The Underground — Music Request"
                width="100%"
                height={RADIO_CO_REQUEST_HEIGHT}
                className={`block w-full border-0 transition-opacity duration-300 ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ maxWidth: RADIO_CO_REQUEST_WIDTH }}
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
