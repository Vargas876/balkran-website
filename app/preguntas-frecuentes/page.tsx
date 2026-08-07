'use client';

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: '¿Qué es un energizador eléctrico?',
    a: 'Un energizador es un equipo eléctrico el cual es alimentado a la red eléctrica a 110 Voltios o 12 Voltios para la línea solar. Su función principal es proveer de energía al alambrado del cercado, esto lo hace mediante pulsos eléctricos. Podemos categorizar al energizador como el componente principal del cercado eléctrico.',
  },
  {
    q: '¿Qué es un cercado eléctrico?',
    a: 'El cercado eléctrico es un sistema de elementos que forman una barrera electrificada, su objetivo es delimitar áreas principalmente para el pastoreo rotacional, control de animales, protección de cultivos, protección de bosques ribereños y sistemas silvopastoriles.',
  },
  {
    q: '¿Cómo funciona un cercado eléctrico?',
    a: 'El sistema funciona conectado a tierra. Cuando algún humano o animal toca el alambrado o intenta pasarlo se cierra el circuito a tierra y recibe una descarga eléctrica que no produce daño, pero sí es punzante y efectiva para impedir la invasión del terreno. Este sistema de cerca eléctrica genera una barrera psicológica que hace a los animales no cruzar el alambrado, pues tendrán en su memoria el recuerdo de una sensación dolorosa.',
  },
  {
    q: '¿Qué tipo de energizador necesito para mi propiedad?',
    a: 'Para elegir el energizador correcto usted debe tener claro los siguientes requerimientos: Hectáreas para trabajar. Tipo de terreno donde se va a instalar (terreno plano del equipo B1000 en adelante, montañoso desde el equipo B3000 en adelante). Tipo de suelo (terreno seco, rocoso, arenoso, energizadores desde el B4500 en adelante, arcilloso, limoso: desde el equipo B1000 en adelante). Tipo de animales que se va a manejar (mascotas B500 - B750, caballos desde el equipo B500 hasta el B2000, caprinos desde el equipo B3000 en adelante, bovino -vacas y terneros desde el B500 al B3000, toros desde el B4500 en adelante). Si requiere uso de energía solar o cuenta con conexión a 110 Voltios.',
  },
  {
    q: 'Además del energizador, ¿qué necesito para instalar mi cerca eléctrica?',
    a: 'Para la instalación de la cerca eléctrica usted necesita: Cuchilla doble tiro. Alambre de cobre Nº 8 o Nº 10 (20 metros). Desviador de rayos. Aislador pivote (Paso, traba, puntilla). Aisladores tipo pera (Inicio fin, esquinero). Postes. Varillas polo a tierra. Alambre aislado.',
  },
  {
    q: '¿Qué tipo de alambre necesito para instalar el cercado eléctrico?',
    a: 'Para la instalación de cercas eléctricas se recomienda utilizar alambre Nº 12.5 o Nº 14, este alambre es muy eficiente en la conducción eléctrica y soporta altas tensiones por lo que su ciclo de vida es alto.',
  },
  {
    q: '¿Necesito varillas de polo a tierra para el cercado eléctrico?',
    a: 'Sí, se necesita varilla polo a tierra, una buena toma de tierra es indispensable para un buen rendimiento del energizador eléctrico.',
  },
  {
    q: '¿Qué tipo de varillas polo a tierra necesito?',
    a: 'Se recomienda utilizar varillas de cobre COPPERWELD de 1,5 metros de largo como mínimo, estas, irán enterradas en el suelo.',
  },
  {
    q: '¿Cómo verifico que el energizador está funcionando de manera correcta?',
    a: 'Los energizadores BALKRAN® cuentan con dos indicadores de luz, el primero IND.ON indica el encendido del energizador este led debe mantenerse siempre encendido, el segundo es IND.SALIDA/OUTPUT, indica el pulso o velocidad de disparo del energizador, este led se iluminará entre cada pulso del equipo. Realizar una prueba en vacío, desconectar la conexión negativa y positiva de la cuchilla doble tiro de esta manera el equipo estará desconectado del cercado. Luego con un alambre de cobre aislado haga contacto al borne negativo y al borne positivo acerque la otra punta del alambre a 1 cm de distancia, si genera chispa o arco de corriente el energizador está funcionando correctamente.',
  },
  {
    q: '¿Cómo verifico que el cercado eléctrico está funcionando de manera correcta?',
    a: 'Para verificar el funcionamiento de la cerca eléctrica usted lo puede hacer de dos maneras: La primera consiste en utilizar un voltímetro, este instrumento de medición permite medir el nivel de tensión que tiene el cercado de esta manera se puede diagnosticar cuanta energía está entregando al alambrado. Si no cuenta con voltímetro, la segunda opción es acercar un alambre aislado. Si se acerca a 1 cm del cercado usted podrá ver y oír un pequeño arco eléctrico en la punta del alambre aislado. Señal inequívoca de que está pasando energía por el alambrado de la cerca. En la verificación del funcionamiento del cercado eléctrico es importante asegurarse que ninguna de las cuerdas está caída y haga contacto con el pasto esto genera fugaz de energía y mucho menos que las cuerdas estén pegadas esto genera un aterrizamiento en el cercado eléctrico.',
  },
  {
    q: '¿Qué tan seguro es un cercado eléctrico?',
    a: 'El cercado eléctrico, al realizarse una correcta instalación, es seguro para humanos y animales, el choque eléctrico que se produce al contacto de las cuerdas es de tipo no letal es decir no afecta la vida del humano o animal. Los energizadores Balkran® cuentan con certificación RETIE la cuál garantiza a nuestros clientes que todos nuestros energizadores cumplen con normas técnicas eléctricas y que se cumplen con las especificaciones de la ficha técnica.',
  },
  {
    q: '¿Qué ocurre si instalo un energizador más potente que el recomendado?',
    a: 'No pasa absolutamente nada por instalar un energizador más potente que lo que normalmente recomendamos para cada uno de los casos. Al realizar el cambio por un equipo más potente usted tendrá más energía a su disposición. Esta acción es recomendada sobre todo en aquellas zonas con terrenos muy secos.',
  },
  {
    q: '¿En los equipos de línea solar cuánto dura la carga de la batería?',
    a: 'En la línea solar la autonomía del funcionamiento del sistema es de aproximadamente 2 días, si la batería está completamente cargada. Es importante no dejar descargar la batería en su totalidad para prolongar el ciclo de vida de la batería.',
  },
  {
    q: '¿Cuántas cuerdas debe tener el cercado eléctrico?',
    a: 'El número de cuerdas que se necesitan para el cercado eléctrico depende del tipo de animal que se tenga, para bovinos y caballos se recomienda 2 a 3 cuerdas, para ovejas y cabras 4 a 5 cuerdas.',
  },
];

export default function PreguntasFrecuentesPage() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1a2130] font-sans">

      {/* HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <div className="max-w-3xl space-y-5">
            <span className="bg-orange-50 text-[#ff5a00] font-display text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Ayuda
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              Preguntas <span className="text-[#ff5a00]">Frecuentes</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              Da click en la pregunta de la que necesites información.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'border-orange-300 shadow-md' : 'border-gray-200/80 shadow-sm hover:border-orange-200'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#1a2130]">{faq.q}</span>
                  <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#ff5a00] text-white rotate-180' : 'bg-orange-50 text-[#ff5a00] border border-orange-200'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-sm text-[#565e6e] leading-relaxed text-justify">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
