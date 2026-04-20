import type { APIContext } from "astro";

const FALLBACK_ORIGIN = "https://kurtcalacday.vercel.app";

export function getSiteBaseUrl(site?: APIContext["site"]): URL {
	if (site instanceof URL) {
		return site;
	}

	return new URL(FALLBACK_ORIGIN);
}

export function toAbsoluteUrl(pathname: string, site?: APIContext["site"]): string {
	return new URL(pathname, getSiteBaseUrl(site)).toString();
}

export function jsonResponse(
	payload: unknown,
	options?: {
		status?: number;
		headers?: HeadersInit;
		contentType?: string;
	},
): Response {
	const status = options?.status ?? 200;
	const contentType = options?.contentType ?? "application/json; charset=utf-8";
	const headers = new Headers(options?.headers);

	if (!headers.has("Content-Type")) {
		headers.set("Content-Type", contentType);
	}

	return new Response(JSON.stringify(payload, null, 2), {
		status,
		headers,
	});
}
