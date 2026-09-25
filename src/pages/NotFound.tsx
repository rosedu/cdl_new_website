import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-7xl font-bold text-white/10">404</p>
      <h1 className="mt-4 text-3xl font-bold text-white">Pagina nu există</h1>
      <p className="mt-3 text-slate-400">
        Poate cauți o ediție care nu are încă pagină. Verifică lista completă de ediții.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-slate-200">
          Acasă
        </Link>
        <Link to="/editii" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">
          Toate edițiile
        </Link>
      </div>
    </section>
  );
}
