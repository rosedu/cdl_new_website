import type { Mentor } from "../data/editions";
import Reveal from "./Reveal";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <article className="glass group h-full p-5 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-center gap-4">
        {mentor.avatar ? (
          <img
            src={mentor.avatar}
            alt={mentor.name}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/15"
          />
        ) : (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent)]/70 to-[var(--color-accent-2)]/70 font-semibold text-black">
            {initials(mentor.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{mentor.name}</h3>
          {mentor.role && <p className="text-xs uppercase tracking-wider text-slate-500">{mentor.role}</p>}
        </div>
      </div>

      {mentor.bio && <p className="mt-4 text-sm leading-relaxed text-slate-400">{mentor.bio}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {mentor.project &&
          (mentor.projectUrl ? (
            <a
              href={mentor.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-1 font-medium text-[#b3a4ff] transition hover:bg-[var(--color-accent)]/25"
            >
              {mentor.project} ↗
            </a>
          ) : (
            <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-1 font-medium text-[#b3a4ff]">
              {mentor.project}
            </span>
          ))}
        {mentor.github && (
          <a
            href={`https://github.com/${mentor.github}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            @{mentor.github}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Mentors({ mentors, upcoming }: { mentors?: Mentor[]; upcoming?: boolean }) {
  const has = Boolean(mentors?.length);
  if (!has && !upcoming) return null;

  return (
    <section id="mentori" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-12">
      <Reveal>
        <h2 className="text-2xl font-bold text-white">Instructori și mentori</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Oamenii care țin atelierele și care te ghidează prin prima ta contribuție open source.
        </p>
      </Reveal>

      {has ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors!.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i * 60, 300)}>
              <MentorCard mentor={m} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="glass mt-8 flex flex-col items-start gap-3 border-dashed p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">Echipa se anunță în curând</p>
              <p className="mt-1 text-sm text-slate-400">
                Lista de instructori și mentori pentru această ediție va fi publicată înainte de prima ședință.
              </p>
            </div>
            <a
              href="https://github.com/rosedu"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Vrei să fii mentor? →
            </a>
          </div>
        </Reveal>
      )}
    </section>
  );
}
