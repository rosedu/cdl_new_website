export type Season = "primavara" | "vara" | "toamna" | "unibuc" | "etti" | "extended";

export type Session = {
  date: string;
  time: string;
  title: string;
  kind: "workshop" | "hackathon" | "final" | "liber";
};

export type Mentor = {
  name: string;
  /** rolul in editie, ex. "instructor" sau "mentor" */
  role?: string;
  /** proiectul open source coordonat */
  project?: string;
  projectUrl?: string;
  github?: string;
  /** cale catre poza, ex. "/img/mentori/nume.jpg"; lipsa => initiale */
  avatar?: string;
  bio?: string;
};

export type SponsorTier = "principal" | "partener" | "sustinator";

export type Sponsor = {
  name: string;
  url?: string;
  /** cale catre logo, ex. "/img/sponsori/nume.svg"; lipsa => doar numele */
  logo?: string;
  tier?: SponsorTier;
};

export type Edition = {
  /** cheie unica, ex. "2025-toamna" */
  id: string;
  year: number;
  season?: Season;
  /** eticheta afisata, ex. "Toamnă 2025" */
  label: string;
  /** perioada pe scurt, ex. "octombrie – decembrie 2025" */
  period: string;
  tagline: string;
  description: string;
  /** link catre formularul de inscriere (daca inscrierile sunt deschise) */
  applyUrl?: string;
  /** termen limita de inscriere, format ISO */
  applyDeadline?: string;
  location?: string;
  program: Session[];
  /** instructorii si mentorii editiei; lista goala => sectiunea arata "in curand" */
  mentors?: Mentor[];
  /** sponsorii si partenerii editiei; lipsa sau lista goala => sectiunea nu apare deloc */
  sponsors?: Sponsor[];
  /** site-ul vechi, pentru editiile arhivate */
  legacyUrl?: string;
  highlights?: string[];
};

const W = "workshop" as const;
const H = "hackathon" as const;
const F = "final" as const;
const L = "liber" as const;

export const editions: Edition[] = [
  {
    id: "2026-toamna",
    year: 2026,
    season: "toamna",
    label: "Toamnă 2026",
    period: "10 octombrie – 12 decembrie 2026",
    tagline: "Zece sâmbete de open source, de la primul commit la prezentarea finală.",
    description:
      "Ediția de toamnă 2026: cinci ateliere tehnice — Git, GitHub, Markdown, Docker și bune practici de inginerie software — urmate de hackathoane în care lucrezi la un proiect open source real, alături de un mentor.",
    // Când se deschid înscrierile, adaugă aici linkul către formular și termenul limită:
    // applyUrl: "https://forms.gle/...",
    // applyDeadline: "2026-10-05",
    location: "București, format fizic",
    mentors: [],
    program: [
      { date: "Sâmbătă, 10 octombrie 2026", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Sâmbătă, 17 octombrie 2026", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 24 octombrie 2026", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Sâmbătă, 31 octombrie 2026", time: "10–13", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Duminică, 8 noiembrie 2026", time: "10–13", title: "Bune practici în inginerie", kind: W },
      { date: "Sâmbătă, 14 noiembrie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 21 noiembrie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 28 noiembrie 2026", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 5 decembrie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 12 decembrie 2026", time: "17–22", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
  {
    id: "2026-vara",
    year: 2026,
    season: "vara",
    label: "Vară 2026",
    period: "23 iunie – 11 iulie 2026",
    tagline: "Nouă ședințe intensive, trei săptămâni, un proiect open source.",
    description:
      "Ediția intensivă de vară: marți, joi și sâmbătă, timp de trei săptămâni. Cinci ateliere tehnice, urmate de patru hackathoane în care lucrezi la un proiect open source real, alături de un mentor.",
    applyUrl: "https://forms.gle/34RRJGdcK4ymn7kBA",
    applyDeadline: "2026-06-20",
    location: "București, format fizic",
    program: [
      { date: "Marți, 23 iunie 2026", time: "09–12", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Joi, 25 iunie 2026", time: "09–12", title: "Tehnici avansate de Git. Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 27 iunie 2026", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Marți, 30 iunie 2026", time: "09–12", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Joi, 2 iulie 2026", time: "09–12", title: "Automatizare folosind GitHub", kind: W },
      { date: "Sâmbătă, 4 iulie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Marți, 7 iulie 2026", time: "09–12", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Joi, 9 iulie 2026", time: "09–12", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 11 iulie 2026", time: "10–18", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
  {
    id: "2026-primavara",
    year: 2026,
    season: "primavara",
    label: "Primăvară 2026",
    period: "8 martie – 16 mai 2026",
    tagline: "Ediția de primăvară, câte o ședință pe weekend.",
    description:
      "Unsprezece weekenduri de Git, GitHub, Markdown, Docker și bune practici de inginerie software, încheiate cu hackathoane pe proiecte open source.",
    location: "București, format fizic",
    program: [
      { date: "Duminică, 8 martie 2026", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Sâmbătă, 14 martie 2026", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 21 martie 2026", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Duminică, 29 martie 2026", time: "10–13", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Duminică, 4 aprilie 2026", time: "10–13", title: "Bune practici în inginerie", kind: W },
      { date: "Sâmbătă, 11 aprilie 2026", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 18 aprilie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 25 aprilie 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 2 mai 2026", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 9 mai 2026", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 16 mai 2026", time: "17–22", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
  {
    id: "2025-toamna",
    year: 2025,
    season: "toamna",
    label: "Toamnă 2025",
    period: "11 octombrie – 13 decembrie 2025",
    tagline: "Ediția de toamnă 2025.",
    description:
      "Zece ședințe de sâmbătă: ateliere tehnice în prima parte, hackathoane pe proiecte open source în a doua.",
    location: "București, format fizic",
    program: [
      { date: "Sâmbătă, 11 octombrie 2025", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Sâmbătă, 18 octombrie 2025", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 25 octombrie 2025", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Sâmbătă, 1 noiembrie 2025", time: "10–13", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Duminică, 8 noiembrie 2025", time: "10–13", title: "Bune practici în inginerie", kind: W },
      { date: "Sâmbătă, 15 noiembrie 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 22 noiembrie 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 29 noiembrie 2025", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 6 decembrie 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 13 decembrie 2025", time: "17–22", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
  {
    id: "2025-primavara",
    year: 2025,
    season: "primavara",
    label: "Primăvară 2025",
    period: "8 martie – 17 mai 2025",
    tagline: "Ediția de primăvară 2025.",
    description:
      "Unsprezece ședințe de weekend, de la primii commits până la contribuții acceptate în proiecte open source.",
    location: "București, format fizic",
    program: [
      { date: "Sâmbătă, 8 martie 2025", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Sâmbătă, 15 martie 2025", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 22 martie 2025", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Sâmbătă, 29 martie 2025", time: "10–13", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Duminică, 6 aprilie 2025", time: "10–13", title: "Bune practici în inginerie", kind: W },
      { date: "Sâmbătă, 12 aprilie 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 19 aprilie 2025", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 26 aprilie 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 3 mai 2025", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 10 mai 2025", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 17 mai 2025", time: "17–22", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
  {
    id: "2024-toamna",
    year: 2024,
    season: "toamna",
    label: "Toamnă 2024",
    period: "12 octombrie – 14 decembrie 2024",
    tagline: "Relansarea CDL, după o pauză de patru ani.",
    description:
      "Prima ediție după 2020: zece ședințe de sâmbătă, ateliere de Git, GitHub, Markdown, Docker și bune practici, apoi hackathoane pe proiecte open source.",
    location: "București, format fizic",
    program: [
      { date: "Sâmbătă, 12 octombrie 2024", time: "10–13", title: "Controlul versiunilor folosind Git", kind: W },
      { date: "Sâmbătă, 19 octombrie 2024", time: "10–13", title: "Dezvoltare colaborativă cu GitHub", kind: W },
      { date: "Sâmbătă, 26 octombrie 2024", time: "10–13", title: "Formatul Markdown", kind: W },
      { date: "Sâmbătă, 2 noiembrie 2024", time: "10–13", title: "Medii de lucru, dezvoltare și deployment cu Docker", kind: W },
      { date: "Sâmbătă, 9 noiembrie 2024", time: "10–13", title: "Bune practici în ingineria software", kind: W },
      { date: "Sâmbătă, 16 noiembrie 2024", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 23 noiembrie 2024", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 30 noiembrie 2024", time: "—", title: "Pauză", kind: L },
      { date: "Sâmbătă, 7 decembrie 2024", time: "10–13", title: "Hackathon: lucru la proiect open source", kind: H },
      { date: "Sâmbătă, 14 decembrie 2024", time: "10–13", title: "Prezentări finale. Festivitate de absolvire", kind: F },
    ],
  },
];

/** Editii arhivate, pastrate pe site-ul vechi. */
export const legacyEditions = [
  { id: "2020", year: 2020, label: "CDL 2020", url: "https://cdl.rosedu.org/editions/2020" },
  { id: "2019", year: 2019, label: "CDL 2019", url: "https://cdl.rosedu.org/editions/2019" },
  { id: "2018", year: 2018, label: "CDL 2018", url: "https://cdl.rosedu.org/editions/2018" },
  { id: "2017", year: 2017, label: "CDL 2017", url: "https://cdl.rosedu.org/editions/2017" },
  { id: "2016", year: 2016, label: "CDL 2016", url: "https://cdl.rosedu.org/editions/2016" },
  { id: "2015", year: 2015, label: "CDL 2015", url: "https://cdl.rosedu.org/editions/2015" },
  { id: "etti-2014", year: 2014, label: "CDL ETTI 2014", url: "https://cdl.rosedu.org/editions/etti_2014" },
  { id: "extended-2014", year: 2014, label: "CDL Extended 2014", url: "https://cdl.rosedu.org/editions/extended_2014" },
  { id: "primavara-2013", year: 2013, label: "CDL Primăvară 2013", url: "https://cdl.rosedu.org/editions/spring_2013" },
  { id: "unibuc-2013", year: 2013, label: "CDL Unibuc 2013", url: "https://cdl.rosedu.org/editions/unibuc_2013" },
];

export const seasonLabel: Record<Season, string> = {
  primavara: "Primăvară",
  vara: "Vară",
  toamna: "Toamnă",
  unibuc: "Unibuc",
  etti: "ETTI",
  extended: "Extended",
};

export const editionPath = (e: Edition) => (e.season ? `/${e.year}/${e.season}` : `/${e.year}`);

export const findEdition = (year: string, season?: string) =>
  editions.find((e) => String(e.year) === year && (season ? e.season === season : !e.season));

/** Editia curenta: cea mai recenta din lista (lista e ordonata descrescator). */
export const currentEdition = editions[0];
