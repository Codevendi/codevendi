"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatConversation {
  id: string;
  userId: string;
  userName: string;
  messages: ChatMessage[];
  createdAt: string;
}

export default function AdminIAPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // @ts-expect-error
    if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/");
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchConversations();
    }
  }, [status]);

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/admin/ia");
      if (!response.ok) throw new Error("Error al cargar conversaciones");
      const data = await response.json();
      setConversations(data);
      setError("");
    } catch (err) {
      setError("Error al cargar las conversaciones. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500">
        <nav className="flex gap-8 p-6 bg-white/80 shadow-lg">
          <a href="/admin" className="hover:text-yellow-600">Panel Admin</a>
          <a href="/admin/ia" className="font-bold text-yellow-600">Chat IA</a>
          <a href="/admin/soporte" className="hover:text-yellow-600">Soporte</a>
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
        <a href="/admin/ia" className="font-bold text-yellow-600">Chat IA</a>
        <a href="/admin/soporte" className="hover:text-yellow-600">Soporte</a>
        <a href="/" className="ml-auto text-gray-600 hover:text-yellow-600">Volver a la tienda</a>
      </nav>
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-600">Historial de Chat IA</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lista de conversaciones */}
            <div className="md:col-span-1 bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold mb-4">Conversaciones</h2>
              <div className="space-y-2">
                {conversations.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay conversaciones aún</p>
                ) : (
                  conversations.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full text-left p-3 rounded ${
                        selectedChat?.id === chat.id
                          ? "bg-yellow-100 border-yellow-400"
                          : "bg-white hover:bg-yellow-50"
                      } border transition-colors`}
                    >
                      <div className="font-medium">{chat.userName}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(chat.createdAt).toLocaleString()}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Detalle de la conversación */}
            <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
              {selectedChat ? (
                <>
                  <div className="border-b pb-2 mb-4">
                    <h2 className="font-bold">
                      Conversación con {selectedChat.userName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedChat.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {selectedChat.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-blue-100 ml-auto max-w-[80%]"
                            : "bg-gray-100 mr-auto max-w-[80%]"
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {msg.role === "user" ? selectedChat.userName : "IA"}
                        </div>
                        <div>{msg.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Selecciona una conversación para ver los detalles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 