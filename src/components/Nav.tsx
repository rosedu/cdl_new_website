import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HashLink from "./HashLink";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
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

  const linkClass =
    "rounded-md px-3 py-2 text-sm text-[var(--c-text)] transition-colors hover:text-[var(--c-strong)]";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-[var(--c-border)] bg-[var(--c-page)]/90 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Wordmark onNavigate={() => setOpen(false)} />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink
                key={l.to}
                to={l.to}
                className={`cursor-pointer ${linkClass}`}
              >
                {l.label}
              </HashLink>
            ) : (
              <Link key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ),
          )}
          <ThemeToggle className="ml-1" />
          <Link
            to={editionPath(currentEdition)}
            className="btn-green-outline ml-1 rounded-md px-3.5 py-2 text-sm transition-colors"
          >
            {currentEdition.label}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="cursor-pointer rounded-md border border-[var(--c-border)] p-2"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-[var(--c-muted)] transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[var(--c-muted)] transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[var(--c-muted)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--c-border)] bg-[var(--c-page)]/95 px-5 py-3 md:hidden">
          {links.map((l) =>
            l.to.includes("#") ? (
              <HashLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-md px-3 py-2.5 text-sm text-[var(--c-text)] hover:text-[var(--c-strong)]"
              >
                {l.label}
              </HashLink>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-[var(--c-text)] hover:text-[var(--c-strong)]"
              >
                {l.label}
              </Link>
            ),
          )}
          <Link
            to={editionPath(currentEdition)}
            onClick={() => setOpen(false)}
            className="btn-green-outline mt-2 block rounded-md px-3 py-2.5 text-center text-sm"
          >
            {currentEdition.label}
          </Link>
        </div>
      )}
    </header>
  );
}
