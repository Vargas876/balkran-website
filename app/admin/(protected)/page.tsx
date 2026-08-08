import { Package, Inbox, Users, Bot } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import DashboardCharts from '@/components/admin/DashboardCharts';
import StatCards from '@/components/admin/StatCards';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    productCount,
    viewCount,
    inquiryCount,
    userCount,
    chatCount,
    byCategory,
    byInquiryStatus,
    recentChats,
    recentInquiries,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.pageView.count(),
    prisma.inquiry.count(),
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
    { label: 'Productos', value: productCount, icon: 'Package', accent: 'from-[#ff5a00]/30 to-[#ff5a00]/5', href: '/admin/productos' },
    { label: 'Vistas de página', value: viewCount, icon: 'Eye', accent: 'from-pink-500/30 to-pink-500/5', href: '/admin/analytics' },
    { label: 'Consultas totales', value: inquiryCount, icon: 'Inbox', accent: 'from-sky-500/30 to-sky-500/5', href: '/admin/consultas' },
    { label: 'Usuarios', value: userCount, icon: 'Users', accent: 'from-violet-500/30 to-violet-500/5', href: '/admin/usuarios' },
    { label: 'Mensajes de chat', value: chatCount, icon: 'Bot', accent: 'from-amber-500/30 to-amber-500/5' },
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
      <h1 className="text-2xl font-bold">Panel de control</h1>
      <p className="text-white/50 text-sm mt-1 mb-8">
        Resumen general de la tienda Balkran.
      </p>

      <StatCards stats={stats} />

      <DashboardCharts
        categoryData={categoryData}
        statusData={statusData}
        chatByDay={chatByDay}
        recentInquiries={recentInquiries}
      />
    </div>
  );
}
