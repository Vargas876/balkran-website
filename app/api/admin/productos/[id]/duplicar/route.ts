import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { id } = await params;
  const source = await prisma.product.findUnique({ where: { id } });
  if (!source) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const baseSlug = source.slug.endsWith('-copia')
    ? source.slug.replace(/-copia$/, '')
    : source.slug;
  let newSlug = `${baseSlug}-copia`;
  let n = 2;
  while (await prisma.product.findUnique({ where: { slug: newSlug } })) {
    newSlug = `${baseSlug}-copia-${n}`;
    n += 1;
  }

  const product = await prisma.product.create({
    data: {
      nombre: `${source.nombre} (copia)`,
      slug: newSlug,
      categoria: source.categoria,
      linea: source.linea,
      precio: source.precio,
      precioNumerico: source.precioNumerico,
      subtitulo: source.subtitulo,
      descripcion: source.descripcion,
      imagen_local: source.imagen_local,
      alcance: source.alcance,
      joules: source.joules,
      voltaje: source.voltaje,
      ideal_para: source.ideal_para,
      alimentacion: source.alimentacion,
      consumo: source.consumo,
      cobertura: source.cobertura,
      energia_salida: source.energia_salida,
      voltaje_salida: source.voltaje_salida,
      pulsos_minuto: source.pulsos_minuto,
      varillas_tierra: source.varillas_tierra,
      autonomia: source.autonomia,
      peso: source.peso,
      dimensiones: source.dimensiones,
      material: source.material,
      color: source.color,
      presentacion: source.presentacion,
      capacidad: source.capacidad,
      longitud: source.longitud,
      esMasVendido: false,
      esNuevo: false,
      esPopular: false,
      rating: source.rating,
      valoraciones: source.valoraciones,
      url: source.url,
      caracteristicas: source.caracteristicas,
      recomendado_para: source.recomendado_para,
      imagenes: source.imagenes,
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}