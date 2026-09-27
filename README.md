# CDL — Community Development Lab

The [cdl.rosedu.org](https://cdl.rosedu.org) website, rewritten in React and ready to deploy on Vercel.

**Stack:** Vite + React 19 + TypeScript + React Router + Tailwind CSS v4.

## Running locally

```bash
npm install
```

```bash
npm run dev
```

Production build: `npm run build` (output in `dist/`).

## Routes

| Route | Content |
| --- | --- |
| `/` | home page — intro, about, current edition program, archive |
| `/:year/:season` | an edition page, e.g. `/2026/fall`, `/2025/spring` |
| `/:year/:season#mentors` | the edition's mentor section; selecting a mentor opens their projects |
| `/:year/:season#sponsors` | sponsors and partners (only rendered if the edition has sponsors) |
| `/editions` | every edition, including the historical ones (2013–2020) |
| anything else | 404 page |

Season slugs: `spring`, `summer`, `fall`. The Romanian slugs used before the site was
translated (`primavara`, `vara`, `toamna`) redirect to their English equivalents, so older
links keep working — see `legacySeasonSlugs` in `src/data/editions.ts`.

---

## Adding a new edition

**All content lives in one file: [`src/data/editions.ts`](src/data/editions.ts).** You never
need to touch a component or a route — the edition page, the menu link, the home page program
and the archive are all generated from that data.

### 1. Add an object at the **top** of the `editions` list

The list is ordered newest first. **The first entry automatically becomes the current
edition** (`currentEdition`) — the one shown on the home page and in the top menu.

```ts
export const editions: Edition[] = [
  {
    id: "2027-spring",             // unique key, used internally
    year: 2027,
    season: "spring",              // "spring" | "summer" | "fall" → gives the URL /2027/spring
    label: "Spring 2027",          // the label shown everywhere
    period: "6 March - 15 May 2027",
    tagline: "One short sentence, shown in the header and on the archive card.",
    description: "The longer paragraph, shown under “About this edition”.",
    location: "Bucharest, in person",

    // Only while applications are open:
    applyUrl: "https://forms.gle/xxxxxxxx",
    applyDeadline: "2027-03-01",   // ISO format (YYYY-MM-DD)

    // The project list — current edition only, see below:
    projectsUrl: "https://docs.google.com/spreadsheets/d/xxxxxxxx",
    projectsPublicFrom: "2027-04-10",

    program: [ /* see below */ ],
    mentors: [ /* see below */ ],
    projects: [ /* see below */ ],
    sponsors: [ /* see below */ ],
  },
  // ...previous editions
];
```

### 2. Fill in the program

Each session has a `kind` that sets its colour and label in the timeline:

| `kind` | Label | When to use it |
| --- | --- | --- |
| `"workshop"` | Workshop | the technical sessions in the first half |
| `"hackathon"` | Hackathon | the sessions spent working on a project |
| `"final"` | Final | final presentations and graduation |
| `"break"` | Break | free weekends (shown dimmed, and not counted as sessions) |

```ts
program: [
  { date: "Saturday, 6 March 2027", time: "10:00-13:00", title: "Version control with Git", kind: W },
  { date: "Saturday, 13 March 2027", time: "10:00-13:00", title: "Collaborative development with GitHub", kind: W },
  { date: "Saturday, 20 March 2027", time: "—", title: "Break", kind: B },
  { date: "Saturday, 15 May 2027", time: "17:00-22:00", title: "Final presentations. Graduation", kind: F },
],
```

`W`, `H`, `F` and `B` are shorthands defined at the top of the file (`workshop`, `hackathon`,
`final`, `break`). Writing `kind: "workshop"` directly works just as well.

The session, workshop and hackathon counts on the cards are computed from this list. Entries
marked `"break"` are scheduled gaps, so they appear in the timeline but are left out of the
session count — an eleven-row program with two breaks reads as nine sessions.

### 3. Add the mentors

The **Mentors** section appears on every edition page. Each mentor is a card; selecting it
opens a dialog with their photo, email addresses and the projects they coordinate.

```ts
mentors: [
  {
    id: "first-last",                            // required, links the mentor to their projects
    name: "First Last",
    emails: ["address@example.org"],             // one or more; each becomes a mailto link
    github: "username",                          // optional
    avatar: "/img/mentors/first-last.jpg",       // optional — without it, initials are shown
    bio: "A sentence or two about what they do.", // optional
  },
],
```

`id` is the key that links a mentor to their projects — it must be unique within the edition
and appear exactly the same in each project's `mentors` list.

**Photos** go in [`public/img/mentors/`](public/img/mentors) and are referenced as
`/img/mentors/<file>`. Square, at least 200×200px, JPG or PNG.

The Fall 2026 mentors currently use generated avatars (the `.svg` files in that folder). To
use real photos, copy the image into the folder and change the extension in `avatar`:

```ts
avatar: "/img/mentors/razvan-deaconescu.jpg",   // instead of .svg
```

If the file in `avatar` is missing or fails to load, the card falls back to the mentor's
initials — no broken image is ever shown.

**If `mentors` is empty or missing** the section still renders, with a placeholder whose
wording depends on whether the edition has finished — the end date is read from the last entry
in `program`:

- an edition that has **not finished yet** shows “Mentors announced soon”, plus a link for
  people who want to mentor;
- a **finished** edition shows “Mentors not recorded”, since its mentors are never going to be
  announced.

### 4. Add the mentors' projects

Projects live in a separate file per edition, so `editions.ts` stays readable — see
[`src/data/projects-2026-summer.ts`](src/data/projects-2026-summer.ts). Import it in `editions.ts`
and assign it to the edition's `projects` field.

```ts
{
  name: "rencfs",                                       // becomes a link to `url`
  url: "https://github.com/xoriors/rencfs",
  mentors: ["radu-marias"],                             // one or more, by `id`

  // Optional fields, kept in the data but not shown in the dialog:
  feature: "What is worked on during the edition.",
  startingPoint: "https://github.com/xoriors/rencfs/issues/236",
  channel: "https://discord.gg/xxxxxxx",
  channelLabel: "Discord, pick CDL to access the channel",
  slots: "1–2 seats",
}
```

The mentor dialog shows **only the project names**, each linking to `url`. A project with
several tracks is written as separate entries sharing the same `name` and `url` (`rencfs` has
three), but appears once in the list — entries are deduplicated by `name` + `url`.

A project with several mentors is written once, with every id in `mentors` — it then shows up
in each of their dialogs.

Only `name` and `mentors` are required. The project count on a mentor's card is computed
automatically, after deduplication.

### 5. Publish the project list

The list of open source projects participants choose from is an external spreadsheet. The
**“Project list”** button appears in the header of both the home page and the edition page,
**for the current edition only** — past editions never show it.

```ts
projectsUrl: "https://docs.google.com/spreadsheets/d/xxxxxxxx",
projectsPublicFrom: "2026-11-09",   // the day the list goes public
```

| Situation | What is shown |
| --- | --- |
| `projectsUrl` set and `projectsPublicFrom` has passed | active button, opens the spreadsheet in a new tab |
| `projectsPublicFrom` is in the future, or `projectsUrl` is missing | inactive button reading “Project list · from 9 November 2026” |
| `projectsUrl` set, no `projectsPublicFrom` | active immediately |
| not the current edition | the button is not rendered |

Set `projectsPublicFrom` a few days before the first hackathon, so participants have time to
look through the projects. You do not need to come back on the day — the button activates on
its own.

The spreadsheet must be shared as “anyone with the link can view”.

### 6. Add the sponsors (once you have them)

The sponsors section is rendered **after** the mentors and **only if the edition has
sponsors** — until then nothing shows on the page, no placeholder needed.

```ts
sponsors: [
  { name: "Company Name", tier: "main",      url: "https://...", logo: "/img/sponsors/company.svg" },
  { name: "Other Partner", tier: "partner",  url: "https://..." },
  { name: "Supporter",     tier: "supporter" },
],
```

| `tier` | Heading | Layout |
| --- | --- | --- |
| `"main"` | Main sponsor | large logos, 2 per row |
| `"partner"` | Partner | medium logos, up to 4 per row |
| `"supporter"` | Supporter | medium logos, up to 4 per row |

Omitting `tier` treats the sponsor as a `"partner"`. Omitting `logo` shows the name as text.
Logos go in [`public/img/sponsors/`](public/img/sponsors) — SVG or transparent PNG on a
transparent background; the site uses a light theme, so dark lettering reads best.

### 7. Opening and closing applications

The **“Applications open”** line on the home page, the header button and the banner on the
edition page all derive from the same two fields:

```ts
applyUrl: "https://forms.gle/xxxxxxxx",
applyDeadline: "2026-10-05",
```

Setting `applyUrl` is enough to show them. To hide them, either let `applyDeadline` pass —
they disappear at the end of that day — or remove `applyUrl`.

Applications count as open **for the current edition only** (the first in the list). An old
edition that still has an `applyUrl` in its data never advertises open applications.

---

## Historical editions

The 2013–2020 editions remain on the old Jekyll site and are listed as external links in
`legacyEditions`, also in `src/data/editions.ts`. To migrate one, move it into the `editions`
list using the structure above.

## Deploying on Vercel

1. Import the repo in Vercel — framework preset **Vite**, build `npm run build`, output `dist`.
2. [`vercel.json`](vercel.json) contains the rewrite to `index.html`, required for client-side
   routing (without it, `/2026/fall` 404s on refresh).
3. For the domain: point `cdl.rosedu.org` at Vercel with a CNAME, replacing GitHub Pages.
