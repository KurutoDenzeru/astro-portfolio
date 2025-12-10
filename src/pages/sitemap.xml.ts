import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) return new Response('Site not configured', { status: 500 });

  // Static pages you want in the sitemap (keep in sync with astro.config.mjs routes)
  const staticRoutes = ['/', '/search', '/work', '/projects', '/legal'];

  // Pull project pages from content collection
  const projects = await getCollection('projects');

  const urls = [
    ...staticRoutes.map((path) => ({
      loc: new URL(path, site).href,
      lastmod: undefined,
    })),
    ...projects.map((p) => ({
      loc: new URL(`/projects/${p.slug}/`, site).href,
      lastmod: p.data.date ? new Date(p.data.date).toISOString() : undefined,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) =>
      `<url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
};
