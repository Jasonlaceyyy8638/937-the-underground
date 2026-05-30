"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  formatNowPlayingTitle,
  RADIO_CO_STATUS_URL,
  RADIO_CO_STREAM_SRC,
  type RadioCoStatus,
} from "@/lib/radio-co";

type RadioCoPlayerInstance = {
  play: () => void;
  pause: () => void;
  playToggle: () => void;
  isPlaying: () => boolean;
  event: (name: string, cb: () => void) => void;
};

type JQueryWithRadioCo = {
  (selector: string): {
    radiocoPlayer: () => RadioCoPlayerInstance;
    length: number;
  };
};

declare global {
  interface Window {
    jQuery?: JQueryWithRadioCo;
  }
}

type RadioPlayerContextValue = {
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  nowPlaying: string | null;
  togglePlay: () => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    throw new Error("useRadioPlayer must be used within RadioPlayerProvider");
  }
  return ctx;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function fetchNowPlaying(): Promise<string | null> {
  try {
    const res = await fetch(RADIO_CO_STATUS_URL, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as RadioCoStatus;
    return formatNowPlayingTitle(data.current_track?.title);
  } catch {
    return null;
  }
}

export default function RadioPlayerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const playerRef = useRef<RadioCoPlayerInstance | null>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const initRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initPlayer() {
      if (initRef.current) return;
      initRef.current = true;

      try {
        await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
        await loadScript(
          "https://public.radio.co/playerapi/jquery.radiocoplayer.min.js",
        );

        if (cancelled || !window.jQuery) {
          throw new Error("jQuery did not load");
        }

        const $ = window.jQuery;
        if (!$("#underground-radio").length) {
          throw new Error("Player mount missing");
        }

        const player = $("#underground-radio").radiocoPlayer();
        playerRef.current = player;

        player.event("audioPlay", () => {
          setIsPlaying(true);
          setIsLoading(false);
          setError(null);
        });

        player.event("audioPause", () => {
          setIsPlaying(false);
          setIsLoading(false);
        });

        if (!cancelled) {
          setIsReady(true);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setUseFallback(true);
          setIsReady(true);
        }
      }
    }

    void initPlayer();

    return () => {
      cancelled = true;
      playerRef.current?.pause();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;

    const refresh = async () => {
      const title = await fetchNowPlaying();
      if (!cancelled && title) setNowPlaying(title);
    };

    void refresh();
    const id = window.setInterval(refresh, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setError(null);

    if (useFallback) {
      const audio = fallbackAudioRef.current;
      if (!audio) return;

      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      if (!audio.src) {
        audio.src = `${RADIO_CO_STREAM_SRC}/listen`;
      }

      const playPromise = audio.play();
      if (playPromise) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            setError("Tap play again — your browser blocked audio.");
          });
      }
      return;
    }

    const player = playerRef.current;
    if (!player) {
      setError("Player is still loading…");
      return;
    }

    setIsLoading(true);
    player.playToggle();

    window.setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(player.isPlaying());
    }, 400);
  }, [useFallback]);

  return (
    <RadioPlayerContext.Provider
      value={{
        isPlaying,
        isLoading,
        isReady,
        error,
        nowPlaying,
        togglePlay,
      }}
    >
      <div
        id="underground-radio"
        className="radioplayer sr-only"
        data-src={RADIO_CO_STREAM_SRC}
        data-autoplay="false"
        data-playbutton="true"
        data-volumeslider="false"
        data-elapsedtime="false"
        data-nowplaying="false"
        data-showplayer="false"
        data-showartwork="false"
        data-volume="75"
        aria-hidden="true"
      />
      {useFallback ? (
        <audio
          ref={fallbackAudioRef}
          preload="none"
          className="sr-only"
          aria-hidden="true"
          onPlay={() => {
            setIsPlaying(true);
            setIsLoading(false);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setIsLoading(false);
            setIsPlaying(false);
            setError("Could not connect to the live stream.");
          }}
        />
      ) : null}
      {children}
    </RadioPlayerContext.Provider>
  );
}
