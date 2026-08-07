import type { Metadata } from 'next';
import { BookOpen, FileDown, ExternalLink, Zap, Sun, ShieldCheck, Wrench, HelpCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manuales de uso e instalación | Balkran',
  description:
    'Manuales de uso e instalación de energizadores y kits solares de Cercas Balkran. Descarga la guía oficial para energizadores DUAL, 12V y 110V.',
  alternates: { canonical: '/manuales' },
  openGraph: {
    title: 'Manuales de uso e instalación | Balkran',
    description:
      'Manuales de uso e instalación de energizadores y kits solares de Cercas Balkran: energizadores DUAL, 12V y 110V.',
    url: '/manuales',
  },
};

const manuales = [
  {
    icon: Zap,
    badge: 'LÍNEA DUAL Y 12V',
    nombre: 'Manual de Uso Energizador DUAL y 12V',
    descripcion:
      'Guía oficial paso a paso para la instalación y operación de referencias Duales (D), Duales Altas (HD) y Solares (S): BD1000 a BD9000, BHD4500 a BHD9000 y línea Solar (B800S a B9000S).',
    archivo: '/assets/manuales/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf',
    label: 'Descargar Manual DUAL y 12V (PDF)',
    preview: 'https://docs.google.com/gview?url=https://www.cercasbalkran.com/wp-content/uploads/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf&embedded=true',
  },
  {
    icon: Sun,
    badge: 'LÍNEA 110V',
    nombre: 'Manual de Uso Energizador 110V',
    descripcion:
      'Guía completa de conexión eléctrica y polo a tierra para energizadores de conexión fija a red 110V: Línea Básica (B500 a B18000) y Básica Alta (BH4500 a BH18000).',
    archivo: '/assets/manuales/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf',
    label: 'Descargar Manual 110V (PDF)',
    preview: 'https://docs.google.com/gview?url=https://www.cercasbalkran.com/wp-content/uploads/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf&embedded=true',
  },
];

const recomendaciones = [
  {
    icon: Wrench,
    titulo: 'Polo a Tierra Adecuado',
    texto: 'Instala como mínimo 2 a 3 varillas de cobre de 1.5m a 2m espaciadas entre sí y en terreno húmedo para garantizar la máxima potencia y el impulso correcto en toda la línea.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Desviador de Rayos y Cuchilla',
    texto: 'Utiliza un desviador de rayos y cuchilla doble tiro cerca del energizador para proteger el equipo ante descargas atmosféricas y tormentas eléctricas en el campo.',
  },
  {
    icon: CheckCircle2,
    titulo: 'Aisladores y Alambre Balkran',
    texto: 'Asegúrate de emplear aisladores tipo pera o pivote Balkran de alta rigidez dieléctrica para evitar pérdidas de voltaje por arcos eléctricos hacia los postes.',
  },
];

const faqsInstalacion = [
  {
    q: '¿Cuántas varillas de polo a tierra necesito?',
    a: 'Para energizadores pequeños (hasta 30 km) se recomiendan 2 varillas de cobre. Para equipos de alta potencia (60 km a 180 km), de 3 a 5 varillas conectadas en paralelo con alambre de cobre Nº 8 o Nº 10.',
  },
  {
    q: '¿Qué tipo de alambre debo usar para la cerca?',
    a: 'Recomendamos usar alambre galvanizado calibre 12.5 o 14, o hilo electroplástico en cercas móviles. Para conectar el energizador a la línea o al polo a tierra, usa siempre alambre aislado doble capa Balkran.',
  },
  {
    q: '¿Los equipos cuentan con garantía directa?',
    a: 'Sí, todos nuestros energizadores y kits solares Balkran cuentan con 2 años de garantía directa por defectos de fabricación y soporte técnico permanente.',
  },
];

export default function ManualesPage() {
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
                Centro de Documentación Técnica
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] tracking-tight leading-[1.08] text-white">
                Manuales de uso e instalación de <span className="text-[#ff5a00]">energizadores Balkran</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Consulta y descarga las guías oficiales para la correcta instalación eléctrica, polo a tierra y mantenimiento preventivo de tu energizador o kit solar Balkran.
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
                          {m.badge}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{m.nombre}</h2>
                        <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed">{m.descripcion}</p>
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
                        <span>{m.label}</span>
                      </a>
                      <a
                        href={m.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#1a2130] text-xs font-bold px-5 py-3.5 rounded-xl transition-colors active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0 text-[#ff5a00]" />
                        <span>Ver en línea</span>
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
                  CLAVES PARA UNA INSTALACIÓN EXITOSA
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
                Recomendaciones esenciales para tu cerca eléctrica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recomendaciones.map((rec, idx) => {
                  const RecIcon = rec.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff5a00] flex items-center justify-center">
                        <RecIcon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#111111]">{rec.titulo}</h4>
                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{rec.texto}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BANNER DE SOPORTE POR WHATSAPP */}
            <div className="bg-gradient-to-r from-[#111111] via-[#1a2130] to-[#111111] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[#ff7a1a] text-xs font-bold uppercase tracking-wider block">
                  ASISTENCIA TÉCNICA PERSONALIZADA
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  ¿Tienes dudas durante la instalación?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                  Nuestros asesores expertos te guían telefónicamente o por WhatsApp paso a paso para conectar tu equipo de manera óptima.
                </p>
              </div>

              <a
                href="https://wa.me/573114508064?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa%20para%20la%20instalaci%C3%B3n%20de%20mi%20energizador"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02] shrink-0"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Hablar con Asesor Técnico</span>
              </a>
            </div>

            {/* SECCIÓN 3: PREGUNTAS FRECUENTES DE INSTALACIÓN */}
            <div className="pt-4 pb-6 space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ff5a00]" />
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider">
                  PREGUNTAS FRECUENTES SOBRE MANUALES E INSTALACIÓN
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {faqsInstalacion.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-2">
                    <h4 className="font-display font-bold text-sm text-[#111111]">{faq.q}</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">{faq.a}</p>
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
