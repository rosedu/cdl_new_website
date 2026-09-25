import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ProgramList from "../components/ProgramList";
import EditionCard from "../components/EditionCard";
import ProjectsButton from "../components/ProjectsButton";
import { currentEdition, editionPath, editions, isApplyOpen, legacyEditions } from "../data/editions";

const pillars = [
  {
    title: "Ateliere practice",
    body: "Git, GitHub, Markdown, Docker, automatizări și bune practici de inginerie software. Fiecare atelier are exerciții practice, nu doar slide-uri.",
    tag: "prima parte",
  },
  {
    title: "Hackathoane pe proiecte reale",
    body: "Îți alegi un proiect open source dintr-o listă și lucrezi la el alături de un mentor, online și la hackathoanele din a doua parte a cursului.",
    tag: "a doua parte",
  },
  {
    title: "Contribuții publice",
    body: "La final ai pull request-uri acceptate, code review-uri făcute și documentație scrisă — tot ce înseamnă dezvoltare software în mediul real.",
    tag: "rezultat",
  },
  {
    title: "Comunitate",
    body: "Instructori și mentori din industrie și din comunitatea ROSEdu. Conținutul rămâne public, în spiritul open source, pentru oricine.",
    tag: "ROSEdu",
  },
];

const stats = [
  { value: "2013", label: "prima ediție" },
  { value: `${editions.length + legacyEditions.length}`, label: "ediții organizate" },
  { value: "9–11", label: "ședințe / ediție" },
  { value: "0 lei", label: "taxa de participare" },
];

export default function Home() {
  const applyOpen = isApplyOpen(currentEdition);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="blob pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[var(--color-accent)]/25 blur-[100px]" />
        <div className="blob pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[var(--color-accent-2)]/20 blur-[100px]" style={{ animationDelay: "-6s" }} />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {applyOpen ? `Înscrieri deschise · ${currentEdition.label}` : `Ediția curentă · ${currentEdition.label}`}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
              Curs de <span className="shimmer">Dezvoltare Liberă</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Un curs/laborator alternativ pentru oricine vrea să facă prima sa contribuție într-un proiect open
              source. Fără taxă, fără examene — doar cod, mentori și commit-uri publice.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              {applyOpen && (
                <a
                  href={currentEdition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[var(--color-accent)]/25 transition hover:brightness-110"
                >
                  Înscrie-te la {currentEdition.label}
                </a>
              )}
              <Link
                to={editionPath(currentEdition)}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Vezi ediția curentă
              </Link>
              <ProjectsButton edition={currentEdition} isCurrent />
              <Link
                to="/editii"
                className="rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Toate edițiile →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[var(--color-ink)]/90 px-5 py-6">
                  <dt className="text-2xl font-bold text-white sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* despre */}
      <section id="despre" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Despre CDL</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            De la „n-am contribuit niciodată” la pull request acceptat.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            CDL îi ajută pe elevi, studenți și pe oricine are un bagaj inițial de cunoștințe IT&amp;C să înțeleagă cum
            arată dezvoltarea software în mediul real. Ai nevoie doar de un cont GitHub cu cel puțin două proiecte, în
            două limbaje diferite.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="glass h-full p-6 transition hover:border-white/20 hover:bg-white/[0.06]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{p.tag}</span>
                <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* program */}
      <section id="program" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Program</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{currentEdition.label}</h2>
              <p className="mt-2 text-slate-400">{currentEdition.period}</p>
            </div>
            <Link to={editionPath(currentEdition)} className="text-sm font-medium text-white hover:text-[var(--color-accent-2)]">
              Detalii complete →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          <ProgramList program={currentEdition.program} />
        </div>
      </section>

      {/* editii */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Arhivă</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Edițiile recente</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((e, i) => (
            <Reveal key={e.id} delay={i * 70}>
              <EditionCard edition={e} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <Link to="/editii" className="text-sm font-medium text-slate-300 hover:text-white">
              Inclusiv edițiile 2013–2020 →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* cta */}
      {applyOpen && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <Reveal>
            <div className="glass relative overflow-hidden p-10 text-center sm:p-14">
              <div className="blob pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/30 blur-[90px]" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Alătură-te supereroilor.</h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  Înscrierile pentru {currentEdition.label} sunt deschise. Participarea este gratuită, în limita
                  locurilor disponibile.
                </p>
                <a
                  href={currentEdition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-200"
                >
                  Completează formularul
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
