import type { Metadata } from 'next';
import { ShieldCheck, Phone, Mail, FileText, Lock, Users, Scale, PenLine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Protección de Datos Personales',
  description:
    'Política de tratamiento y protección de datos personales de BALKRAN INC S.A.S BIC de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Habeas Data) en Colombia.',
  alternates: { canonical: '/politica-datos-personales' },
  openGraph: {
    title: 'Política de Protección de Datos Personales | Balkran',
    description: 'Conoce la política de tratamiento y protección de datos personales de BALKRAN INC S.A.S BIC conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.',
    url: '/politica-datos-personales',
  },
};

const derechos = [
  'Conocer, actualizar y rectificar sus datos personales frente a BALKRAN INC a través de los canales establecidos en estas políticas. Este derecho se podrá ejercer frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error o aquellos cuyo tratamiento esté expresamente prohibido o no haya sido autorizado.',
  'Acceder en forma gratuita e ilimitada a los datos proporcionados que hayan sido objeto de tratamiento.',
  'Solicitar a BALKRAN prueba de la autorización otorgada para el tratamiento de sus datos personales, salvo las excepciones previstas en la ley.',
  'Ser informado por BALKRAN, previa solicitud presentada mediante los canales o medios dispuestos en estas políticas, sobre el uso que se le da a sus datos personales.',
  'Presentar consultas ante la empresa y, asimismo, interponer quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a lo dispuesto en la normatividad vigente.',
  'Solicitar la revocatoria y supresión de sus datos personales cuando BALKRAN incurra en conductas contrarias a la ley o a la constitución política, a menos que exista un deber legal o contractual que haga imperativo conservar la información.',
  'Abstenerse de responder las preguntas sobre datos sensibles o sobre datos de los niños y adolescentes.',
];

const requisitos = [
  'Datos de individualización del contacto (dirección física o electrónica y número telefónico).',
  'Medios idóneos para recibir respuesta a la solicitud radicada.',
  'Motivos, argumentos, hechos y demás que dan lugar al reclamo con una breve descripción del derecho que desea ejercer (conocer, actualizar, rectificar, solicitar prueba de la autorización otorgada, revocar, suprimir o acceder a la información).',
  'Firma (si aplica) y número de identificación.',
];

export default function PoliticaDatosPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Habeas Data
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Política de Tratamiento y Protección de <span className="text-[#ff5a00]">Datos Personales</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Atendiendo a lo contemplado por la Ley 1581 de 2012, dentro de la cual se constituye el marco general de la protección de los datos personales y Habeas Data en Colombia, y el Decreto 1377 de 2013, la empresa BALKRAN INC. S.A.S – BIC pone a disposición de sus titulares la presente política.
            </p>
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
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">1 · Responsable del tratamiento</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">BALKRAN INC. S.A.S. BIC</h2>
            </div>
            <div className="lg:col-span-9 space-y-4 text-sm sm:text-base text-[#565e6e] leading-relaxed text-justify">
              <p>
                Sociedad identificada con Nit 900.215.119-6 con domicilio legal en la ciudad de Duitama, departamento de Boyacá, Colombia, cuya dirección es Carrera 26 No. 24 – 17 y teléfono de contacto (+57) 3114508064, sitio web www.cercasbalkran.com. Como responsable del tratamiento de recolección, almacenamiento, uso, circulación y disposición de los datos personales, lleva a cabo en ejercicio natural de sus actividades derivadas de las relaciones comerciales con los respectivos clientes actuales y potenciales, proveedores, colaboradores y, en general, los terceros de quienes recolecta datos personales.
              </p>
              <p>
                La presente política tiene como finalidad dar a conocer los mecanismos y procedimientos para hacer efectivos los derechos de los titulares, informar quién es el encargado al interior de la empresa de darle trámite a las peticiones, quejas, reclamos y consultas, comunicando las finalidades y el tratamiento al cual se someterán los datos personales en el desarrollo de las actividades comerciales de la empresa.
              </p>
              <p>
                BALKRAN siempre está a la vanguardia garantizando y fomentando los valores que se sujetan al respeto, honestidad, reserva, confidencialidad, disponibilidad y administración idónea de la información de datos personales, cumpliendo categóricamente lo contemplado por la constitución política, la ley y demás normas reglamentarias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ÁMBITO DE APLICACIÓN */}
      <section className="py-12 bg-[#f8fafc] border-t border-b border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Ámbito de aplicación</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-2">¿A quién aplica?</h2>
          </div>
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed">
                El régimen político aplica a toda recolección, almacenamiento, uso, transferencia, transmisión y supresión de información que pueda asociarse o relacionarse a personas naturales determinadas o determinables que ocurra en el territorio de la República de Colombia, así como el tratamiento que realicen terceros con los que BALKRAN acuerde realizar cualquier actividad relativa al tratamiento de datos personales de los cuales la empresa es responsable.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
              <p className="text-sm sm:text-base text-[#1a2130] font-semibold mb-2">Terceros con los que se suscriben contratos</p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed">
                La política se aplica a los terceros con quienes BALKRAN eventualmente suscriba contratos de transmisión, con el fin de que conozcan las obligaciones que les aplicarán, las finalidades a las que deben someterse y los estándares de seguridad y confidencialidad que deben adoptar cuando realicen el tratamiento por cuenta de la empresa.
              </p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed mt-3">
                Las políticas persiguen la salvaguarda del derecho fundamental a la intimidad personal, ya sea de la empresa, de las personas naturales o jurídicas con las que BALKRAN tenga relación, bien sea de manera laboral, civil o comercial.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed">
                La información recolectada en las bases de datos de la empresa se usará para poder iniciar, adelantar y mantener la relación contractual, comercial y laboral, o para recibir publicidad sobre la cual los titulares del derecho hayan autorizado de manera libre y espontánea su tratamiento, así como para atender las peticiones y solicitudes presentadas por los titulares del dato personal, tramitadas bajo los horarios de atención al usuario determinados por BALKRAN.
              </p>
              <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed mt-3">
                Igualmente, los datos personales serán tratados o cedidos cuando un deber legal así lo imponga y para dar cumplimiento a una autoridad competente cuando esta formalmente lo requiera.
              </p>
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
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Derechos de los titulares</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">Derechos de los Titulares</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-3xl text-justify">
            Para los efectos de la presente política se entenderán como titulares de derecho todas las personas que aparezcan registradas en las bases de datos de BALKRAN INC. S.A.S – BIC: (I) Socios; (II) empleados; (III) proveedores; (IV) clientes; (V) aliados. El titular de los datos personales tendrá derecho a:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {derechos.map((d, i) => (
              <div key={i} className="bg-[#fcfcfc] border border-gray-200/90 rounded-2xl p-5 flex gap-4 items-start hover:border-orange-300 transition-colors">
                <span className="w-7 h-7 rounded-full bg-[#ff5a00] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#565e6e] leading-relaxed text-justify">{d}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#fff7f0] border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></div>
              <div className="text-sm">
                <p className="font-semibold text-[#1a2130]">Canales para ejercer sus derechos</p>
                <p className="text-[#565e6e] mt-0.5">Línea de atención nacional (+57) 3112942523 y (+57) 311 4508064</p>
              </div>
            </div>
            <a href="mailto:info@cercasbalkran.com" className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-full transition-colors shrink-0">
              <Mail className="w-4 h-4" /> info@cercasbalkran.com
            </a>
          </div>
        </div>
      </section>

      {/* PROCEDIMIENTO HÁBEAS DATA */}
      <section className="py-12 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="flex items-start gap-3">
            <div className="w-11 h-12 rounded-xl bg-orange-50 text-[#ff5a00] flex items-center justify-center shrink-0"><PenLine className="w-5 h-5" /></div>
            <div>
              <span className="text-[#ff5a00] font-display text-xs font-bold uppercase tracking-wider block">Procedimiento</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight mt-1">Procedimiento para el ejercicio del derecho de Hábeas Data</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed max-w-3xl text-justify">
            En cumplimiento de las normas sobre protección de datos personales contempladas en la constitución política en su articulado N° 15 según la cual el hábeas data es el derecho que tienen todas las personas a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ellas en bases de datos o archivos, y de conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013, BALKRAN INC. S.A.S – BIC presenta el procedimiento y requisitos mínimos para el ejercicio de sus derechos:
          </p>

          <p className="text-sm sm:text-base text-[#1a2130] font-semibold">
            Para la radicación y atención de su solicitud le solicitamos suministrar la siguiente información:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requisitos.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#565e6e] font-medium leading-relaxed">{r}</p>
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
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">Vigencia</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
              La presente política de tratamiento y protección de datos personales iniciará su vigencia el día 1 de enero de 2022 y tendrá validez mientras BALKRAN ejerza su objeto social en Colombia, o hasta que la ley disponga asunto en contrario o diferente. La empresa se reserva el derecho de modificar esta política en cualquier momento; sin embargo, cualquier cambio de forma unilateral será informado y publicado oportunamente a través de la página web y se inscribirá la fecha de cambio.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}