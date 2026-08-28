import logoUrl from "@/assets/beyond-radio-logo.png";
import { createFileRoute } from "@tanstack/react-router";
import {
  Facebook,
  Globe2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music4,
  Phone,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react";
import { SiteNav } from "@/components/beyond/site-nav";
import { LivePlayer } from "@/components/beyond/live-player";
import { Equalizer, Reveal } from "@/components/beyond/visuals";

const SITE_URL = "https://beyondradio.co.za/";
const TITLE = "Beyond Radio South Africa | Boundless Radio | Listen Live";
const DESCRIPTION =
  "Beyond Radio is a South African digital community radio station broadcasting music, news, education, culture and conversations 24/7. Listen live online.";
const OG_TITLE = "Beyond Radio South Africa | Boundless Radio";
const OG_DESCRIPTION =
  "South African digital community radio broadcasting music, news, education, culture and conversations 24/7.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              url: SITE_URL,
              name: "Beyond Radio",
              alternateName: "Boundless Radio",
              description: DESCRIPTION,
              inLanguage: "en-ZA",
              publisher: { "@id": `${SITE_URL}#organization` },
            },
            {
              "@type": "RadioStation",
              "@id": `${SITE_URL}#organization`,
              name: "Beyond Radio",
              alternateName: "Boundless Radio",
              url: SITE_URL,
              description: DESCRIPTION,
              areaServed: { "@type": "Country", name: "South Africa" },
              address: { "@type": "PostalAddress", addressCountry: "ZA" },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

/* ---- Editable site content ---------------------------------------- */
const CONTACT = {
  phone: "+27 00 000 0000",
  email: "info@beyondradio.co.za",
  whatsapp: "+27 00 000 0000",
  location: "Broadcasting worldwide · South Africa",
};

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com", Icon: Music4 },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
  { label: "WhatsApp", href: "https://wa.me/27000000000", Icon: MessageCircle },
];

const PROGRAMS = [
  { emoji: "🎙", title: "Talk Shows", copy: "Bold conversations that matter." },
  { emoji: "🎵", title: "Music", copy: "Curated sound, day and night." },
  { emoji: "🌍", title: "Community News", copy: "Stories from your streets." },
  { emoji: "🎤", title: "Interviews", copy: "Voices shaping the culture." },
  { emoji: "❤️", title: "Health & Wellness", copy: "Live well, live informed." },
  { emoji: "🎓", title: "Education", copy: "Learning on every frequency." },
  { emoji: "🏆", title: "Sports", copy: "Every score, every roar." },
  { emoji: "🌱", title: "Environment", copy: "Caring for our shared home." },
];

const WHY = [
  { Icon: Users, title: "Community First", copy: "Giving every voice a platform." },
  { Icon: Sparkles, title: "Diverse Content", copy: "Music, education, news and entertainment." },
  { Icon: Globe2, title: "Listen Anywhere", copy: "Stream Beyond Radio from anywhere in the world." },
];
/* ------------------------------------------------------------------- */

function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 3 + ((i * 5) % 7),
    delay: `${(i % 9) * 1.4}s`,
    duration: `${14 + ((i * 3) % 12)}s`,
  }));
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-drift absolute rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteNav />

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 pb-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          />
          <Particles />
          <Equalizer
            active
            bars={40}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 gap-1.5 opacity-15"
            barClassName="w-2 sm:w-3"
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center animate-rise">
            <img
              src={logoUrl}
              alt="Beyond Radio logo"
              width={1024}
              height={1024}
              className="mx-auto h-32 w-32 object-contain drop-shadow-[0_0_45px_rgba(245,124,0,0.5)] sm:h-40 sm:w-40"
            />
            <h1 className="text-glow mt-6 text-5xl font-black tracking-tight sm:text-7xl">
              Beyond <span className="brand-gradient-text">Radio</span>
            </h1>
            <p className="mt-3 text-sm font-semibold tracking-[0.42em] text-primary uppercase sm:text-base">
              Boundless Radio
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Beyond Radio is a modern digital radio station connecting communities through music,
              news, education, culture and inspiring conversations. Broadcasting beyond borders, we
              bring people together through powerful storytelling and quality entertainment.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#listen"
                className="animate-pulse-glow inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-bold text-primary-foreground transition-transform duration-300 hover:scale-105"
                style={{ background: "var(--gradient-brand)" }}
              >
                ▶ Listen Live
              </a>
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Discover the station
              </a>
            </div>
          </div>
        </section>

        {/* PLAYER */}
        <section id="listen" className="relative px-5 py-24">
          <Reveal>
            <SectionTitle eyebrow="On air now" title="The Beyond Radio Player" />
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <LivePlayer />
          </Reveal>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative px-5 py-24">
          <Reveal>
            <SectionTitle eyebrow="Who we are" title="About Beyond Radio" />
          </Reveal>
          <Reveal delay={100}>
            <div className="glass mx-auto mt-12 max-w-3xl rounded-3xl p-8 sm:p-12">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Beyond Radio is a digital community radio station dedicated to informing, inspiring
                and connecting audiences through quality music, news, culture, education and
                meaningful conversations.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Our mission is to create a platform where every voice matters while embracing
                innovation, diversity and community development.
              </p>
            </div>
          </Reveal>
        </section>

        {/* PROGRAMMING */}
        <section id="programming" className="relative px-5 py-24">
          <Reveal>
            <SectionTitle eyebrow="What we broadcast" title="Featured Programming" />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="glass glass-hover group h-full rounded-3xl p-6">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                    {p.emoji}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
                  <Equalizer
                    active={false}
                    bars={8}
                    className="mt-5 h-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    barClassName="w-1"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHY LISTEN */}
        <section className="relative px-5 py-24">
          <Reveal>
            <SectionTitle eyebrow="The difference" title="Why Listen" />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <article className="glass glass-hover h-full rounded-3xl p-8 text-center">
                  <div
                    className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <w.Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SOCIAL */}
        <section className="relative px-5 py-20">
          <Reveal>
            <SectionTitle eyebrow="Stay connected" title="Follow Beyond Radio" />
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="glass glass-hover grid h-14 w-14 place-items-center rounded-2xl text-muted-foreground transition-colors hover:text-primary"
                  >
                    <s.Icon className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative px-5 py-24">
          <Reveal>
            <SectionTitle eyebrow="Say hello" title="Contact Beyond Radio" />
          </Reveal>
          <Reveal delay={100}>
            <div className="glass mx-auto mt-12 max-w-2xl rounded-3xl p-8 sm:p-10">
              <ul className="space-y-5">
                {[
                  { Icon: Phone, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
                  { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  {
                    Icon: MessageCircle,
                    label: "WhatsApp",
                    value: CONTACT.whatsapp,
                    href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
                  },
                  { Icon: MapPin, label: "Location", value: CONTACT.location },
                ].map((c) => (
                  <li key={c.label} className="flex min-w-0 items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="truncate text-base font-semibold transition-colors hover:text-primary"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold">{c.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-lg font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
              >
                <Heart className="h-5 w-5" /> Contact Us
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative border-t border-border px-5 py-14 text-center">
        <img
          src={logoUrl}
          alt="Beyond Radio logo"
          width={1024}
          height={1024}
          loading="lazy"
          className="mx-auto h-16 w-16 object-contain"
        />
        <p className="mt-4 font-display text-2xl font-extrabold">Beyond Radio</p>
        <p className="text-sm tracking-[0.3em] text-primary uppercase">Boundless Radio</p>
        <p className="mt-6 text-sm text-muted-foreground">
          Powered by <span className="font-semibold text-foreground">Sakaza.Radio Tech</span>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Copyright © 2026 Beyond Radio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
