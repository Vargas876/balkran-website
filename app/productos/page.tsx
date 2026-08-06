import { getAllProducts } from '@/lib/products';
import ProductosListClient from '@/components/ProductosListClient';

export const revalidate = 3600;

export default async function ProductosPage() {
  const allProducts = await getAllProducts();
  return <ProductosListClient initialProducts={allProducts} />;
}
