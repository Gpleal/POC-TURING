# Chat All‑In AI Agents (B2B)

Plataforma web para criar agentes autônomos via chat (Chat All‑In), com design minimalista inspirado na ElevenLabs.

## Stack
- Web: React + Vite + Tailwind
- API: Fastify + Prisma + PostgreSQL
- LLM: OpenAI via API
- RAG/MCP: stubs prontos para evolução

## Como rodar (Windows / PowerShell)
1) Copie variáveis de ambiente:
```
Copy-Item .env.example .env
Copy-Item apps/server/.env.example apps/server/.env
```
2) Instale dependências na raiz:
```
npm install
```
3) Configure o banco em `apps/server/.env` (DATABASE_URL) e a chave OpenAI.
4) Prisma + seed:
```
npm run prisma:generate --workspace apps/server
npm run prisma:push --workspace apps/server
npm run seed --workspace apps/server
```
5) Desenvolvimento (web + api em paralelo):
```
npm run dev
```
Web: http://localhost:5173  |  API: http://localhost:3333

Exemplos de workflow: `apps/server/src/workflows/examples/*`.
