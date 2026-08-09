import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "node:fs";
const db = readFileSync('.env','utf8').match(/^DATABASE_URL="([^"]+)"/m)[1];
const p = new PrismaClient({ adapter: new PrismaPg({ connectionString: db }) });
const products = await p.product.findMany({ select: { slug: true } });
const historias = await p.story.findMany({ select: { slug: true } }).catch(()=>[]);
let eventos = [];
try { eventos = await p.event.findMany({ select: { slug: true } }); } catch {}
const consul = await p.service.findMany({ select: { slug: true } }).catch(()=>[]);
console.log(JSON.stringify({ products: products.map(x=>x.slug), historias: historias.map(x=>x.slug), eventos: eventos.map(x=>x.slug), services: consul.map(x=>x.slug) }));
await p.$disconnect();
