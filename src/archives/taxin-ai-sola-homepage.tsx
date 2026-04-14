import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";

const learnItems = [
  "Kako postaviti kontroliran postopek uporabe AI v strokovnem okolju",
  "Kako preverjati vire in dokumentirati ključne korake odločanja",
  "Kako oblikovati jasen tok dela: Vir → Dejstva → Subsumpcija → Sklep",
  "Kako zmanjšati tveganje napak pri pripravi davčnih mnenj",
];

const modes = [
  {
    num: "01",
    title: "Informacija",
    sub: "brez prijave",
    desc: "Razumevanje omejitev surovega modela in pravilna interpretacija njegovih odgovorov.",
  },
  {
    num: "02",
    title: "Nasvet",
    sub: "s prijavo",
    desc: "Poglobljeno delo z zgodovino vprašanj, gradivi in vašim načinom razmišljanja.",
  },
  {
    num: "03",
    title: "Sistem",
    sub: "z agentom",
    desc: "Vzpostavitev lastnega AI agenta po vnaprej določeni arhitekturi dela in preverjeni bazi znanja.",
  },
];

const audience = [
  "Davčni svetovalci",
  "Računovodje",
  "Pravni svetovalci",
  "Ekipe v davčnih in računovodskih družbah",
  "Vodje, ki želijo standardizirati uporabo AI v strokovnem timu",
];

const infra = [
  { label: "Okolje", value: "Microsoft Teams" },
  { label: "Varnost", value: "Microsoft Purview" },
  { label: "Metoda", value: "Obrnjena učilnica" },
];

const faqs = [
  {
    q: "Ali je program primeren za začetnike?",
    a: "Da. Program je zasnovan tako, da udeležence postopno vodi od osnov do sistemske uporabe AI v strokovni praksi.",
  },
  {
    q: "Ali gre predvsem za učenje promptov?",
    a: "Ne. Fokus je na metodologiji in nadzoru postopka, ne na izoliranih prompt trikih.",
  },
  {
    q: "Kako poteka izvedba?",
    a: "V zaprtem okolju Microsoft Teams, po principu obrnjene učilnice, s poudarkom na praktičnih primerih.",
  },
  {
    q: "Kaj udeleženec prejme po zaključku?",
    a: "Po uspešno opravljenem preverjanju prejme certifikat o strokovni usposobljenosti za varno uporabo UI.",
  },
];

export default function TaxinAiSolaHomepageArchive() {
  return (
    <>
      <Navbar />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(255,87,34,0.13),transparent)]" />
        <Reveal>
          <span className="mb-6 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/50">
            TAXIN AI ChatGPT Šola — Stopnja I
          </span>
          <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-tight md:text-[4.5rem]">
            Varna in sistemska uporaba AI v davčnem svetovanju.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Ne učimo &ldquo;promptanja&rdquo;. Učimo metodologijo, s katero
            ohranite strokovno presojo, dokumentirate postopek in zmanjšate
            tveganje napačnih zaključkov.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-[#ff4500]">
              Prijavi se na program
            </button>
            <button className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/75 transition hover:border-white/40 hover:text-white">
              Prenesi program Stopnja I
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.5} className="absolute bottom-10">
          <span className="text-xs uppercase tracking-[0.2em] text-white/25">
            Pomakni navzdol
          </span>
        </Reveal>
      </section>

      <section id="zakaj" className="border-t border-white/10 bg-[#080808] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Zakaj ta program
            </span>
            <p className="text-2xl font-light leading-relaxed text-white/80 md:text-3xl">
              Generativni modeli pogosto zvenijo prepričljivo, vendar
              prepričljiv odgovor še ne pomeni{" "}
              <span className="font-semibold text-white">
                strokovno pravilnega zaključka
              </span>
              .
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              V davčni stroki to pomeni konkretno tveganje: napačna razlaga,
              slabša obramba stališča in višja odgovornost podpisnika. TAXIN AI
              ChatGPT Šola je zasnovana za strokovnjake, ki želijo AI
              uporabljati kot orodje podpore, ne kot nadomestek presoje.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="program" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kaj se naučite
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Metodologija, ne triki.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {learnItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="mt-0.5 shrink-0 text-[#ff5722]">→</span>
                  <p className="text-white/75">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080808] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              3 režimi uporabe
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Od osnov do lastnega agenta.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {modes.map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <span className="text-5xl font-black text-white/8">{m.num}</span>
                  <h3 className="mt-4 text-xl font-bold">{m.title}</h3>
                  <span className="text-xs text-white/35">{m.sub}</span>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Izvedba
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Varno, zaprto, strukturirano.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {infra.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/35">
                    {item.label}
                  </span>
                  <p className="mt-2 text-xl font-semibold">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080808] px-6 py-24">
        <div className="mx-auto max-w-5xl md:flex md:items-start md:gap-20">
          <Reveal className="shrink-0 md:w-72">
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Za koga
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Program je namenjen strokovnjakom.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex-1 md:mt-0">
            <ul className="space-y-4">
              {audience.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border-b border-white/8 pb-4 text-lg text-white/70 last:border-0"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Zaključek
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Certifikat o strokovni usposobljenosti.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/55">
              Po uspešno opravljenem preverjanju znanja prejmete{" "}
              <span className="font-semibold text-white">
                certifikat o strokovni usposobljenosti za varno uporabo UI
              </span>
              , ki potrjuje doseženo raven AI pismenosti in metodološke
              skrbnosti pri strokovnem delu.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="border-t border-white/10 bg-[#080808] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              FAQ
            </span>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Pogosta vprašanja.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
