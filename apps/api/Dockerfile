FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/email-templates/package.json ./packages/email-templates/
COPY apps/api/package.json ./apps/api/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/shared-types/node_modules ./packages/shared-types/node_modules
COPY --from=deps /app/packages/email-templates/node_modules ./packages/email-templates/node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN find . -name "*.tsbuildinfo" -delete
RUN cd apps/api && npx prisma generate
RUN pnpm --filter @pawn-stars/shared-types build
RUN pnpm --filter @pawn-stars/email-templates build
RUN pnpm --filter @pawn-stars/api build

FROM node:20-alpine AS production
RUN addgroup -S nodejs -g 1001 && adduser -S nestjs -u 1001 -G nodejs
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/email-templates/package.json ./packages/email-templates/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder --chown=nestjs:nodejs /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/email-templates/dist ./packages/email-templates/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma

USER nestjs
WORKDIR /app/apps/api
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s \
  CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["node", "dist/main.js"]
