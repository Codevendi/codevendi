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
  { src: "/partners/google.png", alt: "Google" },
  { src: "/partners/amazon.png", alt: "Amazon" },
  { src: "/partners/visa.png", alt: "Visa" },
  { src: "/partners/microsoft.png", alt: "Microsoft" },
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
    <div className="flex flex-col gap-24">
      {/* HERO PROFESIONAL */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-14 sm:py-20 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/softwares/1.png')] bg-no-repeat bg-center bg-cover pointer-events-none animate-pulse" />
        <span className="relative z-10 inline-block bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm shadow-lg">+1000 empresas confían en CodeVendi</span>
        <h1 className="relative z-10 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">Impulsa tu negocio con el mejor software profesional</h1>
        <p className="relative z-10 text-base xs:text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 font-medium">Compra, descarga y gestiona tus herramientas digitales en un solo lugar. Seguridad, soporte y resultados garantizados.</p>
        <div className="relative z-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-2 sm:mt-4 w-full max-w-xl">
          <Link href="/catalogo/" className="w-full xs:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transition text-center">Ver Catálogo</Link>
          <Link href="/login" className="w-full xs:w-auto bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transition text-center">Iniciar sesión</Link>
          <Link href="/register" className="w-full xs:w-auto bg-white hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transition border border-yellow-500 text-center">Registrarse</Link>
          <Link href="/carrito" className="w-full xs:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transition flex items-center gap-2 justify-center"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 15.75A2.25 2.25 0 008.995 18h6.01a2.25 2.25 0 002.244-2.25l.563-10.125m-13.5 0h15.75" /></svg>Carrito</Link>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 justify-center mt-8 sm:mt-12 w-full max-w-2xl">
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold shadow justify-center"> <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg> Pago 100% seguro </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold shadow justify-center"> <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Soporte profesional </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold shadow justify-center"> <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg> Descarga inmediata </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold shadow justify-center"> <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg> Demo gratis 14 días </div>
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

      {/* PRODUCTOS DESTACADOS */}
      <section>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-10 text-center">Softwares Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {productos.map((producto, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-5 sm:p-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition bg-yellow-500 pointer-events-none" />
              <Image src={producto.imagen} alt={producto.nombre} width={100} height={100} className="mb-3 sm:mb-4 rounded-lg shadow-lg" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white text-center">{producto.nombre}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 text-center text-sm sm:text-base">{producto.descripcion}</p>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full mb-1 sm:mb-2">Prueba gratis 14 días</span>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                <span className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">Básica: <span className="text-yellow-500 font-bold">{PRECIO_BASICA}/mes</span></span>
                <span className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">Pro: <span className="text-yellow-500 font-bold">{PRECIO_PRO}/mes</span></span>
              </div>
              <div className="flex gap-2 w-full mb-2">
                <button onClick={() => handleBuy(producto.slug, "basica")}
                  className="flex-1 bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-2 sm:px-4 rounded-full transition shadow-lg text-xs sm:text-sm text-center">
                  Comprar Básica
                </button>
                <button onClick={() => handleBuy(producto.slug, "pro")}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-2 sm:px-4 rounded-full transition shadow-lg text-xs sm:text-sm text-center">
                  Comprar Pro
                </button>
              </div>
              <Link href={`/catalogo/${producto.slug}`} className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-4 sm:px-8 rounded-full transition shadow-lg w-full text-xs sm:text-sm text-center">Ver Detalle</Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 my-6 sm:my-8 w-full">
          <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition w-full sm:w-auto text-center">Ver todo el catálogo</Link>
          <Link href="/porque-codevendi" className="inline-block bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition w-full sm:w-auto text-center">¿Por qué CodeVendi?</Link>
          <Link href="/contacto" className="inline-block bg-white hover:bg-yellow-400 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-lg transition border border-yellow-500 w-full sm:w-auto text-center">Contacto</Link>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-3xl mx-auto py-10 sm:py-16 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">Preguntas frecuentes</h2>
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
              <h4 className="font-semibold text-base sm:text-lg text-yellow-600 mb-1 sm:mb-2">{faq.pregunta}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-10 sm:mt-20 text-center px-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">¿Listo para llevar tu empresa al siguiente nivel?</h3>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">Descubre el software perfecto para tu negocio y disfruta de una experiencia de compra segura, rápida y profesional.</p>
        <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg shadow-xl transition">Empieza ahora</Link>
      </section>
    </div>
  );
}
