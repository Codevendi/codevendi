"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TicketMessage {
  content: string;
  sender: "user" | "admin";
  timestamp: string;
}

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: "open" | "in_progress" | "closed";
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminSoportePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/");
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTickets();
    }
  }, [status]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/admin/tickets");
      if (!response.ok) throw new Error("Error al cargar tickets");
      const data = await response.json();
      setTickets(data);
      setError("");
    } catch (err) {
      setError("Error al cargar los tickets. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: Ticket["status"]) => {
    try {
      const response = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, status: newStatus })
      });

      if (!response.ok) throw new Error("Error al actualizar estado");
      
      const updatedTicket = await response.json();
      setTickets(tickets.map(t => 
        t.id === ticketId ? updatedTicket : t
      ));
      
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado del ticket");
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: replyText.trim()
        })
      });

      if (!response.ok) throw new Error("Error al enviar respuesta");
      
      const updatedTicket = await response.json();
      setTickets(tickets.map(t => 
        t.id === selectedTicket.id ? updatedTicket : t
      ));
      setSelectedTicket(updatedTicket);
      setReplyText("");
    } catch (err) {
      console.error(err);
      alert("Error al enviar la respuesta");
    } finally {
      setSending(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500">
        <nav className="flex gap-8 p-6 bg-white/80 shadow-lg">
          <a href="/admin" className="hover:text-yellow-600">Panel Admin</a>
          <a href="/admin/ia" className="hover:text-yellow-600">Chat IA</a>
          <a href="/admin/soporte" className="font-bold text-yellow-600">Soporte</a>
          <a href="/" className="ml-auto text-gray-600 hover:text-yellow-600">Volver a la tienda</a>
        </nav>
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500">
      <nav className="flex gap-8 p-6 bg-white/80 shadow-lg">
        <a href="/admin" className="hover:text-yellow-600">Panel Admin</a>
        <a href="/admin/ia" className="hover:text-yellow-600">Chat IA</a>
        <a href="/admin/soporte" className="font-bold text-yellow-600">Soporte</a>
        <a href="/" className="ml-auto text-gray-600 hover:text-yellow-600">Volver a la tienda</a>
      </nav>
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-600">Tickets de Soporte</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lista de tickets */}
            <div className="md:col-span-1 bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold mb-4">Tickets</h2>
              <div className="space-y-2">
                {tickets.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay tickets aún</p>
                ) : (
                  tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`w-full text-left p-3 rounded ${
                        selectedTicket?.id === ticket.id
                          ? "bg-yellow-100 border-yellow-400"
                          : "bg-white hover:bg-yellow-50"
                      } border transition-colors`}
                    >
                      <div className="font-medium truncate">{ticket.subject}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">{ticket.userName}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          ticket.status === "open" ? "bg-red-100 text-red-800" :
                          ticket.status === "in_progress" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {ticket.status === "open" ? "Abierto" :
                           ticket.status === "in_progress" ? "En proceso" :
                           "Cerrado"}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Detalle del ticket */}
            <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
              {selectedTicket ? (
                <>
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-bold text-xl">{selectedTicket.subject}</h2>
                        <p className="text-sm text-gray-500">
                          {selectedTicket.userName} - {new Date(selectedTicket.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <select
                        value={selectedTicket.status}
                        onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as Ticket["status"])}
                        className="bg-white border rounded px-3 py-1"
                      >
                        <option value="open">Abierto</option>
                        <option value="in_progress">En proceso</option>
                        <option value="closed">Cerrado</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                    {selectedTicket.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-blue-100 ml-auto max-w-[80%]"
                            : "bg-gray-100 mr-auto max-w-[80%]"
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {msg.sender === "user" ? selectedTicket.userName : "Soporte"}
                        </div>
                        <div>{msg.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleReply} className="mt-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim() || sending}
                      className={`mt-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded flex items-center justify-center min-w-[120px] ${
                        sending ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        "Enviar respuesta"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Selecciona un ticket para ver los detalles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 