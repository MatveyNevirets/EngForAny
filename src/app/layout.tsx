import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import './globals.css';
import { demoContent } from '@/lib/studio-data';

const allowIndexing = process.env.ALLOW_INDEXING === 'true';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: demoContent.metadata.title,
  description: demoContent.metadata.description,
  robots: { index: allowIndexing, follow: allowIndexing },
  openGraph: { title: demoContent.metadata.title, description: demoContent.metadata.description, locale: 'ru_RU', type: 'website', siteName: 'Студия английского' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FFF8EE' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main">Перейти к содержимому</a>{children}</body></html>;
}
