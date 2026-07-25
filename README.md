# Personal website

Portfolio di Dario Napolitano. Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
Nessun backend: tutti i contenuti sono statici e vivono in un unico file tipizzato.

## Requisiti

- Node.js >= 20.9 (testato su 22)

## Sviluppo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Struttura

```
src/
  app/
    layout.tsx        font, metadata, script anti-flash del tema
    page.tsx          composizione delle sezioni
    globals.css       design tokens + tema chiaro/scuro
  components/         header, hero, sezioni, footer, toggle tema
  content/
    resume.ts         unica fonte di verità per i contenuti
```

Per aggiornare il sito basta modificare `src/content/resume.ts`.

## Design

- Palette "carta e inchiostro": fondo avorio caldo, testo quasi nero, accento terracotta.
  I colori sono variabili CSS in `globals.css`, esposte a Tailwind via `@theme inline`.
- Tema chiaro/scuro: segue `prefers-color-scheme` e può essere forzato con
  `data-theme="light" | "dark"` su `<html>` (persistito in `localStorage`).
- Font: Instrument Serif per i titoli, Inter per il testo, JetBrains Mono per le etichette.
  Sono self-hosted da `next/font` (nessuna richiesta a Google in runtime).

## Deploy

`next.config.ts` usa `output: "standalone"`, quindi la build produce un server Node
autonomo in `.next/standalone` — adatto a un container leggero dietro un reverse proxy.
