import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28">
      <p className="font-mono text-sm text-slate-600">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">
        You may be looking for an edition that does not have a page yet. Check the full list of editions.
      </p>
      <div className="mt-7 flex gap-3">
        <Link
          to="/"
          className="rounded-md bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-white"
        >
          Home
        </Link>
        <Link
          to="/editions"
          className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-white"
        >
          All editions
        </Link>
      </div>
    </section>
  );
}
