'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { totalItems, openCart } = useCart();
  const { get } = useSiteConfig();
  const whatsapp = get('whatsapp');

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lightPages = [
    '/nosotros',
    '/politica-datos-personales',
    '/garantias-y-devoluciones',
    '/terminos-y-condiciones-tienda',
    '/pqrs',
    '/certificaciones',
    '/eventos',
  ];
  const isLightHeaderPage = lightPages.some((p) => pathname === p || pathname.startsWith(p + '/'));

  const navLinks = [
    { name: t('nav.inicio'), href: '/' },
    { name: t('nav.productos'), href: '/productos' },
    { name: t('nav.nosotros'), href: '/nosotros' },
    { name: t('nav.contacto'), href: '/contacto' },
  ];

  const ayudaLinks = [
    { name: 'PREGUNTAS FRECUENTES', href: '/preguntas-frecuentes' },
    { name: 'MANUALES', href: '/manuales' },
    { name: 'GARANTÍAS Y DEVOLUCIONES', href: '/garantias-y-devoluciones' },
    { name: 'PQRS', href: '/pqrs' },
    { name: t('nav.contacto'), href: '/contacto' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-[#141824] border-b border-white/10'
            : scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md shadow-black/8 border-b border-gray-200/60'
            : isLightHeaderPage
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div
                className={`relative w-44 h-11 transition-all duration-300 group-hover:scale-105 rounded-lg ${
                  mobileMenuOpen || scrolled || isLightHeaderPage ? '' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]'
                }`}
              >
                <Image
                  src={mobileMenuOpen ? '/assets/images/LogoBlanco.webp' : (scrolled || isLightHeaderPage) ? '/assets/images/LogoGris.webp' : '/assets/images/LogoBlanco.webp'}
                  alt="BALKRAN Electric Fences"
                  fill
                  className="object-contain object-left transition-opacity duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-xs font-bold tracking-widest uppercase transition-colors hover:text-[#ff5a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a00] focus-visible:ring-offset-2 rounded-sm ${
                    isActive(link.href)
                      ? 'text-[#ff5a00] font-extrabold border-b-2 border-[#ff5a00] pb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                      : scrolled || isLightHeaderPage ? 'text-[#1a2130]' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Ayuda Dropdown */}
              <div className="relative group">
                <button
                  className={`font-display text-xs font-bold tracking-widest uppercase transition-colors hover:text-[#ff5a00] flex items-center gap-1.5 rounded-sm ${
                    ['/preguntas-frecuentes', '/manuales', '/garantias-y-devoluciones', '/pqrs'].some((p) => pathname.startsWith(p))
                      ? 'text-[#ff5a00] font-extrabold border-b-2 border-[#ff5a00] pb-1'
                      : scrolled || isLightHeaderPage ? 'text-[#1a2130]' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]'
                  }`}
                  aria-label={t('nav.ayuda')}
                >
                  {t('nav.ayuda')}
                  <svg className="w-3 h-3 fill-current opacity-70" viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-w-[240px] py-2">
                    {ayudaLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={`block px-5 py-2.5 font-display text-[11px] font-bold tracking-widest uppercase transition-colors hover:bg-orange-50 hover:text-[#ff5a00] ${
                          isActive(l.href) ? 'text-[#ff5a00]' : 'text-[#1a2130]'
                        }`}
                      >
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-xs font-bold tracking-widest uppercase transition-colors hover:text-[#ff5a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a00] focus-visible:ring-offset-2 rounded-sm ${
                    isActive(link.href)
                      ? 'text-[#ff5a00] font-extrabold border-b-2 border-[#ff5a00] pb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                      : scrolled || isLightHeaderPage ? 'text-[#1a2130]' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA, Login & Cart */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-full transition-all flex items-center justify-center border ${
                  scrolled || isLightHeaderPage
                    ? 'bg-gray-100 text-[#1a2130] hover:bg-[#ff5a00] hover:text-white border-gray-200/80 shadow-sm'
                    : 'bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-[#ff5a00] hover:border-[#ff5a00] shadow-md'
                }`}
                title="Carrito de Compras"
                aria-label="Carrito de Compras"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff5a00] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-[#ff5a00]/50 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/login"
                className={`p-2.5 rounded-full transition-all flex items-center justify-center border ${
                  scrolled || isLightHeaderPage
                    ? 'bg-gray-100 text-[#1a2130] hover:bg-[#ff5a00] hover:text-white border-gray-200/80 shadow-sm'
                    : 'bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-[#ff5a00] hover:border-[#ff5a00] shadow-md'
                }`}
                title="Iniciar Sesión"
                aria-label="Iniciar Sesión"
              >
                <User className="w-5 h-5" />
              </Link>

              <a
                href={`https://wa.me/${whatsapp}?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20sus%20energizadores`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-display text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-full shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center gap-2.5 hover:-translate-y-0.5"
              >
                <span>{t('nav.cta')}</span>
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>

            {/* Mobile Header Buttons */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-xl transition-all flex items-center justify-center border ${
                  mobileMenuOpen
                    ? 'bg-white/10 text-white border-white/20'
                    : scrolled || isLightHeaderPage
                    ? 'bg-gray-100 text-[#1a2130] border-gray-200/80 hover:bg-gray-200'
                    : 'bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-black/60 shadow-md'
                }`}
                title="Carrito de Compras"
                aria-label="Carrito de Compras"
              >
                <ShoppingCart className="w-5 h-5 text-[#ff5a00]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff5a00] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-[#ff5a00]/50">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/login"
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center border ${
                  mobileMenuOpen
                    ? 'bg-white/10 text-white border-white/20'
                    : scrolled || isLightHeaderPage
                    ? 'bg-gray-100 text-[#1a2130] border-gray-200/80 hover:bg-gray-200'
                    : 'bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-black/60 shadow-md'
                }`}
                title="Iniciar Sesión"
                aria-label="Iniciar Sesión"
              >
                <User className="w-5 h-5 text-[#ff5a00]" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                  mobileMenuOpen
                    ? 'bg-white/10 text-white border border-white/20'
                    : scrolled || isLightHeaderPage
                    ? 'bg-gray-100 text-[#1a2130] border border-gray-200/80 hover:bg-gray-200'
                    : 'bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-black/60 shadow-md'
                } hover:text-[#ff5a00]`}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen
                  ? <X className="w-6 h-6 text-[#ff5a00]" />
                  : <Menu className="w-6 h-6" />
                }
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden bg-[#141824] text-white border-b border-white/10 px-5 pt-3 pb-7 space-y-4 shadow-2xl"
            >
              <div className="flex flex-col space-y-2 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all ${
                      isActive(link.href)
                        ? 'bg-[#ff5a00] text-white shadow-md shadow-[#ff5a00]/30'
                        : 'text-white hover:text-[#ff5a00] hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <span className="font-display text-[11px] font-bold uppercase tracking-widest px-4 pt-3 pb-1 text-[#ff5a00]">
                  {t('nav.ayuda')}
                </span>
                {ayudaLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all ml-3 ${
                      isActive(l.href)
                        ? 'bg-[#ff5a00] text-white shadow-md shadow-[#ff5a00]/30'
                        : 'text-white/80 hover:text-[#ff5a00] hover:bg-white/10'
                    }`}
                  >
                    {l.name}
                  </Link>
                ))}

                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all text-[#ff5a00] bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <User className="w-4 h-4" />
                  <span>INICIAR SESIÓN</span>
                </Link>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${whatsapp}?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20sus%20energizadores`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2.5 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-95 text-white font-display text-xs font-bold tracking-wider uppercase py-3 rounded-full shadow-md shadow-[#ff5a00]/20 text-center transition-all"
                  >
                    <span>{t('nav.cta')}</span>
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ⚡ Scroll-to-top circular widget — Balkran charging energy lightning bolt */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al inicio"
        title="Volver al inicio"
        style={{
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        className="fixed bottom-20 right-6 z-50 group hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none drop-shadow-2xl"
      >
        <div className="relative w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center p-1 border border-gray-100 shadow-xl overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              {/* Dynamic vertical linear gradient for electric yellow energy fill */}
              <linearGradient id="balkranEnergyGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset={`${scrollProgress}%`} stopColor="#ffc700" />
                <stop offset={`${scrollProgress}%`} stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* Background progress ring track */}
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="4"
            />

            {/* Active circular progress ring (0-100%) in Electric Lightning Yellow */}
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="#ffc700"
              strokeWidth="5"
              strokeDasharray="270.18"
              strokeDashoffset={270.18 - (scrollProgress / 100) * 270.18}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-150 ease-out"
            />

            {/* Top Chevron ^ (With comfortable padding away from circle ring) */}
            <path
              d="M38 31 L50 21 L62 31"
              fill="none"
              stroke="#ffc700"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3D Offset Shadow for Lightning Bolt */}
            <path
              d="M52 37 L36 56 H48 L44 78 L64 54 H52 L56 37 Z"
              fill="#1a2130"
              opacity="0.85"
              transform="translate(1.5, 1.5)"
            />

            {/* Energy Charged Lightning Bolt */}
            <path
              d="M52 37 L36 56 H48 L44 78 L64 54 H52 L56 37 Z"
              fill="url(#balkranEnergyGradient)"
              stroke="#ffb800"
              strokeWidth="0.5"
              className="transition-all duration-150"
            />
          </svg>
        </div>
      </button>
    </>
  );
}
