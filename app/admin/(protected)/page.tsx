import { Package, Inbox, Users, MessagesSquare, Bot } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import DashboardCharts from '@/components/admin/DashboardCharts';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    productCount,
    inquiryCount,
    newInquiryCount,
    userCount,
    chatCount,
    byCategory,
    byInquiryStatus,
    recentChats,
    recentInquiries,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NUEVO' } }),
    prisma.user.count(),
    prisma.chatMessage.count(),
    prisma.product.groupBy({ by: ['categoria'], _count: true }),
    prisma.inquiry.groupBy({ by: ['status'], _count: true }),
    prisma.chatMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { createdAt: true },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, email: true, status: true, createdAt: true },
    }),
  ]);

  const stats = [
    { label: 'Productos', value: productCount, icon: Package },
    { label: 'Consultas totales', value: inquiryCount, icon: Inbox },
    { label: 'Consultas nuevas', value: newInquiryCount, icon: Inbox },
    { label: 'Usuarios', value: userCount, icon: Users },
    { label: 'Mensajes de chat', value: chatCount, icon: Bot },
  ];

  const categoryData = byCategory.map((c) => ({
    name: c.categoria === 'ENERGIZADORES' ? 'Energizadores' : c.categoria === 'KITS_SOLARES' ? 'Kits Solares' : 'Accesorios',
    value: c._count,
  }));

  const statusOrder = ['NUEVO', 'VISTO', 'CONTACTADO', 'CERRADO'] as const;
  const statusData = statusOrder.map((s) => {
    const found = byInquiryStatus.find((x) => x.status === s);
    return { name: s.charAt(0) + s.slice(1).toLowerCase(), value: found?._count ?? 0 };
  });

  // Chats por día (últimos 7 días)
  const chatByDay: { name: string; value: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const count = recentChats.filter((m) => m.createdAt >= day && m.createdAt < next).length;
    chatByDay.push({
      name: day.toLocaleDateString('es-CO', { weekday: 'short' }),
      value: count,
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-white/50 text-sm mt-1 mb-8">
        Resumen general de la tienda Balkran.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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

      <DashboardCharts
        categoryData={categoryData}
        statusData={statusData}
        chatByDay={chatByDay}
        recentInquiries={recentInquiries}
      />
    </div>
  );
}
