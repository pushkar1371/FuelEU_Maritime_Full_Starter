# FuelEU Maritime — Minimal Compliance Module

This repo contains a minimal yet structured implementation for a FuelEU compliance dashboard and API using a **Hexagonal Architecture**.

- **Frontend:** React + TypeScript + TailwindCSS (Vite)
- **Backend:** Node.js + TypeScript + Express (in-memory by default)
- **Architecture:** Ports & Adapters (Core domain isolated)
- **Docs:** `AGENT_WORKFLOW.md`, `REFLECTION.md`

## Architecture Summary

```
core (domain + application + ports) ⟷ adapters (inbound http, outbound repos) ⟷ infrastructure
```

Core models the domain (CB math, comparison, banking, pooling). Inbound adapter (Express) exposes HTTP endpoints. Outbound adapters provide repos (start with in-memory, swap to Postgres later).

## Getting Started

### 1) Backend
```bash
cd backend
npm i
npm run dev
# runs on http://localhost:3000
```

### 2) Frontend
```bash
cd frontend
npm i
# configure .env.local if needed
# VITE_API_URL=http://localhost:3000
npm run dev
```

## Endpoints (Key)
- `GET /routes` — list routes
- `POST /routes/:id/baseline` — mark baseline
- `GET /routes/comparison` — baseline vs others
- `GET /compliance/cb?shipId&year` — compute CB snapshot
- `GET /compliance/adjusted-cb?shipId&year` — adjusted CB (demo)
- `GET /banking/records?shipId&year`
- `POST /banking/bank` — bank positive CB
- `POST /banking/apply` — apply banked to a deficit
- `POST /pools` — greedy pool balancing with validations

## Tests
```bash
cd backend
npm run test
```

## DB (Optional Postgres)
A Prisma adapter stub exists under `adapters/outbound/postgres/`. Add `schema.prisma`, migrations, and implement the repo methods to persist data. Core stays unchanged.
