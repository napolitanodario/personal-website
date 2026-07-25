"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/*
 * The only interactive piece of the site. The active theme lives in the DOM
 * (data-theme on the html element) rather than in React state, because the
 * inline script in the root layout already sets it before hydration.
 * useSyncExternalStore lets the button read that external value without
 * duplicating it, and re-render when it changes.
 */

/** Fired on every manual toggle so the button re-reads the DOM. */
const THEME_EVENT = "themechange";

/** Re-render on a manual toggle or when the system preference changes. */
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

/** An explicit user choice wins, otherwise fall back to the system theme. */
function getSnapshot(): Theme {
  const override = document.documentElement.dataset.theme;
  if (override === "light" || override === "dark") return override;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  /* The third argument is the server snapshot: there is no DOM to read
     during prerendering, so assume light and let the client correct it. */
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");

  /* The button is labelled with the theme it switches to, not the current one. */
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable, for example in private mode: the choice
      // still applies but will not survive a reload.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="label text-ink-muted transition-colors hover:text-accent"
    >
      {next}
    </button>
  );
}
