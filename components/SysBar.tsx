"use client";

import Link from "next/link";
import { useTick, useUptime } from "@/lib/useTick";
import { site } from "@/lib/site";

type Props = {
  tag: string;
  nav: { href: string; label: string }[];
  live?: string;
  back?: boolean;
};

export default function SysBar({ tag, nav, live = "ON", back = false }: Props) {
  const uptime = useUptime(useTick());
  return (
    <header className="sysbar">
      <Link href="/" className="brand" aria-label={`${site.name} — home`}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="20" height="20" rx="3" stroke="#EDEAE3" strokeWidth="1.5" />
          <path d="M9 1v4M15 1v4M21 1v4M9 25v4M15 25v4M21 25v4M1 9h4M1 15h4M1 21h4M25 9h4M25 15h4M25 21h4" stroke="#8C9298" strokeWidth="1.5" />
          <path d="M10 20V10M20 10l-7 6M20 20l-6.5-5.5" stroke="#D98E4A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <b>{site.name}</b>
        <span className="tag">{back ? "← SELECT MODE" : tag}</span>
      </Link>
      <nav aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="tact">
            {n.label}
          </a>
        ))}
      </nav>
      <div className="right">
        <span>UPTIME {uptime}</span>
        <span className="pill">
          <span className="dot pulse" style={{ background: "var(--green)" }} />
          {live}
        </span>
      </div>
    </header>
  );
}
