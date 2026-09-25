import { useState } from "react";
import type { Mentor } from "../data/editions";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const sizes = {
  md: "h-16 w-16 text-lg",
  lg: "h-20 w-20 text-xl",
};

export default function Avatar({ mentor, size = "md" }: { mentor: Mentor; size?: keyof typeof sizes }) {
  const [failed, setFailed] = useState(false);
  const cls = `${sizes[size]} shrink-0 rounded-full`;

  if (mentor.avatar && !failed) {
    return (
      <img
        src={mentor.avatar}
        alt={mentor.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${cls} object-cover ring-1 ring-white/15`}
      />
    );
  }

  return (
    <span
      className={`${cls} grid place-items-center bg-gradient-to-br from-[var(--color-accent)]/70 to-[var(--color-accent-2)]/70 font-semibold text-black`}
    >
      {initials(mentor.name)}
    </span>
  );
}
