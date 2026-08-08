'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { ChevronUp } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const langOptions: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: 'es', label: t('lang.es'), flag: '🇨🇴', nativeName: 'Español' },
    { code: 'en', label: t('lang.en'), flag: '🇺🇸', nativeName: 'English' },
    { code: 'fr', label: t('lang.fr'), flag: '🇫🇷', nativeName: 'Français' },
  ];

  const currentLangObj = langOptions.find((l) => l.code === language) || langOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMobileMenu = (e: CustomEvent<boolean> | Event) => {
      const isOpen = (e as CustomEvent<boolean>).detail ?? false;
      setIsMobileMenuOpen(isOpen);
    };
    window.addEventListener('balkran_mobile_menu_toggle', handleMobileMenu as EventListener);
    return () => {
      window.removeEventListener('balkran_mobile_menu_toggle', handleMobileMenu as EventListener);
    };
  }, []);

  if (isMobileMenuOpen) return null;

  return (
    <div ref={dropdownRef} className="language-switcher-widget fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans select-none">
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-60 bg-[#1a2130] text-white rounded-2xl p-2 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 mb-1">
            Seleccionar Idioma / Select Language
          </div>
          <div className="space-y-1">
            {langOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  language === option.code
                    ? 'bg-[#ff5a00] text-white shadow-md'
                    : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{option.flag}</span>
                  <span>{option.nativeName}</span>
                </div>
                {option.code === 'es' && (
                  <span className="text-[9px] opacity-75 font-normal">Predeterminado</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#14171f]/95 backdrop-blur-md hover:bg-[#1f2430] text-white rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xl border border-white/20 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 group"
        aria-label="Cambiar idioma"
      >
        <span className="text-base leading-none">{currentLangObj.flag}</span>
        <span className="font-display font-extrabold text-[11px] sm:text-xs tracking-wider uppercase text-white">
          {currentLangObj.code.toUpperCase()}
        </span>
        <ChevronUp className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

    </div>
  );
}
