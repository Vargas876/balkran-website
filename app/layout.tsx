import type { Metadata, Viewport } from 'next';
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { getSiteConfigCached } from '@/lib/site-config';
import { getSiteUrl } from '@/lib/site';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-redhat-display',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-redhat-text',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Balkran – Electric Fences & Energizadores para Fincas',
    template: '%s | Balkran',
  },
  description: 'Protección con toda la energía. Más de 25 años fabricando energizadores y cercas eléctricas en Colombia para el sector agropecuario.',
  keywords: 'Balkran, cercas electricas, energizadores, impulsadores, ganaderia, fincas, colombia',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteUrl,
    siteName: 'Balkran',
    title: 'Balkran – Electric Fences & Energizadores para Fincas',
    description: 'Protección con toda la energía. Más de 25 años fabricando energizadores y cercas eléctricas en Colombia para el sector agropecuario.',
    images: [
      {
        url: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/LogoBlanco.webp',
        width: 512,
        height: 512,
        alt: 'Balkran Tecnología e Innovación',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balkran – Electric Fences & Energizadores para Fincas',
    description: 'Protección con toda la energía. Más de 25 años fabricando energizadores y cercas eléctricas en Colombia.',
    images: ['https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/LogoBlanco.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/IsotipoBlanco.webp', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/IsotipoBlanco.webp',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff5a00',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfigCached();
  return (
    <html lang="es" className={`${redHatDisplay.variable} ${redHatText.variable}`}>
      <body className="bg-[#0b0c10] text-white min-h-screen flex flex-col antialiased selection:bg-[#ff5a00] selection:text-white">
        <SiteConfigProvider config={siteConfig}>
          <LanguageProvider>
            <CartProvider>
              <SiteChrome>
                <main className="flex-1">{children}</main>
              </SiteChrome>
            </CartProvider>
          </LanguageProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
