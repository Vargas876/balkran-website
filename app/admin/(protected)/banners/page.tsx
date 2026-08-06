import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import BannerThumb from '@/components/admin/BannerThumb';

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: [{ activo: 'desc' }, { orden: 'asc' }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Banners</h1>
          <p className="text-white/50 text-sm mt-1">
            Carrusel de la portada · {banners.length} banner{banners.length !== 1 && 's'}
          </p>
        </div>
        <Link
          href="/admin/banners/nuevo"
          className="flex items-center gap-2 bg-[#ff5a00] hover:bg-[#e55200] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
        >
          <Plus size={16} />
          Nuevo banner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-[#14161d] border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="relative h-40 bg-black/40">
              <BannerThumb
                src={b.imagen}
                alt={b.titulo ?? 'Banner'}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 left-2 flex gap-1.5">
                {b.activo ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase">
                    Activo
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[10px] font-semibold uppercase">
                    Oculto
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[10px] font-semibold uppercase">
                  Orden {b.orden}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              {b.titulo && <p className="font-semibold text-sm truncate">{b.titulo}</p>}
              {b.subtitulo && (
                <p className="text-white/50 text-xs truncate">{b.subtitulo}</p>
              )}
              {b.link && (
                <p className="text-[#ff5a00] text-xs truncate">{b.link}</p>
              )}
              <Link
                href={`/admin/banners/${b.id}`}
                className="inline-block mt-2 text-xs text-white/60 hover:text-white font-medium"
              >
                Editar →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <p className="text-center text-white/40 py-12 text-sm">
          No hay banners. Crea el primero para mostrarlo en la portada.
        </p>
      )}
    </div>
  );
}
