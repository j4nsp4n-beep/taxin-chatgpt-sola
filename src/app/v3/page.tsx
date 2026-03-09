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

/* ─── dot-grid (dark dots on light) ─── */
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

/* ─── flow diagram ─── */
function FlowDiagram() {
  const steps = ["Vir", "Dejstva", "Subsumpcija", "Sklep"];
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`rounded-lg border px-2.5 py-2 text-xs font-semibold sm:px-4 sm:py-2.5 sm:text-sm ${
                i === steps.length - 1
                  ? "border-green-300 bg-green-50 text-green-700"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {step}
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
          </div>
          {i < steps.length - 1 && (
            <div className="mx-1.5 h-px w-4 bg-slate-300 sm:mx-2 sm:w-6" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── animated counter ─── */
function AnimatedNumber({
  value,
  delay = 0,
  duration = 1400,
  className = "",
}: {
  value: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTs: number | null = null;
    const delayMs = delay * 1000;

    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs - delayMs;
      if (elapsed < 0) { requestAnimationFrame(step); return; }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, delay, duration]);

  return <span ref={ref} className={className}>{display}%</span>;
}

/* ─── risk meter ─── */
function RiskMeter({
  label,
  before,
  after,
  baseDelay = 0.8,
}: {
  label: string;
  before: number;
  after: number;
  baseDelay?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="text-green-600">−<AnimatedNumber value={before - after} delay={baseDelay} duration={1400} /></span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full bg-slate-200 h-2">
          <motion.div
            className="h-full rounded-full bg-red-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${before}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: baseDelay, ease: "easeOut" }}
          />
        </div>
        <AnimatedNumber value={before} delay={baseDelay} duration={1400} className="w-8 text-right text-xs text-red-400" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full bg-slate-200 h-2">
          <motion.div
            className="h-full rounded-full bg-green-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${after}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: baseDelay + 0.2, ease: "easeOut" }}
          />
        </div>
        <AnimatedNumber value={after} delay={baseDelay + 0.2} duration={1400} className="w-8 text-right text-xs text-green-600" />
      </div>
    </div>
  );
}

/* ─── stat card ─── */
function StatCard({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTs: number | null = null;
    const duration = 1200;
    const delayMs = delay * 1000;

    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs - delayMs;
      if (elapsed < 0) { requestAnimationFrame(step); return; }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-black text-green-700">
        {display}{suffix}
      </p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

/* ─── terminal block (intentionally stays dark) ─── */
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 font-mono text-sm shadow-lg">
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

/* ══════════════════════════════════════════════ PAGE v3 — LIGHT ══ */
export default function PageV3() {
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
            {["Zakaj", "Program", "Režimi", "FAQ"].map((l) => (
              <Link key={l} href={`#${l.toLowerCase()}`} className="text-sm text-slate-500 hover:text-slate-900 transition">
                {l}
              </Link>
            ))}
          </nav>
          <a href="https://podio.com/webforms/6967373/536634" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition">
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
                TAXIN AI ChatGPT Šola — Stopnja I · 15 ur · Online
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight text-slate-900 md:text-6xl">
                Varna in sistemska{" "}
                <span className="text-slate-400">uporaba AI</span>
                <br />v davčnem svetovanju.
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-4 text-base font-medium italic text-slate-400">
                &ldquo;Ko AI postane orodje strokovnjaka — ne njegov nadomestek.&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
                Ne učimo &ldquo;promptanja&rdquo;. Učimo metodologijo, s katero
                ohranite strokovno presojo, dokumentirate postopek in zmanjšate
                tveganje napačnih zaključkov.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="https://podio.com/webforms/6967373/536634" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition">
                  Prijavi se na program
                </a>
                <a href="/program-stopnja-1.pdf" download className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition">
                  Prenesi program Stopnja I ↓
                </a>
              </div>
            </FadeIn>
          </div>

          {/* right — flow diagram card */}
          <FadeIn delay={0.3} className="mt-14 flex-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <DotGrid className="opacity-20" />
              <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate-400">
                Metodologija dela
              </p>
              <FlowDiagram />
              <p className="mt-6 text-xs text-slate-400">
                Primerjava brez metodologije vs. s programom Stopnja I
              </p>
              <div className="mt-4 space-y-5">
                <RiskMeter label="Tveganje napačnega zaključka" before={72} after={18} baseDelay={0.8} />
                <RiskMeter label="Nedokumentiran postopek" before={85} after={12} baseDelay={0.95} />
                <RiskMeter label="Nepreverjen vir" before={64} after={8} baseDelay={1.1} />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* outcomes bar */}
        <div className="relative border-t border-slate-100 py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: "↓", label: "Manj halucinacij" },
                { icon: "⊕", label: "Sledljivi viri" },
                { icon: "✓", label: "EU AI Act skladnost" },
                { icon: "→", label: "Hitrejše analize" },
                { icon: "◎", label: "Odločitev vedno sprejema ČLOVEK" },
                { icon: "↑", label: "Večji obseg storitev" },
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

      {/* ══ HERO B — dark contrast ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-900 px-6 py-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-5xl font-extrabold leading-[1.07] tracking-tight text-white md:text-6xl">
              Od verjetnostnih odgovorov{" "}
              <span className="text-white/35">do strokovno</span>
              <br />
              zanesljivega postopka.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
              S programom TAXIN AI ChatGPT Šola vzpostavite jasen okvir dela:
              <br />
              <span className="font-semibold text-white">
                vir → dejstva → subsumpcija → sklep
              </span>
              .
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://podio.com/webforms/6967373/536634" target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-7 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">
                Rezerviraj mesto
              </a>
              <a href="mailto:info@taxin.si?subject=Povpraševanje%20TAXIN%20AI%20ChatGPT%20Šola" className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/60 hover:border-white/40 hover:text-white transition">
                Želim več informacij
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ OUTCOMES ══ */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Rezultati
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Boljše svetovanje.
              <br />
              <span className="text-slate-400">Manjše tveganje.</span>
              <br />
              <span className="text-slate-400">Večji obseg.</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {/* Sklop A */}
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full shadow-sm">
                <span className="mb-5 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Strokovnost
                </span>
                <h3 className="mb-6 text-lg font-bold text-slate-900">Nadgradite kakovost svetovanja.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Ekspertna analiza", d: "AI kot orodje za hitrejšo in poglobljeno obdelavo — svetovalec ostane arhitekt zaključka." },
                    { t: "Metodološki pristop", d: "Postopek Vir → Dejstva → Subsumpcija → Sklep zamenja improvizacijo z dokazljivo metodo." },
                    { t: "Epistemološka presoja", d: "Razvijete zmožnost razlikovanja med verjetnim in preverjenim — ključna kompetenca v dobi AI." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-slate-100 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Sklop B */}
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full shadow-sm">
                <span className="mb-5 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Varnost & skladnost
                </span>
                <h3 className="mb-6 text-lg font-bold text-slate-900">Zmanjšajte tveganje. Ostanite skladni.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Manj halucinacij", d: "Naučite se prepoznati in preprečiti napačne zaključke modela preden pridejo do stranke." },
                    { t: "EU AI Act", d: "Uporaba AI v skladu z evropsko regulativo — zaupanja vreden postopek, ki ga zagovarjate." },
                    { t: "Sledljivost & HITL", d: "Vsak zaključek ima dokazno sled. Vsak sklep pregleda strokovnjak. Odgovornost ostane pri vas." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-slate-100 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Sklop C */}
            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 h-full">
                <span className="mb-5 inline-block rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Poslovni rezultati
                </span>
                <h3 className="mb-6 text-lg font-bold text-slate-900">Povečajte obseg in prihodek.</h3>
                <ul className="space-y-5">
                  {[
                    { t: "Hitrost analiz", d: "AI prevzame zbiranje virov — svetovalec se osredotoči na presojo in sklep." },
                    { t: "Večji obseg dela", d: "Iste ekipe obdelajo več primerov brez izgube kakovosti. AI razširi kapaciteto." },
                    { t: "Rast prakse", d: "Večji obseg + višja kakovost + nižje tveganje napak = osnova za rast prihodka." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-green-200 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ ZAKAJ ══ */}
      <section id="zakaj" className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-7xl md:flex md:items-center md:gap-20">
          <FadeIn className="md:w-80 shrink-0">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Zakaj
            </span>
            <h2 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Prepričljiv odgovor
              <br />
              <span className="text-slate-300">≠</span>
              <br />
              pravilen zaključek.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10 flex-1 space-y-6 md:mt-0">
            <p className="text-xl leading-relaxed text-slate-600">
              Generativni modeli pogosto zvenijo prepričljivo — vendar v davčni
              stroki to pomeni konkretno tveganje:{" "}
              <span className="font-semibold text-slate-900">
                napačna razlaga, slabša obramba stališča in višja odgovornost
                podpisnika.
              </span>
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              TAXIN AI ChatGPT Šola je zasnovana za strokovnjake, ki želijo AI
              uporabljati kot orodje podpore — ne kot nadomestek presoje.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: 72, suffix: " %", label: "tveganje brez metodologije" },
                { value: 3, suffix: "×", label: "manj nepreverjenih virov" },
                { value: 100, suffix: " %", label: "sledljiv postopek" },
              ].map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.12} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ KAJ SE NAUČITE ══ */}
      <section id="program" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Kaj se naučite
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Metodologija, ne triki.{" "}
              <span className="text-slate-400">Postopek, ne improvizacija.</span>
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { n: "01", title: "Kontroliran postopek", desc: "Vzpostavite strukturiran način dela z AI v strokovnem okolju." },
              { n: "02", title: "Preverjanje virov", desc: "Dokumentirajte ključne korake odločanja in preverite vsak vir." },
              { n: "03", title: "Jasen tok dela", desc: "Vir → Dejstva → Subsumpcija → Sklep. Vedno sledljivo." },
              { n: "04", title: "Zmanjšanje tveganja", desc: "Manj napak pri pripravi davčnih mnenj in višja kakovost izhodov." },
            ].map((item, i) => (
              <FadeIn key={item.n} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-slate-300 hover:shadow-md">
                  <span className="absolute right-6 top-6 text-6xl font-black text-slate-100">
                    {item.n}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3 REŽIMI ══ */}
      <section id="režimi" className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-28">
        <DotGrid className="opacity-30" />
        <div className="relative mx-auto max-w-7xl md:flex md:items-center md:gap-16">
          <FadeIn className="flex-1">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              3 režimi uporabe
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Od osnov{" "}
              <span className="text-slate-400">do lastnega agenta.</span>
            </h2>
            <div className="mt-10 space-y-5">
              {[
                { n: "01", title: "Informacija", sub: "brez prijave", desc: "Razumevanje omejitev surovega modela in pravilna interpretacija njegovih odgovorov." },
                { n: "02", title: "Nasvet", sub: "s prijavo", desc: "Poglobljeno delo z zgodovino vprašanj, gradivi in vašim načinom razmišljanja." },
                { n: "03", title: "Sistem", sub: "z agentom", desc: "Vzpostavitev lastnega AI agenta po vnaprej določeni arhitekturi dela in preverjeni bazi znanja." },
              ].map((m, i) => (
                <FadeIn key={m.n} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300">
                    <span className="mt-0.5 shrink-0 font-mono text-sm text-green-600">{m.n}</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-slate-900">{m.title}</h3>
                        <span className="text-xs text-slate-400">{m.sub}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{m.desc}</p>
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
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2">
          {/* Izvedba */}
          <div>
            <FadeIn>
              <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">Izvedba</span>
              <h2 className="text-4xl font-extrabold text-slate-900">Varno, zaprto, strukturirano.</h2>
            </FadeIn>
            <div className="mt-10 space-y-4">
              {[
                { label: "Okolje", value: "Microsoft Teams", desc: "Zaprto digitalno okolje z nadzorom dostopa." },
                { label: "Varnost", value: "Microsoft Purview", desc: "Podatkovna in vsebinska varnost na ravni podjetja." },
                { label: "Metoda", value: "Obrnjena učilnica", desc: "Analiza napak, korekcija razmišljanja, praktična uporaba." },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</span>
                    <p className="mt-1 font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Za koga */}
          <div>
            <FadeIn>
              <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">Za koga</span>
              <h2 className="text-4xl font-extrabold text-slate-900">Program je za strokovnjake.</h2>
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
                    className="flex items-center gap-4 border-b border-slate-200 py-5 text-slate-600 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ TERMINI & CENA ══ */}
      <section className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">
              Program
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Zaprti termini.{" "}
              <span className="text-slate-400">Majhne skupine. Praktično delo.</span>
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Format */}
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full shadow-sm">
                <span className="mb-5 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Format
                </span>
                <ul className="space-y-5 mt-2">
                  {[
                    { t: "Zaprta skupina", d: "Program poteka v majhnih skupinah — osredotočeno, brez odvečnega šuma." },
                    { t: "Microsoft Teams", d: "Varno digitalno okolje z nadzorom dostopa in varstvom podatkov (Purview)." },
                    { t: "Obrnjena učilnica", d: "Predavanja za analizo napak in korekcijo razmišljanja, ne pasivno poslušanje." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-slate-100 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Vsebina */}
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full shadow-sm">
                <span className="mb-5 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Vsebina
                </span>
                <ul className="space-y-5 mt-2">
                  {[
                    { t: "Stopnja I — osnove", d: "Metodologija varne uporabe AI: epistemološki nadzor, 4-stopenjski postopek, preverjanje virov." },
                    { t: "3 režimi uporabe", d: "Informacija → Nasvet → Sistem. Postopno od bralca do arhitekta lastnega AI agenta." },
                    { t: "Certifikat", d: "Po zaključku prejmete certifikat o strokovni usposobljenosti (EU AI Act, 4. člen)." },
                    { t: "Stopnja II — napredna (opcijsko)", d: "Licenčna nadgradnja z metodologijo MPDN-RS:2026 za profesionalno analitično delo." },
                  ].map((item) => (
                    <li key={item.t} className="border-t border-slate-100 pt-5 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Cena / prijava */}
            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 h-full flex flex-col">
                <span className="mb-5 inline-block rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs uppercase tracking-[0.14em] text-green-700">
                  Prijava
                </span>
                <div className="flex-1">
                  <p className="text-4xl font-black text-slate-900">Na povpraševanje</p>
                  <p className="mt-2 text-sm text-slate-500">Cena in termini glede na skupino in obseg.</p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Prilagodljivi termini",
                      "Individualno za vaš tim",
                      "Možnost inhouse izvedbe",
                      "Certifikat vključen",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="mailto:info@taxin.si?subject=Povpraševanje%20TAXIN%20AI%20ChatGPT%20Šola"
                  className="mt-10 block w-full rounded-full bg-slate-900 py-3.5 text-center text-sm font-semibold text-white hover:bg-slate-700 transition"
                >
                  Pošlji povpraševanje →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ CERTIFIKAT ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50 px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">Zaključek</span>
            <h2 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Certifikat o strokovni{" "}
              <span className="text-slate-400">usposobljenosti.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
              Po uspešno opravljenem preverjanju znanja prejmete{" "}
              <span className="font-semibold text-slate-900">
                certifikat o strokovni usposobljenosti za varno uporabo UI
              </span>
              , ki potrjuje doseženo raven AI pismenosti in metodološke skrbnosti.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ PREDAVATELJ ══ */}
      <section className="border-t border-slate-100 bg-white px-6 py-28">
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

            {/* Bio vsebina */}
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
                Program TAXIN AI ChatGPT Šola temelji neposredno na tej
                metodologiji. Gre za prenos praktičnega znanja iz realnega davčnega dela —
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

      {/* ══ FAQ ══ */}
      <section id="faq" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-green-600">FAQ</span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Pogosta vprašanja.</h2>
          </FadeIn>
          <div className="mt-12 space-y-4">
            {[
              { q: "Ali je program primeren za začetnike?", a: "Da. Program je zasnovan tako, da udeležence postopno vodi od osnov do sistemske uporabe AI v strokovni praksi." },
              { q: "Ali gre predvsem za učenje promptov?", a: "Ne. Fokus je na metodologiji in nadzoru postopka, ne na izoliranih prompt trikih." },
              { q: "Kako poteka izvedba?", a: "V zaprtem okolju Microsoft Teams, po principu obrnjene učilnice, s poudarkom na praktičnih primerih." },
              { q: "Kaj udeleženec prejme po zaključku?", a: "Certifikat o strokovni usposobljenosti za varno uporabo UI, ki potrjuje doseženo raven AI pismenosti." },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
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

      {/* ══ CTA — dark za kontrast ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-900 px-6 py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,rgba(34,197,94,0.08),transparent)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Rezervirajte{" "}
              <span className="text-white/30">svoje mesto.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/45">
              Program poteka v zaprtih skupinah. Pošljite prijavo ali nas
              kontaktirajte za termine in podrobnosti.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://podio.com/webforms/6967373/536634"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white hover:bg-green-700 transition"
              >
                Prijavi se zdaj
              </a>
              <a
                href="mailto:info@taxin.si?subject=Povpraševanje%20TAXIN%20AI%20ChatGPT%20Šola"
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/65 hover:border-white/40 hover:text-white transition"
              >
                Govorimo o izvedbi za vaš tim →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/8 bg-slate-900 px-6 py-8 text-center text-sm text-white/20">
        © {new Date().getFullYear()} TAXIN d.o.o. — AI ChatGPT Šola
      </footer>
    </div>
  );
}
