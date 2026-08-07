export type HistoriaMetric = {
  label: string;
  valor: string;
  subtexto?: string;
};

export type Historia = {
  slug: string;
  titulo: string;
  categoria: string;
  ubicacion: string;
  pais: string;
  resumen: string;
  imagen: string;
  cliente: string;
  cargoCliente: string;
  cita: string;
  metricas: HistoriaMetric[];
  desafio: string[];
  solucion: string[];
  resultados: string[];
  productoUsado: {
    nombre: string;
    descripcion: string;
    link: string;
  };
  fecha: string;
};

export const historias: Historia[] = [
  {
    slug: 'balcon-de-los-apaches',
    titulo: 'Balcón de los Apaches',
    categoria: 'GANADERÍA',
    ubicacion: 'Carchi, Ecuador',
    pais: 'Ecuador',
    resumen: 'Protegemos extensas áreas de pastoreo con tecnología solar de alta potencia Balkran en terreno de alta montaña.',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-balkran-solar.webp',
    cliente: 'Don Carlos Mendoza',
    cargoCliente: 'Propietario de la Hacienda Balcón de los Apaches',
    cita: 'Desde que instalamos el sistema solar Balkran en el Balcón de los Apaches, el control del ganado es total. Ni en las temporadas más nubladas cae la potencia del cerco.',
    fecha: '2025',
    metricas: [
      { label: 'Hectáreas Protegidas', valor: '450 ha', subtexto: 'Pastoreo rotacional continuo' },
      { label: 'Cabezas de Ganado', valor: '650+', subtexto: 'Bovinos de doble propósito' },
      { label: 'Autonomía Solar', valor: '100%', subtexto: 'Operación 24/7 sin red eléctrica' },
    ],
    desafio: [
      'La hacienda Balcón de los Apaches está ubicada en una zona de alta montaña con clima cambiante y neblina frecuente, sin acceso a la red eléctrica convencional.',
      'El ganado rompió cercas tradicionales de púas en múltiples ocasiones debido al relieve irregular, generando pérdidas económicas y riesgos de extravío de reses.',
      'Se requería una solución autónoma, resistente a la intemperie y de mantenimiento mínimo para garantizar el pastoreo rotacional de 650 cabezas de ganado.'
    ],
    solucion: [
      'Instalación de Energizadores Balkran de la línea Solar de alta eficiencia con paneles fotovoltaicos integrados y banco de baterías AGM de ciclo profundo.',
      'Despliegue de alambre aislado Balkran de alta conducción eléctrica y varillas polo a tierra de cobre Copperweld en puntos estratégicos con alta humedad.',
      'Configuración de la cuchilla doble tiro y desviador de rayos para protección atmosférica durante la temporada de lluvias.'
    ],
    resultados: [
      'Garantía de voltaje constante superior a 9.000 voltios en toda la línea del cerco, independientemente de la radiación solar diaria.',
      'Cero reportes de ganado extraviado o lesionado desde la puesta en marcha del sistema.',
      'Ahorro del 100% en consumo de combustible diésel para generadores anteriores y reducción del 40% en costos de mantenimiento perimetral.'
    ],
    productoUsado: {
      nombre: 'Energizador Balkran Línea Solar (B800S - B9000S)',
      descripcion: 'Sistema fotovoltaico autónomo de máxima potencia diseñado para zonas rurales remotas sin conexión a red eléctrica.',
      link: '/productos',
    },
  },
  {
    slug: 'san-francisco',
    titulo: 'Finca San Francisco',
    categoria: 'AGRICULTURA',
    ubicacion: 'Cibao, República Dominicana',
    pais: 'República Dominicana',
    resumen: 'Cercado electrificado perimetral de alto impacto para resguardar cultivos e instalaciones agrícolas de exportación.',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-agricultura-rd.webp',
    cliente: 'Ing. Rafael Pichardo',
    cargoCliente: 'Director de Operaciones Agrícolas San Francisco',
    cita: 'La fuerza de pulso de los energizadores Balkran atraviesa la vegetación densa sin bajar su nivel de protección. Nuestros cultivos quedaron completamente blindados.',
    fecha: '2025',
    metricas: [
      { label: 'Área Protegida', valor: '280 ha', subtexto: 'Plantaciones de banano y plátano' },
      { label: 'Reducción de Incursiones', valor: '98.5%', subtexto: 'Frente a animales e intrusos' },
      { label: 'Potencia Liberada', valor: '4.5 Joules', subtexto: 'Pulso psicológico disuasivo' },
    ],
    desafio: [
      'Las plantaciones de banano de exportación sufrían constantes pérdidas debido a la incursión de ganado vacuno de fincas vecinas y fauna silvestre de la región.',
      'El clima tropical húmedo causaba alta corrosión en accesorios y pérdidas de voltaje por contacto directo con maleza alta.',
      'Era imperativo contar con un cerco eléctrico de alta durabilidad dieléctrica capaz de soportar lluvias continuas y alta vegetación.'
    ],
    solucion: [
      'Implementación de Energizadores Balkran DUAL de alta potencia (BHD4500) alimentados por red 110V con respaldo de batería de 12V.',
      'Uso de aisladores Balkran con polímeros protegidos contra rayos UV y rigidez dieléctrica reforzada para evitar fugas a tierra.',
      'Capacitación técnica al personal de campo para la medición periódica de voltaje con voltímetros digitales Balkran.'
    ],
    resultados: [
      'Reducción inmediata del 98.5% en pérdidas de cultivos por incursión de animales perimetrales.',
      'Estabilidad del voltaje perimetral por encima de los 8.500 voltios incluso durante aguaceros tropicales intensos.',
      'Retorno de la inversión inicial en menos de 5 meses gracias a la preservación del 100% de la cosecha de exportación.'
    ],
    productoUsado: {
      nombre: 'Energizador Balkran DUAL Alta Potencia (BHD4500 - BHD9000)',
      descripcion: 'Equipo dual 110V/12V con máxima penetración de vegetación y tecnología de protección contra sobretensiones.',
      link: '/productos',
    },
  },
  {
    slug: 'san-salvador',
    titulo: 'Rancho San Salvador',
    categoria: 'EQUINOS',
    ubicacion: 'La Libertad, El Salvador',
    pais: 'El Salvador',
    resumen: 'Seguridad y tranquilidad garantizada para el manejo, confinamiento y cuidado del ganado equino de alta genética.',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-equinos-elsalvador.webp',
    cliente: 'Dra. María José Alvarado',
    cargoCliente: 'Medica Veterinaria y Criadora Equina',
    cita: 'Para caballos de valor genético superior, la seguridad física es sagrada. Balkran ofrece el impulso exacto que enseña al ejemplar a respetar la línea sin riesgo de cortaduras.',
    fecha: '2024',
    metricas: [
      { label: 'Ejemplares Protegidos', valor: '85 Equinos', subtexto: 'Caballos de paso y salto' },
      { label: 'Lesiones Registradas', valor: '0 Incidentes', subtexto: 'Seguridad biológica 100%' },
      { label: 'Perímetro Controlado', valor: '120 km', subtexto: 'Cercas divisorias e hípica' },
    ],
    desafio: [
      'El ganado equino es altamente sensible y propenso a cortaduras graves cuando intenta atravesar cercados de alambre de púas convencional.',
      'Se necesitaba delimitar potreros de entrenamiento y descanso sin poner en riesgo la piel, patas ni el temperamento de caballos de competencia.',
      'Se requería una solución con pulso regular y señalización visual clara para evitar sustos violentos en los ejemplares.'
    ],
    solucion: [
      'Instalación de Energizador Balkran B3000 de tecnología controlada con cinta electroplástica de alta visibilidad en tono brillante.',
      'Sustitución completa de alambres de púas por hilos plásticos con filamentos de acero inoxidable Balkran de pulso suave.',
      'Montaje de aisladores de esquina y paso con esquinas redondeadas anti-impacto.'
    ],
    resultados: [
      'Cero lesiones físicas o cicatrices en la piel de los 85 ejemplares equinos del rancho.',
      'Educación conductual inmediata de los potros y sementales hacia la barrera psicológica de la cerca.',
      'Facilidad de traslado de los cercos móviles para competencias temporales y entrenamientos al aire libre.'
    ],
    productoUsado: {
      nombre: 'Energizador Balkran 110V/12V para Equinos y Mascotas (B500 - B3000)',
      descripcion: 'Impulsor de pulso seguro y constante adaptado a la piel y sensibilidad de ganado equino y mascotas.',
      link: '/productos',
    },
  },
  {
    slug: 'hacienda-la-libertad',
    titulo: 'Hacienda La Libertad',
    categoria: 'GANADERÍA SUSTENTABLE',
    ubicacion: 'Duitama, Boyacá, Colombia',
    pais: 'Colombia',
    resumen: 'Pastoreo Voisin de alta densidad con división de 60 potreros mediante energizadores Balkran DUAL de máxima resistencia.',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/bienestar-vacas-lecheras.webp',
    cliente: 'Ing. Fernando Tobón',
    cargoCliente: 'Zootecnista y Administrador General',
    cita: 'El pastoreo de precisión requiere energía confiable segundo a segundo. Con la tecnología Balkran logramos duplicar la carga animal por hectárea con total tranquilidad.',
    fecha: '2024',
    metricas: [
      { label: 'Potreros en Rotación', valor: '60 Sectores', subtexto: 'Sistema Voisin silvopastoril' },
      { label: 'Aumento Productivo', valor: '+45%', subtexto: 'Mayor rendimiento de leche' },
      { label: 'Energía de Salida', valor: '18 Joules', subtexto: 'Línea fija de alta capacidad' },
    ],
    desafio: [
      'Implementar el sistema de Pastoreo Voisin en una finca ganadera de Boyacá requería subdividir el terreno en 60 potreros pequeños con cambios diarios de ganado.',
      'Los interruptores de sector fallaban con humedad en marcas genéricas, haciendo perder el control del pulso eléctrico.',
      'Se buscaba un proveedor nacional con soporte directo, repuestos inmediatos y respaldo de garantía real.'
    ],
    solucion: [
      'Suministro e instalación del energizador estrella Balkran B18000 para grandes extensiones con cuchillas doble tiro por potrero.',
      'Implementación del esquema de polo a tierra tripartito en triángulo con varillas Copperweld de 2 metros.',
      'Acompañamiento técnico directo del departamento de ingeniería Balkran en Boyacá.'
    ],
    resultados: [
      'Incremento del 45% en la producción diaria de litros de leche por hectárea al optimizar los ciclos de descanso del pasto.',
      'Respuesta inmediata ante mantenimiento gracias a la fábrica de Balkran ubicada en Duitama, Boyacá.',
      'Operación ininterrumpida por más de 3 años continuos sin fallas en el módulo central de impulsos.'
    ],
    productoUsado: {
      nombre: 'Energizador Balkran B18000 Industrial',
      descripcion: 'El equipo de máxima potencia comercial para haciendas extensas y sistemas silvopastoriles de alta densidad.',
      link: '/productos',
    },
  }
];

export function getHistoriaBySlug(slug: string): Historia | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/\/$/, '');
  return historias.find((h) => h.slug.toLowerCase().trim().replace(/\/$/, '') === cleanSlug);
}
