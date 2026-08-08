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

const accountId = process.env.R2_ACCOUNT_ID || loadEnvValue('R2_ACCOUNT_ID') || 'c8d97427122096c5e20d23a8181a35dd';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || loadEnvValue('R2_ACCESS_KEY_ID') || '3c33ce731cfc618e7cbc61d4d63abf5f';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || loadEnvValue('R2_SECRET_ACCESS_KEY') || '1004891a2988abf71480b106361dc5f98df14d6078e7bef3db768f50a40e4738';
export const r2Bucket = process.env.R2_BUCKET || loadEnvValue('R2_BUCKET') || 'balkran';
export const r2PublicUrl = process.env.R2_PUBLIC_URL || loadEnvValue('R2_PUBLIC_URL') || 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev';

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
  const safeExt = /^(webp|png|jpe?g|gif|avif|mp4)$/.test(ext) ? ext : 'webp';
  const base = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const key = `${folder}/${base}-${Date.now()}.${safeExt}`;

  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      Body: buffer,
      ContentType: ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'mp4' ? 'video/mp4' : 'application/octet-stream',
    })
  );

  return publicImageUrl(key);
}

export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  folder = 'productos',
  forcedExt = 'webp',
  contentType = 'application/octet-stream'
): Promise<string> {
  const safeExt = /^(webp|png|jpe?g|gif|avif|mp4)$/.test(forcedExt) ? forcedExt : 'webp';
  const base = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const key = `${folder}/${base}-${Date.now()}.${safeExt}`;

  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
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
