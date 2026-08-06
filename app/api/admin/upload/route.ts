import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadImageToR2, isR2Configured } from '@/lib/r2';

const ALLOWED_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif', 'avif'];
const ALLOWED_FOLDERS = ['productos', 'banners', 'generales'];

function detectImageType(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return 'png';
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpeg';
  // GIF: "GIF87a" o "GIF89a"
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return 'gif';
  // WebP: "RIFF" ... "WEBP"
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return 'webp';
  // AVIF: ftyp avif (bytes 4-8 "ftyp", bytes 8-12 "avif")
  if (
    buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70 &&
    buffer[8] === 0x61 && buffer[9] === 0x76 && buffer[10] === 0x69 && buffer[11] === 0x66
  ) return 'avif';
  return null;
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

  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo no enviado' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: `Extensión no permitida (.${ext}). Usa webp, png, jpg, jpeg, gif o avif.` },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'El archivo supera los 5 MB.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Validación por contenido (magic bytes), no confiar en el MIME declarado.
  const detected = detectImageType(buffer);
  if (!detected) {
    return NextResponse.json(
      { error: 'El contenido del archivo no es una imagen válida.' },
      { status: 400 }
    );
  }

  const folder = String(formData.get('folder') || 'productos').trim();
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json(
      { error: 'Carpeta no permitida. Usa: productos, banners o generales.' },
      { status: 400 }
    );
  }

  try {
    const url = await uploadImageToR2(buffer, file.name, folder);
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Error subiendo a R2:', err);
    return NextResponse.json({ error: 'Error subiendo a R2' }, { status: 500 });
  }
}
