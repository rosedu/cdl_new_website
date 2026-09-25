# CDL — Curs de Dezvoltare Liberă

Site-ul [cdl.rosedu.org](https://cdl.rosedu.org), rescris în React și pregătit pentru deploy pe Vercel.

**Stack:** Vite + React 19 + TypeScript + React Router + Tailwind CSS v4.

## Rulare locală

```bash
npm install
```

```bash
npm run dev
```

Build de producție: `npm run build` (output în `dist/`).

## Rutele site-ului

| Rută | Conținut |
| --- | --- |
| `/` | pagina principală — hero, despre, programul ediției curente, arhivă |
| `/:an/:sezon` | pagina unei ediții, ex. `/2026/toamna`, `/2025/primavara` |
| `/:an/:sezon#mentori` | secțiunea de instructori și mentori a ediției |
| `/:an/:sezon#sponsori` | secțiunea de sponsori și parteneri (apare doar dacă ediția are sponsori) |
| `/editii` | lista tuturor edițiilor, inclusiv cele istorice (2013–2020) |
| orice altceva | pagină 404 |

Sezoane valide în URL: `primavara`, `vara`, `toamna`.

---

## Cum adaugi o ediție nouă

**Tot conținutul stă într-un singur fișier: [`src/data/editions.ts`](src/data/editions.ts).**
Nu trebuie să atingi nicio componentă și nicio rută — pagina ediției, linkul din meniu,
programul de pe prima pagină și arhiva se generează automat din datele de acolo.

### 1. Adaugi un obiect la **începutul** listei `editions`

Lista este ordonată de la cea mai nouă la cea mai veche. **Primul element din listă devine
automat ediția curentă** (`currentEdition`) — cea afișată pe prima pagină și în butonul din
meniul de sus.

```ts
export const editions: Edition[] = [
  {
    id: "2027-primavara",          // cheie unică, folosită intern
    year: 2027,
    season: "primavara",           // "primavara" | "vara" | "toamna" → dă URL-ul /2027/primavara
    label: "Primăvară 2027",       // eticheta afișată peste tot
    period: "6 martie – 15 mai 2027",
    tagline: "O propoziție scurtă, apare în hero și pe cardul din arhivă.",
    description: "Paragraful lung, apare în secțiunea „Despre ediție”.",
    location: "București, format fizic",

    // Doar cât timp înscrierile sunt deschise:
    applyUrl: "https://forms.gle/xxxxxxxx",
    applyDeadline: "2027-03-01",   // format ISO (AAAA-LL-ZZ)

    program: [ /* vezi mai jos */ ],
    mentors: [ /* vezi mai jos */ ],
    sponsors: [ /* vezi mai jos */ ],
  },
  // ...edițiile anterioare
];
```

### 2. Completezi programul

Fiecare ședință are un `kind` care îi dă culoarea și eticheta din timeline:

| `kind` | Etichetă | Când îl folosești |
| --- | --- | --- |
| `"workshop"` | Atelier | ședințele tehnice din prima parte |
| `"hackathon"` | Hackathon | ședințele de lucru la proiect |
| `"final"` | Final | prezentările finale / festivitatea |
| `"liber"` | Liber | weekendurile libere (apar estompate) |

```ts
program: [
  { date: "Sâmbătă, 6 martie 2027", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
  { date: "Sâmbătă, 13 martie 2027", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
  { date: "Sâmbătă, 20 martie 2027", time: "—",     title: "Pauză", kind: L },
  { date: "Sâmbătă, 15 mai 2027",   time: "17–22", title: "Prezentări finale. Festivitate de absolvire", kind: F },
],
```

`W`, `H`, `F`, `L` sunt prescurtări definite în capul fișierului (`workshop`, `hackathon`,
`final`, `liber`). Poți scrie și direct `kind: "workshop"`.

Numărul de ateliere și de hackathoane afișat pe carduri se calculează singur din listă.

### 3. Adaugi mentorii

Secțiunea de mentori apare pe pagina fiecărei ediții. Singurul câmp obligatoriu este `name`:

```ts
mentors: [
  {
    name: "Nume Prenume",
    role: "instructor",                          // sau "mentor" — opțional
    project: "coala",                            // proiectul coordonat — opțional
    projectUrl: "https://github.com/coala",      // opțional
    github: "username",                          // opțional, devine link către profil
    avatar: "/img/mentori/nume-prenume.jpg",     // opțional — fără el se afișează inițialele
    bio: "O propoziție-două despre ce face.",    // opțional
  },
],
```

Pozele mentorilor se pun în [`public/img/mentori/`](public/img/mentori) și se referă cu calea
`/img/mentori/<fisier>`. Recomandat: pătrate, minim 200×200px.

**Dacă `mentors` este o listă goală sau lipsește:**
- pentru **ediția curentă** secțiunea apare cu mesajul „Echipa se anunță în curând”;
- pentru **edițiile trecute** secțiunea nu apare deloc.

### 4. Adaugi sponsorii (când îi ai)

Secțiunea de sponsori apare **după** cea de mentori și **numai dacă ediția are sponsori** —
până atunci nu se vede nimic pe pagină, nu e nevoie de niciun placeholder.

```ts
sponsors: [
  { name: "Nume Companie", tier: "principal",   url: "https://...", logo: "/img/sponsori/companie.svg" },
  { name: "Alt Partener",  tier: "partener",    url: "https://..." },
  { name: "Susținător",    tier: "sustinator" },
],
```

Nivelurile (`tier`) grupează sponsorii și le dau dimensiunea logo-ului:

| `tier` | Titlu afișat | Așezare |
| --- | --- | --- |
| `"principal"` | Sponsor principal | logo-uri mari, 2 pe rând |
| `"partener"` | Partener | logo-uri medii, până la 4 pe rând |
| `"sustinator"` | Susținător | logo-uri medii, până la 4 pe rând |

Dacă omiți `tier`, sponsorul e tratat ca `"partener"`. Dacă omiți `logo`, se afișează numele
ca text. Logo-urile se pun în [`public/img/sponsori/`](public/img/sponsori) — de preferat SVG
sau PNG transparent, deschis la culoare (fundalul site-ului e întunecat).

### 5. Când se închid înscrierile

Ștergi `applyUrl` din obiectul ediției. Butonul de înscriere din hero, bannerul de pe pagina
ediției și secțiunea de call-to-action de pe prima pagină dispar automat.

---

## Edițiile istorice

Edițiile 2013–2020 au rămas pe vechiul site Jekyll și sunt listate ca linkuri externe în
`legacyEditions`, tot din `src/data/editions.ts`. Dacă vrei să migrezi vreuna, o muți în
lista `editions` cu structura de mai sus.

## Deploy pe Vercel

1. Import repo în Vercel — framework preset **Vite**, build `npm run build`, output `dist`.
2. [`vercel.json`](vercel.json) conține rewrite-ul către `index.html`, necesar pentru rutele
   client-side (fără el, `/2026/toamna` dă 404 la refresh).
3. Pentru domeniu: `cdl.rosedu.org` → CNAME către Vercel, în locul GitHub Pages.
