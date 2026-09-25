# CDL — Curs de Dezvoltare Liberă (site nou)

Rescriere în React a site-ului [cdl.rosedu.org](https://cdl.rosedu.org), gândită pentru deploy pe Vercel.

**Stack:** Vite + React 19 + TypeScript + React Router + Tailwind CSS v4.

## Rulare locală

```bash
npm install
npm run dev
```

Build de producție: `npm run build` (output în `dist/`).

## Structura rutelor

| Rută | Conținut |
| --- | --- |
| `/` | pagina principală — hero, despre, programul ediției curente, arhivă |
| `/:an/:sezon` | pagina unei ediții, ex. `/2025/toamna`, `/2026/vara` |
| `/editii` | lista tuturor edițiilor (inclusiv cele istorice, 2013–2020) |
| orice altceva | pagină 404 |

Sezoane valide în URL: `primavara`, `vara`, `toamna`.

## Cum adaugi o ediție nouă

Tot conținutul stă într-un singur fișier: [`src/data/editions.ts`](src/data/editions.ts).
Adaugi un obiect nou **la începutul** listei `editions` (lista e ordonată de la cea mai nouă
la cea mai veche) și pagina, linkurile de navigare, arhiva și butonul „Ediția curentă"
se actualizează automat:

```ts
{
  id: "2026-toamna",
  year: 2026,
  season: "toamna",
  label: "Toamnă 2026",
  period: "10 octombrie – 12 decembrie 2026",
  tagline: "...",
  description: "...",
  applyUrl: "https://forms.gle/...",   // se afișează butonul de înscriere doar dacă există
  applyDeadline: "2026-10-05",
  location: "București, format fizic",
  program: [
    { date: "Sâmbătă, 10 octombrie 2026", time: "10–13", title: "Controlul versiunilor folosind Git", kind: "workshop" },
    // kind: "workshop" | "hackathon" | "final" | "liber"
  ],
}
```

Când înscrierile se închid, ștergi `applyUrl` — CTA-ul de pe prima pagină dispare singur.

Edițiile vechi (2013–2020) rămân pe site-ul Jekyll și sunt listate în `legacyEditions`.

## Deploy pe Vercel

Import repo în Vercel; framework preset **Vite**, build `npm run build`, output `dist`.
[`vercel.json`](vercel.json) conține rewrite-ul către `index.html`, necesar pentru
rutele client-side (altfel `/2025/toamna` dă 404 la refresh).

Pentru domeniu: `cdl.rosedu.org` → CNAME către Vercel (în locul GitHub Pages).
