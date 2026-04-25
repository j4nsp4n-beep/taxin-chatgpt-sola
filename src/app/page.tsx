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

/* ─── LayerDiagram ─── */
function LayerDiagram() {
  const layers = ["Podatki", "Kontekst", "Orodja", "Procesi", "AI sistem"];
  return (
    <div>
      <div className="flex flex-col gap-1 sm:hidden">
        {layers.map((layer, i) => (
          <div key={layer} className="flex flex-col items-start">
            <div className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              i === layers.length - 1
                ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-lg"
                : "border-slate-200 bg-white text-slate-700"
            }`}>
              {layer}
            </div>
            {i < layers.length - 1 && (
              <div className="ml-3 h-3 w-px bg-slate-300" />
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex items-center">
        {layers.map((layer, i) => (
          <div key={layer} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                i === layers.length - 1
                  ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700"
              }`}>
                {layer}
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
            </div>
            {i < layers.length - 1 && (
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
        <span className="font-bold text-green-500">↑ +<AnimatedNumber value={after - before} delay={baseDelay} duration={1400} /></span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-[10px] text-red-400">brez AI sistema</span>
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
        <span className="w-20 shrink-0 text-[10px] text-green-600">z AI sistemom</span>
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
          href="https://tally.so/r/44obxA" target="_blank" rel="noopener noreferrer"
          className="rounded-full bg-[#ff5722] px-5 py-2 text-sm font-semibold text-white hover:bg-[#ff4500] transition"
        >
          Rezervirajte pregled
        </a>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════ PAGE ══ */
export default function PregledPripravljenosti() {
  return (
    <div className="bg-white text-slate-900 antialiased">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white">
        <GridLines />
        <DotGrid className="opacity-50" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_60%_80%_at_80%_30%,rgba(255,87,34,0.06),transparent)]" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16 md:flex-row md:items-start md:pt-36 md:gap-16">
          <div className="flex-1">
            <FadeIn>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#ff5722]" />
                Specializirani AI sistemi za podjetja
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight text-slate-900 md:text-6xl">
                AI sistem, ki pozna vaše podjetje.
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
                Danes AI ne ve kdo so vaše stranke, kako delate in kaj ste se
                dogovorili včeraj. Zgradimo sistem ki to spremeni: vaši podatki,
                orodja, kontekst in procesi, povezani v AI ki si zapomni in
                konstantno nadgrajuje razumevanje vašega podjetja.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="mt-6 max-w-lg text-base font-medium text-slate-700">
                Preverimo kje vaše podjetje danes izgublja kontekst.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://tally.so/r/44obxA" target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[#ff5722] px-7 py-3 text-sm font-semibold text-white hover:bg-[#ff4500] transition"
                >
                  Rezervirajte 30 min pregled
                </a>
                <a
                  href="#kako-poteka"
                  className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  Kako to deluje →
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.28}>
              <p className="mt-5 text-sm text-slate-400">
                Brezplačno. Brez obveze.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="mt-14 flex-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <DotGrid className="opacity-20" />
              <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate-400">
                Štiri plasti pripravljenosti
              </p>
              <LayerDiagram />
              <p className="mt-6 text-xs text-slate-400">
                Brez AI sistema vs. z integriranim AI sistemom
              </p>
              <div className="mt-4 space-y-5">
                <ReadinessMeter label="Povezanost podatkov" before={15} after={92} baseDelay={0.8} />
                <ReadinessMeter label="Strukturiranost konteksta" before={20} after={84} baseDelay={0.95} />
                <ReadinessMeter label="Povezljivost orodij" before={12} after={88} baseDelay={1.1} />
                <ReadinessMeter label="Ponovljivost procesov" before={18} after={90} baseDelay={1.25} />
              </div>
            </div>
          </FadeIn>

        </div>

        {/* ── Model-agnostic logo strip ── */}
        <FadeIn delay={0.35} className="mx-auto max-w-7xl px-6 pt-8 pb-6">
          <p className="mb-5 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Gradimo na vseh vodilnih platformah
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { src: "/logos/openai.svg", alt: "OpenAI", h: "h-6" },
              { src: "/logos/anthropic.svg", alt: "Anthropic", h: "h-6" },
              { src: "/logos/googlegemini.svg", alt: "Google Gemini", h: "h-6" },
              { src: "/logos/meta.svg", alt: "Meta", h: "h-6" },
              { src: "/logos/mistral.svg", alt: "Mistral AI", h: "h-6" },
              { src: "/logos/microsoftazure.svg", alt: "Microsoft Azure", h: "h-6" },
            ].map((logo) => (
              <div key={logo.alt} className="flex items-center gap-2 opacity-60 transition hover:opacity-90">
                <img src={logo.src} alt={logo.alt} className={`${logo.h} w-auto`} />
                <span className="text-xs font-medium text-slate-500">{logo.alt}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="relative border-t border-slate-100 py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: "⊕", label: "Povezani podatki" },
                { icon: "◎", label: "Strukturiran kontekst" },
                { icon: "↔", label: "Dostopna orodja" },
                { icon: "→", label: "Jasni procesi" },
                { icon: "✓", label: "Odločitev ostane pri človeku" },
                { icon: "↑", label: "Merljiv učinek" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[#ff5722]">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-300">
              Delujoče AI sisteme že uporabljajo podjetja v reguliranih okoljih in agencije z 20+ zaposlenimi.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section id="problem" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Zakaj AI v večini podjetij ne prinese rezultata
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Zakaj AI v večini podjetij ostane pri hitrih odgovorih
              <br />
              in nikoli ne postane del sistema.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Skoraj vsaka ekipa danes že uporablja ChatGPT, Claude ali Copilot.
              Rezultat: nekaj hitrih odgovorov, nobene sistemske spremembe.
              Razlog ni v tehnologiji.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 text-base font-medium text-slate-700">
              Kaj vaše podjetje izgublja vsak dan:
            </p>
            <ul className="mt-4 space-y-4">
              {[
                { title: "Podatki ostajajo v ločenih sistemih.", desc: "Vaša ekipa vsak dan ročno prenaša informacije med CRM-jem, mailom, tabelami in dokumenti. AI do teh podatkov ne seže." },
                { title: "Orodja so nedostopna AI-ju.", desc: "AI ne more sam pogledati v vaš CRM, prebrati zadnjega maila od stranke ali preveriti stanja projekta. Vse to dela nekdo ročno." },
                { title: "Znanje živi v glavah posameznikov.", desc: "Pravila odločanja, kdo je zadolžen za kaj, kako se pri vas dela. Ko nekdo zboli ali odide, to znanje izgine. AI ga nikoli ni poznal." },
                { title: "Procesi niso zapisani.", desc: "Nihče ne ve natančno kako teče ponudba od povpraševanja do računa. Vsak to dela malo po svoje. AI ne more pomagati pri procesu ki ne obstaja." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-slate-500">
                  <span className="mt-1.5 shrink-0 text-red-400">✕</span>
                  <div>
                    <span className="font-semibold text-slate-700">{item.title}</span>{" "}
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-xl font-semibold text-slate-900">
              Med vašimi orodji in AI-jem je prazen prostor. Podatki, kontekst,
              procesi, povezljivost. To plast gradimo mi.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ ORODJA KI JIH ŽE UPORABLJATE ══ */}
      <section className="border-t border-slate-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Povezljivost
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Povežemo orodja ki jih vaša ekipa že uporablja
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              Vaša obstoječa orodja postanejo del centralnega AI sistema ki razume vaše podjetje.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              {[
                { src: "/logos/gmail.svg", alt: "Gmail", h: "h-6" },
                { src: "/logos/googledrive.svg", alt: "Google Drive", h: "h-6" },
                { src: "/logos/googlecalendar.svg", alt: "Google Calendar", h: "h-6" },
                { src: "/logos/slack.svg", alt: "Slack", h: "h-6" },
                { src: "/logos/notion.svg", alt: "Notion", h: "h-6" },
                { src: "/logos/outlook.svg", alt: "Outlook", h: "h-6" },
                { src: "/logos/hubspot.svg", alt: "HubSpot", h: "h-6" },
                { src: "/logos/stripe.svg", alt: "Stripe", h: "h-6" },
                { src: "/logos/airtable.svg", alt: "Airtable", h: "h-6" },
                { src: "/logos/zapier.svg", alt: "Zapier", h: "h-6" },
              ].map((logo) => (
                <div key={logo.alt} className="flex items-center gap-2 opacity-60 transition hover:opacity-90">
                  <img src={logo.src} alt={logo.alt} className={`${logo.h} w-auto`} />
                  <span className="text-xs font-medium text-slate-500">{logo.alt}</span>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-lg text-sm text-slate-400">
              CRM, ERP, mail, koledarji, projektna orodja, baze podatkov. Karkoli vaša ekipa že uporablja, povežemo v en sistem.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ PRODUKTI ══ */}
      <section id="produkti" className="border-t border-slate-100 bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kaj gradimo
            </span>
            <h2 className="max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              AI sistemi ki dejansko poznajo vaše podjetje
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Vsak sistem stoji na istih štirih plasteh: procesi, podatki, kontekst in orodja. Razlika je v tem, kdo ga uporablja in kje teče.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <FadeIn delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white"><img src="/logos/icon-direktor.svg" alt="" className="h-6 w-6 invert" /></span>
                <h3 className="text-xl font-bold text-slate-900">AI Sistem za Direktorja</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">
                  Osebni AI sistem za vodstvo. Povezan z več mail računi, koledarji, Google Drive, Slack, Notion in projektnimi orodji. Zjutraj pripravi pregled dneva, pozna vse projekte, stranke in prioritete. Z vsako sejo se uči in nadgrajuje razumevanje podjetja.
                </p>
                <p className="mt-6 text-xs text-slate-400">Za direktorje, lastnike in vodje ki vodijo več projektov hkrati.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white"><img src="/logos/icon-podjetje.svg" alt="" className="h-6 w-6 invert" /></span>
                <h3 className="text-xl font-bold text-slate-900">AI Sistem za Podjetje</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">
                  Celotna ekipa uporablja sistem vsak na svojem delovnem mestu. Prodaja vidi stranke, ponudbe in povpraševanja. Operativa vidi projekte, roke in postopke. Vodstvo vidi celotno sliko. Sistem se poveže na vsa obstoječa orodja in omogoča avtomatizacijo delovnih tokov.
                </p>
                <p className="mt-6 text-xs text-slate-400">Za podjetja ki želijo centralen AI sistem za celotno ekipo.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white"><img src="/logos/icon-lokalni.svg" alt="" className="h-6 w-6 invert" /></span>
                <h3 className="text-xl font-bold text-slate-900">Lokalni AI Sistem</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">
                  Ista arhitektura, samo da vse teče na strežniku podjetja. Poganja ga lokalni AI model, podatki nikoli ne zapustijo stavbe. Zaposleni dostopajo prek brskalnika, od kjerkoli. Sistem indeksira vse interne dokumente, pogodbe, SOP-je in dokumentacijo.
                </p>
                <p className="mt-6 text-xs text-slate-400">Za podjetja z zahtevami po zasebnosti, GDPR skladnosti ali zaščiti poslovnih skrivnosti.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ ZA KOGA + KONKRETNI PROCESI ══ */}
      <section id="za-koga" className="border-t border-slate-100 bg-white px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Za koga je pregled pripravljenosti
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Največ smisla ima za storitvena podjetja, kjer se delo prenaša med
              ljudmi, orodji in fazami.
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-16 md:grid-cols-2">
            <FadeIn delay={0.08}>
              <ul className="space-y-3">
                {[
                  "Delo se prenaša med več ljudmi in fazami",
                  "Podatki so raztreseni po več sistemih ki med sabo ne komunicirajo",
                  "Orodja (CRM, mail, Drive, ERP) niso povezana z AI-jem",
                  "Kontekst živi v inboxih, dokumentih in glavah posameznikov",
                  "Vodstvo vidi potencial AI, ne vidi pa prave prve točke uvedbe",
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
                  "Prenos med prodajo in izvedbo",
                  "Obdelava inbound povpraševanj",
                  "Priprava poročil, dokumentacije ali internih povzetkov",
                  "Back-office procesi kjer se podatki prenašajo med ljudmi in orodji",
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
                Če imate podatke v več sistemih, kontekst v glavah posameznikov
                in AI ki ne doseže nobenega od tega, to je dober kandidat za
                pregled.
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
              Od nepovezanih podatkov do specializiranega AI sistema
            </span>
            <h2 className="max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
              Ne prodajamo enega posveta.{" "}
              <span className="text-slate-400">Pomagamo podjetju skozi jasen razvojni proces.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Vsak korak gradi na prejšnjem. Ni treba začeti pri vsem naenkrat. Dovolj je en pravi proces.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-4">
            {[
              {
                step: "01",
                title: "Pregled pripravljenosti za AI",
                desc: "Ugotovimo kje danes nastaja največ ročnega dela, kje podatki niso povezani, kje se izgublja kontekst in kje ima AI realen potencial.",
                tag: "Brezplačno",
                active: true,
              },
              {
                step: "02",
                title: "Postavitev kontekstne plasti",
                desc: "Strukturiramo kontekst vašega podjetja: stranke, projekti, procesi, pravila, znanje. V obliki ki jo AI prebere v sekundah. To je temelj brez katerega AI ne razume vašega poslovanja.",
                tag: null,
                active: false,
              },
              {
                step: "03",
                title: "Povezava orodij in podatkov",
                desc: "Povežemo vaša obstoječa orodja z AI sistemom. CRM, mail, ERP, Drive, kar imate. AI dobi dostop do podatkov ki jih potrebuje za delo.",
                tag: null,
                active: false,
              },
              {
                step: "04",
                title: "Ureditev procesov za AI",
                desc: "Preslikamo izbrani proces v obliko ki jo AI razume: jasni koraki, pravila odločanja, standardni operativni postopki.",
                tag: null,
                active: false,
              },
              {
                step: "05",
                title: "Operativna uvedba AI",
                desc: "V urejen proces z dostopnimi podatki in orodji vpeljemo AI. Ne eksperiment, delujoč sistem z merljivim učinkom.",
                tag: null,
                active: false,
              },
              {
                step: "06",
                title: "Usposabljanje in nadgradnja",
                desc: "Ekipa se nauči delati s specializiranim AI sistemom. Optimizacija, razširitev na naslednji proces, dolgoročna vzdržnost.",
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
                    "Pregled kje se podatki izgubljajo ali niso povezani z AI-jem",
                    "Ocena katera orodja (CRM, mail, ERP, Drive) so danes nepovezana in kje je mogoče vzpostaviti povezavo",
                    "Ocena kje kontekst podjetja (pravila, znanje, dogovori) živi samo v glavah posameznikov",
                    "Presek izbranega procesa: kako delo danes dejansko teče, kje se zatika",
                    "Prepoznava mest kjer bi AI lahko realno pomagal",
                    "Opozorila kje AI trenutno še nima smisla uvajati",
                    "Jasno priporočilo za naslednji korak, tudi če to pomeni, da AI za vas trenutno še ni prava pot",
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
                    Po pregledu je jasno: ali so vaši podatki, orodja in procesi
                    pripravljeni na AI, kaj je treba najprej urediti in kje ni
                    smiselno izgubljati časa.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://tally.so/r/44obxA" target="_blank" rel="noopener noreferrer"
                    className="block w-full rounded-full bg-[#ff5722] px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#ff4500]"
                  >
                    Rezervirajte 30 min pregled →
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Za en konkreten proces. Brez prodaje orodij.
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
                title: "Izberemo en konkreten del poslovanja",
                desc: "Fokus ni na celem podjetju. Izberemo del kjer sumite, da so podatki nepovezani, orodja nedostopna AI-ju, kontekst nestrukturiran ali proces nejasen.",
              },
              {
                step: "02",
                title: "Pregledamo štiri plasti",
                desc: "Kje so podatki in ali so povezani. Katera orodja so danes nedostopna AI-ju. Kje kontekst podjetja živi samo v glavah posameznikov. Kako teče proces in kje se zatika.",
              },
              {
                step: "03",
                title: "Dobite jasno priporočilo",
                desc: "Kaj je naslednji korak: povezava podatkov, postavitev kontekstne plasti, integracija orodij, ureditev procesa ali zakaj AI trenutno ni prava pot.",
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
              30 min. Brez obveze.
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
              AI Sistemi je delo Jana Špana, specialista za integracijo
              poslovnega konteksta, podatkov in procesov v AI sisteme. Izkušnje
              vključujejo gradnjo specializiranih AI sistemov za strokovno
              odločanje v reguliranih okoljih, kjer sta sledljivost in
              strukturiran kontekst pogoj, ne izbira.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.14em] text-slate-400">
                Kaj se pokaže v praksi
              </span>
              <p className="text-lg leading-relaxed text-slate-500">
                Na projektih, kjer AI preide iz hitrih odgovorov v dejansko
                izvedbo, se vedno znova pokaže ista stvar: ključni postanejo
                povezani podatki, strukturiran kontekst, dostopna orodja in
                jasni procesi.
              </p>
              <p className="mt-4 font-semibold text-slate-900">
                Brez tega AI ne stabilizira dela. Samo ga pospeši.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 p-8 shadow-lg">
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.14em] text-[#ff5722]">
                Primer iz prakse
              </span>
              <p className="text-base leading-relaxed text-slate-400">
                V reguliranem okolju smo zgradili specializiran AI sistem za
                strokovno odločanje. Izziv: podatki raztreseni po več virih,
                kontekst nestrukturiran, orodja nepovezana, odločanje odvisno od
                posameznika. Rezultat: AI sistem ki pozna celoten kontekst
                stroke, ima dostop do relevantnih virov in vodi strokovnjaka
                skozi strukturiran proces. Ne zato ker smo dodali boljši model,
                ampak zato ker smo zgradili plast med podatki in AI-jem.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-base italic leading-relaxed text-slate-500">
                &ldquo;Nehal sem preklapljati med 6 orodji. AI mi zjutraj dostavi
                povzetek, pripravi sestanek in napiše osnutke mailov. Celoten
                kontekst podjetja je v enem sistemu.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                Direktor agencije, 20+ zaposlenih
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
                Ali je vaše podjetje pripravljeno za AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                Preverite v 5 minutah: ali so vaši podatki povezani, ali so
                orodja dostopna, ali je kontekst strukturiran in ali so procesi
                dovolj jasni, da ima uvedba AI smisel.
              </p>
              <a
                href="/preveri" target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Preverite pripravljenost →
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
              AI Sistemi ne prodaja generičnih AI platform, prompt knjižnic ali
              chatbotov brez konteksta.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-500">
              Če podjetje išče samo novo orodje brez integracije v lastne
              podatke, procese in kontekst, pregled verjetno ni pravi prvi korak.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-500">
              Regulirane stroke (davki, pravo, računovodstvo) ostajajo v
              ločenem skupnem kanalu.
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
                q: "Kaj točno je Pregled pripravljenosti za AI?",
                a: "Usmerjen pregled enega konkretnega dela poslovanja. Skupaj pregledamo štiri plasti: ali so podatki povezani z AI-jem, ali so orodja (CRM, mail, ERP, Drive) dostopna, ali je kontekst podjetja (pravila, znanje, dogovori) strukturiran in ali so procesi dovolj jasni za AI. Na koncu dobite pisno priporočilo: kaj je naslednji korak, kaj je treba najprej urediti in kje AI trenutno še nima smisla. Pregled ni splošno AI svetovanje. Gre za konkreten del vašega poslovanja.",
              },
              {
                q: "Zakaj je pregled brezplačen?",
                a: "Ker je naš interes najprej ugotoviti, ali ima specializiran AI sistem v vašem primeru sploh smisel. Raje povemo ne, kot da prodamo projekt, ki ne bo prinesel rezultata. Pregled je uvod v morebitno sodelovanje, ne prodajni klic. Iz izkušenj: približno polovica pregledov pokaže, da je pred uvedbo AI treba najprej urediti osnove (povezati podatke, strukturirati kontekst, definirati procese). Tudi to je koristen rezultat.",
              },
              {
                q: "Koliko časa traja pregled?",
                a: "30 minut. Fokusiramo se na en konkreten del poslovanja. Pred pogovorom pripravimo kratko predanalizo na podlagi javno dostopnih informacij o vašem podjetju. Na koncu zapišemo pisno priporočilo ki ga lahko delite z ekipo.",
              },
              {
                q: "Za katere procese je pregled primeren?",
                a: "Za procese v storitvenih podjetjih, kjer je izvedba kompleksna, se delo prenaša med več ljudmi ali fazami in kjer so podatki raztreseni po več sistemih ki med sabo ne komunicirajo. Tipični primeri: onboarding novih strank, priprava ponudb in usklajevanje pred oddajo, prenos med prodajo in izvedbo, obdelava inbound povpraševanj, priprava poročil in dokumentacije, back-office procesi kjer se podatki prenašajo ročno med ljudmi in orodji. Skupni imenovalec: delo ki zahteva kontekst, koordinacijo in podatke iz več virov hkrati.",
              },
              {
                q: "Ali to pomeni, da boste predlagali AI orodja?",
                a: "Ne nujno. Pregled pogosto pokaže, da je treba najprej povezati podatke, strukturirati kontekst podjetja ali urediti proces. Šele ko so te štiri plasti (podatki, orodja, kontekst, procesi) na mestu, ima uvedba AI smisel. AI Sistemi ne prodaja generičnih AI platform, prompt knjižnic ali chatbotov brez konteksta. Gradimo specializirane AI sisteme ki so integrirani v vaše konkretno poslovanje.",
              },
              {
                q: "Kaj je razlika med tem in zaposliti AI specialista?",
                a: "Zaposleni AI specialist potrebuje 3 do 6 mesecev da spozna vaše podjetje, razume procese, identificira kje AI ima smisel in postavi prvi sistem. To je discovery faza ki jo mi dostavimo v tednih, ne mesecih, ker imamo metodologijo in orodja ki ta proces bistveno skrajšajo. Rezultat: specialist ki ga zaposlite pride v pripravljen sistem (strukturiran kontekst, povezani podatki, definirali procesi) in je produktiven od prvega tedna. Ne tekmujemo z zaposlitvijo. Dopolnjujemo jo. Pogosto podjetja po naši postavitvi sistema zaposlijo nekoga ki ga vzdržuje in nadgrajuje.",
              },
              {
                q: "Koliko stane sodelovanje po pregledu?",
                a: "Odvisno od obsega. Po pregledu je jasno kaj je potrebno: ali gre za postavitev kontekstne plasti (strukturiran kontekst podjetja za AI), povezavo orodij in podatkov, ureditev procesov ali celoten AI sistem. Manjši projekti (CEO AI Command Center za enega vodjo, povezan z email, koledar, datoteke in orodja) se postavijo v 1 do 2 tednih. Večji projekti (Business AI Hub za celotno organizacijo z deljeno bazo znanja in dostopom za več uporabnikov) trajajo 4 do 8 tednov. Konkretno ponudbo pripravimo po pregledu, ko je obseg jasen. Brez pregleda ne dajemo pavšalnih ocen, ker je vsako podjetje drugačno.",
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
              Vsaka pot do specializiranega AI sistema se začne enako:{" "}
              <span className="text-white/40">z enim konkretnim procesom.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
              Izberite en proces kjer sumite, da se največ časa izgublja za
              usklajevanje, ročno prenašanje podatkov in iskanje konteksta. V 30
              minutah ugotovimo ali je specializiran AI sistem smiseln in kaj je
              naslednji korak.
            </p>

            <div className="mx-auto mt-8 max-w-md text-left">
              <p className="mb-4 text-sm font-medium text-white/60">Kaj se zgodi po kliku:</p>
              <ol className="space-y-2">
                {[
                  "Kratka prijava: poveste kateri proces vas zanima",
                  "30 min pregled: skupaj razstavimo proces, podatke, orodja in kontekst",
                  "Pisno priporočilo: kaj je naslednji korak ali zakaj AI trenutno ni prava pot",
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
                href="https://tally.so/r/44obxA" target="_blank" rel="noopener noreferrer"
                className="rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Rezervirajte 30 min pregled
              </a>
              <a
                href="/preveri" target="_blank" rel="noopener noreferrer"
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
