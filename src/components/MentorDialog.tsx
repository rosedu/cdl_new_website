import { useEffect, useRef } from "react";
import type { Mentor, Project } from "../data/editions";
import Avatar from "./Avatar";

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="rounded-md border border-[var(--c-border)] px-4 py-3 transition-colors hover:border-[var(--c-border-hover)]">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--c-strong)] underline decoration-[var(--c-border)] underline-offset-4 transition-colors hover:text-[var(--c-strong)] hover:decoration-[var(--c-border-hover)]"
        >
          {project.name} <span aria-hidden>↗</span>
        </a>
      ) : (
        <span className="text-[var(--c-strong)]">{project.name}</span>
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
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
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
        className="glass relative flex max-h-[88dvh] w-full max-w-xl flex-col rounded-b-none rounded-t-2xl border-[var(--c-border)] bg-[var(--c-surface)] outline-none sm:rounded-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] transition-colors hover:border-[var(--c-border-hover)] hover:text-[var(--c-strong)]"
        >
          ✕
        </button>

        <div className="shrink-0 border-b border-[var(--c-border)] p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar mentor={mentor} size="lg" />
            <div className="min-w-0">
              <h2 id="mentor-dialog-title" className="text-xl font-semibold">
                {mentor.name}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                {mentor.emails?.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="w-fit font-mono text-sm text-[var(--c-hackathon)] transition-colors hover:text-[var(--c-strong)]"
                  >
                    {email}
                  </a>
                ))}
                {mentor.github && (
                  <a
                    href={`https://github.com/${mentor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit font-mono text-sm text-[var(--c-muted)] transition-colors hover:text-[var(--c-strong)]"
                  >
                    @{mentor.github} ↗
                  </a>
                )}
              </div>
              {mentor.bio && <p className="mt-3 text-sm leading-relaxed text-[var(--c-text)]">{mentor.bio}</p>}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-7">
          <h3 className="font-mono text-xs uppercase tracking-wider">
            Projects
            <span className="ml-2 text-[var(--c-muted)]">{projects.length}</span>
          </h3>

          {projects.length ? (
            <ul className="mt-4 space-y-2">
              {projects.map((p, i) => (
                <ProjectItem key={`${p.name}-${i}`} project={p} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[var(--c-muted)]">Projects announced soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
