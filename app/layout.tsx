import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Balkran – Electric Fences & Energizadores para Fincas',
  description: 'Protección con toda la energía. Más de 25 años fabricando energizadores y cercas eléctricas en Colombia para el sector agropecuario.',
  keywords: 'Balkran, cercas electricas, energizadores, impulsadores, ganaderia, fincas, colombia',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/images/IsotipoBlanco.png', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/assets/images/IsotipoBlanco.png',
  },
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
