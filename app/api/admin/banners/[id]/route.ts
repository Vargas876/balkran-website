import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { deleteImageFromR2 } from '@/lib/r2';

export const dynamic = 'force-dynamic';

const bannerSchema = z.object({
  imagen: z.string().max(500).min(1),
  titulo: z.string().max(200).optional().nullable(),
  subtitulo: z.string().max(300).optional().nullable(),
  link: z.string().max(500).optional().nullable(),
  activo: z.boolean().optional().default(true),
  orden: z.number().int().min(0).max(1000).optional().default(0),
});

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'EDITOR';
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
  const parsed = bannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const existing = await prisma.banner.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Banner no encontrado' }, { status: 404 });
  }

  const data = parsed.data;
  const banner = await prisma.banner.update({
    where: { id },
    data: {
      imagen: data.imagen,
      titulo: data.titulo ?? null,
      subtitulo: data.subtitulo ?? null,
      link: data.link ?? null,
      activo: data.activo,
      orden: data.orden,
    },
  });

  // Si se cambió la imagen, limpia la anterior en R2 (si era de R2).
  if (existing.imagen !== data.imagen) {
    try {
      if (existing.imagen.includes('r2.dev')) {
        await deleteImageFromR2(existing.imagen);
      }
    } catch (e) {
      console.error('Error eliminando banner en R2:', e);
    }
  }

  return NextResponse.json({ banner });
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
  const existing = await prisma.banner.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Banner no encontrado' }, { status: 404 });
  }

  await prisma.banner.delete({ where: { id } });

  try {
    if (existing.imagen.includes('r2.dev')) {
      await deleteImageFromR2(existing.imagen);
    }
  } catch (e) {
    console.error('Error eliminando banner en R2:', e);
  }

  return NextResponse.json({ success: true });
}
