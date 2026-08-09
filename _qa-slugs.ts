import { prisma } from '@/lib/prisma';

async function main() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  console.log(JSON.stringify(products.map((x) => x.slug)));
}

main().finally(() => prisma.$disconnect());