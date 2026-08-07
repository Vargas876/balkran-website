'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2 } from 'lucide-react';

type BannerFormData = {
  imagen: string;
  titulo: string;
  subtitulo: string;
  link: string;
  activo: boolean;
  orden: number;
};

export default function BannerForm({
  banner,
}: {
  banner?: BannerFormData & { id?: string };
}) {
  const router = useRouter();
  const [form, setForm] = useState<BannerFormData>({
    imagen: banner?.imagen ?? '',
    titulo: banner?.titulo ?? '',
    subtitulo: banner?.subtitulo ?? '',
    link: banner?.link ?? '',
    activo: banner?.activo ?? true,
    orden: banner?.orden ?? 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'banners');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Error subiendo la imagen.');
      }
      const data = await res.json();
      setForm((prev) => ({ ...prev, imagen: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error subiendo la imagen.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch(
      banner?.id ? `/api/admin/banners/${banner.id}` : '/api/admin/banners',
      {
        method: banner?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error guardando el banner.');
      return;
    }

    router.push('/admin/banners');
    router.refresh();
  }

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff5a00]';
  const labelClass = 'block text-xs text-white/50 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>Imagen *</label>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              className={inputClass}
              value={form.imagen}
              onChange={(e) => setForm((p) => ({ ...p, imagen: e.target.value }))}
              placeholder="URL de imagen en R2 o pega la URL"
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
              onChange={handleUpload}
            />
          </label>
        </div>
        {form.imagen && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-40 h-24 bg-black/40 rounded-lg overflow-hidden border border-white/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.imagen}
                alt="Vista previa"
                className="object-cover w-full h-full"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
              />
            </div>
            <span className="text-[11px] text-white/40 break-all">{form.imagen}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="titulo">Título</label>
          <input
            id="titulo"
            className={inputClass}
            value={form.titulo}
            onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="subtitulo">Subtítulo</label>
          <input
            id="subtitulo"
            className={inputClass}
            value={form.subtitulo}
            onChange={(e) => setForm((p) => ({ ...p, subtitulo: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="link">Enlace</label>
          <input
            id="link"
            className={inputClass}
            value={form.link}
            onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
            placeholder="/productos"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="orden">Orden</label>
          <input
            id="orden"
            type="number"
            min={0}
            className={inputClass}
            value={form.orden}
            onChange={(e) => setForm((p) => ({ ...p, orden: Number(e.target.value) }))}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
        <input
          type="checkbox"
          checked={form.activo}
          onChange={(e) => setForm((p) => ({ ...p, activo: e.target.checked }))}
          className="accent-[#ff5a00] w-4 h-4"
        />
        Banner activo
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors"
        >
          {saving ? 'Guardando…' : banner?.id ? 'Guardar cambios' : 'Crear banner'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/banners')}
          className="text-white/60 hover:text-white text-sm px-4 py-2.5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
