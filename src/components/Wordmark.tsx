import { Link, useLocation } from "react-router-dom";
import { CdlMark } from "./CdlGlyphs";

/**
 * The header mark, with a back-to-home button on its left. The button is left
 * out on the home page, where it would have nowhere to go.
 */
export default function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <div className="flex items-center gap-3">
      {!onHome && (
        <Link
          to="/"
          onClick={onNavigate}
          title="Back to the home page"
          className="group grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[var(--c-border)] text-[var(--c-muted)] transition-colors hover:border-[var(--c-border-hover)] hover:text-[var(--c-strong)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M13 8H3" />
            <path d="M7 4 3 8l4 4" />
          </svg>
          <span className="sr-only">Back to the home page</span>
        </Link>
      )}

      <CdlMark className="h-7" />
      <span className="sr-only">Community Development Lab</span>
    </div>
  );
}
