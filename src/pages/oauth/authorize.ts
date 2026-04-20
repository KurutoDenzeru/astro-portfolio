import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) =>
	jsonResponse(
		{
			message: "Authorization endpoint is reserved for future OAuth/OIDC integration.",
			documentation: toAbsoluteUrl("/docs/api", site),
		},
		{ status: 501 },
	);
