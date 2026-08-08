import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import InquiryStatusBadge from '@/components/admin/InquiryStatusBadge';

export const dynamic = 'force-dynamic';

export default async function AdminConsultasPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Consultas de contacto</h1>
      <p className="text-white/50 text-sm mb-6">
        Mensajes recibidos desde el formulario de contacto.
      </p>

      <div className="bg-[#14161d] border border-white/10 rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[750px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wide">
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Mensaje</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Ver</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq: any) => (
              <tr
                key={inq.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5"
              >
                <td className="px-4 py-3 whitespace-nowrap text-white/50">
                  {new Date(inq.createdAt).toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 font-medium">{inq.name}</td>
                <td className="px-4 py-3">
                  {inq.tipo ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#ff5a00] text-xs font-semibold">
                      {inq.tipo}
                    </span>
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-white/60">{inq.email}</td>
                <td className="px-4 py-3 text-white/60">{inq.phone ?? '—'}</td>
                <td className="px-4 py-3 text-white/60 max-w-[240px] truncate">
                  {inq.message}
                </td>
                <td className="px-4 py-3">
                  <InquiryStatusBadge status={inq.status} inquiryId={inq.id} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/consultas/${inq.id}`}
                    className="inline-flex items-center gap-1 text-[#ff5a00] hover:underline text-xs"
                  >
                    Detalle <ArrowLeft size={12} className="rotate-180" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inquiries.length === 0 && (
          <p className="text-center text-white/40 py-12 text-sm">
            Aún no hay consultas de contacto.
          </p>
        )}
      </div>
    </div>
  );
}
