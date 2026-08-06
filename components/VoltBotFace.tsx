'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type VoltMood = 'happy' | 'idle' | 'thinking' | 'analyzing' | 'success';

interface Props {
  mood?: VoltMood;
  className?: string;
  isFloating?: boolean;
}

export default function VoltBotFace({ mood = 'idle', className = 'w-10 h-10', isFloating = false }: Props) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      animate={isFloating ? { y: [0, -4, 0], rotate: [0, -2, 2, 0] } : {}}
      transition={
        isFloating
          ? {
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
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
        className="w-full h-full object-contain scale-[1.35] drop-shadow-[0_0_12px_rgba(255,90,0,0.4)]"
      />

      {/* Dynamic Expression Overlay on Volt's Screen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-1 pr-0.5">
        <svg
          viewBox="0 0 100 100"
          className="w-[42%] h-[42%] drop-shadow-[0_0_6px_rgba(255,140,0,0.9)] opacity-90"
        >
          {/* Expression: Listo para ayudarte (idle / happy) */}
          {(mood === 'idle' || mood === 'happy') && (
            <g fill="#ff9436">
              {/* Left Eye */}
              <rect x="28" y="38" width="10" height="20" rx="5" />
              {/* Right Eye */}
              <rect x="62" y="38" width="10" height="20" rx="5" />
              {/* Mouth */}
              <path
                d="M 38 65 Q 50 74 62 65"
                fill="none"
                stroke="#ff9436"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Expression: Analizando */}
          {mood === 'analyzing' && (
            <g fill="none" stroke="#ff9436" strokeWidth="5" strokeLinecap="round">
              {/* Curved Happy Eyes */}
              <path d="M 24 45 Q 33 34 42 45" />
              <path d="M 58 45 Q 67 34 76 45" />
              {/* Scan Wave */}
              <motion.line
                x1="20"
                y1="64"
                x2="80"
                y2="64"
                stroke="#ffb366"
                strokeWidth="3"
                animate={{ opacity: [0.3, 1, 0.3], x1: [20, 25, 20], x2: [80, 75, 80] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </g>
          )}

          {/* Expression: Pensando */}
          {mood === 'thinking' && (
            <g fill="#ff9436">
              {/* Half closed eyes */}
              <rect x="25" y="44" width="16" height="6" rx="3" />
              <rect x="59" y="44" width="16" height="6" rx="3" />
              {/* Thinking Dots */}
              <circle cx="40" cy="64" r="3">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="64" r="3">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="64" r="3">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin="0.6s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Expression: ¡Entendido! (success) */}
          {mood === 'success' && (
            <g fill="none" stroke="#ffb366" strokeWidth="5.5" strokeLinecap="round">
              {/* Joyful Curved Eyes */}
              <path d="M 22 44 Q 33 30 44 44" />
              <path d="M 56 44 Q 67 30 78 44" />
              {/* Big Smile */}
              <path d="M 32 62 Q 50 78 68 62" stroke="#ff9436" strokeWidth="5" />
            </g>
          )}
        </svg>
      </div>
    </motion.div>
  );
}
