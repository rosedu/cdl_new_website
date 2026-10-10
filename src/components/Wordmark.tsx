import { Link, useLocation } from "react-router-dom";
import { CdlMark } from "./CdlGlyphs";

/**
 * The header mark. On the home page there is nowhere for it to go, so it
 * renders as plain artwork rather than as a link that does nothing.
 */
export default function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const mark = <CdlMark className="h-7" />;

  if (onHome) {
    return (
      <span className="flex items-center">
        {mark}
        <span className="sr-only">Community Development Lab</span>
      </span>
    );
  }

  return (
    <Link
      to="/"
      onClick={onNavigate}
      title="Back to the home page"
      className="flex items-center rounded-md transition-opacity hover:opacity-70"
    >
      {mark}
      <span className="sr-only">Back to the home page</span>
    </Link>
  );
}
