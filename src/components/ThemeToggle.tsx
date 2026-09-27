"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getPrefsSnapshot, serverPrefs, subscribePrefs, writePrefs } from "@/lib/preferences";

export default function ThemeToggle() {
  const prefs = useSyncExternalStore(subscribePrefs, getPrefsSnapshot, serverPrefs);
  const isLight = prefs.modeId === "light";

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, [isLight]);

  const toggle = () => {
    writePrefs({ modeId: isLight ? "dark" : "light" });
  };

  return (
    <button
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      {isLight ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      )}
    </button>
  );
}
