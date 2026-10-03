import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "Full-stack developer building web apps, mobile apps, APIs and embedded systems with Next.js, Flutter, Go, PostgreSQL and ESP32.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
