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

const dayAndTime = (d: Date) =>
  `${day(d)} at ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
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
            <Link to="/editions" className="font-mono text-xs text-[var(--c-muted)] transition-colors hover:text-[var(--c-strong)]">
              ← all editions
            </Link>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">CDL {edition.label}</h1>
            <p className="mt-2 font-mono text-sm text-[var(--c-muted)]">{edition.period}</p>
            <p className="mt-5 max-w-2xl text-lg text-[var(--c-text)]">{edition.tagline}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 font-mono text-xs text-[var(--c-muted)]">
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
                  className="cursor-pointer rounded-md border border-[var(--c-border)] px-4 py-2.5 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-border-hover)] hover:text-[var(--c-strong)]"
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
                  <p className="font-medium text-[var(--c-strong)]">
                    {late ? "Applications are still open" : "Applications are open"}
                  </p>
                  {late
                    ? windowEnd && (
                        <p className="meta mt-1 text-sm">
                          The deadline has passed, but you can still join until the first session starts, on{" "}
                          {dayAndTime(windowEnd)}.
                        </p>
                      )
                    : edition.applyDeadline && (
                        <p className="meta mt-1 text-sm">Deadline: {day(parseDay(edition.applyDeadline))}</p>
                      )}
                </div>
                <a
                  href={edition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md btn-green px-5 py-2.5 text-center text-sm font-medium text-white transition-colors "
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
          <h2 className="text-xl font-semibold">About this edition</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-[var(--c-text)]">{edition.description}</p>
        </Reveal>
      </section>

      <section id="program" className="mx-auto max-w-5xl scroll-mt-24 px-5 pb-10">
        <Reveal>
          <h2 className="text-xl font-semibold">Program</h2>
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
              className="glass p-5 transition-colors hover:border-[var(--c-border-hover)] hover:bg-[var(--c-surface-hover)]"
            >
              <p className="text-xs text-[var(--c-muted)]">← Previous edition</p>
              <p className="mt-1 font-medium text-[var(--c-strong)]">{older.label}</p>
            </Link>
          )}
          {newer && (
            <Link
              to={editionPath(newer)}
              className="glass p-5 text-right transition-colors hover:border-[var(--c-border-hover)] hover:bg-[var(--c-surface-hover)] sm:col-start-2"
            >
              <p className="text-xs text-[var(--c-muted)]">Next edition →</p>
              <p className="mt-1 font-medium text-[var(--c-strong)]">{newer.label}</p>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
