import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28">
      <p className="font-mono text-sm text-[var(--c-muted)]">404</p>
      <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
      <p className="mt-3 text-[var(--c-text)]">
        You may be looking for an edition that does not have a page yet. Check the full list of editions.
      </p>
      <div className="mt-7 flex gap-3">
        <Link
          to="/"
          className="rounded-md btn-green px-5 py-2.5 text-sm font-medium text-white transition-colors "
        >
          Home
        </Link>
        <Link
          to="/editions"
          className="btn-green-outline rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
        >
          All editions
        </Link>
      </div>
    </section>
  );
}
