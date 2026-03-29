import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

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

const simpleIconRecords = Object.values(simpleIcons).filter(
	(value): value is SimpleIcon =>
		Boolean(value) &&
		typeof value === "object" &&
		"title" in value &&
		"slug" in value &&
		"hex" in value &&
		"path" in value,
);

function normalizeKey(value: string) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const iconLookup = new Map<string, SimpleIcon>();

for (const icon of simpleIconRecords) {
	iconLookup.set(normalizeKey(icon.slug), icon);
	iconLookup.set(normalizeKey(icon.title), icon);
}

function getShareIcon(key: string) {
	const icon = iconLookup.get(normalizeKey(key));

	if (!icon) {
		throw new Error(`Missing simple icon for ${key}`);
	}

	return icon;
}

const xIcon = getShareIcon("x");
const facebookIcon = getShareIcon("facebook");
const redditIcon = getShareIcon("reddit");

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
		getHref: ({ url }) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
	},
	facebook: {
		id: "facebook",
		label: "Share on Facebook",
		iconHex: facebookIcon.hex,
		iconPath: facebookIcon.path,
		getHref: ({ url }) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
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
