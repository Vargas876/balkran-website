'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, MapPin, ArrowRight, ShieldCheck, 
  CheckCircle2, ChevronRight, Award, Zap, Quote
} from 'lucide-react';
import { historias } from '@/lib/historias';
import { useLanguage } from '@/context/LanguageContext';
import { pick } from '@/lib/i18n';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    heroBadge: 'Confianza que viene del campo',
    heroTitle1: 'Historias reales,',
    heroTitle2: 'resultados reales',
    heroSub:
      'Descubre cómo productores agrícolas y ganaderos de toda Latinoamérica confían en la potencia y durabilidad de los energizadores Balkran para proteger su patrimonio, ganado y cosechas.',
    heroStat1V: '450+ ha',
    heroStat1Label: 'Áreas en rotación continua',
    heroStat2V: '100%',
    heroStat2Label: 'Autonomía solar 24/7',
    heroStat3V: '+12 Países',
    heroStat3Label: 'Presencia en Latinoamérica',
    heroStat4V: '0',
    heroStat4Label: 'Incidentes o lesiones registradas',
    sectionTag: 'Casos de éxito destacados',
    sectionTitle: 'Experiencias de nuestros productores',
    sectionSub:
      'Cada terreno tiene un desafío único. Conoce la solución Balkran aplicada a cada tipo de suelo y ganado.',
    clienteLabel: 'Cliente:',
    readMore: 'Leer historia completa',
    ctaBadge: '¿Quieres la misma seguridad para tu finca?',
    ctaTitle: 'Recibe asesoría técnica personalizada para tu proyecto perimetral',
    ctaSub:
      'Nuestros asesores expertos dimensionan la potencia exacta de tu energizador Balkran de acuerdo a tus hectáreas, tipo de suelo y ganado.',
    ctaBtn: 'Habla con un experto',
    ctaBtnProducts: 'Ver catálogo de productos',
  },
  en: {
    heroBadge: 'Trust that comes from the field',
    heroTitle1: 'Real stories,',
    heroTitle2: 'real results',
    heroSub:
      'Discover how agricultural producers and ranchers across Latin America trust the power and durability of Balkran energizers to protect their assets, livestock and crops.',
    stat1Val: '450+ ha',
    stat1Label: 'Areas in continuous rotation',
    stat2Val: '100%',
    stat2Label: '24/7 solar autonomy',
    stat3Val: '+12 Countries',
    stat3Label: 'Presence across Latin America',
    stat4Val: '0',
    stat4Label: 'Incidents or recorded injuries',
    sectionTag: 'Featured success stories',
    sectionTitle: 'Experiences of our producers',
    sectionSub:
      'Every piece of land faces a unique challenge. Discover the Balkran solution applied to each type of soil and livestock.',
    clienteLabel: 'Client:',
    readMore: 'Read the full story',
    ctaBadge: 'Want the same security for your farm?',
    ctaTitle: 'Get personalized technical advice for your perimeter project',
    ctaSub:
      'Our expert advisors size the exact power of your Balkran energizer according to your hectares, soil type and livestock.',
    ctaBtn: 'Talk to an expert',
    ctaBtnProducts: 'View product catalog',
  },
  fr: {
    heroBadge: 'Une confiance qui vient du terrain',
    heroTitle1: 'Des histoires réelles,',
    heroTitle2: 'des résultats réels',
    heroSub:
      'Découvrez comment les producteurs agricoles et les éleveurs de toute l’Amérique latine font confiance à la puissance et à la durabilité des énergiseurs Balkran pour protéger leur patrimoine, leur bétail et leurs cultures.',
    heroStat1V: '450+ ha',
    heroStat1L: 'Zones en rotation continue',
    heroStat2V: '100%',
    heroStat2L: 'Autonomie solaire 24/7',
    heroStat3V: '+12 Pays',
    heroStat3L: 'Présence en Amérique latine',
    heroStat4V: '0',
    heroStat4L: 'Incident ou blessure signalé',
    sectionTag: 'Histoires de réussite à la une',
    sectionTitle: 'Les expériences de nos producteurs',
    sectionSub:
      'Chaque terrain présente un défi unique. Découvrez la solution Balkran appliquée à chaque type de sol et de bétail.',
    ctaBadge: 'Vous voulez la même sécurité pour votre propriété ?',
    ctaTitle: 'Recevez des conseils techniques personnalisés pour votre projet périmétrique',
    ctaSub:
      'Nos conseillers experts dimensionnent la puissance exacte de votre énergiseur Balkran selon vos hectares, le type de sol et votre bétail.',
    ctaBtn: 'Parler à un expert',
    ctaBtnProducts: 'Voir le catalogue de produits',
  },
};

export default function HistoriasPage() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';
  const l = (key: string): string => L[lang][key] || L.es[key] || key;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO SECTION - AWWWARDS DARK MODERN */}
      <section className="relative bg-[#111111] text-white overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24">
        {/* Subtle background grid & radial orange glow */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', 
            backgroundSize: '28px 28px' 
          }} 
        />
        <div 
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ff5a00]/15 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#ff5a00]/15 text-[#ff7a1a] border border-[#ff5a00]/30 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5a00]" />
              {l('heroBadge')}
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.06] text-white">
              {l('heroTitle1')} <span className="text-[#ff5a00]">{l('heroTitle2')}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl text-justify font-sans">
              {l('heroSub')}
            </p>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">{l('heroStat1V')}</span>
                <p className="text-xs text-gray-400 font-medium">{l('heroStat1Label')}</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#ff5a00]">{l('heroStat2V')}</span>
                <p className="text-xs text-gray-400 font-medium">{l('heroStat2Label')}</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">{l('heroStat3V')}</span>
                <p className="text-xs text-gray-400 font-medium">{l('heroStat3Label')}</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#ff5a00]">{l('heroStat4V')}</span>
                <p className="text-xs text-gray-400 font-medium">{l('heroStat4Label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE STORIES GRID */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">

          {/* Section Heading & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
            <div className="space-y-2">
              <span className="text-[#ff5a00] font-display text-xs font-extrabold uppercase tracking-widest block">
                {l('sectionTag')}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111111] tracking-tight">
                {l('sectionTitle')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#565e6e] max-w-md">
              {l('sectionSub')}
            </p>
          </div>

          {/* Grid de Historias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {historias.map((item) => (
              <article
                key={item.slug}
                className="group bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Imagen de Portada con badges sobrepuestos */}
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-900">
                    <Image
                      src={item.imagen}
                      alt={pick(lang, item.titulo)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badges superiores */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#ff5a00] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        {pick(lang, item.categoria)}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-[#1a2130] text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ff5a00]" />
                        {pick(lang, item.ubicacion)}
                      </span>
                    </div>

                    {/* Titulo sobre la imagen inferior */}
                    <div className="absolute bottom-4 left-6 right-6 text-white">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl drop-shadow-md leading-tight">
                        {pick(lang, item.titulo)}
                      </h3>
                      <p className="text-xs text-gray-200 font-medium pt-1">
                        {l('clienteLabel')} <span className="text-white font-bold">{pick(lang, item.cliente)}</span> ({pick(lang, item.pais)})
                      </p>
                    </div>
                  </div>

                  {/* Cuerpo del Card */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
                      {pick(lang, item.resumen)}
                    </p>

                    {/* Cita del cliente */}
                    <div className="bg-orange-50/80 border-l-4 border-[#ff5a00] rounded-r-2xl p-4 sm:p-5">
                      <Quote className="w-4 h-4 text-[#ff5a00] mb-1.5" />
                      <p className="text-xs sm:text-sm italic text-[#1a2130] leading-relaxed font-medium">
                        {`"${pick(lang, item.cita)}"`}
                      </p>
                    </div>

                    {/* Mini Métricas */}
                    <div className="grid grid-cols-3 gap-3 pt-1 border-t border-gray-100">
                      {item.metricas.map((m, mi) => (
                        <div key={mi} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                          <span className="block font-display font-extrabold text-sm sm:text-base text-[#111111]">
                            {pick(lang, m.valor)}
                          </span>
                          <span className="block text-[10px] text-gray-500 leading-tight mt-0.5">
                            {pick(lang, m.label)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer del Card con Botón CTA */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                  <Link
                    href={`/historias/${item.slug}`}
                    className="w-full bg-[#111111] hover:bg-[#ff5a00] text-white font-display text-xs font-extrabold uppercase tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg hover:shadow-[#ff5a00]/20"
                  >
                    <span>{l('readMore')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA BANNER FINAL */}
      <section className="py-16 bg-[#111111] text-white relative overflow-hidden">
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6">
          <span className="bg-[#ff5a00]/15 text-[#ff7a1a] border border-[#ff5a00]/30 font-display text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider inline-flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff5a00]" />
            {l('ctaBadge')}
          </span>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl mx-auto">
            {l('ctaTitle')}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {l('ctaSub')}
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contacto"
              className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center gap-2.5 hover:-translate-y-0.5"
            >
              <span>{l('ctaBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/productos"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all"
            >
              {l('ctaBtnProducts')}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}