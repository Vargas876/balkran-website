'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Inbox,
  LogOut,
  Users,
  Home,
  Image as ImageIcon,
  Settings,
  Bot,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/consultas', label: 'Consultas', icon: Inbox },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/knowledge', label: 'Volt IA', icon: Bot },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminSidebar({
  userEmail,
  userRole,
}: {
  userEmail: string;
  userRole: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#14161d] border-r border-white/10 flex flex-col max-md:static max-md:w-full max-md:h-auto max-md:flex-row max-md:overflow-x-auto">
      <div className="p-6 border-b border-white/10">
        <p className="text-[#ff5a00] font-bold text-lg">Balkran Admin</p>
        <p className="text-xs text-white/40 mt-1 truncate">{userEmail}</p>
        <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#ff5a00]/20 text-[#ff5a00] text-[10px] uppercase tracking-wide font-semibold">
          {userRole}
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#ff5a00] text-white font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5"
        >
          <Home size={18} />
          Ver sitio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
