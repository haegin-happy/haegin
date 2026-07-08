# HAEGIN

Google Stitch / AI Studio export migrated into a Next.js App Router project.

## Current Status

- Next.js App Router scaffold is in place.
- Original Stitch HTML screens are preserved under `public/stitch`.
- Current routes render the preserved HTML screens without redesigning the UI.
- The migration is intentionally incremental to protect the existing design and behavior.

## Routes

- `/`
- `/brand`
- `/collection`
- `/login`
- `/kr/brand`
- `/kr/collection`
- `/kr/login`

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Migration Principle

Do not redesign the UI, rewrite all screens at once, or replace the styling system in bulk. Move one page at a time from preserved Stitch HTML into native Next.js App Router components.
