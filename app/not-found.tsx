'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0d14] font-sans flex flex-col items-center justify-center overflow-x-hidden selection:bg-[#ff5a00] selection:text-white">
      {/* Background Image Layer using Fondo404.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/Fondo404.png"
          alt="Balkran 404 Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-[0.95] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center justify-center text-center my-auto">
        {/* 404 Outline Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative select-none"
        >
          <h1
            className="text-8xl sm:text-9xl xl:text-[160px] font-extrabold tracking-widest text-transparent leading-none"
            style={{
              WebkitTextStroke: '2.5px #ff5a00',
              filter: 'drop-shadow(0 0 20px rgba(255, 90, 0, 0.5))',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 space-y-2"
        >
          <h2 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-snug">
            ¡La energía no llegó{' '}
            <span className="text-[#ff5a00] drop-shadow-[0_0_15px_rgba(255,90,0,0.4)]">
              esta página!
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 space-y-1 text-sm sm:text-base text-gray-300/90 font-medium max-w-lg leading-relaxed"
        >
          <p>Parece que el pulso eléctrico se perdió en el camino.</p>
          <p>La página que buscas no existe o fue movida.</p>
        </motion.div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-[#ff5a00]/90 active:scale-95 border border-[#ff5a00]/70 hover:border-[#ff5a00] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-7 rounded-xl shadow-lg shadow-[#ff5a00]/20 hover:shadow-[#ff5a00]/40 backdrop-blur-md transition-all duration-200 group"
          >
            <Home className="w-4 h-4 text-[#ff5a00] group-hover:text-white transition-colors" />
            <span>VOLVER AL INICIO</span>
          </Link>
        </motion.div>
      </main>

      {/* Footer Copy */}
      <footer className="relative z-10 w-full py-4 px-6 text-center text-xs text-gray-400/80">
        <p>© 2024 BALKRAN. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
