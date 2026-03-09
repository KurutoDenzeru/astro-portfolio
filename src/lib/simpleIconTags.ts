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
	["astro.js", "astro"],
	["c#", "dotnet"],
	["css / sass", "sass"],
	["next.js", "nextdotjs"],
	["nuxt.js", "nuxt"],
	["shadcn/ui", "shadcnui"],
	["tailwind", "tailwindcss"],
	["vue.js", "vuedotjs"],
]);

function resolveTagIcon(tag: string) {
	const normalizedTag = normalizeKey(tag);
	const aliased = tagAliases.get(tag.toLowerCase()) ?? normalizedTag;

	return iconLookup.get(normalizeKey(aliased)) ?? iconLookup.get(normalizedTag);
}

export function buildTagOptions(tags: string[]): TagOption[] {
	return tags.map((tag) => {
		const icon = resolveTagIcon(tag);

		return {
			label: tag,
			iconHex: icon?.hex,
			iconPath: icon?.path,
			iconSlug: icon?.slug,
			iconTitle: icon?.title,
		};
	});
}
