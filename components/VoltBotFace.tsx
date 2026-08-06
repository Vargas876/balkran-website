'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  isFloating?: boolean;
}

export default function VoltBotFace({ className = 'w-16 h-16', isFloating = false }: Props) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      animate={isFloating ? { y: [0, -6, 0], rotate: [0, -2.5, 2.5, 0] } : {}}
      transition={
        isFloating
          ? {
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }
          : {}
      }
    >
      {/* 3D Base Volt Sphere */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/VoltBot.png"
        alt="Volt Bot 3D"
        className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(255,90,0,0.55)]"
      />
    </motion.div>
  );
}
