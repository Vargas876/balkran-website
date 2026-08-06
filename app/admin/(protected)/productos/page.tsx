import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const { q, categoria } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      ...(q
        ? { nombre: { contains: q, mode: 'insensitive' as const } }
        : {}),
      ...(categoria && categoria !== 'TODOS'
        ? { categoria: categoria as any }
        : {}),
    },
    orderBy: { nombre: 'asc' },
    select: {
      id: true,
      slug: true,
      nombre: true,
      categoria: true,
      precio: true,
      precioNumerico: true,
      esMasVendido: true,
      esNuevo: true,
      esPopular: true,
    },
  });

  const categorias = await prisma.product.groupBy({
    by: ['categoria'],
    _count: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-white/50 text-sm mt-1">
            {products.length} productos en el catálogo
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-[#ff5a00] hover:bg-[#e55200] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
        >
          <Plus size={16} />
          Nuevo producto
        </Link>
      </div>

      <form method="GET" className="flex gap-3 mb-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar producto…"
          className="flex-1 bg-[#14161d] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff5a00]"
        />
        <select
          name="categoria"
          defaultValue={categoria ?? 'TODOS'}
          className="bg-[#14161d] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff5a00]"
        >
          <option value="TODOS">Todas las categorías</option>
          {categorias.map((c: any) => (
            <option key={c.categoria} value={c.categoria}>
              {c.categoria} ({c._count})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Filtrar
        </button>
      </form>

      <div className="bg-[#14161d] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wide">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Etiquetas</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr
                key={p.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5"
              >
                <td className="px-4 py-3 font-medium">{p.nombre}</td>
                <td className="px-4 py-3 text-white/60">{p.categoria}</td>
                <td className="px-4 py-3">{p.precio}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {p.esMasVendido && (
                      <span className="px-2 py-0.5 rounded bg-[#ff5a00]/20 text-[#ff5a00] text-[10px] font-semibold uppercase">
                        Top
                      </span>
                    )}
                    {p.esNuevo && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase">
                        Nuevo
                      </span>
                    )}
                    {p.esPopular && (
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-semibold uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="p-2 rounded-lg hover:bg-white/10"
                      aria-label="Editar"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteProductButton productId={p.id} slug={p.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-white/40 py-12 text-sm">
            No hay productos que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
