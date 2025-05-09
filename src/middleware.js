export const onRequest = async (context, next) => {
    const response = await next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Basic CSP - adjust based on your needs
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' public/js/cf-analytics.js https://cdn.vercel-insights.com",
        "style-src 'self' 'unsafe-inline'", // Required for Tailwind
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com https://vitals.vercel-insights.com",
        "frame-src 'none'",
        "object-src 'none'",
        `form-action 'self' ${new URL(context.request.url).origin}`
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);

    return response;
};