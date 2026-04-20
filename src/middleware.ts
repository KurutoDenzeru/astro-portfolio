import type { APIContext, MiddlewareNext } from "astro";

const AGENT_DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
];

const appendVaryHeader = (headers: Headers, value: string): void => {
  const existing = headers.get("Vary");

  if (!existing) {
    headers.set("Vary", value);
    return;
  }

  const entries = existing
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (entries.includes(value.toLowerCase())) {
    return;
  }

  headers.set("Vary", `${existing}, ${value}`);
};

const acceptsMarkdown = (request: Request): boolean => {
  const acceptHeader = request.headers.get("Accept");

  if (!acceptHeader) {
    return false;
  }

  return /(^|,)\s*text\/markdown\s*(;|,|$)/i.test(acceptHeader);
};

const decodeHtmlEntities = (value: string): string => {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(codePoint) ? "" : String.fromCodePoint(codePoint);
    }

    if (entity.startsWith("#")) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? "" : String.fromCodePoint(codePoint);
    }

    return namedEntities[entity] ?? "";
  });
};

const stripHtmlTags = (value: string): string =>
  decodeHtmlEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const htmlToMarkdown = (html: string): string => {
  let markdown = html;

  markdown = markdown
    .replace(/<!--([\s\S]*?)-->/g, "\n")
    .replace(/<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "\n");

  markdown = markdown.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level: string, content: string) => {
    const heading = stripHtmlTags(content);
    if (!heading) {
      return "\n";
    }

    return `\n${"#".repeat(Number(level))} ${heading}\n`;
  });

  markdown = markdown.replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, content: string) => {
    const text = stripHtmlTags(content) || href;
    return `[${text}](${href})`;
  });

  markdown = markdown.replace(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi, (match: string, src: string) => {
    const altMatch = match.match(/\balt=["']([^"']*)["']/i);
    const altText = altMatch ? decodeHtmlEntities(altMatch[1]) : "";
    return `![${altText}](${src})`;
  });

  markdown = markdown.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, content: string) => {
    const text = stripHtmlTags(content);
    return text ? `\n- ${text}` : "\n";
  });

  markdown = markdown.replace(/<(p|div|section|article|header|footer|main|nav|aside|blockquote|figure|figcaption|table|tr)\b[^>]*>/gi, "\n");
  markdown = markdown.replace(/<\/(p|div|section|article|header|footer|main|nav|aside|blockquote|figure|figcaption|table|tr)>/gi, "\n");
  markdown = markdown.replace(/<br\s*\/?>/gi, "\n");

  markdown = markdown.replace(/<[^>]*>/g, " ");

  markdown = decodeHtmlEntities(markdown)
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return markdown;
};

const estimateMarkdownTokens = (markdown: string): number =>
  Math.max(1, Math.ceil(markdown.length / 4));

export const onRequest = async (
  context: APIContext,
  next: MiddlewareNext,
) => {
  const response = await next();
  const isMarkdownPreferred =
    !context.isPrerendered &&
    context.request.method === "GET" &&
    acceptsMarkdown(context.request);

  let requestUrl: URL | undefined;

  try {
    requestUrl = new URL(context.request.url);
  } catch {
    requestUrl = undefined;
  }

  if (requestUrl?.pathname === "/") {
    AGENT_DISCOVERY_LINKS.forEach((linkHeader) => {
      response.headers.append("Link", linkHeader);
    });
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  const isHtmlResponse = contentType.toLowerCase().includes("text/html");

  if (isHtmlResponse) {
    appendVaryHeader(response.headers, "Accept");
  }

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );

  try {
    if (requestUrl?.protocol === "https:") {
      response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://cdn.vercel-insights.com https://app.rybbit.io data:",
      "style-src 'self' 'unsafe-inline' https://api.fonts.coollabs.io",
      "img-src 'self' data: https:",
      "font-src 'self' https://api.fonts.coollabs.io https://cdn.fonts.coollabs.io",
      "connect-src 'self' https://cloudflareinsights.com https://vitals.vercel-insights.com https://static.cloudflareinsights.com https://app.rybbit.io https://cdn.vercel-insights.com",
      "frame-src 'none'",
      "object-src 'none'",
      `form-action 'self' ${requestUrl?.origin ?? ""}`,
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);
  } catch {
    // Ignore malformed request URLs and keep the response usable.
  }

  if (isHtmlResponse && isMarkdownPreferred) {
    const html = await response.text();
    const markdown = htmlToMarkdown(html);
    const markdownHeaders = new Headers(response.headers);

    markdownHeaders.set("Content-Type", "text/markdown; charset=utf-8");
    markdownHeaders.set("x-markdown-tokens", estimateMarkdownTokens(markdown).toString());
    appendVaryHeader(markdownHeaders, "Accept");

    return new Response(markdown, {
      status: response.status,
      statusText: response.statusText,
      headers: markdownHeaders,
    });
  }

  return response;
};
