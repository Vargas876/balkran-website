'use client';

import {
  ArrowRight,
  Battery,
  Bird,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Fish,
  Globe,
  Headphones,
  LayoutGrid, Leaf,
  MapPin,
  Phone,
  Shield, ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sprout,
  Sun,
  Trophy,
  Truck,
  Users,
  Wrench,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { fadeInUp, fadeIn, staggerContainer, cardReveal, viewport, withDelay } from '@/lib/animations';
import { useLanguage } from '@/context/LanguageContext';
import BannerSlider from '@/components/BannerSlider';

function KitSolarParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll-driven parallax transform both scrolling down and scrolling up
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1.04, 1.04, 0.94]);
  const rotate = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [4, 0, 0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.4]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <motion.div
        style={{ y, scale, rotate, opacity }}
        className="
          relative
          z-10
          w-[110%]
          max-w-[850px]
          lg:-translate-x-[2%]
          xl:-translate-x-[3%]
          drop-shadow-[0_35px_70px_rgba(0,0,0,0.55)]
          will-change-transform
        "
      >
        <Image
          src="/assets/images/kit_solar_balkran.webp"
          alt="Kit Solar Balkran"
          width={1000}
          height={780}
          priority
          className="w-full h-auto object-contain pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

function RenderSectorIcon({ sector }: { sector: string }) {
  switch (sector) {
    case 'Ganadería':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 -1 24 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 0 C 0 2.485 2.015 4.5 4.5 4.5 L 9 4.5 C 11.485 4.5 13.5 2.485 13.5 0" transform="translate(5.25 2.25)" />
          <path d="M 3 6 C 1.343 6 0 4.657 0 3 L 0 3 C 0 1.343 1.343 0 3 0 L 12 0 C 13.657 0 15 1.343 13.657 6 12 6 Z" transform="translate(4.5 15)" />
          <path d="M 0 0 L 1.5 0" transform="translate(7.5 18)" />
          <path d="M 0 0 L 1.5 0" transform="translate(15 18)" />
          <circle cx="9.375" cy="11.625" r="1.125" fill="currentColor" />
          <circle cx="14.625" cy="11.625" r="1.125" fill="currentColor" />
          <path d="M 0 0 L 3.073 0 C 5.217 -0.001 7.063 1.511 7.486 3.612 C 7.527 3.831 7.468 4.057 7.326 4.229 C 7.184 4.4 6.973 4.5 6.75 4.5 L 3 4.5" transform="translate(15 6.75)" />
          <path d="M 7.499 0 L 4.426 0 C 2.282 -0.001 0.436 1.511 0.013 3.612 C -0.028 3.831 0.03 4.057 0.173 4.229 C 0.315 4.4 0.526 4.5 0.749 4.5 L 4.499 4.5" transform="translate(1.501 6.75)" />
          <path d="M 0 8.651 L 0 3 C 0 1.343 1.343 0 3 0 L 9 0 C 10.657 0 12 1.343 12 3 L 12 8.651" transform="translate(6 6.75)" />
        </svg>
      );
    case 'Equinos':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 4.5 0 C 4.5 2.485 2.485 4.5 0 4.5" transform="translate(12 11.25)" />
          <circle cx="11.625" cy="9.375" r="1.125" fill="currentColor" />
          <path d="M 4.5 15.75 C 6.134 17.212 8.305 18.045 10.682 18 C 15.508 17.906 19.432 13.957 19.499 9.13 C 19.534 6.721 18.601 4.398 16.91 2.682 C 15.218 0.966 12.91 0 10.5 0 L 9.75 0 L 9.75 3 L 0 9 L 1.293 11.063 C 1.795 11.759 2.65 12.109 3.497 11.964 C 5.135 11.683 8.003 11.248 10.5 12.746 L 10.5 12.746 L 7.137 17.374" transform="translate(1.5 3)" />
        </svg>
      );
    case 'Agricultura':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0.988 9.512 C -2.005 4.523 1.985 -0.464 10.465 0.035 C 10.969 8.514 5.976 12.504 0.988 9.512 Z" transform="translate(12 4.5)" />
          <path d="M 6.794 6.794 C 8.932 3.232 6.082 -0.331 0.025 0.025 C -0.332 6.082 3.232 8.932 6.794 6.794 Z" transform="translate(1.5 8.25)" />
          <path d="M 0 0 L 6 6" transform="translate(5.25 12)" />
          <path d="M 7.5 0 L 1.758 5.742 C 0.632 6.867 0 8.394 0 9.985 L 0 12.75" transform="translate(11.25 8.25)" />
        </svg>
      );
    case 'Piscicultura':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14.625" cy="7.125" r="1.125" fill="currentColor" />
          <path d="M 0 13.484 L 5.257 14.99 L 6.757 20.246 L 9.007 14.99 C 23.485 14.646 19.875 0.623 19.781 0.465 C 19.619 0.371 5.602 -3.234 5.25 11.237 Z" transform="translate(0.75 3.004)" />
          <path d="M 9.171 9.132 C 7.924 9.299 6.669 8.887 5.763 8.014 C 4.857 7.14 4.399 5.902 4.519 4.649 C 3.267 4.769 2.029 4.312 1.156 3.406 C 0.283 2.501 -0.13 1.247 0.036 0" transform="translate(8.25 6.582)" />
        </svg>
      );
    case 'Caprinos':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 7 9 C 4.5 6 3 3 5 2 C 7 1 8.5 3 9.5 6" stroke="currentColor" />
          <path d="M 17 9 C 19.5 6 21 3 19 2 C 17 1 15.5 3 14.5 6" stroke="currentColor" />
          <path d="M 6 10 C 3 10.5 2 12 3 13 C 4.5 14 7 12.5 8 11" stroke="currentColor" />
          <path d="M 18 10 C 21 10.5 22 12 21 13 C 19.5 14 17 12.5 16 11" stroke="currentColor" />
          <path d="M 8.5 9.5 L 9.5 16 C 9.8 17.5 11 18.5 12 18.5 C 13 18.5 14.2 17.5 14.5 16 L 15.5 9.5 Z" stroke="currentColor" />
          <circle cx="10" cy="11.5" r="0.75" fill="currentColor" />
          <circle cx="14" cy="11.5" r="0.75" fill="currentColor" />
          <path d="M 11 15.5 h 2" stroke="currentColor" />
        </svg>
      );
    case 'Avicultura':
      return (
        <svg width="18" height="18" className="w-4 h-4 text-[#ff5a00] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15.375" cy="6.375" r="1.125" fill="currentColor" />
          <path d="M 8.25 7.08 L 8.25 4.959 C 8.25 2.261 10.407 0.013 13.101 0 C 15.33 -0.011 17.282 1.49 17.844 3.646 L 20.25 5.25 L 18 6.75 L 18 9 C 18 13.971 13.971 18 9 18 L 0.75 18 C 0.462 18 0.199 17.835 0.074 17.575 C -0.051 17.315 -0.016 17.006 0.165 16.781 Z" transform="translate(1.5 2.25)" />
          <path d="M 6.875 0 L 0 8.25" transform="translate(5.125 12)" />
        </svg>
      );
    default:
      return <Zap className="w-4 h-4 text-[#ff5a00] shrink-0 stroke-[2]" />;
  }
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number>(0);
  const [activeAppTab, setActiveAppTab] = useState<number>(0);

  // Auto-play Section 5 Applications tabs every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAppTab((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Advisor State
  const [advisorProtect, setAdvisorProtect] = useState<string>('Ganadería');
  const [advisorDistance, setAdvisorDistance] = useState<string>('Hasta 30 km');
  const [advisorPower, setAdvisorPower] = useState<string>('110V');

  // Interactive LATAM Map State
  const [activeCountryId, setActiveCountryId] = useState<string | null>('colombia');

  // Localized Map Tooltip Helpers
  const formatProjects = (str: string) => {
    if (language === 'en') return str.replace(/proyectos/g, 'projects');
    if (language === 'fr') return str.replace(/proyectos/g, 'projets');
    return str;
  };

  const formatSector = (sec: string) => {
    if (sec === 'Ganadería') return t('app.ganaderiaTitle');
    if (sec === 'Caprinos') return t('app.caprinosTitle');
    if (sec === 'Agricultura') return t('app.agriculturaTitle');
    if (sec === 'Equinos') return t('app.equinosTitle');
    if (sec === 'Piscicultura') return t('app.pisciculturaTitle');
    if (sec === 'Avicultura') return t('app.aviculturaTitle');
    return sec;
  };

  const formatSpecs = (specs: string) => {
    if (language === 'en') {
      return specs
        .replace(/Panel Solar 12V/g, '12V Solar Panel')
        .replace(/Línea Dual 110V y 12V/g, 'Dual 110V & 12V Line')
        .replace(/Línea 110V/g, '110V Line');
    }
    if (language === 'fr') {
      return specs
        .replace(/Panel Solar 12V/g, 'Panneau Solaire 12V')
        .replace(/Línea Dual 110V y 12V/g, 'Gamme Dual 110V et 12V')
        .replace(/Línea 110V/g, 'Gamme 110V');
    }
    return specs;
  };

  const latamCountries = [
    {
      id: 'mexico',
      name: 'México',
      projects: '+32 proyectos',
      pos: { top: '15.5%', left: '23.5%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Agricultura', 'Equinos']
    },
    {
      id: 'guatemala',
      name: 'Guatemala',
      projects: '+15 proyectos',
      pos: { top: '21%', left: '32%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Agricultura', 'Avicultura']
    },
    {
      id: 'costarica',
      name: 'Costa Rica',
      projects: '+12 proyectos',
      pos: { top: '27.5%', left: '40%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Agricultura']
    },
    {
      id: 'colombia',
      name: 'Colombia',
      projects: '+48 proyectos',
      pos: { top: '32.2%', left: '48%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Agricultura', 'Avicultura']
    },
    {
      id: 'ecuador',
      name: 'Ecuador',
      projects: '+24 proyectos',
      pos: { top: '38.5%', left: '44%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Piscicultura', 'Agricultura']
    },
    {
      id: 'peru',
      name: 'Perú',
      projects: '+28 proyectos',
      pos: { top: '47%', left: '47%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Caprinos', 'Agricultura']
    },
    {
      id: 'brasil',
      name: 'Brasil',
      projects: '+35 proyectos',
      pos: { top: '47.9%', left: '68.3%' },
      cardPos: 'top-[-20px] left-[-185px]',
      sectors: ['Ganadería', 'Agricultura', 'Equinos']
    },
    {
      id: 'bolivia',
      name: 'Bolivia',
      projects: '+10 proyectos',
      pos: { top: '53.2%', left: '58%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Ganadería', 'Caprinos']
    },
    {
      id: 'chile',
      name: 'Chile',
      projects: '+18 proyectos',
      pos: { top: '71.3%', left: '55%' },
      cardPos: 'top-[-20px] left-[28px]',
      sectors: ['Agricultura', 'Equinos', 'Caprinos']
    },
    {
      id: 'argentina',
      name: 'Argentina',
      projects: '+30 proyectos',
      pos: { top: '77.1%', left: '60%' },
      cardPos: 'top-[-60px] left-[-185px]',
      sectors: ['Ganadería', 'Equinos', 'Agricultura']
    }
  ];

  // FAQ Items (identical to /productos)
  const faqList = [
    {
      id: 0,
      num: '01',
      title: t('prodFaq.q1'),
      text: t('prodFaq.a1'),
      recommended: {
        name: 'B4500H',
        tag: t('prodFaq.recTag1'),
        desc: t('prodFaq.recDesc1'),
        img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp',
        price: '$ 628.000',
        slug: 'b4500h'
      }
    },
    {
      id: 1,
      num: '02',
      title: t('prodFaq.q2'),
      text: t('prodFaq.a2'),
      recommended: {
        name: 'B9000H',
        tag: t('prodFaq.recTag2'),
        desc: t('prodFaq.recDesc2'),
        img: '/assets/images/FOoiuEr2MaSvKg7dCeFbUlLOc2Q.webp',
        price: '$ 732.000',
        slug: 'b9000h'
      }
    },
    {
      id: 2,
      num: '03',
      title: t('prodFaq.q3'),
      text: t('prodFaq.a3'),
      recommended: {
        name: 'Kit Solar B1000S',
        tag: t('prodFaq.recTag3'),
        desc: t('prodFaq.recDesc3'),
        img: '/assets/images/WbATsHs1kNRaUygDgAYoxSzSKI.webp',
        price: '$ 1.250.000',
        slug: 'kit-solar-b1000s'
      }
    },
    {
      id: 3,
      num: '04',
      title: t('prodFaq.q4'),
      text: t('prodFaq.a4'),
      recommended: {
        name: 'B1500',
        tag: t('prodFaq.recTag4'),
        desc: t('prodFaq.recDesc4'),
        img: '/assets/images/5EhnHXmkuevVY6EM06Dnfjw5Bes.webp',
        price: '$ 364.000',
        slug: 'b1500'
      }
    },
    {
      id: 4,
      num: '05',
      title: t('prodFaq.q5'),
      text: t('prodFaq.a5'),
      recommended: {
        name: 'Garantía Balkran 2 Años',
        tag: t('prodFaq.recTag5'),
        desc: t('prodFaq.recDesc5'),
        img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp',
        price: 'Garantizado',
        slug: 'b4500h'
      }
    },
    {
      id: 5,
      num: '06',
      title: t('prodFaq.q6'),
      text: t('prodFaq.a6'),
      recommended: {
        name: 'Accesorios y Guías',
        tag: t('prodFaq.recTag6'),
        desc: t('prodFaq.recDesc6'),
        img: '/assets/images/cmdjt1TwD1Wv8UHkCpi5AG6iA.webp',
        price: 'Ver catálogo',
        slug: 'cable-aislado-x-50-metros'
      }
    },
    {
      id: 6,
      num: '07',
      title: t('prodFaq.q7'),
      text: t('prodFaq.a7'),
      recommended: {
        name: 'S200 Solar',
        tag: t('prodFaq.recTag7'),
        url: '/productos/s200-solar'
      }
    }
  ];

  const applications = [
    {
      id: 'ganaderia',
      title: t('app.ganaderiaTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.ganaderiaCardTitle'),
      subtitle: t('app.ganaderiaSubtitle'),
      image: '/assets/images/bienestar-vacas-lecheras.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 -1 24 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 0 C 0 2.485 2.015 4.5 4.5 4.5 L 9 4.5 C 11.485 4.5 13.5 2.485 13.5 0" transform="translate(5.25 2.25)" />
          <path d="M 3 6 C 1.343 6 0 4.657 0 3 L 0 3 C 0 1.343 1.343 0 3 0 L 12 0 C 13.657 0 15 1.343 15 3 L 15 3 C 15 4.657 13.657 6 12 6 Z" transform="translate(4.5 15)" />
          <path d="M 0 0 L 1.5 0" transform="translate(7.5 18)" />
          <path d="M 0 0 L 1.5 0" transform="translate(15 18)" />
          <circle cx="9.375" cy="11.625" r="1.125" fill="currentColor" />
          <circle cx="14.625" cy="11.625" r="1.125" fill="currentColor" />
          <path d="M 0 0 L 3.073 0 C 5.217 -0.001 7.063 1.511 7.486 3.612 C 7.527 3.831 7.468 4.057 7.326 4.229 C 7.184 4.4 6.973 4.5 6.75 4.5 L 3 4.5" transform="translate(15 6.75)" />
          <path d="M 7.499 0 L 4.426 0 C 2.282 -0.001 0.436 1.511 0.013 3.612 C -0.028 3.831 0.03 4.057 0.173 4.229 C 0.315 4.4 0.526 4.5 0.749 4.5 L 4.499 4.5" transform="translate(1.501 6.75)" />
          <path d="M 0 8.651 L 0 3 C 0 1.343 1.343 0 3 0 L 9 0 C 10.657 0 12 1.343 12 3 L 12 8.651" transform="translate(6 6.75)" />
        </svg>
      )
    },
    {
      id: 'equinos',
      title: t('app.equinosTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.equinosCardTitle'),
      subtitle: t('app.equinosSubtitle'),
      image: '/assets/images/horses-in-the-spring-field-free-photo.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 4.5 0 C 4.5 2.485 2.485 4.5 0 4.5" transform="translate(12 11.25)" />
          <circle cx="11.625" cy="9.375" r="1.125" fill="currentColor" />
          <path d="M 4.5 15.75 C 6.134 17.212 8.305 18.045 10.682 18 C 15.508 17.906 19.432 13.957 19.499 9.13 C 19.534 6.721 18.601 4.398 16.91 2.682 C 15.218 0.966 12.91 0 10.5 0 L 9.75 0 L 9.75 3 L 0 9 L 1.293 11.063 C 1.795 11.759 2.65 12.109 3.497 11.964 C 5.135 11.683 8.003 11.248 10.5 12.746 L 10.5 12.746 L 7.137 17.374" transform="translate(1.5 3)" />
        </svg>
      )
    },
    {
      id: 'agricultura',
      title: t('app.agriculturaTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.agriculturaCardTitle'),
      subtitle: t('app.agriculturaSubtitle'),
      image: '/assets/images/Agricultura-en-Guatemala-Foto-La-hora-Zero-768x384.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0.988 9.512 C -2.005 4.523 1.985 -0.464 10.465 0.035 C 10.969 8.514 5.976 12.504 0.988 9.512 Z" transform="translate(12 4.5)" />
          <path d="M 6.794 6.794 C 8.932 3.232 6.082 -0.331 0.025 0.025 C -0.332 6.082 3.232 8.932 6.794 6.794 Z" transform="translate(1.5 8.25)" />
          <path d="M 0 0 L 6 6" transform="translate(5.25 12)" />
          <path d="M 7.5 0 L 1.758 5.742 C 0.632 6.867 0 8.394 0 9.985 L 0 12.75" transform="translate(11.25 8.25)" />
        </svg>
      )
    },
    {
      id: 'piscicultura',
      title: t('app.pisciculturaTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.pisciculturaCardTitle'),
      subtitle: t('app.pisciculturaSubtitle'),
      image: '/assets/images/psicultura.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14.625" cy="7.125" r="1.125" fill="currentColor" />
          <path d="M 0 13.484 L 5.257 14.99 L 6.757 20.246 L 9.007 14.99 C 23.485 14.646 19.875 0.623 19.781 0.465 C 19.619 0.371 5.602 -3.234 5.25 11.237 Z" transform="translate(0.75 3.004)" />
          <path d="M 9.171 9.132 C 7.924 9.299 6.669 8.887 5.763 8.014 C 4.857 7.14 4.399 5.902 4.519 4.649 C 3.267 4.769 2.029 4.312 1.156 3.406 C 0.283 2.501 -0.13 1.247 0.036 0" transform="translate(8.25 6.582)" />
        </svg>
      )
    },
    {
      id: 'caprinos',
      title: t('app.caprinosTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.caprinosCardTitle'),
      subtitle: t('app.caprinosSubtitle'),
      image: '/assets/images/Caprinos colombianos una especie con potencial de exportación.jpg.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 7 9 C 4.5 6 3 3 5 2 C 7 1 8.5 3 9.5 6" />
          <path d="M 17 9 C 19.5 6 21 3 19 2 C 17 1 15.5 3 14.5 6" />
          <path d="M 6 10 C 3 10.5 2 12 3 13 C 4.5 14 7 12.5 8 11" />
          <path d="M 18 10 C 21 10.5 22 12 21 13 C 19.5 14 17 12.5 16 11" />
          <path d="M 8.5 9.5 L 9.5 16 C 9.8 17.5 11 18.5 12 18.5 C 13 18.5 14.2 17.5 14.5 16 L 15.5 9.5 Z" />
          <circle cx="10" cy="11.5" r="0.75" fill="currentColor" />
          <circle cx="14" cy="11.5" r="0.75" fill="currentColor" />
          <path d="M 11 15.5 h 2" />
        </svg>
      )
    },
    {
      id: 'avicultura',
      title: t('app.aviculturaTitle'),
      tag: 'APLICACIONES',
      cardTitle: t('app.aviculturaCardTitle'),
      subtitle: t('app.aviculturaSubtitle'),
      image: '/assets/images/avicultura.webp',
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15.375" cy="6.375" r="1.125" fill="currentColor" />
          <path d="M 8.25 7.08 L 8.25 4.959 C 8.25 2.261 10.407 0.013 13.101 0 C 15.33 -0.011 17.282 1.49 17.844 3.646 L 20.25 5.25 L 18 6.75 L 18 9 C 18 13.971 13.971 18 9 18 L 0.75 18 C 0.462 18 0.199 17.835 0.074 17.575 C -0.051 17.315 -0.016 17.006 0.165 16.781 Z" transform="translate(1.5 2.25)" />
          <path d="M 6.875 0 L 0 8.25" transform="translate(5.125 12)" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      badgeKey: 'home.testBadge1',
      titleKey: 'home.testTitle1',
      locKey: 'home.testLoc1',
      descKey: 'home.testDesc1',
      img: '/assets/images/historias-balkran-solar.webp'
    },
    {
      badgeKey: 'home.testBadge2',
      titleKey: 'home.testTitle2',
      locKey: 'home.testLoc2',
      descKey: 'home.testDesc2',
      img: '/assets/images/historias-agricultura-rd.webp'
    },
    {
      badgeKey: 'home.testBadge3',
      titleKey: 'home.testTitle3',
      locKey: 'home.testLoc3',
      descKey: 'home.testDesc3',
      img: '/assets/images/historias-equinos-elsalvador.webp'
    }
  ];

  return (
    <main className="min-h-screen bg-white text-[#1a2130] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Balkran',
            url: 'https://balkran.com',
            logo: 'https://balkran.com/assets/images/LogoBlanco.webp',
            description:
              'BALKRAN INC S.A.S. BIC. Más de 25 años fabricando energizadores y cercas eléctricas para el sector agropecuario.',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+57-311-450-8064',
              contactType: 'sales',
              areaServed: 'CO',
              availableLanguage: ['Spanish'],
            },
          }),
        }}
      />

      {/* BANNERS ADMINISTRABLES (solo aparece si hay banners activos) */}
      <BannerSlider />

      {/* SECTION 1: HERO PROTECCIÓN CON ENERGÍA (Taller Hero & Repositioned Energizer Background) */}
      <section className="relative min-h-[600px] lg:min-h-[680px] xl:min-h-[720px] flex items-center pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Background Image - Bright Warm Golden Sunset Field */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/PortadaHome.webp"
            alt="Campo colombiano al amanecer — Balkran cerca eléctrica"
            fill
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-[68%_center] brightness-[1.22] contrast-[1.08] saturate-[1.2]"
            priority
          />
          {/* Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 z-1" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Main Content */}
            <motion.div
              className="lg:col-span-7 space-y-4 sm:space-y-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              {/* Brand Promise Badge */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <span className="text-[#ff7a1a] font-display text-xs font-extrabold uppercase tracking-wider drop-shadow-md">
                  — {t('home.badge')}
                </span>
              </motion.div>

              {/* H1 Main Title (High Contrast) */}
              <motion.h1
                variants={fadeInUp}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                {t('home.heroTitle1')} <br />
                <span className="text-[#ff5a00] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">{t('home.heroTitle2')}</span>
              </motion.h1>

              {/* Subtitle Paragraph */}
              <motion.p variants={fadeInUp} className="font-display text-[15px] sm:text-[17px] text-gray-100 font-medium leading-[1.45] max-w-[460px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {t('home.heroDesc')}
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} className="pt-1 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <Link
                  href="/productos"
                  className="inline-flex justify-center items-center gap-2 bg-[#ff5a00] hover:bg-[#e04f00] active:scale-95 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-[#ff5a00]/30 transition-all hover:scale-[1.02]"
                >
                  <span>{t('home.knowProducts')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white" />
                </Link>

                <a
                  href="https://wa.me/573114508064?text=Hola%20Balkran%2C%20quisiera%20recibir%20asesor%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/40 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl backdrop-blur-md transition-all active:scale-95 shadow-md"
                >
                  <span>{t('home.contact')}</span>
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[#ff5a00]" />
                </a>
              </motion.div>

            </motion.div>

            {/* Right Floating Trust Metrics Card (Horizontal grid on mobile, vertical card on desktop) */}
            <motion.div
              className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-4 lg:mt-0"
              initial="hidden"
              animate="visible"
              variants={withDelay(0.3)}
            >
              <div className="w-full max-w-full lg:max-w-[275px] bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-[30px] p-4 sm:p-5 lg:p-6 shadow-2xl border border-white/90 text-[#101828] grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-4 sm:gap-5 lg:gap-0 lg:divide-y lg:divide-gray-200/60">

                {/* Metric 1: Trophy */}
                <div className="flex items-center gap-3 lg:gap-4 lg:pb-5">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 lg:w-7 lg:h-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-[#101828] leading-none block">{t('home.expYears')}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#667085] uppercase tracking-wider block mt-0.5 lg:mt-1">{t('home.expYearsLabel')}</span>
                  </div>
                </div>

                {/* Metric 2: Users */}
                <div className="flex items-center gap-3 lg:gap-4 lg:py-5">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 lg:w-7 lg:h-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-[#101828] leading-none block">{t('home.clients')}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#667085] uppercase tracking-wider block mt-0.5 lg:mt-1">{t('home.clientsLabel')}</span>
                  </div>
                </div>

                {/* Metric 3: MapPin */}
                <div className="flex items-center gap-3 lg:gap-4 lg:py-5">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 lg:w-7 lg:h-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-base sm:text-lg lg:text-xl text-[#101828] leading-none block uppercase">{t('home.coverage')}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#667085] uppercase tracking-wider block mt-0.5 lg:mt-1">{t('home.coverageLabel')}</span>
                  </div>
                </div>

                {/* Metric 4: Shield */}
                <div className="flex items-center gap-3 lg:gap-4 lg:pt-5">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 text-[#ff5a00] flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 lg:w-7 lg:h-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-[#101828] leading-none block">{t('home.warranty')}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#667085] uppercase tracking-wider block mt-0.5 lg:mt-1">{t('home.warrantyLabel')}</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CÓMO FUNCIONA (Compact Side by Side layout) */}
      <section className="pt-6 pb-10 lg:pt-8 lg:pb-12 bg-white border-b border-gray-100/80">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left Header Column */}
            <motion.div
              className="lg:col-span-4 space-y-3"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                  {t('home.howTag')}
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                {t('home.howTitle1')} <br />
                {t('home.howTitle2')} <br />
                {t('home.howTitle3')}
              </h2>
            </motion.div>

            {/* Right Diagram & Steps Column */}
            <div className="lg:col-span-8 space-y-3">
              {/* Diagram Illustration Image */}
              <div className="relative w-full h-36 sm:h-48 bg-transparent flex items-center justify-center px-1 sm:px-3">
                <Image
                  src="/assets/images/Dy0eGX5klXLtU2FfwT59escYpA0.webp"
                  alt="Diagrama de funcionamiento de cerca eléctrica Balkran"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-contain"
                />
              </div>

              {/* 4 Steps Grid */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1 px-1 sm:px-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <motion.div variants={cardReveal} className="space-y-0.5 text-left">
                  <h3 className="font-display font-bold text-sm text-[#101828]">{t('home.step1Title')}</h3>
                  <p className="text-[11px] sm:text-xs text-[#667085] leading-snug">{t('home.step1Desc')}</p>
                </motion.div>

                <motion.div variants={cardReveal} className="space-y-0.5 text-left sm:pl-1">
                  <h3 className="font-display font-bold text-sm text-[#101828]">{t('home.step2Title')}</h3>
                  <p className="text-[11px] sm:text-xs text-[#667085] leading-snug">{t('home.step2Desc')}</p>
                </motion.div>

                <motion.div variants={cardReveal} className="space-y-0.5 text-left sm:pl-2">
                  <h3 className="font-display font-bold text-sm text-[#101828]">{t('home.step3Title')}</h3>
                  <p className="text-[11px] sm:text-xs text-[#667085] leading-snug">{t('home.step3Desc')}</p>
                </motion.div>

                <motion.div variants={cardReveal} className="space-y-0.5 text-left sm:pl-2">
                  <h3 className="font-display font-bold text-sm text-[#101828]">{t('home.step4Title')}</h3>
                  <p className="text-[11px] sm:text-xs text-[#667085] leading-snug">{t('home.step4Desc')}</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: NUESTRAS LÍNEAS DE ENERGIZADORES */}
      <section className="py-10 lg:py-14 bg-[#fafaf9]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-[72px]">

          {/* Header Row: Title Left, Link Right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pt-4">
            <div className="max-w-[640px] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                  {t('home.linesTag')}
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                {t('home.linesTitle')}
              </h2>
              <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#555555] leading-relaxed">
                {t('home.linesSub')}
              </p>
            </div>

            <Link
              href="/productos"
              className="font-sans font-bold text-[13px] text-[#ff5a00] hover:underline uppercase tracking-normal flex items-center gap-1 whitespace-nowrap shrink-0 pb-1"
            >
              {t('home.seeAllProducts')}
            </Link>
          </div>

          {/* 3 Product Line Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">

            {/* Card 1: BÁSICA 110V */}
            <div className="bg-white rounded-[18px] border border-[#e8e8e8] shadow-[0px_10px_26px_0px_rgba(18,18,18,0.05)] p-5 sm:p-7 lg:p-[32px_28px_24px] flex flex-col justify-between min-h-[360px] overflow-hidden">
              {/* Main content row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-3 min-h-0 sm:min-h-[185px]">
                <div className="flex-1 flex flex-col gap-2 sm:gap-2.5 w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-[28px] sm:text-[32px] text-[#ff5a00] leading-none uppercase">{t('home.basicTitle')}</h3>
                    <Zap className="w-6 h-6 text-[#ff5a00] shrink-0" />
                  </div>
                  <p className="font-display font-bold text-[14px] text-[#111111] uppercase tracking-normal">
                    {t('home.basicSub')}
                  </p>
                  <p className="font-display font-normal text-[14px] text-[#333333] leading-[1.45]">
                    {t('home.basicDesc')}
                  </p>
                </div>
                <div className="w-[140px] sm:w-[160px] lg:w-[190px] h-[130px] sm:h-[160px] lg:h-[185px] shrink-0 relative flex items-center justify-center self-center sm:self-start">
                  <Image
                    src="/assets/images/p318FkpBgqwUkQZmuEWVflzfDDc.webp"
                    alt="Energizador 110V B1000"
                    width={190}
                    height={185}
                    className="object-contain max-h-full max-w-full w-auto h-auto"
                  />
                </div>
              </div>

              {/* Bottom section: Coverage & Button */}
              <div className="mt-5 space-y-3">
                <div>
                  <p className="font-display font-normal text-[14px] text-[#333333] mb-0.5">{t('home.coverageText')}</p>
                  <div className="flex items-center gap-2 text-[#ff5a00]">
                    <MapPin className="w-[22px] h-[22px] text-[#ff5a00] shrink-0" />
                    <span className="font-sans font-normal text-[14px] text-[#111111]">15 km – 450 km</span>
                  </div>
                </div>
                <Link
                  href="/productos"
                  className="w-full py-[11px] px-[18px] bg-[#ff5a00] hover:bg-[#e04f00] text-white rounded-[100px] font-display font-semibold text-[14px] leading-none text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t('home.seeProducts')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: DUAL 110V y 12V */}
            <div className="bg-white rounded-[18px] border border-[#e8e8e8] shadow-[0px_10px_26px_0px_rgba(18,18,18,0.05)] p-5 sm:p-7 lg:p-[32px_28px_24px] flex flex-col justify-between min-h-[360px] overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-3 min-h-0 sm:min-h-[185px]">
                <div className="flex-1 flex flex-col gap-2 sm:gap-2.5 w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-[28px] sm:text-[32px] text-[#ff5a00] leading-none uppercase">{t('home.dualTitle')}</h3>
                    <Zap className="w-6 h-6 text-[#ff5a00] shrink-0" />
                  </div>
                  <p className="font-display font-bold text-[14px] text-[#111111] uppercase tracking-normal">
                    {t('home.dualSub')}
                  </p>
                  <p className="font-display font-normal text-[14px] text-[#333333] leading-[1.45]">
                    {t('home.dualDesc')}
                  </p>
                </div>
                <div className="w-[140px] sm:w-[160px] lg:w-[190px] h-[130px] sm:h-[160px] lg:h-[185px] shrink-0 relative flex items-center justify-center self-center sm:self-start">
                  <Image
                    src="/assets/images/qFe52siOyQ1QQzeU7ZNCpEoVlQ.webp"
                    alt="Energizador Dual 20"
                    width={190}
                    height={185}
                    className="object-contain max-h-full max-w-full w-auto h-auto"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="font-display font-normal text-[14px] text-[#333333] mb-0.5">{t('home.coverageText')}</p>
                  <div className="flex items-center gap-2 text-[#ff5a00]">
                    <MapPin className="w-[22px] h-[22px] text-[#ff5a00] shrink-0" />
                    <span className="font-sans font-normal text-[14px] text-[#111111]">30 km – 220 km</span>
                  </div>
                </div>
                <Link
                  href="/productos"
                  className="w-full py-[11px] px-[18px] bg-[#ff5a00] hover:bg-[#e04f00] text-white rounded-[100px] font-display font-semibold text-[14px] leading-none text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t('home.seeProducts')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: SOLAR 12V */}
            <div className="bg-white rounded-[18px] border border-[#e8e8e8] shadow-[0px_10px_26px_0px_rgba(18,18,18,0.05)] p-5 sm:p-7 lg:p-[32px_28px_24px] flex flex-col justify-between min-h-[360px] overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-3 min-h-0 sm:min-h-[185px]">
                <div className="flex-1 flex flex-col gap-2 sm:gap-2.5 w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-[28px] sm:text-[32px] text-[#ff5a00] leading-none uppercase">{t('home.solarTitle')}</h3>
                    <Sun className="w-6 h-6 text-[#ff5a00] shrink-0" />
                  </div>
                  <p className="font-display font-bold text-[14px] text-[#111111] uppercase tracking-normal">
                    {t('home.solarSub')}
                  </p>
                  <p className="font-display font-normal text-[14px] text-[#333333] leading-[1.45]">
                    {t('home.solarDesc')}
                  </p>
                </div>
                <div className="w-[140px] sm:w-[160px] lg:w-[190px] h-[130px] sm:h-[160px] lg:h-[185px] shrink-0 relative flex items-center justify-center self-center sm:self-start">
                  <Image
                    src="/assets/images/4tVyaEeyWOL5QpOgwC4G8xQkztI.webp"
                    alt="Energizador Solar 12V"
                    width={190}
                    height={185}
                    className="object-contain max-h-full max-w-full w-auto h-auto"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="font-display font-normal text-[14px] text-[#333333] mb-0.5">{t('home.coverageText')}</p>
                  <div className="flex items-center gap-2 text-[#ff5a00]">
                    <MapPin className="w-[22px] h-[22px] text-[#ff5a00] shrink-0" />
                    <span className="font-sans font-normal text-[14px] text-[#111111]">15 km – 220 km</span>
                  </div>
                </div>
                <Link
                  href="/productos"
                  className="w-full py-[11px] px-[18px] bg-[#ff5a00] hover:bg-[#e04f00] text-white rounded-[100px] font-display font-semibold text-[14px] leading-none text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t('home.seeProducts')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: INTERACTIVE ADVISOR WIZARD */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Real Framer Golden Field Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/YOsF32MJrYMkHvpwEhbYQGVixM.webp"
            alt="Fondo Campo Balkran"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Soft natural golden gradient overlay for text legibility while keeping image vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 space-y-4 max-w-[440px]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                  {t('home.advTag')}
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                {t('home.advTitle')}
              </h2>
              <p className="font-sans font-normal text-[16px] sm:text-[17px] text-[#555555] leading-relaxed">
                {t('home.advSub')}
              </p>
              <div className="pt-2">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-[#e8e8e8] text-[#222222] font-display font-semibold text-[14px] px-6 py-3 rounded-[100px] shadow-sm transition-all"
                >
                  <span>{t('home.advBtn')}</span>
                  <ArrowRight className="w-4 h-4 text-[#ff5a00]" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Connected Step Cards + Recommendation Box */}
            <div className="lg:col-span-7 space-y-4">

              {/* 3 Step Cards Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3">

                {/* Step 1: Protect */}
                <div className="flex-1 w-full bg-white/95 backdrop-blur-sm rounded-[18px] p-5 border border-[#e8e8e8] shadow-sm text-center flex flex-col items-center justify-between min-h-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center mb-1">
                    <Shield className="w-5 h-5 text-[#ff5a00]" />
                  </div>
                  <h4 className="font-display font-semibold text-[13px] text-[#111111] leading-tight mb-2">
                    {t('home.advQ1')}
                  </h4>
                  <select
                    value={advisorProtect}
                    onChange={(e) => setAdvisorProtect(e.target.value)}
                    className="w-full text-[13px] font-semibold text-[#ff5a00] bg-transparent text-center focus:outline-none cursor-pointer p-1"
                  >
                    <option value="Ganadería">Ganadería</option>
                    <option value="Equinos">Equinos</option>
                    <option value="Agricultura">Agricultura</option>
                    <option value="Piscicultura">Piscicultura</option>
                  </select>
                </div>

                <ArrowRight className="hidden sm:block w-5 h-5 text-[#ff5a00] shrink-0" />

                {/* Step 2: Distance */}
                <div className="flex-1 w-full bg-white/95 backdrop-blur-sm rounded-[18px] p-5 border border-[#e8e8e8] shadow-sm text-center flex flex-col items-center justify-between min-h-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center mb-1">
                    <MapPin className="w-5 h-5 text-[#ff5a00]" />
                  </div>
                  <h4 className="font-display font-semibold text-[13px] text-[#111111] leading-tight mb-2">
                    {t('home.advQ2')}
                  </h4>
                  <select
                    value={advisorDistance}
                    onChange={(e) => setAdvisorDistance(e.target.value)}
                    className="w-full text-[13px] font-semibold text-[#ff5a00] bg-transparent text-center focus:outline-none cursor-pointer p-1"
                  >
                    <option value="Hasta 30 km">Hasta 30 km</option>
                    <option value="30 - 100 km">30 - 100 km</option>
                    <option value="Más de 100 km">Más de 100 km</option>
                  </select>
                </div>

                <ArrowRight className="hidden sm:block w-5 h-5 text-[#ff5a00] shrink-0" />

                {/* Step 3: Power */}
                <div className="flex-1 w-full bg-white/95 backdrop-blur-sm rounded-[18px] p-5 border border-[#e8e8e8] shadow-sm text-center flex flex-col items-center justify-between min-h-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center mb-1">
                    <Zap className="w-5 h-5 text-[#ff5a00]" />
                  </div>
                  <h4 className="font-display font-semibold text-[13px] text-[#111111] leading-tight mb-2">
                    {t('home.advQ3')}
                  </h4>
                  <select
                    value={advisorPower}
                    onChange={(e) => setAdvisorPower(e.target.value)}
                    className="w-full text-[13px] font-semibold text-[#ff5a00] bg-transparent text-center focus:outline-none cursor-pointer p-1"
                  >
                    <option value="110V">Línea 110V</option>
                    <option value="Dual 12V/110V">Dual 110V y 12V</option>
                    <option value="Panel Solar">Panel Solar 12V</option>
                  </select>
                </div>

              </div>

              {/* Down Indicator Arrow */}
              <div className="flex justify-center my-1">
                <span className="text-[#ff5a00] text-lg font-bold">↓</span>
              </div>

              {/* Recommendation Banner */}
              {(() => {
                const rec = (() => {
                  if (advisorPower === 'Panel Solar' || advisorPower.includes('Solar')) {
                    if (advisorDistance === 'Más de 100 km') {
                      return { name: 'B9000S', specs: '220 km • Panel Solar 12V', img: '/assets/images/4tVyaEeyWOL5QpOgwC4G8xQkztI.webp', slug: 'b9000s' };
                    } else if (advisorDistance === '30 - 100 km') {
                      return { name: 'B4500S', specs: '100 km • Panel Solar 12V', img: '/assets/images/4tVyaEeyWOL5QpOgwC4G8xQkztI.webp', slug: 'b4500s' };
                    } else {
                      return { name: 'Kit Solar B1000S', specs: '30 km • Panel Solar 12V', img: '/assets/images/4tVyaEeyWOL5QpOgwC4G8xQkztI.webp', slug: 'kit-solar-b1000s' };
                    }
                  } else if (advisorPower.includes('Dual')) {
                    if (advisorDistance === 'Más de 100 km') {
                      return { name: 'B9000D', specs: '220 km • Línea Dual 110V y 12V', img: '/assets/images/qFe52siOyQ1QQzeU7ZNCpEoVlQ.webp', slug: 'b9000d' };
                    } else if (advisorDistance === '30 - 100 km') {
                      return { name: 'B4500D', specs: '90 km • Línea Dual 110V y 12V', img: '/assets/images/qFe52siOyQ1QQzeU7ZNCpEoVlQ.webp', slug: 'b4500d' };
                    } else {
                      return { name: 'B2000D', specs: '30 km • Línea Dual 110V y 12V', img: '/assets/images/qFe52siOyQ1QQzeU7ZNCpEoVlQ.webp', slug: 'b2000d' };
                    }
                  } else {
                    if (advisorDistance === 'Más de 100 km') {
                      return { name: 'B14000H', specs: '300 km • Línea 110V', img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp', slug: 'b14000h' };
                    } else if (advisorDistance === '30 - 100 km') {
                      return { name: 'B4500H', specs: '100 km • Línea 110V', img: '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp', slug: 'b4500h' };
                    } else {
                      return { name: 'B1000', specs: '30 km • Línea 110V', img: '/assets/images/p318FkpBgqwUkQZmuEWVflzfDDc.webp', slug: 'b1000' };
                    }
                  }
                })();

                return (
                  <div className="bg-white/95 backdrop-blur-sm rounded-[20px] p-5 border border-[#e8e8e8] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-[80px] h-[70px] relative shrink-0 flex items-center justify-center">
                        <Image
                          src={rec.img}
                          alt={rec.name}
                          width={80}
                          height={70}
                          className="object-contain max-h-full w-auto"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-display font-bold text-[12px] text-[#ff5a00] uppercase tracking-wide block">
                          {t('home.advRecTag')}
                        </span>
                        <h4 className="font-display font-bold text-[20px] text-[#111111] leading-tight">
                          {rec.name}
                        </h4>
                        <p className="font-display font-normal text-[14px] text-[#555555]">
                          {formatSpecs(rec.specs)}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/productos/${rec.slug}`}
                      className="w-full sm:w-auto py-3 px-6 bg-[#ff5a00] hover:bg-[#e04f00] text-white rounded-[100px] font-display font-semibold text-[14px] leading-none text-center transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>{t('home.advRecBtn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })()}

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: APLICACIONES (Full Bleed Background with Gradient Fade & Category Icons) */}
      <section className="relative w-full bg-[#111111] text-white overflow-hidden py-10 lg:py-12">

        {/* Full-Bleed Background Image covering the entire section */}
        <div className="absolute inset-0 z-0">
          <Image
            src={applications[activeAppTab].image}
            alt={applications[activeAppTab].cardTitle}
            fill
            priority
            className="object-cover transition-all duration-700 ease-in-out"
          />
          {/* Natural Left Dark Gradient Fade ONLY behind the left menu text to keep right image vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 via-25% sm:via-30% lg:via-35% to-transparent pointer-events-none" />
          {/* Soft Bottom Gradient Fade for overlay title readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container aligned exactly with Section 4 (px-[72px] max-w-[1500px]) */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-h-[380px] lg:min-h-[400px]">

            {/* Left Sidebar Column (Header + 6 Tab Buttons with Icons) */}
            <div className="lg:col-span-4 lg:max-w-[320px] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                  <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                    {t('home.appTag')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[32px] text-white leading-[1.15]">
                  {t('home.appTitle')}
                </h2>
                <p className="text-[#BDBDBD] text-[14px] font-sans leading-relaxed">
                  {t('home.appSub')}
                </p>
              </div>

              {/* 6 Category Tab Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                {applications.map((app, index) => {
                  const isActive = activeAppTab === index;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveAppTab(index)}
                      className={`w-full px-4 py-3 rounded-xl text-left font-display font-semibold text-[14px] transition-all flex items-center justify-between border cursor-pointer ${isActive
                        ? 'bg-[#2a2a2a]/90 backdrop-blur-md text-[#ff5a00] border-[#ff5a00] shadow-lg shadow-[#ff5a00]/20'
                        : 'bg-[#1b1b1b]/70 backdrop-blur-md text-white border-[#383838] hover:border-[#555555] hover:bg-[#222222]/80'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-[#ff5a00]' : 'text-white/70'}>
                          {app.icon}
                        </span>
                        <span>{app.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#ff5a00] translate-x-0.5' : 'text-white/40'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Display Info Area (Overlay Title & Arrow Controls lowered to absolute bottom & aligned left) */}
            <div className="lg:col-span-8 flex flex-col justify-end pt-8 lg:pt-0 pb-0 lg:pb-1 lg:-ml-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-[34px] text-white leading-tight drop-shadow-md">
                    {applications[activeAppTab].cardTitle}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#E0E0E0] font-sans leading-relaxed drop-shadow-sm">
                    {applications[activeAppTab].subtitle}
                  </p>
                </div>

                {/* Circular Arrow Navigation Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveAppTab((prev) => (prev === 0 ? applications.length - 1 : prev - 1))}
                    aria-label="Aplicación anterior"
                    className="w-11 h-11 rounded-full border border-white/30 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveAppTab((prev) => (prev === applications.length - 1 ? 0 : prev + 1))}
                    aria-label="Siguiente aplicación"
                    className="w-11 h-11 rounded-full border border-white/30 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CONFIANZA QUE VIENE DEL CAMPO (Historias reales, resultados reales) */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Sidebar Column */}
            <div className="lg:col-span-4 space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                  {t('home.testTag')}
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                {t('home.testTitle')}
              </h2>
              <p className="text-[#555555] text-[16px] sm:text-[17px] font-sans leading-relaxed max-w-[340px]">
                {t('home.testSub')}
              </p>
              <div className="pt-3">
                <Link
                  href="/nosotros"
                  className="text-[#ff5a00] hover:text-[#e05500] font-display font-bold text-[13px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-all group"
                >
                  <span>{t('home.testMore')}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right 3-Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FBFBFB] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Card Image */}
                  <div className="relative w-full h-[155px] bg-gray-100 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={t(item.titleKey)}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2.5 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[#ff5a00] font-display text-[11px] font-bold uppercase tracking-wider block">
                        {t(item.badgeKey)}
                      </span>
                      <h3 className="font-display font-bold text-[17px] text-[#111111] leading-tight">
                        {t(item.titleKey)}
                      </h3>
                      <span className="text-[12px] text-gray-400 block font-medium">
                        {t(item.locKey)}
                      </span>
                      <p className="text-[12px] text-gray-600 leading-relaxed pt-1">
                        {t(item.descKey)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/nosotros"
                        className="text-[#ff5a00] hover:underline text-[12px] font-bold inline-flex items-center gap-1"
                      >
                        <span>{t('home.testReadStory')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: NUESTRA PRESENCIA EN LATINOAMÉRICA */}
      <section className="pt-12 pb-6 lg:pt-16 lg:pb-8 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-[72px] relative z-10">

          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative min-h-[480px] lg:min-h-[560px]">

            {/* Left Content Column */}
            <div className="w-full lg:w-[50%] space-y-8 z-10 relative">

              {/* Tag & Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                  <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                    {t('home.presTag')}
                  </span>
                </div>

                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                  {t('home.presTitle1')}<br />
                  {t('home.presTitle2')} <span className="text-[#ff5a00]">{t('home.presTitle3')}</span>
                </h2>

                <p className="text-[#555555] text-[18px] font-sans leading-relaxed max-w-lg">
                  {t('home.presDesc')}
                </p>
              </div>

              {/* White Feature Banner Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 flex items-center gap-4 max-w-[570px] mt-2">
                <div className="w-11 h-11 rounded-xl bg-white text-[#ff5a00] flex items-center justify-center shrink-0 border border-[#ff5a00]/30 shadow-2xs">
                  <ShieldCheck className="w-5.5 h-5.5 stroke-[1.8]" />
                </div>
                <div className="h-7 w-[1px] bg-gray-200 shrink-0" />
                <p className="text-[13px] sm:text-[13.5px] text-[#444444] font-sans leading-snug">
                  {t('home.presCard')}
                </p>
              </div>

              {/* 4 Stats Grid (Directly below White Card inside left column!) */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 items-start">

                  {/* Stat 1 */}
                  <div className="border-r border-stone-200/90 pr-2 sm:pr-4 space-y-2 text-center sm:text-left">
                    <Zap className="w-7 h-7 text-[#ff5a00] stroke-[1.8] mx-auto sm:mx-0" />
                    <div>
                      <span className="font-display font-bold text-2xl sm:text-3xl lg:text-[37px] text-[#111111] block leading-none">
                        10.000+
                      </span>
                      <span className="text-[14px] text-gray-500 font-sans block pt-1.5 font-medium">
                        {t('home.statEquipos')}
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="border-r border-stone-200/90 px-2 sm:px-4 space-y-2 text-center sm:text-left">
                    <Users className="w-7 h-7 text-[#ff5a00] stroke-[1.8] mx-auto sm:mx-0" />
                    <div>
                      <span className="font-display font-bold text-2xl sm:text-3xl lg:text-[37px] text-[#111111] block leading-none">
                        500+
                      </span>
                      <span className="text-[14px] text-gray-500 font-sans block pt-1.5 font-medium">
                        {t('home.statClientes')}
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="border-r border-stone-200/90 px-2 sm:px-4 space-y-2 text-center sm:text-left">
                    <Globe className="w-7 h-7 text-[#ff5a00] stroke-[1.8] mx-auto sm:mx-0" />
                    <div>
                      <span className="font-display font-bold text-2xl sm:text-3xl lg:text-[37px] text-[#111111] block leading-none">
                        12
                      </span>
                      <span className="text-[14px] text-gray-500 font-sans block pt-1.5 font-medium">
                        {t('home.statPaises')}
                      </span>
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="pl-2 sm:pl-4 space-y-2 text-center sm:text-left">
                    <Trophy className="w-7 h-7 text-[#ff5a00] stroke-[1.8] mx-auto sm:mx-0" />
                    <div>
                      <span className="font-display font-bold text-2xl sm:text-3xl lg:text-[37px] text-[#111111] block leading-none">
                        15
                      </span>
                      <span className="text-[14px] text-gray-500 font-sans block pt-1.5 font-medium">
                        {t('home.statExp')}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom Slogan Line (Centered!) */}
                <div className="mt-5 pt-3 border-t border-stone-200/80 flex justify-center text-center">
                  <span className="text-[11px] font-display font-bold text-stone-400 uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-[#ff5a00]" />
                    <span>{t('home.slogan')}</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Right Map Area (Larger display with precision scaling) */}
            <div className="w-full lg:w-[50%] h-[440px] sm:h-[520px] lg:h-[580px] lg:absolute lg:right-[2%] lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center lg:justify-center z-0 mt-6 lg:mt-0">
              <div className="relative w-full aspect-[893/1024] max-w-[540px] sm:max-w-[600px] lg:max-w-[650px] h-auto max-h-full flex items-center justify-center">

                {/* High Quality Geographic Latin America Image Map */}
                <Image
                  src="/assets/images/latam_map_image.webp"
                  alt="Mapa de Latinoamérica - Proyectos Balkrann"
                  width={640}
                  height={730}
                  className="w-full h-full object-contain mix-blend-multiply opacity-95 drop-shadow-lg"
                />

                {/* Continuous Pulsating & Radar Pinging Interactive Country Dots */}
                {latamCountries.map((country) => {
                  const isActive = activeCountryId === country.id;
                  return (
                    <div
                      key={country.id}
                      style={{ top: country.pos.top, left: country.pos.left }}
                      className={`absolute ${isActive ? 'z-40' : 'z-20'} group cursor-pointer`}
                      onMouseEnter={() => setActiveCountryId(country.id)}
                      onMouseLeave={() => setActiveCountryId(null)}
                    >
                      <span className="relative flex items-center justify-center w-4 h-4">
                        {/* Outer Continuous Subtle Radar Ring */}
                        <span className="animate-map-ring absolute inline-flex h-full w-full rounded-full bg-[#ff5a00]"></span>
                        {/* Core Glowing Beacon Dot */}
                        <span className={`animate-map-dot relative inline-flex rounded-full ${isActive ? 'h-3.5 w-3.5 ring-3 ring-[#ff5a00]/40' : 'h-2.5 w-2.5'} bg-[#ff5a00] border-[1.5px] border-white shadow-md transition-all duration-300`}></span>
                      </span>

                      {/* Tooltip Card shown when country is active/hovered */}
                      {isActive && (
                        <div className={`absolute ${country.cardPos} bg-white rounded-2xl shadow-2xl border border-gray-100/90 p-4 w-[190px] z-50 transition-all duration-300 animate-in fade-in zoom-in-95 pointer-events-none`}>
                          <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                            <span className="w-3 h-3 rounded-full bg-[#ff5a00] shrink-0"></span>
                            <div>
                              <span className="font-display font-bold text-[15px] text-[#111111] block leading-none">{country.name}</span>
                              <span className="text-[11px] text-gray-400 font-medium block pt-0.5">{formatProjects(country.projects)}</span>
                            </div>
                          </div>

                          <div className="pt-2.5 space-y-2.5">
                            {country.sectors.map((secName, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-[12.5px] text-gray-700 font-medium">
                                <RenderSectorIcon sector={secName} />
                                <span>{formatSector(secName)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: KIT SOLAR BALKRAN */}
      <section className="relative overflow-hidden bg-[#080b11] text-white py-16 lg:py-24">

        {/* ATMOSPHERIC BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Rural background — only visible behind the product */}
          <div
            className="
              absolute
              inset-y-0
              right-0
              w-[68%]
              opacity-30
            "
            style={{
              backgroundImage: "url('/assets/images/solar-fence-background.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center right",
              maskImage: "linear-gradient(to right, transparent 0%, black 48%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 48%, black 100%)",
            }}
          />

          {/* Dark cinematic overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#080b11]
              via-[#080b11]/95
              to-[#080b11]/35
            "
          />

          {/* Subtle orange glow */}
          <div
            className="
              absolute
              right-[8%]
              top-[-15%]
              w-[500px]
              h-[500px]
              rounded-full
              bg-[#ff5a00]/10
              blur-[140px]
            "
          />
        </div>

        {/* MAIN CONTAINER */}
        <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[54%_46%] items-center gap-4 lg:gap-0">

            {/* LEFT COLUMN */}
            <div className="relative z-20 max-w-[760px]">

              {/* EYEBROW */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#ff5a00]" />
                <span
                  className="
                    font-display
                    text-[#ff5a00]
                    text-[12px]
                    sm:text-[13px]
                    font-bold
                    tracking-[0.14em]
                    uppercase
                  "
                >
                  {t('home.solarKitTag')}
                </span>
              </div>

              {/* MAIN TITLE */}
              <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-[45px] leading-[1.08] tracking-[-0.02em] mb-5 max-w-[700px]">
                {t('home.solarKitTitle')}
              </h2>

              {/* Orange accent */}
              <div className="w-16 h-[3px] bg-[#ff5a00] mb-5" />

              {/* DESCRIPTION */}
              <p className="text-white/70 text-[14px] sm:text-[15px] leading-[1.6] max-w-[580px] mb-7 font-sans">
                {t('home.solarKitDesc')}
              </p>

              {/* BENEFITS GRID (6 Cards matching reference image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-[720px]">
                {/* Card 1: Funciona con energía solar */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sun className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb1Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb1Desc')}
                    </p>
                  </div>
                </div>

                {/* Card 2: Autonomía continua */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Battery className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb2Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb2Desc')}
                    </p>
                  </div>
                </div>

                {/* Card 3: Corriente limitada */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb3Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb3Desc')}
                    </p>
                  </div>
                </div>

                {/* Card 4: Componentes protegidos */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb4Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb4Desc')}
                    </p>
                  </div>
                </div>

                {/* Card 5: Diseñado para trabajo en exteriores */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CloudRain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb5Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb5Desc')}
                    </p>
                  </div>
                </div>

                {/* Card 6: Instalación sencilla y rápida */}
                <div className="bg-[#121722]/80 border border-white/10 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 hover:border-[#ff5a00]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-500/20 border border-gray-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] sm:text-[14px] text-white leading-tight">
                      {t('home.skb6Title')}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1 leading-snug font-sans">
                      {t('home.skb6Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* TRUST FEATURES (Centered) */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-7 pt-5 border-t border-white/10 max-w-[720px]">
                <div className="flex items-center gap-2.5 text-gray-400 text-[12px] sm:text-[13px] font-medium">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#ff5a00]" />
                  <span>{t('home.skDurability')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-[12px] sm:text-[13px] font-medium">
                  <LayoutGrid className="w-4.5 h-4.5 text-[#ff5a00]" />
                  <span>{t('home.skMaintenance')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-[12px] sm:text-[13px] font-medium">
                  <Leaf className="w-4.5 h-4.5 text-[#ff5a00]" />
                  <span>{t('home.skCleanEnergy')}</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN — PRODUCT */}
            <div
              className="
                relative
                min-h-[500px]
                lg:min-h-[650px]
                flex
                items-center
                justify-center
                lg:justify-end
              "
            >
              {/* PRODUCT GLOW */}
              <div
                className="
                  absolute
                  right-[10%]
                  top-[10%]
                  w-[380px]
                  h-[380px]
                  rounded-full
                  bg-[#ff5a00]/10
                  blur-[100px]
                "
              />

              {/* PARALLAX SCROLL-DRIVEN PRODUCT IMAGE (Smooth down & up scroll animation) */}
              <KitSolarParallaxImage />

              {/* FLOATING PRODUCT BADGE — Larger & matching reference image */}
              <div
                className="
                  absolute
                  z-20
                  right-[2%]
                  bottom-[5%]
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-white/15
                  bg-[#11151d]/95
                  backdrop-blur-md
                  shadow-2xl
                  max-w-[340px]
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#ff5a00]/10
                    border
                    border-[#ff5a00]/30
                    flex
                    items-center
                    justify-center
                    shrink-0
                    text-[#ff5a00]
                  "
                >
                  <ShieldCheck className="w-7 h-7 text-[#ff5a00]" />
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight font-display">
                    {t('home.skBadgeTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm font-extrabold text-[#ff5a00] leading-tight mb-1 font-display">
                    {t('home.skBadgeSub')}
                  </p>
                  <p className="text-[11px] text-gray-400 font-sans leading-snug">
                    {t('home.skBadgeDesc')}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: ASÍ DE FÁCIL (5 Steps Workflow — Responsive 1-Row / Mobile Timeline) */}
      <section className="py-10 lg:py-14 bg-white border-t border-gray-100">
        <div className="max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">

            {/* Left Header Column */}
            <div className="w-full lg:w-[240px] shrink-0 space-y-2 text-left">
              <span className="text-[#ff5a00] font-display text-[12px] font-bold uppercase tracking-[0.1em] block">
                {t('home.easyTag')}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-[28px] lg:text-[26px] text-[#111111] leading-[1.15]">
                {t('home.easyTitle')}
              </h2>
              <p className="text-gray-500 text-[13px] font-sans leading-relaxed pt-1 max-w-md lg:max-w-none">
                {t('home.easySub')}
              </p>
            </div>

            {/* Right: 5 Steps Workflow (Responsive Grid / Mobile Cards) */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-6 items-stretch pt-1">
              {[
                {
                  number: "1",
                  icon: ShoppingCart,
                  title: t('home.easyS1Title'),
                  desc: t('home.easyS1Desc'),
                },
                {
                  number: "2",
                  icon: Truck,
                  title: t('home.easyS2Title'),
                  desc: t('home.easyS2Desc'),
                },
                {
                  number: "3",
                  icon: Wrench,
                  title: t('home.easyS3Title'),
                  desc: t('home.easyS3Desc'),
                },
                {
                  number: "4",
                  icon: SlidersHorizontal,
                  title: t('home.easyS4Title'),
                  desc: t('home.easyS4Desc'),
                },
                {
                  number: "5",
                  icon: Headphones,
                  title: t('home.easyS5Title'),
                  desc: t('home.easyS5Desc'),
                },
              ].map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.number} 
                    className="relative bg-gray-50/60 md:bg-transparent p-4 md:p-0 rounded-2xl border border-gray-100 md:border-none flex flex-row md:flex-col justify-start md:justify-between items-center md:items-start gap-4 md:gap-0"
                  >
                    
                    {/* Left/Top: Icon + Number Badge + Dotted Line */}
                    <div className="flex items-center gap-2.5 md:mb-3 shrink-0">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#ff5a00] shrink-0" />
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#ff5a00] text-[#111111] font-display font-bold text-xs flex items-center justify-center shrink-0 bg-white">
                        {step.number}
                      </div>

                      {/* Dotted Orange Connector Line (Desktop view) */}
                      {idx < 4 && (
                        <div className="hidden md:block flex-1 h-[2px] border-t-2 border-dotted border-[#ff5a00]/60 mx-1" />
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div className="text-left flex-1">
                      <h3 className="font-display font-bold text-[14px] text-[#111111] leading-tight mb-0.5 md:mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 font-sans leading-snug">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ SECTION ("SOPORTE - PREGUNTAS FRECUENTES") — Identical to /productos */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="bg-[#f8fafc] rounded-3xl p-6 lg:p-10 border border-gray-200/60">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left: Header + FAQ Navigation list */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#ff5a00] inline-block"></span>
                  <span className="text-[#ff5a00] font-display text-[13px] font-bold uppercase tracking-[0.1em] block">
                    {t('home.faqTag')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[45px] text-[#111111] leading-[1.1]">
                  {t('home.faqTitle')}
                </h2>
                <p className="text-[#555555] text-[15px] sm:text-[16px] font-sans leading-relaxed">
                  {t('home.faqSub')}
                </p>
              </div>

              <div className="space-y-2.5">
                {faqList.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFaq(index)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all border ${activeFaq === index
                      ? 'bg-white border-[#ff5a00] shadow-sm text-[#ff5a00] font-bold'
                      : 'bg-white/60 border-transparent hover:bg-white text-[#1a2130] font-medium'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-extrabold ${activeFaq === index ? 'text-[#ff5a00]' : 'text-gray-400'}`}>
                        {item.num}
                      </span>
                      <span className="text-xs sm:text-sm">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === index ? 'text-[#ff5a00] translate-x-1' : 'text-gray-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right FAQ Detail Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col h-full gap-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#ff5a00] flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-[#ff5a00]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1a2130] leading-tight">
                    {faqList[activeFaq].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#565e6e] leading-relaxed">
                    {faqList[activeFaq].text}
                  </p>
                </div>
              </div>

              {/* Recommended Product Box inside FAQ card - anchored to bottom */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Product image */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-gray-50/80 overflow-hidden shrink-0 shadow-xs mx-auto sm:mx-0">
                    <Image
                      src={faqList[activeFaq]?.recommended?.img || '/assets/images/oYaPStv6SsxbDeqxTQ9FyV054.webp'}
                      alt={faqList[activeFaq]?.recommended?.name || 'Producto'}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Text + button stacked */}
                  <div className="flex flex-col justify-between gap-2.5 py-1 text-center sm:text-left">
                    <div className="space-y-1">
                      <span className="text-xs text-[#ff5a00] uppercase font-bold tracking-wider block">
                        {faqList[activeFaq].recommended.tag}
                      </span>
                      <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1a2130] leading-tight">
                        {faqList[activeFaq].recommended.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-snug max-w-xs mx-auto sm:mx-0">
                        {faqList[activeFaq].recommended.desc}
                      </p>
                    </div>
                    <Link
                      href={`/productos/${faqList[activeFaq].recommended.slug}`}
                      className="inline-flex items-center justify-center sm:justify-start gap-2 border border-[#ff5a00] text-[#ff5a00] hover:bg-[#ff5a00] hover:text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all w-fit mx-auto sm:mx-0 mt-1"
                    >
                      <span>{t('home.seeProduct')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 11: DARK LIGHTNING CTA BANNER — Identical to /productos */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0c] text-white border border-amber-500/20 shadow-2xl min-h-[320px] lg:min-h-[350px] flex items-center p-8 lg:p-12">

          {/* Background Lightning Effect Image matching Framer cc83iWPHU8aUafCMf2nUHGW0.webp */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/banner.webp"
              alt="Balkran Asesoría y Cotización Banner"
              fill
              className="object-cover object-[60%_50%] brightness-[0.9]"
              priority
            />
            {/* Subtle Gradient Overlay on Left for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              {t('home.ctaTitle')}
            </h2>

            <p className="text-xs sm:text-sm text-gray-200 max-w-md leading-relaxed">
              {t('home.ctaSub')}
            </p>

            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/573114508064?text=Hola%20Balkran,%20necesito%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-orange-600 text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all"
              >
                <span>{t('home.ctaBtn')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#ffffff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L.057 23.882a.5.5 0 0 0 .614.614l6.037-1.476A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.368l-.358-.213-3.713.908.924-3.613-.234-.372A9.818 9.818 0 1 1 12 21.818z" />
                </svg>
              </a>

              <p className="text-[11px] text-gray-300 font-medium pl-1">
                {t('home.ctaFast')}
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
