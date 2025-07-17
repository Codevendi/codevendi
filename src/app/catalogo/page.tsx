"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const productos = [
  { nombre: "Gestor de Tareas Pro", slug: "gestor-tareas-pro", descripcion: "Organiza tu día y tus proyectos como un profesional. Automatiza recordatorios, colabora en equipo y alcanza tus metas sin estrés.", imagen: "/softwares/1.png", categoria: "Productividad" },
  { nombre: "Facturación Fácil", slug: "facturacion-facil", descripcion: "Olvídate del papeleo: factura en un clic, controla tus finanzas y cumple con Hacienda sin esfuerzo. ¡Ahorra tiempo y evita errores!", imagen: "/softwares/2.png", categoria: "Negocios" },
  { nombre: "CRM Clientes+", slug: "crm-clientes-plus", descripcion: "Convierte más ventas y fideliza clientes con seguimiento inteligente y paneles visuales. Tu negocio, siempre bajo control.", imagen: "/softwares/3.png", categoria: "CRM" },
  { nombre: "Editor de Imágenes Pro", slug: "editor-imagenes-pro", descripcion: "Crea imágenes impactantes en minutos. Filtros profesionales, edición avanzada y resultados de calidad para destacar tu marca.", imagen: "/softwares/4.png", categoria: "Diseño" },
  { nombre: "Antivirus Ultra", slug: "antivirus-ultra", descripcion: "Protege tu empresa y tus datos con la máxima seguridad. Detección inteligente y actualizaciones automáticas para tu tranquilidad.", imagen: "/softwares/5.png", categoria: "Seguridad" },
  { nombre: "Notas Rápidas", slug: "notas-rapidas", descripcion: "Captura ideas y tareas al instante. Sincroniza en todos tus dispositivos y nunca pierdas una inspiración importante.", imagen: "/softwares/6.png", categoria: "Productividad" },
  { nombre: "Gestor de Contraseñas", slug: "gestor-contraseñas", descripcion: "Tus contraseñas seguras y siempre a mano. Olvídate de recordar claves y accede a todo con un solo clic.", imagen: "/softwares/7.png", categoria: "Seguridad" },
  { nombre: "VideoMeet Pro", slug: "videomeet-pro", descripcion: "Reuniones online sin límites: videollamadas HD, grabación y colaboración en tiempo real. Conecta y crece desde cualquier lugar.", imagen: "/softwares/8.png", categoria: "Comunicación" },
  { nombre: "Gestor de Proyectos", slug: "gestor-proyectos", descripcion: "Planifica, asigna y visualiza el avance de tus proyectos con facilidad. Mantén a tu equipo alineado y entrega siempre a tiempo.", imagen: "/softwares/9.png", categoria: "Negocios" },
  { nombre: "Calendario Inteligente", slug: "calendario-inteligente", descripcion: "Tu agenda, siempre organizada. Recibe recordatorios automáticos y sincroniza con tus apps favoritas. No vuelvas a perder una cita.", imagen: "/softwares/10.png", categoria: "Productividad" },
  { nombre: "Automatizador de Tareas", slug: "automatizador-tareas", descripcion: "Automatiza procesos repetitivos y ahorra horas cada semana. Conecta tus apps y deja que el software trabaje por ti.", imagen: "/softwares/11.png", categoria: "Productividad" },
  { nombre: "MindMap Pro", slug: "mindmap-pro", descripcion: "Visualiza tus ideas y proyectos con mapas mentales interactivos. Colabora y presenta de forma creativa y efectiva.", imagen: "/softwares/12.png", categoria: "Educación" },
  { nombre: "Escritor AI", slug: "escritor-ai", descripcion: "Redacta textos, emails y artículos en segundos con ayuda de IA. Ahorra tiempo y comunica mejor que nunca.", imagen: "/softwares/13.png", categoria: "Productividad" },
  { nombre: "ERP Empresarial", slug: "erp-empresarial", descripcion: "Gestiona ventas, inventario y recursos humanos desde un solo lugar. Escala tu empresa con la máxima eficiencia.", imagen: "/softwares/14.png", categoria: "Negocios" },
  { nombre: "Control de Inventario", slug: "control-inventario", descripcion: "No pierdas ventas por falta de stock. Controla tu inventario en tiempo real y recibe alertas automáticas.", imagen: "/softwares/15.png", categoria: "Negocios" },
  { nombre: "Gestión de Nóminas", slug: "gestion-nominas", descripcion: "Calcula y paga nóminas en minutos. Cumple con la ley y olvídate de errores y retrasos.", imagen: "/softwares/16.png", categoria: "Negocios" },
  { nombre: "Analítica de Ventas", slug: "analitica-ventas", descripcion: "Descubre qué funciona y vende más. Analiza tus ventas con dashboards visuales y toma decisiones inteligentes.", imagen: "/softwares/17.png", categoria: "Negocios" },
  { nombre: "Generador de Logos", slug: "generador-logos", descripcion: "Crea un logo profesional para tu marca en minutos. Personaliza, descarga y destaca frente a la competencia.", imagen: "/softwares/18.png", categoria: "Diseño" },
  { nombre: "Editor de Video Ultra", slug: "editor-video-ultra", descripcion: "Edita vídeos como un pro: efectos, transiciones y exportación rápida. Haz que tu contenido brille en redes.", imagen: "/softwares/19.png", categoria: "Diseño" },
  { nombre: "Suite de Animación", slug: "suite-animacion", descripcion: "Animaciones 2D/3D de nivel profesional. Da vida a tus ideas y sorprende a tu audiencia.", imagen: "/softwares/20.png", categoria: "Diseño" },
  { nombre: "Creador de Mockups", slug: "creador-mockups", descripcion: "Presenta tus apps y productos con mockups realistas y atractivos. Impresiona a clientes e inversores.", imagen: "/softwares/21.png", categoria: "Diseño" },
  { nombre: "Firewall Personal", slug: "firewall-personal", descripcion: "Protege tu red y dispositivos con reglas inteligentes y monitoreo en tiempo real. Seguridad sin complicaciones.", imagen: "/softwares/22.png", categoria: "Seguridad" },
  { nombre: "Detector de Malware", slug: "detector-malware", descripcion: "Mantén tu sistema limpio y seguro. Detecta y elimina amenazas antes de que sean un problema.", imagen: "/softwares/23.png", categoria: "Seguridad" },
  { nombre: "VPN UltraSegura", slug: "vpn-ultrasegura", descripcion: "Navega y trabaja con total privacidad. Accede a contenido global y protege tu identidad online.", imagen: "/softwares/24.png", categoria: "Seguridad" },
  { nombre: "Backup Automático", slug: "backup-automatico", descripcion: "Tus archivos siempre a salvo. Copias de seguridad automáticas y restauración en un clic.", imagen: "/softwares/25.png", categoria: "Seguridad" },
  { nombre: "Chat Empresarial", slug: "chat-empresarial", descripcion: "Comunicación instantánea y segura para tu equipo. Canales privados, videollamadas y colaboración eficiente.", imagen: "/softwares/26.png", categoria: "Comunicación" },
  { nombre: "Email Marketing Pro", slug: "email-marketing-pro", descripcion: "Lanza campañas de email que convierten. Segmenta, automatiza y mide resultados fácilmente.", imagen: "/softwares/27.png", categoria: "Comunicación" },
  { nombre: "Traductor Instantáneo", slug: "traductor-instantaneo", descripcion: "Traduce textos y conversaciones en más de 50 idiomas. Rompe barreras y haz crecer tu negocio globalmente.", imagen: "/softwares/28.png", categoria: "Comunicación" },
  { nombre: "Webinar Studio", slug: "webinar-studio", descripcion: "Organiza webinars profesionales, graba sesiones y gestiona asistentes con facilidad. Impulsa tu marca online.", imagen: "/softwares/29.png", categoria: "Comunicación" },
  { nombre: "Plataforma de Cursos", slug: "plataforma-cursos", descripcion: "Crea, vende y gestiona cursos online con evaluaciones y certificados. Lleva tu conocimiento al siguiente nivel.", imagen: "/softwares/30.png", categoria: "Educación" },
  { nombre: "Simulador de Laboratorio", slug: "simulador-laboratorio", descripcion: "Experimenta y aprende con simulaciones realistas. Ideal para formación científica y técnica.", imagen: "/softwares/31.png", categoria: "Educación" },
  { nombre: "Tutor AI", slug: "tutor-ai", descripcion: "Asistente educativo inteligente que resuelve dudas y personaliza el aprendizaje. Tu aliado para estudiar mejor.", imagen: "/softwares/32.png", categoria: "Educación" },
];

const categorias = [
  "Todos",
  "Productividad",
  "Negocios",
  "CRM",
  "Diseño",
  "Seguridad",
  "Comunicación",
  "Educación",
];

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [showFooter, setShowFooter] = useState(true);
  const productosFiltrados = categoriaSeleccionada === "Todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-extrabold text-white mb-4 text-center drop-shadow-lg">Catálogo de Softwares</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-semibold transition ${categoriaSeleccionada === cat ? "bg-yellow-500 text-white border-yellow-500" : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"}`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {productosFiltrados.map((producto, idx) => (
          <div
            key={idx}
            className={`group bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_0_rgba(31,41,55,0.10)] p-8 flex flex-col items-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] relative overflow-hidden animate-fade-in-up`} 
            style={{ boxShadow: '0 4px 24px 0 rgba(31,41,55,0.10)', animationDelay: `${idx * 80}ms` }}
          >
            {/* Badge de categoría */}
            <span className="absolute top-5 left-5 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-yellow-200 z-20 capitalize">
              {producto.categoria}
            </span>
            {/* Badge top ventas */}
            {idx < 3 && (
              <span className="absolute top-5 right-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1 animate-bounce">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17l-5 3 1.9-5.6L4 10.5l5.7-.4L12 5l2.3 5.1 5.7.4-4.9 3.9L17 20z" /></svg>
                Top ventas
              </span>
            )}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{background: 'linear-gradient(120deg, #fcd34d22 0%, #fff 100%)'}} />
            <div className="mb-6 flex items-center justify-center z-10">
              <div className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white p-3 group-hover:scale-110 group-hover:ring-2 group-hover:ring-yellow-300">
                <Image src={producto.imagen} alt={producto.nombre} width={72} height={72} className="object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1 text-gray-900 text-center group-hover:text-yellow-400 transition-colors z-10 drop-shadow-lg">{producto.nombre}</h3>
            {/* Valoración de usuarios */}
            <div className="flex items-center justify-center gap-1 mb-2 z-10">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              <span className="text-xs text-gray-600 font-semibold">4.9/5</span>
              <span className="text-xs text-gray-400">(1.200+)</span>
            </div>
            <p className="text-gray-600 mb-4 text-center text-sm min-h-[48px] z-10">{producto.descripcion}</p>
            <span className="flex items-center gap-2 text-green-800 font-semibold mb-4 text-xs bg-green-100/80 px-4 py-1 rounded-full shadow-sm border border-green-200 z-10 animate-pulse">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              14 días de prueba gratuita
            </span>
            <Link
              href={`/catalogo/${producto.slug}`}
              className="mt-auto bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-7 rounded-full transition-all duration-200 shadow-lg group-hover:shadow-2xl text-base tracking-wide flex items-center gap-2 z-10 relative"
              title="Descubre todos los detalles y versiones"
            >
              Ver más
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <div className="flex justify-between items-center w-full mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 z-10">
              <span className="capitalize font-medium">{producto.categoria}</span>
              <span className="">v{producto.slug === 'gestor-tareas-pro' ? '2.3.1' : ''}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Footer fijo con CTA y botón de cerrar */}
      {showFooter && (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 px-4 flex justify-center items-center shadow-2xl z-50 text-sm md:text-base">
          <button
            onClick={() => setShowFooter(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xl font-bold focus:outline-none"
            aria-label="Cerrar aviso"
            style={{right: 16}}
          >
            ×
          </button>
          ¿Tienes dudas? <span className="mx-2 font-bold text-yellow-400">¡Contáctanos y te asesoramos gratis!</span>
          <a href="/contacto" className="ml-3 px-4 py-2 rounded-full bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-400 transition">Contacto</a>
        </footer>
      )}
    </div>
  );
}

<style jsx global>{`
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.7s cubic-bezier(.39,.575,.565,1) both;
}
`}</style> 