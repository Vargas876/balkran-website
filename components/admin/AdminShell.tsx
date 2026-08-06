'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminShell({
  userEmail,
  userRole,
  children,
}: {
  userEmail: string;
  userRole: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex">
      <AdminSidebar
        userEmail={userEmail}
        userRole={userRole}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className={`flex-1 min-w-0 transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'} p-4 sm:p-6 lg:p-10`}>
        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden mb-4 flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm transition-colors"
          aria-label="Abrir menú"
        >
          <MenuIcon />
          Menú
        </button>
        {children}
      </main>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
