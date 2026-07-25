# Personal website

Portfolio of Dario Napolitano. Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
There is no backend: every piece of content is static and lives in a single typed file.

## Requirements

- Node.js 20.9 or newer (tested on 22)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme anti-flash script
    page.tsx          section order and page layout
    globals.css       design tokens, light and dark themes
  components/         header, hero, section blocks, footer, theme toggle
  content/
    resume.ts         single source of truth for all content
```

To update the site, edit `src/content/resume.ts`. Components read from it and
never hardcode copy.

## Design

- Paper and ink palette: warm ivory background, near black text, terracotta accent.
  Colours are CSS variables in `globals.css`, exposed to Tailwind through
  `@theme inline`, so changing one variable repaints the whole site.
- Light and dark themes follow `prefers-color-scheme` and can be forced with
  `data-theme="light"` or `data-theme="dark"` on the `html` element. The choice
  is stored in `localStorage` and restored before the first paint.
- Typography: Instrument Serif for headings, Inter for body copy, JetBrains Mono
  for labels. All three are self-hosted through `next/font`, so no request is
  sent to Google at runtime.

## Conventions

- All source, comments and documentation are written in English.
- Plain ASCII only. No emoji, typographic dashes, bullets or other symbols in
  code, comments or content.

## Deployment

`next.config.ts` sets `output: "standalone"`, so the build produces a
self-contained Node server in `.next/standalone`. That is what makes it easy to
run in a small container behind a reverse proxy.
