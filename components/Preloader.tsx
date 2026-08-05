'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3.0s cinematic preloader on page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="balkran-preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: [
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
            ],
            opacity: [1, 1, 0],
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#050608] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Atmospheric Radial Energy Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,0,0.18)_0%,transparent_70%)] pointer-events-none" />

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">

            {/* LogoBlanco.png with Glow Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative w-64 sm:w-84 h-16 sm:h-22 mb-3"
            >
              <Image
                src="/assets/images/LogoBlanco.webp"
                alt="BALKRAN Electric Fences"
                fill
                className="object-contain filter drop-shadow-[0_0_26px_rgba(255,90,0,0.6)]"
                priority
              />
            </motion.div>

            {/* Subtitle: PROTECCIÓN • ENERGÍA • CONFIANZA */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-display text-[10px] sm:text-[12px] font-bold tracking-[0.3em] uppercase text-gray-300 mb-8"
            >
              PROTECCIÓN <span className="text-[#ff5a00] mx-1.5">•</span> ENERGÍA <span className="text-[#ff5a00] mx-1.5">•</span> CONFIANZA
            </motion.p>

            {/* HIGH VOLTAGE ELECTRIC PULSE WAVE CONTAINER */}
            <div className="relative w-full max-w-[360px] h-14 flex items-center justify-center my-1 overflow-hidden">
              
              {/* Background Electric Wire Base Line */}
              <div className="absolute w-full h-[1.5px] bg-white/15" />
              <div className="absolute w-full h-[1.5px] bg-[#ff5a00]/30 shadow-[0_0_10px_#ff5a00]" />

              {/* Laser Wire Beam Expansion */}
              <motion.div
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-[#ffc700] shadow-[0_0_14px_#ff5a00]"
              />

              {/* Travelling High-Voltage Electric Pulses (Multiple Shockwave Peaks) */}
              <div className="absolute inset-0 w-full h-full flex items-center overflow-hidden pointer-events-none">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2.8, delay: 0.4, repeat: Infinity, ease: 'linear' }}
                  className="w-[200%] h-full flex items-center shrink-0"
                >
                  <svg className="w-full h-10 text-[#ffea00] filter drop-shadow-[0_0_10px_#ff5a00]" viewBox="0 0 600 40" fill="none">
                    <path
                      d="M0 20 H80 L88 4 L96 36 L104 10 L112 28 L120 20 H220 L228 4 L236 36 L244 10 L252 28 L260 20 H360 L368 4 L376 36 L384 10 L392 28 L400 20 H500 L508 4 L516 36 L524 10 L532 28 L540 20 H600"
                      stroke="url(#highVoltageGradient)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="highVoltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.2" />
                        <stop offset="30%" stopColor="#ff5a00" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="70%" stopColor="#ffc700" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ff5a00" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              {/* Travelling Incandescent Electrical Spark Flare */}
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, delay: 0.3, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              >
                {/* Glowing Core Dot */}
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_8px_#ff5a00] border border-[#ffea00]" />
                {/* Crosshair Sparkle Beam */}
                <div className="absolute w-8 h-[2px] bg-[#ffffff] shadow-[0_0_12px_#ffea00]" />
                <div className="absolute w-[2px] h-8 bg-[#ffffff] shadow-[0_0_12px_#ffea00]" />
              </motion.div>

            </div>

            {/* Text Indicator: CARGANDO ENERGÍA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-3 text-[11px] font-display font-semibold tracking-[0.25em] text-[#ff5a00] uppercase"
            >
              CARGANDO ENERGÍA
            </motion.div>

          </div>

          {/* Top and Bottom Orange Flare Bars */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 0.8, delay: 4.4 }}
            className="absolute inset-x-0 h-1.5 bg-[#ff5a00] shadow-[0_0_35px_#ff5a00] top-0 origin-top"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 0.8, delay: 4.4 }}
            className="absolute inset-x-0 h-1.5 bg-[#ff5a00] shadow-[0_0_35px_#ff5a00] bottom-0 origin-bottom"
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
