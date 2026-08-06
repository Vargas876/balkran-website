import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import UserManagement from '@/components/admin/UserManagement';

export const dynamic = 'force-dynamic';

export default async function AdminUsuariosPage() {
  const session = await auth();

  if (session?.user.role !== 'SUPER_ADMIN' && session?.user.role !== 'ADMIN') {
    redirect('/admin');
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Usuarios</h1>
      <p className="text-white/50 text-sm mb-6">
        Cuentas con acceso al panel. Crea, edita roles, activa o elimina usuarios.
      </p>

      <UserManagement
        initialUsers={users as any}
        currentUserId={session.user.id}
      />
    </div>
  );
}