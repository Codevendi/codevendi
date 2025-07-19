"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// ...resto del código...
const productos = [
  {
    nombre: "Gestor de Tareas Pro",
    descripcion: "Organiza tu vida y tu trabajo con la mejor app de productividad.",
    precio: "29.99€",
    imagen: "/softwares/1.png",
    slug: "gestor-tareas-pro",
  },
  {
    nombre: "Facturación Fácil",
    descripcion: "Automatiza tu contabilidad y facturación en minutos.",
    precio: "49.99€",
    imagen: "/softwares/2.png",
    slug: "facturacion-facil",
  },
  {
    nombre: "CRM Clientes+",
    descripcion: "Gestiona tus clientes y ventas con inteligencia.",
    precio: "39.99€",
    imagen: "/softwares/3.png",
    slug: "crm-clientes-plus",
  },
];

const partners = [
  { src: "/partners/google.jpg", alt: "Google" },
  { src: "/partners/aws.jpg", alt: "AWS" },
  { src: "/partners/visa.jpg", alt: "Visa" },
  { src: "/partners/microsoft.jpg", alt: "Microsoft" },
];

const faqs = [
  {
    pregunta: "¿Cómo funciona la demo gratis?",
    respuesta: "Puedes probar cualquier software durante 14 días sin compromiso. Solo necesitas registrarte y activar la demo desde el catálogo o la ficha del producto.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos tarjetas de crédito/débito, Stripe y próximamente PayPal. Todos los pagos son 100% seguros.",
  },
  {
    pregunta: "¿Puedo cancelar mi suscripción en cualquier momento?",
    respuesta: "Sí, puedes cancelar o cambiar tu plan desde tu panel de usuario sin penalizaciones.",
  },
  {
    pregunta: "¿Tendré soporte si tengo dudas?",
    respuesta: "Por supuesto. Nuestro equipo de soporte profesional está disponible para ayudarte antes y después de tu compra.",
  },
];

export default function Home() {
  const router = useRouter();
  const PRECIO_BASICA = "9.99€";
  const PRECIO_PRO = "29.99€";

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
    <div className="flex flex-col gap-8">
      {/* HERO PROFESIONAL MEJORADO */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-14 sm:py-24 text-center bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500 overflow-hidden">
        {/* Fondo SVG animado */}
        <svg className="absolute inset-0 w-full h-full z-0 animate-pulse" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f59e42" />
            </linearGradient>
          </defs>
          <path fill="url(#grad1)" fillOpacity="0.5" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
          <span className="inline-block bg-white/80 text-yellow-600 font-bold px-4 py-1 rounded-full mb-4 text-xs sm:text-sm shadow-lg tracking-wide animate-bounce">¡Impulsa tu empresa hoy!</span>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg leading-tight animate-fade-in">El software que <span className="text-yellow-600">vende</span> y <span className="text-yellow-600">crece</span> contigo</h1>
          <p className="text-lg sm:text-2xl text-gray-800 max-w-xl mx-auto mb-8 font-medium animate-fade-in delay-100">Soluciones digitales listas para usar, con soporte real y resultados inmediatos. ¡Compra, descarga y crece sin límites!</p>
          <Link href="/catalogo/" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full text-lg shadow-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 animate-fade-in delay-200">Ver catálogo y probar gratis</Link>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="w-full max-w-5xl mx-auto py-10 sm:py-16 px-2 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center animate-fade-in">Clientes felices, empresas que crecen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {/* Testimonio 1 */}
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-100 animate-fade-in">
            <img src="/avatars/avatar1.jpg" alt="María López" width={64} height={64} className="rounded-full mb-3 border-2 border-yellow-400" />
            <span className="font-bold text-gray-900">María López</span>
            <span className="text-sm text-gray-500 mb-2">CEO, Soluciones Financieras</span>
            <p className="text-gray-700 text-base">“Gracias a Codevendi hemos digitalizado toda la empresa en días. El soporte es increíble y la descarga inmediata.”</p>
          </div>
          {/* Testimonio 2 */}
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-100 animate-fade-in delay-100">
            <img src="/avatars/avatar2.jpg" alt="Carlos Ruiz" width={64} height={64} className="rounded-full mb-3 border-2 border-yellow-400" />
            <span className="font-bold text-gray-900">Carlos Ruiz</span>
            <span className="text-sm text-gray-500 mb-2">CTO, StartApp</span>
            <p className="text-gray-700 text-base">“El software es potente y fácil de usar. La demo gratis y la compra fueron rapidísimas. ¡Repetiremos!”</p>
          </div>
          {/* Testimonio 3 */}
          <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-100 animate-fade-in delay-200">
            <img src="/avatars/avatar3.jpg" alt="Mamadou Davis" width={64} height={64} className="rounded-full mb-3 border-2 border-yellow-400" />
            <span className="font-bold text-gray-900">Mamadou Davis</span>
            <span className="text-sm text-gray-500 mb-2">Director de Operaciones, Grupo Nova</span>
            <p className="text-gray-700 text-base">“La mejor inversión en tecnología. El equipo de soporte responde como si fueran parte de nuestra empresa.”</p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="w-full max-w-4xl mx-auto py-10 sm:py-16 px-2 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center animate-fade-in">¿Cómo funciona Codevendi?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {/* Paso 1 */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6 border border-yellow-100 animate-fade-in">
            <div className="bg-yellow-100 p-4 rounded-full mb-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </div>
            <span className="font-bold text-gray-900 mb-1">1. Elige tu software</span>
            <p className="text-gray-700 text-center text-sm">Explora el catálogo y selecciona la solución que mejor se adapta a tu negocio.</p>
          </div>
          {/* Paso 2 */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6 border border-yellow-100 animate-fade-in delay-100">
            <div className="bg-yellow-100 p-4 rounded-full mb-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" /></svg>
            </div>
            <span className="font-bold text-gray-900 mb-1">2. Compra segura</span>
            <p className="text-gray-700 text-center text-sm">Realiza el pago 100% seguro y recibe acceso inmediato a tu producto.</p>
          </div>
          {/* Paso 3 */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6 border border-yellow-100 animate-fade-in delay-200">
            <div className="bg-yellow-100 p-4 rounded-full mb-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
            </div>
            <span className="font-bold text-gray-900 mb-1">3. Descarga y soporte</span>
            <p className="text-gray-700 text-center text-sm">Descarga tu software y cuenta con soporte profesional siempre que lo necesites.</p>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN DE CONFIANZA */}
      <section className="flex flex-col items-center gap-8 py-8 sm:py-12 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-4xl border border-gray-200 mt-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">¿Por qué confiar en Codevendi?</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            {/* Candado: Pago seguro */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" /><path d="M6 8V6a6 6 0 1112 0v2" /><rect x="4" y="8" width="16" height="12" rx="2" /></svg>
            <span className="font-semibold text-gray-800 text-center text-sm sm:text-base">Pago 100% seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* Reloj: Demo gratis */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            <span className="font-semibold text-gray-800 text-center text-sm sm:text-base">Demo gratis 14 días</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* Auriculares: Soporte profesional */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-4a2 2 0 012-2h1a2 2 0 012 2v4z" /><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4z" /></svg>
            <span className="font-semibold text-gray-800 text-center text-sm sm:text-base">Soporte profesional</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* Flecha hacia abajo: Descarga inmediata */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" /></svg>
            <span className="font-semibold text-gray-800 text-center text-sm sm:text-base">Descarga inmediata</span>
          </div>
        </div>
      </section>

      {/* PARTNERS ANIMADOS */}
      <section className="w-full max-w-4xl mx-auto py-8 flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Confían en nosotros</h3>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {partners.map((p, i) => (
            <div key={i} className="transition-transform duration-300 hover:scale-110 flex items-center justify-center bg-white rounded-xl shadow-md p-2 sm:p-4" style={{ minWidth: 120, minHeight: 60 }}>
              <img
                src={p.src}
                alt={p.alt}
                className="w-32 h-16 object-contain mx-auto"
                aria-label={`Logo de ${p.alt}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS GLASSMORPHISM */}
      <section>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-10 text-center">Softwares Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {productos.map((producto, idx) => (
            <div key={idx} className="bg-white/60 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-100 dark:border-yellow-700 p-5 sm:p-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-yellow-200 relative overflow-hidden group focus-within:ring-2 focus-within:ring-yellow-400" tabIndex={0} aria-label={`Producto destacado: ${producto.nombre}`}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition bg-yellow-500 pointer-events-none" />
              <Image src={producto.imagen} alt={producto.nombre} width={100} height={100} className="mb-3 sm:mb-4 rounded-lg shadow-lg border border-yellow-200" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white text-center">{producto.nombre}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 text-center text-sm sm:text-base">{producto.descripcion}</p>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full mb-1 sm:mb-2">Prueba gratis 14 días</span>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                <span className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">Básica: <span className="text-yellow-500 font-bold">{PRECIO_BASICA}/mes</span></span>
                <span className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">Pro: <span className="text-yellow-500 font-bold">{PRECIO_PRO}/mes</span></span>
              </div>
              <div className="flex gap-2 w-full mb-2">
                <button onClick={() => handleBuy(producto.slug, "basica")}
                  className="flex-1 bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-2 sm:px-4 rounded-full transition shadow-lg text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  Comprar Básica
                </button>
                <button onClick={() => handleBuy(producto.slug, "pro")}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-2 sm:px-4 rounded-full transition shadow-lg text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  Comprar Pro
                </button>
              </div>
              <Link href={`/catalogo/${producto.slug}`} className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-4 sm:px-8 rounded-full transition shadow-lg w-full text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-yellow-400">Ver Detalle</Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-2 w-full">
          <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition w-full sm:w-auto text-center">Ver todo el catálogo</Link>
          <Link href="/porque-codevendi" className="inline-block bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition w-full sm:w-auto text-center">¿Por qué CodeVendi?</Link>
          <Link href="/contacto" className="inline-block bg-white hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition border border-yellow-500 w-full sm:w-auto text-center">Contacto</Link>
        </div>
      </section>

      {/* CTA STICKY MÓVIL */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center md:hidden pointer-events-none">
        <Link href="/catalogo/" className="pointer-events-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 animate-bounce">¡Prueba gratis 14 días!</Link>
      </div>

      {/* FAQ ACORDEÓN */}
      <section className="max-w-3xl mx-auto py-10 sm:py-16 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">Preguntas frecuentes</h2>
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 group" open={i === 0}>
              <summary className="font-semibold text-base sm:text-lg text-yellow-600 mb-1 sm:mb-2 cursor-pointer outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-between">
                {faq.pregunta}
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mt-2">{faq.respuesta}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-10 sm:mt-20 text-center px-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">¿Listo para llevar tu empresa al siguiente nivel?</h3>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">Descubre el software perfecto para tu negocio y disfruta de una experiencia de compra segura, rápida y profesional.</p>
        <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg shadow-xl transition">Empieza ahora</Link>
      </section>

      {/* FOOTER PROFESIONAL */}
      <footer className="w-full bg-gray-900 text-white py-10 mt-16 border-t border-yellow-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image src="/logo-codevendi.png" alt="Codevendi Logo" width={140} height={32} className="mb-2" />
            <span className="text-sm text-gray-400">© {new Date().getFullYear()} Codevendi. Todos los derechos reservados.</span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <div className="flex flex-col gap-2 text-sm">
              <span className="font-bold text-yellow-400 mb-1">Enlaces rápidos</span>
              <Link href="/" className="hover:text-yellow-400 transition">Inicio</Link>
              <Link href="/catalogo" className="hover:text-yellow-400 transition">Catálogo</Link>
              <Link href="/porque-codevendi" className="hover:text-yellow-400 transition">¿Por qué Codevendi?</Link>
              <Link href="/contacto" className="hover:text-yellow-400 transition">Contacto</Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <span className="font-bold text-yellow-400 mb-1">Contacto</span>
              <a href="mailto:info@codevendi.com" className="hover:text-yellow-400 transition">info@codevendi.com</a>
              <a href="tel:+34123456789" className="hover:text-yellow-400 transition">+34 123 456 789</a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <span className="font-bold text-yellow-400 mb-1">Síguenos</span>
              <a href="#" className="hover:text-yellow-400 transition" aria-label="Twitter"><svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" /></svg>Twitter</a>
              <a href="#" className="hover:text-yellow-400 transition" aria-label="LinkedIn"><svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>LinkedIn</a>
              <a href="#" className="hover:text-yellow-400 transition" aria-label="Instagram"><svg className="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.333 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.282.353 2.394 1.333 3.374.981.981 2.093 1.275 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.353 3.374-1.334.98-.98 1.274-2.092 1.333-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.282-.353-2.394-1.333-3.374-.981-.981-2.093-1.275-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" /></svg>Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTONES FLOTANTES */}
      <a href="https://wa.me/34123456789" target="_blank" rel="noopener" className="fixed bottom-20 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="WhatsApp Soporte">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.67 6.13L0 24l6.37-1.67A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22a9.93 9.93 0 01-5.09-1.4l-.36-.21-3.78 1 1-3.67-.24-.38A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.34.99 2.63 1.13 2.81.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" /></svg>
      </a>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Subir arriba">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
      </button>
    </div>
  );
}
