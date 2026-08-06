import { prisma } from '@/lib/prisma';
import SiteConfigForm from '@/components/admin/SiteConfigForm';

export const dynamic = 'force-dynamic';

export default async function ConfiguracionPage() {
  const entries = await prisma.siteConfig.findMany();
  const config = Object.fromEntries(entries.map((e) => [e.key, e.value]));

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Configuración del sitio</h1>
      <p className="text-white/50 text-sm mb-8">
        Datos de contacto, redes sociales y horarios.
      </p>
      <SiteConfigForm config={config} />
    </div>
  );
}
