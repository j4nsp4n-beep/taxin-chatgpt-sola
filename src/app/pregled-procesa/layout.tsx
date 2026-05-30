import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brezplačen pregled procesa",
  description:
    "30-minutni klic, na katerem pogledamo en konkreten proces in skupaj ocenimo, ali je AI smiseln naslednji korak ali je treba najprej urediti proces.",
  alternates: { canonical: "/pregled-procesa" },
  openGraph: {
    title: "Brezplačen pregled procesa | AI Sistemi",
    description:
      "Prinesite en konkreten proces. Skupaj pogledamo, ali ima avtomatizacija danes smisel.",
    url: "/pregled-procesa",
  },
};

export default function PregledProcesaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
