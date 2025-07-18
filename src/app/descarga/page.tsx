"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Descarga() {
  const searchParams = useSearchParams();
  const producto = searchParams.get("producto");
  const plan = searchParams.get("plan");

  // Construir la URL del archivo a descargar
  const fileName = producto && plan ? `${producto}-${plan}.zip` : null;
  const fileUrl = fileName ? `/softwares/${fileName}` : null;

  useEffect(() => {
    if (fileUrl && fileName) {
      // Crear un enlace invisible y simular click para descargar
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [fileUrl, fileName]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 text-center py-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 max-w-lg w-full flex flex-col items-center">
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago verificado y descarga lista!</h1>
        <p className="text-gray-700 mb-4">Tu descarga debería comenzar automáticamente.<br/>
          {fileUrl && fileName ? (
            <a href={fileUrl} download={fileName} className="text-yellow-500 underline">haz clic aquí</a>
          ) : (
            <span className="text-gray-400">Archivo no disponible</span>
          )}
        </p>
        <div className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">Prueba gratis 14 días incluida</div>
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-gray-700 text-sm">Básica: <span className="text-yellow-500 font-bold">9.99€/mes</span></span>
          <span className="text-gray-700 text-sm">Pro: <span className="text-yellow-500 font-bold">29.99€/mes</span></span>
        </div>
        <Link href="/catalogo" className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-8 rounded-full text-lg shadow-lg transition">Volver al catálogo</Link>
        <p className="mt-6 text-gray-500 text-xs">¿Problemas con la descarga? <a href="/contacto" className="text-yellow-500 underline">Contacta con soporte</a></p>
      </div>
    </div>
  );
} 