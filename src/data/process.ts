

export interface ProcessStepData {
  number?: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: 1,
    title: 'Empatizar',
    description: 'Escuchamos y comprendemos a las personas que dan vida al negocio, profundizando en su contexto, retos y necesidades reales.',
  },
  {
    number: 2,
    title: 'Definir',
    description: 'Sintetizamos la información para priorizar retos. Conectamos objetivos estratégicos con la identidad del proyecto, potenciando su valor diferencial.',
  },
  {
    number: 3,
    title: 'Idear',
    description: 'Diseñamos soluciones técnicas alineadas al negocio. Ideamos propuestas de valor desde un enfoque creativo, sujetas a su aprobación.',
  },
  {
    number: 4,
    title: 'Prototipar',
    description: 'Elaboramos prototipos y maquetas visuales. Clientes y usuarios validan anticipadamente que el desarrollo se mantiene alineado con lo definido.',
  },
  {
    number: 5,
    title: 'Desarrollar y testear',
    description: 'Desarrollamos los prototipos con SCRUM. Presentamos avances continuos para la validación del cliente, integrando su feedback para optimizar la UX.',
  },
  {
    number: 6,
    title: 'Acompañar',
    description: 'Tras la entrega, acompañamos la evolución de su negocio. Respondemos a nuevas necesidades para ser su equipo de confianza a largo plazo.',
  }
];


export const PROCESS_STEPS_WEB: ProcessStepData[] = [
  {
    number: 1,
    title: '1. Planificación Estratégica',
    description: 'Definición de objetivos, arquitectura de la información y hoja de ruta técnica del proyecto.',
  },
  {
    number: 2,
    title: '2. Diseño y Prototipado',
    description: 'Creación de conceptos visuales y escenarios de navegación interactivos para validar la experiencia antes de programar.',
  },
  {
    number: 3,
    title: '3. Desarrollo y Construcción',
    description: 'Programación robusta de interfaces y funcionalidades utilizando nuestro stack tecnológico de alto rendimiento.',
  },
  {
    number: 4,
    title: '4. Optimización y Testeo',
    description: 'Pruebas rigurosas de velocidad, seguridad y compatibilidad para asegurar un funcionamiento impecable.',
  },
  {
    number: 5,
    title: '5. Lanzamiento y Continuidad',
    description: 'Despliegue del producto en el entorno real y transferencia de conocimientos para su gestión.',
  }
];

export const PROCESS_STEPS_SOFTWARE: ProcessStepData[] = [
  {
    number: 1,
    title: '1. Auditoría y Análisis',
    description: 'Entendemos tu operativa para definir la arquitectura técnica que mejor te encaja.',
  },
  {
    number: 2,
    title: '2. Modelado de Datos',
    description: 'Estructuramos la lógica para asegurar que tu información esté siempre íntegra y segura.',
  },
  {
    number: 3,
    title: '3. Desarrollo Modular',
    description: 'Construimos por capas para que puedas ver resultados y despliegues rápidos.',
  },
  {
    number: 4,
    title: '4. Control de Calidad (QA)',
    description: 'Testeo exhaustivo de seguridad y usabilidad para que nada falle cuando lo uses.',
  },
  {
    number: 5,
    title: '5. Implementación y Soporte',
    description: 'Despliegue controlado y te acompañamos técnicamente tras el lanzamiento.',
  }

];

export const PROCESS_STEPS_APIS: ProcessStepData[] = [
  {
    number: 1,
    title: "1. Revisión de Sistemas",
    description: "Análisis de interoperabilidad y dependencias entre sistemas."
  },
  {
    number: 2,
    title: "2. Organización de Datos",
    description: "Estandarización de formatos y validación de consistencia de datos."
  },
  {
    number: 3,
    title: "3. Desarrollo de Integraciones",
    description: "Construcción de conectores escalables y tolerantes a fallos."
  },
  {
    number: 4,
    title: "4. Pruebas de Rendimiento",
    description: "Simulación de picos de tráfico y validación de consistencia de datos."
  },
  {
    number: 5,
    title: "5. Puesta en Producción",
    description: "Implementación en producción con supervisión continua."
  }
]

