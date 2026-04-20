import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) => {
	const endpoint = toAbsoluteUrl("/mcp", site);

	return jsonResponse(
		{
			$schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
			name: "io.kurtcalacday/portfolio-site",
			version: "1.0.0",
			title: "Kurt Calacday Portfolio",
			description:
				"Discovery metadata for the portfolio's MCP-compatible web tooling endpoint.",
			websiteUrl: toAbsoluteUrl("/", site),
			serverInfo: {
				name: "Kurt Calacday Portfolio",
				version: "1.0.0",
			},
			endpoint,
			transport: {
				type: "streamable-http",
				endpoint,
			},
			remotes: [
				{
					type: "streamable-http",
					url: endpoint,
					supportedProtocolVersions: ["2025-06-18"],
				},
			],
			capabilities: {
				tools: true,
				resources: false,
				prompts: false,
			},
		},
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers": "Content-Type",
				"Cache-Control": "public, max-age=3600",
			},
		},
	);
};

export const OPTIONS: APIRoute = () =>
	new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
