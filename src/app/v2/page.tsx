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

/* ─── dot-grid background pattern ─── */
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
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
          className="absolute top-0 h-full w-px bg-white/[0.04]"
          style={{ left: `${(i + 1) * 12.5}%` }}
        />
      ))}
    </div>
  );
}

/* ─── flow diagram: Vir → Dejstva → Subsumpcija → Sklep ─── */
function FlowDiagram() {
  const steps = ["Vir", "Dejstva", "Subsumpcija", "Sklep"];
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                i === steps.length - 1
                  ? "border-[#00ff88]/60 bg-[#00ff88]/10 text-[#00ff88]"
                  : "border-white/15 bg-white/[0.05] text-white/80"
              }`}
            >
              {step}
            </div>
            <div className="h-1 w-1 rounded-full bg-white/20" />
          </div>
          {i < steps.length - 1 && (
            <div className="mx-2 h-px w-6 bg-white/20" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── risk meter visual ─── */
function RiskMeter({ label, before, after }: { label: string; before: number; after: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-white/40">
        <span>{label}</span>
        <span className="text-[#00ff88]">−{before - after}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-2">
          <motion.div
            className="h-full rounded-full bg-red-500/60"
            initial={{ width: 0 }}
            whileInView={{ width: `${before}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
        <span className="w-8 text-right text-xs text-white/30">{before}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-2">
          <motion.div
            className="h-full rounded-full bg-[#00ff88]"
            initial={{ width: 0 }}
            whileInView={{ width: `${after}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          />
        </div>
        <span className="w-8 text-right text-xs text-[#00ff88]">{after}%</span>
      </div>
    </div>
  );
}

/* ─── terminal block ─── */
function Terminal() {
  const lines = [
    { t: 0, text: "$ ai_query --mode nasvet --topic 'ZDDV-1 člen 46'", dim: false },
    { t: 0.3, text: "  ✓ Vir preverjen: PISRS API (2026-03-01)", dim: true },
    { t: 0.6, text: "  ✓ Dejstva ekstrahirana: 3 relevantne določbe", dim: true },
    { t: 0.9, text: "  ✓ Subsumpcija: člen 46/2 ustreza primeru", dim: true },
    { t: 1.2, text: "  ✓ Sklep generiran — čaka na pregled svetovalca", dim: false },
    { t: 1.5, text: "  → HITL: Prosimo potrdite sklep pred pošiljanjem.", dim: false },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-4 text-xs text-white/25">AI Workflow — Stopnja II</span>
      </div>
      <div className="space-y-1 p-5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: line.t, duration: 0.4 }}
            className={line.dim ? "text-white/35" : "text-white/80"}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ PAGE ══ */
export default function PageV2() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-black text-white antialiased">

      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-white/10 bg-black/80 backdrop-blur-xl" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00ff88]" />
            TAXIN AI
          </Link>
          <nav className="hidden gap-8 md:flex">
            {["Zakaj", "Program", "Režimi", "FAQ"].map((l) => (
              <Link key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition">
                {l}
              </Link>
            ))}
          </nav>
          <button className="rounded-full bg-[#00ff88] px-5 py-2 text-sm font-semibold text-black hover:bg-[#00e67a] transition">
            Prijavi se
          </button>
        </div>
      </header>

      {/* ══ HERO A — left-aligned, Neon-style ══ */}
      <section className="relative min-h-screen overflow-hidden">
        <GridLines />
        <DotGrid className="opacity-40" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_60%_80%_at_80%_30%,rgba(255,87,34,0.09),transparent)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-16 md:flex-row md:items-center md:gap-16">
          {/* left */}
          <div className="flex-1">
            <FadeIn>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
                TAXIN AI ChatGPT Šola — Stopnja I
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight md:text-6xl">
                Varna in sistemska{" "}
                <span className="text-white/35">uporaba AI</span>
                <br />v davčnem svetovanju.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                Ne učimo &ldquo;promptanja&rdquo;. Učimo metodologijo, s katero
                ohranite strokovno presojo, dokumentirate postopek in zmanjšate
                tveganje napačnih zaključkov.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 transition">
                  Prijavi se na program
                </button>
                <button className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition">
                  Prenesi program Stopnja I ↓
                </button>
              </div>
            </FadeIn>
          </div>

          {/* right — flow diagram card */}
          <FadeIn delay={0.3} className="mt-14 flex-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <DotGrid className="opacity-30" />
              <p className="mb-6 text-xs uppercase tracking-[0.16em] text-white/30">
                Metodologija dela
              </p>
              <FlowDiagram />
              <div className="mt-8 space-y-5">
                <RiskMeter label="Tveganje napačnega zaključka" before={72} after={18} />
                <RiskMeter label="Nedokumentiran postopek" before={85} after={12} />
                <RiskMeter label="Nepreverjen vir" before={64} after={8} />
              </div>
              <p className="mt-6 text-xs text-white/20">
                Primerjava brez metodologije vs. s programom Stopnja I
              </p>
            </div>
          </FadeIn>
        </div>

        {/* outcomes bar */}
        <div className="relative border-t border-white/8 py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: "↓", label: "Manj halucinacij" },
                { icon: "⊕", label: "Sledljivi viri" },
                { icon: "✓", label: "EU AI Act skladnost" },
                { icon: "→", label: "Hitrejše analize" },
                { icon: "◎", label: "Human in the Loop" },
                { icon: "↑", label: "Večji obseg storitev" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-xs text-white/30">
                  <span className="font-mono text-[#00ff88]/60">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HERO B — alternative message ══ */}
      <section className="relative overflow-hidden border-t border-white/8 bg-[#f5f4f0] px-6 py-28 text-black">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-5xl font-extrabold leading-[1.07] tracking-tight text-black md:text-6xl">
              Od verjetnostnih odgovorov{" "}
              <span className="text-black/35">do strokovno</span>
              <br />
              zanesljivega postopka.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
              S programom TAXIN AI ChatGPT Šola vzpostavite jasen okvir dela:
              <br />
              <span className="font-semibold text-black">
                vir → dejstva → subsumpcija → sklep
              </span>
              .
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-black/85 transition">
                Rezerviraj mesto
              </button>
              <button className="rounded-full border border-black/20 px-7 py-3 text-sm font-semibold text-black/60 hover:border-black/40 hover:text-black transition">
                Želim več informacij
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ OUTCOMES ══ */}
      <section className="border-t border-white/8 bg-[#070707] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              Rezultati
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
              Boljše svetovanje.{" "}
              <span className="text-white/30">Manjše tveganje. Večji obseg.</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {/* Sklop A */}
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]/80">
                  Strokovnost
                </span>
                <h3 className="mb-6 text-lg font-bold">Nadgradite kakovost svetovanja.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Ekspertna analiza", d: "AI kot orodje za hitrejšo in poglobljeno obdelavo — svetovalec ostane arhitekt zaključka." },
                    { t: "Metodološki pristop", d: "Postopek Vir → Dejstva → Subsumpcija → Sklep zamenja improvizacijo z dokazljivo metodo." },
                    { t: "Epistemološka presoja", d: "Razvijete zmožnost razlikovanja med verjetnim in preverjenim — ključna kompetenca v dobi AI." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-white/6 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-white/80">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Sklop B */}
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]/80">
                  Varnost & skladnost
                </span>
                <h3 className="mb-6 text-lg font-bold">Zmanjšajte tveganje. Ostanite skladni.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Manj halucinacij", d: "Naučite se prepoznati in preprečiti napačne zaključke modela preden pridejo do stranke." },
                    { t: "EU AI Act", d: "Uporaba AI v skladu z evropsko regulativo — zaupanja vreden postopek, ki ga zagovarjate." },
                    { t: "Sledljivost & HITL", d: "Vsak zaključek ima dokazno sled. Vsak sklep pregleda strokovnjak. Odgovornost ostane pri vas." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-white/6 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-white/80">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Sklop C */}
            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-[#00ff88]/15 bg-[#00ff88]/[0.03] p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/30 bg-[#00ff88]/8 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]">
                  Poslovni rezultati
                </span>
                <h3 className="mb-6 text-lg font-bold">Povečajte obseg in prihodek.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Hitrost analiz", d: "AI prevzame zbiranje virov — svetovalec se osredotoči na presojo in sklep." },
                    { t: "Večji obseg dela", d: "Iste ekipe obdelajo več primerov brez izgube kakovosti. AI razširi kapaciteto." },
                    { t: "Rast prakse", d: "Večji obseg + višja kakovost + nižje tveganje napak = osnova za rast prihodka." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-[#00ff88]/10 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-white/80">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ ZAKAJ ══ */}
      <section id="zakaj" className="relative overflow-hidden border-t border-white/8 px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-7xl md:flex md:items-start md:gap-20">
          <FadeIn className="md:w-80 shrink-0">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              Zakaj
            </span>
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Prepričljiv odgovor ≠ pravilen zaključek.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10 flex-1 space-y-6 md:mt-0">
            <p className="text-xl leading-relaxed text-white/60">
              Generativni modeli pogosto zvenijo prepričljivo — vendar v davčni
              stroki to pomeni konkretno tveganje:{" "}
              <span className="font-semibold text-white">
                napačna razlaga, slabša obramba stališča in višja odgovornost
                podpisnika.
              </span>
            </p>
            <p className="text-lg leading-relaxed text-white/40">
              TAXIN AI ChatGPT Šola je zasnovana za strokovnjake, ki želijo AI
              uporabljati kot orodje podpore — ne kot nadomestek presoje.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { num: "72 %", label: "tveganje brez metodologije" },
                { num: "3×", label: "manj nepreverjenihvirov" },
                { num: "100 %", label: "sledljiv postopek" },
              ].map((stat) => (
                <div key={stat.num} className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-3xl font-black text-[#00ff88]">{stat.num}</p>
                  <p className="mt-1 text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ KAJ SE NAUČITE ══ */}
      <section id="program" className="border-t border-white/8 bg-[#070707] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              Kaj se naučite
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
              Metodologija, ne triki.{" "}
              <span className="text-white/30">Postopek, ne improvizacija.</span>
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "01",
                title: "Kontroliran postopek",
                desc: "Vzpostavite strukturiran način dela z AI v strokovnem okolju.",
              },
              {
                n: "02",
                title: "Preverjanje virov",
                desc: "Dokumentirajte ključne korake odločanja in preverite vsak vir.",
              },
              {
                n: "03",
                title: "Jasen tok dela",
                desc: "Vir → Dejstva → Subsumpcija → Sklep. Vedno sledljivo.",
              },
              {
                n: "04",
                title: "Zmanjšanje tveganja",
                desc: "Manj napak pri pripravi davčnih mnenj in višja kakovost izhodov.",
              },
            ].map((item, i) => (
              <FadeIn key={item.n} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] p-8 transition hover:border-white/15">
                  <span className="absolute right-6 top-6 text-6xl font-black text-white/[0.04]">
                    {item.n}
                  </span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3 REŽIMI — terminal style ══ */}
      <section id="režimi" className="relative overflow-hidden border-t border-white/8 px-6 py-28">
        <DotGrid className="opacity-20" />
        <div className="relative mx-auto max-w-7xl md:flex md:items-center md:gap-16">
          <FadeIn className="flex-1">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              3 režimi uporabe
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Od osnov{" "}
              <span className="text-white/30">do lastnega agenta.</span>
            </h2>
            <div className="mt-10 space-y-5">
              {[
                { n: "01", title: "Informacija", sub: "brez prijave", desc: "Razumevanje omejitev surovega modela in pravilna interpretacija njegovih odgovorov." },
                { n: "02", title: "Nasvet", sub: "s prijavo", desc: "Poglobljeno delo z zgodovino vprašanj, gradivi in vašim načinom razmišljanja." },
                { n: "03", title: "Sistem", sub: "z agentom", desc: "Vzpostavitev lastnega AI agenta po vnaprej določeni arhitekturi dela in preverjeni bazi znanja." },
              ].map((m, i) => (
                <FadeIn key={m.n} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-xl border border-white/8 bg-white/[0.025] p-6">
                    <span className="mt-0.5 shrink-0 font-mono text-sm text-[#00ff88]">{m.n}</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold">{m.title}</h3>
                        <span className="text-xs text-white/30">{m.sub}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/50">{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-14 flex-1 md:mt-0">
            <Terminal />
          </FadeIn>
        </div>
      </section>

      {/* ══ IZVEDBA + ZA KOGA ══ */}
      <section className="border-t border-white/8 bg-[#070707] px-6 py-28">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2">
          {/* Izvedba */}
          <div>
            <FadeIn>
              <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">Izvedba</span>
              <h2 className="text-4xl font-extrabold">Varno, zaprto, strukturirano.</h2>
            </FadeIn>
            <div className="mt-10 space-y-4">
              {[
                { label: "Okolje", value: "Microsoft Teams", desc: "Zaprto digitalno okolje z nadzorom dostopa." },
                { label: "Varnost", value: "Microsoft Purview", desc: "Podatkovna in vsebinska varnost na ravni podjetja." },
                { label: "Metoda", value: "Obrnjena učilnica", desc: "Analiza napak, korekcija razmišljanja, praktična uporaba." },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div className="rounded-xl border border-white/8 bg-white/[0.025] p-6">
                    <span className="text-xs uppercase tracking-[0.14em] text-white/30">{item.label}</span>
                    <p className="mt-1 font-bold">{item.value}</p>
                    <p className="mt-1 text-sm text-white/40">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Za koga */}
          <div>
            <FadeIn>
              <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">Za koga</span>
              <h2 className="text-4xl font-extrabold">Program je za strokovnjake.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ul className="mt-10 space-y-0">
                {[
                  "Davčni svetovalci",
                  "Računovodje",
                  "Pravni svetovalci",
                  "Ekipe v davčnih in računovodskih družbah",
                  "Vodje, ki želijo standardizirati AI v timu",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-white/6 py-5 text-white/65 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ff88]" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ TERMINI & CENA ══ */}
      <section className="border-t border-white/8 bg-[#070707] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              Program
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
              Zaprti termini.{" "}
              <span className="text-white/30">Majhne skupine. Praktično delo.</span>
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Format */}
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]/80">
                  Format
                </span>
                <ul className="space-y-5 mt-2">
                  {[
                    { t: "Zaprta skupina", d: "Program poteka v majhnih skupinah — osredotočeno, brez odvečnega šuma." },
                    { t: "Microsoft Teams", d: "Varno digitalno okolje z nadzorom dostopa in varstvom podatkov (Purview)." },
                    { t: "Obrnjena učilnica", d: "Predavanja za analizo napak in korekcijo razmišljanja, ne pasivno poslušanje." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-white/6 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-white/80">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Vsebina */}
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]/80">
                  Vsebina
                </span>
                <ul className="space-y-5 mt-2">
                  {[
                    { t: "Stopnja I — osnove", d: "Metodologija varne uporabe AI: epistemološki nadzor, 4-stopenjski postopek, preverjanje virov." },
                    { t: "3 režimi uporabe", d: "Informacija → Nasvet → Sistem. Postopno od bralca do arhitekta lastnega AI agenta." },
                    { t: "Certifikat", d: "Po zaključku prejmete certifikat o strokovni usposobljenosti (EU AI Act, 4. člen)." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-white/6 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-white/80">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Cena / prijava */}
            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-[#00ff88]/15 bg-[#00ff88]/[0.03] p-8 h-full flex flex-col">
                <span className="mb-5 inline-block rounded-full border border-[#00ff88]/30 bg-[#00ff88]/8 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#00ff88]">
                  Prijava
                </span>
                <div className="flex-1">
                  <p className="text-4xl font-black text-white">Na povpraševanje</p>
                  <p className="mt-2 text-sm text-white/40">Cena in termini glede na skupino in obseg.</p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Prilagodljivi termini",
                      "Individualno za vaš tim",
                      "Možnost inhouse izvedbe",
                      "Certifikat vključen",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ff88]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-10 w-full rounded-full bg-[#00ff88] py-3.5 text-sm font-semibold text-black hover:bg-[#00e67a] transition">
                  Pošlji povpraševanje →
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ CERTIFIKAT ══ */}
      <section className="relative overflow-hidden border-t border-white/8 px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">Zaključek</span>
            <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Certifikat o strokovni{" "}
              <span className="text-white/30">usposobljenosti.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50">
              Po uspešno opravljenem preverjanju znanja prejmete{" "}
              <span className="font-semibold text-white">
                certifikat o strokovni usposobljenosti za varno uporabo UI
              </span>
              , ki potrjuje doseženo raven AI pismenosti in metodološke skrbnosti.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ PREDAVATELJ ══ */}
      <section className="border-t border-white/8 bg-[#070707] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">
              Predavatelj
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
              Strokovna osnova,{" "}
              <span className="text-white/30">ne generični AI tečaj.</span>
            </h2>
          </FadeIn>

          <div className="mt-14 md:flex md:items-start md:gap-16">
            {/* Avatar placeholder */}
            <FadeIn className="shrink-0">
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-black text-white/10">FD</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </FadeIn>

            {/* Bio vsebina */}
            <FadeIn delay={0.12} className="mt-10 flex-1 md:mt-0">
              <div className="mb-1 flex items-baseline gap-3">
                <h3 className="text-2xl font-extrabold">Franc Derganc</h3>
                <span className="text-sm text-white/30">Partner, TAXIN d.o.o.</span>
              </div>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[#00ff88]/70">
                Avtor metodologije MPDN-RS:2026
              </p>

              <p className="mt-6 text-lg leading-relaxed text-white/60">
                Franc Derganc je davčni svetovalec z dolgoletno izkušnjo v
                strokovnem davčnem svetovanju in avtor standarda{" "}
                <span className="font-semibold text-white">MPDN-RS:2026</span> —
                metodologije za strokovno davčno analizo z integriranim AI
                nadzorom in dokazljivo sledljivostjo.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/40">
                Program TAXIN AI ChatGPT Šola temelji neposredno na tej
                metodologiji. Gre za prenos praxisa iz realnega davčnega dela —
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
                    className="rounded-xl border border-white/8 bg-white/[0.025] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-white/30">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white/80">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="border-t border-white/8 bg-black px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#00ff88]">FAQ</span>
            <h2 className="text-4xl font-extrabold md:text-5xl">Pogosta vprašanja.</h2>
          </FadeIn>
          <div className="mt-12 space-y-4">
            {[
              { q: "Ali je program primeren za začetnike?", a: "Da. Program je zasnovan tako, da udeležence postopno vodi od osnov do sistemske uporabe AI v strokovni praksi." },
              { q: "Ali gre predvsem za učenje promptov?", a: "Ne. Fokus je na metodologiji in nadzoru postopka, ne na izoliranih prompt trikih." },
              { q: "Kako poteka izvedba?", a: "V zaprtem okolju Microsoft Teams, po principu obrnjene učilnice, s poudarkom na praktičnih primerih." },
              { q: "Kaj udeleženec prejme po zaključku?", a: "Certifikat o strokovni usposobljenosti za varno uporabo UI, ki potrjuje doseženo raven AI pismenosti." },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <details className="group rounded-2xl border border-white/8 bg-white/[0.025]">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-7 font-semibold text-white/85 hover:text-white transition">
                    {faq.q}
                    <span className="shrink-0 text-white/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="border-t border-white/6 px-7 pb-7 pt-4 text-sm leading-relaxed text-white/50">
                    {faq.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative overflow-hidden border-t border-white/8 px-6 py-36">
        <DotGrid className="opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,rgba(255,87,34,0.08),transparent)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Rezervirajte{" "}
              <span className="text-white/30">svoje mesto.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/45">
              Program poteka v zaprtih skupinah. Pošljite prijavo ali nas
              kontaktirajte za termine in podrobnosti.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-[#00ff88] px-8 py-4 text-sm font-semibold text-black hover:bg-[#00e67a] transition">
                Prijavi se zdaj
              </button>
              <button className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/65 hover:border-white/40 hover:text-white transition">
                Govorimo o izvedbi za vaš tim →
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-sm text-white/20">
        © {new Date().getFullYear()} TAXIN d.o.o. — AI ChatGPT Šola
      </footer>
    </div>
  );
}
