'use client';

import Link from 'next/link';
import { FileText, AlertTriangle, CreditCard, Copyright, Truck, Lock, MessageSquareText, type LucideIcon } from 'lucide-react';
import { pick, type L10n } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

const clausulas: { id: string; icon: LucideIcon; titulo: L10n; parrafos: L10n[] }[] = [
  {
    id: 'condiciones',
    icon: FileText,
    titulo: {
      es: 'Condiciones generales',
      en: 'General conditions',
      fr: 'Conditions générales',
    },
    parrafos: [
      {
        es: 'Para comprar en el sitio es necesario ser mayor de edad y estar registrado. Los colores de los productos que se visualizan en el Sitio Web dependen de muchos factores, incluida la configuración de su pantalla. Todos los productos están sujetos a disponibilidad, y es posible que no podamos suministrarle su pedido; en ese caso nos comunicaremos por alguno de los medios registrados por usted para comunicarle la novedad.',
        en: 'To purchase on the site you must be of legal age and registered. The colors of the products displayed on the Website depend on many factors, including your screen configuration. All products are subject to availability, and we may not be able to supply your order; in that case we will contact you through one of the means you have registered to inform you of the situation.',
        fr: 'Pour acheter sur le site, il est nécessaire d\u2019être majeur et d\u2019être enregistré. Les couleurs des produits affichés sur le site Web dépendent de nombreux facteurs, notamment la configuration de votre écran. Tous les produits sont soumis à disponibilité et il est possible que nous ne puissions pas fournir votre commande ; dans ce cas, nous vous contacterons par l\u2019un des moyens que vous avez enregistrés pour vous informer de la nouveauté.',
      },
      {
        es: 'Los precios mostrados en el Sitio Web están expresados en pesos colombianos (COP) e incluyen el IVA. Estos precios podrán ser revisados y modificados por BALKRAN INC S.A.S. BIC, si las condiciones lo requieren.',
        en: 'The prices displayed on the Website are expressed in Colombian pesos (COP) and include VAT. These prices may be reviewed and modified by BALKRAN INC S.A.S. BIC, if conditions so require.',
        fr: 'Les prix affichés sur le site Web sont exprimés en pesos colombiens (COP) et incluent la TVA. Ces prix peuvent être révisés et modifiés par BALKRAN INC S.A.S. BIC, si les conditions l\u2019exigent.',
      },
    ],
  },
  {
    id: 'aviso',
    icon: AlertTriangle,
    titulo: {
      es: 'Aviso legal',
      en: 'Legal notice',
      fr: 'Avis légal',
    },
    parrafos: [
      {
        es: 'Advertencia: Señor usuario, las condiciones y el aviso legal acá señalados son entendidos y aceptados por usted, desde el momento en el que hace uso del Sitio Web www.cercasbalkran.com. Al hacer uso de nuestra página web conoce y acepta sus condiciones generales de uso. Es responsabilidad del usuario el uso que le dé a la información acá contenida.',
        en: 'Warning: Dear user, the conditions and the legal notice set out herein are understood and accepted by you from the moment you use the Website www.cercasbalkran.com. By using our website you acknowledge and accept its general conditions of use. The use that the user makes of the information contained herein is their responsibility.',
        fr: 'Avertissement : Cher utilisateur, les conditions et l\u2019avis légal énoncés ici sont compris et acceptés par vous, dès le moment où vous utilisez le site Web www.cercasbalkran.com. En utilisant notre site Web, vous connaissez et acceptez ses conditions générales d\u2019utilisation. L\u2019usage que l\u2019utilisateur fait des informations contenues ici relève de sa responsabilité.',
      },
      {
        es: 'BALKRAN INC S.A.S. BIC puede realizar cambios y modificaciones de diseño, presentación, contenido, precios y configuración de cualquier tipo, sin previo aviso a sus usuarios en su página web www.cercasbalkran.com.',
        en: 'BALKRAN INC S.A.S. BIC may make changes and modifications to the design, presentation, content, prices and configuration of any kind, without prior notice to its users on its website www.cercasbalkran.com.',
        fr: 'BALKRAN INC S.A.S. BIC peut apporter des changements et des modifications de conception, de présentation, de contenu, de prix et de configuration de toute nature, sans préavis à ses utilisateurs sur son site Web www.cercasbalkran.com.',
      },
      {
        es: 'BALKRAN INC S.A.S. BIC le sugiere al usuario tener en cuenta las medidas de seguridad suministradas en esta tienda virtual para evitar fraudes y suplantaciones por personas ajenas y no autorizadas, acceder desde un computador seguro y confiable y no hacerlo desde computadores públicos. Sugiere mantener su contraseña bajo estrictas medidas de seguridad y privacidad, ya que es personal e intransferible; por lo tanto, cualquier movimiento o acción que realice en esta página será de su entera responsabilidad.',
        en: 'BALKRAN INC S.A.S. BIC suggests the user take into account the security measures provided in this virtual store to prevent fraud and impersonation by unauthorized third parties, access from a secure and reliable computer and not from public computers. It suggests keeping your password under strict security and privacy measures, since it is personal and non-transferable; therefore, any movement or action you perform on this page will be your entire responsibility.',
        fr: 'BALKRAN INC S.A.S. BIC recommande à l\u2019utilisateur de tenir compte des mesures de sécurité fournies dans cette boutique virtuelle pour éviter les fraudes et les usurpations d\u2019identité par des personnes étrangères et non autorisées, d\u2019accéder depuis un ordinateur sûr et fiable et de ne pas le faire depuis des ordinateurs publics. Il recommande de garder votre mot de passe sous des mesures strictes de sécurité et de confidentialité, car il est personnel et non transférable ; par conséquent, tout mouvement ou action effectué sur cette page relève de votre entière responsabilité.',
      },
    ],
  },
  {
    id: 'pagos',
    icon: CreditCard,
    titulo: {
      es: 'Medios de pago',
      en: 'Payment methods',
      fr: 'Moyens de paiement',
    },
    parrafos: [
      {
        es: 'BALKRAN INC SAS BIC, en alianza con PAYU, te ofrece diversas opciones de pago a través de tarjetas de crédito (MasterCard, Visa, American Express); además ofrecemos link de pago por transferencia de PAYPAL y WOMPI, transferencia bancaria de tu cuenta débito (PSE) y depósitos en efectivo en Efecty.',
        en: 'BALKRAN INC SAS BIC, in alliance with PAYU, offers you various payment options through credit cards (MasterCard, Visa, American Express); we also offer payment links by PAYPAL and WOMPI transfer, bank transfer from your debit account (PSE) and cash deposits at Efecty.',
        fr: 'BALKRAN INC SAS BIC, en alliance avec PAYU, vous propose différentes options de paiement par cartes de crédit (MasterCard, Visa, American Express) ; nous offrons également des liens de paiement par virement PAYPAL et WOMPI, des virements bancaires depuis votre compte débit (PSE) et des dépôts en espèces chez Efecty.',
      },
      {
        es: 'PAYU es la plataforma de pagos electrónicos que utilizamos en nuestra página. Para mayor información puedes ingresar a: https://colombia.payu.com/legal/',
        en: 'PAYU is the electronic payment platform we use on our page. For more information you can go to: https://colombia.payu.com/legal/',
        fr: 'PAYU est la plateforme de paiements électroniques que nous utilisons sur notre page. Pour plus d\u2019informations, vous pouvez consulter : https://colombia.payu.com/legal/',
      },
    ],
  },
  {
    id: 'propiedad',
    icon: Copyright,
    titulo: {
      es: 'Propiedad intelectual',
      en: 'Intellectual property',
      fr: 'Propriété intellectuelle',
    },
    parrafos: [
      {
        es: 'Nuestra tienda virtual y sus contenidos son exclusivos de BALKRAN INC SAS BIC; razón por la cual nadie puede divulgar, vender, reproducir y/o comunicar la información acá expuesta total o parcial sin previa autorización nuestra.',
        en: 'Our virtual store and its contents are exclusive to BALKRAN INC SAS BIC; therefore, no one may disclose, sell, reproduce and/or communicate the information displayed herein, in whole or in part, without our prior authorization.',
        fr: 'Notre boutique virtuelle et son contenu sont exclusifs à BALKRAN INC SAS BIC ; c\u2019est pourquoi personne ne peut divulguer, vendre, reproduire et/ou communiquer les informations exposées ici, en tout ou en partie, sans notre autorisation préalable.',
      },
      {
        es: 'Adicionalmente, si se presenta un mal uso de la herramienta o plagio de cualquier tipo de información, estaremos en libertad de restringir el acceso por parte del usuario a la tienda virtual www.cercasbalkran.com y de tomar las acciones legales a las que corresponda.',
        en: 'Additionally, if there is misuse of the tool or plagiarism of any kind of information, we will be free to restrict user access to the virtual store www.cercasbalkran.com and to take the corresponding legal actions.',
        fr: 'De plus, en cas de mauvaise utilisation de l\u2019outil ou de plagiat de toute sorte d\u2019informations, nous serons libres de restreindre l\u2019accès de l\u2019utilisateur à la boutique virtuelle www.cercasbalkran.com et d\u2019engager les actions légales correspondantes.',
      },
    ],
  },
  {
    id: 'envios',
    icon: Truck,
    titulo: {
      es: 'Políticas de envío y tiempos de entrega',
      en: 'Shipping policies and delivery times',
      fr: 'Politiques d\u2019expédition et délais de livraison',
    },
    parrafos: [
      {
        es: 'Hacemos envíos a toda Colombia desde que la orden de compra es confirmada, entendiéndose por esto que el pago ya fue realizado. BALKRAN INC SAS BIC dispone de 1 a 3 días hábiles para la salida de los productos de nuestro centro logístico en Duitama. El tiempo de entrega está determinado por el destino y la logística tercerizada de la transportadora asociada en el envío y puede variar si el lugar de destino es local, regional, nacional o zona de difícil acceso.',
        en: 'We ship throughout Colombia once the purchase order is confirmed, meaning that payment has already been made. BALKRAN INC SAS BIC has 1 to 3 business days for the dispatch of the products from our logistics center in Duitama. The delivery time is determined by the destination and the outsourced logistics of the carrier associated with the shipment and may vary if the destination is local, regional, national or a hard-to-reach area.',
        fr: 'Nous expédions dans toute la Colombie dès que la commande est confirmée, ce qui signifie que le paiement a déjà été effectué. BALKRAN INC SAS BIC dispose de 1 à 3 jours ouvrés pour l\u2019expédition des produits depuis notre centre logistique de Duitama. Le délai de livraison est déterminé par la destination et la logistique externalisée du transporteur associé à l\u2019envoi et peut varier si le lieu de destination est local, régional, national ou une zone difficile d\u2019accès.',
      },
      {
        es: 'Estos tiempos de entrega pueden cambiar por motivos ajenos a nosotros, ya que el servicio de entrega es contratado con una empresa de mensajería; en este caso BALKRAN INC SAS BIC no se hace responsable por demoras. En caso de que no llegue el producto a su destino en el tiempo estipulado, el comprador debe enviar un mensaje al correo info@cercasbalkran.com informando el hecho. Luego de confirmar la pérdida, BALKRAN INC SAS BIC contará con un periodo de 15 días hábiles para resolver el caso, sea con la devolución del dinero o con el mismo producto.',
        en: 'These delivery times may change for reasons beyond our control, since the delivery service is contracted with a courier company; in this case BALKRAN INC SAS BIC is not responsible for delays. If the product does not reach its destination within the stipulated time, the buyer must send a message to info@cercasbalkran.com reporting the fact. After confirming the loss, BALKRAN INC SAS BIC will have a period of 15 business days to resolve the case, either by refunding the money or delivering the same product.',
        fr: 'Ces délais de livraison peuvent changer pour des raisons indépendantes de notre volonté, car le service de livraison est sous-traité à une entreprise de messagerie ; dans ce cas, BALKRAN INC SAS BIC n\u2019est pas responsable des retards. Si le produit n\u2019arrive pas à destination dans le délai prévu, l\u2019acheteur doit envoyer un message au courriel info@cercasbalkran.com pour signaler le fait. Après confirmation de la perte, BALKRAN INC SAS BIC disposera d\u2019un délai de 15 jours ouvrés pour résoudre le cas, soit par le remboursement de l\u2019argent, soit par la livraison du même produit.',
      },
      {
        es: 'El envío tiene una tarifa variable por orden de compra o producto (constituye una o varias referencias en una misma transacción). Estas tarifas aplican en todo el territorio colombiano. El comprador estará exento de pagar el envío del producto ÚNICAMENTE cuando BALKRAN INC SAS BIC lo estipule, sea por campañas promocionales o en casos especiales.',
        en: 'Shipping has a variable rate per purchase order or product (it constitutes one or several references in the same transaction). These rates apply throughout the Colombian territory. The buyer will be exempt from paying for the shipping of the product ONLY when BALKRAN INC SAS BIC stipulates it, whether due to promotional campaigns or in special cases.',
        fr: 'L\u2019expédition a un tarif variable par commande ou produit (il constitue une ou plusieurs références dans une même transaction). Ces tarifs s\u2019appliquent sur tout le territoire colombien. L\u2019acheteur sera exonéré du paiement de l\u2019expédition du produit UNIQUEMENT lorsque BALKRAN INC SAS BIC le stipule, que ce soit pour des campagnes promotionnelles ou dans des cas spéciaux.',
      },
    ],
  },
  {
    id: 'confidencial',
    icon: Lock,
    titulo: {
      es: 'Información confidencial',
      en: 'Confidential information',
      fr: 'Informations confidentielles',
    },
    parrafos: [
      {
        es: 'BALKRAN INC SAS BIC se reserva el derecho de modificar los presentes términos para adaptarlos a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, BALKRAN INC SAS BIC anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.',
        en: 'BALKRAN INC SAS BIC reserves the right to modify these terms to adapt them to legislative or jurisprudential developments, as well as to industry practices. In such cases, BALKRAN INC SAS BIC will announce the changes introduced on this page with reasonable notice before their implementation.',
        fr: 'BALKRAN INC SAS BIC se réserve le droit de modifier les présentes conditions pour les adapter aux nouveautés législatives ou jurisprudentielles, ainsi qu\u2019aux pratiques du secteur. Dans ces cas, BALKRAN INC SAS BIC annoncera sur cette page les changements introduits avec un préavis raisonnable avant leur mise en œuvre.',
      },
      {
        es: 'Los datos personales recogidos por BALKRAN INC SAS BIC serán objeto de tratamiento automatizado e incorporados a las correspondientes bases de datos o ficheros automatizados de datos de carácter personal de los que BALKRAN INC SAS BIC será titular y responsable.',
        en: 'The personal data collected by BALKRAN INC SAS BIC will be subject to automated processing and incorporated into the corresponding databases or automated files of personal data for which BALKRAN INC SAS BIC will be the owner and responsible party.',
        fr: 'Les données personnelles collectées par BALKRAN INC SAS BIC feront l\u2019objet d\u2019un traitement automatisé et seront incorporées dans les bases de données ou fichiers automatisés de données à caractère personnel dont BALKRAN INC SAS BIC sera titulaire et responsable.',
      },
    ],
  },
];

const pqrsItems: L10n[] = [
  {
    es: 'El formulario para gestión de PQRS es el relacionado a continuación: https://www.cercasbalkran.com/pqrs/',
    en: 'The form for PQRS management is the one shown below: https://www.cercasbalkran.com/pqrs/',
    fr: 'Le formulaire pour la gestion des PQRS est celui indiqué ci-dessous : https://www.cercasbalkran.com/pqrs/',
  },
  {
    es: 'Toda comunicación con el cliente podrá realizarse a través de los medios dispuestos por la empresa, tales como comunicación telefónica, correo electrónico y/o redes sociales.',
    en: 'Any communication with the client may be carried out through the means provided by the company, such as telephone communication, email and/or social networks.',
    fr: 'Toute communication avec le client pourra être effectuée par les moyens mis à disposition par l\u2019entreprise, tels que la communication téléphonique, le courriel et/ou les réseaux sociaux.',
  },
  {
    es: 'El tiempo de respuesta de las PQRS será el acordado con el cliente y depende del tipo de solicitud.',
    en: 'The PQRS response time will be the one agreed with the client and depends on the type of request.',
    fr: 'Le délai de réponse des PQRS sera celui convenu avec le client et dépend du type de demande.',
  },
  {
    es: 'Si el PQR asociado corresponde a un radicado indicado a una transportadora (terceros para la prestación de servicios de envío contratados en el marco legal del contrato de compraventa firmado con nosotros), es necesario tener en cuenta que los tiempos de respuesta a solicitudes de cambio estarán sujetos a los términos y condiciones definidos por dicha compañía.',
    en: 'If the associated PQR corresponds to a filing submitted to a carrier (third parties for the provision of shipping services hired within the legal framework of the sales contract signed with us), it is necessary to take into account that the response times for exchange requests will be subject to the terms and conditions defined by said company.',
    fr: 'Si le PQR associé correspond à une demande déposée auprès d\u2019un transporteur (tiers pour la prestation de services d\u2019expédition engagés dans le cadre légal du contrat de vente signé avec nous), il est nécessaire de tenir compte du fait que les délais de réponse aux demandes d\u2019échange seront soumis aux termes et conditions définis par ladite société.',
  },
];

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    'heroBadge': 'Tienda virtual',
    'heroTitle1': 'Términos y',
    'heroTitle2': 'Condiciones',
    'heroTitle3': 'de la Tienda',
    'heroDesc': 'Estos términos y condiciones constituyen un contrato jurídicamente vinculante entre usted y BALKRAN INC S.A.S. BIC. Al adquirir nuestros productos, estará aceptando estos términos y condiciones.',
    'introBadge': 'Acuerdo de uso',
    'introTitle': 'Antes de adquirir un producto',
    'introP1': 'Antes de adquirir un producto en nuestro Sitio Web www.cercasbalkran.com, debe leer atentamente estos términos y condiciones. Nos reservamos el derecho a modificar los términos y condiciones que rigen la tienda virtual y los productos.',
    'introP2': 'Cualquier modificación de los términos y condiciones se aplicará a todos los pedidos nuevos una vez se haya incluido en el texto de estos términos y condiciones y se haya publicado en la tienda virtual www.cercasbalkran.com. Consulte de forma periódica los términos y condiciones publicados en la tienda virtual a fin de asegurarse de que conoce y cumple lo establecido en la versión actual.',
    'introDuda': 'En caso de dudas sobre estos términos y condiciones, sobre los productos o sobre la tienda virtual, escríbanos a la dirección de correo electrónico',
    'pqrsBadge': 'PQRS',
    'pqrsTitle': 'Radicación y procesos de PQR',
    'pqrsCardTitle': '¿Tienes una petición, queja o reclamo?',
    'pqrsCardDesc': 'Al momento de recibir su radicado, el tiempo de respuesta a las PQRS será acordado con el cliente dependiendo de su solicitud; en este tiempo se le dará información de los procesos posteriores al radicado para la gestión por parte de BALKRAN INC SAS BIC.',
    'pqrsBtn': 'Radicar PQRS',
  },
  en: {
    'heroBadge': 'Online store',
    'heroTitle1': 'Terms and',
    'heroTitle2': 'Conditions',
    'heroTitle3': 'of the Store',
    'heroDesc': 'These terms and conditions constitute a legally binding contract between you and BALKRAN INC S.A.S. BIC. By purchasing our products, you will be accepting these terms and conditions.',
    'introBadge': 'Use agreement',
    'introTitle': 'Before purchasing a product',
    'introP1': 'Before purchasing a product on our Website www.cercasbalkran.com, you must carefully read these terms and conditions. We reserve the right to modify the terms and conditions governing the online store and the products.',
    'introP2': 'Any modification of the terms and conditions will apply to all new orders once it has been included in the text of these terms and conditions and published on the online store www.cercasbalkran.com. Periodically consult the terms and conditions published on the online store to ensure that you know and comply with the provisions of the current version.',
    'introDuda': 'If you have any questions about these terms and conditions, about the products or about the online store, write to us at the email address',
    'pqrsBadge': 'PQRS',
    'pqrsTitle': 'Filing and PQR processes',
    'pqrsCardTitle': 'Do you have a petition, complaint or claim?',
    'pqrsCardDesc': 'Upon receiving your filing, the PQRS response time will be agreed with the client depending on the request; during this time you will be given information about the processes following the filing for management by BALKRAN INC SAS BIC.',
    'pqrsBtn': 'File PQRS',
  },
  fr: {
    'heroBadge': 'Boutique virtuelle',
    'heroTitle1': 'Termes et',
    'heroTitle2': 'Conditions',
    'heroTitle3': 'de la Boutique',
    'heroDesc': 'Ces termes et conditions constituent un contrat juridiquement contraignant entre vous et BALKRAN INC S.A.S. BIC. En acquérant nos produits, vous acceptez ces termes et conditions.',
    'introBadge': 'Accord d\u2019utilisation',
    'introTitle': 'Avant d\u2019acquérir un produit',
    'introP1': 'Avant d\u2019acquérir un produit sur notre site Web www.cercasbalkran.com, vous devez lire attentivement ces termes et conditions. Nous nous réservons le droit de modifier les termes et conditions qui régissent la boutique virtuelle et les produits.',
    'introP2': 'Toute modification des termes et conditions s\u2019appliquera à toutes les nouvelles commandes une fois qu\u2019elle aura été incluse dans le texte de ces termes et conditions et publiée dans la boutique virtuelle www.cercasbalkran.com. Consultez périodiquement les termes et conditions publiés dans la boutique virtuelle afin de vous assurer que vous connaissez et respectez ce qui est établi dans la version actuelle.',
    'introDuda': 'En cas de doute sur ces termes et conditions, sur les produits ou sur la boutique virtuelle, écrivez-nous à l\u2019adresse électronique',
    'pqrsBadge': 'PQRS',
    'pqrsTitle': 'Dépôt et processus PQR',
    'pqrsCardTitle': 'Avez-vous une pétition, une plainte ou une réclamation ?',
    'pqrsCardDesc': 'Au moment de recevoir votre dossier, le délai de réponse aux PQRS sera convenu avec le client en fonction de sa demande ; pendant ce délai, vous recevrez des informations sur les processus postérieurs au dépôt pour la gestion par BALKRAN INC SAS BIC.',
    'pqrsBtn': 'Déposer une PQRS',
  },
};

export default function TerminosCondicionesPage() {
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
              <FileText className="w-3.5 h-3.5" />
              {l('heroBadge')}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              {l('heroTitle1')} <span className="text-[#ff5a00]">{l('heroTitle2')}</span> {l('heroTitle3')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
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
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">{l('introTitle')}</h2>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>{l('introP1')}</p>
              <p>{l('introP2')}</p>
              <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm">
                <p className="text-[#565e6e]">{l('introDuda')} <a href="mailto:info@cercasbalkran.com" className="text-[#ff5a00] font-semibold hover:underline">info@cercasbalkran.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLÁUSULAS */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          {clausulas.map((cl, i) => {
            const Icon = cl.icon;
            return (
              <div key={cl.id} id={cl.id} className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff5a00] font-display text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{pick(lang, cl.titulo)}</h2>
                  </div>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
                  {cl.parrafos.map((p, j) => (
                    <p key={j}>{pick(lang, p)}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PQRS */}
      <section className="py-12 bg-white border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><MessageSquareText className="w-5 h-5" /></div>
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">{l('pqrsBadge')}</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">{l('pqrsTitle')}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <ol className="space-y-3">
                {pqrsItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed text-justify bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5">
                    <span className="w-6 h-6 rounded-full bg-[#ff5a00] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{pick(lang, item)}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg sticky top-24">
                <h3 className="font-display font-extrabold text-xl text-white">{l('pqrsCardTitle')}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-justify">
                  {l('pqrsCardDesc')}
                </p>
                <Link href="/pqrs" className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-full">
                  <MessageSquareText className="w-4 h-4" /> {l('pqrsBtn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}