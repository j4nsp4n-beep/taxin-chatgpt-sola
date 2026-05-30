import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preverite pripravljenost podjetja za AI",
  description:
    "Brezplačen 3-minutni vprašalnik za oceno, ali so vaši podatki, kontekst, orodja in procesi pripravljeni na uvedbo AI.",
  alternates: { canonical: "/preveri" },
  openGraph: {
    title: "Preverite pripravljenost podjetja za AI | AI Sistemi",
    description:
      "Brezplačen kviz v štirih kategorijah: podatki, kontekst, orodja, procesi. Rezultat in priporočilo, kaj urediti najprej.",
    url: "/preveri",
  },
};

export default function PreveriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
