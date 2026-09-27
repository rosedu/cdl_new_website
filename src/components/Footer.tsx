import { Link } from "react-router-dom";

const social = [
  { href: "https://github.com/rosedu", label: "GitHub" },
  { href: "https://www.facebook.com/rosedu.org", label: "Facebook" },
  { href: "https://instagram.com/rosedu_org", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.08]">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">A project by</p>
          <a href="https://www.rosedu.org" target="_blank" rel="noreferrer" className="mt-3 inline-block">
            <img
              src="/img/rosedu_logo_transparent.png"
              alt="ROSEdu"
              className="logo-light h-9 opacity-70 transition-opacity hover:opacity-100"
            />
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-slate-300">Navigation</p>
          <Link to="/" className="block text-slate-500 transition-colors hover:text-white">Home</Link>
          <Link to="/editions" className="block text-slate-500 transition-colors hover:text-white">All editions</Link>
          <a href="mailto:contact@rosedu.org" className="block text-slate-500 transition-colors hover:text-white">
            contact@rosedu.org
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-slate-300">Community</p>
          {social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block text-slate-500 transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-5 py-5 text-center text-xs text-slate-600">
        CDL is organised by ROSEdu. All course content is open source.
      </div>
    </footer>
  );
}
