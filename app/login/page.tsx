'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Eye, EyeOff, Leaf, Lock, Mail, Shield } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Turnstile from '@/components/Turnstile';
import { useLanguage } from '@/context/LanguageContext';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    sloganA: 'Energía',
    sloganB: 'que protege,',
    sloganC: 'tecnología que',
    sloganD: 'conecta',
    secTitle: 'SEGURIDAD', secSub: 'Confiable',
    tecnoTitle: 'TECNOLOGÍA', tecnoSub: 'Avanzada',
    innovTitle: 'INNOVACIÓN', innovSub: 'Sostenible',
    logoAlt: 'BALKRAN Tecnología e Innovación',
    cardLogoAlt: 'BALKRAN',
    welcome: 'Bienvenido de nuevo',
    subtitle: 'Inicia sesión para continuar',
    emailLabel: 'Correo electrónico',
    emailPh: 'Ingresa tu correo electrónico',
    passLabel: 'Contraseña',
    passPh: 'Ingresa tu contraseña',
    pwVisibility: 'Toggle password visibility',
    remember: 'Recordarme',
    forgot: '¿Olvidaste tu clave?',
    verifying: 'VERIFICANDO…',
    login: 'INICIAR SESIÓN',
    invalidCred: 'Credenciales inválidas. Verifica tu correo y contraseña.',
    pendingApproval: 'Tu cuenta está pendiente de aprobación por un administrador.',
    createAccount: '¿No tienes cuenta? Regístrate',
    rights: '© 2026 BALKRAN. Todos los derechos reservados.',
    otpTitle: 'Verificación en dos pasos',
    otpDesc: 'Enviamos un código de seguridad a tu correo',
    otpLabel: 'Código de 6 dígitos',
    otpPh: 'Ingresa el código recibido',
    otpVerify: 'VERIFICAR CÓDIGO',
    otpSending: 'ENVIANDO…',
    otpInvalid: 'Código incorrecto o expirado. Intenta de nuevo.',
    otpBack: 'Volver',
    otpResend: 'Reenviar código',
    otpSentTo: 'Te lo enviamos a',
  },
  en: {
    sloganA: 'Energy',
    sloganB: 'that protects,',
    sloganC: 'technology that',
    sloganD: 'connects',
    secTitle: 'SECURITY', secSub: 'Reliable',
    tecnoTitle: 'TECHNOLOGY', tecnoSub: 'Advanced',
    innovTitle: 'INNOVATION', innovSub: 'Sustainable',
    logoAlt: 'BALKRAN Technology and Innovation',
    cardLogoAlt: 'BALKRAN',
    welcome: 'Welcome back',
    subtitle: 'Sign in to continue',
    emailLabel: 'Email address',
    emailPh: 'Enter your email address',
    passLabel: 'Password',
    passPh: 'Enter your password',
    pwVisibility: 'Toggle password visibility',
    remember: 'Remember me',
    forgot: 'Forgot your password?',
    verifying: 'VERIFYING…',
    login: 'SIGN IN',
    invalidCred: 'Invalid credentials. Check your email and password.',
    pendingApproval: 'Your account is pending approval by an administrator.',
    createAccount: 'Don\'t have an account? Sign up',
    rights: '© 2026 BALKRAN. All rights reserved.',
    otpTitle: 'Two-step verification',
    otpDesc: 'A security code was sent to your email',
    otpLabel: '6-digit code',
    otpPh: 'Enter the code you received',
    otpVerify: 'VERIFY CODE',
    otpSending: 'SENDING…',
    otpInvalid: 'Incorrect or expired code. Try again.',
    otpBack: 'Go back',
    otpResend: 'Resend code',
    otpSentTo: 'We sent it to',
  },
  fr: {
    sloganA: 'Énergie',
    sloganB: 'qui protège,',
    sloganC: 'la technologie qui',
    sloganD: 'connecte',
    secTitle: 'SÉCURITÉ', secSub: 'Fiable',
    tecnoTitle: 'TECHNOLOGIE', tecnoSub: 'Avancée',
    innovTitle: 'INNOVATION', innovSub: 'Durable',
    logoAlt: 'BALKRAN Technologie et Innovation',
    cardLogoAlt: 'BALKRAN',
    welcome: 'Bienvenue',
    subtitle: 'Connectez-vous pour continuer',
    emailLabel: 'Adresse e-mail',
    emailPh: 'Entrez votre adresse e-mail',
    passLabel: 'Mot de passe',
    passPh: 'Entrez votre mot de passe',
    pwVisibility: 'Basculer la visibilité du mot de passe',
    remember: 'Se souvenir de moi',
    forgot: 'Mot de passe oublié ?',
    verifying: 'VÉRIFICATION…',
    login: 'SE CONNECTER',
    invalidCred: 'Identifiants invalides. Vérifiez votre e-mail et votre mot de passe.',
    pendingApproval: 'Votre compte est en attente d\'approbation par un administrateur.',
    createAccount: 'Pas encore de compte ? Inscrivez-vous',
    rights: '© 2026 BALKRAN. Tous droits réservés.',
    otpTitle: 'Vérification en deux étapes',
    otpDesc: 'Un code de sécurité a été envoyé à votre e-mail',
    otpLabel: 'Code à 6 chiffres',
    otpPh: 'Saisissez le code reçu',
    otpVerify: 'VÉRIFIER LE CODE',
    otpSending: 'ENVOI…',
    otpInvalid: 'Code incorrect ou expiré. Réessayez.',
    otpBack: 'Retour',
    otpResend: 'Renvoyer le code',
    otpSentTo: 'Nous l\'avons envoyé à',
  },
};

function LoginContent() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';
  const l = (key: string) => L[lang][key] || L.es[key] || key;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Paso 1: validar credenciales y solicitar el código OTP.
    const res = await fetch('/api/auth/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, turnstileToken }),
    });
    const data = await res.json().catch(() => null);

    setLoading(false);

    if (!res.ok || !data?.ok) {
      setError(data?.error || l('invalidCred'));
      return;
    }

    setOtp('');
    setOtpEmail(data.emailMasked || email);
    setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Paso 2: validar el código y obtener el token de sesión.
    const res = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: otp, email }),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || l('otpInvalid'));
      return;
    }

    // Completa el login con el token firmado (la contraseña ya fue validada).
    const signRes = await signIn('credentials', {
      otpToken: data.otpToken,
      redirect: false,
    });

    setLoading(false);

    if (signRes?.error) {
      setError(l('otpInvalid'));
      return;
    }

    // Redirigir según rol: CUSTOMER no debe caer en /admin.
    const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
    const sessionRes = await fetch('/api/auth/session');
    const session = await sessionRes.json().catch(() => null);
    const role = session?.user?.role as string | undefined;
    const isAdmin = role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'EDITOR';

    let destination = callbackUrl;
    if (isAdmin && destination.startsWith('/login')) destination = '/admin';
    if (!isAdmin) destination = destination.startsWith('/admin') ? '/' : destination;

    router.push(destination);
    router.refresh();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0d14] font-sans flex flex-col justify-between overflow-x-hidden selection:bg-[#ff5a00] selection:text-white">
      {/* Background Image Layer using FondoLogin.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/FondoLogin.webp"
          alt="Balkran Login Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft Contrast Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-[0.98] pointer-events-none" />
      </div>

      {/* Main Container: Centered Login Card + Absolutely Positioned Left Branding */}
      <main className="relative z-10 flex-1 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* Left Column: Balkran Logo, Slogan & Feature Icons (Floating on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-8 lg:left-16 xl:left-24 top-[34%] -translate-y-1/2 hidden lg:flex flex-col justify-center max-w-md xl:max-w-lg space-y-9 text-white pointer-events-none z-10"
        >
          {/* Logo & Slogan */}
          <div className="space-y-5">
            <div className="relative w-64 h-14">
              <Image
                src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/LogoBlanco.webp"
                alt={l('logoAlt')}
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <div className="space-y-1 font-sans text-2xl xl:text-3xl font-normal leading-relaxed tracking-tight">
              <p>
                <span className="text-[#ff5a00] font-semibold">{l('sloganA')}</span> {l('sloganB')}
              </p>
              <p>
                {l('sloganC')} <span className="text-[#22c55e] font-semibold">{l('sloganD')}</span>
              </p>
            </div>
          </div>

          {/* 3 Icons Row */}
          <div className="grid grid-cols-3 gap-6 pt-2">
            {/* Seguridad */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="text-[#ff5a00]">
                <Shield className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-white">{l('secTitle')}</p>
                <p className="text-[11px] text-gray-400 font-medium">{l('secSub')}</p>
              </div>
            </div>

            {/* Tecnología */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="text-[#ff5a00]">
                <Cpu className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-white">{l('tecnoTitle')}</p>
                <p className="text-[11px] text-gray-400 font-medium">{l('tecnoSub')}</p>
              </div>
            </div>

            {/* Innovación */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="text-[#ff5a00]">
                <Leaf className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-white">{l('innovTitle')}</p>
                <p className="text-[11px] text-gray-400 font-medium">{l('innovSub')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Centered Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[440px] bg-[#121620]/92 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 my-auto"
        >
          {/* Card Logo & Title */}
          <div className="text-center space-y-3 mb-7">
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
                {l('welcome')}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {l('subtitle')}
              </p>
            </div>
          </div>

          {/* Alert Error Notification */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          {step === 'otp' ? (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              {/* OTP Header */}
              <div className="space-y-1 mb-2">
                <h2 className="text-lg font-display font-bold text-white">
                  {l('otpTitle')}
                </h2>
                <p className="text-xs text-gray-400">
                  {l('otpDesc')}: <span className="text-[#ff5a00] font-semibold">{otpEmail}</span>
                </p>
              </div>

              {/* Code Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  {l('otpLabel')}
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={l('otpPh')}
                    className="w-full bg-[#090b10]/90 border border-white/15 focus:border-[#ff5a00] rounded-xl text-white text-sm sm:text-base pl-10 pr-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all tracking-[0.35em] font-bold"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Turnstile onToken={setTurnstileToken} />
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full mt-2 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? l('otpSending') : l('otpVerify')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Back & Resend */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setError(null); setOtp(''); }}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  ← {l('otpBack')}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-semibold text-[#ff5a00] hover:underline"
                >
                  {l('otpResend')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                {l('passLabel')}
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={l('passPh')}
                  className="w-full bg-[#090b10]/90 border border-white/15 focus:border-[#ff5a00] rounded-xl text-white text-xs sm:text-sm pl-10 pr-10 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-white transition-colors focus:outline-none"
                  aria-label={l('pwVisibility')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-[#090b10] text-[#ff5a00] focus:ring-[#ff5a00] accent-[#ff5a00] cursor-pointer"
                />
                <span>{l('remember')}</span>
              </label>
              <Link
                href="/recuperar"
                className="text-xs font-semibold text-[#ff5a00] hover:underline"
              >
                {l('forgot')}
              </Link>
            </div>

            {/* Submit Button */}
            <Turnstile onToken={setTurnstileToken} />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? l('verifying') : l('login')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-gray-400 pt-2">
              <Link href="/registro" className="text-[#ff5a00] font-semibold hover:underline">
                {l('createAccount')}
              </Link>
            </p>
          </form>
          )}

        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 px-6 text-center text-xs text-gray-400/90">
        <p>{l('rights')}</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
