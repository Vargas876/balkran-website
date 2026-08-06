import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import InquiryStatusBadge from '@/components/admin/InquiryStatusBadge';

export const dynamic = 'force-dynamic';

export default async function ConsultaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });

  if (!inquiry) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Detalle de consulta</h1>

      <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{inquiry.name}</p>
          <InquiryStatusBadge status={inquiry.status} inquiryId={inquiry.id} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/50 text-xs mb-1">Email</p>
            <a
              href={`mailto:${inquiry.email}`}
              className="text-[#ff5a00] hover:underline"
            >
              {inquiry.email}
            </a>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">Teléfono</p>
            <p>{inquiry.phone ?? '—'}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-white/50 text-xs mb-1">Fecha</p>
            <p>
              {new Date(inquiry.createdAt).toLocaleString('es-CO', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </p>
          </div>
        </div>

        <div>
          <p className="text-white/50 text-xs mb-1">Mensaje</p>
          <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
            {inquiry.message}
          </p>
        </div>
      </div>
    </div>
  );
}
