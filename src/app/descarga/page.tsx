"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Descarga() {
  return (
    <Suspense fallback={<div>Cargando descarga...</div>}>
      <DescargaContent />
    </Suspense>
  );
}

function DescargaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<{
    hasActiveSubscription: boolean;
    isInDemo: boolean;
    demoDaysLeft: number | null;
    subscriptionType: string | null;
  }>({
    hasActiveSubscription: false,
    isInDemo: false,
    demoDaysLeft: null,
    subscriptionType: null,
  });

  const producto = searchParams.get("producto");
  const plan = searchParams.get("plan");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login?redirect=/descarga");
      return;
    }

    if (status === "authenticated") {
      checkUserStatus();
    }
  }, [status, session]);

  const checkUserStatus = () => {
    // Verificar si está en periodo de demo
    const demo = localStorage.getItem("demoCodevendi");
    let isInDemo = false;
    let demoDaysLeft = null;

    if (demo) {
      const data = JSON.parse(demo);
      const ahora = Date.now();
      const msRestantes = data.expira - ahora;
      if (msRestantes > 0) {
        isInDemo = true;
        demoDaysLeft = Math.ceil(msRestantes / (1000 * 60 * 60 * 24));
      } else {
        localStorage.removeItem("demoCodevendi");
      }
    }

    // TODO: Verificar suscripción activa desde la base de datos
    // Por ahora simulamos que no tiene suscripción activa
    const hasActiveSubscription = false;
    const subscriptionType = null;

    setUserStatus({
      hasActiveSubscription,
      isInDemo,
      demoDaysLeft,
      subscriptionType,
    });

    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!producto || !plan) return;

    const fileName = `${producto}-${plan}.zip`;
    const fileUrl = `/softwares/${fileName}`;

      // Crear un enlace invisible y simular click para descargar
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Ya se redirige en useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500 flex items-center justify-center py-12 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-yellow-200 p-10 max-w-lg w-full">
        {/* Header con logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/logo-codevendi.png" alt="CodeVendi" width={50} height={50} className="rounded-lg" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Centro de Descargas</h1>
          <p className="text-gray-600">Accede a tus softwares profesionales</p>
        </div>

        {/* Estado del usuario */}
        <div className="mb-6 p-4 rounded-xl border">
          {userStatus.isInDemo ? (
            <div className="bg-green-50 border-green-200 text-green-800">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Periodo de prueba activo</span>
              </div>
              <p className="text-sm">Tienes {userStatus.demoDaysLeft} días restantes de prueba gratuita</p>
            </div>
          ) : userStatus.hasActiveSubscription ? (
            <div className="bg-blue-50 border-blue-200 text-blue-800">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Suscripción {userStatus.subscriptionType} activa</span>
              </div>
              <p className="text-sm">Acceso completo a todos los softwares</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Periodo de prueba terminado</span>
              </div>
              <p className="text-sm">Necesitas una suscripción para continuar descargando</p>
            </div>
          )}
        </div>

        {/* Información del producto */}
        {producto && plan && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Producto seleccionado:</h3>
            <p className="text-gray-700 capitalize">{producto.replace(/-/g, " ")}</p>
            <p className="text-gray-600 text-sm capitalize">Plan: {plan}</p>
          </div>
        )}

        {/* Botón de descarga */}
        {(userStatus.isInDemo || userStatus.hasActiveSubscription) ? (
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Software
              </div>
            </button>
            <p className="text-xs text-gray-500 text-center">
              La descarga comenzará automáticamente
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-800 font-semibold mb-2">Acceso restringido</p>
              <p className="text-red-700 text-sm mb-4">
                Tu periodo de prueba ha terminado. Necesitas una suscripción para continuar.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Básica: <span className="font-bold text-yellow-600">9.99€/mes</span></p>
                <p className="text-sm text-gray-700">Pro: <span className="font-bold text-yellow-600">29.99€/mes</span></p>
              </div>
            </div>
            <Link
              href="/catalogo"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg transition text-center block"
            >
              Ver Planes de Suscripción
            </Link>
          </div>
        )}

        {/* Enlaces adicionales */}
        <div className="mt-8 text-center space-y-4">
          <Link href="/catalogo" className="text-sm text-gray-600 hover:text-gray-800 transition-colors block">
            ← Volver al catálogo
          </Link>
          <p className="text-xs text-gray-500">
            ¿Problemas con la descarga?{" "}
            <Link href="/contacto" className="text-yellow-600 hover:text-yellow-500 underline">
              Contacta con soporte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";