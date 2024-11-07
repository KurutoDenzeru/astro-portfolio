import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import { polyfill } from '@astrojs/webapi'

polyfill(globalThis)

// https://astro.build/config
export default defineConfig({
  site: "https://kurtcalacday.vercel.app/",
  integrations: [mdx(), sitemap(), solidJs(), tailwind()],
});
