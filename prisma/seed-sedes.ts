import { readFileSync, existsSync } from 'node:fs';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function loadDotEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const databaseUrl = loadDotEnvValue('DATABASE_URL');

const prisma = new (PrismaClient as any)({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const sedesData = [
  {
    nombre: 'Sede Bogotá - Cedritos',
    ciudad: 'Bogotá D.C.',
    departamento: 'Cundinamarca',
    direccion: 'Calle 145 #11-45, Local 2, Bogotá D.C.',
    telefono: '+57 310 123 4567',
    horario: 'Lun - Sáb: 8:00 a. m. - 7:00 p. m.',
    estado: 'OPERATIVA' as const,
    latitud: 4.6895,
    longitud: -74.0507,
    ventasMes: 28450000,
    ventasMesAnterior: 24100000,
    capacidadOperativa: 85,
    tiempoRespuestaMin: 80,
    tecnicosAsignados: 14,
    ordenesActivas: 2,
    pedidosPendientes: 0,
    calificacion: 4.9,
    orden: 1,
  },
  {
    nombre: 'Sede Duitama - Centro',
    ciudad: 'Duitama',
    departamento: 'Boyacá',
    direccion: 'Carrera 16 #15-32, Piso 1, Duitama, Boyacá',
    telefono: '+57 315 555 4321',
    horario: 'Lun - Sáb: 8:00 a. m. - 6:00 p. m.',
    estado: 'OPERATIVA' as const,
    latitud: 6.3317,
    longitud: -72.3921,
    ventasMes: 29970000,
    ventasMesAnterior: 24500000,
    capacidadOperativa: 78,
    tiempoRespuestaMin: 105,
    tecnicosAsignados: 10,
    ordenesActivas: 0,
    pedidosPendientes: 0,
    calificacion: 4.7,
    orden: 2,
  },
];

async function main() {
  console.log('Seeding sedes...');

  for (const sede of sedesData) {
    await prisma.sede.upsert({
      where: { id: sede.nombre },
      update: {},
      create: sede,
    });
    console.log(`  ✓ ${sede.nombre}`);
  }

  console.log('Sedes seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
