import { getVoltConfig } from '@/lib/knowledge';
import KnowledgeForm from '@/components/admin/KnowledgeForm';

export const dynamic = 'force-dynamic';

export default async function KnowledgePage() {
  const { company, faqs } = await getVoltConfig();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Base de conocimiento de Volt</h1>
      <p className="text-white/50 text-sm mb-8">
        Información que Volt usa al responder. Los productos se toman del catálogo automáticamente.
      </p>
      <KnowledgeForm company={company} faqs={faqs} />
    </div>
  );
}
