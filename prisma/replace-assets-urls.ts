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

const regex = /\/assets\/images\/[^'")\s]+/g;
let totalReemplazos = 0;
const sinMapeo = new Map<string, string[]>();

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const matches = content.match(regex) ?? [];
  if (!matches.length) continue;

  let changed = content;
  for (const m of matches) {
    const url = map[m];
    if (!url) {
      if (!sinMapeo.has(m)) sinMapeo.set(m, []);
      sinMapeo.get(m)!.push(file);
      continue;
    }
    changed = changed.split(m).join(url);
    totalReemplazos++;
  }
  if (changed !== content) {
    writeFileSync(file, changed, 'utf8');
    console.log(`UPDATE ${file}`);
  }
}

console.log(`\nReemplazos aplicados: ${totalReemplazos}`);
if (sinMapeo.size) {
  console.log(`\nReferencias SIN mapeo (verificar):`);
  for (const [ruta, files] of sinMapeo) {
    console.log(`  ${ruta}`);
    for (const f of new Set(files)) console.log(`      -> ${f}`);
  }
} else {
  console.log('No quedan rutas /assets/images sin mapeo en código.');
}
