import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../lib/agentDiscovery";

const headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export const GET: APIRoute = ({ site }) =>
	jsonResponse(
		{
			status: "not-implemented",
			message: "MCP endpoint reserved for future Streamable HTTP implementation.",
			documentation: toAbsoluteUrl("/docs/api", site),
		},
		{
			status: 501,
			headers,
		},
	);

export const POST: APIRoute = ({ site }) =>
	jsonResponse(
		{
			status: "not-implemented",
			message: "MCP endpoint reserved for future Streamable HTTP implementation.",
			documentation: toAbsoluteUrl("/docs/api", site),
		},
		{
			status: 501,
			headers,
		},
	);

export const OPTIONS: APIRoute = () =>
	new Response(null, {
		status: 204,
		headers,
	});
