import Link from "next/link";

export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Crea tu cuenta en <span className="text-yellow-500">CodeVendi</span></h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre completo" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
        <input type="email" placeholder="Correo electrónico" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
        <input type="password" placeholder="Contraseña" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" required minLength={6} />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 rounded transition">Registrarse</button>
      </form>
      <p className="mt-4 text-center text-gray-600">¿Ya tienes cuenta? <Link href="/login" className="text-yellow-500 hover:underline">Inicia sesión</Link></p>
    </div>
  );
} 