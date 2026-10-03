"use client";

import { useTick } from "@/lib/useTick";

export function LabHeroBoard() {
  const t = useTick();
  const dist = Math.round(42 + 18 * Math.sin(t / 3));
  const angle = Math.round(90 + 60 * Math.sin(t / 4));
  const pins = [170, 194, 218, 242, 266, 290, 314, 338, 362, 386, 410, 434];
  return (
    <svg viewBox="0 0 620 560" fill="none" fontFamily="JetBrains Mono, monospace" role="img" aria-label={`ESP32 control board wired to an ultrasonic sensor reading ${dist} cm and a servo at ${angle} degrees`}>
      <rect x="20" y="20" width="580" height="340" rx="18" fill="#141719" stroke="#2A2F33" strokeWidth="1.5" />
      {[[44, 44], [576, 44], [44, 336], [576, 336]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" stroke="#3A4045" strokeWidth="1.5" />
      ))}
      <text x="70" y="50" fill="#5E646A" fontSize="10" letterSpacing="1">NV-CTRL-01 · REV B</text>
      <g fill="#3A4045">
        {pins.map((x) => <circle key={`t${x}`} cx={x} cy="80" r="4" />)}
        {pins.map((x) => <circle key={`b${x}`} cx={x} cy="300" r="4" />)}
      </g>
      {[194, 218, 386].map((x) => <circle key={`a${x}`} cx={x} cy="300" r="4" fill="var(--accent)" />)}
      <rect x="220" y="120" width="180" height="140" rx="6" fill="#1B1F22" stroke="#8C9298" strokeWidth="1.5" />
      <rect x="236" y="136" width="148" height="80" rx="3" stroke="#3A4045" />
      <path d="M244 232h10v10h10v-10h10v10h10v-10h10v10h10v-10h10" stroke="#3A4045" strokeWidth="1.5" />
      <text x="310" y="174" fill="#EDEAE3" fontSize="18" textAnchor="middle" fontWeight="500">ESP32</text>
      <text x="310" y="196" fill="#8C9298" fontSize="10" textAnchor="middle" letterSpacing="1">WROOM-32 · 240 MHz</text>
      <rect x="470" y="130" width="70" height="44" rx="4" stroke="#3A4045" strokeWidth="1.2" />
      <text x="505" y="157" fill="#8C9298" fontSize="10" textAnchor="middle">USB-C</text>
      <circle cx="505" cy="222" r="8" fill="#5BC98A" className="pulse" />
      <text x="505" y="252" fill="#8C9298" fontSize="10" textAnchor="middle">PWR</text>
      <rect x="64" y="130" width="92" height="120" rx="4" stroke="#3A4045" strokeWidth="1.2" />
      <text x="110" y="182" fill="#8C9298" fontSize="10" textAnchor="middle">L298N</text>
      <text x="110" y="198" fill="#5E646A" fontSize="9" textAnchor="middle">DRIVER</text>
      <g stroke="#6B4A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M194 300V330H130V420" />
        <path d="M218 300V340H150V420" />
        <path d="M386 300V330H470V420" />
        <path d="M156 190H220" />
      </g>
      <g stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
        <path d="M194 300V330H130V420" className="trace-flow" />
        <path d="M386 300V330H470V420" className="trace-flow" />
        <path d="M156 190H220" className="trace-slow" />
      </g>
      <rect x="60" y="420" width="170" height="96" rx="8" fill="#141719" stroke="#2A2F33" strokeWidth="1.5" />
      <circle cx="110" cy="462" r="20" stroke="#8C9298" strokeWidth="1.5" />
      <circle cx="110" cy="462" r="9" fill="#22272A" />
      <circle cx="180" cy="462" r="20" stroke="#8C9298" strokeWidth="1.5" />
      <circle cx="180" cy="462" r="9" fill="#22272A" />
      <text x="145" y="506" fill="#8C9298" fontSize="10" textAnchor="middle" letterSpacing="1">SENSOR · HC-SR04</text>
      <rect x="400" y="420" width="150" height="96" rx="8" fill="#141719" stroke="#2A2F33" strokeWidth="1.5" />
      <circle cx="450" cy="462" r="22" stroke="#8C9298" strokeWidth="1.5" />
      <path
        d="M450 462l20 0"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transform: `rotate(${-(angle - 90) - 35}deg)`, transformOrigin: "450px 462px", transition: "transform 1s ease" }}
      />
      <circle cx="450" cy="462" r="4" fill="#EDEAE3" />
      <text x="475" y="506" fill="#8C9298" fontSize="10" textAnchor="middle" letterSpacing="1">SERVO · SG90</text>
      <text x="240" y="452" fill="#5E646A" fontSize="10" letterSpacing="1">DIST</text>
      <text x="240" y="474" fill="#EDEAE3" fontSize="18" fontWeight="500">{dist} cm</text>
      <text x="560" y="452" fill="#5E646A" fontSize="10" letterSpacing="1" textAnchor="middle">ANGLE</text>
      <text x="560" y="474" fill="#EDEAE3" fontSize="18" fontWeight="500" textAnchor="middle">{angle}°</text>
    </svg>
  );
}

export function LabStatusStrip() {
  const t = useTick();
  const temp = (28.4 + 0.6 * Math.sin(t / 5)).toFixed(1);
  return (
    <div className="strip">
      <div><small>SYSTEM STATUS</small><span><span className="dot pulse" style={{ background: "var(--green)" }} />ONLINE</span></div>
      <div><small>CURRENT BUILD</small><span>Autonomous Rover</span></div>
      <div><small>MICROCONTROLLER</small><span>ESP32</span></div>
      <div><small>STACK</small><span>C++ / Go / TypeScript</span></div>
      <div><small>BENCH TEMP</small><span style={{ color: "var(--accent)" }}>{temp} °C</span></div>
      <div><small>LAB STATUS</small><span style={{ color: "var(--blue)" }}>BUILDING</span></div>
    </div>
  );
}

export function LabSystemsDiagram() {
  const t = useTick();
  const dist = Math.round(42 + 18 * Math.sin(t / 3));
  const pwm = Math.round(62 + 20 * Math.sin(t / 5));
  const paths = ["M270 130H512", "M752 130H994", "M632 170V245H164V350", "M258 390H466", "M578 390H786", "M898 390H1060"];
  const boxes: [number, number, number, string, string, boolean?][] = [
    [70, 90, 200, "SENSOR", "HC-SR04 · 40 Hz"],
    [512, 90, 240, "ESP32", "240 MHz · dual-core", true],
    [994, 90, 200, "MOTOR", "L298N · DC ×2"],
    [70, 350, 188, "WI-FI", "MQTT · QoS 1"],
    [466, 350, 112, "BACKEND", "Go"],
    [786, 350, 112, "DATABASE", "PostgreSQL"],
    [1060, 350, 134, "DASHBOARD", "Next.js"],
  ];
  return (
    <>
      <span className="label" style={{ alignSelf: "flex-end", marginTop: -24 }}>LIVE PACKET · dist={dist}cm pwm={pwm}%</span>
      <div className="panel">
        <svg viewBox="0 0 1264 520" fill="none" fontFamily="JetBrains Mono, monospace" role="img" aria-label="Data flows from sensor to ESP32 to motor, then over Wi-Fi to a Go backend, PostgreSQL database and web dashboard">
          <rect x="10" y="10" width="1244" height="210" rx="12" stroke="#2A2F33" strokeDasharray="4 6" />
          <text x="30" y="38" fill="#8C9298" fontSize="11" letterSpacing="2">PHYSICAL WORLD</text>
          <rect x="10" y="270" width="1244" height="240" rx="12" stroke="#2A2F33" strokeDasharray="4 6" />
          <text x="30" y="298" fill="#8C9298" fontSize="11" letterSpacing="2">NETWORK + SOFTWARE</text>
          {paths.map((d) => <path key={d} d={d} stroke="#3A4045" strokeWidth="2" />)}
          {paths.map((d) => <path key={`f${d}`} d={d} stroke="var(--accent)" strokeWidth="2.5" className="trace-flow" />)}
          {boxes.map(([x, y, w, title, sub, core]) => (
            <g key={title}>
              <rect x={x} y={y} width={w} height="80" rx="10" fill="#0F1112" stroke={core ? "var(--accent)" : "#8C9298"} strokeWidth="1.5" />
              <text x={x + 20} y={y + 34} fontSize="15" fill="#EDEAE3" fontWeight="500">{title}</text>
              <text x={x + 20} y={y + 60} fontSize="11" fill="#8C9298">{sub}</text>
            </g>
          ))}
          <text x="300" y="118" fontSize="11" fill="var(--accent)">{dist} cm</text>
          <text x="782" y="118" fontSize="11" fill="var(--accent)">PWM {pwm}%</text>
          <text x="180" y="236" fontSize="11" fill="var(--accent)">{`{"dist":${dist}}`}</text>
          <circle cx="730" cy="108" r="5" fill="#5BC98A" className="pulse" />
        </svg>
      </div>
    </>
  );
}
