'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function ProductSearchBar({
  categorias,
}: {
  categorias: { categoria: string; _count: number }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') ?? 'TODOS');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function navigate() {
    const params = new URLSearchParams();
    const qTrim = q.trim();
    if (qTrim) params.set('q', qTrim);
    if (categoria && categoria !== 'TODOS') params.set('categoria', categoria);
    const qs = params.toString();
    router.replace(`/admin/productos${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  function onQueryChange(value: string) {
    setQ(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(navigate, 350);
  }

  function onCategoryChange(value: string) {
    setCategoria(value);
    navigate();
  }

  function clearQuery() {
    setQ('');
    if (timerRef.current) clearTimeout(timerRef.current);
    navigate();
  }

  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        <input
          value={q}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar producto… (escribe y filtra al instante)"
          className="w-full bg-[#14161d] border border-white/10 rounded-lg pl-10 pr-9 py-2 text-sm focus:outline-none focus:border-[#ff5a00]"
        />
        {q && (
          <button
            type="button"
            onClick={clearQuery}
            title="Limpiar búsqueda"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <select
        value={categoria}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-[#14161d] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff5a00]"
      >
        <option value="TODOS">Todas las categorías</option>
        {categorias.map((c) => (
          <option key={c.categoria} value={c.categoria}>
            {c.categoria} ({c._count})
          </option>
        ))}
      </select>
    </div>
  );
}