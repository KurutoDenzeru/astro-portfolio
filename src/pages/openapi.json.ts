import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) => {
	const openApiDocument = {
		openapi: "3.1.0",
		info: {
			title: "Kurt Calacday Agent Discovery API",
			version: "1.0.0",
			description:
				"Machine-readable discovery and metadata endpoints for API, OAuth/OIDC, MCP, and agent skills.",
		},
		servers: [
			{
				url: toAbsoluteUrl("/", site),
			},
		],
		paths: {
			"/.well-known/api-catalog": {
				get: {
					summary: "API catalog in linkset format",
					responses: {
						"200": {
							description: "Catalog returned as application/linkset+json",
						},
					},
				},
			},
			"/.well-known/openid-configuration": {
				get: {
					summary: "OpenID Connect discovery metadata",
					responses: {
						"200": { description: "OIDC metadata JSON" },
					},
				},
			},
			"/.well-known/oauth-authorization-server": {
				get: {
					summary: "OAuth 2.0 authorization server metadata",
					responses: {
						"200": { description: "OAuth metadata JSON" },
					},
				},
			},
			"/.well-known/oauth-protected-resource": {
				get: {
					summary: "OAuth 2.0 protected resource metadata",
					responses: {
						"200": { description: "Protected resource metadata JSON" },
					},
				},
			},
			"/.well-known/mcp/server-card.json": {
				get: {
					summary: "MCP server card",
					responses: {
						"200": { description: "MCP server card JSON" },
					},
				},
			},
			"/.well-known/agent-skills/index.json": {
				get: {
					summary: "Agent Skills index",
					responses: {
						"200": { description: "Agent Skills discovery index" },
					},
				},
			},
			"/api/health": {
				get: {
					summary: "Health status",
					responses: {
						"200": { description: "Healthy" },
					},
				},
			},
		},
	};

	return jsonResponse(openApiDocument, {
		contentType: "application/openapi+json; charset=utf-8",
	});
};
