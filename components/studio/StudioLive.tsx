"use client";

import { useTick } from "@/lib/useTick";

function useServerStats() {
  const t = useTick();
  return {
    latency: Math.round(38 + 9 * Math.sin(t / 3)),
    rps: Math.round(120 + 30 * Math.sin(t / 4)),
    users: 214 + Math.round(12 * Math.sin(t / 5)),
    bookings: 48 + (Math.floor(t / 6) % 12),
  };
}

export function StudioHeroApps() {
  const { latency, rps, users, bookings } = useServerStats();
  const bars: [number, number][] = [[140, 30], [168, 46], [196, 38], [224, 60], [252, 52], [280, 70], [308, 78]];
  return (
    <svg viewBox="0 0 620 560" fill="none" fontFamily="JetBrains Mono, monospace" role="img" aria-label="A web app and a mobile app both connected to one Go API and a PostgreSQL database">
      <rect x="20" y="30" width="380" height="250" rx="12" fill="#141719" stroke="#2A2F33" strokeWidth="1.5" />
      <path d="M20 62h380" stroke="#2A2F33" strokeWidth="1.5" />
      {[40, 58, 76].map((x) => <circle key={x} cx={x} cy="46" r="5" fill="#3A4045" />)}
      <rect x="100" y="38" width="200" height="16" rx="8" fill="#1B1F22" />
      <text x="200" y="50" fill="#8C9298" fontSize="9" textAnchor="middle">app.yourclient.com</text>
      <rect x="36" y="78" width="72" height="186" rx="6" fill="#1B1F22" />
      <rect x="46" y="92" width="52" height="8" rx="4" fill="var(--accent)" />
      {[[112, 44], [128, 48], [144, 40]].map(([y, w]) => <rect key={y} x="46" y={y} width={w} height="6" rx="3" fill="#3A4045" />)}
      <rect x="122" y="78" width="126" height="64" rx="6" stroke="#2A2F33" />
      <text x="134" y="98" fill="#8C9298" fontSize="9">BOOKINGS TODAY</text>
      <text x="134" y="126" fill="#EDEAE3" fontSize="20" fontWeight="500">{bookings}</text>
      <rect x="258" y="78" width="126" height="64" rx="6" stroke="#2A2F33" />
      <text x="270" y="98" fill="#8C9298" fontSize="9">ACTIVE USERS</text>
      <text x="270" y="126" fill="#EDEAE3" fontSize="20" fontWeight="500">{users}</text>
      <rect x="122" y="152" width="262" height="112" rx="6" stroke="#2A2F33" />
      {bars.map(([x, h]) => <rect key={x} x={x} y={250 - h} width="18" height={h} rx="2" fill="#3A4045" />)}
      <rect x="336" y="164" width="18" height="86" rx="2" fill="var(--accent)" />
      <text x="40" y="300" fill="#8C9298" fontSize="10" letterSpacing="1">WEB · NEXT.JS</text>
      <rect x="444" y="30" width="156" height="300" rx="24" fill="#141719" stroke="#8C9298" strokeWidth="1.5" />
      <rect x="498" y="42" width="48" height="10" rx="5" fill="#22272A" />
      <text x="460" y="84" fill="#EDEAE3" fontSize="12" fontWeight="500">Book a slot</text>
      <rect x="460" y="98" width="124" height="44" rx="8" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="472" y="118" fill="#EDEAE3" fontSize="10">Tue · 10:30</text>
      <text x="472" y="132" fill="var(--accent)" fontSize="9">SELECTED</text>
      <rect x="460" y="150" width="124" height="44" rx="8" stroke="#2A2F33" />
      <text x="472" y="176" fill="#8C9298" fontSize="10">Tue · 13:00</text>
      <rect x="460" y="202" width="124" height="44" rx="8" stroke="#2A2F33" />
      <text x="472" y="228" fill="#8C9298" fontSize="10">Wed · 09:00</text>
      <rect x="460" y="278" width="124" height="36" rx="10" fill="var(--accent)" />
      <text x="522" y="301" fill="#0F1112" fontSize="11" textAnchor="middle" fontWeight="500">Confirm</text>
      <text x="444" y="352" fill="#8C9298" fontSize="10" letterSpacing="1">MOBILE · FLUTTER</text>
      <g stroke="#3A4045" strokeWidth="2.5">
        <path d="M210 280V400H250" />
        <path d="M522 330V400H410" />
        <path d="M330 440V480" />
      </g>
      <g stroke="var(--accent)" strokeWidth="2.5">
        <path d="M210 280V400H250" className="trace-flow" />
        <path d="M522 330V400H410" className="trace-flow" />
        <path d="M330 440V480" className="trace-slow" />
      </g>
      <rect x="250" y="370" width="160" height="70" rx="10" fill="#0F1112" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="266" y="398" fill="#EDEAE3" fontSize="14" fontWeight="500">Go API</text>
      <text x="266" y="422" fill="#8C9298" fontSize="10">p95 {latency} ms</text>
      <rect x="250" y="480" width="160" height="60" rx="10" fill="#0F1112" stroke="#8C9298" strokeWidth="1.5" />
      <text x="266" y="506" fill="#EDEAE3" fontSize="14" fontWeight="500">PostgreSQL</text>
      <text x="266" y="526" fill="#8C9298" fontSize="10">{rps} queries/s</text>
      <circle cx="392" cy="392" r="5" fill="#5BC98A" className="pulse" />
    </svg>
  );
}

export function StudioStatusStrip() {
  const { latency } = useServerStats();
  return (
    <div className="strip">
      <div><small>SYSTEM STATUS</small><span><span className="dot pulse" style={{ background: "var(--green)" }} />AVAILABLE</span></div>
      <div><small>CURRENT BUILD</small><span>Booking Platform</span></div>
      <div><small>PLATFORMS</small><span>Web · iOS · Android</span></div>
      <div><small>STACK</small><span>Next.js / Flutter / Go</span></div>
      <div><small>API P95</small><span style={{ color: "var(--accent)" }}>{latency} ms</span></div>
      <div><small>TIMEZONE</small><span style={{ color: "var(--blue)" }}>GMT+8 · US/AU/EU</span></div>
    </div>
  );
}

export function StudioSystemsDiagram() {
  const { latency, rps } = useServerStats();
  const flows: [string, string][] = [
    ["M232 150V230H512", "trace-flow"],
    ["M632 150V210", "trace-flow"],
    ["M1032 150V230H752", "trace-flow"],
    ["M560 290V400H214V420", "trace-slow"],
    ["M600 290V420", "trace-flow"],
    ["M664 290V420", "trace-slow"],
    ["M704 290V400H1050V420", "trace-slow"],
  ];
  const boxes: [number, number, number, string, string, boolean?][] = [
    [122, 70, 220, "MOBILE APP", "Flutter · iOS + Android"],
    [522, 70, 220, "WEB APP", "Next.js · SSR"],
    [922, 70, 220, "ADMIN PANEL", "Next.js · role-based"],
    [512, 210, 240, "GO API", `REST · JSON · ${rps} req/s`, true],
    [114, 420, 200, "AUTH", "JWT · sessions"],
    [444, 420, 176, "POSTGRESQL", "SQL · migrations"],
    [644, 420, 176, "PAYMENTS", "Stripe · PayMongo"],
    [950, 420, 200, "STORAGE", "Files · images"],
  ];
  return (
    <>
      <span className="label" style={{ alignSelf: "flex-end", marginTop: -24 }}>LIVE · {rps} req/s · p95 {latency} ms</span>
      <div className="panel">
        <svg viewBox="0 0 1264 540" fill="none" fontFamily="JetBrains Mono, monospace" role="img" aria-label="A mobile app, web app and admin panel all call one Go API, which uses authentication, payments, PostgreSQL and file storage">
          <rect x="10" y="10" width="1244" height="170" rx="12" stroke="#2A2F33" strokeDasharray="4 6" />
          <text x="30" y="38" fill="#8C9298" fontSize="11" letterSpacing="2">CLIENTS</text>
          <rect x="10" y="340" width="1244" height="190" rx="12" stroke="#2A2F33" strokeDasharray="4 6" />
          <text x="30" y="368" fill="#8C9298" fontSize="11" letterSpacing="2">SERVICES + DATA</text>
          {flows.map(([d]) => <path key={d} d={d} stroke="#3A4045" strokeWidth="2" />)}
          {flows.map(([d, c]) => <path key={`f${d}`} d={d} stroke="var(--accent)" strokeWidth="2.5" className={c} />)}
          {boxes.map(([x, y, w, title, sub, core]) => (
            <g key={title}>
              <rect x={x} y={y} width={w} height="80" rx="10" fill="#0F1112" stroke={core ? "var(--accent)" : "#8C9298"} strokeWidth="1.5" />
              <text x={x + 20} y={y + 34} fontSize="15" fill="#EDEAE3" fontWeight="500">{title}</text>
              <text x={x + 20} y={y + 60} fontSize="11" fill="#8C9298">{sub}</text>
            </g>
          ))}
          <text x="248" y="220" fontSize="11" fill="var(--accent)">POST /bookings</text>
          <text x="646" y="190" fontSize="11" fill="var(--accent)">GET /slots</text>
          <text x="850" y="220" fontSize="11" fill="var(--accent)">PATCH /users</text>
          <circle cx="732" cy="230" r="5" fill="#5BC98A" className="pulse" />
        </svg>
      </div>
    </>
  );
}
