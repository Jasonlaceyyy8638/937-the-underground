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

  useEffect(() => {
    if (open) setIframeLoaded(false);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 flex h-[60px] w-[calc(100%-2.5rem)] max-w-[400px] items-center justify-center gap-2.5 rounded-full bg-[#A855F7] px-5 text-white shadow-[0_4px_24px_rgba(168,85,247,0.55),0_0_48px_rgba(168,85,247,0.35)] transition-transform duration-200 active:scale-95 bottom-[calc(5.75rem+1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 sm:bottom-24 sm:left-auto sm:right-5 sm:w-auto sm:max-w-none sm:translate-x-0 sm:justify-start sm:gap-3 sm:pl-5 sm:pr-6 sm:hover:scale-105 sm:hover:shadow-[0_6px_32px_rgba(168,85,247,0.65),0_0_64px_rgba(236,72,153,0.3)]"
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
          className="fixed inset-0 z-[60] flex items-center justify-center px-[2.5%] safe-x sm:p-4"
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
            className="request-modal-scroll relative z-10 mx-auto flex max-h-[90dvh] w-[95%] max-w-[400px] flex-col overflow-y-auto overscroll-contain rounded-2xl border border-fuchsia-500/25 bg-[#09090B] shadow-[0_0_40px_rgba(168,85,247,0.35),0_24px_48px_rgba(0,0,0,0.6)] sm:max-h-[85vh] sm:w-full sm:max-w-[650px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800/80 p-5">
              <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-zinc-100">
                Request a Song
              </p>
              <button
                type="button"
                onClick={close}
                className="flex h-[45px] min-h-[45px] w-[45px] min-w-[45px] items-center justify-center rounded-xl border border-zinc-800/80 text-zinc-400 transition-colors active:scale-95 hover:bg-zinc-800/80 hover:text-white"
                aria-label="Close request form"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="shrink-0 p-5">
              <div className="request-widget-frame relative w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-black/40">
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#09090B]">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#A855F7] border-t-transparent" />
                  </div>
                )}
                <iframe
                  src={RADIO_CO_REQUEST_EMBED_URL}
                  title="937 The Underground — Music Request"
                  width="100%"
                  height={RADIO_CO_REQUEST_HEIGHT}
                  className={`block h-full w-full border-0 transition-opacity duration-300 ${
                    iframeLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ maxWidth: RADIO_CO_REQUEST_WIDTH }}
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
