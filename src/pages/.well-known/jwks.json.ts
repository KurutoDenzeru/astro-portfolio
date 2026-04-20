import type { APIRoute } from "astro";
import { jsonResponse } from "../../lib/agentDiscovery";

export const GET: APIRoute = () =>
	jsonResponse({
		keys: [
			{
				kty: "RSA",
				kid: "portfolio-signing-key-1",
				use: "sig",
				alg: "RS256",
				e: "AQAB",
				n: "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiYf4_3A6wzQ8S8mE7zvwg2xA5NwX8VYqYqQJ5AZt0pOEtRjdbcQ6qVqj8QGJfV5XQ8f2Q3n8QdVnK2cVQw2qA8n9Q5_jv6JmE4sN2qO0Gz3n7qY8Qj3cVfY9bFv1tY5jQb7R2K1V5X4s2Q6dQ9Q9q7z8mFz2Pj2jL7Yjv8J2Pz2X2wM9j2q2e8m6c1L9r3W8X8k3mQ",
			},
		],
	});
