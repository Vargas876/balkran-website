'use client';

import { ShieldCheck, Phone, Mail, FileText, Lock, Users, Scale, PenLine } from 'lucide-react';
import { pick, type L10n } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

const derechos: L10n[] = [
  {
    es: 'Conocer, actualizar y rectificar sus datos personales frente a BALKRAN INC a través de los canales establecidos en estas políticas. Este derecho se podrá ejercer frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error o aquellos cuyo tratamiento esté expresamente prohibido o no haya sido autorizado.',
    en: 'Know, update and rectify your personal data with BALKRAN INC through the channels established in these policies. This right may be exercised regarding partial, inaccurate, incomplete, fragmented data, data that is misleading, or data whose processing is expressly prohibited or has not been authorized.',
    fr: 'Connaître, actualiser et rectifier vos données personnelles auprès de BALKRAN INC par les canaux établis dans ces politiques. Ce droit pourra être exercé à l\u2019égard des données partielles, inexactes, incomplètes, fragmentées, susceptibles d\u2019induire en erreur ou dont le traitement est expressément interdit ou n\u2019a pas été autorisé.',
  },
  {
    es: 'Acceder en forma gratuita e ilimitada a los datos proporcionados que hayan sido objeto de tratamiento.',
    en: 'Access, free and unlimited, the data provided that has been subject to processing.',
    fr: 'Accéder gratuitement et sans limite aux données fournies qui ont fait l\u2019objet d\u2019un traitement.',
  },
  {
    es: 'Solicitar a BALKRAN INC prueba de la autorización otorgada para el tratamiento de sus datos personales, salvo las excepciones previstas en la ley.',
    en: 'Request from BALKRAN INC proof of the authorization granted for the processing of your personal data, except for the exceptions provided by law.',
    fr: 'Demander à BALKRAN INC une preuve de l\u2019autorisation accordée pour le traitement de vos données personnelles, sauf exceptions prévues par la loi.',
  },
  {
    es: 'Ser informado por BALKRAN INC, previa solicitud presentada mediante los canales o medios dispuestos en estas políticas, sobre el uso que se les da a sus datos personales.',
    en: 'Be informed by BALKRAN INC, upon a request submitted through the channels or means provided in these policies, about the use given to your personal data.',
    fr: 'Être informé par BALKRAN INC, préalablement à une demande présentée par les canaux ou moyens prévus dans ces politiques, sur l\u2019usage donné à vos données personnelles.',
  },
  {
    es: 'Presentar consultas ante la empresa y asimismo interponer quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a lo dispuesto en la normatividad vigente.',
    en: 'Submit inquiries to the company and also file complaints before the Superintendencia de Industria y Comercio (SIC) for infringements of the provisions of the regulations in force.',
    fr: 'Présenter des consultations auprès de l\u2019entreprise et également déposer des plaintes auprès de la Superintendencia de Industria y Comercio (SIC) pour infractions aux dispositions de la réglementation en vigueur.',
  },
  {
    es: 'Solicitar la revocatoria y supresión de sus datos personales cuando BALKRAN INC incurra en conductas contrarias a la ley o a la constitución política a menos que exista un deber legal o contractual que haga imperativo conservar la información.',
    en: 'Request the revocation and deletion of your personal data when BALKRAN INC engages in conduct contrary to the law or the political constitution, unless there is a legal or contractual duty that makes it imperative to preserve the information.',
    fr: 'Demander la révocation et la suppression de vos données personnelles lorsque BALKRAN INC adopte des comportements contraires à la loi ou à la constitution politique, à moins qu\u2019un devoir légal ou contractuel ne rende impératif la conservation des informations.',
  },
  {
    es: 'Abstenerse de responder las preguntas sobre datos sensibles o sobre datos de los niños y adolescentes.',
    en: 'Refrain from answering questions about sensitive data or about data of children and adolescents.',
    fr: 'S\u2019abstenir de répondre aux questions sur les données sensibles ou sur les données relatives aux enfants et adolescents.',
  },
];

const requisitos: L10n[] = [
  {
    es: 'Datos de individualización del contacto (dirección física o electrónica y número telefónico).',
    en: 'Data to identify the contact (physical or electronic address and telephone number).',
    fr: 'Données d\u2019identification du contact (adresse physique ou électronique et numéro de téléphone).',
  },
  {
    es: 'Medios idóneos para recibir respuesta a la solicitud radicada.',
    en: 'Suitable means to receive a response to the filed request.',
    fr: 'Des moyens adéquats pour recevoir une réponse à la demande déposée.',
  },
  {
    es: 'Motivos, argumentos, hechos y demás que dan lugar al reclamo con una breve descripción del derecho que desea ejercer (conocer, actualizar, rectificar, solicitar prueba de la autorización otorgada, revocar, suprimir o acceder a la información).',
    en: 'Reasons, arguments, facts and any other elements that give rise to the claim, with a brief description of the right that you wish to exercise (know, update, rectify, request proof of the authorization granted, revoke, suppress or access the information).',
    fr: 'Motifs, arguments, faits et autres éléments à l\u2019origine de la réclamation, avec une brève description du droit que vous souhaitez exercer (connaître, actualiser, rectifier, demander la preuve de l\u2019autorisation accordée, révoquer, supprimer ou accéder aux informations).',
  },
  {
    es: 'Firma (si aplica) y número de identificación.',
    en: 'Signature (if applicable) and identification number.',
    fr: 'Signature (si applicable) et numéro d\u2019identification.',
  },
];

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    'heroBadge': 'Habeas Data',
    'heroTitle1': 'Políticas de Protección de',
    'heroTitle2': 'Datos Personales',
    'badgeLey': 'Ley 1581 de 2012',
    'badgeDecreto': 'Decreto 1377 de 2013',
    'introBadge': 'Responsable del tratamiento',
    'introTitle': 'BALKRAN INC. S.A.S. BIC',
    'introP1': 'Atendiendo a lo contemplado por la Ley 1581 de 2012, dentro de la cual se constituye el marco general de la protección de los datos personales y Habeas Data en Colombia, y el Decreto 1377 de 2013 (donde se reglamenta parcialmente la ley en mención), la empresa BALKRAN INC. S.A.S – BIC, sociedad identificada con Nit 900.215.119-6 con domicilio legal en la ciudad de Duitama, departamento de Boyacá, Colombia, cuya dirección es Carrera 26 No. 24 – 17 y teléfono de contacto (+57) 3114508064, correo electrónico info@cercasbalkran.com, en adelante denominada BALKRAN INC o la Empresa, es el responsable del tratamiento, recolección, almacenamiento, uso, circulación y disposición de los datos personales que en el ejercicio natural de sus actividades, derivadas de las relaciones comerciales con clientes actuales y potenciales, proveedores, colaboradores y, en general, de los terceros de quienes recopila datos personales.',
    'introP2': 'La presente política de tratamiento y protección de datos personales tiene como finalidad dar a conocer los mecanismos y procedimientos para hacer efectivos los derechos, informar quién es la persona encargada en la empresa de darle trámite a las peticiones, quejas, reclamos y consultas, comunicando las finalidades y el tratamiento a los cuales se someterán los datos personales en el desarrollo de las actividades comerciales de la empresa. La política se utiliza para el cumplimiento de los objetivos corporativos derivados de todo negocio legal.',
    'introP3': 'Cabe destacar que BALKRAN INC siempre está a la vanguardia, garantizando y fomentando valores que se sujetan al respeto, honradez, reserva, confidencialidad, disponibilidad y administración idónea de la información y de los datos personales, cumpliendo con lo contemplado por la constitución política, la ley y demás normas reglamentarias. La empresa podrá tratar los datos de sus clientes, empleados, ex empleados, proveedores, visitantes, invitados y personas que soliciten información. Las normas aplican a toda recolección, almacenamiento, uso, transferencia, transmisión y supresión de información relacionada con personas naturales determinadas o determinables, además del tratamiento que realicen terceros con los que BALKRAN INC acuerde actividades de tratamiento de datos.',
    'ambitoBadge': 'Ámbito de aplicación',
    'ambitoTitle': '¿A quién aplica?',
    'ambitoP1': 'La presente Política se aplicará a los terceros con quienes BALKRAN INC eventualmente suscriba contratos de tratamiento, con el fin de que esas personas conozcan las obligaciones que les aplicarán y las normas de seguridad y confidencialidad.',
    'ambitoP2': 'Las políticas también buscan la salvaguarda del derecho fundamental a la intimidad personal, ya sea de la empresa, las personas naturales públicas o jurídicas con las que BALKRAN INC tenga relación.',
    'ambitoP3': 'La información que se recolecta en las bases de datos de la empresa se usará para iniciar, adelantar y mantener la relación contractual, comercial y laboral.',
    'ambitoP4': 'Del mismo modo que los datos personales serán tratados o cedidos cuando un deber legal con usted así lo requiera.',
    'derechosBadge': 'Derechos de los titulares',
    'derTitle': 'Derechos de los Titulares',
    'derIntro1': 'Para los efectos de la presente política de tratamiento y protección de datos personales, se entenderán como titulares de derecho todas las personas que aparezcan registradas en las bases de datos de la empresa BALKRAN INC. S.A.S – BIC: I) Socios; II) empleados; III) proveedores; IV) clientes; V) aliados.',
    'derIntro2': 'El titular de los datos personales tendrá derecho a:',
    'derCanTitle': 'Canales para ejercer sus derechos',
    'derCanDesc': 'Línea de atención nacional (+57) 3112942523 y (+57) 311 4508064',
    'derFooter': 'Estos derechos los podrá ejercer el titular a través de los canales o medios dispuestos por BALKRAN INC. S.A.S – BIC para la atención al público: la línea de atención nacional (+57) 3112942523 y (+57) 311 4508064, el correo electrónico info@cercasbalkran.com y las oficinas de servicio al cliente en todo el país, disponibles de lunes a viernes de 7:00 a.m. a 6:00 p.m., para la atención de requerimientos relacionados con el tratamiento de sus datos personales y el ejercicio de los derechos mencionados en esta autorización.',
    'procBadge': 'Procedimiento',
    'procTitle': 'Procedimiento para el ejercicio del derecho del HÁBEAS DATA',
    'procIntro': 'En cumplimiento de las normas sobre protección de datos personales establecidas en la constitución política como derecho del Habeas Data, el titular del derecho tiene la facultad de controlar la información que sobre sí mismo se ha recolectado, administrada por cualquier entidad pública o privada, BALKRAN INC. S.A.S. – BIC presenta el procedimiento y requisitos mínimos para ejercer sus derechos:',
    'procDesc1': 'Para la radicación y atención de su solicitud le pedimos suministrar la siguiente información:',
    'vigTitle': 'Vigencia',
    'vigDesc': 'La presente política de tratamiento y protección de datos personales iniciará su vigencia el día 1 de enero de 2022 y tendrá validez mientras BALKRAN INC. S.A.S. – BIC ejerza su objeto social en Colombia. La Empresa se reserva el derecho de modificar y actualizar esta política cuando lo estime conveniente, informando oportunamente a los titulares a través de la página web y demás canales de contacto.',
  },
  en: {
    'heroBadge': 'Habeas Data',
    'heroTitle1': 'Personal Data',
    'heroTitle2': 'Protection Policies',
    'badge1': 'Ley 1581 de 2012',
    'badge2': 'Decreto 1377 de 2013',
    'introBadge': 'Processing responsible party',
    'introTitle': 'BALKRAN INC. S.A.S. BIC',
    'introP1': 'In accordance with the provisions of Law 1581 of 2012, which establishes the general framework for the protection of personal data and Habeas Data in Colombia, and Decree 1377 of 2013 (which partially regulates the aforementioned law), the company BALKRAN INC. S.A.S – BIC, sanctioned with NIT 900.215.119-6, with legal address in the city of Duitama, department of Boyacá, Colombia, whose address is Carrera 26 No. 24-17 and contact telephone +57 3114508064, email info@cercasbalkran.com, hereinafter referred to as BALKRAN INC or the Company, is responsible for the processing, collection, storage, use, circulation and disposal of the personal data that, in the natural exercise of its activities derived from commercial relations with current and potential clients, suppliers, collaborators and, in general, third parties, BALKRAN INC collects.',
        'introP2': 'This personal data processing and protection policy aims to disclose the mechanisms and procedures to make the rights effective, to inform who is the person in charge within the company of taking charge of processing the requests, complaints and consultations, and to communicate the purposes and the processing to which the personal data will be subject in the course of the company\'s activities.',
    'introP3': 'BALKRAN INC is always at the forefront, guaranteeing and promoting values subject to respect, honesty, reserve, confidentiality, availability and adequate management of the information of personal data, strictly complying with the provisions of the political constitution, the law and other regulatory standards.',
    'ambitoBadge': 'Scope of application',
    'ambitoTitle': 'Who does it apply to?',
    'ambitoP1': 'This Policy shall apply to third parties with whom BALKRAN INC eventually signs processing contracts, so that they are aware of the obligations that apply to them and of the safety and confidentiality standards they must adopt.',
    'ambitoP2': 'Likewise, these policies seek to safeguard the fundamental right to personal privacy, whether of the company, the natural or legal persons with whom BALKRAN INC has a relationship.',
    'ambitoP3': 'The information collected in the company\'s databases will be used to initiate and maintain the contractual, commercial and labor relationship, and to respond to the requests received.',
    'ambitoP4': 'Likewise, personal data will be processed or disclosed when a legal duty requires it and to meet or respond to a competent authority when formally requested.',
    'derechosBadge': 'Rights of the holders',
    'derTitle': 'Rights of the Holders',
    'derIntro1': 'For the purposes of this policy, the owners of the data are all persons that appear registered in the databases of BALKRAN INC. S.A.S – BIC: I) partners; II) employees; III) suppliers; IV) clients; V) allies.',
    'derIntro2': 'The owner of the personal data will have the right to:',
    'derCanTitle': 'Channels to exercise your rights',
    'derCanDesc': 'National customer service line (+57) 3112942523 and (+57) 311 4508064',
    'derFooter': 'The holder may exercise these rights through the channels or means provided by BALKRAN INC. S.A.S – BIC for customer service: the national customer service line (+57) 3112942523 and (+57) 311 4508064, the email info@cercasbalkran.com and the customer service offices throughout the country, available Monday to Friday from 7:00 a.m. to 6:00 p.m., to attend to requests related to the processing of their personal data and the exercise of the rights mentioned in this authorization.',
    'procBadge': 'Procedure',
    'procTitle': 'Procedure for exercising the HABEAS DATA right',
    'procIntro': 'In compliance with the provisions on the protection of personal data contemplated in the political constitution, Habeas Data is the right of every person to know, update and rectify the information collected about them in databases and files. Therefore, the owner of the right has the power to exercise control over the information collected about them, administered by public or private entities, in accordance with Law 1581 of 2012 and Decree 1377 of 2013.',
    'procDesc1': 'For the filing and processing of your request, we ask you to provide the following information:',
    'vigTitle': 'Validity',
    'vigDesc': 'This personal data processing and protection policy comes into force as of January 1, 2022 and shall remain in force while BALKRAN INC. S.A.S.– BIC carries out its corporate purpose in the territory of the Republic of Colombia, or until the law provides otherwise. The Company reserves the right to modify this policy at any time; any change will be informed to the public and published through the website and registered with the corresponding date.',
  },
  fr: {
    'heroBadge': 'Habeas Data',
    'heroTitle1': 'Politiques de protection des',
    'heroTitle2': 'données personnelles',
    'badge1': 'Loi 1581 de 2012',
    'badge2': 'Décret 1377 de 2013',
    'introBadge': 'Responsable du traitement',
    'introTitle': 'BALKRAN INC. S.A.S. BIC',
    'introP1': 'Au regard des dispositions de la Loi 1581 de 2012, qui établit le cadre général de la protection des données personnelles et du Habeas Data en Colombie, et du Décret 1377 de 2013 (qui réglemente partiellement ladite loi), la société BALKRAN INC. S.A.S – BIC, identifiée par le NIT 900.215.119-6, ayant son domicile légal dans la ville de Duitama, département de Boyacá, Colombie, située Carrera 26 No. 24-17, avec le téléphone de contact +57 3114508064, courriel info@cercasbalkran.com, ci-après dénommée BALKRAN INC ou la Société, est responsable du traitement, de la collecte, du stockage, de l\'utilisation et de la disposition des données personnelles.',
    'introP2': 'La présente politique de traitement et de protection des données personnelles vise à faire connaître les mécanismes et procédures pour rendre les droits effectifs, à informer qui est la personne responsable au sein de la société de l\u2019instruction des pétitions, plaintes, réclamations et consultations, et à communiquer les finalités et le traitement auxquels seront soumises les données personnelles dans le cadre des activités commerciales de la société.',
    'introP3': 'BALKRAN INC est toujours à l\u2019avant-garde, garantissant et promouvant les valeurs relatives au respect, à l\u2019honnêteté, à la réserve, à la confidentialité, à la disponibilité et à une gestion adéquate de l\u2019information et des données personnelles, conformément à la constitution politique, à la loi et aux autres normes réglementaires. La société pourra traiter les données de ses clients, employés, anciens employés, fournisseurs, visiteurs, invités et de toute personne demandant des informations. Ces normes s\u2019appliquent à toute collecte, stockage, usage, transfert, transmission et suppression d\u2019informations liées à des personnes physiques déterminées ou déterminables.',
    'ambitoBadge': 'Champ d\u2019application',
    'ambitoTitle': 'À qui cela s\u2019applique-t-il ?',
    'ambitoP1': 'La présente politique s\u2019applique aux tiers avec lesquels BALKRAN INC signe éventuellement des contrats de transmission de données, afin qu\u2019ils prennent connaissance des obligations qui leur incombent, des finalités et des normes de sécurité et de confidentialité qu\u2019ils doivent adopter lors du traitement pour le compte de la Société.',
    'ambitoP2': 'La politique cherche également à sauvegarder le droit fondamental à la vie privée, que ce soit de la Société ou des personnes qu’elles étant physiques ou morales avec lesquelles elle entretient une relation.',
    'ambitoP3': 'Les informations collectées dans les bases de données de la société serviront à entamer et maintenir la relation contractuelle, commerciale et professionnelle, ainsi qu\u2019à traiter les demandes présentées par les titulaires.',
    'ambitoP4': 'De même, les données personnelles seront traitées ou divulguées lorsque la loi l\u2019exige ou pour répondre à une autorité compétente lorsqu\u2019elle le requiert formellement.',
    'derechosBadge': 'Droits des titulaires',
    'derTitle': 'Droits des titulaires',
    'derIntro1': 'Pour les effets de la présente politique, les titulaires de données sont toutes les personnes apparaissant dans les bases de données de BALKRAN INC. S.A.S – BIC : I) associés ; II) employés ; III) fournisseurs ; IV) clients ; V) alliés.',
    'derIntro2': 'Le titulaire des données personnelles aura le droit :',
'derCanTitle': 'Canaux pour exercer vos droits',
    'derCanDesc': 'Ligne d\u2019assistance nationale +57 3112942523 et +57 311 4508064',
    'derFooter': 'Ces droits pourront être exercés par le titulaire par les canaux ou moyens mis à disposition par BALKRAN INC. S.A.S – BIC pour le service client : la ligne d\u2019assistance nationale (+57) 3112942523 et (+57) 311 4508064, le courriel info@cercasbalkran.com et les bureaux de service client dans tout le pays, disponibles du lundi au vendredi de 7h00 à 18h00, pour le traitement des demandes liées au traitement de leurs données personnelles et l\u2019exercice des droits mentionnés dans la présente autorisation.',
    'procBadge': 'Procédure',
    'procTitle': 'Procédure pour exercer le droit HABEAS DATA',
    'procIntro': 'Conformément aux dispositions protégeant les données personnelles prévues par la constitution politique, le habeas data est le droit de toute personne de connaître, actualiser et rectifier les informations recueillies à son sujet dans des bases de données ou des fichiers. Le titulaire du droit a donc la faculté de contrôler les informations recueillies à son sujet, administrées par des entités publiques ou privées, conformément à la Loi 1581 de 2012 et au Décret 1377 de 2013.',
    'procDesc1': 'Pour la radication et la prise en charge de votre demande, nous vous prions de fournir les informations suivantes :',
    'vigTitle': 'Validité',
    'vigDesc': 'La présente politique entre en vigueur le 1er janvier 2022 et restera en vigueur tant que BALKRAN INC. S.A.S – BIC exerce son objet social en République de Colombie, ou jusqu\u2019à ce que la loi en dispose autrement. La société se réserve le droit de modifier et de mettre à jour la présente politique à tout moment, en informant les titulaires en temps utile par le biais du site web et des autres canaux de contact.',
  },
};

export default function PoliticaDatosPage() {
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
            <div className="flex flex-wrap gap-3 pt-1 text-xs">
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2"><Scale className="w-3.5 h-3.5 text-[#ff5a00]" /> Ley 1581 de 2012</span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#ff5a00]" /> Decreto 1377 de 2013</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('introBadge')}</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">{l('introTitle')}</h2>
            </div>
            <div className="lg:col-span-9 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>{l('introP1')}</p>
              <p>{l('introP2')}</p>
              <p>{l('introP3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ÁMBITO DE APLICACIÓN */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('ambitoBadge')}</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">{l('ambitoTitle')}</h2>
          </div>
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">{l('ambitoP1')}</p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify mt-3">{l('ambitoP2')}</p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify mt-3">{l('ambitoP3')}</p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify mt-3">{l('ambitoP4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DERECHOS DE LOS TITULARES */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Users className="w-5 h-5" /></div>
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('derechosBadge')}</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">{l('derTitle')}</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-3xl text-justify">{l('derIntro1')}</p>
          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-3xl text-justify">{l('derIntro2')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {derechos.map((d, i) => (
              <div key={i} className="bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5 flex gap-4 items-start hover:border-orange-300 transition-colors">
                <span className="w-7 h-7 rounded-full bg-[#ff5a00] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#565e6e] leading-relaxed text-justify">{pick(lang, d)}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#fff7f0] border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></div>
              <div className="text-sm">
                <p className="font-semibold text-[#1a2130]">{l('derCanTitle')}</p>
                <p className="text-[#565e6e] mt-0.5">{l('derCanDesc')}</p>
              </div>
            </div>
            <a href="mailto:info@cercasbalkran.com" className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors shrink-0">
              <Mail className="w-4 h-4" /> info@cercasbalkran.com
            </a>
          </div>

          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-4xl text-justify">{l('derFooter')}</p>
        </div>
      </section>

      {/* PROCEDIMIENTO HÁBEAS DATA */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="flex items-start gap-3">
            <div className="w-11 h-12 rounded-xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><PenLine className="w-5 h-5" /></div>
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('procBadge')}</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">{l('procTitle')}</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-4xl text-justify">{l('procIntro')}</p>
          <p className="text-sm sm:text-base text-[#1a2130] font-semibold">{l('procDesc1')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requisitos.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#565e6e] font-medium leading-relaxed">{pick(lang, r)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIGENCIA */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ff5a00]" />
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">{l('vigTitle')}</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">{l('vigDesc')}</p>
          </div>
        </div>
      </section>

    </main>
  );
}