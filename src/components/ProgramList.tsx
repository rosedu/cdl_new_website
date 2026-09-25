import type { Session } from "../data/editions";
import Reveal from "./Reveal";

const style: Record<Session["kind"], { dot: string; badge: string; label: string }> = {
  workshop: { dot: "bg-[var(--color-accent-2)]", badge: "bg-[var(--color-accent-2)]/10 text-[var(--color-accent-2)]", label: "Atelier" },
  hackathon: { dot: "bg-[var(--color-accent)]", badge: "bg-[var(--color-accent)]/15 text-[#b3a4ff]", label: "Hackathon" },
  final: { dot: "bg-[var(--color-accent-3)]", badge: "bg-[var(--color-accent-3)]/15 text-[#ff9ab6]", label: "Final" },
  liber: { dot: "bg-slate-600", badge: "bg-white/5 text-slate-400", label: "Liber" },
};

export default function ProgramList({ program }: { program: Session[] }) {
  return (
    <ol className="relative space-y-3 border-l border-white/10 pl-6">
      {program.map((s, i) => {
        const st = style[s.kind];
        return (
          <Reveal key={i} delay={Math.min(i * 40, 320)}>
            <li className="relative">
              <span className={`absolute -left-[31px] top-5 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--color-ink)] ${st.dot}`} />
              <div
                className={`glass flex flex-col gap-1 p-4 transition hover:border-white/20 hover:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between ${
                  s.kind === "liber" ? "opacity-55" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">
                    {s.date} {s.time !== "—" && <span className="text-slate-500">· {s.time}</span>}
                  </p>
                  <p className="mt-0.5 text-[15px] font-medium text-white">{s.title}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${st.badge}`}>{st.label}</span>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
