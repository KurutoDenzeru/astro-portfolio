import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

const NOT_IMPLEMENTED_PAYLOAD = {
	error: "unsupported_grant_type",
	error_description:
		"Token endpoint is reserved for future OAuth/OIDC integration.",
};

export const GET: APIRoute = ({ site }) =>
	jsonResponse(
		{
			...NOT_IMPLEMENTED_PAYLOAD,
			documentation: toAbsoluteUrl("/docs/api", site),
		},
		{ status: 501 },
	);

export const POST: APIRoute = ({ site }) =>
	jsonResponse(
		{
			...NOT_IMPLEMENTED_PAYLOAD,
			documentation: toAbsoluteUrl("/docs/api", site),
		},
		{ status: 501 },
	);
