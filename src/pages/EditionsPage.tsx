import Reveal from "../components/Reveal";
import EditionCard from "../components/EditionCard";
import { editions, legacyEditions } from "../data/editions";

export default function EditionsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Arhivă</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Toate edițiile CDL</h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              CDL se ține din 2013. Edițiile recente au pagini dedicate, iar cele istorice sunt păstrate pe site-ul
              vechi.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((e, i) => (
            <Reveal key={e.id} delay={i * 60}>
              <EditionCard edition={e} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <Reveal>
          <h2 className="text-xl font-semibold text-white">Ediții istorice (2013–2020)</h2>
          <p className="mt-2 text-sm text-slate-400">Arhivate pe site-ul vechi, cu proiectele și materialele de atunci.</p>
        </Reveal>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {legacyEditions.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i * 40, 240)}>
              <a
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-white/25 hover:bg-white/5"
              >
                <span className="text-slate-200">{e.label}</span>
                <span className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
