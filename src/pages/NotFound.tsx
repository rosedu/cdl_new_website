import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28">
      <p className="font-mono text-sm text-slate-500">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        You may be looking for an edition that does not have a page yet. Check the full list of editions.
      </p>
      <div className="mt-7 flex gap-3">
        <Link
          to="/"
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Home
        </Link>
        <Link
          to="/editions"
          className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400 hover:text-slate-900"
        >
          All editions
        </Link>
      </div>
    </section>
  );
}
