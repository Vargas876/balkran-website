'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatLinea, formatSubtitulo, formatNombreProducto } from '@/lib/i18nHelpers';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      nombre: product.nombre,
      linea: product.linea,
      precio: product.precio,
      precioNumerico: product.precioNumerico,
      imagen: product.imagen_local,
    });
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#ff5a00]/40 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Badge */}
      {product.esMasVendido && (
        <div className="absolute top-2.5 left-0 z-10">
          <span className="bg-[#ff5a00] text-white font-display font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-r-md shadow-xs">
            {t('productos.badgeBestSeller')}
          </span>
        </div>
      )}

      <div>
        {/* Product Image Container */}
        <div className="relative w-full h-40 bg-[#f8fafc] flex items-center justify-center p-4 border-b border-gray-100">
          <img
            src={product.imagen_local}
            alt={formatNombreProducto(product.nombre, language)}
            className="max-h-32 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-3.5 space-y-0.5">
          {/* Line tag */}
          <span className="text-[#ff5a00] font-display font-bold text-[10px] tracking-wider uppercase block leading-none">
            {formatLinea(product.linea, language)}
          </span>

          {/* Title */}
          <h3 className="font-display font-black text-sm sm:text-base text-[#1a2130] group-hover:text-[#ff5a00] transition-colors leading-snug">
            {formatNombreProducto(product.nombre, language)}
          </h3>

          {/* Subtitle specs */}
          <p className="text-gray-400 text-[10px] font-medium leading-none line-clamp-1">
            {formatSubtitulo(product.subtitulo, language) || `${formatNombreProducto(product.nombre, language)} — ${t('detail.warrantyBadge')}`}
          </p>

          {/* Price */}
          <div className="pt-1">
            <span className="font-display font-black text-lg text-[#1a2130] leading-none block">
              {product.precio}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold leading-none">
              {t('detail.vatIncluded')}
            </span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="p-3.5 pt-0 flex items-center gap-1.5">
        <Link
          href={`/productos/${product.slug}`}
          className="flex-1 bg-gray-100 hover:bg-[#1a2130] text-gray-900 hover:text-white font-display text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all text-center"
        >
          {t('productos.btnViewDetails')}
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          title="Añadir al carrito"
          aria-label="Añadir al carrito"
          className="bg-[#1a2130] hover:bg-[#ff5a00] text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
