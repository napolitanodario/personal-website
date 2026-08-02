/**
 * Random readable palettes for the site.
 * Two main hues (background + accent) plus derived ink/rule tones so
 * body text and titles stay WCAG-friendly on every shuffle.
 */

export type Palette = {
  paper: string;
  paperRaised: string;
  ink: string;
  inkMuted: string;
  inkFaint: string;
  rule: string;
  accent: string;
  /** Drives native scrollbars / form controls. */
  scheme: "light" | "dark";
};

const STORAGE_KEY = "palette";

const CSS_VARS: { key: keyof Omit<Palette, "scheme">; css: string }[] = [
  { key: "paper", css: "--paper" },
  { key: "paperRaised", css: "--paper-raised" },
  { key: "ink", css: "--ink" },
  { key: "inkMuted", css: "--ink-muted" },
  { key: "inkFaint", css: "--ink-faint" },
  { key: "rule", css: "--rule" },
  { key: "accent", css: "--accent" },
];

function hsl(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;
}

/** sRGB relative luminance from HSL percentages. */
function luminance(h: number, s: number, l: number): number {
  const S = s / 100;
  const L = l / 100;
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const Hp = (((h % 360) + 360) % 360) / 60;
  const X = C * (1 - Math.abs((Hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (Hp < 1) [r, g, b] = [C, X, 0];
  else if (Hp < 2) [r, g, b] = [X, C, 0];
  else if (Hp < 3) [r, g, b] = [0, C, X];
  else if (Hp < 4) [r, g, b] = [0, X, C];
  else if (Hp < 5) [r, g, b] = [X, 0, C];
  else [r, g, b] = [C, 0, X];
  const m = L - C / 2;
  const toLin = (v: number) => {
    const c = v + m;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function contrastRatio(
  h1: number,
  s1: number,
  l1: number,
  h2: number,
  s2: number,
  l2: number,
): number {
  const a = luminance(h1, s1, l1);
  const b = luminance(h2, s2, l2);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

function buildCandidate(): {
  palette: Palette;
  paperH: number;
  paperS: number;
  paperL: number;
  accentH: number;
  accentS: number;
  accentL: number;
  inkH: number;
  inkS: number;
  inkL: number;
} {
  const dark = Math.random() < 0.42;
  const paperH = Math.random() * 360;
  /* Accent sits well away from the background hue so titles read as a second color. */
  const accentH = (paperH + 70 + Math.random() * 140) % 360;

  if (dark) {
    const paperS = 10 + Math.random() * 22;
    const paperL = 9 + Math.random() * 7;
    const accentS = 50 + Math.random() * 30;
    const accentL = 62 + Math.random() * 12;
    const inkH = paperH;
    const inkS = 12 + Math.random() * 10;
    const inkL = 90 + Math.random() * 5;
    return {
      paperH,
      paperS,
      paperL,
      accentH,
      accentS,
      accentL,
      inkH,
      inkS,
      inkL,
      palette: {
        scheme: "dark",
        paper: hsl(paperH, paperS, paperL),
        paperRaised: hsl(paperH, paperS + 4, paperL + 6),
        ink: hsl(inkH, inkS, inkL),
        inkMuted: hsl(inkH, inkS - 2, 68),
        inkFaint: hsl(inkH, inkS - 4, 52),
        rule: hsl(paperH, paperS, paperL + 14),
        accent: hsl(accentH, accentS, accentL),
      },
    };
  }

  const paperS = 18 + Math.random() * 28;
  const paperL = 93 + Math.random() * 4;
  const accentS = 48 + Math.random() * 28;
  const accentL = 30 + Math.random() * 12;
  const inkH = paperH;
  const inkS = 18 + Math.random() * 12;
  const inkL = 12 + Math.random() * 6;
  return {
    paperH,
    paperS,
    paperL,
    accentH,
    accentS,
    accentL,
    inkH,
    inkS,
    inkL,
    palette: {
      scheme: "light",
      paper: hsl(paperH, paperS, paperL),
      paperRaised: hsl(paperH, Math.max(paperS - 4, 8), paperL - 4),
      ink: hsl(inkH, inkS, inkL),
      inkMuted: hsl(inkH, inkS - 4, 36),
      inkFaint: hsl(inkH, inkS - 6, 48),
      rule: hsl(paperH, Math.max(paperS - 6, 8), paperL - 10),
      accent: hsl(accentH, accentS, accentL),
    },
  };
}

/** Keep trying until ink and accent both clear the background. */
export function generatePalette(maxAttempts = 40): Palette {
  for (let i = 0; i < maxAttempts; i++) {
    const c = buildCandidate();
    const bodyOk =
      contrastRatio(
        c.inkH,
        c.inkS,
        c.inkL,
        c.paperH,
        c.paperS,
        c.paperL,
      ) >= 7;
    /* Titles are large; 4.5:1 is comfortable, 3:1 is the absolute floor. */
    const titleOk =
      contrastRatio(
        c.accentH,
        c.accentS,
        c.accentL,
        c.paperH,
        c.paperS,
        c.paperL,
      ) >= 4.5;
    if (bodyOk && titleOk) return c.palette;
  }
  /* Deterministic fallback if random draws keep failing (should be rare). */
  return {
    scheme: "light",
    paper: "hsl(40 30% 96%)",
    paperRaised: "hsl(40 24% 92%)",
    ink: "hsl(40 20% 12%)",
    inkMuted: "hsl(40 12% 36%)",
    inkFaint: "hsl(40 10% 48%)",
    rule: "hsl(40 18% 86%)",
    accent: "hsl(200 55% 34%)",
  };
}

export function applyPalette(palette: Palette): void {
  const root = document.documentElement;
  for (const { key, css } of CSS_VARS) {
    root.style.setProperty(css, palette[key]);
  }
  root.dataset.scheme = palette.scheme;
}

export function savePalette(palette: Palette): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
  } catch {
    // Private mode / blocked storage: palette still applies for this session.
  }
}

export function loadPalette(): Palette | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Palette>;
    if (
      typeof parsed.paper !== "string" ||
      typeof parsed.accent !== "string" ||
      typeof parsed.ink !== "string" ||
      typeof parsed.paperRaised !== "string" ||
      typeof parsed.inkMuted !== "string" ||
      typeof parsed.inkFaint !== "string" ||
      typeof parsed.rule !== "string" ||
      (parsed.scheme !== "light" && parsed.scheme !== "dark")
    ) {
      return null;
    }
    return parsed as Palette;
  } catch {
    return null;
  }
}

export { STORAGE_KEY };
