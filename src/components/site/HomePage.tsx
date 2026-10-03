import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Globe2,
  Handshake,
  Headphones,
  Layers,
  Mail,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CONTACT_EMAIL, services } from "@/data/site";
import {
  Eyebrow,
  Footer,
  Navbar,
  processSteps,
  SectionHeading,
  serviceIcons,
  socials,
} from "@/components/site/shared";
import heroImage from "@/assets/maver-hero.jpg";
import introImage from "@/assets/maver-intro.jpg";
import strategyImage from "@/assets/maver-strategy.jpg";
import visualStudy from "@/assets/work-visual-study.jpg";
import sonicArchitecture from "@/assets/work-sonic-architecture.jpg";
import releaseCampaign from "@/assets/work-release-campaign.jpg";
import liveSignal from "@/assets/work-live-signal.jpg";
import frequency from "@/assets/work-frequency.jpg";
import liveWorld from "@/assets/work-live-world.jpg";
import artistIdentity from "@/assets/work-artist-identity.jpg";
import platformLaunch from "@/assets/work-platform-launch.jpg";
import pressKit from "@/assets/work-press-kit.jpg";
import digitalPresence from "@/assets/work-digital-presence.jpg";

/*
 * One discriminated work-item model: still concepts and reels share the same
 * gallery and preview flow. Add `src` to a reel once its MP4/WebM is uploaded.
 */
type WorkGroup = "Film & Motion" | "Design & Identity" | "Campaigns";
type WorkBase = {
  title: string;
  category: string;
  group: WorkGroup;
  description: string;
  image: string;
};
type WorkItem = (WorkBase & { kind: "still" }) | (WorkBase & { kind: "reel"; src?: string });

const work: WorkItem[] = [
  {
    kind: "reel",
    title: "Live Signal",
    category: "Music video concept",
    group: "Film & Motion",
    description: "Performance energy captured through a cinematic visual treatment.",
    image: liveSignal,
  },
  {
    kind: "reel",
    title: "Motion Current",
    category: "Animation concept",
    group: "Film & Motion",
    description: "A fluid motion language designed to give sound a distinctive visual pulse.",
    image: visualStudy,
  },
  {
    kind: "reel",
    title: "Sonic Architecture",
    category: "Music visual concept",
    group: "Film & Motion",
    description: "Studio texture translated into a precise audiovisual system.",
    image: sonicArchitecture,
  },
  {
    kind: "still",
    title: "Release Campaign Concept",
    category: "Social content concept",
    group: "Campaigns",
    description: "A connected release world designed to build momentum across every platform.",
    image: releaseCampaign,
  },
  {
    kind: "still",
    title: "Frequency Forms",
    category: "Cover art concept",
    group: "Design & Identity",
    description: "A tactile identity study built from rhythm, glass and light.",
    image: frequency,
  },
  {
    kind: "still",
    title: "Live World System",
    category: "DJ / live visuals concept",
    group: "Film & Motion",
    description: "A responsive stage language designed for an immersive set.",
    image: liveWorld,
  },
  {
    kind: "still",
    title: "Artist Identity System",
    category: "Branding concept",
    group: "Design & Identity",
    description:
      "A complete artist identity joining marks, portrait direction and release packaging.",
    image: artistIdentity,
  },
  {
    kind: "still",
    title: "Platform Launch",
    category: "Release & distribution concept",
    group: "Campaigns",
    description:
      "A coordinated launch system designed for streaming, social and direct audience touchpoints.",
    image: platformLaunch,
  },
  {
    kind: "still",
    title: "Signal Press Kit",
    category: "Press & media concept",
    group: "Design & Identity",
    description:
      "A focused press package bringing artist story, imagery and campaign materials together.",
    image: pressKit,
  },
  {
    kind: "still",
    title: "Artist Digital World",
    category: "Digital presence concept",
    group: "Campaigns",
    description:
      "A responsive artist experience connecting music, visuals and discovery across screens.",
    image: digitalPresence,
  },
];

const faqs = [
  [
    "What does Maver Music Agency do?",
    "We connect music growth, distribution, visuals, branding, content, digital presence and artist development into one creative ecosystem.",
  ],
  [
    "Do you work with independent artists?",
    "Yes. Independent and emerging artists are central to our work, alongside labels, bands, producers, DJs and creative brands.",
  ],
  [
    "Can you help with a complete music release?",
    "Yes. We can shape the release strategy, distribution, artwork, visual content, promotion and digital rollout as one connected campaign.",
  ],
  [
    "Do you provide music distribution?",
    "Yes. We support digital delivery, metadata, release management and platform readiness across major streaming services.",
  ],
  [
    "Do you create music videos?",
    "Yes. We develop 2D, 3D, hybrid, cinematic, animated and narrative music video projects.",
  ],
  [
    "Do you offer 2D and 3D animation?",
    "Yes. Our animation work includes motion graphics, characters, environments, typography and visual effects.",
  ],
  [
    "Can you create my artist branding?",
    "Yes. We can build your visual identity, logo, creative direction, social presence and release campaign system.",
  ],
  [
    "Can you help with Spotify and SoundCloud promotion?",
    "Yes. We plan audience-focused campaigns for Spotify, SoundCloud, YouTube and the wider digital music ecosystem.",
  ],
  [
    "Do you build artist websites?",
    "Yes. We create artist websites, landing pages, link-in-bio experiences and digital profiles.",
  ],
  [
    "What is Google Knowledge Panel readiness?",
    "It is the process of improving the consistency and structure of public artist information so search engines can understand your identity more clearly.",
  ],
  [
    "Can I hire Maver for only one service?",
    "Yes. You can begin with one focused service or combine several into a complete release ecosystem.",
  ],
  [
    "How do I start a project?",
    "Use the project form below. Tell us what you are creating, what stage it is at and where you want it to go.",
  ],
] as const;

const reasons = [
  {
    icon: Layers,
    title: "Music + visuals under one roof",
    text: "Strategy, distribution, promotion, visuals and branding connected together.",
  },
  {
    icon: Headphones,
    title: "Artist-first thinking",
    text: "We build around the artist rather than forcing every project into the same template.",
  },
  {
    icon: Compass,
    title: "Creative + strategic",
    text: "Beautiful visuals should always serve the music and the artist's goals.",
  },
  {
    icon: Workflow,
    title: "Complete release ecosystem",
    text: "From artwork and Canvas to music video, promotion, distribution and social content.",
  },
  {
    icon: Globe2,
    title: "Global mindset",
    text: "We work with artists and creative projects across different markets.",
  },
  {
    icon: Handshake,
    title: "Long-term partnership",
    text: "We aim to become a creative partner artists can grow with.",
  },
] as const;

const platforms = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "SoundCloud",
  "Amazon Music",
  "TikTok",
  "Instagram",
  "Google Search",
];
const deliverableCount = services.reduce((total, service) => total + service.items.length, 0);

function EqBars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex h-6 items-end gap-[3px] ${className}`}>
      {[0.1, 0.5, 0.25, 0.7, 0.35, 0.9, 0.15].map((delay, i) => (
        <span
          key={i}
          className="eq-bar brand-gradient-bg h-full w-[3px] rounded-full"
          style={{ animationDelay: `-${delay}s` }}
        />
      ))}
    </span>
  );
}

/** Hero campaign card with a spinning record behind it; the record only shows around the card's edges. */
function HeroVisual() {
  const progress = [
    ["Artwork", 100],
    ["Music video", 72],
    ["Platform rollout", 45],
  ] as const;
  return (
    <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div
        aria-hidden="true"
        className="vinyl spin-slow absolute left-1/2 top-1/2 hidden h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 lg:block"
      >
        <div className="vinyl-sheen absolute inset-0 rounded-full" />
      </div>

      <div className="float-slow relative z-10 overflow-hidden rounded-3xl border border-foreground/10 bg-panel/95 p-6 shadow-[0_40px_90px_-30px_oklch(0_0_0/90%)] backdrop-blur-xl sm:p-7">
        <div className="brand-gradient-bg absolute inset-x-0 top-0 h-px opacity-70" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-violet/25 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Release campaign
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/15 px-2.5 py-1 text-[0.65rem] font-semibold text-brand-lilac">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lilac opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-lilac" />
            </span>
            Live
          </span>
        </div>

        <div className="relative mt-6 flex items-center gap-4 rounded-2xl border border-foreground/[0.06] bg-background/50 p-3">
          <img
            src={frequency}
            alt=""
            width={1024}
            height={1024}
            className="h-16 w-16 rounded-xl object-cover ring-1 ring-foreground/10"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg">Frequency Forms</p>
            <p className="text-xs text-muted-foreground">Single · Cover · Visualizer</p>
          </div>
          <EqBars className="mr-1 hidden sm:flex" />
        </div>

        <div className="relative mt-6 grid gap-4">
          {progress.map(([label, value]) => (
            <div key={label}>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/85">{label}</span>
                <span className="font-display text-muted-foreground">{value}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="brand-gradient-bg h-full rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass relative z-20 -mt-6 ml-4 inline-flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl lg:absolute lg:-bottom-8 lg:-left-10 lg:ml-0 lg:mt-0">
        <span className="brand-gradient-bg grid h-10 w-10 place-items-center rounded-xl">
          <Sparkles className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold">Music + visuals</span>
          <span className="block text-xs text-muted-foreground">Under one roof</span>
        </span>
      </div>
    </div>
  );
}

function Hero() {
  const stats = [
    [String(services.length), "Service disciplines"],
    [`${deliverableCount}+`, "Creative deliverables"],
    ["5", "Stage process"],
    ["360°", "Release ecosystem"],
  ] as const;
  return (
    <section id="home" className="grain relative isolate overflow-hidden pt-32 sm:pt-36">
      <img
        src={heroImage}
        alt="Artist working at a studio mixing desk"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_80%,transparent)_38%,color-mix(in_oklab,var(--background)_10%,transparent)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="aurora pointer-events-none absolute -left-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-violet/30 blur-[120px]" />
      <div className="aurora pointer-events-none absolute -right-20 bottom-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand-blue/25 blur-[120px] [animation-delay:-6s]" />
      <div className="aurora pointer-events-none absolute left-1/3 top-1/3 -z-10 h-[20rem] w-[20rem] rounded-full bg-brand-lilac/15 blur-[110px] [animation-delay:-12s]" />
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_65%)]" />

      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="grid items-center gap-12 pb-14 pt-10 lg:min-h-[68svh] lg:grid-cols-[1.2fr_.8fr] lg:pb-24">
          <div>
            <Eyebrow>Global music + creative agency</Eyebrow>
            <h1 className="mt-7 text-[clamp(2.9rem,7.4vw,6.6rem)] font-medium leading-[0.95]">
              We build the world <span className="shimmer-text">around your music.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-foreground/75 sm:text-lg">
              Music growth, distribution, visuals and branding — everything your music needs to move
              further, crafted by one connected creative team.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="editorial">
                <a href="#contact">
                  START A PROJECT <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="editorial" size="editorial">
                <a href="#work">
                  <Play className="fill-current" /> EXPLORE OUR WORK
                </a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {["Independent artists", "Labels & bands", "Producers & DJs"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-lilac" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>

        <div className="glass spotlight relative mb-10 grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map(([value, label], i) => (
            <div
              key={label}
              className={`relative z-10 p-5 transition-colors hover:bg-foreground/[0.03] sm:p-7 ${i % 2 === 0 ? "border-r border-foreground/10" : ""} ${i < 2 ? "border-b border-foreground/10 lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
            >
              <p className="brand-gradient-text font-display text-3xl font-medium sm:text-4xl">
                {value}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformMarquee() {
  return (
    <section
      aria-label="Platforms we build campaigns for"
      className="border-y border-foreground/10 bg-panel py-8"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Campaigns built for the platforms that matter
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex w-max gap-4">
          {[...platforms, ...platforms].map((name, i) => (
            <span
              key={i}
              aria-hidden={i >= platforms.length}
              className="inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.03] px-6 py-3 font-display text-lg text-foreground/70"
            >
              <span className="brand-gradient-bg h-2 w-2 rounded-full" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    {
      icon: Headphones,
      title: "We understand music",
      text: "Release cycles, platforms and audiences.",
    },
    {
      icon: Sparkles,
      title: "We understand visuals",
      text: "Film, motion, 3D, artwork and identity.",
    },
    {
      icon: Users,
      title: "We understand artists",
      text: "Your voice stays at the centre of every decision.",
    },
  ];
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={introImage}
              alt="Singer recording at a studio microphone"
              width={1104}
              height={1408}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="glass absolute -right-2 top-8 rounded-2xl p-4 shadow-xl sm:-right-6">
            <EqBars />
            <p className="mt-3 text-xs text-muted-foreground">Sound-led creative</p>
          </div>
          <div className="glass absolute bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl p-4 sm:left-6 sm:right-auto sm:max-w-xs">
            <span className="brand-gradient-bg grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-lg font-semibold">
              {services.length}
            </span>
            <p className="text-sm leading-5 text-foreground/85">
              Connected services, one creative direction.
            </p>
          </div>
          <div className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-60 w-60 rounded-full bg-brand-violet/25 blur-3xl" />
        </div>

        <div className="reveal">
          <Eyebrow>Our point of view</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02]">
            Your music. Your identity. <span className="brand-gradient-text">Your world.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Maver Music Agency helps artists transform music into complete creative experiences —
            from release strategy and distribution to visuals, animation, branding, content and
            digital presence.
          </p>
          <div className="mt-10 grid gap-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group spotlight relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-colors hover:border-brand-violet/40 hover:bg-foreground/[0.04]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-violet/15 text-brand-lilac transition-colors group-hover:bg-brand-violet/25">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [featured, ...rest] = services;
  if (!featured) return null;
  const FeaturedIcon = serviceIcons[featured.slug] ?? Sparkles;
  return (
    <section id="services" className="relative overflow-hidden bg-panel py-24 lg:py-32">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="divider-glow absolute inset-x-0 bottom-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/20 blur-[100px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Everything your music needs,{" "}
              <span className="brand-gradient-text">in one ecosystem.</span>
            </>
          }
          description="A connected creative ecosystem for building, presenting, promoting and growing music careers. Start with one service or combine several."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/services/$slug"
            params={{ slug: featured.slug }}
            className="reveal group gradient-ring relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-7 sm:col-span-2 sm:p-9"
          >
            <img
              src={releaseCampaign}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/75 to-background/10" />
            <span className="brand-gradient-bg mb-auto grid h-14 w-14 place-items-center rounded-2xl">
              <FeaturedIcon className="h-6 w-6" />
            </span>
            <span className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-brand-lilac">
              Most requested · 01
            </span>
            <h3 className="mt-3 text-3xl font-medium sm:text-4xl">{featured.title}</h3>
            <p className="mt-3 max-w-lg text-foreground/75">{featured.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {featured.items.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-foreground/15 bg-background/40 px-3 py-1 text-xs backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
              <span className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>

          {rest.map((service, index) => {
            const Icon = serviceIcons[service.slug] ?? Sparkles;
            return (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="reveal group surface spotlight relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-3xl sm:p-7"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-violet/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-violet/30" />
                <div className="relative flex shrink-0 items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-foreground/10 bg-foreground/[0.04] text-brand-lilac transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-violet group-hover:text-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="hidden font-display text-sm text-muted-foreground sm:inline">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <h3 className="text-lg font-medium sm:mt-8 sm:text-2xl">{service.title}</h3>
                  <p className="mt-0.5 text-sm leading-6 text-muted-foreground sm:mt-2">
                    {service.tagline}
                  </p>
                </div>
                <ArrowRight className="relative h-5 w-5 shrink-0 text-muted-foreground sm:hidden" />
                <div className="relative mt-6 hidden flex-wrap gap-1.5 sm:flex">
                  {service.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[0.7rem] text-foreground/75"
                    >
                      {item}
                    </span>
                  ))}
                  {service.items.length > 3 && (
                    <span className="rounded-full px-2 py-1 text-[0.7rem] text-muted-foreground">
                      +{service.items.length - 3} more
                    </span>
                  )}
                </div>
                <span className="relative mt-auto hidden items-center gap-2 pt-8 text-sm font-medium text-foreground/80 transition-colors group-hover:text-brand-lilac sm:inline-flex">
                  Explore service{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}

          {/* Closing card spans two columns so the grid ends on a full row. */}
          <a
            href="#contact"
            className="reveal group brand-gradient-bg relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl p-7 sm:col-span-2 sm:p-9 lg:flex-row lg:items-end"
          >
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                Not sure where to start?
              </p>
              <h3 className="mt-3 max-w-md text-3xl font-medium leading-tight sm:text-4xl">
                Combine services into one complete release.
              </h3>
            </div>
            <span className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform group-hover:-translate-y-0.5 lg:self-auto">
              Plan my release <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Grid spans for the work gallery: first item is featured, last item stretches so rows end full. */
function workSpan(index: number, count: number) {
  const classes: string[] = [];
  if (index === 0 && count > 1) classes.push("sm:col-span-2 lg:row-span-2");
  if (index === count - 1 && index > 0) {
    if (count % 2 === 0) classes.push("sm:col-span-2");
    const remainder = (count + 3) % 3;
    if (remainder === 1) classes.push("lg:col-span-3");
    else if (remainder === 2) classes.push("lg:col-span-2");
    else classes.push("lg:col-span-1");
  }
  return classes.join(" ");
}

function Portfolio() {
  const groups = ["All", "Film & Motion", "Design & Identity", "Campaigns"] as const;
  const [filter, setFilter] = useState<(typeof groups)[number]>("All");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const visible = useMemo(
    () => (filter === "All" ? work : work.filter((item) => item.group === filter)),
    [filter],
  );

  return (
    <section id="work" className="pb-10 pt-24 lg:pb-14 lg:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Ideas made <span className="brand-gradient-text">visible.</span>
            </>
          }
          description="Original visual studies showing the range of worlds Maver Music Agency can build around sound."
        />

        <div
          role="tablist"
          aria-label="Filter work"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={filter === group}
              onClick={() => setFilter(group)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${filter === group ? "border-transparent bg-foreground text-background" : "border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
            >
              {group}
              <span className="ml-2 text-xs opacity-60">
                {group === "All" ? work.length : work.filter((item) => item.group === group).length}
              </span>
            </button>
          ))}
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:auto-rows-[320px] sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:auto-rows-[300px] lg:grid-cols-3">
          {visible.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelected(item)}
              className={`group relative isolate h-[440px] w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-auto sm:w-auto ${workSpan(i, visible.length)}`}
            >
              <img
                src={item.image}
                alt={`${item.title} — ${item.category.toLowerCase()}`}
                width={1024}
                height={1024}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/95 via-background/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute left-5 top-5 flex gap-2">
                <span className="glass rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em]">
                  {item.category}
                </span>
              </div>
              {item.kind === "reel" && (
                <span
                  className="glass absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-violet"
                  aria-hidden="true"
                >
                  <Play className="h-4 w-4 translate-x-px fill-current" />
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className={`font-medium ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-foreground/70 transition-all duration-500 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-24 sm:group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90svh] max-w-5xl gap-0 overflow-y-auto rounded-3xl border-foreground/10 bg-panel p-0 sm:rounded-3xl md:grid-cols-2">
          {selected && (
            <>
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[480px]">
                {selected.kind === "reel" && selected.src ? (
                  <video
                    src={selected.src}
                    poster={selected.image}
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={selected.image}
                    alt=""
                    width={1024}
                    height={1024}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                {selected.kind === "reel" && !selected.src && (
                  <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-4 text-xs leading-5 text-muted-foreground">
                    Your uploaded reel will play here. Upload the MP4 or WebM file and include this
                    project title.
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="self-start rounded-full bg-brand-violet/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-lilac">
                  {selected.category}
                </span>
                <DialogTitle className="mt-5 font-display text-4xl font-medium leading-tight sm:text-5xl">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="mt-5 text-base leading-7 text-muted-foreground">
                  {selected.description}
                </DialogDescription>
                <Button asChild variant="hero" size="editorial" className="mt-9 self-start">
                  <a href="#contact" onClick={() => setSelected(null)}>
                    TALK ABOUT YOUR PROJECT <ArrowRight />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function WhyMaver() {
  const [lead, ...others] = reasons;
  const LeadIcon = lead.icon;
  return (
    <section className="bg-light-section py-24 text-light-ink lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <SectionHeading
          tone="light"
          eyebrow="Built around artists"
          title="Why artists work with Maver."
          description="We are not a template studio. Every engagement is shaped around the music, the artist and where they want to go next."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="reveal brand-gradient-bg relative overflow-hidden rounded-3xl p-8 text-foreground md:col-span-2 lg:row-span-2">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-foreground/15 backdrop-blur-md">
              <LeadIcon className="h-6 w-6" />
            </span>
            <h3 className="relative mt-16 max-w-md text-3xl font-medium leading-tight sm:text-4xl">
              {lead.title}
            </h3>
            <p className="relative mt-4 max-w-md text-foreground/85">
              {lead.text} No hand-offs between disconnected vendors — one team, one vision, one
              release world.
            </p>
            <a
              href="#contact"
              className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-light-ink transition-transform hover:-translate-y-0.5"
            >
              Work with us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          {others.map(({ icon: Icon, title, text }, i) =>
            i === others.length - 1 ? (
              // Final reason closes the bento as a full-width dark strip.
              <div
                key={title}
                className="reveal group relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-light-ink p-7 text-foreground md:col-span-2 sm:flex-row sm:items-center lg:col-span-4 lg:p-9"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-violet/30 blur-3xl" />
                <span className="brand-gradient-bg relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="relative flex-1">
                  <h3 className="text-2xl font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-foreground/70 sm:text-base">{text}</p>
                </div>
                <a
                  href="#process"
                  className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-foreground/20 px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground/10 sm:self-auto"
                >
                  See how we work <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <div
                key={title}
                className="reveal group flex gap-4 rounded-3xl border border-light-ink/10 bg-white/70 p-5 sm:block sm:p-7 shadow-[0_20px_40px_-30px_oklch(0.14_0.025_276/40%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_oklch(0.14_0.025_276/50%)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-light-ink text-brand-lilac transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold sm:mt-8 sm:text-xl">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-light-ink/65 sm:mt-3">{text}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Our approach"
          title={
            <>
              How we <span className="brand-gradient-text">work.</span>
            </>
          }
          description="A clear five-stage process that keeps creative ambition and release strategy moving together."
        />
        <ol className="relative mt-16 grid gap-4 lg:grid-cols-5">
          <span
            aria-hidden="true"
            className="brand-gradient-bg absolute left-[27px] top-7 bottom-7 w-px opacity-40 lg:left-[10%] lg:right-[10%] lg:top-[27px] lg:bottom-auto lg:h-px lg:w-auto"
          />
          {processSteps.map(([title, text], i) => (
            <li
              key={title}
              className="reveal group relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-foreground/15 bg-background font-display text-lg transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-violet group-hover:glow-violet">
                0{i + 1}
              </span>
              <div className="surface spotlight relative flex-1 rounded-2xl p-5 transition-transform duration-300 group-hover:-translate-y-1 lg:mt-6 lg:w-full">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StrategyCTA() {
  return (
    <section className="px-3 sm:px-5">
      <div className="grain relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        <img
          src={strategyImage}
          alt="Artist performing to a concert audience"
          width={1920}
          height={1008}
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="grid gap-10 px-6 py-20 sm:px-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-16 lg:py-28">
          <div className="reveal">
            <Eyebrow>Beyond the song</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.5vw,5rem)] font-medium leading-[1]">
              Your music deserves a{" "}
              <span className="brand-gradient-text">stronger visual strategy.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/75 sm:text-lg">
              Your song is only the beginning. We help build the visuals, identity, content and
              strategy that give your music somewhere to go.
            </p>
            <Button asChild variant="hero" size="editorial" className="mt-9">
              <a href="#contact">
                BUILD WITH MAVER <ArrowRight />
              </a>
            </Button>
          </div>
          <div className="reveal glass rounded-3xl p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              A complete release can include
            </p>
            <ul className="mt-5 grid gap-3">
              {[
                "Release strategy & distribution",
                "Cover art & animated artwork",
                "Music video or visualizer",
                "Social teasers & reels",
                "Promotion & press outreach",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="brand-gradient-bg grid h-6 w-6 shrink-0 place-items-center rounded-full">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const commitments = [
    {
      title: "Clear communication",
      text: "You always know what stage your project is at and what comes next.",
    },
    {
      title: "Built around your goals",
      text: "Every deliverable is measured against what you want the release to achieve.",
    },
    {
      title: "Partnership beyond launch",
      text: "We review, refine and help plan the next stage with you.",
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Perspective"
          title={
            <>
              The work <span className="brand-gradient-text">speaks first.</span>
            </>
          }
          description="We believe a strong body of work should come before borrowed credibility. Client stories are on their way — here is what every artist can expect from us."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <figure className="reveal gradient-ring surface relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <Quote className="h-12 w-12 text-brand-violet" />
            <blockquote className="mt-8 font-display text-2xl leading-snug sm:text-[2.1rem]">
              Your song is only the beginning. Our job is to build the visuals, identity and
              strategy that give your music somewhere to go — and to make sure it still sounds like
              you when it gets there.
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="brand-gradient-bg grid h-12 w-12 place-items-center rounded-full font-display font-semibold">
                M
              </span>
              <span>
                <span className="block font-semibold">Maver Music Agency</span>
                <span className="text-sm text-muted-foreground">Our promise to every artist</span>
              </span>
            </figcaption>
          </figure>
          <div className="grid gap-4">
            {commitments.map(({ title, text }, i) => (
              <div
                key={title}
                className="reveal spotlight relative flex gap-4 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-brand-violet/40"
              >
                <span className="font-display text-sm text-brand-lilac">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
            <a
              href="#contact"
              className="reveal group flex items-center justify-between gap-4 rounded-3xl border border-dashed border-brand-violet/40 p-6 transition-colors hover:bg-brand-violet/10"
            >
              <span>
                <span className="block font-medium">Your story could be here</span>
                <span className="text-sm text-muted-foreground">
                  Be one of the first artists we feature.
                </span>
              </span>
              <ArrowRight className="h-5 w-5 text-brand-lilac transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function KineticStrip() {
  const words = services.map((service) => service.title);
  const row = (outlined: boolean) =>
    [...words, ...words].map((word, i) => (
      <span key={i} aria-hidden={i >= words.length} className="flex items-center gap-8">
        <span className={outlined ? "text-outline" : "brand-gradient-text"}>{word}</span>
        <Sparkles className="h-6 w-6 shrink-0 text-brand-violet sm:h-8 sm:w-8" />
      </span>
    ));
  return (
    <section
      aria-label="Our services"
      className="overflow-hidden py-10 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-none [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="marquee flex w-max gap-8 [animation-duration:70s]">{row(false)}</div>
      <div className="marquee mt-4 flex w-max gap-8 [animation-direction:reverse] [animation-duration:80s]">
        {row(true)}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative bg-panel py-24 lg:py-32">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Answers"
            title="Frequently asked questions."
            description="Everything you need to know before starting a project with us."
          />
          <div className="surface mt-10 rounded-3xl p-7">
            <span className="brand-gradient-bg grid h-12 w-12 place-items-center rounded-2xl">
              <MessageCircle className="h-5 w-5" />
            </span>
            <p className="mt-5 font-display text-xl">Still have questions?</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Tell us about your project and we'll walk you through the right approach.
            </p>
            <Button asChild variant="editorial" size="editorial" className="mt-6">
              <a href="#contact">
                ASK US DIRECTLY <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="faq-0" className="grid gap-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem
              key={q}
              value={`faq-${i}`}
              className="rounded-2xl border border-foreground/10 bg-background/40 px-5 transition-colors data-[state=open]:border-brand-violet/40 data-[state=open]:bg-background/70 sm:px-6"
            >
              <AccordionTrigger className="gap-4 py-5 text-left font-display text-base font-medium hover:no-underline sm:text-lg [&>svg]:h-5 [&>svg]:w-5">
                <span className="flex gap-4">
                  <span className="text-sm text-brand-lilac">{String(i + 1).padStart(2, "0")}</span>
                  {q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-9 text-[0.95rem] leading-7 text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [stage, setStage] = useState("Idea");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as {
      name?: string;
      artist?: string;
    } & Record<string, string>;
    setStatus("sending");
    try {
      // FormSubmit relays the submission to the agency inbox; `email` becomes the reply-to address.
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New project inquiry — ${data.artist || data.name}`,
          _template: "table",
          _autoresponse: `Hi ${data.name}, thank you for reaching out to Maver Music Agency. We've received your project details and will get back to you soon. — Maver Music Agency · Make your sound seen.`,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean;
      } | null;
      if (!response.ok || String(result?.success) !== "true") throw new Error("Delivery failed");
      form.reset();
      setStage("Idea");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  const field =
    "mt-2 h-12 w-full rounded-xl border border-foreground/10 bg-background/60 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/25";
  const label = "text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground";

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-brand-violet/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-blue/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="surface grid overflow-hidden rounded-[2rem] lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative overflow-hidden p-8 sm:p-12">
            <div className="brand-gradient-bg absolute inset-0 opacity-[0.12]" />
            <div className="relative">
              <Eyebrow>Start a conversation</Eyebrow>
              <h2 className="mt-6 text-[clamp(2.2rem,4.5vw,3.75rem)] font-medium leading-[1.02]">
                Ready to build <span className="brand-gradient-text">what's next?</span>
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                Have a release, visual idea, campaign or artist project in mind? Bring us the music,
                the idea, or simply the vision.
              </p>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                What happens next
              </p>
              <ol className="mt-5 grid gap-4">
                {[
                  "We review your project details",
                  "We map the right services and approach",
                  "We share a clear creative direction",
                ].map((step, i) => (
                  <li key={step} className="flex items-center gap-4 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-foreground/15 bg-background/50 font-display text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group mt-10 flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/40 p-4 transition-colors hover:border-brand-violet/40"
              >
                <span className="brand-gradient-bg grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Prefer email?</span>
                  <span className="block truncate font-medium transition-colors group-hover:text-brand-lilac">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-foreground/10 bg-background/40 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand-lilac/50 hover:text-foreground"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-foreground/10 p-8 sm:p-12 lg:border-l lg:border-t-0">
            {status === "sent" ? (
              <div className="flex h-full flex-col items-start justify-center">
                <span className="brand-gradient-bg grid h-14 w-14 place-items-center rounded-2xl">
                  <Mail className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-3xl font-medium">Thanks — your project is on its way.</h3>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  We've received your details and will reply to the email address you provided.
                </p>
                <Button
                  variant="editorial"
                  size="editorial"
                  className="mt-8"
                  onClick={() => setStatus("idle")}
                >
                  SEND ANOTHER
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                {/* Honeypot: FormSubmit discards submissions where bots fill this in. */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <label className={label}>
                  Name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className={field}
                    placeholder="Your name"
                  />
                </label>
                <label className={label}>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={field}
                    placeholder="you@example.com"
                  />
                </label>
                <label className={label}>
                  Artist / brand
                  <input
                    required
                    name="artist"
                    className={field}
                    placeholder="Project or artist name"
                  />
                </label>
                <label className={label}>
                  Service
                  <select
                    required
                    name="service"
                    defaultValue=""
                    className={`${field} appearance-none invalid:text-muted-foreground/60 [&>option]:text-foreground bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option value="" disabled>
                      What do you need?
                    </option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Complete release">Complete release package</option>
                  </select>
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className={label}>Project stage</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Idea", "In production", "Ready to release", "Already released"].map(
                      (option) => (
                        <label
                          key={option}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${stage === option ? "border-transparent bg-brand-violet text-foreground" : "border-foreground/10 text-muted-foreground hover:border-foreground/30"}`}
                        >
                          <input
                            type="radio"
                            name="stage"
                            value={option}
                            checked={stage === option}
                            onChange={() => setStage(option)}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ),
                    )}
                  </div>
                </fieldset>
                <label className={`${label} sm:col-span-2`}>
                  Tell us about the project
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className={`${field} h-auto resize-none py-3`}
                    placeholder="Release date, goals, ideas and scope"
                  />
                </label>
                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground sm:col-span-2"
                  >
                    Something went wrong sending your project. Please try again, or email us
                    directly at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}
                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    No commitment — just a conversation about your music.
                  </p>
                  <Button
                    type="submit"
                    variant="hero"
                    size="editorial"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "SENDING…" : "SEND PROJECT"} <ArrowRight />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformMarquee />
        <About />
        <Services />
        <Portfolio />
        <KineticStrip />
        <WhyMaver />
        <Process />
        <StrategyCTA />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
