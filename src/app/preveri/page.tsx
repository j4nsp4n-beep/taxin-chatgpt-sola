"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5722]" />
          AI Sistemi
        </Link>
        <Link href="/pregled-pripravljenosti" className="text-sm text-slate-500 hover:text-slate-900 transition">
          Pregled pripravljenosti
        </Link>
      </div>
    </header>
  );
}

/* ─── Data ─── */

type CategoryFeedback = {
  threshold: number;
  color: "green" | "yellow" | "red";
  label: string;
  text: string;
};

type LayerAction = {
  firstStep: string;
  why: string;
  vision: string;
};

type Category = {
  id: string;
  label: string;
  questions: { text: string; inverted?: boolean }[];
  feedback: CategoryFeedback[];
  actions: { low: LayerAction; mid: LayerAction; high: LayerAction };
};

const CATEGORIES: Category[] = [
  {
    id: "podatki",
    label: "Povezanost podatkov",
    questions: [
      { text: "Ali vaša ekipa dnevno ročno prenaša podatke med sistemi (CRM, mail, tabele, dokumenti)?", inverted: true },
      { text: "Ali bi AI danes lahko dostopal do vseh podatkov tega procesa brez človeškega posredovanja?" },
      { text: "Ali se kdaj zgodi, da nekdo odloča na podlagi zastarelih podatkov, ker niso bili pravočasno sinhronizirani?", inverted: true },
      { text: "Ali imate eno mesto kjer so vsi podatki tega procesa zbrani?" },
    ],
    feedback: [
      { threshold: 4, color: "green", label: "Povezani", text: "Podatki so zbrani in dostopni. AI ima na čem graditi." },
      { threshold: 3, color: "green", label: "Večinoma", text: "Večina podatkov je na mestu. Ena vrzel v povezanosti lahko upočasni AI." },
      { threshold: 2, color: "yellow", label: "Razpršeni", text: "Podatki so v več ločenih sistemih. Pred AI pilotom je treba vzpostaviti povezavo." },
      { threshold: 0, color: "red", label: "Nepovezani", text: "Podatki so razpršeni in nedostopni. AI ne more delati s tem kar ne vidi." },
    ],
    actions: {
      low: {
        firstStep: "Zapišite seznam vseh sistemov kjer živijo podatki tega procesa (CRM, mail, tabele, dokumenti, glave). Že samo ta seznam pokaže kje so največje vrzeli.",
        why: "AI potrebuje dostop do podatkov za kakršnokoli uporabno delo. Brez tega vsak AI projekt propade v pilotni fazi.",
        vision: "Ko so podatki povezani, AI vidi celotno sliko: zgodovino stranke, stanje projekta, zadnje spremembe. Brez ročnega prenašanja.",
      },
      mid: {
        firstStep: "Identificirajte eno kritično povezavo ki manjka (npr. CRM → mail ali tabela → dokument) in preverite ali obstaja API ali integracija.",
        why: "Večina podatkov je na mestu, ampak ena vrzel pomeni da AI za del procesa še vedno ne vidi celotne slike.",
        vision: "Zapolnite eno vrzel in AI dobi neprekinjeno linijo podatkov skozi celoten proces.",
      },
      high: {
        firstStep: "Dokumentirajte kako podatki tečejo skozi proces: od vstopa do zaključka. To je osnova za AI, ki podatke ne samo bere, ampak jih tudi posodablja.",
        why: "Podatki so povezani. Naslednji korak je, da AI ne samo bere, ampak tudi zapisuje in posodablja.",
        vision: "AI postane aktiven udeleženec v procesu: bere, analizira, posodablja podatke v realnem času.",
      },
    },
  },
  {
    id: "kontekst",
    label: "Strukturiranost konteksta",
    questions: [
      { text: "Ali bi AI v manj kot minuti dobil celoten kontekst o stranki ali projektu ki ga ta proces obravnava?" },
      { text: "Ali so pravila odločanja v tem procesu zapisana eksplicitno, ali jih pozna samo eden ali dva človeka?" },
      { text: "Ali kontekst o tem delu poslovanja živi na enem strukturiranem mestu?" },
      { text: "Ali bi ob odsotnosti ključne osebe njen naslednik imel dostop do vsega konteksta ki ga potrebuje za nadaljevanje?" },
    ],
    feedback: [
      { threshold: 4, color: "green", label: "Strukturiran", text: "Kontekst je zapisan in strukturiran. AI ga lahko prebere v sekundah." },
      { threshold: 3, color: "green", label: "Večinoma", text: "Večina konteksta je dostopna. En del še živi v glavah posameznikov." },
      { threshold: 2, color: "yellow", label: "Razpršen", text: "Kontekst je razpršen po mailih, dokumentih in glavah. AI bo tu deloval nepredvidljivo." },
      { threshold: 0, color: "red", label: "V glavah", text: "Kontekst živi v glavah posameznikov. To je največji bloker za AI v tem procesu." },
    ],
    actions: {
      low: {
        firstStep: "Izberite enega ključnega človeka in ga prosite: \"Povej mi vse kar moram vedeti o tem procesu da ga lahko izvedem namesto tebe.\" Zapišite odgovor. To je vaš prvi kontekstni dokument.",
        why: "Kontekstna plast je temelj brez katerega AI ne razume vašega poslovanja. Ne rabi boljšega modela, rabi vaš kontekst.",
        vision: "Ko je kontekst strukturiran, AI prebere celoten kontekst stranke ali projekta v sekundah. Vsak pogovor, odločitev in pravilo je na enem mestu.",
      },
      mid: {
        firstStep: "Zapišite pravila odločanja za ta proces: kdaj da, kdaj ne, kdaj eskalacija, kdo odloča. To je del konteksta ki ga ekipa pozna intuitivno, ampak nikjer ni zapisan.",
        why: "AI brez eksplicitnih pravil odločanja ne more pomagati pri odločitvah. Lahko samo povzema, ne pa svetuje.",
        vision: "AI ki pozna pravila odločanja lahko predlaga naslednji korak, opozori na izjeme in eskalira pravi osebi.",
      },
      high: {
        firstStep: "Preverite ali je kontekst strukturiran tako, da ga sistem (ne le človek) lahko prebere. Če je v Word dokumentih ali na papirju, je zapisan ampak ne dostopen AI-ju.",
        why: "Kontekst obstaja, ampak oblika odloča ali ga AI lahko uporabi. PDF ni isto kot strukturiran zapis.",
        vision: "AI prebere kontekst v sekundah, ne v urah. Vsaka nova oseba ali AI agent ima isti dostop kot najbolj izkušen član ekipe.",
      },
    },
  },
  {
    id: "orodja",
    label: "Povezljivost orodij",
    questions: [
      { text: "Ali bi AI danes lahko sam pogledal v vaš CRM, prebral zadnji mail od stranke ali preveril stanje projekta?" },
      { text: "Ali orodja v tem procesu med sabo komunicirajo brez ročnega posredovanja?" },
      { text: "Ali vaša ekipa za izvedbo tega procesa preklaplja med več kot tremi orodji?", inverted: true },
      { text: "Ali veste, katera vaša orodja so danes popolnoma nedostopna AI-ju?" },
    ],
    feedback: [
      { threshold: 4, color: "green", label: "Povezana", text: "Orodja komunicirajo med sabo. AI ima dostop do podatkov ki jih potrebuje." },
      { threshold: 3, color: "green", label: "Večinoma", text: "Večina orodij je povezanih. Eno ali dve sta še nedostopni AI-ju." },
      { threshold: 2, color: "yellow", label: "Ročni koraki", text: "Med orodji so ročni koraki. AI ne more sam priti do podatkov ki jih potrebuje." },
      { threshold: 0, color: "red", label: "Nepovezana", text: "Orodja so popolnoma ločena. Vsak prenos informacij zahteva človeka." },
    ],
    actions: {
      low: {
        firstStep: "Naredite seznam vseh orodij ki jih ta proces uporablja (CRM, mail, ERP, Drive, tabele, projektno orodje). Za vsako zapišite: ali ponuja API ali integracijo z Zapier/Make.",
        why: "AI potrebuje dostop do orodij za izvajanje nalog. Če mora za vsako informacijo prositi človeka, ni hitrejši od človeka.",
        vision: "Ko so orodja povezana, AI sam pogleda v CRM, prebere zadnji mail, preveri stanje projekta. Brez da kdo karkoli kopira.",
      },
      mid: {
        firstStep: "Izberite eno orodje ki je danes nedostopno AI-ju in ima API. Vzpostavite eno povezavo (tudi če samo bere podatke). To je proof of concept.",
        why: "Že ena povezava pokaže razliko: AI dobi podatke ki jih prej ni videl, in celoten proces se pospeši na tem enem mestu.",
        vision: "Vsako novo povezano orodje odpre nov nabor nalog ki jih AI lahko izvede samostojno.",
      },
      high: {
        firstStep: "Dokumentirajte tok informacij med orodji: kateri podatki gredo od kje do kje, v kakšni obliki, kako pogosto. To je osnova za avtomatizacijo.",
        why: "Orodja so povezana. Naslednji korak je optimizacija pretoka: manj korakov, hitrejši prenos, manj ročnega dela.",
        vision: "AI orkestrira orodja: prejme nalogo, zbere podatke iz treh virov, pripravi odgovor, posodobi stanje. Brez preklapljanja med zavihki.",
      },
    },
  },
  {
    id: "procesi",
    label: "Jasnost procesov",
    questions: [
      { text: "Ali so koraki tega procesa dokumentirani v obliki ki bi jo AI lahko sledil korak za korakom?" },
      { text: "Ali se ta proces izvede enako, ne glede na to, kdo ga izvaja in kateri dan je?" },
      { text: "Ali veste kje v tem procesu nastaja največ ročnega dela, čakanja ali podvajanja?" },
      { text: "Ali je za vsak korak jasno kaj je vhod, kaj izhod in kdo je odgovoren?" },
    ],
    feedback: [
      { threshold: 4, color: "green", label: "Jasen", text: "Proces je dokumentiran in predvidljiv. AI ga lahko posname in nadgradi." },
      { threshold: 3, color: "green", label: "Večinoma", text: "Večina korakov je jasnih. Ena vrzel v dokumentaciji lahko povzroči zamude." },
      { threshold: 2, color: "yellow", label: "Delno", text: "Polovica korakov je jasnih. Pred AI pilotom je treba urediti osnove." },
      { threshold: 0, color: "red", label: "Nedefiniran", text: "Proces ni dokumentiran. Vsaka izvedba je drugačna. AI ne more standardizirati kaosa." },
    ],
    actions: {
      low: {
        firstStep: "Posedite z osebo ki ta proces izvaja najpogosteje. Skupaj zapišite korake od začetka do konca. Ne kako bi moralo biti, ampak kako danes dejansko teče.",
        why: "AI ne more slediti procesu ki ne obstaja. Dokumentacija procesa ni birokracija, je pogoj za kakršnokoli avtomatizacijo.",
        vision: "Ko je proces zapisan, AI dobi recept ki mu lahko sledi. Vsak korak ima jasen vhod, izhod in odgovornost.",
      },
      mid: {
        firstStep: "Zapišite za vsak korak: kaj je vhod, kaj je izhod, kdo je odgovoren, kaj se zgodi ob izjemi. To je razlika med opisom procesa in specifikacijo ki jo AI razume.",
        why: "Proces obstaja v grobem, ampak izjeme in odločitvene točke niso eksplicitne. AI na teh mestih ne ve kaj storiti.",
        vision: "AI sledi procesu in pri vsaki odločitveni točki ve kaj storiti: standardni korak izvede sam, izjemo eskalira pravi osebi.",
      },
      high: {
        firstStep: "Identificirajte korak ki vzame največ časa ali se najpogosteje podvoji. To je kandidat za prvi AI pilot: jasen korak z merljivim učinkom.",
        why: "Proces je jasen. Zdaj gre za izbiro pravega vstopnega mesta za AI: korak z največjim učinkom in najmanjšim tveganjem.",
        vision: "AI prevzame ponovljive korake, vi pa se fokusirate na odločitve ki zahtevajo presojo. Proces teče hitreje z manj napakami.",
      },
    },
  },
];

const TOTAL = CATEGORIES.reduce((acc, c) => acc + c.questions.length, 0);

/* ─── Helpers ─── */

function getCategoryFeedback(cat: Category, score: number): CategoryFeedback {
  return cat.feedback.find(f => score >= f.threshold)!;
}

function getOverallResult(totalYes: number) {
  if (totalYes >= 13) return {
    color: "green" as const,
    dot: "bg-green-500",
    border: "border-green-200",
    bg: "bg-green-50",
    label: "Pripravljeni za AI pilot",
    text: "Vaši podatki, kontekst, orodja in procesi so v osnovi pripravljeni. Smiselno je definirati, kje točno AI vstopi in kateri korak bi prinesel največji učinek.",
    ctaSubtitle: "Skupaj določimo, kje AI vstopi in kateri korak bo prinesel največji učinek.",
  };
  if (totalYes >= 7) return {
    color: "yellow" as const,
    dot: "bg-yellow-400",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    label: "Najprej uredite plasti",
    text: "Pred AI je treba urediti osnove. Spodaj so označene plasti ki jih je treba povezati najprej.",
    ctaSubtitle: "Pokažemo vam, katere plasti so kritične in kako jih urediti pred pilotom.",
  };
  return {
    color: "red" as const,
    dot: "bg-red-500",
    border: "border-red-200",
    bg: "bg-red-50",
    label: "Štiri plasti niso na mestu",
    text: "AI tu ne bo pomagal, ampak bo pospešil kaos. Najprej povežite podatke, strukturirajte kontekst, povežite orodja in definirajte procese.",
    ctaSubtitle: "Razložimo vam, kje začeti. Brez predpostavk o AI. En pogovor, 30 minut.",
  };
}

const colorMap = {
  green: { dot: "bg-green-500", border: "border-green-200", bg: "bg-green-50", text: "text-green-700", score: "text-green-600" },
  yellow: { dot: "bg-yellow-400", border: "border-yellow-200", bg: "bg-yellow-50", text: "text-yellow-700", score: "text-yellow-600" },
  red: { dot: "bg-red-500", border: "border-red-200", bg: "bg-red-50", text: "text-red-700", score: "text-red-600" },
};

/* ─── Main ─── */

export default function PreveriPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);

  function answer(key: string, value: boolean) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  function isCategoryComplete(cat: Category) {
    return cat.questions.every((_, qi) => `${cat.id}-${qi}` in answers);
  }

  function categoryScore(cat: Category) {
    return cat.questions.filter((q, qi) => {
      const val = answers[`${cat.id}-${qi}`];
      return q.inverted ? val === false : val === true;
    }).length;
  }

  const totalAnswered = Object.keys(answers).length;
  const totalYes = CATEGORIES.reduce((acc, cat) => acc + categoryScore(cat), 0);
  const allDone = totalAnswered === TOTAL;
  const progress = Math.round((totalAnswered / TOTAL) * 100);

  const overallResult = getOverallResult(totalYes);

  const categoryResults = allDone
    ? CATEGORIES.map(cat => {
        const score = categoryScore(cat);
        const pct = score / cat.questions.length;
        const fb = getCategoryFeedback(cat, score);
        const actionLevel = pct >= 0.75 ? "high" : pct >= 0.5 ? "mid" : "low";
        return { cat, score, pct, fb, action: cat.actions[actionLevel] };
      })
    : [];

  const weakCategories = categoryResults
    .filter(({ pct }) => pct < 0.75)
    .sort((a, b) => a.pct - b.pct);

  const priorityOrder = allDone
    ? [...categoryResults].sort((a, b) => a.pct - b.pct)
    : [];

  // Scroll to email gate when all questions answered
  useEffect(() => {
    if (allDone && !emailSubmitted && emailRef.current) {
      setTimeout(() => {
        emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [allDone, emailSubmitted]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setEmailError("Vpišite veljaven email.");
      return;
    }
    setEmailError("");
    setSubmitting(true);

    try {
      await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          score: totalYes,
          total: TOTAL,
          weakestLayer: weakCategories[0]?.cat.label || "-",
        }),
      });
    } catch {
      // Don't block the user if API fails
    }

    setSubmitting(false);
    setEmailSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">

        {/* ══ HERO ══ */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 px-6 py-20 text-center">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative mx-auto max-w-2xl">
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.2em] text-[#ff5722]">
              Brezplačno · 3 minute
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Ali so vaši podatki, kontekst,<br />
              orodja in procesi<br />
              <span className="text-slate-400">pripravljeni na AI?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500">
              Izberite en konkreten proces in preverite štiri plasti pripravljenosti. Rezultat po vsaki plasti dobite sproti.
            </p>
          </div>
        </section>

        {/* ══ QUIZ ══ */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl">

            {/* Progress bar */}
            <div className="mb-10">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>{totalAnswered} / {TOTAL} vprašanj</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-[#ff5722] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Categories */}
            {CATEGORIES.map((cat, ci) => {
              const complete = isCategoryComplete(cat);
              const score = categoryScore(cat);
              const fb = complete ? getCategoryFeedback(cat, score) : null;
              const colors = fb ? colorMap[fb.color] : null;

              return (
                <FadeIn key={cat.id} delay={ci * 0.05} className="mb-12">
                  {/* Category header */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5722]">
                      {ci + 1}. {cat.label}
                    </span>
                    {complete && (
                      <span className={`text-xs font-semibold ${colors!.score}`}>
                        {score}/{cat.questions.length}
                      </span>
                    )}
                  </div>

                  {/* Questions */}
                  <div className="space-y-3">
                    {cat.questions.map((q, qi) => {
                      const key = `${cat.id}-${qi}`;
                      const val = answers[key];
                      const answered = key in answers;
                      const positive = answered && (q.inverted ? val === false : val === true);

                      return (
                        <div
                          key={key}
                          className={`rounded-xl border p-5 transition-all ${answered ? positive ? "border-green-200 bg-green-50" : "border-red-100 bg-red-50/60" : "border-slate-200 bg-white"}`}
                        >
                          <p className="mb-4 text-sm leading-relaxed text-slate-700">{q.text}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => answer(key, true)}
                              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${val === true ? (q.inverted ? "bg-red-500 text-white shadow-sm" : "bg-green-600 text-white shadow-sm") : "border border-slate-200 bg-white text-slate-600 hover:border-green-400 hover:text-green-700"}`}
                            >
                              Da
                            </button>
                            <button
                              onClick={() => answer(key, false)}
                              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${val === false ? (q.inverted ? "bg-green-600 text-white shadow-sm" : "bg-red-500 text-white shadow-sm") : "border border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-600"}`}
                            >
                              Ne
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category mini-result */}
                  <AnimatePresence>
                    {complete && fb && colors && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={`mt-4 flex items-start gap-3 rounded-xl border ${colors.border} ${colors.bg} px-5 py-4`}
                      >
                        <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                        <div>
                          <span className={`text-xs font-semibold ${colors.text}`}>{fb.label}</span>
                          <p className="mt-0.5 text-sm text-slate-600">{fb.text}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FadeIn>
              );
            })}

            {/* ══ EMAIL GATE ══ */}
            <AnimatePresence>
              {allDone && !emailSubmitted && (
                <motion.div
                  ref={emailRef}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center"
                >
                  <div className="mx-auto max-w-sm">
                    <span className="mb-2 inline-block h-3 w-3 rounded-full bg-[#ff5722]" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Vaš rezultat je pripravljen.
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Vpišite email in takoj ga prejmete.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="mt-6">
                      <input
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                        placeholder="janez@podjetje.si"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#ff5722] focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                        autoFocus
                      />
                      {emailError && (
                        <p className="mt-2 text-xs text-red-500">{emailError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-3 w-full rounded-lg bg-[#ff5722] py-3 text-sm font-semibold text-white transition hover:bg-[#ff4500] disabled:opacity-60"
                      >
                        {submitting ? "..." : "Pokaži rezultat"}
                      </button>
                    </form>
                    <p className="mt-3 text-[11px] text-slate-400">
                      Brez spama. Email uporabimo samo za pošiljanje rezultata.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ══ RESULT ══ */}
            <AnimatePresence>
              {allDone && emailSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Overall summary */}
                  <div className={`rounded-2xl border ${overallResult.border} ${overallResult.bg} p-8`}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${overallResult.dot}`} />
                      <span className="text-sm font-bold text-slate-800">{overallResult.label}</span>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{overallResult.text}</p>
                    <p className="mt-1 text-sm text-slate-400">{totalYes} od {TOTAL}: pozitivno.</p>

                    {/* Score bar per layer */}
                    <div className="mt-6 space-y-3">
                      {categoryResults.map(({ cat, score, fb }) => {
                        const colors = colorMap[fb.color];
                        const pctWidth = Math.round((score / cat.questions.length) * 100);
                        return (
                          <div key={cat.id}>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-600">{cat.label}</span>
                              <span className={`text-xs font-semibold ${colors.score}`}>{score}/{cat.questions.length}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200/60">
                              <div className={`h-2 rounded-full ${colors.dot} transition-all duration-700`} style={{ width: `${pctWidth}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Diagnostic header */}
                  <div className="pt-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Vaša diagnostika po plasteh</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Za vsako plast: kaj smo ugotovili, zakaj je pomembna in kaj lahko naredite danes.
                    </p>
                  </div>

                  {/* Layer cards — ordered by priority (weakest first) */}
                  {priorityOrder.map(({ cat, score, pct, fb, action }, i) => {
                    const colors = colorMap[fb.color];
                    const pctWidth = Math.round(pct * 100);
                    return (
                      <FadeIn key={cat.id} delay={i * 0.1}>
                        <div className={`rounded-2xl border ${colors.border} bg-white p-6`}>
                          {/* Layer header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                              <span className="text-sm font-bold text-slate-800">{cat.label}</span>
                            </div>
                            <span className={`text-sm font-bold ${colors.score}`}>{pctWidth}%</span>
                          </div>

                          {/* Score bar */}
                          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                            <div className={`h-1.5 rounded-full ${colors.dot} transition-all duration-700`} style={{ width: `${pctWidth}%` }} />
                          </div>

                          {/* Diagnosis */}
                          <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            <span className={`font-semibold ${colors.text}`}>{fb.label}.</span>{" "}
                            {fb.text}
                          </p>

                          {/* Why this matters */}
                          <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Zakaj je to pomembno</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{action.why}</p>
                          </div>

                          {/* First step */}
                          <div className="mt-3 rounded-lg border border-[#ff5722]/20 bg-[#ff5722]/[0.03] px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#ff5722]">Kaj lahko naredite danes</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-700">{action.firstStep}</p>
                          </div>

                          {/* Vision */}
                          <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Kam to pelje</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{action.vision}</p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}

                  {/* Priority roadmap */}
                  <FadeIn delay={0.4}>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <h3 className="text-sm font-bold text-slate-800">Priporočen vrstni red</h3>
                      <p className="mt-1 text-xs text-slate-500">Vsaka plast gradi na prejšnji. Začnite pri najšibkejši.</p>
                      <ol className="mt-4 space-y-3">
                        {priorityOrder.map(({ cat, score, fb }, i) => {
                          const colors = colorMap[fb.color];
                          return (
                            <li key={cat.id} className="flex items-center gap-3">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-500 shadow-sm">
                                {i + 1}
                              </span>
                              <span className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                              <span className="text-sm text-slate-700">{cat.label}</span>
                              <span className={`ml-auto text-xs font-semibold ${colors.score}`}>{score}/{cat.questions.length}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </FadeIn>

                  {/* CTA */}
                  <FadeIn delay={0.5}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                      <h3 className="text-lg font-bold text-slate-900">
                        Želite, da te plasti pregledamo skupaj za vaš konkreten proces?
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                        {overallResult.ctaSubtitle}
                      </p>
                      <a
                        href="https://tally.so/r/44obxA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
                      >
                        Rezervirajte 30 min pregled
                      </a>
                      <p className="mt-3 text-xs text-slate-400">
                        Brezplačno. En proces, eno jasno priporočilo.
                      </p>
                    </div>
                  </FadeIn>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </main>
    </>
  );
}
