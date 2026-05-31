import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const SITE_URL = "https://aisistemi.si";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Sistemi | AI sistem, ki pozna vaše podjetje",
    template: "%s | AI Sistemi",
  },
  description:
    "Najprej podjetje integriramo v AI, šele potem AI v podjetje. Procese, podatke, kontekst in orodja povežemo v AI sistem, ki natančno pozna vaše podjetje.",
  applicationName: "AI Sistemi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AI Sistemi",
    title: "AI Sistemi | AI sistem, ki pozna vaše podjetje",
    description:
      "Najprej podjetje integriramo v AI, šele potem AI v podjetje. Procese, podatke, kontekst in orodja povežemo v AI sistem, ki natančno pozna vaše podjetje.",
    locale: "sl_SI",
    url: SITE_URL,
    images: [
      {
        url: "/brand/aisistemi-wordmark.png",
        width: 1200,
        height: 630,
        alt: "AI Sistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Sistemi | AI sistem, ki pozna vaše podjetje",
    description:
      "Procese, podatke, kontekst in orodja povežemo v AI sistem, ki natančno pozna vaše podjetje.",
    images: ["/brand/aisistemi-wordmark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const PERSON_ID = `${SITE_URL}/#jan-span`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Jan Špan",
  jobTitle: "Ustanovitelj AI Sistemi",
  worksFor: { "@id": ORG_ID },
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/jan-span/"],
  knowsAbout: [
    "Kontekstna plast AI",
    "Uvedba AI v podjetje",
    "Lokalni AI modeli",
    "EU AI Act člen 4",
    "RAG za podjetja",
    "Standardizacija poslovnih procesov z AI",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "AI Sistemi",
  alternateName: "AI Sistemi (JS Solutions)",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/brand/aisistemi-wordmark.png`,
    width: 1200,
    height: 630,
  },
  image: `${SITE_URL}/brand/aisistemi-wordmark.png`,
  description:
    "AI sistemi za podjetja: integracija procesov, podatkov, konteksta in orodij v eno operativno plast. Najprej podjetje integriramo v AI, šele potem AI v podjetje.",
  telephone: "+386 40 686 940",
  email: "jan@aisistemi.si",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SI",
    addressRegion: "Slovenija",
  },
  areaServed: [
    { "@type": "Country", name: "Slovenija" },
    { "@type": "City", name: "Ljubljana" },
    { "@type": "City", name: "Maribor" },
    { "@type": "City", name: "Celje" },
    { "@type": "City", name: "Kranj" },
    { "@type": "City", name: "Koper" },
  ],
  serviceType: "AI integracija in poslovna standardizacija procesov",
  inLanguage: "sl-SI",
  knowsAbout: [
    "Kontekstna plast AI",
    "Uvedba umetne inteligence v podjetje",
    "Lokalni AI modeli za regulirana podjetja",
    "EU AI Act člen 4 in AI pismenost",
    "RAG sistemi za podjetja",
    "Standardizacija poslovnih procesov",
    "AI za slovenska podjetja",
    "Pregled pripravljenosti za AI",
    "AI agentske platforme",
    "Procesna avtomatizacija z AI",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Storitve AI Sistemi",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pregled pripravljenosti za AI",
          description:
            "30-minutni pregled, ki pokaže katera od štirih plasti (procesi, podatki, kontekst, orodja) trenutno manjka v podjetju.",
          url: `${SITE_URL}/pregled-pripravljenosti`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI sistem za podjetje",
          description:
            "Postavitev kontekstne plasti, ki poveže procese, podatke in orodja v eno operativno plast za celotno podjetje.",
          url: `${SITE_URL}/ai-sistem-za-podjetje`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI sistem za direktorja",
          description:
            "CEO Command Center: AI plast za direktorja, ki vidi vse pomembno o podjetju na enem mestu.",
          url: `${SITE_URL}/ai-sistem-za-direktorja`,
        },
      },
    ],
  },
  founder: { "@id": PERSON_ID },
  sameAs: ["https://www.linkedin.com/in/jan-span/"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "AI Sistemi",
  url: SITE_URL,
  inLanguage: "sl-SI",
  publisher: { "@id": ORG_ID },
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
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
