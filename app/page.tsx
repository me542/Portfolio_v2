import Link from "next/link";
import { site } from "@/lib/site";

const skills: { name: string; n: string; color: string; items: string[] }[] = [
  { name: "Web", n: "01", color: "var(--blue)", items: ["Next.js", "React", "TypeScript"] },
  { name: "Mobile", n: "02", color: "var(--blue)", items: ["Flutter", "Dart", "iOS + Android"] },
  { name: "Backend", n: "03", color: "var(--blue)", items: ["Go", "REST API", "PostgreSQL"] },
  { name: "Embedded", n: "04", color: "var(--copper)", items: ["C / C++", "Arduino", "ESP32"] },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="wrap">
      <header className="sysbar">
        <Link href="/" className="brand">
          <b>{site.name}</b>
          <span className="tag">PROFILE · SELECT MODE</span>
        </Link>
        <nav aria-label="Sections">
          <a href="#about" className="tact">ABOUT</a>
          <a href="#skills" className="tact">SKILLS</a>
          <a href="#explore" className="tact">EXPLORE</a>
        </nav>
        <div className="right">
          <span className="pill">
            <span className="dot pulse" style={{ background: "var(--green)" }} />
            AVAILABLE
          </span>
        </div>
      </header>

      <main className="inner">
        <section id="about" className="intro">
          <div className="intro-copy">
            <span className="label" style={{ fontSize: 13 }}>HELLO, I&apos;M</span>
            <h1 className="intro-name">
              {site.name}
              <span style={{ color: "var(--copper)" }}>.</span>
            </h1>
            <p className="intro-tag">
              Full-stack developer who builds <span style={{ color: "var(--blue)" }}>web &amp; mobile apps</span> and{" "}
              <span style={{ color: "var(--copper)" }}>the machines they talk to</span>.
            </p>
            <p className="intro-bio">
              I take ideas from a sketch to a working product: the Flutter app, the Next.js dashboard, the Go API, the
              PostgreSQL database, and sometimes the ESP32 on the other end. One developer, one plan, clean code you fully own.
            </p>
            <div className="row">
              <a href={site.links.github} className="btn btn-mono tact" target="_blank" rel="noreferrer">
                <Icon d="M8 17l-5-5 5-5M16 7l5 5-5 5" />GITHUB
              </a>
              <a href={site.links.linkedin} className="btn btn-mono tact" target="_blank" rel="noreferrer">
                <Icon d="M3 3h18v18H3zM8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />LINKEDIN
              </a>
              <a href={site.links.upwork} className="btn btn-mono tact" target="_blank" rel="noreferrer">
                <Icon d="M3 7h18v13H3zM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />UPWORK
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-primary btn-mono tact">
                <Icon d="M3 5h18v14H3zM3 7l9 6 9-6" />EMAIL ME
              </a>
            </div>
          </div>

          <aside className="profile" aria-label="Developer profile">
            <div className="insp-label" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>DEVELOPER PROFILE</span>
              <span>ID · NV-01</span>
            </div>
            <div className="profile-top">
              {/* Put your photo at public/me.jpg and replace this div with:
                  <img src="/me.jpg" alt="Photo of Niv" className="avatar" /> */}
              <div className="avatar">[Your photo]</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 600 }}>{site.name}</span>
                <span style={{ fontSize: 15, color: "var(--soft)" }}>{site.role}</span>
                <span className="mono" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--green)" }}>
                  <span className="dot pulse" style={{ background: "var(--green)" }} />
                  OPEN TO NEW PROJECTS
                </span>
              </div>
            </div>
            <div className="kv">
              <div><span>LOCATION</span><span>{site.location}</span></div>
              <div><span>HOURS</span><span>US · AU · EU overlap</span></div>
              <div><span>FOCUS</span><span>Web · Mobile · Backend</span></div>
              <div><span>ALSO BUILDS</span><span>Embedded · IoT</span></div>
              <div><span>BEST FOR</span><span>MVPs · SaaS · Booking apps</span></div>
            </div>
          </aside>
        </section>

        <section id="skills" className="section" style={{ paddingTop: 88, gap: 24 }}>
          <div className="section-head">
            <span className="label">SKILLS · WHAT I BUILD WITH</span>
            <span className="label">4 LAYERS · 1 DEVELOPER</span>
          </div>
          <div className="skills">
            {skills.map((s) => (
              <div className="skill" key={s.name}>
                <div className="skill-top">
                  <b>{s.name}</b>
                  <span className="mono" style={{ fontSize: 11, color: s.color }}>{s.n}</span>
                </div>
                <div className="chips" style={{ gap: 8 }}>
                  {s.items.map((i) => <span className="tok" key={i} style={{ fontSize: 12, padding: "6px 10px" }}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="explore" className="section" style={{ paddingTop: 104, gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="label">CHOOSE HOW YOU WANT TO EXPLORE MY WORK</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: -1.5 }}>
              Two workshops. <span style={{ color: "var(--muted)" }}>Pick one to enter.</span>
            </h2>
          </div>

          <div className="modes">
            <Link href="/lab" className="mode lab">
              <div className="mode-top">
                <span style={{ color: "var(--copper)" }}>MODE 01</span>
                <span style={{ color: "var(--muted)" }}>EMBEDDED · ROBOTICS · IOT</span>
              </div>
              <svg viewBox="0 0 360 240" fill="none" fontFamily="JetBrains Mono, monospace" aria-hidden="true">
                <rect x="10" y="10" width="340" height="150" rx="14" stroke="#2A2F33" strokeWidth="1.5" />
                <rect x="130" y="40" width="100" height="84" rx="6" fill="#1B1F22" stroke="#8C9298" strokeWidth="1.5" />
                <text x="180" y="88" fill="#EDEAE3" fontSize="14" textAnchor="middle">ESP32</text>
                <g fill="#3A4045">
                  {[110, 130, 150, 170, 190, 210, 230, 250].map((x) => <circle key={x} cx={x} cy="28" r="3" />)}
                </g>
                <path d="M150 124V180H70V196" stroke="#6B4A2E" strokeWidth="3" />
                <path d="M210 124V180H290V196" stroke="#6B4A2E" strokeWidth="3" />
                <path d="M150 124V180H70V196" stroke="#D98E4A" strokeWidth="3" className="trace-flow" />
                <path d="M210 124V180H290V196" stroke="#D98E4A" strokeWidth="3" className="trace-flow" />
                <rect x="20" y="196" width="100" height="38" rx="6" stroke="#8C9298" strokeWidth="1.5" />
                <text x="70" y="220" fill="#8C9298" fontSize="10" textAnchor="middle">SENSOR</text>
                <rect x="240" y="196" width="100" height="38" rx="6" stroke="#8C9298" strokeWidth="1.5" />
                <text x="290" y="220" fill="#8C9298" fontSize="10" textAnchor="middle">SERVO</text>
                <circle cx="316" cy="36" r="6" fill="#5BC98A" className="pulse" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3>FROM CODE<br /><span style={{ color: "var(--copper)" }}>TO MACHINE.</span></h3>
                <p>The engineering lab: embedded systems, robotics and hardware I&apos;ve programmed and built.</p>
                <span className="enter">ENTER THE LAB →</span>
              </div>
            </Link>

            <Link href="/studio" className="mode studio">
              <div className="mode-top">
                <span style={{ color: "var(--blue)" }}>MODE 02</span>
                <span style={{ color: "var(--muted)" }}>WEB · MOBILE · BACKEND</span>
              </div>
              <svg viewBox="0 0 360 240" fill="none" fontFamily="JetBrains Mono, monospace" aria-hidden="true">
                <rect x="10" y="10" width="220" height="140" rx="10" stroke="#8C9298" strokeWidth="1.5" />
                <path d="M10 30h220" stroke="#2A2F33" strokeWidth="1.5" />
                <rect x="24" y="44" width="46" height="92" rx="4" fill="#22272A" />
                <g fill="#3A4045">
                  {[[86, 36], [108, 48], [130, 42], [152, 60], [174, 66]].map(([x, h]) => <rect key={x} x={x} y={136 - h} width="14" height={h} rx="2" />)}
                </g>
                <rect x="196" y="58" width="14" height="78" rx="2" fill="#6FA8FF" />
                <rect x="258" y="10" width="92" height="170" rx="16" stroke="#EDEAE3" strokeWidth="1.5" />
                <rect x="270" y="40" width="68" height="26" rx="6" stroke="#6FA8FF" strokeWidth="1.5" />
                <rect x="270" y="72" width="68" height="26" rx="6" stroke="#2A2F33" />
                <rect x="270" y="146" width="68" height="20" rx="8" fill="#6FA8FF" />
                <path d="M120 150V206H150" stroke="#3A4045" strokeWidth="2.5" />
                <path d="M304 180V206H250" stroke="#3A4045" strokeWidth="2.5" />
                <path d="M120 150V206H150" stroke="#6FA8FF" strokeWidth="2.5" className="trace-flow" />
                <path d="M304 180V206H250" stroke="#6FA8FF" strokeWidth="2.5" className="trace-flow" />
                <rect x="150" y="190" width="100" height="38" rx="6" stroke="#6FA8FF" strokeWidth="1.5" />
                <text x="200" y="214" fill="#EDEAE3" fontSize="11" textAnchor="middle">GO API</text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3>FROM IDEA<br /><span style={{ color: "var(--blue)" }}>TO APP.</span></h3>
                <p>The software studio: web apps, mobile apps and the APIs behind them, from idea to launch.</p>
                <span className="enter">ENTER THE STUDIO →</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name.toUpperCase()} · PHILIPPINES</span>
        <span>SOFTWARE · WEB · MOBILE · HARDWARE</span>
      </footer>
    </div>
  );
}
