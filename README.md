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
| `/:an/:sezon#mentori` | secțiunea de mentori a ediției; click pe un mentor deschide proiectele lui |
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

    // Lista de proiecte — doar la ediția curentă, vezi secțiunea de mai jos:
    projectsUrl: "https://docs.google.com/spreadsheets/d/xxxxxxxx",
    projectsPublicFrom: "2027-04-10",

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

Secțiunea **Mentori** apare pe pagina fiecărei ediții. Fiecare mentor e un card pe care dai
click și se deschide un dialog cu poza, adresele de email și proiectele pe care le coordonează.

```ts
mentors: [
  {
    id: "nume-prenume",                          // obligatoriu, leagă mentorul de proiectele lui
    name: "Nume Prenume",
    emails: ["adresa@exemplu.ro"],               // una sau mai multe; toate devin linkuri mailto
    github: "username",                          // opțional
    avatar: "/img/mentori/nume-prenume.jpg",     // opțional — fără el se afișează inițialele
    bio: "O propoziție-două despre ce face.",    // opțional
  },
],
```

`id` este cheia care leagă mentorul de proiecte — trebuie să fie unic în cadrul ediției și să
apară identic în `mentors` din fiecare proiect.

**Pozele** se pun în [`public/img/mentori/`](public/img/mentori) și se referă cu calea
`/img/mentori/<fisier>`. Recomandat: pătrate, minim 200×200px, JPG sau PNG.

Mentorii ediției de toamnă 2026 au momentan avatare generate (fișierele `.svg` din acel
folder). Ca să pui pozele reale, copiezi imaginea în folder și schimbi extensia din `avatar`:

```ts
avatar: "/img/mentori/razvan-deaconescu.jpg",   // în loc de .svg
```

Dacă fișierul din `avatar` lipsește sau nu se încarcă, cardul afișează automat inițialele
mentorului pe un fundal în degrade — nu rămâne nicio imagine ruptă.

**Dacă `mentors` este o listă goală sau lipsește:**
- pentru **ediția curentă** secțiunea apare cu mesajul „Mentorii se anunță în curând”;
- pentru **edițiile trecute** secțiunea nu apare deloc.

### 3b. Adaugi proiectele mentorilor

Proiectele stau într-un fișier separat per ediție, ca să nu se umfle `editions.ts` —
vezi [`src/data/projects-2026-toamna.ts`](src/data/projects-2026-toamna.ts). Îl imporți în
`editions.ts` și îl pui pe câmpul `projects` al ediției.

```ts
{
  name: "rencfs",                                       // devine link către `url`
  url: "https://github.com/xoriors/rencfs",
  mentors: ["radu-marias"],                             // unul sau mai mulți, după `id`

  // Câmpuri opționale, păstrate în date dar neafișate în dialog:
  feature: "Ce anume se lucrează la proiect.",
  startingPoint: "https://github.com/xoriors/rencfs/issues/236",
  channel: "https://discord.gg/xxxxxxx",
  channelLabel: "Discord, alege CDL pentru acces la canal",
  slots: "1–2 locuri",
}
```

Dialogul mentorului afișează **doar numele proiectelor**, fiecare link către `url`. Un proiect
cu mai multe teme se scrie ca intrări separate cu același `name` și `url` (ex. `rencfs` are
trei), dar apare o singură dată în listă — dedublarea se face după `name` + `url`.

Un proiect cu mai mulți mentori se pune o singură dată, cu toate id-urile în `mentors` — apare
în dialogul fiecăruia dintre ei.

Doar `name` și `mentors` sunt obligatorii. Numărul de proiecte afișat pe cardul mentorului se
calculează automat, după dedublare.

### 4. Publici lista de proiecte

Lista de proiecte open source dintre care își aleg participanții este un spreadsheet extern.
Butonul **„Vezi lista de proiecte"** apare în hero-ul primei pagini și al paginii de ediție,
**doar pentru ediția curentă** — edițiile trecute nu îl arată deloc.

```ts
projectsUrl: "https://docs.google.com/spreadsheets/d/xxxxxxxx",
projectsPublicFrom: "2026-11-09",   // ziua în care lista devine publică
```

Comportamentul butonului:

| Situație | Ce se vede |
| --- | --- |
| `projectsUrl` completat și data din `projectsPublicFrom` a trecut | buton activ, deschide spreadsheet-ul într-un tab nou |
| `projectsPublicFrom` este în viitor, sau `projectsUrl` lipsește | buton inactiv, cu textul „Lista de proiecte · din 9 noiembrie 2026" |
| `projectsUrl` completat, fără `projectsPublicFrom` | buton activ imediat |
| ediția nu este cea curentă | butonul nu apare |

Pune `projectsPublicFrom` cu câteva zile înainte de primul hackathon, ca participanții să aibă
timp să se uite peste proiecte. Nu trebuie să revii pe site în ziua respectivă — butonul se
activează singur.

Spreadsheet-ul trebuie să fie partajat cu „oricine are linkul, poate vedea”.

### 5. Adaugi sponsorii (când îi ai)

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

### 6. Deschizi și închizi înscrierile

Bannerul **„Înscrieri deschise"** de pe prima pagină, butonul din hero și bannerul de pe pagina
ediției apar toate pe baza acelorași două câmpuri:

```ts
applyUrl: "https://forms.gle/xxxxxxxx",
applyDeadline: "2026-10-05",
```

Ca să le afișezi, e suficient să pui `applyUrl` pe ediție. Ca să le ascunzi, ai două variante:
lași termenul din `applyDeadline` să treacă — dispar singure la sfârșitul acelei zile — sau
ștergi `applyUrl`.

Înscrierile se consideră deschise **doar pentru ediția curentă** (prima din listă). O ediție
veche căreia i-a rămas `applyUrl` în date nu mai anunță înscrieri, oricât de vechi ar fi
formularul.

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
