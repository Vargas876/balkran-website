import { L10n } from '@/lib/i18n';

export type HistoriaMetric = {
  label: L10n;
  valor: L10n;
  subtexto?: L10n;
};

export type Historia = {
  slug: string;
  titulo: L10n;
  categoria: L10n;
  ubicacion: L10n;
  pais: L10n;
  resumen: L10n;
  imagen: string;
  cliente: L10n;
  cargoCliente: L10n;
  cita: L10n;
  metricas: HistoriaMetric[];
  desafio: L10n[];
  solucion: L10n[];
  resultados: L10n[];
  productoUsado: {
    nombre: L10n;
    descripcion: L10n;
    link: string;
  };
  fecha: string;
};

export const historias: Historia[] = [
  {
    slug: 'balcon-de-los-apaches',
    titulo: {
      es: 'Balcón de los Apaches',
      en: 'Balcón de los Apaches',
      fr: 'Balcón de los Apaches',
    },
    categoria: {
      es: 'GANADERÍA',
      en: 'LIVESTOCK',
      fr: 'ÉLEVAGE',
    },
    ubicacion: {
      es: 'Carchi, Ecuador',
      en: 'Carchi, Ecuador',
      fr: 'Carchi, Équateur',
    },
    pais: {
      es: 'Ecuador',
      en: 'Ecuador',
      fr: 'Équateur',
    },
    resumen: {
      es: 'Protegemos extensas áreas de pastoreo con tecnología solar de alta potencia Balkran en terreno de alta montaña.',
      en: 'We protect extensive grazing areas with high-power Balkran solar technology on high-mountain terrain.',
      fr: 'Nous protégeons de vastes zones de pâturage avec la technologie solaire de haute puissance Balkran sur un terrain de haute montagne.',
    },
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-balkran-solar.webp',
    cliente: {
      es: 'Don Carlos Mendoza',
      en: 'Don Carlos Mendoza',
      fr: 'Don Carlos Mendoza',
    },
    cargoCliente: {
      es: 'Propietario de la Hacienda Balcón de los Apaches',
      en: 'Owner of the Balcón de los Apaches Hacienda',
      fr: 'Propriétaire du domaine Balcón de los Apaches',
    },
    cita: {
      es: 'Desde que instalamos el sistema solar Balkran en el Balcón de los Apaches, el control del ganado es total. Ni en las temporadas más nubladas cae la potencia del cerco.',
      en: 'Since we installed the Balkran solar system at Balcón de los Apaches, cattle control has been total. Even during the cloudiest seasons, the fence power never drops.',
      fr: 'Depuis que nous avons installé le système solaire Balkran au Balcón de los Apaches, le contrôle du bétail est total. Même pendant les saisons les plus nuageuses, la puissance de la clôture ne chute jamais.',
    },
    fecha: '2025',
    metricas: [
      {
        label: { es: 'Hectáreas Protegidas', en: 'Protected Hectares', fr: 'Hectares Protégés' },
        valor: { es: '450 ha', en: '450 ha', fr: '450 ha' },
        subtexto: { es: 'Pastoreo rotacional continuo', en: 'Continuous rotational grazing', fr: 'Pâturage rotatif continu' },
      },
      {
        label: { es: 'Cabezas de Ganado', en: 'Cattle Heads', fr: 'Têtes de Bétail' },
        valor: { es: '650+', en: '650+', fr: '650+' },
        subtexto: { es: 'Bovinos de doble propósito', en: 'Dual-purpose cattle', fr: 'Bovins à double usage' },
      },
      {
        label: { es: 'Autonomía Solar', en: 'Solar Autonomy', fr: 'Autonomie Solaire' },
        valor: { es: '100%', en: '100%', fr: '100%' },
        subtexto: { es: 'Operación 24/7 sin red eléctrica', en: '24/7 operation without the power grid', fr: 'Fonctionnement 24/7 sans réseau électrique' },
      },
    ],
    desafio: [
      {
        es: 'La hacienda Balcón de los Apaches está ubicada en una zona de alta montaña con clima cambiante y neblina frecuente, sin acceso a la red eléctrica convencional.',
        en: 'The Balcón de los Apaches hacienda is located in a high-mountain area with changing weather and frequent fog, with no access to the conventional power grid.',
        fr: 'Le domaine Balcón de los Apaches est situé dans une zone de haute montagne au climat changeant et à la brume fréquente, sans accès au réseau électrique conventionnel.',
      },
      {
        es: 'El ganado rompió cercas tradicionales de púas en múltiples ocasiones debido al relieve irregular, generando pérdidas económicas y riesgos de extravío de reses.',
        en: 'The cattle broke through traditional barbed-wire fences on multiple occasions due to the irregular terrain, causing economic losses and risks of stray cattle.',
        fr: 'Le bétail a rompu les clôtures traditionnelles à barbelés à plusieurs reprises en raison du relief irrégulier, entraînant des pertes économiques et des risques de bétail égaré.',
      },
      {
        es: 'Se requería una solución autónoma, resistente a la intemperie y de mantenimiento mínimo para garantizar el pastoreo rotacional de 650 cabezas de ganado.',
        en: 'An autonomous, weather-resistant solution requiring minimal maintenance was needed to guarantee the rotational grazing of 650 heads of cattle.',
        fr: 'Une solution autonome, résistante aux intempéries et nécessitant un entretien minimal était nécessaire pour garantir le pâturage rotatif de 650 têtes de bétail.',
      },
    ],
    solucion: [
      {
        es: 'Instalación de Energizadores Balkran de la línea Solar de alta eficiencia con paneles fotovoltaicos integrados y banco de baterías AGM de ciclo profundo.',
        en: 'Installation of high-efficiency Balkran Solar line energizers with integrated photovoltaic panels and a deep-cycle AGM battery bank.',
        fr: 'Installation d’énergiseurs Balkran de la ligne Solaire à haute efficacité avec panneaux photovoltaïques intégrés et un parc de batteries AGM à cycle profond.',
      },
      {
        es: 'Despliegue de alambre aislado Balkran de alta conducción eléctrica y varillas polo a tierra de cobre Copperweld en puntos estratégicos con alta humedad.',
        en: 'Deployment of high-conductivity insulated Balkran wire and Copperweld copper ground rods at strategic high-moisture points.',
        fr: 'Déploiement de fil isolé Balkran à haute conductivité électrique et de piquets de mise à la terre en cuivre Copperweld à des points stratégiques très humides.',
      },
      {
        es: 'Configuración de la cuchilla doble tiro y desviador de rayos para protección atmosférica durante la temporada de lluvias.',
        en: 'Configuration of the double-action blade and lightning diverter for atmospheric protection during the rainy season.',
        fr: 'Configuration de la lame à double tir et du parafoudre pour la protection atmosphérique pendant la saison des pluies.',
      },
    ],
    resultados: [
      {
        es: 'Garantía de voltaje constante superior a 9.000 voltios en toda la línea del cerco, independientemente de la radiación solar diaria.',
        en: 'Guaranteed constant voltage above 9,000 volts across the entire fence line, regardless of daily solar radiation.',
        fr: 'Garantie de tension constante supérieure à 9 000 volts sur toute la ligne de clôture, indépendamment du rayonnement solaire quotidien.',
      },
      {
        es: 'Cero reportes de ganado extraviado o lesionado desde la puesta en marcha del sistema.',
        en: 'Zero reports of stray or injured cattle since the system was put into operation.',
        fr: 'Zéro signalement de bétail égaré ou blessé depuis la mise en service du système.',
      },
      {
        es: 'Ahorro del 100% en consumo de combustible diésel para generadores anteriores y reducción del 40% en costos de mantenimiento perimetral.',
        en: '100% savings in diesel fuel consumption for the previous generators and a 40% reduction in perimeter maintenance costs.',
        fr: 'Économie de 100 % sur la consommation de carburant diesel pour les générateurs précédents et réduction de 40 % des coûts de maintenance périmétrique.',
      },
    ],
    productoUsado: {
      nombre: {
        es: 'Energizador Balkran Línea Solar (B800S - B9000S)',
        en: 'Balkran Solar Line Energizer (B800S - B9000S)',
        fr: 'Énergiseur Balkran Ligne Solaire (B800S - B9000S)',
      },
      descripcion: {
        es: 'Sistema fotovoltaico autónomo de máxima potencia diseñado para zonas rurales remotas sin conexión a red eléctrica.',
        en: 'Stand-alone maximum-power photovoltaic system designed for remote rural areas with no connection to the power grid.',
        fr: 'Système photovoltaïque autonome de puissance maximale conçu pour les zones rurales éloignées sans raccordement au réseau électrique.',
      },
      link: '/productos',
    },
  },
  {
    slug: 'san-francisco',
    titulo: {
      es: 'Finca San Francisco',
      en: 'Finca San Francisco',
      fr: 'Finca San Francisco',
    },
    categoria: {
      es: 'AGRICULTURA',
      en: 'AGRICULTURE',
      fr: 'AGRICULTURE',
    },
    ubicacion: {
      es: 'Cibao, República Dominicana',
      en: 'Cibao, Dominican Republic',
      fr: 'Cibao, République dominicaine',
    },
    pais: {
      es: 'República Dominicana',
      en: 'Dominican Republic',
      fr: 'République dominicaine',
    },
    resumen: {
      es: 'Cercado electrificado perimetral de alto impacto para resguardar cultivos e instalaciones agrícolas de exportación.',
      en: 'High-impact electrified perimeter fencing to protect export crops and agricultural facilities.',
      fr: 'Clôture périphérique électrifiée à fort impact pour protéger les cultures d’exportation et les installations agricoles.',
    },
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-agricultura-rd.webp',
    cliente: {
      es: 'Ing. Rafael Pichardo',
      en: 'Eng. Rafael Pichardo',
      fr: 'Ing. Rafael Pichardo',
    },
    cargoCliente: {
      es: 'Director de Operaciones Agrícolas San Francisco',
      en: 'Director of San Francisco Agricultural Operations',
      fr: 'Directeur des Opérations Agricoles San Francisco',
    },
    cita: {
      es: 'La fuerza de pulso de los energizadores Balkran atraviesa la vegetación densa sin bajar su nivel de protección. Nuestros cultivos quedaron completamente blindados.',
      en: 'The pulse strength of Balkran energizers cuts through dense vegetation without lowering its level of protection. Our crops became completely shielded.',
      fr: 'La force d’impulsion des énergiseurs Balkran traverse la végétation dense sans abaisser son niveau de protection. Nos cultures sont désormais totalement protégées.',
    },
    fecha: '2025',
    metricas: [
      {
        label: { es: 'Área Protegida', en: 'Protected Area', fr: 'Zone Protégée' },
        valor: { es: '280 ha', en: '280 ha', fr: '280 ha' },
        subtexto: { es: 'Plantaciones de banano y plátano', en: 'Banana and plantain plantations', fr: 'Plantations de bananes et de plantains' },
      },
      {
        label: { es: 'Reducción de Incursiones', en: 'Intrusion Reduction', fr: 'Réduction des Intrusions' },
        valor: { es: '98.5%', en: '98.5%', fr: '98.5%' },
        subtexto: { es: 'Frente a animales e intrusos', en: 'Against animals and intruders', fr: 'Face aux animaux et aux intrus' },
      },
      {
        label: { es: 'Potencia Liberada', en: 'Released Power', fr: 'Puissance Libérée' },
        valor: { es: '4.5 Joules', en: '4.5 Joules', fr: '4.5 Joules' },
        subtexto: { es: 'Pulso psicológico disuasivo', en: 'Deterrent psychological pulse', fr: 'Impulsion psychologique dissuasive' },
      },
    ],
    desafio: [
      {
        es: 'Las plantaciones de banano de exportación sufrían constantes pérdidas debido a la incursión de ganado vacuno de fincas vecinas y fauna silvestre de la región.',
        en: 'The export banana plantations suffered constant losses due to the intrusion of cattle from neighboring farms and the region’s wildlife.',
        fr: 'Les plantations de bananes d’exportation subissaient des pertes constantes en raison de l’intrusion du bétail des fermes voisines et de la faune sauvage de la région.',
      },
      {
        es: 'El clima tropical húmedo causaba alta corrosión en accesorios y pérdidas de voltaje por contacto directo con maleza alta.',
        en: 'The humid tropical climate caused high corrosion in accessories and voltage loss through direct contact with tall weeds.',
        fr: 'Le climat tropical humide provoquait une forte corrosion des accessoires et des pertes de tension par contact direct avec les herbes hautes.',
      },
      {
        es: 'Era imperativo contar con un cerco eléctrico de alta durabilidad dieléctrica capaz de soportar lluvias continuas y alta vegetación.',
        en: 'It was imperative to have an electric fence with high dielectric durability capable of withstanding continuous rain and heavy vegetation.',
        fr: 'Il était impératif de disposer d’une clôture électrique à haute durabilité diélectrique capable de résister aux pluies continues et à une végétation abondante.',
      },
    ],
    solucion: [
      {
        es: 'Implementación de Energizadores Balkran DUAL de alta potencia (BHD4500) alimentados por red 110V con respaldo de batería de 12V.',
        en: 'Implementation of high-power Balkran DUAL energizers (BHD4500) powered by 110V mains with 12V battery backup.',
        fr: 'Mise en œuvre d’énergiseurs Balkran DUAL haute puissance (BHD4500) alimentés par le secteur 110 V avec batterie de secours 12 V.',
      },
      {
        es: 'Uso de aisladores Balkran con polímeros protegidos contra rayos UV y rigidez dieléctrica reforzada para evitar fugas a tierra.',
        en: 'Use of Balkran insulators with UV-protected polymers and reinforced dielectric rigidity to prevent earth leaks.',
        fr: 'Utilisation d’isolateurs Balkran en polymères protégés contre les UV et à rigidité diélectrique renforcée pour éviter les fuites à la terre.',
      },
      {
        es: 'Capacitación técnica al personal de campo para la medición periódica de voltaje con voltímetros digitales Balkran.',
        en: 'Technical training for field staff for periodic voltage measurement with Balkran digital voltmeters.',
        fr: 'Formation technique du personnel de terrain pour la mesure périodique de la tension avec les voltmètres numériques Balkran.',
      },
    ],
    resultados: [
      {
        es: 'Reducción inmediata del 98.5% en pérdidas de cultivos por incursión de animales perimetrales.',
        en: 'Immediate 98.5% reduction in crop losses caused by perimeter animal intrusion.',
        fr: 'Réduction immédiate de 98,5 % des pertes de cultures dues à l’intrusion d’animaux périphériques.',
      },
      {
        es: 'Estabilidad del voltaje perimetral por encima de los 8.500 voltios incluso durante aguaceros tropicales intensos.',
        en: 'Perimeter voltage stability above 8,500 volts even during intense tropical downpours.',
        fr: 'Stabilité de la tension périmétrique au-delà de 8 500 volts même lors d’averses tropicales intenses.',
      },
      {
        es: 'Retorno de la inversión inicial en menos de 5 meses gracias a la preservación del 100% de la cosecha de exportación.',
        en: 'Return on the initial investment in less than 5 months thanks to the preservation of 100% of the export harvest.',
        fr: 'Retour sur l’investissement initial en moins de 5 mois grâce à la préservation de 100 % de la récolte d’exportation.',
      },
    ],
    productoUsado: {
      nombre: {
        es: 'Energizador Balkran DUAL Alta Potencia (BHD4500 - BHD9000)',
        en: 'Balkran DUAL High Power Energizer (BHD4500 - BHD9000)',
        fr: 'Énergiseur Balkran DUAL Haute Puissance (BHD4500 - BHD9000)',
      },
      descripcion: {
        es: 'Equipo dual 110V/12V con máxima penetración de vegetación y tecnología de protección contra sobretensiones.',
        en: 'Dual 110V/12V unit with maximum vegetation penetration and surge protection technology.',
        fr: 'Équipement double 110 V/12 V à pénétration maximale de la végétation et technologie de protection contre les surtensions.',
      },
      link: '/productos',
    },
  },
  {
    slug: 'san-salvador',
    titulo: {
      es: 'Rancho San Salvador',
      en: 'Rancho San Salvador',
      fr: 'Rancho San Salvador',
    },
    categoria: {
      es: 'EQUINOS',
      en: 'EQUINES',
      fr: 'ÉQUINS',
    },
    ubicacion: {
      es: 'La Libertad, El Salvador',
      en: 'La Libertad, El Salvador',
      fr: 'La Libertad, El Salvador',
    },
    pais: {
      es: 'El Salvador',
      en: 'El Salvador',
      fr: 'Salvador',
    },
    resumen: {
      es: 'Seguridad y tranquilidad garantizada para el manejo, confinamiento y cuidado del ganado equino de alta genética.',
      en: 'Guaranteed security and peace of mind for the handling, confinement and care of high-genetic equine livestock.',
      fr: 'Sécurité et tranquillité garanties pour la gestion, le confinement et les soins des équins de haute génétique.',
    },
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/historias-equinos-elsalvador.webp',
    cliente: {
      es: 'Dra. María José Alvarado',
      en: 'Dr. María José Alvarado',
      fr: 'Dre. María José Alvarado',
    },
    cargoCliente: {
      es: 'Médica Veterinaria y Criadora Equina',
      en: 'Veterinary Doctor and Equine Breeder',
      fr: 'Médecin vétérinaire et éleveuse équine',
    },
    cita: {
      es: 'Para caballos de valor genético superior, la seguridad física es sagrada. Balkran ofrece el impulso exacto que enseña al ejemplar a respetar la línea sin riesgo de cortaduras.',
      en: 'For horses of superior genetic value, physical safety is sacred. Balkran delivers the exact impulse that teaches the animal to respect the line without any risk of cuts.',
      fr: 'Pour des chevaux de valeur génétique supérieure, la sécurité physique est sacrée. Balkran offre l’impulsion exacte qui apprend à l’animal à respecter la ligne sans risque de coupures.',
    },
    fecha: '2024',
    metricas: [
      {
        label: { es: 'Ejemplares Protegidos', en: 'Protected Animals', fr: 'Animaux Protégés' },
        valor: { es: '85 Equinos', en: '85 Horses', fr: '85 Équins' },
        subtexto: { es: 'Caballos de paso y salto', en: 'Gaited and jumping horses', fr: 'Chevaux de marche et de saut' },
      },
      {
        label: { es: 'Lesiones Registradas', en: 'Recorded Injuries', fr: 'Blessures Enregistrées' },
        valor: { es: '0 Incidentes', en: '0 Incidents', fr: '0 Incident' },
        subtexto: { es: 'Seguridad biológica 100%', en: '100% biological safety', fr: 'Sécurité biologique 100 %' },
      },
      {
        label: { es: 'Perímetro Controlado', en: 'Controlled Perimeter', fr: 'Périmètre Contrôlé' },
        valor: { es: '120 km', en: '120 km', fr: '120 km' },
        subtexto: { es: 'Cercas divisorias e hípica', en: 'Dividing and equestrian fencing', fr: 'Clôtures de division et équestres' },
      },
    ],
    desafio: [
      {
        es: 'El ganado equino es altamente sensible y propenso a cortaduras graves cuando intenta atravesar cercados de alambre de púas convencional.',
        en: 'Equine livestock is highly sensitive and prone to serious cuts when trying to get through conventional barbed-wire fencing.',
        fr: 'Les équins sont très sensibles et sujets à de graves coupures lorsqu’ils tentent de traverser les clôtures conventionnelles en fil barbelé.',
      },
      {
        es: 'Se necesitaba delimitar potreros de entrenamiento y descanso sin poner en riesgo la piel, patas ni el temperamento de caballos de competencia.',
        en: 'It was necessary to delimit training and rest paddocks without putting the skin, legs or temperament of competition horses at risk.',
        fr: 'Il fallait délimiter des paddocks d’entraînement et de repos sans mettre en danger la peau, les membres ni le tempérament des chevaux de compétition.',
      },
      {
        es: 'Se requería una solución con pulso regular y señalización visual clara para evitar sustos violentos en los ejemplares.',
        en: 'A solution with a regular pulse and clear visual signaling was required to avoid violent startles in the animals.',
        fr: 'Une solution à impulsion régulière et à signalisation visuelle claire était nécessaire pour éviter les sursauts violents chez les animaux.',
      },
    ],
    solucion: [
      {
        es: 'Instalación de Energizador Balkran B3000 de tecnología controlada con cinta electroplástica de alta visibilidad en tono brillante.',
        en: 'Installation of the Balkran B3000 energizer with controlled technology and high-visibility electroplastic tape in a bright tone.',
        fr: 'Installation de l’énergiseur Balkran B3000 à technologie contrôlée avec ruban électroplastique haute visibilité de couleur vive.',
      },
      {
        es: 'Sustitución completa de alambres de púas por hilos plásticos con filamentos de acero inoxidable Balkran de pulso suave.',
        en: 'Complete replacement of barbed wires with plastic threads featuring soft-pulse Balkran stainless steel filaments.',
        fr: 'Remplacement complet des barbelés par des fils plastiques à filaments d’acier inoxydable Balkran à impulsion douce.',
      },
      {
        es: 'Montaje de aisladores de esquina y paso con esquinas redondeadas anti-impacto.',
        en: 'Assembly of corner and pass insulators with rounded anti-impact corners.',
        fr: 'Montage d’isolateurs de coin et de passage avec des angles arrondis anti-impact.',
      },
    ],
    resultados: [
      {
        es: 'Cero lesiones físicas o cicatrices en la piel de los 85 ejemplares equinos del rancho.',
        en: 'Zero physical injuries or scars on the skin of the ranch’s 85 equine animals.',
        fr: 'Zéro blessure physique ou cicatrice sur la peau des 85 équins du ranch.',
      },
      {
        es: 'Educación conductual inmediata de los potros y sementales hacia la barrera psicológica de la cerca.',
        en: 'Immediate behavioral training of foals and stallions toward the psychological barrier of the fence.',
        fr: 'Éducation comportementale immédiate des poulains et des étalons vers la barrière psychologique de la clôture.',
      },
      {
        es: 'Facilidad de traslado de los cercos móviles para competencias temporales y entrenamientos al aire libre.',
        en: 'Ease of moving the mobile fences for temporary competitions and outdoor training.',
        fr: 'Facilité de déplacement des clôtures mobiles pour les compétitions temporaires et les entraînements en plein air.',
      },
    ],
    productoUsado: {
      nombre: {
        es: 'Energizador Balkran 110V/12V para Equinos y Mascotas (B500 - B3000)',
        en: 'Balkran 110V/12V Energizer for Equines and Pets (B500 - B3000)',
        fr: 'Énergiseur Balkran 110 V/12 V pour Équins et Animaux de Compagnie (B500 - B3000)',
      },
      descripcion: {
        es: 'Impulsor de pulso seguro y constante adaptado a la piel y sensibilidad de ganado equino y mascotas.',
        en: 'Safe, constant-pulse drive adapted to the skin and sensitivity of equine livestock and pets.',
        fr: 'Impulseur à impulsion sûre et constante adapté à la peau et à la sensibilité des équins et des animaux de compagnie.',
      },
      link: '/productos',
    },
  },
  {
    slug: 'hacienda-la-libertad',
    titulo: {
      es: 'Hacienda La Libertad',
      en: 'Hacienda La Libertad',
      fr: 'Hacienda La Libertad',
    },
    categoria: {
      es: 'GANADERÍA SUSTENTABLE',
      en: 'SUSTAINABLE LIVESTOCK',
      fr: 'ÉLEVAGE DURABLE',
    },
    ubicacion: {
      es: 'Duitama, Boyacá, Colombia',
      en: 'Duitama, Boyacá, Colombia',
      fr: 'Duitama, Boyacá, Colombie',
    },
    pais: {
      es: 'Colombia',
      en: 'Colombia',
      fr: 'Colombie',
    },
    resumen: {
      es: 'Pastoreo Voisin de alta densidad con división de 60 potreros mediante energizadores Balkran DUAL de máxima resistencia.',
      en: 'High-density Voisin grazing with 60 paddocks divided using Balkran DUAL energizers of maximum resistance.',
      fr: 'Pâturage Voisin à haute densité avec division de 60 paddocks à l’aide des énergiseurs Balkran DUAL de résistance maximale.',
    },
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/bienestar-vacas-lecheras.webp',
    cliente: {
      es: 'Ing. Fernando Tobón',
      en: 'Eng. Fernando Tobón',
      fr: 'Ing. Fernando Tobón',
    },
    cargoCliente: {
      es: 'Zootecnista y Administrador General',
      en: 'Zootechnician and General Administrator',
      fr: 'Zootechnicien et Administrateur Général',
    },
    cita: {
      es: 'El pastoreo de precisión requiere energía confiable segundo a segundo. Con la tecnología Balkran logramos duplicar la carga animal por hectárea con total tranquilidad.',
      en: 'Precision grazing requires reliable energy second by second. With Balkran technology we managed to double the livestock load per hectare with complete peace of mind.',
      fr: 'Le pâturage de précision exige une énergie fiable à chaque seconde. Avec la technologie Balkran, nous sommes parvenus à doubler la charge animale par hectare en toute sérénité.',
    },
    fecha: '2024',
    metricas: [
      {
        label: { es: 'Potreros en Rotación', en: 'Paddocks in Rotation', fr: 'Paddocks en Rotation' },
        valor: { es: '60 Sectores', en: '60 Sectors', fr: '60 Secteurs' },
        subtexto: { es: 'Sistema Voisin silvopastoril', en: 'Voisin silvopastoral system', fr: 'Système sylvopastoral Voisin' },
      },
      {
        label: { es: 'Aumento Productivo', en: 'Productivity Increase', fr: 'Augmentation de la Productivité' },
        valor: { es: '+45%', en: '+45%', fr: '+45%' },
        subtexto: { es: 'Mayor rendimiento de leche', en: 'Higher milk yield', fr: 'Meilleur rendement laitier' },
      },
      {
        label: { es: 'Energía de Salida', en: 'Output Energy', fr: 'Énergie de Sortie' },
        valor: { es: '18 Joules', en: '18 Joules', fr: '18 Joules' },
        subtexto: { es: 'Línea fija de alta capacidad', en: 'High-capacity fixed line', fr: 'Ligne fixe à haute capacité' },
      },
    ],
    desafio: [
      {
        es: 'Implementar el sistema de Pastoreo Voisin en una finca ganadera de Boyacá requería subdividir el terreno en 60 potreros pequeños con cambios diarios de ganado.',
        en: 'Implementing the Voisin grazing system on a cattle farm in Boyacá required subdividing the land into 60 small paddocks with daily cattle rotations.',
        fr: 'La mise en œuvre du système de pâturage Voisin dans une ferme d’élevage de Boyacá exigeait de subdiviser le terrain en 60 petits paddocks avec des rotations quotidiennes du bétail.',
      },
      {
        es: 'Los interruptores de sector fallaban con humedad en marcas genéricas, haciendo perder el control del pulso eléctrico.',
        en: 'Sector switches from generic brands failed with humidity, causing loss of control of the electrical pulse.',
        fr: 'Les interrupteurs de secteur de marques génériques tombaient en panne avec l’humidité, entraînant une perte de contrôle de l’impulsion électrique.',
      },
      {
        es: 'Se buscaba un proveedor nacional con soporte directo, repuestos inmediatos y respaldo de garantía real.',
        en: 'A national supplier with direct support, immediate spare parts and a real warranty backup was sought.',
        fr: 'On recherchait un fournisseur national avec un support direct, des pièces détachées immédiates et une vraie garantie.',
      },
    ],
    solucion: [
      {
        es: 'Suministro e instalación del energizador estrella Balkran B18000 para grandes extensiones con cuchillas doble tiro por potrero.',
        en: 'Supply and installation of the flagship Balkran B18000 energizer for large areas with double-action blades per paddock.',
        fr: 'Fourniture et installation de l’énergiseur vedette Balkran B18000 pour les grandes étendues, avec lames à double tir par paddock.',
      },
      {
        es: 'Implementación del esquema de polo a tierra tripartito en triángulo con varillas Copperweld de 2 metros.',
        en: 'Implementation of the tripartite triangle grounding scheme with 2-meter Copperweld rods.',
        fr: 'Mise en œuvre du schéma de mise à la terre tripartite en triangle avec des piquets Copperweld de 2 mètres.',
      },
      {
        es: 'Acompañamiento técnico directo del departamento de ingeniería Balkran en Boyacá.',
        en: 'Direct technical support from the Balkran engineering department in Boyacá.',
        fr: 'Accompagnement technique direct du département d’ingénierie Balkran à Boyacá.',
      },
    ],
    resultados: [
      {
        es: 'Incremento del 45% en la producción diaria de litros de leche por hectárea al optimizar los ciclos de descanso del pasto.',
        en: 'A 45% increase in the daily production of liters of milk per hectare by optimizing grass rest cycles.',
        fr: 'Augmentation de 45 % de la production journalière de litres de lait par hectare en optimisant les cycles de repos de l’herbe.',
      },
      {
        es: 'Respuesta inmediata ante mantenimiento gracias a la fábrica de Balkran ubicada en Duitama, Boyacá.',
        en: 'Immediate maintenance response thanks to the Balkran factory located in Duitama, Boyacá.',
        fr: 'Réponse immédiate en cas de maintenance grâce à l’usine Balkran située à Duitama, Boyacá.',
      },
      {
        es: 'Operación ininterrumpida por más de 3 años continuos sin fallas en el módulo central de impulsos.',
        en: 'Uninterrupted operation for more than 3 continuous years without failures in the central pulse module.',
        fr: 'Fonctionnement ininterrompu pendant plus de 3 années consécutives sans panne du module central d’impulsions.',
      },
    ],
    productoUsado: {
      nombre: {
        es: 'Energizador Balkran B18000 Industrial',
        en: 'Balkran B18000 Industrial Energizer',
        fr: 'Énergiseur Balkran B18000 Industriel',
      },
      descripcion: {
        es: 'El equipo de máxima potencia comercial para haciendas extensas y sistemas silvopastoriles de alta densidad.',
        en: 'The highest commercial-power unit for extensive haciendas and high-density silvopastoral systems.',
        fr: 'L’équipement de puissance commerciale maximale pour les grands domaines et les systèmes sylvopastoraux à haute densité.',
      },
      link: '/productos',
    },
  },
];

export function getHistoriaBySlug(slug: string): Historia | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/\/$/, '');
  return historias.find((h) => h.slug.toLowerCase().trim().replace(/\/$/, '') === cleanSlug);
}