'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Clock, Wrench, FileWarning, Headphones, CheckCircle2, XCircle, MessageSquareText, Mail } from 'lucide-react';
import { pick, type L10n } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

const coberturas: { titulo: L10n; parrafos: L10n[] }[] = [
  {
    titulo: {
      es: 'Hasta 90 días después de la compra',
      en: 'Up to 90 days after purchase',
      fr: "Jusqu'à 90 jours après l'achat",
    },
    parrafos: [
      {
        es: 'Si antes de los 90 días calendario de la fecha de compra del producto presenta fallas el energizador, correspondiente a fallas de fabricación o componentes defectuosos, se puede cambiar el equipo por uno nuevo, si así lo determina la inspección técnica del mismo, con autorización del área técnica para realizar dicho procedimiento.',
        en: 'If within the first 90 calendar days from the product purchase date the energizer presents failures due to manufacturing defects or defective components, the unit may be exchanged for a new one, if the technical inspection of the unit so determines, with authorization from the technical department to carry out said procedure.',
        fr: "Si, avant les 90 jours calendaires suivant la date d'achat du produit, l'énergiseur présente des défauts de fabrication ou des composants défectueux, l'appareil peut être échangé contre un neuf, si l'inspection technique de celui-ci le détermine ainsi, avec l'autorisation du service technique pour effectuer ladite procédure.",
      },
      {
        es: 'Para ejecutar el proceso de cambio de producto es requisito indispensable presentar la factura de compra del producto y el equipo debe estar en perfectas condiciones físicas; a su vez, los empaques deben ser entregados con el equipo defectuoso a cambiar.',
        en: 'To carry out the product exchange process, it is an essential requirement to present the product purchase invoice and the unit must be in perfect physical condition; likewise, the packaging must be delivered together with the defective unit to be exchanged.',
        fr: "Pour exécuter le processus d'échange du produit, il est indispensable de présenter la facture d'achat du produit et l'appareil doit être en parfait état physique ; de même, les emballages doivent être livrés avec l'appareil défectueux à remplacer.",
      },
      {
        es: 'El cliente deberá enviar evidencias fotográficas y/o audiovisuales para que el área técnica de la empresa apruebe el cambio inmediato del producto; de no cumplir esta condición, BALKRAN INC S.A.S BIC realizará el cobro respectivo por daños que no cubren la garantía.',
        en: 'The customer must send photographic and/or audiovisual evidence so that the company technical department approves the immediate exchange of the product; if this condition is not met, BALKRAN INC S.A.S BIC will make the corresponding charge for damages not covered by the warranty.',
        fr: "Le client devra envoyer des preuves photographiques et/ou audiovisuelles afin que le service technique de l'entreprise approuve l'échange immédiat du produit ; à défaut, BALKRAN INC S.A.S BIC effectuera le prélèvement correspondant pour les dommages non couverts par la garantie.",
      },
    ],
  },
  {
    titulo: {
      es: 'Desde 91 días hasta 24 meses después de la compra',
      en: 'From 91 days up to 24 months after purchase',
      fr: "De 91 jours jusqu'à 24 mois après l'achat",
    },
    parrafos: [
      {
        es: 'Si el equipo presenta fallas durante este lapso, el energizador deberá ingresar a servicio técnico para su mantenimiento y determinar si el daño presentado por el equipo hace parte o no de las fallas que cubre la garantía.',
        en: 'If the unit presents failures during this period, the energizer must be taken to technical service to determine whether the damage shown by the unit is or is not part of the failures covered by the warranty.',
        fr: "Si l'appareil présente des pannes au cours de cette période, l'énergiseur devra passer par le service technique afin de déterminer si le dommage présenté fait partie ou non des pannes couvertes par la garantie.",
      },
      {
        es: 'Los costos de envío y reparación sobre los productos a los cuales no se otorga la garantía deberán ser asumidos por el cliente.',
        en: 'Shipping and repair costs for products for which the warranty is not granted must be assumed by the client.',
        fr: 'Les frais d\u2019envoi et de réparation des produits pour lesquels la garantie n\u2019est pas accordée doivent être assumés par le client.',
      },
      {
        es: 'El cliente deberá enviar evidencias fotográficas y/o audiovisuales para revisión y validación del daño por parte del área técnica de la empresa BALKRAN INC S.A.S BIC.',
        en: 'The customer must send photographic and/or audiovisual evidence for review and validation of the damage by the technical department of BALKRAN INC S.A.S BIC.',
        fr: 'Le client devra envoyer des preuves photographiques et/ou audiovisuelles pour l\u2019examen et la validation du dommage par le service technique de BALKRAN INC S.A.S BIC.',
      },
    ],
  },
];

const excluidos: L10n[] = [
  {
    es: 'Casos fortuitos tales como: terremotos, vandalismo, sabotaje, inundaciones, incendios, exposición a ácidos, equipos ubicados a la intemperie, lucro cesante, asonada, robo, entre otros; es decir, todo lo que no tenga directa relación con el uso normal del equipo.',
    en: 'Fortuitous cases such as: earthquakes, vandalism, sabotage, floods, fires, exposure to acids, equipment located outdoors, loss of profit, riot, theft, among others; that is, everything not directly related to the normal use of the unit.',
    fr: 'Cas fortuits tels que : tremblements de terre, vandalisme, sabotage, inondations, incendies, exposition aux acides, matériels exposés aux intempéries, perte de profits, émeute, vol, entre autres ; c\u2019est-à-dire tout ce qui n\u2019est pas directement lié à l\u2019usage normal de l\u2019appareil.',
  },
  {
    es: 'Manipulación de los equipos por personal no autorizado de manera expresa y por escrito por parte del fabricante.',
    en: 'Handling of the units by personnel not expressly and in writing authorized by the manufacturer.',
    fr: 'La manipulation des équipements par un personnel non expressément et par écrit autorisé par le fabricant.',
  },
  {
    es: 'El uso indebido del bien por parte del consumidor; esto es, no atender las instrucciones de instalación, uso o mantenimiento indicadas en el manual del producto y en la garantía.',
    en: 'Inappropriate use of the product by the consumer; that is, failure to follow the installation, use or maintenance instructions set out in the product manual and in the warranty.',
    fr: 'L\u2019usage inapproprié du bien par le consommateur ; c\u2019est-à-dire le non-respect des instructions d\u2019installation, d\u2019utilisation ou d\u2019entretien indiquées dans le manuel du produit et dans la garantie.',
  },
  {
    es: 'Cuando el equipo presenta rotura de sellos, golpes o maltratos, mala manipulación, instalación o protección inadecuada.',
    en: 'When the unit presents broken seals, blows or mishandling, poor handling, or inappropriate installation or protection.',
    fr: 'Lorsque l\u2019appareil présente des sceaux brisés, des chocs ou des mauvais traitements, une mauvaise manipulation, une installation ou une protection inadéquate.',
  },
  {
    es: 'Un equipo que se encuentre fuera del periodo de cobertura.',
    en: 'A unit found outside the coverage period.',
    fr: 'Un appareil qui se trouve hors de la période de couverture.',
  },
  {
    es: 'Los equipos que presenten daño por descargas eléctricas (rayos), fallas por operaciones del sistema de cercado por falta de polo a tierra o deficiencia de este; no son causales de servicio por garantía y se cobrará su arreglo o mantenimiento; a su vez, los manejos por transporte si fuera el caso.',
    en: 'Units presenting damage from electrical discharges (lightning), or failures in the operation of the fencing system due to the lack of a ground pole or its deficiency; these are not grounds for warranty service and their repair or maintenance will be charged, as well as transport handling if applicable.',
    fr: 'Les appareils présentant des dommages dus à des décharges électriques (foudre), ou des défaillances dans le fonctionnement du système de clôture par manque de pôle de terre ou sa déficience ; ils ne constituent pas des motifs de service sous garantie et leur réparation ou leur entretien sera facturé, ainsi que les frais de transport le cas échéant.',
  },
];

const tramite: L10n[] = [
  {
    es: 'Adjuntar una copia de la factura de compra del producto; esta copia no debe exceder el tiempo de la cobertura de garantía, esto con el fin de agilizar el trámite y búsqueda en nuestra base de datos.',
    en: 'Attach a copy of the product purchase invoice; this copy must not exceed the warranty coverage period, in order to expedite the process and the search in our database.',
    fr: 'Joindre une copie de la facture d\u2019achat du produit ; cette copie ne doit pas dépasser la période de couverture de la garantie, afin d\u2019accélérer la procédure et la recherche dans notre base de données.',
  },
  {
    es: 'El producto debe traer todos los manuales, accesorios y empaques originales.',
    en: 'The product must come with all manuals, accessories and original packaging.',
    fr: 'Le produit doit être livré avec tous les manuels, accessoires et emballages d\u2019origine.',
  },
  {
    es: 'Los productos sobre los cuales se exige garantía deben hacerse llegar a las instalaciones de nuestra empresa.',
    en: 'The products for which the warranty is claimed must be delivered to our company facilities.',
    fr: 'Les produits pour lesquels la garantie est revendiquée doivent être acheminés aux installations de notre société.',
  },
  {
    es: 'Los costos de envío sobre los productos a los cuales no se otorga la garantía deben ser asumidos por el cliente.',
    en: 'Shipping costs for products for which the warranty is not granted must be assumed by the client.',
    fr: 'Les frais d\u2019envoi des produits pour lesquels la garantie n\u2019est pas accordée doivent être assumés par le client.',
  },
  {
    es: 'Todo producto que cumpla con los requisitos de garantía ingresa con una orden de trabajo a nuestro departamento de servicio técnico; serán diagnosticados de acuerdo con el orden de llegada y se realizará un diagnóstico preliminar en plazo máximo de 5 días hábiles.',
    en: 'Every product that meets the warranty requirements enters our technical service department with a work order; they will be diagnosed according to order of arrival and a preliminary diagnosis will be carried out within a maximum of 5 business days.',
    fr: 'Tout produit répondant aux conditions de garantie entre dans notre service technique avec un ordre de travail ; ils seront diagnostiqués selon l\u2019ordre d\u2019arrivée et un diagnostic préliminaire sera effectué dans un délai maximal de 5 jours ouvrés.',
  },
  {
    es: 'El tiempo de solución y entrega del producto en garantía al departamento de logística comprende máximo quince días hábiles.',
    en: 'The time to resolve and deliver the product under warranty to the logistics department comprises a maximum of fifteen business days.',
    fr: 'Le délai de résolution et de livraison du produit sous garantie au département logistique comprend quinze jours ouvrés maximum.',
  },
  {
    es: 'No se devolverá dinero al cliente.',
    en: 'No money will be refunded to the customer.',
    fr: 'Aucun remboursement en espèces ne sera effectué au client.',
  },
  {
    es: 'El departamento de servicio técnico no se hace responsable por solicitudes tramitadas a las cuales el cliente no haya dado una respuesta; esto aplica para garantías que el cliente debe recoger en las instalaciones de nuestra empresa y para equipos sin garantía a los cuales el cliente no ha dado respuesta sobre la cotización de la reparación del equipo.',
    en: 'The technical service department is not responsible for requests in process to which the client has not responded; this applies to warranties that the client must collect at our facilities and to units without warranty for which the client has not responded to the repair quotation.',
    fr: 'Le service technique n\u2019est pas responsable des demandes traitées auxquelles le client n\u2019a pas répondu ; cela s\u2019applique aux garanties que le client doit retirer dans nos installations et aux appareils sans garantie pour lesquels le client n\u2019a pas répondu au devis de réparation.',
  },
  {
    es: 'Cuando un equipo ya tramitado permanece en las instalaciones de nuestra empresa por un periodo superior a dos meses será declarado en abandono y se enviará a proceso de chatarrización.',
    en: 'When an already processed unit remains at our company facilities for more than two months, it will be declared abandoned and sent to a scrapping process.',
    fr: 'Lorsqu\u2019un appareil déjà traité demeure dans les installations de notre société pendant plus de deux mois, il sera déclaré abandonné et envoyé au processus de mise à la ferraille.',
  },
  {
    es: 'Si un equipo presenta daño por mal uso, por modificación, por instalación inadecuada, negligencia en su almacenamiento, transporte, reparado o modificado sin autorización de BALKRAN INC S.A.S BIC, no se acepta por garantía.',
    en: 'If a unit presents damage due to misuse, modification, inappropriate installation, negligence in its storage, transport, or has been repaired or modified without the authorization of BALKRAN INC S.A.S BIC, it will not be accepted under warranty.',
    fr: 'Si un appareil présente des dommages dus à un mauvais usage, à une modification, à une installation inadéquate, à une négligence dans son stockage, son transport, ou s\u2019il a été réparé ou modifié sans autorisation de BALKRAN INC S.A.S BIC, il ne sera pas accepté au titre de la garantie.',
  },
  {
    es: 'La garantía limitada no cubre costos asociados con instalación en sitio.',
    en: 'The limited warranty does not cover costs associated with on-site installation.',
    fr: 'La garantie limitée ne couvre pas les coûts associés à l\u2019installation sur site.',
  },
  {
    es: 'El tiempo de respuesta para los productos reportados por garantía será de 15 días hábiles, contados a partir de la fecha de recepción del equipo.',
    en: 'The response time for products reported under warranty will be 15 business days, counted from the date of receipt of the equipment.',
    fr: 'Le délai de réponse pour les produits signalés au titre de la garantie sera de 15 jours ouvrés, à compter de la date de réception de l\u2019appareil.',
  },
  {
    es: 'BALKRAN INC SAS BIC no se hace responsable por tiempos adicionales de entrega de los productos generados por las empresas transportadoras; las guías serán enviadas a cada uno de los clientes y estos deberán realizar el respectivo seguimiento.',
    en: 'BALKRAN INC SAS BIC is not responsible for additional product delivery times caused by transport companies; the tracking guides will be sent to each customer, who must follow up accordingly.',
    fr: 'BALKRAN INC SAS BIC n\u2019est pas responsable des délais de livraison supplémentaires des produits générés par les sociétés de transport ; les bons de suivi seront envoyés à chacun des clients, qui devront en assurer le suivi.',
  },
  {
    es: 'El cliente distribuidor cuenta con un tiempo máximo de 3 días calendario para reportar daños ocasionados en energizadores por temas de transporte.',
    en: 'The distributor customer has a maximum of 3 calendar days to report damage caused to energizers due to transport.',
    fr: 'Le client distributeur dispose d\u2019un délai maximal de 3 jours calendaires pour signaler les dommages causés aux énergiseurs pour des raisons de transport.',
  },
];

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    'heroBadge': 'Política de garantías',
    'heroTitle1': 'Garantías y',
    'heroTitle2': 'Devoluciones',
    'heroDesc': 'Todos los energizadores que fabrica y comercializa BALKRAN INC S.A.S BIC cuentan con garantía y respaldo.',
    'introBadge': 'Política de energizadores',
    'introTitle': 'Política para el manejo de garantías de energizadores',
    'introVigencia': 'Vigencia a partir de julio del 2025',
    'introP1': 'Para poder hacer efectiva la garantía recomendamos tener claridad sobre el tiempo de cobertura que tiene cada uno de los productos; este tiempo cambia de acuerdo con el tipo de producto.',
    'introP2': 'La garantía del producto empieza a ser efectiva a partir de la fecha de venta registrada en la factura con la cual adquirió el producto, factura emitida por el distribuidor autorizado o por BALKRAN INC S.A.S BIC.',
    'introP3': 'Es necesario consultar y tener en cuenta las recomendaciones de la instalación eléctrica, voltajes de polo a tierra, conexiones a neutro; si así lo requiere el producto, y las especificaciones establecidas en los diferentes manuales de instalación o manual de usuario del producto.',
    'nota1': 'Nota 1',
    'nota1Desc': 'Si se llega a extraviar la factura de compra, BALKRAN INC S.A.S BIC tomará el inicio de la garantía de acuerdo con la información de la fecha de fabricación registrada en los códigos de barras o códigos QR del producto.',
    'covRegionTitle': 'Periodo de garantía por tipo de producto',
    'covSub': 'Periodo de garantías según el tipo de componente:',
    'covImgAlt': 'Tabla del periodo de garantías según el tipo de componente del energizador',
    'exTitle': 'Condiciones especiales en donde no se otorga garantía',
    'traTitle': 'Trámite para hacer efectiva la garantía',
    'traIntro': 'Para su correspondiente trámite de garantía, todas las solicitudes deben seguir el procedimiento regular, el cual se relaciona a continuación:',
    'traCheck': 'Estas políticas pueden ser revisadas en nuestro sitio web www.cercasbalkran.com y cualquier duda será resuelta en cualquiera de nuestros canales de contacto.',
    'contactTitle': 'Datos de contacto departamento de servicio técnico',
    'mailLabel': 'E-Mail:',
    'waLabel': 'WhatsApp:',
    'pqrsTitle': '¿Quieres radicar una PQRS?',
    'pqrsDesc': 'Si usted quiere radicar una PQRS, puede hacerlo desde el siguiente formulario.',
    'pqrsBtn': 'Formulario PQRS',
  },
  en: {
    'heroBadge': 'Warranty Policy',
    'heroTitle1': 'Warranties and',
    'heroTitle2': 'Returns',
    'heroDesc': 'All energizers manufactured and marketed by BALKRAN INC S.A.S BIC are covered by a warranty and support.',
    'introBadge': 'Energizer policy',
    'introTitle': 'Policy for the management of energizer warranties',
    'introVigencia': 'Effective as of July 2025',
    'introP1': 'In order to make the warranty effective, we recommend being clear about the coverage period of each of the products; this period changes according to the type of product.',
    'introP2': 'The product warranty becomes effective as of the sale date recorded in the invoice with which you purchased the product, issued by the authorized distributor or by BALKRAN INC S.A.S BIC.',
    'introP3': 'It is necessary to consult and take into account the electrical installation recommendations, ground pole voltages, neutral connections, if the product requires them, and the specifications established in the different installation or product user manuals.',
    'nota1': 'Note 1',
    'nota1Desc': 'If the purchase invoice is lost, BALKRAN INC S.A.S BIC will take the start of the warranty based on the manufacturing date information recorded in the product barcodes or QR codes.',
    'covRegionTitle': 'Warranty period by product type',
    'covSub': 'Warranty period according to the type of component:',
    'covImgAlt': 'Table of the warranty period according to the type of energizer component',
    'exTitle': 'Special conditions under which no warranty is granted',
    'traTitle': 'Procedure to make the warranty effective',
    'traIntro': 'For the corresponding warranty procedure, all requests must follow the regular procedure, which is set out below:',
    'traCheck': 'These policies may be reviewed on our website www.cercasbalkran.com and any questions will be resolved through any of our contact channels.',
    'contactTitle': 'Contact information of the technical service department',
    'mailLabel': 'E-Mail:',
    'waLabel': 'WhatsApp:',
    'pqrsTitle': 'Do you want to file a PQRS?',
    'pqrsDesc': 'If you wish to file a PQRS, you can do so through the following form.',
    'pqrsBtn': 'PQRS Form',
  },
  fr: {
    'heroBadge': 'Politique de garantie',
    'heroTitle1': 'Garanties et',
    'heroTitle2': 'Retours',
    'heroDesc': 'Tous les énergiseurs fabriqués et commercialisés par BALKRAN INC S.A.S BIC sont couverts par la garantie et le support.',
    'introBadge': 'Politique des énergiseurs',
    'introTitle': 'Politique de gestion des garanties des énergiseurs',
    'introVigencia': 'En vigueur à partir de juillet 2025',
    'introP1': 'Pour rendre la garantie effective, nous recommandons d\u2019être clairs sur la durée de couverture de chacun des produits ; cette durée change selon le type de produit.',
    'introP2': 'La garantie du produit prend effet à partir de la date de vente enregistrée sur la facture avec laquelle vous avez acquis le produit, facture émise par le distributeur autorisé ou par BALKRAN INC S.A.S BIC.',
    'introP3': 'Il est nécessaire de consulter et de tenir compte des recommandations d\u2019installation électrique, des tensions de pôle de terre, des connexions au neutre, si le produit l\u2019exige, ainsi que des spécifications établies dans les différents manuels d\u2019installation ou le manuel d\u2019utilisation du produit.',
    'nota1': 'Note 1',
    'nota1Desc': 'Si la facture d\u2019achat vient à être égarée, BALKRAN INC S.A.S BIC prendra le début de la garantie en fonction des informations de date de fabrication enregistrées dans les codes à barres ou les codes QR du produit.',
    'covRegionTitle': 'Période de garantie par type de produit',
    'covSub': 'Période de garantie selon le type de composant :',
    'covImgAlt': 'Tableau de la période de garantie selon le type de composant de l\u2019énergiseur',
    'exTitle': 'Conditions particulières dans lesquelles aucune garantie n\u2019est accordée',
    'traTitle': 'Procédure pour rendre la garantie effective',
    'traIntro': 'Pour votre procédure de garantie correspondante, toutes les demandes doivent suivre la procédure régulière, énoncée ci-dessous :',
    'traCheck': 'Ces politiques peuvent être consultées sur notre site web www.cercasbalkran.com et toute question sera résolue par l\u2019un de nos canaux de contact.',
    'contactTitle': 'Coordonnées du service technique',
    'mailLabel': 'Courriel :',
    'waLabel': 'WhatsApp :',
    'pqrsTitle': 'Souhaitez-vous déposer une PQRS ?',
    'pqrsDesc': 'Si vous souhaitez déposer une PQRS, vous pouvez le faire via le formulaire suivant.',
    'pqrsBtn': 'Formulaire PQRS',
  },
};

export default function GarantiasPage() {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es');
  const l = (key: string) => L[lang][key] || L.es[key] || key;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              {l('heroBadge')}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              {l('heroTitle1')} <span className="text-[#ff5a00]">{l('heroTitle2')}</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              {l('heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('introBadge')}</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">
                {l('introTitle')}
              </h2>
              <p className="text-sm text-[#565e6e] font-semibold mt-2">{l('introVigencia')}</p>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>{l('introP1')}</p>
              <p>{l('introP2')}</p>
              <p>{l('introP3')}</p>
              <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm">
                <p className="font-semibold text-[#1a2130] mb-1">{l('nota1')}</p>
                <p className="text-justify">{l('nota1Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURAS */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          {coberturas.map((c, i) => (
            <div key={i} className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">{pick(lang, c.titulo)}</h2>
              </div>
              <div className="space-y-3 text-sm text-[#565e6e] leading-relaxed text-justify">
                {c.parrafos.map((p, j) => (
                  <p key={j}>{pick(lang, p)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERIODO DE GARANTÍA POR TIPO DE PRODUCTO */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">{l('covRegionTitle')}</h2>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
            <p className="text-sm text-[#565e6e] font-semibold">{l('covSub')}</p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100">
              <Image
                src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/tabla_garantias.webp"
                alt={l('covImgAlt')}
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONDICIONES ESPECIALES */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shrink-0"><FileWarning className="w-5 h-5" /></div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">
              {l('exTitle')}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {excluidos.map((e, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed text-justify">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{pick(lang, e)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRÁMITE */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Wrench className="w-5 h-5" /></div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">{l('traTitle')}</h2>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <p className="text-sm text-[#565e6e] leading-relaxed text-justify">
              {l('traIntro')}
            </p>
            <ol className="space-y-3">
              {tramite.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed text-justify">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{pick(lang, t)}</span>
                </li>
              ))}
            </ol>
            <p className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed text-justify">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{l('traCheck')}</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO + PQRS */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs h-full">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Headphones className="w-5 h-5" /></div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#111111]">{l('contactTitle')}</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-[#565e6e]">
                  <Mail className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  {l('mailLabel')} <a href="mailto:info@cercasbalkran.com" className="text-[#ff5a00] font-semibold hover:underline">info@cercasbalkran.com</a>
                </li>
                <li className="flex items-center gap-2.5 text-[#565e6e]">
                  <MessageSquareText className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  {l('waLabel')} <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="text-[#ff5a00] font-semibold hover:underline">+57 3114508064</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg h-full flex flex-col justify-center">
              <h3 className="font-display font-extrabold text-xl text-white">{l('pqrsTitle')}</h3>
              <p className="text-sm text-gray-300 leading-relaxed text-justify">
                {l('pqrsDesc')}
              </p>
              <Link href="/pqrs" className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-fit">
                <MessageSquareText className="w-4 h-4" /> {l('pqrsBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}