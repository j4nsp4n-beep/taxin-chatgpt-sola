import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervacija pogovora",
  description:
    "Rezervirajte 30-minutni brezplačen pregled procesa. Pogledamo, kje je največja zanka, in skupaj ocenimo, ali ima AI v vašem podjetju danes smisel.",
  alternates: { canonical: "/rezervacija" },
  openGraph: {
    title: "Rezervacija pogovora | AI Sistemi",
    description:
      "30 minut, brezplačen klic. Prinesite en konkreten proces, dobite jasno oceno naslednjega koraka.",
    url: "/rezervacija",
  },
};

export default function RezervacijaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
