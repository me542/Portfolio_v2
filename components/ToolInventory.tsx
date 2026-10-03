"use client";

import { useState } from "react";
import { ToolGroup } from "@/lib/types";

type Props = {
  groups: ToolGroup[];
  defaultId: string;
  readoutTitle: string;
  activeLabel: string;
  groupLabel: string;
  specLabel: string;
};

export default function ToolInventory({ groups, defaultId, readoutTitle, activeLabel, groupLabel, specLabel }: Props) {
  const [active, setActive] = useState(defaultId);
  let current = { name: "", desc: "", spec: "", group: "" };
  for (const g of groups) {
    const it = g.items.find((i) => i.id === active);
    if (it) current = { ...it, group: g.title };
  }

  return (
    <div className="tools">
      <div className="tool-groups">
        {groups.map((g) => (
          <div className="tool-group" key={g.title}>
            <span className="insp-label">{g.title}</span>
            <div className="chips">
              {g.items.map((it) => (
                <button
                  key={it.id}
                  className={`chip tact${it.id === active ? " on" : ""}`}
                  onMouseEnter={() => setActive(it.id)}
                  onFocus={() => setActive(it.id)}
                  onClick={() => setActive(it.id)}
                  aria-pressed={it.id === active}
                >
                  <span className="dot" />
                  {it.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="readout" aria-live="polite">
        <div className="insp-label" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{readoutTitle}</span>
          <span style={{ color: "var(--green)" }}>● {activeLabel}</span>
        </div>
        <span className="name">{current.name}</span>
        <p>{current.desc}</p>
        <div className="kv">
          <div>
            <span>{groupLabel}</span>
            <span>{current.group}</span>
          </div>
          <div>
            <span>{specLabel}</span>
            <span>{current.spec}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
