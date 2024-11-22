import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/serverless';
import deno from '@deno/astro-adapter';

// https://astro.build/config
export default defineConfig({
	site: "https://kurtcalacday.vercel.app/",
	integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
	output: 'hybrid',
	// output: 'server',
	adapter: deno({
		imageService: true,
		webAnalytics: {
			enabled: true,
		},
	}),
});
