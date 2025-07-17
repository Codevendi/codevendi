import Image from "next/image";
import Link from "next/link";

const productos = [
  {
    nombre: "Gestor de Tareas Pro",
    descripcion: "Organiza tu vida y tu trabajo con la mejor app de productividad.",
    precio: "29.99€",
    imagen: "/softwares/1.png",
  },
  {
    nombre: "Facturación Fácil",
    descripcion: "Automatiza tu contabilidad y facturación en minutos.",
    precio: "49.99€",
    imagen: "/softwares/2.png",
  },
  {
    nombre: "CRM Clientes+",
    descripcion: "Gestiona tus clientes y ventas con inteligencia.",
    precio: "39.99€",
    imagen: "/softwares/3.png",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero principal */}
      <section className="text-center py-16 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Bienvenido a <span className="text-yellow-500">CodeVendi</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          La tienda online donde encuentras, compras y descargas el software que impulsa tu negocio o proyecto. ¡Rápido, seguro y con soporte profesional!
        </p>
        <Link href="/catalogo/" className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">Ver Catálogo</Link>
      </section>
      {/* Catálogo de productos */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Softwares Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((producto, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
              <Image src={producto.imagen} alt={producto.nombre} width={120} height={120} className="mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{producto.nombre}</h3>
              <p className="text-gray-600 mb-4 text-center">{producto.descripcion}</p>
              <span className="text-yellow-500 font-bold text-lg mb-4">{producto.precio}</span>
              <button className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-6 rounded-full transition">Comprar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
