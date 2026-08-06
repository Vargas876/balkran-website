import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

const productSchema = z.object({
  nombre: z.string().min(1).max(200),
  slug: z.string().min(1).max(150).regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  categoria: z.enum(['ENERGIZADORES', 'KITS_SOLARES', 'ACCESORIOS']),
  linea: z.string().max(100).optional().default(''),
  precio: z.string().max(50).optional().default(''),
  precioNumerico: z.number().finite().nonnegative().max(1e12).optional().default(0),
  alcance: z.string().max(100).optional().nullable(),
  joules: z.string().max(100).optional().nullable(),
  voltaje: z.string().max(100).optional().nullable(),
  descripcion: z.string().max(5000).optional().nullable(),
  imagen_local: z.string().max(500).optional().nullable(),
  esMasVendido: z.boolean().optional().default(false),
  esNuevo: z.boolean().optional().default(false),
  esPopular: z.boolean().optional().default(false),
});

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return NextResponse.json(
      { error: 'Ya existe un producto con ese slug' },
      { status: 409 }
    );
  }

  const data = parsed.data;
  const product = await prisma.product.create({
    data: {
      nombre: data.nombre,
      slug: data.slug,
      categoria: data.categoria,
      linea: data.linea,
      precio: data.precio || 'Consultar',
      precioNumerico: data.precioNumerico,
      alcance: data.alcance ?? null,
      joules: data.joules ?? null,
      voltaje: data.voltaje ?? null,
      descripcion: data.descripcion ?? null,
      imagen_local: data.imagen_local || '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
      esMasVendido: data.esMasVendido,
      esNuevo: data.esNuevo,
      esPopular: data.esPopular,
      caracteristicas: [],
      recomendado_para: [],
      imagenes: [],
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}
