import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  AudioWaveform,
  Box,
  Clapperboard,
  Disc3,
  Film,
  Fingerprint,
  Globe,
  type LucideIcon,
  Menu,
  Newspaper,
  Rocket,
  Search,
  Send,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/site";

export const nav = [
  ["Home", "home"],
  ["Services", "services"],
  ["Work", "work"],
  ["About", "about"],
  ["Process", "process"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

export const socials = [
  ["Instagram", "https://www.instagram.com/maveramusicagency/"],
  ["TikTok", "https://www.tiktok.com/@mavermusicagency"],
  ["SoundCloud", "https://soundcloud.com/mavermusicagency"],
  ["Facebook", "https://www.facebook.com/MaverMusicAgency/"],
  ["X", "https://x.com/MaverMusicAgenc"],
  ["YouTube", "https://www.youtube.com/@mavermusicagency"],
] as const;

export const serviceIcons: Record<string, LucideIcon> = {
  "music-growth": TrendingUp,
  "music-distribution": Send,
  "music-videos": Clapperboard,
  "3d-animation": Box,
  "motion-design": Sparkles,
  "music-visuals": AudioWaveform,
  "artwork-cover-design": Disc3,
  "artist-branding": Fingerprint,
  "social-content": Smartphone,
  "dj-live-visuals": SlidersHorizontal,
  "vfx-cinematic": Film,
  "digital-presence": Globe,
  "google-digital-identity": Search,
  "press-media": Newspaper,
  "artist-development": Rocket,
};

export const processSteps = [
  ["Discover", "We learn about your music, identity, audience and goals."],
  ["Strategize", "We develop the creative direction and project strategy."],
  ["Create", "Our team develops the visuals, content, branding or campaign."],
  ["Launch", "We prepare and deploy the final assets across the required platforms."],
  ["Grow", "We review performance, refine the strategy and help build the next stage."],
] as const;

/** On the home page anchors are local; elsewhere they point back to the home page. */
const sectionHref = (id: string, onHome: boolean) => (onHome ? `#${id}` : `/#${id}`);

/** Header uses the cropped "M" mark beside the wordmark; the footer shows the full official logo. */
export function BrandLogo({ variant = "mark" }: { variant?: "mark" | "full" }) {
  if (variant === "full") {
    return (
      <img
        src="/logo-full.webp"
        alt="Maver Music Agency"
        width={480}
        height={480}
        loading="lazy"
        className="h-40 w-40 object-contain drop-shadow-[0_10px_40px_color-mix(in_oklab,var(--brand-blue)_35%,transparent)]"
      />
    );
  }
  return (
    <span className="flex items-center gap-3">
      <img
        src="/logo-mark.webp"
        alt=""
        width={176}
        height={160}
        className="h-10 w-auto object-contain drop-shadow-[0_4px_14px_color-mix(in_oklab,var(--brand-blue)_45%,transparent)]"
      />
      <span className="leading-none">
        <span className="block font-display text-[0.95rem] font-semibold tracking-[0.18em]">
          MAVER
        </span>
        <span className="mt-1 block text-[0.55rem] font-semibold tracking-[0.32em] text-muted-foreground">
          MUSIC AGENCY
        </span>
      </span>
    </span>
  );
}

export function Navbar({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = nav
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActive(current.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Feeds the `spotlight` utility: one delegated listener positions the glow under the cursor.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        aria-hidden="true"
        className="scroll-progress brand-gradient-bg fixed inset-x-0 top-0 h-[3px]"
      />
      <div
        className={`mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-500 sm:px-4 ${scrolled || open ? "glass shadow-[0_20px_50px_-25px_oklch(0_0_0/80%)]" : "border border-transparent"}`}
      >
        <a
          href={sectionHref("home", onHome)}
          aria-label="Maver Music Agency home"
          className="shrink-0 rounded-xl p-1"
        >
          <BrandLogo />
        </a>
        <nav
          className="hidden items-center gap-1 rounded-full border border-foreground/10 bg-background/30 p-1 backdrop-blur-md lg:flex"
          aria-label="Primary"
        >
          {nav.map(([label, id]) => {
            const isActive = onHome && active === id;
            return (
              <a
                key={id}
                href={sectionHref(id, onHome)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.78rem] font-medium transition-colors ${isActive ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="hero"
            size="sm"
            className="hidden h-11 px-5 text-[0.72rem] font-semibold tracking-[0.08em] sm:inline-flex"
          >
            <a href={sectionHref("contact", onHome)}>
              Start a project <ArrowRight />
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl border border-foreground/10 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`mx-auto mt-2 max-w-[1320px] overflow-hidden rounded-2xl transition-all duration-500 lg:hidden ${open ? "glass max-h-[calc(100svh-6rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
      >
        <nav
          className="flex max-h-[calc(100svh-6rem)] flex-col overflow-y-auto p-3"
          aria-label="Mobile"
        >
          {nav.map(([label, id], i) => (
            <a
              key={id}
              href={sectionHref(id, onHome)}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-2xl transition-colors hover:bg-foreground/5 ${onHome && active === id ? "text-brand-lilac" : "text-foreground"}`}
            >
              <span>{label}</span>
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
            </a>
          ))}
          <Button asChild variant="hero" size="editorial" className="mt-3">
            <a href={sectionHref("contact", onHome)} onClick={() => setOpen(false)}>
              START A PROJECT <ArrowRight />
            </a>
          </Button>
          <div className="mt-4 flex flex-wrap gap-2 px-1 pb-1">
            {socials.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${tone === "light" ? "border-light-ink/15 bg-light-ink/[0.04] text-light-ink/70" : "border-foreground/10 bg-foreground/[0.04] text-muted-foreground"}`}
    >
      <span className="brand-gradient-bg h-1.5 w-1.5 rounded-full" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
  tone = "dark",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "split" | "center" | "left";
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-light-ink/65" : "text-muted-foreground";
  if (align === "center") {
    return (
      <div className="reveal mx-auto max-w-3xl text-center">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02]">{title}</h2>
        {description && (
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${muted}`}>
            {description}
          </p>
        )}
      </div>
    );
  }
  return (
    <div
      className={`reveal grid gap-6 ${align === "split" ? "lg:grid-cols-[1.2fr_.8fr] lg:items-end" : ""}`}
    >
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02]">
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`max-w-md text-base leading-7 ${muted} ${align === "split" ? "lg:justify-self-end" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Footer({ onHome = true }: { onHome?: boolean }) {
  return (
    <footer className="relative overflow-hidden bg-panel">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-violet/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1320px] px-5 pt-20 lg:px-10">
        <div className="surface relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,transparent,black)]" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-lilac">
              Have a release coming up?
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">
              Let's build the world around your music.
            </h2>
          </div>
          <Button asChild variant="hero" size="editorial" className="relative mt-8 lg:mt-0">
            <a href={sectionHref("contact", onHome)}>
              START A PROJECT <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_.8fr_.8fr]">
          <div>
            <BrandLogo variant="full" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              A global music and creative agency connecting growth, distribution, visuals, branding
              and artist development into one ecosystem.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand-lilac/50 hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Services">
            {services.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {service.title}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="More services">
            {services.slice(8).map((service) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {service.title}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="Navigate">
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={sectionHref(id, onHome)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </FooterColumn>
        </div>

        <p
          aria-hidden="true"
          className="text-outline select-none text-center font-display text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.8] tracking-tight"
        >
          MAVER
        </p>

        <div className="flex flex-col gap-3 border-t border-foreground/10 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Maver Music Agency. All rights reserved.</span>
          <a
            href={sectionHref("home", onHome)}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Your music deserves a world around it <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{title}</p>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}
