"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#pristop", label: "Pristop" },
  { href: "#pregled", label: "Pregled" },
  { href: "#za-koga", label: "Za koga" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-black/10 bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          <img src="/logo-symbol.svg" alt="" className="h-6 w-6" />
          AI Sistemi
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#555] transition hover:text-[#111]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/rezervacija"
          className="rounded-full bg-[#ff5722] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
        >
          Brezplačen Pregled Procesa
        </Link>
      </div>
    </header>
  );
}
