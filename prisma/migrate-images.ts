import { readFileSync } from 'node:fs';
import { prisma } from '../lib/prisma';
import { uploadImageToR2 } from '../lib/r2';

async function main() {
  const products = await prisma.product.findMany();
  console.log(`Productos: ${products.length}`);

  let subidas = 0;
  let fallidas = 0;

  for (const p of products) {
    const localPath = p.imagen_local?.startsWith('/assets/images/') ? `public${p.imagen_local}` : null;

    if (localPath) {
      try {
        const buffer = readFileSync(localPath);
        const filename = p.imagen_local!.split('/').pop()!;
        const url = await uploadImageToR2(buffer, filename, 'productos');
        await prisma.product.update({ where: { id: p.id }, data: { imagen_local: url } });
        subidas++;
        console.log(`  OK ${p.slug}: ${p.imagen_local} -> ${url}`);
      } catch (e: any) {
        fallidas++;
        console.error(`  FALLO ${p.slug} (${localPath}): ${e.message}`);
      }
    } else if (p.imagen_local?.startsWith('http')) {
      console.log(`  Ya es URL remota ${p.slug}: ${p.imagen_local}`);
    } else {
      console.log(`  Ruta no local, sin cambios ${p.slug}: ${p.imagen_local}`);
    }
  }

  console.log(`\nResumen: ${subidas} subidas, ${fallidas} fallidas`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
