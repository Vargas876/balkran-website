'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Search, Filter, RotateCcw, ChevronLeft, ChevronRight, Zap, Sun, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCategoria } from '@/lib/i18nHelpers';

interface ProductGridProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 12;

export default function ProductGrid({ products }: ProductGridProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [selectedAlcance, setSelectedAlcance] = useState<string>('TODOS');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('populares');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedAlcance, minPrice, maxPrice, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      TODOS: products.length,
      Energizadores: 0,
      'Kits Solares': 0,
      Accesorios: 0,
    };
    products.forEach((p) => {
      if (p.categoria in counts) {
        counts[p.categoria]++;
      }
    });
    return counts;
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'TODOS' && p.categoria !== selectedCategory) {
          return false;
        }

        // Alcance filter
        if (selectedAlcance !== 'TODOS') {
          const alc = (p.alcance || '').toLowerCase();
          if (selectedAlcance === 'hasta_20' && !alc.includes('20') && !alc.includes('10') && !alc.includes('15')) return false;
          if (selectedAlcance === '20_40' && !alc.includes('40')) return false;
          if (selectedAlcance === 'mas_40' && !alc.includes('60') && !alc.includes('80') && !alc.includes('100') && !alc.includes('120')) return false;
        }

        // Min price filter
        if (minPrice) {
          const min = parseFloat(minPrice);
          if (!isNaN(min) && p.precioNumerico < min) return false;
        }

        // Max price filter
        if (maxPrice) {
          const max = parseFloat(maxPrice);
          if (!isNaN(max) && p.precioNumerico > max) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.nombre.toLowerCase().includes(q);
          const matchSlug = p.slug.toLowerCase().includes(q);
          const matchCat = p.categoria.toLowerCase().includes(q);
          const matchLinea = p.linea.toLowerCase().includes(q);
          const matchDesc = (p.descripcion || '').toLowerCase().includes(q);
          if (!matchName && !matchSlug && !matchCat && !matchLinea && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'menor_precio') return a.precioNumerico - b.precioNumerico;
        if (sortBy === 'mayor_precio') return b.precioNumerico - a.precioNumerico;
        if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
        return 0; // populares / default
      });
  }, [products, selectedCategory, selectedAlcance, minPrice, maxPrice, searchQuery, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSelectedCategory('TODOS');
    setSelectedAlcance('TODOS');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    setSortBy('populares');
    setCurrentPage(1);
  };

  const startIndex = filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <div className="space-y-8">
      
      {/* Category Top Banner Cards (Energizadores, Kits, Accesorios) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <button
          onClick={() => setSelectedCategory('Energizadores')}
          className={`p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${
            selectedCategory === 'Energizadores'
              ? 'bg-[#1a2130] border-[#ff5a00] text-white shadow-lg shadow-[#ff5a00]/10'
              : 'bg-white border-gray-200 text-gray-800 hover:border-[#ff5a00]/40'
          }`}
        >
          <div className="space-y-1">
            <span className="font-display font-black text-lg block group-hover:text-[#ff5a00] transition-colors uppercase">
              {formatCategoria('Energizadores', language)}
            </span>
            <span className="text-xs text-gray-400 font-semibold block">
              {categoryCounts.Energizadores} {t('productos.availSuffix')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
        </button>

        <button
          onClick={() => setSelectedCategory('Kits Solares')}
          className={`p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${
            selectedCategory === 'Kits Solares'
              ? 'bg-[#1a2130] border-[#ff5a00] text-white shadow-lg shadow-[#ff5a00]/10'
              : 'bg-white border-gray-200 text-gray-800 hover:border-[#ff5a00]/40'
          }`}
        >
          <div className="space-y-1">
            <span className="font-display font-black text-lg block group-hover:text-[#ff5a00] transition-colors uppercase">
              {formatCategoria('Kits Solares', language)}
            </span>
            <span className="text-xs text-gray-400 font-semibold block">
              {categoryCounts['Kits Solares']} {t('productos.availSuffix')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center shrink-0">
            <Sun className="w-6 h-6" />
          </div>
        </button>

        <button
          onClick={() => setSelectedCategory('Accesorios')}
          className={`p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${
            selectedCategory === 'Accesorios'
              ? 'bg-[#1a2130] border-[#ff5a00] text-white shadow-lg shadow-[#ff5a00]/10'
              : 'bg-white border-gray-200 text-gray-800 hover:border-[#ff5a00]/40'
          }`}
        >
          <div className="space-y-1">
            <span className="font-display font-black text-lg block group-hover:text-[#ff5a00] transition-colors uppercase">
              {formatCategoria('Accesorios', language)}
            </span>
            <span className="text-xs text-gray-400 font-semibold block">
              {categoryCounts.Accesorios} {t('productos.availSuffix')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </button>

      </div>

      {/* Main Container: Left Sidebar + Product Cards */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT SIDEBAR FILTERS */}
        <aside className="w-full lg:w-72 shrink-0 bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="font-display font-black text-sm text-[#1a2130] uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#ff5a00]" />
              {t('productos.filterTitle')}
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs text-gray-400 hover:text-[#ff5a00] flex items-center gap-1 font-semibold transition-colors"
              title={t('productos.clearFilters')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t('productos.clearFilters')}
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-display font-bold text-gray-700 uppercase tracking-wider block">
              {t('productos.search')}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('productos.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#ff5a00]"
              />
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="text-xs font-display font-bold text-gray-700 uppercase tracking-wider block">
              {t('productos.filterCategory')}
            </label>
            <div className="space-y-1">
              {[
                { id: 'TODOS', label: t('productos.allProducts'), count: categoryCounts.TODOS },
                { id: 'Energizadores', label: formatCategoria('Energizadores', language), count: categoryCounts.Energizadores },
                { id: 'Kits Solares', label: formatCategoria('Kits Solares', language), count: categoryCounts['Kits Solares'] },
                { id: 'Accesorios', label: formatCategoria('Accesorios', language), count: categoryCounts.Accesorios },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1a2130] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.id ? 'bg-[#ff5a00] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ALCANCE FILTER */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="text-xs font-display font-bold text-gray-700 uppercase tracking-wider block">
              {t('productos.filterReach')}
            </label>
            <div className="space-y-2 text-xs text-gray-600">
              {[
                { id: 'TODOS', label: t('productos.anyReach') },
                { id: 'hasta_20', label: t('productos.reachUpTo20') },
                { id: '20_40', label: t('productos.reach20To40') },
                { id: 'mas_40', label: t('productos.reachMore40') },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer select-none hover:text-gray-900">
                  <input
                    type="radio"
                    name="alcance"
                    checked={selectedAlcance === item.id}
                    onChange={() => setSelectedAlcance(item.id)}
                    className="accent-[#ff5a00]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRECIO FILTER */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="text-xs font-display font-bold text-gray-700 uppercase tracking-wider block">
              {t('productos.filterPrice')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t('productos.minInput')}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ff5a00]"
              />
              <input
                type="number"
                placeholder={t('productos.maxInput')}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#ff5a00]"
              />
            </div>
          </div>

        </aside>

        {/* RIGHT MAIN AREA: Header Summary + Product Grid + Pagination */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Top Bar: Count summary & Sorting */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <span className="text-xs font-display font-bold text-gray-700 uppercase tracking-wider">
              {t('productos.showing')} {startIndex} - {endIndex} {t('productos.of')} {filteredProducts.length} {t('productos.productsCount')}
            </span>

            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-500 font-semibold uppercase shrink-0">
                {t('productos.sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:border-[#ff5a00]"
              >
                <option value="populares">{t('productos.sortRelevance')}</option>
                <option value="menor_precio">{t('productos.sortPriceAscFull')}</option>
                <option value="mayor_precio">{t('productos.sortPriceDescFull')}</option>
                <option value="nombre">{t('productos.sortNameAZ')}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
              <p className="text-gray-500 font-display text-base">
                {t('productos.noResults')}
              </p>
              <button
                onClick={handleResetFilters}
                className="text-[#ff5a00] hover:underline font-bold text-xs uppercase tracking-wider"
              >
                {t('productos.cleanAll')}
              </button>
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-2 shadow-sm">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-xs font-display font-bold border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('productos.prev')}
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-display font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#ff5a00] text-white shadow-md shadow-[#ff5a00]/30'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-xs font-display font-bold border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 transition-colors"
              >
                {t('productos.next')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
