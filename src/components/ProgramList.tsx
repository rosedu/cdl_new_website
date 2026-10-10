import type { Session } from "../data/editions";
import Reveal from "./Reveal";

const style: Record<Session["kind"], { dot: string; badge: string; label: string }> = {
  workshop: { dot: "bg-[var(--c-workshop)]", badge: "text-[var(--c-workshop)]", label: "Workshop" },
  hackathon: { dot: "bg-[var(--c-hackathon)]", badge: "text-[var(--c-hackathon)]", label: "Hackathon" },
  final: { dot: "bg-[var(--c-final)]", badge: "text-[var(--c-final)]", label: "Final" },
  break: { dot: "bg-[var(--c-border-hover)]", badge: "text-[var(--c-muted)]", label: "Break" },
};

export default function ProgramList({ program }: { program: Session[] }) {
  return (
    <ol className="relative space-y-2 border-l border-[var(--c-border)] pl-6">
      {program.map((s, i) => {
        const st = style[s.kind];
        return (
          <Reveal key={i} delay={Math.min(i * 30, 240)}>
            {/* Not links, so no hover treatment. */}
            <li className="relative">
              <span className={`absolute -left-[27px] top-4 h-1.5 w-1.5 rounded-full ${st.dot}`} />
              <div
                className={`flex flex-col gap-1 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                  s.kind === "break" ? "opacity-50" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs text-[var(--c-muted)]">
                    {s.date}
                    {s.time !== "—" && <span> · {s.time}</span>}
                  </p>
                  <p className="mt-0.5 text-[15px] text-[var(--c-strong)]">{s.title}</p>
                </div>
                <span className={`shrink-0 font-mono text-[11px] uppercase tracking-wider ${st.badge}`}>{st.label}</span>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
