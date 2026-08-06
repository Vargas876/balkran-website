'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Zap, UserCheck, Target, ArrowRight, 
  Mail, Phone, Wrench, Headphones, MapPin
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewport } from '@/lib/animations';

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

export default function ContactoPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f5f5f6] text-[#1a2130] font-sans overflow-hidden">
      
      {/* HERO SECTION WITH 100% BRIGHT SUNSET BUILDING BACKGROUND */}
      <section className="relative min-h-[520px] lg:min-h-[560px] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Background Image - Clean, Golden & Bright */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/PortadaContacto.webp"
            alt="Sede Balkran Electric Fences"
            fill
            className="object-cover object-center brightness-105 contrast-105"
            priority
          />
          {/* Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-1" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full text-white">
          <motion.div
            className="max-w-2xl space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            
            {/* H1 Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[58px] tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              {t('contacto.title1')} <br />
              <span className="text-[#ff5a00] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">{t('contacto.title2')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="font-display font-normal text-base sm:text-lg text-gray-100 leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              {t('contacto.subtitle')}
            </motion.p>

            {/* Features Badges */}
            <motion.div variants={fadeInUp} className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-white">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full shadow-md">
                <Zap className="w-4 h-4 text-[#ff5a00] shrink-0 fill-[#ff5a00]/30" />
                <span>{t('contacto.feat1')}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full shadow-md">
                <UserCheck className="w-4 h-4 text-[#ff5a00] shrink-0" />
                <span>{t('contacto.feat2')}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full shadow-md">
                <Target className="w-4 h-4 text-[#ff5a00] shrink-0" />
                <span>{t('contacto.feat3')}</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* OVERLAPPING MAIN CONTENT SHEET */}
      <div className="relative z-20 -mt-8 bg-[#f8fafc] rounded-t-[36px] shadow-2xl pt-16 pb-20 border-t border-white/80">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
          
          {/* SECTION 1: ¿DÓNDE NECESITAS INFORMACIÓN? */}
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-4 space-y-2">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1a2130]">
                  {t('contacto.where')}
                </h2>
                <p className="text-[#565e6e] text-sm leading-relaxed">
                  {t('contacto.whereSub')}
                </p>
              </div>

              {/* Right Column Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Colombia */}
                <a
                  href="#directorio"
                  className="bg-[#fafafa] hover:bg-white border border-gray-200/80 hover:border-[#ff5a00] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                      <Image
                        src="/assets/images/TtmJyb7HeqNzBHneJs4oEjSj3kY.webp"
                        alt="Colombia"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#1a2130]">
                        {t('contacto.colombia')}
                      </h3>
                      <p className="text-xs text-[#565e6e]">
                        {t('contacto.colombiaSub')}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#ff5a00] group-hover:text-white text-[#ff5a00] border border-gray-200 group-hover:border-[#ff5a00] flex items-center justify-center transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>

                {/* Internacional */}
                <a
                  href="#directorio"
                  className="bg-[#fafafa] hover:bg-white border border-gray-200/80 hover:border-[#ff5a00] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                      <Image
                        src="/assets/images/QRgETZvcyxTLIX4QZpIIxjInLo.webp"
                        alt="Internacional"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#1a2130]">
                        {t('contacto.intl')}
                      </h3>
                      <p className="text-xs text-[#565e6e]">
                        {t('contacto.intlSub')}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#ff5a00] group-hover:text-white text-[#ff5a00] border border-gray-200 group-hover:border-[#ff5a00] flex items-center justify-center transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>

              </div>

            </div>
          </section>

          {/* SECTION 2: ASESORES COMERCIALES */}
          <section id="directorio" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column Header */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#ff6500] inline-block"></span>
                  <span className="text-[#ff6500] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                    {t('contacto.directory')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#111111] leading-[1.1]">
                  {t('contacto.advisors')}
                </h2>
                <p className="text-[#555555] text-[15px] font-sans leading-relaxed max-w-xs">
                  {t('contacto.advisorsSub')}
                </p>
              </div>

              {/* Right Column 2x2 Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Advisor 1 */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-[#ff5a00]/40 transition-all flex flex-col justify-between space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-[#ff5a00]/90 p-0.5">
                      <Image
                        src="/assets/images/tgs1xz6VEadCARlFtXBgVos6Y0.webp"
                        alt="José Agustín González"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h3 className="font-display font-bold text-base text-[#1a2130] leading-snug">
                        José Agustín González
                      </h3>
                      <span className="text-xs font-bold text-[#ff5a00] block">
                        {t('contacto.roleSales')}
                      </span>
                      <p className="text-[11px] text-[#565e6e] leading-normal pt-1">
                        {t('contacto.advisor1Zone')}
                      </p>
                      
                      {/* Icons Row */}
                      <div className="flex items-center gap-3 pt-2">
                        <a href="mailto:ventas@cercasbalkran.com" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a href="tel:+573114508064" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/573114508064"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/30 text-[#ff5a00] bg-orange-50/30 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Advisor 2 */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-[#ff5a00]/40 transition-all flex flex-col justify-between space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-[#ff5a00]/90 p-0.5">
                      <Image
                        src="/assets/images/WK9jcmGEhfsoxbpzkBeiw38l2Uc.webp"
                        alt="Alejandro Alarcón"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h3 className="font-display font-bold text-base text-[#1a2130] leading-snug">
                        Alejandro Alarcón
                      </h3>
                      <span className="text-xs font-bold text-[#ff5a00] block">
                        {t('contacto.roleSales')}
                      </span>
                      <p className="text-[11px] text-[#565e6e] leading-normal pt-1">
                        {t('contacto.advisor2Zone')}
                      </p>
                      
                      {/* Icons Row */}
                      <div className="flex items-center gap-3 pt-2">
                        <a href="mailto:ventas@cercasbalkran.com" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a href="tel:+573114508064" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/573114508064"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/30 text-[#ff5a00] bg-orange-50/30 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Advisor 3 */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-[#ff5a00]/40 transition-all flex flex-col justify-between space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-[#ff5a00]/90 p-0.5">
                      <Image
                        src="/assets/images/F5smyks6PLeyEoYue5fdEFY114.webp"
                        alt="Jorge Iván Hernández"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h3 className="font-display font-bold text-base text-[#1a2130] leading-snug">
                        Jorge Iván Hernández
                      </h3>
                      <span className="text-xs font-bold text-[#ff5a00] block">
                        {t('contacto.roleSales')}
                      </span>
                      <p className="text-[11px] text-[#565e6e] leading-normal pt-1">
                        {t('contacto.advisor3Zone')}
                      </p>
                      
                      {/* Icons Row */}
                      <div className="flex items-center gap-3 pt-2">
                        <a href="mailto:ventas@cercasbalkran.com" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a href="tel:+573114508064" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/573114508064"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/30 text-[#ff5a00] bg-orange-50/30 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Advisor 4 */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-[#ff5a00]/40 transition-all flex flex-col justify-between space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-[#ff5a00]/90 p-0.5">
                      <Image
                        src="/assets/images/vq39pTRjk3KbeBLS9e5PGfn2OIs.webp"
                        alt="Fabian Vega"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h3 className="font-display font-bold text-base text-[#1a2130] leading-snug">
                        Fabian Vega
                      </h3>
                      <span className="text-xs font-bold text-[#ff5a00] block">
                        {t('contacto.roleDirector')}
                      </span>
                      <p className="text-[11px] text-[#565e6e] leading-normal pt-1">
                        {t('contacto.advisor4Zone')}
                      </p>
                      
                      {/* Icons Row */}
                      <div className="flex items-center gap-3 pt-2">
                        <a href="mailto:ventas@cercasbalkran.com" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a href="tel:+573114508064" className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 text-[#ff5a00] flex items-center justify-center hover:bg-[#ff5a00] hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/573114508064"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/30 text-[#ff5a00] bg-orange-50/30 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 3: SOPORTE TÉCNICO (DARK CONTAINER BANNER) */}
          <section className="bg-[#0b0f17] text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Title Column */}
              <div className="lg:col-span-4 space-y-2">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  {t('contacto.techSupport')}
                </h2>
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
                  {t('contacto.techSupportSub')}
                </span>
              </div>

              {/* Right 2 Dark Cards Column */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Service 1 */}
                <div className="bg-[#141a26] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#ff5a00]/50 transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full border-2 border-[#ff5a00] text-[#ff5a00] bg-[#ff5a00]/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-base text-white leading-snug">
                        {t('contacto.specService')}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {t('contacto.specServiceSub')}
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/573114508064"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/40 text-[#ff5a00] bg-black/40 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Service 2 */}
                <div className="bg-[#141a26] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#ff5a00]/50 transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full border-2 border-[#ff5a00] text-[#ff5a00] bg-[#ff5a00]/10 flex items-center justify-center shrink-0">
                      <Headphones className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-base text-white leading-snug">
                        {t('contacto.phoneService')}
                      </h3>
                      <div className="text-[11px] text-gray-400 space-y-0.5">
                        <p className="font-semibold text-gray-300">{t('contacto.scheduleTitle')}</p>
                        <p>{t('contacto.scheduleDays')}</p>
                        <p>{t('contacto.scheduleSat')}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="tel:+57018000112727"
                    className="w-full py-2.5 px-4 border border-[#ff5a00]/40 text-[#ff5a00] bg-black/40 hover:bg-[#ff5a00] hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    {t('contacto.contact')} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 4: ¿NECESITAS AYUDA INMEDIATA? (BOTTOM FUSED CARD BANNER) */}
          <section className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* Col 1: Help Header */}
              <div className="md:col-span-4 p-6 sm:p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-200/80 bg-[#fcfcfc]">
                <div className="w-12 h-12 rounded-full border-2 border-[#ff5a00] text-[#ff5a00] flex items-center justify-center shrink-0">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-[#565e6e] font-semibold block">
                    {t('contacto.helpImmediate')}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#1a2130]">
                    {t('contacto.callOrWrite')}
                  </h3>
                  <p className="text-[11px] text-[#565e6e]">
                    {t('contacto.readyToHelp')}
                  </p>
                </div>
              </div>

              {/* Col 2: Línea Nacional */}
              <div className="md:col-span-3 p-6 sm:p-8 space-y-1 border-b md:border-b-0 md:border-r border-gray-200/80 flex flex-col justify-center">
                <span className="text-[11px] text-[#565e6e] font-semibold block">
                  {t('contacto.nationalLine')}
                </span>
                <p className="font-display font-extrabold text-lg text-[#1a2130]">
                  01 8000 112 727
                </p>
                <div className="text-[10px] text-[#565e6e] space-y-0.5 pt-0.5">
                  <p>{t('contacto.scheduleDays')}</p>
                  <p>{t('contacto.scheduleSat')}</p>
                </div>
              </div>

              {/* Col 3: WhatsApp */}
              <div className="md:col-span-3 p-6 sm:p-8 space-y-1 border-b md:border-b-0 md:border-r border-gray-200/80 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span className="text-[11px] text-[#565e6e] font-semibold block">
                    {t('contacto.whatsappText')}
                  </span>
                </div>
                <p className="font-display font-extrabold text-lg text-[#1a2130]">
                  +57 311 450 8064
                </p>
                <p className="text-[10px] text-[#565e6e]">
                  {t('contacto.whatsappSub')}
                </p>
              </div>

              {/* Col 4: Solid Orange Card Email */}
              <div className="md:col-span-2 bg-[#ff5a00] text-white p-6 sm:p-8 flex flex-col justify-center space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-white/90 font-semibold block">
                  {t('contacto.orWrite')}
                </span>
                <a href="mailto:info@cercasbalkran.com" className="font-display font-bold text-xs hover:underline break-all">
                  info@cercasbalkran.com
                </a>
                <p className="text-[10px] text-white/80">
                  {t('contacto.emailSub')}
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 5: NUESTRA SEDE (real company data) */}
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#ff6500] inline-block"></span>
                  <span className="text-[#ff6500] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                    {t('contacto.headquarters')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111] leading-[1.1]">
                  {t('contacto.headquartersTitle')}
                </h2>
                <p className="text-[#555555] text-[15px] leading-relaxed">
                  {t('contacto.headquartersSub')}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#fafafa] border border-gray-200/80 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#1a2130]">{t('contacto.address')}</h3>
                  </div>
                  <p className="text-sm text-[#565e6e] leading-relaxed font-medium">
                    {t('contacto.addressLine1')}<br />
                    {t('contacto.addressLine2')}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold">{t('contacto.addressPostal')}</p>
                  <p className="text-xs text-gray-500 font-semibold">{t('contacto.addressNit')}</p>
                </div>

                <div className="bg-[#fafafa] border border-gray-200/80 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#1a2130]">{t('contacto.emailTitle')}</h3>
                  </div>
                  <div className="space-y-2">
                    {['info@cercasbalkran.com', 'ventas@cercasbalkran.com', 'soporte@cercasbalkran.com'].map((mail) => (
                      <a key={mail} href={`mailto:${mail}`} className="block text-sm font-semibold text-[#ff5a00] hover:underline break-all">
                        {mail}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>

    </main>
  );
}
