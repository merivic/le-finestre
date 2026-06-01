import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le Finestre — Citta della Pieve",
  description: "A charming apartment in the heart of Citta della Pieve, Umbria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
