const roleConfig: Record<string, { label: string; className: string }> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    className: 'bg-[#ff5a00]/20 text-[#ff5a00]',
  },
  ADMIN: {
    label: 'Admin',
    className: 'bg-violet-500/20 text-violet-400',
  },
  EDITOR: {
    label: 'Editor',
    className: 'bg-sky-500/20 text-sky-400',
  },
  CUSTOMER: {
    label: 'Cliente',
    className: 'bg-white/10 text-white/60',
  },
};

export default function UserRoleBadge({ role }: { role: string }) {
  const config = roleConfig[role] ?? roleConfig.CUSTOMER;
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}
