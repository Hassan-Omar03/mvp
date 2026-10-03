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

/** Cover image for each service, used on the home grid and the service detail hero. */
export const serviceImages: Record<string, string> = {
  "music-growth": releaseCampaign,
  "music-distribution": platformLaunch,
  "music-videos": liveSignal,
  "3d-animation": visualStudy,
  "motion-design": liveWorld,
  "music-visuals": sonicArchitecture,
  "artwork-cover-design": frequency,
  "artist-branding": artistIdentity,
  "social-content": introImage,
  "dj-live-visuals": strategyImage,
  "vfx-cinematic": heroImage,
  "digital-presence": digitalPresence,
  "google-digital-identity": digitalPresence,
  "press-media": pressKit,
  "artist-development": strategyImage,
};

export const serviceImage = (slug: string) => serviceImages[slug] ?? heroImage;
