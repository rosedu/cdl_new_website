import type { Edition } from "../data/editions";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

/**
 * Butonul catre spreadsheet-ul cu proiecte.
 * Se randeaza doar pentru editia curenta (`isCurrent`), pentru ca lista de
 * proiecte are sens doar cat timp editia e in desfasurare.
 */
export default function ProjectsButton({ edition, isCurrent }: { edition: Edition; isCurrent: boolean }) {
  if (!isCurrent) return null;

  const from = edition.projectsPublicFrom;
  const released = !from || new Date() >= new Date(from);

  if (edition.projectsUrl && released) {
    return (
      <a
        href={edition.projectsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
      >
        Vezi lista de proiecte
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <span
      title={from ? `Lista se publică pe ${fmt(from)}` : "Lista de proiecte se publică în curând"}
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-500"
    >
      Lista de proiecte
      <span className="font-normal text-slate-600">
        {from ? `· din ${fmt(from)}` : "· în curând"}
      </span>
    </span>
  );
}
