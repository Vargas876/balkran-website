import { readFileSync, existsSync } from 'node:fs';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const accountId = loadEnvValue('R2_ACCOUNT_ID');
const accessKeyId = loadEnvValue('R2_ACCESS_KEY_ID');
const secretAccessKey = loadEnvValue('R2_SECRET_ACCESS_KEY');
export const r2Bucket = loadEnvValue('R2_BUCKET') ?? 'balkran-images';
export const r2PublicUrl = loadEnvValue('R2_PUBLIC_URL'); // ej: https://pub-xxxx.r2.dev

export function isR2Configured(): boolean {
  return !!(accountId && accessKeyId && secretAccessKey);
}

export function getS3Client() {
  if (!isR2Configured()) {
    throw new Error('R2 no está configurado. Revisa R2_ACCOUNT_ID, R2_ACCESS_KEY_ID y R2_SECRET_ACCESS_KEY en .env');
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
  });
}

export function publicImageUrl(key: string): string {
  if (r2PublicUrl) return `${r2PublicUrl}/${key}`;
  return `/assets/images/${key}`;
}

export async function uploadImageToR2(buffer: Buffer, filename: string, folder = 'productos'): Promise<string> {
  const ext = filename.split('.').pop()?.toLowerCase() || 'webp';
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : 'webp';
  const base = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const key = `${folder}/${base}-${Date.now()}.${safeExt}`;

  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      Body: buffer,
      ContentType: ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'application/octet-stream',
    })
  );

  return publicImageUrl(key);
}

export async function deleteImageFromR2(url: string): Promise<void> {
  if (!url || !url.includes('r2.dev')) return;
  const path = new URL(url).pathname.replace(/^\//, '');
  const client = getS3Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: r2Bucket,
      Key: path,
    })
  );
}
