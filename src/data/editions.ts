import { projects2026Summer } from "./projects-2026-summer";

export type Season = "spring" | "summer" | "fall" | "unibuc" | "etti" | "extended";

export type Session = {
  date: string;
  time: string;
  title: string;
  kind: "workshop" | "hackathon" | "final" | "break";
};

export type Mentor = {
  /** id used in `Project.mentors` */
  id: string;
  name: string;
  /** contact addresses; the first one is shown first in the dialog */
  emails?: string[];
  github?: string;
  /** path to a photo, e.g. "/img/mentors/name.jpg"; omitted => initials */
  avatar?: string;
  bio?: string;
};

export type Project = {
  name: string;
  /** project page; the name links to it */
  url?: string;
  /** what is worked on during the edition */
  feature?: string;
  /** ids of the mentors coordinating the project */
  mentors: string[];
  /** where to start: repo, issue, pull requests to review */
  startingPoint?: string;
  /** link to the communication channel (Discord, Telegram, Slack) */
  channel?: string;
  /** channel name, e.g. "Unikraft Discord, #cdl-ro" */
  channelLabel?: string;
  /** seats available, e.g. "2-5 seats" */
  slots?: string;
};

export type SponsorTier = "main" | "partner" | "supporter";

export type Sponsor = {
  name: string;
  url?: string;
  /** path to a logo, e.g. "/img/sponsors/name.svg"; omitted => name as text */
  logo?: string;
  tier?: SponsorTier;
};

export type Edition = {
  /** unique key, e.g. "2025-fall" */
  id: string;
  year: number;
  season?: Season;
  /** displayed label, e.g. "Fall 2025" */
  label: string;
  /** short period, e.g. "October - December 2025" */
  period: string;
  tagline: string;
  description: string;
  /** link to the application form (only while applications are open) */
  applyUrl?: string;
  /** application deadline, ISO format */
  applyDeadline?: string;
  location?: string;
  program: Session[];
  /** link to the spreadsheet listing the open source projects */
  projectsUrl?: string;
  /**
   * Date from which the project list becomes public (ISO, YYYY-MM-DD).
   * Before it, the button is disabled and shows the release date.
   * Omitted => the list is public as soon as `projectsUrl` is set.
   */
  projectsPublicFrom?: string;
  /** the edition's mentors; empty list => the section shows "coming soon" */
  mentors?: Mentor[];
  /** the edition's open source projects, grouped per mentor in the dialog */
  projects?: Project[];
  /** the edition's sponsors; omitted or empty => the section is not rendered */
  sponsors?: Sponsor[];
  /** the old website, for archived editions */
  legacyUrl?: string;
};

const W = "workshop" as const;
const H = "hackathon" as const;
const F = "final" as const;
const B = "break" as const;

export const editions: Edition[] = [
  {
    id: "2026-fall",
    year: 2026,
    season: "fall",
    label: "Fall 2026",
    period: "10 October - 12 December 2026",
    tagline: "Ten Saturdays of open source, from your first commit to the final presentation.",
    description:
      "Five technical workshops — Git, advanced Git and GitHub, Markdown, Docker, automation and CI/CD — followed by hackathons where you work on a real open source project alongside a mentor.",

    // To open applications, uncomment the line below and add the form link.
    // The "Applications open" banner then appears automatically on the home
    // page and on the edition page, and disappears on its own after
    // `applyDeadline`.
    applyUrl: "https://forms.gle/E4Tad1aPZH6cr6No7",
    applyDeadline: "2026-10-08",

    location: "Bucharest, in person",

    // Link to the project spreadsheet. The button only shows on the current
    // edition and becomes active on `projectsPublicFrom`, shortly before the
    // first hackathon on 14 November 2026.
    // projectsUrl: "https://docs.google.com/spreadsheets/d/...",
    projectsPublicFrom: "2026-11-09",

    program: [
      { date: "Saturday, 10 October 2026", time: "10:00-13:00", title: "Version control with Git", kind: W },
      { date: "Saturday, 17 October 2026", time: "10:00-13:00", title: "Advanced Git and collaborative development with GitHub", kind: W },
      { date: "Saturday, 24 October 2026", time: "10:00-13:00", title: "Documentation and the Markdown format", kind: W },
      { date: "Saturday, 31 October 2026", time: "10:00-13:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Sunday, 8 November 2026", time: "10:00-13:00", title: "Automation and CI/CD with GitHub Actions", kind: W },
      { date: "Saturday, 14 November 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 21 November 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 28 November 2026", time: "—", title: "Break", kind: B },
      { date: "Saturday, 5 December 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 12 December 2026", time: "17:00-22:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
  {
    id: "2026-summer",
    year: 2026,
    season: "summer",
    label: "Summer 2026",
    period: "23 June - 11 July 2026",
    tagline: "Nine intensive sessions, three weeks, one open source project.",
    description:
      "The intensive summer edition: Tuesdays, Thursdays and Saturdays over three weeks. Five technical workshops, followed by four hackathons working on a real open source project alongside a mentor.",
    // Applications closed on 20 June 2026.
    location: "Bucharest, in person",

    mentors: [
      {
        id: "razvan-deaconescu",
        name: "Răzvan Deaconescu",
        emails: ["razvand@unikraft.io", "razvan.deaconescu@upb.ro"],
        avatar: "/img/mentors/razvan-deaconescu.svg",
      },
      {
        id: "radu-marias",
        name: "Radu Mariaș",
        emails: ["radumarias@gmail.com"],
        github: "radumarias",
        avatar: "/img/mentors/radu-marias.svg",
      },
      {
        id: "anton-kulaga",
        name: "Anton Kulaga",
        emails: ["antonkulaga@gmail.com"],
        github: "antonkulaga",
        avatar: "/img/mentors/anton-kulaga.svg",
      },
      {
        id: "livia-zaharia",
        name: "Livia Zaharia",
        emails: ["liviazaharia2020@gmail.com"],
        avatar: "/img/mentors/livia-zaharia.svg",
      },
    ],
    projects: projects2026Summer,

    program: [
      { date: "Tuesday, 23 June 2026", time: "09:00-12:00", title: "Version control with Git", kind: W },
      { date: "Thursday, 25 June 2026", time: "09:00-12:00", title: "Advanced Git. Collaborative development with GitHub", kind: W },
      { date: "Saturday, 27 June 2026", time: "10:00-13:00", title: "The Markdown format", kind: W },
      { date: "Tuesday, 30 June 2026", time: "09:00-12:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Thursday, 2 July 2026", time: "09:00-12:00", title: "Automation with GitHub", kind: W },
      { date: "Saturday, 4 July 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Tuesday, 7 July 2026", time: "09:00-12:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Thursday, 9 July 2026", time: "09:00-12:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 11 July 2026", time: "10:00-18:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
  {
    id: "2026-spring",
    year: 2026,
    season: "spring",
    label: "Spring 2026",
    period: "8 March - 16 May 2026",
    tagline: "The spring edition, one session per weekend.",
    description:
      "Eleven weekends of Git, GitHub, Markdown, Docker and software engineering best practices, wrapped up with hackathons on open source projects.",
    location: "Bucharest, in person",
    program: [
      { date: "Sunday, 8 March 2026", time: "10:00-13:00", title: "Version control with Git", kind: W },
      { date: "Saturday, 14 March 2026", time: "10:00-13:00", title: "Collaborative development with GitHub", kind: W },
      { date: "Saturday, 21 March 2026", time: "10:00-13:00", title: "The Markdown format", kind: W },
      { date: "Sunday, 29 March 2026", time: "10:00-13:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Sunday, 4 April 2026", time: "10:00-13:00", title: "Software engineering best practices", kind: W },
      { date: "Saturday, 11 April 2026", time: "—", title: "Break", kind: B },
      { date: "Saturday, 18 April 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 25 April 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 2 May 2026", time: "—", title: "Break", kind: B },
      { date: "Saturday, 9 May 2026", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 16 May 2026", time: "17:00-22:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
  {
    id: "2025-fall",
    year: 2025,
    season: "fall",
    label: "Fall 2025",
    period: "11 October - 13 December 2025",
    tagline: "The 2025 fall edition.",
    description:
      "Ten Saturday sessions: technical workshops in the first half, hackathons on open source projects in the second.",
    location: "Bucharest, in person",
    program: [
      { date: "Saturday, 11 October 2025", time: "10:00-13:00", title: "Version control with Git", kind: W },
      { date: "Saturday, 18 October 2025", time: "10:00-13:00", title: "Collaborative development with GitHub", kind: W },
      { date: "Saturday, 25 October 2025", time: "10:00-13:00", title: "The Markdown format", kind: W },
      { date: "Saturday, 1 November 2025", time: "10:00-13:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Sunday, 8 November 2025", time: "10:00-13:00", title: "Software engineering best practices", kind: W },
      { date: "Saturday, 15 November 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 22 November 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 29 November 2025", time: "—", title: "Break", kind: B },
      { date: "Saturday, 6 December 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 13 December 2025", time: "17:00-22:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
  {
    id: "2025-spring",
    year: 2025,
    season: "spring",
    label: "Spring 2025",
    period: "8 March - 17 May 2025",
    tagline: "The 2025 spring edition.",
    description:
      "Eleven weekend sessions, from your first commits to contributions accepted in open source projects.",
    location: "Bucharest, in person",
    program: [
      { date: "Saturday, 8 March 2025", time: "10:00-13:00", title: "Version control with Git", kind: W },
      { date: "Saturday, 15 March 2025", time: "10:00-13:00", title: "Collaborative development with GitHub", kind: W },
      { date: "Saturday, 22 March 2025", time: "10:00-13:00", title: "The Markdown format", kind: W },
      { date: "Saturday, 29 March 2025", time: "10:00-13:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Sunday, 6 April 2025", time: "10:00-13:00", title: "Software engineering best practices", kind: W },
      { date: "Saturday, 12 April 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 19 April 2025", time: "—", title: "Break", kind: B },
      { date: "Saturday, 26 April 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 3 May 2025", time: "—", title: "Break", kind: B },
      { date: "Saturday, 10 May 2025", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 17 May 2025", time: "17:00-22:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
  {
    id: "2024-fall",
    year: 2024,
    season: "fall",
    label: "Fall 2024",
    period: "12 October - 14 December 2024",
    tagline: "CDL relaunched, after a four-year break.",
    description:
      "The first edition since 2020: ten Saturday sessions with workshops on Git, GitHub, Markdown, Docker and best practices, followed by hackathons on open source projects.",
    location: "Bucharest, in person",
    program: [
      { date: "Saturday, 12 October 2024", time: "10:00-13:00", title: "Version control with Git", kind: W },
      { date: "Saturday, 19 October 2024", time: "10:00-13:00", title: "Collaborative development with GitHub", kind: W },
      { date: "Saturday, 26 October 2024", time: "10:00-13:00", title: "The Markdown format", kind: W },
      { date: "Saturday, 2 November 2024", time: "10:00-13:00", title: "Development environments and deployment with Docker", kind: W },
      { date: "Saturday, 9 November 2024", time: "10:00-13:00", title: "Software engineering best practices", kind: W },
      { date: "Saturday, 16 November 2024", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 23 November 2024", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 30 November 2024", time: "—", title: "Break", kind: B },
      { date: "Saturday, 7 December 2024", time: "10:00-13:00", title: "Hackathon: work on an open source project", kind: H },
      { date: "Saturday, 14 December 2024", time: "10:00-13:00", title: "Final presentations. Graduation", kind: F },
    ],
  },
];

/** Archived editions, kept on the old website. */
export const legacyEditions = [
  { id: "2020", year: 2020, label: "CDL 2020", url: "https://cdl.rosedu.org/editions/2020" },
  { id: "2019", year: 2019, label: "CDL 2019", url: "https://cdl.rosedu.org/editions/2019" },
  { id: "2018", year: 2018, label: "CDL 2018", url: "https://cdl.rosedu.org/editions/2018" },
  { id: "2017", year: 2017, label: "CDL 2017", url: "https://cdl.rosedu.org/editions/2017" },
  { id: "2016", year: 2016, label: "CDL 2016", url: "https://cdl.rosedu.org/editions/2016" },
  { id: "2015", year: 2015, label: "CDL 2015", url: "https://cdl.rosedu.org/editions/2015" },
  { id: "etti-2014", year: 2014, label: "CDL ETTI 2014", url: "https://cdl.rosedu.org/editions/etti_2014" },
  { id: "extended-2014", year: 2014, label: "CDL Extended 2014", url: "https://cdl.rosedu.org/editions/extended_2014" },
  { id: "spring-2013", year: 2013, label: "CDL Spring 2013", url: "https://cdl.rosedu.org/editions/spring_2013" },
  { id: "unibuc-2013", year: 2013, label: "CDL Unibuc 2013", url: "https://cdl.rosedu.org/editions/unibuc_2013" },
];

/** Romanian season slugs used before the site was translated; kept as redirects. */
export const legacySeasonSlugs: Record<string, Season> = {
  primavara: "spring",
  vara: "summer",
  toamna: "fall",
};

export const editionPath = (e: Edition) => (e.season ? `/${e.year}/${e.season}` : `/${e.year}`);

export const findEdition = (year: string, season?: string) =>
  editions.find((e) => String(e.year) === year && (season ? e.season === season : !e.season));

/**
 * Parse a "YYYY-MM-DD" field as local midnight. Passing the bare string to
 * `new Date()` would read it as midnight UTC, so in Romania a date would only
 * take effect at 02:00 or 03:00 local time.
 */
export const parseDay = (iso: string) => new Date(`${iso}T00:00`);

/** Sessions that actually take place — breaks are scheduled gaps, not sessions. */
export const sessionCount = (edition: Edition) =>
  edition.program.filter((s) => s.kind !== "break").length;

/** The day of a program entry, parsed from its "Weekday, D Month YYYY" label. */
export const sessionDate = (session: Session) => {
  const parsed = new Date(session.date.replace(/^[^,]+,\s*/, ""));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/** The day the edition ends, parsed from the last entry in the program. */
export const editionEnd = (edition: Edition) => {
  const last = edition.program.at(-1);
  return last ? sessionDate(last) : null;
};

/**
 * The moment the application link goes away: the start of the first session.
 * Late applications are accepted past the advertised deadline, but not once
 * the course is under way. The time of day comes from the session's `time`
 * label ("10:00-13:00" -> 10:00); without a usable one it falls back to
 * midnight that day.
 */
export const applyWindowEnd = (edition: Edition) => {
  const first = edition.program.find((s) => s.kind !== "break");
  const day = first ? sessionDate(first) : null;
  if (!day || !first) return null;
  const start = first.time.match(/^(\d{1,2}):(\d{2})/);
  if (start) day.setHours(Number(start[1]), Number(start[2]), 0, 0);
  else day.setHours(0, 0, 0, 0);
  return day;
};

/**
 * True once the edition's project list is public: it needs a spreadsheet link,
 * and either no release date or one that has already arrived.
 * The comparison uses the visitor's own clock — see the README.
 */
export const isProjectListPublic = (edition: Edition) =>
  Boolean(edition.projectsUrl) && (!edition.projectsPublicFrom || new Date() >= parseDay(edition.projectsPublicFrom));

/** True while the edition has not finished yet. */
export const isUpcoming = (edition: Edition) => {
  const end = editionEnd(edition);
  return !end || end >= new Date();
};

/** The current edition: the most recent one (the list is ordered newest first). */
export const currentEdition = editions[0];

/**
 * Applications are open only if the edition has a form, is the current edition,
 * and the first session has not started yet. The `applyDeadline` is what gets
 * advertised, not what closes the form — see `isLateApplication`.
 *
 * Requiring the current edition keeps an old one from advertising open
 * applications just because its form link is still in the data.
 */
export const isApplyOpen = (edition: Edition) => {
  if (!edition.applyUrl || edition.id !== currentEdition.id) return false;
  const end = applyWindowEnd(edition);
  return !end || new Date() <= end;
};

/**
 * True once the advertised deadline has passed while the form is still up, so
 * the page can say applications are late rather than quote a deadline that has
 * already gone by.
 */
export const isLateApplication = (edition: Edition) => {
  if (!edition.applyDeadline) return false;
  const deadline = parseDay(edition.applyDeadline);
  deadline.setHours(23, 59, 59, 999);
  return new Date() > deadline;
};

/**
 * The projects coordinated by a mentor during an edition.
 * A project with several tracks appears once: in the data each track is a
 * separate entry, but the dialog only shows the project name.
 */
export const projectsByMentor = (edition: Edition, mentorId: string) => {
  const seen = new Set<string>();
  return (edition.projects ?? []).filter((p) => {
    if (!p.mentors.includes(mentorId)) return false;
    const key = `${p.name}|${p.url ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
