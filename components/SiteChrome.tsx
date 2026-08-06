'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Preloader from '@/components/Preloader';
import VoltChatWidget from '@/components/VoltChatWidget';
import CartDrawer from '@/components/CartDrawer';
import ViewTracker from '@/components/ViewTracker';

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <ViewTracker />
      <Navbar />
      <LanguageSwitcher />
      {children}
      <Footer />
      <VoltChatWidget />
      <CartDrawer />
    </>
  );
}
