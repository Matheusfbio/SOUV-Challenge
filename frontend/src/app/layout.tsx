"use client";

import QueryProvider from "@/components/query/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css"; // Importa estilos globais

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <QueryProvider>
          <Toaster /> {/* Adiciona o componente Toaster aqui */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
