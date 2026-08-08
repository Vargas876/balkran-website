import { L10n, Lang } from '@/lib/i18n';

const R2 = 'https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images';

export type EventoImagen = {
  src: string;
  caption?: L10n | undefined;
};

export type EventoSeccion = {
  titulo?: L10n;
  parrafos?: L10n[];
  lista?: L10n[];
  imagenes?: EventoImagen[];
  cita?: L10n | undefined;
};

export type Evento = {
  slug: string;
  titulo: L10n;
  fecha: L10n;
  fechaISO: string;
  imagen: string;
  resumen: L10n;
  pdf?: string;
  pdfLabel?: L10n;
  esInforme?: boolean;
  categoria: L10n;
  descripcionCorta: L10n;
  secciones: EventoSeccion[];
};

export const eventos: Evento[] = [
  {
    slug: 'informe-sociedades-bic-2025',
    titulo: { es: 'Informe Sociedades BIC 2025', en: 'BIC Companies Report 2025', fr: 'Rapport Sociétés BIC 2025' },
    fecha: { es: '27 de mayo de 2026', en: 'May 27, 2026', fr: '27 mai 2026' },
    fechaISO: '2026-05-27',
    imagen: `${R2}/evento_bic2025.webp`,
    resumen: {
      es: 'En BALKRAN INC SAS BIC mantenemos un compromiso permanente con la generación de impacto social y ambiental positivo derivado de nuestras operaciones. Orientamos nuestras acciones hacia el fortalecimiento de las dimensiones de sostenibilidad establecidas en el estándar internacional ISO 26000.',
      en: 'At BALKRAN INC SAS BIC we maintain an ongoing commitment to generating positive social and environmental impact derived from our operations. We orient our actions toward strengthening the sustainability dimensions established in the international standard ISO 26000.',
      fr: 'Chez BALKRAN INC SAS BIC, nous maintenons un engagement permanent dans la génération d\'un impact social et environnemental positif issu de nos opérations. Nous orientons nos actions vers le renforcement des dimensions de durabilité établies dans la norme internationale ISO 26000.',
    },
    pdf: `${R2}/Informe-BIC-2025.pdf`,
    pdfLabel: { es: 'Ver informe BIC completo (PDF)', en: 'View complete BIC report (PDF)', fr: 'Voir le rapport BIC complet (PDF)' },
    esInforme: true,
    categoria: { es: 'Informe BIC', en: 'BIC Report', fr: 'Rapport BIC' },
    descripcionCorta: {
      es: 'Reporte de gestión BIC 2025 con los resultados de la evaluación en las cinco dimensiones de sostenibilidad bajo la norma ISO 26000.',
      en: 'BIC 2025 management report with the results of the assessment in the five sustainability dimensions under the ISO 26000 standard.',
      fr: 'Rapport de gestion BIC 2025 avec les résultats de l\'évaluation dans les cinq dimensions de durabilité selon la norme ISO 26000.',
    },
    secciones: [
      {
        titulo: { es: 'Resumen informe BIC', en: 'BIC report summary', fr: 'Résumé du rapport BIC' },
        parrafos: [
          {
            es: 'En BALKRAN INC SAS BIC, mantenemos un compromiso permanente con la generación de impacto social y ambiental positivo derivado de nuestras operaciones. En este sentido, orientamos nuestras acciones hacia el fortalecimiento de las dimensiones de sostenibilidad establecidas en el estándar internacional ISO 26000, integrando principios de responsabilidad social en la gestión organizacional y en la toma de decisiones.',
            en: 'At BALKRAN INC SAS BIC, we maintain an ongoing commitment to generating positive social and environmental impact derived from our operations. In this sense, we orient our actions toward strengthening the sustainability dimensions established in the international standard ISO 26000, integrating social responsibility principles into organizational management and decision-making.',
            fr: 'Chez BALKRAN INC SAS BIC, nous maintenons un engagement permanent dans la génération d\'un impact social et environnemental positif issu de nos opérations. Dans ce sens, nous orientons nos actions vers le renforcement des dimensions de durabilité établies dans la norme internationale ISO 26000, en intégrant des principes de responsabilité sociale dans la gestion organisationnelle et la prise de décisions.',
          },
          {
            es: 'Nuestro propósito institucional se fundamenta en la mejora continua, razón por la cual en cada una de las dimensiones se presentan las actividades ejecutadas durante el periodo evaluado, así como las iniciativas y metas proyectadas para el año 2025. Este enfoque nos permite consolidar una gestión responsable, transparente y sostenible, contribuyendo de manera consistente al desarrollo social, económico y ambiental desde nuestras operaciones y relaciones con los grupos de interés.',
            en: 'Our institutional purpose is grounded in continuous improvement, which is why each of the dimensions presents the activities carried out during the period assessed, as well as the initiatives and goals projected for the year 2025. This approach allows us to consolidate responsible, transparent and sustainable management, consistently contributing to social, economic and environmental development through our operations and relationships with stakeholders.',
            fr: 'Notre objectif institutionnel repose sur l\'amélioration continue, raison pour laquelle chacune des dimensions présente les activités exécutées au cours de la période évaluée, ainsi que les initiatives et objectifs projetés pour l\'année 2025. Cette approche nous permet de consolider une gestion responsable, transparente et durable, en contribuant de manière constante au développement social, économique et environnemental à partir de nos opérations et de nos relations avec les parties prenantes.',
          },
          {
            es: 'De conformidad con lo dispuesto en los artículos 46 y 47 de la Ley 222 de 1995, la administración a través del presente se permite informar sobre el desempeño y estado actual de la sociedad durante el ejercicio fiscal.',
            en: 'In accordance with the provisions of articles 46 and 47 of Law 222 of 1995, management hereby informs of the performance and current status of the company during the fiscal year.',
            fr: 'Conformément aux dispositions des articles 46 et 47 de la Loi 222 de 1995, la direction informe par la présente de la performance et de l\'état actuel de la société au cours de l\'exercice fiscal.',
          },
        ],
      },
      {
        titulo: { es: 'Modelo de negocio', en: 'Business model', fr: 'Modèle d\'affaires' },
        parrafos: [
          {
            es: 'Para el proceso de abastecimiento, compra y adquisición, se evidencia que la alta proporción de proveedores corresponde a personas jurídicas, las cuales representan el 75,8 % del total, lo que refleja un esquema de contratación estructurado y alineado con prácticas de control financiero, cumplimiento legal y gestión de riesgos en la cadena de suministro.',
            en: 'For the sourcing, purchase and acquisition process, it is evident that the high proportion of suppliers corresponds to legal entities, which represent 75.8% of the total, reflecting a structured contracting scheme aligned with financial control practices, legal compliance and risk management in the supply chain.',
            fr: 'Pour le processus d\'approvisionnement, d\'achat et d\'acquisition, il est évident qu\'une forte proportion de fournisseurs correspond à des personnes morales, lesquelles représentent 75,8 % du total, ce qui reflète un schéma de contractualisation structuré et aligné sur des pratiques de contrôle financier, de conformité légale et de gestion des risques dans la chaîne d\'approvisionnement.',
          },
        ],
      },
      {
        titulo: { es: 'Gobierno corporativo', en: 'Corporate governance', fr: 'Gouvernance d\'entreprise' },
        parrafos: [
          {
            es: 'La organización ha socializado y divulgado su misión a todos los grupos de interés mediante diferentes mecanismos de comunicación, incluyendo reuniones presenciales y espacios grupales, así como a través de los canales digitales institucionales. Entre estos, se destaca la publicación permanente en la página web corporativa, la cual permite garantizar el acceso oportuno a la información estratégica de la empresa.',
            en: 'The organization has shared and disclosed its mission to all stakeholder groups through different communication mechanisms, including in-person meetings and group spaces, as well as through institutional digital channels. Among these, the ongoing publication on the corporate website stands out, which guarantees timely access to the company\'s strategic information.',
            fr: 'L\'organisation a communiqué et divulgué sa mission à toutes les parties prenantes à travers différents mécanismes de communication, notamment des réunions en présentiel et des espaces de groupe, ainsi que par les canaux numériques institutionnels. Parmi ceux-ci se distingue la publication permanente sur le site Web corporatif, qui garantit un accès opportun à l\'information stratégique de l\'entreprise.',
          },
          {
            es: 'Se evidencia una participación predominante del talento femenino en la estructura organizacional, con 7 mujeres de un total de 12 colaboradores directivos, lo que representa aproximadamente el 58,3 % de la planta, frente a un 41,7 % de participación masculina.',
            en: 'There is a predominant participation of female talent in the organizational structure, with 7 women out of a total of 12 management collaborators, which represents approximately 58.3% of the workforce, compared to 41.7% male participation.',
            fr: 'On constate une participation prédominante du talent féminin dans la structure organisationnelle, avec 7 femmes sur un total de 12 collaborateurs de direction, ce qui représente environ 58,3 % de l\'effectif, contre 41,7 % de participation masculine.',
          },
          {
            es: 'Se cuenta con la estructura base de la política de diversidad, equidad e inclusión, la cual se alineará a lo establecido en la nueva normatividad para el funcionamiento del comité de convivencia laboral, basado en la resolución 3461 de 2025.',
            en: 'The organization has the base structure of the diversity, equity and inclusion policy, which will be aligned with the new regulations for the operation of the workplace coexistence committee, based on Resolution 3461 of 2025.',
            fr: 'La structure de base de la politique de diversité, d\'équité et d\'inclusion est en place, laquelle sera alignée sur les nouvelles dispositions réglementaires pour le fonctionnement du comité de coexistence au travail, fondées sur la résolution 3461 de 2025.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-6.webp`, caption: { es: 'Líderes BALKRAN 2025.', en: 'BALKRAN 2025 leaders.', fr: 'Leaders BALKRAN 2025.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas laborales', en: 'Labor practices', fr: 'Pratiques de travail' },
        parrafos: [
          {
            es: 'Durante el año 2025, la organización fortaleció sus prácticas laborales mediante programas enfocados en el desarrollo del talento humano, el bienestar y la seguridad de los colaboradores. Se implementó la primera Escuela de Liderazgo, dirigida inicialmente a 12 colaboradores, con el propósito de fortalecer habilidades personales y organizacionales y contribuir a la gestión de riesgos psicosociales.',
            en: 'During 2025, the organization strengthened its labor practices through programs focused on human talent development, well-being and employee safety. The first Leadership School was implemented, initially aimed at 12 collaborators, with the purpose of strengthening personal and organizational skills and contributing to psychosocial risk management.',
            fr: 'Au cours de l\'année 2025, l\'organisation a renforcé ses pratiques de travail grâce à des programmes axés sur le développement du talent humain, le bien-être et la sécurité des collaborateurs. La première École de leadership a été mise en œuvre, initialement destinée à 12 collaborateurs, dans le but de renforcer les compétences personnelles et organisationnelles et de contribuer à la gestion des risques psychosociaux.',
          },
          {
            es: 'Además, se ejecutaron 13 programas y actividades de formación relacionados con el cumplimiento normativo, la prevención de riesgos laborales, el desarrollo de competencias y el bienestar integral, alineados con el Sistema de Gestión de Seguridad y Salud en el Trabajo.',
            en: 'In addition, 13 training programs and activities were carried out related to regulatory compliance, occupational risk prevention, skills development and comprehensive well-being, aligned with the Occupational Safety and Health Management System.',
            fr: 'En outre, 13 programmes et activités de formation ont été exécutés, liés à la conformité réglementaire, à la prévention des risques professionnels, au développement des compétences et au bien-être intégral, alignés sur le Système de gestion de la sécurité et de la santé au travail.',
          },
          {
            es: 'La organización también promovió la conciliación entre la vida laboral y personal mediante esquemas de flexibilidad horaria, beneficiando a 7 colaboradores con ajustes de jornada según sus necesidades familiares, personales o de salud. Finalmente, se realizaron valoraciones y acompañamientos psicológicos como parte del compromiso con la salud mental y la creación de entornos laborales saludables y seguros.',
            en: 'The organization also promoted work-life balance through flexible scheduling schemes, benefiting 7 collaborators with schedule adjustments according to their family, personal or health needs. Finally, psychological assessments and support were carried out as part of the commitment to mental health and the creation of healthy and safe work environments.',
            fr: 'L\'organisation a également favorisé la conciliation entre vie professionnelle et vie personnelle grâce à des dispositifs d\'horaires flexibles, au bénéfice de 7 collaborateurs avec des ajustements de journée selon leurs besoins familiaux, personnels ou de santé. Enfin, des évaluations et accompagnements psychologiques ont été réalisés dans le cadre de l\'engagement en faveur de la santé mentale et de la création d\'environnements de travail sains et sûrs.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-7.webp`, caption: { es: 'Fotografía cierre escuela de liderazgo BALKRAN.', en: 'Photo of the closing of the BALKRAN leadership school.', fr: 'Photographie de clôture de l\'école de leadership BALKRAN.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas ambientales', en: 'Environmental practices', fr: 'Pratiques environnementales' },
        parrafos: [
          {
            es: 'La organización fortaleció sus prácticas ambientales mediante alianzas con Urbaser y Reciplanet para la adecuada gestión, recolección y aprovechamiento de residuos. Asimismo, desde 2023 implementa el uso de cartón de segunda mano en los procesos logísticos y de embalaje, con el objetivo de reducir el consumo de materiales nuevos y disminuir el uso de bolsas plásticas.',
            en: 'The organization strengthened its environmental practices through alliances with Urbaser and Reciplanet for the proper management, collection and recovery of waste. Likewise, since 2023 it has implemented the use of second-hand cardboard in logistics and packaging processes, with the aim of reducing the consumption of new materials and reducing the use of plastic bags.',
            fr: 'L\'organisation a renforcé ses pratiques environnementales grâce à des alliances avec Urbaser et Reciplanet pour la gestion, la collecte et la valorisation adéquates des déchets. De même, depuis 2023, elle utilise du carton de réemploi dans les processus logistiques et d\'emballage, afin de réduire la consommation de nouveaux matériaux et de diminuer l\'utilisation de sacs en plastique.',
          },
          {
            es: 'Como parte de su compromiso con la sostenibilidad, la organización realiza jornadas de sensibilización ambiental enfocadas en el manejo adecuado de residuos, la separación en la fuente y la promoción de prácticas responsables. Además, instaló puntos ecológicos que facilitan la correcta clasificación de residuos y fomentan hábitos sostenibles dentro de la empresa.',
            en: 'As part of its commitment to sustainability, the organization carries out environmental awareness sessions focused on proper waste management, source separation and the promotion of responsible practices. In addition, it installed ecological points that facilitate the correct sorting of waste and foster sustainable habits within the company.',
            fr: 'Dans le cadre de son engagement en faveur de la durabilité, l\'organisation organise des journées de sensibilisation environnementale axées sur la gestion adéquate des déchets, le tri à la source et la promotion de pratiques responsables. De plus, elle a installé des points écologiques qui facilitent le tri correct des déchets et encouragent des habitudes durables au sein de l\'entreprise.',
          },
          {
            es: 'De manera complementaria, se desarrollan campañas de concientización mediante charlas y piezas gráficas institucionales en fechas ambientales conmemorativas, fortaleciendo la cultura organizacional orientada al cuidado del medio ambiente y al uso responsable de los recursos naturales.',
            en: 'In a complementary manner, awareness campaigns are developed through talks and institutional graphic pieces on commemorative environmental dates, strengthening the organizational culture oriented toward environmental care and the responsible use of natural resources.',
            fr: 'De manière complémentaire, des campagnes de sensibilisation sont développées à travers des conférences et des pièces graphiques institutionnelles lors de dates environnementales commémoratives, renforçant la culture organisationnelle orientée vers la protection de l\'environnement et l\'utilisation responsable des ressources naturelles.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-11.webp` },
          { src: `${R2}/eventos/image-10.webp`, caption: { es: 'Registro fotográfico capacitación manejo de residuos - RECIPLANET.', en: 'Photographic record of waste management training - RECIPLANET.', fr: 'Registre photographique de la formation sur la gestion des déchets - RECIPLANET.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas con la comunidad', en: 'Community practices', fr: 'Pratiques communautaires' },
        parrafos: [
          {
            es: 'La organización promueve de manera activa la participación de sus colaboradores en prácticas de voluntariado comunitario, fomentando el compromiso social y la solidaridad como pilares de su cultura organizacional. En este marco, se han establecido alianzas con organizaciones locales, orientadas al desarrollo de actividades en beneficio de la comunidad y de poblaciones en condición de vulnerabilidad en el municipio de Duitama.',
            en: 'The organization actively promotes the participation of its collaborators in community volunteering practices, fostering social commitment and solidarity as pillars of its organizational culture. Within this framework, alliances have been established with local organizations, aimed at developing activities for the benefit of the community and vulnerable populations in the municipality of Duitama.',
            fr: 'L\'organisation promeut activement la participation de ses collaborateurs à des pratiques de bénévolat communautaire, en favorisant l\'engagement social et la solidarité comme piliers de sa culture organisationnelle. Dans ce cadre, des alliances ont été établies avec des organisations locales, orientées vers le développement d\'activités au bénéfice de la communauté et des populations vulnérables de la municipalité de Duitama.',
          },
          {
            es: 'Adicionalmente, los colaboradores participan de manera voluntaria en diferentes jornadas de impacto social, entre las que se destacan el apoyo en el mejoramiento locativo de instituciones educativas, acompañamiento a adultos mayores en hogares geriátricos, jornadas visuales para la población en general, entrega de obsequios a niños de población vulnerable y la realización de actividades recreativas y de integración dirigidas a niños con discapacidad.',
            en: 'Additionally, collaborators voluntarily participate in different social impact sessions, among which support for the physical improvement of educational institutions, accompaniment of older adults in nursing homes, visual sessions for the general population, distribution of gifts to vulnerable children and the development of recreational and integration activities aimed at children with disabilities stand out.',
            fr: 'De plus, les collaborateurs participent volontairement à différentes journées à impact social, parmi lesquelles se distinguent le soutien à l\'amélioration des locaux d\'institutions éducatives, l\'accompagnement des personnes âgées dans les maisons de retraite, des journées visuelles pour la population en général, la remise de cadeaux aux enfants en situation de vulnérabilité et la réalisation d\'activités récréatives et d\'intégration destinées aux enfants en situation de handicap.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-9.webp`, caption: { es: 'Navidad vereda la Trinidad Duitama, con el voluntariado de la directora de talento humano y SG de la empresa.', en: 'Christmas at the La Trinidad village in Duitama, with the volunteering of the Human Talent and SG director of the company.', fr: 'Noël dans le hameau La Trinidad à Duitama, avec le bénévolat de la directrice du talent humain et de la SG de l\'entreprise.' } },
        ],
      },
      {
        titulo: { es: 'Resultado de evaluación BIC - ISO 26000', en: 'BIC assessment result - ISO 26000', fr: 'Résultat de l\'évaluation BIC - ISO 26000' },
        parrafos: [
          {
            es: 'El estándar implementado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para abordar los principios de la responsabilidad social en cada organización.',
            en: 'The standard implemented for the presentation of the BIC management report is the ISO 26000 Standard, an international standard designed to address the principles of social responsibility in each organization.',
            fr: 'La norme mise en œuvre pour la présentation du rapport de gestion BIC est la Norme ISO 26000, une norme internationale conçue pour aborder les principes de responsabilité sociale dans chaque organisation.',
          },
          {
            es: 'La estrategia consiste en aplicar y evaluar una herramienta de gestión que permita evidenciar la implementación de actividades que buscan el fortalecimiento organizacional, en los ámbitos de negocio, de gobierno corporativo, prácticas laborales, así como las ambientales.',
            en: 'The strategy consists of applying and evaluating a management tool that allows demonstrating the implementation of activities that seek organizational strengthening in the areas of business, corporate governance, labor practices, as well as environmental practices.',
            fr: 'La stratégie consiste à appliquer et à évaluer un outil de gestion permettant de mettre en évidence la mise en œuvre d\'activités qui visent le renforcement organisationnel dans les domaines des affaires, de la gouvernance d\'entreprise, des pratiques de travail et des pratiques environnementales.',
          },
        ],
        lista: [
          { es: 'Total Puntaje Gobierno Corporativo: 88%', en: 'Corporate Governance Total Score: 88%', fr: 'Score total de gouvernance d\'entreprise : 88%' },
          { es: 'Total Puntaje Modelo de Negocio: 88%', en: 'Business Model Total Score: 88%', fr: 'Score total du modèle d\'affaires : 88%' },
          { es: 'Total Puntaje Prácticas Laborales: 70%', en: 'Labor Practices Total Score: 70%', fr: 'Score total des pratiques de travail : 70%' },
          { es: 'Total Puntaje Prácticas Ambientales: 25%', en: 'Environmental Practices Total Score: 25%', fr: 'Score total des pratiques environnementales : 25%' },
          { es: 'Total Puntaje Prácticas con la Comunidad: 83%', en: 'Community Practices Total Score: 83%', fr: 'Score total des pratiques communautaires : 83%' },
          { es: 'TOTAL PUNTAJE EVALUACIÓN: 1575 / 2050 - 76,8%', en: 'TOTAL ASSESSMENT SCORE: 1575 / 2050 - 76.8%', fr: 'SCORE TOTAL D\'ÉVALUATION : 1575 / 2050 - 76,8%' },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-8.webp`, caption: { es: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC 2025.', en: 'BIC Assessment Tool BALKRAN INC SAS BIC 2025.', fr: 'Outil d\'évaluation BIC BALKRAN INC SAS BIC 2025.' } },
        ],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2024',
    titulo: { es: 'Informe Sociedades BIC 2024', en: 'BIC Companies Report 2024', fr: 'Rapport Sociétés BIC 2024' },
    fecha: { es: '29 de mayo de 2025', en: 'May 29, 2025', fr: '29 mai 2025' },
    fechaISO: '2025-05-29',
    imagen: `${R2}/evento_bic2025.webp`,
    resumen: {
      es: 'Reporte de gestión BIC 2024: continuamos con el compromiso de ser una sociedad BIC, una responsabilidad continua con el desarrollo sostenible y la aplicación de estrategias que nos ayuden a mejorar día a día y a buscar el beneficio propio y el de nuestras partes interesadas.',
      en: 'BIC 2024 management report: we continue with the commitment of being a BIC company, an ongoing responsibility with sustainable development and the application of strategies that help us improve day by day and seek our own benefit and that of our stakeholders.',
      fr: 'Rapport de gestion BIC 2024 : nous poursuivons l\'engagement d\'être une société BIC, une responsabilité continue envers le développement durable et l\'application de stratégies qui nous aident à nous améliorer jour après jour et à rechercher notre propre bénéfice et celui de nos parties prenantes.',
    },
    pdf: `${R2}/Informe-Sociedades-BIC-2024.pdf`,
    pdfLabel: { es: 'Ver informe BIC completo (PDF)', en: 'View complete BIC report (PDF)', fr: 'Voir le rapport BIC complet (PDF)' },
    esInforme: true,
    categoria: { es: 'Informe BIC', en: 'BIC Report', fr: 'Rapport BIC' },
    descripcionCorta: {
      es: 'Reporte de gestión BIC 2024 con los compromisos adquiridos y oportunidades de mejora en las cinco dimensiones de sostenibilidad.',
      en: 'BIC 2024 management report with the commitments acquired and opportunities for improvement in the five sustainability dimensions.',
      fr: 'Rapport de gestion BIC 2024 avec les engagements pris et les opportunités d\'amélioration dans les cinq dimensions de durabilité.',
    },
    secciones: [
      {
        titulo: { es: 'Sobre este informe', en: 'About this report', fr: 'À propos de ce rapport' },
        parrafos: [
          {
            es: 'Este año continuamos con el compromiso de ser una sociedad BIC, es una responsabilidad continua con el desarrollo sostenible y la aplicación de estrategias que nos ayuden a mejorar día a día y a buscar el beneficio propio y el de nuestras partes interesadas. Este informe es un consolidado de cada una de las experiencias y gestiones realizadas como sociedad, iniciando por la mejora continua de cada uno de los aspectos resultantes de la evaluación realizada para el año 2024.',
            en: 'This year we continue with the commitment of being a BIC company; it is an ongoing responsibility with sustainable development and the application of strategies that help us improve day by day and seek our own benefit and that of our stakeholders. This report is a consolidation of each of the experiences and actions carried out as a company, starting with the continuous improvement of each of the aspects resulting from the assessment carried out for the year 2024.',
            fr: 'Cette année, nous poursuivons l\'engagement d\'être une société BIC ; c\'est une responsabilité continue envers le développement durable et l\'application de stratégies qui nous aident à nous améliorer jour après jour et à rechercher notre propre bénéfice et celui de nos parties prenantes. Ce rapport est une consolidation de chacune des expériences et démarches réalisées en tant que société, en commençant par l\'amélioration continue de chacun des aspects issus de l\'évaluation réalisée pour l\'année 2024.',
          },
        ],
      },
      {
        titulo: { es: 'Modelo de negocio', en: 'Business model', fr: 'Modèle d\'affaires' },
        parrafos: [
          {
            es: 'De acuerdo con las compras realizadas para el año 2024, la mayoría de estas se realizaron a proveedores locales, es decir de Boyacá, dentro de la clasificación encontramos: el 82% de las compras se realizaron en Duitama, el 4% de las compras realizadas en el Municipio de Sogamoso, el 2% a ciudades como Paipa, Combita, Socha y Sogamoso.',
            en: 'According to the purchases made for 2024, most of them were made to local suppliers, that is, from Boyacá; within the classification we find: 82% of purchases were made in Duitama, 4% of purchases in the Municipality of Sogamoso, and 2% in cities such as Paipa, Combita, Socha and Sogamoso.',
            fr: 'Selon les achats réalisés pour l\'année 2024, la plupart ont été effectués auprès de fournisseurs locaux, c\'est-à-dire de Boyacá ; dans la classification, nous trouvons : 82 % des achats ont été réalisés à Duitama, 4 % des achats dans la municipalité de Sogamoso et 2 % dans des villes comme Paipa, Combita, Socha et Sogamoso.',
          },
          {
            es: 'Algunas de las actividades identificadas por la empresa BALKRAN, en esta dimensión, se encuentran: dar continuidad a la Implementación de prácticas de comercio justo, como oportunidades para productores en desventaja económica, transparencia, responsabilidad y rendición de cuentas.',
            en: 'Some of the activities identified by the company BALKRAN in this dimension include: continuing the implementation of fair trade practices, as opportunities for producers at economic disadvantage, transparency, responsibility and accountability.',
            fr: 'Parmi les activités identifiées par l\'entreprise BALKRAN dans cette dimension figurent : poursuivre la mise en œuvre de pratiques de commerce équitable, comme opportunités pour les producteurs en situation de désavantage économique, la transparence, la responsabilité et la reddition de comptes.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-2.webp`, caption: { es: 'Análisis de proveedores BALKRAN 2024.', en: 'BALKRAN 2024 supplier analysis.', fr: 'Analyse des fournisseurs BALKRAN 2024.' } },
        ],
      },
      {
        titulo: { es: 'Gobierno corporativo', en: 'Corporate governance', fr: 'Gouvernance d\'entreprise' },
        parrafos: [
          {
            es: 'La organización contempla directrices de diversidad de género y de acceso a distintas culturas, creencias religiosas diversas, lo anterior para ocupar cargos directivos. Para el año 2024, el 44% del total de los colaboradores eran mujeres y ocupaban cargos Gerenciales, directivos y de coordinación.',
            en: 'The organization considers guidelines on gender diversity and access to different cultures and diverse religious beliefs, in order to occupy management positions. For 2024, 44% of the total collaborators were women and held managerial, executive and coordination positions.',
            fr: 'L\'organisation envisage des lignes directrices sur la diversité de genre et l\'accès à différentes cultures et croyances religieuses diverses, afin d\'occuper des postes de direction. Pour l\'année 2024, 44 % du total des collaborateurs étaient des femmes occupant des postes de direction, d\'encadrement et de coordination.',
          },
          {
            es: 'Algunas de las actividades identificadas en esta dimensión, se encuentran: establecer políticas o lineamientos, para seguir integrando la diversidad de género e inclusión de personal, para ocupar cargos al interior de la empresa.',
            en: 'Some of the activities identified in this dimension include: establishing policies or guidelines, to continue integrating gender diversity and staff inclusion, to occupy positions within the company.',
            fr: 'Parmi les activités identifiées dans cette dimension figurent : l\'établissement de politiques ou de lignes directrices, pour continuer à intégrer la diversité de genre et l\'inclusion du personnel, afin d\'occuper des postes au sein de l\'entreprise.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-1.webp`, caption: { es: 'Análisis de datos personal BALKRAN 2024.', en: 'BALKRAN 2024 personnel data analysis.', fr: 'Analyse des données du personnel BALKRAN 2024.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas laborales', en: 'Labor practices', fr: 'Pratiques de travail' },
        parrafos: [
          {
            es: 'Uno de los objetivos de BALKRAN INC SAS BIC, es ofrecer mejores condiciones para el personal en general, es por ello por lo que se implementan políticas internas de trabajo flexible, en la cual se busca mejorar el desempeño de los colaboradores y la productividad de estos.',
            en: 'One of the objectives of BALKRAN INC SAS BIC is to offer better conditions for staff in general, which is why internal flexible working policies are implemented, seeking to improve the performance of collaborators and their productivity.',
            fr: 'L\'un des objectifs de BALKRAN INC SAS BIC est d\'offrir de meilleures conditions à l\'ensemble du personnel ; c\'est pourquoi des politiques internes de travail flexible sont mises en œuvre, cherchant à améliorer la performance des collaborateurs et leur productivité.',
          },
          {
            es: 'Dentro de las modalidades de trabajo que se manejan en la organización, se tienen: Trabajo presencial con el cubrimiento del 84%, trabajo remoto el cual representa el 6% y teletrabajo con el 9%.',
            en: 'Within the work modalities used in the organization, we have: on-site work with 84% coverage, remote work which represents 6% and teleworking with 9%.',
            fr: 'Parmi les modalités de travail gérées dans l\'organisation, on trouve : le travail en présentiel avec une couverture de 84 %, le travail à distance qui représente 6 % et le télétravail avec 9 %.',
          },
          {
            es: 'En nuestra empresa, valoramos la diversidad y la inclusión. Creemos en un ambiente en donde la diversidad cumple un papel fundamental. En el año 2024, integramos en nuestro grupo de trabajadores a Hamers Méndez, practicante universitario de contaduría pública, quién presentó un accidente cerebro vascular, dejando secuelas en su movilidad; pero esto no ha sido impedimento para desempeñar sus labores de manera eficiente.',
            en: 'In our company, we value diversity and inclusion. We believe in an environment where diversity plays a fundamental role. In 2024, we integrated into our group of workers Hamers Méndez, a university intern in public accounting, who suffered a stroke, leaving sequelae in his mobility; but this has not been an impediment to performing his duties efficiently.',
            fr: 'Dans notre entreprise, nous valorisons la diversité et l\'inclusion. Nous croyons en un environnement où la diversité joue un rôle fondamental. En 2024, nous avons intégré dans notre groupe de travailleurs Hamers Méndez, stagiaire universitaire en comptabilité publique, qui a subi un accident vasculaire cérébral laissant des séquelles de mobilité ; mais cela n\'a pas été un obstacle pour accomplir ses tâches de manière efficiente.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-3.webp`, caption: { es: 'Análisis de datos personal BALKRAN 2024.', en: 'BALKRAN 2024 personnel data analysis.', fr: 'Analyse des données du personnel BALKRAN 2024.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas ambientales', en: 'Environmental practices', fr: 'Pratiques environnementales' },
        parrafos: [
          {
            es: 'Dentro de las actividades desarrolladas en esta dimensión, la empresa ha implementado las siguientes: Cuidado energético, manejo y disposición de residuos y prácticas ambientales.',
            en: 'Within the activities developed in this dimension, the company has implemented the following: energy care, waste management and disposal and environmental practices.',
            fr: 'Parmi les activités développées dans cette dimension, l\'entreprise a mis en œuvre les suivantes : la gestion énergétique, la gestion et l\'élimination des déchets et les pratiques environnementales.',
          },
          {
            es: 'Promovemos buenas prácticas ambientales, a través del voluntariado del personal para la siembra de árboles en diferentes zonas del Municipio de Duitama; esto con el fin de restaurar zonas afectadas por incendios forestales a causa del efecto climático.',
            en: 'We promote good environmental practices, through staff volunteering for tree planting in different areas of the Municipality of Duitama; this in order to restore areas affected by forest fires caused by the climate effect.',
            fr: 'Nous promouvons de bonnes pratiques environnementales, à travers le volontariat du personnel pour la plantation d\'arbres dans différentes zones de la municipalité de Duitama ; afin de restaurer les zones touchées par des incendies de forêt dus à l\'effet climatique.',
          },
          {
            es: 'Entregamos reconocimientos a algunos colaboradores por emplear vehículos no automotores: el 28,57% de los colaboradores utilizan vehículos no automotores para el desplazamiento al trabajo; uno de los vehículos más utilizados por los mismos son monopatines y bicicletas.',
            en: 'We award recognitions to some collaborators for using non-motorized vehicles: 28.57% of collaborators use non-motorized vehicles to commute to work; one of the most used vehicles among them are scooters and bicycles.',
            fr: 'Nous remettons des reconnaissances à certains collaborateurs pour l\'utilisation de véhicules non motorisés : 28,57 % des collaborateurs utilisent des véhicules non motorisés pour se rendre au travail ; parmi les véhicules les plus utilisés figurent les trottinettes et les bicyclettes.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image.webp`, caption: { es: 'Equipo BALKRAN en páramo los Agueros.', en: 'BALKRAN team in the Los Agueros páramo.', fr: 'Équipe BALKRAN dans le páramo Los Agueros.' } },
          { src: `${R2}/eventos/image-1.webp`, caption: { es: 'Patineta como vehículo no automotor.', en: 'Scooter as a non-motorized vehicle.', fr: 'Trottinette comme véhicule non motorisé.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas con la comunidad', en: 'Community practices', fr: 'Pratiques communautaires' },
        parrafos: [
          {
            es: 'La organización incentiva actividades de voluntariado con los trabajadores; se realizan alianzas con fundaciones locales tales como CLUB ROTARIO de Duitama, que se dedican a actividades en beneficio con la comunidad, personas vulnerables, estudiantes de escasos recursos. Para el año 2024 se realizó el arreglo locativo de una escuela en el Municipio de Duitama y la actividad fue liderada por la Gerente de la empresa BALKRAN.',
            en: 'The organization encourages volunteering activities with workers; alliances are made with local foundations such as the CLUB ROTARIO of Duitama, dedicated to activities for the benefit of the community, vulnerable people and low-income students. For the year 2024, the physical improvement of a school in the Municipality of Duitama was carried out and the activity was led by the Manager of the BALKRAN company.',
            fr: 'L\'organisation encourage les activités de bénévolat avec les travailleurs ; des alliances sont réalisées avec des fondations locales telles que le CLUB ROTARIO de Duitama, dédiées à des activités au bénéfice de la communauté, des personnes vulnérables et des étudiants à faibles ressources. Pour l\'année 2024, l\'amélioration des locaux d\'une école de la municipalité de Duitama a été réalisée et l\'activité a été menée par la directrice de l\'entreprise BALKRAN.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-2.webp`, caption: { es: 'Registro fotográfico, voluntariado gerente general empresa, en el arreglo de escuela la Florida en el Municipio de Duitama.', en: 'Photographic record, volunteering of the company\'s general manager, in the improvement of the La Florida school in the Municipality of Duitama.', fr: 'Registre photographique, bénévolat de la directrice générale de l\'entreprise, lors de l\'amélioration de l\'école La Florida dans la municipalité de Duitama.' } },
        ],
      },
      {
        titulo: { es: 'Resultado de evaluación BIC - ISO 26000', en: 'BIC assessment result - ISO 26000', fr: 'Résultat de l\'évaluation BIC - ISO 26000' },
        parrafos: [
          {
            es: 'El estándar implementado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para abordar los principios de la responsabilidad social en cada organización.',
            en: 'The standard implemented for the presentation of the BIC management report is the ISO 26000 Standard, an international standard designed to address the principles of social responsibility in each organization.',
            fr: 'La norme mise en œuvre pour la présentation du rapport de gestion BIC est la Norme ISO 26000, une norme internationale conçue pour aborder les principes de responsabilité sociale dans chaque organisation.',
          },
        ],
        lista: [
          { es: 'Total Puntaje Gobierno Corporativo: 75%', en: 'Corporate Governance Total Score: 75%', fr: 'Score total de gouvernance d\'entreprise : 75%' },
          { es: 'Total Puntaje Modelo de Negocio: 50%', en: 'Business Model Total Score: 50%', fr: 'Score total du modèle d\'affaires : 50%' },
          { es: 'Total Puntaje Prácticas Laborales: 60%', en: 'Labor Practices Total Score: 60%', fr: 'Score total des pratiques de travail : 60%' },
          { es: 'Total Puntaje Prácticas Ambientales: 15%', en: 'Environmental Practices Total Score: 15%', fr: 'Score total des pratiques environnementales : 15%' },
          { es: 'Total Puntaje Prácticas con la Comunidad: 50%', en: 'Community Practices Total Score: 50%', fr: 'Score total des pratiques communautaires : 50%' },
          { es: 'TOTAL PUNTAJE EVALUACIÓN: 925 / 1500 - 61,7%', en: 'TOTAL ASSESSMENT SCORE: 925 / 1500 - 61.7%', fr: 'SCORE TOTAL D\'ÉVALUATION : 925 / 1500 - 61,7%' },
        ],
        imagenes: [
          { src: `${R2}/eventos/image-4.webp`, caption: { es: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC.', en: 'BIC Assessment Tool BALKRAN INC SAS BIC.', fr: 'Outil d\'évaluation BIC BALKRAN INC SAS BIC.' } },
        ],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2023',
    titulo: { es: 'Informe Sociedades BIC 2023', en: 'BIC Companies Report 2023', fr: 'Rapport Sociétés BIC 2023' },
    fecha: { es: '30 de mayo de 2024', en: 'May 30, 2024', fr: '30 mai 2024' },
    fechaISO: '2024-05-30',
    imagen: `${R2}/evento_bic2023.webp`,
    resumen: {
      es: 'Informe Sociedades BIC 2023: reporte de las actividades realizadas por la empresa en pro del cumplimiento de los objetivos adquiridos como Sociedad de Beneficio e Interés Colectivo.',
      en: 'BIC Companies Report 2023: report of the activities carried out by the company in pursuit of the objectives acquired as a Benefit and Collective Interest Company.',
      fr: 'Rapport Sociétés BIC 2023 : rapport des activités réalisées par l\'entreprise en vue de l\'accomplissement des objectifs acquis en tant que Société de Bénéfice et d\'Intérêt Collectif.',
    },
    pdf: `${R2}/Informe-Sociedades-BIC-2023.pdf`,
    pdfLabel: { es: 'Ver informe BIC completo (PDF)', en: 'View complete BIC report (PDF)', fr: 'Voir le rapport BIC complet (PDF)' },
    esInforme: true,
    categoria: { es: 'Informe BIC', en: 'BIC Report', fr: 'Rapport BIC' },
    descripcionCorta: {
      es: 'Reporte de las actividades de beneficio e interés colectivo desarrolladas por Balkran INC. S.A.S BIC durante el año 2023.',
      en: 'Report of the benefit and collective interest activities developed by Balkran INC. S.A.S BIC during the year 2023.',
      fr: 'Rapport des activités de bénéfice et d\'intérêt collectif développées par Balkran INC. S.A.S BIC au cours de l\'année 2023.',
    },
    secciones: [
      {
        titulo: { es: 'Introducción', en: 'Introduction', fr: 'Introduction' },
        parrafos: [
          {
            es: 'El presente informe se realiza, con el fin de dar a conocer las actividades de beneficio e interés colectivo desarrolladas por la empresa Balkran INC. S.A.S BIC para el año 2023, en las dimensiones de modelo de negocio, gobierno corporativo, prácticas laborales, ambientales y con la comunidad.',
            en: 'This report is prepared in order to present the benefit and collective interest activities carried out by the company Balkran INC. S.A.S BIC for the year 2023, in the dimensions of business model, corporate governance, labor, environmental and community practices.',
            fr: 'Le présent rapport est réalisé afin de faire connaître les activités de bénéfice et d\'intérêt collectif développées par l\'entreprise Balkran INC. S.A.S BIC pour l\'année 2023, dans les dimensions du modèle d\'affaires, de la gouvernance d\'entreprise, des pratiques de travail, environnementales et communautaires.',
          },
          {
            es: 'BALKRAN INC SAS BIC, está comprometida con la implementación de estrategias, que permitan dar continuidad al compromiso de transparencia y sostenibilidad. Al ser una sociedad que busca el desarrollo del beneficio de interés colectivo, nuestro objetivo es integrar dentro de los objetivos estratégicos, la implementación de actividades que nos permitan seguir contribuyendo a la sociedad, al desarrollo económico de la sociedad y del medio ambiente; todo esto a través de las oportunidades de mejoras detectadas en cada una de las dimensiones.',
            en: 'BALKRAN INC SAS BIC is committed to the implementation of strategies that allow continuity of the commitment to transparency and sustainability. As a company seeking the development of the benefit of collective interest, our objective is to integrate into the strategic objectives the implementation of activities that allow us to continue contributing to society, to the economic development of society and to the environment; all this through the improvement opportunities detected in each of the dimensions.',
            fr: 'BALKRAN INC SAS BIC est engagée dans la mise en œuvre de stratégies qui permettent d\'assurer la continuité de l\'engagement en faveur de la transparence et de la durabilité. En tant que société recherchant le développement du bénéfice d\'intérêt collectif, notre objectif est d\'intégrer dans les objectifs stratégiques la mise en œuvre d\'activités qui nous permettent de continuer à contribuer à la société, au développement économique de la société et à l\'environnement ; tout ceci à travers les opportunités d\'amélioration détectées dans chacune des dimensions.',
          },
        ],
      },
      {
        titulo: { es: 'Modelo de negocios', en: 'Business model', fr: 'Modèle d\'affaires' },
        parrafos: [
          {
            es: 'En el proceso de adquisición de bienes o servicios, la empresa tiene en cuenta proveedores y/o contratistas que pertenezcan a mujeres y/o minorías.',
            en: 'In the process of acquiring goods or services, the company takes into account suppliers and/or contractors belonging to women and/or minorities.',
            fr: 'Dans le processus d\'acquisition de biens ou de services, l\'entreprise tient compte des fournisseurs et/ou des sous-traitants appartenant à des femmes et/ou à des minorités.',
          },
          {
            es: 'La organización promueve programas para que los proveedores se conviertan en dueños colectivos de la sociedad.',
            en: 'The organization promotes programs so that suppliers become collective owners of the company.',
            fr: 'L\'organisation promeut des programmes pour que les fournisseurs deviennent propriétaires collectifs de la société.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/a2censo.webp`, caption: { es: 'Programa a2censo, en el que se encuentra vinculado la empresa y cuyos socios son partes interesadas.', en: 'The a2censo program, to which the company is linked and whose partners are stakeholders.', fr: 'Le programme a2censo, auquel l\'entreprise est liée et dont les associés sont des parties prenantes.' } },
        ],
      },
      {
        titulo: { es: 'Gobierno corporativo', en: 'Corporate governance', fr: 'Gouvernance d\'entreprise' },
        parrafos: [
          {
            es: 'Socializar la misión o propósito con todos los grupos de interés, esto, a través de la página web de la empresa: esta actividad se realiza de manera anual y de acuerdo con los cambios y/o ajustes que surjan en la planeación estratégica.',
            en: 'Share the mission or purpose with all stakeholder groups, through the company\'s website: this activity is carried out annually and according to the changes and/or adjustments that arise in strategic planning.',
            fr: 'Partager la mission ou l\'objet avec toutes les parties prenantes, à travers le site Web de l\'entreprise : cette activité est réalisée annuellement et selon les changements et/ou ajustements qui surviennent dans la planification stratégique.',
          },
          {
            es: 'Socializar los estados financieros de la organización a todos los colaboradores, como parte de la estrategia de transparencia, esto a través de reuniones presenciales.',
            en: 'Share the financial statements of the organization with all collaborators, as part of the transparency strategy, through in-person meetings.',
            fr: 'Partager les états financiers de l\'organisation avec tous les collaborateurs, dans le cadre de la stratégie de transparence, à travers des réunions en présentiel.',
          },
          {
            es: 'La organización tiene un manual de funciones para los colaboradores, en el que se relacionan las responsabilidades, autoridades, la formación básica de cada uno de los perfiles, así como los valores y expectativas de las diferentes áreas.',
            en: 'The organization has a job manual for collaborators, which lists responsibilities, authorities, the basic training of each of the profiles, as well as the values and expectations of the different areas.',
            fr: 'L\'organisation dispose d\'un manuel de fonctions pour les collaborateurs, dans lequel sont répertoriées les responsabilités, les autorités, la formation de base de chacun des profils, ainsi que les valeurs et les attentes des différents services.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/misionVision.webp`, caption: { es: 'Página web de la empresa.', en: 'Company website.', fr: 'Site Web de l\'entreprise.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas laborales', en: 'Labor practices', fr: 'Pratiques de travail' },
        parrafos: [
          {
            es: 'Implementar directriz para la remuneración salarial del personal, basada en antigüedad, cargos y funciones.',
            en: 'Implement a guideline for the salary remuneration of staff, based on seniority, positions and functions.',
            fr: 'Mettre en place une directive pour la rémunération salariale du personnel, fondée sur l\'ancienneté, les postes et les fonctions.',
          },
          {
            es: 'Se capacita de manera permanente a los colaboradores de la organización, a través de los diferentes medios dispuestos para tal fin, dentro de estos tenemos: Capacitaciones presenciales con profesionales y expertos en diferentes áreas, a través de nuestra plataforma virtual, diseñada para aportar flexibilidad en los colaboradores; esta plataforma fue creada en el año 2023.',
            en: 'The collaborators of the organization are permanently trained through the different means provided for this purpose, among which we have: in-person training with professionals and experts in different areas, through our virtual platform, designed to provide flexibility to collaborators; this platform was created in 2023.',
            fr: 'Les collaborateurs de l\'organisation sont formés en permanence, à travers les différents moyens prévus à cette fin, parmi lesquels nous avons : des formations en présentiel avec des professionnels et experts dans différents domaines, à travers notre plateforme virtuelle, conçue pour apporter de la flexibilité aux collaborateurs ; cette plateforme a été créée en 2023.',
          },
          {
            es: 'Se han creado opciones para que los trabajadores tengan participación en la sociedad, a través de la adquisición de acciones: se realizó alianza con la bolsa de valores de Colombia y su programa a2censo para creación de Crowdfunding para generar opciones de participación e inversión con utilidades en la empresa.',
            en: 'Options have been created for workers to participate in the company, through the acquisition of shares: an alliance was made with the Colombian Stock Exchange and its a2censo program to create crowdfunding to generate participation and investment options with profits in the company.',
            fr: 'Des options ont été créées pour que les travailleurs participent à la société, par l\'acquisition d\'actions : une alliance a été réalisée avec la Bourse de Colombie et son programme a2censo pour créer du financement collaboratif (crowdfunding) afin de générer des options de participation et d\'investissement avec des bénéfices dans l\'entreprise.',
          },
          {
            es: 'Desarrollar actividades de bienestar, que generen beneficios en la salud física y mental de los colaboradores.',
            en: 'Develop well-being activities that generate benefits for the physical and mental health of collaborators.',
            fr: 'Développer des activités de bien-être qui génèrent des bénéfices pour la santé physique et mentale des collaborateurs.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/EscalaLaboral.webp`, caption: { es: 'Registro GH-F-07 Organigrama funcional.', en: 'Record GH-F-07 Functional organizational chart.', fr: 'Registre GH-F-07 Organigramme fonctionnel.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas ambientales', en: 'Environmental practices', fr: 'Pratiques environnementales' },
        parrafos: [
          {
            es: 'Socializar todo lo relacionado con la misión social y ambiental.',
            en: 'Share everything related to the social and environmental mission.',
            fr: 'Partager tout ce qui se rapporte à la mission sociale et environnementale.',
          },
          {
            es: 'Utilizar sistemas de iluminación energéticamente eficientes, dispuestos en la oferta de productos, a nuestros clientes.',
            en: 'Use energy-efficient lighting systems, provided in the product offer, to our clients.',
            fr: 'Utiliser des systèmes d\'éclairage efficaces sur le plan énergétique, proposés dans l\'offre de produits, à nos clients.',
          },
          {
            es: 'Promover prácticas para reutilizadura o disposición de materiales resultantes de los diferentes procesos. Se gestionan convenios con entidades para la recolección de estos.',
            en: 'Promote practices for reuse or disposal of materials resulting from the different processes. Agreements are managed with entities for their collection.',
            fr: 'Promouvoir des pratiques de réutilisation ou d\'élimination des matériaux issus des différents processus. Des accords sont gérés avec des entités pour leur collecte.',
          },
          {
            es: 'Concientizar y capacitar a los colaboradores, sobre la importancia de la reutilización de materiales como el plástico y su uso para la fabricación de nuevos productos.',
            en: 'Raise awareness and train collaborators on the importance of reusing materials such as plastic and its use for the manufacture of new products.',
            fr: 'Sensibiliser et former les collaborateurs sur l\'importance de la réutilisation de matériaux comme le plastique et son utilisation pour la fabrication de nouveaux produits.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Imagen8.webp`, caption: { es: 'Matriz EIA BALKRAN INC SAS BIC.', en: 'EIA matrix BALKRAN INC SAS BIC.', fr: 'Matrice EIE BALKRAN INC SAS BIC.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas con la comunidad', en: 'Community practices', fr: 'Pratiques communautaires' },
        parrafos: [
          {
            es: 'Generar empleos dignos para personas en situación de vulnerabilidad, teniendo en cuenta que el 23,33% del total de los colaboradores son madres cabeza de familia.',
            en: 'Generate decent jobs for people in vulnerable situations, considering that 23.33% of the total collaborators are mothers who are heads of household.',
            fr: 'Générer des emplois décents pour les personnes en situation de vulnérabilité, sachant que 23,33 % du total des collaborateurs sont des mères chefs de famille.',
          },
          {
            es: 'La organización incentiva actividades de voluntariado con los trabajadores, esto a través de alianzas con fundaciones locales que se dedican a actividades en beneficio con la comunidad, personas vulnerables, estudiantes de escasos recursos.',
            en: 'The organization encourages volunteering activities with workers, through alliances with local foundations dedicated to activities for the benefit of the community, vulnerable people and low-income students.',
            fr: 'L\'organisation encourage les activités de bénévolat avec les travailleurs, à travers des alliances avec des fondations locales dédiées à des activités au bénéfice de la communauté, des personnes vulnérables et des étudiants à faibles ressources.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Imagen9.webp`, caption: { es: 'Registro fotográfico, equipo femenino BALKRAN, la mayoría madres cabeza de familia.', en: 'Photographic record, BALKRAN female team, mostly mothers who are heads of household.', fr: 'Registre photographique, équipe féminine BALKRAN, majoritairement mères chefs de famille.' } },
        ],
      },
      {
        titulo: { es: 'Resultado de evaluación BIC - ISO 26000', en: 'BIC assessment result - ISO 26000', fr: 'Résultat de l\'évaluation BIC - ISO 26000' },
        parrafos: [
          {
            es: 'La estrategia consiste en aplicar y evaluar una herramienta de gestión, que permita evidenciar la implementación de actividades que buscan el fortalecimiento organizacional, en los ámbitos de negocio, de gobierno corporativo, prácticas laborales, así como las ambientales.',
            en: 'The strategy consists of applying and evaluating a management tool that allows evidencing the implementation of activities that seek organizational strengthening in the areas of business, corporate governance, labor practices, as well as environmental practices.',
            fr: 'La stratégie consiste à appliquer et à évaluer un outil de gestion permettant de mettre en évidence la mise en œuvre d\'activités qui visent le renforcement organisationnel, dans les domaines des affaires, de la gouvernance d\'entreprise, des pratiques de travail et environnementales.',
          },
        ],
        lista: [
          { es: 'Total Puntaje Gobierno Corporativo: 75%', en: 'Corporate Governance Total Score: 75%', fr: 'Score total de gouvernance d\'entreprise : 75%' },
          { es: 'Total Puntaje Modelo de Negocio: 50%', en: 'Business Model Total Score: 50%', fr: 'Score total du modèle d\'affaires : 50%' },
          { es: 'Total Puntaje Prácticas Laborales: 60%', en: 'Labor Practices Total Score: 60%', fr: 'Score total des pratiques de travail : 60%' },
          { es: 'Total Puntaje Prácticas Ambientales: 15%', en: 'Environmental Practices Total Score: 15%', fr: 'Score total des pratiques environnementales : 15%' },
          { es: 'Total Puntaje Prácticas con la Comunidad: 50%', en: 'Community Practices Total Score: 50%', fr: 'Score total des pratiques communautaires : 50%' },
          { es: 'TOTAL PUNTAJE EVALUACIÓN: 925 / 1550 - 59,7%', en: 'TOTAL ASSESSMENT SCORE: 925 / 1550 - 59.7%', fr: 'SCORE TOTAL D\'ÉVALUATION : 925 / 1550 - 59,7%' },
        ],
        imagenes: [
          { src: `${R2}/eventos/Imagen2-1024x586.webp`, caption: { es: 'Herramienta-de-Evaluación-BIC BALKRAN INC SAS BIC.', en: 'BIC Assessment Tool BALKRAN INC SAS BIC.', fr: 'Outil d\'évaluation BIC BALKRAN INC SAS BIC.' } },
          { src: `${R2}/eventos/MG_5234_full-1-1024x521.webp`, caption: { es: 'Registro fotográfico, personal BALKRAN 2023.', en: 'Photographic record, BALKRAN 2023 staff.', fr: 'Registre photographique, personnel BALKRAN 2023.' } },
        ],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2022',
    titulo: { es: 'Informe Sociedades BIC 2022', en: 'BIC Companies Report 2022', fr: 'Rapport Sociétés BIC 2022' },
    fecha: { es: '23 de mayo de 2023', en: 'May 23, 2023', fr: '23 mai 2023' },
    fechaISO: '2023-05-23',
    imagen: `${R2}/evento_bic2023.webp`,
    resumen: {
      es: 'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC llevó a cabo el año 2022 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
      en: 'To evidence the activities that the company Balkran Inc. S.A.S BIC carried out in 2022 in pursuit of the objectives acquired by being part of the Benefit and Collective Interest Companies, based on the dimensions set out in Law 1901 of 2018.',
      fr: 'Mettre en évidence les activités que l\'entreprise Balkran Inc. S.A.S BIC a menées en 2022 en vue de l\'accomplissement des objectifs acquis en devenant partie des Sociétés de Bénéfice et d\'Intérêt Collectif, sur la base des dimensions prévues dans la Loi 1901 de 2018.',
    },
    pdf: `${R2}/Informe-Sociedades-BIC-2022.pdf`,
    pdfLabel: { es: 'Ver informe BIC completo (PDF)', en: 'View complete BIC report (PDF)', fr: 'Voir le rapport BIC complet (PDF)' },
    esInforme: true,
    categoria: { es: 'Informe BIC', en: 'BIC Report', fr: 'Rapport BIC' },
    descripcionCorta: {
      es: 'Reporte de las actividades llevadas a cabo durante el año 2022 como Sociedad de Beneficio e Interés Colectivo - BIC.',
      en: 'Report of the activities carried out during 2022 as a Benefit and Collective Interest Company - BIC.',
      fr: 'Rapport des activités menées au cours de l\'année 2022 en tant que Société de Bénéfice et d\'Intérêt Collectif - BIC.',
    },
    secciones: [
      {
        titulo: { es: 'Introducción', en: 'Introduction', fr: 'Introduction' },
        parrafos: [
          {
            es: 'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC llevó a cabo el año 2022, en pro del cumplimiento de los objetivos adquiridos, al ser parte de las Sociedades de Beneficio e Interés Colectivo - BIC basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
            en: 'To evidence the activities that the company Balkran Inc. S.A.S BIC carried out in 2022, in the pursuit of the objectives acquired, as part of the Benefit and Collective Interest Companies - BIC, based on the dimensions set out in Law 1901 of 2018.',
            fr: 'Mettre en évidence les activités que l\'entreprise Balkran Inc. S.A.S BIC a menées en 2022, pour l\'accomplissement des objectifs acquis, en faisant partie des Sociétés de Bénéfice et d\'Intérêt Collectif - BIC, basées sur les dimensions prévues dans la Loi 1901 de 2018.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/bic-azul.webp` },
        ],
      },
      {
        titulo: { es: 'Modelo de negocio', en: 'Business model', fr: 'Modèle d\'affaires' },
        parrafos: [
          {
            es: 'Implementar prácticas de comercio justo y promover actividades de seguimiento que apoyen el fortalecimiento de los bienes o servicios, suministrados por proveedores; esto a través de nuestro Software interno, para la gestión de terceros.',
            en: 'Implement fair trade practices and promote follow-up activities that support the strengthening of the goods or services supplied by suppliers; this through our internal software, for the management of third parties.',
            fr: 'Mettre en œuvre des pratiques de commerce équitable et promouvoir des activités de suivi qui soutiennent le renforcement des biens ou services fournis par les fournisseurs ; ceci à travers notre logiciel interne, pour la gestion des tiers.',
          },
          {
            es: 'Adquirir un enfoque empresarial basado en el triple impacto, comprometiéndose con los pilares de: mirada social, impacto ambiental y beneficio económico.',
            en: 'Adopt a business approach based on the triple impact, committing to the pillars of: social focus, environmental impact and economic benefit.',
            fr: 'Adopter une approche d\'entreprise fondée sur le triple impact, en s\'engageant sur les piliers : regard social, impact environnemental et bénéfice économique.',
          },
          {
            es: 'La empresa se vinculó en el año 2022, al programa a2censo, el cual busca impulsar los proyectos de las empresas colombianas; esto, a través de la inclusión de socios que invierten y generan ingresos de manera permanente; para el caso de BALKRAN dos colaboradores se asociaron a este programa, por un período equivalente a 36 meses; generando ganancias por hacer parte del mismo y por contribuir al desarrollo de la empresa.',
            en: 'In 2022, the company joined the a2censo program, which seeks to promote the projects of Colombian companies; this, through the inclusion of partners who invest and generate income on a permanent basis; in the case of BALKRAN, two collaborators joined this program, for a period equivalent to 36 months; generating profits for being part of it and for contributing to the development of the company.',
            fr: 'En 2022, l\'entreprise a adhéré au programme a2censo, qui vise à promouvoir les projets des entreprises colombiennes ; ceci, à travers l\'inclusion de partenaires qui investissent et génèrent des revenus de manière permanente ; dans le cas de BALKRAN, deux collaborateurs ont adhéré à ce programme pour une période équivalente à 36 mois ; générant des bénéfices pour en faire partie et pour contribuer au développement de l\'entreprise.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Terceros-1024x652.webp`, caption: { es: 'Software ARES - Módulo Compras.', en: 'ARES Software - Purchasing Module.', fr: 'Logiciel ARES - Module achats.' } },
          { src: `${R2}/eventos/a2senso-e1684851427100-1024x473.webp`, caption: { es: 'Página web a2censo.', en: 'a2censo website.', fr: 'Site Web a2censo.' } },
        ],
      },
      {
        titulo: { es: 'Gobierno corporativo', en: 'Corporate governance', fr: 'Gouvernance d\'entreprise' },
        parrafos: [
          {
            es: 'Nos comprometemos a integrar a nuestros colaboradores con la responsabilidad social y empresarial; a construir una relación empresa/trabajador mediante la concientización de la razón de ser de la organización y la puesta en práctica de los valores de la sociedad; se busca impulsar la igualdad de género en las diferentes actividades y el establecimiento de políticas internas, que ayuden a la interrelación de las áreas.',
            en: 'We commit to integrating our collaborators with social and corporate responsibility; to build a company/worker relationship through awareness of the reason for being of the organization and the practical application of the values of the company; it seeks to promote gender equality in the different activities and the establishment of internal policies that help the interrelation of the areas.',
            fr: 'Nous nous engageons à intégrer nos collaborateurs à la responsabilité sociale et entrepreneuriale ; à construire une relation entreprise/travailleur par la prise de conscience de la raison d\'être de l\'organisation et la mise en pratique des valeurs de la société ; il s\'agit de promouvoir l\'égalité des genres dans les différentes activités et l\'établissement de politiques internes qui favorisent l\'interrelation des domaines.',
          },
        ],
        lista: [
          { es: 'Integración de nuestros empleados con la Responsabilidad Social y empresarial.', en: 'Integration of our employees with Corporate Social Responsibility.', fr: 'Intégration de nos employés à la Responsabilité Sociale et entrepreneuriale.' },
          { es: 'Construcción de la relación empresa/trabajador mediante los valores.', en: 'Building the company/employee relationship through values.', fr: 'Construction de la relation entreprise/travailleur par les valeurs.' },
          { es: 'Socializaciones: se realiza la retroalimentación constante de los objetivos organizacionales.', en: 'Socializations: constant feedback on organizational objectives is carried out.', fr: 'Socialisations : une rétroaction constante sur les objectifs organisationnels est réalisée.' },
          { es: 'Contrataciones: el 41% del personal está conformado por mujeres y el 59% por hombres; el 23% del total de los colaboradores son madres cabeza de familia.', en: 'Hiring: 41% of the staff is made up of women and 59% of men; 23% of the total collaborators are mothers who are heads of household.', fr: 'Recrutements : 41 % du personnel est composé de femmes et 59 % d\'hommes ; 23 % du total des collaborateurs sont des mères chefs de famille.' },
          { es: 'Plan de servicio: se promueven actividades en pro de la construcción de un código de ética y la implementación de sistemas de recompensa e incentivos.', en: 'Service plan: activities are promoted in favor of the construction of a code of ethics and the implementation of reward and incentive systems.', fr: 'Plan de service : des activités sont promues en faveur de la construction d\'un code de déontologie et de la mise en œuvre de systèmes de récompense et d\'incitation.' },
        ],
        imagenes: [
          { src: `${R2}/eventos/Capacitaciones-1024x768.webp`, caption: { es: 'Registro fotográfico área de capacitaciones BALKRAN.', en: 'Photographic record of the BALKRAN training area.', fr: 'Registre photographique de la zone de formation BALKRAN.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas laborales', en: 'Labor practices', fr: 'Pratiques de travail' },
        parrafos: [
          {
            es: 'Balkran Inc S.A.S BIC como sociedad comercial de beneficio e interés colectivo (BIC) brinda a todos sus colaboradores, la posibilidad de desarrollar y fortalecer sus habilidades teórico/prácticas. Internamente se reconoce el desarrollo de sus labores, a través de la estandarización de escalas salariales; esto, teniendo en cuenta la formación, educación, experiencia dentro de la empresa.',
            en: 'Balkran Inc S.A.S BIC, as a commercial company of collective benefit and interest (BIC), offers all its collaborators the possibility of developing and strengthening their theoretical/practical skills. Internally, the development of their work is recognized, through the standardization of salary scales; this, taking into account the training, education and experience within the company.',
            fr: 'Balkran Inc S.A.S BIC, en tant que société commerciale de bénéfice et d\'intérêt collectif (BIC), offre à tous ses collaborateurs la possibilité de développer et de renforcer leurs compétences théoriques/pratiques. En interne, le développement de leurs tâches est reconnu, à travers la standardisation des échelles salariales ; ceci, en tenant compte de la formation, de l\'éducation et de l\'expérience au sein de l\'entreprise.',
          },
          {
            es: 'Para BALKRAN, el bienestar de nuestros colaboradores es fundamental, es por ello, que hemos implementado programas de salud y de estilos de vida saludable. Una de las estrategias implementadas en el año 2022 fue la campaña Fruty Day, cuyo propósito fue brindar a los colaboradores una jornada de sensibilización, sobre su alimentación y la regulación de su peso.',
            en: 'For BALKRAN, the well-being of our collaborators is fundamental, which is why we have implemented health programs and healthy lifestyles. One of the strategies implemented in 2022 was the Fruty Day campaign, whose purpose was to provide collaborators with a sensitization session on their nutrition and weight regulation.',
            fr: 'Pour BALKRAN, le bien-être de nos collaborateurs est fondamental, c\'est pourquoi nous avons mis en place des programmes de santé et de modes de vie sains. L\'une des stratégies mises en œuvre en 2022 a été la campagne Fruty Day, dont le but était d\'offrir aux collaborateurs une journée de sensibilisation sur leur alimentation et la régulation de leur poids.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/EscalaSalarial.webp`, caption: { es: 'Registro GH-F-07 Organigrama funcional.', en: 'Record GH-F-07 Functional organizational chart.', fr: 'Registre GH-F-07 Organigramme fonctionnel.' } },
          { src: `${R2}/eventos/Fruty-Day.webp`, caption: { es: 'Registro fotográfico, jornada de estilos de vida saludable.', en: 'Photographic record, healthy lifestyles session.', fr: 'Registre photographique, journée des modes de vie sains.' } },
          { src: `${R2}/eventos/Valentina--768x1024.webp`, caption: { es: 'Registro fotográfico, celebración de cumpleaños Balkran 2022.', en: 'Photographic record, birthday celebration Balkran 2022.', fr: 'Registre photographique, célébration d\'anniversaire Balkran 2022.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas ambientales', en: 'Environmental practices', fr: 'Pratiques environnementales' },
        parrafos: [
          {
            es: 'En Balkran Inc. S.A.S BIC conocemos la importancia de reducir el impacto ambiental negativo que provocan los procesos productivos, es por esto, que aplicamos un programa para mejorar la calidad de vida del personal.',
            en: 'At Balkran Inc. S.A.S BIC we know the importance of reducing the negative environmental impact caused by production processes, which is why we apply strategies that generate awareness.',
            fr: 'Chez Balkran Inc. S.A.S BIC nous connaissons l\'importance de réduire l\'impact environnemental négatif provoqué par les processus productifs, c\'est pourquoi nous appliquons des stratégies qui génèrent de la sensibilisation.',
          },
          {
            es: 'En la actualidad un 30% de nuestros trabajadores, emplean medios de transporte no automotores, como la bicicleta, para sus desplazamientos; por esta razón, se implementa un programa que busca incrementar el porcentaje de trabajadores que utilicen medio de transporte sostenible y ambientalmente amigable.',
            en: 'Currently, 30% of our workers use non-motorized means of transport, such as the bicycle, for their commutes; for this reason, a program is implemented that seeks to increase the percentage of workers who use sustainable and environmentally friendly means of transport.',
            fr: 'Actuellement, 30 % de nos travailleurs utilisent des moyens de transport non motorisés, comme le vélo, pour leurs déplacements ; c\'est pourquoi un programme est mis en œuvre visant à augmenter le pourcentage de travailleurs utilisant des moyens de transport durables et respectueux de l\'environnement.',
          },
          {
            es: 'Nuestras actividades se basan en el diseño, fabricación y comercialización de energizadores y accesorios para la instalación de cercados eléctricos para ganadería. Dentro de la línea de accesorios, se ofertan paneles solares que permiten iluminar aquellos hogares, en los que la energía eléctrica es limitada o carece de esta; aprovechar la energía solar para satisfacer las necesidades de iluminación y electricidad de la población en sectores rurales, es uno de nuestros objetivos.',
            en: 'Our activities are based on the design, manufacture and marketing of energizers and accessories for the installation of electric fences for livestock. Within the accessory line, solar panels are offered that allow lighting those homes where electricity is limited or lacking; harnessing solar energy to satisfy the lighting and electricity needs of the population in rural sectors is one of our objectives.',
            fr: 'Nos activités reposent sur la conception, la fabrication et la commercialisation d\'énergisateurs et d\'accessoires pour l\'installation de clôtures électriques pour l\'élevage. Dans la ligne d\'accessoires, des panneaux solaires sont proposés pour éclairer les foyers où l\'électricité est limitée ou fait défaut ; profite de l\'énergie solaire pour répondre aux besoins d\'éclairage et d\'électricité de la population des zones rurales est l\'un de nos objectifs.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Uso-de-Bicicleta-1024x768.webp`, caption: { es: 'Registro fotográfico, personal con vehículo no automotor, del área de metalistería.', en: 'Photographic record, staff with non-automotive vehicle, from the metalworking area.', fr: 'Registre photographique, personnel avec véhicule non motorisé, du domaine de la métallerie.' } },
          { src: `${R2}/eventos/SOLAR-3-.webp`, caption: { es: 'Registro fotográfico, instalación de equipo de energía solar, Cunday Tolima.', en: 'Photographic record, installation of solar energy equipment, Cunday Tolima.', fr: 'Registre photographique, installation d\'équipement d\'énergie solaire, Cunday Tolima.' } },
          { src: `${R2}/eventos/SOLAR.webp`, caption: { es: 'Registro fotográfico, instalación de equipo de energía solar, Cunday Tolima.', en: 'Photographic record, installation of solar energy equipment, Cunday Tolima.', fr: 'Registre photographique, installation d\'équipement d\'énergie solaire, Cunday Tolima.' } },
        ],
      },
      {
        titulo: { es: 'Prácticas con la comunidad', en: 'Community practices', fr: 'Pratiques communautaires' },
        parrafos: [
          {
            es: 'Para nuestra organización el integrar a nuestra fuerza laboral a personas en situación de vulnerabilidad nos permite sensibilizarnos cada día más y conectarnos con las problemáticas de las comunidades en general; es por esto que brindamos la oportunidad a aquellos que atiendan a las diferentes vacantes, priorizando población, tales como madres cabeza de hogar, personal que certifique algún tipo de discapacidad, personas en situación de pobreza, entre otros, siempre y cuando se cumplan con los criterios establecidos para los diferentes perfiles de cargo.',
            en: 'For our organization, integrating people in vulnerable situations into our workforce allows us to become more aware every day and connect with the problems of the communities in general; which is why we offer the opportunity to those who apply for the different vacancies, prioritizing populations such as mothers who are heads of household, personnel who certify some type of disability, people in poverty, among others, as long as the criteria established for the different job profiles are met.',
            fr: 'Pour notre organisation, intégrer des personnes en situation de vulnérabilité dans notre main-d\'œuvre nous permet de nous sensibiliser chaque jour davantage et de nous connecter aux problèmes des communautés en général ; c\'est pourquoi nous offrons l\'opportunité à ceux qui postulent aux différents postes vacants, en privilégiant les populations telles que les mères chefs de famille, le personnel certifiant un type de handicap, les personnes en situation de pauvreté, entre autres, pour autant que les critères établis pour les différents profils de poste soient respectés.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/NosotrosSized.webp`, caption: { es: 'Registro fotográfico, personal BALKRAN 2022.', en: 'Photographic record, BALKRAN 2022 staff.', fr: 'Registre photographique, personnel BALKRAN 2022.' } },
        ],
      },
    ],
  },
  {
    slug: 'informe-sociedades-bic-2021',
    titulo: { es: 'Informe Sociedades BIC 2021', en: 'BIC Companies Report 2021', fr: 'Rapport Sociétés BIC 2021' },
    fecha: { es: '27 de mayo de 2022', en: 'May 27, 2022', fr: '27 mai 2022' },
    fechaISO: '2022-05-27',
    imagen: `${R2}/evento_bic2023.webp`,
    resumen: {
      es: 'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC realizó durante el año 2021 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
      en: 'To evidence the activities that the company Balkran Inc. S.A.S BIC carried out during 2021 in the fulfillment of the objectives acquired as part of the Benefit and Collective Interest Companies, based on the dimensions set out in Law 1901 of 2018.',
      fr: 'Mettre en évidence les activités que l\'entreprise Balkran Inc. S.A.S BIC a réalisées au cours de l\'année 2021 pour l\'accomplissement des objectifs acquis en faisant partie des Sociétés de Bénéfice et d\'Intérêt Collectif, conformément aux dimensions prévues dans la Loi 1901 de 2018.',
    },
    pdf: `${R2}/ReporteBICBalkran2021.pdf`,
    pdfLabel: { es: 'Ver informe BIC completo (PDF)', en: 'View complete BIC report (PDF)', fr: 'Voir le rapport BIC complet (PDF)' },
    esInforme: true,
    categoria: { es: 'Informe BIC', en: 'BIC Report', fr: 'Rapport BIC' },
    descripcionCorta: {
      es: 'Primer reporte de gestión BIC: las actividades realizadas durante el año 2021 como Sociedad de Beneficio e Interés Colectivo.',
      en: 'First BIC management report: activities carried out during 2021 as a Benefit and Collective Interest Company.',
      fr: 'Premier rapport de gestion BIC : les activités réalisées au cours de l\'année 2021 en tant que Société de Bénéfice et d\'Intérêt Collectif.',
    },
    secciones: [
      {
        titulo: { es: 'Introducción', en: 'Introduction', fr: 'Introduction' },
        parrafos: [
          {
            es: 'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC realizó durante el año 2021 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo - BIC basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
            en: 'To evidence the activities that the company Balkran Inc. S.A.S BIC carried out during 2021 in the fulfillment of the objectives acquired as part of the Benefit and Collective Interest Companies - BIC, based on the dimensions set out in Law 1901 of 2018.',
            fr: 'Mettre en évidence les activités que l\'entreprise Balkran Inc. S.A.S BIC a réalisées pendant l\'année 2021 pour l\'accomplissement des objectifs acquis en faisant partie des Sociétés de Bénéfice et d\'Intérêt Collectif - BIC, basées sur les dimensions prévues dans la Loi 1901 de 2018.',
          },
          {
            es: 'El estándar seleccionado para la presentación del informe de gestión BIC es la Norma ISO 26000, norma internacional diseñada para integrar la responsabilidad social, es decir, el compromiso de una organización ante los impactos que sus decisiones y actividades ocasionan en la sociedad y el medio ambiente, mediante un comportamiento ético que contribuya al desarrollo sostenible.',
            en: 'The standard selected for the presentation of the BIC management report is the ISO 26000 Standard, an international standard designed to integrate social responsibility, that is, the commitment of an organization to the impacts that its decisions and activities cause on society and the environment, through ethical behavior that contributes to sustainable development.',
            fr: 'La norme sélectionnée pour la présentation du rapport de gestion BIC est la Norme ISO 26000, une norme internationale conçue pour intégrer la responsabilité sociale, c\'est-à-dire l\'engagement d\'une organisation face aux impacts que ses décisions et ses activités engendrent sur la société et l\'environnement, à travers un comportement éthique qui contribue au développement durable.',
          },
        ],
      },
      {
        titulo: { es: 'Modelo de negocio', en: 'Business model', fr: 'Modèle d\'affaires' },
        parrafos: [
          {
            es: 'Nuestra organización y la dimensión de modelo de negocio tienen que ver en qué manera se ve realmente incluida con la producción de las minorías, el comercio justo y en el desarrollo de las relacionadas con las proveedoras.',
            en: 'Our organization and the business model dimension study how we are related to the production of minorities, fair trade and the development of relationships with local suppliers.',
            fr: 'Notre organisation et la dimension du modèle d\'affaires étudient quelle relation nous entretenons avec la production des minorités, le commerce équitable et le développement des relations avec les fournisseurs locaux.',
          },
          {
            es: 'Formularios de desempeño a terceros: para la construcción de relaciones laborales y contratos con proveedores se establecieron unos lineamientos para aplicar en el formato de evaluación donde prefiere prevalece el tipo y modelo de negocio.',
            en: 'Performance forms for third parties: to build working relationships and contracts with suppliers, guidelines were established to apply in an evaluation form where the type and business model of each supplier prevails.',
            fr: 'Formulaires de performance aux tiers : pour la construction de relations de travail et de contrats avec les fournisseurs, des directives ont été établies pour les appliquer dans un formulaire d\'évaluation où prévaut le type et le modèle d\'affaires de chaque fournisseur.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/ModeloNegocio-1-1024x616.webp`, caption: { es: 'Software ARES - Módulo de compras.', en: 'ARES Software - Purchasing Module.', fr: 'Logiciel ARES - Module achats.' } },
        ],
      },
      {
        titulo: { es: 'Gobierno corporativo', en: 'Corporate governance', fr: 'Gouvernance d\'entreprise' },
        parrafos: [
          {
            es: 'Esta dimensión relaciona a nuestra organización con los principios de rendición de cuentas y la transparencia, al dar a conocer estas políticas a nuestros empleados por medio de actividades y/o planes de acción, con el fin de que nuestros empleados tengan más conocimiento sobre nuestra organización.',
            en: 'This dimension links our organization to the principles of accountability and transparency, as well as how we disclose these policies through activities and/or action plans.',
            fr: 'Cette dimension relie notre organisation aux principes de la reddition de comptes et à la transparence, ainsi qu\'à la façon dont nous divulguons ces politiques par des activités et/ou des plans d\'action.',
          },
          {
            es: 'Socializaciones: mediante esta metodología hemos divulgado la misión y demás aspectos organizacionales (Plan estratégico) a nuestros empleados, tanto nuevos como antiguos.',
            en: 'Socialization: through this methodology we disclose the mission and other organizational aspects (Strategic Plan) of our employees.',
            fr: 'Socialisations : cette méthodologie nous a permis de divulguer la mission et d\'autres aspects organisationne s (Plan stratégique) à nos employés, qu\'ils soient nouveaux ou anciens.',
          },
          {
            es: 'Contrataciones: el 44% del personal está conformado por mujeres y el 56% por hombres, en nuestros contratos se busca principalmente la equidad al para la elección de los cargos directivos.',
            en: 'Hiring: 44% of the workforce is made up of women and 56% of men, in our hiring gender equality is mainly sought.',
            fr: 'Recrutements : 44 % du personnel est composé de femmes et 56 % d\'hommes ; dans nos recrutements, nous recherchons principalement l\'égalité des genres.',
          },
        ],
      },
      {
        titulo: { es: 'Prácticas laborales', en: 'Labor practices', fr: 'Pratiques de travail' },
        parrafos: [
          {
            es: 'Para Balkran Inc. S.A.S BIC como sociedad comercial de Beneficio e Interés Colectivo (BIC), es de vital importancia contribuir al cumplimiento de las metas de los Objetivos de Desarrollo Sostenible (ODS), proporcionando a todos los trabajadores en las distintas etapas de su experiencia laboral el acceso al desarrollo de habilidades, formación y aprendizaje práctico.',
            en: 'For Balkran Inc. S.A.S BIC, as a commercial Benefit and Collective Interest Company (BIC), contributing to the fulfillment of the goals of the Sustainable Development Goals (SDG) is of vital importance, providing all workers, in the different stages of their working experience, access to the development of skills, training and practical learning.',
            fr: 'Pour Balkran Inc. S.A.S BIC, en tant que société commerciale de Bénéfice et d\'Intérêt Collectif (BIC), il est vital de contribuer à la réalisation des objectifs des Objectifs de Développement Durable (ODD), en offrant à tous les travailleurs, aux différentes étapes de leur expérience professionnelle, l\'accès au développement de compétences, à la formation et à l\'apprentissage pratique.',
          },
          {
            es: 'De igual manera, se establecen las jornadas de desarrollo de las habilidades de los trabajadores y se promueve la conciliación entre la vida personal y laboral.',
            en: 'Likewise, worker skills development sessions are established and balance between personal and working life is promoted.',
            fr: 'De même, des journées de développement des compétences des travailleurs sont établies et la conciliation entre vie personnelle et vie professionnelle est favorisée.',
          },
        ],
      },
      {
        titulo: { es: 'Prácticas ambientales', en: 'Environmental practices', fr: 'Pratiques environnementales' },
        parrafos: [
          {
            es: 'En Balkran Inc. S.A.S BIC conocemos la importancia de reducir el impacto ambiental negativo que provocan los procesos productivos, es por esto, que hemos comenzado a aplicar medidas sencillas dentro de la actividad económica que realizamos.',
            en: 'At Balkran Inc. S.A.S BIC we know the importance of reducing the negative environmental impact caused by production processes, which is why we have begun to apply simple measures within the economic activity we carry out.',
            fr: 'Chez Balkran Inc. S.A.S BIC nous connaissons l\'importance de réduire l\'impact environnemental négatif provoqué par les processus de production, c\'est pourquoi nous avons commencé à appliquer des mesures simples dans le cadre de l\'activité économique que nous réalisons.',
          },
          {
            es: 'En la actualidad alrededor del 40% de nuestros trabajadores emplean medios de transporte como la bicicleta, para su desplazamiento, teniendo en cuenta que los trayectos de sus viviendas a la empresa no representan distancias demasiado largas.',
            en: 'Currently, around 40% of our workers use means of transport such as the bicycle for their commuting, taking into account that the journeys from their homes to the company do not represent too long distances.',
            fr: 'Actuellement, environ 40 % de nos travailleurs utilisent des moyens de transport tels que le vélo pour se déplacer, sachant que les trajets de leur domicile à l\'entreprise ne représentent pas des distances trop longues.',
          },
          {
            es: 'Parte de nuestra actividad económica se basa en el diseño, fabricación y comercialización de energizadores y accesorios para la instalación de paneles solares y baterías que permitan aprovechar la energía solar para satisfacer las necesidades de iluminación y electricidad de las poblaciones en sectores rurales.',
            en: 'Part of our economic activity is based on the design, manufacture and marketing of energizers and accessories for the installation of solar panels and batteries that allow harnessing solar energy to meet the lighting and electricity needs of populations in rural sectors.',
            fr: 'Une partie de notre activité économique repose sur la conception, la fabrication et la commercialisation d\'énergisateurs et d\'accessoires pour l\'installation de panneaux solaires et de batteries permettant de profiter de l\'énergie solaire pour satisfaire les besoins d\'éclairage et d\'électricité des populations des zones rurales.',
          },
          {
            es: 'En el año 2021, realizamos una jornada de recolección de botellas plásticas para la elaboración de transformadores, cuya función principal es generar los pulsos de corriente de nuestros energizadores. En la actividad realizada, se recolectaron en total 115 botellas plásticas de 1.5 y 3 litros proporcionadas por los trabajadores de la organización.',
            en: 'In 2021, we held a plastic bottle collection session for the manufacture of transformers, whose main function is to generate the current pulses of our energizers. In the activity carried out, a total of 115 plastic bottles of 1.5 and 3 liters provided by the organization\'s workers were collected.',
            fr: 'En 2021, nous avons organisé une journée de collecte de bouteilles en plastique pour la fabrication de transformateurs, dont la fonction principale est de générer les impulsions de courant de nos énergisateurs. Au cours de l\'activité réalisée, un total de 115 bouteilles en plastique de 1,5 et 3 litres fournies par les travailleurs de l\'organisation a été collecté.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Transporte-1024x768.webp`, caption: { es: 'Registro fotográfico, área de metalistería Balkran.', en: 'Photographic record, Balkran metalworking area.', fr: 'Registre photographique, zone de métallerie Balkran.' } },
          { src: `${R2}/eventos/WhatsApp-Image-2022-05-27-at-4.52.05-PM-1024x768.webp`, caption: { es: 'Registro fotográfico, instalación de Energizador en IENTAC - CAMPOHERMOSO.', en: 'Photographic record, installation of Energizer at IENTAC - CAMPOHERMOSO.', fr: 'Registre photographique, installation d\'un énergisateur à IENTAC - CAMPOHERMOSO.' } },
          { src: `${R2}/eventos/BotellasPlasticas1.webp`, caption: { es: 'Registro fotográfico, elaboración de transformadores para cerca eléctrica tercer piso Balkran.', en: 'Photographic record, manufacture of transformers for electric fence, third floor Balkran.', fr: 'Registre photographique, fabrication de transformateurs pour clôture électrique, troisième étage Balkran.' } },
          { src: `${R2}/eventos/BotellasPlasticas2.webp` },
          { src: `${R2}/eventos/BotellasPlasticas3.webp` },
          { src: `${R2}/eventos/BotellasPlasticas5.webp` },
        ],
      },
      {
        titulo: { es: 'Prácticas con la comunidad', en: 'Community practices', fr: 'Pratiques communautaires' },
        parrafos: [
          {
            es: 'Para nuestra organización el integrar a nuestra fuerza laboral a personas en situación de vulnerabilidad nos permite sensibilizarnos cada día más y conectarnos con las problemáticas de aquellas comunidades, es por esto que generamos beneficios a estas poblaciones al permitirles conocer y desarrollar sus habilidades, al mismo tiempo que contribuimos al mejoramiento de su calidad de vida.',
            en: 'For our organization, integrating people in vulnerable situations into our workforce allows us to become more aware every day and connect with the problems of those communities; this is why we generate benefits for these populations by allowing them to discover and develop their skills, while contributing to the improvement of their quality of life.',
            fr: 'Pour notre organisation, intégrer des personnes en situation de vulnérabilité dans notre main-d\'œuvre nous permet de nous sensibiliser davantage chaque jour et de nous connecter aux problèmes de ces communautés ; c\'est pourquoi nous générons des bénéfices pour ces populations en leur permettant de découvrir et de développer leurs compétences, tout en contribuant à l\'amélioration de leur qualité de vie.',
          },
          {
            es: 'Balkran Inc. S.A.S BIC ha generado empleo en su mayoría para madres cabeza de hogar brindándoles un sustento económico con el cual pueden cumplir con sus obligaciones de apoyo, cuidado y manutención a sus familias.',
            en: 'Balkran Inc. S.A.S BIC has generated employment, mostly for mothers who are heads of household, providing them with economic support with which they can meet their obligations of support, care and maintenance of their families.',
            fr: 'Balkran Inc. S.A.S BIC a généré de l\'emploi, principalement pour les mères chefs de famille, en leur offrant un soutien économique avec lequel elles peuvent assumer leurs obligations d\'appui, de soin et de subsistance de leurs familles.',
          },
        ],
      },
      {
        titulo: { es: 'Conclusiones', en: 'Conclusions', fr: 'Conclusions' },
        parrafos: [
          {
            es: 'Para Balkran Inc. S.A.S BIC el implementar una herramienta de evaluación y gestión como lo es el reporte de sociedades BIC es de gran ayuda ya que nos permite realizar un diagnóstico de nuestra organización en los aspectos relacionados con nuestra actividad comercial y económica y las acciones concretas que realizamos en beneficio del bienestar de nuestros trabajadores, el aporte que le hacemos a la equidad social de nuestro país y por supuesto la participación que tenemos en el camino de la protección y conservación del medio ambiente.',
            en: 'For Balkran Inc. S.A.S BIC, implementing an evaluation and management tool such as the BIC companies report is of great help since it allows us to carry out a diagnosis of our organization in the aspects related to our commercial and economic activity and the concrete actions we take for the benefit of the well-being of our workers, the contribution we make to the social equity of our country and, of course, the participation we have in the path of protecting and conserving the environment.',
            fr: 'Pour Balkran Inc. S.A.S BIC, la mise en œuvre d\'un outil d\'évaluation et de gestion tel que le rapport des sociétés BIC est d\'une grande aide puisqu\'il nous permet de réaliser un diagnostic de notre organisation sur les aspects liés à notre activité commerciale et économique et les actions concrètes que nous menons au bénéfice du bien-être de nos travailleurs, l\'apport que nous faisons à l\'équité sociale de notre pays et, bien sûr, la participation que nous avons sur le chemin de la protection et de la conservation de l\'environnement.',
          },
          {
            es: 'Estas dimensiones son una sinergia que tiene como único objetivo permitir a nuestra organización operar de forma integral proporcionando un desarrollo de nuestras actividades con impactos positivos tanto en un entorno externo como interno, concediéndonos, de acuerdo al resultado de este reporte, precisar en qué estado nos encontramos, y a partir de ello, establecer unos programas de acciones diseñados para contrarrestar las falencias y convertirlas en oportunidades de mejora para nuestra organización.',
            en: 'These dimensions are a synergy whose sole objective is to allow our organization to operate comprehensively, providing a development of our activities with positive impacts both in an external and internal environment, granting us, according to the result of this report, to specify the state we are in, and from there, to establish action programs designed to counteract the shortcomings and turn them into improvement opportunities for our organization.',
            fr: 'Ces dimensions sont une synergie dont l\'unique objectif est de permettre à notre organisation de fonctionner de manière intégrale, en assurant un développement de nos activités avec des impacts positifs tant sur un environnement externe qu\'interne, nous accordant, selon le résultat de ce rapport, la possibilité de préciser dans quel état nous nous trouvons et, à partir de là, d\'établir des programmes d\'actions conçus pour contrer les faiblesses et les transformer en opportunités d\'amélioration pour notre organisation.',
          },
        ],
      },
    ],
  },
  {
    slug: '4to-congreso-de-sostenibilidad',
    titulo: { es: '4to Congreso de Sostenibilidad', en: '4th Sustainability Congress', fr: '4e Congrès de la durabilité' },
    fecha: { es: '29 de abril de 2022', en: 'April 29, 2022', fr: '29 avril 2022' },
    fechaISO: '2022-04-29',
    imagen: `${R2}/evento_congreso.webp`,
    resumen: {
      es: 'La Asociación Bancaria y de Entidades Financieras de Colombia, Asobancaria, es el gremio más representativo del sector financiero colombiano, dedicada a proteger, ampliar, mejorar y representar los intereses económicos entre las entidades y las empresas colombianas.',
      en: 'The Banking and Financial Entities Association of Colombia, Asobancaria, is the most representative guild of the Colombian financial sector, dedicated to protecting, expanding, improving and representing the economic interests among entities and Colombian companies.',
      fr: 'L\'Association bancaire et des entités financières de la Colombie, Asobancaria, est le groupement le plus représentatif du secteur financier colombien, dédiée à protéger, élargir, améliorer et représenter les intérêts économiques entre les entités et les entreprises colombiennes.',
    },
    categoria: { es: 'Evento', en: 'Event', fr: 'Événement' },
    descripcionCorta: {
      es: 'Balkran participó en la mesa de negocios del 4to Congreso de Sostenibilidad, destacando sus soluciones solares.',
      en: 'Balkran participated in the business roundtable of the 4th Sustainability Congress, highlighting its solar solutions.',
      fr: 'Balkran a participé à la table d\'affaires du 4e Congrès de la durabilité, en mettant en avant ses solutions solaires.',
    },
    secciones: [
      {
        parrafos: [
          {
            es: 'La Asociación Bancaria y de Entidades Financieras de Colombia, Asobancaria, es el gremio más representativo del sector financiero colombiano, esta entidad está dedicada a proteger, ampliar, mejorar y representar, los intereses económicos entre las entidades y las empresas colombianas.',
            en: 'The Banking and Financial Entities Association of Colombia, Asobancaria, is the most representative guild of the Colombian financial sector; this entity is dedicated to protecting, expanding, improving and representing the economic interests between entities and Colombian companies.',
            fr: 'L\'Association bancaire et des entités financières de la Colombie, Asobancaria, est le groupement le plus représentatif du secteur financier colombien ; cette entité est dédiée à protéger, élargir, améliorer et représenter les intérêts économiques entre les entités et les entreprises colombiennes.',
          },
        ],
      },
      {
        parrafos: [
          {
            es: 'Debido a este gran trabajo crearon esta rueda de negocios donde se pudieran encontrar los diferentes protagonistas del desarrollo económico del país, teniendo especial atención a todos los entes que promueven el desarrollo de actividades que aporten a la sostenibilidad ambiental, algo fundamental para todo el mundo.',
            en: 'Due to this great work, they created this business roundtable where the different protagonists of the country\'s economic development could meet, paying special attention to all entities that promote the development of activities that contribute to environmental sustainability, something fundamental for everyone.',
            fr: 'Grâce à ce grand travail, ils ont créé cette ronde d\'affaires où les différents protagonistes du développement économique du pays pouvaient se rencontrer, en accordant une attention particulière à toutes les entités qui favorisent le développement d\'activités contribuant à la durabilité environnementale, quelque chose de fondamental pour le monde entier.',
          },
          {
            es: 'Nuestra empresa Balkran INC S.A.S BIC se ha destacado por integrar soluciones solares a todos nuestros productos y servicios, aportando eficiencia y ser amigables con el medio ambiente, fuimos partícipes y se crearon grandes expectativas comerciales, técnicas y de negocios.',
            en: 'Our company Balkran INC S.A.S BIC has stood out for integrating solar solutions into all our products and services, providing efficiency and being environmentally friendly; we participated and great commercial, technical and business expectations were created.',
            fr: 'Notre société Balkran INC S.A.S BIC s\'est distinguée en intégrant des solutions solaires à tous nos produits et services, apportant de l\'efficience et en étant respectueuse de l\'environnement ; nous avons participé et de grandes attentes commerciales, techniques et d\'affaires ont été créées.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/Congreso2.webp` },
          { src: `${R2}/eventos/Congreso1.webp`, caption: { es: 'Mesa de Negocios 29 abril del 2022.', en: 'Business Roundtable, April 29, 2022.', fr: 'Table d\'affaires du 29 avril 2022.' } },
        ],
      },
    ],
  },
  {
    slug: 'expobic-2022',
    titulo: { es: 'ExpoBIC 2022', en: 'ExpoBIC 2022', fr: 'ExpoBIC 2022' },
    fecha: { es: '8 de abril de 2022', en: 'April 8, 2022', fr: '8 avril 2022' },
    fechaISO: '2022-04-08',
    imagen: `${R2}/evento_expobic.webp`,
    resumen: {
      es: 'Balkran INC S.A.S BIC estuvo presente en el desarrollo de las actividades de la feria empresarial de las Sociedades Comerciales de Beneficio e Interés Colectivo, o Sociedades BIC. En este evento se destacan las empresas que combinan las ventajas de su actividad comercial con acciones concretas para propender por el bienestar.',
      en: 'Balkran INC S.A.S BIC was present in the development of the activities of the business fair of the Commercial Benefit and Collective Interest Companies, or BIC Companies. This event highlights companies that combine the advantages of their commercial activity with concrete actions to promote well-being.',
      fr: 'Balkran INC S.A.S BIC a été présente au développement des activités de la foire commerciale des Sociétés Commerciales de Bénéfice et d\'Intérêt Collectif, ou Sociétés BIC. Cet événement met en avant les entreprises qui combinent les avantages de leur activité commerciale avec des actions concrètes pour promouvoir le bien-être.',
    },
    categoria: { es: 'Evento', en: 'Event', fr: 'Événement' },
    descripcionCorta: {
      es: 'Balkran INC S.A.S fue reconocida como empresa BIC en la feria empresarial ExpoBIC 2022, realizada del 5 al 7 de abril.',
      en: 'Balkran INC S.A.S was recognized as a BIC company at the ExpoBIC 2022 business fair, held from April 5 to 7.',
      fr: 'Balkran INC S.A.S a été reconnue comme entreprise BIC lors de la foire commerciale ExpoBIC 2022, tenue du 5 au 7 avril.',
    },
    secciones: [
      {
        parrafos: [
          {
            es: 'Balkran INC S.A.S BIC estuvo presente en el desarrollo de las actividades de la feria empresarial de las Sociedades Comerciales de Beneficio e Interés Colectivo, o Sociedades BIC.',
            en: 'Balkran INC S.A.S BIC was present in the development of the activities of the business fair of the Commercial Benefit and Collective Interest Companies, or BIC Companies.',
            fr: 'Balkran INC S.A.S BIC a été présente au développement des activités de la foire commerciale des Sociétés Commerciales de Bénéfice et d\'Intérêt Collectif, ou Sociétés BIC.',
          },
          {
            es: 'En este evento se destacan las empresas que se proponen combinar las ventajas de su actividad comercial y económica con acciones concretas para propender por el bienestar de sus trabajadores, aportar a la equidad social del país y contribuir a la protección del medio ambiente.',
            en: 'This event highlights companies that propose to combine the advantages of their commercial and economic activity with concrete actions to promote the well-being of their workers, contribute to the country\'s social equity and contribute to the protection of the environment.',
            fr: 'Cet événement met en avant les entreprises qui proposent de combiner les avantages de leur activité commerciale et économique avec des actions concrètes pour promouvoir le bien-être de leurs travailleurs, contribuer à l\'équité sociale du pays et à la protection de l\'environnement.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/ExpoBIC4-1-266x300.webp` },
          { src: `${R2}/eventos/ExpoBIC2-225x300.webp` },
        ],
      },
      {
        parrafos: [
          {
            es: 'Balkran INC S.A.S fue reconocida como empresa BIC resaltando el valor de ser sostenible por su labor en el ecosistema empresarial.',
            en: 'Balkran INC S.A.S was recognized as a BIC company, highlighting the value of being sustainable for its work in the business ecosystem.',
            fr: 'Balkran INC S.A.S a été reconnue comme entreprise BIC, soulignant la valeur d\'être durable pour son travail dans l\'écosystème des affaires.',
          },
        ],
        imagenes: [{ src: `${R2}/eventos/ExpoBIC1-768x1024.webp` }],
      },
      {
        parrafos: [
          {
            es: 'Balkran INC S.A.S BIC acompañó este gran evento llevando una muestra de nuestros productos y soluciones solares, apoyando desde nuestro sector, en el crecimiento de estas grandes alternativas de promoción a nivel nacional y entre las empresas que comparten este modelo de negocio, presentes en los grandes eventos de nuestro país.',
            en: 'Balkran INC S.A.S BIC accompanied this great event by bringing a sample of our products and solar solutions, supporting from our sector the growth of these great promotion alternatives nationwide and among companies sharing this business model, present at the great events of our country.',
            fr: 'Balkran INC S.A.S BIC a accompagné ce grand événement en apportant un échantillon de nos produits et solutions solaires, en soutenant depuis notre secteur la croissance de ces grandes alternatives de promotion au niveau national et parmi les entreprises qui partagent ce modèle d\'affaires, présentes dans les grands événements de notre pays.',
          },
        ],
        cita: {
          es: 'Balkran INC S.A.S BIC asistió a la feria empresarial ExpoBIC 2022 realizada del 5 al 7 de abril del 2022.',
          en: 'Balkran INC S.A.S BIC attended the ExpoBIC 2022 business fair, held from April 5 to 7, 2022.',
          fr: 'Balkran INC S.A.S BIC a assisté à la foire commerciale ExpoBIC 2022, tenue du 5 au 7 avril 2022.',
        },
        imagenes: [{ src: `${R2}/eventos/ExpoBIC6-1024x461.webp`, caption: { es: 'ExpoBIC 2022.', en: 'ExpoBIC 2022.', fr: 'ExpoBIC 2022.' } }],
      },
    ],
  },
  {
    slug: 'macrorrueda-90-cali',
    titulo: { es: 'Macrorrueda 90 Cali', en: 'Macrorrueda 90 Cali', fr: 'Macrorrueda 90 Cali' },
    fecha: { es: '1 de abril de 2022', en: 'April 1, 2022', fr: '1er avril 2022' },
    fechaISO: '2022-04-01',
    imagen: `${R2}/evento_macrorrueda.webp`,
    resumen: {
      es: 'Es el espacio comercial más importante de internacionalización del país, en donde exportadores colombianos y compradores internacionales llevan a cabo citas de negocio. Este año ProColombia cumplió 30 años, por lo que este encuentro se llevó a cabo en Cali, reuniendo a más de 3.000 empresarios nacionales e internacionales.',
      en: 'It is the most important commercial space for the internationalization of the country, where Colombian exporters and international buyers hold business meetings. This year ProColombia turned 30, so this meeting was held in Cali, bringing together more than 3,000 national and international entrepreneurs.',
      fr: 'C\'est l\'espace commercial le plus important d\'internationalisation du pays, où les exportateurs colombiens et les acheteurs internationaux tiennent des rendez-vous d\'affaires. Cette année, ProColombia a fêté ses 30 ans, c\'est pourquoi cette rencontre s\'est tenue à Cali, réunissant plus de 3 000 entrepreneurs nationaux et internationaux.',
    },
    categoria: { es: 'Evento', en: 'Event', fr: 'Événement' },
    descripcionCorta: {
      es: 'Balkran participó en la Macrorrueda 90 de ProColombia en Cali, el espacio comercial más importante de internacionalización del país.',
      en: 'Balkran participated in ProColombia\'s Macrorrueda 90 in Cali, the most important commercial space for the internationalization of the country.',
      fr: 'Balkran a participé à la Macrorrueda 90 de ProColombia à Cali, l\'espace commercial le plus important d\'internationalisation du pays.',
    },
    secciones: [
      {
        parrafos: [
          {
            es: 'Es el espacio comercial más importante de internacionalización del país, en donde exportadores colombianos y compradores internacionales llevan a cabo citas de negocio.',
            en: 'It is the most important commercial space for the internationalization of the country, where Colombian exporters and international buyers hold business meetings.',
            fr: 'C\'est l\'espace commercial le plus important d\'internationalisation du pays, où les exportateurs colombiens et les acheteurs internationaux tiennent des rendez-vous d\'affaires.',
          },
          {
            es: 'Este año ProColombia está cumpliendo 30 años por lo que este encuentro se llevó a cabo en Cali, reuniendo a más de 3.000 empresarios nacionales e internacionales.',
            en: 'This year ProColombia is turning 30, so this meeting was held in Cali, bringing together more than 3,000 national and international entrepreneurs.',
            fr: 'Cette année, ProColombia fête ses 30 ans, c\'est pourquoi cette rencontre s\'est tenue à Cali, réunissant plus de 3 000 entrepreneurs nationaux et internationaux.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/M4-1024x768.webp` },
          { src: `${R2}/eventos/M3-1024x768.webp` },
        ],
      },
      {
        parrafos: [
          {
            es: 'Esta actividad hace parte de la estrategia para la diversificación de mercados y de promoción de la oferta exportable de las empresas colombianas, entre las cuales se encuentra nuestra empresa por lo que se nos permitió presentar a otros países y a otros mercados la calidad de nuestros equipos y servicios, además de la capacidad de ser competitivos a nivel mundial.',
            en: 'This activity is part of the strategy for market diversification and the promotion of the exportable supply of Colombian companies, among which our company is included, which is why we were allowed to present to other countries and markets the quality of our equipment and services, as well as our capacity to be competitive worldwide.',
            fr: 'Cette activité fait partie de la stratégie de diversification des marchés et de promotion de l\'offre exportable des entreprises colombiennes, parmi lesquelles figure notre entreprise ; c\'est pourquoi nous avons pu présenter à d\'autres pays et marchés la qualité de nos équipements et services, ainsi que notre capacité à être compétitifs à l\'échelle mondiale.',
          },
          {
            es: 'Con esta actividad fue posible realizar contacto con países como: México, Panamá, Ecuador, Estados Unidos, Perú, Surinam, Venezuela, El Salvador y Guatemala.',
            en: 'With this activity it was possible to establish contact with countries such as: Mexico, Panama, Ecuador, United States, Peru, Suriname, Venezuela, El Salvador and Guatemala.',
            fr: 'Grâce à cette activité, il a été possible d\'établir un contact avec des pays tels que : le Mexique, le Panama, l\'Équateur, les États-Unis, le Pérou, le Suriname, le Venezuela, le Salvador et le Guatemala.',
          },
          {
            es: 'Estamos orgullosos de representar a nuestro país y seguir avanzando en la expansión de nuestra empresa.',
            en: 'We are proud to represent our country and continue advancing in the expansion of our company.',
            fr: 'Nous sommes fiers de représenter notre pays et de continuer à progresser dans l\'expansion de notre entreprise.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/M1-768x1024.webp` },
          { src: `${R2}/eventos/M2-768x1024.webp` },
        ],
      },
      {
        cita: {
          es: '31 de marzo y 1 de abril de 2022. ProColombia es un guía y aliado en el desarrollo de todas las actividades de exportación de Balkran INC S.A.S BIC.',
          en: 'March 31 and April 1, 2022. ProColombia is a guide and ally in the development of all the export activities of Balkran INC S.A.S BIC.',
          fr: '31 mars et 1er avril 2022. ProColombia est un guide et un allié dans le développement de toutes les activités d\'exportation de Balkran INC S.A.S BIC.',
        },
        imagenes: [{ src: `${R2}/eventos/M5-576x1024.webp` }],
      },
    ],
  },
  {
    slug: 'agroexpo-2021',
    titulo: { es: 'AgroExpo 2021', en: 'AgroExpo 2021', fr: 'AgroExpo 2021' },
    fecha: { es: '2 de noviembre de 2021', en: 'November 2, 2021', fr: '2 novembre 2021' },
    fechaISO: '2021-11-02',
    imagen: `${R2}/evento_agroexpo.webp`,
    resumen: {
      es: 'Agroexpo ha sido la feria más importante reuniendo al sector agropecuario a lo largo de 40 años, logrando consolidarse como la más representativa en Centroamérica y el Caribe. A pesar de las dificultades presentadas a causa de la pandemia por SARS CoV-2 se pudo realizar este evento, que cada 2 años busca consolidar el sector.',
      en: 'Agroexpo has been the most important fair bringing together the agricultural sector for 40 years, consolidating itself as the most representative in Central America and the Caribbean. Despite the difficulties caused by the SARS CoV-2 pandemic, this event was held, which every 2 years seeks to consolidate the sector.',
      fr: 'Agroexpo a été le salon le plus important rassemblant le secteur agricole pendant 40 ans, parvenant à se consolider comme le plus représentatif d\'Amérique centrale et des Caraïbes. Malgré les difficultés présentées à cause de la pandémie du SRAS CoV-2, cet événement a pu être réalisé, lequel cherche tous les 2 ans à consolider le secteur.',
    },
    categoria: { es: 'Evento', en: 'Event', fr: 'Événement' },
    descripcionCorta: {
      es: 'Balkran acompañó al sector agropecuario en AgroExpo 2021, llevando todas sus soluciones, en especial la línea solar.',
      en: 'Balkran accompanied the agricultural sector at AgroExpo 2021, bringing all its solutions, especially the solar line.',
      fr: 'Balkran a accompagné le secteur agricole à AgroExpo 2021, en apportant toutes ses solutions, en particulier la ligne solaire.',
    },
    secciones: [
      {
        parrafos: [
          {
            es: 'Agroexpo ha sido la feria más importante reuniendo al sector agropecuario a lo largo de 40 años, logrando consolidarse como la más representativa en Centroamérica y el Caribe. A pesar de las dificultades que se presentaron a causa de la pandemia por SARS CoV-2 se pudo realizar este evento, el cual cada 2 años busca abrir las puertas para la promoción y generación de negocios y contactos comerciales entre todos los protagonistas del gran mercado colombiano y de paso fortalecen la integración de nuevas tecnologías como ventas por redes y otras formas alternas de comercio.',
            en: 'Agroexpo has been the most important fair bringing together the agricultural sector for 40 years, consolidating itself as the most representative in Central America and the Caribbean. Despite the difficulties that arose due to the SARS CoV-2 pandemic, this event was held, which every 2 years seeks to open the doors for the promotion and generation of business and commercial contacts among all the protagonists of the great Colombian market and, in passing, strengthens the integration of new technologies such as online sales and other alternative forms of commerce.',
            fr: 'Agroexpo a été le salon le plus important rassemblant le secteur agricole pendant 40 ans, parvenant à se consolider comme le plus représentatif d\'Amérique centrale et des Caraïbes. Malgré les difficultés survenues à cause de la pandémie du SRAS CoV-2, cet événement a pu être réalisé, lequel cherche tous les 2 ans à ouvrir les portes pour la promotion et la génération d\'affaires et de contacts commerciaux parmi tous les protagonistes du grand marché colombien et, au passage, renforce l\'intégration de nouvelles technologies comme les ventes en ligne et d\'autres formes alternatives de commerce.',
          },
        ],
        imagenes: [
          { src: `${R2}/eventos/AgroExpo1-1024x768.webp` },
          { src: `${R2}/eventos/AgroExpo2-1024x768.webp` },
          { src: `${R2}/eventos/AgroExpo8-1024x768.webp` },
        ],
      },
      {
        parrafos: [
          {
            es: 'Balkran INC S.A.S acompañó a los sectores de agricultura y ganadería de Colombia, llevando todas nuestras soluciones, en especial nuestra línea solar.',
            en: 'Balkran INC S.A.S accompanied the agriculture and livestock sectors of Colombia, bringing all our solutions, especially our solar line.',
            fr: 'Balkran INC S.A.S a accompagné les secteurs de l\'agriculture et de l\'élevage de la Colombie, en apportant toutes nos solutions, en particulier notre ligne solaire.',
          },
          {
            es: 'Fueron 11 días donde compartimos experiencia, conocimos nuevos desarrollos y aportamos en el mejoramiento y tecnificación del campo colombiano.',
            en: 'It was 11 days where we shared experience, learned about new developments and contributed to the improvement and modernization of the Colombian countryside.',
            fr: 'Ce furent 11 jours au cours desquels nous avons partagé notre expérience, découvert de nouveaux développements et contribué à l\'amélioration et à la modernisation de la campagne colombienne.',
          },
        ],
        cita: { es: '22 de octubre al 1 de noviembre de 2021.', en: 'October 22 to November 1, 2021.', fr: '22 octobre au 1er novembre 2021.' },
        imagenes: [
          { src: `${R2}/eventos/AgroExpo5-1024x461.webp` },
          { src: `${R2}/eventos/AgroExpo3-576x1024.webp` },
          { src: `${R2}/eventos/AgroExpo4-576x1024.webp` },
          { src: `${R2}/eventos/AgroExpo6-576x1024.webp` },
          { src: `${R2}/eventos/AgroExpo7-576x1024.webp` },
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