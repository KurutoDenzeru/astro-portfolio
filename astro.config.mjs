import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { astroImageTools } from "astro-imagetools";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({

  site: "https://example.com",
  integrations: [tailwind(), sitemap(), astroImageTools],

  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
});
