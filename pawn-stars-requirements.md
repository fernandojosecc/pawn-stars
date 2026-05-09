# Pawn Stars — Claude Code Prompt

## Context

You are building the official website for **Pawn Stars**, a competitive chess organization. The product documentation is available in `docs/product-architecture.md`. Read it fully before proceeding.

Your job is to:
1. Generate a **technical stack decision** with rationale for each choice.
2. Generate a detailed **execution plan** broken into phases, modules, and tasks.

---

## Part 1 — Technical Stack

Evaluate and decide on the final stack for the project. For each layer, pick one technology and explain why it fits this specific project. Do not list alternatives — commit to a single choice per layer.

Layers to cover:

- **Frontend framework** — with routing strategy (SSR vs SSG per page type)
- **UI component system** — design system approach and styling solution
- **Backend framework** — REST vs GraphQL decision, module structure
- **Database** — schema strategy, ORM choice
- **Authentication** — provider, session strategy, RBAC approach
- **CMS** — headless CMS choice for news, blog, and media
- **File storage** — media assets, player photos, press kits
- **Search** — full-text search across players, news, tournaments
- **Cache layer** — strategy for ratings, standings, and static content
- **Email** — transactional (trials, notifications) and marketing
- **Analytics** — traffic, engagement, and content performance
- **Deployment** — frontend host, backend host, CI/CD pipeline
- **Monitoring** — error tracking, performance, and log aggregation

Output format for each layer:

```
### [Layer Name]
**Choice:** [Technology]
**Rationale:** [2–3 sentences specific to Pawn Stars requirements]
**Key config:** [One concrete implementation note or constraint]
```

---

## Part 2 — Execution Plan

Generate a phased execution plan. Each phase must include:
- A clear goal and deliverable
- A list of modules/features to build
- Individual tasks broken into subtasks where needed
- Estimated complexity per task: `S` (< 2h), `M` (2–4h), `L` (4–8h), `XL` (> 8h)
- Dependencies between tasks noted inline

### Phase structure to follow:

#### Phase 0 — Project Setup
- Monorepo or separate repos decision and scaffolding
- Environment configuration (dev, staging, production)
- CI/CD pipeline setup
- Shared types/interfaces package
- Design system and token setup
- Database provisioning and migrations baseline
- Auth provider setup

#### Phase 1 — MVP (Public Site Core)
Cover these modules:
- Home page (hero, match bar, featured players, recent news)
- Team page (history, philosophy, staff section)
- Players page (grid with filters, player cards)
- Player detail page (bio, ratings, form, recent results)
- Tournaments list page
- News feed with category filter
- Contact page with form
- Basic admin panel (CRUD for players, news, tournaments)
- CMS integration (news and blog content)

#### Phase 2 — Competitive Core
Cover these modules:
- Match Center (lineup, round results, MVP, post-match stats)
- Rankings page (team ranking, player ranking, ELO evolution chart)
- Tournament detail page (rounds, pairings, standings, timeline)
- Calendar / Schedule page
- Media library (photos, videos, press assets)
- Sponsors page
- Role-based access control (player, coach, analyst, admin, content manager)

#### Phase 3 — Data & Automation
Cover these modules:
- External ratings import (Lichess API, FIDE feed)
- Stats snapshots system (automated capture per tournament)
- Season archive (historical data per season)
- Blog with rich content blocks (embeds, quote blocks, stat blocks, galleries)
- SEO layer (schema markup, Open Graph, sitemap, meta per entity)
- Performance optimization (lazy loading, image CDN, Core Web Vitals audit)
- Email notifications (match results, transfer news, trials status)

#### Phase 4 — Advanced Features
Cover these modules:
- Player profile private area (study material, internal stats, calendar)
- Scouting tools (shortlists, performance filters, comparison view)
- Live coverage mode (live round updates, alerts, real-time standings)
- Sponsor portal (campaign reports, reach metrics)
- Automated post-tournament article generation
- Newsletter and fan engagement integration
- Audit logs and admin observability dashboard

---

## Part 3 — File and Folder Structure

Generate the complete folder structure for both frontend and backend based on your stack decision. Use a tree format. Include:
- All top-level directories
- Key subdirectories per feature module
- Naming conventions for components, hooks, services, and entities
- Config files and environment setup locations

---

## Part 4 — Database Schema Outline

Generate the entity list with key fields for each. For each entity include:
- Table/collection name
- Primary key strategy
- Key fields (type and purpose)
- Relationships to other entities

Cover at minimum: `users`, `roles`, `players`, `staff`, `teams`, `seasons`, `matches`, `tournaments`, `rounds`, `pairings`, `standings`, `ratings`, `stats_snapshots`, `news_posts`, `blog_posts`, `media_assets`, `sponsors`, `applications`, `notifications`, `audit_logs`.

---

## Output Format Instructions

- Use Markdown throughout.
- Use headers (`##`, `###`) to separate phases and sections.
- Use code blocks for file trees, config examples, and schema definitions.
- Use task lists (`- [ ]`) for all tasks within each phase.
- Tag complexity inline: e.g., `- [ ] Build player card component — **M**`
- Flag dependencies explicitly: e.g., `→ requires: Auth setup (Phase 0)`
- Be specific and actionable. Avoid vague tasks like "set up database" — write "Create PostgreSQL schema with initial migrations for users, roles, and players tables."

---

## Constraints and Preferences

- The site must be **mobile-first** from day one — no desktop-first retrofitting.
- **SEO is non-negotiable** — every public page must have SSR or SSG from Phase 1.
- Player ratings and tournament standings are the most critical data — treat them with care in the schema.
- The admin panel is internal-only — keep it simple and functional, not polished.
- The design system established in Phase 0 must be enforced across all phases — no ad hoc styles.
- All external API integrations (Lichess, FIDE) must be abstracted behind internal service layers so the source can be swapped without breaking the rest of the app.
- Type safety is required end-to-end — use shared types between frontend and backend wherever possible.
