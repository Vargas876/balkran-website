import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, MapPin, ArrowRight, ShieldCheck, 
  CheckCircle2, ChevronRight, Award, Zap, Quote
} from 'lucide-react';
import { historias } from '@/lib/historias';

export const metadata: Metadata = {
  title: 'Historias de Éxito | Balkran',
  description:
    'Conoce casos reales de éxito de ganaderos y agricultores en Colombia, Ecuador, El Salvador y República Dominicana que protegen sus fincas con cercas eléctricas Balkran.',
  alternates: { canonical: '/historias' },
  openGraph: {
    title: 'Historias de Éxito | Balkran',
    description:
      'Historias reales, resultados reales: cómo la tecnología solar y dual de Balkran transforma la seguridad del campo en Latinoamérica.',
    url: '/historias',
  },
};

export default function HistoriasPage() {
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
              Confianza que viene del campo
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.06] text-white">
              Historias reales, <span className="text-[#ff5a00]">resultados reales</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl text-justify font-sans">
              Descubre cómo productores agrícolas y ganaderos de toda Latinoamérica confían en la potencia y durabilidad de los energizadores Balkran para proteger su patrimonio, ganado y cosechas.
            </p>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">450+ ha</span>
                <p className="text-xs text-gray-400 font-medium">Áreas en rotación continua</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#ff5a00]">100%</span>
                <p className="text-xs text-gray-400 font-medium">Autonomía solar 24/7</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">+12 Países</span>
                <p className="text-xs text-gray-400 font-medium">Presencia en Latinoamérica</p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#ff5a00]">0</span>
                <p className="text-xs text-gray-400 font-medium">Incidentes o lesiones registradas</p>
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
                Casos de éxito destacados
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111111] tracking-tight">
                Experiencias de nuestros productores
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#565e6e] max-w-md">
              Cada terreno tiene un desafío único. Conoce la solución Balkran aplicada a cada tipo de suelo y ganado.
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
                      alt={item.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badges superiores */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#ff5a00] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        {item.categoria}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-[#1a2130] text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ff5a00]" />
                        {item.ubicacion}
                      </span>
                    </div>

                    {/* Titulo sobre la imagen inferior */}
                    <div className="absolute bottom-4 left-6 right-6 text-white">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl drop-shadow-md leading-tight">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-gray-200 font-medium pt-1">
                        Cliente: <span className="text-white font-bold">{item.cliente}</span> ({item.pais})
                      </p>
                    </div>
                  </div>

                  {/* Cuerpo del Card */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
                      {item.resumen}
                    </p>

                    {/* Cita del cliente */}
                    <div className="bg-orange-50/80 border-l-4 border-[#ff5a00] rounded-r-2xl p-4 sm:p-5">
                      <Quote className="w-4 h-4 text-[#ff5a00] mb-1.5" />
                      <p className="text-xs sm:text-sm italic text-[#1a2130] leading-relaxed font-medium">
                        {`"${item.cita}"`}
                      </p>
                    </div>

                    {/* Mini Métricas */}
                    <div className="grid grid-cols-3 gap-3 pt-1 border-t border-gray-100">
                      {item.metricas.map((m, mi) => (
                        <div key={mi} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                          <span className="block font-display font-extrabold text-sm sm:text-base text-[#111111]">
                            {m.valor}
                          </span>
                          <span className="block text-[10px] text-gray-500 leading-tight mt-0.5">
                            {m.label}
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
                    <span>Leer historia completa</span>
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
            ¿Quieres la misma seguridad para tu finca?
          </span>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl mx-auto">
            Recibe asesoría técnica personalizada para tu proyecto perimetral
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Nuestros asesores expertos dimensionan la potencia exacta de tu energizador Balkran de acuerdo a tus hectáreas, tipo de suelo y ganado.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contacto"
              className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center gap-2.5 hover:-translate-y-0.5"
            >
              <span>Habla con un experto</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/productos"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all"
            >
              Ver catálogo de productos
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
