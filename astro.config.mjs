import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import { onRequest } from "./src/middleware";

// https://astro.build/config
export default defineConfig({
	site: "https://kurtcalacday.vercel.app",

	// "trailingSlash": 'never',
	// output: 'static',
	// security: {
	// 	checkOrigin: true,
	// },
	integrations: [
		mdx(),
		sitemap(),
		solidJs(),
		tailwind({ applyBaseStyles: false }),
	],

	server: {
		headers: {
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "SAMEORIGIN",
			"X-XSS-Protection": "1; mode=block",
			"Strict-Transport-Security":
				"max-age=63072000; includeSubDomains; preload",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Permissions-Policy": "geolocation=(), microphone=(), camera=()",
			"Content-Security-Policy":
				"default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';",
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Resource-Policy": "same-origin",
		},
	},

	output: "server",
	adapter: vercel({
		imageService: true,
		webAnalytics: {
			enabled: true,
		},
		middleware: { onRequest },
	}),
});
