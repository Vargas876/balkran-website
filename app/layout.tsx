import type { Metadata, Viewport } from 'next';
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Preloader from '@/components/Preloader';
import VoltChatWidget from '@/components/VoltChatWidget';
import CartDrawer from '@/components/CartDrawer';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
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
        url: '/assets/images/LogoBlanco.webp',
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
    images: ['/assets/images/LogoBlanco.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/images/IsotipoBlanco.png', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/assets/images/IsotipoBlanco.png',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${redHatDisplay.variable} ${redHatText.variable}`}>
      <body className="bg-[#0b0c10] text-white min-h-screen flex flex-col antialiased selection:bg-[#ff5a00] selection:text-white">
        <LanguageProvider>
          <CartProvider>
            <Preloader />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <LanguageSwitcher />
            <VoltChatWidget />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
