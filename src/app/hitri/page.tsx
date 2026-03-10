"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── tiny reusable fade-in ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── dot-grid ─── */
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ─── vertical grid lines ─── */
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-px bg-slate-900/[0.04]"
          style={{ left: `${(i + 1) * 12.5}%` }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════ PAGE HITRI ══ */
export default function PageHitri() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-white text-slate-900 antialiased">

      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm"
            : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
            TAXIN AI
          </Link>
          <nav className="hidden gap-8 md:flex">
            {[
              { label: "Zakaj", href: "#zakaj" },
              { label: "Program", href: "#program" },
              { label: "Izhodišča", href: "#izhodi" },
              { label: "Predavatelj", href: "#predavatelj" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition">
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://podio.com/webforms/6967373/536634"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
          >
            Prijavi se
          </a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        <GridLines />
        <DotGrid className="opacity-50" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_60%_80%_at_80%_30%,rgba(34,197,94,0.07),transparent)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-16 md:flex-row md:items-center md:gap-16">
          {/* left */}
          <div className="flex-1">
            <FadeIn>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                TAXIN AI ChatGPT Šola · Hitri osnovni program · 135 min
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight text-slate-900 md:text-6xl">
                Varno z AI.
                <br />
                <span className="text-slate-400">V enem popoldnevu.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
                Intenzivna delavnica za strokovnjake, ki želijo takoj naslednji
                dan delati z AI — metodološko pravilno, pravno varno in brez
                tveganj.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://podio.com/webforms/6967373/536634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
                >
                  Prijavi se na delavnico →
                </a>
                <Link
                  href="/v3"
                  className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  Poglej celoten program ↓
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* right — info card */}
          <FadeIn delay={0.3} className="mt-14 flex-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <DotGrid className="opacity-20" />
              <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate-400">
                Format delavnice
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Trajanje", value: "135 min" },
                  { label: "Format", value: "Workshop" },
                  { label: "Izvedba", value: "Online ali v živo" },
                  { label: "Skupina", value: "Do 20 udeležencev" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-green-600">Certifikat</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Potrdilo o usposabljanju
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Skladno s Členom 4 Akta EU o UI
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* outcomes bar */}
        <div className="relative border-t border-slate-100 py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: "⏱", label: "135 min" },
                { icon: "⊕", label: "Workshop format" },
                { icon: "✓", label: "EU AI Act skladnost" },
                { icon: "◎", label: "Online ali v živo" },
                { icon: "↑", label: "Do 20 udeležencev" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-green-600">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ZAKAJ ══ */}
      <section id="zakaj" className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Zakaj
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              AI ne povzroča napak zato,
              <br />
              ker bi bil netočen.
              <br />
              <span className="text-slate-400">
                Ampak zato, ker človek zamenja
                <br />
                razlago z odločitvijo.
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg italic text-slate-400">
              &ldquo;Strukturiran vhod → preverjen izhod → človeška validacija.&rdquo;
              <span className="ml-2 not-italic text-slate-500">— mag. Franc Derganc</span>
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Brez metodologije */}
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-red-100 bg-red-50 p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs uppercase tracking-[0.14em] text-red-600">
                  Brez metodologije
                </span>
                <ul className="space-y-4">
                  {[
                    "Generični odgovori brez konteksta",
                    "Ni preverjanja virov in dejstev",
                    "Kršitve GDPR in poslovnih skrivnosti",
                    "Strokovna odgovornost brez zaščite",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0 text-red-400">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* S programom */}
            <FadeIn delay={0.18}>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  S programom
                </span>
                <ul className="space-y-4">
                  {[
                    "Strukturirana, nadzorovana analiza",
                    "4-stopenjski kontrolni model",
                    "Pravno in podatkovno varna uporaba",
                    "Dokumentirano dokazilo o usposabljanju",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ TRI NAČINI ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50 px-6 py-28">
        <DotGrid className="opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Zakaj metodologija šteje
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Isti ChatGPT.{" "}
              <span className="text-slate-400">Popolnoma različni rezultati.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              Odvetnica Sabina rešuje davčno zadevo — odmerjenih 1.000.000 EUR
              dodatne dohodnine. Orodje je enako. Pristop odloča.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Brez prijave",
                sub: "Splošni odgovori",
                desc: "AI poda generične informacije. Sabina sama sestavlja argumente. Analiza nepopolna.",
                risk: "Visoko tveganje",
                riskColor: "text-red-600 bg-red-50 border-red-200",
                badge: "⚠",
                badgeColor: "text-red-500",
                border: "border-slate-200",
                bg: "bg-white",
              },
              {
                title: "S prijavo",
                sub: "Kontekstualni nasvet",
                desc: "AI pozna Sabinin stil. Delo hitrejše — a brez procesne discipline.",
                risk: "Srednje tveganje",
                riskColor: "text-amber-600 bg-amber-50 border-amber-200",
                badge: "~",
                badgeColor: "text-amber-500",
                border: "border-slate-200",
                bg: "bg-white",
              },
              {
                title: "Z agentom",
                sub: "Metodološka presoja",
                desc: "Sistem vodi skozi strukturiran postopek: dejstva → pravna podlaga → sodna praksa → sklep. Revizijska sled avtomatska.",
                risk: "Minimalno tveganje",
                riskColor: "text-green-700 bg-green-50 border-green-200",
                badge: "✓",
                badgeColor: "text-green-600",
                border: "border-green-200",
                bg: "bg-green-50",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className={`rounded-2xl border ${card.border} ${card.bg} p-8 h-full flex flex-col shadow-sm`}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`text-xl font-bold ${card.badgeColor}`}>{card.badge}</span>
                    <div>
                      <h3 className="font-bold text-slate-900">{card.title}</h3>
                      <p className="text-xs text-slate-400">{card.sub}</p>
                    </div>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">{card.desc}</p>
                  <div className={`mt-6 rounded-lg border px-3 py-2 text-xs font-semibold ${card.riskColor}`}>
                    {card.badge} {card.risk}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-base italic text-slate-500">
                &ldquo;Model svetuje. Profil pomaga. Agent disciplinira postopek.&rdquo;
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Presoja vedno ostane pri strokovnjaku.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                Na delavnici se naučiš prav tega — in odneseš domov konkretna orodja. ↓
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ PROGRAM — 135 MINUT ══ */}
      <section id="program" className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Program
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Kaj se zgodi v 135 minutah.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              Delavnica je razdeljena v 5 blokov. Vsak ima jasen cilj in konkreten izhod.
              Razmerje:{" "}
              <span className="font-semibold text-slate-700">30 % razlaga · 50 % praktične vaje · 20 % demonstracije.</span>
            </p>
          </FadeIn>

          <div className="mt-14 space-y-4">
            {[
              {
                time: "0–25 min",
                title: "Osnove in metodologija",
                desc: "Kaj AI je in kaj ni. Zakaj halucinacije niso izjema. Jedrni model: problem → pravna podlaga → dejstva → analiza → tveganja → sklep.",
                outcome: "Udeleženci dobijo vzorčni obrazec.",
                n: "01",
              },
              {
                time: "25–45 min",
                title: "Praktična vaja 1 — strukturiran prompt",
                desc: "Vsak izbere realen primer iz lastne prakse. Oblikuje strukturirano poizvedbo. AI pripravi osnutek.",
                outcome: "Cilj: izkusiti razliko med slabim in dobrim vhodom.",
                n: "02",
              },
              {
                time: "45–80 min",
                title: "Pravna varnost in kontrolni model",
                desc: "GDPR, poslovne skrivnosti, odgovornost organizacije. 4-stopenjski kontrolni model: dejstva → metodologija → skladnost → človeška presoja.",
                outcome: "Praktična vaja 2: mini varnostni protokol (1 stran).",
                n: "03",
              },
              {
                time: "80–130 min",
                title: "AI v praksi + delavnica: mini-agent",
                desc: "Pregled use-casev: pravo, finance, HR, javna uprava. Vsak izdela svoj template ali mini-agent: navodila, koraki, kontrolne točke, viri znanja.",
                outcome: "Vsak udeleženec odnese domov funkcionalno orodje.",
                n: "04",
              },
              {
                time: "130–135 min",
                title: "Zaključek",
                desc: "Povzetek ključnih načel. Q&A. Priporočila za Stopnjo I.",
                outcome: "",
                n: "05",
              },
            ].map((block, i) => (
              <FadeIn key={block.n} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300 hover:bg-white hover:shadow-sm md:flex md:gap-8">
                  <div className="shrink-0 md:w-32">
                    <span className="font-mono text-xs text-green-600">{block.time}</span>
                    <span className="absolute right-6 top-6 text-5xl font-black text-slate-100 group-hover:text-slate-200 transition">
                      {block.n}
                    </span>
                  </div>
                  <div className="mt-3 flex-1 md:mt-0">
                    <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{block.desc}</p>
                    {block.outcome && (
                      <p className="mt-2 text-xs font-semibold text-green-700">→ {block.outcome}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KAJ ODNESETE DOMOV ══ */}
      <section id="izhodi" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Izhodi
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Trije konkretni rezultati.
              <br />
              <span className="text-slate-400">Takoj uporabni v praksi.</span>
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Strukturiran prompt",
                desc: "Vaša lastna strukturirana poizvedba za področje dela — oblikovana med delavnico, preizkušena na realnem primeru.",
                delay: 0,
              },
              {
                n: "2",
                title: "Mini varnostni protokol",
                desc: "Enostransko pravilo za varno uporabo AI v vaši organizaciji: kaj smete vnesti, kaj ne, kako preverite izhod.",
                delay: 0.08,
              },
              {
                n: "3",
                title: "Interni template ali mini-agent",
                desc: "Vaš prvi specializirani AI pomočnik za ponavljajočo se nalogo — pravni, davčni, kadrovski ali compliance.",
                delay: 0.16,
              },
            ].map((card) => (
              <FadeIn key={card.n} delay={card.delay}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 h-full shadow-sm">
                  <span className="absolute right-6 top-6 text-6xl font-black text-slate-100">
                    {card.n}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-8 py-6">
              <p className="text-sm leading-relaxed text-slate-700">
                Po zaključku prejmete{" "}
                <span className="font-semibold text-slate-900">potrdilo o usposabljanju</span>{" "}
                — dokumentirano dokazilo o ravni AI pismenosti skladno s{" "}
                <span className="font-semibold text-slate-900">Členom 4 Akta EU o UI</span>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ PRIJAVA ══ */}
      <section id="prijava" className="relative overflow-hidden border-t border-slate-100 bg-slate-900 px-6 py-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,rgba(34,197,94,0.08),transparent)]" />
        <div className="relative mx-auto max-w-7xl md:flex md:items-center md:gap-16">
          <FadeIn className="flex-1">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-400">
              Prijava
            </span>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Rezervirajte
              <br />
              <span className="text-white/35">svoje mesto.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/55">
              Delavnica poteka v zaprtih skupinah do 20 udeležencev.
              Možna in-house izvedba za vaš tim.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-12 flex-1 md:mt-0">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <ul className="space-y-4">
                {[
                  { label: "Cena", value: "Na povpraševanje" },
                  { label: "Format", value: "Online ali v živo" },
                  { label: "Skupina", value: "Do 20 udeležencev" },
                  { label: "Certifikat", value: "Potrdilo o usposabljanju (Člen 4 EU AI)" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-xs uppercase tracking-[0.14em] text-white/35">{item.label}</span>
                    <span className="text-right text-sm font-semibold text-white/80">{item.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a
                  href="https://podio.com/webforms/6967373/536634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-green-600 py-3.5 text-center text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                  Prijavi se →
                </a>
                <a
                  href="mailto:info@taxin.si?subject=Povpraševanje%20Hitri%20program"
                  className="block w-full rounded-full border border-white/20 py-3.5 text-center text-sm font-semibold text-white/60 hover:border-white/40 hover:text-white transition"
                >
                  Govorimo o izvedbi za vaš tim →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ PREDAVATELJ ══ */}
      <section id="predavatelj" className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Predavatelj
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Strokovna osnova,{" "}
              <span className="text-slate-400">ne generični AI tečaj.</span>
            </h2>
          </FadeIn>

          <div className="mt-14 md:flex md:items-start md:gap-16">
            {/* Avatar */}
            <FadeIn className="shrink-0">
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src="/franc-derganc.png"
                  alt="Franc Derganc"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </FadeIn>

            {/* Bio */}
            <FadeIn delay={0.12} className="mt-10 flex-1 md:mt-0">
              <div className="mb-1 flex items-baseline gap-3">
                <h3 className="text-2xl font-extrabold text-slate-900">mag. Franc Derganc</h3>
                <span className="text-sm text-slate-400">Lastnik, TAXIN d.o.o.</span>
              </div>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-green-600">
                Avtor metodologije MPDN-RS:2026
              </p>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Franc Derganc je davčni svetovalec z dolgoletnimi izkušnjami v
                strokovnem davčnem svetovanju in avtor standarda{" "}
                <span className="font-semibold text-slate-900">MPDN-RS:2026</span> —
                metodologije za strokovno davčno analizo z integriranim AI
                nadzorom in dokazljivo sledljivostjo.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Delavnica Hitri program temelji neposredno na tej metodologiji.
                Gre za prenos praktičnega znanja iz realnega davčnega dela —
                ne za prilagojeni splošni AI tečaj.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Področje", value: "Davčno pravo & svetovanje" },
                  { label: "Standard", value: "MPDN-RS:2026" },
                  { label: "Institucija", value: "TAXIN d.o.o." },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ NASLEDNJI KORAK ══ */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 bg-white px-10 py-10 shadow-sm md:flex md:items-center md:gap-12">
              <div className="flex-1">
                <span className="mb-2 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
                  Nadaljevanje
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Hitri program je začetek.
                  <br />
                  <span className="text-slate-400">Stopnja I je sistem.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Na delavnici pridobite temeljna orodja in metodologijo.
                  Stopnja I gre globlje: 15 ur, 6 modulov, razvoj lastnih AI
                  agentov za vaše področje in certifikat o strokovni
                  usposobljenosti.
                </p>
              </div>
              <div className="mt-8 shrink-0 md:mt-0">
                <Link
                  href="/v3"
                  className="inline-block rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500 hover:text-slate-900 transition"
                >
                  Poglej program Stopnje I →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">FAQ</span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Pogosta vprašanja.</h2>
          </FadeIn>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Kaj točno se zgodi v 135 minutah?",
                a: "Delavnica je razdeljena v 5 blokov: osnove in metodologija (25 min) → praktična vaja 1: strukturiran prompt (20 min) → pravna varnost in 4-stopenjski kontrolni model (35 min) → AI v praksi in delavnica mini-agenta (50 min) → zaključek in Q&A (5 min). Vsak udeleženec med delavnico že izdela svoja konkretna orodja.",
              },
              {
                q: "Kaj odnesem domov?",
                a: "Strukturiran prompt za lastno področje, mini varnostni protokol (1 stran) in 1 interni template ali mini-agent. Vsa orodja so takoj uporabna v praksi.",
              },
              {
                q: "Ali je delavnica primerna za celoten tim?",
                a: "Da. Format je prilagojen skupinam do 20 udeležencev. Možna je in-house izvedba za vaš tim — kontaktirajte nas za ponudbo.",
              },
              {
                q: "Ali po delavnici dobim certifikat?",
                a: "Po zaključku prejmete potrdilo o usposabljanju — dokumentirano dokazilo o ravni AI pismenosti skladno s Členom 4 Akta EU o UI. Certifikat o strokovni usposobljenosti je del programa Stopnja I.",
              },
              {
                q: "Ali programa ustrezata zahtevam Akta EU o UI?",
                a: "Da. Člen 4 Akta EU o UI od organizacij zahteva dokumentirano zagotavljanje ustrezne ravni AI pismenosti zaposlenih (velja od 2. 2. 2025). Delavnica je zasnovana skladno s temi zahtevami, potrdilo o udeležbi pa služi kot dokazilo pri notranjem dokumentiranju.",
              },
              {
                q: "Ali je predhodno tehnično znanje potrebno?",
                a: "Ne. Delavnica ne zahteva tehničnega predznanja. Fokus je na metodologiji, pravilni uporabi in strokovni presoji — ne na programiranju.",
              },
              {
                q: "Kakšna je razlika med Hitrim programom in Stopnjo I?",
                a: "Hitri program je intenzivna delavnica (135 min) — hiter, praktičen uvod z orodji ki jih odnesete domov. Stopnja I je celovit program (15 ur, 6 modulov) z globljim znanjem, razvojem lastnih AI agentov in certifikatom o strokovni usposobljenosti. Hitri program je naravna vstopna točka pred Stopnjo I.",
              },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-7 font-semibold text-slate-800 hover:text-slate-900 transition">
                    {faq.q}
                    <span className="shrink-0 text-slate-300 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="border-t border-slate-100 px-7 pb-7 pt-4 text-sm leading-relaxed text-slate-500">
                    {faq.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/8 bg-slate-900 px-6 py-8 text-center text-sm text-white/20">
        © {new Date().getFullYear()} TAXIN d.o.o. — AI ChatGPT Šola
      </footer>
    </div>
  );
}
