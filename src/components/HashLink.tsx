import { useNavigate, useLocation } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";

/** Scroll to an anchor. Returns false if the element does not exist (yet). */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * Link to an anchor on another page (e.g. "/#program").
 * If we are already on the target page it scrolls directly — react-router does
 * not fire anything when both the route and the hash stay the same.
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
