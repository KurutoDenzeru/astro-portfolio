import type { APIContext, MiddlewareNext } from "astro";

export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
  const response = await next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  // HSTS for secure requests
  try {
    const url = new URL(context.request.url);
    if (url.protocol === 'https:') {
      response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
  } catch (e) { /* ignore */ }

  // Reporting (optional): Report-To and Report-URI can be added to receive CSP violation reports.
  // response.headers.set('Report-To', JSON.stringify({group:'default',max_age:10886400,endpoints:[{url:'https://example.com/reports'}]}));
  // response.headers.set('Report-URI', 'https://example.com/reports');

  // Basic CSP - adjust based on your needs
  const csp = [
    "default-src 'self'",
  // include 'unsafe-inline' for inline scripts (LD+JSON and small inline handlers).
  // Short-term: re-enable 'unsafe-inline' to avoid breaking existing inline scripts.
  // Long-term: move inline scripts to external files or implement per-request nonces.
  // allow data: for in-memory/script blobs used by some client libs (ClientRouter, dynamic loaders)
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://cdn.vercel-insights.com data:",
    "style-src 'self' 'unsafe-inline'", // Required for Tailwind
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://cloudflareinsights.com https://vitals.vercel-insights.com https://static.cloudflareinsights.com",
    "frame-src 'none'",
    "object-src 'none'",
    `form-action 'self' ${new URL(context.request.url).origin}`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
};
