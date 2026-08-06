import { NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CUSTOMER'] as const;

const createSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(120).optional().nullable(),
  password: z.string().min(6).max(128),
  role: z.enum(ROLES).default('EDITOR'),
});

function canManage(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function GET() {
  const session = await auth();
  if (!canManage(session?.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!canManage(session?.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const { email, name, password, role } = parsed.data;
  const normalized = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (existing) {
    return NextResponse.json(
      { error: 'Ya existe un usuario con este email' },
      { status: 409 }
    );
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email: normalized, name: name ?? null, passwordHash, role },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  revalidatePath('/admin/usuarios');
  return NextResponse.json({ user }, { status: 201 });
}