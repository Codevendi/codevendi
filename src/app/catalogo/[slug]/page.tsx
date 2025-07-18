"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import FooterCta from "./FooterCta";
import AccionesProducto from "./AccionesProducto";
import { useRouter } from "next/navigation";

const productos = [
  {
    nombre: "Gestor de Tareas Pro",
    slug: "gestor-tareas-pro",
    descripcion: "Organiza tu día y tus proyectos como un profesional. Automatiza recordatorios, colabora en equipo y alcanza tus metas sin estrés.",
    imagen: "/softwares/1.png",
    categoria: "Productividad",
    version: "2.3.1",
    caracteristicas: [
      "Gestión de tareas y proyectos",
      "Recordatorios inteligentes",
      "Integración con Google Calendar",
      "Colaboración en equipo",
      "Panel de productividad visual"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Todas las funciones esenciales." },
      { nombre: "Pro", precio: "9,99€/mes", descripcion: "Funciones avanzadas, IA y soporte prioritario." }
    ]
  },
  {
    nombre: "Facturación Fácil",
    slug: "facturacion-facil",
    descripcion: "Olvídate del papeleo: factura en un clic, controla tus finanzas y cumple con Hacienda sin esfuerzo. ¡Ahorra tiempo y evita errores!",
    imagen: "/softwares/2.png",
    categoria: "Negocios",
    version: "1.8.0",
    caracteristicas: [
      "Facturación automática",
      "Reportes fiscales",
      "Gestión de clientes",
      "Exportación a Excel y PDF",
      "Alertas de vencimiento"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Facturación y reportes básicos." },
      { nombre: "Premium", precio: "14,99€/mes", descripcion: "Integración bancaria y soporte fiscal." }
    ]
  },
  {
    nombre: "CRM Clientes+",
    slug: "crm-clientes-plus",
    descripcion: "Convierte más ventas y fideliza clientes con seguimiento inteligente y paneles visuales. Tu negocio, siempre bajo control.",
    imagen: "/softwares/3.png",
    categoria: "CRM",
    version: "3.0.2",
    caracteristicas: [
      "Gestión de clientes y leads",
      "Seguimiento de oportunidades",
      "Automatización de emails",
      "Panel de ventas visual",
      "Integración con WhatsApp"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Gestión de clientes y oportunidades." },
      { nombre: "Pro", precio: "19,99€/mes", descripcion: "Automatizaciones y reportes avanzados." }
    ]
  },
  {
    nombre: "Editor de Imágenes Pro",
    slug: "editor-imagenes-pro",
    descripcion: "Crea imágenes impactantes en minutos. Filtros profesionales, edición avanzada y resultados de calidad para destacar tu marca.",
    imagen: "/softwares/4.png",
    categoria: "Diseño",
    version: "4.1.0",
    caracteristicas: [
      "Edición no destructiva",
      "Filtros y efectos profesionales",
      "Soporte RAW",
      "Herramientas de recorte y ajuste",
      "Exportación a múltiples formatos"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Edición básica y filtros estándar." },
      { nombre: "Pro", precio: "12,99€/mes", descripcion: "Herramientas avanzadas y soporte profesional." }
    ]
  },
  {
    nombre: "Antivirus Ultra",
    slug: "antivirus-ultra",
    descripcion: "Protege tu empresa y tus datos con la máxima seguridad. Detección inteligente y actualizaciones automáticas para tu tranquilidad.",
    imagen: "/softwares/5.png",
    categoria: "Seguridad",
    version: "5.2.4",
    caracteristicas: [
      "Protección en tiempo real",
      "Análisis inteligente",
      "Actualizaciones automáticas",
      "Cuarentena de amenazas",
      "Soporte multiplataforma"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Protección esencial y análisis manual." },
      { nombre: "Premium", precio: "7,99€/mes", descripcion: "Protección avanzada y soporte 24/7." }
    ]
  },
  {
    nombre: "Notas Rápidas",
    slug: "notas-rapidas",
    descripcion: "Captura ideas y tareas al instante. Sincroniza en todos tus dispositivos y nunca pierdas una inspiración importante.",
    imagen: "/softwares/6.png",
    categoria: "Productividad",
    version: "1.5.2",
    caracteristicas: [
      "Sincronización en la nube",
      "Organización por etiquetas",
      "Búsqueda instantánea",
      "Compartir notas",
      "Modo offline"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Notas básicas y sincronización." },
      { nombre: "Pro", precio: "4,99€/mes", descripcion: "Notas ilimitadas y colaboración." }
    ]
  },
  {
    nombre: "Gestor de Contraseñas",
    slug: "gestor-contraseñas",
    descripcion: "Tus contraseñas seguras y siempre a mano. Olvídate de recordar claves y accede a todo con un solo clic.",
    imagen: "/softwares/7.png",
    categoria: "Seguridad",
    version: "3.1.0",
    caracteristicas: [
      "Cifrado AES-256",
      "Autocompletado inteligente",
      "Generador de contraseñas",
      "Auditoría de seguridad",
      "Sincronización segura"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Gestión básica de contraseñas." },
      { nombre: "Premium", precio: "6,99€/mes", descripcion: "Contraseñas ilimitadas y familia." }
    ]
  },
  {
    nombre: "VideoMeet Pro",
    slug: "videomeet-pro",
    descripcion: "Reuniones online sin límites: videollamadas HD, grabación y colaboración en tiempo real. Conecta y crece desde cualquier lugar.",
    imagen: "/softwares/8.png",
    categoria: "Comunicación",
    version: "2.7.3",
    caracteristicas: [
      "Videollamadas HD",
      "Grabación automática",
      "Sala de espera",
      "Compartir pantalla",
      "Chat en vivo"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Videollamadas básicas." },
      { nombre: "Pro", precio: "11,99€/mes", descripcion: "Grabación y salas ilimitadas." }
    ]
  },
  {
    nombre: "Gestor de Proyectos",
    slug: "gestor-proyectos",
    descripcion: "Planifica, asigna y visualiza el avance de tus proyectos con facilidad. Mantén a tu equipo alineado y entrega siempre a tiempo.",
    imagen: "/softwares/9.png",
    categoria: "Negocios",
    version: "4.0.1",
    caracteristicas: [
      "Diagramas de Gantt",
      "Asignación de tareas",
      "Seguimiento de tiempo",
      "Reportes de progreso",
      "Integración con calendario"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Gestión básica de proyectos." },
      { nombre: "Pro", precio: "16,99€/mes", descripcion: "Proyectos ilimitados y equipo." }
    ]
  },
  {
    nombre: "Calendario Inteligente",
    slug: "calendario-inteligente",
    descripcion: "Organiza tu agenda con recordatorios automáticos, integración con correo y asistentes virtuales.",
    imagen: "/softwares/10.png",
    categoria: "Productividad",
    version: "2.2.0",
    caracteristicas: [
      "Sincronización multiplataforma",
      "Recordatorios inteligentes",
      "Integración con email",
      "Asistente virtual",
      "Vistas personalizadas"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Calendario básico." },
      { nombre: "Pro", precio: "8,99€/mes", descripcion: "Asistente IA y sincronización." }
    ]
  },
  {
    nombre: "Automatizador de Tareas",
    slug: "automatizador-tareas",
    descripcion: "Automatiza procesos repetitivos, conecta apps y ahorra tiempo con flujos personalizados.",
    imagen: "/softwares/11.png",
    categoria: "Productividad",
    version: "1.9.4",
    caracteristicas: [
      "Flujos visuales",
      "Integración con 100+ apps",
      "Triggers automáticos",
      "Plantillas predefinidas",
      "Análisis de eficiencia"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Automatizaciones básicas." },
      { nombre: "Pro", precio: "13,99€/mes", descripcion: "Flujos ilimitados y avanzados." }
    ]
  },
  {
    nombre: "MindMap Pro",
    slug: "mindmap-pro",
    descripcion: "Crea mapas mentales interactivos, colabora en tiempo real y exporta a múltiples formatos.",
    imagen: "/softwares/12.png",
    categoria: "Educación",
    version: "3.2.1",
    caracteristicas: [
      "Mapas interactivos",
      "Colaboración en tiempo real",
      "Exportación múltiple",
      "Plantillas profesionales",
      "Presentación integrada"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Mapas básicos." },
      { nombre: "Pro", precio: "10,99€/mes", descripcion: "Colaboración y exportación." }
    ]
  },
  {
    nombre: "Escritor AI",
    slug: "escritor-ai",
    descripcion: "Redacta textos, artículos y correos con ayuda de inteligencia artificial y sugerencias contextuales.",
    imagen: "/softwares/13.png",
    categoria: "Productividad",
    version: "2.1.5",
    caracteristicas: [
      "IA de escritura",
      "Sugerencias contextuales",
      "Corrección gramatical",
      "Templates profesionales",
      "Análisis de tono"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Escritura básica con IA." },
      { nombre: "Pro", precio: "15,99€/mes", descripcion: "IA avanzada y templates." }
    ]
  },
  {
    nombre: "ERP Empresarial",
    slug: "erp-empresarial",
    descripcion: "Gestiona inventario, ventas, compras y recursos humanos en una sola plataforma escalable.",
    imagen: "/softwares/14.png",
    categoria: "Negocios",
    version: "5.0.3",
    caracteristicas: [
      "Gestión integral",
      "Módulos personalizables",
      "Reportes avanzados",
      "Integración bancaria",
      "Soporte multiempresa"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Módulos básicos." },
      { nombre: "Enterprise", precio: "49,99€/mes", descripcion: "Solución completa empresarial." }
    ]
  },
  {
    nombre: "Control de Inventario",
    slug: "control-inventario",
    descripcion: "Monitorea tu stock, recibe alertas de bajo inventario y genera reportes automáticos.",
    imagen: "/softwares/15.png",
    categoria: "Negocios",
    version: "2.4.2",
    caracteristicas: [
      "Control de stock",
      "Alertas automáticas",
      "Códigos de barras",
      "Reportes de inventario",
      "Integración con ventas"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Control básico de inventario." },
      { nombre: "Pro", precio: "12,99€/mes", descripcion: "Alertas y reportes avanzados." }
    ]
  },
  {
    nombre: "Gestión de Nóminas",
    slug: "gestion-nominas",
    descripcion: "Calcula y paga nóminas, gestiona deducciones y genera recibos digitales fácilmente.",
    imagen: "/softwares/16.png",
    categoria: "Negocios",
    version: "3.1.8",
    caracteristicas: [
      "Cálculo automático",
      "Gestión de deducciones",
      "Recibos digitales",
      "Cumplimiento legal",
      "Integración contable"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Cálculo básico de nóminas." },
      { nombre: "Pro", precio: "18,99€/mes", descripcion: "Gestión completa y legal." }
    ]
  },
  {
    nombre: "Analítica de Ventas",
    slug: "analitica-ventas",
    descripcion: "Visualiza métricas de ventas, identifica tendencias y toma decisiones basadas en datos.",
    imagen: "/softwares/17.png",
    categoria: "Negocios",
    version: "2.8.5",
    caracteristicas: [
      "Dashboard interactivo",
      "Métricas en tiempo real",
      "Predicciones IA",
      "Reportes automáticos",
      "Integración CRM"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Métricas básicas." },
      { nombre: "Pro", precio: "21,99€/mes", descripcion: "Analítica avanzada y IA." }
    ]
  },
  {
    nombre: "Generador de Logos",
    slug: "generador-logos",
    descripcion: "Crea logos únicos y profesionales en minutos con plantillas y personalización avanzada.",
    imagen: "/softwares/18.png",
    categoria: "Diseño",
    version: "1.7.3",
    caracteristicas: [
      "Plantillas profesionales",
      "Personalización avanzada",
      "Exportación vectorial",
      "Branding completo",
      "Colaboración en equipo"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Logos básicos." },
      { nombre: "Pro", precio: "9,99€/mes", descripcion: "Logos ilimitados y branding." }
    ]
  },
  {
    nombre: "Editor de Video Ultra",
    slug: "editor-video-ultra",
    descripcion: "Edita videos en HD, añade efectos, transiciones y exporta a cualquier formato.",
    imagen: "/softwares/19.png",
    categoria: "Diseño",
    version: "4.3.1",
    caracteristicas: [
      "Edición HD/4K",
      "Efectos profesionales",
      "Transiciones suaves",
      "Exportación múltiple",
      "Renderizado acelerado"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Edición básica." },
      { nombre: "Pro", precio: "24,99€/mes", descripcion: "Edición profesional y 4K." }
    ]
  },
  {
    nombre: "Suite de Animación",
    slug: "suite-animacion",
    descripcion: "Animaciones 2D/3D, rigging y exportación profesional para cine, juegos y publicidad.",
    imagen: "/softwares/20.png",
    categoria: "Diseño",
    version: "3.5.2",
    caracteristicas: [
      "Animación 2D/3D",
      "Rigging avanzado",
      "Renderizado profesional",
      "Exportación multiplataforma",
      "Biblioteca de assets"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Animación 2D básica." },
      { nombre: "Pro", precio: "34,99€/mes", descripcion: "Suite completa 3D." }
    ]
  },
  {
    nombre: "Creador de Mockups",
    slug: "creador-mockups",
    descripcion: "Genera mockups realistas de apps, webs y productos físicos con plantillas editables.",
    imagen: "/softwares/21.png",
    categoria: "Diseño",
    version: "2.0.7",
    caracteristicas: [
      "Mockups realistas",
      "Plantillas editables",
      "Exportación HD",
      "Colaboración en tiempo real",
      "Biblioteca de dispositivos"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Mockups básicos." },
      { nombre: "Pro", precio: "14,99€/mes", descripcion: "Mockups ilimitados y HD." }
    ]
  },
  {
    nombre: "Firewall Personal",
    slug: "firewall-personal",
    descripcion: "Protege tu red doméstica y dispositivos con reglas personalizadas y monitoreo en tiempo real.",
    imagen: "/softwares/22.png",
    categoria: "Seguridad",
    version: "2.6.4",
    caracteristicas: [
      "Protección de red",
      "Reglas personalizadas",
      "Monitoreo en tiempo real",
      "Bloqueo de amenazas",
      "Panel de control"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Protección básica." },
      { nombre: "Pro", precio: "8,99€/mes", descripcion: "Protección avanzada y familia." }
    ]
  },
  {
    nombre: "Detector de Malware",
    slug: "detector-malware",
    descripcion: "Escanea, detecta y elimina amenazas de tu sistema con análisis profundo y cuarentena.",
    imagen: "/softwares/23.png",
    categoria: "Seguridad",
    version: "4.1.9",
    caracteristicas: [
      "Análisis profundo",
      "Detección en tiempo real",
      "Cuarentena automática",
      "Reportes detallados",
      "Actualizaciones automáticas"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Detección básica." },
      { nombre: "Pro", precio: "11,99€/mes", descripcion: "Análisis profundo y cuarentena." }
    ]
  },
  {
    nombre: "VPN UltraSegura",
    slug: "vpn-ultrasegura",
    descripcion: "Navega de forma privada y segura, accede a contenido global y protege tu identidad online.",
    imagen: "/softwares/24.png",
    categoria: "Seguridad",
    version: "3.2.8",
    caracteristicas: [
      "Cifrado militar",
      "Servidores globales",
      "Sin logs",
      "Velocidad optimizada",
      "Protección de IP"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "VPN básica." },
      { nombre: "Pro", precio: "9,99€/mes", descripcion: "VPN ilimitada y servidores premium." }
    ]
  },
  {
    nombre: "Backup Automático",
    slug: "backup-automatico",
    descripcion: "Realiza copias de seguridad automáticas en la nube y restaura archivos en un clic.",
    imagen: "/softwares/25.png",
    categoria: "Seguridad",
    version: "2.9.1",
    caracteristicas: [
      "Backup automático",
      "Cifrado de datos",
      "Restauración rápida",
      "Sincronización multiplataforma",
      "Control de versiones"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Backup básico." },
      { nombre: "Pro", precio: "7,99€/mes", descripcion: "Backup ilimitado y versiones." }
    ]
  },
  {
    nombre: "Chat Empresarial",
    slug: "chat-empresarial",
    descripcion: "Comunicación instantánea, canales privados y videollamadas para equipos de trabajo.",
    imagen: "/softwares/26.png",
    categoria: "Comunicación",
    version: "3.4.6",
    caracteristicas: [
      "Chat instantáneo",
      "Canales organizados",
      "Videollamadas integradas",
      "Compartir archivos",
      "Búsqueda avanzada"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Chat básico." },
      { nombre: "Pro", precio: "12,99€/mes", descripcion: "Chat ilimitado y videollamadas." }
    ]
  },
  {
    nombre: "Email Marketing Pro",
    slug: "email-marketing-pro",
    descripcion: "Crea campañas de email, segmenta audiencias y analiza resultados en tiempo real.",
    imagen: "/softwares/27.png",
    categoria: "Comunicación",
    version: "2.5.3",
    caracteristicas: [
      "Editor visual",
      "Segmentación avanzada",
      "Análisis en tiempo real",
      "Automatización",
      "Cumplimiento GDPR"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Campañas básicas." },
      { nombre: "Pro", precio: "19,99€/mes", descripcion: "Campañas ilimitadas y automatización." }
    ]
  },
  {
    nombre: "Traductor Instantáneo",
    slug: "traductor-instantaneo",
    descripcion: "Traduce textos, documentos y conversaciones en más de 50 idiomas al instante.",
    imagen: "/softwares/28.png",
    categoria: "Comunicación",
    version: "1.8.9",
    caracteristicas: [
      "50+ idiomas",
      "Traducción instantánea",
      "Documentos completos",
      "Conversaciones en vivo",
      "Modo offline"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Traducción básica." },
      { nombre: "Pro", precio: "6,99€/mes", descripcion: "Traducción ilimitada y offline." }
    ]
  },
  {
    nombre: "Webinar Studio",
    slug: "webinar-studio",
    descripcion: "Organiza webinars interactivos, graba sesiones y gestiona asistentes fácilmente.",
    imagen: "/softwares/29.png",
    categoria: "Comunicación",
    version: "2.3.7",
    caracteristicas: [
      "Webinars HD",
      "Grabación automática",
      "Gestión de asistentes",
      "Encuestas en vivo",
      "Analytics detallados"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Webinars básicos." },
      { nombre: "Pro", precio: "29,99€/mes", descripcion: "Webinars ilimitados y analytics." }
    ]
  },
  {
    nombre: "Plataforma de Cursos",
    slug: "plataforma-cursos",
    descripcion: "Crea, vende y gestiona cursos online con evaluaciones, certificados y foros.",
    imagen: "/softwares/30.png",
    categoria: "Educación",
    version: "4.2.1",
    caracteristicas: [
      "Creación de cursos",
      "Evaluaciones automáticas",
      "Certificados digitales",
      "Foros de discusión",
      "Analytics de aprendizaje"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Cursos básicos." },
      { nombre: "Pro", precio: "39,99€/mes", descripcion: "Cursos ilimitados y certificados." }
    ]
  },
  {
    nombre: "Simulador de Laboratorio",
    slug: "simulador-laboratorio",
    descripcion: "Simula experimentos científicos, prácticas de laboratorio y análisis de resultados.",
    imagen: "/softwares/31.png",
    categoria: "Educación",
    version: "3.0.4",
    caracteristicas: [
      "Simulaciones 3D",
      "Experimentos virtuales",
      "Análisis de datos",
      "Reportes automáticos",
      "Biblioteca de experimentos"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Simulaciones básicas." },
      { nombre: "Pro", precio: "24,99€/mes", descripcion: "Simulaciones avanzadas y 3D." }
    ]
  },
  {
    nombre: "Tutor AI",
    slug: "tutor-ai",
    descripcion: "Asistente educativo personalizado, resuelve dudas y guía el aprendizaje con IA.",
    imagen: "/softwares/32.png",
    categoria: "Educación",
    version: "2.7.2",
    caracteristicas: [
      "IA personalizada",
      "Resolución de dudas",
      "Plan de estudio",
      "Evaluación continua",
      "Soporte 24/7"
    ],
    versiones: [
      { nombre: "Básica", precio: "Gratis (14 días)", descripcion: "Tutoría básica." },
      { nombre: "Pro", precio: "16,99€/mes", descripcion: "Tutoría personalizada y avanzada." }
    ]
  }
];

export default async function SoftwareDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = productos.findIndex(p => p.slug === slug);
  const producto = productos[idx];
  if (!producto) return notFound();

  const PRECIO_BASICA = "9.99€";
  const PRECIO_PRO = "29.99€";
  const router = useRouter();

  async function handleBuy(slug: string, plan: string) {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: slug, plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0">
          <Image src={producto.imagen} alt={producto.nombre} width={200} height={200} className="rounded-xl shadow-lg" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{producto.nombre}</h1>
          <p className="text-lg text-gray-700 mb-2">{producto.descripcion}</p>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">Prueba gratis 14 días</span>
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-gray-700 text-base">Básica: <span className="text-yellow-500 font-bold">{PRECIO_BASICA}/mes</span></span>
            <span className="text-gray-700 text-base">Pro: <span className="text-yellow-500 font-bold">{PRECIO_PRO}/mes</span></span>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => handleBuy(producto.slug, "basica")}
              className="flex-1 bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-4 rounded-full transition shadow-lg text-center">
              Comprar Básica
            </button>
            <button onClick={() => handleBuy(producto.slug, "pro")}
              className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-full transition shadow-lg text-center">
              Comprar Pro
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Características principales</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {producto.caracteristicas.map((c: string, i: number) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          {/* Bloque de confianza */}
          <div className="w-full mt-8 bg-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow">+1000 empresas confían</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-sm font-medium text-gray-800">
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Soporte profesional</div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>Actualizaciones incluidas</div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Satisfacción garantizada</div>
            </div>
          </div>
        </div>
        {/* Tarjeta acciones como Client Component */}
        <AccionesProducto producto={producto} />
      </div>
      <FooterCta />
    </div>
  );
} 