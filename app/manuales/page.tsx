'use client';

import { BookOpen, FileDown, ExternalLink, Zap, Sun, ShieldCheck, Wrench, HelpCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { pick } from '@/lib/i18n';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    heroBadge: 'Centro de Documentación Técnica',
    heroTitle1: 'Manuales de uso e instalación de',
    heroTitle2: 'energizadores Balkran',
    heroDesc:
      'Consulta y descarga las guías oficiales para la correcta instalación eléctrica, polo a tierra y mantenimiento preventivo de tu energizador o kit solar Balkran.',
    verEnLinea: 'Ver en línea',
    recBadge: 'CLAVES PARA UNA INSTALACIÓN EXITOSA',
    recTitle: 'Recomendaciones esenciales para tu cerca eléctrica',
    supportBadge: 'ASISTENCIA TÉCNICA PERSONALIZADA',
    supportTitle: '¿Tienes dudas durante la instalación?',
    supportDesc:
      'Nuestros asesores expertos te guían telefónicamente o por WhatsApp paso a paso para conectar tu equipo de manera óptima.',
    supportBtn: 'Hablar con Asesor Técnico',
    faqBadge: 'PREGUNTAS FRECUENTES SOBRE MANUALES E INSTALACIÓN',
  },
  en: {
    heroBadge: 'Technical Documentation Center',
    heroTitle1: 'Balkran energizer user and',
    heroTitle2: 'installation manuals',
    heroDesc:
      'Browse and download the official guides for the correct electrical installation, grounding and preventive maintenance of your Balkran energizer or solar kit.',
    verEnLinea: 'View online',
    recBadge: 'KEYS TO A SUCCESSFUL INSTALLATION',
    recTitle: 'Essential recommendations for your electric fence',
    supportBadge: 'PERSONALIZED TECHNICAL ASSISTANCE',
    supportTitle: 'Having doubts during installation?',
    supportDesc:
      'Our expert advisors will guide you step by step by phone or WhatsApp to connect your equipment optimally.',
    supportBtn: 'Talk to a Technical Advisor',
    faqBadge: 'FREQUENTLY ASKED QUESTIONS ABOUT MANUALS AND INSTALLATION',
  },
  fr: {
    heroBadge: 'Centre de documentation technique',
    heroTitle1: 'Manuels d’utilisation et d’installation',
    heroTitle2: 'des énergiseurs Balkran',
    heroDesc:
      'Consultez et téléchargez les guides officiels pour l’installation électrique correcte, la mise à la terre et la maintenance préventive de votre énergiseur ou kit solaire Balkran.',
    verEnLinea: 'Voir en ligne',
    recBadge: 'CLÉS POUR UNE INSTALLATION RÉUSSIE',
    recTitle: 'Recommandations essentielles pour votre clôture électrique',
    supportBadge: 'ASSISTANCE TECHNIQUE PERSONNALISÉE',
    supportTitle: 'Des doutes lors de l’installation ?',
    supportDesc:
      'Nos conseillers experts vous guident pas à pas par téléphone ou via WhatsApp pour connecter votre équipement de manière optimale.',
    supportBtn: 'Parler à un conseiller technique',
    faqBadge: 'QUESTIONS FRÉQUENTES SUR LES MANUELS ET L’INSTALLATION',
  },
};

function l(lang: 'es' | 'en' | 'fr', key: string): string {
  return L[lang][key] || L.es[key] || key;
}

const manuales = [
  {
    icon: Zap,
    badge: { es: 'LÍNEA DUAL Y 12V', en: 'DUAL AND 12V LINE', fr: 'GAMME DUAL ET 12V' },
    nombre: {
      es: 'Manual de Uso Energizador DUAL y 12V',
      en: 'DUAL and 12V Energizer User Manual',
      fr: 'Manuel d’utilisation de l’énergiseur DUAL et 12V',
    },
    descripcion: {
      es: 'Guía oficial paso a paso para la instalación y operación de referencias Duales (D), Duales Altas (HD) y Solares (S): BD1000 a BD9000, BHD4500 a BHD9000 y línea Solar (B800S a B9000S).',
      en: 'Official step-by-step guide for the installation and operation of Dual (D), Heavy-Duty Dual (HD) and Solar (S) references: BD1000 to BD9000, BHD4500 to BHD9000 and the Solar line (B800S to B9000S).',
      fr: 'Guide officiel pas à pas pour l’installation et l’utilisation des références Duales (D), Duales hautes (HD) et Solaires (S) : BD1000 à BD9000, BHD4500 à BHD9000 et gamme Solaire (B800S à B9000S).',
    },
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/manuales/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf',
    label: {
      es: 'Descargar Manual DUAL y 12V (PDF)',
      en: 'Download DUAL and 12V Manual (PDF)',
      fr: 'Télécharger le manuel DUAL et 12V (PDF)',
    },
    preview: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/manuales/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf',
  },
  {
    icon: Sun,
    badge: { es: 'LÍNEA 110V', en: '110V LINE', fr: 'GAMME 110V' },
    nombre: {
      es: 'Manual de Uso Energizador 110V',
      en: '110V Energizer User Manual',
      fr: 'Manuel d’utilisation de l’énergiseur 110V',
    },
    descripcion: {
      es: 'Guía completa de conexión eléctrica y polo a tierra para energizadores de conexión fija a red 110V: Línea Básica (B500 a B18000) y Básica Alta (BH4500 a BH18000).',
      en: 'Complete guide on electrical connection and grounding for energizers with fixed 110V AC connection: Basic Line (B500 to B18000) and High Basic (BH4500 to BH18000).',
      fr: 'Guide complet de connexion électrique et de mise à terre pour les énergiseurs à raccordement fixe sur réseau 110V : Gamme de base (B500 à B18000) et Gamme de base haute (BH4500 à BH18000).',
    },
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/manuales/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf',
    label: {
      es: 'Descargar Manual 110V (PDF)',
      en: 'Download 110V Manual (PDF)',
      fr: 'Télécharger le manuel 110V (PDF)',
    },
    preview: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/manuales/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf',
  },
];

const recomendaciones = [
  {
    icon: Wrench,
    titulo: {
      es: 'Polo a Tierra Adecuado',
      en: 'Proper Grounding System',
      fr: 'Mise à la terre adéquate',
    },
    texto: {
      es: 'Instala como mínimo 2 a 3 varillas de cobre de 1.5m a 2m espaciadas entre sí y en terreno húmedo para garantizar la máxima potencia y el impulso correcto en toda la línea.',
      en: 'Install at least 2 to 3 copper rods, 1.5m to 2m apart and on humid terrain, to ensure maximum power and the correct pulse along the entire line.',
      fr: 'Installez au moins 2 à 3 tiges de cuivre de 1,5 m à 2 m, espacées entre elles et dans un terrain humide, pour garantir la puissance maximale et l’impulsion correcte sur toute la ligne.',
    },
  },
  {
    icon: ShieldCheck,
    titulo: {
      es: 'Desviador de Rayos y Cuchilla',
      en: 'Lightning Arrestor and Disconnect Switch',
      fr: 'Parafoudre et coupe-circuit double tirage',
    },
    texto: {
      es: 'Utiliza un desviador de rayos y cuchilla doble tiro cerca del energizador para proteger el equipo ante descargas atmosféricas y tormentas eléctricas en el campo.',
      en: 'Use a lightning arrestor and a double-throw switch near the energizer to protect the equipment against atmospheric discharges and electrical storms in the field.',
      fr: 'Utilisez un parafoudre et un coupe-circuit double tirage près de l’énergiseur pour protéger l’équipement contre les décharges atmosphériques et les orages électriques.',
    },
  },
  {
    icon: CheckCircle2,
    titulo: {
      es: 'Aisladores y Alambre Balkran',
      en: 'Balkran Insulators and Wire',
      fr: 'Isolateurs et fil Balkran',
    },
    texto: {
      es: 'Asegúrate de emplear aisladores tipo pera o pivote Balkran de alta rigidez dieléctica para evitar pérdidas de voltaje por arcos eléctricos hacia los postes.',
      en: 'Be sure to use Balkran pear- or pivot-type insulators with high dielectric strength to prevent voltage loss from electrical arcs to the posts.',
      fr: 'Assurez-vous d’utiliser des isolateurs de type poire ou pivot Balkran à haute rigidité diélectrique pour éviter les pertes de tension dues aux arcs électriques vers les poteaux.',
    },
  },
];

const faqsInstalacion = [
  {
    q: {
      es: '¿Cuántas varillas de polo a tierra necesito?',
      en: 'How many grounding rods do I need?',
      fr: 'Combien de tiges de mise à la terre ai-je besoin ?',
    },
    a: {
      es: 'Para energizadores pequeños (hasta 30 km) se recomiendan 2 varillas de cobre. Para equipos de alta potencia (60 km a 180 km), de 3 a 5 varillas conectadas en paralelo con alambre de cobre Nº 8 o Nº 10.',
      en: 'For small energizers (up to 30 km), 2 copper rods are recommended. For high-power units (60 to 180 km), use 3 to 5 rods connected in parallel with No. 8 or No. 10 copper wire.',
      fr: 'Pour les énergiseurs de petite taille (jusqu’à 30 km), 2 tiges de cuivre sont recommandées. Pour les équipements de haute puissance (60 à 180 km), utilisez 3 à 5 tiges connectées en parallèle avec du fil de cuivre n° 8 ou n° 10.',
    },
  },
  {
    q: {
      es: '¿Qué tipo de alambre debo usar para la cerca?',
      en: 'What type of wire should I use for the fence?',
      fr: 'Quel type de fil dois-je utiliser pour la clôture ?',
    },
    a: {
      es: 'Recomendamos usar alambre galvanizado calibre 12.5 o 14, o hilo electroplástico en cercas móviles. Para conectar el energizador a la línea o al polo a tierra, usa siempre alambre aislado doble capa Balkran.',
      en: 'We recommend using 12.5 or 14-gauge galvanized wire, or electroplastic cord on portable fences. To connect the energizer to the line or to grounding, always use double-insulated Balkran wire.',
      fr: 'Nous recommandons d’utiliser du fil galvanisé de calibre 12.5 ou 14, ou un fil électroplastique sur les clôtures mobiles. Pour connecter l’énergiseur à la ligne ou à la mise à la terre, utilisez toujours du fil isolé double couche Balkran.',
    },
  },
  {
    q: {
      es: '¿Los equipos cuentan con garantía directa?',
      en: 'Is the equipment covered by a direct warranty?',
      fr: 'Les équipements bénéficient-ils d’une garantie directe ?',
    },
    a: {
      es: 'Sí, todos nuestros energizadores y kits solares Balkran cuentan con 2 años de garantía directa por defectos de fabricación y soporte técnico permanente.',
      en: 'Yes, all our Balkran energizers and solar kits are backed by a 2-year direct warranty against manufacturing defects and permanent technical support.',
      fr: 'Oui, tous nos énergiseurs et kits solaires Balkran bénéficient de 2 ans de garantie directe contre les défauts de fabrication et d’une assistance technique permanente.',
    },
  },
];

export default function ManualesPage() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';

  return (
    <main className="bg-[#f8fafc] text-[#1a2130] font-sans flex flex-col justify-between">

      <div>
        {/* HERO SECTION */}
        <section className="relative bg-[#111111] text-white overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-3xl space-y-4">
              <span className="bg-[#ff5a00]/15 text-[#ff7a1a] border border-[#ff5a00]/30 font-display text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider inline-flex items-center gap-2 shadow-sm">
                <BookOpen className="w-4 h-4 text-[#ff5a00]" />
                {l(lang, 'heroBadge')}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] tracking-tight leading-[1.08] text-white">
                {l(lang, 'heroTitle1')} <span className="text-[#ff5a00]">{l(lang, 'heroTitle2')}</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {l(lang, 'heroDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* MANUALES CARDS SECTION */}
        <section className="py-12 sm:py-16 bg-[#f8fafc]">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">

            {/* Grid 2 Columnas de Manuales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {manuales.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md hover:border-[#ff5a00]/50 transition-all duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 stroke-[2]" />
                        </div>
                        <span className="bg-orange-50 text-[#ff5a00] border border-orange-200/80 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {pick(lang, m.badge)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{pick(lang, m.nombre)}</h2>
                        <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed">{pick(lang, m.descripcion)}</p>
                      </div>
                    </div>

                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={m.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-[#e04f00] text-white text-xs font-bold px-5 py-3.5 rounded-xl shadow-md shadow-[#ff5a00]/20 transition-all hover:scale-[1.01] active:scale-95"
                      >
                        <FileDown className="w-4 h-4 shrink-0" />
                        <span>{pick(lang, m.label)}</span>
                      </a>
                      <a
                        href={m.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#1a2130] text-xs font-bold px-5 py-3.5 rounded-xl transition-colors active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0 text-[#ff5a00]" />
                        <span>{l(lang, 'verEnLinea')}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SECCIÓN 2: RECOMENDACIONES DE INSTALACIÓN RÁPIDA */}
            <div className="pt-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider">
                  {l(lang, 'recBadge')}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
                {l(lang, 'recTitle')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recomendaciones.map((rec, idx) => {
                  const RecIcon = rec.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff5a00] flex items-center justify-center">
                        <RecIcon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#111111]">{pick(lang, rec.titulo)}</h4>
                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{pick(lang, rec.texto)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BANNER DE SOPORTE POR WHATSAPP */}
            <div className="bg-gradient-to-r from-[#111111] via-[#1a2130] to-[#111111] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[#ff7a1a] text-xs font-bold uppercase tracking-wider block">
                  {l(lang, 'supportBadge')}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {l(lang, 'supportTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                  {l(lang, 'supportDesc')}
                </p>
              </div>

              <a
                href="https://wa.me/573114508064?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa%20para%20la%20instalaci%C3%B3n%20de%20mi%20energizador"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] shrink-0"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>{l(lang, 'supportBtn')}</span>
              </a>
            </div>

            {/* SECCIÓN 3: PREGUNTAS FRECUENTES DE INSTALACIÓN */}
            <div className="pt-4 pb-6 space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ff5a00]" />
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider">
                  {l(lang, 'faqBadge')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {faqsInstalacion.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-2">
                    <h4 className="font-display font-bold text-sm text-[#111111]">{pick(lang, faq.q)}</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">{pick(lang, faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>

    </main>
  );
}