type Exp = { id: string; name: string; status: string; color: string };

export function ExperimentsAndTimeline({
  experiments,
  timeline,
  timelineTitle,
  currentStep = 4,
}: {
  experiments: Exp[];
  timeline: [string, string][];
  timelineTitle: string;
  currentStep?: number;
}) {
  return (
    <section id="experiments" className="section exp">
      <div className="log">
        <span className="kicker">05 / EXPERIMENT LOG</span>
        <div className="log-rows">
          {experiments.map((e) => (
            <div className="log-row" key={e.id}>
              <span className="id">{e.id}</span>
              <span className="nm">{e.name}</span>
              <span className="st" style={{ color: e.color }}>
                <span className="dot" style={{ background: e.color, width: 6, height: 6 }} />
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="tl-wrap">
        <span className="label">{timelineTitle}</span>
        <ol className="tl" style={{ listStyle: "none", margin: 0 }}>
          {timeline.map(([label, note], i) => {
            const done = i < currentStep;
            const cur = i === currentStep;
            const ring = cur ? "var(--accent)" : done ? "var(--muted)" : "var(--line-2)";
            const fill = done ? "var(--muted)" : cur ? "var(--accent)" : "transparent";
            const color = cur ? "var(--accent)" : done ? "var(--text)" : "var(--muted)";
            return (
              <li className="tl-step" key={label} aria-current={cur ? "step" : undefined}>
                <div className="tl-rail">
                  <span className="tl-node" style={{ borderColor: ring, background: fill }} />
                  {i < timeline.length - 1 && <span className="tl-line" />}
                </div>
                <div className="tl-text">
                  <b style={{ color }}>{label}</b>
                  <span>{note}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Stackup({ layers, note }: { layers: [string, string[]][]; note: string }) {
  const shades = ["#1B1F22", "#181B1E", "#16191B", "#141719", "#121416"];
  return (
    <section id="stack" className="section">
      <div className="section-head">
        <div>
          <span className="kicker">06 / STACK</span>
          <h2 className="h2">Layer stackup</h2>
        </div>
        <span className="label">{note}</span>
      </div>
      <div className="stackup">
        {layers.map(([name, items], i) => (
          <div className="stack-row" key={name} style={{ background: shades[i] }}>
            <span className="n">L{i + 1}</span>
            <span className="nm">{name}</span>
            <div className="items">
              {items.map((x) => (
                <span className="tok" key={x}>{x}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
