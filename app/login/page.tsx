'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Cpu, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0d14] font-sans flex flex-col justify-between overflow-x-hidden selection:bg-[#ff5a00] selection:text-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/login-bg.png"
          alt="Balkran Login Background"
          fill
          priority
          className="object-cover object-right lg:object-center"
        />
        {/* Subtle contrast overlay for mobile screens */}
        <div className="absolute inset-0 bg-black/20 lg:bg-transparent pointer-events-none" />
      </div>

      {/* Top Navbar / Back Link */}
      <header className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-2 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative w-36 sm:w-44 h-10 transition-transform group-hover:scale-105">
            <Image
              src="/assets/images/LogoBlanco.webp"
              alt="BALKRAN"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#ff5a00] bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all flex items-center gap-1.5"
        >
          <span>← Volver al inicio</span>
        </Link>
      </header>

      {/* Main Content: Left Branding + Center Card */}
      <main className="relative z-10 flex-1 max-w-[1500px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
        
        {/* Left Column (Brand info on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-between max-w-lg space-y-10 text-white"
        >
          {/* Logo & Headline */}
          <div className="space-y-4 pt-4">
            <div className="relative w-56 h-14">
              <Image
                src="/assets/images/LogoBlanco.webp"
                alt="BALKRAN Tecnología e Innovación"
                fill
                className="object-contain object-left"
              />
            </div>
            
            <div className="pt-4 space-y-1">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Energía que protege,
              </h1>
              <h1 className="text-3xl font-extrabold text-[#ff5a00] tracking-tight">
                tecnología que conecta.
              </h1>
            </div>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5a00]/15 border border-[#ff5a00]/30 flex items-center justify-center text-[#ff5a00]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">SEGURIDAD</p>
                <p className="text-xs text-gray-400">Confiable</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5a00]/15 border border-[#ff5a00]/30 flex items-center justify-center text-[#ff5a00]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">TECNOLOGÍA</p>
                <p className="text-xs text-gray-400">Avanzada</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5a00]/15 border border-[#ff5a00]/30 flex items-center justify-center text-[#ff5a00]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">INNOVACIÓN</p>
                <p className="text-xs text-gray-400">Sostenible</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center / Right Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[440px] bg-[#121620]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80"
        >
          {/* Card Logo & Title */}
          <div className="text-center space-y-3 mb-7">
            <div className="relative w-44 h-11 mx-auto">
              <Image
                src="/assets/images/LogoBlanco.webp"
                alt="BALKRAN"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Bienvenido de nuevo
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inicia sesión para continuar
              </p>
            </div>
          </div>

          {/* Alert Success Notification */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium text-center"
            >
              ✓ Solicitud enviada correctamente. Verificando credenciales...
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full bg-[#090b10]/90 border border-white/15 focus:border-[#ff5a00] rounded-xl text-white text-xs sm:text-sm pl-10 pr-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-[#090b10]/90 border border-white/15 focus:border-[#ff5a00] rounded-xl text-white text-xs sm:text-sm pl-10 pr-10 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-white transition-colors focus:outline-none"
                  aria-label="Toggle password visibility"
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
                <span>Recordarme</span>
              </label>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Instrucciones de recuperación enviadas.'); }}
                className="text-xs font-semibold text-[#ff5a00] hover:underline"
              >
                ¿Olvidaste tu clave?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-[0.99] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 hover:shadow-[#ff5a00]/50 transition-all flex items-center justify-center gap-2"
            >
              <span>INICIAR SESIÓN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#121620] px-3 text-[11px] uppercase tracking-wider text-gray-400 whitespace-nowrap">
              o continúa con
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => alert('Iniciar sesión con Google')}
              className="bg-[#090b10]/90 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            {/* Microsoft Button */}
            <button
              type="button"
              onClick={() => alert('Iniciar sesión con Microsoft')}
              className="bg-[#090b10]/90 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f25022" d="M1 1h10v10H1z" />
                <path fill="#7fba00" d="M12 1h10v10H12z" />
                <path fill="#00a4ef" d="M1 12h10v10H1z" />
                <path fill="#ffb900" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 px-6 text-center text-xs text-gray-400/90">
        <p>© 2024 BALKRAN. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
