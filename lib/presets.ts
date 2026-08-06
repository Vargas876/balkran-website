import type { ProductFormData } from '@/lib/productSchema';

export type ProductPreset = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  data: Partial<ProductFormData>;
};

export const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'energizador',
    nombre: 'Energizador 110V',
    descripcion: 'Cerca eléctrica estándar conectada a la red. Se rellena con specs de línea.',
    icono: '⚡',
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
    icono: '☀️',
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
    icono: '🔧',
    data: {
      categoria: 'ACCESORIOS',
      linea: 'ACCESORIOS',
    },
  },
];