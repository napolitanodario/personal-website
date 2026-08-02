<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single-service, frontend-only Next.js 16 portfolio site (no backend, no database, no environment variables). All content is static and lives in `src/content/resume.ts` and `src/content/sections.ts`. Requires Node 20.9+ (Node 22 is available on the VM).

Dependencies are installed automatically by the startup update script; no manual install is needed. Standard commands live in `package.json` scripts:

- Dev server: `npm run dev` (serves on port 3000; the only service).
- Lint: `npm run lint`.
- Build: `npm run build` (uses Turbopack, `output: "standalone"`).
- Start production build: `npm run start`.

Non-obvious notes:

- Pages: `/` is a minimal, non-scrolling home page; `/resume` is the full scrollable resume. The header appears on both and links to `/resume#<section>` anchors, so clicking a nav item from `/` navigates to the resume page.
- The theme toggle (`src/components/theme-toggle.tsx`) is the only interactive piece: it writes `data-theme` to `<html>` and persists to `localStorage`; it is not React-state driven.
- During GUI testing, the VM desktop screensaver (a black screen with a rotating 3D cube) can appear after a few seconds of mouse/keyboard idle. This is the desktop, not an app crash — move the mouse or click to dismiss it, and avoid leaving the screen idle mid-recording.
