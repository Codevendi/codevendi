"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  const slideIn = "transition-transform duration-300 ease-in-out transform translate-x-0";
  const slideOut = "transition-transform duration-300 ease-in-out transform -translate-x-full";

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo de Softwares" },
    { href: "/porque-codevendi", label: "¿Por qué Codevendi?" },
    { href: "/contacto", label: "Contacto" },
    { href: "/carrito", label: "Carrito", icon: (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 15.75A2.25 2.25 0 008.995 18h6.01a2.25 2.25 0 002.244-2.25l.563-10.125m-13.5 0h15.75' /></svg>
    ) },
  ];

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-codevendi.png" alt="Codevendi Logo" width={180} height={40} priority />
        </Link>
        {/* Menú horizontal (solo escritorio) */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-800">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={`hover:text-yellow-500 transition ${pathname === link.href ? "text-yellow-500 font-bold" : ""} flex items-center gap-1`}>{link.icon}{link.label}</Link>
            </li>
          ))}
        </ul>
        {/* Botones login/registro (solo escritorio) */}
        <div className="hidden md:flex gap-4 ml-6">
          <Link href="/login" className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold transition">Iniciar sesión</Link>
          <Link href="/register" className="px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-400 font-semibold transition">Registrarse</Link>
        </div>
        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Menú lateral móvil llamativo */}
        <div className={`fixed inset-0 z-50 flex md:hidden transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}>
          {/* Fondo gradiente */}
          <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/80 via-white/90 to-yellow-600/80 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMenuOpen(false)} />
          {/* Panel lateral */}
          <div ref={menuRef} className={`relative h-full w-72 max-w-[85vw] shadow-2xl rounded-r-2xl bg-white flex flex-col gap-6 p-6 border-l-4 border-yellow-500 ${menuOpen ? slideIn : slideOut}`}
            style={{ minHeight: "100dvh" }}>
            {/* Logo arriba */}
            <div className="flex items-center gap-2 mb-2">
              <Image src="/logo-codevendi.png" alt="Codevendi Logo" width={140} height={32} priority />
            </div>
            <button className="self-end mb-2" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
              <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-3 mt-2">
              {links.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`text-lg font-semibold flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 ${pathname === link.href ? "bg-yellow-100 text-yellow-600 shadow font-bold" : "text-gray-900 hover:bg-yellow-50 hover:text-yellow-600"}`}
                >
                  {link.icon}{link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/login" className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold transition text-center shadow" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
              <Link href="/register" className="px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-400 font-semibold transition text-center shadow" onClick={() => setMenuOpen(false)}>Registrarse</Link>
            </div>
            <div className="flex-1" />
            <div className="text-xs text-gray-400 text-center mt-8">© {new Date().getFullYear()} Codevendi</div>
          </div>
        </div>
      </nav>
    </header>
  );
}
