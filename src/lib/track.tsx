"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type Track = "abaja" | "ebaja";

interface TrackContextValue {
  track: Track;
  setTrack: (track: Track) => void;
}

const TrackContext = createContext<TrackContextValue | null>(null);

const STORAGE_KEY = "abhyuday-track";
const CHANGE_EVENT = "abhyuday-track-change";

function trackFromHash(): Track | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/track=(abaja|ebaja)/);
  return match ? (match[1] as Track) : null;
}

function trackFromStorage(): Track | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "abaja" || raw === "ebaja" ? raw : null;
  } catch {
    return null;
  }
}

let cachedTrack: Track | null = null;

function getSnapshot(): Track {
  if (cachedTrack === null) {
    cachedTrack = trackFromHash() ?? trackFromStorage() ?? "abaja";
  }
  return cachedTrack;
}

function getServerSnapshot(): Track {
  return "abaja";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function onTrackChange(next: Track) {
  cachedTrack = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  const url = new URL(window.location.href);
  url.hash = `track=${next}`;
  window.history.replaceState(null, "", url.toString());
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const track = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTrack = (next: Track) => {
    onTrackChange(next);
  };

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack(): TrackContextValue {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack must be used within a TrackProvider");
  return ctx;
}