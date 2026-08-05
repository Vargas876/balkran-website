import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado – Balkran',
    };
  }

  return {
    title: `${product.nombre} (${product.linea}) – Cercas Eléctricas | Balkran`,
    description: `Conoce las especificaciones técnicas, precio y beneficios de ${product.nombre} (${product.linea}). Alcance: ${product.alcance || 'Hasta 40 km'}. Garantía oficial Balkran.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products in the same category or line, excluding current product
  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.slug.toLowerCase() !== product.slug.toLowerCase() && p.categoria === product.categoria
  );

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts.length > 0 ? relatedProducts : allProducts.filter((p) => p.slug.toLowerCase() !== product.slug.toLowerCase())}
    />
  );
}
