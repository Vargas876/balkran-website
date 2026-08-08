'use client';

import { MessageSquareText, Phone, Mail, Globe, Headphones } from 'lucide-react';
import PqrsForm from './PqrsForm';
import { useLanguage } from '@/context/LanguageContext';
import { pick, type L10n } from '@/lib/i18n';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    'heroBadge': 'Atención al cliente',
    'heroTitle1': 'Peticiones, Quejas,',
    'heroTitle2': 'Reclamos y Solicitudes',
    'heroDesc': 'En BALKRAN INC S.A.S BIC ponemos a tu disposición el formulario de peticiones, quejas, reclamos y solicitudes (PQRS) junto con los canales de atención establecidos.',
    'formTitle': 'Formulario de peticiones, quejas, reclamos y solicitudes',
    'formDesc': 'Completa los campos y radica tu solicitud. Recibirás respuesta por los canales que nos indiques.',
    'chanTitle': 'Canales de atención',
    'chanPhone': 'Teléfono',
    'chanEmail': 'Correo electrónico',
    'chanWeb': 'Sitio web',
    'chanWa': 'Escríbenos por WhatsApp',
    'radTitle': 'Canales de radicación',
    'radWeb': 'Formulario web de esta página',
    'radPresencial': 'Presencial en nuestras oficinas',
    'radTelefonico': 'Telefónico al +57 3114508064',
    'radPostal': 'Escrito por correo postal',
    'radWa': 'WhatsApp',
  },
  en: {
    'heroBadge': 'Customer service',
    'heroTitle1': 'Requests, Complaints,',
    'heroTitle2': 'Claims and Applications',
    'heroDesc': 'At BALKRAN INC S.A.S BIC we make available to you the form for requests, complaints, claims and applications (PQRS) together with the established customer service channels.',
    'formTitle': 'Requests, complaints, claims and applications form',
    'formDesc': 'Complete the fields and file your request. You will receive a response through the channels you indicate.',
    'chanTitle': 'Service channels',
    'chanPhone': 'Phone',
    'chanEmail': 'Email',
    'chanWeb': 'Website',
    'chanWa': 'Write to us on WhatsApp',
    'radTitle': 'Filing channels',
    'radWeb': 'Web form on this page',
    'radPresencial': 'In person at our offices',
    'radTelefonico': 'By phone at +57 3114508064',
    'radPostal': 'In writing by postal mail',
    'radWa': 'WhatsApp',
  },
  fr: {
    'heroBadge': 'Service client',
    'heroTitle1': 'Demandes, Réclamations,',
    'heroTitle2': 'Réclamations et demandes',
    'heroDesc': 'Chez BALKRAN INC S.A.S BIC, nous mettons à votre disposition le formulaire de pétitions, réclamations et demandes (PQRS) ainsi que les canaux de service établis.',
    'formTitle': 'Formulaire de pétitions, recommandations, réclamations et demandes',
    'formDesc': 'Remplissez les champs et déposez votre demande. Vous recevrez une réponse par les canaux que vous nous indiquez.',
    'chanTitle': 'Canaux de service',
    'chanPhone': 'Téléphone',
    'chanEmail': 'Courrier électronique',
    'chanWeb': 'Site web',
    'chanWa': 'Écrivez-nous sur WhatsApp',
    'radTitle': 'Canaux de dépôt',
    'radWeb': 'Formulaire web de cette page',
    'radPresencial': 'En personne dans nos bureaux',
    'radTelefonico': 'Par téléphone au +57 3114508064',
    'radPostal': 'Par écrit par courrier postal',
    'radWa': 'WhatsApp',
  },
};

export default function PqrsPage() {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es');
  const l = (key: string) => L[lang][key] || L.es[key] || key;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <MessageSquareText className="w-3.5 h-3.5" />
              {l('heroBadge')}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              {l('heroTitle1')} <span className="text-[#ff5a00]">{l('heroTitle2')}</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              {l('heroDesc')}
            </p>
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
                  {l('formTitle')}
                </h2>
                <p className="text-xs text-[#565e6e] font-medium mt-1 text-justify">
                  {l('formDesc')}
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
                <h3 className="font-display font-extrabold text-lg text-white">{l('chanTitle')}</h3>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">{l('chanPhone')}</p>
                    <p className="text-white font-semibold">+57 3114508064</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">{l('chanEmail')}</p>
                    <p className="text-white font-semibold break-all">info@cercasbalkran.com</p>
                    <p className="text-white font-semibold break-all">ventas@cercasbalkran.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-xs">{l('chanWeb')}</p>
                    <p className="text-white font-semibold">www.cercasbalkran.com</p>
                  </div>
                </li>
              </ul>
              <a
                href="https://wa.me/573114508064?text=Hola%20Cercas%20Balkran%2C%20deseo%20informaci%C3%B3n%20acerca%20de%20PQRS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-full"
              >
                {l('chanWa')}
              </a>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
              <h3 className="font-display font-extrabold text-base text-[#111111]">{l('radTitle')}</h3>
              <ul className="space-y-2 text-sm text-[#565e6e] leading-relaxed">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> {l('radWeb')}</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> {l('radPresencial')}</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> {l('radTelefonico')}</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> {l('radPostal')}</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 shrink-0" /> {l('radWa')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}