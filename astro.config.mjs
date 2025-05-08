import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { onRequest } from './src/middleware';

// https://astro.build/config
export default defineConfig({
  site: "https://kurtcalacday.vercel.app/",

  // "trailingSlash": 'never',
  // output: 'static',
  // security: {
  // 	checkOrigin: true,
  // },
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],

  server: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block"
    }
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