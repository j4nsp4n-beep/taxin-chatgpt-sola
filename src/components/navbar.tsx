"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#zakaj", label: "Zakaj" },
  { href: "#program", label: "Program" },
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
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5722]" />
          TAXIN AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="rounded-full bg-[#ff5722] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ff4500]">
          Prijavi se
        </button>
      </div>
    </header>
  );
}
