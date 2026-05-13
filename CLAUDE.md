# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standing Rules

- **Git identity**: run `git config user.name "fernandojosecc"` and `git config user.email "fernandojosecc@hotmail.com"` before every commit.
- **No Co-authored-by trailers** in any commit message.
- **Commit format**: `feat(scope): description` — follow Conventional Commits strictly.
- **Mobile-first**: all components must be designed and implemented mobile-first.
- **Design system only**: no ad-hoc styles; use design system tokens exclusively (TailwindCSS theme tokens / shadcn/ui variables).
- **Shared types**: always import from `@pawn-stars/shared-types`; never redefine entity types locally.
- **Mock data by default**: use mock/static data until explicitly told to connect a real API endpoint.
- **Project context**: read `plan.md` and `pawn-stars-requirements.md` at the repo root for full project requirements before starting any feature work.

## Project Overview

**Pawn Stars** — a competitive chess organization management platform. Full-stack monorepo with a Next.js public site/admin panel and a NestJS REST API, backed by PostgreSQL.

## Monorepo Setup

Uses **Turborepo** + **pnpm workspaces**.

- `apps/web` — Next.js 16 (App Router), React 19, TailwindCSS 4, shadcn/ui
- `apps/api` — NestJS 11, Prisma 5, PostgreSQL, Meilisearch
- `packages/shared-types` — TypeScript types shared between frontend and backend

## Commands

### Root (run from repo root)

```bash
pnpm dev              # Start all apps in parallel (web: 3000, api: 3001)
pnpm build            # Build all apps
pnpm test             # Run all tests
pnpm lint             # Lint all code
pnpm type-check       # TypeScript type checking
pnpm format           # Format with Prettier
pnpm format:check     # Verify formatting
pnpm clean            # Clean all build artifacts
```

### Database (Prisma — schema at `apps/api/prisma/schema.prisma`)

```bash
pnpm db:generate      # Regenerate Prisma client after schema changes
pnpm db:push          # Push schema changes without migration (dev only)
pnpm db:migrate       # Create and run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database
```

### Backend only (`apps/api`)

```bash
pnpm --filter api test               # Unit tests
pnpm --filter api test:e2e           # E2E tests (uses apps/api/test/jest-e2e.json)
pnpm --filter api test -- --testPathPattern=players  # Run single test file
pnpm --filter api test -- --watch    # Watch mode
pnpm --filter api test -- --coverage # Coverage report
```

### Frontend only (`apps/web`)

```bash
pnpm --filter web dev    # Dev server only
pnpm --filter web build  # Production build
pnpm --filter web lint   # Next.js lint
```

## Architecture

### Data Flow

```
Browser → Next.js (apps/web) → NestJS API (apps/api) → Prisma → PostgreSQL
```

The frontend never accesses the database directly. All data goes through the NestJS API. Shared TypeScript types in `packages/shared-types` keep frontend and backend in sync.

### Backend Structure (`apps/api/src`)

NestJS modules follow controller → service → Prisma pattern. Each domain is self-contained:

- `auth/` — JWT guards, roles decorator (`@Roles()`), RBAC middleware
- `players/` — player CRUD, Lichess rating import, FIDE stub
- `ratings/` — rating snapshots, nightly sync cron job
- `tournaments/` — tournament, round, pairing, match management
- `rankings/` — ranking calculations
- `sponsors/` — sponsor tiers and cards
- `search/` — Meilisearch integration
- `news/`, `media/`, `contact/`, `schedule/` — content and ops

Guards: `JwtAuthGuard` is applied globally; use `@Public()` to opt out. Role enforcement via `@Roles(RoleEnum.Admin)`.

### Frontend Structure (`apps/web/src`)

Next.js App Router with route groups:

- `app/(public)/` — public pages (players, tournaments, rankings, news, etc.)
- `app/(admin)/` — protected admin routes
- `components/ui/` — shadcn/ui base components
- `components/[feature]/` — feature-specific components
- `lib/api.ts` — API client wrapper
- `lib/structured-data.ts` — JSON-LD schema markup
- `middleware.ts` — Next.js route protection (checks JWT)

### Shared Types (`packages/shared-types/src/entities/`)

All entity types (Player, Tournament, Match, Rating, etc.) live here and are imported by both apps. Always update shared types when changing API contracts.

## Key Configuration Files

- `turbo.json` — task pipeline and cache strategy
- `tsconfig.base.json` — shared TS config and `@/*` path aliases
- `apps/api/.env.example` — all required environment variables
- `apps/api/prisma/schema.prisma` — complete data model (20+ models)
- `apps/api/src/app.module.ts` — NestJS module registry

## Environment Variables

Copy `apps/api/.env.example` to `apps/api/.env` for local development. Key vars:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — used by auth module
- `MEILISEARCH_HOST` / `MEILISEARCH_API_KEY` — search service
- `LICHESS_API_TOKEN` — Lichess rating import
- `RESEND_API_KEY` — email (contact form)
