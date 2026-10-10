import { useState } from "react";
import type { Edition, Mentor } from "../data/editions";
import { projectsByMentor } from "../data/editions";
import Avatar from "./Avatar";
import MentorDialog from "./MentorDialog";
import Reveal from "./Reveal";

function MentorCard({ mentor, projectCount, onOpen }: { mentor: Mentor; projectCount: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Details about ${mentor.name}`}
      className="glass h-full w-full cursor-pointer p-5 text-left transition-colors hover:border-[var(--c-border-hover)] hover:bg-[var(--c-surface-hover)]"
    >
      <Avatar mentor={mentor} />
      <h3 className="mt-4 font-medium">{mentor.name}</h3>
      <p className="meta mt-1 text-xs">
        {projectCount ? `${projectCount} ${projectCount === 1 ? "project" : "projects"}` : "projects coming soon"}
      </p>
    </button>
  );
}

export default function Mentors({ edition, upcoming }: { edition: Edition; upcoming?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const mentors = edition.mentors ?? [];
  const active = mentors.find((m) => m.id === openId);

  return (
    <section id="mentors" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-10">
      <Reveal>
        <h2 className="text-xl font-semibold">Mentors</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--c-muted)]">
          The people guiding you through your first open source contribution. Select a mentor to see their projects
          and contact details.
        </p>
      </Reveal>

      {mentors.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <Reveal key={m.id} delay={Math.min(i * 50, 200)} className="h-full">
              <MentorCard
                mentor={m}
                projectCount={projectsByMentor(edition, m.id).length}
                onOpen={() => setOpenId(m.id)}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-dashed border-[var(--c-border-strong)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-[var(--c-strong)]">
                {upcoming ? "Mentors announced soon" : "Mentors not recorded"}
              </p>
              <p className="mt-1 text-sm text-[var(--c-muted)]">
                {upcoming
                  ? "The mentor list for this edition has not been published yet."
                  : "The mentor list for this edition was not recorded on the site."}
              </p>
            </div>
            {upcoming && (
              <a
                href="https://github.com/rosedu"
                target="_blank"
                rel="noreferrer"
                className="btn-green-outline shrink-0 rounded-md px-4 py-2.5 text-sm transition-colors"
              >
                Want to mentor? →
              </a>
            )}
          </div>
        </Reveal>
      )}

      {active && (
        <MentorDialog
          mentor={active}
          projects={projectsByMentor(edition, active.id)}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
