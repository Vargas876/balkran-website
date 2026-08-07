import type { Metadata } from 'next';
import { MessageSquareText, Clock, Phone, Mail, Globe, MapPin, Headphones } from 'lucide-react';
import PqrsForm from './PqrsForm';

export const metadata: Metadata = {
  title: 'PQRS – Peticiones, Quejas, Reclamos y Solicitudes',
  description:
    'Radica tu petición, queja, reclamo o solicitud ante BALKRAN INC S.A.S BIC. Conoce los canales de atención, tiempos de respuesta y el formulario de PQRS.',
  alternates: { canonical: '/pqrs' },
  openGraph: {
    title: 'PQRS | Balkran',
    description: 'Formulario de peticiones, quejas, reclamos y solicitudes de BALKRAN INC S.A.S BIC.',
    url: '/pqrs',
  },
};

const tiempos = [
  { tipo: 'Peticiones genéricas', dias: '15 días', detalle: 'Respuesta en un máximo de 15 días hábiles.' },
  { tipo: 'Recursos de reposición y apelación', dias: '5 + 5 días', detalle: 'Reposición dentro de los 5 días siguientes y apelación en otros 5 días.' },
  { tipo: 'Quejas', dias: '15 días', detalle: 'Respuesta en un máximo de 15 días hábiles.' },
  { tipo: 'Reclamos', dias: '15 días', detalle: 'Respuesta en un máximo de 15 días hábiles.' },
  { tipo: 'Sugerencias', dias: 'Respuesta ágil', detalle: 'Tramitadas a través de los canales de atención.' },
];

export default function PqrsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <MessageSquareText className="w-3.5 h-3.5" />
              Atención al cliente
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Peticiones, Quejas, <span className="text-[#ff5a00]">Reclamos y Solicitudes</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              En BALKRAN INC S.A.S BIC ponemos a tu disposición el formulario de peticiones, quejas, reclamos y solicitudes (PQRS) junto con los canales de atención y los tiempos de respuesta establecidos.
            </p>
          </div>
        </div>
      </section>

      {/* TIEMPOS DE RESPUESTA */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Tiempos de respuesta</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111]">¿En cuánto tiempo respondemos?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiempos.map((t, i) => (
              <div key={i} className="bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5 space-y-2 text-center hover:border-orange-300 transition-colors">
                <Clock className="w-5 h-5 text-[#ff5a00] mx-auto" />
                <h3 className="font-display font-extrabold text-sm text-[#111111]">{t.tipo}</h3>
                <p className="font-display font-extrabold text-xl text-[#ff5a00]">{t.dias}</p>
                <p className="text-[11px] text-[#565e6e] font-medium leading-snug">{t.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + CANALES */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100 bg-[#fff7f0]">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">
                  Formulario de peticiones, quejas, reclamos y solicitudes
                </h2>
                <p className="text-xs text-[#565e6e] font-medium mt-1">
                  Completa los campos y radica tu solicitud. Recibirás respuesta por los canales que nos indiques.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <PqrsForm />
              </div>
            </div>
          </div>

          {/* Canales de atención */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-[#ff5a00]/40 text-[#ff5a00] flex items-center justify-center shrink-0"><Headphones className="w-5 h-5" /></div>
                <h3 className="font-display font-extrabold text-lg text-white">Canales de atención</h3>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Teléfono</p>
                    <p className="text-white font-semibold">+57 3114508064</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Correo electrónico</p>
                    <p className="text-white font-semibold break-all">info@cercasbalkran.com</p>
                    <p className="text-white font-semibold break-all">ventas@cercasbalkran.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Sitio web</p>
                    <p className="text-white font-semibold">www.cercasbalkran.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">Correo postal</p>
                    <p className="text-white font-semibold leading-snug">Calle 53 #35-113 Bodega 10, Parque Empresarial La Aurora, Sabaneta</p>
                  </div>
                </li>
              </ul>
              <a
                href="https://wa.me/573114508064?text=Hola%20Cercas%20Balkran%2C%20deseo%20informaci%C3%B3n%20acerca%20de%20PQRS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-full"
              >
                Escríbenos por WhatsApp
              </a>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
              <h3 className="font-display font-extrabold text-base text-[#111111]">Canales de radicación</h3>
              <ul className="space-y-2 text-sm text-[#565e6e] leading-relaxed">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> Formulario web de esta página</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> Presencial en nuestras oficinas</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> Telefónico al +57 3114508064</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> Escrito por correo postal</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}