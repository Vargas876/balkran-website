'use client';

import React from 'react';

export type VoltMood = 'happy' | 'idle' | 'thinking';

interface Props {
  mood?: VoltMood;
  className?: string;
}

export default function VoltBotFace({ className = 'w-8 h-8' }: Props) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/VoltBot.png"
        alt="Volt Bot"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}
