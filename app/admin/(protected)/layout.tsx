import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (!ADMIN_ROLES.includes(session.user.role)) {
    redirect('/');
  }

  return (
    <AdminShell
      userEmail={session.user.email ?? ''}
      userRole={session.user.role}
    >
      {children}
    </AdminShell>
  );
}
