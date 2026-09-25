import type { Sponsor, SponsorTier } from "../data/editions";
import Reveal from "./Reveal";

const tierLabel: Record<SponsorTier, string> = {
  principal: "Sponsor principal",
  partener: "Partener",
  sustinator: "Susținător",
};

const tierOrder: SponsorTier[] = ["principal", "partener", "sustinator"];

function SponsorLogo({ sponsor, big }: { sponsor: Sponsor; big?: boolean }) {
  const inner = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      loading="lazy"
      className={`${big ? "max-h-16" : "max-h-10"} w-auto opacity-80 transition group-hover:opacity-100`}
    />
  ) : (
    <span className={`${big ? "text-xl" : "text-base"} font-semibold text-slate-200`}>{sponsor.name}</span>
  );

  const cls = `glass group flex items-center justify-center ${big ? "p-8" : "p-6"} transition hover:border-white/20 hover:bg-white/[0.06]`;

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noreferrer" className={cls} title={sponsor.name}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Sponsors({ sponsors }: { sponsors?: Sponsor[] }) {
  if (!sponsors?.length) return null;

  const groups = tierOrder
    .map((tier) => ({ tier, items: sponsors.filter((s) => (s.tier ?? "partener") === tier) }))
    .filter((g) => g.items.length);

  return (
    <section id="sponsori" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-12">
      <Reveal>
        <h2 className="text-2xl font-bold text-white">Sponsori și parteneri</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          CDL este gratuit pentru participanți datorită organizațiilor care susțin ediția.
        </p>
      </Reveal>

      <div className="mt-8 space-y-8">
        {groups.map((g) => {
          const big = g.tier === "principal";
          return (
            <Reveal key={g.tier}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{tierLabel[g.tier]}</p>
                <div
                  className={`mt-3 grid gap-4 ${
                    big ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {g.items.map((s) => (
                    <SponsorLogo key={s.name} sponsor={s} big={big} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
