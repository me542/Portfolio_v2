import type { Metadata } from "next";
import SysBar from "@/components/SysBar";
import Builds from "@/components/Builds";
import ToolInventory from "@/components/ToolInventory";
import ContactConsole, { ProfileBox } from "@/components/Contact";
import { ExperimentsAndTimeline, Stackup } from "@/components/Sections";
import { StudioHeroApps, StudioStatusStrip, StudioSystemsDiagram } from "@/components/studio/StudioLive";
import { studioBuilds, studioExperiments, studioStack, studioTimeline, studioTools } from "@/lib/studio-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `From Idea to App — ${site.name}`,
  description: "Web apps, mobile apps and the APIs behind them, built with Next.js, Flutter, Go and PostgreSQL.",
};

const nav = [
  { href: "#studio", label: "STUDIO" },
  { href: "#builds", label: "BUILDS" },
  { href: "#systems", label: "SYSTEMS" },
  { href: "#experiments", label: "EXPERIMENTS" },
  { href: "#stack", label: "STACK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export default function StudioPage() {
  return (
    <div className="wrap">
      <SysBar tag="v2026.09" nav={nav} live="LIVE" back />
      <main className="inner">
        <section id="studio" className="hero">
          <div className="hero-copy">
            <span className="label">WEB · MOBILE · BACKEND</span>
            <h1 className="h1">
              FROM IDEA<br />
              <span style={{ color: "var(--accent)" }}>TO APP.</span>
            </h1>
            <p>Web apps, mobile apps and the APIs behind them, built from idea to launch by one developer.</p>
            <div className="row">
              <a href="#builds" className="btn btn-primary tact">Inspect the builds</a>
              <a href="#contact" className="btn tact">Start a project</a>
            </div>
          </div>
          <div className="hero-visual">
            <StudioHeroApps />
          </div>
          <StudioStatusStrip />
        </section>

        <section id="builds" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">02 / BUILDS</span>
              <h2 className="h2">Builds</h2>
              <p className="lead">Apps I&apos;ve designed, coded, shipped, broken, fixed and shipped again.</p>
            </div>
            <span className="label">SELECT A BUILD TO INSPECT ↓</span>
          </div>
          <Builds
            builds={studioBuilds}
            labels={{
              items: "FEATURES",
              itemsHeading: "SCREENS & FEATURES",
              layers: "STACK",
              layersHeading: "STACK",
              archHeading: "REQUEST PATH",
              resultMedia: "Screenshots of the",
              demoLabel: "LIVE DEMO",
            }}
          />
        </section>

        <section id="systems" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">03 / SYSTEMS</span>
              <h2 className="h2">One backend, every screen</h2>
            </div>
          </div>
          <StudioSystemsDiagram />
        </section>

        <section id="toolkit" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">04 / TOOLKIT</span>
              <h2 className="h2">What I build with</h2>
            </div>
            <span className="label">HOVER A TOOL TO SEE HOW I USE IT</span>
          </div>
          <ToolInventory
            groups={studioTools}
            defaultId="next"
            readoutTitle="TOOL READOUT"
            activeLabel="IN USE"
            groupLabel="LAYER"
            specLabel="I USE IT FOR"
          />
        </section>

        <ExperimentsAndTimeline experiments={studioExperiments} timeline={studioTimeline} timelineTitle="HOW A PROJECT SHIPS" />
        <Stackup layers={studioStack} note="L1 = CLOSEST TO THE DATA" />

        <section className="duo">
          <ProfileBox
            kicker="07 / DEVELOPER PROFILE"
            statement="I build the whole product: the mobile app, the web app, the API and the database. One developer, one plan, and clean code you fully own."
            rows={[
              ["NAME", site.name],
              ["FOCUS", "Web + Mobile + Backend"],
              ["BEST FOR", "MVPs · SaaS · Booking systems"],
              ["CURRENTLY BUILDING", site.currentlyBuilding],
              ["CURRENTLY LEARNING", site.currentlyLearning],
            ]}
          />
          <ContactConsole
            kicker="08 / START A PROJECT"
            status="STATUS: 200 OK"
            consoleLines={
              <>
                <div><span style={{ color: "var(--green)" }}>POST</span> <span style={{ color: "#D6D2CA" }}>/projects</span></div>
                <div style={{ color: "var(--muted)" }}>{'{ "idea": "your app", "budget": "…" }'}</div>
                <div style={{ color: "var(--green)" }}>→ 201 Created.</div>
              </>
            }
            fieldLabel="WHAT DO YOU WANT TO BUILD?"
            placeholder="A booking app for my clinic…"
            sendLabel="SEND REQUEST"
          />
        </section>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name.toUpperCase()} · FROM IDEA TO APP</span>
        <span>BUILD 2026.09 · ALL SERVICES HEALTHY</span>
      </footer>
    </div>
  );
}
