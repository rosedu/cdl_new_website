import { GlyphC, GlyphD, GlyphL } from "./CdlGlyphs";

const rows = [
  { Glyph: GlyphC, rest: "ommunity" },
  { Glyph: GlyphD, rest: "evelopment" },
  { Glyph: GlyphL, rest: "ab" },
];

/**
 * The stacked logo lockup: circuit initials in green, the rest of each word in
 * blue, behind a vertical rule. The glyphs are decorative, so the readable
 * name is carried by the visually hidden text instead.
 */
export default function Lockup({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">Community Development Lab</span>
      <span aria-hidden className="flex gap-4 sm:gap-6">
        <span className="-my-2 w-px shrink-0 bg-[var(--c-logo-blue)]" />
        <span className="flex flex-col gap-1">
          {rows.map(({ Glyph, rest }) => (
            <span key={rest} className="flex items-center gap-[0.06em] leading-none">
              <Glyph className="h-[1.22em] w-auto shrink-0 text-[var(--c-logo-green)]" />
              <span className="text-[var(--c-logo-blue)]">{rest}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
