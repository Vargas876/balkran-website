import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  CalendarDays, FileText, ArrowLeft, Quote, ZoomIn, 
  Award, Sparkles, MapPin, ArrowRight, ChevronRight, Download, FileCheck, Share2
} from 'lucide-react';
import { eventos, getEventoBySlug, formatFecha } from '@/lib/eventos';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug || '';
  const evento = getEventoBySlug(slug);
  if (!evento) return { title: 'Evento no encontrado' };
  return {
    title: `${evento.titulo} | Balkran`,
    description: evento.descripcionCorta,
    alternates: { canonical: `/eventos/${evento.slug}` },
    openGraph: {
      title: `${evento.titulo} | Balkran`,
      description: evento.descripcionCorta,
      url: `/eventos/${evento.slug}`,
      images: [{ url: evento.imagen }],
    },
  };
}

export default async function EventoDetailPage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug || '';
  const evento = getEventoBySlug(slug);
  if (!evento) notFound();

  // Filtrar los demás eventos para la sección de recomendaciones
  const otrosEventos = eventos.filter((e) => e.slug !== evento.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO SECTION - CLEAN WHITE THEME */}
      <section className="relative bg-white text-[#111111] border-b border-gray-200/80 overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', 
            backgroundSize: '28px 28px' 
          }} 
        />
        <div 
          className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" 
        />

        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <Link 
            href="/eventos" 
            className="inline-flex items-center gap-2 text-[#565e6e] hover:text-[#ff5a00] text-xs font-bold uppercase tracking-widest transition-all mb-8 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Eventos e Informes
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#ff5a00] text-white font-display text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-xs">
                  {evento.categoria}
                </span>
                <span className="bg-slate-100 border border-slate-200 text-[#1a2130] text-xs font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#ff5a00]" />
                  {formatFecha(evento.fechaISO)}
                </span>
                {evento.esInforme && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Sostenibilidad ISO 26000
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.05] text-[#111111]">
                {evento.titulo}
              </h1>

              <p className="text-base sm:text-lg text-[#565e6e] font-sans leading-relaxed max-w-3xl">
                {evento.descripcionCorta}
              </p>
            </div>

            {evento.pdf && (
              <div className="lg:col-span-4 bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff5a00]/20 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Documentación Oficial</span>
                    <h3 className="font-display font-extrabold text-base text-white">Informe PDF Disponible</h3>
                  </div>
                </div>
                <a
                  href={evento.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff5a00] hover:bg-orange-600 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all w-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{evento.pdfLabel || 'Descargar PDF'}</span>
                </a>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FEATURED COVER IMAGE */}
      <section className="bg-[#f8fafc] py-6 sm:py-8">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative w-full h-64 sm:h-80 lg:h-[400px] max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-md border border-gray-200/90 bg-white p-4 sm:p-6 flex items-center justify-center">
            <Image
              src={evento.imagen}
              alt={evento.titulo}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-contain p-2"
            />
          </div>
        </div>
      </section>

      {/* 2-COLUMN AWWWARDS EDITORIAL GRID */}
      <section className="py-12 sm:py-16 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* LEFT SIDEBAR (Sticky Info & PDF Download - 4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Ficha Informativa */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-[#111111]">Ficha de Evento</h3>
                    <p className="text-xs text-[#565e6e]">Información del registro</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-[#565e6e]">
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Categoría:</span>
                    <span className="font-bold text-[#ff5a00] uppercase">{evento.categoria}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Fecha de Publicación:</span>
                    <span>{formatFecha(evento.fechaISO)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Entidad:</span>
                    <span>BALKRAN INC S.A.S BIC</span>
                  </div>
                  {evento.esInforme && (
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                      <span className="font-bold text-[#1a2130]">Estándar Evaluado:</span>
                      <span className="text-emerald-700 font-bold">ISO 26000</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Descargar PDF Card */}
              {evento.pdf && (
                <div className="bg-[#111111] text-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5a00]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-2 relative">
                    <span className="bg-[#ff5a00]/20 text-[#ff7a1a] border border-[#ff5a00]/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
                      Documento Oficial
                    </span>
                    <h4 className="font-display font-extrabold text-xl text-white pt-1 leading-snug">
                      Informe Completo en PDF
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                      Accede al documento digital oficial con el detalle de los indicadores y fotografías del proyecto.
                    </p>
                  </div>

                  <a
                    href={evento.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff5a00] hover:bg-orange-600 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all w-full flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Documento</span>
                  </a>
                </div>
              )}

              {/* Volver al Catálogo de Eventos */}
              <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 space-y-3">
                <h4 className="font-display font-bold text-sm text-[#111111]">¿Quieres explorar más informes?</h4>
                <p className="text-xs text-[#565e6e] leading-relaxed">
                  Revisa el historial completo de eventos, capacitaciones y reportes BIC de Balkran.
                </p>
                <Link
                  href="/eventos"
                  className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-gray-800 text-white font-display text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-colors w-full shadow-sm"
                >
                  Ver Todos los Eventos
                </Link>
              </div>

            </div>

            {/* RIGHT MAIN CONTENT (Editorial Article Body - 8 cols) */}
            <div className="lg:col-span-8 space-y-10">

              {/* Executive Summary Card */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 space-y-4">
                <h2 className="font-display font-extrabold text-2xl text-[#111111] tracking-tight border-b border-gray-100 pb-3">
                  Resumen Ejecutivo
                </h2>
                <p className="text-base sm:text-lg text-[#565e6e] leading-relaxed font-sans text-justify">
                  {evento.resumen}
                </p>
              </div>

              {/* Secciones dinámicas del informe */}
              {evento.secciones.map((sec, si) => (
                <div key={si} className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 space-y-6">
                  {sec.titulo && (
                    <div className="border-b border-gray-100 pb-3">
                      <span className="text-[#ff5a00] font-display text-[11px] font-extrabold uppercase tracking-widest block">Sección {si + 1}</span>
                      <h2 className="font-display font-extrabold text-2xl text-[#111111] tracking-tight">
                        {sec.titulo}
                      </h2>
                    </div>
                  )}

                  {sec.parrafos?.map((p, pi) => (
                    <p key={pi} className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify font-sans">
                      {p}
                    </p>
                  ))}

                  {sec.lista && (
                    <div className="space-y-3 pt-2">
                      {sec.lista.map((item, li) => (
                        <div key={li} className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <span className="w-2 h-2 rounded-full bg-[#ff5a00] mt-2 shrink-0" />
                          <p className="text-sm text-[#1a2130] font-medium leading-relaxed font-sans">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.cita && (
                    <div className="bg-gradient-to-br from-[#111111] to-[#1a2130] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden my-4 shadow-lg border border-white/10">
                      <Quote className="w-12 h-12 text-white/10 absolute -top-2 -right-2 pointer-events-none" />
                      <div className="relative space-y-3">
                        <Quote className="w-5 h-5 text-[#ff5a00]" />
                        <blockquote className="font-display font-bold text-base sm:text-lg leading-relaxed italic text-gray-100">
                          {`"${sec.cita}"`}
                        </blockquote>
                      </div>
                    </div>
                  )}

                  {/* Galería de imágenes interactivas */}
                  {sec.imagenes && sec.imagenes.length > 0 && (
                    <div className={`grid gap-6 ${sec.imagenes.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} pt-4`}>
                      {sec.imagenes.map((img, ii) => (
                        <figure key={ii} className="space-y-2 group">
                          <a 
                            href={img.src} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="Haz clic para abrir la imagen en alta resolución"
                            className="block relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-gray-50 hover:border-orange-400 hover:shadow-md transition-all cursor-zoom-in"
                          >
                            <Image
                              src={img.src}
                              alt={img.caption || evento.titulo}
                              fill
                              sizes="(max-width: 768px) 100vw, 600px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white/90 backdrop-blur-md text-[#111111] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                                <ZoomIn className="w-4 h-4 text-[#ff5a00]" /> Ver tamaño completo
                              </span>
                            </div>
                          </a>
                          {img.caption && (
                            <figcaption className="text-xs text-[#565e6e] font-medium leading-snug px-1 text-center sm:text-left">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* SECCIÓN DE OTROS INFORMES Y EVENTOS RECOMENDADOS (Reemplaza Anterior/Siguiente simple) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-extrabold uppercase tracking-widest block">
                Publicaciones Relacionadas
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
                Otros Informes y Eventos Destacados
              </h2>
            </div>
            <Link
              href="/eventos"
              className="text-[#ff5a00] hover:text-orange-600 font-display text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all group shrink-0"
            >
              <span>Ver todos los informes</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otrosEventos.map((item) => (
              <div
                key={item.slug}
                className="bg-[#FBFBFB] rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <Link href={`/eventos/${item.slug}`} className="relative w-full h-52 bg-gray-900 overflow-hidden block">
                    <Image
                      src={item.imagen}
                      alt={item.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#ff5a00] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        {item.categoria}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <span className="text-xs text-gray-400 font-medium block">
                      {formatFecha(item.fechaISO)}
                    </span>
                    <Link href={`/eventos/${item.slug}`} className="block">
                      <h3 className="font-display font-extrabold text-xl text-[#111111] leading-snug group-hover:text-[#ff5a00] transition-colors">
                        {item.titulo}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#565e6e] leading-relaxed line-clamp-3">
                      {item.descripcionCorta || item.resumen}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/eventos/${item.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 group-hover:bg-[#ff5a00] group-hover:border-[#ff5a00] text-[#111111] group-hover:text-white text-xs font-bold font-display uppercase tracking-wider px-5 py-3 rounded-xl transition-all w-full shadow-xs"
                  >
                    <span>{item.esInforme ? 'Ver Informe' : 'Ver Detalles'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}

