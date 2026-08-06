import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 300;

export async function GET() {
  const banners = await prisma.banner.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
    select: {
      id: true,
      imagen: true,
      titulo: true,
      subtitulo: true,
      link: true,
    },
  });
  return NextResponse.json({ banners });
}
