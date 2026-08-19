# Personal website

Portfolio of Dario Napolitano. Next.js 16 (App Router), TypeScript, Tailwind CSS v4. No backend
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

## Pages

- `/` is a single screen: portrait, role, name, introduction and contact links.
  There is nothing below the fold, so the page does not scroll.
- `/resume` holds the actual content as one long scrollable page, one anchor per
  section.

The header is the same on both pages and always lists every CV section, which
is what keeps the home page bare without hiding the rest of the site.

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme anti-flash script
    page.tsx          minimal home page
    resume/page.tsx   full resume, one section per anchor
    globals.css       design tokens, light and dark themes
  components/         header, hero, section blocks, footer, theme toggle
  content/
    resume.ts         single source of truth for all content
    sections.ts       CV section ids and titles, drives the header navigation
public/
  profile.jpg         portrait shown on the home page
```

To update the site, edit `src/content/resume.ts`. Components read from it and
never hardcode copy. Adding or renaming a CV section means touching
`src/content/sections.ts` and `src/app/resume/page.tsx` together, so the navigation
and the anchors stay in sync.

## Writing the work experience

A position carries two independent fields and renders whichever it provides:

- `highlights`, one line per piece of work saying what was done and what came of
  it. This is the whole of what a reader sees at first, so every position needs
  it.
- `projects`, the long form account of the work worth telling in full. Each entry
  is told in four titled beats: `scenario`, `approach`, `results` and `lesson`.
  Keep each one to a single paragraph, since the titles are what carry the
  structure and a wall of text under one of them defeats them.

The projects sit behind a "View detailed case studies" link, so the section reads
end to end without expanding anything. The disclosure is a native `details`
element, so it costs no JavaScript, and the case studies stay in the markup for
search engines and for readers who print the page. Keep the two in the same
order, so expanding the link does not shuffle the work under the reader.

Three dots in the text mark a detail that is still missing. They are meant to be
visible on the page, so an unfinished sentence is obvious rather than quietly
wrong.

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
- Section titles use the `label-lg` utility: uppercase monospace, large enough
  to read as headings. Smaller captions such as dates and tags use `label`.
- Every band of the site is wrapped in `Container`, which sets the maximum
  width and the side padding in one place.

## Conventions

- All source, comments and documentation are written in English.
- Plain ASCII only. No emoji, typographic dashes, bullets or other symbols in
  code, comments or content.

## Deployment

`next.config.ts` sets `output: "standalone"`, so the build produces a
self-contained Node server in `.next/standalone`. That is what makes it easy to
run in a small container behind a reverse proxy.
