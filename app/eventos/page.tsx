import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { eventos, formatFecha } from '@/lib/eventos';

export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Eventos, ferias y participación de BALKRAN INC S.A.S BIC en el sector agropecuario: Informes Sociedades BIC, Congreso de Sostenibilidad, ExpoBIC, Macrorrueda y AgroExpo.',
  alternates: { canonical: '/eventos' },
  openGraph: {
    title: 'Eventos | Balkran',
    description: 'Conoce la participación de Balkran en eventos del sector agropecuario y los informes de gestión como Sociedad BIC.',
    url: '/eventos',
  },
};

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5" />
              Siempre presentes
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Eventos y <span className="text-[#ff5a00]">Participación</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              Conoce los eventos, ferias e informes de gestión en los que BALKRAN INC S.A.S BIC ha participado, reafirmando nuestro compromiso con el sector agropecuario y la sostenibilidad.
            </p>
          </div>
        </div>
      </section>

      {/* EVENTOS GRID */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((e) => (
              <Link
                key={e.slug}
                href={`/eventos/${e.slug}`}
                className="group bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all flex flex-col"
              >
                {/* Imagen */}
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={e.imagen}
                    alt={e.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#1a2130] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                    <CalendarDays className="w-3 h-3 text-[#ff5a00]" />
                    {formatFecha(e.fechaISO)}
                  </span>
                  {e.esInforme && (
                    <span className="absolute top-3 right-3 bg-[#ff5a00] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">
                      Informe BIC
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] leading-snug group-hover:text-[#ff5a00] transition-colors">
                    {e.titulo}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed flex-1 line-clamp-4 text-justify">
                    {e.resumen}
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    {e.pdf ? (
                      <span className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors">
                        <FileText className="w-4 h-4" /> Leer informe
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-[#ff5a00] text-xs font-bold">
                        <ExternalLink className="w-4 h-4" /> Participación destacada
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[#1a2130] text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver más <ArrowRight className="w-3.5 h-3.5 text-[#ff5a00]" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}