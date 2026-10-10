/**
 * The CDL initials drawn as circuit traces, after the project's logo.
 * Every stroke uses `currentColor`, so colour comes from CSS and each glyph
 * follows whichever theme is active.
 */

const common = {
  viewBox: "0 0 100 112",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const OUTLINE = 3.4;
const TRACE = 2.2;
const DOT = 3;

export function GlyphC({ className = "" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M 85.2,26.4 A 46,46 0 1 0 85.2,85.6 L 70.7,73.4 A 27,27 0 1 1 70.7,38.6 Z" strokeWidth={OUTLINE} />
      <path d="M 67.1,23.8 A 36.5,36.5 0 1 0 67.1,88.2" strokeWidth={TRACE} />
      <path d="M 62,33 A 27.5,27.5 0 0 0 30,56" strokeWidth={TRACE} />
      <circle cx="67.1" cy="23.8" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="67.1" cy="88.2" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="30" cy="56" r={DOT} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphD({ className = "" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M 14,10 H 48 A 46,46 0 0 1 48,102 H 14 Z" strokeWidth={OUTLINE} />
      <path d="M 32,28 H 48 A 28,28 0 0 1 48,84 H 32 Z" strokeWidth={TRACE} />
      <path d="M 23,18 V 94" strokeWidth={TRACE} />
      <path d="M 57,19 A 37,37 0 0 1 86,48" strokeWidth={TRACE} />
      <circle cx="23" cy="18" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="23" cy="94" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="57" cy="19" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="86" cy="48" r={DOT} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphL({ className = "" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M 14,10 H 36 V 84 H 90 V 102 H 14 Z" strokeWidth={OUTLINE} />
      <path d="M 25,20 V 93 H 80" strokeWidth={TRACE} />
      <path d="M 45,93 V 76" strokeWidth={TRACE} />
      <circle cx="25" cy="20" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="80" cy="93" r={DOT} fill="currentColor" stroke="none" />
      <circle cx="45" cy="76" r={DOT} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The horizontal CDL mark, as used in the header. */
export function CdlMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.12em] text-[var(--c-logo-green)] ${className}`}>
      <GlyphC className="h-full w-auto" />
      <GlyphD className="h-full w-auto" />
      <GlyphL className="h-full w-auto" />
    </span>
  );
}
