'use client';

import Image from 'next/image';
import { Award, ShieldCheck, Leaf, FileDown, BadgeCheck, CheckCircle2, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { pick } from '@/lib/i18n';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    badge: 'Calidad y Seguridad Certificada',
    heroTitle1: 'Certificaciones que',
    heroTitle2: 'nos respaldan',
    heroDesc:
      'En Balkran INC S.A.S. BIC estamos siempre comprometidos con los más altos estándares técnicos, eléctricos y ambientales. Cada uno de nuestros equipos cumple con la normatividad colombiana e internacional.',
    isoTag: 'ISO 9001:2015',
    retieTag: 'Certificación RETIE',
    sicTag: 'Registro SIC / Sociedad BIC',
    vigente: 'Vigente',
    especificacion: 'Especificación:',
    vigencia: 'Vigencia:',
    bicBtn: 'Registro SIC & Sociedad BIC',
    f1T: 'Garantía Directa de Fábrica',
    f1D: '2 años de respaldo total en energizadores y kits Balkran.',
    f2T: 'Normativa RETIE Oficial',
    f2D: 'Cumplimiento legal de seguridad eléctrica en todo Colombia.',
    f3T: 'Vigilancia SIC & BIC',
    f3D: 'Entidad formalizada bajo la Ley 1901 de Sociedades BIC.',
  },
  en: {
    badge: 'Certified Quality and Safety',
    heroTitle1: 'Certifications that',
    heroTitle2: 'back us up',
    heroDesc:
      'At Balkran INC S.A.S. BIC we are always committed to the highest technical, electrical and environmental standards. Every one of our products complies with Colombian and international regulations.',
    isoTag: 'ISO 9001:2015',
    retieTag: 'RETIE Certification',
    sicTag: 'SIC Registration / BIC Company',
    vigente: 'Valid',
    especificacion: 'Specification:',
    vigencia: 'Validity:',
    bicBtn: 'SIC Registration & BIC Company',
    f1T: 'Direct Factory Warranty',
    f1D: '2 years of full coverage on Balkran energizers and kits.',
    f2T: 'Official RETIE Regulation',
    f2D: 'Legal electrical safety compliance across Colombia.',
    f3T: 'SIC & BIC Oversight',
    f3D: 'Organization formalized under Law 1901 on BIC Companies.',
  },
  fr: {
    badge: 'Qualité et sécurité certifiées',
    heroTitle1: 'Des certifications qui',
    heroTitle2: 'nous soutiennent',
    heroDesc:
      "Chez Balkran INC S.A.S. BIC, nous sommes toujours engagés envers les normes techniques, électriques et environnementales les plus élevées. Chacun de nos équipements respecte les réglementations colombiennes et internationales.",
    isoTag: 'ISO 9001:2015',
    retieTag: 'Certification RETIE',
    sicTag: 'Registre SIC / Société BIC',
    vigente: 'Valide',
    especificacion: 'Spécification :',
    vigencia: 'Validité :',
    bicBtn: 'Registre SIC et Société BIC',
    f1T: 'Garantie directe d’usine',
    f1D: '2 ans de couverture totale pour les énergiseurs et kits Balkran.',
    f2T: 'Réglementation officielle RETIE',
    f2D: 'Conformité légale de sécurité électrique dans toute la Colombie.',
    f3T: 'Contrôle SIC et BIC',
    f3D: 'Entité formalisée en vertu de la Loi 1901 sur les sociétés BIC.',
  },
};

function l(lang: 'es' | 'en' | 'fr', key: string): string {
  return L[lang][key] || L.es[key] || key;
}

const certificados = [
  {
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-iso-9001.webp',
    nombre: { es: 'Certificado ISO 9001:2015', en: 'ISO 9001:2015 Certificate', fr: 'Certificat ISO 9001:2015' },
    descripcion: {
      es: 'Sistema de gestión de calidad certificado bajo la norma ISO 9001:2015 (Bureau Veritas), que avala los procesos de fabricación de nuestros energizadores y cercas eléctricas.',
      en: 'Quality management system certified under the ISO 9001:2015 standard (Bureau Veritas), endorsing the manufacturing processes of our energizers and electric fences.',
      fr: 'Système de management de la qualité certifié selon la norme ISO 9001:2015 (Bureau Veritas), garantissant les processus de fabrication de nos énergiseurs et clôtures électriques.',
    },
    detalle: { es: 'Certificación No. 9001-COL-0515', en: 'Certificate No. 9001-COL-0515', fr: 'Certificat n° 9001-COL-0515' },
    vigencia: { es: 'Vigente hasta julio de 2027', en: 'Valid until July 2027', fr: 'Valable jusqu\'en juillet 2027' },
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/CertificacionCalidad9001-2015_Balkran_2027.pdf',
    label: { es: 'Descargar Certificación de Calidad', en: 'Download Quality Certificate', fr: 'Télécharger le certificat de qualité' },
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  {
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-retie-oficial.webp',
    nombre: { es: 'Certificado RETIE', en: 'RETIE Certificate', fr: 'Certificat RETIE' },
    descripcion: {
      es: 'Reglamento Técnico de Instalaciones Eléctricas de Colombia que certifica la conformidad de nuestros impulsadores con los requisitos de seguridad eléctrica exigidos por la ley.',
      en: 'Colombian Technical Regulation for Electrical Installations that certifies the conformity of our energizers with the electrical safety requirements mandated by law.',
      fr: 'Règlement technique des installations électriques de Colombie certifiant la conformité de nos énergiseurs aux exigences légales de sécurité électrique.',
    },
    detalle: { es: 'Certificado 2413', en: 'Certificate 2413', fr: 'Certificat 2413' },
    vigencia: { es: 'Vigente hasta el 06/10/2027', en: 'Valid until 06/10/2027', fr: 'Valable jusqu’au 06/10/2027' },
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/CERTIFICADO-_2413_RETIE_BALKRAN_INC_SAS_BIC.pdf',
    label: { es: 'Descargar Certificado RETIE', en: 'Download RETIE Certificate', fr: 'Télécharger le certificat RETIE' },
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  {
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-sociedades-bic.webp',
    nombre: { es: 'Distintivo Sociedad BIC', en: 'BIC Company Badge', fr: 'Distinctif Société BIC' },
    descripcion: {
      es: 'Sociedad de Beneficio e Interés Colectivo registrada ante la Superintendencia de Industria y Comercio (SIC), comprometida con el desarrollo social y la producción sostenible en Colombia.',
      en: 'A Benefit and Collective Interest Company (BIC) registered with the Superintendency of Industry and Commerce (SIC), committed to social development and sustainable production in Colombia.',
      fr: 'Société de Bénéfice et d’Intérêt Collectif (BIC) enregistrée auprès de la Superintendance de l’Industrie et du Commerce (SIC), engagée en faveur du développement social et de la production durable en Colombie.',
    },
    detalle: { es: 'Ley 1901 de 2018 (Registro SIC)', en: 'Law 1901 of 2018 (SIC Registration)', fr: 'Loi 1901 de 2018 (Registre SIC)' },
    vigencia: { es: 'Compromiso permanente', en: 'Permanent commitment', fr: 'Engagement permanent' },
    archivo: null,
    label: null,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
];

export default function CertificacionesPage() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans flex flex-col justify-between">

      <div>
        {/* HERO */}
        <section className="relative bg-[#111111] text-white overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
          <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-3xl space-y-4">
              <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider inline-flex items-center gap-2 shadow-sm">
                <Award className="w-4 h-4" />
                {l(lang, 'badge')}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
                {l(lang, 'heroTitle1')} <span className="text-[#ff5a00]">{l(lang, 'heroTitle2')}</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {l(lang, 'heroDesc')}
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><BadgeCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> {l(lang, 'isoTag')}</span>
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> {l(lang, 'retieTag')}</span>
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-[#ff5a00]" /> {l(lang, 'sicTag')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICADOS CARDS */}
        <section className="py-12 bg-[#f8fafc]">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {certificados.map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md hover:border-[#ff5a00]/40 transition-all group"
                >
                  <div className="space-y-6">
                    {/* Header with Logo & Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="relative h-20 w-44 rounded-2xl bg-white border border-gray-100 p-2 shrink-0 flex items-center justify-center shadow-xs group-hover:border-[#ff5a00]/30 transition-colors">
                        <Image
                          src={c.logo}
                          alt={pick(lang, c.nombre)}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className={`${c.badgeColor} border text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shrink-0`}>
                        {l(lang, 'vigente')}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{pick(lang, c.nombre)}</h2>
                      <p className="text-sm text-[#565e6e] leading-relaxed font-sans">{pick(lang, c.descripcion)}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="pt-4 border-t border-gray-100 space-y-2.5">
                      <div className="flex items-start gap-2.5 text-xs text-[#565e6e]">
                        <BadgeCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                        <span><span className="font-bold text-[#1a2130]">{l(lang, 'especificacion')}</span> {pick(lang, c.detalle)}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#565e6e]">
                        <ShieldCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                        <span><span className="font-bold text-[#1a2130]">{l(lang, 'vigencia')}</span> {pick(lang, c.vigencia)}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    {c.archivo ? (
                      <a
                        href={c.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold font-display uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all w-full shadow-sm hover:shadow"
                      >
                        <FileDown className="w-4 h-4" /> {pick(lang, c.label)}
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-600 text-xs font-bold font-display uppercase tracking-wider px-5 py-3.5 rounded-xl w-full border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {l(lang, 'bicBtn')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* TRUST BANNER TO FILL SPACE & REINFORCE AUTHORITY */}
            <div className="bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#ff5a00] flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1a2130]">{l(lang, 'f1T')}</h3>
                  <p className="text-xs text-[#565e6e]">{l(lang, 'f1D')}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1a2130]">{l(lang, 'f2T')}</h3>
                  <p className="text-xs text-[#565e6e]">{l(lang, 'f2D')}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1a2130]">{l(lang, 'f3T')}</h3>
                  <p className="text-xs text-[#565e6e]">{l(lang, 'f3D')}</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

    </main>
  );
}