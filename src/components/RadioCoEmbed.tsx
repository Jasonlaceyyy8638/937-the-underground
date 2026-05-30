"use client";

import { useEffect, useRef } from "react";
import { useRadioPlayer } from "@/components/RadioPlayerProvider";
import { RADIO_CO_EMBED_SCRIPT } from "@/lib/radio-co";

/** Official Radio.co embed widget — same stream as the live banner control */
export default function RadioCoEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isPlaying } = useRadioPlayer();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script[data-radio-co]")) return;

    const script = document.createElement("script");
    script.src = RADIO_CO_EMBED_SCRIPT;
    script.async = true;
    script.dataset.radioCo = "true";
    container.appendChild(script);
  }, []);

  return (
    <div
      className={`fixed bottom-20 left-3 z-40 w-[calc(100%-1.5rem)] max-w-[400px] transition-opacity duration-300 safe-x sm:bottom-4 sm:left-auto sm:right-4 ${
        isPlaying ? "pointer-events-none opacity-40" : "opacity-100"
      }`}
      aria-label="937 The Underground Radio.co player"
    >
      <div className="overflow-hidden rounded-2xl border border-fuchsia-500/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div ref={containerRef} />
      </div>
    </div>
  );
}
