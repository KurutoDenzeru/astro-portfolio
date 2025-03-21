import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://kurtcalacday.vercel.app/",
	integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
	"trailingSlash": 'never',
	output: 'server',
	security: {
		checkOrigin: true,
	},
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp'
		}
	},
});
