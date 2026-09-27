import { useEffect, useRef } from "react";
import type { Mentor, Project } from "../data/editions";
import Avatar from "./Avatar";

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="rounded-md border border-white/[0.08] px-4 py-3 transition-colors hover:border-white/20">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-slate-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
        >
          {project.name} <span aria-hidden>↗</span>
        </a>
      ) : (
        <span className="text-slate-200">{project.name}</span>
      )}
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
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
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
        className="glass relative flex max-h-[88dvh] w-full max-w-xl flex-col rounded-b-none rounded-t-2xl border-white/10 bg-[var(--color-ink-2)] outline-none sm:rounded-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-white/10 bg-[var(--color-ink-2)] text-slate-500 transition-colors hover:border-white/25 hover:text-white"
        >
          ✕
        </button>

        <div className="shrink-0 border-b border-white/[0.08] p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar mentor={mentor} size="lg" />
            <div className="min-w-0">
              <h2 id="mentor-dialog-title" className="text-xl font-semibold text-white">
                {mentor.name}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                {mentor.emails?.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="w-fit font-mono text-sm text-[var(--color-accent)] transition-colors hover:text-white"
                  >
                    {email}
                  </a>
                ))}
                {mentor.github && (
                  <a
                    href={`https://github.com/${mentor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit font-mono text-sm text-slate-500 transition-colors hover:text-white"
                  >
                    @{mentor.github} ↗
                  </a>
                )}
              </div>
              {mentor.bio && <p className="mt-3 text-sm leading-relaxed text-slate-400">{mentor.bio}</p>}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-7">
          <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Projects
            <span className="ml-2 text-slate-600">{projects.length}</span>
          </h3>

          {projects.length ? (
            <ul className="mt-4 space-y-2">
              {projects.map((p, i) => (
                <ProjectItem key={`${p.name}-${i}`} project={p} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Projects announced soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
