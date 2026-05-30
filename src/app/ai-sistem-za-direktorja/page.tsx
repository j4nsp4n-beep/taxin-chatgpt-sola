import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "AI sistem za direktorja, ki pozna projekte, stranke in sestanke | AI Sistemi",
  description:
    "Zasebna operativna plast za lastnika in direktorja. Poveže mail, koledar, Drive, CRM, projekte in zapiske v dnevni pregled, pripravo na sestanke in nadaljnje korake.",
  alternates: { canonical: "/ai-sistem-za-direktorja" },
  openGraph: {
    title: "AI sistem za direktorja | AI Sistemi",
    description:
      "Zasebna operativna plast za vodstvo. Dnevni pregled, priprava sestankov in odprte zanke iz vseh vaših orodij.",
    url: "/ai-sistem-za-direktorja",
    type: "website",
  },
};

const connectors = [
  { name: "Mail", note: "več računov, niti pogovorov, prilog" },
  { name: "Koledar", note: "sestanki, priprava, follow-up" },
  { name: "Drive in dokumenti", note: "ponudbe, pogodbe, zapisniki" },
  { name: "CRM", note: "stranke, lijak, zgodovina" },
  { name: "Projektna orodja", note: "naloge, roki, blokade" },
  { name: "Zapiski in spomin", note: "Notion, Apple Notes, glasovni" },
];

const workflows = [
  {
    n: "01",
    t: "Jutranji pregled.",
    b: "Pred prvim sestankom dobite kratek pregled dneva: kateri sestanki so pomembni, katere odprte zanke se zapirajo, kje vas nekdo čaka in kje je nekaj zataknjeno.",
  },
  {
    n: "02",
    t: "Priprava sestanka.",
    b: "Pred vsakim klicem dobite kontekst stranke, zadnja sporočila, zgodovino projektov, odprte ponudbe in opombe iz prejšnjih sestankov. Brez ročnega iskanja.",
  },
  {
    n: "03",
    t: "Status stranke ali projekta.",
    b: "Eno vprašanje, en povzetek iz vseh orodij. Kje smo, kdo je zadnji rekel kaj, kaj sledi, kje je rok.",
  },
  {
    n: "04",
    t: "Pregled odprtih zank.",
    b: "Sistem ve, komu ste obljubili odgovor, katera ponudba čaka, kateri klic ni bil opravljen. Odprte zanke ostanejo vidne, dokler niso zaprte.",
  },
  {
    n: "05",
    t: "Tedenski follow-up.",
    b: "Ob koncu tedna pregled stikov, ponudb in projektov, ki potrebujejo dotik. Predlogi, kdo, kaj in kdaj naj se sliši, brez generičnih opomnikov.",
  },
];

const governance = [
  {
    t: "Read-only ob začetku.",
    b: "Sistem najprej samo bere. Nič ne pošlje, nič ne piše v zunanje sisteme brez vaše odobritve.",
  },
  {
    t: "Človeška odobritev pred akcijo.",
    b: "Pred pošiljanjem maila, kreiranjem opravila ali zapisom v CRM dobite predogled. Vi pritisnete pošlji.",
  },
  {
    t: "Spomin po vaših pravilih.",
    b: "Kaj si zapomni, kaj ne, kako dolgo. Spomin je vaš, ne v generičnem ChatGPT računu.",
  },
  {
    t: "Lokalna ali hibridna postavitev.",
    b: "Za občutljive podatke, regulirano panogo ali zaprto okolje teče model lokalno ali v hibridni postavitvi.",
  },
];

export default function DirectorPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              AI sistem za direktorja
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              AI sistem za direktorja, ki pozna projekte, stranke, sestanke in prioritete.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Ni še en asistent. Je zasebna operativna plast za lastnika ali direktorja, ki poveže mail, koledar,
              Drive, CRM, projektna orodja in zapiske ter pripravi dnevni kontekst, sestanke in naslednje korake.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/rezervacija"
                className="rounded-full bg-[#ff5722] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Brezplačen pregled procesa
              </Link>
              <Link
                href="/pregled-pripravljenosti"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Načrt uvedbe AI
              </Link>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-slate-100 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Problem
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold text-slate-900 md:text-4xl">
              Direktorjev kontekst je razpršen med orodji in ljudmi.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Pred</h3>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-700">
                  <li>Vsako jutro znova iskanje, kje smo z vsako stranko in projektom.</li>
                  <li>Mail, Slack, Drive, CRM in zapiski v ločenih oknih.</li>
                  <li>Pred vsakim sestankom ročno brskanje po zgodovini.</li>
                  <li>Odprte zanke se izgubijo med dnevi in tedni.</li>
                  <li>Ekipa večkrat vpraša isto, ker kontekst živi v glavi enega človeka.</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-900 bg-slate-900 p-8 text-slate-100">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Po</h3>
                <ul className="mt-4 space-y-3 text-base leading-relaxed">
                  <li>Jutranji pregled, ki ve, kaj je danes pomembno.</li>
                  <li>Pred sestankom kontekst stranke v eni minuti.</li>
                  <li>Status projekta na eno vprašanje, iz vseh orodij.</li>
                  <li>Odprte zanke vidne, dokler niso zaprte.</li>
                  <li>Ekipa vpraša sistem, ne vas.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Connectors */}
        <section className="border-t border-slate-100 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kaj poveže
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold text-slate-900 md:text-4xl">
              Vaša obstoječa orodja, povezana v eno operativno plast.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Brez migracije podatkov in brez nove platforme, ki bi jo morala uporabljati cela ekipa. Sistem bere iz
              orodij, ki jih že uporabljate.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {connectors.map((c) => (
                <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-slate-900">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflows */}
        <section className="border-t border-slate-100 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Prvi delovni tokovi
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold text-slate-900 md:text-4xl">
              Pet uporab, ki se vidijo v prvem tednu.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {workflows.map((w) => (
                <div key={w.n} className="rounded-3xl border border-slate-200 bg-white p-8">
                  <span className="text-sm font-semibold tracking-wider text-[#ff5722]">{w.n}</span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{w.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="border-t border-slate-100 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Spomin, zasebnost in nadzor
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold text-slate-900 md:text-4xl">
              Najprej bere. Šele potem dela.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {governance.map((g) => (
                <div key={g.t} className="rounded-3xl border border-slate-200 bg-white p-8">
                  <h3 className="text-lg font-bold text-slate-900">{g.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{g.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Path to deployment */}
        <section className="border-t border-slate-100 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Pot postavitve
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold text-slate-900 md:text-4xl">
              Trije koraki od pogovora do dnevne rabe.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <span className="text-sm font-semibold tracking-wider text-[#ff5722]">01</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Pregled procesa.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Brezplačen klic. Pogledamo, kateri delovni tok bi imel največji učinek in ali ima smisel zdaj.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <span className="text-sm font-semibold tracking-wider text-[#ff5722]">02</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Načrt uvedbe AI.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  7-dnevni plačljiv pregled procesov, podatkov, orodij in tveganj. Dobite vrstni red sistemov in priporočilo, kaj zgraditi najprej.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <span className="text-sm font-semibold tracking-wider text-[#ff5722]">03</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Prva postavitev.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Postavimo prvi delovni tok, povežemo orodja in pripravimo direktorski pregled. Read-only najprej, akcije šele po vaši odobritvi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-100 bg-slate-900 py-20 text-white md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Začnite s pregledom enega procesa.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              30 minut brezplačnega klica. Pogledamo, kje je največja zanka, ki vas vsak dan stane, in ali ima
              avtomatizacija danes smisel.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/rezervacija"
                className="rounded-full bg-[#ff5722] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Rezerviraj brezplačen pregled procesa
              </Link>
              <Link
                href="/pregled-pripravljenosti"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Načrt uvedbe AI
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
