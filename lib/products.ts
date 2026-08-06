import { prisma } from '@/lib/prisma';
import type { Product as PrismaProduct } from '@/lib/generated/prisma/client';
import type { Product } from '@/lib/types';

export type { Product } from '@/lib/types';

type Categoria = 'Energizadores' | 'Kits Solares' | 'Accesorios';

const CATEGORIA_MAP: Record<string, Categoria> = {
  ENERGIZADORES: 'Energizadores',
  KITS_SOLARES: 'Kits Solares',
  ACCESORIOS: 'Accesorios',
};

function toProduct(p: PrismaProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    nombre: p.nombre,
    linea: p.linea,
    categoria: CATEGORIA_MAP[p.categoria] ?? 'Energizadores',
    precio: p.precio,
    precioNumerico: p.precioNumerico,
    imagen_local: p.imagen_local,
    subtitulo: p.subtitulo ?? undefined,
    alcance: p.alcance ?? undefined,
    joules: p.joules ?? undefined,
    voltaje: p.voltaje ?? undefined,
    descripcion: p.descripcion ?? undefined,
    ideal_para: p.ideal_para ?? undefined,
    alimentacion: p.alimentacion ?? undefined,
    consumo: p.consumo ?? undefined,
    cobertura: p.cobertura ?? undefined,
    energia_salida: p.energia_salida ?? undefined,
    voltaje_salida: p.voltaje_salida ?? undefined,
    pulsos_minuto: p.pulsos_minuto ?? undefined,
    varillas_tierra: p.varillas_tierra ?? undefined,
    autonomia: p.autonomia ?? undefined,
    peso: p.peso ?? undefined,
    dimensiones: p.dimensiones ?? undefined,
    material: p.material ?? undefined,
    color: p.color ?? undefined,
    presentacion: p.presentacion ?? undefined,
    capacidad: p.capacidad ?? undefined,
    longitud: p.longitud ?? undefined,
    url: p.url ?? undefined,
    video: p.video ?? undefined,
    esMasVendido: p.esMasVendido,
    esPopular: p.esPopular,
    esNuevo: p.esNuevo,
    rating: p.rating,
    valoraciones: p.valoraciones,
    caracteristicas: p.caracteristicas,
    recomendado_para: p.recomendado_para,
    imagenes: p.imagenes,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return products.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({
    where: { slug: slug.toLowerCase() },
  });
  return p ? toProduct(p) : null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
  });
  if (!category || category === 'TODOS') return products.map(toProduct);
  return products.filter(
    (p) => CATEGORIA_MAP[p.categoria]?.toLowerCase() === category.toLowerCase()
  ).map(toProduct);
}

export async function getCategoryCounts() {
  const products = await prisma.product.findMany({
    select: { categoria: true },
  });
  const counts = {
    Energizadores: 0,
    'Kits Solares': 0,
    Accesorios: 0,
  };
  products.forEach((p) => {
    const c = CATEGORIA_MAP[p.categoria] as Categoria;
    if (c in counts) counts[c]++;
  });
  return counts;
}
