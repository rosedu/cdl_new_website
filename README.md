# CDL — Community Development Lab

The [cdl.rosedu.org](https://cdl.rosedu.org) website, rewritten in React and ready to deploy
on Vercel.

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
| `/:year/:season#program` | the edition's session timeline |
| `/:year/:season#mentors` | the edition's mentors; selecting one opens their projects |
| `/:year/:season#sponsors` | sponsors and partners (only rendered if the edition has sponsors) |
| `/editions` | every edition, including the historical ones (2013–2020) |
| anything else | 404 page |

Season slugs are `spring`, `summer` and `fall`. The Romanian slugs the site used before it was
translated (`primavara`, `vara`, `toamna`) redirect to their English equivalents, and `/editii`
redirects to `/editions`, so older links keep working — see `legacySeasonSlugs` in
`src/data/editions.ts`.

## Where things live

| File | What it holds |
| --- | --- |
| [`src/data/editions.ts`](src/data/editions.ts) | every edition, its program, mentors and sponsors, plus the helpers below |
| [`src/data/projects-2026-summer.ts`](src/data/projects-2026-summer.ts) | the Summer 2026 projects; each edition with projects gets its own file |
| `src/components/` | presentational pieces — nav, footer, program timeline, mentor cards and dialog |
| `src/pages/` | the four pages: home, edition, editions index, 404 |
| `public/img/mentors/` | mentor photos |
| `public/img/sponsors/` | sponsor logos |

---

## Adding a new edition

**All content lives in [`src/data/editions.ts`](src/data/editions.ts).** You never need to
touch a component or a route — the edition page, the menu link, the home page program and the
archive are all generated from that data.

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

    // Only while applications are open — see section 7:
    applyUrl: "https://forms.gle/xxxxxxxx",
    applyDeadline: "2027-03-01",   // ISO format (YYYY-MM-DD)

    // The project list — current edition only, see section 5:
    projectsUrl: "https://docs.google.com/spreadsheets/d/xxxxxxxx",
    projectsPublicFrom: "2027-04-10",

    program: [ /* section 2 */ ],
    mentors: [ /* section 3 */ ],
    projects: [ /* section 4 */ ],
    sponsors: [ /* section 6 */ ],
  },
  // ...previous editions
];
```

Only `id`, `year`, `label`, `period`, `tagline`, `description` and `program` are required.
Everything else can be filled in later, and the page adapts on its own.

### 2. Fill in the program

Each session has a `kind` that sets its colour and label in the timeline:

| `kind` | Label | When to use it |
| --- | --- | --- |
| `"workshop"` | Workshop | the technical sessions in the first half |
| `"hackathon"` | Hackathon | the sessions spent working on a project |
| `"final"` | Final | final presentations and graduation |
| `"break"` | Break | free weekends — shown dimmed, and not counted as sessions |

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

The session, workshop and hackathon counts on the cards come from this list. Entries marked
`"break"` are scheduled gaps, so they show in the timeline but are left out of the session
count — an eleven-row program with two breaks reads as nine sessions.

Keep the date strings in the `"Weekday, D Month YYYY"` shape: the last entry is also parsed to
work out when the edition ends, which decides some of the wording elsewhere on the page.

### 3. Add the mentors

The **Mentors** section appears on every edition page. Each mentor is a card; selecting it
opens a dialog with their photo, email addresses and the projects they coordinate.

```ts
mentors: [
  {
    id: "first-last",                             // required, links the mentor to their projects
    name: "First Last",
    emails: ["address@example.org"],              // one or more; each becomes a mailto link
    github: "username",                           // optional
    avatar: "/img/mentors/first-last.jpg",        // optional — without it, initials are shown
    bio: "A sentence or two about what they do.", // optional
  },
],
```

`id` is the key that links a mentor to their projects — it must be unique within the edition
and appear exactly the same in each project's `mentors` list.

**Photos** go in [`public/img/mentors/`](public/img/mentors) and are referenced as
`/img/mentors/<file>`. Square, at least 200×200px, JPG or PNG.

The Summer 2026 mentors currently use generated avatars (the `.svg` files in that folder). To
use real photos, copy the image into the folder and change the extension in `avatar`:

```ts
avatar: "/img/mentors/razvan-deaconescu.jpg",   // instead of .svg
```

If the file in `avatar` is missing or fails to load, the card falls back to the mentor's
initials — no broken image is ever shown.

**If `mentors` is empty or missing** the section still renders, with a placeholder whose
wording depends on whether the edition has finished. The end date is read from the last entry
in `program`:

- an edition that has **not finished yet** shows “Mentors announced soon”, plus a link for
  people who want to mentor. It deliberately promises no date — mentors are not necessarily
  known by the first session;
- a **finished** edition shows “Mentors not recorded”, since its mentors are never going to be
  announced now.

### 4. Add the mentors' projects

Projects live in a separate file per edition, so `editions.ts` stays readable — see
[`src/data/projects-2026-summer.ts`](src/data/projects-2026-summer.ts). Import it in
`editions.ts` and assign it to the edition's `projects` field.

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

Mentee names are deliberately not part of this data. They are personal details of the
participants, and the site is public.

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
| `projectsUrl` set and `projectsPublicFrom` has arrived | active button, opens the spreadsheet in a new tab |
| `projectsPublicFrom` is still in the future, or `projectsUrl` is missing | inactive button reading “Project list · from 9 November 2026” |
| `projectsUrl` set, no `projectsPublicFrom` | active immediately |
| not the current edition | the button is not rendered |

Set `projectsPublicFrom` a few days before the first hackathon, so participants have time to
look through the projects. You do not need to come back on the day — the button switches over
on its own.

**The spreadsheet link is not actually hidden before that date.** See
[How the date checks work](#how-the-date-checks-work) below.

The spreadsheet itself must be shared as “anyone with the link can view”.

### 6. Add the sponsors (once you have them)

The sponsors section is rendered **after** the mentors and **only if the edition has
sponsors** — until then nothing shows on the page, no placeholder needed.

```ts
sponsors: [
  { name: "Company Name",  tier: "main",      url: "https://...", logo: "/img/sponsors/company.svg" },
  { name: "Other Partner", tier: "partner",   url: "https://..." },
  { name: "Supporter",     tier: "supporter" },
],
```

| `tier` | Heading | Layout |
| --- | --- | --- |
| `"main"` | Main sponsor | large logos, 2 per row |
| `"partner"` | Partner | medium logos, up to 4 per row |
| `"supporter"` | Supporter | medium logos, up to 4 per row |

Omitting `tier` treats the sponsor as a `"partner"`. Omitting `logo` shows the name as text.
Logos go in [`public/img/sponsors/`](public/img/sponsors) — SVG or transparent PNG. The site
uses a light theme, so dark lettering reads best.

### 7. Opening and closing applications

The **“Applications open”** line on the home page, the header button and the banner on the
edition page all derive from the same two fields:

```ts
applyUrl: "https://forms.gle/xxxxxxxx",
applyDeadline: "2026-10-05",
```

Setting `applyUrl` is enough to show them. **`applyDeadline` is what gets advertised, not what
closes the form.** Late applications are accepted past it, right up to the moment the **first
session starts** — taken from the program, including the time of day parsed from the session's
`time` label, and skipping any leading break.

That gives three states:

| When | What the edition page shows |
| --- | --- |
| before `applyDeadline` | “Applications are open · Deadline: 8 October 2026” |
| after the deadline, before the first session | “Applications are still open · The deadline has passed, but you can still join until the first session starts, on 10 October 2026 at 10:00.” |
| once the first session has started | nothing — the banner and both buttons disappear |

A deadline runs to the end of its day, so `"2026-10-08"` means 8 October at 23:59 local time.

To take the form down earlier than that, remove `applyUrl`.

Applications count as open **for the current edition only** (the first in the list). An old
edition that still has an `applyUrl` in its data never advertises open applications, which is
what used to make Summer 2026 claim applications were open months after they closed.

---

## How the date checks work

Three things on the site switch over on a date: the application banner, the project list
button, and the wording of the mentors placeholder.

All three are evaluated **in the visitor's browser, from the visitor's own clock**, when the
page renders. There is no server and no build step involved. This has a few consequences worth
knowing:

- **A page left open does not update.** Someone who had the site open before the release date
  keeps seeing the old state until they reload. In practice this only matters for a tab left
  open overnight.
- **The visitor's clock decides.** Someone whose device clock is wrong, or who sets it forward
  on purpose, sees the other state. Dates in the data are parsed as local midnight (via
  `parseDay` in `src/data/editions.ts`), so a release date takes effect at midnight in the
  visitor's own timezone, not at 02:00 Romanian time as it would with a plain `new Date()`.
- **`projectsPublicFrom` hides the button, not the link.** If `projectsUrl` is filled in, the
  spreadsheet URL ships inside the JavaScript bundle and anyone who looks at the page source
  can find it before the release date. The date is a convenience so you do not have to edit
  and redeploy on the day — it is not a way of keeping the list secret.

  If the list genuinely must not be reachable early, either leave `projectsUrl` empty until
  the day and deploy then, or keep the spreadsheet itself restricted and open it up on the
  day. The button will show as inactive in the meantime either way.

The same reasoning applies to `applyDeadline`: it stops advertising the form, but the form
link is in the bundle and the form itself stays open until you close it in Google Forms.

## Helpers in `src/data/editions.ts`

Worth knowing about before adding UI of your own:

| Helper | What it answers |
| --- | --- |
| `currentEdition` | which edition is current — the first in the list |
| `editionPath(edition)` | the edition's URL, e.g. `/2026/fall` |
| `findEdition(year, season)` | the edition behind a route, if any |
| `sessionCount(edition)` | how many sessions there are, breaks excluded |
| `editionEnd(edition)` | the edition's last day, parsed from the program |
| `isUpcoming(edition)` | whether the edition has yet to finish |
| `isApplyOpen(edition)` | whether to show the application form link |
| `isLateApplication(edition)` | whether the advertised deadline has already passed |
| `applyWindowEnd(edition)` | the start of the first session, when the form link goes away |
| `sessionDate(session)` | a program entry's date, parsed from its label |
| `isProjectListPublic(edition)` | whether the project list button is active |
| `projectsByMentor(edition, id)` | a mentor's projects, deduplicated |
| `parseDay(iso)` | a `YYYY-MM-DD` string as local midnight |

## Design notes

The site uses a light theme, deliberately restrained: an off-white page, white cards, slate
text, and muted indigo, teal and rose accents used only to distinguish session types. There
are no CSS animations, no gradient buttons or gradient text. Content reveals on scroll with a
short fade, and that is disabled under `prefers-reduced-motion`.

Two rules worth keeping when adding UI:

- **Only interactive things get hover treatments.** Program rows are not links, so they have
  no hover state — a highlight there reads as “click me” and does nothing.
- **Keep text at slate-500 or darker.** On the off-white background, slate-400 lands around
  2.6:1 contrast, below the WCAG AA threshold.

## Historical editions

The 2013–2020 editions remain on the old Jekyll site and are listed as external links in
`legacyEditions`, also in `src/data/editions.ts`. To migrate one, move it into the `editions`
list using the structure above.

## Deploying on Vercel

1. Import the repo in Vercel — framework preset **Vite**, build `npm run build`, output `dist`.
2. [`vercel.json`](vercel.json) contains the rewrite to `index.html`, required for client-side
   routing (without it, `/2026/fall` 404s on refresh).
3. For the domain: point `cdl.rosedu.org` at Vercel with a CNAME, replacing GitHub Pages.
