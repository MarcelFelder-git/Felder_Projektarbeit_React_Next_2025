/* Globale Styles, die auf allen Seiten geladen werden.
Wenn man größere Mengen spezifischer Styles hat, kann man
auch in einzelnen page- bzw. Komponenten-Dateien css importieren.
*/
import '@/css/style.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Karla, Merriweather } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: 'Next',
  description: 'Eine Next-Website',
  icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
};

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
  themeColor: [
    { color: 'hotpink', media: '(prefers-color-scheme: light)' },
    { color: 'purple', media: '(prefers-color-scheme: dark)' },
  ],
};

const karlaStyles = Karla({
  subsets: ['latin'],
  weight: ['500', '800'],
  style: 'normal',
  display: 'swap',
  variable: '--font-karla',
});

const merriweatherStyles = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
  display: 'swap',
  variable: '--font-merriweather',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}
    >
      <body>
        <div className="site-wrapper">
          <Header />
          <div className="site-content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
