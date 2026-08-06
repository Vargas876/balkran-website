import { readFileSync, existsSync } from 'node:fs';
import { PrismaClient, ProductCategory, Role } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';
import productos from '../productos.json';

function loadDotEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const databaseUrl = loadDotEnvValue('DATABASE_URL');

const prisma = new (PrismaClient as any)({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const categoryMap: Record<string, ProductCategory> = {
  Energizadores: ProductCategory.ENERGIZADORES,
  'Kits Solares': ProductCategory.KITS_SOLARES,
  Accesorios: ProductCategory.ACCESORIOS,
};

const ADMIN_EMAIL: string | undefined = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD: string | undefined = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    'ERROR: ADMIN_EMAIL y ADMIN_PASSWORD son obligatorios para el seed. Defínelas en el entorno.'
  );
  process.exit(1);
}

async function main() {
  console.log('Seeding productos...');

  for (const p of productos as any[]) {
    const categoria = categoryMap[p.categoria] ?? ProductCategory.ACCESORIOS;

    await prisma.product.upsert({
      where: { slug: String(p.slug ?? '').toLowerCase() },
      update: {},
      create: {
        slug: String(p.slug ?? '').toLowerCase(),
        nombre: p.nombre ?? String(p.slug ?? '').toUpperCase(),
        linea: String(p.linea ?? 'ACCESORIOS Y OTROS')
          .replace(/^L[ÍI]?L[ÍI]?NEA/i, 'LÍNEA')
          .replace(/L[ÍI]NEA L[ÍI]NEA/g, 'LÍNEA'),
        categoria,
        precio: p.precio ?? 'Consultar',
        precioNumerico: p.precioNumerico ?? 0,
        imagen_local:
          p.imagen_local ?? '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
        imagen_url_original: p.imagen_url_original ?? null,
        subtitulo: p.subtitulo ?? null,
        alcance: p.alcance ?? null,
        joules: p.joules ?? null,
        voltaje: p.voltaje ?? null,
        descripcion: p.descripcion ?? null,
        ideal_para: p.ideal_para ?? null,
        alimentacion: p.alimentacion ?? null,
        consumo: p.consumo ?? null,
        cobertura: p.cobertura ?? null,
        energia_salida: p.energia_salida ?? null,
        voltaje_salida: p.voltaje_salida ?? null,
        pulsos_minuto: p.pulsos_minuto ?? null,
        varillas_tierra: p.varillas_tierra ?? null,
        autonomia: p.autonomia ?? null,
        peso: p.peso ?? null,
        dimensiones: p.dimensiones ?? null,
        material: p.material ?? null,
        color: p.color ?? null,
        presentacion: p.presentacion ?? null,
        capacidad: p.capacidad ?? null,
        longitud: p.longitud ?? null,
        esMasVendido: !!p.esMasVendido,
        esPopular: !!p.esPopular,
        esNuevo: !!p.esNuevo,
        rating: p.rating ?? 0,
        valoraciones: p.valoraciones ?? 0,
        url: p.url ?? null,
        caracteristicas: Array.isArray(p.caracteristicas) ? p.caracteristicas : [],
        recomendado_para: Array.isArray(p.recomendado_para) ? p.recomendado_para : [],
        imagenes: Array.isArray(p.imagenes) ? p.imagenes : [],
      },
    });
  }

  const total = await prisma.product.count();
  console.log(`Productos listos: ${total}`);

  const passwordHash = await hash(ADMIN_PASSWORD!, 12);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL! },
    update: {},
    create: {
      email: ADMIN_EMAIL!,
      name: 'Super Admin',
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`Usuario admin listo: ${ADMIN_EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
