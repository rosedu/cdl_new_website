import { Link } from "react-router-dom";
import { editionPath, type Edition } from "../data/editions";

export default function EditionCard({ edition }: { edition: Edition }) {
  const workshops = edition.program.filter((s) => s.kind === "workshop").length;
  const hackathons = edition.program.filter((s) => s.kind === "hackathon").length;

  return (
    <Link
      to={editionPath(edition)}
      className="glass group flex h-full flex-col p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
    >
      <p className="font-mono text-xs text-slate-600">{editionPath(edition)}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{edition.label}</h3>
      <p className="mt-1 text-sm text-slate-500">{edition.period}</p>
      <p className="mt-3 text-sm text-slate-400">{edition.tagline}</p>
      <p className="mt-4 font-mono text-xs text-slate-500">
        {edition.program.length} sessions · {workshops} workshops · {hackathons} hackathons
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors group-hover:text-white">
        View edition
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
