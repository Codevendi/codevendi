import Image from "next/image";
import Link from "next/link";

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
  { src: "/partners/microsoft.png", alt: "Microsoft" },
  { src: "/partners/google.png", alt: "Google" },
  { src: "/partners/aws.png", alt: "AWS" },
  { src: "/partners/stripe.png", alt: "Stripe" },
  { src: "/partners/vercel.png", alt: "Vercel" },
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
  return (
    <div className="flex flex-col gap-24">
      {/* HERO PROFESIONAL */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/softwares/1.png')] bg-no-repeat bg-center bg-cover pointer-events-none animate-pulse" />
        <span className="relative z-10 inline-block bg-yellow-500 text-gray-900 font-bold px-4 py-1 rounded-full mb-6 text-sm shadow-lg">+1000 empresas confían en CodeVendi</span>
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          Impulsa tu negocio con el mejor software profesional
        </h1>
        <p className="relative z-10 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium">
          Compra, descarga y gestiona tus herramientas digitales en un solo lugar. Seguridad, soporte y resultados garantizados.
        </p>
        <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-4">
          <Link href="/catalogo/" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">Ver Catálogo</Link>
          <Link href="/login" className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">Iniciar sesión</Link>
          <Link href="/register" className="bg-white hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition border border-yellow-500">Registrarse</Link>
          <Link href="/carrito" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 15.75A2.25 2.25 0 008.995 18h6.01a2.25 2.25 0 002.244-2.25l.563-10.125m-13.5 0h15.75" /></svg>Carrito</Link>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 justify-center mt-12">
          <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full text-white text-sm font-semibold shadow">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>
            Pago 100% seguro
          </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full text-white text-sm font-semibold shadow">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Soporte profesional
          </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full text-white text-sm font-semibold shadow">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            Descarga inmediata
          </div>
          <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full text-white text-sm font-semibold shadow">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
            Demo gratis 14 días
          </div>
        </div>
      </section>

      {/* PARTNERS/LOGOS */}
      <section className="flex flex-col items-center gap-6 py-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Partners y tecnología de confianza</h3>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {partners.map((p, i) => (
            <Image key={i} src={p.src} alt={p.alt} width={100} height={40} className="grayscale hover:grayscale-0 transition-all duration-300" />
          ))}
        </div>
      </section>

      {/* SELLOS DE SEGURIDAD */}
      <section className="flex flex-wrap justify-center gap-8 py-8">
        <div className="flex flex-col items-center gap-2">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
          <span className="font-semibold text-gray-800 dark:text-white">SSL Encriptado</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span className="font-semibold text-gray-800 dark:text-white">Garantía de satisfacción</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
          <span className="font-semibold text-gray-800 dark:text-white">Entrega inmediata</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
          <span className="font-semibold text-gray-800 dark:text-white">Soporte 24/7</span>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">Softwares Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {productos.map((producto, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition bg-yellow-500 pointer-events-none" />
              <Image src={producto.imagen} alt={producto.nombre} width={120} height={120} className="mb-4 rounded-lg shadow-lg" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white text-center">{producto.nombre}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{producto.descripcion}</p>
              <span className="text-yellow-500 font-bold text-lg mb-4">{producto.precio}</span>
              <Link href={`/catalogo/${producto.slug}`} className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-8 rounded-full transition shadow-lg w-full text-center">Ver Detalle</Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 gap-4">
          <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-10 rounded-full text-lg shadow-lg transition">Ver todo el catálogo</Link>
          <Link href="/porque-codevendi" className="inline-block bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition">¿Por qué CodeVendi?</Link>
          <Link href="/contacto" className="inline-block bg-white hover:bg-yellow-400 text-gray-900 font-bold py-3 px-10 rounded-full text-lg shadow-lg transition border border-yellow-500">Contacto</Link>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-3xl mx-auto py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Preguntas frecuentes</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
              <h4 className="font-semibold text-lg text-yellow-600 mb-2">{faq.pregunta}</h4>
              <p className="text-gray-700 dark:text-gray-300">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-20 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Listo para llevar tu empresa al siguiente nivel?</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Descubre el software perfecto para tu negocio y disfruta de una experiencia de compra segura, rápida y profesional.</p>
        <Link href="/catalogo/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-12 rounded-full text-lg shadow-xl transition">Empieza ahora</Link>
      </section>
    </div>
  );
}
