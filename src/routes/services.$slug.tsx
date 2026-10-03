import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/site";
import {
  Eyebrow,
  Footer,
  Navbar,
  processSteps,
  SectionHeading,
  serviceIcons,
} from "@/components/site/shared";
import { serviceImage } from "@/data/service-images";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData
      ? `${loaderData.title} — Maver Music Agency`
      : "Service unavailable — Maver Music Agency";
    const description =
      loaderData?.description ?? "Explore music and creative services from Maver Music Agency.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const service = Route.useLoaderData();
  const index = services.findIndex((item) => item.slug === service.slug);
  const Icon = serviceIcons[service.slug] ?? Sparkles;
  const related = [1, 2, 3].flatMap((offset) => services[(index + offset) % services.length] ?? []);
  const next = related[0];

  return (
    <>
      <Navbar onHome={false} />
      <main>
        <section className="grain relative isolate overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-44">
          <img
            src={serviceImage(service.slug)}
            alt=""
            width={1920}
            height={1088}
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-violet/25 blur-[120px]" />
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
            >
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <a href="/#services" className="transition-colors hover:text-foreground">
                Services
              </a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">{service.title}</span>
            </nav>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              <div>
                <span className="brand-gradient-bg glow-violet grid h-16 w-16 place-items-center rounded-2xl">
                  <Icon className="h-7 w-7" />
                </span>
                <h1 className="mt-8 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.98]">
                  {service.title}
                </h1>
                <p className="brand-gradient-text mt-5 font-display text-2xl sm:text-3xl">
                  {service.tagline}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/75 sm:text-lg">
                  {service.description}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" size="editorial">
                    <a href="/#contact">
                      TALK ABOUT YOUR PROJECT <ArrowRight />
                    </a>
                  </Button>
                  <Button asChild variant="editorial" size="editorial">
                    <a href="/#services">
                      <ArrowLeft /> ALL SERVICES
                    </a>
                  </Button>
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  At a glance
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-foreground/[0.04] p-4">
                    <dt className="text-xs text-muted-foreground">Deliverables</dt>
                    <dd className="brand-gradient-text mt-1 font-display text-3xl">
                      {service.items.length}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-foreground/[0.04] p-4">
                    <dt className="text-xs text-muted-foreground">Service</dt>
                    <dd className="brand-gradient-text mt-1 font-display text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Available on its own or as part of a complete release ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <SectionHeading
              eyebrow="What we deliver"
              title={
                <>
                  Built around the music.{" "}
                  <span className="brand-gradient-text">Shaped for the artist.</span>
                </>
              }
              description="Every deliverable is designed to work with the rest of your release — not as an isolated asset."
            />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {service.items.map((item, i) => (
                <div
                  key={item}
                  className="reveal group surface spotlight relative overflow-hidden rounded-2xl p-4 transition-all sm:rounded-3xl sm:p-6 duration-300 hover:-translate-y-1 hover:border-brand-violet/40"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-violet/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-violet/30" />
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-violet/15 text-brand-lilac">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-display text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-base font-medium leading-snug sm:mt-8 sm:text-xl">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-panel py-20 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <SectionHeading
              align="center"
              eyebrow="How it works"
              title="From first call to launch."
            />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map(([title, text], i) => (
                <li
                  key={title}
                  className="reveal rounded-3xl border border-foreground/10 bg-background/40 p-6"
                >
                  <span className="brand-gradient-bg grid h-10 w-10 place-items-center rounded-full font-display text-sm">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Pairs well with</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-tight">
                  Related services
                </h2>
              </div>
              {next && (
                <Link
                  to="/services/$slug"
                  params={{ slug: next.slug }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-lilac hover:underline"
                >
                  Next: {next.title} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((item) => {
                const RelatedIcon = serviceIcons[item.slug] ?? Sparkles;
                return (
                  <Link
                    key={item.slug}
                    to="/services/$slug"
                    params={{ slug: item.slug }}
                    className="group surface spotlight relative flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-foreground/10 bg-foreground/[0.04] text-brand-lilac transition-all group-hover:bg-brand-violet group-hover:text-foreground">
                        <RelatedIcon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-foreground" />
                    </div>
                    <h3 className="mt-8 text-2xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer onHome={false} />
    </>
  );
}
