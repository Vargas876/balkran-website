import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

const configSchema = z.record(
  z.string().min(1).max(100),
  z.string().max(1000).optional().nullable()
);

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'EDITOR';
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = configSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  await prisma.$transaction(
    Object.entries(parsed.data).map(([key, value]) =>
      prisma.siteConfig.upsert({
        where: { key },
        create: { key, value: value ?? '' },
        update: { value: value ?? '' },
      })
    )
  );

  return NextResponse.json({ success: true });
}
