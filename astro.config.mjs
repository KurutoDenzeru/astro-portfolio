import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site: "https://kurtcalacday.vercel.app/",
	integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
	output: 'hybrid',
	adapter: vercel({
		imageService: true,
		webAnalytics: {
			enabled: true,
		},
		buildOptions: {
			splitting: true,
			fallback: '404.astro' // Add fallback page
		},
		routes: [
			{ handle: 'filesystem' },
			{ src: '/(.*)', dest: '/404.astro', status: 404 }
		]
	}),
	"trailingSlash": 'never',
	vite: {
		build: {
			target: 'esnext'
		}
	}
});
