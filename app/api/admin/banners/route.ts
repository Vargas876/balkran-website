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

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const banner = await prisma.banner.create({
    data: {
      imagen: data.imagen,
      titulo: data.titulo ?? null,
      subtitulo: data.subtitulo ?? null,
      link: data.link ?? null,
      activo: data.activo,
      orden: data.orden,
    },
  });

  return NextResponse.json({ banner }, { status: 201 });
}
