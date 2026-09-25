import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HashLink from "./HashLink";
import { currentEdition, editionPath } from "../data/editions";

const links = [
  { to: "/#despre", label: "Despre" },
  { to: "/#program", label: "Program" },
  { to: "/editii", label: "Ediții" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "border-b border-white/10 bg-[var(--color-ink)]/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] font-mono text-sm font-bold text-black shadow-lg shadow-[var(--color-accent)]/25">
            &gt;_
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            CDL<span className="ml-1.5 hidden text-slate-400 sm:inline">Curs de Dezvoltare Liberă</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink
                key={l.to}
                to={l.to}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </HashLink>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to={editionPath(currentEdition)}
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200"
          >
            Ediția {currentEdition.label}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Meniu"
          className="rounded-lg border border-white/10 p-2 md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[var(--color-ink)]/95 px-5 py-3 md:hidden">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5"
              >
                {l.label}
              </HashLink>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5"
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to={editionPath(currentEdition)}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-white px-3 py-2.5 text-center text-sm font-semibold text-black"
          >
            Ediția {currentEdition.label}
          </Link>
        </div>
      )}
    </header>
  );
}
