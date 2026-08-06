'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, X } from 'lucide-react';

type Faq = { q: string; a: string };

export default function KnowledgeForm({
  company,
  faqs,
}: {
  company: string;
  faqs: Faq[];
}) {
  const router = useRouter();
  const [companyText, setCompanyText] = useState(company);
  const [faqList, setFaqList] = useState<Faq[]>(faqs);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateFaq(index: number, field: 'q' | 'a', value: string) {
    setFaqList((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function addFaq() {
    setFaqList((prev) => [...prev, { q: '', a: '' }]);
  }

  function removeFaq(index: number) {
    setFaqList((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    setSaved(false);

    const res = await fetch('/api/admin/knowledge', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: companyText,
        faqs: faqList.filter((f) => f.q.trim() && f.a.trim()),
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Error guardando la base de conocimiento.');
      return;
    }

    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff5a00]';
  const labelClass = 'block text-xs text-white/50 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
          Base de conocimiento guardada. Volt la usará en las próximas respuestas.
        </p>
      )}

      <div>
        <label className={labelClass} htmlFor="company">Información de la empresa (contexto que Volt conoce)</label>
        <textarea
          id="company"
          className={`${inputClass} min-h-[180px] font-mono text-xs`}
          value={companyText}
          onChange={(e) => setCompanyText(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass + ' mb-0'}>Preguntas frecuentes</label>
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir pregunta
          </button>
        </div>

        <div className="space-y-4">
          {faqList.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/40">Pregunta {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                  aria-label="Eliminar pregunta"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                className={inputClass}
                value={f.q}
                onChange={(e) => updateFaq(i, 'q', e.target.value)}
                placeholder="Pregunta…"
              />
              <textarea
                className={`${inputClass} min-h-[80px]`}
                value={f.a}
                onChange={(e) => updateFaq(i, 'a', e.target.value)}
                placeholder="Respuesta…"
              />
            </div>
          ))}
        </div>

        {faqList.length === 0 && (
          <p className="text-white/40 text-sm text-center py-6 border border-dashed border-white/10 rounded-xl">
            Sin preguntas frecuentes. Añade la primera.
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? 'Guardando…' : 'Guardar base de conocimiento'}
        </button>
      </div>
    </form>
  );
}
