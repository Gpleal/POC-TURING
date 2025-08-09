## Agents API

- GET /api/agents → summary list with metrics (in-memory for now)
- POST /api/agents → create an Agent from a preset. Body: { type, name?, description?, configOverrides? }
- GET /api/agents/[slug] → fetch a single agent
- PATCH /api/agents/[slug] → update name/description/status/config
- POST /api/agents/[slug]/runs → enqueue a run (BullMQ if REDIS_URL, otherwise no-op log)
- GET /api/agents/[slug]/runs → last runs

Dev notes
- Run Prisma: npm -w apps/web-next run prisma:generate; npm -w apps/web-next run prisma:migrate; npm -w apps/web-next run prisma:seed
- Start worker (optional): npm -w apps/web-next run worker

# web-next — ElevenLabs-style Dashboard (Next.js 14)

This app implements a clean, minimalist dashboard with Inter, Tailwind, light/dark theme, micro-interactions, and an in-memory data provider with seed and API routes.

## Run

- Install deps at repo root and this workspace.
- Seed in-memory provider (optional, it seeds on first use):

```
npm run web-next:seed
```

- Dev server:

```
npm run web-next:dev
```

Open http://localhost:3001

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Recharts
- Radix UI Select
- Zod

## Switch provider
You can later swap `lib/db.ts` for a Prisma + SQLite provider. Expose the same functions and API shapes.
