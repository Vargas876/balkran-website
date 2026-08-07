'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import Turnstile from '@/components/Turnstile';

const TIPOS = ['Petición', 'Queja', 'Reclamo', 'Solicitud'];

const inputCls =
  'w-full bg-white border border-gray-200 focus:border-[#ff5a00] rounded-xl text-[#1a2130] text-sm px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all';

export default function PqrsForm() {
  const [form, setForm] = useState({
    name: '',
    fecha: '',
    email: '',
    phone: '',
    tipo: 'Petición',
    message: '',
    aceptaDatos: false,
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          tipo: form.tipo,
          message: form.message,
          aceptaDatos: form.aceptaDatos,
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? 'No se pudo enviar la solicitud. Intenta de nuevo.');
        return;
      }

      setSuccess(true);
      setForm({ name: '', fecha: '', email: '', phone: '', tipo: 'Petición', message: '', aceptaDatos: false });
      setTurnstileToken(null);
    } catch {
      setError('Ocurrió un error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-emerald-800">¡Solicitud radicada con éxito!</p>
              <p className="text-emerald-700 text-xs mt-0.5">
                Nuestro equipo te dará respuesta por los canales que indicaste.
              </p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              Nombre cliente o empresa *
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Nombre del cliente o empresa"
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              Fecha
            </label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => update('fecha', e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              Correo electrónico *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              Teléfono
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+57 300 000 0000"
              className={inputCls}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
            Tipo de recurso *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIPOS.map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => update('tipo', tipo)}
                className={`text-sm font-semibold px-4 py-3 rounded-xl border transition-all ${
                  form.tipo === tipo
                    ? 'bg-[#ff5a00] text-white border-[#ff5a00] shadow-md shadow-[#ff5a00]/30'
                    : 'bg-white text-[#565e6e] border-gray-200 hover:border-[#ff5a00] hover:text-[#ff5a00]'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
            Mensaje *
          </label>
          <textarea
            required
            minLength={5}
            maxLength={5000}
            rows={6}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Describe tu petición, queja, reclamo o solicitud…"
            className={`${inputCls} resize-y`}
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            checked={form.aceptaDatos}
            onChange={(e) => update('aceptaDatos', e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-[#ff5a00] accent-[#ff5a00] mt-0.5 cursor-pointer shrink-0"
          />
          <span className="text-xs text-[#565e6e] leading-relaxed">
            Autorización de uso de datos personales. Acepto las{' '}
            <Link href="/politica-datos-personales" className="text-[#ff5a00] font-semibold hover:underline">
              políticas de uso
            </Link>
            ,{' '}
            <Link href="/politica-datos-personales" className="text-[#ff5a00] font-semibold hover:underline">
              políticas de protección de datos
            </Link>{' '}
            y{' '}
            <Link href="/terminos-y-condiciones-tienda" className="text-[#ff5a00] font-semibold hover:underline">
              condiciones de uso
            </Link>{' '}
            de la página. *
          </span>
        </label>

        <Turnstile onToken={setTurnstileToken} />

        <button
          type="submit"
          disabled={loading || !form.aceptaDatos}
          className="w-full bg-[#ff5a00] hover:bg-orange-600 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> ENVIANDO…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Enviar formulario
            </>
          )}
        </button>
      </form>
    </div>
  );
}