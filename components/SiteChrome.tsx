'use client';

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Preloader from '@/components/Preloader';
import CartDrawer from '@/components/CartDrawer';
import ViewTracker from '@/components/ViewTracker';
import CookieBanner from '@/components/CookieBanner';

const VoltChatWidget = dynamic(
  () => import('@/components/VoltChatWidget').then((m) => m.default),
  { ssr: false }
);

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
      <CookieBanner />
    </>
  );
}
