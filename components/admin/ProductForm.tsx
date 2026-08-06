'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProductFormData = {
  nombre: string;
  slug: string;
  categoria: string;
  linea: string;
  precio: string;
  precioNumerico: number;
  alcance?: string;
  joules?: string;
  voltaje?: string;
  descripcion?: string;
  imagen_local?: string;
  esMasVendido: boolean;
  esNuevo: boolean;
  esPopular: boolean;
};

export default function ProductForm({
  product,
}: {
  product?: ProductFormData & { id?: string };
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    nombre: product?.nombre ?? '',
    slug: product?.slug ?? '',
    categoria: product?.categoria ?? 'ENERGIZADORES',
    linea: product?.linea ?? '',
    precio: product?.precio ?? '',
    precioNumerico: product?.precioNumerico ?? 0,
    alcance: product?.alcance ?? '',
    joules: product?.joules ?? '',
    voltaje: product?.voltaje ?? '',
    descripcion: product?.descripcion ?? '',
    imagen_local: product?.imagen_local ?? '',
    esMasVendido: product?.esMasVendido ?? false,
    esNuevo: product?.esNuevo ?? false,
    esPopular: product?.esPopular ?? false,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch(
      product?.id ? `/api/admin/productos/${product.id}` : '/api/admin/productos',
      {
        method: product?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error guardando el producto.');
      return;
    }

    router.push('/admin/productos');
    router.refresh();
  }

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff5a00]';
  const labelClass = 'block text-xs text-white/50 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            required
            className={inputClass}
            value={form.nombre}
            onChange={(e) => set('nombre', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="slug">Slug</label>
          <input
            id="slug"
            required
            className={inputClass}
            value={form.slug}
            onChange={(e) =>
              set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))
            }
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            className={inputClass}
            value={form.categoria}
            onChange={(e) => set('categoria', e.target.value)}
          >
            <option value="ENERGIZADORES">Energizadores</option>
            <option value="KITS_SOLARES">Kits Solares</option>
            <option value="ACCESORIOS">Accesorios</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="linea">Línea</label>
          <input
            id="linea"
            className={inputClass}
            value={form.linea}
            onChange={(e) => set('linea', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="precio">Precio (texto)</label>
          <input
            id="precio"
            className={inputClass}
            value={form.precio}
            onChange={(e) => set('precio', e.target.value)}
            placeholder="$ 310.000"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="precioNumerico">
            Precio (número)
          </label>
          <input
            id="precioNumerico"
            type="number"
            className={inputClass}
            value={form.precioNumerico}
            onChange={(e) => set('precioNumerico', Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="alcance">Alcance</label>
          <input
            id="alcance"
            className={inputClass}
            value={form.alcance}
            onChange={(e) => set('alcance', e.target.value)}
            placeholder="15 km"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="joules">Joules</label>
          <input
            id="joules"
            className={inputClass}
            value={form.joules}
            onChange={(e) => set('joules', e.target.value)}
            placeholder="0,5 J"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="voltaje">Voltaje</label>
          <input
            id="voltaje"
            className={inputClass}
            value={form.voltaje}
            onChange={(e) => set('voltaje', e.target.value)}
            placeholder="110V"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="imagen_local">Imagen</label>
          <input
            id="imagen_local"
            className={inputClass}
            value={form.imagen_local}
            onChange={(e) => set('imagen_local', e.target.value)}
            placeholder="/assets/images/..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          className={`${inputClass} min-h-[120px]`}
          value={form.descripcion}
          onChange={(e) => set('descripcion', e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {(
          [
            ['esMasVendido', 'Más vendido'],
            ['esNuevo', 'Nuevo'],
            ['esPopular', 'Popular'],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-2 text-sm text-white/70 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="accent-[#ff5a00] w-4 h-4"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors"
        >
          {saving ? 'Guardando…' : product?.id ? 'Guardar cambios' : 'Crear producto'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/productos')}
          className="text-white/60 hover:text-white text-sm px-4 py-2.5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
