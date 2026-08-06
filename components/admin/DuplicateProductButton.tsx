'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Loader2 } from 'lucide-react';

export default function DuplicateProductButton({
  productId,
  slug,
}: {
  productId: string;
  slug: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDuplicate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/productos/${productId}/duplicar`, {
        method: 'POST',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Error duplicando el producto.');
      }
      router.push('/admin/productos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error duplicando.');
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDuplicate}
        disabled={loading}
        title="Duplicar producto"
        aria-label={`Duplicar ${slug}`}
        className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      {error && (
        <span className="absolute right-0 top-full mt-1 whitespace-nowrap text-[10px] text-red-400 bg-black/80 rounded px-2 py-1 z-10">
          {error}
        </span>
      )}
    </div>
  );
}
