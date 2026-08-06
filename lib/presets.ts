import type { ProductFormData } from '@/lib/productSchema';

export type ProductPreset = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  gradiente: string;
  data: Partial<ProductFormData>;
};

export const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'energizador',
    nombre: 'Energizador 110V',
    descripcion: 'Cerca eléctrica estándar conectada a la red. Se rellena con specs de línea.',
    icono: 'Zap',
    gradiente: 'from-amber-500/25 to-[#ff5a00]/15 border-[#ff5a00]/40',
    data: {
      categoria: 'ENERGIZADORES',
      linea: 'LÍNEA 110V',
      alimentacion: '110V',
      voltaje: '110V',
    },
  },
  {
    id: 'kit-solar',
    nombre: 'Kit solar',
    descripcion: 'Energizador a batería con panel solar, sin necesidad de red eléctrica.',
    icono: 'CloudSun',
    gradiente: 'from-yellow-500/25 to-orange-500/15 border-yellow-500/40',
    data: {
      categoria: 'KITS_SOLARES',
      linea: 'LÍNEA SOLAR',
      alimentacion: 'Panel solar + batería',
    },
  },
  {
    id: 'accesorio',
    nombre: 'Accesorio',
    descripcion: 'Varillas, aisladores, cables y complementos para cercos.',
    icono: 'Cable',
    gradiente: 'from-sky-500/25 to-blue-500/15 border-sky-500/40',
    data: {
      categoria: 'ACCESORIOS',
      linea: 'ACCESORIOS',
    },
  },
];