import type { Metadata } from 'next';
import { BookOpen, FileDown, ExternalLink, Zap, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manuales de uso e instalación',
  description:
    'Manuales de uso e instalación de energizadores y kit solares de Cercas Balkran. Descarga el manual de tu energizador DUAL, 12V o 110V.',
  alternates: { canonical: '/manuales' },
  openGraph: {
    title: 'Manuales de uso e instalación | Balkran',
    description:
      'Manuales de uso e instalación de energizadores y kit solares de Cercas Balkran: energizadores DUAL, 12V y 110V.',
    url: '/manuales',
  },
};

const manuales = [
  {
    icon: Zap,
    badge: 'DUAL / 12V',
    nombre: 'Manual de Uso Energizador DUAL y 12V',
    descripcion:
      'Este manual aplica para las referencias Duales (D), Duales Altas (HD) y Solares (S): BD1000, BD2000, BD3000, BD4500, BD6000, BD9000, BHD4500, BHD6000, BHD9000, B800S, B1000S, B2000S, B3000S, B4500S, B6000S, B9000S.',
    archivo: '/assets/manuales/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf',
    label: 'Descargar Manual DUAL y 12V',
    preview: 'https://docs.google.com/gview?url=https://www.cercasbalkran.com/wp-content/uploads/Balkran-Manual-Dual-12V-V1-Noviembre-2022-WEB.pdf&embedded=true',
  },
  {
    icon: Sun,
    badge: '110V',
    nombre: 'Manual de Uso Energizador 110V',
    descripcion:
      'Este manual aplica para las referencias Básicas (B) y las Básicas Altas (BH): B500, B750, B1000, B1500, B2000, B3000, B4500, B6000, B9000, B14000, B18000, BH4500, BH6000, BH9000, BH14000, BH18000.',
    archivo: '/assets/manuales/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf',
    label: 'Descargar Manual 110V',
    preview: 'https://docs.google.com/gview?url=https://www.cercasbalkran.com/wp-content/uploads/Balkran-Manual-110V-V1-Noviembre-2022-WEB.pdf&embedded=true',
  },
];

export default function ManualesPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Manuales de uso e instalación
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Manuales de uso e instalación de <span className="text-[#ff5a00]">energizadores y kit solares</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              Consulta y descarga el manual de uso e instalación de tu energizador Cercas Balkran. Encuentra la guía completa para las referencias DUAL, 12V, solares y de línea 110V.
            </p>
          </div>
        </div>
      </section>

      {/* MANUALES */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {manuales.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 sm:p-8 flex flex-col space-y-4 hover:shadow-md hover:border-orange-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="bg-orange-50 text-[#ff5a00] border border-orange-200/80 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {m.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{m.nombre}</h2>
                    <p className="text-sm text-[#565e6e] leading-relaxed text-justify">{m.descripcion}</p>
                  </div>

                  <div className="mt-auto pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={m.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors"
                    >
                      <FileDown className="w-4 h-4" /> {m.label}
                    </a>
                    <a
                      href={m.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#1a2130] text-xs font-bold px-5 py-3 rounded-full transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Ver en línea
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
