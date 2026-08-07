import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { deleteImageFromR2 } from '@/lib/r2';
import { productSchema } from '@/lib/productSchema';

export const dynamic = 'force-dynamic';

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const slugConflict = await prisma.product.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (slugConflict) {
    return NextResponse.json(
      { error: 'Ya existe otro producto con ese slug' },
      { status: 409 }
    );
  }

  const data = parsed.data;
  const product = await prisma.product.update({
    where: { id },
    data: {
      nombre: data.nombre,
      slug: data.slug,
      categoria: data.categoria,
      linea: data.linea,
      precio: data.precio || 'Consultar',
      precioNumerico: data.precioNumerico,
      subtitulo: data.subtitulo ?? null,
      descripcion: data.descripcion ?? null,
      imagen_local: data.imagen_local || 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
      alcance: data.alcance ?? null,
      joules: data.joules ?? null,
      voltaje: data.voltaje ?? null,
      ideal_para: data.ideal_para ?? null,
      alimentacion: data.alimentacion ?? null,
      consumo: data.consumo ?? null,
      cobertura: data.cobertura ?? null,
      energia_salida: data.energia_salida ?? null,
      voltaje_salida: data.voltaje_salida ?? null,
      pulsos_minuto: data.pulsos_minuto ?? null,
      varillas_tierra: data.varillas_tierra ?? null,
      autonomia: data.autonomia ?? null,
      peso: data.peso ?? null,
      dimensiones: data.dimensiones ?? null,
      material: data.material ?? null,
      color: data.color ?? null,
      presentacion: data.presentacion ?? null,
      capacidad: data.capacidad ?? null,
      longitud: data.longitud ?? null,
      esMasVendido: data.esMasVendido,
      esNuevo: data.esNuevo,
      esPopular: data.esPopular,
      rating: data.rating,
      valoraciones: data.valoraciones,
      url: data.url ?? null,
      video: data.video ?? null,
      caracteristicas: data.caracteristicas,
      recomendado_para: data.recomendado_para,
      imagenes: data.imagenes,
    },
  });

  revalidatePath('/productos');
  revalidatePath(`/productos/${product.slug}`);
  revalidatePath('/');

  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { id } = await params;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath('/productos');
  revalidatePath(`/productos/${existing.slug}`);
  revalidatePath('/');

  // Limpia imágenes en R2 si el producto las apuntaba (evita huérfanos).
  try {
    const r2Urls = [existing.imagen_local, ...(existing.imagenes ?? [])].filter(
      (u): u is string => !!u && u.includes('r2.dev')
    );
    for (const u of r2Urls) {
      await deleteImageFromR2(u);
    }
  } catch (e) {
    console.error('Error eliminando imágenes en R2:', e);
  }

  return NextResponse.json({ success: true });
}
