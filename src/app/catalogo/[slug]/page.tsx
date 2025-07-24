"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import FooterCta from "./FooterCta";
import AccionesProducto from "./AccionesProducto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SoftwareDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [producto, setProducto] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/productos`)
      .then(res => res.json())
      .then(data => {
        const prod = data.find((p: any) => (p.slug || p.name?.toLowerCase().replace(/\s+/g, "-") || "") === slug);
        setProducto(prod);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!producto) return notFound();

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
    <div className="max-w-5xl mx-auto py-12 px-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0">
          <Image src={producto.imagen || producto.image} alt={producto.nombre || producto.name} width={200} height={200} className="rounded-xl shadow-lg" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{producto.nombre || producto.name}</h1>
          <p className="text-lg text-gray-700 mb-2">{producto.descripcion || producto.description}</p>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">Prueba gratis 14 días</span>
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-gray-700 text-base">Básica: <span className="text-yellow-500 font-bold">{PRECIO_BASICA}/mes</span></span>
            <span className="text-gray-700 text-base">Pro: <span className="text-yellow-500 font-bold">{PRECIO_PRO}/mes</span></span>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => handleBuy(producto.slug || producto.name?.toLowerCase().replace(/\s+/g, "-"), "basica")}
              className="flex-1 bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-2 px-4 rounded-full transition shadow-lg text-center">
              Comprar Básica
            </button>
            <button onClick={() => handleBuy(producto.slug || producto.name?.toLowerCase().replace(/\s+/g, "-"), "pro")}
              className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-full transition shadow-lg text-center">
              Comprar Pro
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Características principales</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {(producto.caracteristicas || producto.features || []).map((c: string, i: number) => <li key={i}>{c}</li>)}
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