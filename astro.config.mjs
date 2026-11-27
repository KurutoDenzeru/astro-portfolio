import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://kurtcalacday.vercel.app",

  // Serve one URL form: canonical tags, sitemap, and internal links all drop the
  // trailing slash. vercel.json enforces the redirect.
  trailingSlash: "never",

  integrations: [mdx(), react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },

  prefetch: {
    prefetchAll: true,
  },

  // Vercel Configuration
  output: "server",
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
});
