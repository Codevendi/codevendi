"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // @ts-expect-error
    if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/");
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500">
      <nav className="flex gap-8 p-6 bg-white/80 shadow-lg">
        <Link href="/admin" className="font-bold text-yellow-600">Panel Admin</Link>
        <Link href="/admin/productos" className="hover:text-yellow-600">Productos</Link>
        <Link href="/admin/ia" className="hover:text-yellow-600">Chat IA</Link>
        <Link href="/admin/soporte" className="hover:text-yellow-600">Soporte</Link>
        <Link href="/" className="ml-auto text-gray-600 hover:text-yellow-600">Volver a la tienda</Link>
      </nav>
      <main className="max-w-4xl mx-auto p-8 bg-white/90 rounded-2xl shadow-lg mt-8">
        <h1 className="text-3xl font-extrabold mb-6 text-yellow-600">Bienvenido al Panel de Administración</h1>
        <p className="mb-4">Desde aquí podrás gestionar:</p>
        <ul className="list-disc pl-6 text-lg mb-8">
          <li>Historial de conversaciones del Chat IA</li>
          <li>Tickets de soporte humano</li>
          <li>Usuarios, productos, promociones y más (próximamente)</li>
        </ul>
        <div className="flex gap-6">
          <Link href="/admin/ia" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow transition">Ver Chat IA</Link>
          <Link href="/admin/soporte" className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full shadow transition">Ver Soporte</Link>
        </div>
      </main>
    </div>
  );
} 