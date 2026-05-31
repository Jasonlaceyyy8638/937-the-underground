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
  RADIO_CO_STREAM_URL,
  type RadioCoStatus,
} from "@/lib/radio-co";

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

function playErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Your browser blocked playback — tap play once more.";
    }
    if (error.name === "AbortError") {
      return "Stream interrupted — tap play to reconnect.";
    }
  }

  return "Could not start the stream — tap play to try again.";
}

export default function RadioPlayerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const clearLoadingTimeout = useCallback(() => {
    if (loadingTimeoutRef.current !== null) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  const stopLoading = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(false);
  }, [clearLoadingTimeout]);

  const startLoadingWithTimeout = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(true);
    loadingTimeoutRef.current = window.setTimeout(() => {
      loadingTimeoutRef.current = null;
      setIsLoading(false);
      setError("Stream is taking too long — tap play to try again.");
    }, 12000);
  }, [clearLoadingTimeout]);

  useEffect(() => {
    setIsReady(true);
    const audio = audioRef.current;
    return () => {
      clearLoadingTimeout();
      audio?.pause();
    };
  }, [clearLoadingTimeout]);

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
    const audio = audioRef.current;
    if (!audio) return;

    setError(null);

    if (!audio.paused) {
      audio.pause();
      stopLoading();
      return;
    }

    startLoadingWithTimeout();

    const playPromise = audio.play();
    if (!playPromise) return;

    playPromise
      .then(() => {
        stopLoading();
        setIsPlaying(true);
      })
      .catch((playError: unknown) => {
        stopLoading();
        setIsPlaying(false);
        setError(playErrorMessage(playError));
      });
  }, [startLoadingWithTimeout, stopLoading]);

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
      <audio
        ref={audioRef}
        src={RADIO_CO_STREAM_URL}
        preload="none"
        playsInline
        className="sr-only"
        aria-hidden="true"
        onPlay={() => {
          stopLoading();
          setIsPlaying(true);
          setError(null);
        }}
        onPause={() => {
          stopLoading();
          setIsPlaying(false);
        }}
        onWaiting={() => {
          if (!audioRef.current?.paused) {
            setIsLoading(true);
          }
        }}
        onPlaying={stopLoading}
        onCanPlay={stopLoading}
        onError={() => {
          stopLoading();
          setIsPlaying(false);
          setError("Could not connect to the live stream.");
        }}
      />
      {children}
    </RadioPlayerContext.Provider>
  );
}
