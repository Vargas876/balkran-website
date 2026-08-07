import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Clock, Wrench, FileWarning, Headphones, CheckCircle2, XCircle, MessageSquareText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garantías y Devoluciones',
  description:
    'Política de garantías y devoluciones de energizadores BALKRAN INC S.A.S BIC. Conoce los tiempos de cobertura, el trámite para hacer efectiva la garantía y las condiciones en las que no se otorga.',
  alternates: { canonical: '/garantias-y-devoluciones' },
  openGraph: {
    title: 'Garantías y Devoluciones | Balkran',
    description: 'Política para el manejo de garantías de energizadores BALKRAN. Tiempos de cobertura, trámites y condiciones.',
    url: '/garantias-y-devoluciones',
  },
};

const coberturas = [
  {
    titulo: 'Hasta 90 días después de la compra',
    parrafos: [
      'Si antes de los 90 días calendario de la fecha de compra del producto presenta fallas el energizador, correspondiente a fallas de fabricación o componentes defectuosos, se puede cambiar el equipo por uno nuevo, si así lo determina la inspección técnica del mismo, con autorización del área técnica para realizar dicho procedimiento.',
      'Para ejecutar el proceso de cambio de producto es requisito indispensable presentar la factura de compra del producto y el equipo debe estar en perfectas condiciones físicas; a su vez, los empaques deben ser entregados con el equipo defectuoso a cambiar.',
      'El cliente deberá enviar evidencias fotográficas y/o audiovisuales para que el área técnica de la empresa apruebe el cambio inmediato del producto; de no cumplir esta condición, BALKRAN INC S.A.S BIC realizará el cobro respectivo por daños que no cubren la garantía.',
    ],
  },
  {
    titulo: 'Desde 91 días hasta 24 meses después de la compra',
    parrafos: [
      'Si el equipo presenta fallas durante este lapso, el energizador debe ingresar a servicio técnico para su mantenimiento y determinar si el daño presentado por el equipo hace parte o no de las fallas que cubre la garantía.',
      'Los costos de envío y reparación sobre los productos a los cuales no se otorga la garantía deben ser asumidos por el cliente.',
      'El cliente deberá enviar evidencias fotográficas y/o audiovisuales para revisión y validación del daño por parte del área técnica de la empresa BALKRAN INC S.A.S BIC.',
    ],
  },
];

const excluidos = [
  'Casos fortuitos tales como: terremotos, vandalismo, sabotaje, inundaciones, incendios, exposición a ácidos, equipos ubicados a la intemperie, lucro cesante, asonada, robo, entre otros; es decir, todo lo que no tenga directa relación con el normal uso del equipo.',
  'Manipulación de los equipos por personal no autorizado de manera expresa y por escrito por parte del fabricante.',
  'El uso indebido del bien por parte del consumidor; esto es, no atender las instrucciones de instalación, uso o mantenimiento indicadas en el manual del producto y en la garantía.',
  'Cuando el equipo presenta rotura de sellos, golpes o maltratos, mala manipulación, instalación o protección inadecuada.',
  'Un equipo que se encuentre fuera del periodo de cobertura.',
  'Los equipos que presenten daño por descargas eléctricas (rayos), fallas por operaciones del sistema de cercado por falta de polo a tierra o deficiencia de este; no son causales de servicio por garantía y se cobrará su arreglo o mantenimiento; a su vez, los manejos por transporte si fuera el caso.',
];

const tramite = [
  'Adjuntar una copia de la factura de compra del producto; esta copia no debe exceder el tiempo de la cobertura de garantía, esto con el fin de agilizar el trámite y búsqueda en nuestra base de datos.',
  'El producto debe traer todos los manuales, accesorios y empaques originales.',
  'Los productos sobre los cuales se exige garantía deben hacerse llegar a las instalaciones de nuestra empresa.',
  'Los costos de envío sobre los productos a los cuales no se otorga la garantía deben ser asumidos por el cliente.',
  'Todo producto que cumpla con los requisitos de garantía ingresa con una orden de trabajo a nuestro departamento de servicio técnico; serán diagnosticados de acuerdo con el orden de llegada y se realizará un diagnóstico preliminar en plazo máximo de 5 días hábiles.',
  'El tiempo de solución y entrega del producto en garantía al departamento de logística comprende máximo quince días hábiles.',
  'No se devolverá dinero al cliente.',
  'El departamento de servicio técnico no se hace responsable por solicitudes tramitadas a las cuales el cliente no haya dado una respuesta; esto aplica para garantías que el cliente debe recoger en las instalaciones de nuestra empresa y para equipos sin garantía a los cuales el cliente no ha dado respuesta sobre la cotización de la reparación del equipo.',
  'Cuando un equipo ya tramitado permanece en las instalaciones de nuestra empresa por un periodo superior a dos meses serán declarados en abandono y se enviarán a proceso de chatarrización.',
  'Si un equipo presenta daño por mal uso, por modificación, por instalación inadecuada, negligencia en su almacenamiento, transporte, reparado o modificado sin autorización de BALKRAN INC S.A.S BIC, no se acepta por garantía.',
  'La garantía limitada no cubre costos asociados con instalación en sitio.',
  'El tiempo de respuesta para los productos reportados por garantía será de 15 días hábiles, contados a partir de la fecha de recepción del equipo.',
  'BALKRAN INC SAS BIC no se hace responsable por tiempos adicionales de entrega de los productos generados por las empresas transportadoras; las guías serán enviadas a cada uno de los clientes y estos deberán realizar el respectivo seguimiento.',
  'El cliente distribuidor cuenta con un tiempo máximo de 3 días calendario para reportar daños ocasionados en energizadores por temas de transporte.',
];

export default function GarantiasPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Política de garantías
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Garantías y <span className="text-[#ff5a00]">Devoluciones</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              Todos los energizadores que fabrica y comercializa BALKRAN INC S.A.S BIC cuentan con garantía y respaldo.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Política de energizadores</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">
                Política para el manejo de garantías de energizadores
              </h2>
              <p className="text-sm text-[#565e6e] font-semibold mt-2">Vigencia a partir de julio del 2025</p>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>
                Para poder hacer efectiva la garantía recomendamos tener claridad sobre el tiempo de cobertura que tiene cada uno de los productos; este tiempo cambia de acuerdo con el tipo de producto.
              </p>
              <p>
                La garantía del producto empieza a ser efectiva a partir de la fecha de venta registrada en la factura con la cual adquirió el producto, factura emitida por el distribuidor autorizado o por BALKRAN INC S.A.S BIC.
              </p>
              <p>
                Es necesario consultar y tener en cuenta las recomendaciones de la instalación eléctrica, voltajes de polo a tierra, conexiones a neutro; si así lo requiere el producto, y las especificaciones establecidas en los diferentes manuales de instalación o manual de usuario del producto.
              </p>
              <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm">
                <p className="font-semibold text-[#1a2130] mb-1">Nota 1</p>
                <p className="text-justify">Si se llega a extraviar la factura de compra, BALKRAN INC S.A.S BIC tomará el inicio de la garantía de acuerdo con la información de la fecha de fabricación registrada en los códigos de barras o códigos QR del producto.</p>
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
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">{c.titulo}</h2>
              </div>
              <div className="space-y-3 text-sm text-[#565e6e] leading-relaxed text-justify">
                {c.parrafos.map((p, j) => (
                  <p key={j}>{p}</p>
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
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">Periodo de garantía por tipo de producto</h2>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
            <p className="text-sm text-[#565e6e] font-semibold">Periodo de garantías según el tipo de componente:</p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100">
              <Image
                src="https://pub-bb81d345e2ff4a42b53daa6037caad09.r2.dev/assets/images/tabla_garantias.webp"
                alt="Tabla del periodo de garantías según el tipo de componente del energizador"
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
              Condiciones especiales en donde no se otorga garantía
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {excluidos.map((e, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed text-justify">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{e}</span>
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
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">Trámite para hacer efectiva la garantía</h2>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <p className="text-sm text-[#565e6e] leading-relaxed text-justify">
              Para su correspondiente trámite de garantía, todas las solicitudes deben seguir el procedimiento regular, el cual se relaciona a continuación:
            </p>
            <ol className="space-y-3">
              {tramite.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed text-justify">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed text-justify">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Estas políticas pueden ser revisadas en nuestro sitio web www.cercasbalkran.com y cualquier duda será resuelta en cualquiera de nuestros canales de contacto.</span>
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
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#111111]">Datos de contacto departamento de servicio técnico</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-[#565e6e]">
                  <Mail className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  E-Mail: <a href="mailto:info@cercasbalkran.com" className="text-[#ff5a00] font-semibold hover:underline">info@cercasbalkran.com</a>
                </li>
                <li className="flex items-center gap-2.5 text-[#565e6e]">
                  <MessageSquareText className="w-4 h-4 text-[#ff5a00] shrink-0" />
                  WhatsApp: <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="text-[#ff5a00] font-semibold hover:underline">+57 3114508064</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#111111] to-[#1e232d] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg h-full flex flex-col justify-center">
              <h3 className="font-display font-extrabold text-xl text-white">¿Quieres radicar una PQRS?</h3>
              <p className="text-sm text-gray-300 leading-relaxed text-justify">
                Si usted quiere radicar una PQRS, puede hacerlo desde el siguiente formulario.
              </p>
              <Link href="/pqrs" className="inline-flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors w-fit">
                <MessageSquareText className="w-4 h-4" /> Formulario PQRS
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}