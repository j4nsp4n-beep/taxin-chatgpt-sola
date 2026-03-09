import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Portfolio Landing",
  description:
    "Premium tech-focused landing and portfolio showcase built with Next.js, Tailwind, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
