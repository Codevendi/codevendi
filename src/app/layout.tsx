import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CodeVendi - Software y Recursos Digitales",
  description: "Plataforma de venta de software y recursos digitales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-500 min-h-screen flex flex-col text-gray-900">
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
