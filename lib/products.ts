import productosData from '../productos.json';

export interface Product {
  slug: string;
  nombre: string;
  linea: string;
  categoria: 'Energizadores' | 'Kits Solares' | 'Accesorios';
  precio: string;
  precioNumerico: number;
  imagen_local: string;
  imagen_url_original?: string;
  alcance?: string;
  joules?: string;
  voltaje?: string;
  subtitulo?: string;
  url?: string;
  title?: string;
  imagenes?: string[];
  descripcion?: string;
  alimentacion?: string;
  consumo?: string;
  ideal_para?: string;
  esMasVendido?: boolean;
  esPopular?: boolean;
  esNuevo?: boolean;
  cobertura?: string;
  energia_salida?: string;
  voltaje_salida?: string;
  pulsos_minuto?: string;
  varillas_tierra?: string;
  autonomia?: string;
  peso?: string;
  dimensiones?: string;
  material?: string;
  color?: string;
  presentacion?: string;
  capacidad?: string;
  longitud?: string;
  caracteristicas?: string[];
  recomendado_para?: string[];
  rating?: number;
  valoraciones?: number;
}

// Clean and categorize products dataset
const productsList: Product[] = (productosData as any[]).map((p) => {
  const slug = (p.slug || '').toLowerCase();
  const nombre = p.nombre || p.slug.toUpperCase();
  const lineaClean = (p.linea || 'ACCESORIOS Y OTROS').replace(/^L[ÍI]?L[ÍI]?NEA/i, 'LÍNEA').replace(/L[ÍI]NEA L[ÍI]NEA/g, 'LÍNEA');

  return {
    ...p,
    nombre,
    linea: lineaClean,
    categoria: p.categoria || 'Energizadores',
    precio: p.precio || 'Consultar',
    precioNumerico: p.precioNumerico || 0,
    imagen_local: p.imagen_local || '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
    subtitulo: p.subtitulo || (p.alcance ? `${p.alcance}${p.joules ? ' • ' + p.joules : ''}` : ''),
    esMasVendido: !!p.esMasVendido,
    esNuevo: !!p.esNuevo,
  };
});

export function getAllProducts(): Product[] {
  return productsList;
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsList.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === 'TODOS') return productsList;
  return productsList.filter((p) => p.categoria.toLowerCase() === category.toLowerCase());
}

export function getCategoryCounts() {
  const counts = {
    Energizadores: 0,
    'Kits Solares': 0,
    Accesorios: 0,
  };
  productsList.forEach((p) => {
    if (p.categoria in counts) {
      counts[p.categoria as keyof typeof counts]++;
    }
  });
  return counts;
}
