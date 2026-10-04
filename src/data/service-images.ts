// Service cover photos from Unsplash (free for commercial use under the Unsplash License).
import heroImage from "@/assets/maver-hero.jpg";
import musicGrowth from "@/assets/services/music-growth.jpg";
import musicDistribution from "@/assets/services/music-distribution.jpg";
import musicVideos from "@/assets/services/music-videos.jpg";
import animation3d from "@/assets/services/3d-animation.jpg";
import motionDesign from "@/assets/services/motion-design.jpg";
import musicVisuals from "@/assets/services/music-visuals.jpg";
import artworkCoverDesign from "@/assets/services/artwork-cover-design.jpg";
import artistBranding from "@/assets/services/artist-branding.jpg";
import socialContent from "@/assets/services/social-content.jpg";
import djLiveVisuals from "@/assets/services/dj-live-visuals.jpg";
import vfxCinematic from "@/assets/services/vfx-cinematic.jpg";
import digitalPresence from "@/assets/services/digital-presence.jpg";
import googleDigitalIdentity from "@/assets/services/google-digital-identity.jpg";
import pressMedia from "@/assets/services/press-media.jpg";
import artistDevelopment from "@/assets/services/artist-development.jpg";

/** Cover image for each service, used on the home grid and the service detail hero. */
export const serviceImages: Record<string, string> = {
  "music-growth": musicGrowth,
  "music-distribution": musicDistribution,
  "music-videos": musicVideos,
  "3d-animation": animation3d,
  "motion-design": motionDesign,
  "music-visuals": musicVisuals,
  "artwork-cover-design": artworkCoverDesign,
  "artist-branding": artistBranding,
  "social-content": socialContent,
  "dj-live-visuals": djLiveVisuals,
  "vfx-cinematic": vfxCinematic,
  "digital-presence": digitalPresence,
  "google-digital-identity": googleDigitalIdentity,
  "press-media": pressMedia,
  "artist-development": artistDevelopment,
};

export const serviceImage = (slug: string) => serviceImages[slug] ?? heroImage;
