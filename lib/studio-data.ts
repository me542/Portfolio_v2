// ─────────────────────────────────────────────────────────────
// SOFTWARE STUDIO CONTENT
// These builds, charts and results are EXAMPLES. Replace them with
// your real projects and real numbers before you publish the site.
// ─────────────────────────────────────────────────────────────
import { Build, C, ToolGroup } from "./types";

export const studioBuilds: Build[] = [
  {
    id: "booking", no: "BUILD 001", name: "Appointment Booking Platform", status: "LIVE", statusColor: C.green,
    specs: [["PLATFORM", "Web · iOS · Android"], ["FRONTEND", "Flutter + Next.js"], ["BACKEND", "Go"], ["DATA", "PostgreSQL"]],
    visual: "booking",
    overview: "Customers book appointments in a mobile app, staff manage schedules in a web admin panel, and one Go API keeps both in sync in real time.",
    facts: [["PLATFORM", "Web · iOS · Android"], ["ROLE", "Full-stack"], ["BUILD TIME", "8 weeks"]],
    items: [
      { k: "MOBILE", v: "Browse & book slots" }, { k: "MOBILE", v: "Push reminders" }, { k: "WEB", v: "Staff calendar" },
      { k: "WEB", v: "Customer records" }, { k: "API", v: "Double-booking guard" }, { k: "PAYMENTS", v: "Deposits online" },
    ],
    layers: [
      { k: "MOBILE", v: "Flutter", d: "One codebase for iOS and Android" },
      { k: "WEB", v: "Next.js", d: "Admin panel with role-based access" },
      { k: "API", v: "Go", d: "REST endpoints, auth and booking rules" },
      { k: "DATA", v: "PostgreSQL", d: "Bookings, users and availability" },
    ],
    arch: ["FLUTTER APP", "GO API", "AUTH", "BOOKING RULES", "POSTGRESQL", "ADMIN PANEL"],
    archNote: "The API checks availability inside a database transaction, so two customers can never grab the same slot, even when they tap at the same moment.",
    file: "booking.go", codeLang: "Go",
    code: [
      "func (s *Service) Book(ctx context.Context, r Req) error {",
      "  return s.db.Tx(ctx, func(tx *sql.Tx) error {",
      "    // lock the slot so no one else can take it",
      "    slot, err := s.lockSlot(tx, r.SlotID)",
      "    if err != nil || slot.Taken {",
      "      return ErrSlotTaken",
      "    }",
      "    return s.insertBooking(tx, r)",
      "  })",
      "}",
    ],
    dataLabel: "BOOKINGS PER DAY", unit: "/day", xStart: "day 1",
    series: [4, 6, 5, 8, 9, 11, 10, 13, 15, 14, 18, 20, 19, 23, 25, 24, 28, 31, 30, 34, 37, 36, 41, 44],
    result: "Replaced a paper booking book and phone calls with self-service booking and automatic reminders.",
  },
  {
    id: "saas", no: "BUILD 002", name: "SaaS Analytics Dashboard", status: "BETA", statusColor: C.amber,
    specs: [["PLATFORM", "Web"], ["FRONTEND", "Next.js"], ["BACKEND", "Go"], ["DATA", "PostgreSQL"]],
    visual: "saas",
    overview: "A subscription dashboard where teams sign up, pay monthly, and see their business metrics in clean, fast charts.",
    facts: [["PLATFORM", "Web"], ["ROLE", "Full-stack"], ["BUILD TIME", "6 weeks"]],
    items: [
      { k: "AUTH", v: "Sign up & teams" }, { k: "BILLING", v: "Monthly plans" }, { k: "CHARTS", v: "Live metrics" },
      { k: "EXPORT", v: "CSV reports" }, { k: "SETTINGS", v: "Roles & invites" }, { k: "EMAIL", v: "Weekly summary" },
    ],
    layers: [
      { k: "WEB", v: "Next.js + TypeScript", d: "Server-rendered dashboard pages" },
      { k: "API", v: "Go", d: "Metrics aggregation and billing webhooks" },
      { k: "PAYMENTS", v: "Stripe", d: "Plans, trials and invoices" },
      { k: "DATA", v: "PostgreSQL", d: "Multi-tenant schema per team" },
    ],
    arch: ["NEXT.JS", "GO API", "AUTH", "AGGREGATES", "POSTGRESQL", "STRIPE"],
    archNote: "Heavy metric queries are pre-aggregated every few minutes, so dashboards load fast even as data grows.",
    file: "page.tsx", codeLang: "TypeScript",
    code: [
      "export default async function Dashboard() {",
      "  const team = await getTeam();",
      "  // metrics are pre-aggregated by the Go service",
      "  const stats = await api.get(`/teams/${team.id}/stats`);",
      "  return (",
      "    <Layout team={team}>",
      "      <MetricGrid stats={stats} />",
      "      <RevenueChart data={stats.revenue} />",
      "    </Layout>",
      "  );",
      "}",
    ],
    dataLabel: "DASHBOARD LOAD TIME", unit: "ms", xStart: "build 1",
    series: [920, 880, 860, 790, 760, 700, 640, 610, 580, 520, 470, 430, 400, 380, 350, 330, 310, 290, 270, 260, 250, 240, 235, 230],
    result: "Cut dashboard load time from about 900 ms to about 230 ms with pre-aggregation and caching.",
  },
  {
    id: "api", no: "BUILD 003", name: "High-Performance REST API", status: "IN PROGRESS", statusColor: C.blue,
    specs: [["PLATFORM", "Backend"], ["FRONTEND", "Any client"], ["BACKEND", "Go"], ["DATA", "PostgreSQL"]],
    visual: "api",
    overview: "A production-ready Go API template with authentication, rate limiting, logging and documented endpoints, ready to power any web or mobile app.",
    facts: [["PLATFORM", "Backend"], ["ROLE", "Backend"], ["BUILD TIME", "Ongoing"]],
    items: [
      { k: "AUTH", v: "JWT + refresh" }, { k: "SECURITY", v: "Rate limiting" }, { k: "DOCS", v: "OpenAPI spec" },
      { k: "OPS", v: "Structured logs" }, { k: "DATA", v: "Migrations" }, { k: "TESTS", v: "Integration suite" },
    ],
    layers: [
      { k: "LANGUAGE", v: "Go", d: "Standard library router, no heavy framework" },
      { k: "DATA", v: "PostgreSQL", d: "Typed queries and versioned migrations" },
      { k: "DOCS", v: "OpenAPI", d: "Generated reference for client developers" },
      { k: "DEPLOY", v: "Docker", d: "One container, runs anywhere" },
    ],
    arch: ["CLIENT", "RATE LIMIT", "AUTH", "HANDLER", "POSTGRESQL", "JSON RESPONSE"],
    archNote: "Every request passes the same middleware chain, so security and logging are consistent across all endpoints.",
    file: "middleware.go", codeLang: "Go",
    code: [
      "func RateLimit(next http.Handler) http.Handler {",
      "  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {",
      "    // 100 requests per minute per API key",
      '    if !limiter.Allow(r.Header.Get("X-API-Key")) {',
      '      http.Error(w, "too many requests", 429)',
      "      return",
      "    }",
      "    next.ServeHTTP(w, r)",
      "  })",
      "}",
    ],
    dataLabel: "P95 LATENCY", unit: "ms", xStart: "t−24h",
    series: [52, 48, 45, 47, 44, 41, 40, 43, 39, 37, 38, 36, 35, 37, 34, 33, 35, 32, 31, 33, 30, 31, 29, 30],
    result: "Keeps p95 latency around 30 ms under load tests. Next: add a background job queue.",
  },
];

export const studioTools: ToolGroup[] = [
  { title: "WEB", items: [
    { id: "next", name: "Next.js", desc: "My default for web apps: fast pages, good SEO, and server rendering out of the box.", spec: "Dashboards, SaaS, sites" },
    { id: "react", name: "React", desc: "Component-based UI that stays maintainable as the app grows.", spec: "Interactive interfaces" },
    { id: "ts", name: "TypeScript", desc: "Types catch bugs before your users do.", spec: "Every frontend" },
    { id: "tailwind", name: "Tailwind", desc: "Consistent styling without fighting CSS.", spec: "Design systems" },
  ]},
  { title: "MOBILE", items: [
    { id: "flutter", name: "Flutter", desc: "One codebase that ships to both iOS and Android with native performance.", spec: "Cross-platform apps" },
    { id: "dart", name: "Dart", desc: "The language behind Flutter: fast, typed, easy to read.", spec: "App logic" },
    { id: "push", name: "Push notifications", desc: "Bring users back with reminders and updates.", spec: "Engagement" },
    { id: "offline", name: "Offline storage", desc: "Apps that keep working with a bad connection.", spec: "Field and travel apps" },
  ]},
  { title: "BACKEND", items: [
    { id: "go", name: "Go", desc: "Fast, simple backends that handle lots of users on small servers.", spec: "APIs and services" },
    { id: "rest", name: "REST API", desc: "Clear, documented endpoints any client can use.", spec: "Web + mobile clients" },
    { id: "auth", name: "Auth", desc: "Secure login, sessions and roles.", spec: "Every app" },
    { id: "ws", name: "WebSockets", desc: "Real-time updates without refreshing.", spec: "Chat, live status" },
  ]},
  { title: "DATA + SHIPPING", items: [
    { id: "pg", name: "PostgreSQL", desc: "Reliable relational database with clean schemas and migrations.", spec: "All app data" },
    { id: "docker", name: "Docker", desc: "Same environment on my machine and in production.", spec: "Deployments" },
    { id: "ci", name: "CI/CD", desc: "Automatic tests and deploys on every push.", spec: "Safe releases" },
    { id: "cloud", name: "Vercel / VPS", desc: "Hosting that fits the budget and the traffic.", spec: "Going live" },
  ]},
];

export const studioExperiments = [
  { id: "EXP-001", name: "Flutter offline-first sync", status: "COMPLETE", color: C.green },
  { id: "EXP-002", name: "Go WebSocket chat server", status: "COMPLETE", color: C.green },
  { id: "EXP-003", name: "Next.js server actions + forms", status: "COMPLETE", color: C.green },
  { id: "EXP-004", name: "PostgreSQL full-text search", status: "TESTING", color: C.amber },
  { id: "EXP-005", name: "Flutter animated onboarding", status: "BUILDING", color: C.blue },
];

export const studioTimeline: [string, string][] = [
  ["IDEA", "Your goal, users and must-have features"],
  ["WIREFRAME", "Screens and flows you can click through"],
  ["MVP", "The smallest version that really works"],
  ["TEST", "Real users, real bugs, real feedback"],
  ["ITERATE", "Polish, speed and the next features"],
  ["LAUNCH", "App stores, domain, monitoring"],
];

export const studioStack: [string, string[]][] = [
  ["DATA", ["PostgreSQL", "SQL", "Migrations"]],
  ["BACKEND", ["Go", "REST API", "Auth", "WebSockets"]],
  ["WEB", ["Next.js", "React", "TypeScript", "Tailwind"]],
  ["MOBILE", ["Flutter", "Dart", "iOS", "Android"]],
  ["SHIPPING", ["Docker", "Linux", "CI/CD", "Vercel"]],
];
