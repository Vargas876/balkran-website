import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Clock, Wrench, FileWarning, Headphones, CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garantías y Devoluciones',
  description:
    'Política de garantías y devoluciones de BALKRAN INC S.A.S BIC. Conoce los tiempos de cobertura, el trámite para hacer efectiva la garantía y las condiciones en las que no se otorga.',
  alternates: { canonical: '/garantias-y-devoluciones' },
  openGraph: {
    title: 'Garantías y Devoluciones | Balkran',
    description: 'Política para el manejo de garantías de productos y energizadores BALKRAN. Tiempos de cobertura, trámites y condiciones.',
    url: '/garantias-y-devoluciones',
  },
};

// ---- Política general (abril 2022) ----
const coberturas2022 = [
  {
    titulo: 'Hasta 120 días después de la compra',
    descripcion:
      'Si antes de los 120 días calendario de la fecha de compra del producto presenta fallas en el energizador correspondientes a fallas de fabricación o componentes defectuosos, se puede cambiar el equipo por uno nuevo, si así lo determina la inspección técnica del mismo.',
  },
  {
    titulo: 'Desde 121 días hasta 24 meses después de la compra',
    descripcion:
      'Si el equipo presenta fallas durante este lapso, el energizador debe ingresar a servicio técnico para su mantenimiento y determinar si el daño presentado por el equipo hace parte o no de las fallas que cubre la garantía.',
  },
];

const excluidos2022 = [
  'Casos fortuitos tales como: terremotos, vandalismo, sabotaje, inundaciones, incendios, exposición a ácidos, equipos ubicados a la intemperie, lucro cesante, asonada, robo, entre otros; es decir, todo lo que no tenga directa relación con el normal uso del equipo.',
  'Manipulación de los equipos por personal no autorizado de manera expresa y por escrito por parte del fabricante.',
  'El uso indebido del bien por parte del consumidor; esto es, no atender las instrucciones de instalación, uso o mantenimiento indicadas en el manual del producto y en la garantía.',
  'Cuando el equipo presenta rompimiento de sellos, golpes o maltratos, mala manipulación, instalación o protección inadecuada.',
  'Un equipo que se encuentre fuera del periodo de cobertura.',
  'Los equipos que presenten daño por descargas eléctricas (rayos), fallas por operaciones del sistema de cercado por falta de polo a tierra o deficiencia de este; no son causales de servicio por garantía y se cobrará su arreglo o mantenimiento.',
];

const tramite2022 = [
  'Adjuntar una copia de la factura de compra del producto; esta copia no debe exceder el tiempo de la cobertura de garantía, esto con el fin de agilizar el trámite y búsqueda en nuestra base de datos.',
  'El producto debe traer todos los manuales, accesorios y empaques originales.',
  'Los productos sobre los cuales se exige garantía deben hacerse llegar a las instalaciones de nuestra empresa.',
  'Los costos de envío sobre los productos a los cuales no se otorga la garantía deben ser asumidos por el cliente.',
  'Todo producto que cumpla con los requisitos de garantía ingresa con una orden de trabajo a nuestro departamento de Servicio Técnico; serán diagnosticados de acuerdo con el orden de llegada y se realizará un diagnóstico preliminar en plazo máximo de una semana.',
  'El tiempo de solución y entrega del producto en garantía al departamento de logística comprende máximo quince días hábiles.',
  'No se devolverá dinero al cliente.',
  'El departamento de servicio técnico no se hace responsable por solicitudes tramitadas a las cuales el cliente no haya dado una respuesta; esto aplica para garantías que el cliente debe recoger en las instalaciones de nuestra empresa y para equipos sin garantía a los cuales el cliente no ha dado respuesta sobre la cotización de la reparación del equipo.',
  'Cuando un equipo ya tramitado permanece en las instalaciones de nuestra empresa por un periodo superior a dos meses serán declarados en abandono y se enviarán a proceso de chatarrización.',
  'Dañado por mal uso, por modificación, por instalación inadecuada, negligencia en su almacenamiento, transporte o manejo, reparado o modificado sin autorización de BALKRAN.',
  'La garantía limitada no cubre costos asociados con instalación en sitio.',
];

// ---- Política energizadores (julio 2025) ----
const coberturas2025 = [
  {
    titulo: 'Hasta 90 días después de la compra',
    descripcion:
      'Si antes de los 90 días calendario de la fecha de compra del producto presenta fallas el energizador correspondientes a fallas de fabricación o componentes defectuosos, se puede cambiar el equipo por uno nuevo, si así lo determina la inspección técnica del mismo, con autorización del área técnica para realizar dicho procedimiento.',
  },
  {
    titulo: 'Desde 91 días hasta 24 meses después de la compra',
    descripcion:
      'Si el equipo presenta fallas durante este lapso, el energizador debe ingresar a servicio técnico para su mantenimiento y determinar si el daño presentado por el equipo hace parte o no de las fallas que cubre la garantía.',
  },
];

const excluidos2025 = [
  'Casos fortuitos tales como: terremotos, vandalismo, sabotaje, inundaciones, incendios, exposición a ácidos, equipos ubicados a la intemperie, lucro cesante, asonada, robo, entre otros; es decir, todo lo que no tenga directa relación con el normal uso del equipo.',
  'Manipulación de los equipos por personal no autorizado de manera expresa y por escrito por parte del fabricante.',
  'El uso indebido del bien por parte del consumidor; esto es, no atender las instrucciones de instalación, uso o mantenimiento indicadas en el manual del producto y en la garantía.',
  'Cuando el equipo presenta rotura de sellos, golpes o maltratos, mala manipulación, instalación o protección inadecuada.',
  'Un equipo que se encuentre fuera del periodo de cobertura.',
  'Los equipos que presenten daño por descargas eléctricas (rayos), fallas por operaciones del sistema de cercado por falta de polo a tierra o deficiencia de este; no son causales de servicio por garantía y se cobrará su arreglo o mantenimiento; a su vez, los manejos por transporte si fuera el caso.',
];

const tramite2025 = [
  'Adjuntar una copia de la factura de compra del producto; esta copia no debe exceder el tiempo de la cobertura de garantía, esto con el fin de agilizar el trámite y búsqueda en nuestra base de datos.',
  'El producto debe traer todos los manuales, accesorios y empaques originales.',
  'Los productos sobre los cuales se exige garantía deben hacerse llegar a las instalaciones de nuestra empresa.',
  'Los costos de envío sobre los productos a los cuales no se otorga la garantía deben ser asumidos por el cliente.',
  'Todo producto que cumpla con los requisitos de garantía ingresa con una orden de trabajo a nuestro departamento de Servicio Técnico; serán diagnosticados de acuerdo con el orden de llegada y se realizará un diagnóstico preliminar en plazo máximo de 5 días hábiles.',
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
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Política de garantías
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Garantías y <span className="text-[#ff5a00]">Devoluciones</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Todos los productos que fabrica y comercializa BALKRAN INC S.A.S BIC cuentan con garantía y respaldo. El periodo de garantía de un producto empieza a correr a partir de la fecha en que se elabora la factura de venta bajo orden de pedido emitida por el cliente.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Vigencia</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">¿Desde cuándo corre la garantía?</h2>
            </div>
            <div className="lg:col-span-9 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed">
              <p>
                Todos los productos que fabrica y comercializa BALKRAN INC S.A.S BIC cuentan con garantía y respaldo. Para poder hacer efectiva la garantía les recomendamos tener claridad sobre el tiempo de cobertura que tiene cada uno de los productos; este tiempo cambia de acuerdo con el tipo de producto.
              </p>
              <p>
                El periodo de garantía que tiene un producto empieza a correr a partir de la fecha en que Balkran INC S.A.S BIC elabora la factura de venta bajo orden de pedido emitida por el cliente. Es necesario consultar y tener en cuenta las recomendaciones de la instalación eléctrica, voltajes de polo a tierra, conexiones a neutro, si así lo requiere el producto, y las especificaciones establecidas en los diferentes manuales.
              </p>
              <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm">
                <p className="font-semibold text-[#1a2130] mb-1">Datos de contacto del departamento de servicio técnico</p>
                <p className="text-[#565e6e]">E-Mail: <a href="mailto:info@cercasbalkran.com" className="text-[#ff5a00] font-semibold hover:underline">info@cercasbalkran.com</a> · WhatsApp: <a href="https://wa.me/573114508064" target="_blank" rel="noopener noreferrer" className="text-[#ff5a00] font-semibold hover:underline">+57 3114508064</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POLÍTICA GENERAL ABRIL 2022 */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="text-center space-y-1.5 max-w-3xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Política general</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111]">Política para el manejo de garantías</h2>
            <p className="text-sm text-[#565e6e] font-semibold">Vigencia a partir de abril del 2022</p>
          </div>

          {/* Coberturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coberturas2022.map((c, i) => (
              <div key={i} className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#111111]">{c.titulo}</h3>
                </div>
                <p className="text-sm text-[#565e6e] leading-relaxed">{c.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Tabla de garantías */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">Periodo de garantía por tipo de producto</h3>
                <p className="text-xs text-[#565e6e] font-medium mt-0.5">Reintegro según el tiempo de uso del producto</p>
              </div>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100">
              <Image
                src="/assets/images/tabla_garantias.png"
                alt="Tabla de porcentajes de reintegro de la garantía según el tiempo de uso del producto"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Excluidos */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shrink-0"><FileWarning className="w-5 h-5" /></div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">Condiciones especiales en donde no se otorga garantía</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {excluidos2022.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trámite */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Wrench className="w-5 h-5" /></div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">Trámite para hacer efectiva la garantía</h3>
            </div>
            <p className="text-sm text-[#565e6e] leading-relaxed">
              Para su correspondiente trámite de garantía, todas las solicitudes deben seguir el procedimiento regular, el cual se relaciona a continuación:
            </p>
            <ol className="space-y-3">
              {tramite2022.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* POLÍTICA ENERGIZADORES JULIO 2025 */}
      <section className="py-12 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="text-center space-y-1.5 max-w-3xl mx-auto">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Política de energizadores</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111]">Política para el manejo de garantías de energizadores</h2>
            <p className="text-sm text-[#565e6e] font-semibold">Vigencia a partir de julio del 2025</p>
          </div>

          <div className="bg-[#fff7f0] border border-orange-200/80 rounded-2xl p-5 text-sm text-[#565e6e] leading-relaxed">
            <p className="font-semibold text-[#1a2130] mb-1">Nota 1</p>
            <p>Si se llega a extraviar la factura de compra, BALKRAN INC S.A.S BIC tomará el inicio de la garantía de acuerdo con la información de la fecha de fabricación registrada en los códigos de barras o códigos QR del producto.</p>
          </div>

          {/* Coberturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coberturas2025.map((c, i) => (
              <div key={i} className="bg-[#fcfcfc] border border-gray-200/90 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#111111]">{c.titulo}</h3>
                </div>
                <p className="text-sm text-[#565e6e] leading-relaxed">{c.descripcion}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5 text-sm text-[#565e6e] leading-relaxed">
            <p className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>El cliente deberá enviar evidencias fotográficas y/o audiovisuales para que el área técnica de la empresa apruebe el cambio inmediato del producto; de no cumplir esta condición, BALKRAN INC S.A.S BIC realizará el cobro respectivo por daños que no cubren la garantía.</span></p>
          </div>

          {/* Periodo de garantías por componente */}
          <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-[#ff5a00]/40 text-[#ff5a00] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">Periodo de garantía por tipo de producto</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">Periodo de garantías según el tipo de componente:</p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/assets/images/tabla_garantias.png"
                alt="Periodo de garantías según el tipo de componente del energizador"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Excluidos */}
          <div className="bg-[#fcfcfc] border border-gray-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shrink-0"><FileWarning className="w-5 h-5" /></div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">Condiciones especiales en donde no se otorga garantía</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {excluidos2025.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#565e6e] leading-relaxed">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trámite */}
          <div className="bg-[#fcfcfc] border border-gray-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Wrench className="w-5 h-5" /></div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111111]">Trámite para hacer efectiva la garantía</h3>
            </div>
            <p className="text-sm text-[#565e6e] leading-relaxed">
              Para su correspondiente trámite de garantía, todas las solicitudes deben seguir el procedimiento regular, el cual se relaciona a continuación:
            </p>
            <ol className="space-y-3">
              {tramite2025.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#565e6e] leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA contacto */}
          <div className="bg-[#fff7f0] border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Headphones className="w-5 h-5" /></div>
              <div className="text-sm">
                <p className="font-semibold text-[#1a2130]">Departamento de servicio técnico</p>
                <p className="text-[#565e6e] mt-0.5">E-Mail: info@cercasbalkran.com · WhatsApp: +57 3114508064</p>
              </div>
            </div>
            <Link href="/pqrs" className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors shrink-0">
              Radicar una PQRS
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}