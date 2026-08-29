/**
 * @doc Sidebar pins — optional shortcuts the user adds to the main sidebar.
 *
 * Currently only Mail can be pinned. The choice is stored locally so it stays
 * per-device and applies instantly with no round-trip.
 */
import { useEffect, useState } from "react";

export type SidebarPin = "mail";

const KEY = "sidebar_pins";
const EVT = "megsy:sidebar-pins";

function read(): SidebarPin[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? (raw.filter((p) => p === "mail") as SidebarPin[]) : [];
  } catch {
    return [];
  }
}

export function getSidebarPins(): SidebarPin[] {
  return read();
}

export function isPinned(pin: SidebarPin): boolean {
  return read().includes(pin);
}

export function setPinned(pin: SidebarPin, on: boolean): void {
  const next = on ? Array.from(new Set([...read(), pin])) : read().filter((p) => p !== pin);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent(EVT, { detail: next }));
  } catch {
    // ignore
  }
}

/** React hook: current pins, re-rendering whenever they change. */
export function useSidebarPins(): SidebarPin[] {
  const [pins, setPins] = useState<SidebarPin[]>(() => read());
  useEffect(() => {
    const sync = () => setPins(read());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return pins;
}
