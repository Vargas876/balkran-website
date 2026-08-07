'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Truck, ShieldCheck, Zap, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Footer() {
  const { t } = useLanguage();
  const { get } = useSiteConfig();
  const whatsapp = get('whatsapp') || '573114508064';

  return (
    <footer className="bg-[#0d1117] text-white border-t border-white/10 font-sans relative z-10">
      
      {/* 1. MAIN NAVIGATION GRID */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Columna Marca y Contacto (Spans 4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-12">
                <Image
                  src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/LogoBlanco.webp"
                  alt="BALKRAN Electric Fences"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-sans">
              Líderes colombianos en la fabricación e innovación de energizadores y cercados eléctricos para el sector agropecuario e industrial.
            </p>

            <div className="space-y-3 text-xs text-gray-300 pt-2">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block text-[11px] font-bold uppercase">Atención al Cliente & WhatsApp</span>
                  <a href={`https://wa.me/${whatsapp}?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff5a00] font-extrabold text-sm transition-colors">
                    +57 311 450 8064
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block text-[11px] font-bold uppercase">Correo Electrónico</span>
                  <a href="mailto:ventas@cercasbalkran.com" className="text-gray-200 hover:text-[#ff5a00] transition-colors block">
                    ventas@cercasbalkran.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block text-[11px] font-bold uppercase">Sede Principal</span>
                  <span className="text-gray-200">Carrera 26 # 24-17, Duitama - Boyacá, Colombia</span>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a href={`https://wa.me/${whatsapp}?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#25D366] hover:bg-white/10 transition-colors" aria-label="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.050-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/CercasBalkran" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#ff5a00] hover:bg-white/10 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/CercasBalkran" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#ff5a00] hover:bg-white/10 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/CercasBalkran" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#ff5a00] hover:bg-white/10 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/cercasbalkran" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#ff5a00] hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Columna Tienda (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-[#ff5a00] text-xs font-extrabold uppercase tracking-widest border-b border-white/10 pb-2">
              Tienda en Línea
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.tiendaOnline')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.energizadores')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.kits')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.accesorios')}</Link></li>
              <li><a href="https://calculadora.cercasbalkran.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5a00] transition-colors inline-flex items-center gap-1"><span>{t('footer.calculadora')}</span><ExternalLink className="w-3 h-3 text-gray-500" /></a></li>
            </ul>
          </div>

          {/* Columna Sobre Balkran (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-[#ff5a00] text-xs font-extrabold uppercase tracking-widest border-b border-white/10 pb-2">
              Acerca de Balkran
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link href="/nosotros" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.quienesSomos')}</Link></li>
              <li><Link href="/historias" className="hover:text-[#ff5a00] transition-colors inline-block">Historias de Éxito</Link></li>
              <li><Link href="/eventos" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.eventos')}</Link></li>
              <li><Link href="/certificaciones" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.certificaciones')}</Link></li>
            </ul>
          </div>

          {/* Columna Soporte y Legal (Spans 4 cols on lg, split into 2 sub-columns) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-display text-[#ff5a00] text-xs font-extrabold uppercase tracking-widest border-b border-white/10 pb-2">
                Soporte y Ayuda
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li><Link href="/preguntas-frecuentes" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.faq')}</Link></li>
                <li><Link href="/manuales" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.manuales')}</Link></li>
                <li><Link href="/pqrs" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.pqrs')}</Link></li>
                <li><Link href="/contacto" className="hover:text-[#ff5a00] transition-colors inline-block">Soporte Técnico</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-[#ff5a00] text-xs font-extrabold uppercase tracking-widest border-b border-white/10 pb-2">
                Legal y Compliance
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li><Link href="/politica-datos-personales" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.politicaDatos')}</Link></li>
                <li><Link href="/garantias-y-devoluciones" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.garantias')}</Link></li>
                <li><Link href="/terminos-y-condiciones-tienda" className="hover:text-[#ff5a00] transition-colors inline-block">{t('footer.terminosTienda')}</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM COPYRIGHT BAR - WITH CHATBOT ORB OVERLAP PROTECTION */}
      <div className="bg-[#090c10] border-t border-white/10 py-6">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            
            {/* Left Copyright Text - Padded so VoltBot Orb on bottom-left never covers it! */}
            <div className="pl-16 sm:pl-20 md:pl-0 text-center md:text-left">
              <p className="font-medium text-gray-300">
                {t('footer.rights')}
              </p>
              <span className="text-[11px] text-gray-500 block pt-0.5">
                Vigilado Superintendencia de Industria y Comercio (SIC) — Hecho en Colombia 🇨🇴
              </span>
            </div>

            {/* Right Badges */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Servidores Activos 24/7
              </span>
              <span className="text-gray-400">
                BALKRAN INC S.A.S. BIC
              </span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}

