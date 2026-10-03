import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maver Music Agency — Music Growth & Creative" },
      { name: "description", content: "Maver Music Agency helps artists grow, distribute and visually define their music through promotion, videos, branding and creative strategy." },
      { property: "og:title", content: "Maver Music Agency — Music Growth & Creative" },
      { property: "og:description", content: "Music growth, distribution, visuals, branding and artist development — built around your music." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});
