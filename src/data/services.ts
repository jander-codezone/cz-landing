import bgWeb from "../assets/index/codezone-servicios-desarrollo-web-v2.webp";
import bgSoftware from "../assets/index/codezone-servicios-software-v2.webp";
import bgApis from "../assets/index/codezone-servicios-apis-v2.webp";

export interface ServiceData {
  title: string;
  description: string;
  image?: ImageMetadata;
  video?: string;
  ctaText: string;
  ctaHref: string;
}

export const services: ServiceData[] = [
  {
    title: 'Desarrollo Web',
    description: 'Diseñamos y desarrollamos sitios web a medida, optimizados para el rendimientos SEO y experiencia de usuario, alineados con la identidad de tu marca.',
    video: '/videos/codezone-desarrollo-web.webm',
    image: bgWeb,
    ctaText: 'Más info',
    ctaHref: '/desarrollo-web'
  },
  {
    title: 'Software a medida',
    description: 'Creamos aplicaciones y herramientas digitales personalizadas específicas para tu negocio y mejorar tus procesos internos.',
    video: '/videos/codezone-desarrollo-software.webm',
    image: bgSoftware,
    ctaText: 'Más info',
    ctaHref: '/software-a-medida'
  },
  {
    title: 'Integración de APIs',
    description: 'Implementamos integraciones de sistemas(APIs) que conectan tus plataformas, automatizan tareas y garantizan flujos de datos eficientes y seguros.',
    video: '/videos/codezone-integracion-api.webm',
    image: bgApis,
    ctaText: 'Más info',
    ctaHref: '/integracion-apis'
  }
];
