import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Sistemi | AI sistem, ki pozna vaše podjetje",
  description:
    "Najprej podjetje integriramo v AI, šele potem AI v podjetje. Procese, podatke, kontekst in orodja povežemo v AI sistem, ki natančno pozna vaše podjetje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
