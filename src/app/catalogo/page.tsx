"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Catalogo() {
  const [productos, setProductos] = useState<any[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [showFooter, setShowFooter] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const productosFiltrados = categoriaSeleccionada === "Todos"
    ? productos
    : productos.filter(p => (p.categoria || p.category) === categoriaSeleccionada);

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
              {producto.categoria || producto.category}
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
            <div className="flex flex-col items-center gap-1 mb-4">
              <span className="text-gray-700 text-sm">Básica: <span className="text-yellow-500 font-bold">{PRECIO_BASICA}/mes</span></span>
              <span className="text-gray-700 text-sm">Pro: <span className="text-yellow-500 font-bold">{PRECIO_PRO}/mes</span></span>
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
            <Link
              href={`/catalogo/${producto.slug}`}
              className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-8 rounded-full transition shadow-lg w-full text-center"
            >
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
      {showFooter && (
        <footer className="mt-16 text-center text-gray-600 text-sm">
          &copy; 2023 Softwares. Todos los derechos reservados.
        </footer>
      )}
    </div>
  );
}