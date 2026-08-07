import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const map: Record<string, string> = JSON.parse(readFileSync('r2-mapping.json', 'utf8'));

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(full)) out.push(full);
  }
  return out;
}

const dirs = ['app', 'components', 'context', 'lib'];
const files = dirs.flatMap((d) => (existsSync(d) ? walk(d) : []));

const R2 = 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev';

// 1) Colapsa prefijos duplicados: (R2R2... o balkran.comR2... o R2balkran.comR2...) -> R2
const hostRe = /((?:https:\/\/pub-[a-z0-9]+\.r2\.dev|https:\/\/balkran\.com|https:\/\/www\.balkran\.com)+)(?=\/assets\/)/g;

let totalFixes = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  // Colapsar hosts acumulados antes de /assets/
  content = content.replace(hostRe, () => R2);

  // 2) Caprinos: ruta local con espacios que quedó sin mapear
  for (const [local, url] of Object.entries(map)) {
    if (local.includes(' ')) {
      const re = new RegExp(local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.match(re)) content = content.replace(re, url);
    }
  }

  if (content !== original) {
    writeFileSync(file, content, 'utf8');
    totalFixes++;
    console.log(`FIX ${file}`);
  }
}

console.log(`\nArchivos normalizados: ${totalFixes}`);
