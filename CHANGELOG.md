# aisistemi.si — Changelog

Evidenca sprememb za rollback in pregled.

## 2026-04-15 12:45 — v8 na root, v7 na /v7

**Kaj:** Premik v8 landing page (pregled-pripravljenosti) na root `/`, stara process-first verzija na `/v7`.

**Zakaj:** Root stran je imela stari "process-first" messaging (v7). Nova v8 stran (štiri plasti, kontekstna plast, LayerDiagram) je bila na `/pregled-pripravljenosti`. Zdaj v8 postane glavna vstopna stran.

**Spremembe:**
1. `src/app/page.tsx` (v7, 460 vrstic) → `src/app/v7/page.tsx`
2. `src/app/pregled-pripravljenosti/page.tsx` (v8, 914 vrstic) → kopija na `src/app/page.tsx`
3. `src/app/layout.tsx` → metadata title/description posodobljena na v8 messaging
4. `/pregled-pripravljenosti` ostane nespremenjena (ista datoteka)

**Rollback:** 
- `git revert <commit>` ali ročno: `src/app/v7/page.tsx` nazaj na `src/app/page.tsx`
- Stanje pred spremembo: commit `0ceae21`

**Tveganja:** Minimalna. Datoteke so neodvisne. `@/components/navbar` in `@/components/reveal` ostaneta v kodi (uporablja ju v7), nista odstranjeni.
