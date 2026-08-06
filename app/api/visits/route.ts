import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const visitSchema = z.object({
  path: z.string().max(500),
  referrer: z.string().max(1000).optional().nullable(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = visitSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const { path, referrer } = parsed.data;

  // No registrar rutas de admin ni de API
  if (path.startsWith('/admin') || path.startsWith('/api') || path === '/login') {
    return NextResponse.json({ ok: true });
  }

  await prisma.pageView.create({ data: { path, referrer: referrer || null } });

  return NextResponse.json({ ok: true });
}