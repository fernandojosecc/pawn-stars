# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage production build for the NestJS API
# Build context: monorepo root (required for workspace packages)
#   docker build -f apps/api/Dockerfile -t pawn-stars-api .
# ─────────────────────────────────────────────────────────────────────────────

# ─── Base: Node 20 Alpine with pnpm ──────────────────────────────────────────
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# ─── Stage 1: Populate the pnpm virtual store ─────────────────────────────────
FROM base AS deps
WORKDIR /app

# Copy workspace manifests only — layer is cached until the lockfile changes
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared-types/package.json  ./packages/shared-types/
COPY packages/email-templates/package.json ./packages/email-templates/
COPY apps/api/package.json ./apps/api/

# --ignore-scripts keeps this layer fast and safe; devDependencies are included
# so the virtual store holds typescript and @nestjs/cli for the builder stage
RUN pnpm install --frozen-lockfile --ignore-scripts

# ─── Stage 2: Build all packages ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# ── Copy workspace config ────────────────────────────────────────────────────
# These files define the workspace structure pnpm needs before linking packages
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./

# ── Explicitly copy workspace package sources ────────────────────────────────
# Do NOT use "COPY . ." — it would copy the host's node_modules into the image
# and overwrite the pnpm virtual store with paths that only exist on the host.
COPY packages/shared-types/  ./packages/shared-types/
COPY packages/email-templates/ ./packages/email-templates/

# ── Copy API source ──────────────────────────────────────────────────────────
COPY apps/api/ ./apps/api/

# ── Restore the pnpm virtual store from the deps stage ───────────────────────
# Placed after source copy so pnpm sees the full workspace tree when it runs
COPY --from=deps /app/node_modules ./node_modules

# Full install: establishes workspace symlinks (@pawn-stars/* → packages/*)
# and makes devDependencies (tsc, @nestjs/cli) available for the build below
RUN pnpm install --frozen-lockfile

# ── Generate Prisma client ────────────────────────────────────────────────────
# Must run before tsc so @prisma/client exports are available to TypeScript
RUN cd apps/api && npx prisma generate

# ── Build in dependency order ────────────────────────────────────────────────
# Each package's dist/ must exist before the next one compiles against it
RUN pnpm --filter @pawn-stars/shared-types build \
 && pnpm --filter @pawn-stars/email-templates build \
 && pnpm --filter @pawn-stars/api build

# ── Create self-contained production bundle ───────────────────────────────────
# pnpm deploy resolves workspace symlinks → real files, strips devDependencies
RUN pnpm --filter @pawn-stars/api deploy --prod /app/deploy

# Copy compiled dist (pnpm deploy carries source, not compiled output)
RUN cp -r apps/api/dist /app/deploy/dist

# Copy the generated Prisma query engine — pnpm deploy may not include .prisma/
RUN cp -r node_modules/.prisma /app/deploy/node_modules/.prisma 2>/dev/null || true

# ─── Stage 3: Lean production image ──────────────────────────────────────────
FROM node:20-alpine AS production

# Create a non-root user
RUN addgroup -S nodejs -g 1001 \
 && adduser -S nestjs -u 1001 -G nodejs

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy only the standalone deployment bundle — no dev deps, no source, no symlinks
COPY --from=builder --chown=nestjs:nodejs /app/deploy .

USER nestjs

EXPOSE 3001

# Docker-level health check (Railway also probes /health via HTTP)
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["node", "dist/main.js"]
