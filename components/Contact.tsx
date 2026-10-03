"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Props = {
  kicker: string;
  status: string;
  consoleLines: React.ReactNode;
  fieldLabel: string;
  placeholder: string;
  sendLabel: string;
};

/** Contact console: the message becomes the body of an email to you. */
export default function ContactConsole({ kicker, status, consoleLines, fieldLabel, placeholder, sendLabel }: Props) {
  const [msg, setMsg] = useState("");
  const href = `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(msg)}`;
  return (
    <div id="contact" className="box raised">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="kicker">{kicker}</span>
        <span className="mono" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--green)" }}>
          <span className="dot pulse" style={{ background: "var(--green)" }} />
          {status}
        </span>
      </div>
      <div className="console">{consoleLines}</div>
      <label htmlFor="contact-msg" className="insp-label">{fieldLabel}</label>
      <input id="contact-msg" className="field" type="text" placeholder={placeholder} value={msg} onChange={(e) => setMsg(e.target.value)} />
      <div className="contact-actions">
        <a href={href} className="btn btn-primary btn-mono tact grow">{sendLabel}</a>
        <a href={site.links.upwork} className="btn btn-mono tact" target="_blank" rel="noreferrer">UPWORK</a>
        <a href={site.links.github} className="btn btn-mono tact" target="_blank" rel="noreferrer">GITHUB</a>
        <a href={site.links.linkedin} className="btn btn-mono tact" target="_blank" rel="noreferrer">LINKEDIN</a>
      </div>
    </div>
  );
}

export function ProfileBox({ kicker, statement, rows }: { kicker: string; statement: string; rows: [string, string][] }) {
  return (
    <div id="about" className="box">
      <span className="kicker">{kicker}</span>
      <p className="statement">{statement}</p>
      <div className="kv">
        {rows.map(([k, v]) => (
          <div key={k}>
            <span>{k}</span>
            <span style={{ textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
