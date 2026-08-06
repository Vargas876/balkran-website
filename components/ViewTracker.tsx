'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === last.current) return;
    last.current = pathname;

    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // silencioso: no romper la navegación si falla el tracking
    });
  }, [pathname]);

  return null;
}