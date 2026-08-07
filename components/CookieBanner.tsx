'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const COOKIE_KEY = 'balkran_cookie_consent';

type Consent = 'accepted' | 'denied' | null;

export default function CookieBanner() {
  const { t } = useLanguage();
  const [consent, setConsent] = useState<Consent>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_KEY);
      if (saved === 'accepted' || saved === 'denied') {
        setConsent(saved);
      }
    } catch {
      // localStorage no disponible
    }
  }, []);

  const save = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      // localStorage no disponible
    }
    setConsent(value);
  };

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-[80]"
      >
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm text-[#1a2130] font-display font-bold">
                    {t('cookies.title')}
                  </p>
                  <p className="text-xs text-[#565e6e] leading-relaxed">
                    {t('cookies.description')}{' '}
                    <Link href="/politica-datos-personales" className="text-[#ff5a00] font-semibold hover:underline">
                      {t('cookies.policyLink')}
                    </Link>
                  </p>
                  {showDetails && (
                    <div className="space-y-1.5 pt-1 text-xs text-[#565e6e]">
                      <p><span className="font-bold text-[#1a2130]">Funcional:</span> {t('cookies.functional')}</p>
                      <p><span className="font-bold text-[#1a2130]">Preferencias:</span> {t('cookies.preferences')}</p>
                      <p><span className="font-bold text-[#1a2130]">Estadísticas:</span> {t('cookies.stats')}</p>
                      <p><span className="font-bold text-[#1a2130]">Marketing:</span> {t('cookies.marketing')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-4 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-[#1a2130] border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {showDetails ? t('cookies.hidePrefs') : t('cookies.showPrefs')}
                </button>
                <button
                  onClick={() => save('denied')}
                  className="px-4 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-[#1a2130] border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {t('cookies.deny')}
                </button>
                <button
                  onClick={() => save('accepted')}
                  className="px-6 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-white bg-[#ff5a00] rounded-full hover:bg-[#e04f00] transition-colors"
                >
                  {t('cookies.accept')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
