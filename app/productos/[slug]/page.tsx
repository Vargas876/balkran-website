import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';

export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const url = `${getSiteUrl()}/productos/${product.slug}`;
  const title = `${product.nombre} (${product.linea}) – Cercas Eléctricas | Balkran`;
  const description = `Conoce las especificaciones técnicas, precio y beneficios de ${product.nombre} (${product.linea}). Alcance: ${product.alcance || 'Hasta 40 km'}. Garantía oficial Balkran.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'es_CO',
      siteName: 'Balkran',
      images: product.imagen_local
        ? [{ url: product.imagen_local, alt: product.nombre }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.imagen_local ? [product.imagen_local] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products in the same category or line, excluding current product
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.slug.toLowerCase() !== product.slug.toLowerCase() && p.categoria === product.categoria
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion || product.subtitulo || `Energizador de cercas eléctricas ${product.nombre}`,
    image: product.imagen_local ? [product.imagen_local] : undefined,
    brand: { '@type': 'Brand', name: 'Balkran' },
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      price: product.precioNumerico > 0 ? String(product.precioNumerico) : undefined,
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
      url: `${getSiteUrl()}/productos/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts.length > 0 ? relatedProducts : allProducts.filter((p) => p.slug.toLowerCase() !== product.slug.toLowerCase())}
        allProducts={allProducts}
      />
    </>
  );
}
