"use client";

import { useEffect, useState } from "react";

/** A counter that ticks every 1.2 s. Drives the "live" sensor and server values. */
export function useTick(ms = 1200) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return t;
}

export function useUptime(t: number) {
  const secs = 3 * 3600 + 42 * 60 + Math.floor(t * 1.2);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(secs / 3600))}:${pad(Math.floor(secs / 60) % 60)}:${pad(secs % 60)}`;
}
