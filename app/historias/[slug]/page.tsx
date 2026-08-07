import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, ArrowLeft, Quote, ShieldCheck, 
  CheckCircle2, AlertCircle, Zap, ArrowRight, CalendarDays,
  User, Sparkles, ChevronLeft, ChevronRight, MessageSquare, Award
} from 'lucide-react';
import { historias, getHistoriaBySlug } from '@/lib/historias';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return historias.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug || '';
  const historia = getHistoriaBySlug(slug);
  if (!historia) return { title: 'Historia no encontrada' };
  return {
    title: `${historia.titulo} – Caso de Éxito | Balkran`,
    description: historia.resumen,
    alternates: { canonical: `/historias/${historia.slug}` },
    openGraph: {
      title: `${historia.titulo} – Caso de Éxito | Balkran`,
      description: historia.resumen,
      url: `/historias/${historia.slug}`,
      images: [{ url: historia.imagen }],
    },
  };
}

export default async function HistoriaDetailPage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug || '';
  const historia = getHistoriaBySlug(slug);
  if (!historia) notFound();

  const index = historias.findIndex((h) => h.slug === historia.slug);
  const prev = historias[index - 1];
  const next = historias[index + 1];

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
            href="/historias" 
            className="inline-flex items-center gap-2 text-[#565e6e] hover:text-[#ff5a00] text-xs font-bold uppercase tracking-widest transition-all mb-8 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Historias de Éxito
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#ff5a00] text-white font-display text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-xs">
                  {historia.categoria}
                </span>
                <span className="bg-slate-100 border border-slate-200 text-[#1a2130] text-xs font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff5a00]" />
                  {historia.ubicacion}
                </span>
                <span className="bg-slate-100 border border-slate-200 text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
                  Año {historia.fecha}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] tracking-tight leading-[1.05] text-[#111111]">
                {historia.titulo}
              </h1>

              <p className="text-base sm:text-lg text-[#565e6e] font-sans leading-relaxed max-w-3xl">
                {historia.resumen}
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 text-[#ff5a00] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Propietario / Cliente</span>
                  <h3 className="font-display font-extrabold text-base text-[#111111]">{historia.cliente}</h3>
                </div>
              </div>
              <p className="text-xs text-[#565e6e] pl-13 font-medium">
                {historia.cargoCliente} — <span className="text-[#ff5a00] font-bold">{historia.pais}</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FULL-WIDTH HERO FEATURED COVER IMAGE */}
      <section className="bg-[#f8fafc] py-8 sm:py-12">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-900">
            <Image
              src={historia.imagen}
              alt={historia.titulo}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1500px"
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* HIGHLIGHT METRICS BENTO STRIP */}
      <section className="-mt-12 relative z-10 pb-12 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-lg p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {historia.metricas.map((m, mi) => (
              <div key={mi} className="flex items-start gap-4 md:border-r md:last:border-r-0 border-gray-100 md:pr-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] block tracking-tight">
                    {m.valor}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#111111]">{m.label}</h4>
                  {m.subtexto && (
                    <p className="text-xs text-[#565e6e] font-medium">{m.subtexto}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2-COLUMN AWWWARDS EDITORIAL GRID */}
      <section className="py-12 sm:py-16 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* LEFT SIDEBAR (Sticky Info & Product Spotlight - 4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Card 1: Resumen de Proyecto */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-[#111111]">Ficha Técnica</h3>
                    <p className="text-xs text-[#565e6e]">Detalles del caso de éxito</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-[#565e6e]">
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Ubicación:</span>
                    <span>{historia.ubicacion}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">País:</span>
                    <span className="font-bold text-[#ff5a00]">{historia.pais}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Categoría:</span>
                    <span className="uppercase font-semibold">{historia.categoria}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="font-bold text-[#1a2130]">Año de Instalación:</span>
                    <span>{historia.fecha}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Equipo Recomendado */}
              <div className="bg-[#111111] text-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5a00]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2 relative">
                  <span className="bg-[#ff5a00]/20 text-[#ff7a1a] border border-[#ff5a00]/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
                    Tecnología Instalada
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-white pt-1 leading-snug">
                    {historia.productoUsado.nombre}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                    {historia.productoUsado.descripcion}
                  </p>
                </div>

                <Link
                  href={historia.productoUsado.link}
                  className="bg-[#ff5a00] hover:bg-orange-600 text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all w-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Ver en Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 3: Asesoría Directa WhatsApp */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
                <h4 className="font-display font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  ¿Tienes un proyecto similar?
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Consulta con nuestros ingenieros para dimensionar el energizador ideal para tu terreno.
                </p>
                <a
                  href={`https://api.whatsapp.com/send?phone=573114508064&text=${encodeURIComponent(`Hola Balkran, leí el caso de éxito ${historia.titulo} y quisiera asesoría personalizada para mi proyecto`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-colors w-full shadow-sm"
                >
                  Hablar con un Especialista
                </a>
              </div>

            </div>

            {/* RIGHT MAIN CONTENT (Editorial Case Study Body - 8 cols) */}
            <div className="lg:col-span-8 space-y-10">

              {/* Testimonial Quote Banner */}
              <div className="bg-gradient-to-br from-[#111111] via-[#1a2130] to-[#0d1117] text-white rounded-3xl shadow-xl p-8 sm:p-10 relative overflow-hidden border border-white/10">
                <Quote className="w-24 h-24 text-white/5 absolute -top-4 -right-4 pointer-events-none" />
                <div className="relative space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#ff5a00] text-white flex items-center justify-center shadow-md">
                    <Quote className="w-5 h-5" />
                  </div>
                  <blockquote className="font-display font-bold text-xl sm:text-2xl lg:text-3xl leading-snug italic text-gray-100">
                    {`"${historia.cita}"`}
                  </blockquote>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-display font-extrabold text-sm text-white block">{historia.cliente}</span>
                      <span className="text-xs text-orange-400 font-medium">{historia.cargoCliente}</span>
                    </div>
                    <span className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full text-gray-300">{historia.pais}</span>
                  </div>
                </div>
              </div>

              {/* SECTION: El Desafío Inicial */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 space-y-6">
                <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-amber-600 font-display text-[11px] font-extrabold uppercase tracking-widest block">Diagnóstico Inicial</span>
                    <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                      El Desafío en Terreno
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {historia.desafio.map((d, di) => (
                    <div key={di} className="flex items-start gap-4 bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {di + 1}
                      </span>
                      <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed font-sans">
                        {d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: La Solución Balkran */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 space-y-6">
                <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#ff5a00] shrink-0 shadow-xs">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#ff5a00] font-display text-[11px] font-extrabold uppercase tracking-widest block">Estrategia Aplicada</span>
                    <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                      La Solución Balkran
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {historia.solucion.map((s, si) => (
                    <div key={si} className="flex items-start gap-4 bg-orange-50/40 rounded-2xl p-4 border border-orange-100/60">
                      <span className="w-6 h-6 rounded-full bg-[#ff5a00] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {si + 1}
                      </span>
                      <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed font-sans">
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: Resultados e Impacto */}
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 space-y-6">
                <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-emerald-600 font-display text-[11px] font-extrabold uppercase tracking-widest block">Métricas Comprobadas</span>
                    <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                      Resultados e Impacto Medible
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {historia.resultados.map((r, ri) => (
                    <div key={ri} className="flex items-start gap-4 bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-[#1a2130] font-medium leading-relaxed font-sans">
                        {r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* NAVIGATION BETWEEN STORIES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200/80">
                {prev ? (
                  <Link
                    href={`/historias/${prev.slug}`}
                    className="group bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 hover:border-[#ff5a00]/40 hover:shadow-md transition-all flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:text-[#ff5a00] transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block">Anterior Caso</span>
                      <span className="font-display font-extrabold text-base text-[#111111] group-hover:text-[#ff5a00] transition-colors block">
                        {prev.titulo}
                      </span>
                    </div>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link
                    href={`/historias/${next.slug}`}
                    className="group bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 hover:border-[#ff5a00]/40 hover:shadow-md transition-all flex items-center justify-end text-right gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block">Siguiente Caso</span>
                      <span className="font-display font-extrabold text-base text-[#111111] group-hover:text-[#ff5a00] transition-colors block">
                        {next.titulo}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:text-[#ff5a00] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                ) : <div />}
              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
