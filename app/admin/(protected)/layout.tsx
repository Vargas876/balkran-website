import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

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
    <div className="min-h-screen bg-[#0b0c10] text-white flex">
      <AdminSidebar
        userEmail={session.user.email ?? ''}
        userRole={session.user.role}
      />
      <main className="flex-1 ml-64 max-md:ml-0 p-8">{children}</main>
    </div>
  );
}
