'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Loader2,
  Check,
  Plus,
  X,
  Sparkles,
  ChevronLeft,
  Wand2,
  Zap,
  CloudSun,
  Cable,
} from 'lucide-react';
import type { ProductFormData } from '@/lib/productSchema';
import { PRODUCT_PRESETS } from '@/lib/presets';

const PRESET_ICONS: Record<string, typeof Zap> = {
  Zap,
  CloudSun,
  Cable,
};

type FormState = { [K in keyof ProductFormData]: Exclude<ProductFormData[K], null> };

const EMPTY_FORM: FormState = {
  nombre: '',
  slug: '',
  categoria: 'ENERGIZADORES',
  linea: '',
  precio: '',
  precioNumerico: 0,
  subtitulo: '',
  descripcion: '',
  imagen_local: '',
  alcance: '',
  joules: '',
  voltaje: '',
  ideal_para: '',
  alimentacion: '',
  consumo: '',
  cobertura: '',
  energia_salida: '',
  voltaje_salida: '',
  pulsos_minuto: '',
  varillas_tierra: '',
  autonomia: '',
  peso: '',
  dimensiones: '',
  material: '',
  color: '',
  presentacion: '',
  capacidad: '',
  longitud: '',
  esMasVendido: false,
  esNuevo: false,
  esPopular: false,
  rating: 0,
  valoraciones: 0,
  url: '',
  caracteristicas: [],
  recomendado_para: [],
  imagenes: [],
};

type Tab = 'basicos' | 'imagenes' | 'precio' | 'especificaciones' | 'ficha';

const TABS: { id: Tab; label: string }[] = [
  { id: 'basicos', label: 'Básicos' },
  { id: 'imagenes', label: 'Imágenes' },
  { id: 'precio', label: 'Precio y promoción' },
  { id: 'especificaciones', label: 'Especificaciones' },
  { id: 'ficha', label: 'Ficha técnica' },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function precioToNumerico(s: string): number {
  const digits = s.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export default function ProductForm({
  product,
}: {
  product?: ProductFormData & { id?: string };
}) {
  const router = useRouter();
  const isEditing = !!product?.id;

  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY_FORM,
    ...(product
      ? Object.fromEntries(
          Object.entries(product).map(([k, v]) => [k, v == null ? '' : v])
        )
      : {}),
  }));
  const [tab, setTab] = useState<Tab>('basicos');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [newChip, setNewChip] = useState({ caracteristicas: '', recomendado_para: '' });
  const [generatingDesc, setGeneratingDesc] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(presetId: string) {
    const preset = PRODUCT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setForm((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(preset.data).map(([k, v]) => [k, v == null ? '' : v])
      ),
    }));
    setTab('basicos');
    setError(null);
  }

  function autoSlug() {
    const s = slugify(form.nombre || form.linea || 'producto');
    set('slug', s);
  }

  function onPrecio(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    set('precio', value);
    set('precioNumerico', precioToNumerico(value));
  }

  async function generateDescripcion() {
    if (!form.nombre.trim()) {
      setError('Ingresa al menos el nombre antes de generar la descripción.');
      setTab('basicos');
      return;
    }
    setGeneratingDesc(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/productos/descripcion-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          categoria: form.categoria,
          linea: form.linea,
          subtitulo: form.subtitulo,
          alcance: form.alcance,
          alimentacion: form.alimentacion,
          ideal_para: form.ideal_para,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'No se pudo generar la descripción.');
        return;
      }
      set('descripcion', data.descripcion);
    } catch {
      setError('Error de conexión al generar la descripción.');
    } finally {
      setGeneratingDesc(false);
    }
  }

  async function uploadToR2(file: File, folder: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Error subiendo la imagen.');
    }
    const data = await res.json();
    return data.url;
  }

  async function handleUploadMain(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadToR2(file, 'productos');
      set('imagen_local', url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error subiendo la imagen.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleUploadGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadToR2(file, 'productos');
        urls.push(url);
      }
      set('imagenes', [...(form.imagenes ?? []), ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error subiendo la galería.');
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  }

  function removeGallery(index: number) {
    set(
      'imagenes',
      (form.imagenes ?? []).filter((_, i) => i !== index)
    );
  }

  function moveGallery(index: number, dir: -1 | 1) {
    const arr = [...(form.imagenes ?? [])];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    set('imagenes', arr);
  }

  function addChip(key: 'caracteristicas' | 'recomendado_para') {
    const value = newChip[key].trim();
    if (!value) return;
    if ((form[key] ?? []).includes(value)) {
      setNewChip((c) => ({ ...c, [key]: '' }));
      return;
    }
    set(key, [...(form[key] ?? []), value]);
    setNewChip((c) => ({ ...c, [key]: '' }));
  }

  function removeChip(key: 'caracteristicas' | 'recomendado_para', value: string) {
    set(
      key,
      (form[key] ?? []).filter((v) => v !== value)
    );
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {!isEditing && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#ff5a00]" />
            <span className="text-sm font-semibold">Plantilla de inicio</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRODUCT_PRESETS.map((p) => {
              const PresetIcon = PRESET_ICONS[p.icono] ?? Zap;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className={`text-left border rounded-xl px-4 py-3 transition-colors group ${
                    form.categoria === p.data.categoria && !form.nombre
                      ? 'border-[#ff5a00] bg-[#ff5a00]/10'
                      : 'border-white/10 bg-black/20 hover:border-[#ff5a00]/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg border bg-gradient-to-br flex items-center justify-center mb-2.5 ${p.gradiente} group-hover:scale-105 transition-transform`}
                  >
                    <PresetIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold mb-0.5">{p.nombre}</div>
                  <div className="text-[11px] text-white/40 leading-snug">{p.descripcion}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1 border-b border-white/10 pb-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm rounded-t-lg transition-colors ${
              tab === t.id
                ? 'bg-white/10 text-white font-medium border-b-2 border-[#ff5a00]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basicos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="nombre">Nombre *</label>
            <input
              id="nombre"
              required
              className={inputClass}
              value={form.nombre}
              onChange={(e) => set('nombre', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">Slug *</label>
            <div className="flex gap-2">
              <input
                id="slug"
                required
                className={inputClass}
                value={form.slug}
                onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              />
              <button
                type="button"
                onClick={autoSlug}
                title="Generar desde el nombre"
                className="shrink-0 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors"
              >
                Auto
              </button>
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              className={inputClass}
              value={form.categoria}
              onChange={(e) => set('categoria', e.target.value as ProductFormData['categoria'])}
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
              placeholder="LÍNEA B (110V)"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="subtitulo">Subtítulo</label>
            <input
              id="subtitulo"
              className={inputClass}
              value={form.subtitulo}
              onChange={(e) => set('subtitulo', e.target.value)}
              placeholder="Cerca eléctrica para predios hasta 40 km"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ideal_para">Ideal para</label>
            <input
              id="ideal_para"
              className={inputClass}
              value={form.ideal_para}
              onChange={(e) => set('ideal_para', e.target.value)}
              placeholder="Caballos, vacas, cerdos"
            />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className={labelClass} htmlFor="descripcion">Descripción</label>
              <button
                type="button"
                onClick={generateDescripcion}
                disabled={generatingDesc}
                className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[#ff5a00] border border-[#ff5a00]/40 rounded-lg px-3 py-1.5 transition-colors hover:bg-[#ff5a00]/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingDesc ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                {generatingDesc ? 'Generando…' : 'Generar con IA'}
              </button>
            </div>
            <textarea
              id="descripcion"
              className={`${inputClass} min-h-[100px]`}
              value={form.descripcion}
              onChange={(e) => set('descripcion', e.target.value)}
            />
          </div>
        </div>
      )}

      {tab === 'imagenes' && (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Imagen principal</label>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <input
                  className={inputClass}
                  value={form.imagen_local}
                  onChange={(e) => set('imagen_local', e.target.value)}
                  placeholder="/assets/images/... o URL de R2"
                />
              </div>
              <label
                className={`shrink-0 flex items-center justify-center gap-2 border-2 border-dashed rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  uploading
                    ? 'border-white/30 bg-black/30'
                    : 'border-white/15 hover:border-[#ff5a00]/60 hover:bg-black/30'
                }`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#ff5a00] animate-spin" />
                    <span className="text-xs text-white/60">Subiendo…</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/60">Subir</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/webp,image/png,image/jpeg,image/gif,image/avif"
                  className="hidden"
                  onChange={handleUploadMain}
                />
              </label>
            </div>
            {form.imagen_local && (
              <div className="mt-2 flex items-center gap-3">
                <div className="relative w-20 h-14 bg-black/40 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imagen_local}
                    alt="Vista previa principal"
                    className="object-contain w-full h-full"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                  />
                </div>
                <span className="text-[11px] text-white/40 break-all">{form.imagen_local}</span>
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Galería de imágenes</label>
            <label
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-5 cursor-pointer transition-colors ${
                uploadingGallery
                  ? 'border-white/30 bg-black/30'
                  : 'border-white/15 hover:border-[#ff5a00]/60 hover:bg-black/30'
              }`}
            >
              {uploadingGallery ? (
                <>
                  <Loader2 className="w-6 h-6 text-[#ff5a00] animate-spin" />
                  <span className="text-xs text-white/60">Subiendo imágenes…</span>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-white/50" />
                  <span className="text-xs text-white/60">
                    Selecciona varias imágenes (webp, png, jpg · se optimizan a WebP)
                  </span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/webp,image/png,image/jpeg,image/gif,image/avif"
                className="hidden"
                onChange={handleUploadGallery}
              />
            </label>

            {(form.imagenes ?? []).length > 0 ? (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                {form.imagenes!.map((img, idx) => (
                  <div
                    key={img + idx}
                    className="relative group bg-black/40 rounded-xl overflow-hidden border border-white/10 aspect-square"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Producto ${idx + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] text-white bg-black/70 rounded px-1.5 py-0.5">
                      {idx + 1} / {form.imagenes!.length}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-gradient-to-t from-black/80 to-transparent py-1.5">
                      <button
                        type="button"
                        onClick={() => moveGallery(idx, -1)}
                        disabled={idx === 0}
                        title="Subir"
                        className="p-1.5 rounded-md bg-white/20 hover:bg-[#ff5a00] disabled:opacity-30 disabled:hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveGallery(idx, 1)}
                        disabled={idx === form.imagenes!.length - 1}
                        title="Bajar"
                        className="p-1.5 rounded-md bg-white/20 hover:bg-[#ff5a00] disabled:opacity-30 disabled:hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeGallery(idx)}
                        title="Eliminar"
                        className="p-1.5 rounded-md bg-red-500/80 hover:bg-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-white/30 text-center py-3 bg-black/20 rounded-xl">
                Sin imágenes adicionales
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="url">Enlace externo (opcional)</label>
            <input
              id="url"
              className={inputClass}
              value={form.url}
              onChange={(e) => set('url', e.target.value)}
              placeholder="https://www.cercasbalkran.com/tienda/..."
            />
          </div>
        </div>
      )}

      {tab === 'precio' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="precio">Precio (texto)</label>
              <input
                id="precio"
                className={inputClass}
                value={form.precio}
                onChange={onPrecio}
                placeholder="$ 310.000"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="precioNumerico">Precio (número, auto)</label>
              <input
                id="precioNumerico"
                type="number"
                min={0}
                className={`${inputClass} opacity-60`}
                value={form.precioNumerico}
                onChange={(e) => set('precioNumerico', Number(e.target.value))}
                readOnly
                title="Se calcula solo desde el texto del precio"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="rating">Rating (0-5)</label>
              <input
                id="rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                className={inputClass}
                value={form.rating}
                onChange={(e) => set('rating', Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="valoraciones">Nº de valoraciones</label>
              <input
                id="valoraciones"
                type="number"
                min={0}
                className={inputClass}
                value={form.valoraciones}
                onChange={(e) => set('valoraciones', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
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
        </div>
      )}

      {tab === 'especificaciones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [
              ['alcance', 'Alcance', '15 km'],
              ['joules', 'Joules', '0,5 J'],
              ['voltaje', 'Voltaje', '110V'],
              ['alimentacion', 'Alimentación', 'Batería recargable'],
              ['consumo', 'Consumo', '0,2 A'],
              ['cobertura', 'Cobertura', 'Hasta 40 km'],
              ['energia_salida', 'Energía de salida', '0,5 J'],
              ['voltaje_salida', 'Voltaje de salida', '9.000 V'],
              ['pulsos_minuto', 'Pulsos por minuto', '60'],
              ['varillas_tierra', 'Varillas de tierra', '3 x 1 m'],
              ['autonomia', 'Autonomía', '30 días'],
              ['peso', 'Peso', '2,5 kg'],
              ['dimensiones', 'Dimensiones', '25 x 18 x 12 cm'],
              ['material', 'Material', 'Acero inoxidable'],
              ['color', 'Color', 'Negro'],
              ['presentacion', 'Presentación', 'Caja con manual'],
              ['capacidad', 'Capacidad', '12 V'],
              ['longitud', 'Longitud', '2 m'],
            ] as const
          ).map(([key, label, ph]) => (
            <div key={key}>
              <label className={labelClass} htmlFor={key}>{label}</label>
              <input
                id={key}
                className={inputClass}
                value={(form[key] as string) ?? ''}
                onChange={(e) => set(key, e.target.value)}
                placeholder={ph}
              />
            </div>
          ))}
        </div>
      )}

      {tab === 'ficha' && (
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Características</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.caracteristicas ?? []).map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removeChip('caracteristicas', c)}
                    className="text-white/40 hover:text-red-400"
                    aria-label={`Quitar ${c}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className={inputClass}
                value={newChip.caracteristicas}
                onChange={(e) => setNewChip((c) => ({ ...c, caracteristicas: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addChip('caracteristicas'); } }}
                placeholder="Ej: Alarmas de salida, Indicador de estado"
              />
              <button
                type="button"
                onClick={() => addChip('caracteristicas')}
                className="shrink-0 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Añadir
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>Recomendado para (animales)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.recomendado_para ?? []).map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs"
                >
                  {a}
                  <button
                    type="button"
                    onClick={() => removeChip('recomendado_para', a)}
                    className="text-white/40 hover:text-red-400"
                    aria-label={`Quitar ${a}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className={inputClass}
                value={newChip.recomendado_para}
                onChange={(e) => setNewChip((c) => ({ ...c, recomendado_para: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addChip('recomendado_para'); } }}
                placeholder="Ej: Caballo, Vaca, Cerdo, Perro"
              />
              <button
                type="button"
                onClick={() => addChip('recomendado_para')}
                className="shrink-0 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Añadir
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="url">URL original (Framer)</label>
            <input
              id="url"
              className={inputClass}
              value={form.url}
              onChange={(e) => set('url', e.target.value)}
              placeholder="https://balkrann.framer.website/productos/b500"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Crear producto'}
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
