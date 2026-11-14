/** Netlify provides these origins for production, branch and preview builds. */
export function configuredSiteOrigins(): string[] {
  return [...new Set([
    process.env.SITE_URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.URL,
  ].filter((value): value is string => Boolean(value?.trim())).map(value => {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Site URL must use HTTP or HTTPS');
    return url.origin;
  }))];
}

export function publicSiteOrigin(): string {
  return configuredSiteOrigins()[0] || 'http://localhost:3000';
}

export function acceptsRequestOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const configured = configuredSiteOrigins();
  if (configured.length) return configured.includes(origin);
  const url = new URL(request.url);
  // For local Next servers the bind address can differ from the browser's Host.
  return origin === `${url.protocol}//${request.headers.get('host') || url.host}`;
}
