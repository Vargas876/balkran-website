'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import Turnstile from '@/components/Turnstile';
import { useLanguage } from '@/context/LanguageContext';

type TipoOption = { id: string; key: string };

const TIPOS: TipoOption[] = [
  { id: 'Petición', key: 'peticion' },
  { id: 'Queja', key: 'queja' },
  { id: 'Reclamo', key: 'reclamo' },
  { id: 'Solicitud', key: 'solicitud' },
];

const inputCls =
  'w-full bg-white border border-gray-200 focus:border-[#ff5a00] rounded-xl text-[#1a2130] text-sm px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    'lblName': 'Nombre cliente o empresa *',
    'phName': 'Nombre del cliente o empresa',
    'lblFecha': 'Fecha',
    'lblEmail': 'Correo electrónico *',
    'phEmail': 'tucorreo@ejemplo.com',
    'lblPhone': 'Teléfono',
    'phPhone': '+57 300 000 0000',
    'lblTipo': 'Tipo de recurso *',
    'peticion': 'Petición',
    'queja': 'Queja',
    'reclamo': 'Reclamo',
    'solicitud': 'Solicitud',
    'lblMensaje': 'Mensaje *',
    'phMensaje': 'Describe tu petición, queja, reclamo o solicitud…',
    'consentPre': 'Autorización de uso de datos personales. Acepto las ',
    'linkUso': 'políticas de uso',
    'linkProteccion': 'políticas de protección de datos',
    'linkCondiciones': 'condiciones de uso',
    'consentAnd': 'y',
    'consentPost': ' de la página. *',
    'successTitle': '¡Solicitud radicada con éxito!',
    'successDesc': 'Nuestro equipo te dará respuesta por los canales que indicaste.',
    'errSubmit': 'No se pudo enviar la solicitud. Intenta de nuevo.',
    'errConn': 'Ocurrió un error de conexión. Intenta de nuevo.',
    'sending': 'ENVIANDO…',
    'sendBtn': 'Enviar formulario',
  },
  en: {
    'lblName': 'Customer or company name *',
    'phName': 'Customer or company name',
    'lblFecha': 'Date',
    'lblEmail': 'Email *',
    'phEmail': 'you@example.com',
    'lblPhone': 'Phone',
    'phPhone': '+57 300 000 0000',
    'lblTipo': 'Type of request *',
    'peticion': 'Request',
    'queja': 'Complaint',
    'reclamo': 'Claim',
    'solicitud': 'Application',
    'lblMensaje': 'Message *',
    'phMensaje': 'Describe your request, complaint, claim or application…',
    'consentPre': 'Authorization for the use of personal data. I accept the ',
    'linkUso': 'use policies',
    'linkProteccion': 'data protection policies',
    'linkCondiciones': 'conditions of use',
    'consentAnd': 'and',
    'consentPost': ' of the website. *',
    'successTitle': 'Request successfully filed!',
    'successDesc': 'Our team will respond through the channels you indicated.',
    'errSubmit': 'Could not send the request. Please try again.',
    'errConn': 'A connection error occurred. Please try again.',
    'sending': 'SENDING…',
    'sendBtn': 'Submit form',
  },
  fr: {
    'lblName': 'Nom du client ou de l\u2019entreprise *',
    'phName': 'Nom du client ou de l\u2019entreprise',
    'lblFecha': 'Date',
    'lblEmail': 'Courriel *',
    'phEmail': 'vous@exemple.com',
    'lblPhone': 'Téléphone',
    'phPhone': '+57 300 000 0000',
    'lblTipo': 'Type de demande *',
    'peticion': 'Demande',
    'queja': 'Plainte',
    'reclamo': 'Réclamation',
    'solicitud': 'Requête',
    'lblMensaje': 'Message *',
    'phMensaje': 'Décrivez votre demande, plainte, réclamation ou sollicitation…',
    'consentPre': 'Autorisation d\u2019utilisation des données personnelles. J\u2019accepte les ',
    'linkUso': 'politiques d\u2019utilisation',
    'linkProteccion': 'politiques de protection des données',
    'linkCondiciones': 'conditions d\u2019utilisation',
    'consentAnd': 'et',
    'consentPost': ' de la page. *',
    'successTitle': 'Demande déposée avec succès !',
    'successDesc': 'Notre équipe vous répondra par les canaux que vous avez indiqués.',
    'errSubmit': 'La demande n\u2019a pas pu être envoyée. Réessayez.',
    'errConn': 'Une erreur de connexion est survenue. Réessayez.',
    'sending': 'ENVOI EN COURS…',
    'sendBtn': 'Envoyer',
  },
};

export default function PqrsForm() {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es');
  const l = (key: string) => L[lang][key] || L.es[key] || key;

  const [form, setForm] = useState({
    name: '',
    fecha: '',
    email: '',
    phone: '',
    tipo: 'Petición' as string,
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
        setError(data?.error ?? l('errSubmit'));
        return;
      }

      setSuccess(true);
      setForm({ name: '', fecha: '', email: '', phone: '', tipo: 'Petición', message: '', aceptaDatos: false });
      setTurnstileToken(null);
    } catch {
      setError(l('errConn'));
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
              <p className="font-bold text-emerald-800">{l('successTitle')}</p>
              <p className="text-emerald-700 text-xs mt-0.5">
                {l('successDesc')}
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
              {l('lblName')}
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder={l('phName')}
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              {l('lblFecha')}
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
              {l('lblEmail')}
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder={l('phEmail')}
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
              {l('lblPhone')}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder={l('phPhone')}
              className={inputCls}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
            {l('lblTipo')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIPOS.map((tipo) => (
              <button
                key={tipo.id}
                type="button"
                onClick={() => update('tipo', tipo.id)}
                className={`text-sm font-semibold px-4 py-3 rounded-xl border transition-all ${
                  form.tipo === tipo.id
                    ? 'bg-[#ff5a00] text-white border-[#ff5a00] shadow-md shadow-[#ff5a00]/30'
                    : 'bg-white text-[#565e6e] border-gray-200 hover:border-[#ff5a00] hover:text-[#ff5a00]'
                }`}
              >
                {l(tipo.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1a2130] uppercase tracking-wide">
            {l('lblMensaje')}
          </label>
          <textarea
            required
            minLength={5}
            maxLength={5000}
            rows={6}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={l('phMensaje')}
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
            {l('consentPre')}{' '}
            <Link href="/politica-datos-personales" className="text-[#ff5a00] font-semibold hover:underline">
              {l('linkUso')}
            </Link>
            ,{' '}
            <Link href="/politica-datos-personales" className="text-[#ff5a00] font-semibold hover:underline">
              {l('linkProteccion')}
            </Link>{' '}
            {l('consentAnd')}{' '}
            <Link href="/terminos-y-condiciones-tienda" className="text-[#ff5a00] font-semibold hover:underline">
              {l('linkCondiciones')}
            </Link>{' '}
            {l('consentPost')}
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
              <Loader2 className="w-4 h-4 animate-spin" /> {l('sending')}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> {l('sendBtn')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}