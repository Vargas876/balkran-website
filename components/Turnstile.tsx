'use client';

import { useRef, useState, useEffect } from 'react';

// Esta clave pública se expone al navegador (Cloudflare Turnstile). No es secreta.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

interface TurnstileProps {
  /** Se llama con el token cuando el usuario supera el desafío (o null si falló). */
  onToken: (token: string | null) => void;
}

export default function Turnstile({ onToken }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [enabled] = useState<boolean>(() => Boolean(SITE_KEY));

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    let isCancelled = false;

    const render = () => {
      if (isCancelled || !containerRef.current) return;
      const win = window as unknown as {
        turnstile?: {
          render: (
            el: HTMLElement,
            opts: {
              sitekey: string;
              theme?: 'light' | 'dark' | 'auto';
              callback: (token: string) => void;
              'expired-callback': () => void;
              'error-callback': () => void;
            }
          ) => string;
        };
      };
      if (!win.turnstile) return;

      widgetId.current = win.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null),
      });
    };

    if ((window as unknown as { turnstile?: unknown }).turnstile) {
      render();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = render;
      document.head.appendChild(script);
    }

    return () => {
      isCancelled = true;
      const win = window as unknown as { turnstile?: { remove: (id: string) => void } };
      if (!widgetId.current) return;
      try {
        win.turnstile?.remove(widgetId.current);
      } catch {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={containerRef} className="turnstile-widget" />;
}