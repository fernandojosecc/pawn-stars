# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage production build for the NestJS API
# Build context: monorepo root (required for workspace packages)
#   docker build -f apps/api/Dockerfile -t pawn-stars-api .
# ─────────────────────────────────────────────────────────────────────────────

# ─── Base: Node 20 Alpine with pnpm ──────────────────────────────────────────
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# ─── Stage 1: Install all workspace dependencies ──────────────────────────────
FROM base AS deps
WORKDIR /app

# Copy workspace manifests only — lets Docker cache this layer until lockfile changes
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/email-templates/package.json ./packages/email-templates/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Build all packages ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Restore installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Copy full source
COPY . .

# Build dependency packages before the API (turbo topology: ^build)
RUN pnpm --filter @pawn-stars/shared-types build \
 && pnpm --filter @pawn-stars/email-templates build \
 && pnpm --filter @pawn-stars/api build

# Create a self-contained production bundle:
# pnpm deploy resolves workspace symlinks and includes only production deps
RUN pnpm --filter @pawn-stars/api deploy --prod /app/deploy

# Copy the compiled dist into the deployment bundle
# (pnpm deploy copies source but not the compiled output)
RUN cp -r apps/api/dist /app/deploy/dist

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
