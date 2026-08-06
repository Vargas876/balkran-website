'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatLinea, formatCategoria, formatSubtitulo, formatNombreProducto, formatDescripcionProducto } from '@/lib/i18nHelpers';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Lock,
  Award,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  Play,
  Sun,
  BatteryCharging,
  Plug,
  Compass,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Wrench,
  FileText,
  HelpCircle,
  AlertTriangle,
  X,
  Search,
  Trash2,
  Home,
  Briefcase,
  Ruler,
  Leaf,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  allProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  allProducts,
}: ProductDetailClientProps) {
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'instalacion' | 'ficha' | 'certificaciones' | 'valoraciones'>('instalacion');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-play carousel for "También podría interesarte" every 8 seconds (8000ms)
  useEffect(() => {
    if (relatedProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1 < relatedProducts.length ? prev + 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, [relatedProducts.length]);

  // Interactive Zoom & Lightbox state for mobile/desktop
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomPos(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleTouchEnd = () => {
    setZoomPos(null);
  };

  // Helper to ensure clean "Hasta XX km" / "Up to XX km" without duplicate "Hasta Hasta"
  const formatAlcance = (alc: string | undefined) => {
    if (!alc) return language === 'en' ? 'Up to 40 km' : language === 'fr' ? "Jusqu'à 40 km" : 'Hasta 40 km';
    const clean = alc.replace(/^(hasta|up to|jusqu'à)\s+/i, '').replace(/hasta\s+/gi, '').trim();
    if (language === 'en') return `Up to ${clean}`;
    if (language === 'fr') return `Jusqu'à ${clean}`;
    return `Hasta ${clean}`;
  };

  const formatAlimentacion = (alim: string | undefined) => {
    if (!alim) return '110V / 220V';
    let res = alim;
    if (language === 'en') {
      res = res
        .replace(/Sistema Integrado Todo en Uno/gi, 'Integrated All-in-One System')
        .replace(/Red Eléctrica/g, 'Electrical Grid')
        .replace(/Batería/g, 'Battery')
        .replace(/Panel Solar/g, 'Solar Panel');
    } else if (language === 'fr') {
      res = res
        .replace(/Sistema Integrado Todo en Uno/gi, 'Système Intégré Tout-en-Un')
        .replace(/Red Eléctrica/g, 'Réseau Électrique')
        .replace(/Batería/g, 'Batterie')
        .replace(/Panel Solar/g, 'Panneau Solaire');
    }
    return res;
  };

  const formatConsumo = (cons: string | undefined) => {
    if (!cons) return '15 W';
    if (cons === 'Alto') return t('detail.high');
    if (cons === 'Bajo') return t('detail.low');
    return cons;
  };

  const formattedAlcance = formatAlcance(product.alcance);

  const isEnergizador = product.categoria === 'Energizadores' || product.categoria === 'Kits Solares';

  // Official Balkran animal icons ("Recomendado para")
  const animalIcon: Record<string, string> = {
    Caballo: '/assets/images/animales/CaballoAjustado.svg',
    Vaca: '/assets/images/animales/VacaAjustada.svg',
    Cerdo: '/assets/images/animales/CerdoAjustado.svg',
    Perro: '/assets/images/animales/PerroAjustado.svg',
    Toro: '/assets/images/animales/ToroAjustado.svg',
    Oveja: '/assets/images/animales/OvejaAjustada.svg',
    Cabra: '/assets/images/animales/CabraAjustada.svg',
    Caballos: '/assets/images/animales/CaballoAjustado.svg',
    Vacas: '/assets/images/animales/VacaAjustada.svg',
    Cerdos: '/assets/images/animales/CerdoAjustado.svg',
    Perros: '/assets/images/animales/PerroAjustado.svg',
    Toros: '/assets/images/animales/ToroAjustado.svg',
    Ovejas: '/assets/images/animales/OvejaAjustada.svg',
    Cabras: '/assets/images/animales/CabraAjustada.svg',
  };

  // Local manuals (downloaded to /assets/pdf)
  const manualPdf =
    isEnergizador &&
    (product.linea.includes('DUAL') || product.linea.includes('BD') || product.linea.includes('BHD') || product.linea.includes('12V') || product.linea.includes('S (') || product.linea.includes('KITS'))
      ? '/assets/pdf/manual_dual_12v.pdf'
      : isEnergizador
      ? '/assets/pdf/manual_110v.pdf'
      : null;

  // Real technical specifications (from the official WooCommerce store data)
  const techRows: { label: string; value: string }[] = [];
  techRows.push({ label: t('detail.tableModel'), value: product.nombre });
  if (isEnergizador && product.alcance) {
    techRows.push({ label: t('detail.tableMaxReach'), value: formatAlcance(product.alcance) });
  }
  if (product.cobertura) techRows.push({ label: t('detail.tableCobertura'), value: product.cobertura });
  if (product.energia_salida || product.joules) {
    techRows.push({ label: t('detail.tableOutputEnergy'), value: product.energia_salida || product.joules || '' });
  }
  if (isEnergizador && product.alimentacion) {
    techRows.push({ label: t('detail.tablePowerSupply'), value: formatAlimentacion(product.alimentacion) });
  }
  if (product.autonomia) techRows.push({ label: t('detail.tableAutonomy'), value: product.autonomia });
  if (product.voltaje_salida) techRows.push({ label: t('detail.tableOutputVoltage'), value: product.voltaje_salida });
  if (product.pulsos_minuto) techRows.push({ label: t('detail.tablePulseFreq'), value: product.pulsos_minuto });
  if (product.varillas_tierra) techRows.push({ label: t('detail.tableVarillas'), value: product.varillas_tierra });
  if (product.material) techRows.push({ label: t('detail.tableMaterial'), value: product.material });
  if (product.color) techRows.push({ label: t('detail.tableColor'), value: product.color });
  if (product.presentacion) techRows.push({ label: t('detail.tablePresentacion'), value: product.presentacion });
  if (product.capacidad) techRows.push({ label: t('detail.tableCapacidad'), value: product.capacidad });
  if (product.longitud) techRows.push({ label: t('detail.tableMaxReach'), value: product.longitud });
  if (product.dimensiones) techRows.push({ label: t('detail.tableDimensions'), value: product.dimensiones });
  if (product.peso) techRows.push({ label: t('detail.tableWeight'), value: product.peso });
  techRows.push({ label: t('detail.tableWarranty'), value: t('detail.warranty3') });

  // Gallery image list (Main product image + alternative closeups/box images)
  const galleryImages = [
    product.imagen_local,
    '/assets/images/09P0SGmGDpn291FCF2VooQ3BRLE.webp',
    '/assets/images/1qGLo1NIVhFclbgu6nVpbs9coG4.webp',
    '/assets/images/raF4WaHkDInyAIl4Bq7JbtFY.webp',
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const whatsappMsgText =
    language === 'en'
      ? `Hello Balkran, I am interested in buying ${quantity} unit(s) of ${product.nombre} (${formatLinea(product.linea, language)}) - ${product.precio}. Can you provide advice and a quotation?`
      : language === 'fr'
      ? `Bonjour Balkran, je souhaite acheter ${quantity} unité(s) de ${product.nombre} (${formatLinea(product.linea, language)}) - ${product.precio}. Pouvez-vous me conseiller et établir un devis?`
      : `Hola Balkran, estoy interesado en comprar ${quantity} unidad(es) de ${product.nombre} (${product.linea}) - ${product.precio}. ¿Me pueden brindar asesoría y cotización?`;
  const whatsappMessage = encodeURIComponent(whatsappMsgText);
  const whatsappUrl = `https://wa.me/573114508064?text=${whatsappMessage}`;

  // FAQs data
  const faqs = [
    {
      q: t('detailFaq.q1').replace(/energizador/gi, product.nombre),
      a: t('detailFaq.a1').replace(/energizadores/gi, product.nombre),
    },
    {
      q: t('detailFaq.q2'),
      a: t('detailFaq.a2'),
    },
    {
      q: t('detailFaq.q3'),
      a: t('detailFaq.a3'),
    },
    {
      q: t('detailFaq.q4'),
      a: t('detailFaq.a4'),
    },
    {
      q: t('detailFaq.q5'),
      a: t('detailFaq.a5'),
    },
  ];

  // Smooth scroll and switch to reviews tab when clicking rating
  const scrollToReviews = () => {
    setActiveTab('valoraciones');
    setTimeout(() => {
      const el = document.getElementById('seccion-tabs');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Real comparison models dynamically fetched from real database records
  const allProds = allProducts;

  const defaultSelectedSlugs = [
    product.slug,
    allProds.find((p) => p.slug.toLowerCase() !== product.slug.toLowerCase())?.slug || 'b1000d',
  ];

  const [selectedCompareSlugs, setSelectedCompareSlugs] = useState<string[]>(defaultSelectedSlugs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [compareSearch, setCompareSearch] = useState('');

  const handleAddCompare = (slug: string) => {
    if (selectedCompareSlugs.length < 4 && !selectedCompareSlugs.includes(slug)) {
      setSelectedCompareSlugs((prev) => [...prev, slug]);
    }
    setShowAddModal(false);
    setCompareSearch('');
  };

  const handleRemoveCompare = (slug: string) => {
    if (selectedCompareSlugs.length > 1) {
      setSelectedCompareSlugs((prev) => prev.filter((s) => s !== slug));
    }
  };

  const handleClearCompare = () => {
    setSelectedCompareSlugs(defaultSelectedSlugs);
  };

  const comparisonModels = selectedCompareSlugs.map((slugKey) => {
    const found = allProds.find((p: Product) => p.slug.toLowerCase() === slugKey.toLowerCase());
    if (found) {
      return {
        name: formatNombreProducto(found.nombre, language),
        alcance: formatAlcance(found.alcance),
        joules: found.joules || '1.5J',
        voltaje: formatAlimentacion(found.alimentacion || found.voltaje || '12V / 110V'),
        ideal: found.ideal_para || 'Fincas medianas',
        img: found.imagen_local,
        slug: found.slug,
        isPopular: found.slug === product.slug,
      };
    }
    return {
      name: formatNombreProducto(product.nombre, language),
      alcance: formattedAlcance,
      joules: product.joules || '4.5J',
      voltaje: formatAlimentacion(product.alimentacion || product.voltaje || '110V Red Eléctrica'),
      ideal: product.ideal_para || 'Fincas medianas y potreros ganaderos',
      img: product.imagen_local,
      slug: product.slug,
      isPopular: true,
    };
  });

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, relatedProducts.length - 3));
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.max(1, relatedProducts.length - 3)) % Math.max(1, relatedProducts.length - 3));
  };

  return (
    <div className="bg-white min-h-screen text-[#1a2130] font-sans pt-24 sm:pt-26">
      
      {/* 1. TOP HEADER BAR WITH TRUST BADGES (Framer Header Right Badges) */}
      <div className="border-b border-gray-100/80 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center text-xs text-gray-500 font-medium">
          <div className="lg:col-span-5">
            <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#ff5a00] transition-colors">
                {t('detail.navHome')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href="/productos" className="hover:text-[#ff5a00] transition-colors">
                {t('detail.navCategory')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[#1a2130] font-bold">{formatNombreProducto(product.nombre, language)}</span>
            </nav>
          </div>

          <div className="lg:col-span-7 hidden md:flex items-center gap-7 text-[11px] text-gray-500 font-semibold justify-start pl-44 lg:pl-[275px]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-gray-400" />
              <span>{t('detail.shippingBadge')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>{t('detail.secureBadge')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gray-400" />
              <span>{t('detail.warrantyBadge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO PRODUCT DETAIL GRID (Framer Section 1) */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-3 sm:pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: PRODUCT INFORMATION & PURCHASE ACTIONS (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Category Line Badge */}
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider">
                {formatLinea(product.linea, language)}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-none">
              {formatNombreProducto(product.nombre, language)}
            </h1>

            {/* Rating Stars Row - Clickable to scroll to Reviews Tab (real WooCommerce data) */}
            <button
              type="button"
              onClick={scrollToReviews}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity text-left group cursor-pointer"
              title={language === 'en' ? 'View reviews' : language === 'fr' ? 'Voir les avis' : 'Ver valoraciones'}
            >
              <div className="flex items-center gap-1 text-[#ff5a00]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${(product.rating || 0) > 0 ? 'fill-[#ff5a00] text-[#ff5a00]' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500 group-hover:underline">
                {product.valoraciones || 0}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('detail.reviews').replace(/^\d+\s*/, '')})
                </span>
              </span>
            </button>

            {/* Short Subtitle / Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal max-w-md">
              {formatDescripcionProducto(product.descripcion || product.subtitulo || '', language) ||
                (language === 'en'
                  ? 'Maximum power and reliability for fences up to 40 km.'
                  : language === 'fr'
                  ? "Puissance et fiabilité maximales pour clôtures jusqu'à 40 km."
                  : 'Máxima potencia y confiabilidad para cercas de hasta 40 km.')}
            </p>

            {/* Price Block */}
            <div className="space-y-0.5 pt-1">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111]">
                  {product.precio}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                {t('detail.vatIncluded')}
              </p>
            </div>

            {/* Key Advantages Checklist (real product data) */}
            <div className="space-y-2 pt-1">
              {isEnergizador && product.alcance && (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>
                    <strong className="text-[#111111]">{formattedAlcance}</strong> {t('detail.reach')}
                  </span>
                </div>
              )}
              {isEnergizador && (product.energia_salida || product.joules) && (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>
                    <strong className="text-[#111111]">{product.energia_salida || product.joules}</strong>{' '}
                    {t('detail.joules')}
                  </span>
                </div>
              )}
              {(product.caracteristicas || []).slice(0, 5).map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                <span>{t('detail.warrantyYears')}</span>
              </div>
            </div>

            {/* Quantity Counter */}
            <div className="pt-2">
              <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white px-3 py-1.5 gap-4 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-gray-400 hover:text-[#ff5a00] font-bold text-lg px-1 transition-colors"
                >
                  −
                </button>
                <span className="font-display font-semibold text-sm text-[#222222]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-gray-400 hover:text-[#ff5a00] font-bold text-lg px-1 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Button 1: Añadir al carrito */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{addedToCart ? t('detail.addedToCart') : t('detail.addToCart')}</span>
              </button>

              {/* Button 2: Comprar Ahora */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#ff5a00] text-[#ff5a00] hover:bg-[#ff5a00]/10 font-display font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all text-center"
              >
                <span>{t('detail.buyNow')}</span>
              </a>
            </div>

            {/* Shipping & Support micro-notices */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-gray-400">
                <Truck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{t('detail.freeShip')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{t('detail.adviseNotice')}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: PRODUCT GALLERY (7 columns) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col items-center">
            
            {/* Main Image Stage - Floating direct product image with Desktop Hover Zoom & Mobile Tap-to-Fullscreen */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setLightboxZoom(false);
                setIsLightboxOpen(true);
              }}
              className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden cursor-zoom-in group select-none rounded-2xl bg-gray-50/50"
            >
              <div
                className="relative w-full h-full transition-transform duration-100 ease-out"
                style={{
                  transform: zoomPos ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: zoomPos ? `${zoomPos.x}% ${zoomPos.y}%` : 'center center',
                }}
              >
                <Image
                  src={galleryImages[selectedImageIndex]}
                  alt={product.nombre}
                  fill
                  className="object-contain object-center drop-shadow-md"
                  priority
                />
              </div>

              {/* Zoom Hint Badge */}
              {!zoomPos && (
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Search className="w-3.5 h-3.5 text-[#ff5a00]" />
                  <span className="hidden sm:inline">{t('detail.zoomHint')}</span>
                  <span className="inline sm:hidden">{t('detail.zoomHintMobile')}</span>
                </div>
              )}
            </div>

            {/* Full-Screen Mobile / Desktop Lightbox Modal */}
            <AnimatePresence>
              {isLightboxOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  {/* Top Bar with Product Info & Close Button */}
                  <div className="flex items-center justify-between text-white z-10">
                    <div className="space-y-0.5">
                      <p className="text-xs text-[#ff5a00] font-bold uppercase tracking-wider">{product.linea}</p>
                      <h3 className="text-base sm:text-lg font-bold">{product.nombre}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(false);
                      }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Cerrar vista ampliada"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Center Stage Image Viewer (With Tap to Zoom in Lightbox) */}
                  <div
                    className="relative flex-1 w-full max-h-[75vh] my-auto flex items-center justify-center overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="relative w-full h-full max-w-4xl max-h-full flex items-center justify-center cursor-pointer select-none"
                      onClick={() => setLightboxZoom((prev) => !prev)}
                    >
                      <Image
                        src={galleryImages[selectedImageIndex]}
                        alt={product.nombre}
                        fill
                        className={`object-contain transition-transform duration-300 ${
                          lightboxZoom ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                        }`}
                        priority
                      />
                    </div>

                    {/* Prev / Next Controls */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                          }}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Bottom Thumbnails */}
                  <div className="flex items-center justify-center gap-3 z-10 pt-2" onClick={(e) => e.stopPropagation()}>
                    {galleryImages.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg border-2 overflow-hidden bg-black/40 transition-all p-1 flex items-center justify-center ${
                          selectedImageIndex === idx
                            ? 'border-[#ff5a00] scale-105'
                            : 'border-white/30 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={imgSrc}
                            alt={`Miniatura ampliada ${idx + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnails Strip & Video Button */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-lg border-2 overflow-hidden bg-white transition-all p-1 flex items-center justify-center ${
                    selectedImageIndex === idx
                      ? 'border-[#ff5a00] shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={imgSrc}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </button>
              ))}

              {/* Video Thumbnail Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="relative w-20 h-16 rounded-lg bg-[#111111] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#ff5a00] transition-colors shadow-sm"
              >
                <Play className="w-5 h-5 fill-white text-white" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. 6-STAT SUMMARY CARDS ("Beneficios del producto") */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-14">
        <div className="bg-white border border-gray-200/80 rounded-2xl py-6 px-4 sm:px-8 shadow-xs">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            
            {/* Stat 1: Alcance */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <svg className="w-9 h-9 text-[#ff5a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="5 9 2 12 5 15" />
                  <polyline points="9 5 12 2 15 5" />
                  <polyline points="15 19 12 22 9 19" />
                  <polyline points="19 9 22 12 19 15" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug">
                  {formattedAlcance}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statAlcance')}
                </p>
              </div>
            </div>

            {/* Stat 2: Joules */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <Zap className="w-9 h-9 text-[#ff5a00] stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug">
                  {product.joules || '6.0 J'}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statJoules')}
                </p>
              </div>
            </div>

            {/* Stat 3: Alimentación */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <Plug className="w-9 h-9 text-[#ff5a00] stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug">
                  {formatAlimentacion(product.alimentacion || product.voltaje || '110 V / 220 V')}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statPower')}
                </p>
              </div>
            </div>

            {/* Stat 4: Panel Solar */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <Sun className="w-9 h-9 text-[#ff5a00] stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug max-w-[150px] mx-auto">
                  {t('detail.statSolarTitle')}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statSolarLabel')}
                </p>
              </div>
            </div>

            {/* Stat 5: Consumo / Eficiencia */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <Leaf className="w-9 h-9 text-[#ff5a00] stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug">
                  {t('detail.statConsumpTitle')}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statConsumpLabel')}
                </p>
              </div>
            </div>

            {/* Stat 6: Garantía */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-10 flex items-center justify-center">
                <ShieldCheck className="w-9 h-9 text-[#ff5a00] stroke-[1.8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] leading-snug">
                  {t('detail.statWarrantyTitle')}
                </h4>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mt-1">
                  {t('detail.statWarrantyLabel')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. "INFORMACIÓN TÉCNICA" (Así funciona + Qué incluye la caja) */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Así funciona */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h3 className="font-display font-extrabold text-3xl text-[#171717]">
                {t('detail.howTitle')}
              </h3>
              <p className="text-sm text-gray-500 font-medium pt-1">
                {t('detail.howSub')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              {/* Step 1 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-xs">
                  <FileText className="w-9 h-9 text-[#ff5a00]" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#171717]">
                  {t('detail.step1Title')}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t('detail.step1Desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-xs">
                  <Wrench className="w-9 h-9 text-[#ff5a00]" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#171717]">
                  {t('detail.step2Title')}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t('detail.step2Desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-xs">
                  <Zap className="w-9 h-9 text-[#ff5a00]" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#171717]">
                  {t('detail.step3Title')}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t('detail.step3Desc')}
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-9 h-9 text-[#ff5a00]" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#171717]">
                  {t('detail.step4Title')}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t('detail.step4Desc')}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Qué incluye la caja */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] tracking-tight">
                {t('detail.boxTitle')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* List */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem1')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem2')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem3')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem4')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem5')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  <span>{t('detail.boxItem6')}</span>
                </div>
              </div>

              {/* Box Content Image */}
              <div className="relative rounded-xl overflow-hidden bg-white p-2 h-[260px] flex items-center justify-center border border-gray-100 shadow-xs">
                <Image
                  src="/assets/images/raF4WaHkDInyAIl4Bq7JbtFY.webp"
                  alt="Contenido de la caja Balkran"
                  fill
                  className="object-contain object-center"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. "ESPECIFICACIONES TÉCNICAS" & "¿CUÁL ES IDEAL PARA TI?" */}
      <section className="bg-[#fafaf9] border-y border-gray-200/80 py-16">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left: Especificaciones Técnicas (4 columns) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#171717]">
                  {t('detail.techSpecsTitle')}
                </h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm divide-y divide-gray-200/60 flex-1 flex flex-col justify-between py-1">
                {techRows.map((row, i) => (
                  <div key={i} className="flex justify-between py-1.5">
                    <span className="font-medium text-gray-500">{row.label}</span>
                    <span className="font-semibold text-[#171717] text-right pl-4">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive 4-Product Comparator */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              
              {/* Header: Title + Clear Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-xs">
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-tight flex items-center gap-2">
                    <span>{t('detail.compTitle')}</span>
                    <span className="bg-orange-100 text-[#ff5a00] text-xs font-bold px-2 py-0.5 rounded-full">
                      {comparisonModels.length}/4
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    {t('detail.compSub')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearCompare}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#ff5a00] uppercase tracking-wider transition-colors border border-gray-200 hover:border-orange-300 px-3 py-1.5 rounded-xl bg-white shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <span>{t('detail.compClear')}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Dynamic 4-Slot Comparison Table */}
              <div className="bg-white border border-gray-200/90 rounded-2xl overflow-x-auto shadow-xs flex-1">
                <div className="min-w-[640px] flex flex-col justify-between h-full">
                  
                  {/* Table Header Row: Blank left label + product columns + Add Slot */}
                  <div className={`grid grid-cols-5 text-center text-xs divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/20`}>
                    <div className="p-3 bg-gray-50/50 flex items-center justify-center font-bold text-gray-400 text-xs">
                      {t('detail.compModels')}
                    </div>

                    {/* Active Product Columns */}
                    {comparisonModels.map((m, i) => (
                      <div
                        key={m.slug + i}
                        className={`p-3 relative flex flex-col items-center justify-between min-h-[170px] ${
                          m.isPopular ? 'bg-[#fff5ee]' : 'bg-white'
                        }`}
                      >
                        {/* Remove Product X Button */}
                        {comparisonModels.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCompare(m.slug)}
                            title="Quitar de comparación"
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors shadow-2xs z-10"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {m.isPopular ? (
                          <span className="bg-[#ff5a00] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-1">
                            {t('detail.compCurrent')}
                          </span>
                        ) : <span className="h-4" />}

                        <span className="font-display font-bold text-xs sm:text-sm text-[#111111] my-1 line-clamp-1">
                          {m.name}
                        </span>

                        <div className="relative w-20 sm:w-24 h-16 my-1">
                          <Image src={m.img} alt={m.name} fill className="object-contain" />
                        </div>
                      </div>
                    ))}

                    {/* Empty Slots: "Añadir producto +" */}
                    {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                      <div
                        key={'empty-slot-' + idx}
                        onClick={() => setShowAddModal(true)}
                        className="p-4 flex flex-col items-center justify-center min-h-[170px] bg-gray-50/40 hover:bg-orange-50/40 border-2 border-dashed border-gray-200 hover:border-[#ff5a00] transition-all cursor-pointer group text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-[#ff5a00] group-hover:bg-[#ff5a00] text-gray-400 group-hover:text-white flex items-center justify-center transition-all shadow-xs mb-2">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-display font-bold text-xs text-gray-600 group-hover:text-[#ff5a00]">
                          {t('detail.compAddPlus')}
                        </span>
                        <span className="text-[10px] text-gray-400 pt-0.5">{t('detail.compOption')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rows Section */}
                  <div className="divide-y divide-gray-100 text-xs sm:text-sm flex-1 flex flex-col justify-around">
                    
                    {/* Alcance Row */}
                    <div className="grid grid-cols-5 text-center items-stretch divide-x divide-gray-100 min-h-[50px]">
                      <div className="flex items-center text-left font-semibold text-gray-500 pl-4 bg-gray-50/30">
                        {t('detail.tableMaxReach')}
                      </div>
                      {comparisonModels.map((m, i) => (
                        <div key={i} className={`flex items-center justify-center p-2 sm:p-3 font-bold ${m.isPopular ? 'bg-[#fff8f3] text-[#ff5a00]' : 'text-[#111111]'}`}>
                          <span>{m.alcance}</span>
                        </div>
                      ))}
                      {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center p-2 text-gray-300 bg-gray-50/10">
                          -
                        </div>
                      ))}
                    </div>

                    {/* Joules Row */}
                    <div className="grid grid-cols-5 text-center items-stretch divide-x divide-gray-100 min-h-[50px]">
                      <div className="flex items-center text-left font-semibold text-gray-500 pl-4 bg-gray-50/30">
                        {t('detail.tableOutputEnergy')}
                      </div>
                      {comparisonModels.map((m, i) => (
                        <div key={i} className={`flex items-center justify-center p-2 sm:p-3 font-bold ${m.isPopular ? 'bg-[#fff8f3] text-[#ff5a00]' : 'text-[#111111]'}`}>
                          <span>{m.joules}</span>
                        </div>
                      ))}
                      {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center p-2 text-gray-300 bg-gray-50/10">
                          -
                        </div>
                      ))}
                    </div>

                    {/* Alimentación Row */}
                    <div className="grid grid-cols-5 text-center items-stretch divide-x divide-gray-100 min-h-[50px]">
                      <div className="flex items-center text-left font-semibold text-gray-500 pl-4 bg-gray-50/30">
                        {t('detail.tablePowerSupply')}
                      </div>
                      {comparisonModels.map((m, i) => (
                        <div key={i} className={`flex items-center justify-center p-2 sm:p-3 font-bold ${m.isPopular ? 'bg-[#fff8f3] text-[#ff5a00]' : 'text-[#111111]'}`}>
                          <span className="text-[11px] sm:text-xs leading-tight">{m.voltaje}</span>
                        </div>
                      ))}
                      {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center p-2 text-gray-300 bg-gray-50/10">
                          -
                        </div>
                      ))}
                    </div>

                    {/* Ideal para Row */}
                    <div className="grid grid-cols-5 text-center items-stretch divide-x divide-gray-100 min-h-[50px]">
                      <div className="flex items-center text-left font-semibold text-gray-500 pl-4 bg-gray-50/30">
                        {t('detail.tableIdealFor')}
                      </div>
                      {comparisonModels.map((m, i) => {
                        const cleanIdeal = (str: string) => {
                          if (!str) return t('detail.idealMedium');
                          const lower = str.toLowerCase();
                          if (lower.includes('pequeñ') || lower.includes('18 ha') || lower.includes('25 ha') || lower.includes('15 km')) return t('detail.idealSmall');
                          if (lower.includes('median') || lower.includes('50 ha') || lower.includes('70 ha') || lower.includes('40 km') || lower.includes('50 km')) return t('detail.idealMedium');
                          if (lower.includes('grand') || lower.includes('105 ha') || lower.includes('160 ha') || lower.includes('80 km') || lower.includes('100 km')) return t('detail.idealLarge');
                          if (lower.includes('larga') || lower.includes('industrial') || lower.includes('210 ha') || lower.includes('315 ha') || lower.includes('150 km')) return t('detail.idealExtensive');
                          return str;
                        };

                        return (
                          <div key={i} className={`flex items-center justify-center p-2 sm:p-3 font-bold ${m.isPopular ? 'bg-[#fff8f3] text-[#ff5a00]' : 'text-[#111111]'}`}>
                            <span className="text-[11px] sm:text-xs leading-tight">{cleanIdeal(m.ideal)}</span>
                          </div>
                        );
                      })}
                      {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center p-2 text-gray-300 bg-gray-50/10">
                          -
                        </div>
                      ))}
                    </div>

                    {/* Action Links Row */}
                    <div className="grid grid-cols-5 text-center items-stretch divide-x divide-gray-100 min-h-[52px]">
                      <div className="flex items-center text-left font-medium text-gray-400 pl-4 bg-gray-50/30" />
                      {comparisonModels.map((m, i) => (
                        <div key={i} className={`flex items-center justify-center p-3 ${m.isPopular ? 'bg-[#fff8f3]' : ''}`}>
                          <Link
                            href={`/productos/${m.slug}`}
                            className="text-xs font-bold text-[#ff5a00] hover:underline uppercase tracking-wider inline-block"
                          >
                            {t('detail.viewProduct')}
                          </Link>
                        </div>
                      ))}
                      {Array.from({ length: 4 - comparisonModels.length }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center p-3 bg-gray-50/10">
                          <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="text-xs font-bold text-gray-400 hover:text-[#ff5a00] transition-colors"
                          >
                            {t('detail.add')}
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

        {/* Modal Selection to Add Product */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-[#111111]">{t('detail.modalTitle')}</h4>
                    <p className="text-xs text-gray-500 font-medium pt-0.5">{t('detail.modalSub')}</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-100 bg-white">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('detail.modalSearch')}
                      value={compareSearch}
                      onChange={(e) => setCompareSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff5a00] bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Product Catalog List */}
                <div className="p-4 overflow-y-auto space-y-2 max-h-[380px]">
                  {allProds
                    .filter((p) =>
                      p.nombre.toLowerCase().includes(compareSearch.toLowerCase()) ||
                      p.linea.toLowerCase().includes(compareSearch.toLowerCase())
                    )
                    .map((p) => {
                      const isAlreadySelected = selectedCompareSlugs.includes(p.slug);
                      return (
                        <div
                          key={p.slug}
                          className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all ${
                            isAlreadySelected
                              ? 'bg-gray-50 border-gray-200 opacity-60'
                              : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-xs'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="relative w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0">
                              <Image src={p.imagen_local} alt={p.nombre} fill className="object-contain" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="font-display font-bold text-xs text-[#111111] truncate">{p.nombre}</h5>
                              <p className="text-[11px] text-gray-500 truncate">
                                {formatAlcance(p.alcance)} • {p.joules || '1.5J'}
                              </p>
                            </div>
                          </div>

                          {isAlreadySelected ? (
                            <span className="text-[11px] font-bold text-gray-400 px-3 py-1.5 bg-gray-100 rounded-full whitespace-nowrap shrink-0">
                              {t('detail.added')}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddCompare(p.slug)}
                              className="bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-xs whitespace-nowrap shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5 shrink-0" />
                              <span>{t('detail.add')}</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* 6. TABBED SECTION (Recomendaciones de instalación, Ficha técnica, Certificaciones, Valoraciones) */}
      <section id="seccion-tabs" className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-16 scroll-mt-24">
        
        {/* Navigation Tabs Header */}
        <div className="border border-gray-200 rounded-2xl bg-white p-2 flex flex-wrap items-center justify-between gap-2 shadow-xs mb-8">
          
          <button
            type="button"
            onClick={() => setActiveTab('instalacion')}
            className={`flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
              activeTab === 'instalacion'
                ? 'bg-white border-2 border-[#ff5a00] text-[#ff5a00] shadow-xs'
                : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{t('detail.tabInstalacion')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ficha')}
            className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
              activeTab === 'ficha'
                ? 'bg-white border-2 border-[#ff5a00] text-[#ff5a00] shadow-xs'
                : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t('detail.tabFicha')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificaciones')}
            className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
              activeTab === 'certificaciones'
                ? 'bg-white border-2 border-[#ff5a00] text-[#ff5a00] shadow-xs'
                : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('detail.tabCertificaciones')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('valoraciones')}
            className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
              activeTab === 'valoraciones'
                ? 'bg-white border-2 border-[#ff5a00] text-[#ff5a00] shadow-xs'
                : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
            }`}
          >
            <Star className="w-4 h-4 fill-[#ff5a00] text-[#ff5a00]" />
            <span>{t('detail.tabValoraciones')} ({product.valoraciones || 0})</span>
          </button>

        </div>

        {/* TAB CONTENT 1: RECOMMENDATIONS (real installation info from cercasbalkran.com) */}
        {activeTab === 'instalacion' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xs">
            <div className="space-y-8">
              {/* Header */}
              <div className="border-b border-gray-100 pb-6">
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-widest block">
                  {t('detail.recBadge')}
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] leading-tight">
                  {t('detail.recTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium pt-2">
                  {t('detail.recSub')}
                </p>
              </div>

              {isEnergizador ? (
                <div className="space-y-8 text-xs sm:text-sm text-gray-600">
                  {/* Montaje */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Home className="w-4 h-4 text-[#ff5a00]" />
                    </div>
                    <div className="leading-relaxed text-justify">
                      <p className="font-bold text-[#111111]">{t('detail.instMontajeTitle')}</p>
                      <p className="pt-1">{t('detail.instMontajeDesc')}</p>
                    </div>
                  </div>

                  {/* Instalación polo a tierra */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-[#ff5a00]" />
                    </div>
                    <div className="leading-relaxed text-justify">
                      <p className="font-bold text-[#111111]">{t('detail.instTierraTitle')}</p>
                      <p className="pt-1">{t('detail.instTierraDesc')}</p>
                      {product.varillas_tierra && (
                        <p className="pt-1">{t('detail.instTierraVarillas').replace('{n}', product.varillas_tierra)}</p>
                      )}
                    </div>
                  </div>

                  {/* Factores de una incorrecta instalación polo a tierra */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-[#ff5a00]" />
                    </div>
                    <div className="leading-relaxed text-justify">
                      <p className="font-bold text-[#111111]">{t('detail.instTierraVarsTitle')}</p>
                      <ul className="pt-1 list-disc pl-4 space-y-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <li key={n}>{t(`detail.instTierraVar${n}`)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Distanciamiento de las cuerdas para la cerca eléctrica */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Ruler className="w-4 h-4 text-[#ff5a00]" />
                    </div>
                    <div className="leading-relaxed text-justify w-full">
                      <p className="font-bold text-[#111111]">{t('detail.instDistTitle')}</p>
                      <p className="pt-1">{t('detail.instDistDesc')}</p>
                      <div className="mt-4 rounded-2xl border border-gray-200/90 bg-white p-4 flex justify-center">
                        <Image
                          src="/assets/images/numeroLineas.webp"
                          alt="Figura de conexión recomendada para el cercado eléctrico Balkran"
                          width={886}
                          height={467}
                          className="w-full max-w-[480px] h-auto object-contain rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Requisitos de instalación */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4 text-[#ff5a00]" />
                    </div>
                    <div className="leading-relaxed text-justify w-full">
                      <p className="font-bold text-[#111111]">{t('detail.instRequisitosTitle')}</p>
                      <ul className="pt-1 list-disc pl-4 space-y-1">
                        {[1, 2, 3, 4].map((n) => (
                          <li key={n}>{t(`detail.instReq${n}`)}</li>
                        ))}
                      </ul>
                      <div className="mt-4 rounded-2xl border border-gray-200/90 bg-white p-4 flex justify-center">
                        <Image
                          src="/assets/images/tablaFichaTecnica.webp"
                          alt="Tabla de distancia de separación mínima para cerca eléctrica Balkran"
                          width={680}
                          height={232}
                          className="w-full max-w-[400px] h-auto object-contain rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4 text-[#ff5a00]" />
                  </div>
                  <p className="leading-relaxed">{t('detail.accTabNote')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: FICHA TÉCNICA (real specs + DPI technology) */}
        {activeTab === 'ficha' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xs space-y-8">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                {t('detail.ftTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium pt-1">
                {t('detail.ftDesc')}
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h4 className="font-display font-bold text-sm text-[#111111]">{t('detail.techSpecsTitle')}</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {techRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-1 px-5 py-2.5 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-gray-500">{row.label}</span>
                    <span className="font-semibold text-[#171717] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {product.recomendado_para && product.recomendado_para.length > 0 && (
              <div>
                <h4 className="font-display font-bold text-sm text-[#111111]">{t('detail.recomendado')}</h4>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.recomendado_para.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-3 bg-white border border-gray-200/90 text-[#1a2130] text-sm font-bold px-4 py-2 rounded-full shadow-xs hover:border-[#ff5a00]/50 hover:shadow-md transition-all"
                    >
                      {animalIcon[a] && (
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff5a00] text-white shrink-0 shadow-xs">
                          <img
                            src={animalIcon[a]}
                            alt={a}
                            className="w-6 h-6 object-contain brightness-0 invert"
                            loading="lazy"
                          />
                        </span>
                      )}
                      <span className="pr-1">{a}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {isEnergizador && (
              <div className="space-y-4">
                {[
                  { title: t('detail.ftDPI'), desc: t('detail.ftDPIDesc') },
                  { title: t('detail.ftMant'), desc: t('detail.ftMantDesc') },
                  { title: t('detail.ftPotencia'), desc: t('detail.ftPotenciaDesc') },
                  { title: t('detail.ftIndicadores'), desc: t('detail.ftIndicadoresDesc') },
                  { title: t('detail.ftTerminales'), desc: t('detail.ftTerminalesDesc') },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[#ff5a00] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      <p className="font-bold text-[#111111]">{s.title}</p>
                      <p className="pt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {manualPdf && (
              <div className="pt-2">
                <a
                  href={manualPdf}
                  download
                  className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#ff5a00] text-white font-display font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('detail.docBtn')}</span>
                </a>
                <p className="text-[11px] text-gray-400 font-medium pt-2">
                  {t('detail.docHint')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 3: CERTIFICACIONES (real Balkran certifications) */}
        {activeTab === 'certificaciones' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xs space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                {t('detail.certTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium pt-1 max-w-2xl">
                {t('detail.certIntro')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="border border-gray-200 rounded-2xl p-6 text-center space-y-2">
                <CertLogo
                  src="/assets/images/logo-retie.webp"
                  alt="RETIE"
                  fallback={<ShieldCheck className="w-8 h-8 text-[#ff5a00] mx-auto" />}
                />
                <h4 className="font-bold text-sm text-[#111111]">{t('detail.cert1Title')}</h4>
                <p className="text-xs text-gray-500">{t('detail.cert1Desc')}</p>
                <a
                  href="/assets/pdf/certificado_retie.pdf"
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5a00] hover:underline pt-1"
                >
                  <FileText className="w-3.5 h-3.5" /> {t('detail.certBtn')}
                </a>
              </div>
              <div className="border border-gray-200 rounded-2xl p-6 text-center space-y-2">
                <CertLogo
                  src="/assets/images/logos/logo-iso9001.webp"
                  alt="ISO 9001:2015"
                  fallback={<Award className="w-8 h-8 text-[#ff5a00] mx-auto" />}
                />
                <h4 className="font-bold text-sm text-[#111111]">{t('detail.cert2Title')}</h4>
                <p className="text-xs text-gray-500">{t('detail.cert2Desc')}</p>
                <a
                  href="/assets/pdf/certificado_iso9001.pdf"
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5a00] hover:underline pt-1"
                >
                  <FileText className="w-3.5 h-3.5" /> {t('detail.certBtn')}
                </a>
              </div>
              <div className="border border-gray-200 rounded-2xl p-6 text-center space-y-2">
                <CertLogo
                  src="/assets/images/logos/logo-bic.webp"
                  alt="Sociedades BIC"
                  fallback={<Lock className="w-8 h-8 text-[#ff5a00] mx-auto" />}
                />
                <h4 className="font-bold text-sm text-[#111111]">{t('detail.cert3Title')}</h4>
                <p className="text-xs text-gray-500">{t('detail.cert3Desc')}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: VALORACIONES (real: no reviews yet) */}
        {activeTab === 'valoraciones' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xs space-y-8">
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
                {t('detail.reviewsTitle')} ({product.valoraciones || 0})
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium pt-1">
                {t('detail.reviewsSub')}
              </p>
            </div>

            <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center space-y-2">
              <Star className="w-10 h-10 text-gray-300 mx-auto" />
              <h4 className="font-display font-bold text-base text-[#111111]">{t('detail.noReviews')}</h4>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {t('detail.noReviewsSub')}
              </p>
            </div>
          </div>
        )}

      </section>

      {/* 7. "TAMBIÉN PODRÍA INTERESARTE" CAROUSEL / GRID */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-16">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
                  {t('detail.relatedTitle')}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevCarousel}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextCarousel}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden min-h-[220px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.98 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {Array.from({ length: Math.min(4, relatedProducts.length) }).map((_, idx) => {
                    const productIndex = (carouselIndex + idx) % relatedProducts.length;
                    const relProduct = relatedProducts[productIndex];
                    if (!relProduct) return null;

                    return (
                      <motion.div
                        key={`${relProduct.slug}-${productIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.75,
                          delay: idx * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#ff5a00]/40 transition-all space-y-4"
                      >
                        {/* Top: Image on Left, Details on Right */}
                        <div className="grid grid-cols-12 gap-3 items-center min-h-[110px]">
                          {/* Left: Image */}
                          <div className="col-span-5 relative h-24 sm:h-28 w-full flex items-center justify-center">
                            <Image
                              src={relProduct.imagen_local}
                              alt={relProduct.nombre}
                              fill
                              className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Right: Text Information */}
                          <div className="col-span-7 space-y-1">
                            <h3 className="font-display font-extrabold text-base sm:text-lg text-[#111111] leading-tight group-hover:text-[#ff5a00] transition-colors">
                              {relProduct.nombre}
                            </h3>

                            <p className="text-[11px] text-gray-400 font-medium leading-snug">
                              {relProduct.categoria || t('detail.catFallback')} • {formatAlcance(relProduct.alcance)}
                            </p>

                            <div className="pt-1">
                              <span className="font-display font-extrabold text-base text-[#ff5a00]">
                                {relProduct.precio}
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold block">
                                {t('detail.vatIncluded')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom: CTA Button */}
                        <div>
                          <Link
                            href={`/productos/${relProduct.slug}`}
                            className="w-full inline-flex items-center justify-center gap-1 border border-[#ff5a00] text-[#ff5a00] hover:bg-[#ff5a00] hover:text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all text-center"
                          >
                            <span>{t('productos.btnViewDetails')}</span>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* 8. PREGUNTAS FRECUENTES SECTION */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Accordion FAQs (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
              {t('detail.faqTitle')}
            </h2>

            <div className="divide-y divide-gray-200/80 border-y border-gray-200/80">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#111111] group-hover:text-[#ff5a00] transition-colors">
                      {faq.q}
                    </span>
                    <span className="text-[#ff5a00] font-bold text-lg shrink-0">
                      {activeFaq === idx ? '−' : '+'}
                    </span>
                  </button>

                  {activeFaq === idx && (
                    <div className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Help Card (5 columns - Vertically Centered) */}
          <div className="lg:col-span-5 bg-[#fff7f0] border border-orange-100/80 rounded-3xl p-7 lg:p-9 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ffe7d8] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#ff5a00]" />
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">
              {t('detail.doubtTitle')}
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              {t('detail.doubtDesc')}
            </p>

            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#ff5a00] text-[#ff5a00] hover:bg-[#ff5a00] hover:text-white font-display font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-full transition-all"
              >
                <span>{t('detail.talkAdvisor')}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FLOATING CARD CTA BANNER */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0c] text-white border border-amber-500/20 shadow-2xl min-h-[280px] flex items-center p-8 lg:p-12">
          
          {/* Background Lightning Effect Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/MaTJDeNim7BwReSBMd1ZWKVrEk.webp"
              alt="Balkran Asesoría y Cotización Banner"
              fill
              className="object-cover object-center brightness-125 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              {t('detail.ctaTitle')}
            </h2>

            <div className="space-y-1 text-xs sm:text-sm text-gray-200 font-semibold">
              <p>{t('detail.ctaCheck1')}</p>
              <p>{t('detail.ctaCheck2')}</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2.5 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('detail.addToCart')}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO DEMO MODAL */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-[#111111] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 text-white space-y-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="font-display font-extrabold text-lg text-white">
                {t('detail.videoTitle')} – {product.nombre}
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center relative">
              <p className="text-xs text-gray-400 text-center px-4">
                [{t('detail.videoDesc')} {product.nombre}]
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function CertLogo({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-14 w-auto max-w-full object-contain mx-auto"
      loading="lazy"
    />
  );
}
