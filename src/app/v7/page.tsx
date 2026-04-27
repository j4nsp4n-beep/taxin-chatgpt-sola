import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";

const truths = [
  {
    num: "01",
    title: "Točkovna uporaba ne reši sistemskega problema",
    text: "AI lahko pomaga pri enem odgovoru, enem povzetku ali enem dokumentu. Ne popravi pa procesa, kjer se delo izgublja v handoffih, čakanju in nejasnih odločitvah.",
  },
  {
    num: "02",
    title: "Kontekst se ne prenaša sam od sebe",
    text: "Če podatki niso povezani, če ni jasnih pravil in če ni standarda za delo, model ne more delovati zanesljivo. Kar ni v kontekstu, za sistem ne obstaja.",
  },
  {
    num: "03",
    title: "Proces, ki živi v glavi posameznika, ni pripravljen na AI",
    text: "Če je ključni tok dela odvisen od tega, kdo ve, kako se to naredi, potem je izvedba neenotna, onboarding počasnejši, širjenje ekipe težje, AI pa nestabilen.",
  },
];

const deliverables = [
  "Zemljevid izbranega procesa",
  "Pregled glavnih ozkih grl in mest, kjer se delo zatika",
  "Ocena, kje se izgublja kontekst ali nastaja odvisnost od posameznikov",
  "Prepoznava mest, kjer bi AI lahko realno pomagal",
  "Opozorila, kje AI trenutno še nima smisla uvajati",
  "Jasno priporočilo za naslednji korak, tudi če to pomeni, da AI za vas trenutno še ni prava rešitev",
];

const fitItems = [
  "Delo se prenaša med več ljudmi in fazami",
  "Veliko ročnega usklajevanja",
  "Podatki so razpršeni med različnimi orodji",
  "Kakovost izvedbe ni odvisna samo od znanja, ampak od pravilnega prenosa konteksta",
  "Vodstvo vidi potencial AI, ne vidi pa še prave prve točke uvedbe",
];

const examples = [
  "Agencije in studii",
  "Svetovalne in storitvene ekipe",
  "Recruitment in staffing podjetja",
  "Back-office in support operacije",
  "Delivery-heavy ekipe",
];

const faqs = [
  {
    q: "Kaj točno je Pregled pripravljenosti procesa za AI?",
    a: "Gre za usmerjen pregled enega konkretnega procesa v podjetju. Skupaj pogledamo, kako proces danes v resnici teče, kje nastaja ročno delo in čakanje, kje se izgublja kontekst in kje bi AI realno pomagal.",
  },
  {
    q: "Zakaj je pregled brezplačen?",
    a: "Ker je interes najprej ugotoviti, ali ima AI v vašem primeru sploh smisel. Raje povemo ne, kot da prodamo projekt, ki ne bo prinesel rezultata.",
  },
  {
    q: "Koliko časa traja pregled?",
    a: "En pogovor, 60–90 minut. Fokusiramo se na en proces in na koncu zapišemo jasno priporočilo za naslednji korak.",
  },
  {
    q: "Ali boste po pregledu nujno predlagali AI orodja?",
    a: "Ne nujno. Pregled pogosto pokaže, da je treba najprej urediti proces, dokumentirati korake, standardizirati handoffe in zmanjšati odvisnost od posameznikov.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 px-6 pt-28 pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,23,42,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl md:flex md:items-center md:gap-16">
          <div className="flex-1">
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#ff5722]" />
                AI Sistemi · Pregled pripravljenosti procesa
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-tight text-slate-900 md:text-6xl">
                AI v podjetju ne odpove zaradi modela.
                <br />
                Odpove zaradi procesa.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Večina podjetij uvaja AI v procese, ki niso dovolj jasno
                definirani, nimajo nadzorovanega konteksta in so še vedno
                odvisni od znanja posameznikov. Rezultat ni več reda, ampak
                hitrejša zmeda.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
                AI Sistemi pomaga storitvenim podjetjem urediti prvi proces,
                kjer AI dejansko prinese merljiv učinek, z jasnim procesom,
                urejenim kontekstom in sistemsko uvedbo.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/rezervacija"
                  className="rounded-full bg-[#ff5722] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
                >
                  Brezplačen Pregled Procesa
                </Link>
                <a
                  href="#primer"
                  className="rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                >
                  Primer iz Prakse
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 text-sm text-slate-400">
                Za storitvena podjetja, ki ne potrebujejo še ene AI ideje,
                ampak jasen prvi proces z realnim učinkom.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="mt-14 flex-1 md:mt-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ff5722]">
                Prvi korak
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900">
                Pregled pripravljenosti procesa za AI
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Usmerjen pregled enega konkretnega procesa, da postane jasno:
                kje se izgublja kontekst, kje nastaja največ ročnega dela in ali
                je prvi AI pilot sploh smiseln.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Jasen zemljevid procesa",
                  "Pregled ozkih grl",
                  "Ocena AI fit-a",
                  "Priporočilo za naslednji korak",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Najprej preverimo, ali je proces sploh pripravljen za AI.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Zakaj večina AI pobud obstane pri poskusih
            </span>
            <h2 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Problem ni, da AI ni dovolj zmogljiv.
              <br />
              Problem je proces.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Danes skoraj vsaka ekipa že uporablja ChatGPT ali podobna orodja.
              To prinese nekaj hitrosti, ne prinese pa sistemske spremembe.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-4">
              {[
                "Delo se še vedno prenaša med ljudmi, inboxi, dokumenti in orodji",
                "Pomemben kontekst je razdrobljen",
                "Odgovornost ni jasno določena",
                "Ključni deli procesa še vedno živijo v glavah posameznikov",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-1.5 shrink-0 text-red-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-10 text-xl font-semibold text-slate-900">
              AI ne rešuje kaosa. Če je proces nejasen, AI samo pospeši zmedo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Kaj podjetja pri AI najpogosteje zgrešijo
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Tri resnice o AI v podjetju
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {truths.map((truth, index) => (
              <Reveal key={truth.num} delay={index * 0.08}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <span className="text-sm font-bold text-[#ff5722]">
                    {truth.num}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {truth.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {truth.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pregled" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl md:flex md:items-start md:gap-16">
          <div className="flex-1">
            <Reveal>
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
                Pregled
              </span>
              <h2 className="max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
                Jasen pogled na en konkreten proces
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Pregled pripravljenosti procesa za AI ni splošen AI posvet in
                ni prodaja novih orodij. Gre za usmerjen pregled enega
                konkretnega procesa v podjetju.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-500">
                Namesto meglenega občutka, da bi AI mogoče nekaj pomagal,
                podjetje dobi jasno priporočilo, kje začeti in kaj trenutno nima
                smisla.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="mt-12 flex-1 md:mt-0">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Kaj podjetje odnese
              </p>
              <ul className="mt-6 space-y-4">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-slate-500">
                Po pregledu je jasno, ali je proces pripravljen na pilot, kaj je
                treba najprej urediti in kje ni smiselno izgubljati časa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pristop" className="border-b border-slate-100 bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Pristop
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Ne začnemo pri orodju. Začnemo pri procesu.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Večina AI ponudb začne pri tem, kaj vse je mogoče z modelom. AI
              Sistemi začne drugje: pri konkretnem poteku dela.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "Najprej pogledamo, kako proces danes v resnici teče.",
              "Potem preverimo, kje se izgubi kontekst in kje nastajajo handoffi.",
              "Šele nato pride na vrsto vprašanje orodij, pilotov in uvedbe.",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.08}>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-base leading-relaxed text-slate-600">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.22}>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-slate-500">
              Temu okviru pravimo Standard Operativnih Postopkov. Iz nejasnega
              poteka dela nastanejo jasni, ponovljivi postopki, primerni za
              uporabo AI v konkretnem procesu.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="za-koga" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl md:flex md:items-start md:gap-16">
          <div className="flex-1">
            <Reveal>
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
                Za koga
              </span>
              <h2 className="max-w-2xl text-4xl font-extrabold text-slate-900 md:text-5xl">
                Največ smisla ima za storitvena podjetja, kjer je izvedba
                zahtevnejša od same informacije.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-10 space-y-4">
                {fitItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5722]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="mt-12 flex-1 md:mt-0">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Tipični primeri
              </p>
              <ul className="mt-6 space-y-3">
                {examples.map((item) => (
                  <li key={item} className="text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-base leading-relaxed text-slate-500">
                  Če želite preveriti, ali je vaš proces sploh pripravljen za
                  AI, začnite tukaj.
                </p>
                <Link
                  href="/preveri"
                  className="mt-5 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                >
                  Preverite pripravljenost
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="primer" className="border-b border-slate-100 bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              Primer iz prakse
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Kaj se zgodi, ko AI vstopi v proces, ki prej živi predvsem v
              glavah posameznikov
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              V enem od projektov v reguliranem okolju smo pomagali graditi
              večfazni sistem za strokovno odločanje. Glavni problem je bil
              podoben kot v številnih storitvenih podjetjih: pomemben kontekst
              ni bil dovolj standardiziran, odločanje ni bilo dovolj sledljivo,
              izvedba pa je hitro postala odvisna od posameznika.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-base leading-relaxed text-slate-500">
              Projekt ni pokazal, da AI sam od sebe reši proces. Pokazal je
              ravno obratno: ko AI preide iz pomoči pri informacijah v dejansko
              izvedbo, postanejo ključni jasni koraki, prenos konteksta, nadzor
              nad odločitvami in standardni operativni postopki.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs uppercase tracking-[0.18em] text-[#ff5722]">
              FAQ
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Pogosta vprašanja
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.06}>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                  <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-4xl font-extrabold md:text-5xl">
              Če proces danes ni dovolj jasen, ponovljiv in zanesljiv, je
              smiselno začeti tam.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Najprej preverimo, ali je proces sploh pripravljen za AI in ali v
              podjetju obstaja en proces, kjer lahko AI dejansko prinese merljiv
              učinek.
            </p>
            <Link
              href="/rezervacija"
              className="mt-10 inline-flex rounded-full bg-[#ff5722] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
            >
              Brezplačen Pregled Procesa
            </Link>
            <p className="mt-5 text-sm text-white/45">
              Brez generičnega AI pitcha. Brez prodaje orodij na silo. Najprej
              proces, potem odločitev.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
