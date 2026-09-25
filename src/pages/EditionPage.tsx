import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import ProgramList from "../components/ProgramList";
import { scrollToHash } from "../components/HashLink";
import Mentors from "../components/Mentors";
import ProjectsButton from "../components/ProjectsButton";
import Sponsors from "../components/Sponsors";
import { currentEdition, editionPath, editions, findEdition } from "../data/editions";
import NotFound from "./NotFound";

export default function EditionPage() {
  const { year, season } = useParams();
  const edition = year ? findEdition(year, season) : undefined;

  useEffect(() => {
    if (edition) document.title = `CDL ${edition.label} — Curs de Dezvoltare Liberă`;
    return () => {
      document.title = "CDL — Curs de Dezvoltare Liberă";
    };
  }, [edition]);

  if (!edition) return <NotFound />;

  const idx = editions.findIndex((e) => e.id === edition.id);
  const newer = editions[idx - 1];
  const older = editions[idx + 1];
  const isCurrent = edition.id === currentEdition.id;
  const anchors = [
    { href: "#program", label: "Program" },
    ...(edition.mentors?.length || isCurrent ? [{ href: "#mentori", label: "Mentori" }] : []),
    ...(edition.sponsors?.length ? [{ href: "#sponsori", label: "Sponsori" }] : []),
  ];
  const counts = {
    workshops: edition.program.filter((s) => s.kind === "workshop").length,
    hackathons: edition.program.filter((s) => s.kind === "hackathon").length,
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="blob pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[var(--color-accent)]/25 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-16">
          <Reveal>
            <Link to="/editii" className="font-mono text-xs text-slate-500 hover:text-white">
              ← toate edițiile
            </Link>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              CDL <span className="grad-text">{edition.label}</span>
            </h1>
            <p className="mt-3 font-mono text-sm text-slate-400">{edition.period}</p>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">{edition.tagline}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-slate-300">{edition.program.length} ședințe</span>
              <span className="rounded-full bg-[var(--color-accent-2)]/10 px-3 py-1.5 text-[var(--color-accent-2)]">
                {counts.workshops} ateliere
              </span>
              <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1.5 text-[#b3a4ff]">
                {counts.hackathons} hackathoane
              </span>
              {edition.location && (
                <span className="rounded-full bg-white/5 px-3 py-1.5 text-slate-300">{edition.location}</span>
              )}
            </div>
          </Reveal>

          <Reveal delay={130}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ProjectsButton edition={edition} isCurrent={isCurrent} />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-6 flex flex-wrap gap-2">
              {anchors.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(a.href);
                  }}
                  className="cursor-pointer rounded-lg border border-white/10 px-3.5 py-2 text-sm text-slate-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </Reveal>

          {edition.applyUrl && (
            <Reveal delay={160}>
              <div className="glass mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">Înscrierile sunt deschise</p>
                  {edition.applyDeadline && (
                    <p className="mt-1 text-sm text-slate-400">
                      Termen limită:{" "}
                      {new Date(edition.applyDeadline).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <a
                  href={edition.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-center text-sm font-semibold text-black transition hover:brightness-110"
                >
                  Formular de înscriere
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold text-white">Despre ediție</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{edition.description}</p>
        </Reveal>
      </section>

      <section id="program" className="mx-auto max-w-5xl scroll-mt-24 px-5 pb-12">
        <Reveal>
          <h2 className="text-2xl font-bold text-white">Program</h2>
        </Reveal>
        <div className="mt-8">
          <ProgramList program={edition.program} />
        </div>
      </section>

      <Mentors edition={edition} upcoming={isCurrent} />

      <Sponsors sponsors={edition.sponsors} />

      <section className="mx-auto max-w-5xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {older && (
            <Link to={editionPath(older)} className="glass p-5 transition hover:border-white/20 hover:bg-white/[0.06]">
              <p className="text-xs text-slate-500">← Ediția anterioară</p>
              <p className="mt-1 font-semibold text-white">{older.label}</p>
            </Link>
          )}
          {newer && (
            <Link
              to={editionPath(newer)}
              className="glass p-5 text-right transition hover:border-white/20 hover:bg-white/[0.06] sm:col-start-2"
            >
              <p className="text-xs text-slate-500">Ediția următoare →</p>
              <p className="mt-1 font-semibold text-white">{newer.label}</p>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
