'use client';

import { useState, useRef, useEffect } from 'react';
import { Zap, X, Send, Loader2, Bot } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Record<string, string> = {
  es: '¡Hola! Soy **Volt**, el asistente virtual de Balkran. Te ayudo con información de energizadores, cercas eléctricas, precios, garantías y más. ¿En qué te puedo ayudar?',
  en: 'Hello! I am **Volt**, the Balkran virtual assistant. I can help you with energizers, electric fences, prices, warranties and more. How can I help you?',
  fr: 'Bonjour ! Je suis **Volt**, l\'assistant virtuel de Balkran. Je peux vous aider avec les électrificateurs, clôtures électriques, prix, garanties et plus. Comment puis-je vous aider ?',
};

const SUGGESTIONS: Record<string, string[]> = {
  es: [
    '¿Cuántos kilómetros de cerca puedo electrificar?',
    '¿Cuál energizador me recomiendas para 50 km?',
    '¿Tienen garantía?',
    '¿Cuánto cuesta el B9000D?',
  ],
  en: [
    'How many kilometers of fence can I energize?',
    'Which energizer do you recommend for 50 km?',
    'Do you offer a warranty?',
    'How much does the B9000D cost?',
  ],
  fr: [
    'Combien de kilomètres de clôture puis-je électrifier ?',
    'Quel électrificateur recommandez-vous pour 50 km ?',
    'Offrez-vous une garantie ?',
    'Combien coûte le B9000D ?',
  ],
};

const PLACEHOLDER: Record<string, string> = {
  es: 'Escribe tu mensaje…',
  en: 'Type your message…',
  fr: 'Écrivez votre message…',
};

const SUBTITLE: Record<string, string> = {
  es: 'Asistente virtual Balkran',
  en: 'Balkran virtual assistant',
  fr: 'Assistant virtuel Balkran',
};

let sessionIdCache: string | null = null;

function getSessionId(): string {
  if (sessionIdCache) return sessionIdCache;
  if (typeof window !== 'undefined') {
    let id = window.sessionStorage.getItem('volt-session-id');
    if (!id) {
      id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem('volt-session-id', id);
    }
    sessionIdCache = id;
    return id;
  }
  return 'anon';
}

export default function VoltChatWidget() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const langKey = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (messages.length === 0) {
        setMessages([
          {
            role: 'assistant',
            content: WELCOME[langKey],
          },
        ]);
      }
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || typing) return;

    setMessages((prev) => [...prev, { role: 'user', content }]);
    setInput('');
    setTyping(true);
    setError(null);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId: getSessionId(), lang: langKey }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? 'No pude responder en este momento.');
        setTyping(false);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setTyping(false);
    }
  }

  function formatContent(text: string) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat Volt'}
        className="fixed bottom-6 left-6 z-[90] group"
      >
        {open ? (
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#111] border border-white/20 text-white hover:bg-black shadow-xl transition-all">
            <X className="w-6 h-6" />
          </span>
        ) : (
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#ff5a00] text-white shadow-lg shadow-[#ff5a00]/30 hover:bg-[#e55200] hover:scale-105 transition-all">
            <Zap className="w-6 h-6 fill-current" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </span>
        )}
      </button>

      {/* Widget */}
      {open && (
        <div className="fixed bottom-24 left-6 z-[90] w-[calc(100vw-3rem)] max-w-[380px] h-[70vh] max-h-[560px] bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ff5a00] to-[#ff7a1a]">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-white text-sm leading-none">Volt</p>
              <p className="text-white/80 text-[11px] mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> {SUBTITLE[langKey]}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#0d1117]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#ff5a00] text-white rounded-br-sm'
                      : 'bg-white/8 border border-white/10 text-gray-100 rounded-bl-sm'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatContent(m.content) }}
                />
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:120ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Sugerencias */}
            {messages.length <= 1 && !typing && (
              <div className="space-y-2 pt-1">
                {SUGGESTIONS[langKey].map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-[12px] text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff5a00]/50 rounded-xl px-3 py-2.5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 bg-[#0d1117]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={PLACEHOLDER[langKey]}
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff5a00] text-white placeholder-white/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full bg-[#ff5a00] hover:bg-[#e55200] disabled:opacity-40 flex items-center justify-center text-white transition-colors"
                aria-label="Enviar"
              >
                {typing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
