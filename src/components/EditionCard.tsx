import { Link } from "react-router-dom";
import { editionPath, type Edition } from "../data/editions";

export default function EditionCard({ edition, index = 0 }: { edition: Edition; index?: number }) {
  const workshops = edition.program.filter((s) => s.kind === "workshop").length;
  const hackathons = edition.program.filter((s) => s.kind === "hackathon").length;

  return (
    <Link
      to={editionPath(edition)}
      className="glass group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: index % 2 ? "var(--color-accent-2)" : "var(--color-accent)" }}
      />
      <div className="relative">
        <p className="font-mono text-xs text-slate-500">{editionPath(edition)}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{edition.label}</h3>
        <p className="mt-1 text-sm text-slate-400">{edition.period}</p>
        <p className="mt-4 line-clamp-2 text-sm text-slate-300">{edition.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium">
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300">{edition.program.length} ședințe</span>
          <span className="rounded-full bg-[var(--color-accent-2)]/10 px-2.5 py-1 text-[var(--color-accent-2)]">{workshops} ateliere</span>
          <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-1 text-[#b3a4ff]">{hackathons} hackathoane</span>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
          Vezi ediția
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
