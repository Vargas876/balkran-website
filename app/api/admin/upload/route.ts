import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadImageToR2, isR2Configured } from '@/lib/r2';

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

  const allowed = ['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/avif'];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: `Formato no permitido (${file.type}). Usa webp, png, jpg, gif o avif.` },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'El archivo supera los 5 MB.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const folder = (formData.get('folder') as string) || 'productos';

  try {
    const url = await uploadImageToR2(buffer, file.name, folder);
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Error subiendo a R2:', err);
    return NextResponse.json({ error: 'Error subiendo a R2' }, { status: 500 });
  }
}
