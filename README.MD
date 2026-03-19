# Task Manager (Web + Mobile)

A professional task manager built with a **NestJS** backend, **PostgreSQL** database, a **React + Tailwind CSS** web frontend, and **Flutter** for the mobile app.

Repository layout:
- `task-manager/` backend (NestJS + Prisma)
- `todo-app/` frontend (React + Vite + Tailwind)
- `mobile/` (Flutter plan / setup instructions in this README)

Author: Samuel SOGLOHOUN (single contributor)

## Tech Stack

- Backend: NestJS (TypeScript)
- Database: PostgreSQL
- ORM: Prisma
- Frontend: React (Vite) + Tailwind CSS v4
- Mobile: Flutter (planned/next)

## Features (current)

- Tasks CRUD:
  - `GET /tasks` (list)
  - `POST /tasks` (create)
  - `PATCH /tasks/:id` (update)
  - `DELETE /tasks/:id` (delete)
- Notes:
  - `GET /notes` (list)
  - `POST /notes` (create)
- Frontend UI:
  - Add task
  - List tasks
  - Toggle completion
  - Delete task

## Prerequisites

- Node.js + npm
- Docker (Docker Engine) and `docker-compose` (optional) for PostgreSQL
- Flutter SDK (for mobile setup)

## Local Development (Quickstart)

### 1) Start PostgreSQL

Recommended: use the app’s configured port mapping `5433 -> 5432` to avoid conflicts.

Option A (recommended): `docker run`
```bash
docker volume create task_manager_db
docker run -d --name task-manager-db \
  -e POSTGRES_USER=task_manager \
  -e POSTGRES_PASSWORD=task_manager \
  -e POSTGRES_DB=task_manager \
  -p 5433:5432 \
  -v task_manager_db:/var/lib/postgresql/data \
  postgres:16-alpine
```

Option B: `docker-compose`
```bash
docker-compose up -d
```

### 2) Configure the backend (NestJS)

1. Copy env file:
```bash
cd task-manager
cp .env.example .env
```

2. Ensure `DATABASE_URL` matches your running Postgres:
- default: `postgresql://task_manager:task_manager@localhost:5433/task_manager?schema=public`

### 3) Run database migrations + start NestJS
```bash
cd task-manager
npm install
npm run prisma:migrate
npm run start:dev
```

Backend port:
- defaults to `3000` if `PORT` is not set
- `.env.example` uses `PORT=3001`

### 4) Run the frontend (React + Tailwind)

Create `todo-app/.env`:
```bash
# Match your NestJS backend port (see `task-manager/.env`).
VITE_API_BASE_URL=http://localhost:3000
```

Start the dev server:
```bash
cd todo-app
npm install
npm run dev
```

### 5) Flutter mobile app (setup)

This repository contains documentation for the mobile app integration. If `mobile/` is not created yet, generate a new Flutter project:
```bash
flutter create mobile
```

Next steps (implementation guidance):
- Add an HTTP client (e.g. `package:http`)
- Use the same REST API:
  - base URL should match `VITE_API_BASE_URL` / NestJS
- Store `API_BASE_URL` using one of:
  - `--dart-define=API_BASE_URL=...`
  - or an `.env` + runtime config approach

## API Reference (quick)

Replace `3000` with your NestJS backend port (see `task-manager/.env`).

Tasks:
```bash
curl -X GET http://localhost:3000/tasks
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"2L","completed":false}'
```

Notes:
```bash
curl -X GET http://localhost:3000/notes
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note title","content":"Hello"}'
```

## Legacy Files

`epytodo.sql` is kept from an older MySQL-based prototype and is **not required** for the current PostgreSQL + Prisma setup.

