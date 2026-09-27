import { useState } from "react";
import type { Mentor } from "../data/editions";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const sizes = {
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base",
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
        className={`${cls} object-cover ring-1 ring-white/10`}
      />
    );
  }

  return (
    <span
      className={`${cls} grid place-items-center bg-white/[0.06] font-medium text-slate-300 ring-1 ring-white/10`}
    >
      {initials(mentor.name)}
    </span>
  );
}
