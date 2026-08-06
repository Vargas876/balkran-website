'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Format WhatsApp message
    let message = `*🛒 NUEVO PEDIDO - BALKRAN TECNOLOGÍA E INNOVACIÓN*\n`;
    message += `----------------------------------------\n`;
    if (nombre.trim()) message += `👤 *Cliente:* ${nombre.trim()}\n`;
    if (telefono.trim()) message += `📱 *Teléfono:* ${telefono.trim()}\n`;
    if (ciudad.trim()) message += `📍 *Ciudad/Ubicación:* ${ciudad.trim()}\n`;
    message += `----------------------------------------\n`;
    message += `📦 *PRODUCTOS SELECCIONADOS:* (${totalItems} unidad${totalItems > 1 ? 'es' : ''})\n\n`;

    items.forEach((item, index) => {
      const lineSubtotal = formatCOP(item.precioNumerico * item.cantidad);
      message += `${index + 1}. *${item.nombre}*\n`;
      if (item.linea) message += `   Línea: ${item.linea}\n`;
      message += `   Cantidad: ${item.cantidad} x ${item.precio}\n`;
      message += `   Subtotal: *${lineSubtotal}*\n\n`;
    });

    message += `----------------------------------------\n`;
    message += `💰 *TOTAL DE COMPRA:* *${formatCOP(totalPrice)} COP*\n`;
    message += `----------------------------------------\n`;
    message += `¡Hola Balkran! Quisiera finalizar la compra de estos productos. Quedo atento a la disponibilidad y métodos de pago.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573218524676?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden selection:bg-[#ff5a00] selection:text-white">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Panel: Clean Light White Theme */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-white text-[#1a2130] h-full flex flex-col shadow-2xl border-l border-gray-200 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative p-2.5 bg-[#ff5a00]/10 border border-[#ff5a00]/20 rounded-xl text-[#ff5a00]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#1a2130] tracking-tight flex items-center gap-2">
                    <span>Tu Carrito</span>
                    {totalItems > 0 && (
                      <span className="bg-[#ff5a00] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {totalItems}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-500">Resumen de tu pedido Balkran</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors px-2 py-1"
                    title="Vaciar carrito"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 rounded-xl text-gray-400 hover:text-[#1a2130] hover:bg-gray-100 transition-all"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Body */}
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5 bg-slate-50/50">
                <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
                  <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h3 className="text-lg font-bold text-[#1a2130]">Tu carrito está vacío</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Añade nuestros energizadores o kits solares para iniciar tu pedido con Balkran.
                  </p>
                </div>
                <Link
                  href="/productos"
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-[#e04f00] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md shadow-[#ff5a00]/20 transition-all active:scale-95"
                >
                  <span>Explorar Productos</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              /* Items List + Checkout Form */
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
                {/* Product Items */}
                <div className="space-y-3.5">
                  {items.map((item) => (
                    <motion.div
                      key={item.id || item.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-200 rounded-2xl hover:border-orange-200 transition-all shadow-2xs group"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1a2130] truncate group-hover:text-[#ff5a00] transition-colors">
                            {item.nombre}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id || item.slug)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors shrink-0"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.linea && (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#ff5a00] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                            {item.linea}
                          </span>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <p className="text-xs font-semibold text-gray-500">
                            {item.precio}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id || item.slug, item.cantidad - 1)}
                              className="p-1 text-gray-500 hover:text-[#1a2130] hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#1a2130] px-2 min-w-[20px] text-center">
                              {item.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id || item.slug, item.cantidad + 1)}
                              className="p-1 text-gray-500 hover:text-[#1a2130] hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Customer Checkout Form */}
                <form id="whatsapp-checkout-form" onSubmit={handleCheckoutWhatsApp} className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <span>Datos de Envío</span>
                    <span className="text-[10px] text-gray-400 font-normal">(Opcional)</span>
                  </h3>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full bg-white border border-gray-200 focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] rounded-xl text-gray-900 text-xs px-3.5 py-2.5 placeholder:text-gray-400 focus:outline-none transition-all shadow-2xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Teléfono / Celular"
                        className="w-full bg-white border border-gray-200 focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] rounded-xl text-gray-900 text-xs px-3.5 py-2.5 placeholder:text-gray-400 focus:outline-none transition-all shadow-2xs"
                      />
                      <input
                        type="text"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        placeholder="Ciudad / Municipio"
                        className="w-full bg-white border border-gray-200 focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] rounded-xl text-gray-900 text-xs px-3.5 py-2.5 placeholder:text-gray-400 focus:outline-none transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </form>

                {/* Guarantee Banner */}
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="leading-tight text-[11px] font-medium">
                    Despacho directo con garantía de fábrica y acompañamiento técnico Balkran.
                  </p>
                </div>
              </div>
            )}

            {/* Cart Footer Total & WhatsApp CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white space-y-4 shadow-lg">
                {/* Total Calculations */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal de productos:</span>
                    <span className="font-semibold text-[#1a2130]">{formatCOP(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#ff5a00]" />
                      <span>Envío a todo Colombia:</span>
                    </span>
                    <span className="text-emerald-600 font-semibold">Por coordinar</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between items-baseline">
                    <span className="text-xs sm:text-sm font-bold text-[#1a2130] uppercase tracking-wider">TOTAL DE COMPRA:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#ff5a00] tracking-tight">
                      {formatCOP(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Checkout Button */}
                <button
                  type="submit"
                  form="whatsapp-checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2.5"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>FINALIZAR COMPRA POR WHATSAPP</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
