import { prisma } from '@/lib/prisma';
import { getAllProducts } from '@/lib/products';

export interface KnowledgeContext {
  company: string;
  faqs: { q: string; a: string }[];
  products: { nombre: string; slug: string; precio: string; alcance: string; linea: string; categoria: string }[];
}

const DEFAULT_COMPANY = `
BALKRAN INC S.A.S. BIC es una empresa colombiana fundada en el año 2000, líder en fabricación de energizadores (impulsadores) para cercas eléctricas y accesorios complementarios para el sector agropecuario en Colombia y Latinoamérica.
- Certificaciones: ISO 9001 (Bureau Veritas CO23.06471), RETIE / IEC (Certecnica), 6 patentes registradas ante la SIC.
- Garantía: 2 años directa de fábrica en todos los energizadores y kits.
- Soporte: ingenieros y asesores especializados, atención por WhatsApp +57 311 450 8064.
- Emails oficiales: info@cercasbalkran.com, ventas@cercasbalkran.com, soporte@cercasbalkran.com.
- Envíos a toda Colombia. Compra segura.
- Líneas de producto: Energizadores (Línea 110V), Línea Dual (110V y 12V), Kits Solares (con panel monocristalino y regulador inteligente, autonomía 24h incluso en días nublados), y Accesorios (aisladores, cables, hilos electroplásticos, varillas copperweld, desviadores de rayos, etc.).
- Consumo energético muy bajo: menos de 10W-15W en red 110V.
- Alcance de productos: desde 15 km (pequeñas parcelas) hasta más de 350 km (grandes haciendas).
`;

const DEFAULT_FAQS = [
  { q: '¿cuántos kilómetros de cerca puedo electrificar?', a: 'Cada modelo tiene una capacidad nominal en kilómetros. Hay equipos desde 15 km de alcance para pequeñas parcelas hasta energizadores industriales de más de 350 km para grandes haciendas.' },
  { q: '¿funcionan con panel solar?', a: 'Sí. La línea de Kits Solares Balkran incluye paneles monocristalinos de alta eficiencia y reguladores inteligentes integrados, con autonomía continua de 24 horas incluso en días nublados.' },
  { q: '¿cuánto consumen de energía?', a: 'Menos de 10W a 15W en red eléctrica de 110V gracias a microcontroladores de consumo ultra eficiente. Consumo mensual mínimo.' },
  { q: '¿tienen garantía?', a: 'Sí, todos los energizadores y kits Balkran tienen 2 años de garantía directa de fábrica y certificación de calidad colombiana.' },
  { q: '¿cómo se instala?', a: 'La instalación es rápida y sencilla. Se incluye una guía ilustrada paso a paso y el equipo técnico asesora vía telefónica o WhatsApp.' },
  { q: '¿dan soporte técnico?', a: 'Sí, hay ingenieros y asesores especializados para guiarte en el diseño perimetral de tu finca y resolver dudas postventa por WhatsApp.' },
  { q: '¿hacen envíos?', a: 'Sí, envíos a toda Colombia con compra segura.' },
  { q: '¿qué es un energizador?', a: 'Es un equipo que genera pulsos eléctricos de alto voltaje de muy corta duración en la cerca, para contener el ganado sin causarle daño.' },
  { q: '¿cuál es el precio?', a: 'Los precios están publicados en la página de cada producto en la web. Puedes consultar el catálogo completo o hablar con un asesor por WhatsApp.' },
];

export async function getVoltConfig(): Promise<{ company: string; faqs: { q: string; a: string }[] }> {
  try {
    const [companyEntry, faqsEntry] = await prisma.siteConfig.findMany({
      where: { key: { in: ['volt_company', 'volt_faqs'] } },
    });
    const companyMap = Object.fromEntries(companyEntry ? [[companyEntry.key, companyEntry.value]] : []);
    const faqsMap = Object.fromEntries(faqsEntry ? [[faqsEntry.key, faqsEntry.value]] : []);

    const company = companyMap['volt_company'] ?? DEFAULT_COMPANY;
    let faqs = DEFAULT_FAQS;
    const raw = faqsMap['volt_faqs'];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          faqs = parsed
            .filter((f) => f && typeof f.q === 'string' && typeof f.a === 'string')
            .map((f) => ({ q: f.q, a: f.a }));
        }
      } catch {
        // FAQ inválido en BD: usar default
      }
    }
    return { company, faqs };
  } catch {
    return { company: DEFAULT_COMPANY, faqs: DEFAULT_FAQS };
  }
}

export async function buildKnowledge(): Promise<KnowledgeContext> {
  const products = await getAllProducts();
  const { company, faqs } = await getVoltConfig();

  return {
    company,
    faqs,
    products: products.map((p) => ({
      nombre: p.nombre,
      slug: p.slug,
      precio: p.precio,
      alcance: p.alcance || '',
      linea: p.linea,
      categoria: p.categoria,
    })),
  };
}

export async function getProductByName(query: string): Promise<{ nombre: string; slug: string; precio: string; alcance: string } | null> {
  const products = await getAllProducts();
  const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = norm(query);
  return (
    products
      .map((p) => ({ nombre: p.nombre, slug: p.slug, precio: p.precio, alcance: p.alcance || '' }))
      .find((p) => q.includes(norm(p.nombre)) || norm(p.nombre).includes(q)) || null
  );
}
