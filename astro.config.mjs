import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import "core-js/stable";
import "regenerator-runtime/runtime";

// https://astro.build/config
export default defineConfig({
  site: "https://kurtcalacday.vercel.app/",
  integrations: [mdx(), sitemap(), solidJs(), tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  server: {
    host: true
  }
});
