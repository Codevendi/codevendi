import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Listar todos los productos
export async function GET() {
  try {
    const productos = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

// POST: Crear un producto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, image, category, features, versions } = body;
    if (!name || !price || !image || !category) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }
    const producto = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        features,
        versions,
      },
    });
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}

// PUT: Editar un producto
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, price, image, category, features, versions } = body;
    if (!id || !name || !price || !image || !category) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }
    const producto = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        features,
        versions,
      },
    });
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ error: "Error al editar producto" }, { status: 500 });
  }
}

// DELETE: Eliminar un producto
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
} 