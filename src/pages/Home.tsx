import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ProgramList from "../components/ProgramList";
import EditionCard from "../components/EditionCard";
import ProjectsButton from "../components/ProjectsButton";
import { currentEdition, editionPath, editions, isApplyOpen, legacyEditions } from "../data/editions";

const pillars = [
  {
    tag: "first half",
    title: "Hands-on workshops",
    body: "Git, GitHub, Markdown, Docker, automation and software engineering best practices. Every workshop comes with practical exercises, not just slides.",
  },
  {
    tag: "second half",
    title: "Hackathons on real projects",
    body: "You pick an open source project from a list and work on it with a mentor, online and during the hackathons in the second half of the course.",
  },
  {
    tag: "outcome",
    title: "Public contributions",
    body: "By the end you have merged pull requests, reviews you have given and documentation you have written — what software development actually looks like.",
  },
  {
    tag: "ROSEdu",
    title: "Community",
    body: "Instructors and mentors from the industry and from the ROSEdu community. The course content stays public, in the spirit of open source.",
  },
];

const stats = [
  { value: "2013", label: "first edition" },
  { value: `${editions.length + legacyEditions.length}`, label: "editions held" },
  { value: "9", label: "sessions per edition" },
  { value: "free", label: "for participants" },
];

export default function Home() {
  const applyOpen = isApplyOpen(currentEdition);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:pt-24">
          <Reveal>
            <p className="font-mono text-xs text-slate-500">
              {applyOpen ? `Applications open · ${currentEdition.label}` : `Current edition · ${currentEdition.label}`}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Community Development Lab
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              An alternative course and lab for anyone who wants to make their first contribution to an open source
              project. No fee, no exams — just code, mentors and public commits.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {applyOpen && (
                <a
                  href={currentEdition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                  Apply for {currentEdition.label}
                </a>
              )}
              <Link
                to={editionPath(currentEdition)}
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Current edition
              </Link>
              <ProjectsButton edition={currentEdition} isCurrent />
              <Link
                to="/editions"
                className="px-2 py-3 text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                All editions →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-semibold text-slate-900">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16">
        <Reveal>
          <h2 className="text-2xl font-semibold text-slate-900">About CDL</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            CDL helps pupils, students and anyone with some background in computing understand what software
            development looks like in the real world. All you need is a GitHub account with at least two projects, in
            two different programming languages.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{p.tag}</p>
                <h3 className="mt-2 text-lg font-medium text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="program" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Program</h2>
              <p className="mt-2 text-sm text-slate-500">
                {currentEdition.label} · {currentEdition.period}
              </p>
            </div>
            <Link
              to={editionPath(currentEdition)}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Full details →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8">
          <ProgramList program={currentEdition.program} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <Reveal>
          <h2 className="text-2xl font-semibold text-slate-900">Recent editions</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i * 50, 250)} className="h-full">
              <EditionCard edition={e} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8">
            <Link to="/editions" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              Including the 2013–2020 editions →
            </Link>
          </p>
        </Reveal>
      </section>

      {applyOpen && (
        <section className="mx-auto max-w-5xl px-5 pb-10">
          <Reveal>
            <div className="glass flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Applications for {currentEdition.label} are open</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Taking part is free, subject to the number of places available.
                </p>
              </div>
              <a
                href={currentEdition.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Open the form
              </a>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
