import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

const knowledgeSchema = z.object({
  company: z.string().min(1).max(20000),
  faqs: z.array(z.object({ q: z.string().min(1).max(500), a: z.string().min(1).max(2000) })).max(50),
});

function canWrite(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'EDITOR';
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user || !canWrite(session.user.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = knowledgeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const faqsJson = JSON.stringify(parsed.data.faqs);

  await prisma.$transaction([
    prisma.siteConfig.upsert({
      where: { key: 'volt_company' },
      create: { key: 'volt_company', value: parsed.data.company },
      update: { value: parsed.data.company },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'volt_faqs' },
      create: { key: 'volt_faqs', value: faqsJson },
      update: { value: faqsJson },
    }),
  ]);

  return NextResponse.json({ success: true });
}
