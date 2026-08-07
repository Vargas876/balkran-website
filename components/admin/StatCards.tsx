'use client';

import { motion } from 'framer-motion';
import { Package, Inbox, MessagesSquare, Users, Bot, Eye } from 'lucide-react';

const ICONS: Record<string, typeof Package> = {
  Package,
  Inbox,
  MessagesSquare,
  Users,
  Bot,
  Eye,
};

export default function StatCards({
  stats,
}: {
  stats: { label: string; value: number; icon: string; accent: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
      {stats.map((stat, i) => {
        const Icon = ICONS[stat.icon] ?? Package;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="bg-[#14161d] border border-white/10 rounded-2xl p-6 hover:border-[#ff5a00]/40 transition-colors flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.accent} flex items-center justify-center shrink-0`}>
                <Icon size={17} className="text-white" />
              </div>
            </div>
            <p className="text-4xl font-extrabold leading-none tracking-tight">{stat.value}</p>
            <div className="mt-4 h-px bg-white/5" />
            <p className="mt-3 text-xs text-white/35">
              {stat.label.toLowerCase()}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}