import { readFileSync, existsSync } from 'node:fs';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const RESEND_API_KEY = loadEnvValue('RESEND_API_KEY');
const EMAIL_FROM = loadEnvValue('EMAIL_FROM') ?? 'Balkran <no-reply@balkran.com>';
const APP_BASE_URL = loadEnvValue('AUTH_URL') ?? loadEnvValue('NEXTAUTH_URL') ?? 'http://localhost:3000';

export function isEmailConfigured(): boolean {
  return !!RESEND_API_KEY;
}

export function getBaseUrl(): string {
  return APP_BASE_URL.replace(/\/$/, '');
}

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY no configurada. No se envió el correo de recuperación.');
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [to],
      subject: 'Recuperación de contraseña - Balkran',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f6f7f9;border-radius:12px">
          <h2 style="color:#ff5a00;margin:0 0 12px">Recupera tu contraseña</h2>
          <p style="color:#333;font-size:15px;line-height:1.5">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Balkran</strong>.
          </p>
          <p style="color:#333;font-size:15px;line-height:1.5">
            Haz clic en el botón para elegir una nueva contraseña. El enlace es válido por <strong>30 minutos</strong>.
          </p>
          <p style="text-align:center;margin:28px 0">
            <a href="${resetUrl}" style="background:#ff5a00;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:bold;display:inline-block">
              Restablecer contraseña
            </a>
          </p>
          <p style="color:#777;font-size:12px;line-height:1.5">
            Si no solicitaste este cambio, ignora este correo. Si el botón no funciona, copia y pega esta URL en tu navegador:
          </p>
          <p style="color:#555;font-size:12px;word-break:break-all">${resetUrl}</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Error enviando email con Resend:', res.status, text);
  }
}
