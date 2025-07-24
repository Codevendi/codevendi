import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

// Obtener todos los tickets
export async function GET() {
  const session = await getServerSession();
  
  // @ts-expect-error
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: [
        { status: "asc" },
        { updatedAt: "desc" }
      ],
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    return NextResponse.json(
      { error: "Error al obtener tickets" },
      { status: 500 }
    );
  }
}

// Actualizar estado del ticket
export async function PATCH(req: NextRequest) {
  const session = await getServerSession();
  
  // @ts-expect-error
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { ticketId, status } = await req.json();
    
    if (!ticketId || !status) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status }
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("Error al actualizar ticket:", error);
    return NextResponse.json(
      { error: "Error al actualizar ticket" },
      { status: 500 }
    );
  }
}

// Añadir respuesta al ticket
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  
  // @ts-expect-error
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { ticketId, message } = await req.json();
    
    if (!ticketId || !message) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket no encontrado" },
        { status: 404 }
      );
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        messages: {
          push: {
            content: message,
            sender: "admin",
            timestamp: new Date().toISOString()
          }
        },
        status: "in_progress"
      }
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("Error al responder ticket:", error);
    return NextResponse.json(
      { error: "Error al responder ticket" },
      { status: 500 }
    );
  }
} 