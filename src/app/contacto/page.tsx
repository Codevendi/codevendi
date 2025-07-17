export default function Contacto() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Contacto</h1>
      <form className="flex flex-col gap-4 bg-white rounded-xl shadow-lg p-8">
        <input type="text" placeholder="Nombre" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
        <input type="email" placeholder="Correo electrónico" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
        <textarea placeholder="Mensaje" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" rows={4} required />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 rounded transition">Enviar mensaje</button>
      </form>
      <div className="mt-8 text-center text-gray-600">
        <p>Email: <a href="mailto:info@codevendi.com" className="text-yellow-500 hover:underline">info@codevendi.com</a></p>
        <p>Teléfono: <a href="tel:+34123456789" className="text-yellow-500 hover:underline">+34 123 456 789</a></p>
      </div>
    </div>
  );
} 