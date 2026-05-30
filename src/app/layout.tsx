import type { Metadata } from "next";
import "./globals.css";

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Sistemi",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/aisistemi-wordmark.png`,
  description:
    "AI sistemi za podjetja: integracija procesov, podatkov, konteksta in orodij v eno operativno plast.",
  areaServed: "SI",
  inLanguage: "sl-SI",
  founder: { "@type": "Person", name: "Jan Špan" },
  sameAs: ["https://www.linkedin.com/in/jan-span/"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Sistemi",
  url: SITE_URL,
  inLanguage: "sl-SI",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
