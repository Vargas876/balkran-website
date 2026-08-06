'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Banner = {
  id: string;
  imagen: string;
  titulo: string | null;
  subtitulo: string | null;
  link: string | null;
};

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/banners')
      .then((r) => r.json())
      .then((data) => {
        setBanners(data.banners ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading || banners.length === 0) return null;

  const current = banners[index];

  const inner = (
    <>
      <Image
        src={current.imagen}
        alt={current.titulo ?? 'Banner Balkran'}
        fill
        priority={index === 0}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex items-center">
        <div className="max-w-xl space-y-3 py-10 lg:py-14">
          {current.titulo && (
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow">
              {current.titulo}
            </h2>
          )}
          {current.subtitulo && (
            <p className="font-display text-sm sm:text-base text-gray-100 font-medium max-w-md drop-shadow">
              {current.subtitulo}
            </p>
          )}
          {current.link && (
            <Link
              href={current.link}
              className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-[#e04f00] text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
            >
              Ver más
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </>
  );

  return (
    <section className="relative h-[320px] lg:h-[380px] overflow-hidden">
      {current.link ? (
        <Link href={current.link} className="absolute inset-0 block">
          {inner}
        </Link>
      ) : (
        <div className="absolute inset-0">{inner}</div>
      )}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-[#ff5a00]' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
