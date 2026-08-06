'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Preloader from '@/components/Preloader';
import VoltChatWidget from '@/components/VoltChatWidget';
import CartDrawer from '@/components/CartDrawer';

export default function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Preloader />
      <Navbar />
      <LanguageSwitcher />
      <VoltChatWidget />
      <CartDrawer />
      <Footer />
    </>
  );
}
