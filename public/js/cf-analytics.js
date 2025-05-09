// Cloudflare Web Analytics (self-hosted version)
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', '{"token": "b57650f711ec4244813b03101859b932"}');
  document.head.appendChild(script);
});