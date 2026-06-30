import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrenador Personal – Ironman 70.3 Málaga 2026",
  description: "Tu entrenador personal y dietista para el Ironman 70.3 Málaga 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
