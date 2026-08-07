import type { Metadata } from 'next';
import { Award, ShieldCheck, Leaf, FileDown, BadgeCheck, FileCheck2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificaciones',
  description:
    'Certificaciones que respaldan la calidad y seguridad de los productos BALKRAN: ISO 9001:2015, certificado RETIE y distintivo Sociedad BIC.',
  alternates: { canonical: '/certificaciones' },
  openGraph: {
    title: 'Certificaciones | Balkran',
    description: 'Certificado ISO 9001:2015, certificado RETIE y distintivo Sociedad BIC de BALKRAN INC S.A.S BIC.',
    url: '/certificaciones',
  },
};

const certificados = [
  {
    icon: ShieldCheck,
    nombre: 'Certificado ISO 9001:2015',
    descripcion:
      'Sistema de gestión de calidad certificado bajo la norma ISO 9001:2015, que avala los procesos de fabricación de nuestros energizadores y cercas eléctricas.',
    detalle: 'Certificación No. 9001-COL-0515',
    vigencia: 'Vigente hasta julio de 2027',
    archivo: '/assets/images/CertificacionCalidad9001-2015_Balkran_2027.pdf',
    label: 'Descargar Certificación de Calidad',
  },
  {
    icon: FileCheck2,
    nombre: 'Certificado RETIE',
    descripcion:
      'Reglamento Técnico de Instalaciones Eléctricas que certifica la conformidad de nuestros productos con los requisitos de seguridad eléctrica aplicables en Colombia.',
    detalle: 'Certificado 2413',
    vigencia: 'Vigente hasta el 06/10/2027',
    archivo: '/assets/images/CERTIFICADO-_2413_RETIE_BALKRAN_INC_SAS_BIC.pdf',
    label: 'Descargar Certificado RETIE',
  },
  {
    icon: Leaf,
    nombre: 'Distintivo Sociedad BIC',
    descripcion:
      'Sociedad de Beneficio e Interés Colectivo comprometida con la generación de impacto social y ambiental positivo, enmarcada en la Ley 1901 de 2018.',
    detalle: 'Ley 1901 de 2018',
    vigencia: 'Compromiso permanente',
    archivo: null,
    label: null,
  },
];

export default function CertificacionesPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              Calidad certificada
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Certificaciones que <span className="text-[#ff5a00]">nos respaldan</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              En Balkran INC S.A.S. BIC estamos siempre comprometidos con la calidad y seguridad de nuestros productos; por esto trabajamos de la mano de los mejores y estas certificaciones nos respaldan.
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs">
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2"><BadgeCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> ISO 9001:2015</span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> RETIE</span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2"><Leaf className="w-3.5 h-3.5 text-[#ff5a00]" /> Sociedad BIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICADOS */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {certificados.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 sm:p-8 flex flex-col space-y-4 hover:shadow-md hover:border-orange-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5a00] flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Vigente
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{c.nombre}</h2>
                    <p className="text-sm text-[#565e6e] leading-relaxed">{c.descripcion}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-[#565e6e]">
                      <BadgeCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                      <span><span className="font-bold text-[#1a2130]">Detalle:</span> {c.detalle}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#565e6e]">
                      <ShieldCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                      <span><span className="font-bold text-[#1a2130]">Vigencia:</span> {c.vigencia}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-2">
                    {c.archivo ? (
                      <a
                        href={c.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-full"
                      >
                        <FileDown className="w-4 h-4" /> {c.label}
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-500 text-xs font-bold px-5 py-3 rounded-full w-full">
                        <Leaf className="w-4 h-4" /> Compromiso permanente
                      </span>
                    )}
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