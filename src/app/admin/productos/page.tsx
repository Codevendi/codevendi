"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  caracteristicas: string[];
  versiones: { nombre: string; precio: string; descripcion: string }[];
}

const categorias = [
  "Productividad",
  "Negocios",
  "CRM",
  "Diseño",
  "Seguridad",
  "Comunicación",
  "Educación",
];

export default function AdminProductosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Producto>>({
    nombre: "",
    descripcion: "",
    imagen: "",
    categoria: "Productividad",
    caracteristicas: [""],
    versiones: [{ nombre: "Básica", precio: "", descripcion: "" }],
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/");
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchProductos();
    }
  }, [session, status, router]);

  const fetchProductos = async () => {
    try {
      const res = await fetch("/api/productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      alert("Error al cargar productos");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaracteristica = (i: number, value: string) => {
    const nuevas = [...(form.caracteristicas || [])];
    nuevas[i] = value;
    setForm({ ...form, caracteristicas: nuevas });
  };

  const addCaracteristica = () => {
    setForm({ ...form, caracteristicas: [...(form.caracteristicas || []), ""] });
  };

  const removeCaracteristica = (i: number) => {
    const nuevas = [...(form.caracteristicas || [])];
    nuevas.splice(i, 1);
    setForm({ ...form, caracteristicas: nuevas });
  };

  const handleVersion = (i: number, key: string, value: string) => {
    const nuevas = [...(form.versiones || [])];
    nuevas[i] = { ...nuevas[i], [key]: value };
    setForm({ ...form, versiones: nuevas });
  };

  const addVersion = () => {
    setForm({ ...form, versiones: [...(form.versiones || []), { nombre: "", precio: "", descripcion: "" }] });
  };

  const removeVersion = (i: number) => {
    const nuevas = [...(form.versiones || [])];
    nuevas.splice(i, 1);
    setForm({ ...form, versiones: nuevas });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.nombre,
      description: form.descripcion,
      price: form.versiones?.[0]?.precio || "0",
      image: form.imagen,
      category: form.categoria,
      features: form.caracteristicas,
      versions: form.versiones,
    };
    try {
      if (editId) {
        await fetch("/api/productos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        await fetch("/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowForm(false);
      setForm({
        nombre: "",
        descripcion: "",
        imagen: "",
        categoria: "Productividad",
        caracteristicas: [""],
        versiones: [{ nombre: "Básica", precio: "", descripcion: "" }],
      });
      setEditId(null);
      fetchProductos();
    } catch (err) {
      alert("Error al guardar producto");
    }
  };

  const handleEdit = (producto: Producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      categoria: producto.categoria,
      caracteristicas: producto.caracteristicas || [""],
      versiones: producto.versiones || [{ nombre: "Básica", precio: "", descripcion: "" }],
    });
    setEditId(producto.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await fetch("/api/productos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        fetchProductos();
      } catch (err) {
        alert("Error al eliminar producto");
      }
    }
  };

  if (status === "loading") return <div className="p-8 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500">
      <nav className="flex gap-8 p-6 bg-white/80 shadow-lg">
        <a href="/admin" className="hover:text-yellow-600">Panel Admin</a>
        <a href="/admin/productos" className="font-bold text-yellow-600">Productos</a>
        <a href="/admin/ia" className="hover:text-yellow-600">Chat IA</a>
        <a href="/admin/soporte" className="hover:text-yellow-600">Soporte</a>
        <a href="/" className="ml-auto text-gray-600 hover:text-yellow-600">Volver a la tienda</a>
      </nav>
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-600">Gestión de Productos</h1>
          <button onClick={() => { setShowForm(true); setForm({ nombre: "", descripcion: "", imagen: "", categoria: "Productividad", caracteristicas: [""], versiones: [{ nombre: "Básica", precio: "", descripcion: "" }] }); setEditId(null); }} className="mb-6 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full shadow transition">Crear nuevo producto</button>
          {productos.length === 0 ? (
            <div className="text-gray-500 text-center mb-8">No hay productos aún.</div>
          ) : (
            <table className="w-full mb-8">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Categoría</th>
                  <th className="p-2">Imagen</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id} className="border-b">
                    <td className="p-2 font-bold">{producto.nombre}</td>
                    <td className="p-2">{producto.categoria}</td>
                    <td className="p-2">{producto.imagen ? <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover rounded" /> : ""}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(producto)} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">Editar</button>
                      <button onClick={() => handleDelete(producto.id)} className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{editId ? "Editar producto" : "Crear producto"}</h2>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Nombre</label>
                <input name="nombre" value={form.nombre || ""} onChange={handleInput} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Descripción</label>
                <textarea name="descripcion" value={form.descripcion || ""} onChange={handleInput} className="w-full p-2 border rounded" required rows={3} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Imagen (URL)</label>
                <input name="imagen" value={form.imagen || ""} onChange={handleInput} className="w-full p-2 border rounded" placeholder="https://... o /softwares/1.png" required />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Categoría</label>
                <select name="categoria" value={form.categoria || ""} onChange={handleInput} className="w-full p-2 border rounded">
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Características</label>
                {(form.caracteristicas || []).map((car, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={car} onChange={e => handleCaracteristica(i, e.target.value)} className="w-full p-2 border rounded" required />
                    <button type="button" onClick={() => removeCaracteristica(i)} className="bg-red-500 hover:bg-red-400 text-white px-2 rounded">-</button>
                  </div>
                ))}
                <button type="button" onClick={addCaracteristica} className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded">Añadir característica</button>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Versiones</label>
                {(form.versiones || []).map((ver, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={ver.nombre} onChange={e => handleVersion(i, "nombre", e.target.value)} className="p-2 border rounded" placeholder="Nombre" required />
                    <input value={ver.precio} onChange={e => handleVersion(i, "precio", e.target.value)} className="p-2 border rounded" placeholder="Precio" required />
                    <input value={ver.descripcion} onChange={e => handleVersion(i, "descripcion", e.target.value)} className="p-2 border rounded" placeholder="Descripción" required />
                    <button type="button" onClick={() => removeVersion(i)} className="bg-red-500 hover:bg-red-400 text-white px-2 rounded">-</button>
                  </div>
                ))}
                <button type="button" onClick={addVersion} className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded">Añadir versión</button>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full shadow transition">{editId ? "Guardar cambios" : "Crear producto"}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-6 rounded-full shadow transition">Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 