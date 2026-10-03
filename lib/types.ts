export type Build = {
  id: string;
  no: string;
  name: string;
  status: string;
  statusColor: string;
  /** The four spec rows on the card, e.g. ["CONTROL", "ESP32"] */
  specs: [string, string][];
  /** Which small drawing to show on the card */
  visual: "rover" | "greenhouse" | "arm" | "booking" | "saas" | "api";
  overview: string;
  /** Rows in the Overview tab's side table */
  facts: [string, string][];
  /** Hardware parts (lab) or screens/features (studio) */
  items: { k: string; v: string }[];
  /** Software layers / stack */
  layers: { k: string; v: string; d: string }[];
  arch: string[];
  archNote: string;
  file: string;
  codeLang: string;
  code: string[];
  dataLabel: string;
  unit: string;
  xStart: string;
  series: number[];
  result: string;
  demoUrl?: string;
  sourceUrl?: string;
};

export type ToolGroup = {
  title: string;
  items: { id: string; name: string; desc: string; spec: string }[];
};

export const C = {
  green: "#5BC98A",
  amber: "#E3B341",
  blue: "#6FA8FF",
  copper: "#D98E4A",
};
