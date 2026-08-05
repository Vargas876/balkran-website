'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, Grid, List, CheckCircle, 
  HelpCircle, ArrowRight, Zap, Shield, HelpCircle as QuestionIcon,
  ChevronLeft, ChevronRight, RefreshCw, X, ShoppingCart, Sparkles, User, Clock, Target, Plus, Minus, MessageCircle, GitCompare
} from 'lucide-react';
import { getAllProducts, Product } from '@/lib/products';
import { useLanguage } from '@/context/LanguageContext';
import { formatLinea, formatCategoria, formatSubtitulo } from '@/lib/i18nHelpers';

export default function ProductosPage() {
  const { t, language } = useLanguage();
  const allProducts = useMemo(() => getAllProducts(), []);

  // Dynamic 4-Product Interactive Comparator State
  const defaultCompareSlugs = ['b1000d', 'b1000s'];
  const [selectedCompareSlugs, setSelectedCompareSlugs] = useState<string[]>(defaultCompareSlugs);
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
    setSelectedCompareSlugs(defaultCompareSlugs);
  };

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory((prev) => (prev === catName ? 'TODOS' : catName));
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const formatReach = (reach: string = '') => {
    if (language === 'en') return reach.replace(/Hasta /g, 'Up to ');
    if (language === 'fr') return reach.replace(/Hasta /g, 'Jusqu\'à ');
    return reach;
  };

  const formatIdeal = (ideal: string = '') => {
    if (language === 'en') {
      return ideal
        .replace(/Fincas medianas/g, 'Medium farms')
        .replace(/Cercados de 30 Km con batería o red/g, '30 Km fencing with battery or mains')
        .replace(/Fincas sin red eléctrica/g, 'Farms without electric grid');
    }
    if (language === 'fr') {
      return ideal
        .replace(/Fincas medianas/g, 'Propriétés moyennes')
        .replace(/Cercados de 30 Km con batería o red/g, 'Clôtures de 30 km avec batterie ou secteur')
        .replace(/Fincas sin red eléctrica/g, 'Fermes sans réseau électrique');
    }
    return ideal;
  };

  const formatVoltaje = (v: string = '') => {
    if (language === 'en') {
      return v.replace(/12V Batería \/ Panel Solar/g, '12V Battery / Solar Panel');
    }
    if (language === 'fr') {
      return v.replace(/12V Batería \/ Panel Solar/g, '12V Batterie / Panneau Solaire');
    }
    return v;
  };

  const comparisonModels = selectedCompareSlugs.map((slugKey) => {
    const found = allProducts.find((p) => p.slug.toLowerCase() === slugKey.toLowerCase()) || allProducts[0];
    return {
      name: found.nombre,
      alcance: formatReach(found.alcance || 'Hasta 30 km'),
      joules: found.joules || '1.5J',
      voltaje: formatVoltaje(found.alimentacion || found.voltaje || '12V / 110V'),
      ideal: formatIdeal(found.ideal_para || 'Fincas medianas'),
      img: found.imagen_local,
      slug: found.slug,
    };
  });

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [selectedReach, setSelectedReach] = useState<string>('TODOS');
  const [selectedPower, setSelectedPower] = useState<string>('TODOS');
  const [selectedLineType, setSelectedLineType] = useState<string>('TODOS');
  const [minPrice, setMinPrice] = useState<number>(6000);
  const [maxPrice, setMaxPrice] = useState<number>(2370000);
  const [sortBy, setSortBy] = useState<string>('mas-vendidos');
  const [activeFaq, setActiveFaq] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const normalizeText = (str: string = '') =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // Reset to page 1 whenever any filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedReach, selectedPower, selectedLineType, minPrice, maxPrice, sortBy]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search term (Accent & case insensitive across all metadata fields)
      if (searchTerm.trim() !== '') {
        const query = normalizeText(searchTerm.trim());
        const searchableText = normalizeText([
          product.nombre,
          product.linea,
          product.slug,
          product.categoria,
          product.descripcion || '',
          product.subtitulo || '',
          product.ideal_para || '',
          product.alimentacion || '',
          product.voltaje || '',
          product.alcance || '',
          product.joules || ''
        ].join(' '));

        if (!searchableText.includes(query)) return false;
      }

      // Category
      if (selectedCategory !== 'TODOS') {
        if (selectedCategory === 'Energizadores' && product.categoria !== 'Energizadores') return false;
        if (selectedCategory === 'Kits Solares' && product.categoria !== 'Kits Solares') return false;
        if (selectedCategory === 'Accesorios' && product.categoria !== 'Accesorios') return false;
      }

      // Power Source (Alimentación) filter
      if (selectedPower !== 'TODOS') {
        const alim = normalizeText(product.alimentacion || '');
        const volt = normalizeText(product.voltaje || '');
        const cat = normalizeText(product.categoria || '');
        if (selectedPower === '110v' && !alim.includes('110v') && !volt.includes('110v')) return false;
        if (selectedPower === 'dual' && !alim.includes('dual') && !volt.includes('12v / 110v')) return false;
        if (selectedPower === 'solar' && !alim.includes('solar') && !alim.includes('bateria') && cat !== 'kits solares') return false;
      }

      // Line Type (Rendimiento) filter
      if (selectedLineType !== 'TODOS') {
        const line = normalizeText(product.linea || '');
        const name = normalizeText(product.nombre || '');
        const isHD = line.includes('bh') || line.includes('bhd') || line.includes('heavy') || name.includes('h');
        if (selectedLineType === 'heavy-duty' && !isHD) return false;
        if (selectedLineType === 'estandar' && isHD) return false;
      }

      // Reach filter
      if (selectedReach !== 'TODOS') {
        const alc = parseInt(product.alcance?.replace(/\D/g, '') || '0', 10);
        if (selectedReach === 'hasta-20' && alc > 20) return false;
        if (selectedReach === '20-40' && (alc < 20 || alc > 40)) return false;
        if (selectedReach === 'mas-40' && alc < 40) return false;
      }

      // Price filter
      if (product.precioNumerico > 0) {
        if (product.precioNumerico < minPrice || product.precioNumerico > maxPrice) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.precioNumerico - b.precioNumerico;
      if (sortBy === 'precio-desc') return b.precioNumerico - a.precioNumerico;
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      return (b.esMasVendido ? 1 : 0) - (a.esMasVendido ? 1 : 0);
    });
  }, [allProducts, searchTerm, selectedCategory, selectedPower, selectedLineType, selectedReach, minPrice, maxPrice, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNum: number) => {
    const validPage = Math.max(1, Math.min(pageNum, totalPages || 1));
    setCurrentPage(validPage);
    if (typeof window !== 'undefined') {
      const elem = document.getElementById('catalog');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('TODOS');
    setSelectedPower('TODOS');
    setSelectedLineType('TODOS');
    setSelectedReach('TODOS');
    setMinPrice(6000);
    setMaxPrice(2370000);
    setSortBy('mas-vendidos');
    setCurrentPage(1);
  };

  // FAQ Items
  const faqList = [
    {
      id: 0,
      num: '01',
      titleKey: 'prodFaq.q1',
      textKey: 'prodFaq.a1',
      recommended: {
        name: 'B4500H',
        tagKey: 'prodFaq.recTag1',
        descKey: 'prodFaq.recDesc1',
        img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp',
        price: '$ 628.000',
        slug: 'b4500h'
      }
    },
    {
      id: 1,
      num: '02',
      titleKey: 'prodFaq.q2',
      textKey: 'prodFaq.a2',
      recommended: {
        name: 'B9000H',
        tagKey: 'prodFaq.recTag2',
        descKey: 'prodFaq.recDesc2',
        img: '/assets/images/FOoiuEr2MaSvKg7dCeFbUlLOc2Q.webp',
        price: '$ 732.000',
        slug: 'b9000h'
      }
    },
    {
      id: 2,
      num: '03',
      titleKey: 'prodFaq.q3',
      textKey: 'prodFaq.a3',
      recommended: {
        name: 'Kit Solar B1000S',
        tagKey: 'prodFaq.recTag3',
        descKey: 'prodFaq.recDesc3',
        img: '/assets/images/WbATsHs1kNRaUygDgAYoxSzSKI.webp',
        price: '$ 1.250.000',
        slug: 'kit-solar-b1000s'
      }
    },
    {
      id: 3,
      num: '04',
      titleKey: 'prodFaq.q4',
      textKey: 'prodFaq.a4',
      recommended: {
        name: 'B1500',
        tagKey: 'prodFaq.recTag4',
        descKey: 'prodFaq.recDesc4',
        img: '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
        price: '$ 364.000',
        slug: 'b1500'
      }
    },
    {
      id: 4,
      num: '05',
      titleKey: 'prodFaq.q5',
      textKey: 'prodFaq.a5',
      recommended: {
        name: 'Garantía Balkran 2 Años',
        nameKey: 'prodFaq.recName5',
        tagKey: 'prodFaq.recTag5',
        descKey: 'prodFaq.recDesc5',
        img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp',
        price: '$ 628.000',
        slug: 'b4500h'
      }
    },
    {
      id: 5,
      num: '06',
      titleKey: 'prodFaq.q6',
      textKey: 'prodFaq.a6',
      recommended: {
        name: 'Accesorios y Guías',
        nameKey: 'prodFaq.recName6',
        tagKey: 'prodFaq.recTag6',
        descKey: 'prodFaq.recDesc6',
        img: '/assets/images/cmdjt1TwD1Wv8UHkCpi5AG6iA.webp',
        price: '$ 628.000',
        slug: 'cable-aislado-x-50-metros'
      }
    },
    {
      id: 6,
      num: '07',
      titleKey: 'prodFaq.q7',
      textKey: 'prodFaq.a7',
      recommended: {
        name: 'Asesoría Personalizada',
        nameKey: 'prodFaq.recName7',
        tagKey: 'prodFaq.recTag7',
        descKey: 'prodFaq.recDesc7',
        img: '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
        price: '$ 0',
        slug: 'b4500h'
      }
    }
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans pb-0">
      
      {/* 1. HERO SECTION WITH FENCE POST ENERGIZER SUNSET BACKGROUND */}
      <section className="relative min-h-[450px] lg:min-h-[500px] flex items-center pt-32 sm:pt-36 lg:pt-38 pb-12 lg:pb-14 text-white overflow-hidden">
        {/* Background Image Overlay - Pure Natural Bright Sunset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/Portadaproductos.webp"
            alt="Balkran Energizador B9000H en Atardecer"
            fill
            className="object-cover object-center opacity-100 brightness-105"
            priority
          />
          {/* Very Subtle Text Readability Shadow - Image Shines Natural & Bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-xl space-y-6">
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t('productos.heroTitle')}
            </h1>

            <p className="font-display text-base sm:text-lg text-gray-100 font-normal leading-relaxed max-w-lg drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              {t('productos.heroDesc')}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <a
                href="#catalog"
                className="inline-flex justify-center items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>{t('productos.btnVerEnergizadores')}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="https://wa.me/573114508064?text=Hola%20Balkran%2C%20necesito%20asesor%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-black/60 hover:bg-black/80 border border-white/40 text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full backdrop-blur-sm transition-all"
              >
                <span>{t('productos.btnHablarAsesor')}</span>
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 3 CATEGORY CARDS */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: ENERGIZADORES */}
          <button
            onClick={() => handleCategorySelect('Energizadores')}
            className={`bg-white rounded-2xl p-6 border transition-all text-left flex items-center gap-6 group shadow-sm hover:shadow-md ${
              selectedCategory === 'Energizadores' ? 'border-[#ff5a00] ring-2 ring-[#ff5a00]/20' : 'border-gray-200/80 hover:border-[#ff5a00]/40'
            }`}
          >
            <div className="relative w-32 h-32 sm:w-36 sm:h-32 shrink-0">
              <Image
                src="/assets/images/d2GBw8LiGeW4Ys9M2h9YWCaw2H0.webp"
                alt="Energizadores Balkran"
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-[#1a2130] tracking-wide uppercase">
                {t('productos.cat1Title')}
              </h3>
              <span className="text-xs text-[#ff5a00] font-bold font-display inline-flex items-center gap-1 group-hover:underline">
                {t('productos.catSeeAll')}
              </span>
            </div>
          </button>

          {/* Card 2: KITS */}
          <button
            onClick={() => handleCategorySelect('Kits Solares')}
            className={`bg-white rounded-2xl p-6 border transition-all text-left flex items-center gap-6 group shadow-sm hover:shadow-md ${
              selectedCategory === 'Kits Solares' ? 'border-[#ff5a00] ring-2 ring-[#ff5a00]/20' : 'border-gray-200/80 hover:border-[#ff5a00]/40'
            }`}
          >
            <div className="relative w-32 h-32 sm:w-36 sm:h-32 shrink-0">
              <Image
                src="/assets/images/AVMEESMszhj9sqKQFK5naPSAAk.webp"
                alt="Kits Solares Balkran"
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-[#1a2130] tracking-wide uppercase">
                {t('productos.cat2Title')}
              </h3>
              <span className="text-xs text-[#ff5a00] font-bold font-display inline-flex items-center gap-1 group-hover:underline">
                {t('productos.catSeeAll')}
              </span>
            </div>
          </button>

          {/* Card 3: ACCESORIOS */}
          <button
            onClick={() => handleCategorySelect('Accesorios')}
            className={`bg-white rounded-2xl p-6 border transition-all text-left flex items-center gap-6 group shadow-sm hover:shadow-md ${
              selectedCategory === 'Accesorios' ? 'border-[#ff5a00] ring-2 ring-[#ff5a00]/20' : 'border-gray-200/80 hover:border-[#ff5a00]/40'
            }`}
          >
            <div className="relative w-32 h-32 sm:w-36 sm:h-32 shrink-0">
              <Image
                src="/assets/images/cmdjt1TwD1Wv8UHkCpi5AG6iA.webp"
                alt="Accesorios Balkran"
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-[#1a2130] tracking-wide uppercase">
                {t('productos.cat3Title')}
              </h3>
              <span className="text-xs text-[#ff5a00] font-bold font-display inline-flex items-center gap-1 group-hover:underline">
                {t('productos.catSeeAll')}
              </span>
            </div>
          </button>

        </div>
      </section>

      {/* 3. CENTERED SEARCH BAR */}
      <section id="catalog" className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-4 relative z-20">
        <div className="bg-white rounded-2xl p-3 shadow-lg border border-gray-200/80 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
          <input
            type="text"
            placeholder={t('productos.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-[#1a2130] placeholder-gray-400 focus:outline-none font-medium"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* 4. PRODUCT CATALOG GRID WITH FILTER SIDEBAR */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filters Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1a2130] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ff5a00]" />
                {t('productos.filterTitle')}
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-gray-400 hover:text-[#ff5a00] transition-colors"
              >
                {t('productos.clearFilters')}
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 block">
                {t('productos.filterCategory')}
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'TODOS'}
                      onChange={() => setSelectedCategory('TODOS')}
                      className="accent-[#ff5a00]"
                    />
                    <span>{t('productos.allProducts')}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-bold">{allProducts.length}</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'Energizadores'}
                      onChange={() => setSelectedCategory('Energizadores')}
                      className="accent-[#ff5a00]"
                    />
                    <span>{t('productos.catEnergizadores')}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-bold">
                    {allProducts.filter(p => p.categoria === 'Energizadores').length}
                  </span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'Kits Solares'}
                      onChange={() => setSelectedCategory('Kits Solares')}
                      className="accent-[#ff5a00]"
                    />
                    <span>{t('productos.catKits')}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-bold">
                    {allProducts.filter(p => p.categoria === 'Kits Solares').length}
                  </span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'Accesorios'}
                      onChange={() => setSelectedCategory('Accesorios')}
                      className="accent-[#ff5a00]"
                    />
                    <span>{t('productos.catAccesorios')}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-bold">
                    {allProducts.filter(p => p.categoria === 'Accesorios').length}
                  </span>
                </label>
              </div>
            </div>

            {/* Alimentación / Fuente de Energía Filter */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 block">
                {t('productos.filterPower')}
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="power"
                    checked={selectedPower === 'TODOS'}
                    onChange={() => setSelectedPower('TODOS')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.powerAll')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="power"
                    checked={selectedPower === '110v'}
                    onChange={() => setSelectedPower('110v')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.power110v')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="power"
                    checked={selectedPower === 'dual'}
                    onChange={() => setSelectedPower('dual')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.powerDual')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="power"
                    checked={selectedPower === 'solar'}
                    onChange={() => setSelectedPower('solar')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.powerSolar')}</span>
                </label>
              </div>
            </div>

            {/* Rendimiento / Tipo de Línea Filter */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 block">
                {t('productos.filterLine')}
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="lineType"
                    checked={selectedLineType === 'TODOS'}
                    onChange={() => setSelectedLineType('TODOS')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.lineAll')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="lineType"
                    checked={selectedLineType === 'estandar'}
                    onChange={() => setSelectedLineType('estandar')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.lineStandard')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="radio"
                    name="lineType"
                    checked={selectedLineType === 'heavy-duty'}
                    onChange={() => setSelectedLineType('heavy-duty')}
                    className="accent-[#ff5a00]"
                  />
                  <span>{t('productos.lineHeavy')}</span>
                </label>
              </div>
            </div>

            {/* Reach Filter */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 block">
                {t('productos.filterReach')}
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="checkbox"
                    checked={selectedReach === 'hasta-20'}
                    onChange={() => setSelectedReach(selectedReach === 'hasta-20' ? 'TODOS' : 'hasta-20')}
                    className="accent-[#ff5a00] rounded"
                  />
                  <span>{t('productos.reachUpTo20')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="checkbox"
                    checked={selectedReach === '20-40'}
                    onChange={() => setSelectedReach(selectedReach === '20-40' ? 'TODOS' : '20-40')}
                    className="accent-[#ff5a00] rounded"
                  />
                  <span>{t('productos.reach20To40')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1a2130] font-medium hover:text-[#ff5a00]">
                  <input
                    type="checkbox"
                    checked={selectedReach === 'mas-40'}
                    onChange={() => setSelectedReach(selectedReach === 'mas-40' ? 'TODOS' : 'mas-40')}
                    className="accent-[#ff5a00] rounded"
                  />
                  <span>{t('productos.reachMore40')}</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-500">
                  {t('productos.filterPrice')}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  ${minPrice.toLocaleString('es-CO')} - ${maxPrice.toLocaleString('es-CO')}
                </span>
              </div>

              <input
                type="range"
                min="6000"
                max="2370000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-[#ff5a00]"
              />

              <div className="grid grid-cols-2 gap-1.5 text-xs pt-1">
                <div>
                  <label className="text-[10px] text-gray-400 block mb-1">{t('productos.minPrice')}</label>
                  <input
                    type="text"
                    value={`$ ${minPrice.toLocaleString('es-CO')}`}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded px-1.5 py-1 text-[10px] font-bold text-[#1a2130] text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 block mb-1">{t('productos.maxPrice')}</label>
                  <input
                    type="text"
                    value={`$ ${maxPrice.toLocaleString('es-CO')}`}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded px-1.5 py-1 text-[10px] font-bold text-[#1a2130] text-center"
                  />
                </div>
              </div>
            </div>

          </aside>

          {/* Right Product Grid Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-6">
            
            {/* Header Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
              {/* Left: Products Count */}
              <p className="text-xs text-gray-500 font-medium text-left">
                {t('productos.showing')} <span className="font-bold text-[#1a2130]">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> {t('productos.of')} <span className="font-bold text-[#1a2130]">{filteredProducts.length}</span> {t('productos.productsCount')}
              </p>

              {/* Center: Top Pagination Navigation */}
              <div className="flex items-center justify-center">
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      title="Página Anterior"
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        type="button"
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-7 h-7 text-xs font-extrabold font-display rounded-lg border transition-all flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-[#ff5a00] border-[#ff5a00] text-white shadow-xs'
                            : 'bg-white border-gray-200 text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      title="Página Siguiente"
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Sort Control */}
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-gray-400 font-medium shrink-0">{t('productos.sortBy')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1a2130] focus:outline-none"
                >
                  <option value="mas-vendidos">{t('productos.sortBestSeller')}</option>
                  <option value="precio-asc">{t('productos.sortPriceAsc')}</option>
                  <option value="precio-desc">{t('productos.sortPriceDesc')}</option>
                  <option value="nombre">{t('productos.sortName')}</option>
                </select>
              </div>
            </div>

            {/* Products Grid (Max 10 per page) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 space-y-4">
                <p className="text-gray-500 text-sm font-medium">
                  {t('productos.noFound')}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-[#ff5a00] text-white font-display font-bold text-xs uppercase px-6 py-2.5 rounded-full"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('productos.clearFilters')}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/productos/${product.slug}`}
                      className="bg-white border border-gray-200/90 rounded-xl p-3 sm:p-4 flex flex-col justify-between hover:border-[#ff5a00]/40 transition-all hover:shadow-md group relative cursor-pointer"
                    >
                      {/* Badge */}
                      {product.esMasVendido && (
                        <span className="absolute top-2.5 right-2.5 bg-[#ff5a00] text-white text-[8px] sm:text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full z-10 shadow-xs">
                          {t('productos.badgeBestSeller')}
                        </span>
                      )}

                      {/* Image Container */}
                      <div className="relative w-full h-36 sm:h-40 mb-2 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1.5">
                        <Image
                          src={product.imagen_local}
                          alt={product.nombre}
                          fill
                          className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="space-y-0.5 mb-2">
                        <span className="text-[10px] text-[#ff5a00] font-bold uppercase tracking-wider block leading-none">
                          {formatLinea(product.linea, language)}
                        </span>
                        <h4 className="font-display font-extrabold text-xs sm:text-sm text-[#1a2130] leading-tight line-clamp-2 min-h-[2.1rem]">
                          {product.nombre}
                        </h4>
                        {product.subtitulo ? (
                          <p className="text-[10px] text-gray-400 font-medium leading-none line-clamp-2 min-h-[1.4rem]">
                            {formatSubtitulo(product.subtitulo, language)}
                          </p>
                        ) : (
                          <div className="min-h-[1.4rem]" />
                        )}
                        <p className="font-display font-extrabold text-base sm:text-lg text-[#1a2130] pt-0.5 leading-none">
                          {product.precio}
                        </p>
                        <span className="text-[10px] text-gray-400 font-semibold leading-none block">
                          {t('detail.vatIncluded')}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
                        <span className="flex-1 text-center bg-white hover:bg-gray-50 border border-gray-200 text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00] font-display font-bold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-all shadow-2xs">
                          {t('productos.btnViewDetails')}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddCompare(product.slug);
                            const el = document.getElementById('seccion-comparador');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          title={t('productos.titleCompare')}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all shrink-0 border ${
                            selectedCompareSlugs.includes(product.slug)
                              ? 'bg-orange-100 border-[#ff5a00] text-[#ff5a00]'
                              : 'bg-gray-50 hover:bg-orange-50 border-gray-200 text-gray-600 hover:text-[#ff5a00] hover:border-orange-300'
                          }`}
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          title={t('productos.titleCart')}
                          className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a2130] hover:bg-[#ff5a00] text-white rounded-lg flex items-center justify-center transition-all shrink-0"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-6 pb-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      title="Página Anterior"
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        type="button"
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 text-xs font-extrabold font-display rounded-xl border transition-all flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-[#ff5a00] border-[#ff5a00] text-white shadow-md'
                            : 'bg-white border-gray-200 text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      title="Página Siguiente"
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[#1a2130] hover:border-[#ff5a00] hover:text-[#ff5a00] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

          </main>

        </div>
      </section>

      {/* 5. QUIZ / RECOMMENDATION BANNER ("¿No sabes cuál elegir?") */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#141414] text-white min-h-[260px] flex items-center px-6 sm:px-10 lg:px-14 border border-white/10 shadow-xl">
          
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/2AXdVQLVyiQsvAIF9KS4qkir0Tw.webp"
              alt="Asesoría Balkran Atardecer"
              fill
              className="object-cover object-center brightness-95"
              priority
            />
            {/* Left subtle shadow for text readability */}
            <div className="absolute left-0 top-0 bottom-0 w-full sm:w-[480px] bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
            {/* Right dark gradient overlay for feature list */}
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-gradient-to-l from-black/90 via-black/60 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 py-8">
            
            {/* Left Content with Circle Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 text-center sm:text-left">
              {/* Circular Orange Lightning Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#ff5a00] flex items-center justify-center shrink-0 bg-black/20 backdrop-blur-xs shadow-md">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff5a00] fill-[#ff5a00]" />
              </div>

              {/* Text & Button */}
              <div className="space-y-2 max-w-sm sm:max-w-md">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                  {t('productos.quizTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  {t('productos.quizDesc')}
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/573114508064?text=Hola%20Balkran,%20necesito%20asesor%C3%ADa%20para%20elegir%20mi%20energizador"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full shadow-lg transition-all"
                  >
                    <span>{t('productos.quizBtn')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Stacked Features List */}
            <div className="space-y-4 shrink-0 text-left w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              
              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 text-[#ff5a00] shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                    {t('productos.quizFeat1Title')}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {t('productos.quizFeat1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#ff5a00] shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                    {t('productos.quizFeat2Title')}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {t('productos.quizFeat2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-[#ff5a00] shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                    {t('productos.quizFeat3Title')}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {t('productos.quizFeat3Desc')}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. PRODUCT COMPARISON TABLE — Dynamic 4-product interactive comparator */}
      <section id="seccion-comparador" className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GitCompare className="w-4 h-4 text-[#ff5a00]" />
                <h3 className="font-display font-bold text-lg text-[#1a2130]">
                  {t('productos.compTitle')}
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                {selectedCompareSlugs.length} {t('productos.compSub')}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCompare}
              className="text-xs text-gray-400 hover:text-[#ff5a00] border border-gray-200 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              {t('productos.compClear')}
            </button>
          </div>

          {/* Comparison Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: `${280 + selectedCompareSlugs.length * 160 + (selectedCompareSlugs.length < 4 ? 140 : 0)}px` }}>
              <thead>
                <tr className="border-b border-gray-100">
                  {/* Row label column */}
                  <th className="py-4 px-4 w-[220px]"></th>

                  {/* Product columns */}
                  {comparisonModels.map((model) => (
                    <th key={model.slug} className="py-4 px-3 text-center min-w-[148px]">
                      <div className="space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveCompare(model.slug)}
                          title="Quitar producto"
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 text-gray-500 flex items-center justify-center transition-colors z-10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="relative w-36 h-36 mx-auto bg-gray-50 rounded-xl p-2">
                          <Image
                            src={model.img}
                            alt={model.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <h4 className="font-display font-bold text-xs text-[#1a2130] leading-tight">{model.name}</h4>
                      </div>
                    </th>
                  ))}

                  {/* Add product slot */}
                  {selectedCompareSlugs.length < 4 && (
                    <th className="py-4 px-3 text-center min-w-[140px]">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className="flex flex-col items-center justify-center gap-2 w-full h-full min-h-[100px] rounded-xl border-2 border-dashed border-gray-200 hover:border-[#ff5a00] hover:bg-orange-50/30 text-gray-400 hover:text-[#ff5a00] transition-all group py-4 px-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="font-display font-bold text-[10px] uppercase tracking-wider leading-tight">{t('productos.compAddSlot')}</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="text-xs font-medium text-[#565e6e]">
                {/* Alcance */}
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-[#1a2130] text-xs">{t('productos.compColReach')}</td>
                  {comparisonModels.map((m) => (
                    <td key={m.slug} className="py-3 px-3 text-center">{m.alcance}</td>
                  ))}
                  {selectedCompareSlugs.length < 4 && <td />}
                </tr>

                {/* Joules */}
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-[#1a2130] text-xs">{t('productos.compColJoules')}</td>
                  {comparisonModels.map((m) => (
                    <td key={m.slug} className="py-3 px-3 text-center">{m.joules}</td>
                  ))}
                  {selectedCompareSlugs.length < 4 && <td />}
                </tr>

                {/* Alimentación */}
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-[#1a2130] text-xs">{t('productos.compColVolt')}</td>
                  {comparisonModels.map((m) => (
                    <td key={m.slug} className="py-3 px-3 text-center">{m.voltaje}</td>
                  ))}
                  {selectedCompareSlugs.length < 4 && <td />}
                </tr>

                {/* Ideal para */}
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-bold text-[#1a2130] text-xs">{t('productos.compColIdeal')}</td>
                  {comparisonModels.map((m) => (
                    <td key={m.slug} className="py-3 px-3 text-center">{m.ideal}</td>
                  ))}
                  {selectedCompareSlugs.length < 4 && <td />}
                </tr>

                {/* CTA row */}
                <tr>
                  <td className="py-4 px-4"></td>
                  {comparisonModels.map((m) => (
                    <td key={m.slug} className="py-4 px-3 text-center">
                      <Link
                        href={`/productos/${m.slug}`}
                        className="inline-block text-[#ff5a00] font-display font-bold text-[10px] uppercase tracking-wide hover:underline border border-[#ff5a00]/30 rounded-lg px-3 py-1.5 hover:bg-orange-50 transition-colors"
                      >
                        {t('productos.compBtnProduct')}
                      </Link>
                    </td>
                  ))}
                  {selectedCompareSlugs.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowAddModal(false); setCompareSearch(''); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-[#ff5a00]" />
                  <span className="font-display font-bold text-sm text-[#1a2130]">{t('productos.modalTitle')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setCompareSearch(''); }}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('productos.modalSearch')}
                    value={compareSearch}
                    onChange={(e) => setCompareSearch(e.target.value)}
                    autoFocus
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5a00]/40 focus:border-[#ff5a00]"
                  />
                </div>
              </div>

              {/* Product list */}
              <div className="overflow-y-auto max-h-80 divide-y divide-gray-50">
                {allProducts
                  .filter((p) => {
                    const term = compareSearch.toLowerCase();
                    return (
                      p.nombre.toLowerCase().includes(term) ||
                      (p.linea || '').toLowerCase().includes(term)
                    );
                  })
                  .map((p) => {
                    const alreadyAdded = selectedCompareSlugs.includes(p.slug);
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        disabled={alreadyAdded}
                        onClick={() => handleAddCompare(p.slug)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                          alreadyAdded
                            ? 'opacity-40 cursor-not-allowed bg-gray-50'
                            : 'hover:bg-orange-50 hover:text-[#ff5a00]'
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                          <Image src={p.imagen_local} alt={p.nombre} fill className="object-contain p-1" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-bold text-sm text-[#1a2130] leading-tight truncate">{p.nombre}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{formatLinea(p.linea, language)}</div>
                        </div>
                        {alreadyAdded && (
                          <span className="ml-auto text-[10px] font-bold text-orange-400 uppercase tracking-wider shrink-0">{t('productos.modalInComp')}</span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. FAQ SECTION ("SOPORTE - PREGUNTAS FRECUENTES") */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="bg-[#f8fafc] rounded-3xl p-6 lg:p-10 border border-gray-200/60">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Header + FAQ Navigation list */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">
                  {t('productos.supportBadge')}
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1a2130]">
                  {t('productos.faqTitle')}
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  {t('productos.faqDesc')}
                </p>
              </div>

              <div className="space-y-2.5">
              {faqList.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveFaq(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all border ${
                    activeFaq === index
                      ? 'bg-white border-[#ff5a00] shadow-sm text-[#ff5a00] font-bold'
                      : 'bg-white/60 border-transparent hover:bg-white text-[#1a2130] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-extrabold ${activeFaq === index ? 'text-[#ff5a00]' : 'text-gray-400'}`}>
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {t(item.titleKey)}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === index ? 'text-[#ff5a00] translate-x-1' : 'text-gray-400'}`} />
                </button>
              ))}
              </div>
            </div>

            {/* Right FAQ Detail Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col h-full gap-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-[#ff5a00]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1a2130] leading-tight">
                    {t(faqList[activeFaq].titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed">
                    {t(faqList[activeFaq].textKey)}
                  </p>
                </div>
              </div>

              {/* Recommended Product Box inside FAQ card - anchored to bottom */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Product image */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-gray-50/80 overflow-hidden shrink-0 shadow-xs mx-auto sm:mx-0">
                    <Image
                      src={faqList[activeFaq].recommended.img}
                      alt={faqList[activeFaq].recommended.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Text + button stacked */}
                  <div className="flex flex-col justify-between gap-2.5 py-1 text-center sm:text-left">
                    <div className="space-y-1">
                      <span className="text-xs text-[#ff5a00] uppercase font-bold tracking-wider block">
                        {t(faqList[activeFaq].recommended.tagKey)}
                      </span>
                      <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130] leading-tight">
                        {faqList[activeFaq].recommended.nameKey
                          ? t(faqList[activeFaq].recommended.nameKey!)
                          : faqList[activeFaq].recommended.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-snug max-w-xs mx-auto sm:mx-0">
                        {t(faqList[activeFaq].recommended.descKey)}
                      </p>
                    </div>
                    <Link
                      href={`/productos/${faqList[activeFaq].recommended.slug}`}
                      className="inline-flex items-center justify-center sm:justify-start gap-2 border border-[#ff5a00] text-[#ff5a00] hover:bg-[#ff5a00] hover:text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all w-fit mx-auto sm:mx-0 mt-1"
                    >
                      <span>{t('productos.compBtnProduct')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. DARK LIGHTNING CTA BANNER */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0c] text-white border border-amber-500/20 shadow-2xl min-h-[320px] lg:min-h-[350px] flex items-center p-8 lg:p-12">
          
          {/* Background Lightning Effect Image matching Framer cc83iWPHU8aUafCMf2nUHGW0.webp */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/cc83iWPHU8aUafCMf2nUHGW0.webp"
              alt="Balkran Asesoría y Cotización Banner"
              fill
              className="object-cover object-[85%_18%] sm:object-[80%_15%] brightness-110 saturate-105"
              priority
            />
            {/* Subtle Gradient Overlay on Left for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              {t('productos.ctaTitle')}
            </h2>
            
            <p className="text-xs sm:text-sm text-gray-200 max-w-md leading-relaxed">
              {t('productos.ctaDesc')}
            </p>

            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/573114508064?text=Hola%20Balkran,%20necesito%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all"
              >
                <span>{t('productos.ctaBtn')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#ffffff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L.057 23.882a.5.5 0 0 0 .614.614l6.037-1.476A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.368l-.358-.213-3.713.908.924-3.613-.234-.372A9.818 9.818 0 1 1 12 21.818z"/>
                </svg>
              </a>
              
              <p className="text-[11px] text-gray-300 font-medium pl-1">
                {t('productos.ctaSub')}
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
