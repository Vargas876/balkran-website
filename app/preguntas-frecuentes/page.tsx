'use client';

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { pick } from '@/lib/i18n';

const L: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    badge: 'Ayuda',
    title1: 'Preguntas',
    title2: 'Frecuentes',
    desc: 'Da click en la pregunta de la que necesites información.',
  },
  en: {
    badge: 'Help',
    title1: 'Frequently Asked',
    title2: 'Questions',
    desc: 'Click on the question you need information about.',
  },
  fr: {
    badge: 'Aide',
    title1: 'Questions',
    title2: 'Fréquentes',
    desc: 'Cliquez sur la question pour laquelle vous avez besoin d’informations.',
  },
};

function l(lang: 'es' | 'en' | 'fr', key: string): string {
  return L[lang][key] || L.es[key] || key;
}

const faqs = [
  {
    q: {
      es: '¿Qué es un energizador eléctrico?',
      en: 'What is an electric energizer?',
      fr: 'Qu’est-ce qu’un énergiseur électrique ?',
    },
    a: {
      es: 'Un energizador es un equipo eléctrico el cual es alimentado a la red eléctrica a 110 Voltios o 12 Voltios para la línea solar. Su función principal es proveer de energía al alambrado del cercado, esto lo hace mediante pulsos eléctricos. Podemos categorizar al energizador como el componente principal del cercado eléctrico.',
      en: 'An energizer is an electrical device powered from the mains at 110 Volts, or at 12 Volts for the solar line. Its main function is to supply energy to the fence wiring, which it does by means of electrical pulses. We can categorize the energizer as the main component of the electric fence.',
      fr: 'Un énergiseur est un appareil électrique alimenté par le réseau électrique à 110 volts, ou à 12 volts pour la gamme solaire. Sa fonction principale est de fournir de l’énergie au fil de la clôture, ce qu’il fait au moyen d’impulsions électriques. Nous pouvons catégoriser l’énergiseur comme le composant principal de la clôture électrique.',
    },
  },
  {
    q: {
      es: '¿Qué es un cercado eléctrico?',
      en: 'What is an electric fence?',
      fr: 'Qu’est-ce qu’une clôture électrique ?',
    },
    a: {
      es: 'El cercado eléctrico es un sistema de elementos que forman una barrera electrificada, su objetivo es delimitar áreas principalmente para el pastoreo rotacional, control de animales, protección de cultivos, protección de bosques ribereños y sistemas silvopastoriles.',
      en: 'An electric fence is a system of elements that form an electrified barrier. Its purpose is to delimit areas, mainly for rotational grazing, animal control, crop protection, protection of riparian forests and silvopastoral systems.',
      fr: 'La clôture électrique est un système d’éléments qui forment une barre électrifiée, dont l’objectif est de délimiter des zones, principalement pour le pâturage rotatif, le contrôle des animaux, la protection des cultures, la protection des forêts riveraines et les systèmes sylvo-pastoraux.',
    },
  },
  {
    q: {
      es: '¿Cómo funciona un cercado eléctrico?',
      en: 'How does an electric fence work?',
      fr: 'Comment fonctionne une clôture électrique ?',
    },
    a: {
      es: 'El sistema funciona conectado a tierra. Cuando algún humano o animal toca el alambrado o intenta pasarlo se cierra el circuito a tierra y recibe una descarga eléctrica que no produce daño, pero sí es punzante y efectiva para impedir la invasión del terreno. Este sistema de cerca eléctrica genera una barrera psicológica que hace a los animales no cruzar el alambrado, pues tendrán en su memoria el recuerdo de una sensación dolorosa.',
      en: 'The system works connected to ground. When any person or animal touches the wiring or tries to cross it, the ground circuit closes and they receive an electrical discharge that causes no harm, yet is sharp and effective in preventing the invasion of the land. This electric fence system creates a psychological barrier that keeps animals from crossing the wiring, since they will carry the memory of a painful sensation.',
      fr: 'Le système fonctionne relié à la terre. Lorsqu’une personne ou un animal touche le fil ou tente de le franchir, le circuit se ferme à la terre et il reçoit une décharge électrique qui ne cause aucun dommage, mais qui est piquante et efficace pour empêcher l’invasion du terrain. Ce système de clôture électrique génère une barrière psychologique qui empêche les animaux de traverser le fil, car ils garderont le souvenir d’une sensation douloureuse.',
    },
  },
  {
    q: {
      es: '¿Qué tipo de energizador necesito para mi propiedad?',
      en: 'What type of energizer do I need for my property?',
      fr: 'Quel type d’énergiseur ai-je besoin pour ma propriété ?',
    },
    a: {
      es: 'Para elegir el energizador correcto usted debe tener claro los siguientes requerimientos: Hectáreas para trabajar. Tipo de terreno donde se va a instalar (terreno plano del equipo B1000 en adelante, montañoso desde el equipo B3000 en adelante). Tipo de suelo (terreno seco, rocoso, arenoso: energizadores desde el B4500 en adelante; arcilloso, limoso: desde el equipo B1000 en adelante). Tipo de animales que se va a manejar (mascotas B500 - B750, caballos desde el equipo B500 hasta el B2000, caprinos desde el equipo B3000 en adelante, bovino -vacas y terneros desde el B500 al B3000, toros desde el B4500 en adelante). Si requiere uso de energía solar o cuenta con conexión a 110 Voltios.',
      en: 'To choose the right energizer you must be clear about the following requirements: hectares to work. The type of terrain where it will be installed (flat terrain from the B1000 unit onwards, mountainous from the B3000 unit onwards). The type of soil (dry, rocky, sandy terrain: energizers from the B4500 onwards; clayey, silty: from the B1000 unit onwards). The type of animals to be managed (pets B500–B750, horses from the B500 unit to the B2000, goats from the B3000 unit onwards, cattle -cows and calves from B500 to B3000, bulls from the B4500 onwards). Whether you require solar energy use or you have a 110 Volt connection.',
      fr: 'Pour choisir le bon énergiseur, vous devez avoir clairement les exigences suivantes : les hectares à travailler. Le type de terrain où il sera installé (terrain plat à partir de l’équipement B1000, montagneux à partir de l’équipement B3000). Le type de sol (sol sec, rocheux, sableux : énergiseurs à partir du B4500 ; argileux, limoneux : à partir de l’équipement B1000). Le type d’animaux à gérer (animaux de compagnie B500–B750, chevaux de l’équipement B500 au B2000, caprins à partir du B3000, bovins -vaches et veaux du B500 au B3000, taureaux à partir du B4500). Si vous avez besoin d’énergie solaire ou si vous disposez d’une connexion de 110 volts.',
    },
  },
  {
    q: {
      es: 'Además del energizador, ¿qué necesito para instalar mi cerca eléctrica?',
      en: 'Besides the energizer, what do I need to install my electric fence?',
      fr: 'En plus de l’énergiseur, de quoi ai-je besoin pour installer ma clôture électrique ?',
    },
    a: {
      es: 'Para la instalación de la cerca eléctrica usted necesita: Cuchilla doble tiro. Alambre de cobre No. 8 o No. 10 (20 metros). Desviador de rayos. Aislador pivote (Paso, traba, puntilla). Aisladores tipo pera (Inicio fin, esquinero). Postes. Varillas polo a tierra. Alambre aislado.',
      en: 'To install the electric fence you need: a double-throw knife switch. No. 8 or No. 10 copper wire (20 meters). A lightning diverter. Pivot insulator (Step, Lock, Tack). Pear-type insulators (Start/End, Corner). Posts. Grounding rods. Insulated wire.',
      fr: 'Pour l’installation de la clôture électrique, vous avez besoin de : un interrupteur à double coupe. Du fil de cuivre n° 8 ou n° 10 (20 mètres). Un parafoudre. Un isolateur pivot (Passe, Verrou, Pointe). Des isolateurs en forme de poire (Début/Fin, Coin). Des poteaux. Des tiges de mise à la terre. Du fil isolé.',
    },
  },
  {
    q: {
      es: '¿Qué tipo de alambre necesito para instalar el cercado eléctrico?',
      en: 'What type of wire do I need to install the electric fence?',
      fr: 'Quel type de fil ai-je besoin pour installer la clôture électrique ?',
    },
    a: {
      es: 'Para la instalación de cercas eléctricas se recomienda utilizar alambre No. 12.5 o No. 14, este alambre es muy eficiente en la conducción eléctrica y soporta altas tensiones por lo que su ciclo de vida es alto.',
      en: 'For the installation of electric fences it is recommended to use No. 12.5 or No. 14 wire. This wire is highly efficient in electrical conduction and withstands high tensions, so its life cycle is long.',
      fr: 'Pour l’installation de clôtures électriques, il est recommandé d’utiliser du fil n° 12.5 ou n° 14 ; ce fil est très efficace dans la conduction électrique et résiste aux hautes tensions, ce qui lui confère un long cycle de vie.',
    },
  },
  {
    q: {
      es: '¿Necesito varillas de polo a tierra para el cercado eléctrico?',
      en: 'Do I need grounding rods for the electric fence?',
      fr: 'Ai-je besoin de tiges de mise à la terre pour la clôture électrique ?',
    },
    a: {
      es: 'Sí, se necesita varilla polo a tierra, una buena toma de tierra es indispensable para un buen rendimiento del energizador eléctrico.',
      en: 'Yes, you need a grounding rod; a good earth connection is essential for the correct performance of the electric energizer.',
      fr: 'Oui, il faut une tige de mise à la terre ; une bonne prise de terre est indispensable pour un bon rendement de l’énergiseur électrique.',
    },
  },
  {
    q: {
      es: '¿Qué tipo de varillas polo a tierra necesito?',
      en: 'What type of grounding rods do I need?',
      fr: 'Quel type de tiges de mise à la terre ai-je besoin ?',
    },
    a: {
      es: 'Se recomienda utilizar varillas de cobre COPPERWELD de 1.5 metros de largo como mínimo, estas irán enterradas en el suelo.',
      en: 'It is recommended to use COPPERWELD copper rods at least 1.5 meters long, which will be buried in the ground.',
      fr: 'Il est recommandé d’utiliser des tiges de cuivre COPPERWELD d’au moins 1,5 mètre de long, qui seront enterrées dans le sol.',
    },
  },
  {
    q: {
      es: '¿Cómo verifico que el energizador está funcionando de manera correcta?',
      en: 'How do I verify the energizer is working correctly?',
      fr: 'Comment vérifier que l’énergiseur fonctionne correctement ?',
    },
    a: {
      es: 'Los energizadores BALKRAN® cuentan con dos indicadores de luz, el primero IND.ON indica el encendido del energizador, este led debe mantenerse siempre encendido, el segundo es IND.SALIDA/OUTPUT, indica el pulso o velocidad de disparo del energizador, este led se iluminará entre cada pulso del equipo. Realice una prueba en vacío, desconecte la conexión negativa y positiva de la cuchilla doble tiro, de esta manera el equipo estará desconectado del cercado. Luego, con un alambre de cobre aislado haga contacto sobre los bornes positivo y negativo; si se genera chispa o arco de corriente, el energizador está funcionando correctamente.',
      en: 'BALKRAN® energizers have two light indicators: the first, IND.ON, indicates that the energizer is turned on and this LED must always remain lit; the second, IND.OUTPUT, indicates the pulse or discharge speed of the energizer and will light up between each pulse. Perform a no-load test: disconnect the negative and positive connection of the double-throw knife switch, so the unit is disconnected from the fence. Then, with an insulated copper wire, make contact on the positive and negative terminals; if a spark or current arc is generated, the energizer is working correctly.',
      fr: 'Les énergiseurs BALKRAN® disposent de deux indicateurs lumineux : le premier, IND.ON, indique que l’énergiseur est allumé et cette LED doit toujours rester allumée ; le second, IND.SALIE/OOUTPUT, indique le pulse ou la vitesse de déclenchement de l’énergiseur et s’allume entre chaque impulsion de l’équipement. Réalisez un test à vide : déconnectez la connexion négative et positive de l’interrupteur à double coupe, ainsi l’équipement est déconnecté de la clôture. Ensuite, avec un fil de cuivre isolé, faites contact sur les bornes positif et négatif ; si une étincelle ou un arc de courant est généré, l’énergiseur fonctionne correctement.',
    },
  },
  {
    q: {
      es: '¿Cómo verifico que el cercado eléctrico está funcionando de manera correcta?',
      en: 'How do I verify the electric fence is working correctly?',
      fr: 'Comment vérifier que la clôture électrique fonctionne correctement ?',
    },
    a: {
      es: 'Para verificar el funcionamiento de la cerca eléctrica usted lo puede hacer de dos maneras: la primera consiste en utilizar un voltímetro, este instrumento de medición permite medir el nivel de tensión que tiene el cercado, de esta manera se puede diagnosticar cuánta energía está entregando al alambrado. Si no cuenta con voltímetro, la segunda opción es acercar un alambre aislado: si se acerca a 1 cm del cercado usted podrá ver y oír un pequeño arco eléctrico en la punta del alambre aislado, señal inequívoca de que está pasando energía por el alambrado de la cerca.',
      en: 'To verify the operation of the electric fence you can do it in two ways: the first is to use a voltmeter, a measuring instrument that measures the voltage level of the fence, so you can diagnose how much energy it is delivering to the wiring. If you do not have a voltmeter, the second option is to bring an insulated wire close: if you bring it 1 cm from the fence you will be able to see and hear a small electric arc at the tip of the insulated wire, an unmistakable sign that energy is flowing through the fence wiring.',
      fr: 'Pour vérifier le fonctionnement de la clôture électrique, vous pouvez le faire de deux manières : la première consiste à utiliser un voltmètre, un instrument de mesure qui permet de mesurer le niveau de tension de la clôture, afin de diagnostiquer la quantité d’énergie qu’elle fournit au fil. Si vous ne disposez pas d’un voltmètre, la deuxième option consiste à approcher un fil isolé : si vous l’approchez à 1 cm de la clôture, vous pourrez voir et entendre un petit arc électrique à la pointe du fil isolé, signe évident que l’énergie circule dans le fil de la clôture.',
    },
  },
  {
    q: {
      es: '¿Qué tan seguro es un cercado eléctrico?',
      en: 'How safe is an electric fence?',
      fr: 'Dans quelle mesure une clôture électrique est-elle sûre ?',
    },
    a: {
      es: 'El cercado eléctrico, al realizarse una correcta instalación, es seguro para humanos y animales; el choque eléctrico que se produce al contacto de las cuerdas es de tipo no letal, es decir, no afecta la vida del humano o animal. Los energizadores Balkran® cuentan con certificación RETIE, la cual garantiza a nuestros clientes que todos nuestros energizadores cumplen con las normas técnicas eléctricas y con las especificaciones de la ficha técnica.',
      en: 'An electric fence, when properly installed, is safe for humans and animals; the electric shock produced on contact with the strands is non-lethal, meaning it does not endanger the life of the person or animal. Balkran® energizers are RETIE certified, which guarantees our customers that all our energizers comply with electrical technical standards and with the technical data sheet specifications.',
      fr: 'La clôture électrique, lorsqu’elle est correctement installée, est sûre pour les humains et les animaux ; le choc électrique produit au contact des fils est de type non létal, c’est-à-dire qu’il n’affecte pas la vie de l’humain ou de l’animal. Les énergiseurs Balkran® sont certifiés RETIE, ce qui garantit à nos clients que tous nos énergiseurs respectent les normes techniques électriques et les spécifications de la fiche technique.',
    },
  },
  {
    q: {
      es: '¿Qué ocurre si instalo un energizador más potente que el recomendado?',
      en: 'What happens if I install a more powerful energizer than recommended?',
      fr: 'Que se passe-t-il si j’installe un énergiseur plus puissant que celui recommandé ?',
    },
    a: {
      es: 'No pasa absolutamente nada por instalar un energizador más potente de lo que normalmente recomendamos para cada uno de los casos. Al realizar el cambio por un equipo más potente usted tendrá más energía a su disposición. Esta acción es recomendada sobre todo en aquellas zonas con terrenos muy secos.',
      en: 'Nothing at all happens if you install a more powerful energizer than what we normally recommend for each case. By switching to a more powerful unit, you will have more energy available. This action is especially recommended in areas with very dry terrain.',
      fr: 'Il ne se passe absolument rien si vous installez un énergiseur plus puissant que ce que nous recommandons normalement pour chaque cas. En changeant pour un équipement plus puissant, vous aurez plus d’énergie à votre disposition. Cette action est surtout recommandée dans les zones de terrain très sec.',
    },
  },
  {
    q: {
      es: '¿En los equipos de línea solar cuánto dura la carga de la batería?',
      en: 'In solar line units, how long does the battery charge last?',
      fr: 'Dans les équipements de la gamme solaire, combien de temps dure la charge de la batterie ?',
    },
    a: {
      es: 'En la línea solar la autonomía del funcionamiento del sistema es de aproximadamente 2 días, si la batería está completamente cargada. Es importante no dejar descargar la batería en su totalidad para prolongar el ciclo de vida de la batería.',
      en: 'In the solar line, the system operating autonomy is approximately 2 days if the battery is fully charged. It is important not to let the battery fully discharge in order to extend its life cycle.',
      fr: 'Dans la gamme solaire, l’autonomie de fonctionnement du système est d’environ 2 jours si la batterie est complètement chargée. Il est important de ne pas laisser la batterie se décharger entièrement afin de prolonger son cycle de vie.',
    },
  },
  {
    q: {
      es: '¿Cuántas cuerdas debe tener el cercado eléctrico?',
      en: 'How many strands should the electric fence have?',
      fr: 'Combien de fils doit avoir la clôture électrique ?',
    },
    a: {
      es: 'El número de cuerdas que se necesita para el cercado eléctrico depende del tipo de animal que se tenga, para bovinos y caballos se recomienda 2 a 3 cuerdas, para ovejas y cabras 4 a 5 cuerdas.',
      en: 'The number of strands needed for the electric fence depends on the type of animal you have; for cattle and horses 2 to 3 strands are recommended, and for sheep and goats 4 to 5 strands.',
      fr: 'Le nombre de fils nécessaires pour la clôture électrique dépend du type d’animal ; pour les bovins et les chevaux, il est recommandé 2 à 3 fils, pour les moutons et les chèvres 4 à 5 fils.',
    },
  },
];

export default function PreguntasFrecuentesPage() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'es';
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
              {l(lang, 'badge')}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08]">
              {l(lang, 'title1')} <span className="text-[#ff5a00]">{l(lang, 'title2')}</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl text-justify">
              {l(lang, 'desc')}
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
                  <span className="font-display font-bold text-sm sm:text-base text-[#1a2130]">{pick(lang, faq.q)}</span>
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
                        {pick(lang, faq.a)}
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