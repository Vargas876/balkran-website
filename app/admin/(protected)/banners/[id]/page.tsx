import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BannerForm from '@/components/admin/BannerForm';

export const dynamic = 'force-dynamic';

export default async function EditarBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Editar banner</h1>
      <p className="text-white/50 text-sm mb-8">
        {banner.titulo ?? 'Banner sin título'}
      </p>
      <BannerForm
        banner={{
          id: banner.id,
          imagen: banner.imagen,
          titulo: banner.titulo ?? '',
          subtitulo: banner.subtitulo ?? '',
          link: banner.link ?? '',
          activo: banner.activo,
          orden: banner.orden,
        }}
      />
    </div>
  );
}
