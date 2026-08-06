import { readFileSync, existsSync } from 'node:fs';
import Groq from 'groq-sdk';
import { buildKnowledge, getProductByName } from './lib/knowledge';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

async function main() {
  const apiKey = loadEnvValue('GROQ_API_KEY')!;
  const model = loadEnvValue('GROQ_MODEL') ?? 'llama-3.3-70b-versatile';
  const knowledge = await buildKnowledge();

  const systemPrompt = `Eres VOLT, asistente virtual oficial de Balkran. Responde en español, amigable y conciso.
INFORMACIÓN: ${knowledge.company}
FAQs: ${knowledge.faqs.map((f) => `Q:${f.q} A:${f.a}`).join('\n')}
PRODUCTOS: ${knowledge.products.map((p) => `- ${p.nombre} (${p.categoria}, ${p.linea}) | ${p.alcance} | ${p.precio} | /productos/${p.slug}`).join('\n')}`;

  const groq = new Groq({ apiKey });

  const preguntas = [
    '¿Cuál energizador me recomiendas para una finca de 80 km?',
    '¿Cuánto cuesta el B9000D y tiene garantía?',
    'hola, ¿que productos venden?',
  ];

  for (const q of preguntas) {
    console.log('\n==== PREGUNTA:', q, '====');
    const productMatch = await getProductByName(q);
    const messages: any[] = [{ role: 'system', content: systemPrompt }];
    if (productMatch) messages.push({ role: 'system', content: `[CONTEXTO] El cliente pregunta por "${productMatch.nombre}" (precio ${productMatch.precio}).` });
    messages.push({ role: 'user', content: q });
    const completion = await groq.chat.completions.create({ model, messages, temperature: 0.7, max_tokens: 700 });
    console.log('RESPUESTA:', completion.choices?.[0]?.message?.content);
  }
}

main().catch((e) => { console.error('FALLO:', e); process.exit(1); });
