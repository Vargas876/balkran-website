import BannerForm from '@/components/admin/BannerForm';

export default function NuevoBannerPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Nuevo banner</h1>
      <p className="text-white/50 text-sm mb-8">Se mostrará en el carrusel de la portada.</p>
      <BannerForm />
    </div>
  );
}
