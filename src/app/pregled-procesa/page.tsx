"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── FadeIn ─── */
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

/* ─── DotGrid ─── */
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

/* ─── GridLines ─── */
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

/* ─── ProcessDiagram ─── */
function ProcessDiagram() {
  const steps = ["Proces", "Diagnoza", "Standard", "AI pilot"];
  return (
    <div>
      <div className="flex flex-col gap-1 sm:hidden">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-start">
            <div className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              i === steps.length - 1
                ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-lg"
                : "border-slate-200 bg-white text-slate-700"
            }`}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="ml-3 h-3 w-px bg-slate-300" />
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex items-center">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                i === steps.length - 1
                  ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700"
              }`}>
                {step}
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 h-px w-6 bg-slate-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AnimatedNumber ─── */
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

/* ─── ReadinessMeter ─── */
function ReadinessMeter({
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
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-bold text-green-500">+<AnimatedNumber value={after - before} delay={baseDelay} duration={1400} /></span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-[10px] text-red-400">brez pregleda</span>
        <div className="flex-1 overflow-hidden rounded-full bg-slate-200 h-2">
          <motion.div
            className="h-full rounded-full bg-red-300"
            initial={{ width: 0 }}
            whileInView={{ width: `${before}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: baseDelay, ease: "easeOut" }}
          />
        </div>
        <AnimatedNumber value={before} delay={baseDelay} duration={1400} className="w-8 text-right text-xs text-red-400" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-[10px] text-green-600">s pregledom</span>
        <div className="flex-1 overflow-hidden rounded-full bg-slate-200 h-2">
          <motion.div
            className="h-full rounded-full bg-green-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${after}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: baseDelay + 0.2, ease: "easeOut" }}
          />
        </div>
        <AnimatedNumber value={after} delay={baseDelay + 0.2} duration={1400} className="w-8 text-right text-xs text-green-500" />
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
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
        <nav className="hidden gap-8 md:flex">
          {[["Kako poteka", "#kako-poteka"], ["Razvojna pot", "#razvojna-pot"], ["Za koga", "#za-koga"], ["FAQ", "#faq"]].map(([l, href]) => (
            <Link key={l} href={href} className="text-sm text-slate-500 hover:text-slate-900 transition">
              {l}
            </Link>
          ))}
        </nav>
        <a
          href="/rezervacija"
          className="rounded-full bg-[#ff5722] px-5 py-2 text-sm font-semibold text-white hover:bg-[#ff4500] transition"
        >
          Brezplačen Pregled
        </a>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════ PAGE ══ */
export default function PregledProcesa() {
  return (
    <div className="bg-white text-slate-900 antialiased">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white">
        <GridLines />
        <DotGrid className="opacity-50" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_60%_80%_at_80%_30%,rgba(255,87,34,0.06),transparent)]" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16 md:flex-row md:items-center md:gap-16">
          <div className="flex-1">
            <FadeIn>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#ff5722]" />
                AI Sistemi · Pregled pripravljenosti procesa
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight text-slate-900 md:text-6xl">
                AI v podjetju ne odpove{" "}
                <span className="text-slate-400">zaradi modela.</span>
                <br />
                Odpove zaradi procesa.
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
                Pomagamo storitvenim podjetjem prepoznati prvi proces, kjer AI
                lahko realno zmanjša ročno delo, izboljša prenos konteksta in
                pripravi teren za pilot z merljivim učinkom.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/rezervacija"
                  className="rounded-full bg-[#ff5722] px-7 py-3 text-sm font-semibold text-white hover:bg-[#ff4500] transition"
                >
                  Brezplačen Pregled Procesa
                </a>
                <a
                  href="/preveri"
                  className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  Preverite pripravljenost →
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.28}>
              <p className="mt-5 text-sm text-slate-400">
                Za en konkreten proces. Brez splošnega AI svetovanja. 60–90 min.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="mt-14 flex-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <DotGrid className="opacity-20" />
              <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate-400">
                Metodologija dela
              </p>
              <ProcessDiagram />
              <p className="mt-6 text-xs text-slate-400">
                Brez pregleda vs. s pregledom pripravljenosti procesa
              </p>
              <div className="mt-4 space-y-5">
                <ReadinessMeter label="Jasnost procesa" before={15} after={92} baseDelay={0.8} />
                <ReadinessMeter label="Sledljivost konteksta" before={20} after={84} baseDelay={0.95} />
                <ReadinessMeter label="Pripravljenost za AI pilot" before={12} after={88} baseDelay={1.1} />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="relative border-t border-slate-100 py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: "→", label: "Proces pred orodjem" },
                { icon: "⊕", label: "Sledljiv kontekst" },
                { icon: "✓", label: "Jasen standard" },
                { icon: "◎", label: "Odločitev ostane pri človeku" },
                { icon: "↑", label: "Merljiv učinek" },
                { icon: "↓", label: "Manj odvisnosti od posameznikov" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[#ff5722]">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ KAJ DOBITE ══ */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Rezultat pregleda
            </span>
            <h2 className="max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Kaj podjetje odnese po pregledu
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <ul className="space-y-4">
                  {[
                    "Zemljevid izbranega procesa — kako delo danes dejansko teče",
                    "Pregled glavnih ozkih grl in mest, kjer se delo zatika",
                    "Ocena, kje se izgublja kontekst ali nastaja odvisnost od posameznikov",
                    "Prepoznava mest, kjer bi AI lahko realno pomagal",
                    "Opozorila, kje AI trenutno še nima smisla uvajati",
                    "Jasno priporočilo za naslednji korak — tudi če to pomeni, da AI za vas trenutno še ni prava rešitev",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 p-8 shadow-lg">
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#ff5722]">
                    Minimalna obljuba
                  </span>
                  <p className="mt-4 text-xl font-semibold leading-snug text-white">
                    Po pregledu je jasno, ali je proces pripravljen na pilot,
                    kaj je treba najprej urediti in kje ni smiselno izgubljati
                    časa.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="/rezervacija"
                    className="block w-full rounded-full bg-[#ff5722] px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#ff4500]"
                  >
                    Brezplačen Pregled Procesa →
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Za en konkreten proces. Brez splošnega AI svetovanja.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ KAKO POTEKA ══ */}
      <section id="kako-poteka" className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-28">
        <DotGrid className="opacity-30" />
        <div className="relative mx-auto max-w-5xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Potek pregleda
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Kako poteka pregled
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Izberemo en konkreten proces",
                desc: "Fokus ni na celem podjetju, ampak na enem procesu, kjer sumite, da je največ ročnega dela, čakanja ali izgube konteksta.",
              },
              {
                step: "02",
                title: "Skupaj ga razstavimo na korake",
                desc: "Pogledamo, kako delo danes dejansko teče: kje nastajajo prenosi nalog, kje se kontekst izgubi, kje nastaja odvisnost od posameznikov.",
              },
              {
                step: "03",
                title: "Dobite jasno priporočilo",
                desc: "Ali je AI pilot smiseln, kje začeti in kaj je treba najprej urediti — ali pa zakaj trenutno ni prava pot.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 h-full">
                  <span className="mb-4 inline-block font-mono text-sm font-bold text-[#ff5722]">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.35}>
            <p className="mt-10 text-center text-sm text-slate-400">
              60–90 minut za en proces.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section id="problem" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Zakaj večina AI pobud obstane pri poskusih
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Problem ni model. Problem je proces.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Skoraj vsaka ekipa danes že uporablja ChatGPT ali podobna orodja.
              To prinese nekaj hitrosti, ne prinese pa sistemske spremembe.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 text-base font-medium text-slate-700">
              Znaki, da je to vaš problem:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Delo se prenaša med ljudmi, nabiralniki, dokumenti in orodji",
                "Pomemben kontekst je razdrobljen",
                "Odgovornost ni jasno določena",
                "Ključni deli procesa živijo v glavah posameznikov",
                "Vodstvo vidi potencial AI, ne vidi pa prave prve točke uvedbe",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-500">
                  <span className="mt-1.5 shrink-0 text-red-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-xl font-semibold text-slate-900">
              Če tak proces samo pospešimo z AI, ne dobimo boljšega sistema.
              Dobimo hitrejše napake in več operativnega šuma.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ ZA KOGA + KONKRETNI PROCESI ══ */}
      <section id="za-koga" className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Za koga je pregled pripravljenosti
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Največ smisla ima za storitvena podjetja, kjer je izvedba
              zahtevnejša od same informacije.
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-16 md:grid-cols-2">
            <FadeIn delay={0.08}>
              <ul className="space-y-3">
                {[
                  "Delo se prenaša med več ljudmi in fazami",
                  "Veliko ročnega usklajevanja",
                  "Podatki razpršeni med različnimi orodji",
                  "Kakovost izvedbe odvisna od pravilnega prenosa konteksta",
                  "Vodstvo vidi potencial AI, ne vidi pa prave prve uporabe",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mb-4 text-sm uppercase tracking-[0.14em] text-slate-400">
                Prepoznate katerega od teh procesov?
              </p>
              <ul className="space-y-0">
                {[
                  "Onboarding nove stranke",
                  "Priprava ponudb in usklajevanje pred oddajo",
                  "Handoff med prodajo in deliveryjem",
                  "Obdelava inbound povpraševanj",
                  "Priprava poročil, dokumentacije ali internih povzetkov",
                  "Back-office procesi, kjer se podatki prenašajo med ljudmi in orodji",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-slate-200 py-5 text-lg text-slate-600 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-400">
                Če se v procesu delo prenaša med več ljudmi, orodji in fazami — to je dober kandidat za pregled.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ RAZVOJNA POT ══ */}
      <section id="razvojna-pot" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Od nejasnega procesa do operativno zrelega načina dela
            </span>
            <h2 className="max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Ne prodajamo enega posveta.{" "}
              <span className="text-slate-400">Pomagamo podjetju skozi jasen razvojni proces.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Vsak korak gradi na prejšnjem. Ni treba začeti pri vsem naenkrat — dovolj je en pravi proces.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-4">
            {[
              {
                step: "01",
                title: "Pregled pripravljenosti procesa",
                desc: "Ugotovimo, kje danes nastaja največ ročnega dela, kje se izgublja kontekst in kje ima AI realen potencial.",
                tag: "Brezplačno",
                active: true,
              },
              {
                step: "02",
                title: "Prenova procesa in standardni operativni postopki",
                desc: "Uredimo izbrani proces: jasni koraki, pravila odločanja, standardni operativni postopki. Osnova, brez katere AI ne more delovati zanesljivo.",
                tag: null,
                active: false,
              },
              {
                step: "03",
                title: "Pilotna uvedba AI",
                desc: "V urejen proces vpeljemo AI na konkretnih točkah. Ne eksperiment — pilotna izvedba z merljivim učinkom.",
                tag: null,
                active: false,
              },
              {
                step: "04",
                title: "Usposabljanje ekipe",
                desc: "Ekipa razume, kje in kako AI pomaga, kje je potreben človeški nadzor in kako vzdržuje standard v vsakdanjem delu.",
                tag: null,
                active: false,
              },
              {
                step: "05",
                title: "Stalno svetovanje",
                desc: "Optimizacija, razširitev na naslednji proces, dolgoročna vzdržnost.",
                tag: null,
                active: false,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className={`flex items-start gap-6 rounded-2xl border p-7 ${item.active ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 shadow-lg" : "border-slate-200 bg-white"}`}>
                  <span className={`mt-0.5 shrink-0 text-sm font-bold tabular-nums ${item.active ? "text-[#ff5722]" : "text-slate-300"}`}>
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`font-semibold ${item.active ? "text-white" : "text-slate-500"}`}>
                        {item.title}
                      </h3>
                      {item.tag && (
                        <span className="rounded-full border border-[#ff5722]/40 bg-[#ff5722]/20 px-2.5 py-0.5 text-xs font-semibold text-[#ff5722]">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className={`mt-1.5 text-sm leading-relaxed ${item.active ? "text-slate-400" : "text-slate-400"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-sm text-slate-400">
              Začnemo pri koraku 1. Kje gremo naprej, se odloči po pregledu.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ TRUST BLOK ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-28">
        <GridLines />
        <div className="relative mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kdo stoji za tem
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Zakaj AI Sistemi
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              AI Sistemi je delo Jana Špana — specialista za umeščanje strokovnih
              procesov v AI sisteme. Izkušnje vključujejo gradnjo večfaznih AI
              sistemov za strokovno odločanje v reguliranih okoljih, kjer sta
              sledljivost in standardizacija pogoj, ne izbira.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.14em] text-slate-400">
                Kaj se pokaže v praksi
              </span>
              <p className="text-lg leading-relaxed text-slate-500">
                Na projektih, kjer AI preide iz pomoči pri informacijah v dejansko
                izvedbo, se vedno znova pokaže ista stvar: ključni postanejo jasni
                koraki, prenos konteksta, nadzor nad odločitvami in standardni
                operativni postopki.
              </p>
              <p className="mt-4 font-semibold text-slate-900">
                Brez tega AI ne stabilizira procesa — samo ga pospeši.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 p-8 shadow-lg">
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.14em] text-[#ff5722]">
                Primer iz prakse
              </span>
              <p className="text-base leading-relaxed text-slate-400">
                V reguliranem okolju smo pomagali graditi večfazni sistem za
                strokovno odločanje. Izziv: pomemben kontekst ni bil
                standardiziran, odločanje ni bilo sledljivo, izvedba je bila
                odvisna od posameznika. Rezultat: proces je postal ponovljiv,
                sledljiv in pripravljen za AI podporo — ne zato, ker smo dodali
                boljši model, ampak zato, ker smo uredili potek dela.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ KONTROLNI SEZNAM ══ */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 px-8 py-10 text-center shadow-lg">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                Ali je vaš proces sploh pripravljen za AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                Preverite v 5 minutah: ali je v vašem procesu dovolj jasen potek
                dela, dovolj stabilen prenos konteksta in dovolj ponovljiva
                izvedba, da ima uvedba AI smisel.
              </p>
              <a
                href="/preveri"
                className="mt-8 inline-block rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Preverite pripravljenost procesa →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ ZA KOGA TO NI ══ */}
      <section className="border-t border-slate-100 bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kje AI Sistemi ni pravi prvi naslov
            </span>
            <p className="text-lg leading-relaxed text-slate-500">
              AI Sistemi ni generičen ponudnik promptov, chatbot integracij ali
              hitrih avtomatizacij brez diagnoze.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-500">
              Če podjetje išče samo novo orodje, ne pa jasnejšega procesa,
              pregled pripravljenosti procesa verjetno ni pravi prvi korak.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-500">
              Regulirane stroke, kot so davki, pravo in računovodstvo, ostajajo
              v ločenem skupnem kanalu.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">FAQ</span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Pogosta vprašanja.</h2>
          </FadeIn>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Kaj točno je Pregled pripravljenosti procesa za AI?",
                a: "Gre za usmerjen pregled enega konkretnega procesa v podjetju. Skupaj pogledamo, kako proces danes v resnici teče, kje nastaja ročno delo in čakanje, kje se izgublja kontekst in kje bi AI realno pomagal. Rezultat je jasno priporočilo za naslednji korak — ne splošno AI svetovanje.",
              },
              {
                q: "Zakaj je pregled brezplačen?",
                a: "Ker je naš interes najprej ugotoviti, ali ima AI v vašem primeru sploh smisel. Raje povemo ne, kot da prodamo projekt, ki ne bo prinesel rezultata. Pregled je uvod v morebitno sodelovanje, ne prodajni klic.",
              },
              {
                q: "Koliko časa traja pregled?",
                a: "En pogovor, 60–90 minut. Fokusiramo se na en proces. Prinesemo strukturirani vprašalnik in na koncu zapišemo priporočilo.",
              },
              {
                q: "Za katere procese je pregled primeren?",
                a: "Za procese v storitvenih podjetjih, kjer je izvedba kompleksna, se delo prenaša med več ljudmi ali fazami in kjer kakovost ni odvisna samo od znanja, ampak od pravilnega prenosa konteksta. Tipično: onboarding, priprava ponudb, handoff med prodajo in deliveryjem, obdelava povpraševanj, back-office operacije.",
              },
              {
                q: "Ali to pomeni, da boste po pregledu predlagali AI orodja?",
                a: "Ne nujno. Pregled pogosto pokaže, da je treba najprej urediti proces — dokumentirati korake, standardizirati handoffe, zmanjšati odvisnost od posameznikov. Šele potem ima uvajanje AI smisel.",
              },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
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

      {/* ══ ZAKLJUČNI CTA ══ */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-900 px-6 py-32 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(255,87,34,0.12),transparent)]" />
        <div className="relative">
          <FadeIn>
            <h2 className="mx-auto max-w-2xl text-4xl font-extrabold md:text-5xl">
              Vsaka pot do zanesljive AI uvedbe se začne enako:{" "}
              <span className="text-white/40">z enim jasnim procesom.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
              Izberite en proces, kjer sumite, da se največ časa izgublja za
              usklajevanje, pripravo in prenos konteksta. V 60–90 minutah
              ugotovimo, ali je AI pilot smiseln in kaj je naslednji korak.
            </p>

            <div className="mx-auto mt-8 max-w-md text-left">
              <p className="mb-4 text-sm font-medium text-white/60">Kaj se zgodi po kliku:</p>
              <ol className="space-y-2">
                {[
                  "Kratka prijava — poveste, kateri proces vas zanima",
                  "60–90 min pregled — skupaj razstavimo proces na korake",
                  "Pisno priporočilo — ali pilot, ureditev procesa ali zakaj AI trenutno ni prava pot",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                    <span className="mt-0.5 shrink-0 font-mono text-[#ff5722]">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/rezervacija"
                className="rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Brezplačen Pregled Procesa
              </a>
              <a
                href="/preveri"
                className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/60 hover:border-white/40 hover:text-white transition"
              >
                Preverite pripravljenost →
              </a>
            </div>
            <p className="mt-6 text-xs text-white/25">
              Brez splošne AI ponudbe. Brez prodaje orodij. En proces, eno jasno priporočilo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/8 bg-slate-900 px-6 py-8 text-center text-sm text-white/20">
        © {new Date().getFullYear()} AI Sistemi
      </footer>
    </div>
  );
}
