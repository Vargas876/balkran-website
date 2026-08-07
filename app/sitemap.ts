import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { getSiteUrl } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/productos`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/manuales`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/preguntas-frecuentes`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/eventos`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/certificaciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/pqrs`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/garantias-y-devoluciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/terminos-y-condiciones-tienda`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/politica-datos-personales`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((p) => ({
      url: `${base}/productos/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.error('Error generando sitemap de productos:', e);
  }

  return [...staticRoutes, ...productRoutes];
}
