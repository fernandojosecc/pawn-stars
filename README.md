# ♟ Pawn Stars

### Competitive Chess Organization Management Platform

[![Build](https://img.shields.io/github/actions/workflow/status/fernandojosecc/pawn-stars/ci.yml?branch=main&label=build&style=flat-square)](https://github.com/fernandojosecc/pawn-stars/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-e0234e?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

---

## Overview

Pawn Stars is a full-stack platform built for competitive chess organizations to manage their roster, tournaments, rankings, and fan-facing content from a single system. It solves the fragmentation problem that most chess clubs face — juggling spreadsheets for standings, third-party services for news, and disconnected tools for internal scouting and sponsor reporting.

The platform serves four audiences simultaneously: **public fans** browsing player profiles and live match coverage, **internal staff** using admin and scouting tools, **players** accessing their private portal, and **sponsors** reviewing their campaign performance. All four surfaces share a single NestJS API and a common TypeScript type contract, keeping data consistent without duplication.

---

## Live Demo

> Deployment is in progress. A hosted demo will be available at **[pawnstars.fernandocontreras.dev](https://pawnstars.fernandocontreras.dev)** once Railway and Vercel environments are provisioned.

---

## Key Features

### Public Site
- **Roster** — player grid with filter by title, nationality, and active status; SSG detail pages with ratings history and recent form
- **Tournaments** — list and detail pages with rounds, pairings, standings, and tournament timeline
- **Rankings** — team and player rankings with Elo evolution charts
- **News & Blog** — category-filtered news feed, rich blog posts with embed, quote, stat, and gallery content blocks
- **Match Center** — match header, lineup, round-by-round results, MVP, and post-match stats
- **Media Library** — photo and video gallery with lightbox
- **Seasons Archive** — SSG pages for each completed season with historical standings and stats

### Real-Time
- **WebSocket Live Coverage** — Socket.io gateway broadcasts round results, standings updates, and move annotations to all connected clients as they happen
- **Live viewer count** — tracks and displays concurrent viewers per match
- **Auto-reconnect** — client hook handles disconnects and reconnects gracefully with a status banner

### AI-Powered
- **Automated Article Generation** — admin triggers post-tournament article generation via the Anthropic Claude API (`claude-sonnet-4-20250514`); output is a structured chess journalism piece (headline, lead, body, outlook) that can be inline-edited and published to drafts
- **Fallback mode** — if no API key is configured, a realistic mock article is returned so the UI always works

### Internal Tools
- **Admin Dashboard** — full CRUD for players, tournaments, news, and matches; role-gated by JWT
- **Player Portal** — private `/portal` area for players to access internal stats, upcoming schedule, and study materials
- **Scouting Tools** — advanced player search, named shortlists, and side-by-side comparison view for coaches and analysts
- **Sponsor Portal** — `/sponsor-portal` with campaign reports, reach metrics (audience demographics, pageview trends, social reach), and a branded asset library
- **Newsletter Admin** — subscriber management, segment filtering, send history, and a broadcast interface backed by Resend
- **Audit Logs** — every create, update, and delete action across all entities is logged with before/after diff, user, IP, and timestamp; searchable activity feed with bar chart of actions over time
- **Observability Dashboard** — service health cards (API, database, ratings import, article generation, newsletter queue, Meilisearch), recent error log, active sessions count, and build info

### Data
- **Lichess Ratings Import** — nightly cron job syncs classical, rapid, and blitz ratings for every player via the Lichess API; fully abstracted behind a `RatingsProviderInterface` so FIDE can be swapped in
- **Stats Snapshots** — player performance data captured at tournament end and stored as JSONB snapshots for historical reporting
- **Structured Data** — JSON-LD markup for Player, Tournament, Match, and Organization entities on every public page; full XML sitemap and per-page Open Graph metadata

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 (App Router), React 19 | SSR/SSG per page type, server components by default |
| **UI** | TailwindCSS 4, shadcn/ui | Design token system, accessible component primitives |
| **Backend** | NestJS 11 | Modular REST API, RBAC guards, WebSocket gateway |
| **ORM** | Prisma 5 | Type-safe database client, versioned migrations |
| **Database** | PostgreSQL | Relational integrity for ratings, pairings, standings |
| **Auth** | JWT (HS256) | Stateless sessions; shared secret validates token across Next.js and NestJS |
| **Real-Time** | Socket.io 4 | WebSocket live coverage gateway with per-match rooms |
| **Search** | Meilisearch | Typo-tolerant, faceted search across players, news, tournaments |
| **Email** | Resend + React Email | Transactional and newsletter sends from typed React templates |
| **AI** | Anthropic Claude API | Post-tournament article generation via `claude-sonnet-4-20250514` |
| **Storage** | AWS S3 + CloudFront | Public media and private player assets with signed URLs |
| **Cache** | Redis (Upstash) | Ratings/standings cache, rate limiting, pub/sub |
| **CMS** | Payload CMS (self-hosted) | News, blog, and media collections with role-gated publishing |
| **Analytics** | Plausible | Privacy-first, GDPR-compliant pageview and event tracking |
| **Deployment** | Vercel (web) + Railway (api, cms, redis, meilisearch) | Zero-config Next.js hosting; managed multi-service backend |
| **Monitoring** | Sentry + Betterstack Logtail | End-to-end error tracking, structured log aggregation |
| **Build** | Turborepo + pnpm workspaces | Parallel task execution, remote caching across packages |

---

## Project Structure

```
pawn-stars/
├── apps/
│   ├── web/                    # Next.js 16 public site and admin panel
│   │   ├── app/                # App Router pages and layouts
│   │   │   ├── (public)/       # Public pages — SSR/SSG, no auth required
│   │   │   ├── admin/          # Admin panel — role: admin, content_manager
│   │   │   ├── portal/         # Player portal — role: player
│   │   │   ├── scouting/       # Scouting tools — role: coach, analyst
│   │   │   └── sponsor-portal/ # Sponsor portal — role: admin
│   │   ├── components/         # Feature components (players, tournaments, admin, …)
│   │   ├── hooks/              # React hooks (useMatchCoverage, useSearch, …)
│   │   └── lib/                # API client, metadata helpers, mock data, structured data
│   │
│   ├── api/                    # NestJS 11 REST API and WebSocket gateway
│   │   ├── src/
│   │   │   ├── auth/           # JWT guards, roles decorator, RBAC
│   │   │   ├── players/        # Player CRUD, Lichess import
│   │   │   ├── tournaments/    # Tournament, round, pairing management
│   │   │   ├── matches/        # Match CRUD
│   │   │   ├── rankings/       # Ranking calculations
│   │   │   ├── ratings/        # Rating snapshots, nightly sync cron
│   │   │   ├── stats/          # Player stats snapshots
│   │   │   ├── seasons/        # Season archive
│   │   │   ├── news/           # News articles
│   │   │   ├── blog/           # Blog posts with content blocks
│   │   │   ├── media/          # Media asset management
│   │   │   ├── sponsors/       # Sponsor tiers and cards
│   │   │   ├── search/         # Meilisearch integration
│   │   │   ├── contact/        # Contact form → Resend
│   │   │   ├── notifications/  # Email service wrapper (Resend)
│   │   │   ├── newsletter/     # Subscriber management, batch sends
│   │   │   ├── live-coverage/  # Socket.io gateway and match state
│   │   │   ├── article-generation/ # Claude API article generator
│   │   │   └── audit/          # Audit log service and controller
│   │   └── prisma/             # Schema (20+ models), migrations, seed
│   │
│   └── cms/                    # Payload CMS — news, blog, media collections
│
├── packages/
│   ├── shared-types/           # TypeScript entity types shared by web and api
│   └── email-templates/        # React Email templates rendered server-side
│
├── turbo.json                  # Turborepo task pipeline and cache config
├── pnpm-workspace.yaml         # pnpm workspace package list
└── tsconfig.base.json          # Shared TypeScript config and path aliases
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9 — `npm install -g pnpm`
- **PostgreSQL** ≥ 15 running locally or via Docker
- **Meilisearch** running locally — `docker run -p 7700:7700 getmeili/meilisearch`

### Installation

```bash
# Clone the repository
git clone https://github.com/fernandojosecc/pawn-stars.git
cd pawn-stars

# Install all dependencies across all packages
pnpm install
```

### Environment Variables

```bash
# Copy the example file and fill in your values
cp apps/api/.env.example apps/api/.env
```

See the [Environment Variables](#environment-variables) section below for a full reference.

### Run in Development

```bash
# Start all apps in parallel (web: 3000, api: 3001)
pnpm dev

# Frontend only
pnpm --filter web dev

# Backend only
pnpm --filter api dev
```

### Database Setup

```bash
# Push schema to your local database (dev only — no migration file created)
pnpm db:push

# Or create a versioned migration
pnpm db:migrate

# Seed with sample data
pnpm db:seed

# Open Prisma Studio
pnpm db:studio
```

### Build for Production

```bash
# Build all packages
pnpm build

# Build a single package
pnpm --filter web build
pnpm --filter api build
```

### Other Commands

```bash
pnpm lint          # Lint all packages
pnpm type-check    # TypeScript check across the monorepo
pnpm test          # Run all tests
pnpm format        # Format with Prettier
pnpm clean         # Remove all build artifacts
```

---

## Environment Variables

All variables are set in `apps/api/.env`. Copy `apps/api/.env.example` to get started.

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Your local Postgres instance or Railway |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens | Generate with `openssl rand -hex 32` |
| `MEILISEARCH_HOST` | Meilisearch instance URL | `http://localhost:7700` locally, Railway service URL in production |
| `MEILISEARCH_API_KEY` | Meilisearch master or search API key | Set during Meilisearch startup or Railway dashboard |
| `ANTHROPIC_API_KEY` | Anthropic API key for article generation | [console.anthropic.com](https://console.anthropic.com) |
| `RESEND_API_KEY` | Resend API key for transactional and newsletter email | [resend.com/api-keys](https://resend.com/api-keys) |
| `LICHESS_API_TOKEN` | Lichess personal API token for ratings import | [lichess.org/account/oauth/token](https://lichess.org/account/oauth/token) |
| `LICHESS_API_URL` | Base URL for the Lichess API | `https://lichess.org/api` |

> **Note:** `ANTHROPIC_API_KEY` and `RESEND_API_KEY` are optional for local development. The article generator returns a realistic mock article when no key is set, and email sends are silently skipped.

---

## Architecture Decisions

The full technical rationale is documented in [`plan.md`](./plan.md). Key decisions at a glance:

- **Provider abstraction for ratings** — Lichess and FIDE integrations both implement a `RatingsProviderInterface`, so the sync source can be changed without touching any other module. This was a deliberate constraint because FIDE's data feed format is unstable.

- **RBAC via JWT claims** — Five roles (`admin`, `content_manager`, `coach`, `analyst`, `player`) are embedded in the JWT payload and enforced at the NestJS route level via `@Roles()` and `RolesGuard`, and at the Next.js routing level via middleware. The API and frontend validate the same token using a shared secret — no separate session store needed.

- **SSR vs SSG per page type** — Player and tournament detail pages are pre-rendered at build time with `generateStaticParams` for fast load and strong SEO. Dynamic pages (live standings, match center) use `force-dynamic` SSR. The distinction is explicit and intentional — not left to framework defaults.

- **Shared types contract** — All entity types (Player, Tournament, Match, Rating, AuditLog, etc.) live in `packages/shared-types` and are imported by both `apps/web` and `apps/api`. No type is defined twice. Any API contract change requires updating shared types first, making breaking changes visible across the whole codebase at compile time.

---

## Roadmap

### ✅ Phase 0 — Project Setup
Turborepo monorepo, pnpm workspaces, shared TypeScript config, Prisma baseline, JWT auth, design system tokens.

### ✅ Phase 1 — Public Site Core
Home page, team page, players grid and detail, tournaments list, news feed, contact form, basic admin CRUD.

### ✅ Phase 2 — Competitive Core
Match center, rankings with Elo chart, tournament detail (rounds, pairings, standings), schedule/calendar, media library, sponsors page, RBAC enforcement.

### ✅ Phase 3 — Data & Automation
Lichess ratings import (nightly cron), stats snapshots, season archive, rich blog content blocks, full SEO layer (JSON-LD, Open Graph, sitemap), email notifications via Resend.

### ✅ Phase 4 — Advanced Features
Player portal, scouting tools (shortlists, comparison view), WebSocket live coverage, sponsor portal, AI article generation (Claude API), newsletter system, audit logs and observability dashboard.

### ⏳ Next
- [ ] Connect all frontend pages to live NestJS API (remove mock data)
- [ ] Deploy `apps/web` to Vercel and `apps/api` to Railway
- [ ] Provision production PostgreSQL, Redis, and Meilisearch on Railway
- [ ] Wire Payload CMS for news and blog content management
- [ ] Configure GitHub Actions CI/CD pipeline
- [ ] Set up Sentry error tracking and Betterstack log aggregation
- [ ] Seed production database with real player and tournament data

---

## Author

**Fernando Contreras**

Full-stack engineer with a focus on TypeScript, Next.js, and NestJS. This project was built as a comprehensive portfolio piece demonstrating full product engineering across frontend, backend, real-time systems, AI integration, and developer tooling.

- GitHub: [@fernandojosecc](https://github.com/fernandojosecc)
- LinkedIn: [linkedin.com/in/fernandojosecc](https://linkedin.com/in/fernandojosecc)
- Portfolio: [fernandocontreras.dev](https://fernandocontreras.dev)

---

<p align="center">
  Built with Next.js, NestJS, and the Anthropic Claude API &nbsp;·&nbsp; © 2026 Fernando Contreras
</p>
