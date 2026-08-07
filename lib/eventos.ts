export type EventoImagen = {
  src: string;
  caption?: string;
};

export type EventoSeccion = {
  titulo?: string;
  parrafos?: string[];
  lista?: string[];
  imagenes?: EventoImagen[];
  cita?: string;
};

export type Evento = {
  slug: string;
  titulo: string;
  fecha: string;
  fechaISO: string;
  imagen: string;
  resumen: string;
  pdf?: string;
  pdfLabel?: string;
  esInforme?: boolean;
  categoria: string;
  descripcionCorta: string;
  secciones: EventoSeccion[];
};

export const eventos: Evento[] = [
  {
    slug: 'informe-sociedades-bic-2025',
    titulo: 'Informe Sociedades BIC 2025',
    fecha: '27 de mayo de 2026',
    fechaISO: '2026-05-27',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_bic2025.webp',
    resumen:
      'En BALKRAN INC SAS BIC mantenemos un compromiso permanente con la generación de impacto social y ambiental positivo derivado de nuestras operaciones. Orientamos nuestras acciones hacia el fortalecimiento de las dimensiones de sostenibilidad establecidas en el estándar internacional ISO 26000.',
    pdf: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/Informe-BIC-2025.pdf',
    pdfLabel: 'Ver informe BIC completo (PDF)',
    esInforme: true,
    categoria: 'Informe BIC',
    descripcionCorta:
      'Reporte de gestión BIC 2025 con los resultados de la evaluación en las cinco dimensiones de sostenibilidad bajo la norma ISO 26000.',
    secciones: [
      {
        titulo: 'Resumen informe BIC',
        parrafos: [
          'En BALKRAN INC SAS BIC, mantenemos un compromiso permanente con la generación de impacto social y ambiental positivo derivado de nuestras operaciones. En este sentido, orientamos nuestras acciones hacia el fortalecimiento de las dimensiones de sostenibilidad establecidas en el estándar internacional ISO 26000, integrando principios de responsabilidad social en la gestión organizacional y en la toma de decisiones.',
          'Nuestro propósito institucional se fundamenta en la mejora continua, razón por la cual en cada una de las dimensiones se presentan las actividades ejecutadas durante el periodo evaluado, así como las iniciativas y metas proyectadas para el año 2025. Este enfoque nos permite consolidar una gestión responsable, transparente y sostenible, contribuyendo de manera consistente al desarrollo social, económico y ambiental desde nuestras operaciones y relaciones con los grupos de interés.',
          'De conformidad con lo dispuesto en los artículos 46 y 47 de la Ley 222 de 1995, la administración a través del presente se permite informar sobre el desempeño y estado actual de la sociedad durante el ejercicio fiscal.',
        ],
      },
      {
        titulo: 'Modelo de negocio',
        parrafos: [
          'Para el proceso de abastecimiento, compra y adquisición, se evidencia que la alta proporción de proveedores corresponde a personas jurídicas, las cuales representan el 75,8 % del total, lo que refleja un esquema de contratación estructurado y alineado con prácticas de control financiero, cumplimiento legal y gestión de riesgos en la cadena de suministro.',
        ],
      },
      {
        titulo: 'Gobierno corporativo',
        parrafos: [
          'La organización ha socializado y divulgado su misión a todos los grupos de interés mediante diferentes mecanismos de comunicación, incluyendo reuniones presenciales y espacios grupales, así como a través de los canales digitales institucionales. Entre estos, se destaca la publicación permanente en la página web corporativa, la cual permite garantizar el acceso oportuno a la información estratégica de la empresa.',
          'Se evidencia una participación predominante del talento femenino en la estructura organizacional, con 7 mujeres de un total de 12 colaboradores directivos, lo que representa aproximadamente el 58,3 % de la planta, frente a un 41,7 % de participación masculina.',
          'Se cuenta con la estructura base de la política de diversidad, equidad e inclusión, la cual se alineará a lo establecido en la nueva normatividad para el funcionamiento del comité de convivencia laboral, basado en la resolución 3461 de 2025.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-6.webp', caption: 'Líderes BALKRAN 2025.' }],
      },
      {
        titulo: 'Prácticas laborales',
        parrafos: [
          'Durante el año 2025, la organización fortaleció sus prácticas laborales mediante programas enfocados en el desarrollo del talento humano, el bienestar y la seguridad de los colaboradores. Se implementó la primera Escuela de Liderazgo, dirigida inicialmente a 12 colaboradores, con el propósito de fortalecer habilidades personales y organizacionales y contribuir a la gestión de riesgos psicosociales.',
          'Además, se ejecutaron 13 programas y actividades de formación relacionados con el cumplimiento normativo, la prevención de riesgos laborales, el desarrollo de competencias y el bienestar integral, alineados con el Sistema de Gestión de Seguridad y Salud en el Trabajo.',
          'La organización también promovió la conciliación entre la vida laboral y personal mediante esquemas de flexibilidad horaria, beneficiando a 7 colaboradores con ajustes de jornada según sus necesidades familiares, personales o de salud. Finalmente, se realizaron valoraciones y acompañamientos psicológicos como parte del compromiso con la salud mental y la creación de entornos laborales saludables y seguros.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-7.webp', caption: 'Fotografía cierre escuela de liderazgo BALKRAN.' }],
      },
      {
        titulo: 'Prácticas ambientales',
        parrafos: [
          'La organización fortaleció sus prácticas ambientales mediante alianzas con Urbaser y Reciplanet para la adecuada gestión, recolección y aprovechamiento de residuos. Asimismo, desde 2023 implementa el uso de cartón de segunda mano en los procesos logísticos y de embalaje, con el objetivo de reducir el consumo de materiales nuevos y disminuir el uso de bolsas plásticas.',
          'Como parte de su compromiso con la sostenibilidad, la organización realiza jornadas de sensibilización ambiental enfocadas en el manejo adecuado de residuos, la separación en la fuente y la promoción de prácticas responsables. Además, instaló puntos ecológicos que facilitan la correcta clasificación de residuos y fomentan hábitos sostenibles dentro de la empresa.',
          'De manera complementaria, se desarrollan campañas de concientización mediante charlas y piezas gráficas institucionales en fechas ambientales conmemorativas, fortaleciendo la cultura organizacional orientada al cuidado del medio ambiente y al uso responsable de los recursos naturales.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-11.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-10.webp', caption: 'Registro fotográfico capacitación manejo de residuos - RECIPLANET.' },
        ],
      },
      {
        titulo: 'Prácticas con la comunidad',
        parrafos: [
          'La organización promueve de manera activa la participación de sus colaboradores en prácticas de voluntariado comunitario, fomentando el compromiso social y la solidaridad como pilares de su cultura organizacional. En este marco, se han establecido alianzas con organizaciones locales, orientadas al desarrollo de actividades en beneficio de la comunidad y de poblaciones en condición de vulnerabilidad en el municipio de Duitama.',
          'Adicionalmente, los colaboradores participan de manera voluntaria en diferentes jornadas de impacto social, entre las que se destacan el apoyo en el mejoramiento locativo de instituciones educativas, acompañamiento a adultos mayores en hogares geriátricos, jornadas visuales para la población en general, entrega de obsequios a niños de población vulnerable y la realización de actividades recreativas y de integración dirigidas a niños con discapacidad.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-9.webp', caption: 'Navidad vereda la Trinidad Duitama, con el voluntariado de la directora de talento humano y SG de la empresa.' }],
      },
      {
        titulo: 'Resultado de evaluación BIC - ISO 26000',
        parrafos: [
          'El estándar implementado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para abordar los principios de la responsabilidad social en cada organización.',
          'La estrategia consiste en aplicar y evaluar una herramienta de gestión que permita evidenciar la implementación de actividades que buscan el fortalecimiento organizacional, en los ámbitos de negocio, de gobierno corporativo, prácticas laborales, así como las ambientales.',
        ],
        lista: [
          'Total Puntaje Gobierno Corporativo: 88%',
          'Total Puntaje Modelo de Negocio: 88%',
          'Total Puntaje Prácticas Laborales: 70%',
          'Total Puntaje Prácticas Ambientales: 25%',
          'Total Puntaje Prácticas con la Comunidad: 83%',
          'TOTAL PUNTAJE EVALUACIÓN: 1575 / 2050 - 76,8%',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-8.webp', caption: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC 2025.' }],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2024',
    titulo: 'Informe Sociedades BIC 2024',
    fecha: '29 de mayo de 2025',
    fechaISO: '2025-05-29',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_bic2025.webp',
    resumen:
      'Reporte de gestión BIC 2024: continuamos con el compromiso de ser una sociedad BIC, una responsabilidad continua con el desarrollo sostenible y la aplicación de estrategias que nos ayuden a mejorar día a día y a buscar el beneficio propio y el de nuestras partes.',
    pdf: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/Informe-Sociedades-BIC-2024.pdf',
    pdfLabel: 'Ver informe BIC completo (PDF)',
    esInforme: true,
    categoria: 'Informe BIC',
    descripcionCorta:
      'Reporte de gestión BIC 2024 con los compromisos adquiridos y oportunidades de mejora en las cinco dimensiones de sostenibilidad.',
    secciones: [
      {
        titulo: 'Sobre este informe',
        parrafos: [
          'Este año continuamos con el compromiso de ser una sociedad BIC, es una responsabilidad continua con el desarrollo sostenible y la aplicación de estrategias que nos ayuden a mejorar día a día y a buscar el beneficio propio y el de nuestras partes interesadas. Este informe es un consolidado de cada una de las experiencias y gestiones realizadas como sociedad, iniciando por la mejora continua de cada uno de los aspectos resultantes de la evaluación realizada para el año 2024.',
        ],
      },
      {
        titulo: 'Modelo de negocio',
        parrafos: [
          'De acuerdo con las compras realizadas para el año 2024, la mayoría de estas se realizaron a proveedores locales, es decir de Boyacá, dentro de la clasificación encontramos: el 82% de las compras se realizaron en Duitama, el 4% de las compras realizadas en el Municipio de Sogamoso, el 2% a ciudades como Paipa, Combita, Socha y Sogamoso.',
          'Algunas de las actividades identificadas por la empresa BALKRAN, en esta dimensión, se encuentran: dar continuidad a la Implementación de prácticas de comercio justo, como oportunidades para productores en desventaja económica, transparencia, responsabilidad y rendición de cuentas.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-2.webp', caption: 'Análisis de proveedores BALKRAN 2024.' }],
      },
      {
        titulo: 'Gobierno corporativo',
        parrafos: [
          'La organización contempla directrices de diversidad de género y de acceso a distintas culturas, creencias religiosas diversas, lo anterior para ocupar cargos directivos. Para el año 2024, el 44% del total de los colaboradores eran mujeres y ocupaban cargos Gerenciales, directivos y de coordinación.',
          'Algunas de las actividades identificadas en esta dimensión, se encuentran: establecer políticas o lineamientos, para seguir integrando la diversidad de género e inclusión de personal, para ocupar cargos al interior de la empresa.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-1.webp', caption: 'Análisis de datos personal BALKRAN 2024.' }],
      },
      {
        titulo: 'Prácticas laborales',
        parrafos: [
          'Uno de los objetivos de BALKRAN INC SAS BIC, es ofrecer mejores condiciones para el personal en general, es por ello por lo que se implementan políticas internas de trabajo flexible, en la cual se busca mejorar el desempeño de los colaboradores y la productividad de estos.',
          'Dentro de las modalidades de trabajo que se manejan en la organización, se tienen: Trabajo presencial con el cubrimiento del 84%, trabajo remoto el cual representa el 6% y teletrabajo con el 9%.',
          'En nuestra empresa, valoramos la diversidad y la inclusión. Creemos en un ambiente en donde la diversidad cumple un papel fundamental. En el año 2024, integramos en nuestro grupo de trabajadores a Hamers Méndez, practicante universitario de contaduría pública, quién presentó un accidente cerebro vascular, dejando secuelas en su movilidad; pero esto no ha sido impedimento para desempeñar sus labores de manera eficiente.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-3.webp', caption: 'Análisis de datos personal BALKRAN 2024.' }],
      },
      {
        titulo: 'Prácticas ambientales',
        parrafos: [
          'Dentro de las actividades desarrolladas en esta dimensión, la empresa ha implementado las siguientes: Cuidado energético, manejo y disposición de residuos y prácticas ambientales.',
          'Promovemos buenas prácticas ambientales, a través del voluntariado del personal para la siembra de árboles en diferentes zonas del Municipio de Duitama; esto con el fin de restaurar zonas afectadas por incendios forestales a causa del efecto climático.',
          'Entregamos reconocimientos a algunos colaboradores por emplear vehículos no automotores: el 28,57% de los colaboradores utilizan vehículos no automotores para el desplazamiento al trabajo; uno de los vehículos más utilizados por los mismos son monopatines y bicicletas.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image.webp', caption: 'Equipo BALKRAN en páramo los Agueros.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-1.webp', caption: 'Patineta como vehículo no automotor.' },
        ],
      },
      {
        titulo: 'Prácticas con la comunidad',
        parrafos: [
          'La organización incentiva actividades de voluntariado con los trabajadores; se realizan alianzas con fundaciones locales tales como CLUB ROTARIO de Duitama, que se dedican a actividades en beneficio con la comunidad, personas vulnerables, estudiantes de escasos recursos. Para el año 2024 se realizó el arreglo locativo de una escuela en el Municipio de Duitama y la actividad fue liderada por la Gerente de la empresa BALKRAN.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-2.webp', caption: 'Registro fotográfico, voluntariado gerente general empresa, en el arreglo de escuela la Florida en el Municipio de Duitama.' }],
      },
      {
        titulo: 'Resultado de evaluación BIC - ISO 26000',
        parrafos: [
          'El estándar implementado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para abordar los principios de la responsabilidad social en cada organización.',
        ],
        lista: [
          'Total Puntaje Gobierno Corporativo: 75%',
          'Total Puntaje Modelo de Negocio: 50%',
          'Total Puntaje Prácticas Laborales: 60%',
          'Total Puntaje Prácticas Ambientales: 15%',
          'Total Puntaje Prácticas con la Comunidad: 50%',
          'TOTAL PUNTAJE EVALUACIÓN: 925 / 1500 - 61,7%',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/image-4.webp', caption: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC.' }],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2023',
    titulo: 'Informe Sociedades BIC 2023',
    fecha: '30 de mayo de 2024',
    fechaISO: '2024-05-30',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_bic2023.webp',
    resumen: 'Informe Sociedades BIC 2023: reporte de las actividades realizadas por la empresa en pro del cumplimiento de los objetivos adquiridos como Sociedad de Beneficio e Interés Colectivo.',
    pdf: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/Informe-Sociedades-BIC-2023.pdf',
    pdfLabel: 'Ver informe BIC completo (PDF)',
    esInforme: true,
    categoria: 'Informe BIC',
    descripcionCorta:
      'Reporte de las actividades de beneficio e interés colectivo desarrolladas por Balkran INC. S.A.S BIC durante el año 2023.',
    secciones: [
      {
        titulo: 'Introducción',
        parrafos: [
          'El presente informe se realiza, con el fin de dar a conocer las actividades de beneficio e interés colectivo desarrolladas por la empresa Balkran INC. S.A.S BIC para el año 2023, en las dimensiones de modelo de negocio, gobierno corporativo, prácticas laborales, ambientales y con la comunidad.',
          'BALKRAN INC SAS BIC, está comprometida con la implementación de estrategias, que permitan dar continuidad al compromiso de transparencia y sostenibilidad. Al ser una sociedad que busca el desarrollo del beneficio de interés colectivo, nuestro objetivo es integrar dentro de los objetivos estratégicos, la implementación de actividades que nos permitan seguir contribuyendo a la sociedad, al desarrollo económico de la sociedad y del medio ambiente; todo esto a través de las oportunidades de mejoras detectadas en cada una de las dimensiones.',
        ],
      },
      {
        titulo: 'Modelo de negocios',
        parrafos: [
          'En el proceso de adquisición de bienes o servicios, la empresa tiene en cuenta proveedores y/o contratistas que pertenezcan a mujeres y/o minorías.',
          'La organización promueve programas para que los proveedores se conviertan en dueños colectivos de la sociedad.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/a2censo.webp', caption: 'Programa a2censo, en el que se encuentra vinculado la empresa y cuyos socios son partes interesadas.' }],
      },
      {
        titulo: 'Gobierno corporativo',
        parrafos: [
          'Socializar la misión o propósito con todos los grupos de interés, esto, a través de la página web de la empresa: esta actividad se realiza de manera anual y de acuerdo con los cambios y/o ajustes que surjan en la planeación estratégica.',
          'Socializar los estados financieros de la organización a todos los colaboradores, como parte de la estrategia de transparencia, esto a través de reuniones presenciales.',
          'La organización tiene un manual de funciones para los colaboradores, en el que se relacionan las responsabilidades, autoridades, la formación básica de cada uno de los perfiles, así como los valores y expectativas de las diferentes áreas.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/misionVision.webp', caption: 'Página web de la empresa.' }],
      },
      {
        titulo: 'Prácticas laborales',
        parrafos: [
          'Implementar directriz para la remuneración salarial del personal, basada en antigüedad, cargos y funciones.',
          'Se capacita de manera permanente a los colaboradores de la organización, a través de los diferentes medios dispuestos para tal fin, dentro de estos tenemos: Capacitaciones presenciales con profesionales y expertos en diferentes áreas, a través de nuestra plataforma virtual, diseñada para aportar flexibilidad en los colaboradores; esta plataforma fue creada en el año 2023.',
          'Se han creado opciones para que los trabajadores tengan participación en la sociedad, a través de la adquisición de acciones: se realizó alianza con la bolsa de valores de Colombia y su programa a2senso para creación de Crowdfunding para generar opciones de participación e inversión con utilidades en la empresa.',
          'Desarrollar actividades de bienestar, que generen beneficios en la salud física y mental de los colaboradores.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/EscalaLaboral.webp', caption: 'Registro GH-F-07 Organigrama funcional.' }],
      },
      {
        titulo: 'Prácticas ambientales',
        parrafos: [
          'Socializar todo lo relacionado con la misión social y ambiental.',
          'Utilizar sistemas de iluminación energéticamente eficientes, dispuestos en la oferta de productos, a nuestros clientes.',
          'Promover prácticas para reutilización o disposición de materiales resultantes de los diferentes procesos. Se gestionan convenios con entidades para la recolección de estos.',
          'Concientizar y capacitar a los colaboradores, sobre la importancia de la reutilización de materiales como el plástico y su uso para la fabricación de nuevos productos.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Imagen8.webp', caption: 'Matriz EIA BALKRAN INC SAS BIC.' }],
      },
      {
        titulo: 'Prácticas con la comunidad',
        parrafos: [
          'Generar empleos dignos para personas en situación de vulnerabilidad, teniendo en cuenta que el 23,33% del total de los colaboradores son madres cabeza de familia.',
          'La organización incentiva actividades de voluntariado con los trabajadores, esto a través de alianzas con fundaciones locales que se dedican a actividades en beneficio con la comunidad, personas vulnerables, estudiantes de escasos recursos.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Imagen9.webp', caption: 'Registro fotográfico, equipo femenino BALKRAN, la mayoría madres cabeza de familia.' }],
      },
      {
        titulo: 'Resultado de evaluación BIC - ISO 26000',
        parrafos: [
          'La estrategia consiste en aplicar y evaluar una herramienta de gestión, que permita evidenciar la implementación de actividades que buscan el fortalecimiento organizacional, en los ámbitos de negocio, de gobierno corporativo, prácticas laborales, así como las ambientales.',
        ],
        lista: [
          'Total Puntaje Gobierno Corporativo: 75%',
          'Total Puntaje Modelo de Negocio: 50%',
          'Total Puntaje Prácticas Laborales: 60%',
          'Total Puntaje Prácticas Ambientales: 15%',
          'Total Puntaje Prácticas con la Comunidad: 50%',
          'TOTAL PUNTAJE EVALUACIÓN: 925 / 1550 - 59,7%',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Imagen2-1024x586.webp', caption: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/MG_5234_full-1-1024x521.webp', caption: 'Registro fotográfico, personal BALKRAN 2023.' },
        ],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2022',
    titulo: 'Informe Sociedades BIC 2022',
    fecha: '23 de mayo de 2023',
    fechaISO: '2023-05-23',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_bic2023.webp',
    resumen:
      'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC llevó a cabo el año 2022 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
    pdf: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/Informe-Sociedades-BIC-2022.pdf',
    pdfLabel: 'Ver informe BIC completo (PDF)',
    esInforme: true,
    categoria: 'Informe BIC',
    descripcionCorta:
      'Reporte de las actividades llevadas a cabo durante el año 2022 como Sociedad de Beneficio e Interés Colectivo - BIC.',
    secciones: [
      {
        titulo: 'Introducción',
        parrafos: [
          'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC llevó a cabo el año 2022, en pro del cumplimiento de los objetivos adquiridos, al ser parte de las Sociedades de Beneficio e Interés Colectivo - BIC basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/bic-azul.webp' }],
      },
      {
        titulo: 'Modelo de negocio',
        parrafos: [
          'Implementar prácticas de comercio justo y promover actividades de seguimiento que apoyen el fortalecimiento de los bienes o servicios, suministrados por proveedores; esto a través de nuestro Software interno, para la gestión de terceros.',
          'Adquirir un enfoque empresarial basado en el triple impacto, comprometiéndose con los pilares de: mirada social, impacto ambiental y beneficio económico.',
          'La empresa se vinculó en el año 2022, al programa a2censo, el cual busca impulsar los proyectos de las empresas colombianas; esto, a través de la inclusión de socios que invierten y generan ingresos de manera permanente; para el caso de BALKRAN dos colaboradores se asociaron a este programa, por un período equivalente a 36 meses; generando ganancias por hacer parte del mismo y por contribuir al desarrollo de la empresa.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Terceros-1024x652.webp', caption: 'Software ARES - Módulo Compras.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/a2senso-e1684851427100-1024x473.webp', caption: 'Página web a2censo.' },
        ],
      },
      {
        titulo: 'Gobierno corporativo',
        parrafos: [
          'Nos comprometemos a integrar a nuestros colaboradores con la responsabilidad social y empresarial; a construir una relación empresa/trabajador mediante la concientización de la razón de ser de la organización y la puesta en práctica de los valores de la sociedad; se busca impulsar la igualdad de género en las diferentes actividades y el establecimiento de políticas internas, que ayuden a la interrelación de las áreas.',
        ],
        lista: [
          'Integración de nuestros empleados con la Responsabilidad Social y empresarial.',
          'Construcción de la relación empresa/trabajador mediante los valores.',
          'Socializaciones: se realiza la retroalimentación constante de los objetivos organizacionales.',
          'Contrataciones: el 41% del personal está conformado por mujeres y el 59% por hombres; el 23% del total de los colaboradores son madres cabeza de familia.',
          'Plan de servicio: se promueven actividades en pro de la construcción de un código de ética y la implementación de sistemas de recompensa e incentivos.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Capacitaciones-1024x768.webp', caption: 'Registro fotográfico área de capacitaciones BALKRAN.' }],
      },
      {
        titulo: 'Prácticas laborales',
        parrafos: [
          'Balkran Inc S.A.S BIC como sociedad comercial de beneficio e interés colectivo (BIC) brinda a todos sus colaboradores, la posibilidad de desarrollar y fortalecer sus habilidades teórico/prácticas. Internamente se reconoce el desarrollo de sus labores, a través de la estandarización de escalas salariales; esto, teniendo en cuenta la formación, educación, experiencia dentro de la empresa.',
          'Para BALKRAN, el bienestar de nuestros colaboradores es fundamental, es por ello, que hemos implementado programas de salud y de estilos de vida saludable. Una de las estrategias implementadas en el año 2022 fue la campaña Fruty Day, cuyo propósito fue brindar a los colaboradores una jornada de sensibilización, sobre su alimentación y la regulación de su peso.',
          'Generamos espacios para celebrar aquellos momentos importantes de la vida de nuestros colaboradores y reconocemos la importancia de su labor. Es por ello, que anualmente celebramos fechas especiales, tales como: cumpleaños, cumplimiento de metas laborales, celebración del día de la mujer, día del hombre, celebración de amor y amistad y cierre de fin de año, con nuestra integración anual de personal interno y externo.',
          'De igual manera, se han establecido jornadas de trabajo flexibles, permitiendo a nuestros colaboradores tener la oportunidad de desarrollar sus actividades personales o educativas sin afectar su desempeño laboral. Dentro de las estrategias implementadas, se encuentra el teletrabajo y el ajuste de horario semanal, para el personal que estudia los fines de semana.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/EscalaSalarial.webp', caption: 'Registro GH-F-07 Organigrama funcional.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Fruty-Day.webp', caption: 'Registro fotográfico, jornada de estilos de vida saludable.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Valentina--768x1024.webp', caption: 'Registro fotográfico, celebración y cumpleaños Balkran 2022.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/jEFFERSON-edited.webp', caption: 'Registro fotográfico, celebración y cumpleaños Balkran 2022.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Carolina-edited.webp', caption: 'Registro fotográfico, celebración y cumpleaños Balkran 2022.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Andres-768x1024.webp', caption: 'Registro entrega de incentivos (bonos) de cumpleaños Balkran 2022.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Miguel-768x1024.webp', caption: 'Registro entrega de incentivos (bonos) de cumpleaños Balkran 2022.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Remoto-2-e1684851405436-1024x571.webp', caption: 'Reporte trabajo remoto.' },
        ],
      },
      {
        titulo: 'Prácticas ambientales',
        parrafos: [
          'En Balkran Inc. S.A.S BIC conocemos la importancia de reducir el impacto ambiental negativo que provocan los procesos productivos, es por esto, que aplicamos estrategias, que permiten generar conciencia en el personal y clientes, con el fin de adoptar prácticas que permitan el mejoramiento de la calidad de vida.',
          'En la actualidad un 30% de nuestros trabajadores, emplean medios de transporte no automotores, como la bicicleta, para sus desplazamientos; por esta razón, se implementa un programa que busca incrementar el porcentaje de trabajadores que utilizan medio de transporte ambientalmente sostenible.',
          'Nuestras actividades se basan en el diseño, fabricación y comercialización de energizadores y accesorios para la instalación de cercados eléctricos para ganadería. Dentro de la línea de accesorios, se ofertan paneles solares que permiten iluminar aquellos hogares, en los que la energía eléctrica es limitada o se carece de esta; aprovechar la energía solar para satisfacer las necesidades de iluminación y electricidad de la población en sectores rurales, es uno de nuestros objetivos.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Uso-de-Bicicleta-1024x768.webp', caption: 'Registro fotográfico, personal con vehículo no automotor, del área de metalistería.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/SOLAR-3-.webp', caption: 'Registro fotográfico, instalación de equipo de energía solar, Cunday Tolima.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/SOLAR.webp', caption: 'Registro fotográfico, instalación de equipo de energía solar, Cunday Tolima.' },
        ],
      },
      {
        titulo: 'Prácticas con la comunidad',
        parrafos: [
          'Para nuestra organización el integrar a nuestra fuerza laboral a personas en situación de vulnerabilidad nos permite sensibilizarnos cada día más y conectarnos con las problemáticas de las comunidades en general; es por esto que brindamos la oportunidad a aquellos que atiendan a las diferentes vacantes, priorizando población, tales como madres cabeza de hogar, personal que certifique algún tipo de discapacidad, personas en situación de pobreza, entre otros, siempre y cuando se cumplan con los criterios establecidos para los diferentes perfiles de cargo.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/NosotrosSized.webp', caption: 'Registro fotográfico, personal BALKRAN 2022.' }],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2021',
    titulo: 'Informe Sociedades BIC 2021',
    fecha: '27 de mayo de 2022',
    fechaISO: '2022-05-27',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_bic2023.webp',
    resumen:
      'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC realizó durante el año 2021 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
    pdf: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/ReporteBICBalkran2021.pdf',
    pdfLabel: 'Ver informe BIC completo (PDF)',
    esInforme: true,
    categoria: 'Informe BIC',
    descripcionCorta:
      'Primer reporte de gestión BIC: las actividades realizadas durante el año 2021 como Sociedad de Beneficio e Interés Colectivo.',
    secciones: [
      {
        titulo: 'Introducción',
        parrafos: [
          'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC realizó durante el año 2021 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo - BIC basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
          'El estándar seleccionado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para integrar la responsabilidad social, es decir, el compromiso de una organización ante los impactos que sus decisiones y actividades ocasionan en la sociedad y el medio ambiente, mediante un comportamiento ético que contribuya al desarrollo sostenible.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/bic-azul.webp' }],
      },
      {
        titulo: 'Modelo de negocio',
        parrafos: [
          'Nuestra organización y la dimensión de modelo de negocio tienen que ver en qué manera se ve relacionada con la producción de minorías, el comercio justo y el desarrollo para las relaciones con proveedores locales.',
          'Formularios de desempeño a terceros: para la construcción de relaciones laborales y contratos con proveedores se establecieron unos lineamientos para aplicar en un formato de evaluación (en la plataforma interna de la organización) donde prevalece el tipo o modelo de negocio de cada proveedor, los lineamientos corresponden a cumplimiento con la legislación laboral y ambiental vigente, que la empresa sea liderada por mujeres o minorías, y/o empresas familiares o microempresas, dependiendo de esos lineamientos y la evaluación se dan preferencias para establecer las relaciones comerciales con nuestros proveedores.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/ModeloNegocio-1-1024x616.webp', caption: 'Software ARES - Módulo de compras.' }],
      },
      {
        titulo: 'Gobierno corporativo',
        parrafos: [
          'Esta dimensión relaciona a nuestra organización con los principios de rendición de cuentas y la transparencia además de como damos a conocer esas políticas a nuestros empleados por medio de actividades y/o planes de acción con el fin de que nuestros empleados tengan más conocimiento sobre nuestra organización.',
          'Socializaciones: mediante esta metodología hemos divulgado la misión y demás aspectos organizacionales (Plan estratégico) a nuestros empleados tanto a nuevos como antiguos, todo con el fin de mantenerlos enfocados hacia los mismos objetivos trazados por la organización.',
          'Contrataciones: el 44% del personal está conformado por mujeres y el 56% por hombres, en nuestras contrataciones se busca principalmente la equidad de género por eso tenemos directrices sobre la igualdad para la elección de puestos directivos.',
          'Plan de servicio: hemos consignado un sin número de políticas dentro de las cuales se detalla la construcción de un código de ética basado en los valores organizacionales y como mediante un sistema de recompensa del Empleado del mes, se destaca la aplicabilidad de dichos valores.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/GobiernoCorporativo.webp', caption: 'Proceso de gestión humana - GH-M-02 Plan de Bienestar.' }],
      },
      {
        titulo: 'Prácticas laborales',
        parrafos: [
          'Para Balkran Inc. S.A.S BIC como sociedad comercial de Beneficio e Interés Colectivo (BIC), es de vital importancia contribuir al cumplimiento de las metas de los Objetivos de Desarrollo Sostenible (ODS), proporcionando a todos los trabajadores en las distintas etapas de su experiencia laboral el acceso al desarrollo de habilidades, formación y aprendizaje práctico.',
          'Hemos incluido en nuestro GH-M-01 Manual de funciones y perfiles de cargo, una tabla salarial con estándares de equidad de acuerdo al objetivo #8 de los ODS, el cual pretende lograr el empleo pleno y productivo y garantizar un trabajo decente para todos los hombres y mujeres.',
          'En Balkran nos tomamos muy en serio el bienestar de nuestros colaboradores, es por esto que hemos ampliado sus planes de salud y beneficios de bienestar, diseñando e implementando estrategias de nutrición, salud mental y física orientados a generar un equilibrio entre la vida laboral y personal de nuestro talento humano. Una de las estrategias implementadas hasta el momento es la jornada de masajes de relajación empresarial.',
          'Adicionalmente, la comunicación e integración de nuestro talento humano es fundamental para un ambiente de trabajo sano, eficaz y eficiente, es por esto que realizamos salidas empresariales en diferentes municipios a nivel departamental.',
          'Hemos establecido un manual de flexibilidad laboral en el cual se estipulan opciones de empleo que permiten a nuestros colaboradores tener la oportunidad de desarrollar sus actividades personales o educativas sin afectar su desempeño y desarrollo laboral, como la modalidad de teletrabajo y jornadas de trabajo remoto.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/SaludFisica1.webp', caption: 'Registro fotográfico, jornada de promoción y prevención instalaciones del tercer piso BALKRAN INC S.A.S. BIC - 2021.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/SaludMental1.webp', caption: 'Registro fotográfico, jornadas de bienestar Balkran - 2021.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/SalidasEmpresariales2.webp', caption: 'Registro fotográfico, salidas empresariales Balkran - 2021.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Actividades1.webp', caption: 'Registro fotográfico, celebración y cumpleaños Balkran - 2021.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Teletrabajo2.webp', caption: 'Registro fotográfico, jornadas de teletrabajo Balkran.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Capacitacion2.webp', caption: 'Registro fotográfico, jornadas de capacitación Balkran.' },
        ],
      },
      {
        titulo: 'Prácticas ambientales',
        parrafos: [
          'En Balkran Inc. S.A.S BIC conocemos la importancia de reducir el impacto ambiental negativo que provocan los procesos productivos, es por esto, que hemos comenzado a aplicar medidas sencillas dentro de la actividad económica que realizamos.',
          'En la actualidad un 40% de nuestros trabajadores, emplean medios de transporte como la bicicleta, para su desplazamiento, teniendo en cuenta que los trayectos de sus viviendas a la empresa no representan distancias demasiado largas.',
          'Parte de nuestra actividad económica se basa en el diseño, fabricación y comercialización de energizadores y accesorios para la instalación de paneles solares y baterías que permitan aprovechar la energía solar para satisfacer las necesidades de iluminación y electricidad de las poblaciones en sectores rurales.',
          'En el año 2021, realizamos una jornada de recolección de botellas plásticas para la elaboración de transformadores, cuya función principal es generar los pulsos de corriente de nuestros energizadores. En la actividad realizada, se recolectaron en total 115 botellas plásticas de 1.5 y 3 litros proporcionadas por los trabajadores de la organización.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Transporte-1024x768.webp', caption: 'Registro fotográfico, área de metalistería Balkran.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/WhatsApp-Image-2022-05-27-at-4.52.05-PM-1024x768.webp', caption: 'Registro fotográfico, instalación de Energizador en IENTAC - CAMPOHERMOSO.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/BotellasPlasticas1.webp', caption: 'Registro fotográfico, elaboración de transformadores para cerca eléctrica tercer piso Balkran.' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/BotellasPlasticas2.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/BotellasPlasticas3.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/BotellasPlasticas5.webp' },
        ],
      },
      {
        titulo: 'Prácticas con la comunidad',
        parrafos: [
          'Para nuestra organización el integrar a nuestra fuerza laboral a personas en situación de vulnerabilidad nos permite sensibilizarnos cada día más y conectarnos con las problemáticas de aquellas comunidades, es por esto que generamos beneficios a estas poblaciones al permitirles conocer y desarrollar sus habilidades, al mismo tiempo que contribuimos al mejoramiento de su calidad de vida.',
          'Balkran Inc. S.A.S BIC ha generado empleo en su mayoría para madres cabeza de hogar brindándoles un sustento económico con el cual pueden cumplir con sus obligaciones de apoyo, cuidado y manutención a sus familias.',
        ],
      },
      {
        titulo: 'Conclusiones',
        parrafos: [
          'Para Balkran Inc. S.A.S BIC el implementar una herramienta de evaluación y gestión como lo es el reporte de sociedades BIC es de gran ayuda ya que nos permite realizar un diagnóstico de nuestra organización en los aspectos relacionados con nuestra actividad comercial y económica y las acciones concretas que realizamos en beneficio del bienestar de nuestros trabajadores, el aporte que le hacemos a la equidad social de nuestro país y por supuesto la participación que tenemos en el camino de la protección y conservación del medio ambiente.',
          'Estas dimensiones son una sinergia que tiene como único objetivo permitir a nuestra organización operar de forma integral proporcionando un desarrollo de nuestras actividades con impactos positivos tanto en un entorno externo como interno, concediéndonos, de acuerdo al resultado de este reporte, precisar en qué estado nos encontramos, y a partir de ello, establecer unos programas de acciones diseñados para contrarrestar las falencias y convertirlas en oportunidades de mejora para nuestra organización.',
        ],
      },
    ],
  },
  {
    slug: '4to-congreso-de-sostenibilidad',
    titulo: '4to Congreso de Sostenibilidad',
    fecha: '29 de abril de 2022',
    fechaISO: '2022-04-29',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_congreso.webp',
    resumen:
      'La Asociación Bancaria y de Entidades Financieras de Colombia, Asobancaria, es el gremio más representativo del sector financiero colombiano, dedicada a proteger, ampliar, mejorar y representar los intereses económicos entre las entidades y las empresas colombianas.',
    categoria: 'Evento',
    descripcionCorta:
      'Balkran participó en la mesa de negocios del 4to Congreso de Sostenibilidad, destacando sus soluciones solares.',
    secciones: [
      {
        parrafos: [
          'La Asociación Bancaria y de Entidades Financieras de Colombia, Asobancaria, es el gremio más representativo del sector financiero colombiano, esta entidad está dedicada a proteger, ampliar, mejorar y representar, los intereses económicos entre las entidades y las empresas colombianas.',
        ],
      },
      {
        parrafos: [
          'Debido a este gran trabajo crearon esta rueda de negocios donde se pudieran encontrar los diferentes protagonistas del desarrollo económico del país, teniendo especial atención a todos los entes que promueven el desarrollo de actividades que aporten a la sostenibilidad ambiental, algo fundamental para todo el mundo.',
          'Nuestra empresa Balkran INC S.A.S BIC se ha destacado por integrar soluciones solares a todos nuestros productos y servicios, aportando eficiencia y ser amigables con el medio ambiente, fuimos partícipes y se crearon grandes expectativas comerciales, técnicas y de negocios.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Congreso2.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/Congreso1.webp', caption: 'Mesa de Negocios 29 abril del 2022.' },
        ],
      },
    ],
  },
  {
    slug: 'expobic-2022',
    titulo: 'ExpoBIC 2022',
    fecha: '8 de abril de 2022',
    fechaISO: '2022-04-08',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_expobic.webp',
    resumen:
      'Balkran INC S.A.S BIC estuvo presente en el desarrollo de las actividades de la feria empresarial de las Sociedades Comerciales de Beneficio e Interés Colectivo, o Sociedades BIC. En este evento se destacan las empresas que combinan las ventajas de su actividad comercial con acciones concretas para propender por el bienestar.',
    categoria: 'Evento',
    descripcionCorta:
      'Balkran INC S.A.S fue reconocida como empresa BIC en la feria empresarial ExpoBIC 2022, realizada del 5 al 7 de abril.',
    secciones: [
      {
        parrafos: [
          'Balkran INC S.A.S BIC estuvo presente en el desarrollo de las actividades de la feria empresarial de Las Sociedades Comerciales de Beneficio e Interés Colectivo, o Sociedades BIC.',
          'En este evento se destacan las empresas que se proponen combinar las ventajas de su actividad comercial y económica con acciones concretas para propender por el bienestar de sus trabajadores, aportar a la equidad social del país y contribuir a la protección del medio ambiente.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/ExpoBIC4-1-266x300.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/ExpoBIC2-225x300.webp' },
        ],
      },
      {
        parrafos: [
          'Balkran INC S.A.S fue reconocida como empresa BIC resaltando el valor de ser sostenible por su labor en el ecosistema empresarial.',
        ],
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/ExpoBIC1-768x1024.webp' }],
      },
      {
        parrafos: [
          'Balkran INC S.A.S BIC acompañó este gran evento llevando una muestra de nuestros productos y soluciones solares, apoyando desde nuestro sector, en el crecimiento de estas grandes alternativas de promoción a nivel nacional y entre las empresas que comparten este modelo de negocio, presentes en los grandes eventos de nuestro país.',
        ],
        cita: 'Balkran INC S.A.S BIC asistió a la feria empresarial ExpoBIC 2022 realizada del 5 al 7 de abril del 2022.',
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/ExpoBIC6-1024x461.webp', caption: 'ExpoBIC 2022.' }],
      },
    ],
  },
  {
    slug: 'macrorrueda-90-cali',
    titulo: 'Macrorrueda 90 Cali',
    fecha: '1 de abril de 2022',
    fechaISO: '2022-04-01',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_macrorrueda.webp',
    resumen:
      'Es el espacio comercial más importante de internacionalización del país, en donde exportadores colombianos y compradores internacionales llevan a cabo citas de negocio. Este año ProColombia cumplió 30 años, por lo que este encuentro se llevó a cabo en Cali, reuniendo a más de 3.000 empresarios nacionales e internacionales.',
    categoria: 'Evento',
    descripcionCorta:
      'Balkran participó en la Macrorrueda 90 de ProColombia en Cali, el espacio comercial más importante de internacionalización del país.',
    secciones: [
      {
        parrafos: [
          'Es el espacio comercial más importante de internacionalización del país, en donde exportadores colombianos y compradores internacionales llevan a cabo citas de negocio.',
          'Este año ProColombia está cumpliendo 30 años por lo que este encuentro se llevó a cabo en Cali, reuniendo a más de 3.000 empresarios nacionales e internacionales.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/M4-1024x768.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/M3-1024x768.webp' },
        ],
      },
      {
        parrafos: [
          'Esta actividad hace parte de la estrategia para la diversificación de mercados y de promoción de la oferta exportable de las empresas colombianas, entre las cuales se encuentra nuestra empresa por lo que se nos permitió presentar a otros países y a otros mercados la calidad de nuestros equipos y servicios, además de la capacidad de ser competitivos a nivel mundial.',
          'Con esta actividad fue posible realizar contacto con países como: México, Panamá, Ecuador, Estados Unidos, Perú, Surinam, Venezuela, El Salvador y Guatemala.',
          'Estamos orgullosos de representar a nuestro país y seguir avanzando en la expansión de nuestra empresa.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/M1-768x1024.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/M2-768x1024.webp' },
        ],
      },
      {
        cita: '31 de marzo y 1 de abril de 2022. ProColombia es un guía y aliado en el desarrollo de todas las actividades de exportación de Balkran INC S.A.S BIC.',
        imagenes: [{ src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/M5-576x1024.webp' }],
      },
    ],
  },
  {
    slug: 'agroexpo-2021',
    titulo: 'AgroExpo 2021',
    fecha: '2 de noviembre de 2021',
    fechaISO: '2021-11-02',
    imagen: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/evento_agroexpo.webp',
    resumen:
      'Agroexpo ha sido la feria más importante reuniendo al sector agropecuario a lo largo de 40 años, logrando consolidarse como la más representativa en Centroamérica y el Caribe. A pesar de las dificultades presentadas a causa de la pandemia por SARS CoV-2 se pudo realizar este evento, que cada 2 años busca consolidar el sector.',
    categoria: 'Evento',
    descripcionCorta:
      'Balkran acompañó al sector agropecuario en AgroExpo 2021, llevando todas sus soluciones, en especial la línea solar.',
    secciones: [
      {
        parrafos: [
          'Agroexpo ha sido la feria más importante reuniendo al sector agropecuario a lo largo de 40 años, logrando consolidarse como la más representativa en Centroamérica y el Caribe. A pesar de las dificultades que se presentaron a causa de la pandemia por SARS CoV-2 se pudo realizar este evento, el cual cada 2 años busca abrir las puertas para la promoción y generación de negocios y contactos comerciales entre todos los protagonistas del gran mercado colombiano y de paso fortalecen la integración de nuevas tecnologías como ventas por redes y otras formas alternas de comercio.',
        ],
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo1-1024x768.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo2-1024x768.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo8-1024x768.webp' },
        ],
      },
      {
        parrafos: [
          'Balkran INC S.A.S acompañó a los sectores de agricultura y ganadería de Colombia, llevando todas nuestras soluciones, en especial nuestra línea solar.',
          'Fueron 11 días donde compartimos experiencia, conocimos nuevos desarrollos y aportamos en el mejoramiento y tecnificación del campo colombiano.',
        ],
        cita: '22 de octubre al 1 de noviembre de 2021.',
        imagenes: [
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo5-1024x461.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo3-576x1024.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo4-576x1024.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo6-576x1024.webp' },
          { src: 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/eventos/AgroExpo7-576x1024.webp' },
        ],
      },
    ],
  },
];

export function getEventoBySlug(slug: string): Evento | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/\/$/, '');
  return eventos.find((e) => e.slug.toLowerCase().trim().replace(/\/$/, '') === cleanSlug);
}

export function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
