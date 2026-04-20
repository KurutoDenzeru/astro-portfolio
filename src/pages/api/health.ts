import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) =>
	jsonResponse({
		status: "ok",
		service: "portfolio-agent-discovery",
		updatedAt: new Date().toISOString(),
		documentation: toAbsoluteUrl("/docs/api", site),
	});
