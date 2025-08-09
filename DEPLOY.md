# Deploy to Vercel (apps/web-next)

This guide deploys the dashboard (Next.js) to Vercel. The standalone Fastify API is not required in production; Next API routes are used.

## 0) Prereqs
- Repo on GitHub (recommended name: POC-TURING)
- A Postgres database (Neon/Supabase/Railway). Keep the connection string (DATABASE_URL).

## 1) Database (Neon quick start)
1. Create a free Neon project (https://neon.tech/)
2. Create database `chat_all_in` and get the connection string. Example:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require
   ```
3. (Local) Apply schema once:
   ```bash
   # from apps/web-next
   export DATABASE_URL="<your-neon-url>"
   npx prisma migrate deploy    # or: npx prisma db push
   ```

## 2) Vercel project
1. Vercel → New Project → Import Git Repository → choose your repo
2. Root Directory: `apps/web-next`
3. Environment Variables:
   - `DATABASE_URL` = your Postgres URL
   - (optional) `REDIS_URL` = redis://... (BullMQ). If omitted, jobs run in no-op fallback.
4. Build settings: keep Next.js defaults. `postinstall` already runs `prisma generate`.
5. Deploy.

## 3) Custom Domain (astreia.io)
1. Vercel → Project → Settings → Domains → Add `astreia.io`
2. In your DNS registrar:
   - Apex (astreia.io): A record → `76.76.21.21`
   - `www`: CNAME → `cname.vercel-dns.com`
3. Wait for propagation. HTTPS is issued automatically.

## 4) Useful checks
- Health: `https://<your-domain>/api/metrics` and `/api/calls`
- If build fails with Prisma P1001: verify `DATABASE_URL` and that the DB accepts external connections (SSL).
- If 404 root page: ensure Root Directory is set to `apps/web-next` in Vercel.

## 5) Deploy via CLI (optional)
```bash
# from repo root
npm i -g vercel
vercel login
vercel --cwd apps/web-next            # first deploy (preview)
vercel --prod --cwd apps/web-next     # production
```

## Notes
- The monorepo includes `apps/server` (Fastify). Production uses Next API routes. You can deploy the Fastify API separately if needed.
- For schema changes, run `npx prisma migrate deploy` against your production DB and redeploy.
