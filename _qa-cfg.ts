import { prisma } from '@/lib/prisma';
async function main() {
  const c = await prisma.siteConfig.findMany();
  console.log(JSON.stringify(c));
  await prisma.$disconnect();
}
main();