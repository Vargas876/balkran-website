'use client';

import { motion } from 'framer-motion';

type BarDatum = { name: string; value: number };
type Inquiry = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

const COLORS = ['#ff5a00', '#22c55e', '#3b82f6', '#eab308', '#a855f7'];

function BarChart({ data, title }: { data: BarDatum[]; title: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#14161d] border border-white/10 rounded-2xl p-5 hover:border-[#ff5a00]/30 transition-colors"
    >
      <h3 className="text-sm font-semibold text-white/70 mb-4">{title}</h3>
      {data.length === 0 ? (
        <p className="text-white/30 text-sm py-8 text-center">Sin datos</p>
      ) : (
        <div className="flex items-end gap-3 h-40">
          {data.map((d, i) => (
            <motion.div
              key={d.name}
              className="flex-1 flex flex-col items-center gap-2 min-w-0 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            >
              <span className="text-xs text-white/50">{d.value}</span>
              <motion.div
                className="w-full rounded-t-lg relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(4, (d.value / max) * 120)}px` }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                style={{
                  backgroundColor: COLORS[i % COLORS.length],
                  boxShadow: `0 0 12px ${COLORS[i % COLORS.length]}55`,
                }}
              />
              <span className="text-[10px] text-white/40 truncate w-full text-center">
                {d.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  NUEVO: 'bg-[#ff5a00]/20 text-[#ff5a00]',
  VISTO: 'bg-sky-500/20 text-sky-400',
  CONTACTADO: 'bg-emerald-500/20 text-emerald-400',
  CERRADO: 'bg-white/10 text-white/40',
};

export default function DashboardCharts({
  categoryData,
  statusData,
  chatByDay,
  recentInquiries,
}: {
  categoryData: BarDatum[];
  statusData: BarDatum[];
  chatByDay: BarDatum[];
  recentInquiries: Inquiry[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BarChart data={categoryData} title="Productos por categoría" />
        <BarChart data={statusData} title="Consultas por estado" />
        <BarChart data={chatByDay} title="Mensajes de chat · últimos 7 días" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="bg-[#14161d] border border-white/10 rounded-2xl p-5 hover:border-[#ff5a00]/30 transition-colors"
      >
        <h3 className="text-sm font-semibold text-white/70 mb-4">Últimas consultas</h3>
        {recentInquiries.length === 0 ? (
          <p className="text-white/30 text-sm py-6 text-center">Sin consultas todavía</p>
        ) : (
          <div className="space-y-2">
            {recentInquiries.map((inq, i) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
                className="flex items-center justify-between gap-4 bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{inq.name}</p>
                  <p className="text-xs text-white/40 truncate">{inq.email}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-white/40">
                    {new Date(inq.createdAt).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${STATUS_STYLES[inq.status] ?? 'bg-white/10 text-white/40'}`}
                  >
                    {inq.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}