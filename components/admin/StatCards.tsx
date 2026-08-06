'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export default function StatCards({
  stats,
}: {
  stats: { label: string; value: number; icon: LucideIcon; accent: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-[#14161d] border border-white/10 rounded-2xl p-5 hover:border-[#ff5a00]/40 transition-colors"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.accent} flex items-center justify-center mb-3`}>
            <stat.icon size={20} className="text-white" />
          </div>
          <p className="text-3xl font-bold">{stat.value}</p>
          <p className="text-white/50 text-sm mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}