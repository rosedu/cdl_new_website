import type { Sponsor, SponsorTier } from "../data/editions";
import Reveal from "./Reveal";

const tierLabel: Record<SponsorTier, string> = {
  main: "Main sponsor",
  partner: "Partner",
  supporter: "Supporter",
};

const tierOrder: SponsorTier[] = ["main", "partner", "supporter"];

function SponsorLogo({ sponsor, big }: { sponsor: Sponsor; big?: boolean }) {
  const inner = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      loading="lazy"
      className={`${big ? "max-h-14" : "max-h-10"} w-auto opacity-60 transition-opacity group-hover:opacity-100`}
    />
  ) : (
    <span className={`${big ? "text-lg" : "text-sm"} font-medium text-slate-700`}>{sponsor.name}</span>
  );

  const cls = `glass group flex items-center justify-center ${big ? "p-7" : "p-5"} transition-colors hover:border-slate-400`;

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
    .map((tier) => ({ tier, items: sponsors.filter((s) => (s.tier ?? "partner") === tier) }))
    .filter((g) => g.items.length);

  return (
    <section id="sponsors" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-12">
      <Reveal>
        <h2 className="text-xl font-semibold text-slate-900">Sponsors and partners</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          CDL is free for participants thanks to the organisations supporting the edition.
        </p>
      </Reveal>

      <div className="mt-8 space-y-8">
        {groups.map((g) => {
          const big = g.tier === "main";
          return (
            <Reveal key={g.tier}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{tierLabel[g.tier]}</p>
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
