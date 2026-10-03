"use client";

import { useState } from "react";
import { Build } from "@/lib/types";
import BuildVisual from "./BuildVisual";

type Labels = {
  items: string; // tab name, e.g. "HARDWARE" or "FEATURES"
  itemsHeading: string; // e.g. "BILL OF MATERIALS"
  layers: string; // e.g. "SOFTWARE" or "STACK"
  layersHeading: string;
  archHeading: string; // e.g. "SIGNAL PATH"
  resultMedia: string; // e.g. "Photo of the finished" / "Screenshots of the"
  demoLabel: string;
};

const TABS = ["overview", "items", "layers", "arch", "code", "data", "result"] as const;
type Tab = (typeof TABS)[number];

const KEYWORDS = /^(void|while|def|if|for|func|export|return|const|import)\b/;
function lineColor(l: string) {
  const s = l.trim();
  if (s.startsWith("//") || s.startsWith("#")) return "var(--dim)";
  if (KEYWORDS.test(s)) return "var(--copper)";
  return "#D6D2CA";
}

function Chart({ b }: { b: Build }) {
  const s = b.series;
  const mn = Math.min(...s);
  const mx = Math.max(...s);
  const px = (i: number) => 48 + i * (652 / (s.length - 1));
  const py = (v: number) => 20 + (1 - (v - mn) / (mx - mn || 1)) * 240;
  const points = s.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const last = s[s.length - 1];
  return (
    <div className="split wide">
      <div className="a chart">
        <span className="insp-label">{b.dataLabel} · SAMPLE DATA</span>
        <svg viewBox="0 0 720 320" fill="none" fontFamily="JetBrains Mono, monospace" role="img" aria-label={`${b.dataLabel} over time`}>
          <path d="M48 20H700M48 100H700M48 180H700M48 260H700" stroke="#22272A" />
          <text x="40" y="24" fill="#8C9298" fontSize="11" textAnchor="end">{mx}</text>
          <text x="40" y="264" fill="#8C9298" fontSize="11" textAnchor="end">{mn}</text>
          <text x="48" y="296" fill="#8C9298" fontSize="11">{b.xStart}</text>
          <text x="700" y="296" fill="#8C9298" fontSize="11" textAnchor="end">now</text>
          <polyline key={b.id} points={points} stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="draw" />
          <circle cx={px(s.length - 1)} cy={py(last)} r="5" fill="var(--accent)" />
        </svg>
      </div>
      <div className="b kv">
        <div style={{ flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11 }}>LATEST</span>
          <span className="stat-big">
            {last} <span style={{ fontSize: 14, color: "var(--muted)" }}>{b.unit}</span>
          </span>
        </div>
        <div style={{ flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11 }}>MIN / MAX</span>
          <span style={{ fontSize: 20 }}>{mn} / {mx}</span>
        </div>
        <div style={{ flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11 }}>POINTS</span>
          <span style={{ fontSize: 20 }}>{s.length}</span>
        </div>
      </div>
    </div>
  );
}

export default function Builds({ builds, labels }: { builds: Build[]; labels: Labels }) {
  const [selId, setSelId] = useState(builds[0].id);
  const [tab, setTab] = useState<Tab>("overview");
  const sel = builds.find((b) => b.id === selId) ?? builds[0];

  const tabName: Record<Tab, string> = {
    overview: "OVERVIEW",
    items: labels.items,
    layers: labels.layers,
    arch: "ARCHITECTURE",
    code: "CODE",
    data: "DATA",
    result: "RESULT",
  };

  const pick = (id: string) => {
    setSelId(id);
    document.getElementById("inspector")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <>
      <div className="cards3">
        {builds.map((b) => {
          const on = b.id === sel.id;
          return (
            <article key={b.id} className={`card${on ? " on" : ""}`}>
              <div className="card-head">
                <span className="no">{b.no}</span>
                <span className="status" style={{ color: b.statusColor }}>
                  <span className="dot" style={{ background: b.statusColor, width: 6, height: 6 }} />
                  {b.status}
                </span>
              </div>
              <div className="card-visual">
                <BuildVisual visual={b.visual} />
              </div>
              <div className="card-body">
                <h3>{b.name}</h3>
                <div className="specs">
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <span>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                <button className="card-btn tact" onClick={() => pick(b.id)} aria-pressed={on} aria-controls="inspector">
                  {on ? "● INSPECTING" : "VIEW BUILD →"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="insp" id="inspector">
        <div className="insp-head">
          <div className="title">
            <span className="kicker">INSPECTING · {sel.no}</span>
            <b>{sel.name}</b>
          </div>
          <div className="tabs" role="tablist" aria-label="Build details">
            {TABS.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className="tab tact" onClick={() => setTab(t)}>
                {tabName[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="insp-body" role="tabpanel">
          {tab === "overview" && (
            <div className="split">
              <div className="a">
                <span className="insp-label">OVERVIEW</span>
                <p className="big-text">{sel.overview}</p>
              </div>
              <div className="b kv">
                <div>
                  <span>STATUS</span>
                  <span style={{ color: sel.statusColor }}>{sel.status}</span>
                </div>
                {sel.facts.map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "items" && (
            <div className="stackv">
              <span className="insp-label">{labels.itemsHeading}</span>
              <div className="tiles">
                {sel.items.map((h, i) => (
                  <div className="tile" key={i}>
                    <small>{h.k}</small>
                    <span>{h.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "layers" && (
            <div className="stackv">
              <span className="insp-label">{labels.layersHeading}</span>
              <div>
                {sel.layers.map((s) => (
                  <div className="layer" key={s.k}>
                    <span className="k">{s.k}</span>
                    <span className="v">{s.v}</span>
                    <span className="d">{s.d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "arch" && (
            <div className="stackv" style={{ gap: 28 }}>
              <span className="insp-label">{labels.archHeading}</span>
              <div className="arch">
                {sel.arch.map((label, i) => (
                  <div className="arch-step" key={label}>
                    <div className={`arch-node${i === 1 ? " core" : ""}`}>
                      <small>STEP {String(i + 1).padStart(2, "0")}</small>
                      <b>{label}</b>
                    </div>
                    {i < sel.arch.length - 1 && (
                      <svg width="42" height="12" viewBox="0 0 42 12" fill="none" aria-hidden="true">
                        <path d="M2 6h34" stroke="#D98E4A" strokeWidth="2" className="trace-flow" />
                        <path d="M34 1l6 5-6 5" stroke="#D98E4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="lead" style={{ maxWidth: 760, fontSize: 16 }}>{sel.archNote}</p>
            </div>
          )}

          {tab === "code" && (
            <div className="stackv" style={{ gap: 16 }}>
              <div className="insp-label" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>SOURCE · {sel.file}</span>
                <span>{sel.codeLang}</span>
              </div>
              <pre className="code" style={{ margin: 0 }}>
                {sel.code.map((l, i) => (
                  <div key={i}>
                    <span className="n">{i + 1}</span>
                    <span className="t" style={{ color: lineColor(l) }}>{l}</span>
                  </div>
                ))}
              </pre>
            </div>
          )}

          {tab === "data" && <Chart b={sel} />}

          {tab === "result" && (
            <div className="split wide">
              <div className="a">
                <div className="photo">[{labels.resultMedia} {sel.name}]</div>
              </div>
              <div className="b stackv" style={{ gap: 16 }}>
                <span className="insp-label">RESULT</span>
                <p style={{ fontSize: 18, lineHeight: 1.6 }}>{sel.result}</p>
                <div className="row">
                  <a href={sel.demoUrl ?? "#"} className="btn btn-mono tact">{labels.demoLabel} →</a>
                  <a href={sel.sourceUrl ?? "#"} className="btn btn-mono tact">SOURCE →</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
