'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown } from 'lucide-react';
import type { InquiryStatus } from '@/lib/generated/prisma/enums';

const STATUS_ORDER: InquiryStatus[] = ['NUEVO', 'VISTO', 'CONTACTADO', 'CERRADO'];

const statusConfig: Record<InquiryStatus, { label: string; className: string; dot: string }> = {
  NUEVO: {
    label: 'Nuevo',
    className: 'bg-sky-500/20 text-sky-400',
    dot: 'bg-sky-400',
  },
  VISTO: {
    label: 'Visto',
    className: 'bg-amber-500/20 text-amber-400',
    dot: 'bg-amber-400',
  },
  CONTACTADO: {
    label: 'Contactado',
    className: 'bg-violet-500/20 text-violet-400',
    dot: 'bg-violet-400',
  },
  CERRADO: {
    label: 'Cerrado',
    className: 'bg-emerald-500/20 text-emerald-400',
    dot: 'bg-emerald-400',
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
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [isOpen]);

  const config = statusConfig[status];

  function select(next: InquiryStatus) {
    if (next === status) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    startTransition(async () => {
      await fetch(`/api/admin/consultas/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    });
  }

  return (
    <div className={`relative inline-block ${isOpen ? 'z-[100]' : 'z-10'}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        title="Cambiar estado"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${config.className} hover:opacity-90 transition-all shadow-sm active:scale-95`}
      >
        <span>{config.label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[100] mt-1.5 left-0 min-w-[160px] bg-[#1c1f29] border border-white/15 rounded-xl shadow-2xl shadow-black/90 p-1.5 backdrop-blur-xl">
          {STATUS_ORDER.map((s) => {
            const option = statusConfig[s];
            const isCurrent = s === status;
            return (
              <button
                key={s}
                type="button"
                onClick={() => select(s)}
                disabled={isPending}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                  isCurrent
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${option.dot}`} />
                  {option.label}
                </span>
                {isCurrent && <Check size={13} className="text-[#ff5a00]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
