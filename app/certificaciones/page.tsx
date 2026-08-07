import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, ShieldCheck, Leaf, FileDown, BadgeCheck, CheckCircle2, Building2 } from 'lucide-react';

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
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-iso-9001.webp',
    nombre: 'Certificado ISO 9001:2015',
    descripcion:
      'Sistema de gestión de calidad certificado bajo la norma ISO 9001:2015 (Bureau Veritas), que avala los procesos de fabricación de nuestros energizadores y cercas eléctricas.',
    detalle: 'Certificación No. 9001-COL-0515',
    vigencia: 'Vigente hasta julio de 2027',
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/CertificacionCalidad9001-2015_Balkran_2027.pdf',
    label: 'Descargar Certificación de Calidad',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  {
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-retie-oficial.webp',
    nombre: 'Certificado RETIE',
    descripcion:
      'Reglamento Técnico de Instalaciones Eléctricas de Colombia que certifica la conformidad de nuestros impulsadores con los requisitos de seguridad eléctrica exigidos por la ley.',
    detalle: 'Certificado 2413',
    vigencia: 'Vigente hasta el 06/10/2027',
    archivo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/CERTIFICADO-_2413_RETIE_BALKRAN_INC_SAS_BIC.pdf',
    label: 'Descargar Certificado RETIE',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  {
    logo: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/logo-sociedades-bic.webp',
    nombre: 'Distintivo Sociedad BIC',
    descripcion:
      'Sociedad de Beneficio e Interés Colectivo registrada ante la Superintendencia de Industria y Comercio (SIC), comprometida con el desarrollo social y la producción sostenible en Colombia.',
    detalle: 'Ley 1901 de 2018 (Registro SIC)',
    vigencia: 'Compromiso permanente',
    archivo: null,
    label: null,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
];

export default function CertificacionesPage() {
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
                Calidad y Seguridad Certificada
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
                Certificaciones que <span className="text-[#ff5a00]">nos respaldan</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                En Balkran INC S.A.S. BIC estamos siempre comprometidos con los más altos estándares técnicos, eléctricos y ambientales. Cada uno de nuestros equipos cumple con la normatividad colombiana e internacional.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><BadgeCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> ISO 9001:2015</span>
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-[#ff5a00]" /> Certificación RETIE</span>
                <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-[#ff5a00]" /> Registro SIC / Sociedad BIC</span>
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
                          alt={c.nombre}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className={`${c.badgeColor} border text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shrink-0`}>
                        Vigente
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{c.nombre}</h2>
                      <p className="text-sm text-[#565e6e] leading-relaxed font-sans">{c.descripcion}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="pt-4 border-t border-gray-100 space-y-2.5">
                      <div className="flex items-start gap-2.5 text-xs text-[#565e6e]">
                        <BadgeCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                        <span><span className="font-bold text-[#1a2130]">Especificación:</span> {c.detalle}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-[#565e6e]">
                        <ShieldCheck className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                        <span><span className="font-bold text-[#1a2130]">Vigencia:</span> {c.vigencia}</span>
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
                        <FileDown className="w-4 h-4" /> {c.label}
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-600 text-xs font-bold font-display uppercase tracking-wider px-5 py-3.5 rounded-xl w-full border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Registro SIC &amp; Sociedad BIC
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
                  <h3 className="font-display font-bold text-base text-[#1a2130]">Garantía Directa de Fábrica</h3>
                  <p className="text-xs text-[#565e6e]">2 años de respaldo total en energizadores y kits Balkran.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1a2130]">Normativa RETIE Oficial</h3>
                  <p className="text-xs text-[#565e6e]">Cumplimiento legal de seguridad eléctrica en todo Colombia.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1a2130]">Vigilancia SIC &amp; BIC</h3>
                  <p className="text-xs text-[#565e6e]">Entidad formalizada bajo la Ley 1901 de Sociedades BIC.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

    </main>
  );
}