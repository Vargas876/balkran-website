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
    <div className="max-w-4xl">
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
          subtitulo: product.subtitulo ?? undefined,
          descripcion: product.descripcion ?? undefined,
          imagen_local: product.imagen_local ?? undefined,
          alcance: product.alcance ?? undefined,
          joules: product.joules ?? undefined,
          voltaje: product.voltaje ?? undefined,
          ideal_para: product.ideal_para ?? undefined,
          alimentacion: product.alimentacion ?? undefined,
          consumo: product.consumo ?? undefined,
          cobertura: product.cobertura ?? undefined,
          energia_salida: product.energia_salida ?? undefined,
          voltaje_salida: product.voltaje_salida ?? undefined,
          pulsos_minuto: product.pulsos_minuto ?? undefined,
          varillas_tierra: product.varillas_tierra ?? undefined,
          autonomia: product.autonomia ?? undefined,
          peso: product.peso ?? undefined,
          dimensiones: product.dimensiones ?? undefined,
          material: product.material ?? undefined,
          color: product.color ?? undefined,
          presentacion: product.presentacion ?? undefined,
          capacidad: product.capacidad ?? undefined,
          longitud: product.longitud ?? undefined,
          esMasVendido: product.esMasVendido,
          esNuevo: product.esNuevo,
          esPopular: product.esPopular,
          rating: product.rating,
          valoraciones: product.valoraciones,
          url: product.url ?? undefined,
          caracteristicas: product.caracteristicas,
          recomendado_para: product.recomendado_para,
          imagenes: product.imagenes,
        }}
      />
    </div>
  );
}
