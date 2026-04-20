import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

function getCatalog(site?: URL) {
	const apiAnchor = toAbsoluteUrl("/api/health", site);

	return {
		linkset: [
			{
				anchor: apiAnchor,
				"service-desc": [
					{
						href: toAbsoluteUrl("/openapi.json", site),
						type: "application/openapi+json",
					},
				],
				"service-doc": [
					{
						href: toAbsoluteUrl("/docs/api", site),
						type: "text/html",
					},
				],
				status: [
					{
						href: toAbsoluteUrl("/api/health", site),
						type: "application/json",
					},
				],
			},
		],
	};
}

function createHeaders(site?: URL): Headers {
	const headers = new Headers({
		"Content-Type":
			'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
		"Access-Control-Allow-Origin": "*",
		"Cache-Control": "public, max-age=3600",
	});

	headers.append(
		"Link",
		`<${toAbsoluteUrl("/.well-known/api-catalog", site)}>; rel="api-catalog"; type="application/linkset+json"`,
	);

	return headers;
}

export const GET: APIRoute = ({ site }) =>
	jsonResponse(getCatalog(site), {
		headers: createHeaders(site),
		contentType:
			'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
	});

export const HEAD: APIRoute = ({ site }) =>
	new Response(null, {
		status: 200,
		headers: createHeaders(site),
	});
