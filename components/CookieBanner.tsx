'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'balkran_cookie_consent';

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_KEY);
      if (saved === 'accepted') {
        setConsent(true);
      }
    } catch {
      // localStorage no disponible
    }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(COOKIE_KEY, 'accepted');
    } catch {
      // localStorage no disponible
    }
    setConsent(true);
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
                    Gestionar el consentimiento de las cookies y políticas de privacidad.
                  </p>
                  <p className="text-xs text-[#565e6e] leading-relaxed">
                    Para ofrecer las mejores experiencias, utilizamos tecnologías como las cookies para almacenar y/o acceder a la información del dispositivo. El consentimiento de estas tecnologías nos permitirá procesar datos como el comportamiento de navegación o las identificaciones únicas en este sitio. No consentir o retirar el consentimiento, puede afectar negativamente a ciertas características y funciones.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
                <Link href="/politica-datos-personales" className="text-xs text-[#565e6e] hover:text-[#ff5a00] underline underline-offset-2 transition-colors">
                  Políticas de protección de datos personales
                </Link>
                <Link href="/terminos-y-condiciones-tienda" className="text-xs text-[#565e6e] hover:text-[#ff5a00] underline underline-offset-2 transition-colors">
                  Términos y condiciones
                </Link>
                <button
                  onClick={save}
                  className="px-6 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-white bg-[#ff5a00] rounded-full hover:bg-[#e04f00] transition-colors"
                >
                  Acepto
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
