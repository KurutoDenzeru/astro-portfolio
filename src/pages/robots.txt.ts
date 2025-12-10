import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
	if (!site) return new Response('Site not configured', { status: 500 });

	const sitemapUrl = new URL('/sitemap.xml', site).href;

	const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}`;

	return new Response(robots, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	});
};