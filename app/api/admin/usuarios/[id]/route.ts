import { NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CUSTOMER'] as const;

const updateSchema = z.object({
  name: z.string().max(120).optional().nullable(),
  role: z.enum(ROLES).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(6).max(128).optional(),
});

function canManage(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!canManage(session?.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  // Evitar auto-desactivarse si no hay más super admins
  if (parsed.data.isActive === false && target.id === session.user.id) {
    return NextResponse.json(
      { error: 'No puedes desactivar tu propia cuenta' },
      { status: 400 }
    );
  }

  // Evitar degradar a CUSTOMER si es SUPER_ADMIN sin otro respaldo
  if (
    target.role === 'SUPER_ADMIN' &&
    parsed.data.role &&
    parsed.data.role !== 'SUPER_ADMIN' &&
    target.id !== session.user.id
  ) {
    const superAdmins = await prisma.user.count({
      where: { role: 'SUPER_ADMIN', isActive: true },
    });
    if (superAdmins <= 1) {
      return NextResponse.json(
        { error: 'Debe quedar al menos un super admin activo' },
        { status: 400 }
      );
    }
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.role !== undefined) data.role = parsed.data.role;
  if (parsed.data.isActive !== undefined) data.isActive = parsed.data.isActive;
  if (parsed.data.password) data.passwordHash = await hash(parsed.data.password, 12);

  const user = await prisma.user.update({
    where: { id },
    data,
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
  return NextResponse.json({ user });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!canManage(session?.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json(
      { error: 'No puedes eliminar tu propia cuenta' },
      { status: 400 }
    );
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  if (target.role === 'SUPER_ADMIN') {
    const superAdmins = await prisma.user.count({
      where: { role: 'SUPER_ADMIN', isActive: true },
    });
    if (superAdmins <= 1) {
      return NextResponse.json(
        { error: 'Debe quedar al menos un super admin activo' },
        { status: 400 }
      );
    }
  }

  await prisma.user.delete({ where: { id } });

  revalidatePath('/admin/usuarios');
  return NextResponse.json({ success: true });
}