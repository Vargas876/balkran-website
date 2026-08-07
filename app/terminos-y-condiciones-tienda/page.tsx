import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, AlertTriangle, CreditCard, Copyright, Truck, Lock, MessageSquareText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de la Tienda',
  description:
    'Términos y condiciones de la tienda virtual de BALKRAN INC S.A.S. BIC: condiciones generales, aviso legal, medios de pago, envíos, propiedad intelectual, información confidencial y gestión de PQRS.',
  alternates: { canonical: '/terminos-y-condiciones-tienda' },
  openGraph: {
    title: 'Términos y Condiciones de la Tienda | Balkran',
    description: 'Condiciones generales de uso de la tienda virtual de Balkran: pagos, envíos, propiedad intelectual y gestión de PQRS.',
    url: '/terminos-y-condiciones-tienda',
  },
};

const clausulas = [
  {
    id: 'condiciones',
    icon: FileText,
    titulo: 'Condiciones generales',
    parrafos: [
      'Para comprar en el sitio es necesario ser mayor de edad y estar registrado. Los colores de los productos que se visualizan en el Sitio Web dependen de muchos factores, incluida la configuración de su pantalla. Todos los productos están sujetos a disponibilidad, y es posible que no podamos suministrarle su pedido; en ese caso nos comunicaremos por alguno de los medios registrados por usted para comunicarle la novedad.',
      'Los precios mostrados en el Sitio web están expresados en pesos colombianos (COP) e incluyen el IVA. Estos precios podrán ser revisados y modificados por BALKRAN INC S.A.S. BIC, si las condiciones lo requieren.',
    ],
  },
  {
    id: 'aviso',
    icon: AlertTriangle,
    titulo: 'Aviso legal',
    parrafos: [
      'Advertencia: Señor usuario, las condiciones y el aviso legal acá señalados son entendidos y aceptados por usted, desde el momento en el que hace uso del Sitio Web www.cercasbalkran.com. Al hacer uso de nuestra página web conoce y acepta sus condiciones generales de uso. Es responsabilidad del usuario el uso que le dé a la información acá contenida.',
      'BALKRAN INC S.A.S. BIC puede realizar cambios y modificaciones de diseño, presentación, contenido, precios y configuración de cualquier tipo, sin previo aviso a sus usuarios en su página web www.cercasbalkran.com.',
      'BALKRAN INC S.A.S. BIC le sugiere al usuario tener en cuenta las medidas de seguridad suministradas en esta tienda virtual para evitar fraudes y suplantaciones por personas ajenas y no autorizadas, acceder desde un computador seguro y confiable y no hacerlo desde computadores públicos. Sugiere mantener su contraseña bajo estrictas medidas de seguridad y privacidad, ya que es personal e intransferible; por lo tanto, cualquier movimiento o acción que realice en esta página será de su entera responsabilidad.',
    ],
  },
  {
    id: 'pagos',
    icon: CreditCard,
    titulo: 'Medios de pago',
    parrafos: [
      'Balkran INC SAS BIC, en alianza con PAYU, te ofrece diversas opciones de pago a través de tarjetas de crédito (MasterCard, Visa, American Express); además ofrecemos link de pago por transferencia de PAYPAL y WOMPI, transferencia bancaria de tu cuenta débito (PSE) y depósitos en efectivo en Efecty.',
      'PAYU es la plataforma de pagos electrónicos que utilizamos en nuestra página. Para mayor información puedes ingresar a: https://colombia.payu.com/legal/',
    ],
  },
  {
    id: 'propiedad',
    icon: Copyright,
    titulo: 'Propiedad intelectual',
    parrafos: [
      'Nuestra tienda virtual y sus contenidos son exclusivos de BALKRAN INC SAS BIC; razón por la cual nadie puede divulgar, vender, reproducir y/o comunicar la información acá expuesta total o parcial sin previa autorización nuestra.',
      'Adicionalmente, si se presenta un mal uso de la herramienta o plagio de cualquier tipo de información, estaremos en libertad de restringir el acceso por parte del usuario a la tienda virtual www.cercasbalkran.com y de tomar las acciones legales a las que corresponda.',
    ],
  },
  {
    id: 'envios',
    icon: Truck,
    titulo: 'Políticas de envío y tiempos de entrega',
    parrafos: [
      'Hacemos envíos a toda Colombia desde que la orden de compra es confirmada, entendiéndose por esto que el pago ya fue realizado. BALKRAN INC SAS BIC dispone de 1 a 3 días hábiles para la salida de los productos de nuestro centro logístico en Duitama. El tiempo de entrega está determinado por el destino y la logística tercerizada de la transportadora asociada en el envío y puede variar si el lugar de destino es local, regional, nacional o zona de difícil acceso.',
      'Estos tiempos de entrega pueden cambiar por motivos ajenos a nosotros, ya que el servicio de entrega es contratado con una empresa de mensajería; en este caso BALKRAN INC SAS BIC no se hace responsable por demoras. En caso de que no llegue el producto a su destino en el tiempo estipulado, el comprador debe enviar un mensaje al correo info@cercasbalkran.com informando el hecho. Luego de confirmar la pérdida, BALKRAN INC SAS BIC contará con un periodo de 15 días hábiles para resolver el caso, sea con la devolución del dinero o con el mismo producto.',
      'El envío tiene una tarifa variable por orden de compra o producto (constituye una o varias referencias en una misma transacción). Estas tarifas aplican en todo el territorio colombiano. El comprador estará exento de pagar el envío del producto ÚNICAMENTE cuando BALKRAN INC SAS BIC lo estipule, sea por campañas promocionales o en casos especiales.',
    ],
  },
  {
    id: 'confidencial',
    icon: Lock,
    titulo: 'Información confidencial',
    parrafos: [
      'BALKRAN INC SAS BIC se reserva el derecho de modificar los presentes términos para adaptarlos a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, BALKRAN INC SAS BIC anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.',
      'Los datos personales recogidos por BALKRAN INC SAS BIC serán objeto de tratamiento automatizado e incorporados a las correspondientes bases de datos o ficheros automatizados de datos de carácter personal de los que BALKRAN INC SAS BIC será titular y responsable.',
    ],
  },
];

const pqrsItems = [
  'El formulario para gestión de PQRS es el relacionado a continuación: https://www.cercasbalkran.com/pqrs/',
  'Toda comunicación con el cliente podrá realizarse a través de los medios dispuestos por la empresa, tales como comunicación telefónica, correo electrónico y/o redes sociales.',
  'El tiempo de respuesta de las PQRS será el acordado con el cliente y depende del tipo de solicitud.',
  'Si el PQR asociado corresponde a un radicado indicado a una transportadora (terceros para la prestación de servicios de envío contratados en el marco legal del contrato de compraventa firmado con nosotros), es necesario tener en cuenta que los tiempos de respuesta a solicitudes de cambio estarán sujetos a los términos y condiciones definidos por dicha compañía.',
];

export default function TerminosCondicionesPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Tienda virtual
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Términos y <span className="text-[#ff5a00]">Condiciones</span> de la Tienda
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Estos términos y condiciones constituyen un contrato jurídicamente vinculante entre usted y BALKRAN INC S.A.S. BIC. Al adquirir nuestros productos, estará aceptando estos términos y condiciones.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Acuerdo de uso</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">Antes de adquirir un producto</h2>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>
                Antes de adquirir un producto en nuestro Sitio Web www.cercasbalkran.com, debe leer atentamente estos términos y condiciones. Nos reservamos el derecho a modificar los términos y condiciones que rigen la tienda virtual y los productos.
              </p>
              <p>
                Cualquier modificación de los términos y condiciones se aplicará a todos los pedidos nuevos una vez se haya incluido en el texto de estos términos y condiciones y se haya publicado en la tienda virtual www.cercasbalkran.com. Consulte de forma periódica los términos y condiciones publicados en la tienda virtual a fin de asegurarse de que conoce y cumple lo establecido en la versión actual.
              </p>
              <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm">
                <p className="text-[#565e6e]">En caso de dudas sobre estos términos y condiciones, sobre los productos o sobre la tienda virtual, escríbanos a la dirección de correo electrónico <a href="mailto:info@cercasbalkran.com" className="text-[#ff5a00] font-semibold hover:underline">info@cercasbalkran.com</a></p>
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
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">{cl.titulo}</h2>
                  </div>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
                  {cl.parrafos.map((p, j) => (
                    <p key={j}>{p}</p>
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
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">PQRS</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">Radicación y procesos de PQR</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <ol className="space-y-3">
                {pqrsItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed text-justify bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5">
                    <span className="w-6 h-6 rounded-full bg-[#ff5a00] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg sticky top-24">
                <h3 className="font-display font-extrabold text-xl text-white">¿Tienes una petición, queja o reclamo?</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-justify">
                  Al momento de recibir su radicado, el tiempo de respuesta a las PQRS será acordado con el cliente dependiendo de su solicitud; en este tiempo se le dará información de los procesos posteriores al radicado para la gestión por parte de BALKRAN INC SAS BIC.
                </p>
                <Link href="/pqrs" className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-full">
                  <MessageSquareText className="w-4 h-4" /> Radicar PQRS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}