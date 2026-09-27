import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HashLink from "./HashLink";
import { currentEdition, editionPath } from "../data/editions";

const links = [
  { to: "/#about", label: "About" },
  { to: "/#program", label: "Program" },
  { to: "/editions", label: "Editions" },
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

  const linkClass = "rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "border-b border-slate-200 bg-[var(--color-page)]/90 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-slate-100 font-mono text-xs text-slate-700">
            &gt;_
          </span>
          <span className="text-sm font-semibold text-slate-900">
            CDL<span className="ml-2 hidden font-normal text-slate-500 sm:inline">Community Development Lab</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink key={l.to} to={l.to} className={`cursor-pointer ${linkClass}`}>
                {l.label}
              </HashLink>
            ) : (
              <Link key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            )
          )}
          <Link
            to={editionPath(currentEdition)}
            className="ml-2 rounded-md border border-slate-300 px-3.5 py-2 text-sm text-slate-800 transition-colors hover:border-slate-400 hover:text-slate-900"
          >
            {currentEdition.label}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="cursor-pointer rounded-md border border-slate-200 p-2 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-px w-5 bg-slate-400 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-slate-400 transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-slate-400 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-[var(--color-page)]/95 px-5 py-3 md:hidden">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900"
              >
                {l.label}
              </HashLink>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900"
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to={editionPath(currentEdition)}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md border border-slate-300 px-3 py-2.5 text-center text-sm text-slate-800"
          >
            {currentEdition.label}
          </Link>
        </div>
      )}
    </header>
  );
}
