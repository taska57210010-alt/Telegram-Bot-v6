Telegram‑Bot‑v6

⚡️ A modern, real‑time task‑management platform powered by NestJS (backend) and Next.js (frontend), with seamless Telegram bot integration.

▎ “The first thing investors look at is a clean, compelling README – this file is that polished front‑door.”

---
Table of Contents

1. Project Overview (#overview)
2. Key Features (#features)
3. Tech Stack (#stack)
4. Getting Started (Local Development) (#local-dev)
5. Running with Docker / Docker‑Compose (#docker)
6. API Documentation (#api)
7. Telegram Bot Integration (#bot)
8. Testing & Linting (#test)
9. CI/CD & Deployment (#ci)
10. Contributing (#contribute)
11. License (#license)

---
1. Overview <a name="overview"></a>

Telegram‑Bot‑v6 is a full‑stack application that lets teams create, assign, and track tasks through a web UI and a Telegram bot.
- The backend is built with NestJS + Prisma (PostgreSQL) for a clean, modular architecture and type‑safe data access.
- The frontend is a lightweight Next.js (React) app with Zustand state managem
- The Telegram bot (via node-telegram-bot-api) forwards command messages to the backend, providing a low‑friction way for users to interact with tasks from anywhere.

The repo is deliberately split in one monorepo so that the bot and API share the same data model, guaranteeing consistency across all entry points.

---
2. Key Features <a name="features"></a>

┌───────────────────────────┬─────────────────────────────────────────────────
│            ✅             │                                 Feature                                  │
├───────────────────────────┼─────────────────────────────────────────────────
│ Task CRUD                 │ Create, read, update, delete tasks.                                      │
├───────────────────────────┼─────────────────────────────────────────────────
│ User Management           │ Register/login via Telegram or email (future OAuth).                     │
├───────────────────────────┼─────────────────────────────────────────────────
│ Real‑time Updates         │ WebSocket‑based push notifications for task changes.                     │
├───────────────────────────┼─────────────────────────────────────────────────
│ Telegram Commands         │ /new, /list, /assign, /complete directly from chat.                      │
├───────────────────────────┼─────────────────────────────────────────────────
│ Role‑Based Access Control │ Admin, manager, contributor roles enforced on both API and bot.          │
├───────────────────────────┼─────────────────────────────────────────────────
│ Database migrations       │ Prisma schema + migration workflow.                                      │
├───────────────────────────┼─────────────────────────────────────────────────
│ Dockerised                │ One‑click dev / production environment.                                  │
├───────────────────────────┼─────────────────────────────────────────────────
│ CI‑ready                  │ GitHub Actions scaffold for lint, test, build, and Docker image publish. │
├───────────────────────────┼─────────────────────────────────────────────────
│ Extensible                │ Plug‑in architecture for adding new bot commands or integrations.        │
└───────────────────────────┴─────────────────────────────────────────────────

---
3. Tech Stack <a name="stack"></a>

┌──────────────────┬───────────────────────────────────────────────┬─────────────────────────────────────────┐
│      Layer       │                  Technology                   │            │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Backend          │ NestJS (TypeScript) + Prisma ORM (PostgreSQL) │ Scalable,  │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Frontend         │ Next.js 13 (React) + Zustand (state)          │ Fast SSR,. │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Bot              │ node-telegram-bot-api                         │ Simple wr. │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Containerisation │ Docker + Docker‑Compose                       │ Consisten  │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Testing          │ Jest (unit) + Supertest (e2e)                 │ High conf  │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ Lint/Format      │ ESLint + Prettier                             │ Code qual  │
├──────────────────┼───────────────────────────────────────────────┼─────────────────────────────────────────┤
│ CI/CD            │ GitHub Actions                                │ Automated  │
└──────────────────┴───────────────────────────────────────────────┴─────────────────────────────────────────┘

---
4. Getting Started (Local Development) <a name="local-dev"></a>

Prerequisites

- Node.js ≥ 18 (nvm recommended)
- Docker & Docker‑Compose (for DB)
- pnpm (or npm/yarn) – the repo uses npm scripts (npm install).

1️⃣ Clone & Install

git clone https://github.com/taska57210010-alt/Telegram-Bot-v6.git
cd Telegram-Bot-v6
npm install            # installs both backend & frontend deps

2️⃣ Set up PostgreSQL (Docker)

docker compose up -d postgres   # the compose file includes a `postgres` servi

3️⃣ Configure Environment

Create a .env at the repo root:

# Backend
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telegram_bot
JWT_SECRET=super-secret-key
TELEGRAM_BOT_TOKEN=123456:ABCDEF...

# Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

▎ Tip: The docker-compose.yml already maps port 5432. Adjust if you have a loc

4️⃣ Run Migrations

npx prisma migrate dev --name init

5️⃣ Start Services

# Backend (NestJS)
npm run start:dev   # watches `src/**/*.ts`

# Frontend (Next.js)
npm run dev         # starts at http://localhost:3000

You now have a fully functional stack:
- API → http://localhost:3000/api
- UI → http://localhost:3000
- Telegram bot listening on the token you supplied.

---
5. Docker / Docker‑Compose (Production) <a name="docker"></a>

A single docker-compose.yml orchestrates:

┌──────────┬────────────────────────────────────────┬──────┐
│ Service  │                 Image                  │ Port │
├──────────┼────────────────────────────────────────┼──────┤
│ api      │ node:20-alpine (built from Dockerfile) │ 3000 │
├──────────┼────────────────────────────────────────┼──────┤
│ frontend │ node:20-alpine (Next.js)               │ 3001 │
├──────────┼────────────────────────────────────────┼──────┤
│ postgres │ postgres:15-alpine                     │ 5432 │
└──────────┴────────────────────────────────────────┴──────┘

docker compose up --build -d

The containers expose the same env vars you’d use locally. For production, rep scripts with npm run start.

---
6. API Documentation <a name="api"></a>

The API follows RESTful conventions under /api/v1. Swagger UI is auto‑generated by NestJS and available at:

GET http://localhost:3000/api/v1/docs

Key endpoints:

┌────────┬──────────────┬──────────────────────────────────────────────┐
│ Method │     Path     │                 Description                  │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ POST   │ /users       │ Register a new user (used by bot & UI).      │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ POST   │ /auth/login  │ Issue JWT.                                   │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ GET    │ /tasks       │ List tasks (filterable by status, assignee). │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ POST   │ /tasks       │ Create a task.                               │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ PATCH  │ /tasks/:id   │ Update fields (title, description, status).  │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ DELETE │ /tasks/:id   │ Remove a task (admin only).                  │
├────────┼──────────────┼──────────────────────────────────────────────┤
│ POST   │ /bot/webhook │ Telegram webhook endpoint (optional).        │
└────────┴──────────────┴──────────────────────────────────────────────┘

All routes are guarded by JWT middleware; the bot passes the token in the Authorization header.

---
7. Telegram Bot Integration <a name="bot"></a>

The bot runs inside the same NestJS process (src/ai.controller.ts).

Core Commands

┌────────────────────┬────────────────────┬───────────────────────────────────
│      Command       │      Example       │                 Action                  │
├────────────────────┼────────────────────┼───────────────────────────────────
│ /new <title>       │ /new Fix login bug │ Creates a task and replies with the ID. │
├────────────────────┼────────────────────┼───────────────────────────────────
│ /list              │ /list              │ Returns a formatted list of open tasks. │
├────────────────────┼────────────────────┼───────────────────────────────────
│ /assign <id> @user │ /assign 42 @alice  │ Assigns the task.                       │
├────────────────────┼────────────────────┼───────────────────────────────────
│ /complete <id>     │ /complete 42       │ Marks as done.                          │
├────────────────────┼────────────────────┼───────────────────────────────────
│ /help              │ /help              │ Shows command reference.                │
└────────────────────┴────────────────────┴───────────────────────────────────

Adding New Commands

1. Extend BotCommand enum in ai.controller.ts.
2. Implement a handler method.
3. Register it in the BotService (src/ai.service.ts).

All bot logic is unit‑tested (see src/__tests__/bot.*.spec.ts).

---
8. Testing & Linting <a name="test"></a>

# Unit + integration tests (Jest)
npm run test

# Type‑checking
npm run typecheck

# Lint & auto‑fix
npm run lint

Coverage reports are generated in coverage/ and enforced at ≥ 85% by CI.

---
9. CI/CD & Deployment <a name="ci"></a>

The repository ships with a ready‑to‑use GitHub Actions workflow (.github/workflows/ci.yml) that:

1. Installs dependencies.
2. Runs lint, typecheck, and tests.
3. Builds Docker images and pushes to GitHub Packages (or any OCI registry).
4. Deploys to a Kubernetes cluster (optional – see k8s/ folder).

You can enable the workflow by:
- Adding a REGISTRY_TOKEN secret.
- Setting DOCKER_REGISTRY (e.g., ghcr.io/taska57210010-alt).

---
10. Contributing <a name="contribute"></a>

1. Fork the repo and create a feature branch.
2. Follow the code style (ESLint + Prettier).
3. Write unit tests for any new logic.
4. Open a Pull Request – the CI will automatically run all checks.

Please read CONTRIBUTING.md for detailed guidelines on commit messages and rel

---
11. License <a name="license"></a>

This project is licensed under the MIT License – see the LICENSE file for full terms.

---
Quick One‑Liner Deploy (Production)

docker compose up --build -d && \
docker exec -it telegram-bot-v6-api npx prisma migrate deploy && \
docker restart telegram-bot-v6-api
