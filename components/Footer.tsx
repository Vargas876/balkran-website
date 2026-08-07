'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Footer() {
  const { t } = useLanguage();
  const { get } = useSiteConfig();
  const whatsapp = get('whatsapp');
  const telefono = get('telefono');
  const email = get('email');

  return (
    <footer className="bg-white border-t border-gray-200 text-[#565e6e] pt-10 pb-8 font-sans">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main Footer Grid - 8 Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-8 pb-12">
          
          {/* Col 1: Logo, Tagline & Social Icons */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-36 h-10">
                <Image
                  src="/assets/images/LogoGris.webp"
                  alt="BALKRAN Electric Fences"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-3 text-gray-400 pt-1">
              {/* Facebook */}
              <a href={`${get('facebook') || 'https://www.facebook.com/'}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5a00] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href={`https://wa.me/${whatsapp}?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.050-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              {/* Instagram */}
              <a href={`${get('instagram') || 'https://www.instagram.com/'}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5a00] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/CercasBalkran" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5a00] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/cercasbalkran" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5a00] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: PRODUCTOS */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.productos')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors">{t('footer.basica')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors">{t('footer.dual')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors">{t('footer.solar')}</Link></li>
              <li><Link href="/productos" className="hover:text-[#ff5a00] transition-colors">{t('footer.accesorios')}</Link></li>
            </ul>
          </div>

          {/* Col 3: SOLUCIONES */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.soluciones')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#aplicaciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.ganaderia')}</Link></li>
              <li><Link href="/#aplicaciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.equinos')}</Link></li>
              <li><Link href="/#aplicaciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.agricultura')}</Link></li>
              <li><Link href="/#aplicaciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.otrasApp')}</Link></li>
            </ul>
          </div>

          {/* Col 4: LEGAL */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/politica-datos-personales" className="hover:text-[#ff5a00] transition-colors">{t('footer.politicaDatos')}</Link></li>
              <li><Link href="/garantias-y-devoluciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.garantias')}</Link></li>
              <li><Link href="/terminos-y-condiciones-tienda" className="hover:text-[#ff5a00] transition-colors">{t('footer.terminosTienda')}</Link></li>
              <li><Link href="/pqrs" className="hover:text-[#ff5a00] transition-colors">{t('footer.pqrs')}</Link></li>
            </ul>
          </div>

          {/* Col 5: AYUDA */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.ayuda')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/preguntas-frecuentes" className="hover:text-[#ff5a00] transition-colors">{t('footer.faq')}</Link></li>
              <li><Link href="/manuales" className="hover:text-[#ff5a00] transition-colors">{t('footer.manuales')}</Link></li>
              <li><Link href="/garantias-y-devoluciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.garantias')}</Link></li>
              <li><Link href="/pqrs" className="hover:text-[#ff5a00] transition-colors">{t('footer.pqrs')}</Link></li>
            </ul>
          </div>

          {/* Col 6: SOBRE BALKRAN */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.sobre')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/nosotros" className="hover:text-[#ff5a00] transition-colors">{t('footer.nosotros')}</Link></li>
              <li><Link href="/eventos" className="hover:text-[#ff5a00] transition-colors">{t('footer.eventos')}</Link></li>
              <li><Link href="/certificaciones" className="hover:text-[#ff5a00] transition-colors">{t('footer.certificaciones')}</Link></li>
              <li><Link href="/#tecnologia" className="hover:text-[#ff5a00] transition-colors">{t('footer.tecnologia')}</Link></li>
            </ul>
          </div>

          {/* Col 7: CONTÁCTANOS */}
          <div>
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider uppercase mb-3">
              {t('footer.contactanos')}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href={`tel:${telefono}`} className="hover:text-[#ff5a00] transition-colors">{telefono}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#ff5a00] transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>{get('direccion') || t('footer.cobertura')}</span>
              </li>
            </ul>
          </div>

          {/* Col 8: Recibe novedades y consejos (Newsletter) */}
          <div className="space-y-3">
            <h3 className="font-display text-[#1a2130] text-xs font-bold tracking-wider mb-2">
              {t('footer.newsletter')}
            </h3>
            
            {/* Input + Green Submit Button */}
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a00] focus:border-[#ff5a00] bg-white text-[#1a2130]"
              />
              <button
                type="submit"
                className="bg-[#ff5a00] hover:bg-[#e04f00] text-white p-2 rounded-lg transition-colors shrink-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#ff5a00] focus-visible:ring-offset-2"
                aria-label="Enviar"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[11px] text-gray-400 pt-1">
              {t('footer.madeIn')}
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center space-x-6">
            <Link href="/politica-datos-personales" className="hover:text-gray-600 transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terminos-y-condiciones-tienda" className="hover:text-gray-600 transition-colors">{t('footer.terms')}</Link>
            <Link href="/garantias-y-devoluciones" className="hover:text-gray-600 transition-colors">{t('footer.garantias')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
