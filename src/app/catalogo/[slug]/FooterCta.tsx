"use client";

export default function FooterCta() {
  const handleClose = () => {
    const el = document.getElementById('footer-cta');
    if (el) el.style.display = 'none';
  };
  return (
    <footer id="footer-cta" className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 px-4 flex justify-center items-center shadow-2xl z-50 text-sm md:text-base transition-all">
      <button onClick={handleClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 text-2xl font-bold px-2">×</button>
      ¿Tienes dudas? <span className="mx-2 font-bold text-yellow-400">¡Contáctanos y te asesoramos gratis!</span>
      <a href="/contacto" className="ml-3 px-4 py-2 rounded-full bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-400 transition">Contacto</a>
    </footer>
  );
} 