import { useEffect, useRef } from "react";
import type { Mentor, Project } from "../data/editions";
import Avatar from "./Avatar";

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-[var(--color-accent-2)] hover:text-[var(--color-accent-2)]"
          >
            {project.name} <span aria-hidden>↗</span>
          </a>
        ) : (
          <span className="font-semibold text-white">{project.name}</span>
        )}
        {project.slots && (
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-400">{project.slots}</span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.feature}</p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {project.startingPoint && (
          <a
            href={project.startingPoint}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--color-accent-2)]/10 px-2.5 py-1 font-medium text-[var(--color-accent-2)] transition hover:bg-[var(--color-accent-2)]/20"
          >
            Punct de plecare ↗
          </a>
        )}
        {project.channel && (
          <a
            href={project.channel}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {project.channelLabel ?? "Canal de comunicare"} ↗
          </a>
        )}
      </div>
    </li>
  );
}

export default function MentorDialog({
  mentor,
  projects,
  onClose,
}: {
  mentor: Mentor;
  projects: Project[];
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-dialog-title"
        tabIndex={-1}
        className="glass relative my-0 w-full max-w-2xl rounded-b-none rounded-t-3xl bg-[var(--color-ink-2)]/95 outline-none sm:my-6 sm:rounded-3xl"
      >
        <button
          onClick={onClose}
          aria-label="Închide"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <div className="relative overflow-hidden rounded-t-3xl border-b border-white/10 p-7 sm:p-8">
          <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-[var(--color-accent)]/25 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar mentor={mentor} size="lg" />
            <div className="min-w-0">
              <h2 id="mentor-dialog-title" className="text-2xl font-bold text-white">
                {mentor.name}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                {mentor.emails?.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="w-fit font-mono text-sm text-[var(--color-accent-2)] transition hover:text-white"
                  >
                    {email}
                  </a>
                ))}
                {mentor.github && (
                  <a
                    href={`https://github.com/${mentor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit font-mono text-sm text-slate-400 transition hover:text-white"
                  >
                    @{mentor.github} ↗
                  </a>
                )}
              </div>
              {mentor.bio && <p className="mt-3 text-sm leading-relaxed text-slate-400">{mentor.bio}</p>}
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Proiecte coordonate
            <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-500">{projects.length}</span>
          </h3>

          {projects.length ? (
            <ul className="mt-4 space-y-3">
              {projects.map((p, i) => (
                <ProjectItem key={`${p.name}-${i}`} project={p} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Proiectele se anunță în curând.</p>
          )}
        </div>
      </div>
    </div>
  );
}
