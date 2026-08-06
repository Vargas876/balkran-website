'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
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
  PanelLeftClose,
  PanelLeftOpen,
  X,
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
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  userEmail: string;
  userRole: string;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-[#14161d] border-r border-white/10 transition-all duration-300 z-40 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div
          className={`border-b border-white/10 flex items-center ${
            collapsed ? 'flex-col py-4' : 'justify-between p-5'
          }`}
        >
          <Link
            href="/admin"
            className={`${collapsed ? '' : 'block mb-3'}`}
            title="Balkran Admin"
          >
            {collapsed ? (
              <div className="w-10 h-10 rounded-xl bg-[#ff5a00]/20 flex items-center justify-center">
                <Image
                  src="/assets/images/LogoBlanco.webp"
                  alt="Balkran"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <Image
                  src="/assets/images/LogoBlanco.webp"
                  alt="Balkran"
                  width={150}
                  height={38}
                  className="object-contain object-left"
                  priority
                />
                <p className="text-[#ff5a00] font-bold text-sm mt-2">Balkran Admin</p>
                <p className="text-xs text-white/40 mt-1 truncate">{userEmail}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#ff5a00]/20 text-[#ff5a00] text-[10px] uppercase tracking-wide font-semibold">
                  {userRole}
                </span>
              </>
            )}
          </Link>
          <button
            type="button"
            onClick={onToggle}
            className="text-white/40 hover:text-white transition-colors shrink-0"
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className={`flex-1 p-4 space-y-1 ${collapsed ? 'px-3' : ''}`}>
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
                  collapsed
                    ? 'justify-center px-0 py-3'
                    : 'px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#ff5a00] text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} className="shrink-0" />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-white/10 space-y-1 ${collapsed ? 'p-3' : 'p-4'}`}>
          <Link
            href="/"
            title="Ver sitio"
            className={`flex items-center gap-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 ${
              collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'
            }`}
          >
            <Home size={18} className="shrink-0" />
            {!collapsed && 'Ver sitio'}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            title="Cerrar sesión"
            className={`w-full flex items-center gap-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 ${
              collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && 'Cerrar sesión'}
          </button>
        </div>
      </aside>

      {/* Sidebar móvil (drawer) */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-[#14161d] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-start justify-between">
          <Link href="/admin" onClick={onMobileClose}>
            <Image
              src="/assets/images/LogoBlanco.webp"
              alt="Balkran"
              width={150}
              height={38}
              className="object-contain object-left"
              priority
            />
            <p className="text-[#ff5a00] font-bold text-sm mt-2">Balkran Admin</p>
            <p className="text-xs text-white/40 mt-1 truncate">{userEmail}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#ff5a00]/20 text-[#ff5a00] text-[10px] uppercase tracking-wide font-semibold">
              {userRole}
            </span>
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#ff5a00] text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} className="shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            onClick={onMobileClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5"
          >
            <Home size={18} className="shrink-0" />
            Ver sitio
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} className="shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
