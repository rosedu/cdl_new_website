import Reveal from "../components/Reveal";
import EditionCard from "../components/EditionCard";
import { editions, legacyEditions } from "../data/editions";

export default function EditionsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-5xl px-5 pb-8 pt-14">
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">All CDL editions</h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              CDL has been running since 2013. Recent editions have their own pages; the historical ones are kept on
              the old website.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i * 50, 250)} className="h-full">
              <EditionCard edition={e} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <Reveal>
          <h2 className="text-lg font-semibold text-white">Historical editions (2013–2020)</h2>
          <p className="mt-2 text-sm text-slate-500">
            Archived on the old website, with the projects and materials of the time.
          </p>
        </Reveal>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {legacyEditions.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i * 30, 200)}>
              <a
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-md border border-white/[0.08] px-4 py-3 text-sm transition-colors hover:border-white/20"
              >
                <span className="text-slate-300">{e.label}</span>
                <span className="text-slate-600 transition-colors group-hover:text-white" aria-hidden>↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
