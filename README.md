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
- `/signup`
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

## Turso

Set these environment variables locally and on Vercel:

```env
TURSO_VALUE_URL=libsql://your-database-name-your-org.turso.io
TURSO_CURRENT_AUTH_TOKEN=your-turso-auth-token
```

The members table schema is available at `docs/turso-members-schema.sql`.

## Migration Principle

Do not redesign the UI, rewrite all screens at once, or replace the styling system in bulk. Move one page at a time from preserved Stitch HTML into native Next.js App Router components.
