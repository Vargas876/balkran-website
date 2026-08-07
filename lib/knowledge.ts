import { prisma } from '@/lib/prisma';
import { getAllProducts } from '@/lib/products';

export interface KnowledgeContext {
  company: string;
  faqs: { q: string; a: string }[];
  products: { nombre: string; slug: string; precio: string; alcance: string; linea: string; categoria: string }[];
}

const DEFAULT_COMPANY = `
BALKRAN INC S.A.S. BIC es una empresa colombiana fundada en el año 2000, líder en fabricación de energizadores (impulsadores) para cercas eléctricas y accesorios complementarios para el sector agropecuario en Colombia y Latinoamérica.
- Certificaciones: ISO 9001:2015 (Bureau Veritas), certificado RETIE (Certificado 2413, vigente hasta el 06/10/2027) y distintivo Sociedad BIC (Ley 1901 de 2018).
- Garantía: 2 años directa de fábrica en todos los energizadores y kits.
- Soporte: ingenieros y asesores especializados. Soporte Técnico por WhatsApp: 573204093110. Línea de atención: +57 311 450 8064. Horario: 8:00 - 16:30 Lunes-Viernes, 8:00 - 13:00 Sábado.
- Emails oficiales: info@cercasbalkran.com, ventas@cercasbalkran.com, soporte@cercasbalkran.com.
- Envíos a toda Colombia. Compra segura.
- Líneas de producto: Energizadores (Línea 110V), Línea Dual (110V y 12V), Kits Solares (con panel monocristalino y regulador inteligente, autonomía 24h incluso en días nublados), y Accesorios (aisladores, cables, hilos electroplásticos, varillas copperweld, desviadores de rayos, etc.).
- Consumo energético muy bajo: menos de 10W-15W en red 110V.
- Alcance de productos: desde 15 km (pequeñas parcelas) hasta más de 350 km (grandes haciendas).
- Manuales: en la página /manuales puedes descargar el "Manual de Uso Energizador DUAL y 12V" (referencias BD1000-BD9000, BHD4500-BHD9000 y línea S: B800S, B1000S, B2000S, B3000S, B4500S, B6000S, B9000S) y el "Manual de Uso Energizador 110V" (referencias B500-B18000 y BH4500-BH18000).
- Preguntas frecuentes completas disponibles en la página /preguntas-frecuentes.
- Políticas: Política de protección de datos personales (/politica-datos-personales), Política de Garantías y devoluciones (/garantias-y-devoluciones) y Términos y condiciones de la tienda (/terminos-y-condiciones-tienda). PQRS en /pqrs.
- Eventos y certificaciones: ver /eventos y /certificaciones.
`;

const DEFAULT_FAQS = [
  { q: '¿cuántos kilómetros de cerca puedo electrificar?', a: 'Cada modelo tiene una capacidad nominal en kilómetros. Hay equipos desde 15 km de alcance para pequeñas parcelas (B500) hasta energizadores industriales de más de 450 km (B18000) para grandes haciendas.' },
  { q: '¿funcionan con panel solar?', a: 'Sí. La línea de Kits Solares Balkran incluye paneles monocristalinos de alta eficiencia y reguladores inteligentes integrados, con autonomía continua de aproximadamente 2 días con la batería completamente cargada, incluso en días nublados. Es importante no dejar descargar la batería en su totalidad para prolongar su ciclo de vida.' },
  { q: '¿cuánto consumen de energía?', a: 'Menos de 10W a 15W en red eléctrica de 110V gracias a microcontroladores de consumo ultra eficiente. Consumo mensual mínimo.' },
  { q: '¿tienen garantía?', a: 'Sí, todos los energizadores y kits Balkran tienen 2 años de garantía directa de fábrica y certificación de calidad colombiana.' },
  { q: '¿cómo se instala?', a: 'La instalación es rápida y sencilla. Necesitas: cuchilla doble tiro, alambre de cobre Nº 8 o Nº 10 (20 metros), desviador de rayos, aislador pivote (paso, traba, puntilla), aisladores tipo pera (inicio fin, esquinero), postes, varillas polo a tierra y alambre aislado. Se incluye una guía ilustrada paso a paso y el equipo técnico asesora vía telefónica o WhatsApp. Puedes descargar el manual de tu energizador en la página /manuales.' },
  { q: '¿qué alambre necesito?', a: 'Se recomienda utilizar alambre Nº 12.5 o Nº 14, es muy eficiente en la conducción eléctrica y soporta altas tensiones por lo que su ciclo de vida es alto.' },
  { q: '¿necesito varillas polo a tierra?', a: 'Sí, se necesita varilla polo a tierra; una buena toma de tierra es indispensable para un buen rendimiento del energizador. Se recomiendan varillas de cobre COPPERWELD de 1,5 metros de largo como mínimo, enterradas en el suelo.' },
  { q: '¿cómo verifico que el energizador funciona?', a: 'Los energizadores BALKRAN cuentan con dos indicadores de luz: IND.ON (encendido, debe mantenerse siempre encendido) e IND.SALIDA/OUTPUT (indica el pulso o velocidad de disparo). Para una prueba en vacío, desconecta la conexión negativa y positiva de la cuchilla doble tiro y con un alambre de cobre aislado acerca la punta a 1 cm del borne: si genera chispa o arco de corriente, el energizador funciona correctamente.' },
  { q: '¿cómo verifico que el cercado funciona?', a: 'Con un voltímetro se mide el nivel de tensión del cercado. Si no cuentas con voltímetro, acerca un alambre aislado a 1 cm del cercado: si ves y oyes un pequeño arco eléctrico, está pasando energía. Asegúrate de que ninguna cuerda esté caída sobre el pasto (genera fuga) ni pegada entre sí (aterrizamiento).' },
  { q: '¿qué tan seguro es un cercado eléctrico?', a: 'Con una correcta instalación es seguro para humanos y animales; el choque es de tipo no letal. Los energizadores Balkran cuentan con certificación RETIE que garantiza el cumplimiento de normas técnicas eléctricas y las especificaciones de la ficha técnica.' },
  { q: '¿qué pasa si instalo un energizador más potente?', a: 'No pasa nada; tendrás más energía a tu disposición. Es recomendado sobre todo en zonas con terrenos muy secos.' },
  { q: '¿cuántas cuerdas debe tener el cercado?', a: 'Depende del tipo de animal: para bovinos y caballos se recomiendan 2 a 3 cuerdas; para ovejas y cabras, 4 a 5 cuerdas.' },
  { q: '¿qué tipo de energizador necesito?', a: 'Debes considerar: hectáreas a trabajar; tipo de terreno (plano desde B1000, montañoso desde B3000); tipo de suelo (seco, rocoso o arenoso desde B4500, arcilloso o limoso desde B1000); tipo de animales (mascotas B500-B750, caballos B500-B2000, caprinos desde B3000, bovinos B500-B3000, toros desde B4500); y si usarás energía solar o conexión a 110V.' },
  { q: '¿dan soporte técnico?', a: 'Sí. Soporte Técnico especializado por WhatsApp (573204093110) para diagnóstico, mantenimiento y garantía oficial, e instalaciones en sitio bajo previa cotización. Horario de atención: 8:00 - 16:30 Lunes-Viernes y 8:00 - 13:00 Sábado.' },
  { q: '¿hacen envíos?', a: 'Sí, envíos a toda Colombia con compra segura.' },
  { q: '¿qué es un energizador?', a: 'Es un equipo eléctrico que se alimenta a 110 Voltios o 12 Voltios (línea solar) y provee de energía al alambrado del cercado mediante pulsos eléctricos. Es el componente principal del cercado eléctrico.' },
  { q: '¿qué es un cercado eléctrico?', a: 'Es un sistema de elementos que forman una barrera electrificada para delimitar áreas: pastoreo rotacional, control de animales, protección de cultivos, protección de bosques ribereños y sistemas silvopastoriles. Al tocar el alambrado se cierra el circuito a tierra y se recibe una descarga no dañina pero punzante, creando una barrera psicológica.' },
  { q: '¿cuál es el precio?', a: 'Los precios están publicados en la página de cada producto en la web. Puedes consultar el catálogo completo o hablar con un asesor por WhatsApp.' },
  { q: '¿dónde están ubicados?', a: 'Nuestra sede está en Carrera 26 # 24-17, Duitama – Boyacá, Colombia. Código Postal 150462. NIT: 900.215.119-6.' },
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

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[n];
}

function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'de', 'del', 'y', 'o', 'u', 'a', 'al', 'con', 'por', 'para', 'que', 'cuanto', 'cuanta',
  'cuantos', 'cuantas', 'cual', 'cuales', 'como', 'cual es', 'hay', 'tienen', 'tiene', 'me', 'mi', 'un', 'una', 'unos',
  'unas', 'en', 'es', 'son', 'producto', 'precio', 'modelo', 'hasta', 'necesito', 'me', 'dame', 'muestrame', 'ver',
  'comprar', 'informacion', 'info', 'kms', 'km',
]);

const CODE_RE = /b\s*\d{2,6}[a-z]{0,3}/i;

function codeOf(name: string): string | null {
  const m = name.match(CODE_RE);
  return m ? m[0].replace(/\s+/g, '').toLowerCase() : null;
}

function modelNumber(name: string): number | null {
  const base = name.replace(/[^0-9a-z]/gi, '').toLowerCase();
  const m = base.match(/^b(\d{3,6})/);
  return m ? parseInt(m[1], 10) : null;
}

export async function getProductByName(query: string): Promise<{ nombre: string; slug: string; precio: string; alcance: string } | null> {
  const products = await getAllProducts();
  const norm = (s: string) =>
    String(s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

  const raw = query.replace(/\s+/g, ' ').trim();
  const q = norm(raw);
  if (!q) return null;

  const qCode = codeOf(query.replace(/\s+/g, ''));

  const km = (s: string) => (s.match(/\d+([.,]\d+)?/g) || []).map((n) => parseFloat(n.replace(',', '.')));
  const qKm = km(q);

  const qNums = (qKm || []).filter((n) => n >= 500 && n <= 20000 && Number.isInteger(n));
  let exactCodeMatch: (typeof products)[number] | null = null;

  for (const p of products) {
    const pCode = codeOf(norm(p.nombre));
    if (qCode && pCode && qCode === pCode) {
      exactCodeMatch = p;
      break;
    }
  }
  if (exactCodeMatch) {
    return { nombre: exactCodeMatch.nombre, slug: exactCodeMatch.slug, precio: exactCodeMatch.precio, alcance: exactCodeMatch.alcance || '' };
  }

  let best: { product: (typeof products)[number]; score: number } | null = null;

  for (const p of products) {
    const nombre = norm(p.nombre);
    const linea = norm(p.linea || '');
    const categoria = norm(p.categoria || '');
    const alcance = norm(p.alcance || '');
    const texto = `${nombre} ${linea} ${categoria} ${alcance}`;

    let score = 0;

    // 1) Número de modelo desnudo ("3000" -> B3000)
    for (const n of qNums) {
      if (modelNumber(nombre) === n) {
        score = Math.max(score, 0.95);
      }
    }

    // 2) Tokens descriptivos (nombre, línea, categoría)
    const qTokens = q.split(' ').filter((t) => t.length >= 2 && !STOPWORDS.has(t) && !/^\d/.test(t));
    const matched = qTokens.filter((t) => texto.includes(t)).length;
    if (matched > 0) {
      score = Math.max(score, Math.min(1, 0.55 * matched));
    }

    // 3) km de alcance
    if (qKm.length > 0) {
      const pKm = km(p.alcance || '');
      const exact = qKm.some((a) => pKm.some((b) => b === a));
      const close = qKm.some((a) => pKm.some((b) => Math.abs(b - a) <= Math.max(2, b * 0.1)));
      if (exact) score = Math.max(score, 0.9);
      else if (close) score = Math.max(score, 0.7);
    }

    if (score > 0.5 && (!best || score > best.score)) {
      best = { product: p, score };
    }
  }

  if (best) {
    return { nombre: best.product.nombre, slug: best.product.slug, precio: best.product.precio, alcance: best.product.alcance || '' };
  }

  // Fallback final: similitud por nombre para frases descriptivas
  if (q.length >= 8) {
    let fuzzyBest: { product: (typeof products)[number]; score: number } | null = null;
    for (const p of products) {
      const s = similarity(q, norm(p.nombre));
      if (s >= 0.8 && (!fuzzyBest || s > fuzzyBest.score)) fuzzyBest = { product: p, score: s };
    }
    if (fuzzyBest) {
      const fp = fuzzyBest.product;
      return { nombre: fp.nombre, slug: fp.slug, precio: fp.precio, alcance: fp.alcance || '' };
    }
  }

  return null;
}
