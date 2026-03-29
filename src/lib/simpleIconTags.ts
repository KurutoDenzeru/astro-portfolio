import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type TagOption = {
	iconHex?: string;
	iconPath?: string;
	iconSlug?: string;
	iconTitle?: string;
	label: string;
};

const simpleIconRecords = Object.values(simpleIcons).filter(
	(value): value is SimpleIcon =>
		Boolean(value) &&
		typeof value === "object" &&
		"title" in value &&
		"slug" in value &&
		"hex" in value &&
		"path" in value &&
		"svg" in value &&
		"source" in value,
);

const iconLookup = new Map<string, SimpleIcon>();

function normalizeKey(value: string) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

for (const icon of simpleIconRecords) {
	iconLookup.set(normalizeKey(icon.slug), icon);
	iconLookup.set(normalizeKey(icon.title), icon);
}

const tagAliases = new Map<string, string>([
	["ai", "googlegemini"],
	["android", "android"],
	["astro.js", "astro"],
	["aws", "amazonwebservices"],
	["c#", "dotnet"],
	["css / sass", "sass"],
	["gcloud", "googlecloud"],
	["next", "nextdotjs"],
	["next.js", "nextdotjs"],
	["node", "nodedotjs"],
	["nuxt", "nuxt"],
	["nuxt.js", "nuxt"],
	["postgresql", "postgresql"],
	["react", "react"],
	["shadcn/ui", "shadcnui"],
	["swift", "swift"],
	["tailwind", "tailwindcss"],
	["tailwindcss", "tailwindcss"],
	["typescript", "typescript"],
	["vue", "vuedotjs"],
	["vue.js", "vuedotjs"],
]);

function resolveTagIcon(tag: string) {
	const normalizedTag = normalizeKey(tag);
	const aliased = tagAliases.get(tag.toLowerCase()) ?? normalizedTag;

	return iconLookup.get(normalizeKey(aliased)) ?? iconLookup.get(normalizedTag);
}

export function resolveTagOption(tag: string): TagOption {
	const icon = resolveTagIcon(tag);

	return {
		label: tag,
		iconHex: icon?.hex,
		iconPath: icon?.path,
		iconSlug: icon?.slug,
		iconTitle: icon?.title,
	};
}

export function buildTagOptions(tags: string[]): TagOption[] {
	return tags.map((tag) => resolveTagOption(tag));
}
