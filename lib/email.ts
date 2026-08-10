import { readFileSync, existsSync } from 'node:fs';
import nodemailer, { Transporter } from 'nodemailer';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const RESEND_API_KEY = loadEnvValue('RESEND_API_KEY');
const EMAIL_FROM =
  loadEnvValue('EMAIL_FROM') ?? 'Balkran <no-reply@cercasbalkran.com>';
const APP_BASE_URL =
  loadEnvValue('AUTH_URL') ||
  loadEnvValue('NEXTAUTH_URL') ||
  loadEnvValue('NEXT_PUBLIC_SITE_URL') ||
  'http://localhost:3000';

// SMTP del hosting (si se configura, sustituye a Resend)
const SMTP_HOST = loadEnvValue('SMTP_HOST');
const SMTP_PORT = parseInt(loadEnvValue('SMTP_PORT') || '465', 10);
const SMTP_SECURE = loadEnvValue('SMTP_SECURE') !== 'false';
const SMTP_USER = loadEnvValue('SMTP_USER');
const SMTP_PASS = loadEnvValue('SMTP_PASS');

export function isEmailConfigured(): boolean {
  return !!SMTP_HOST || !!RESEND_API_KEY;
}

export function getBaseUrl(): string {
  return APP_BASE_URL.replace(/\/$/, '');
}

let smtpTransport: Transporter | null = null;

function getSmtpTransport(): Transporter | null {
  if (!SMTP_HOST) return null;
  if (!smtpTransport) {
    smtpTransport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      tls: { rejectUnauthorized: false },
    });
  }
  return smtpTransport;
}

interface EmailMessage {
  to: string;
  subject: string;
  html: string;
}

/** Envía el correo por SMTP del hosting si está configurado; si no, por Resend. */
async function sendEmail(msg: EmailMessage): Promise<void> {
  const smtp = getSmtpTransport();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: EMAIL_FROM,
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
      });
      if (!info.accepted?.length && !info.messageId) {
        console.error('SMTP no aceptó el correo.', info);
      }
      return;
    } catch (err) {
      console.error('Error enviando email por SMTP:', err);
      // Si falla SMTP, intenta Resend como respaldo si existe clave.
      if (!RESEND_API_KEY) return;
    }
  }

  if (!RESEND_API_KEY) {
    console.error(
      'Correo no enviado: SMTP_HOST y RESEND_API_KEY no configurados.'
    );
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [msg.to],
        subject: msg.subject,
        html: msg.html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error enviando email con Resend:', res.status, text);
    }
  } catch (err) {
    console.error('Error enviando email con Resend:', err);
  }
}

/** Envía el código OTP para iniciar sesión (2FA). */
export async function sendOtpEmail(to: string, code: string): Promise<void> {
  return sendEmail({
    to,
    subject: 'Tu código de verificación - Balkran',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f6f7f9;border-radius:12px">
        <h2 style="color:#ff5a00;margin:0 0 12px">Tu código de verificación</h2>
        <p style="color:#333;font-size:15px;line-height:1.5">
          Estás iniciando sesión en <strong>Balkran</strong>. Usa este código para completar la verificación:
        </p>
        <div style="text-align:center;margin:24px 0">
          <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#1a2130;background:#fff;border:1px solid #eee;border-radius:12px;padding:16px 28px;display:inline-block">${code}</span>
        </div>
        <p style="color:#777;font-size:13px;line-height:1.5">
          El código es válido por <strong>10 minutos</strong>. Si no intentaste iniciar sesión, ignora este correo.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<void> {
  return sendEmail({
    to,
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
  });
}

interface InquiryPayload {
  name: string;
  email: string;
  phone?: string | null;
  tipo?: string | null;
  message: string;
  id: string;
}

/** Notifica a Balkran cuando llega una consulta/PQR desde el formulario público. */
export async function sendInquiryNotification(
  inquiry: InquiryPayload
): Promise<void> {
  const to =
    loadEnvValue('NOTIF_EMAIL') ||
    loadEnvValue('ADMIN_EMAIL') ||
    'ventas@cercasbalkran.com';
  const tipo = inquiry.tipo || 'Consulta general';

  return sendEmail({
    to,
    subject: `Nueva PQR ${tipo} - Balkran (${inquiry.name})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f6f7f9;border-radius:12px">
        <h2 style="color:#ff5a00;margin:0 0 4px">Nueva consulta PQR recibida</h2>
        <p style="color:#777;font-size:12px;margin:0 0 20px">ID: ${inquiry.id}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
          <tr><td style="padding:6px 0;width:110px;font-weight:bold;color:#666">Tipo</td><td style="padding:6px 0">${tipo}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;color:#666">Nombre</td><td style="padding:6px 0">${inquiry.name}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;color:#666">Teléfono</td><td style="padding:6px 0">${inquiry.phone || '—'}</td></tr>
        </table>
        <div style="margin-top:16px;background:#fff;border:1px solid #eee;border-radius:8px;padding:14px">
          <p style="margin:0 0 6px;font-weight:bold;color:#666;font-size:13px">Mensaje</p>
          <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${inquiry.message}</p>
        </div>
        <p style="color:#777;font-size:12px;margin-top:20px">Puedes gestionar el estado de esta consulta desde el panel de administración de Balkran.</p>
      </div>
    `,
  });
}