import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "codevendi@example.com";
  const adminPassword = "211023";

  // Verificar si el usuario admin ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log("El usuario admin ya existe");
    return;
  }

  // Crear el usuario admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Codevendi Admin",
      password: hashedPassword,
      role: "admin"
    }
  });

  console.log("Usuario admin creado:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 