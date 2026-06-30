import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TriCoach – Ironman 70.3 Málaga 2026",
  description: "Tu entrenador personal y dietista para el Ironman 70.3 Málaga 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.variable} min-h-full antialiased`}>{children}</body>
    </html>
  );
}
