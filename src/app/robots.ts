import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', ...(process.env.ALLOW_INDEXING === 'true' ? { allow: '/' } : { disallow: '/' }) } };
}
