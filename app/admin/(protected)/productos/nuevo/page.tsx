import ProductForm from '@/components/admin/ProductForm';

export default function NuevoProductoPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Nuevo producto</h1>
      <p className="text-white/50 text-sm mb-8">
        Completa los datos del nuevo producto.
      </p>
      <ProductForm />
    </div>
  );
}
