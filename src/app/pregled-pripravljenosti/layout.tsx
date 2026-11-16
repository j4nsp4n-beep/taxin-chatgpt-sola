import type { Metadata } from "next";

const description =
  "V 30 minutah preverimo, ali so vaš proces, podatki, kontekst in orodja pripravljeni na uvedbo AI ter določimo smiseln prvi korak.";

export const metadata: Metadata = {
  title: "Pregled pripravljenosti za AI",
  description,
  alternates: { canonical: "/pregled-pripravljenosti" },
  openGraph: {
    title: "Pregled pripravljenosti za AI | AI Sistemi",
    description,
    url: "/pregled-pripravljenosti",
    type: "website",
    images: [
      {
        url: "/brand/aisistemi-wordmark.png",
        width: 1265,
        height: 281,
        alt: "AI Sistemi",
      },
    ],
  },
};

export default function PregledPripravljenostiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
