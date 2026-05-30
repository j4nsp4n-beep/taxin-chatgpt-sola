import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arhiv v7",
  description: "Arhivska različica spletne strani.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V7Layout({ children }: { children: React.ReactNode }) {
  return children;
}
