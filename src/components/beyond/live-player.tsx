import logoUrl from "@/assets/beyond-radio-logo.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { Equalizer } from "./visuals";

const STREAM_URL = "https://beyondradio.co.za/beyondradio";
const MAX_RETRIES = 6;

type Status = "idle" | "buffering" | "playing" | "paused" | "reconnecting" | "error";

const STATUS_TEXT: Record<Status, string> = {
  idle: "Ready to play",
  buffering: "Buffering…",
  playing: "Playing live",
  paused: "Paused",
  reconnecting: "Reconnecting…",
  error: "Stream unavailable",
};

const STATUS_DOT: Record<Status, string> = {
  idle: "bg-muted-foreground",
  buffering: "bg-yellow-400",
  playing: "bg-primary",
  paused: "bg-muted-foreground",
  reconnecting: "bg-yellow-400",
  error: "bg-destructive",
};

export function LivePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const retriesRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wantsPlayRef = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const clearRetry = () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  };

  const connect = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    wantsPlayRef.current = true;
    setStatus((s) => (s === "reconnecting" ? s : "buffering"));
    // cache-bust so a live stream always resumes at the current broadcast point
    audio.src = `${STREAM_URL}?_=${Date.now()}`;
    audio.load();
    void audio.play().catch(() => scheduleReconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleReconnect = useCallback(() => {
    if (!wantsPlayRef.current) return;
    if (retriesRef.current >= MAX_RETRIES) {
      setStatus("error");
      return;
    }
    clearRetry();
    const delay = Math.min(1000 * 2 ** retriesRef.current, 15000);
    retriesRef.current += 1;
    setStatus("reconnecting");
    retryTimerRef.current = setTimeout(() => connect(), delay);
  }, [connect]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;

    const onWaiting = () => setStatus((s) => (s === "reconnecting" ? s : "buffering"));
    const onPlaying = () => {
      retriesRef.current = 0;
      setStatus("playing");
    };
    const onPause = () => {
      if (!wantsPlayRef.current) setStatus("paused");
    };
    const onError = () => {
      if (wantsPlayRef.current) scheduleReconnect();
    };
    const onEnded = () => scheduleReconnect();
    const onStalled = () => {
      if (wantsPlayRef.current) scheduleReconnect();
    };

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("stalled", onStalled);

    return () => {
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("stalled", onStalled);
      clearRetry();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleReconnect]);

  const stop = () => {
    wantsPlayRef.current = false;
    clearRetry();
    retriesRef.current = 0;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setStatus("paused");
  };

  const toggle = () => {
    if (wantsPlayRef.current) stop();
    else {
      retriesRef.current = 0;
      connect();
    }
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v > 0 && muted) {
        audioRef.current.muted = false;
        setMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  const isBusy = status === "buffering" || status === "reconnecting";
  const isOn = status === "playing" || isBusy;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <article className="glass animate-float relative rounded-[24px] p-6 text-center sm:p-9">
        <img
          src={logoUrl}
          alt="Beyond Radio logo"
          width={1024}
          height={1024}
          className="mx-auto h-20 w-20 object-contain drop-shadow-[0_0_28px_rgba(245,124,0,0.55)] sm:h-24 sm:w-24"
        />

        <div className="animate-pulse-glow mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live
        </div>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl">Beyond Radio</h2>
        <p className="brand-gradient-text mt-1 text-xs font-semibold tracking-[0.3em] uppercase sm:text-sm">
          Boundless Radio
        </p>

        <div
          role="status"
          aria-live="polite"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary/70 px-4 py-2 text-sm text-muted-foreground"
        >
          {isBusy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          ) : (
            <span className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[status]}`} />
          )}
          {STATUS_TEXT[status]}
        </div>

        <Equalizer
          active={status === "playing"}
          bars={22}
          className="mt-6 h-12 sm:h-14"
          barClassName="w-1 sm:w-1.5"
        />

        <audio ref={audioRef} preload="none" className="hidden">
          <track kind="captions" />
        </audio>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-label={isOn ? "Pause live stream" : "Play live stream"}
            className="grid h-20 w-20 place-items-center rounded-full text-primary-foreground transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:h-24 sm:w-24"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            {isBusy ? (
              <Loader2 className="h-9 w-9 animate-spin" />
            ) : isOn ? (
              <Pause className="h-9 w-9 fill-current sm:h-10 sm:w-10" />
            ) : (
              <Play className="ml-1 h-9 w-9 fill-current sm:h-10 sm:w-10" />
            )}
          </button>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            <VolumeIcon className={`h-5 w-5 ${muted || volume === 0 ? "" : "text-primary"}`} />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            aria-label="Volume"
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ ["--range" as string]: `${(muted ? 0 : volume) * 100}%` }}
          />
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Streaming 24/7 · {isOn ? "Connected" : "Tap play to tune in"}
        </p>
      </article>
    </div>
  );
}
