import logoUrl from "@/assets/beyond-radio-logo.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Listen Live", href: "#listen" },
  { label: "About", href: "#about" },
  { label: "Programming", href: "#programming" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-2" : "py-4"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:justify-between"
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logoUrl}
            alt="Beyond Radio logo"
            width={1024}
            height={1024}
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            Beyond<span className="text-primary">Radio</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#listen"
              className="ml-2 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            >
              ▶ Listen Live
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="justify-self-end rounded-xl border border-border p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul className="glass mx-5 mt-3 space-y-1 rounded-2xl p-3 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
