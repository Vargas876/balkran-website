'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Building2,
  Users,
  TrendingUp,
  Star,
  Loader2,
  Pencil,
  Trash2,
  Save,
  X,
} from 'lucide-react';

interface Sede {
  id: string;
  nombre: string;
  ciudad: string;
  departamento?: string;
  direccion: string;
  telefono?: string;
  horario: string;
  estado: 'OPERATIVA' | 'INACTIVA' | 'MANTENIMIENTO';
  latitud?: number;
  longitud?: number;
  ventasMes: number;
  ventasMesAnterior: number;
  capacidadOperativa: number;
  tiempoRespuestaMin: number;
  tecnicosAsignados: number;
  ordenesActivas: number;
  pedidosPendientes: number;
  calificacion: number;
  orden: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function SedeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [sede, setSede] = useState<Sede | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    departamento: '',
    direccion: '',
    telefono: '',
    horario: '',
    estado: 'OPERATIVA' as const,
    latitud: '',
    longitud: '',
    ventasMes: '',
    ventasMesAnterior: '',
    capacidadOperativa: '',
    tiempoRespuestaMin: '',
    tecnicosAsignados: '',
    ordenesActivas: '',
    pedidosPendientes: '',
    calificacion: '',
  });

  useEffect(() => {
    const fetchSede = async () => {
      try {
        const res = await fetch(`/api/admin/sedes/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setSede(data.sede);
          setFormData({
            nombre: data.sede.nombre,
            ciudad: data.sede.ciudad,
            departamento: data.sede.departamento ?? '',
            direccion: data.sede.direccion,
            telefono: data.sede.telefono ?? '',
            horario: data.sede.horario,
            estado: data.sede.estado,
            latitud: data.sede.latitud?.toString() ?? '',
            longitud: data.sede.longitud?.toString() ?? '',
            ventasMes: data.sede.ventasMes.toString(),
            ventasMesAnterior: data.sede.ventasMesAnterior.toString(),
            capacidadOperativa: data.sede.capacidadOperativa.toString(),
            tiempoRespuestaMin: data.sede.tiempoRespuestaMin.toString(),
            tecnicosAsignados: data.sede.tecnicosAsignados.toString(),
            ordenesActivas: data.sede.ordenesActivas.toString(),
            pedidosPendientes: data.sede.pedidosPendientes.toString(),
            calificacion: data.sede.calificacion.toString(),
          });
        }
      } catch (error) {
        console.error('Error fetching sede:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSede();
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        ...formData,
        latitud: formData.latitud ? parseFloat(formData.latitud) : null,
        longitud: formData.longitud ? parseFloat(formData.longitud) : null,
        ventasMes: parseFloat(formData.ventasMes) || 0,
        ventasMesAnterior: parseFloat(formData.ventasMesAnterior) || 0,
        capacidadOperativa: parseInt(formData.capacidadOperativa) || 100,
        tiempoRespuestaMin: parseInt(formData.tiempoRespuestaMin) || 60,
        tecnicosAsignados: parseInt(formData.tecnicosAsignados) || 0,
        ordenesActivas: parseInt(formData.ordenesActivas) || 0,
        pedidosPendientes: parseInt(formData.pedidosPendientes) || 0,
        calificacion: parseFloat(formData.calificacion) || 5,
      };

      const res = await fetch(`/api/admin/sedes/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setSede(data.sede);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error saving sede:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta sede?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/sedes/${params.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/admin/sedes');
      }
    } catch (error) {
      console.error('Error deleting sede:', error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#ff5a00]" size={32} />
      </div>
    );
  }

  if (!sede) {
    return (
      <div className="text-center py-12">
        <p className="text-white/40">Sede no encontrada</p>
        <Link
          href="/admin/sedes"
          className="text-[#ff5a00] hover:underline mt-4 inline-block"
        >
          Volver a sedes
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/sedes"
            className="p-2 rounded-lg hover:bg-white/10 text-white/60"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{sede.nombre}</h1>
            <p className="text-white/50 text-sm mt-1">{sede.direccion}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!editing ? (
            <>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors border border-white/10"
              >
                <Pencil size={16} />
                Editar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg px-4 py-2.5 text-sm transition-colors"
              >
                {deleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Eliminar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors border border-white/10"
              >
                <X size={16} />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Guardar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-3 h-3 rounded-full ${
                  sede.estado === 'OPERATIVA'
                    ? 'bg-emerald-400'
                    : sede.estado === 'INACTIVA'
                    ? 'bg-red-400'
                    : 'bg-yellow-400'
                }`}
              />
              <span className="font-semibold">
                {sede.estado === 'OPERATIVA'
                  ? 'Operativa'
                  : sede.estado === 'INACTIVA'
                  ? 'Inactiva'
                  : 'Mantenimiento'}
              </span>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={formData.ciudad}
                      onChange={(e) =>
                        setFormData({ ...formData, ciudad: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Horario
                    </label>
                    <input
                      type="text"
                      value={formData.horario}
                      onChange={(e) =>
                        setFormData({ ...formData, horario: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Latitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.latitud}
                      onChange={(e) =>
                        setFormData({ ...formData, latitud: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">
                      Longitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.longitud}
                      onChange={(e) =>
                        setFormData({ ...formData, longitud: e.target.value })
                      }
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) =>
                      setFormData({ ...formData, estado: e.target.value as any })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  >
                    <option value="OPERATIVA">Operativa</option>
                    <option value="INACTIVA">Inactiva</option>
                    <option value="MANTENIMIENTO">Mantenimiento</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={18} />
                  <span>{sede.direccion}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Clock size={18} />
                  <span>{sede.horario}</span>
                </div>
                {sede.telefono && (
                  <div className="flex items-center gap-3 text-white/60">
                    <Phone size={18} />
                    <span>{sede.telefono}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl overflow-hidden">
            <div className="h-80">
              {sede.latitud && sede.longitud ? (
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${sede.longitud - 0.015},${sede.latitud - 0.01},${sede.longitud + 0.015},${sede.latitud + 0.01}&layer=mapnik&marker=${sede.latitud},${sede.longitud}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`Mapa de ${sede.nombre}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1a1d27]">
                  <div className="text-center">
                    <MapPin size={48} className="text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">
                      Coordenadas no disponibles
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Métricas del mes</h3>
            {editing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Ventas este mes ($)
                  </label>
                  <input
                    type="number"
                    value={formData.ventasMes}
                    onChange={(e) =>
                      setFormData({ ...formData, ventasMes: e.target.value })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Ventas mes anterior ($)
                  </label>
                  <input
                    type="number"
                    value={formData.ventasMesAnterior}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ventasMesAnterior: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Capacidad operativa (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.capacidadOperativa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacidadOperativa: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Tiempo respuesta (min)
                  </label>
                  <input
                    type="number"
                    value={formData.tiempoRespuestaMin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tiempoRespuestaMin: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Técnicos asignados
                  </label>
                  <input
                    type="number"
                    value={formData.tecnicosAsignados}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tecnicosAsignados: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Órdenes activas
                  </label>
                  <input
                    type="number"
                    value={formData.ordenesActivas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ordenesActivas: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Pedidos pendientes
                  </label>
                  <input
                    type="number"
                    value={formData.pedidosPendientes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pedidosPendientes: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">
                    Calificación (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.calificacion}
                    onChange={(e) =>
                      setFormData({ ...formData, calificacion: e.target.value })
                    }
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1d27] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-[#ff5a00]" />
                    <span className="text-white/60 text-sm">Ventas</span>
                  </div>
                  <p className="text-xl font-bold">
                    {formatCurrency(sede.ventasMes)}
                  </p>
                  {sede.ventasMesAnterior > 0 && (
                    <p className="text-emerald-400 text-xs mt-1">
                      ↑{' '}
                      {(
                        ((sede.ventasMes - sede.ventasMesAnterior) /
                          sede.ventasMesAnterior) *
                        100
                      ).toFixed(0)}{' '}
                      vs anterior
                    </p>
                  )}
                </div>
                <div className="bg-[#1a1d27] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={18} className="text-sky-400" />
                    <span className="text-white/60 text-sm">Capacidad</span>
                  </div>
                  <p className="text-xl font-bold">
                    {sede.capacidadOperativa}%
                  </p>
                </div>
                <div className="bg-[#1a1d27] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-yellow-400" />
                    <span className="text-white/60 text-sm">Respuesta</span>
                  </div>
                  <p className="text-xl font-bold">
                    {formatTime(sede.tiempoRespuestaMin)}
                  </p>
                </div>
                <div className="bg-[#1a1d27] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-yellow-400" />
                    <span className="text-white/60 text-sm">Calificación</span>
                  </div>
                  <p className="text-xl font-bold">
                    {sede.calificacion.toFixed(1)} / 5
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Resumen</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Órdenes activas</span>
                <span className="text-2xl font-bold">{sede.ordenesActivas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">
                  Pedidos pendientes
                </span>
                <span className="text-2xl font-bold">
                  {sede.pedidosPendientes}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">
                  Técnicos asignados
                </span>
                <span className="text-2xl font-bold">
                  {sede.tecnicosAsignados}
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Ubicación</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-white/60">Ciudad:</span>{' '}
                <span>{sede.ciudad}</span>
              </div>
              {sede.departamento && (
                <div>
                  <span className="text-white/60">Departamento:</span>{' '}
                  <span>{sede.departamento}</span>
                </div>
              )}
              <div>
                <span className="text-white/60">Dirección:</span>{' '}
                <span>{sede.direccion}</span>
              </div>
              {sede.latitud && sede.longitud && (
                <div>
                  <span className="text-white/60">Coordenadas:</span>{' '}
                  <span>
                    {sede.latitud.toFixed(4)}, {sede.longitud.toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-[#14161d] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Horario</h3>
            <p className="text-white/60">{sede.horario}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
