import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Editar producto</h1>
      <p className="text-white/50 text-sm mb-8">
        Actualizando <span className="text-[#ff5a00]">{product.nombre}</span>
      </p>
      <ProductForm
        product={{
          id: product.id,
          nombre: product.nombre,
          slug: product.slug,
          categoria: product.categoria,
          linea: product.linea,
          precio: product.precio,
          precioNumerico: product.precioNumerico,
          alcance: product.alcance ?? undefined,
          joules: product.joules ?? undefined,
          voltaje: product.voltaje ?? undefined,
          descripcion: product.descripcion ?? undefined,
          imagen_local: product.imagen_local ?? undefined,
          esMasVendido: product.esMasVendido,
          esNuevo: product.esNuevo,
          esPopular: product.esPopular,
        }}
      />
    </div>
  );
}
