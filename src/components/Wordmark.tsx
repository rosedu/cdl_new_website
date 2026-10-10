import { Link, useLocation } from "react-router-dom";

/** The CDL keycaps, redrawn so they follow the theme instead of shipping a white PNG. */
function Keycaps() {
  return (
    <svg width="62" height="20" viewBox="0 0 62 20" aria-hidden className="shrink-0">
      {["C", "D", "L"].map((letter, i) => (
        <g key={letter} transform={`translate(${i * 21}, 0)`}>
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="4"
            fill="var(--c-surface-2)"
            stroke="var(--c-border-strong)"
          />
          <text
            x="10"
            y="14.5"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--c-strong)"
          >
            {letter}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * The site's wordmark. On the home page there is nowhere for it to go, so it
 * renders as plain text rather than as a link that does nothing.
 */
export default function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const content = (
    <>
      <Keycaps />
      <span className="hidden text-sm text-[var(--c-muted)] sm:inline">Community Development Lab</span>
    </>
  );

  if (onHome) {
    return <span className="flex items-center gap-3">{content}</span>;
  }

  return (
    <Link
      to="/"
      onClick={onNavigate}
      title="Back to the home page"
      className="flex items-center gap-3 rounded-md transition-opacity hover:opacity-70"
    >
      {content}
      <span className="sr-only">Back to the home page</span>
    </Link>
  );
}
