import { siFacebook, siReddit, siX } from "simple-icons";

export type SharePlatformId =
  | "x"
  | "linkedin"
  | "facebook"
  | "whatsapp"
  | "telegram"
  | "reddit"
  | "email";

export type SharePlatformConfig = {
  enabled: boolean;
  id: SharePlatformId;
};

export type SharePlatformDefinition = {
  getHref: (params: { title: string; summary: string; url: string }) => string;
  iconHex?: string;
  iconPath?: string;
  id: SharePlatformId;
  label: string;
  lucideIconName?: "linkedin";
  themeAwareIcon?: boolean;
};

const xIcon = siX;
const facebookIcon = siFacebook;
const redditIcon = siReddit;

export const SHARE_DIALOG_CONFIG = {
  enableNativeShare: true,
  platforms: [
    { id: "x", enabled: true },
    { id: "linkedin", enabled: true },
    { id: "facebook", enabled: true },
    { id: "reddit", enabled: true },
  ] satisfies SharePlatformConfig[],
} as const;

const sharePlatformDefinitions = {
  x: {
    id: "x",
    label: "Share on X",
    iconHex: xIcon.hex,
    iconPath: xIcon.path,
    themeAwareIcon: true,
    getHref: ({ title, url }) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  linkedin: {
    id: "linkedin",
    label: "Share on LinkedIn",
    lucideIconName: "linkedin",
    getHref: ({ title, url }) =>
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
  facebook: {
    id: "facebook",
    label: "Share on Facebook",
    iconHex: facebookIcon.hex,
    iconPath: facebookIcon.path,
    getHref: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  reddit: {
    id: "reddit",
    label: "Share on Reddit",
    iconHex: redditIcon.hex,
    iconPath: redditIcon.path,
    getHref: ({ title, url }) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
} satisfies Partial<Record<SharePlatformId, SharePlatformDefinition>>;

export function getEnabledSharePlatforms() {
  return SHARE_DIALOG_CONFIG.platforms
    .filter((platform) => platform.enabled)
    .map((platform) => sharePlatformDefinitions[platform.id])
    .filter(Boolean) as SharePlatformDefinition[];
}
