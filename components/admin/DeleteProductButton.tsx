'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteProductButton({
  productId,
  slug,
}: {
  productId: string;
  slug: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    startTransition(async () => {
      await fetch(`/api/admin/productos/${productId}`, {
        method: 'DELETE',
      });
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`p-2 rounded-lg transition-colors ${
        confirming
          ? 'bg-red-500 text-white'
          : 'text-red-400 hover:bg-red-500/10'
      }`}
      aria-label={confirming ? `Confirmar eliminar ${slug}` : 'Eliminar'}
    >
      <Trash2 size={16} />
    </button>
  );
}
