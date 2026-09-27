import type { Edition } from "../data/editions";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * The button linking to the project spreadsheet.
 * Only rendered for the current edition (`isCurrent`), since the project list
 * is only relevant while the edition is running.
 */
export default function ProjectsButton({ edition, isCurrent }: { edition: Edition; isCurrent: boolean }) {
  if (!isCurrent) return null;

  const from = edition.projectsPublicFrom;
  const released = !from || new Date() >= new Date(from);

  if (edition.projectsUrl && released) {
    return (
      <a
        href={edition.projectsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400 hover:text-slate-900"
      >
        Project list
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <span
      title={from ? `The list is published on ${fmt(from)}` : "The project list is published soon"}
      className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-slate-300 px-5 py-3 text-sm text-slate-500"
    >
      Project list
      <span className="font-normal text-slate-500">{from ? ` · from ${fmt(from)}` : " · soon"}</span>
    </span>
  );
}
