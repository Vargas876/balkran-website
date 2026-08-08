'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Turnstile from '@/components/Turnstile';
import { useLanguage } from '@/context/LanguageContext';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    logoAlt: 'BALKRAN',
    title: 'Recupera tu contraseña',
    subtitle: 'Te enviaremos un enlace para restablecerla',
    emailLabel: 'Correo electrónico',
    emailPh: 'Ingresa tu correo electrónico',
    sending: 'ENVIANDO…',
    sendLink: 'ENVIAR ENLACE',
    backLogin: 'Volver al inicio de sesión',
    tooMany: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.',
    successMsg: 'Si existe una cuenta con ese correo, recibirás un enlace de recuperación en unos minutos. Revisa tu bandeja de entrada y la carpeta de spam.',
  },
  en: {
    logoAlt: 'BALKRAN',
    title: 'Recover your password',
    subtitle: 'We will send you a link to reset it',
    emailLabel: 'Email address',
    emailPh: 'Enter your email address',
    sending: 'SENDING…',
    sendLink: 'SEND LINK',
    backLogin: 'Back to sign in',
    tooMany: 'Too many requests. Try again in a minute.',
    successMsg: 'If an account exists with that email, you will receive a recovery link in a few minutes. Check your inbox and spam folder.',
  },
  fr: {
    logoAlt: 'BALKRAN',
    title: 'Récupérez votre mot de passe',
    subtitle: 'Nous vous enverrons un lien pour le réinitialiser',
    emailLabel: 'Adresse e-mail',
    emailPh: 'Entrez votre adresse e-mail',
    sending: 'ENVOI…',
    sendLink: 'ENVOYER LE LIEN',
    backLogin: 'Retour à la connexion',
    tooMany: 'Trop de requêtes. Réessayez dans une minute.',
    successMsg: 'Si un compte existe avec cette adresse e-mail, vous recevrez un lien de récupération dans quelques minutes. Vérifiez votre boîte de réception et votre dossier spam.',
  },
};

function ForgotContent() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';
  const l = (key: string) => L[lang][key] || L.es[key] || key;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const res = await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, turnstileToken }),
    });

    setLoading(false);

    if (res.status === 429) {
      setError(l('tooMany'));
      return;
    }

    // Respuesta genérica siempre (no filtra si el correo existe).
    setSuccess(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0d14] font-sans flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/FondoLogin.webp"
          alt="Balkran Login Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-[0.98] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] bg-[#121620]/92 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 my-auto">
        <div className="text-center space-y-5 mb-7">
          <div className="relative w-44 h-11 mx-auto">
            <Image
              src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/LogoBlanco.webp"
              alt="BALKRAN"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {l('title')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {l('subtitle')}
            </p>
          </div>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-sm text-gray-300 leading-relaxed">
              {l('successMsg')}
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 bg-[#ff5a00] hover:bg-[#e04f00] text-white font-display text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition-all"
            >
              {l('backLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                {l('emailLabel')}
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={l('emailPh')}
                  className="w-full bg-[#090b10]/90 border border-white/15 focus:border-[#ff5a00] rounded-xl text-white text-xs sm:text-sm pl-10 pr-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? l('sending') : l('sendLink')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Turnstile onToken={setTurnstileToken} />

            <Link
              href="/login"
              className="block text-center text-xs font-semibold text-[#ff5a00] hover:underline pt-1"
            >
              {l('backLogin')}
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ForgotPage() {
  return (
    <Suspense>
      <ForgotContent />
    </Suspense>
  );
}
