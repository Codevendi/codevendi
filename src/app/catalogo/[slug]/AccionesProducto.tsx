"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export type Producto = {
  nombre: string;
  slug: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  version: string;
  caracteristicas: string[];
  versiones: { nombre: string; precio: string; descripcion: string }[];
};

export default function AccionesProducto({ producto }: { producto: Producto }) {
  const { data: session, status } = useSession();
  const [demoActiva, setDemoActiva] = useState(false);
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const router = useRouter();

  // Usar autenticación real en lugar de simulación
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const demo = localStorage.getItem("demoCodevendi");
    if (demo) {
      const data = JSON.parse(demo);
      const ahora = Date.now();
      const msRestantes = data.expira - ahora;
      if (msRestantes > 0) {
        setDemoActiva(true);
        setDiasRestantes(Math.ceil(msRestantes / (1000 * 60 * 60 * 24)));
      } else {
        setDemoActiva(false);
        setDiasRestantes(null);
        localStorage.removeItem("demoCodevendi");
      }
    }
  }, []);

  // Características extendidas
  const caracteristicas = [
    "Facturación automática",
    "Reportes fiscales",
    "Gestión de clientes",
    "Exportación a Excel y PDF",
    "Alertas de vencimiento",
    "Gestión de productos"
  ];
  // En Básica: Facturación automática, Gestión de clientes y Gestión de productos ✔️
  const basicaDisponibles = [true, false, true, false, false, true];

  // Lógica de botones
  const handleAction = (action: () => void) => {
    if (!isLoggedIn) {
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3500);
      router.push("/login");
      return;
    }
    action();
  };

  const activarDemo = () => {
    const expira = Date.now() + 14 * 24 * 60 * 60 * 1000;
    localStorage.setItem("demoCodevendi", JSON.stringify({ expira }));
    setDemoActiva(true);
    setDiasRestantes(14);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3500);
  };

  const descargarSoftware = () => {
    if (demoActiva || true) { // Por ahora permitir descarga si está en demo
      router.push(`/descarga?producto=${producto.slug}&plan=basica`);
    } else {
      // TODO: Verificar suscripción activa
      router.push(`/descarga?producto=${producto.slug}&plan=basica`);
    }
  };

  const comprarSoftware = () => {
    // TODO: Implementar lógica de compra real
    console.log("Comprar software:", producto.slug);
  };

  return (
    <div className="w-full md:w-96 bg-white rounded-2xl shadow-xl border border-yellow-200 p-8 flex flex-col gap-6 items-center sticky top-24">
      {/* Notificación */}
      {showNotif && (
        <div className="w-full mb-2 bg-yellow-100 border border-yellow-400 text-yellow-900 text-sm rounded-lg px-4 py-2 text-center font-semibold animate-fade-in-up">
          Debes registrarte para adquirir o probar cualquier software.
        </div>
      )}
      {/* Demo 14 días */}
      {!demoActiva && (
        <button onClick={() => handleAction(activarDemo)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-lg tracking-wide mb-2">
          Activar demo 14 días PRO
        </button>
      )}
      {demoActiva && diasRestantes !== null && (
        <span className="flex items-center gap-2 text-green-800 font-semibold text-xs bg-green-100/80 px-4 py-1 rounded-full shadow-sm border border-green-200 animate-pulse mb-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Demo PRO activa: {diasRestantes} días restantes
        </span>
      )}
      {/* Comparativa de versiones */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Básica */}
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-full mb-2">Limitada</span>
            <span className="font-semibold text-gray-900 text-lg mb-1">Básica</span>
            <span className="text-yellow-600 font-bold text-xl mb-2">9,99€/mes</span>
            <ul className="w-full text-sm mb-2">
              {caracteristicas.map((c: string, i: number) => (
                <li key={i} className="flex items-center gap-2 mb-1">
                  {basicaDisponibles[i] ? (
                    <span className="text-green-500">✔️</span>
                  ) : (
                    <span className="text-gray-300">✖️</span>
                  )}
                  <span className={basicaDisponibles[i] ? "text-gray-800" : "text-gray-400 line-through"}>{c}</span>
                </li>
              ))}
            </ul>
            <span className="text-xs text-gray-500 text-center">Algunas funciones bloqueadas. Sin demo gratuita.</span>
          </div>
          {/* Pro */}
          <div className="flex-1 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full mb-2">Recomendada</span>
            <span className="font-semibold text-gray-900 text-lg mb-1">Pro</span>
            <span className="text-yellow-700 font-bold text-xl mb-2">29,99€/mes</span>
            <ul className="w-full text-sm mb-2">
              {caracteristicas.map((c: string, i: number) => (
                <li key={i} className="flex items-center gap-2 mb-1">
                  <span className="text-green-500">✔️</span>
                  <span className="text-gray-800">{c}</span>
                </li>
              ))}
            </ul>
            <span className="text-xs text-gray-700 text-center">Todas las funciones desbloqueadas.</span>
          </div>
        </div>
      </div>
      {/* Botones */}
      <div className="flex flex-col gap-2 w-full mt-2">
        <button onClick={() => handleAction(descargarSoftware)} className="w-full bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-lg tracking-wide" title="Descargar Básica">
          Descargar Básica
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <button onClick={() => handleAction(comprarSoftware)} className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-lg tracking-wide" title="Comprar Pro">
          Comprar Pro
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
} 