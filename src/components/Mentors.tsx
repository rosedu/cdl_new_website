import { useState } from "react";
import type { Edition, Mentor } from "../data/editions";
import { projectsByMentor } from "../data/editions";
import Avatar from "./Avatar";
import MentorDialog from "./MentorDialog";
import Reveal from "./Reveal";

function MentorCard({
  mentor,
  projectCount,
  onOpen,
}: {
  mentor: Mentor;
  projectCount: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Detalii despre ${mentor.name}`}
      className="glass group h-full w-full cursor-pointer p-6 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="flex flex-col items-start gap-4">
        <Avatar mentor={mentor} />
        <div className="min-w-0">
          <h3 className="font-semibold text-white">{mentor.name}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {projectCount ? `${projectCount} ${projectCount === 1 ? "proiect" : "proiecte"}` : "proiecte în curând"}
          </p>
        </div>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition group-hover:text-white">
        Vezi proiectele
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}

export default function Mentors({ edition, upcoming }: { edition: Edition; upcoming?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const mentors = edition.mentors ?? [];
  const active = mentors.find((m) => m.id === openId);

  if (!mentors.length && !upcoming) return null;

  return (
    <section id="mentori" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-12">
      <Reveal>
        <h2 className="text-2xl font-bold text-white">Mentori</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Oamenii care te ghidează prin prima ta contribuție open source. Dă click pe un mentor ca să-i vezi
          proiectele și datele de contact.
        </p>
      </Reveal>

      {mentors.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <Reveal key={m.id} delay={Math.min(i * 60, 300)} className="h-full">
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
          <div className="glass mt-8 flex flex-col items-start gap-3 border-dashed p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">Mentorii se anunță în curând</p>
              <p className="mt-1 text-sm text-slate-400">
                Lista de mentori pentru această ediție va fi publicată înainte de prima ședință.
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
