import { isProjectListPublic, parseDay, type Edition } from "../data/editions";

const fmt = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * The button linking to the project spreadsheet.
 * Only rendered for the current edition (`isCurrent`), since the project list
 * is only relevant while the edition is running.
 */
export default function ProjectsButton({ edition, isCurrent }: { edition: Edition; isCurrent: boolean }) {
  if (!isCurrent) return null;

  const from = edition.projectsPublicFrom;

  if (isProjectListPublic(edition)) {
    return (
      <a
        href={edition.projectsUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-green-outline inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors"
      >
        Project list
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <span
      title={from ? `The list is published on ${fmt(from)}` : "The project list is published soon"}
      className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-[var(--c-border-strong)] px-5 py-3 text-sm text-[var(--c-muted)]"
    >
      Project list
      <span className="font-normal text-[var(--c-muted)]">{from ? ` · from ${fmt(from)}` : " · soon"}</span>
    </span>
  );
}
