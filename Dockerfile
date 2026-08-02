# ---------------------------------------------------
# STAGE 1: Base Image
# ---------------------------------------------------
FROM node:20-alpine AS base

# ---------------------------------------------------
# STAGE 2: Install Dependencies (Efficient Caching)
# ---------------------------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# ---------------------------------------------------
# STAGE 3: Build Application
# ---------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build phase
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---------------------------------------------------
# STAGE 4: Production Runner (Ultra-Lightweight)
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static public assets
COPY --from=builder /app/public ./public

# Copy standalone build output (excludes heavy node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the standalone server directly without npm
CMD ["node", "server.js"]