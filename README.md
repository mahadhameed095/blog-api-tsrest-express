# Blog API - ts-rest + Express

A simple blog REST API built to explore ts-rest's contract-based, 
type-safe API development pattern.

## Stack
- **Runtime:** Node.js, Express, TypeScript
- **API Layer:** ts-rest (contract-based type safety + Zod validation)
- **Database:** Prisma + SQLite
- **Docs:** Swagger UI

## Features
- Type-safe API contracts with ts-rest
- Request/response validation via Zod
- Basic authentication middleware
- Auto-generated Swagger docs

## Setup
```bash
npm run setup   # installs deps, sets up SQLite, generates Prisma client
npm start       # starts the server
```

## Note
Backend only — no frontend. Built as an exploration of ts-rest.
