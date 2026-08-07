import type { Metadata } from 'next';
import Image from 'next/image';
import { CalendarDays, FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Eventos, ferias y participación de BALKRAN INC S.A.S BIC en el sector agropecuario: Informes Sociedades BIC, Congreso de Sostenibilidad, ExpoBIC, Macrorrueda y AgroExpo.',
  alternates: { canonical: '/eventos' },
  openGraph: {
    title: 'Eventos | Balkran',
    description: 'Conoce la participación de Balkran en eventos del sector agropecuario y los informes de gestión como Sociedad BIC.',
    url: '/eventos',
  },
};

type Evento = {
  titulo: string;
  fecha: string;
  fechaISO: string;
  imagen: string;
  resumen: string;
  pdf?: string;
  esInforme?: boolean;
};

const eventos: Evento[] = [
  {
    titulo: 'Informe Sociedades BIC 2025',
    fecha: '27 de mayo de 2026',
    fechaISO: '2026-05-27',
    imagen: '/assets/images/evento_bic2025.png',
    resumen:
      'En BALKRAN INC SAS BIC mantenemos un compromiso permanente con la generación de impacto social y ambiental positivo derivado de nuestras operaciones. Orientamos nuestras acciones hacia el fortalecimiento de las dimensiones de sostenibilidad establecidas en el estándar internacional ISO 26000.',
    pdf: '/assets/images/Informe-BIC-2025.pdf',
    esInforme: true,
  },
  {
    titulo: 'Informe Sociedades BIC 2024',
    fecha: '29 de mayo de 2025',
    fechaISO: '2025-05-29',
    imagen: '/assets/images/evento_bic2025.png',
    resumen:
      'Reporte de gestión BIC 2024: continuamos con el compromiso de ser una sociedad BIC, una responsabilidad continua con el desarrollo sostenible y la aplicación de estrategias que nos ayuden a mejorar día a día y a buscar el beneficio propio y el de nuestras partes.',
    pdf: '/assets/images/Informe-Sociedades-BIC-2024.pdf',
    esInforme: true,
  },
  {
    titulo: 'Informe Sociedades BIC 2023',
    fecha: '30 de mayo de 2024',
    fechaISO: '2024-05-30',
    imagen: '/assets/images/evento_bic2023.jpg',
    resumen: 'Informe Sociedades BIC 2023: reporte de las actividades realizadas por la empresa en pro del cumplimiento de los objetivos adquiridos como Sociedad de Beneficio e Interés Colectivo.',
    pdf: '/assets/images/Informe-Sociedades-BIC-2023.pdf',
    esInforme: true,
  },
  {
    titulo: 'Informe Sociedades BIC 2022',
    fecha: '23 de mayo de 2023',
    fechaISO: '2023-05-23',
    imagen: '/assets/images/evento_bic2023.jpg',
    resumen:
      'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC llevó a cabo el año 2022 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
    pdf: '/assets/images/Informe-Sociedades-BIC-2022.pdf',
    esInforme: true,
  },
  {
    titulo: 'Informe Sociedades BIC 2021',
    fecha: '27 de mayo de 2022',
    fechaISO: '2022-05-27',
    imagen: '/assets/images/evento_bic2023.jpg',
    resumen:
      'Evidenciar las actividades que la empresa Balkran Inc. S.A.S BIC realizó durante el año 2021 en pro del cumplimiento de los objetivos adquiridos al ser parte de las Sociedades de Beneficio e Interés Colectivo, basados en las dimensiones dispuestas en la Ley 1901 de 2018.',
    pdf: '/assets/images/ReporteBICBalkran2021.pdf',
    esInforme: true,
  },
  {
    titulo: '4to Congreso de Sostenibilidad',
    fecha: '29 de abril de 2022',
    fechaISO: '2022-04-29',
    imagen: '/assets/images/evento_congreso.jpg',
    resumen:
      'La Asociación Bancaria y de Entidades Financieras de Colombia, Asobancaria, es el gremio más representativo del sector financiero colombiano, dedicada a proteger, ampliar, mejorar y representar los intereses económicos entre las entidades y las empresas colombianas.',
  },
  {
    titulo: 'ExpoBIC 2022',
    fecha: '8 de abril de 2022',
    fechaISO: '2022-04-08',
    imagen: '/assets/images/evento_expobic.png',
    resumen:
      'Balkran INC S.A.S BIC estuvo presente en el desarrollo de las actividades de la feria empresarial de las Sociedades Comerciales de Beneficio e Interés Colectivo, o Sociedades BIC. En este evento se destacan las empresas que combinan las ventajas de su actividad comercial con acciones concretas para propender por el bienestar.',
  },
  {
    titulo: 'Macrorrueda 90 Cali',
    fecha: '1 de abril de 2022',
    fechaISO: '2022-04-01',
    imagen: '/assets/images/evento_macrorrueda.png',
    resumen:
      'Es el espacio comercial más importante de internacionalización del país, en donde exportadores colombianos y compradores internacionales llevan a cabo citas de negocio. Este año ProColombia cumplió 30 años, por lo que este encuentro se llevó a cabo en Cali, reuniendo a más de 3.000 empresarios nacionales e internacionales.',
  },
  {
    titulo: 'AgroExpo 2021',
    fecha: '2 de noviembre de 2021',
    fechaISO: '2021-11-02',
    imagen: '/assets/images/evento_agroexpo.png',
    resumen:
      'Agroexpo ha sido la feria más importante reuniendo al sector agropecuario a lo largo de 40 años, logrando consolidarse como la más representativa en Centroamérica y el Caribe. A pesar de las dificultades presentadas a causa de la pandemia por SARS CoV-2 se pudo realizar este evento, que cada 2 años busca consolidar el sector.',
  },
];

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5" />
              Siempre presentes
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Eventos y <span className="text-[#ff5a00]">Participación</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              Conoce los eventos, ferias e informes de gestión en los que BALKRAN INC S.A.S BIC ha participado, reafirmando nuestro compromiso con el sector agropecuario y la sostenibilidad.
            </p>
          </div>
        </div>
      </section>

      {/* EVENTOS GRID */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((e, i) => (
              <article
                key={i}
                className="group bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all flex flex-col"
              >
                {/* Imagen */}
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={e.imagen}
                    alt={e.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#1a2130] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                    <CalendarDays className="w-3 h-3 text-[#ff5a00]" />
                    {formatFecha(e.fechaISO)}
                  </span>
                  {e.esInforme && (
                    <span className="absolute top-3 right-3 bg-[#ff5a00] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">
                      Informe BIC
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] leading-snug group-hover:text-[#ff5a00] transition-colors">
                    {e.titulo}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#565e6e] leading-relaxed flex-1 line-clamp-4 text-justify">
                    {e.resumen}
                  </p>
                  <div className="pt-1">
                    {e.pdf ? (
                      <a
                        href={e.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
                      >
                        <FileText className="w-4 h-4" /> Leer informe
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-[#ff5a00] text-xs font-bold">
                        <ExternalLink className="w-4 h-4" /> Participación destacada
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}