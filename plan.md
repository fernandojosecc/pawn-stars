# Pawn Stars — Technical Stack & Execution Plan

---

## Part 1 — Technical Stack

---

### Frontend Framework
**Choice:** Next.js 14 (App Router)
**Rationale:** Next.js provides per-page rendering strategy control — SSG for static content (team, sponsors, blog archives) and SSR for dynamic content (live standings, player ratings, match center) within the same codebase. The App Router enables server components by default, reducing client-side JavaScript and improving Core Web Vitals, which matters for SEO-critical public pages. Its image optimization and built-in metadata API align directly with the non-negotiable SEO constraint.
**Key config:** Use `generateStaticParams` for player and tournament detail pages to pre-render at build time; reserve `dynamic = 'force-dynamic'` only for live coverage mode and real-time standings pages.

---

### UI Component System
**Choice:** Tailwind CSS + shadcn/ui
**Rationale:** Tailwind's utility-first approach enforces the design token contract established in Phase 0 — no ad-hoc styles can slip in because all styling goes through the token layer. shadcn/ui provides accessible, unstyled primitives (dialogs, tables, forms, tabs) that are copied into the codebase and owned fully, avoiding version-lock to a component library while maintaining consistency. This combination is mobile-first by design.
**Key config:** Define a `tailwind.config.ts` with a custom `colors`, `fontFamily`, and `spacing` theme extension containing all Pawn Stars brand tokens; use `cva` (class-variance-authority) for all component variants to keep conditional styling co-located with components.

---

### Backend Framework
**Choice:** NestJS (REST, modular)
**Rationale:** NestJS's module system maps directly to the domain boundaries of this project (players, tournaments, ratings, media, auth, notifications) — each module is isolated with its own controller, service, and repository layer. REST is chosen over GraphQL because the data access patterns are well-defined and mostly entity-based (GET /players/:id, GET /tournaments/:id/standings), not graph-shaped; GraphQL's added complexity is not justified by the query requirements. NestJS's built-in guards and interceptors make RBAC straightforward to enforce at the route level.
**Key config:** Structure each domain as a NestJS feature module; use a `SharedModule` for cross-cutting concerns (config, logger, database connection). Enable OpenAPI generation via `@nestjs/swagger` from the start so the frontend team has a typed API contract.

---

### Database
**Choice:** PostgreSQL + Prisma ORM
**Rationale:** Player ratings and tournament standings require relational integrity — foreign keys between `pairings`, `rounds`, `tournaments`, and `players` are critical and must be enforced at the database level, not application level. PostgreSQL's native support for JSONB handles flexible stat snapshots without requiring a secondary NoSQL store. Prisma's type-safe client generates TypeScript types from the schema, enabling the shared type contract between frontend and backend required by the project constraints.
**Key config:** Use Prisma migrations (not `db push`) from day one so every schema change is versioned and reproducible across dev, staging, and production environments. Enable connection pooling via `pgbouncer` in production.

---

### Authentication
**Choice:** Auth.js (NextAuth v5) + JWT sessions
**Rationale:** Auth.js v5 integrates natively with the Next.js App Router and handles both the public-facing OAuth flows and the internal admin credential login in a unified configuration. JWT sessions (as opposed to database sessions) reduce read load on the database for every authenticated request — important given that players, coaches, and analysts will access private areas frequently. RBAC is implemented as a `role` field on the `User` model, enforced via NestJS guards on the API and middleware on protected Next.js routes.
**Key config:** Define five roles in the JWT payload: `admin`, `content_manager`, `coach`, `analyst`, `player`. Use Next.js middleware to protect `/admin/*`, `/portal/*`, and `/scouting/*` route groups by role. API routes validate the same JWT via a shared secret.

---

### CMS
**Choice:** Payload CMS (self-hosted)
**Rationale:** Payload CMS is TypeScript-native and generates typed collections that integrate directly with the Prisma/NestJS backend without a translation layer — news posts, blog posts, and media assets managed in Payload can be queried via its REST/GraphQL API and cached at the Next.js layer. Self-hosting avoids per-seat or per-request pricing that scales poorly as the content team grows. Its rich text editor supports the custom content blocks (embeds, quote blocks, stat blocks, galleries) required in Phase 3.
**Key config:** Deploy Payload as a separate service on the same VPC as the backend. Configure `news`, `blog`, `media`, and `press_assets` collections in Payload; use Payload's built-in access control to restrict publishing to `content_manager` and `admin` roles only.

---

### File Storage
**Choice:** AWS S3 + CloudFront CDN
**Rationale:** Player photos, press kits, and media gallery assets require durable object storage with global delivery — S3 provides the durability and CloudFront provides the edge caching. S3's signed URL pattern allows the backend to generate time-limited upload and download URLs without exposing bucket credentials to the frontend, which is essential for the player portal's private study material uploads. CloudFront also handles image transformation via Lambda@Edge if needed in Phase 3.
**Key config:** Use separate S3 buckets for `public-media` (player photos, press assets, gallery) and `private-assets` (player portal study material); configure bucket policies so CloudFront can only serve `public-media` directly, while `private-assets` require a signed URL generated by the backend.

---

### Search
**Choice:** Meilisearch (self-hosted)
**Rationale:** Full-text search across players, news, and tournaments requires a dedicated search engine — PostgreSQL full-text search is adequate for simple queries but lacks the ranking, typo-tolerance, and faceted filtering needed for the players grid (filter by rating range, position, nationality) and news feed (filter by category, date). Meilisearch is lightweight, fast to self-host, and has a simple indexing API that integrates cleanly with NestJS services. Its built-in ranking rules handle the chess-specific sorting needs (rating-descending as default player sort).
**Key config:** Create three indexes: `players` (name, rating, nationality, title), `news` (title, summary, tags, date), `tournaments` (name, season, status). Sync indexes via NestJS event hooks on entity create/update/delete — never query Meilisearch directly from the frontend.

---

### Cache Layer
**Choice:** Redis (Upstash for managed, or self-hosted)
**Rationale:** Player ratings and tournament standings are read far more than they are written — Redis provides sub-millisecond cache hits for these high-traffic endpoints without hitting the database. Redis is also used for rate limiting on the trial application endpoint and for pub/sub in the live coverage mode (Phase 4). Using a single cache layer for all these concerns simplifies the infrastructure compared to multiple specialized tools.
**Key config:** Cache standings and ratings with a TTL of 60 seconds; cache static aggregations (season archives, historical standings) with a TTL of 1 hour. Use a `cache-aside` pattern in NestJS services — never write cache logic directly in controllers. Invalidate on write via cache tags.

---

### Email
**Choice:** Resend + React Email
**Rationale:** Resend provides a developer-first transactional email API with excellent deliverability and a straightforward SDK that integrates into NestJS services without complex SMTP configuration. React Email allows building email templates as React components with full TypeScript support, which enforces the shared type contract for dynamic data (player names, match results, tournament standings) that populates email content. The same Resend account handles both transactional (trial status, match results) and marketing (newsletter) sends via audience segmentation.
**Key config:** Create NestJS `EmailModule` that wraps the Resend SDK; define all email templates as React Email components in a `packages/email-templates` package shared between the backend service and any future serverless send functions.

---

### Analytics
**Choice:** Plausible Analytics (self-hosted or cloud)
**Rationale:** Plausible provides privacy-first, GDPR-compliant analytics with no cookie consent banner required — critical for an international chess audience across EU jurisdictions. It tracks pageviews, custom events (player profile views, tournament bracket interactions, media downloads), and referral sources without the complexity of Google Analytics 4. Its simple API allows custom event tracking directly from Next.js server actions and client components.
**Key config:** Self-host on a subdomain (`analytics.pawnstars.com`) to avoid ad-blocker interference. Instrument custom events for: player card clicks, bracket interactions, trial form submissions, and media asset downloads.

---

### Deployment
**Choice:** Vercel (frontend) + Railway (backend + Payload CMS + Redis + Meilisearch) + GitHub Actions (CI/CD)
**Rationale:** Vercel is the optimal host for Next.js — zero-config deployments, automatic preview URLs per PR, and built-in edge caching for SSG pages. Railway provides a simple multi-service deployment environment for the NestJS API, Payload CMS, Redis, and Meilisearch with managed PostgreSQL, without the operational overhead of Kubernetes. GitHub Actions handles the CI/CD pipeline with separate workflows for frontend and backend, gating merges on passing tests and type checks.
**Key config:** Configure three Railway environments (dev, staging, production) with separate PostgreSQL instances. Use Vercel's environment variable integration with GitHub for automatic promotion from staging to production. All Railway services communicate over a private internal network — only the NestJS API and Payload CMS are exposed via public URLs.

---

### Monitoring
**Choice:** Sentry (errors + performance) + Betterstack Logtail (logs)
**Rationale:** Sentry provides end-to-end error tracking across both Next.js (client and server components) and NestJS with a single SDK integration, and its performance monitoring captures Core Web Vitals at the page level — directly actionable for the Phase 3 optimization pass. Betterstack Logtail aggregates structured logs from all Railway services into a single queryable interface, enabling the admin observability dashboard in Phase 4 without building custom log infrastructure. Both integrate with GitHub for issue linking.
**Key config:** Configure Sentry source maps upload in both Vercel and Railway build steps so stack traces resolve to original TypeScript source. Set Sentry performance sample rate to 10% in production to control quota. Use Betterstack's NestJS logger transport so all application logs are structured JSON from day one.

---

## Part 2 — Execution Plan

---

## Phase 0 — Project Setup

**Goal:** Functioning monorepo with all infrastructure provisioned, CI/CD green, design tokens defined, and database baseline migrated.
**Deliverable:** Empty but deployable frontend and backend with auth, database, and CI/CD running end-to-end.

### Monorepo Scaffolding
- [ ] Initialize Turborepo monorepo with `apps/web`, `apps/api`, `apps/cms`, and `packages/` structure — **M**
- [ ] Configure `pnpm` workspaces and root `package.json` scripts (`dev`, `build`, `test`, `lint`) — **S**
- [ ] Set up TypeScript project references with shared `tsconfig.base.json` — **S**
- [ ] Create `packages/shared-types` package for cross-app DTOs and entity types — **S**
- [ ] Create `packages/email-templates` package with React Email and Resend — **S**

### Environment Configuration
- [ ] Define `.env.example` for all three apps with all required variables documented — **S**
- [ ] Configure Railway projects for dev, staging, and production environments — **M**
- [ ] Provision PostgreSQL instances on Railway for each environment — **S**
- [ ] Provision Redis on Railway — **S**
- [ ] Provision Meilisearch on Railway — **S**
- [ ] Configure Vercel project linked to monorepo with `apps/web` as root — **S**

### CI/CD Pipeline
- [ ] Create GitHub Actions workflow: lint + typecheck + test on every PR — **M**
- [ ] Create GitHub Actions workflow: deploy `apps/web` to Vercel on merge to `main` — **S**
- [ ] Create GitHub Actions workflow: deploy `apps/api` and `apps/cms` to Railway on merge to `main` — **M**
- [ ] Configure branch protection rules: require CI pass before merge — **S**
- [ ] Set up Sentry release tracking in both deploy workflows — **S**

### Design System & Token Setup
- [ ] Configure Tailwind CSS in `apps/web` with custom brand token theme (colors, typography, spacing, breakpoints) — **M**
- [ ] Install and configure shadcn/ui with project theme — **S**
- [ ] Create base component set: `Button`, `Badge`, `Card`, `Table`, `Input`, `Select`, `Dialog`, `Tabs` — **L**
- [ ] Create typography components: `Heading`, `Body`, `Label`, `Caption` — **S**
- [ ] Create layout components: `Container`, `Grid`, `Stack`, `Section` — **S**
- [ ] Set up Storybook for component documentation (optional but recommended for team consistency) — **M**

### Database Baseline
- [ ] Initialize Prisma in `apps/api` with PostgreSQL connection — **S**
- [ ] Write initial Prisma schema for `users`, `roles`, `players`, `staff`, `teams` — **L**
- [ ] Write Prisma migration for baseline schema — **S**
- [ ] Configure Prisma client generation in build pipeline — **S**
- [ ] Seed dev database with sample data (3 players, 1 team, 2 roles) — **M**

### Auth Setup
- [ ] Configure Auth.js v5 in `apps/web` with credentials provider for admin login — **M**
- [ ] Configure JWT session strategy with `role` field in token — **S**
- [ ] Implement Next.js middleware for route protection (`/admin/*`, `/portal/*`) — **M**
- [ ] Implement NestJS JWT guard that validates the same Auth.js token — **M**
- [ ] Create `users` and `roles` seed data for initial admin account — **S**

---

## Phase 1 — MVP (Public Site Core)

**Goal:** Fully public-facing website with SSR/SSG on all pages, CMS-driven news, and a basic internal admin panel.
**Deliverable:** Live public site with all core pages, player/news content manageable by admins.
**Dependencies:** Phase 0 complete.

### Home Page
- [ ] Build hero section component (headline, CTA, background image) — **M**
- [ ] Build live match bar component (upcoming/live match strip) — **M** → requires: Matches schema
- [ ] Build featured players carousel component — **M** → requires: Players API endpoint
- [ ] Build recent news strip component (3 latest news cards) — **M** → requires: CMS news integration
- [ ] Assemble home page with SSR for match bar, SSG for rest — **M**
- [ ] Implement Open Graph and meta tags for home page — **S**

### Team Page
- [ ] Build team history section (rich text + timeline) — **M**
- [ ] Build philosophy/values section — **S**
- [ ] Build staff grid section (photo, name, role) — **M** → requires: Staff API endpoint
- [ ] Implement SSG for team page — **S**
- [ ] Add Open Graph meta for team page — **S**

### Players Page
- [ ] Create NestJS `PlayersModule` with `GET /players` (paginated, filterable) — **M**
- [ ] Add Prisma schema for `players` with all fields (bio, ratings, titles, nationality) — **L**
- [ ] Build player card component (photo, name, rating, title, nationality badge) — **M**
- [ ] Build filter bar component (filter by title, nationality, active status) — **M**
- [ ] Build players grid page with SSG + client-side filter state — **L**
- [ ] Integrate Meilisearch player index sync on player create/update — **M**
- [ ] Add Open Graph meta for players list page — **S**

### Player Detail Page
- [ ] Create NestJS `GET /players/:id` endpoint with full player data — **M**
- [ ] Build player bio section (photo, stats header, bio text) — **M**
- [ ] Build ratings history section (current rating display, FIDE/Lichess badge) — **M**
- [ ] Build recent form section (last 5 results with opponent, result, date) — **M** → requires: Matches/Pairings schema
- [ ] Build recent results table component — **M**
- [ ] Implement SSG with `generateStaticParams` for all player pages — **M**
- [ ] Add structured data (JSON-LD Person schema) for player pages — **M**

### Tournaments List Page
- [ ] Create NestJS `TournamentsModule` with `GET /tournaments` — **M**
- [ ] Add Prisma schema for `tournaments`, `seasons`, `rounds` — **L**
- [ ] Build tournament card component (name, dates, format, status badge) — **M**
- [ ] Build tournaments list page with SSR — **M**
- [ ] Add Open Graph meta for tournaments list — **S**

### News Feed
- [ ] Set up Payload CMS `news` collection (title, slug, summary, body, tags, cover image, author, published date) — **M**
- [ ] Create Next.js news feed page with SSR fetching from Payload — **M**
- [ ] Build news card component (cover, title, summary, tag, date) — **M**
- [ ] Build category filter component for news — **M**
- [ ] Build news detail page with SSG — **L** → requires: Payload CMS news collection
- [ ] Add JSON-LD Article schema for news detail pages — **M**
- [ ] Add sitemap generation for news pages — **M**

### Contact Page
- [ ] Build contact form component (name, email, subject, message, CAPTCHA) — **M**
- [ ] Create NestJS `ContactModule` with `POST /contact` (sends email via Resend) — **M**
- [ ] Build contact page with SSG — **S**

### Basic Admin Panel
- [ ] Scaffold `/admin` route group with role-guard middleware (`admin`, `content_manager` only) — **M**
- [ ] Build admin layout (sidebar nav, header, user menu) — **L**
- [ ] Build players CRUD screens (list, create, edit, delete) — **L** → requires: Players API
- [ ] Build news CRUD (redirect to Payload CMS for editing, list/delete in admin) — **M**
- [ ] Build tournaments CRUD screens (list, create, edit, delete) — **L** → requires: Tournaments API
- [ ] Build staff CRUD screens — **M** → requires: Staff API endpoint
- [ ] Add admin dashboard home (recent activity summary) — **M**

### CMS Integration
- [ ] Deploy Payload CMS on Railway — **M**
- [ ] Configure `news` and `blog` collections in Payload with content blocks — **L**
- [ ] Configure `media` collection in Payload with S3 storage adapter — **M**
- [ ] Create Next.js CMS service layer (`lib/cms.ts`) for all Payload API calls — **M**
- [ ] Implement ISR (Incremental Static Regeneration) for news pages triggered by Payload webhooks — **M**

---

## Phase 2 — Competitive Core

**Goal:** Full competitive data infrastructure: match center, rankings, tournament detail, calendar, media library, sponsors, and RBAC.
**Deliverable:** Complete competitive-facing site sections; internal role access fully enforced.
**Dependencies:** Phase 1 complete, ratings schema in place.

### Match Center
- [ ] Add Prisma schema for `matches`, `lineups`, `match_results`, `mvp` — **L**
- [ ] Create NestJS `MatchesModule` with match detail endpoint — **M**
- [ ] Build match header component (teams, date, venue, status) — **M**
- [ ] Build lineup section component (both teams' board order) — **M**
- [ ] Build round-by-round results table component — **M**
- [ ] Build MVP section component — **S**
- [ ] Build post-match stats section (score breakdown, performance highlights) — **M**
- [ ] Build match center page with SSR — **L**
- [ ] Add Open Graph meta for match pages — **S**

### Rankings Page
- [ ] Add Prisma schema for `ratings`, `elo_history` — **M**
- [ ] Create NestJS `RankingsModule` with team and player ranking endpoints — **M**
- [ ] Build team rankings table component (rank, team name, points, matches) — **M**
- [ ] Build player rankings table component (rank, name, rating, title, change indicator) — **M**
- [ ] Build ELO evolution chart component (line chart with Recharts) — **L**
- [ ] Build rankings page with SSR — **M**
- [ ] Cache rankings response in Redis (60s TTL) — **M** → requires: Redis setup (Phase 0)

### Tournament Detail Page
- [ ] Create NestJS `GET /tournaments/:id` with full rounds/pairings/standings — **L**
- [ ] Add Prisma schema for `pairings`, `standings` — **M**
- [ ] Build tournament header component (name, format, dates, status) — **M**
- [ ] Build rounds/pairings table component — **L**
- [ ] Build standings table component (rank, player, score, TB) — **M**
- [ ] Build tournament timeline component — **M**
- [ ] Build tournament detail page with SSR — **L**
- [ ] Implement SSG for completed tournaments — **M**
- [ ] Add JSON-LD Event schema for tournament pages — **M**

### Calendar / Schedule Page
- [ ] Create NestJS `GET /calendar` endpoint (upcoming matches and tournaments) — **M**
- [ ] Build calendar/list view toggle component — **M**
- [ ] Build schedule event card component — **M**
- [ ] Build calendar page with SSR — **M**

### Media Library
- [ ] Configure S3 `public-media` bucket and CloudFront distribution — **M** → requires: AWS setup
- [ ] Add Prisma schema for `media_assets` (url, type, alt, tournament_id, match_id) — **M**
- [ ] Create NestJS `MediaModule` with gallery endpoint — **M**
- [ ] Set up Payload CMS `media` collection syncing to S3 — **M** → requires: CMS integration (Phase 1)
- [ ] Build media gallery grid component (photos, videos, press assets) — **L**
- [ ] Build media lightbox component — **M**
- [ ] Build media library page with SSR — **M**

### Sponsors Page
- [ ] Add Prisma schema for `sponsors` (name, logo, tier, url, active) — **S**
- [ ] Create NestJS `SponsorsModule` with sponsors endpoint — **S**
- [ ] Build sponsor card component (logo, tier badge) — **S**
- [ ] Build sponsors page with SSG — **S**
- [ ] Build sponsors admin CRUD screen — **M**

### Role-Based Access Control
- [ ] Define five roles in Prisma schema (`admin`, `content_manager`, `coach`, `analyst`, `player`) — **S**
- [ ] Implement NestJS `RolesGuard` using JWT role claim — **M**
- [ ] Implement Next.js route group middleware for all protected areas — **M**
- [ ] Add role management screen in admin panel (assign roles to users) — **M**
- [ ] Audit all API endpoints and apply appropriate role guards — **L**
- [ ] Write integration tests for RBAC scenarios (unauthorized access returns 403) — **M**

---

## Phase 3 — Data & Automation

**Goal:** External data feeds integrated, automated stats capture, rich blog content, SEO complete, and email notifications live.
**Deliverable:** Self-updating rating data, complete SEO implementation, transactional emails sending.
**Dependencies:** Phase 2 complete, all entity schemas finalized.

### External Ratings Import
- [ ] Implement `LichessRatingsService` behind `RatingsProviderInterface` — **L**
- [ ] Implement `FIDERatingsService` behind the same `RatingsProviderInterface` — **L**
- [ ] Create NestJS scheduled job (cron) for nightly ratings sync — **M**
- [ ] Store rating history snapshots in `ratings` table per sync run — **M**
- [ ] Build admin screen for manual ratings sync trigger and last-sync status — **M**
- [ ] Write unit tests for ratings service abstraction layer — **M**

### Stats Snapshots System
- [ ] Add Prisma schema for `stats_snapshots` (player_id, tournament_id, captured_at, data JSONB) — **M**
- [ ] Implement NestJS `SnapshotsService` that captures player stats at tournament end — **L**
- [ ] Create cron job to trigger snapshot capture after each round completion — **M**
- [ ] Build admin screen to view and manage snapshots — **M**

### Season Archive
- [ ] Add Prisma schema for `seasons` with start/end dates and archive flag — **S**
- [ ] Create NestJS `SeasonsModule` with archived season endpoints — **M**
- [ ] Build season archive list page with SSG — **M**
- [ ] Build season detail page (all tournaments, final standings, stats) with SSG — **L**
- [ ] Implement static generation for all archived seasons at build time — **M**

### Blog with Rich Content Blocks
- [ ] Add custom content blocks to Payload CMS `blog` collection: embed, quote, stat, gallery — **L**
- [ ] Build Next.js block renderer components for each block type — **L**
- [ ] Build blog post detail page with SSG — **M**
- [ ] Build blog list page with category filter and SSR — **M**
- [ ] Add JSON-LD Article schema for blog posts — **S**
- [ ] Sync blog posts to Meilisearch index on publish — **M**

### SEO Layer
- [ ] Implement Next.js `generateMetadata` for all remaining pages (players, tournaments, matches) — **L**
- [ ] Add JSON-LD structured data for Player, Tournament, Match, Organization entities — **L**
- [ ] Generate XML sitemap including players, tournaments, news, blog pages — **M**
- [ ] Configure `robots.txt` to block admin and portal routes — **S**
- [ ] Implement canonical URLs for paginated and filtered pages — **M**
- [ ] Audit Open Graph images for all page types (static OG image templates) — **M**

### Performance Optimization
- [ ] Audit all pages with Lighthouse; document failing Core Web Vitals — **M**
- [ ] Implement `next/image` with CloudFront CDN for all player and media images — **M**
- [ ] Implement lazy loading for below-fold components (media gallery, stats charts) — **M**
- [ ] Add `loading.tsx` and `suspense` boundaries to all dynamic data sections — **M**
- [ ] Optimize font loading (subsetting, `font-display: swap`) — **S**
- [ ] Verify LCP < 2.5s, CLS < 0.1, FID < 100ms on key pages — **M**

### Email Notifications
- [ ] Create NestJS `NotificationsModule` wrapping Resend SDK — **M**
- [ ] Build React Email template: match result notification — **M**
- [ ] Build React Email template: trial application status update — **M**
- [ ] Build React Email template: tournament round completion — **M**
- [ ] Implement event-driven email dispatch (NestJS EventEmitter on match/tournament events) — **L**
- [ ] Add user notification preferences (opt-in per type) to user profile — **M**
- [ ] Add Prisma schema for `notifications` log — **S**

---

## Phase 4 — Advanced Features

**Goal:** Private player portal, scouting tools, live coverage, sponsor portal, automated content, and admin observability.
**Deliverable:** Complete platform with internal tools for players, coaches, analysts, and sponsors.
**Dependencies:** Phase 3 complete, RBAC enforced (Phase 2).

### Player Profile Private Area
- [ ] Scaffold `/portal` route group with `player` role guard — **M**
- [ ] Build player portal layout (personal nav, welcome header) — **M**
- [ ] Build study material section (file upload to S3 private bucket, list/download) — **L** → requires: S3 private bucket
- [ ] Build internal stats section (private performance data not shown publicly) — **L**
- [ ] Build player calendar section (upcoming matches, training sessions) — **M**
- [ ] Create NestJS endpoints for portal-specific player data — **L**

### Scouting Tools
- [ ] Scaffold `/scouting` route group with `coach` and `analyst` role guard — **M**
- [ ] Build player search with advanced filters (rating range, title, age, nationality, form) — **L**
- [ ] Build shortlist feature (add/remove players, save named shortlists) — **L**
- [ ] Add Prisma schema for `shortlists` and `shortlist_players` — **M**
- [ ] Build player comparison view (side-by-side stats for 2–4 players) — **L**
- [ ] Build performance filter (filter by recent form, rating trend, tournament results) — **L**
- [ ] Create NestJS `ScoutingModule` with shortlist and comparison endpoints — **L**

### Live Coverage Mode
- [ ] Implement WebSocket gateway in NestJS (`socket.io`) for live updates — **L**
- [ ] Build live coverage page with real-time round updates — **L**
- [ ] Build live standings widget (updates via WebSocket) — **M**
- [ ] Build live alerts component (result notifications as they come in) — **M**
- [ ] Implement admin live coverage control panel (start/stop coverage, enter results) — **L**
- [ ] Implement Redis pub/sub for broadcasting updates across multiple API instances — **M**

### Sponsor Portal
- [ ] Scaffold `/sponsor-portal` route group with `sponsor` role — **M**
- [ ] Build campaign reach metrics dashboard (page views, impressions, clicks on sponsor assets) — **L** → requires: Plausible custom events
- [ ] Build sponsor report download (PDF export of campaign metrics) — **L**
- [ ] Create NestJS `SponsorPortalModule` with metrics aggregation endpoints — **L**

### Automated Post-Tournament Article Generation
- [ ] Implement NestJS `ArticleGenerationService` that composes a structured article template from tournament result data — **L**
- [ ] Create Payload CMS draft creation via API from generated content — **M**
- [ ] Build admin review/edit screen for generated drafts before publish — **M**
- [ ] Add trigger in tournament completion flow to auto-generate article draft — **M**

### Newsletter & Fan Engagement
- [ ] Integrate Resend audience/broadcast API for newsletter sends — **M**
- [ ] Build newsletter subscription form (embedded on home page and news pages) — **M**
- [ ] Build newsletter management screen in admin (compose, schedule, send) — **L**
- [ ] Create NestJS `NewsletterModule` with subscriber management endpoints — **M**

### Audit Logs & Admin Observability Dashboard
- [ ] Add Prisma schema for `audit_logs` (user_id, action, entity, entity_id, timestamp, diff JSONB) — **M**
- [ ] Implement NestJS `AuditInterceptor` that logs all state-changing API calls — **L**
- [ ] Build admin observability dashboard (recent errors from Sentry API, recent audit log, active users) — **L**
- [ ] Build audit log search/filter screen in admin panel — **M**
- [ ] Integrate Betterstack Logtail log viewer embed or API in observability dashboard — **M**

---

## Part 3 — File and Folder Structure

```
pawn-stars/
├── apps/
│   ├── web/                          # Next.js 14 App Router frontend
│   │   ├── app/
│   │   │   ├── (public)/             # Public route group (no auth required)
│   │   │   │   ├── page.tsx          # Home page
│   │   │   │   ├── team/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── players/
│   │   │   │   │   ├── page.tsx      # Players grid
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx  # Player detail
│   │   │   │   ├── tournaments/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── matches/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── rankings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── news/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── media/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── sponsors/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── seasons/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx
│   │   │   ├── (auth)/               # Auth pages
│   │   │   │   └── login/
│   │   │   │       └── page.tsx
│   │   │   ├── (admin)/              # Admin route group — role: admin, content_manager
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── players/
│   │   │   │   ├── tournaments/
│   │   │   │   ├── news/
│   │   │   │   ├── staff/
│   │   │   │   ├── sponsors/
│   │   │   │   ├── roles/
│   │   │   │   ├── ratings-sync/
│   │   │   │   ├── live-coverage/
│   │   │   │   ├── newsletter/
│   │   │   │   ├── audit-logs/
│   │   │   │   └── observability/
│   │   │   ├── (portal)/             # Player portal — role: player
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   ├── study/
│   │   │   │   ├── stats/
│   │   │   │   └── calendar/
│   │   │   ├── (scouting)/           # Scouting — role: coach, analyst
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── search/
│   │   │   │   ├── shortlists/
│   │   │   │   └── compare/
│   │   │   ├── (sponsor-portal)/     # Sponsor portal — role: sponsor
│   │   │   │   ├── layout.tsx
│   │   │   │   └── campaigns/
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   │       └── [...nextauth]/
│   │   │   │           └── route.ts
│   │   │   ├── layout.tsx            # Root layout
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── sitemap.ts
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui base components (owned copies)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── select.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── Grid.tsx
│   │   │   │   └── Section.tsx
│   │   │   ├── typography/
│   │   │   │   ├── Heading.tsx
│   │   │   │   ├── Body.tsx
│   │   │   │   └── Label.tsx
│   │   │   ├── players/
│   │   │   │   ├── PlayerCard.tsx
│   │   │   │   ├── PlayerGrid.tsx
│   │   │   │   ├── PlayerBio.tsx
│   │   │   │   ├── PlayerRatings.tsx
│   │   │   │   ├── PlayerRecentForm.tsx
│   │   │   │   └── PlayerFilterBar.tsx
│   │   │   ├── tournaments/
│   │   │   │   ├── TournamentCard.tsx
│   │   │   │   ├── TournamentHeader.tsx
│   │   │   │   ├── RoundsPairingsTable.tsx
│   │   │   │   ├── StandingsTable.tsx
│   │   │   │   └── TournamentTimeline.tsx
│   │   │   ├── matches/
│   │   │   │   ├── MatchHeader.tsx
│   │   │   │   ├── MatchLineup.tsx
│   │   │   │   ├── RoundResults.tsx
│   │   │   │   ├── MVPSection.tsx
│   │   │   │   └── LiveUpdates.tsx
│   │   │   ├── rankings/
│   │   │   │   ├── TeamRankingsTable.tsx
│   │   │   │   ├── PlayerRankingsTable.tsx
│   │   │   │   └── EloChart.tsx
│   │   │   ├── news/
│   │   │   │   ├── NewsCard.tsx
│   │   │   │   ├── NewsFeed.tsx
│   │   │   │   └── CategoryFilter.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.tsx
│   │   │   │   ├── BlockRenderer.tsx
│   │   │   │   ├── blocks/
│   │   │   │   │   ├── EmbedBlock.tsx
│   │   │   │   │   ├── QuoteBlock.tsx
│   │   │   │   │   ├── StatBlock.tsx
│   │   │   │   │   └── GalleryBlock.tsx
│   │   │   ├── media/
│   │   │   │   ├── MediaGallery.tsx
│   │   │   │   └── MediaLightbox.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── MatchBar.tsx
│   │   │   │   └── FeaturedPlayers.tsx
│   │   │   └── common/
│   │   │       ├── SearchBar.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       └── ErrorBoundary.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                # Typed fetch wrapper for NestJS API
│   │   │   ├── cms.ts                # Payload CMS client
│   │   │   ├── auth.ts               # Auth.js config
│   │   │   ├── metadata.ts           # generateMetadata helpers
│   │   │   ├── structured-data.ts    # JSON-LD generators
│   │   │   └── analytics.ts          # Plausible event helpers
│   │   ├── hooks/
│   │   │   ├── useSearch.ts
│   │   │   ├── useRankings.ts
│   │   │   └── useLiveCoverage.ts
│   │   ├── middleware.ts              # Route protection by role
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   │
│   ├── api/                          # NestJS backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── config/
│   │   │   │   ├── database.config.ts
│   │   │   │   ├── redis.config.ts
│   │   │   │   └── jwt.config.ts
│   │   │   ├── shared/
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   ├── decorators/
│   │   │   │   │   ├── roles.decorator.ts
│   │   │   │   │   └── current-user.decorator.ts
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── cache.interceptor.ts
│   │   │   │   │   └── audit.interceptor.ts
│   │   │   │   ├── filters/
│   │   │   │   │   └── http-exception.filter.ts
│   │   │   │   └── prisma/
│   │   │   │       └── prisma.service.ts
│   │   │   ├── modules/
│   │   │   │   ├── users/
│   │   │   │   │   ├── users.module.ts
│   │   │   │   │   ├── users.controller.ts
│   │   │   │   │   ├── users.service.ts
│   │   │   │   │   └── dto/
│   │   │   │   ├── players/
│   │   │   │   │   ├── players.module.ts
│   │   │   │   │   ├── players.controller.ts
│   │   │   │   │   ├── players.service.ts
│   │   │   │   │   └── dto/
│   │   │   │   ├── tournaments/
│   │   │   │   ├── matches/
│   │   │   │   ├── rankings/
│   │   │   │   ├── ratings/
│   │   │   │   │   ├── ratings.module.ts
│   │   │   │   │   ├── ratings.service.ts
│   │   │   │   │   ├── providers/
│   │   │   │   │   │   ├── ratings-provider.interface.ts
│   │   │   │   │   │   ├── lichess-ratings.service.ts
│   │   │   │   │   │   └── fide-ratings.service.ts
│   │   │   │   │   └── scheduler/
│   │   │   │   │       └── ratings-sync.scheduler.ts
│   │   │   │   ├── seasons/
│   │   │   │   ├── media/
│   │   │   │   ├── sponsors/
│   │   │   │   ├── contact/
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── notifications.module.ts
│   │   │   │   │   ├── notifications.service.ts
│   │   │   │   │   └── templates/       # (rendered by packages/email-templates)
│   │   │   │   ├── newsletter/
│   │   │   │   ├── scouting/
│   │   │   │   ├── snapshots/
│   │   │   │   ├── audit/
│   │   │   │   └── live-coverage/
│   │   │   │       └── live-coverage.gateway.ts   # WebSocket gateway
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── test/
│   │   └── tsconfig.json
│   │
│   └── cms/                          # Payload CMS
│       ├── src/
│       │   ├── payload.config.ts
│       │   ├── collections/
│       │   │   ├── News.ts
│       │   │   ├── Blog.ts
│       │   │   ├── Media.ts
│       │   │   └── PressAssets.ts
│       │   └── blocks/
│       │       ├── EmbedBlock.ts
│       │       ├── QuoteBlock.ts
│       │       ├── StatBlock.ts
│       │       └── GalleryBlock.ts
│       └── tsconfig.json
│
├── packages/
│   ├── shared-types/                 # Shared TypeScript interfaces
│   │   ├── src/
│   │   │   ├── entities/
│   │   │   │   ├── player.types.ts
│   │   │   │   ├── tournament.types.ts
│   │   │   │   ├── match.types.ts
│   │   │   │   ├── rating.types.ts
│   │   │   │   └── user.types.ts
│   │   │   ├── api/
│   │   │   │   ├── request.types.ts
│   │   │   │   └── response.types.ts
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   │
│   └── email-templates/              # React Email templates
│       ├── src/
│       │   ├── match-result.tsx
│       │   ├── trial-status.tsx
│       │   └── round-complete.tsx
│       └── tsconfig.json
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint + typecheck + test on PR
│       ├── deploy-web.yml            # Deploy apps/web to Vercel
│       └── deploy-api.yml            # Deploy apps/api + apps/cms to Railway
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

---

## Part 4 — Database Schema Outline

```prisma
// ─── Users & Auth ────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  roleId        String
  role          Role      @relation(fields: [roleId], references: [id])
  playerId      String?   @unique  // set if role = player
  player        Player?   @relation(fields: [playerId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  notifications Notification[]
  auditLogs     AuditLog[]
  shortlists    Shortlist[]
}

model Role {
  id    String @id @default(cuid())
  name  String @unique  // admin | content_manager | coach | analyst | player | sponsor
  users User[]
}

// ─── Players & Staff ─────────────────────────────────────────────

model Player {
  id            String    @id @default(cuid())
  slug          String    @unique
  firstName     String
  lastName      String
  nationality   String
  dateOfBirth   DateTime?
  bio           String?
  photoUrl      String?
  title         String?   // GM | IM | FM | CM | WGM | WIM | none
  lichessHandle String?
  fideId        String?
  active        Boolean   @default(true)
  teamId        String?
  team          Team?     @relation(fields: [teamId], references: [id])
  user          User?
  ratings       Rating[]
  statsSnapshots StatsSnapshot[]
  pairingsAsWhite Pairing[] @relation("WhitePlayer")
  pairingsAsBlack Pairing[] @relation("BlackPlayer")
  lineupSlots   LineupSlot[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Staff {
  id          String  @id @default(cuid())
  firstName   String
  lastName    String
  role        String  // Head Coach | Analyst | Manager | etc.
  bio         String?
  photoUrl    String?
  teamId      String
  team        Team    @relation(fields: [teamId], references: [id])
  active      Boolean @default(true)
  createdAt   DateTime @default(now())
}

// ─── Teams & Seasons ─────────────────────────────────────────────

model Team {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  logoUrl     String?
  founded     Int?
  description String?
  players     Player[]
  staff       Staff[]
  matches     Match[]
  standings   Standing[]
  createdAt   DateTime  @default(now())
}

model Season {
  id          String    @id @default(cuid())
  name        String    // e.g. "2024-25"
  slug        String    @unique
  startDate   DateTime
  endDate     DateTime?
  archived    Boolean   @default(false)
  tournaments Tournament[]
  standings   Standing[]
  createdAt   DateTime  @default(now())
}

// ─── Tournaments & Rounds ────────────────────────────────────────

model Tournament {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  format      String    // Swiss | Round-Robin | Knockout | League
  status      String    // upcoming | ongoing | completed
  startDate   DateTime
  endDate     DateTime?
  location    String?
  seasonId    String
  season      Season    @relation(fields: [seasonId], references: [id])
  rounds      Round[]
  standings   Standing[]
  statsSnapshots StatsSnapshot[]
  mediaAssets MediaAsset[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Round {
  id           String    @id @default(cuid())
  number       Int
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id])
  status       String    // pending | ongoing | completed
  completedAt  DateTime?
  pairings     Pairing[]
  createdAt    DateTime  @default(now())
}

model Pairing {
  id           String   @id @default(cuid())
  roundId      String
  round        Round    @relation(fields: [roundId], references: [id])
  whiteId      String
  white        Player   @relation("WhitePlayer", fields: [whiteId], references: [id])
  blackId      String
  black        Player   @relation("BlackPlayer", fields: [blackId], references: [id])
  result       String?  // "1-0" | "0-1" | "1/2-1/2" | "*"
  board        Int?
  createdAt    DateTime @default(now())
}

// ─── Matches (Team vs Team) ───────────────────────────────────────

model Match {
  id           String   @id @default(cuid())
  date         DateTime
  venue        String?
  status       String   // upcoming | live | completed
  homeTeamId   String
  homeTeam     Team     @relation(fields: [homeTeamId], references: [id])
  seasonId     String?
  tournamentId String?
  homeScore    Float?
  awayScore    Float?
  mvpPlayerId  String?
  lineupSlots  LineupSlot[]
  mediaAssets  MediaAsset[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model LineupSlot {
  id       String @id @default(cuid())
  matchId  String
  match    Match  @relation(fields: [matchId], references: [id])
  playerId String
  player   Player @relation(fields: [playerId], references: [id])
  board    Int
  side     String // "home" | "away"
}

// ─── Standings ───────────────────────────────────────────────────

model Standing {
  id            String      @id @default(cuid())
  seasonId      String?
  season        Season?     @relation(fields: [seasonId], references: [id])
  tournamentId  String?
  tournament    Tournament? @relation(fields: [tournamentId], references: [id])
  teamId        String?
  team          Team?       @relation(fields: [teamId], references: [id])
  playerId      String?
  player        Player?     @relation(fields: [playerId], references: [id])
  rank          Int
  points        Float
  matchesPlayed Int         @default(0)
  wins          Int         @default(0)
  draws         Int         @default(0)
  losses        Int         @default(0)
  tiebreak      Float?
  updatedAt     DateTime    @updatedAt
}

// ─── Ratings ─────────────────────────────────────────────────────

model Rating {
  id         String   @id @default(cuid())
  playerId   String
  player     Player   @relation(fields: [playerId], references: [id])
  source     String   // "fide" | "lichess_classical" | "lichess_rapid" | "lichess_blitz"
  value      Int
  capturedAt DateTime @default(now())

  @@index([playerId, source, capturedAt])
}

// ─── Stats Snapshots ─────────────────────────────────────────────

model StatsSnapshot {
  id           String     @id @default(cuid())
  playerId     String
  player       Player     @relation(fields: [playerId], references: [id])
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id])
  capturedAt   DateTime   @default(now())
  data         Json       // flexible JSONB: score, performance rating, result breakdown

  @@index([playerId, tournamentId])
}

// ─── CMS-backed content (news & blog in Payload, references here) ─

model NewsPost {
  id          String   @id @default(cuid())  // mirrors Payload document ID
  slug        String   @unique
  title       String
  summary     String?
  coverUrl    String?
  tags        String[]
  publishedAt DateTime?
  authorId    String?
  createdAt   DateTime @default(now())
  // Body content lives in Payload CMS — fetched via API at render time
}

model BlogPost {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  summary     String?
  coverUrl    String?
  tags        String[]
  publishedAt DateTime?
  authorId    String?
  createdAt   DateTime @default(now())
  // Rich content blocks live in Payload CMS
}

// ─── Media Assets ─────────────────────────────────────────────────

model MediaAsset {
  id           String   @id @default(cuid())
  url          String
  type         String   // "photo" | "video" | "document"
  alt          String?
  tournamentId String?
  tournament   Tournament? @relation(fields: [tournamentId], references: [id])
  matchId      String?
  match        Match?   @relation(fields: [matchId], references: [id])
  bucket       String   // "public-media" | "private-assets"
  size         Int?
  mimeType     String?
  uploadedById String?
  createdAt    DateTime @default(now())
}

// ─── Sponsors ─────────────────────────────────────────────────────

model Sponsor {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  logoUrl   String?
  websiteUrl String?
  tier      String   // "title" | "gold" | "silver" | "partner"
  active    Boolean  @default(true)
  userId    String?  // link to sponsor portal user
  createdAt DateTime @default(now())
}

// ─── Applications (Trials) ────────────────────────────────────────

model Application {
  id          String   @id @default(cuid())
  firstName   String
  lastName    String
  email       String
  fideId      String?
  lichessHandle String?
  rating      Int?
  message     String?
  status      String   @default("pending") // pending | reviewing | accepted | rejected
  reviewedBy  String?
  reviewedAt  DateTime?
  createdAt   DateTime @default(now())
}

// ─── Notifications ────────────────────────────────────────────────

model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String   // "match_result" | "round_complete" | "trial_status" | "newsletter"
  title     String
  body      String?
  read      Boolean  @default(false)
  sentAt    DateTime?
  createdAt DateTime @default(now())
}

// ─── Audit Logs ───────────────────────────────────────────────────

model AuditLog {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  action     String   // "create" | "update" | "delete"
  entity     String   // "Player" | "Tournament" | "Match" | etc.
  entityId   String
  diff       Json?    // before/after snapshot
  ipAddress  String?
  createdAt  DateTime @default(now())

  @@index([entity, entityId])
  @@index([userId, createdAt])
}

// ─── Shortlists (Scouting) ────────────────────────────────────────

model Shortlist {
  id        String          @id @default(cuid())
  name      String
  userId    String
  user      User            @relation(fields: [userId], references: [id])
  players   ShortlistPlayer[]
  createdAt DateTime        @default(now())
}

model ShortlistPlayer {
  id          String    @id @default(cuid())
  shortlistId String
  shortlist   Shortlist @relation(fields: [shortlistId], references: [id])
  playerId    String
  notes       String?
  addedAt     DateTime  @default(now())

  @@unique([shortlistId, playerId])
}
```
