import { Link } from "react-router-dom";

const social = [
  { href: "https://github.com/rosedu", label: "GitHub" },
  { href: "https://www.facebook.com/rosedu.org", label: "Facebook" },
  { href: "https://instagram.com/rosedu_org", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="text-sm text-slate-400">Un proiect</p>
          <a href="https://www.rosedu.org" target="_blank" rel="noreferrer" className="mt-2 inline-block">
            <img src="/img/rosedu_logo_transparent.png" alt="ROSEdu" className="h-10 opacity-90 transition hover:opacity-100" />
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Navigare</p>
          <Link to="/" className="block text-slate-400 hover:text-white">Acasă</Link>
          <Link to="/editii" className="block text-slate-400 hover:text-white">Toate edițiile</Link>
          <a href="mailto:contact@rosedu.org" className="block text-slate-400 hover:text-white">contact@rosedu.org</a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Comunitate</p>
          {social.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="block text-slate-400 hover:text-white">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-slate-500">
        Hacked with ♥ by ROSEdu · conținutul CDL este open source
      </div>
    </footer>
  );
}
