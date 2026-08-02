"use client";

import {
  applyPalette,
  generatePalette,
  savePalette,
} from "@/lib/palette";

/*
 * Shuffle button: each press rolls a new background + accent pair
 * (with derived ink tones) and paints the CSS variables live.
 */
export function ThemeToggle() {
  function shuffle() {
    const palette = generatePalette();
    applyPalette(palette);
    savePalette(palette);
  }

  return (
    <button
      type="button"
      onClick={shuffle}
      aria-label="Shuffle page colors"
      className="label inline-flex items-center p-0 leading-none text-ink-muted transition-colors hover:text-accent"
    >
      shuffle
    </button>
  );
}
