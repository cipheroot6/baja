export type TransitionId = "flip" | "slide" | "wipe";

export interface Prefs {
  paletteId: string;
  fontId: string;
  transitionId: TransitionId;
}

export const TRANSITION_OPTIONS: {
  id: TransitionId;
  name: string;
  desc: string;
}[] = [
  { id: "flip", name: "3D Flip", desc: "Cards rotate like a coin" },
  { id: "slide", name: "Slide", desc: "Horizontal page-turn slide" },
  { id: "wipe", name: "Full Screen Wipe", desc: "Curtain wipes across the page" },
];

const STORAGE_KEY = "abhyuday-customizer";
const CHANGE_EVENT = "abhyuday-prefs-change";

const DEFAULTS: Prefs = {
  paletteId: "midnight-gold",
  fontId: "playfair-inter",
  transitionId: "flip",
};

let cached: Prefs | null = null;

function rawRead(): Prefs {
  const base: Prefs = { ...DEFAULTS };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) Object.assign(base, JSON.parse(stored) as Partial<Prefs>);
  } catch {
    // ignore storage errors
  }
  const invalidTransition = !TRANSITION_OPTIONS.some((t) => t.id === base.transitionId);
  if (invalidTransition) base.transitionId = DEFAULTS.transitionId;
  return base;
}

export function readPrefs(): Prefs {
  if (cached === null) cached = rawRead();
  return cached;
}

const SERVER_PREFS: Prefs = { ...DEFAULTS };

export function serverPrefs(): Prefs {
  return SERVER_PREFS;
}

export function subscribePrefs(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getPrefsSnapshot(): Prefs {
  return readPrefs();
}

export function writePrefs(patch: Partial<Prefs>) {
  const next = { ...readPrefs(), ...patch };
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function resetPrefs() {
  cached = null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}