import { useEffect, useRef, useState } from "react";

const BARS = [0.4, 0.75, 0.5, 1, 0.6, 0.85, 0.45, 0.9, 0.55, 0.7];

export function Equalizer({
  active,
  bars = 10,
  className = "",
  barClassName = "w-1.5",
}: {
  active: boolean;
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-end justify-center gap-1 ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`eq-bar h-full ${barClassName}`}
          style={{
            animationDuration: `${0.7 + ((i * 7) % 9) / 10}s`,
            animationDelay: `${(i % 5) * 0.12}s`,
            animationPlayState: active ? "running" : "paused",
            transform: active ? undefined : `scaleY(${(BARS[i % BARS.length] ?? 0.5) * 0.35})`,
            opacity: active ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
