import type { CollectionEntry } from "astro:content";

type ProjectEntry = CollectionEntry<"projects">;

export type ProjectEntryWithPreview = Omit<ProjectEntry, "data"> & {
	data: ProjectEntry["data"] & {
		previewImage?: string;
	};
};

const REQUEST_HEADERS = {
	"user-agent":
		"Mozilla/5.0 (compatible; AstroPortfolioBot/1.0; +https://kurtcalacday.vercel.app)",
	accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
};

const previewCache = new Map<string, Promise<string | undefined>>();

function isGitHubUrl(url: string) {
	try {
		const { hostname } = new URL(url);
		return hostname === "github.com" || hostname === "www.github.com";
	} catch {
		return false;
	}
}

function normalizeImageUrl(imageUrl: string, sourceUrl: string) {
	try {
		return new URL(imageUrl, sourceUrl).toString();
	} catch {
		return undefined;
	}
}

function decodeHtmlAttribute(value: string) {
	return value
		.replaceAll("&amp;", "&")
		.replaceAll("&quot;", '"')
		.replaceAll("&#x27;", "'")
		.replaceAll("&#39;", "'")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">");
}

function extractMetaImage(html: string, sourceUrl: string) {
	const metaTagPattern = /<meta\s+[^>]*?>/gi;
	const contentPattern = /content\s*=\s*(['"])(.*?)\1/i;
	const attributePatterns = [
		/\bproperty\s*=\s*(['"])og:image(?::secure_url|:url)?\1/i,
		/\bname\s*=\s*(['"])twitter:image(?::src)?\1/i,
		/\bitemprop\s*=\s*(['"])image\1/i,
	];

	for (const tag of html.match(metaTagPattern) ?? []) {
		if (!attributePatterns.some((pattern) => pattern.test(tag))) continue;

		const contentMatch = tag.match(contentPattern);
		const content = contentMatch?.[2]?.trim();
		if (!content) continue;

		const normalized = normalizeImageUrl(decodeHtmlAttribute(content), sourceUrl);
		if (normalized) return normalized;
	}

	return undefined;
}

async function fetchPreviewImage(url: string) {
	const cached = previewCache.get(url);
	if (cached) return cached;

	const request = (async () => {
		try {
			const response = await fetch(url, {
				headers: REQUEST_HEADERS,
				redirect: "follow",
				signal: AbortSignal.timeout(8000),
			});

			if (!response.ok) return undefined;

			const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
			if (contentType.startsWith("image/")) return response.url;
			if (!contentType.includes("text/html")) return undefined;

			const html = await response.text();
			return extractMetaImage(html, response.url);
		} catch {
			return undefined;
		}
	})();

	previewCache.set(url, request);
	return request;
}

export async function resolveProjectPreview(entry: ProjectEntry) {
	const candidates = [entry.data.demoUrl, entry.data.repoUrl]
		.filter((url): url is string => typeof url === "string")
		.filter((url) => !isGitHubUrl(url));

	for (const candidate of candidates) {
		const image = await fetchPreviewImage(candidate);
		if (image) return image;
	}

	return entry.data.coverImage?.src;
}

export async function withProjectPreview(
	entry: ProjectEntry,
): Promise<ProjectEntryWithPreview> {
	return {
		...entry,
		data: {
			...entry.data,
			previewImage: await resolveProjectPreview(entry),
		},
	};
}

export function withProjectPreviews(entries: ProjectEntry[]) {
	return Promise.all(entries.map((entry) => withProjectPreview(entry)));
}
