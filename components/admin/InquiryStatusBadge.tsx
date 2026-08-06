'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { InquiryStatus } from '@/lib/generated/prisma/enums';

const statusConfig: Record<
  InquiryStatus,
  { label: string; className: string; next: InquiryStatus }
> = {
  NUEVO: {
    label: 'Nuevo',
    className: 'bg-sky-500/20 text-sky-400',
    next: 'VISTO',
  },
  VISTO: {
    label: 'Visto',
    className: 'bg-amber-500/20 text-amber-400',
    next: 'CONTACTADO',
  },
  CONTACTADO: {
    label: 'Contactado',
    className: 'bg-violet-500/20 text-violet-400',
    next: 'CERRADO',
  },
  CERRADO: {
    label: 'Cerrado',
    className: 'bg-emerald-500/20 text-emerald-400',
    next: 'NUEVO',
  },
};

export default function InquiryStatusBadge({
  status,
  inquiryId,
}: {
  status: InquiryStatus;
  inquiryId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const config = statusConfig[status];

  function advance() {
    startTransition(async () => {
      await fetch(`/api/admin/consultas/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: config.next }),
      });
      router.refresh();
    });
  }

  return (
    <button
      onClick={advance}
      disabled={isPending}
      title={`Cambiar a ${statusConfig[config.next].label}`}
      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${config.className} hover:opacity-80 transition-opacity`}
    >
      {config.label}
    </button>
  );
}
