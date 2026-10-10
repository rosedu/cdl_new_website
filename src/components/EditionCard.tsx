import { Link } from "react-router-dom";
import { editionPath, sessionCount, type Edition } from "../data/editions";

export default function EditionCard({ edition }: { edition: Edition }) {
  const workshops = edition.program.filter((s) => s.kind === "workshop").length;
  const hackathons = edition.program.filter((s) => s.kind === "hackathon").length;

  return (
    <Link
      to={editionPath(edition)}
      className="glass group flex h-full flex-col p-5 transition-colors hover:border-[var(--c-border-hover)] hover:bg-[var(--c-surface-hover)]"
    >
      <p className="font-mono text-xs text-[var(--c-muted)]">{editionPath(edition)}</p>
      <h3 className="mt-2 text-xl font-semibold">{edition.label}</h3>
      <p className="meta mt-1 text-sm">{edition.period}</p>
      <p className="mt-3 text-sm text-[var(--c-text)]">{edition.tagline}</p>
      <p className="mt-4 font-mono text-xs text-[var(--c-muted)]">
        {sessionCount(edition)} sessions · {workshops} workshops · {hackathons} hackathons
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--c-text)] transition-colors group-hover:text-[var(--c-strong)]">
        View edition
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
