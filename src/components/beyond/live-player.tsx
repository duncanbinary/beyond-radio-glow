import logoUrl from "@/assets/beyond-radio-logo.png";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Equalizer } from "./visuals";

const streamUrl = "https://beyondradio.co.za/beyondradio";

type Status = "ready" | "buffering" | "playing" | "paused" | "error";

const STATUS_TEXT: Record<Status, string> = {
  ready: "Ready to Play",
  buffering: "Buffering…",
  playing: "Playing Live",
  paused: "Paused",
  error: "Stream Offline",
};

const STATUS_DOT: Record<Status, string> = {
  ready: "bg-muted-foreground",
  buffering: "bg-yellow-400",
  playing: "bg-primary",
  paused: "bg-muted-foreground",
  error: "bg-destructive",
};

export function LivePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const onWaiting = () => setStatus("buffering");
    const onPlaying = () => setStatus("playing");
    const onPause = () => setStatus((s) => (s === "error" ? s : "paused"));
    const onError = () => setStatus((s) => (s === "ready" ? s : "error"));

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);


    return () => {
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playStream = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setStatus("buffering");
    // reload so a live stream always resumes at the current broadcast point
    audio.src = streamUrl;
    audio.load();
    void audio.play().then(
      () => setStatus("playing"),
      () => setStatus("error"),
    );
  };

  const pauseStream = () => {
    audioRef.current?.pause();
    setStatus("paused");
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const isPlaying = status === "playing" || status === "buffering";

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <article className="glass animate-float relative rounded-[20px] p-7 text-center sm:p-9">
        <img
          src={logoUrl}
          alt="Beyond Radio logo"
          width={1024}
          height={1024}
          className="mx-auto h-24 w-24 object-contain drop-shadow-[0_0_28px_rgba(245,124,0,0.55)]"
        />

        <div className="animate-pulse-glow mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live on air
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Beyond Radio
        </h2>
        <p className="brand-gradient-text mt-1 text-sm font-semibold tracking-[0.3em] uppercase">
          Boundless Radio
        </p>

        <div
          role="status"
          aria-live="polite"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary/70 px-4 py-2 text-sm text-muted-foreground"
        >
          <span className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[status]}`} />
          {STATUS_TEXT[status]}
        </div>

        <Equalizer
          active={status === "playing"}
          bars={22}
          className="mt-6 h-14"
          barClassName="w-1 sm:w-1.5"
        />

        <audio ref={audioRef} controls preload="none" src={streamUrl} className="mt-6 rounded-full">
          <track kind="captions" />
        </audio>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={playStream}
            aria-label="Play live stream"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            style={{
              background: "var(--gradient-brand)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <Play className="h-5 w-5 fill-current" /> Play
          </button>
          <button
            type="button"
            onClick={pauseStream}
            aria-label="Pause live stream"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/70 px-6 py-3.5 text-base font-semibold text-foreground transition-colors duration-300 hover:border-primary/60 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Pause className="h-5 w-5" /> Pause
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="h-5 w-5 shrink-0 text-muted-foreground" />
          ) : (
            <Volume2 className="h-5 w-5 shrink-0 text-primary" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            aria-label="Volume"
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ ["--range" as string]: `${volume * 100}%` }}
          />
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Streaming 24/7 · {isPlaying ? "Connected" : "Tap play to tune in"}
        </p>
      </article>
    </div>
  );
}
