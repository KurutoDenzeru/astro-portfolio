import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],

  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
});
