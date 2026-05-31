---
aliases:
  - blog-kaj-je-rag-in-kdaj-ga-potrebujete
  - blog #9 AI Sistemi 10-pack
slug: kaj-je-rag-in-kdaj-ga-potrebujete
opener_template_used: obrat-definicije
primary_kwd: kaj je RAG
secondary_kwds:
  - rag sistem
  - retrieval augmented generation slovensko
  - rag chatbot
  - RAG AI
cta_target: https://aisistemi.si/pregled-pripravljenosti
tip: GEO
author: Jan Špan
publisher: AI Sistemi
date: 2026-05-31
status: published
title_tag: "Kaj je RAG in kdaj ga potrebujete"
meta_description: "Kaj je RAG v poslovnem jeziku: kdaj rag sistem pomaga, kdaj zataji in kaj morate urediti pred RAG AI projektom."
hero_image: hub/content/blog/heroes/kaj-je-rag-in-kdaj-ga-potrebujete/hero.png
hero_base_image: hub/content/blog/heroes/kaj-je-rag-in-kdaj-ga-potrebujete/base.png
---

# Kaj je RAG in kdaj ga sploh potrebujete

Kaj je RAG, če ga razložimo brez prodajne meglice?

Najprej iskanje.

Šele potem odgovor.

RAG je pristop, pri katerem AI pred odgovorom poišče relevantne vire: pravilnik, cenik, navodilo, pogodbo, zapisnik ali stran iz interne baze znanja. Model nato odgovori z dodatnim kontekstom, ne samo iz splošnega znanja. Za direktorja ali IT vodjo je to pomembno, ker [generični AI ne pozna vaše stranke](https://aisistemi.si/blog/chatgpt-za-slovensko-podjetje), zadnje ponudbe, izjeme v pogodbi ali internega pravila. Če teh virov ne dobi, lahko [odgovori tekoče in samozavestno, vendar napačno](https://aisistemi.si/blog/zakaj-ai-halucinira-kontekstno-breme).

RAG zveni kot rešitev. V resnici je zelo uporabno orodje za zelo specifičen problem: kako AI pred odgovorom pripeljati do pravega vira.

## Kaj je RAG v poslovnem jeziku?

RAG pomeni retrieval augmented generation, po slovensko bi lahko rekli generiranje z dodanim iskanjem po virih. Če iščete "retrieval augmented generation slovensko", je to najuporabnejši prevod za poslovno rabo: AI najprej poišče, nato odgovori.

Izraz je širše uveljavil članek [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401), ki je opisal povezavo med jezikovnim modelom in zunanjim, iskalnim spominom. Poslovno povedano: model ne odgovarja samo iz tega, kar je že "vedel" med učenjem, ampak pred odgovorom poišče relevantne odlomke v zbirki dokumentov.

To je bistvena razlika.

Če vprašate splošni model, kakšen je vaš interni postopek za reklamacije, ugiba ali odgovori iz splošnega znanja. Če imate rag sistem, se vprašanje najprej primerja z vašimi dokumenti. Sistem poišče nekaj najbolj podobnih odlomkov, jih doda v vprašanje, nato pa LLM pripravi odgovor.

V praksi to pogosto izgleda kot interni AI pomočnik ali rag chatbot za zaposlene. Vodja vpraša: "Kateri popust lahko ponudimo partnerju iz segmenta B?" Sistem poišče prodajna pravila, cenik in izjeme, nato pripravi odgovor z navedbo vira.

Zveni preprosto.

Težava je, da "najde dokument" še ne pomeni "razume situacijo".

> **Je vaš problem res iskanje po virih?** [Rezervirajte 30-minutni pregled pripravljenosti.](https://aisistemi.si/pregled-pripravljenosti) Skupaj preverimo, ali potrebujete RAG, kontekstno plast ali samo bolj urejen proces.

## Zakaj RAG sploh obstaja?

RAG obstaja zato, ker imajo jezikovni modeli meje.

Prva meja je znanje. Model ne pozna vaših internih dokumentov, če jih nima v pogovoru ali povezani zbirki virov. Druga meja je aktualnost. Tudi zelo dober model ne ve, kateri pravilnik ste spremenili včeraj. Tretja meja je obseg. V vsak pogovor ne morete ročno lepiti vseh pogodb, zapisnikov, navodil in cenikov.

Tu RAG pomaga.

Namesto da človek vsakokrat ročno poišče gradivo, ga sistem poišče sam. To zmanjša ročno delo in modelu da več podlage. Tudi [OpenAI v razlagi halucinacij](https://openai.com/index/why-language-models-hallucinate/) poudarja, da modeli pogosto ugibajo, kadar nimajo dovolj podlage ali kadar so za ugibanje posredno nagrajeni. Dober vir v pravem trenutku zato varuje pred praznino.

Vendar vir sam ne reši vsega.

Če je dokument zastarel, bo RAG našel zastarel odgovor. Če je politika popustov zapisana v treh različnih mapah, bo sistem morda izbral napačno. Če vprašanje zahteva presojo med več viri, en odkrit odlomek ne zadošča.

Tu se konča preprosta zgodba.

## Kako RAG deluje v praksi?

RAG ima nekaj osnovnih korakov.

1. Dokumente razrežete na manjše dele.
2. Vsak del pretvorite v številčni zapis, ki ga sistem lahko išče po pomenu.
3. Te zapise shranite v iskalno bazo.
4. Uporabnik postavi vprašanje.
5. Sistem poišče najbolj sorodne odlomke.
6. Model dobi vprašanje in odlomke.
7. Model pripravi odgovor, idealno z navedbo vira.

To je osnovna verzija.

Boljši sistemi dodajo še pravice dostopa, datume veljavnosti, razvrščanje virov, preverjanje odgovora, dnevnik uporabe in pravila, kdaj mora AI priznati, da ne ve. Tu se začne razlika med predstavitvijo in sistemom, ki ga lahko uporabljate pri delu.

RAG AI projekt zato ni samo "naložimo PDF-je in vprašamo model". Če dokumente samo zložite v bazo, ste dobili hitrejše iskanje po neredu. Morda bo demonstracija videti dobro. Uporabnik vpraša nekaj preprostega, sistem najde pravi odstavek, odgovor je lep.

Potem pride prava uporaba.

Stranka ima izjemo. Pogodba je bila spremenjena. Pravilnik ima novo verzijo. Vprašanje zahteva dva vira, ne enega. Dokument uporablja staro terminologijo. Nekdo nima pravice videti kadrovskega zapisa, sistem pa ga vseeno potegne v kontekst.

Takrat RAG pokaže, ali je arhitektura samo tehnična ali tudi poslovna.

## Kdaj RAG res pomaga?

RAG najbolj pomaga takrat, ko je vprašanje informacijsko, viri pa so dovolj urejeni.

Prvi dober primer je iskanje po dolgi dokumentaciji. Če ima podjetje sto strani pravilnikov, tehničnih navodil ali servisnih postopkov, RAG skrajša pot do relevantnega dela. Človeku ni treba vedeti, v kateri mapi je odgovor.

Drugi primer je podpora uporabnikom. Rag chatbot lahko odgovarja na pogosta vprašanja, če ima dostop do aktualnih navodil, cenika in pogojev. Tu je beseda chatbot primerna, ker uporabnik dejansko komunicira s pogovornim vmesnikom.

Tretji primer so interna pravila. Prodaja, podpora, finance in kadri imajo veliko odločitev, ki niso kreativne, ampak informacijske: kateri obrazec, kateri rok, kateri postopek, katera izjema.

Četrti primer so regulirani dokumenti, vendar samo ob dobrem nadzoru. AI lahko pomaga najti relevantne odseke, človek pa mora presoditi pomen. To velja za pravne, finančne, zdravstvene in varnostne vsebine.

RAG je torej najbolj uporaben, kadar potrebujete hitrejši dostop do znanja, ki že obstaja.

To je pomemben pogoj.

Če znanje ne obstaja, ga RAG ne bo izumil. Če je znanje razmetano, bo razmetan tudi odgovor. Če nihče ne ve, kateri vir je glavni, sistem tega ne more vedeti namesto vas.

## Kdaj RAG zataji?

RAG zataji, kadar problem ni iskanje, ampak presoja, proces ali odgovornost.

Raziskovalci v članku [Seven Failure Points When Engineering a Retrieval Augmented Generation System](https://arxiv.org/abs/2401.05856) opozarjajo, da RAG sistemi odpovedujejo na več mestih: prava vsebina lahko sploh ni v zbirki, iskanje jo lahko zgreši, sistem lahko izbere napačen kontekst, model pa lahko vseeno pripravi neprimeren odgovor. To je trezna slika. RAG zmanjša del tveganja, ne zapre celotnega kroga.

Tri napake so v podjetjih posebej pogoste.

**Prva napaka: RAG nad neurejeno interno wiki zbirko.** Če imate deset verzij istega postopka in nobene oznake, katera velja, bo sistem iskal po zmedi. Semantična podobnost ni isto kot poslovna veljavnost.

**Druga napaka: RAG za vprašanja, ki zahtevajo večstopenjsko sklepanje.** "Kaj moramo narediti pri tej stranki?" ni isto kot "Kje piše rok za reklamacije?" Prvo vprašanje zahteva status stranke, pogodbo, zadnji dogovor, poslovno presojo in odgovornost.

**Tretja napaka: RAG brez dovoljenj in pregleda.** Če sistem najde pravi dokument, ga uporabnik morda ne sme videti. Če odgovor vpliva na ceno, pogodbo ali obljubo stranki, mora biti jasno, kdo ga potrdi.

Hitro opozorilo: RAG lahko naredi napačen odgovor bolj prepričljiv.

Ko AI navede vir, mu ljudje bolj zaupajo. Če je vir napačen, zastarel ali iztrgan iz konteksta, zaupanje postane tveganje. Zato mora imeti dober rag sistem tudi pravila za zavrnitev odgovora, ne samo boljše iskanje.

> **Če so dokumenti neurejeni, RAG samo pospeši iskanje po neredu.** [Rezervirajte 30-minutni pregled pripravljenosti.](https://aisistemi.si/pregled-pripravljenosti) Pregled pokaže, ali morate najprej urediti vire, pravila ali odgovornost.

## Kaj morate urediti pred RAG sistemom?

Pred RAG sistemom uredite štiri stvari.

**Prvič: avtoritativne vire.** Za vsak proces določite, kateri dokument velja. Ne "nekje na Drive-u". Točno kateri cenik, kateri pravilnik, kateri opis storitve, katera pogodba.

**Drugič: starost in status dokumenta.** RAG mora vedeti, ali je dokument osnutek, potrjena verzija ali arhiv. Pri poslovnih odgovorih je napačna verzija pogosto nevarnejša od manjkajoče verzije.

**Tretjič: pravice dostopa.** Zaposleni naj vidi samo tisto, kar sme videti tudi v izvornih sistemih. Če RAG postane bližnjica mimo pravic, ste ustvarili varnostno težavo.

**Četrtič: pregled odgovora.** Pri nizkotveganih vprašanjih lahko sistem odgovori sam. Pri ponudbah, pogodbah, kadrovskih temah in finančnih odločitvah mora človek vedeti, kaj preverja: vir, datum, številko, izjemo in posledico.

Tu se poveže RAG in širši [AI sistem za podjetje](https://aisistemi.si/ai-sistem-za-podjetje). RAG je lahko ena plast. Ni pa celoten sistem. Podjetje potrebuje še [podatke, kontekst, orodja in proces](https://aisistemi.si/blog/kako-uvesti-ai-v-podjetje-4-plasti), drugače AI ostane pameten vmesnik nad starim neredom.

Če niste prepričani, kje ste, je koristen tudi kratek diagnostični korak, kot je [preverjanje pripravljenosti na AI](https://aisistemi.si/preveri). Ni vsak proces zrel za RAG. Nekateri potrebujejo samo boljšo mapo, jasnejši SOP ali ureditev CRM polj.

To je cenejše od napačnega projekta.

## Kako se odločiti med RAG, daljšim kontekstom in procesnim AI sistemom?

Odločitev je lažja, če vprašanje razdelite.

Če imate malo dokumentov in jih človek lahko doda ročno, pogosto zadošča daljši kontekst v modelu. To je primerno za enkratne analize, pripravo povzetka ali pregled enega paketa dokumentov.

Če imate veliko dokumentov, ki se redno spreminjajo, RAG postane smiseln. Posebej takrat, ko mora več ljudi spraševati po istem znanju in ko želite odgovore z viri.

Če vprašanje zahteva korake v več orodjih, RAG sam ne zadošča. Takrat potrebujete procesni AI sistem: dostop do CRM-ja, pravila odločanja, varne akcije, pregled človeka in zapis rezultata nazaj v delo. Na tej ravni [AI Sistemi](https://aisistemi.si/) običajno ne začnejo pri tehnologiji, ampak pri zemljevidu procesa.

Praktično vprašanje se glasi:

1. Ali odgovor že obstaja v dokumentih?
2. Ali je jasno, kateri dokument velja?
3. Ali mora AI samo poiskati informacijo ali tudi izvesti korak?
4. Ali odgovor vpliva na stranko, denar, pogodbo ali skladnost?
5. Ali lahko napako odkrijete pred škodo?

Če so odgovori jasni, je RAG lahko prava izbira. Če niso, bo projekt najprej potreboval poslovno čiščenje.

## Kaj je trezen prvi korak?

Začnite z enim procesom.

Ne z vsemi dokumenti podjetja.

Izberite proces, kjer ljudje pogosto iščejo iste odgovore: podpora, prodaja, servis, uvajanje novih sodelavcev, interna pravila ali tehnična dokumentacija. Nato zberite deset do dvajset najpogostejših vprašanj. Pri vsakem označite idealen vir, odgovorno osebo in tveganje napačnega odgovora.

To je majhen test, vendar pove veliko.

Če za polovico vprašanj ne najdete glavnega vira, RAG še ni prva naloga. Če najdete vire, vendar so zastareli, uredite status dokumentov. Če so viri dobri in vprašanja ponovljiva, lahko zgradite majhen RAG preizkus z jasnimi merili: pravilnost vira, uporabnost odgovora, hitrost, stopnja zavrnitve in število popravkov človeka.

Tako se izognete najdražji napaki: gradnji sistema, ki deluje v predstavitvi, nato pa se zlomi ob prvem resnem vprašanju.

RAG je dober, kadar rešuje pravo težavo. Ko ga postavite nad urejene vire, jasna pravila in odgovoren pregled, postane uporabna plast poslovnega AI sistema. Ko ga postavite nad zmedo, samo hitreje dostavi zmedo v lepih stavkih.

In lep stavek ni isto kot pravilen odgovor.

## Pogosta vprašanja

<details>
<summary>Kaj je RAG v eni poslovni razlagi?</summary>

RAG pomeni retrieval augmented generation, v poslovni rabi pa ga je najlažje razumeti kot AI odgovor z dodanim iskanjem po virih. Namesto da model odgovori samo iz splošnega znanja, pred odgovorom poišče relevantne dokumente, na primer pravilnik, pogodbo, cenik, navodilo ali zapis iz interne baze znanja. Zato je vprašanje "kaj je RAG" v praksi povezano z vprašanjem, ali imate znanje zapisano tako, da ga sistem lahko najde in uporabi. Dober rag sistem najprej poišče vir, nato iz izbranih odlomkov sestavi odgovor. To je uporabno, kadar zaposleni pogosto sprašujejo po istih informacijah in morajo videti, od kod odgovor prihaja. RAG AI pa ni samodejna garancija pravilnosti. Če so dokumenti stari, podvojeni ali nejasni, bo tudi odgovor stal na šibki podlagi. Najprej je torej treba urediti vire, šele potem tehnologijo.

</details>

<details>
<summary>Kdaj je rag sistem boljša izbira kot daljši kontekst v modelu?</summary>

Daljši kontekst je smiseln, kadar delate z manjšim paketom dokumentov in jih lahko človek ročno doda v pogovor. To dobro deluje pri enkratni analizi, povzetku ali pregledu nekaj datotek. Rag sistem postane bolj smiseln, ko imate veliko dokumentov, ki se spreminjajo, in ko mora več ljudi redno iskati po istih virih. Takrat ročno lepljenje gradiva postane ozko grlo. RAG omogoči iskanje po virih, izbiro najbližjih odlomkov in odgovor, ki se opira na najdeni kontekst. Razlika ni samo tehnična. Pri poslovni uporabi šteje tudi to, kdo sme videti kateri dokument, katera verzija velja in kdaj mora človek odgovor pregledati. Če imate malo gradiva, začnite preprosto. Če imate ponovljiva vprašanja, veliko internih podatkov in potrebo po navedbi vira, je rag sistem naravnejša izbira.

</details>

<details>
<summary>Ali RAG AI odpravi halucinacije?</summary>

Ne popolnoma. RAG AI lahko zmanjša del tveganja, ker modelu pred odgovorom doda relevantne dokumente in s tem manj prostora za ugibanje. To pomaga posebej takrat, ko bi splošni model drugače odgovarjal brez poznavanja vaših internih podatkov. A halucinacije se lahko še vedno pojavijo. Sistem lahko zgreši pravi dokument, izbere napačen odlomek, uporabi zastarel vir ali poveže informacije na način, ki poslovno ne drži. Tudi dober vir ne pomaga, če vprašanje zahteva presojo, izjemo ali razumevanje več korakov v procesu. Zato zrel rag sistem potrebuje pravila za zavrnitev odgovora, prikaz vira, status dokumenta in pregled človeka pri pomembnih odločitvah. RAG je varovalka pred praznino, ne nadomestilo za urejene vire in odgovornost. Pri ponudbah, pogodbah, financah in kadrovskih temah mora biti jasno, kdo preveri odgovor pred uporabo.

</details>

<details>
<summary>Kaj pomeni kontekstna plast pri RAG sistemu?</summary>

Kontekstna plast je del AI sistema, ki poskrbi, da model ne dobi samo vprašanja, ampak tudi pravo poslovno ozadje. Pri RAG to običajno pomeni izbrane odlomke iz dokumentov, lahko pa vključuje še podatke o verziji, datumu veljavnosti, pravicah dostopa, tipu stranke, zadnjem dogovoru ali tveganju odgovora. Brez te plasti model vidi premalo. Z njo lahko odgovori bolj uporabno, ker razume, na katere vire se sme opreti. Pomembno pa je, da kontekstna plast ni samo iskalna baza. V resnem poslovnem sistemu povezuje iskanje po virih, pravila odločanja in omejitve, kdaj mora AI vprašanje zavrniti ali predati človeku. Zato je RAG pogosto ena plast širšega [AI sistema za podjetje](https://aisistemi.si/ai-sistem-za-podjetje), ne celoten sistem. Če želite zanesljive odgovore, morate urediti, kateri kontekst je dovoljen, aktualen in dovolj dober za uporabo.

</details>

<details>
<summary>Katere dokumente je smiselno vključiti v RAG?</summary>

V RAG je smiselno vključiti dokumente, ki jih ljudje že uporabljajo kot vir resnice: potrjene pravilnike, aktualne cenike, prodajna pravila, tehnična navodila, servisne postopke, pogodbe, opis storitev in interne SOP-je. Dobro izhodišče so dokumenti, po katerih zaposleni pogosto iščejo enake odgovore. Slabo izhodišče je vse, kar je v mapi, samo zato, ker obstaja. Rag sistem potrebuje avtoritativne vire, ne zbirke osnutkov, starih verzij in podvojenih zapisov. Pred vključitvijo označite, kateri dokument velja, kdo je lastnik vsebine, kdaj je bil nazadnje posodobljen in kdo ga sme videti. To je posebej pomembno, kadar RAG dela z internimi podatki, ki vplivajo na stranke, cene, pogodbe ali kadrovske odločitve. Če za vprašanje ne najdete glavnega vira, je to signal, da morate najprej urediti znanje, ne graditi sistema.

</details>

<details>
<summary>Kdaj RAG ni dovolj in potrebujete procesni AI sistem?</summary>

RAG ni dovolj, kadar mora AI poleg iskanja izvesti korake v procesu. Če uporabnik vpraša, kje piše rok za reklamacije, je iskanje po virih pogosto prava naloga. Če pa vpraša, kaj storiti pri konkretni stranki, mora sistem razumeti pogodbo, zadnji dogovor, status v CRM-ju, pravila izjem, tveganje in odgovornost za odločitev. To preseže klasičen rag sistem. Takrat potrebujete procesni AI sistem, ki zna uporabiti dokumente, preveriti podatke, slediti pravilom, predlagati naslednji korak in rezultat varno zapisati nazaj v delo. RAG ostane koristen kot plast za dokumente, vendar sam ne pokrije celotnega delovnega toka. Če odgovor vpliva na denar, pogodbo, obljubo stranki ali skladnost, je potreben pregled človeka. Zato je smiselno najprej preveriti pripravljenost procesa, na primer z diagnostiko, kot je [preverjanje pripravljenosti na AI](https://aisistemi.si/preveri).

</details>

> **Preden naročite RAG, preverite, ali imate problem, ki ga RAG sploh rešuje.** [Rezervirajte 30-minutni pregled pripravljenosti.](https://aisistemi.si/pregled-pripravljenosti) V 30 minutah pogledamo en proces, vire, tveganja in najvarnejši prvi korak.
