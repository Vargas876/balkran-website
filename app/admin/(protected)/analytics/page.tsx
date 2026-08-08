import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'];

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user || !ADMIN_ROLES.includes(session.user.role)) {
    redirect('/login');
  }

  const now = new Date();
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);

  const last7 = new Date(now);
  last7.setDate(now.getDate() - 6);
  last7.setHours(0, 0, 0, 0);

  const [
    totalViews,
    todayViews,
    weekViews,
    pageGroups,
    topViews,
    viewsByDay,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: startToday } } }),
    prisma.pageView.count({ where: { createdAt: { gte: last7 } } }),
    prisma.pageView.groupBy({ by: ['path'], _count: { _all: true } }),
    prisma.pageView.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, path: true, referrer: true, createdAt: true },
    }),
    (async () => {
      const days: { name: string; value: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const dayStart = new Date(now);
        dayStart.setDate(now.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);
        const count = await prisma.pageView.count({
          where: { createdAt: { gte: dayStart, lt: dayEnd } },
        });
        days.push({
          name: dayStart.toLocaleDateString('es-CO', { weekday: 'short' }),
          value: count,
        });
      }
      return days;
    })(),
  ]);

  const totalPagesCount = pageGroups.length;
  const topPaths = [...pageGroups]
    .sort((a, b) => b._count._all - a._count._all)
    .slice(0, 10)
    .map((p) => ({
      path: p.path || '/',
      value: p._count._all,
    }));

  const maxDay = Math.max(1, ...viewsByDay.map((d) => d.value));
  const maxPath = Math.max(1, ...topPaths.map((p) => p.value));

  const stats = [
    { label: 'Vistas totales', value: totalViews },
    { label: 'Vistas hoy', value: todayViews },
    { label: 'Últimos 7 días', value: weekViews },
    { label: 'Páginas distintas', value: totalPagesCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Analíticas de visitas</h1>
      <p className="text-white/50 text-sm mb-8">
        Tráfico registrado en el sitio público. Datos desde el rastreador de vistas.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#14161d] border border-white/10 rounded-2xl p-6 hover:border-[#ff5a00]/40 transition-colors flex flex-col"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45 mb-5">
              {s.label}
            </span>
            <p className="text-4xl font-extrabold leading-none tracking-tight text-white">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Vistas por día */}
        <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-bold mb-5 text-white/80">Vistas últimos 7 días</h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {viewsByDay.map((d) => (
              <div key={d.name} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-[#ff5a00]/30 to-[#ff5a00] rounded-t-md transition-all"
                  style={{ height: `${Math.max(3, (d.value / maxDay) * 160)}px` }}
                  title={`${d.name}: ${d.value}`}
                />
                <span className="text-[10px] text-white/40 uppercase">{d.name}</span>
                <span className="text-xs font-bold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top páginas */}
        <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-bold mb-4 text-white/80">Páginas más vistas</h3>
          <div className="space-y-3">
            {topPaths.length === 0 && (
              <p className="text-sm text-white/50">Aún sin datos de vistas.</p>
            )}
            {topPaths.map((p) => (
              <div key={p.path}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/70 truncate pr-2">{p.path === '/' ? 'Inicio ( / )' : p.path}</span>
                  <span className="font-bold shrink-0">{p.value}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff5a00]/60 to-[#ff5a00] rounded-full"
                    style={{ width: `${(p.value / maxPath) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vistas recientes */}
      <div className="bg-[#14161d] border border-white/10 rounded-2xl overflow-x-auto">
        <div className="px-6 py-4 border-b border-white/10 min-w-[600px]">
          <h3 className="text-sm font-bold text-white/80">Visitas recientes</h3>
        </div>
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wide">
              <th className="px-6 py-3">Página</th>
              <th className="px-6 py-3">Origen</th>
              <th className="px-6 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {topViews.map((v) => (
              <tr key={v.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-6 py-3 font-medium">{v.path}</td>
                <td className="px-6 py-3 text-white/50 truncate max-w-[260px]">
                  {v.referrer ?? 'Directo'}
                </td>
                <td className="px-6 py-3 text-white/50">
                  {v.createdAt.toLocaleString('es-CO')}
                </td>
              </tr>
            ))}
            {topViews.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-white/40 text-sm">
                  Aún no hay visitas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}