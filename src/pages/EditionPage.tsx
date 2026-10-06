import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import ProgramList from "../components/ProgramList";
import { scrollToHash } from "../components/HashLink";
import Mentors from "../components/Mentors";
import ProjectsButton from "../components/ProjectsButton";
import Sponsors from "../components/Sponsors";
import {
  applyWindowEnd,
  currentEdition,
  editionPath,
  editions,
  findEdition,
  isApplyOpen,
  isLateApplication,
  parseDay,
  isUpcoming,
  legacySeasonSlugs,
  sessionCount,
} from "../data/editions";

const day = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
import NotFound from "./NotFound";

export default function EditionPage() {
  const { year, season } = useParams();
  const edition = year ? findEdition(year, season) : undefined;

  useEffect(() => {
    if (edition) document.title = `CDL ${edition.label} — Community Development Lab`;
    return () => {
      document.title = "CDL — Community Development Lab";
    };
  }, [edition]);

  // Old links used Romanian season slugs: /2025/toamna -> /2025/fall
  if (!edition && season && legacySeasonSlugs[season]) {
    return <Navigate to={`/${year}/${legacySeasonSlugs[season]}`} replace />;
  }
  if (!edition) return <NotFound />;

  const idx = editions.findIndex((e) => e.id === edition.id);
  const newer = editions[idx - 1];
  const older = editions[idx + 1];
  const isCurrent = edition.id === currentEdition.id;
  const applyOpen = isApplyOpen(edition);
  const late = isLateApplication(edition);
  const windowEnd = applyWindowEnd(edition);
  const workshops = edition.program.filter((s) => s.kind === "workshop").length;
  const hackathons = edition.program.filter((s) => s.kind === "hackathon").length;

  const anchors = [
    { href: "#program", label: "Program" },
    { href: "#mentors", label: "Mentors" },
    ...(edition.sponsors?.length ? [{ href: "#sponsors", label: "Sponsors" }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-14">
          <Reveal>
            <Link to="/editions" className="font-mono text-xs text-slate-500 transition-colors hover:text-slate-900">
              ← all editions
            </Link>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">CDL {edition.label}</h1>
            <p className="mt-2 font-mono text-sm text-slate-500">{edition.period}</p>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">{edition.tagline}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 font-mono text-xs text-slate-500">
              {sessionCount(edition)} sessions · {workshops} workshops · {hackathons} hackathons
              {edition.location && ` · ${edition.location}`}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <ProjectsButton edition={edition} isCurrent={isCurrent} />
              {anchors.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(a.href);
                  }}
                  className="cursor-pointer rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </Reveal>

          {applyOpen && (
            <Reveal delay={160}>
              <div className="glass mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    {late ? "Applications are still open" : "Applications are open"}
                  </p>
                  {late
                    ? windowEnd && (
                        <p className="mt-1 text-sm text-slate-500">
                          The deadline has passed, but you can still join until {day(windowEnd)}.
                        </p>
                      )
                    : edition.applyDeadline && (
                        <p className="mt-1 text-sm text-slate-500">Deadline: {day(parseDay(edition.applyDeadline))}</p>
                      )}
                </div>
                <a
                  href={edition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                  Application form
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10">
        <Reveal>
          <h2 className="text-xl font-semibold text-slate-900">About this edition</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{edition.description}</p>
        </Reveal>
      </section>

      <section id="program" className="mx-auto max-w-5xl scroll-mt-24 px-5 pb-10">
        <Reveal>
          <h2 className="text-xl font-semibold text-slate-900">Program</h2>
        </Reveal>
        <div className="mt-6">
          <ProgramList program={edition.program} />
        </div>
      </section>

      <Mentors edition={edition} upcoming={isUpcoming(edition)} />

      <Sponsors sponsors={edition.sponsors} />

      <section className="mx-auto max-w-5xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {older && (
            <Link
              to={editionPath(older)}
              className="glass p-5 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              <p className="text-xs text-slate-500">← Previous edition</p>
              <p className="mt-1 font-medium text-slate-900">{older.label}</p>
            </Link>
          )}
          {newer && (
            <Link
              to={editionPath(newer)}
              className="glass p-5 text-right transition-colors hover:border-slate-400 hover:bg-slate-50 sm:col-start-2"
            >
              <p className="text-xs text-slate-500">Next edition →</p>
              <p className="mt-1 font-medium text-slate-900">{newer.label}</p>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
