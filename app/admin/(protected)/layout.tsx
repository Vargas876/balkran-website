import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
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
