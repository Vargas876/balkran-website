'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Pencil, Trash2, Shield, ShieldX } from 'lucide-react';
import UserRoleBadge from '@/components/admin/UserRoleBadge';

interface UserRow {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  createdAt: string | Date;
}

const ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CUSTOMER'];

export default function UserManagement({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserRow[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modo crear usuario
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    role: 'EDITOR',
  });

  // EdiciÃ³n inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    role: string;
    password: string;
  }>({ name: '', role: 'EDITOR', password: '' });

  // Confirmar eliminaciÃ³n
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function refreshUsers() {
    setLoading(true);
    const res = await fetch('/api/admin/usuarios');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setError(null);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const res = await fetch('/api/admin/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error al crear el usuario.');
      return;
    }

    setNewUser({ email: '', name: '', password: '', role: 'EDITOR' });
    setShowCreate(false);
    router.refresh();
    await refreshUsers();
  }

  function startEdit(u: UserRow) {
    setEditingId(u.id);
    setEditForm({ name: u.name ?? '', role: u.role, password: '' });
  }

  async function handleSaveEdit(id: string) {
    setError(null);
    setSaving(true);
    const payload: Record<string, unknown> = {
      name: editForm.name,
      role: editForm.role,
    };
    if (editForm.password) payload.password = editForm.password;
    const res = await fetch(`/api/admin/usuarios/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error al guardar.');
      return;
    }
    setEditingId(null);
    router.refresh();
    await refreshUsers();
  }

  async function handleToggleActive(u: UserRow) {
    setError(null);
    const res = await fetch(`/api/admin/usuarios/${u.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !u.isActive }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error al cambiar el estado.');
      return;
    }
    router.refresh();
    await refreshUsers();
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setError(null);
    setSaving(true);
    const res = await fetch(`/api/admin/usuarios/${confirmDelete}`, {
      method: 'DELETE',
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error al eliminar.');
      return;
    }
    setConfirmDelete(null);
    router.refresh();
    await refreshUsers();
  }

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff5a00]';
  const labelClass = 'block text-xs text-white/50 mb-1.5';

  return (
    <div>
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {/* BotÃ³n + crear */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">
          {loading ? 'Actualizandoâ€¦' : `${users.length} usuario(s)`}
        </p>
        <button
          onClick={() => setShowCreate((v) => !v)}
          className="bg-[#ff5a00] hover:bg-[#e55200] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
        >
          {showCreate ? <Plus className="w-4 h-4 rotate-45" /> : <Plus className="w-4 h-4" />}
          {showCreate ? 'Cancelar' : 'Nuevo usuario'}
        </button>
      </div>

      {/* Formulario crear */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-[#14161d] border border-white/10 rounded-2xl p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className={labelClass}>Email *</label>
            <input
              className={inputClass}
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Nombre</label>
            <input
              className={inputClass}
              value={newUser.name}
              onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Contraseña * (mín. 6)</label>
            <input
              className={inputClass}
              type="password"
              minLength={6}
              required
              value={newUser.password}
              onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Rol</label>
            <select
              className={inputClass}
              value={newUser.role}
              onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-colors flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Creandoâ€¦' : 'Crear usuario'}
            </button>
          </div>
        </form>
      )}

      {/* Tabla */}
      <div className="bg-[#14161d] border border-white/10 rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[650px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wide">
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Creado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isEditing = editingId === u.id;
              return (
                <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          className={inputClass}
                          value={editForm.name}
                          onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Nombre"
                        />
                        <input
                          className={inputClass}
                          type="password"
                          value={editForm.password}
                          onChange={(e) => setEditForm((p) => ({ ...p, password: e.target.value }))}
                          placeholder="Nueva contraseña (opcional)"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="font-medium">{u.name ?? 'â€”'}</div>
                        <div className="text-white/40 text-xs">{u.email}</div>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        className={inputClass}
                        value={editForm.role}
                        onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    ) : (
                      <UserRoleBadge role={u.role} />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 items-start">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          u.isActive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {u.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                      {u.id !== currentUserId && (
                        <button
                          onClick={() => handleToggleActive(u)}
                          className="text-[11px] text-white/50 hover:text-[#ff5a00] flex items-center gap-1"
                        >
                          {u.isActive ? <ShieldX className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                          {u.isActive ? 'Desactivar' : 'Activar'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/50">
                    {new Date(u.createdAt).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(u.id)}
                            disabled={saving}
                            className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-white/50 hover:text-white text-xs px-3 py-1.5"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(u)}
                          className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}

                      {u.id !== currentUserId && !isEditing && (
                        <button
                          onClick={() => setConfirmDelete(u.id)}
                          className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal confirmar eliminaciÃ³n */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1d24] border border-white/10 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Â¿Eliminar usuario?</h3>
            <p className="text-sm text-white/60 mb-6">
              Esta acción es permanente y eliminará el acceso del usuario al panel.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="text-white/60 hover:text-white text-sm px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? 'Eliminando…' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}