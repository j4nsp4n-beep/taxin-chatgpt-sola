import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxin AI ChatGPT Šola | Ko AI postane orodje strokovnjaka",
  description:
    "15-urni online program za davčne svetovalce in računovodje. Naučite se upravljati AI – ne le uporabljati ga. Vodja: mag. Franc Derganc.",
  openGraph: {
    title: "Taxin AI ChatGPT Šola",
    description:
      "15-urni online program za davčne svetovalce in računovodje. Naučite se upravljati AI – ne le uporabljati ga.",
    url: "https://taxin.si",
    siteName: "Taxin",
    locale: "sl_SI",
    type: "website",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Taxin AI ChatGPT Šola",
  description:
    "15-urni online program za davčne svetovalce in računovodje. Naučite se upravljati AI – ne le uporabljati ga. Vodja: mag. Franc Derganc.",
  provider: {
    "@type": "Organization",
    name: "Taxin",
    url: "https://taxin.si",
  },
  instructor: {
    "@type": "Person",
    name: "mag. Franc Derganc",
  },
  courseMode: "online",
  educationalLevel: "Professional",
  inLanguage: "sl",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "EUR",
    url: "mailto:info@taxin.si",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taxin",
  url: "https://taxin.si",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@taxin.si",
    contactType: "customer service",
    availableLanguage: "Slovenian",
  },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {children}
    </>
  );
}
