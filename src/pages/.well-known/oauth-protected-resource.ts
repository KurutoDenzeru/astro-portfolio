import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) => {
	const issuer = toAbsoluteUrl("/", site).replace(/\/$/, "");

	return jsonResponse({
		resource: toAbsoluteUrl("/api", site),
		authorization_servers: [issuer],
		scopes_supported: ["portfolio.read"],
		bearer_methods_supported: ["header"],
		resource_documentation: toAbsoluteUrl("/docs/api", site),
	});
};
