import type { Metadata } from "next";
import SysBar from "@/components/SysBar";
import Builds from "@/components/Builds";
import ToolInventory from "@/components/ToolInventory";
import ContactConsole, { ProfileBox } from "@/components/Contact";
import { ExperimentsAndTimeline, Stackup } from "@/components/Sections";
import { LabHeroBoard, LabStatusStrip, LabSystemsDiagram } from "@/components/lab/LabLive";
import { labBuilds, labExperiments, labStack, labTimeline, labTools } from "@/lib/lab-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `From Code to Machine — ${site.name}`,
  description: "Embedded systems, robotics and hardware builds, from firmware to dashboard.",
};

const nav = [
  { href: "#lab", label: "LAB" },
  { href: "#builds", label: "BUILDS" },
  { href: "#systems", label: "SYSTEMS" },
  { href: "#experiments", label: "EXPERIMENTS" },
  { href: "#stack", label: "STACK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export default function LabPage() {
  return (
    <div className="wrap">
      <SysBar tag="REV 2026.09" nav={nav} back />
      <main className="inner">
        <section id="lab" className="hero">
          <div className="hero-copy">
            <span className="label">SOFTWARE · EMBEDDED · ROBOTICS</span>
            <h1 className="h1">
              FROM CODE<br />
              <span style={{ color: "var(--accent)" }}>TO MACHINE.</span>
            </h1>
            <p>Software, embedded systems, robotics, and experimental hardware built from ideas into working systems.</p>
            <div className="row">
              <a href="#builds" className="btn btn-primary tact">Inspect the builds</a>
              <a href="#contact" className="btn tact">Open a connection</a>
            </div>
          </div>
          <div className="hero-visual">
            <LabHeroBoard />
          </div>
          <LabStatusStrip />
        </section>

        <section id="builds" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">02 / BUILDS</span>
              <h2 className="h2">Builds</h2>
              <p className="lead">Things I&apos;ve designed, programmed, broken, fixed, and built.</p>
            </div>
            <span className="label">SELECT A MODULE TO INSPECT ↓</span>
          </div>
          <Builds
            builds={labBuilds}
            labels={{
              items: "HARDWARE",
              itemsHeading: "BILL OF MATERIALS",
              layers: "SOFTWARE",
              layersHeading: "SOFTWARE LAYERS",
              archHeading: "SIGNAL PATH",
              resultMedia: "Photo of the finished",
              demoLabel: "DEMO VIDEO",
            }}
          />
        </section>

        <section id="systems" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">03 / SYSTEMS</span>
              <h2 className="h2">How software talks to hardware</h2>
            </div>
          </div>
          <LabSystemsDiagram />
        </section>

        <section id="hardware" className="section">
          <div className="section-head">
            <div>
              <span className="kicker">04 / HARDWARE LAB</span>
              <h2 className="h2">Parts bin</h2>
            </div>
            <span className="label">HOVER A PART TO POWER IT ON</span>
          </div>
          <ToolInventory
            groups={labTools}
            defaultId="esp32"
            readoutTitle="COMPONENT READOUT"
            activeLabel="ACTIVE"
            groupLabel="CLASS"
            specLabel="SPEC"
          />
        </section>

        <ExperimentsAndTimeline experiments={labExperiments} timeline={labTimeline} timelineTitle="BUILD PROCESS" />
        <Stackup layers={labStack} note="L1 = CLOSEST TO THE METAL" />

        <section className="duo">
          <ProfileBox
            kicker="07 / ENGINEER PROFILE"
            statement="I like the moment a line of code makes something physical move. I build the firmware, the backend and the dashboard, so the whole system works together."
            rows={[
              ["NAME", site.name],
              ["FOCUS", "Software + Embedded Systems"],
              ["INTERESTS", "Robotics · Automation · IoT · Electronics"],
              ["CURRENTLY BUILDING", site.currentlyBuilding],
              ["CURRENTLY LEARNING", site.currentlyLearning],
            ]}
          />
          <ContactConsole
            kicker="08 / ESTABLISH CONNECTION"
            status="STATUS: READY"
            consoleLines={
              <>
                <div style={{ color: "var(--muted)" }}>$ connect {site.name.toLowerCase()} --port 443</div>
                <div><span style={{ color: "var(--accent)" }}>&gt;</span> hello</div>
                <div style={{ color: "var(--green)" }}>Connection available.</div>
              </>
            }
            fieldLabel="YOUR MESSAGE"
            placeholder="Tell me what you want to build"
            sendLabel="SEND MESSAGE"
          />
        </section>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name.toUpperCase()} · FROM CODE TO MACHINE</span>
        <span>BUILD 2026.09 · ALL SYSTEMS NOMINAL</span>
      </footer>
    </div>
  );
}
