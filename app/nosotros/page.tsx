'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, Award, Building2, Zap, 
  Target, Eye, FlaskConical, Cpu, Headphones,
  Sparkles, Compass, Smile, Scale, ArrowRight, Heart
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewport } from '@/lib/animations';

export default function NosotrosPage() {
  const { t } = useLanguage();

  const principios = [
    {
      titleKey: 'nosotros.p1Title',
      descKey: 'nosotros.p1Desc',
      icon: Heart,
      bg: 'bg-rose-50 border-rose-200 text-rose-500',
    },
    {
      titleKey: 'nosotros.p2Title',
      descKey: 'nosotros.p2Desc',
      icon: Sparkles,
      bg: 'bg-amber-50 border-amber-200 text-amber-500',
    },
    {
      titleKey: 'nosotros.p3Title',
      descKey: 'nosotros.p3Desc',
      icon: Smile,
      bg: 'bg-cyan-50 border-cyan-200 text-cyan-600',
    },
    {
      titleKey: 'nosotros.p4Title',
      descKey: 'nosotros.p4Desc',
      icon: Compass,
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    },
    {
      titleKey: 'nosotros.p5Title',
      descKey: 'nosotros.p5Desc',
      icon: Scale,
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    },
  ];

  const objetivosCalidadKeys = [
    'nosotros.obj1',
    'nosotros.obj2',
    'nosotros.obj3',
    'nosotros.obj4',
    'nosotros.obj5',
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center pt-24 pb-10 bg-white overflow-hidden border-b border-gray-100">
        
        <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full z-0">
          <Image
            src="/assets/images/7HdVerwkKK2fDdeCjvLSGTPJzdo.webp"
            alt="BALKRAN INC S.A.S. BIC Campo y Colinas"
            fill
            className="object-cover object-left lg:object-center brightness-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 lg:via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <motion.div
            className="max-w-2xl space-y-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            
            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
              <span className="bg-orange-50 text-[#ff5a00] border border-orange-200/80 font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                BALKRAN INC S.A.S. BIC
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-display text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t('nosotros.bicBadge')}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08] text-[#111111]">
              {t('nosotros.heroTitle1')} <br />
              <span className="text-[#ff5a00]">{t('nosotros.heroTitle2')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="font-display text-base sm:text-lg text-[#565e6e] font-normal leading-relaxed max-w-xl">
              {t('nosotros.heroDesc')}
            </motion.p>

            {/* 4 STATS */}
            <motion.div variants={fadeInUp} className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-200/80 w-full">
              
              <div className="space-y-0.5 pr-2">
                <Building2 className="w-4 h-4 text-[#ff5a00] mb-1" />
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130]">2000</p>
                <p className="text-[11px] text-[#565e6e] font-medium leading-snug">{t('nosotros.stat1Label')}</p>
              </div>

              <div className="space-y-0.5 px-2 border-l border-gray-200/80">
                <Award className="w-4 h-4 text-[#ff5a00] mb-1" />
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130]">{t('nosotros.stat2Val')}</p>
                <p className="text-[11px] text-[#565e6e] font-medium leading-snug">{t('nosotros.stat2Label')}</p>
              </div>

              <div className="space-y-0.5 px-2 border-l border-gray-200/80">
                <ShieldCheck className="w-4 h-4 text-[#ff5a00] mb-1" />
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130]">ISO 9001</p>
                <p className="text-[11px] text-[#565e6e] font-medium leading-snug">{t('nosotros.stat3Label')}</p>
              </div>

              <div className="space-y-0.5 pl-2 border-l border-gray-200/80">
                <Zap className="w-4 h-4 text-[#ff5a00] mb-1" />
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130]">RETIE / IEC</p>
                <p className="text-[11px] text-[#565e6e] font-medium leading-snug">{t('nosotros.stat4Label')}</p>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 2. QUIÉNES SOMOS */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
                {t('nosotros.whoBadge')}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] leading-tight">
                BALKRAN INC S.A.S. BIC
              </h2>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed font-normal">
                {t('nosotros.whoDesc1')}
              </p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed font-normal">
                {t('nosotros.whoDesc2')}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-orange-50/80 border border-orange-100 p-3 rounded-2xl text-center">
                  <span className="font-display font-extrabold text-base sm:text-lg text-[#ff5a00] block">{t('nosotros.pill1Val')}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t('nosotros.pill1Label')}</span>
                </div>
                <div className="bg-orange-50/80 border border-orange-100 p-3 rounded-2xl text-center">
                  <span className="font-display font-extrabold text-base sm:text-lg text-[#ff5a00] block">{t('nosotros.pill2Val')}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t('nosotros.pill2Label')}</span>
                </div>
                <div className="bg-orange-50/80 border border-orange-100 p-3 rounded-2xl text-center">
                  <span className="font-display font-extrabold text-base sm:text-lg text-[#ff5a00] block">{t('nosotros.pill3Val')}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{t('nosotros.pill3Label')}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/assets/images/confecamaras_balkran.webp"
                  alt="Equipo BALKRAN en Evento Confecámaras Sociedades BIC"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-md flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="relative w-36 h-8">
                      <Image
                        src="/assets/images/U8LFRrUZtP2kBLhJTaqAU2t8sw.webp"
                        alt="Balkran Logo Oficial"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-gray-500">{t('nosotros.imgCaption')}</p>
                  </div>
                  <div className="relative w-20 h-12 shrink-0">
                    <Image
                      src="/assets/images/sociedades_bic.webp"
                      alt="Sociedad BIC Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Historia corporativa */}
          <div className="bg-[#fff7f0] border border-orange-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#ff5a00]" />
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">
                {t('nosotros.histTitle')}
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs sm:text-sm text-[#565e6e] leading-relaxed">
              <div className="lg:col-span-6 space-y-2">
                <p>{t('nosotros.histP1')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('nosotros.histP2') }} />
              </div>
              <div className="lg:col-span-6 space-y-2">
                <p dangerouslySetInnerHTML={{ __html: t('nosotros.histP3') }} />
                <div className="flex items-center gap-2 text-[#ff5a00] font-bold pt-1">
                  <Award className="w-4 h-4" />
                  <span>{t('nosotros.histPatent')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISIÓN Y VISIÓN */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-4 border-orange-100 shadow-lg items-center justify-center z-20">
            <Zap className="w-7 h-7 text-[#ff5a00] fill-[#ff5a00]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                  {t('nosotros.misionTitle')}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed font-medium">
                {t('nosotros.misionDesc')}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                    {t('nosotros.visionTitle')}
                  </h3>
                  <span className="text-[11px] font-bold text-[#ff5a00] uppercase tracking-wider">{t('nosotros.visionMeta')}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed font-medium">
                {t('nosotros.visionDesc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. POLÍTICA Y OBJETIVOS DE CALIDAD */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
              {t('nosotros.qualBadge')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111]">
              {t('nosotros.qualTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-7 bg-[#fcfcfc] border border-gray-200/90 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#ff5a00]" />
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">
                    {t('nosotros.qualPolTitle')}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed">
                  {t('nosotros.qualPolP1')}
                </p>
                <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed">
                  {t('nosotros.qualPolP2')}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200/60 text-xs text-gray-500 font-medium">
                {t('nosotros.qualPolFooter')}
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-5 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#ff5a00]" />
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {t('nosotros.qualObjTitle')}
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-300 font-medium">
                  {objetivosCalidadKeys.map((key, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#ff5a00] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-orange-400 font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t('nosotros.qualObjFooter')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRINCIPIOS CORPORATIVOS */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
              {t('nosotros.princBadge')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111]">
              {t('nosotros.princTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {principios.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200/80 rounded-2xl p-5 space-y-3 hover:border-orange-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="space-y-2.5 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl border ${p.bg} flex items-center justify-center shadow-xs`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-base text-[#111111]">
                      {t(p.titleKey)}
                    </h3>
                    <p className="text-xs text-[#565e6e] leading-relaxed font-medium">
                      {t(p.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TECNOLOGÍA QUE PROTEGE */}
      <section className="relative py-16 bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/ofbdQ7Cix9FTbmI48pL8kOH2SY.webp"
            alt="Soluciones diseñadas para el campo"
            fill
            className="object-cover opacity-65 brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/65" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
              {t('nosotros.techBadge')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
              {t('nosotros.techTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="flex gap-4 items-start pr-6 md:border-r border-white/20">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-[#ff5a00]/40 text-[#ff5a00] flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {t('nosotros.tItem1Title')}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('nosotros.tItem1Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start px-0 md:px-6 md:border-r border-white/20">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-[#ff5a00]/40 text-[#ff5a00] flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {t('nosotros.tItem2Title')}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('nosotros.tItem2Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start pl-0 md:pl-6">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-[#ff5a00]/40 text-[#ff5a00] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {t('nosotros.tItem3Title')}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('nosotros.tItem3Desc')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. DETRÁS DE BALKRAN */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
                {t('nosotros.teamBadge')}
              </span>
              
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1a2130] leading-tight">
                {t('nosotros.teamTitle1')} <br />
                <span className="text-[#ff5a00]">{t('nosotros.teamTitle2')}</span>
              </h2>

              <p className="text-sm text-[#565e6e] leading-relaxed">
                {t('nosotros.teamDesc')}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/assets/images/equipo_balkran.webp"
                  alt="Detrás de Balkran - Equipo de Trabajo Completo"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section className="relative py-10 sm:py-12 bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/vacas_potrero.webp"
            alt="Ganado en potreros protegidos por Cercas Balkran"
            fill
            className="object-cover opacity-65 brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="bg-[#ff5a00] text-white px-3 py-1 rounded-full text-[11px] font-bold font-display uppercase tracking-wider inline-block shadow-md">
            {t('nosotros.ctaBadge')}
          </span>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            {t('nosotros.ctaTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 font-medium max-w-xl mx-auto leading-snug">
            {t('nosotros.ctaDesc')}
          </p>

          <div className="pt-1">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all uppercase tracking-wider"
            >
              <span>{t('nosotros.ctaBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
