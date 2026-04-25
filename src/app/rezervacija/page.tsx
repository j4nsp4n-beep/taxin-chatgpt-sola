"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm"
          : ""
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="AI Sistemi">
          <img src="/brand/aisistemi-wordmark.png" alt="AI Sistemi" className="h-12 w-auto" />
        </Link>
        <Link
          href="/pregled-procesa"
          className="text-sm text-slate-500 hover:text-slate-900 transition"
        >
          ← Nazaj
        </Link>
      </div>
    </header>
  );
}

export default function RezervacijaPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-16">
        {/* ══ HERO ══ */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 px-6 py-20 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,23,42,0.12) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.2em] text-[#ff5722]">
              Brezplačen pregled
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Izberite termin za<br />
              <span className="text-slate-400">Pregled procesa</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500">
              En pogovor, 30 minut. Skupaj pogledamo en konkreten proces in
              ugotovimo, ali je AI sploh smiseln naslednji korak.
            </p>
          </div>
        </section>

        {/* ══ CALENDLY EMBED ══ */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <div
              className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
              data-url="https://calendly.com/aisistemi-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ff5722"
              style={{ minWidth: "320px", height: "700px" }}
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
          </div>
        </section>

        {/* ══ FOOTER NOTE ══ */}
        <section className="border-t border-slate-100 px-6 py-10 text-center">
          <p className="text-sm text-slate-400">
            Vprašanja?{" "}
            <a
              href="mailto:jan@aisistemi.si"
              className="text-slate-600 hover:text-slate-900 underline underline-offset-2 transition"
            >
              jan@aisistemi.si
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
