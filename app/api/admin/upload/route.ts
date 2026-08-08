import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { writeFile, readFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { auth } from '@/auth';
import { uploadToR2, isR2Configured } from '@/lib/r2';

const execFileAsync = promisify(execFile);

const ALLOWED_FOLDERS = ['productos', 'banners', 'generales', 'videos'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const IMAGE_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif', 'avif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v'];

function detectImageType(buffer: Buffer): 'png' | 'jpeg' | 'gif' | 'webp' | 'avif' | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return 'png';
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpeg';
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return 'gif';
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return 'webp';
  if (
    buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70 &&
    buffer[8] === 0x61 && buffer[9] === 0x76 && buffer[10] === 0x69 && buffer[11] === 0x66
  ) return 'avif';
  return null;
}

async function compressVideo(inputBuffer: Buffer): Promise<{ buffer: Buffer; contentType: string }> {
  const ffmpegPath = process.env.FFMPEG_PATH ?? require('ffmpeg-static');
  const tmpBase = join(tmpdir(), `balkran-video-${randomBytes(8).toString('hex')}`);
  const inputPath = `${tmpBase}.in.mp4`;
  const outputPath = `${tmpBase}.out.mp4`;

  await writeFile(inputPath, inputBuffer);

  try {
    await execFileAsync(
      ffmpegPath,
      [
        '-y',
        '-i', inputPath,
        '-vf', 'scale=1920:1920:force_original_aspect_ratio=decrease,pad=1920:1920:(ow-iw)/2:(oh-ih)/2',
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-crf', '28',
        '-maxrate', '4M',
        '-bufsize', '8M',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ac', '2',
        outputPath,
      ],
      { timeout: 120000, maxBuffer: 1024 * 1024 * 1024 }
    );
    const output = await readFile(outputPath);
    return { buffer: output, contentType: 'video/mp4' };
  } finally {
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const role = (session.user as { role?: string }).role;
  if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role ?? '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: 'R2 no está configurado en el servidor. Agrega las variables R2_*.' },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err) {
    return NextResponse.json(
      { error: 'El archivo excede el tamaño máximo permitido por el servidor (límite 4.5 MB).' },
      { status: 413 }
    );
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo no enviado' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (![...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(ext)) {
    return NextResponse.json(
      { error: `Extensión no permitida (.${ext}). Usa webp, png, jpg, jpeg, gif, avif, mp4, webm, m4v o mov.` },
      { status: 400 }
    );
  }

  const folder = String(formData.get('folder') || 'productos').trim();
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json(
      { error: 'Carpeta no permitida. Usa: productos, banners, generales o videos.' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // ===== IMAGEN → WebP optimizado =====
    if (IMAGE_EXTENSIONS.includes(ext)) {
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: 'La imagen supera los 10 MB.' }, { status: 400 });
      }

      const detected = detectImageType(buffer);
      if (!detected) {
        return NextResponse.json(
          { error: 'El contenido del archivo no es una imagen válida.' },
          { status: 400 }
        );
      }

      let output: Buffer;
      let contentType: string;

      if (detected === 'gif') {
        output = buffer;
        contentType = 'image/gif';
      } else {
        output = await sharp(buffer)
          .rotate()
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();
        contentType = 'image/webp';
      }

      const url = await uploadToR2(output, file.name, folder, 'webp', contentType);
      return NextResponse.json({
        url,
        optimized: true,
        originalSize: file.size,
        optimizedSize: output.length,
      });
    }

    // ===== VIDEO → MP4 H.264 comprimido =====
    if (VIDEO_EXTENSIONS.includes(ext)) {
      if (file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json({ error: 'El video supera los 100 MB.' }, { status: 400 });
      }

      // Intenta comprimir con ffmpeg; si falla (p. ej. en entornos serverless
      // sin ffmpeg disponible o por límite de tiempo), sube el original tal cual.
      try {
        const { buffer: output, contentType } = await compressVideo(buffer);
        const url = await uploadToR2(output, file.name, folder, 'mp4', contentType);
        return NextResponse.json({
          url,
          optimized: true,
          originalSize: file.size,
          optimizedSize: output.length,
        });
      } catch (ffmpegErr) {
        console.error('ffmpeg no disponible o falló, subiendo video original:', (ffmpegErr as Error).message);
        const safeVideoExt = /\.(mp4|webm|mov|m4v)$/i.test(file.name) ? 'mp4' : 'mp4';
        const url = await uploadToR2(
          buffer,
          file.name,
          folder,
          'mp4',
          ext === 'mov' || ext === 'm4v' ? 'video/mp4' : `video/${ext}`
        );
        return NextResponse.json({
          url,
          optimized: false,
          originalSize: file.size,
          optimizedSize: buffer.length,
        });
      }
    }

    return NextResponse.json({ error: 'Tipo de archivo no soportado' }, { status: 400 });
  } catch (err) {
    console.error('Error procesando/subiendo archivo a R2:', err);
    return NextResponse.json({ error: 'Error procesando el archivo.' }, { status: 500 });
  }
}