import { Package, Inbox, Users } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [productCount, inquiryCount, newInquiryCount, userCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NUEVO' } }),
      prisma.user.count(),
    ]);

  const stats = [
    { label: 'Productos', value: productCount, icon: Package },
    { label: 'Consultas totales', value: inquiryCount, icon: Inbox },
    { label: 'Consultas nuevas', value: newInquiryCount, icon: Inbox },
    { label: 'Usuarios', value: userCount, icon: Users },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-white/50 text-sm mt-1 mb-8">
        Resumen general de la tienda Balkran.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat: any) => (
          <div
            key={stat.label}
            className="bg-[#14161d] border border-white/10 rounded-2xl p-5"
          >
            <stat.icon size={20} className="text-[#ff5a00] mb-3" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-white/50 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
