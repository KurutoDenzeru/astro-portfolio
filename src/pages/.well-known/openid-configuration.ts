import type { APIRoute } from "astro";
import { jsonResponse, toAbsoluteUrl } from "../../lib/agentDiscovery";

export const GET: APIRoute = ({ site }) => {
	const issuer = toAbsoluteUrl("/", site).replace(/\/$/, "");

	return jsonResponse({
		issuer,
		authorization_endpoint: toAbsoluteUrl("/oauth/authorize", site),
		token_endpoint: toAbsoluteUrl("/oauth/token", site),
		jwks_uri: toAbsoluteUrl("/.well-known/jwks.json", site),
		grant_types_supported: [
			"authorization_code",
			"refresh_token",
			"client_credentials",
		],
		response_types_supported: ["code"],
		scopes_supported: ["openid", "profile", "portfolio.read"],
		token_endpoint_auth_methods_supported: ["client_secret_post"],
		subject_types_supported: ["public"],
		id_token_signing_alg_values_supported: ["RS256"],
		service_documentation: toAbsoluteUrl("/docs/api", site),
	});
};
