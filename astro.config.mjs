import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://kurtcalacday.vercel.app",

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

  // Security Headers
  server: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    },
  },

  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com https://vitals.vercel-insights.com https://static.cloudflareinsights.com https://app.rybbit.io https://cdn.vercel-insights.com",
        "frame-src 'none'",
        "object-src 'none'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "'unsafe-inline'",
          "https://static.cloudflareinsights.com",
          "https://cdn.vercel-insights.com",
          "https://app.rybbit.io",
          "data:",
        ],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
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
