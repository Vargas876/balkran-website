import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
const r2Bucket = loadEnvValue('R2_BUCKET') ?? 'balkran';
const r2PublicUrl = loadEnvValue('R2_PUBLIC_URL') ?? '';

if (!accountId || !accessKeyId || !secretAccessKey || !r2PublicUrl) {
  console.error('Faltan credenciales/URL de R2 en .env');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const SRC = 'public/assets';
const RASTER = /\.(png|jpe?g|gif)$/i;
const K_TO_MIME: Record<string, string> = {
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

async function main() {
  const files = walk(SRC);
  const map: Record<string, string> = {};
  let subidas = 0;
  let fallidas = 0;

  for (const file of files) {
    // objetoKey: ej "assets/images/foo.png"
    const objectKey = file.replace(/\\/g, '/').replace(/^public\//, '');
    const localRef = `/assets/${objectKey.substring('assets/'.length)}`;
    try {
      const buffer = readFileSync(file);
      const lower = objectKey.toLowerCase();
      const isRaster = RASTER.test(lower);

      let object = objectKey;
      let contentType = 'application/octet-stream';

      if (isRaster) {
        const webpBuffer = await sharp(buffer).webp({ quality: 82 }).toBuffer();
        object = objectKey.replace(RASTER, '.webp');
        contentType = 'image/webp';
        await client.send(new PutObjectCommand({ Bucket: r2Bucket, Key: object, Body: webpBuffer, ContentType: contentType }));
      } else {
        const e = extname(lower).replace('.', '');
        if (!K_TO_MIME[e]) continue;
        contentType = K_TO_MIME[e];
        await client.send(new PutObjectCommand({ Bucket: r2Bucket, Key: object, Body: buffer, ContentType: contentType }));
      }

      const url = `${r2PublicUrl}/${object}`;
      map[localRef] = url;
      subidas++;
      console.log(`OK ${object}`);
    } catch (e: any) {
      fallidas++;
      console.error(`FALLO ${file}: ${e.message}`);
    }
  }

  writeFileSync('r2-mapping.json', JSON.stringify(map, null, 2), 'utf8');
  console.log(`\nResumen: ${subidas} subidas, ${fallidas} fallidas`);
  await client.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });