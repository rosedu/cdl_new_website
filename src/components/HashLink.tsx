import { useNavigate, useLocation } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";

/** Scroll catre o ancora. Intoarce false daca elementul nu exista (inca). */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * Link catre o ancora de pe alta pagina (ex. "/#program").
 * Daca suntem deja pe pagina tinta, face scroll direct — react-router nu
 * declanseaza nimic cand ruta si hash-ul raman aceleasi.
 */
export default function HashLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [path, hash] = to.split("#");
  const target = path || "/";

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    if (pathname === target) {
      window.history.replaceState(null, "", `${target}#${hash}`);
      scrollToHash(`#${hash}`);
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handle} className={className}>
      {children}
    </a>
  );
}
