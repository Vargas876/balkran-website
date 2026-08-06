import { getAllProducts } from '@/lib/products';
import ProductosListClient from '@/components/ProductosListClient';
import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Catálogo de Energizadores y Cercas Eléctricas',
  description:
    'Explora el catálogo de energizadores, kits solares y accesorios para cercas eléctricas Balkran. Encuentra el energizador ideal para tu finca o proyecto.',
  alternates: { canonical: '/productos' },
  openGraph: {
    title: 'Catálogo de Energizadores y Cercas Eléctricas | Balkran',
    description: 'Energizadores, kits solares y accesorios para cercas eléctricas. Encuentra el ideal para tu proyecto.',
    url: `${getSiteUrl()}/productos`,
    type: 'website',
    locale: 'es_CO',
    siteName: 'Balkran',
  },
};

export default async function ProductosPage() {
  const allProducts = await getAllProducts();
  return <ProductosListClient initialProducts={allProducts} />;
}
